let cantidadJugadores = $('.cantidadJugadores').val();



$(document).ready(function() {
    $('.cantidadJugadores').change(function() {

        cantidadJugadores = $(this).val();

        if (cantidadJugadores == 0) {
            alert("Debe seleccionar la cantidad de jugadores");
        } else {
            alert("Has seleccionado " + cantidadJugadores + " jugadores");

            let arrayTeamA = [];
            let arrayTeamB = [];

            let countClick = 0;

            $('.jugador').click(function() {
                let id = $(this).attr('id');

                countClick++;

                if (countClick % 2 != 0) {
                    $(this).addClass('border border-primary elegido');
                    arrayTeamA.push(id);
                } else {
                    $(this).addClass('border border-danger elegido');
                    arrayTeamB.push(id);
                }

                if (countClick == cantidadJugadores) {
                    $(".jugador").each(function(index) {
                        if (!$(this).is('.elegido')) {
                            $(this).hide();
                        }
                    });

                }

                let texto = "";

                if (arrayTeamA.length == arrayTeamB.length && countClick == cantidadJugadores) {

                    for (let i = 0; i < arrayTeamA.length; i++) {
                        texto += "El jugador " + arrayTeamA[i] + " va pelear con " + arrayTeamB[i] + "<br>";
                    }

                    $('#modalPelea .modal-body').html(texto);
                    $('#modalPelea').modal('show');

                }


            });


        }

    });
});