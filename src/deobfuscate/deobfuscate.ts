import { purry } from 'remeda';

function _deobfuscateAndTransform<OBJ, KEY extends keyof OBJ>(
  obj: OBJ,
  key: KEY,
  translation: string,
  transform: (key: OBJ[KEY]) => unknown,
): OBJ {
  let smartTranslation: string;

  const keyStr = String(key);

  const keyIndexInTranslation = translation.indexOf(keyStr);

  if (keyIndexInTranslation >= 0) {
    // key "e" + translation "ecosystem" = [e]cosystem
    // key "V" + translation "scopeValues" = scope[V]alues
    smartTranslation = `${translation.slice(0, keyIndexInTranslation)}[${keyStr}]${translation.slice(keyIndexInTranslation + keyStr.length)}`;
  } else {
    // key "izn" + translation "isZeduxNode" = [izn] (isZeduxNode)
    smartTranslation = `[${keyStr}] (${translation})`;
  }
  (obj as Record<string, unknown>)[smartTranslation] = transform(obj[key]);
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete obj[key];
  return obj;
}

// data-first
export function deobfuscateAndTransform<OBJ, KEY extends keyof OBJ>(
  obj: OBJ,
  key: KEY,
  translation: string,
  transform: (key: OBJ[KEY]) => unknown,
): OBJ;

// data-last
export function deobfuscateAndTransform<OBJ, KEY extends keyof OBJ>(
  key: KEY,
  translation: string,
  transform: (key: OBJ[KEY]) => unknown,
): (obj: OBJ) => OBJ;

export function deobfuscateAndTransform(...args: unknown[]) {
  return purry(_deobfuscateAndTransform, args);
}

function _deobfuscate<OBJ>(obj: OBJ, key: keyof OBJ, translation: string): OBJ {
  return _deobfuscateAndTransform(obj, key, translation, (data) => data);
}

// data-first
export function deobfuscate<OBJ>(
  obj: OBJ,
  key: keyof OBJ,
  translation: string,
): OBJ;

// data-last
export function deobfuscate<OBJ>(
  key: keyof OBJ,
  translation: string,
): (obj: OBJ) => OBJ;

export function deobfuscate(...args: unknown[]) {
  return purry(_deobfuscate, args);
}
