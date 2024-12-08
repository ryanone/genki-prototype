function isPrimitive<T>(val: T) {
  const valType = typeof val;
  return (
    val === null ||
    valType === 'string' ||
    valType === 'number' ||
    valType === 'boolean' ||
    valType === 'undefined'
  );
}

function getType<T>(val: T) {
  if (val === null) {
    return 'null';
  }
  if (Array.isArray(val)) {
    return 'array';
  }
  return typeof val;
}

function areArraysEqual<T>(a1: T[], a2: T[]): boolean {
  let isEqual = false;
  if (a1.length === a2.length) {
    if (a1.length === 0) {
      isEqual = true;
    } else {
      for (let i = 0; i < a1.length; i += 1) {
        const v1 = a1[i];
        const v2 = a2[i];
        if (getType(v1) !== getType(v2)) {
          isEqual = false;
        } else if (isPrimitive(v1) && isPrimitive(v2)) {
          isEqual = v1 === v2;
        } else if (Array.isArray(v1) && Array.isArray(v2)) {
          isEqual = areArraysEqual(v1, v2);
        } else {
          isEqual = areObjectsEqual(
            v1 as Record<string, unknown>,
            v2 as Record<string, unknown>,
          );
        }

        if (!isEqual) {
          break;
        }
      }
    }
  }
  return isEqual;
}

function areObjectsEqual<T extends Record<string, unknown>>(
  o1: T,
  o2: T,
): boolean {
  const keys1 = Object.keys(o1);
  const numKeys1 = keys1.length;
  const keys2 = Object.keys(o2);
  let isEqual = false;
  if (keys1.length === keys2.length) {
    if (numKeys1 === 0) {
      isEqual = true;
    } else {
      for (let i = 0; i < keys1.length; i += 1) {
        const k = keys1[i];
        const v1 = o1[k];
        const v2 = o2[k];
        if (getType(v1) !== getType(v2)) {
          isEqual = false;
        } else if (isPrimitive(v1) && isPrimitive(v2)) {
          isEqual = v1 === v2;
        } else if (Array.isArray(v1) && Array.isArray(v2)) {
          isEqual = areArraysEqual(v1, v2);
        } else {
          isEqual = areObjectsEqual(
            v1 as Record<string, unknown>,
            v2 as Record<string, unknown>,
          );
        }

        if (!isEqual) {
          break;
        }
      }
    }
  }
  return isEqual;
}

export default function deepEqual<T>(valueA: T, valueB: T): boolean {
  // if both values are primitive (string, number, boolean null, und)
  // if both values are arrays or objects, deep compare
  const typeA = getType(valueA);
  const typeB = getType(valueB);

  if (typeA !== typeB) {
    return false;
  }
  if (isPrimitive(valueA) && isPrimitive(valueB)) {
    return valueA === valueB;
  }
  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    return areArraysEqual(valueA, valueB);
  }

  return areObjectsEqual(
    valueA as Record<string, unknown>,
    valueB as Record<string, unknown>,
  );
}
