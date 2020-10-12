function ejercicio_1() {

    let cadena = "My favorite dessert is jello";
    let caracter = window.prompt("Introduce un caracter: ");

    if (caracter == "") {
        caracter = window.prompt("Error texto vacío!. Introduce un caracter: ");
    }

    let resultado = cadena.indexOf(caracter);

    if (resultado != -1) {
        //console.log("El caracter " + caracter + " se encuentra en la posición: " + resultado);
        window.alert("El caracter " + caracter + " se encuentra en la posición: " + resultado);
    }
    else {
        //console.log("El caracter introducido no se encuentra.");
        window.alert("El caracter introducido no se encuentra.");
    }
}
