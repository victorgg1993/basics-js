
// genéricas
function button_trigger() {
    let respuesta = validar();
    print_message(respuesta);
}

// lógica
function procesar_edad() {

    let mensaje = "Error, los datos introducidos no son válidos";

    if (numero_valido()) { // validar entrada

        mensaje = calcular_edad();
    }
    return mensaje;
}

function calcular_edad() {
    let mensaje = "Te jubilas en " + (67 - leer_edad()) + " años."
    return mensaje;
}

// validación datos
function numero_valido() {

    let edad_tmp = leer_edad();
    edad_tmp = edad_tmp.trim(); // borramos espacios en blanco

    if (isNaN(edad_tmp) || edad_tmp == "" || edad_tmp < 0 || edad_tmp > 67) {
        return false;
    }
    return true;
}

// entradas
function leer_edad() {
    return document.getElementById("id_edad").value;
}

// salida
function print_message(mensaje) {
    //console.log("Respuesta:", mensaje);
    window.alert(mensaje);
}