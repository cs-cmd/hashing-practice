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

  const set = (key, value) => {
    let hashCode = hash(key);

    if (hashCode > capacity) {
      hashCode = hashCode % capacity;
    }

    const addItem = {
      key,
      value,
    };

    if (hashTable[hashCode] == null) {
      hashTable[hashCode] = linkedList();
    }

    hashTable[hashCode].add(hashCode, addItem);

    numKeys++;

    if (numKeys > capacity * LOAD_FACTOR) {
      resize();
    }
  };

  const get = (key) => {
    const hashCode = hash(key);

    if (hashCode > capacity) {
      hashCode = hashCode % capacity;
    }

    if (hashTable[hashCode] == null) {
      return null;
    }

    const cursor = hashTable[hashCode].head;

    while (cursor != null) {
      if (cursor.key == key) {
        return cursor.value;
      }
      cursor = cursor.next;
    }

    return null;
  };

  const has = (key) => {};

  const remove = (key) => {};

  const length = () => numKeys;

  /**
   * Gets an array of either keys or values
   * @param type - The type of value to get (key - keys, value - value)
   */
  const itemsOf = (type) => {
    if (type !== "key" || type !== "value") {
      throw new Error("Invalid `itemsOf` type");
    }

    const itemArr = [];
    for (let i = 0; i < hashTable.length; i++) {
      if (hashTable[i] == null) {
        continue;
      }
      const cursor = hashTable[i].head;
      while (cursor != null) {
        itemArr.push(cursor[type]);
      }
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

  const iterate = (linkedList, cb) => {
    console.log(linkedList.head);
    let cursor = linkedList.head;

    while (cursor != null) {
      cb(cursor);
      cursor = cursor.next;
    }
  };

  const resize = () => {
    capacity *= 2;
    const newTable = Array(capacity);

    for (let i = 0; i < hashTable.length; i++) {
      if (hashTable[i] == null) {
        continue;
      }
      newTable[i] = linkedList();

      iterate(hashTable[i], (c) => {
        newTable[i].set(c.key, c.item);
      });
    }

    hashTable = newTable;
  };

  const print = () => {
    console.log("in print");
    console.log(hashTable.length);
    for (let i = 0; i < hashTable.length; i++) {
      if (hashTable[i] == null) {
        console.log(`${i} is null`);
        continue;
      }

      console.log(hashTable[i]);
      iterate(hashTable[i], (c) => {
        console.log(c);
      });
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
