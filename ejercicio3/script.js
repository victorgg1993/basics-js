
function ejercicio_3() {

    let seed = "abcdefghijklmnopqrstuvwxyz";
    let num_random = Math.floor(Math.random() * seed.length);
    let rand_char = seed[num_random];

    let texto = window.prompt("Introduce un texto: ");
    texto = texto.toLowerCase();
    window.alert("La entrada \"" + texto + "\" contiene " + rand_char + "?: " + texto.includes(rand_char));
}
