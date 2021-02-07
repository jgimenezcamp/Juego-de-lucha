class Luchador {
  constructor(nombre, vida, fuerza, defensa, suerte) {
    this.nombre = nombre;
    this.vida = vida;
    this.fuerza = fuerza;
    this.defensa = defensa;
    this.suerte = suerte;
    this.handicap = suerte - Math.floor(Math.random() * 5);
  }

  ataque(enemigo) {
    enemigo.vida -=
      (this.fuerza - enemigo.defensa) * (this.suerte - this.handicap);
  }

  ataqueEspecial(enemigo) {
    enemigo.vida -= this.fuerza * 0.5 + this.fuerza - enemigo.defensa;
  }

  defensa() {}
}

var jugador1 = new Luchador("Jugador 1", 200, 50, 30, 7);
var jugador2 = new Luchador("Jugador 2", 200, 45, 35, 5);
var jugador3 = new Luchador("Jugador 3", 200, 40, 28, 8);
var jugador4 = new Luchador("Jugador 4", 200, 55, 25, 9);
var jugador5 = new Luchador("Jugador 5", 200, 60, 27, 5);
var jugador6 = new Luchador("Jugador 6", 200, 50, 30, 8);

function obtener_jugador(dataName) {
  let jugadorActual = "";

  switch (dataName) {
    case "Jugador 1":
      jugadorActual = jugador1;
      break;
    case "Jugador 2":
      jugadorActual = jugador2;
      break;
    case "Jugador 3":
      jugadorActual = jugador3;
      break;
    case "Jugador 4":
      jugadorActual = jugador4;
      break;
    case "Jugador 5":
      jugadorActual = jugador5;
      break;
    case "Jugador 6":
      jugadorActual = jugador6;
      break;
  }

  return jugadorActual;
}

$(document).ready(function () {
  let arrayTeamA = [];
  let arrayTeamB = [];

  $("#luchador1 .card-title").html(jugador1.nombre);
  $("#luchador1").attr("data-name", jugador2.nombre);

  $("#luchador2 .card-title").html(jugador2.nombre);
  $("#luchador2").attr("data-name", jugador2.nombre);

  $("#luchador3 .card-title").html(jugador3.nombre);
  $("#luchador3").attr("data-name", jugador3.nombre);

  $("#luchador4 .card-title").html(jugador4.nombre);
  $("#luchador4").attr("data-name", jugador4.nombre);

  $("#luchador5 .card-title").html(jugador5.nombre);
  $("#luchador5").attr("data-name", jugador5.nombre);

  $("#luchador6 .card-title").html(jugador6.nombre);
  $("#luchador6").attr("data-name", jugador6.nombre);

  
    cantidadJugadores = 2;

    if (cantidadJugadores == 0) {
      alert("Debe seleccionar la cantidad de jugadores");
    } else {

      let countClick = 0;

      $(".jugador").click(function () {
        let id = $(this).attr("data-name");

        var jugadorA = obtener_jugador(id);

        countClick++;

        if (countClick % 2 != 0) {
          $(this).addClass("border border-primary elegido");
          arrayTeamA.push(jugadorA);
        } else {
          $(this).addClass("border border-danger elegido");
          arrayTeamB.push(jugadorA);
        }

        if (countClick == cantidadJugadores) {
          $(".jugador").each(function (index) {
            if (!$(this).is(".elegido")) {
              $(this).hide();
            }
          });
        }

        let texto = "";

        if (
          arrayTeamA.length == arrayTeamB.length &&
          countClick == cantidadJugadores
        ) {
          for (let i = 0; i < arrayTeamA.length; i++) {
            texto +=
              "El jugador " +
              arrayTeamA[i].nombre +
              " va pelear con " +
              arrayTeamB[i].nombre +
              "<br>";
          }

          $("#modalPelea .modal-body").html(texto);
          $("#modalPelea").modal("show");

        }
      });
    }


  $(".btnIrPelea").click(function () {
    $("#modalPelea").modal("hide");
    $(".container-pelea").removeClass("visually-hidden");
  });

  $(".btn-pelear").click(function () {

    for (let i = 0; i < arrayTeamA.length; i++) {
      let turno = Math.floor(Math.random() * 2);
      let especial = Math.floor(Math.random() * 5);

      if (turno == 0) {
        if (especial == 3) {
            
          $('#resumenPelea').append('<p>Jugador Azul realiza ataque especial</p>');

          arrayTeamA[i].ataqueEspecial(arrayTeamB[i]);

          if(arrayTeamB[i].vida <= 0){
            alert("Ha ganado el jugador Azul");
            $('.btn-pelear').hide();
          }

        } else {

         $('#resumenPelea').append('<p>Jugador Azul realiza un ataque</p>');
          arrayTeamA[i].ataque(arrayTeamB[i]);
          
          if(arrayTeamB[i].vida <= 0){
            alert("Ha ganado el jugador Azul");
            $('.btn-pelear').hide();
          }

        }
        $('#estadisticaB').append('<p>Vida: ' + arrayTeamB[i].vida +'</p>');
      } else {
        if (especial == 3) {

          $('#resumenPelea').append('<p>Jugador Rojo realiza ataque especial</p>');
          arrayTeamB[i].ataqueEspecial(arrayTeamA[i]);
          
          if(arrayTeamA[i].vida <= 0){
            alert("Ha ganado el jugador Rojo");
            $('.btn-pelear').hide();
          }

        } else {
          
          $('#resumenPelea').append('<p>Jugador Rojo realiza un ataque</p>');  
          arrayTeamB[i].ataque(arrayTeamA[i]);
          
          if(arrayTeamA[i].vida <= 0){
            alert("Ha ganado el jugador Rojo");
            $('.btn-pelear').hide();
          }

        }

        $('#estadisticaA').append('<p>Vida: ' + arrayTeamA[i].vida +'</p>');

      }

    }

    
  });
});
