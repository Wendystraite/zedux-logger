import { purry } from 'remeda';

function _deobfuscateAndTransform<OBJ extends object, KEY extends keyof OBJ>(
  obj: OBJ,
  keys: KEY,
  translation: string,
  transform: (key: OBJ[KEY]) => unknown,
): OBJ {
  let smartTranslation: string = translation;

  const keysStr = String(keys);

  if (keysStr.length === 0 || translation.length === 0 || !(keys in obj)) {
    return obj;
  }

  for (const key of keysStr) {
    const keyIndexInTranslation = smartTranslation.indexOf(key);

    if (keyIndexInTranslation >= 0) {
      // key "e" + translation "ecosystem" = [e]cosystem
      // key "V" + translation "scopeValues" = scope[V]alues
      smartTranslation = `${smartTranslation.slice(0, keyIndexInTranslation)}[${key}]${smartTranslation.slice(keyIndexInTranslation + key.length)}`;
    } else {
      // key "izn" + translation "isZeduxNode" = [izn] (isZeduxNode)
      smartTranslation = `[${keysStr}] (${translation})`;
      break;
    }
  }

  (obj as Record<string, unknown>)[smartTranslation] = transform(obj[keys]);
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete obj[keys];
  return obj;
}

// data-first
export function deobfuscateAndTransform<
  OBJ extends object,
  KEY extends keyof OBJ,
>(
  obj: OBJ,
  key: KEY,
  translation: string,
  transform: (key: OBJ[KEY]) => unknown,
): OBJ;

// data-last
export function deobfuscateAndTransform<
  OBJ extends object,
  KEY extends keyof OBJ,
>(
  key: KEY,
  translation: string,
  transform: (key: OBJ[KEY]) => unknown,
): (obj: OBJ) => OBJ;

export function deobfuscateAndTransform(...args: unknown[]) {
  return purry(_deobfuscateAndTransform, args);
}

function _deobfuscate<OBJ extends object>(
  obj: OBJ,
  key: keyof OBJ,
  translation: string,
): OBJ {
  return _deobfuscateAndTransform(obj, key, translation, (data) => data);
}

// data-first
export function deobfuscate<OBJ extends object>(
  obj: OBJ,
  key: keyof OBJ,
  translation: string,
): OBJ;

// data-last
export function deobfuscate<OBJ extends object>(
  key: keyof OBJ,
  translation: string,
): (obj: OBJ) => OBJ;

export function deobfuscate(...args: unknown[]) {
  return purry(_deobfuscate, args);
}
