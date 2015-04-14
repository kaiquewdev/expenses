SpendingsArchive = new Mongo.Collection('spendingsArchive');

SpendingsArchive.allow({
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
