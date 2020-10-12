
function ejercicio8() {

    let driver1 = "abcd";
    let driver2 = window.prompt("Nombre del navegador: ");
    let mensaje = "Vaya, ambos nombres son iguales," + driver1.length + " caracteres!!";

    if (driver1.length > driver2.length) {
        mensaje = "The Driver tiene el nombre más largo, tiene " + driver1.length + " caracteres";
    }
    else if (driver2.length > driver1.length) {
        mensaje = "Yo, navegador tengo el nombre más largo, tiene " + driver2.length + " caracteres";
    }

    window.alert(mensaje);
}