module.exports.clone = (obj, deep) => (deep ? deepClone(obj) : shallowClone(obj));

function deepClone(obj) {
  if (obj) {
    var clone = obj.slice ? [] : {};
    for (var i in obj) {
      if (obj[i] != null && typeof obj[i] === "object")
        clone[i] = deepClone(obj[i]);
      else if (obj[i] != null && typeof obj[i] === "function")
        clone[i] = cloneFunction(obj[i]);
      else clone[i] = obj[i];
    }
    return clone;
  } else {
    return obj;
  }
}

function shallowClone(obj) {
  if (obj && obj.slice) {
    return obj.slice();
  } else if (obj) {
    return Object.assign({}, obj);
  } else {
    return obj;
  }
}

function cloneFunction(func) {
  var that = func;
  var temp = function temporary() {
    return that.apply(func, arguments);
  };
  for (var key in func) {
    if (func.hasOwnProperty(key)) {
      temp[key] = func[key];
    }
  }
  return temp;
}
