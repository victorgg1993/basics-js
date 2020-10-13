// 1
function palindromo() {

    let entrada = '';
    entrada = document.getElementById("entrada").value;
    entrada = limpiarEntrada(entrada);

    let resultado = esPalindromo(entrada);
    console.log("Es palíndromo?: ", resultado);
}

function limpiarEntrada(texto) {
    texto = texto.toLowerCase(); // minúsculas
    texto = texto.replace(/[!,."' ]/g, ''); // eliminamos símbolos
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // eliminamos acentos
    //console.log("entada: ", texto);
    return texto;
}

function esPalindromo(palin) {
    if (palin != undefined) {
        return (palin == palin.split('').reverse().join(''));
    }
    return false;
}

// 2
function lorem() {
    let texto = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
    Donec porta placerat arcu, et semper ipsum hendrerit non.Aliquam eget\ 
    magna arcu.Morbi et molestie turpis.Aliquam volutpat metus non aliquam\
    tempor.Ut tellus dolor, commodo quis imperdiet nec, tempus ut augue.Donec\
    fermentum, nisl vel bibendum auctor, libero lorem ultrices nisl, a ornare\
    ligula ipsum vitae quam.Nullam eu posuere mi.Quisque rhoncus vitae nisl vel\
    pharetra.Maecenas molestie arcu eget ultricies faucibus.Integer rhoncus odio\
    at mi vulputate, eu congue ex placerat.Maecenas lobortis finibus ex, ac\
    mollis leo mattis sit amet.Etiam eleifend tortor a nunc auctor, id\
    posuere odio bibendum.Nulla nisi nibh, semper sit amet mattis in, \
    dignissim sit amet est.Nunc vitae nibh pretium, vehicula lectus et, \
    imperdiet odio.Nulla facilisi.\n\n
    Cras tristique facilisis convallis.Integer est est, ornare sit amet\
    ligula nec, lacinia sagittis turpis.Vestibulum placerat quam eget\
    consequat gravida.Curabitur sed luctus lectus.Vivamus ultricies pharetra\
    nulla, sit amet ullamcorper ex semper quis.Proin sed cursus velit, ut\
    ultrices justo.Sed tellus magna, sollicitudin ultrices massa sed, pharetra\
    ultricies libero.Sed rhoncus orci non velit feugiat auctor.Phasellus nec odio\
    non risus consequat tristique.Quisque consequat, velit imperdiet aliquet laoreet, \
    magna nibh fringilla mauris, id sagittis risus enim eget leo.Cras ut dolor mi.Ut nec\
    quam pellentesque, egestas dui ac, porttitor purus.\n\n
    Aliquam arcu enim, egestas id vulputate ut, commodo nec nisl.Vivamus et ex in augue\
    ultrices venenatis sed sit amet dui.Pellentesque habitant morbi tristique senectus et\
    netus et malesuada fames ac turpis egestas.Integer porttitor pulvinar quam ac porta.Ut\
    imperdiet tellus vitae pulvinar consequat.Integer ultrices sapien eget leo tempus ultrices.\
    Quisque tempor magna id euismod vulputate.Quisque accumsan quis lacus sed venenatis.\
    Proin consequat dui ut est lobortis, id tincidunt augue venenatis.Class aptent taciti\
    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Phasellus sem\
    tortor, lobortis a malesuada vel, scelerisque sollicitudin metus.`;

    console.log("Número de palabras: ", texto.length);
    
    let numero_et = (texto.match(/et/g) || []).length;

    console.log("Número de veces que aparece \"et\": ", numero_et);

}