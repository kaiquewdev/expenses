Meteor.publish('merchants', function () {
  return Merchants.find({}, { sort: { rank: -1 } });
});
