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
    if (head == null) {
      return;
    }

    let cursor = head;
    while (cursor != null) {
      const isDone = cb(cursor);
      if(isDone) {
        break;
      }
      cursor = cursor.next;
    }
  };

  const get = (key) => {
    let retVal = null;
    iterate((c) => {
      if(c.item.key === key) {
        retVal = c.item;
        return true;
      }
      return false;
    });
    return retVal;
  };

  const remove = (key) => {
    iterate((c) => {
      if (c.item.key !== key) {
        return false;
      }

      if(c.item.key === head.item.key) {
        head = head.next;
        head.prev = null;
      } else if (c.item.key === tail.item.key) {
        tail = tail.prev;
        tail.next = null;
      } else {
        c.prev.next = c.next;
        c.next.prev = c.prev;
      }
      return true;
    });
  };

  const len = () => length;

  const print = () => {
    iterate(console.log);
  }

  return {
    add,
    remove,
    get,
    iterate,
    len,
    print
  };
};

export default linkedList;
