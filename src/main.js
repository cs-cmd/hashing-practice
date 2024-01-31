import {
  customBasicHash,
  customTrivialHash,
  customHash,
} from "./basicHashingFunctions.js";
import customHashMap from "./hashMap.js";

console.log(customBasicHash("hello"));
console.log(customTrivialHash("hello world"));
console.log(customHash("hello world"));

const hashMap = customHashMap(customHash);
console.log(hashMap.hash("help"));
hashMap.set("help", "15");
hashMap.print();
