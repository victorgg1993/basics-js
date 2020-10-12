

for (let i = 1; i <= 20; i++) {

    let par_impar = '';

    if ((i % 2)) {
        par_impar = "impar";
    }
    else {
        par_impar = "par";
    }

    console.log("El número: " + i + " " + par_impar);
}