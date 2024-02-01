import {
  customBasicHash,
  customTrivialHash,
  customHash,
} from "./basicHashingFunctions.js";
import customHashMap from "./hashMap.js";
import linkedList from "./linkedList.js";
import mockValues from './data-stores/mockValues.js';

console.log(customBasicHash("hello"));
console.log(customTrivialHash("hello world"));
console.log(customHash("hello world"));

const ll = linkedList();
ll.add('help', 15);
ll.add('me', 20);
ll.print();

const hashMap = customHashMap(customHash);
for(let i = 0; i < 20; i++) {
  hashMap.set(mockValues[i].key, mockValues[i]);
}
hashMap.print();
