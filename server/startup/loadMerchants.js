Meteor.startup(function () {
  var merchants = [
      'RESTAURANTE',
      'FARMÁCIA',
      'MERCADO',
      'PADARIA',
      'ÁGUA',
      'LUZ',
      'INTERNET',
      'TELEFONE',
      'GÁS',
      'BAR',
      'LANCHONETE',
      'LAVANDERIA',
      'CINEMA',
      'TEATRO',
      'POSTO DE GASOLINA',
      'BALADA',
      'ACADEMIA',
      'YOGA',
      'CONSULTÓRIO MÉDICO',
      'CONSULTÓRIO DENTÁRIO',
      'CABELEIREIRO',
      'VETERINÁRIA',
      'OFICINA MECÂNICA',
      'BORRACHEIRO',
      'PAPELARIA',
      'BAZAR',
      'AGÊNCIA DE TURISMO',
      'HOSTEL',
      'HOTEL',
      'CAMPING',
      'MATERIAL DE CONSTRUÇÃO',
      'OUTRO',
  ]; 

  if (Merchants.find().count() === 0) {
      merchants.map(function (item) {
          var merchant = {
              value: item.toLowerCase(),
              label: item.toLowerCase(),
              rank: 0
          };

          Merchants.insert(merchant);
      });
  }
});
