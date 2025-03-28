import { createEcosystem } from '@zedux/atoms';
import { describe, expect, it } from 'vitest';

import { isCircularObject } from '../src/utils/isCircularObject';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

describe('isCircularObject', () => {
  it('should return false for non-circular objects', () => {
    expect(isCircularObject({ a: 1, b: 2 })).toBe(false);
    expect(isCircularObject([1, 2, 3])).toBe(false);
    expect(isCircularObject('string')).toBe(false);
    expect(isCircularObject(123)).toBe(false);
    expect(isCircularObject(null)).toBe(false);
    expect(isCircularObject(undefined)).toBe(false);
    expect(isCircularObject(true)).toBe(false);
  });

  it('should return true for circular objects', () => {
    const circularObj: Record<string, any> = { a: 1 };
    circularObj.self = circularObj;
    expect(isCircularObject(circularObj)).toBe(true);

    const circularArray: any[] = [1, 2, 3];
    circularArray.push(circularArray);
    expect(isCircularObject(circularArray)).toBe(true);
  });

  it('should return true for nested circular objects', () => {
    const obj: Record<string, any> = { a: 1, b: { c: 2 } };
    obj.b.parent = obj;
    expect(isCircularObject(obj)).toBe(true);

    const nestedCircular: Record<string, any> = {
      level1: {
        level2: {
          level3: {},
        },
      },
    };
    nestedCircular.level1.level2.level3.reference = nestedCircular.level1;
    expect(isCircularObject(nestedCircular)).toBe(true);
  });

  it("should return true for zedux's ecosystem", () => {
    expect(isCircularObject(createEcosystem())).toBe(true);
  });
});
