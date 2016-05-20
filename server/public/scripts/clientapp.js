$(document).ready(function () {
  getAnimals();

  // add an animal
  $('#animalSubmit').on('click', postAnimal);

});

/**-------- UTILITY FUNCTIONS --------**/

//get and display the animals in the table

function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      console.log(animals);
      $('#animalList').empty();
      $('#animalList').append('<table><tr><th>Animal</th><th>Number in zoo</th></tr>')
      animals.forEach(function (animal) {

        $container = $('<tr class="animal"></tr>');

        // fields I want to edit
        $container.append('<td>' + animal.name + ' </td> <td> ' + animal.amount +  '</td>');

        $container.data('animalId', animal.id);

        $('#animalList').append($container);
      });
    },
  });
}
//add a new animal
function postAnimal(event) {
  event.preventDefault();

  var animal = {};

  $.each($('#animalForm').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function (data) {
      getAnimals();
    },
  });
}
