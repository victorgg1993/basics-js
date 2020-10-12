
for (let i = 2; i <= 30; i += 2) {

    let arr_mensajes = [("El número: " + i), "Diez!", "Veinte!"];
    let par_impar = [" par", " impar"];
    let valor = 0;

    if (i != 10 && i != 20) { // si no es 10 o 20, mensaje normal
        valor = 0;
    }
    else {
        valor = (i / 10);
    }

    console.log(arr_mensajes[valor] + par_impar[(i % 2)]); // si es par => [0], si es impar =>[1]

    if (i == 30) { // una vez hechos los pares, tocan los impares
        i = -1;
    }
}
