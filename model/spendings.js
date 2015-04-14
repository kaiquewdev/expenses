Spendings = new Mongo.Collection('spendings');

Spendings.allow({
  insert: function (userId, spending) {
    return userId && spending.createdBy === userId;
  },
  update: function (userId, spending) {
    if (userId !== spending.createdBy) {
      return false;
    }

    return true;
  },
  remove: function (userId, spending) {
    if (userId !== spending.createdBy) {
      return false;
    }

    return true;
  },
});
