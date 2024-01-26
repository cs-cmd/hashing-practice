function customBasicHash(str) {
  return str.charAt(0);
}

function customTrivialHash(str) {
  return str.charAt(0) + str.charAt(str.length - 1);
}

function customHash(str) {
  let hashCode = 0;
  for (let i = 0; i < str.length; i++) {
    hashCode += str.charCodeAt(i);
  }

  return hashCode;
}

export { customBasicHash, customTrivialHash, customHash };
