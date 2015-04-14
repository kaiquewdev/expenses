Meteor.publish('spendings', function () {
  return Spendings.find({ $and: [{ createdBy: this.userId }, { createdBy: { $exists: true } }] }, { sort: { createdAt: -1 } });
});
