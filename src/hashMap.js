import linkedList from "./linkedList.js";

const customHashMap = (hashFunction) => {
  if (typeof hashFunction !== "function") {
    throw new Error("Invalid function");
  }

  const DEFAULT_CAPACITY = 16;
  const LOAD_FACTOR = 0.75;
  let capacity = DEFAULT_CAPACITY;
  let hashTable = Array(capacity);
  let numKeys = 0;

  const hash = (key) => hashFunction(key);

  /**
   * 
   * @param {*} key - The key to hash
   * @returns the hashcode/index adjusted for the current capacity
   */
  const primeHashCode = (key) => {
    let hashCode = hash(key);
    if(hashCode >= capacity) {
      hashCode %= capacity;
    }
    return hashCode;
  }

  const set = (key, value) => {
    if (numKeys + 1 > capacity * LOAD_FACTOR) {
      resize();
    }
   
    const hashCode = primeHashCode(key);

    if (hashTable[hashCode] == null) {
      hashTable[hashCode] = linkedList();
    }

    hashTable[hashCode].add(key, value);

    numKeys++;
  };

  const get = (key) => {
    const hashCode = primeHashCode(key);

    if (hashTable[hashCode] == null) {
      return null;
    }

    const retVal = hashTable[hashCode].get(key);

    return retVal;
  };

  /**
   * 
   * @param {*} key - The key to check 
   * @returns True if exists, false if not
   */
  const has = (key) => get(key) !== null;

  /**
   * 
   * @param {*} key - The key of the item to delete 
   * @returns True if deleted, false if not
   */
  const remove = (key) => {
    const hashCode = primeHashCode(key);
    if (hashTable[hashCode] == null) {
      return false;
    }

    const deletedValue = hashTable[hashCode].remove(key);
    return deletedValue !== null;
  };

  const length = () => numKeys;

  /**
   * Gets an array of either keys or values
   * @param type - The type of value to get (key - keys, value - value)
   */
  const itemsOf = (type) => {
    if (type !== "key" && type !== "value" && type !== 'item') {
      throw new Error("Invalid `itemsOf` type");
    }

    const itemArr = [];

    for(let i = 0; i < hashTable.length; i++) {
      if(!hashTable[i]) {
        continue;
      }

      hashTable[i].iterate((c) => {
        if(type == 'item') {
          itemArr.push(c.item);
        } else {
          itemArr.push(c.item[type]);
        }
      });
    }
    return itemArr;
  };
  const keys = () => itemsOf("key");
  const values = () => itemsOf('value');
  const entries = () => itemsOf("item");

  // semi-deep
  const clear = () => {
    for (let i = 0; i < hashTable.length; i++) {
      if (hashTable[i] == null) {
        continue;
      }

      hashTable[i] = null;
    }
  };

  const resize = () => {
    capacity *= 2;
    const newTable = Array(capacity);
    const allItems = itemsOf('item');

    for (let i = 0; i < allItems.length; i++) {
      const {key, value} = allItems[i];
      const hashCode = primeHashCode(key);

      if(!newTable[hashCode]) {
        newTable[hashCode] = linkedList();
      }

      newTable[hashCode].add(key, value);
    }
    hashTable = newTable;
  };

  const print = () => {
    for(let i = 0; i < hashTable.length; i++) {
      if(hashTable[i] == null) {
        continue;
      }
      hashTable[i].iterate(console.log);
    }
  };

  return {
    hash,
    set,
    get,
    print,
    has,
    remove,
    values,
    keys,
    clear,
    length,
    entries
  };
};

export default customHashMap;
