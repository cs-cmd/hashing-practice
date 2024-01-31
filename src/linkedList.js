const linkedList = () => {
  const Node = (keyItemPair) => {
    const item = keyItemPair;
    let next = null;
    let prev = null;

    return {
      item,
      next,
      prev,
    };
  };
  let head = null;
  let tail = null;
  let length = 0;

  const add = (key, value) => {
    console.log(key, value);
    const newNode = Node({ key, value });
    if (head == null) {
      head = newNode;
      tail = newNode;
    } else {
      newNode.prev = tail;
      tail.next = newNode;
      tail = newNode;
    }
    length++;
  };

  const iterate = (cb) => {
    console.log(`total items ${length}`);
    if (head == null) {
      return;
    }

    let count = 0;
    const cursor = head;
    while (cursor != null) {
      console.log(`on item ${++i}`);
      cb(cursor);
      cursor = cursor.next;
    }
  };

  const get = (key) => {};

  const removeUtil = (node) => {
    const tempPrev = node.prev;
  };
  const remove = (key) => {
    iterate((c) => {
      if (c.key === key) {
        removeUtil(cursor);
      }
    });
    length--;
  };

  const forEach = (cb) => {
    if (head == null) {
      return;
    }
    const cursor = head;
    while (cursor != null) {
      cb(cursor);
      cursor = cursor.next();
    }
  };

  const len = () => length;

  return {
    add,
    remove,
    len,
  };
};

export default linkedList;
