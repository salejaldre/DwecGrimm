// import { Wesen } from "./Wesen.js";
class main {
  objetoClicado = {};

  listawesens = [
    new Wesen(
      "Blutbad",
      "images/blutbad.png",
      "lobo",
      "peligroso",
      "lobo",
      "pueden ser aliados o enemigos de los Grimm."
    ),
    new Wesen(
      "Hexenbiest",
      "images/hexenbiest.png",
      "monstruo",
      "violento",
      "bruja",
      "son conocidas por su peligrosidad y habilidades mágicas."
    ),
    new Wesen(
      "Fuchsbau",
      "images/fuchsbau.png",
      "felino",
      "pacifico",
      "zorro",
      "suelen ser aliados de los Grimm y tienen habilidades útiles."
    ),
    new Wesen(
      "Hundjäger",
      "images/hundjager.png",
      "canido",
      "violento",
      "perro cazador",
      "son cazadores de Wesen y enemigos de los Grimm."
    ),
    new Wesen(
      "Eisbiber",
      "images/eisbiber.png",
      "monstruo",
      "pacifico",
      "castor",
      "son pacíficos y no representan una amenaza para los Grimm."
    ),
    new Wesen(
      "Bauerschwein",
      "images/bauerschwein.png",
      "felino",
      "pacifico",
      "cerdo",
      "son pacíficos y a menudo trabajan en granjas."
    ),
    new Wesen(
      "Skalengeck",
      "images/skalengeck.png",
      "anfibio",
      "violento",
      "lagarto",
      "son criaturas peligrosas y mortales."
    ),
    new Wesen(
      "Lowen",
      "images/lowen.png",
      "felino",
      "peligroso",
      "leon",
      "se alimentan de carne humana y son extremadamente peligrosos."
    ),
    new Wesen(
      "Mauvais Dentes",
      "images/mauvaisdentes.png",
      "felino",
      "neutral",
      "tigre dientes de sable",
      "son depredadores que atacan a humanos y Wesen."
    ),
    new Wesen(
      "Zauberbiest",
      "images/zauberbiest.png",
      "monstruo",
      "pacifico",
      "bruja",
      "son poderosos y poseen habilidades mágicas asombrosas."
    ),
  ];

  crearTabla(wesensArray) {
    var tabla = document.createElement("table");
    var tbody = document.createElement("tbody");

    for (var i = 0; i < wesensArray.length; i++) {
      var fila = document.createElement("tr");
      var celda1 = document.createElement("td");
      celda1.textContent = wesensArray[i].nombre;
      fila.appendChild(celda1);

      var celda2 = document.createElement("td");
      var imagen = document.createElement("img");
      imagen.src = wesensArray[i].imagen;
      imagen.alt = "imagen";
      imagen.style.width = "150px";
      imagen.style.height = "150px";
      imagen.style.objectFit = "cover";
      celda2.appendChild(imagen);
      fila.appendChild(celda2);

      tbody.appendChild(fila);

      fila.addEventListener(
        "click",
        (function (objeto) {
          return function () {
            this.objetoClicado = objeto;

            instanciaMain.rellenarForm(this.objetoClicado);
          };
        })(wesensArray[i])
      );
    }

    tabla.appendChild(tbody);

    var tablaContainer = document.getElementById("tablaContainer");
    tablaContainer.innerHTML = "";
    tablaContainer.appendChild(tabla);
  }

  rellenarForm(obj) {
    var inputnombre = document.getElementById("inputname");
    inputnombre.value = obj.nombre;

    var inputimg = document.getElementById("inputimagen");
    inputimg.value = obj.imagen;

    var tiposelect = document.getElementById("selecttipos");
    for (let i = 0; i < tiposelect.options.length; i++) {
      if (tiposelect.options[i].value === obj.tipo) {
        tiposelect.options[i].selected = true;
        break;
      }
    }

    var peligrosidadselect = document.getElementById("selectpeligrosidad");
    for (let i = 0; i < peligrosidadselect.options.length; i++) {
      if (peligrosidadselect.options[i].value === obj.peligrosidad) {
        peligrosidadselect.options[i].selected = true;
        break;
      }
    }

    var inputaspecto = document.getElementById("inputaspecto");
    inputaspecto.value = obj.aspecto;

    var inputnotas = document.getElementById("inputnotas");
    inputnotas.value = obj.notas;
  }

  añadirWesen() {
    var nuevoNombre = this.obtenerValorInput("inputname");

    var nuevaImg = this.obtenerValorInput("inputimagen");

    var nuevoTipo = this.obtenerValorSelect("selecttipos");

    var nuevaPeligrosidad = this.obtenerValorSelect("selectpeligrosidad");

    var nuevoAspecto = this.obtenerValorInput("inputaspecto");

    var nuevasNotas = this.obtenerValorInput("inputnotas");

    var nombreExistente = this.listawesens.find(wesen => wesen.nombre == nuevoNombre);

    if(nombreExistente){
      alert("Ese Wesen ya existe, por favor elige otro nombre");
    } else if (nuevoNombre && nuevaImg && nuevoTipo != "default" && nuevaPeligrosidad != "default" && nuevoAspecto) {
      var objetoNuevo = new Wesen(
        nuevoNombre,
        nuevaImg,
        nuevoTipo,
        nuevaPeligrosidad,
        nuevoAspecto,
        nuevasNotas
      );
      this.listawesens.push(objetoNuevo);
      this.crearTabla(this.listawesens);
      this.limpiarCampos();
    } else {
      alert("Debe rellenar todos los datos antes de añadir un nuevo Wesen");
    }
  }

  editarWesen() {
    var nuevoNombre = this.obtenerValorInput("inputname");

    if (nuevoNombre) {
      var nuevaImg = this.obtenerValorInput("inputimagen");

      var nuevoTipo = this.obtenerValorSelect("selecttipos");

      var nuevaPeligrosidad =  this.obtenerValorSelect("selectpeligrosidad");

      var nuevoAspecto = this.obtenerValorInput("inputaspecto");

      var nuevasNotas = this.obtenerValorInput("inputnotas");

      if(!nuevaImg || nuevoTipo == "default" || nuevaPeligrosidad == "default" || !nuevoAspecto){
        alert("Debe rellenar todos los campos para editar el Wesen");
      } else{
        var wesenIndex = this.listawesens.findIndex(
          (wesen) => wesen.nombre === nuevoNombre
        );

        if (wesenIndex !== -1) {
          this.listawesens[wesenIndex].nombre = nuevoNombre;
          this.listawesens[wesenIndex].imagen = nuevaImg;
          this.listawesens[wesenIndex].tipo = nuevoTipo;
          this.listawesens[wesenIndex].peligrosidad = nuevaPeligrosidad;
          this.listawesens[wesenIndex].aspecto = nuevoAspecto;
          this.listawesens[wesenIndex].notas = nuevasNotas;

          this.crearTabla(this.listawesens);
        } else {
          alert("No se encontró un Wesen con el nombre especificado.");
        }
      }
    } else {
      alert("Debes seleccionar un Wesen para poder editarlo.");
    }
  }

  borrarWesen() {
    var nombreABorrar = this.obtenerValorInput("inputname");

    if (nombreABorrar) {
      var wesenIndex = this.listawesens.findIndex(
        (wesen) => wesen.nombre === nombreABorrar
      );

      if (wesenIndex !== -1) {
        this.listawesens.splice(wesenIndex, 1);

        this.crearTabla(this.listawesens);

        this.limpiarCampos();
      } else {
        alert("No se encontró un Wesen con el nombre especificado.");
      }
    } else {
      alert("Debes seleccionar un Wesen para poder borrarlo.");
    }
  }

  obtenerValorInput(elementId) {
    return document.getElementById(elementId).value;
  }

  obtenerValorSelect(elementId) {
    const select = document.getElementById(elementId);
    return select.options[select.selectedIndex].value;
  }

  limpiarCampos() {
    var inputnombre = document.getElementById("inputname");
    inputnombre.value = "";

    var inputimg = document.getElementById("inputimagen");
    inputimg.value = "";

    var tiposelect = document.getElementById("selecttipos");
    tiposelect.value = "default";

    var peligrosidadselect = document.getElementById("selectpeligrosidad");
    peligrosidadselect.value = "default";

    var inputaspecto = document.getElementById("inputaspecto");
    inputaspecto.value = "";

    var inputnotas = document.getElementById("inputnotas");
    inputnotas.value = "";
  }
}

const instanciaMain = new main();

// document.addEventListener("DOMContentLoaded", function () {
//   instanciaMain.crearTabla(instanciaMain.listawesens);
// });