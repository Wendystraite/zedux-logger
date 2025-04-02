function _makeDeobfuscateAndTransform<
  OBJ extends object,
  KEY extends keyof OBJ,
>(
  keys: KEY,
  translation: string,
): (obj: OBJ, transform: (key: OBJ[KEY]) => unknown) => OBJ {
  let smartTranslation: string = translation;

  const keysStr = String(keys);

  const isInvalid = keysStr.length === 0 || translation.length === 0;

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

  return function _deobfuscateAndTransform(obj, transform) {
    if (isInvalid || !(keys in obj)) {
      return obj;
    }
    (obj as Record<string, unknown>)[smartTranslation] = transform(obj[keys]);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete obj[keys];
    return obj;
  };
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
  if (args.length === 3) {
    const [key, translation, transform] = args as [
      keyof object,
      string,
      (key: string) => unknown,
    ];
    const fn = _makeDeobfuscateAndTransform<object, keyof object>(
      key,
      translation,
    );
    return (obj: object) => fn(obj, transform);
  } else {
    const [obj, key, translation, transform] = args as [
      object,
      keyof object,
      string,
      (key: string) => unknown,
    ];
    const fn = _makeDeobfuscateAndTransform<object, keyof object>(
      key,
      translation,
    );
    return fn(obj, transform);
  }
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
  // return purry(_deobfuscate, args);
  if (args.length === 2) {
    const [key, translation] = args as [keyof object, string];
    return deobfuscateAndTransform<object, keyof object>(
      key,
      translation,
      (data) => data,
    );
  } else {
    const [obj, key, translation] = args as [object, keyof object, string];
    return deobfuscateAndTransform<object, keyof object>(
      obj,
      key,
      translation,
      (data) => data,
    );
  }
}
