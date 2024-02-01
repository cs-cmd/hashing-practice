import { customHash } from "./basicHashingFunctions.js";
import customHashMap from "./hashMap.js";
import mockValues from './data-stores/mockValues.js';

const hashMap = customHashMap(customHash);
for(let i = 0; i < 20; i++) {
  const value = mockValues[i];
  hashMap.set(mockValues[i].key, mockValues[i].value);
}
console.log(hashMap.entries());
