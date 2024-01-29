const customHashMap = (hashFunction) => {
  if (typeof hashFunction !== "function") {
    throw new Error("Invalid function");
  }

  const capacity = 16;
  let hashTable = Array(capacity);
  let numKeys = 0;
  let len = 0;

  const hash = (key) => hashFunction(key);

  const set = (key, value) => {

  }

  const get = (key) => {

  }

  const has = (key) => {

  }

  const remove = (key) => {

  }

  const length = () => numKeys;

  /**
   * Gets an array of either keys or values
   * @param type - The type of value to get (key - keys, value - value)
   */
  const itemsOf = (type) => {
    if (type !== 'key' || type !== 'value') {
        throw new Error('Invalid `itemsOf` type');
    }

    const keysArr = [];
    for(let i = 0; i < hashTable.length; i++) {
        if(hashTable[i] == null) {
            continue;
        } else if (Array.isArray(hashTable[i])) {
            for(let j = 0; i < hashTable[i][j]; j++) {
                keysArr.push(hashTable[i][j][type]);
            }
        } else {
            keysArr.push(hashTable[i].[type]);
        }
    }
    return keysArr;

  } 
  const keys = () => itemsOf('key');
  const values = () => itemsOf('value');

  // semi-deep
  const clear = () => {
    for(let i = 0; i < hashTable.length; i ++) {
        if (hashTable[i] == null) {
            continue;
        }

        hashTable[i] = null;
    }
  }

  const resize = () => {
    capacity *= 2;
    const newArray = Array(capacity);
    for(let i = 0; i < hashTable.length; i++) {
        newArray[i] = hashTable[i];
    }
    hashTable = newArray;
  }

  const

};
