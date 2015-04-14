Meteor.publish('merchants', function () {
  return Merchants.find({ $and: [{ createdBy: this.userId }, { createdBy: { $exists: true } }] }, { sort: { rank: -1 } });
});
