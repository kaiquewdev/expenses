angular
    .module('expenses')
    .factory('Expense', function (add, archive, pickImage, cleanCurrent, setCurrent) {
      return {
        add: add,
        archive: archive,
        pickImage: pickImage,
        cleanCurrent: cleanCurrent,
        setCurrent: setCurrent,
      };
    });
