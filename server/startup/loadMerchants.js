Meteor.startup(function () {
  var merchants = [
      'RESTAURANTE',
      'QUIOSQUE',
      'DEPÓSITO',
      'TRANSFERÊNCIA',
      'FARMÁCIA',
      'MERCADO',
      'PADARIA',
      'MERCEARIA',
      'DOCERIA',
      'BAR',
      'PASTELARIA',
      'LANCHONETE',
      'LAVANDERIA',
      'POSTO DE GASOLINA',
      'ÁGUA',
      'LUZ',
      'TELEFONE',
      'INTERNET',
      'GÁS',
      'BALADA',
      'CASAS DE SHOW',
      'CLUBE',
      'ACADEMIA',
      'YOGA',
      'CONSULTÓRIO MÉDICO',
      'CONSULTÓRIO DENTÁRIO',
      'CABELEIREIRO',
      'VETERINÁRIA',
      'OFICINA MECÂNICA',
      'BORRACHEIRO',
      'CINEMA',
      'TEATRO',
      'PAPELARIA',
      'ARTESANATO', 
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
