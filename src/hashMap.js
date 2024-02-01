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

    const addItem = {
      key,
      value,
    };

    if (hashTable[hashCode] == null) {
      hashTable[hashCode] = linkedList();
    }

    hashTable[hashCode].add(hashCode, addItem);

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

  const has = (key) => {};

  const remove = (key) => {};

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
      if(hashTable[i] == null) {
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
  const values = () => itemsOf("value");

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
      console.log(allItems[i]);
      const {key} = allItems[i];
      const hashCode = primeHashCode(key);

      newTable[hashCode] = linkedList();

      newTable[hashCode].add(key, allItems[i]);
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
  };
};

export default customHashMap;
