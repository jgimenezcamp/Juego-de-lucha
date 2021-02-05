let cantidadJugadores = $('.cantidadJugadores').val();
class Luchador {

    constructor(nombre, vida, fuerza, defensa, suerte) {
        this.nombre = nombre;
        this.vida = vida;
        this.fuerza = fuerza;
        this.defensa = defensa;
        this.suerte = suerte;
        this.handicap = suerte - Math.floor(Math.random() * 5);
    };
    ataque(enemigo) {
        enemigo.vida -= (this.fuerza - enemigo.defensa) * (this.suerte - this.handicap);
    };

    ataqueEspecial(enemigo) {
        enemigo.vida -= (this.fuerza * 0.5 + this.fuerza) - enemigo.defensa;
    };

    defensa() {

    };
};



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