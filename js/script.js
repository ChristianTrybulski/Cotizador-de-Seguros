// Cotizador de Seguros de Autos Online


let marcaNombre = ["","",""];


window.addEventListener("load", function(event) {

    //Storage
    if(this.localStorage.observacion !== "undefined"){
        this.document.getElementById("observacion").value = this.localStorage.observacion;
    }else {
        this.document.getElementById("observacion").value = ""
    }
    cargarMarcas();

    let yearSelect = document.getElementById("year");
    var optionSeleccionar = document.createElement("option");
    optionSeleccionar.text = "-- Seleccione --";
    yearSelect.add(optionSeleccionar);
    for(let indexFor = 2000; indexFor < 2023; indexFor++){
        var optionYear = document.createElement("option");
        optionYear.text = indexFor;
        optionYear.value = indexFor;
        yearSelect.add(optionYear); 
    }
  });

// Estructura Iterativa
for (let index = 0; index < 3; index++) {
    switch(index){
        case 0: marcaNombre[0] = "Americano"; break;
        case 1: marcaNombre[1] = "Europeo"; break;
        case 2: marcaNombre[2] = "Asiatico"; break;
    }
}

const cargarMarcas = () => {
    let marcaSelect = document.getElementById("marca");
    var optionSeleccionar = document.createElement("option");
    optionSeleccionar.text = "-- Seleccione --";
    marcaSelect.add(optionSeleccionar);
    var optionAmericano = document.createElement("option");
    optionAmericano.text = "Americano";
    optionAmericano.value = "0"
    marcaSelect.add(optionAmericano);
    var optionEuropeo = document.createElement("option");
    optionEuropeo.text = "Europeo";
    optionEuropeo.value = "1"
    marcaSelect.add(optionEuropeo);
    var optionAsiatico = document.createElement("option");
    optionAsiatico.text = "Asiatico";
    optionAsiatico.value = "2"
    marcaSelect.add(optionAsiatico);
}



// Evento llamado con onclick
const cotizarSeguro = () => {
    // Objeto
    let formulario = {
        marca: document.querySelector("#marca").value,
        year: document.querySelector("#year").value,
        basico: document.querySelector("#basico").checked,
        completo: document.querySelector("#completo").checked
    }

    let divResumen = document.querySelector("#resumen");
    let divResultado = document.querySelector("#resultado");
    divResultado.style.display = "none";
    let plan = "";

    // JSON
    let valuePlanes = {"Basico":"Basico", "Completo": "Completo"}

    // Operador Ternario
    formulario.basico ? (
        plan = valuePlanes["Basico"]
    ) : (
        formulario.completo ? (
            plan = valuePlanes["Completo"]
        ) : (
            plan = ""
        )
    )
    

    // Operador logico OR
    if(formulario.marca ==='' || formulario.year==='' || plan===''){
       mostrarError("#msj-error-cotizador", "FALTA SELECCIONAR OPCIONES");
    } else {
       let marca = formulario.marca
       let year = formulario.year
       let cotizacion = { marca, year, plan };

       divResumen.style.backgroundcolor = "#FFF";
       divResumen.style.display = "block";

       divResumen.innerHTML=`<div style="text-aling:center">
                                <img src="img/loading-36.gif" width=300 height=300>
                                </div>`;

        
        let marcaNombreSel = marcaNombre[formulario.marca];

       setTimeout(() => {
          divResumen.style.backgroundcolor = "#fff";
          divResumen.innerHTML = `<h5> Resumen de Cotización </h5>
                                  <hr>
                                  <ul>
                                    <li>Marca: ${marcaNombreSel}</li>
                                    <li>Plan: ${plan}</li>
                                    <li>Año: ${formulario.year}</li>
                                    <li>Observacion: ${localStorage.observacion}</li>
                                  </ul>`;
          let cotizacionFinal = cotizar(cotizacion);
          divResultado.style.display = "block";
          divResultado.className = "divResultado";
          divResultado.innerHTML = '<p class="textoCotizacion">$' +cotizacionFinal + '</p>';
          // Envio de mail por POST
          enviarMail(cotizacion, cotizacionFinal);
        }, 2000);
    }

}

const cotizar = (cotizacion) => {
    // Desestructuración
    const { marca, year, plan } = cotizacion;
    let resultado = 2000;

    const diferenciaYear = diferencia(year);
    resultado -= ((diferenciaYear * 3) * resultado) / 100;
    resultado = calcularMarca(marca) * resultado;
    const incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    return resultado;
}

const obtenerPlan = plan => {
    return (plan === 'Basico') ? 1.20 : 1.50;
}

const calcularMarca = marca => {
    // Array
    let valoresIncremento = [1.15,1.30,1.05];
    // Spread
    let marcaIncremento = [...valoresIncremento];
    let incremento = marcaIncremento[marca];
    return incremento;
}

// Funcion de orden superior
function diferenciaAno(yearActual) {
    return (yearSel) => yearActual - yearSel; 
}

const diferenciaAnoActual = diferenciaAno(new Date().getFullYear());

const diferencia = (year) => {
    return diferenciaAnoActual(year);
}

const mayuscula = (palabra) => {
    return palabra.charArt(0).toUpperCase() + palabra.slice(1);
}

const mostrarError = (elemento, mensaje) => {
    // DOM
    divError = document.querySelector(elemento);
    divError.innerHTML = '<p class="alert alert-danger error">'+mensaje+'</p>';
    setTimeout(() => { divError.innerHTML = ''; }, 3000);
}

// Storage
const guardarObservacionLocalStorage = () => {
    localStorage.observacion = document.getElementById("observacion").value;
}

// Libreria Sweet Alert
let boton = document.getElementById('boton')
boton.addEventListener('click', mostrarAlert)
function mostrarAlert() {    
    Swal.fire({
    icon: 'info',
    title: 'Aviso',
    text: 'Seleccione marca, año y tipo de seguro',
   })
}