

for (let i = 0; i <= 20; i++) {

    let mensaje = '';

    switch (i) {
        case 10:
            mensaje = "Diez!";
            break;
        case 20:
            mensaje = "Veinte!";
            break;
        default:
            mensaje = i;
            break;
    }

    console.log(mensaje);
}