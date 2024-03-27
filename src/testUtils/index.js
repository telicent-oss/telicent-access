export default class TestResponse {
  statusCode = 0;
  status(code) {
    this.statusCode = code;
    return this;
  }
  data = {};
  json(data) {
    this.data = data;
  }
  send(data) {
    this.data = data;
  }
}

export const stringifyMongoId = (item) => {
  const clone = item.hasOwnProperty("_doc") ? { ...item._doc } : { ...item };
  if (Object.hasOwn(clone, "labels")) {
    clone.labels = clone.labels?.map((label) => {
      label._id = label._id.toString();
      return label;
    });
  }
  if (Object.hasOwn(clone, "_id")) {
    clone._id = clone._id.toString();
  }
  if (Object.hasOwn(clone, "id")) {
    clone.id = clone.id.toString();
  }

  return clone;
};
