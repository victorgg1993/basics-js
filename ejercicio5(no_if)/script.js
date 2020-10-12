/*
    Modificación del ejercicio 5
    sin usar if/else en la 
    comprobación de la edad

    if <= 14
    if 15~17
    if >=18

    En vez de eso, se usa
    la lógica del IC 74LS85
    programado a nivel de
    bits
*/

// genéricas
function procesar_pedido() {
    let respuesta = validar();
    print_message(respuesta);
}

function validar() {

    let mensaje = "Error, los datos introducidos no son válidos";

    if (numero_valido()) { // validar entrada

        let indice = calcular_edad();
        mensaje = Function.prototype.call.call(arrayFunciones[indice]);
    }
    return mensaje;
}

var arrayFunciones = [
    // en función del valor que devuelva 
    // calcular_edad(), devolveremos 
    // un valor del array
    procesar_menor_o_igual_14,
    procesar_mayor_14_menor_18,
    procesar_mayor_18
]

// lógica
function calcular_edad() {

    // El comparador binario 12 bit devuelve:
    // a>b => return 1
    // a==b => return 2
    // a<b => return 4
    // Como se busca un 0,1,2 para manipular un array,
    // desplazamos un bit ese resultado ( resultado >>= 1)

    let edad = leer_edad();

    let menor_15 = comparador_binario_12bit(edad, 15);
    let mayor_17 = comparador_binario_12bit(edad, 17);

    let bit_menor_15 = ((menor_15 >> 0x02) & 0x01);
    let bit_mayor_17 = ((mayor_17 >> 0x00) & 0x01);
    let entre_15_y_17 = (!bit_menor_15) & (!bit_mayor_17);

    let resultado = ((bit_mayor_17 << 2) | (entre_15_y_17 << 1) | (bit_menor_15 << 0));
    resultado >>= 1;

    return resultado;
}

function comparador_binario_4bit(elem_A, elem_B, cascada_input) {

    // Obra enfermiza del diablo ( lógica del 74LS85 ):

    // Resúmen: se imita a nivel de puertas lógicas
    // el circuito integrado 74LS85, que es un chip que
    // permite comparar dos números de 4 bits.
    //
    // Como 4 bits serían muy pocos para la edad ( 2⁴ = 15),
    // se usaron x3 comparadores en cascada, logrando así
    // 12 bits ( 2¹² = 4096). Realmente con 8 bits sería
    // más que suficiente.

    // Las variables Anº, Bnº simplemente contienen un bit
    // de cada posición de la variable elem_X. Lo que se
    // está haciendo aquí es trabajar a nivel de bit
    // para poderlo procesar con el comparador de 4 bits.

    let A0 = ((elem_A >> 0) & 0x01); // bit 0
    let A1 = ((elem_A >> 1) & 0x01); // bit 1
    let A2 = ((elem_A >> 2) & 0x01); // bit 2
    let A3 = ((elem_A >> 3) & 0x01); // bit 3

    let B0 = ((elem_B >> 0) & 0x01); // bit 0
    let B1 = ((elem_B >> 1) & 0x01); // bit 1
    let B2 = ((elem_B >> 2) & 0x01); // bit 2
    let B3 = ((elem_B >> 3) & 0x01); // bit 3

    // Estas tres variables permiten conectar los comparadores
    // en cascada, ya que en función del resultado anterior,
    // afectan al siguiente comparador conectado en cascada.
    let A_mayor_B = ((cascada_input >> 0) & 0x01); // bit 0 ( a>b, 0)
    let A_igual_B = ((cascada_input >> 1) & 0x01); // bit 1 ( a==b, 1)
    let A_menor_B = ((cascada_input >> 2) & 0x01); // bit 2 ( a<b, 2)

    // A partir de aquí necesitas mirar la imagen adjunta 
    // al proyecto o leer el datsheet. Lo que hay aquí
    // es la representación lógica a nivel de puertas del
    // comparador de 4 bit 74LS85.
    //
    // Notas:
    // ! = puerta NOT
    // & = puerta AND
    // | = puerta OR
    //
    //-------------------------<comparador>
    let Q1 = !(A3 & B3);
    let Q2 = !(A2 & B2);
    let Q3 = !(A1 & B1);
    let Q4 = !(A0 & B0);

    let N0 = !((A3 & Q1) | (B3 & Q1));
    let N1 = !((A2 & Q2) | (B2 & Q2));
    let N2 = !((A1 & Q3) | (B1 & Q3));
    let N3 = !((A0 & Q4) | (B0 & Q4));

    let M0 = (B3 & Q1);
    let M1 = (B2 & Q2 & N0);
    let M2 = (B1 & Q3 & N0 & N1);
    let M3 = (B0 & Q4 & N0 & N1 & N2);
    let M4 = (N0 & N1 & N2 & N3 & A_menor_B);
    let M5 = (N0 & N1 & N2 & N3 & A_igual_B); // tmp: repetit M6, treure?
    let M6 = (A_igual_B & N3 & N2 & N1 & N0);
    let M7 = (A_mayor_B & N3 & N1 & N2 & N0);
    let M8 = (N2 & N1 & N0 & Q4 & A0);
    let M9 = (N1 & N0 & Q3 & A1);
    let M10 = (N0 & Q2 & A2);
    let M11 = (Q1 & A3);

    // Estos son los bits del resultado ( a>b, a==b, a<b)
    let a_may_b = ((!M0) & (!M1) & (!M2) & (!M3) & (!M4) & (!M5)); // a > b ( 0 )
    let a_ig_b = (A_igual_B & N3 & N2 & N1 & N0); // a == b ( 1 )
    let a_men_b = ((!M6) & (!M7) & (!M8) & (!M9) & (!M10) & (!M11));  // a < b ( 2 )
    //-------------------------</comparador>

    // Aquí empaquetamos los 3 bits anteriores para devolver
    // únicamente una variable. El primer bit es a>b,
    // el segundo a==b y el tercero a<b.
    return (((a_men_b & 0x01) << 2) | ((a_ig_b & 0x01) << 1) | ((a_may_b & 0x01) << 0));
}

function comparador_binario_12bit(elem_A, elem_B) {
    // x3 comparadores de 4 bit en cascada
    let r0 = comparador_binario_4bit(elem_A, elem_B, 0x02);
    let r1 = comparador_binario_4bit((elem_A >> 4), (elem_B >> 4), r0);
    let salida = comparador_binario_4bit((elem_A >> 8), (elem_B >> 8), r1);

    return salida;
}

function procesar_menor_o_igual_14() {

    let bebida = leer_bebida();

    if (bebida == "cerveza" || bebida == "coca-cola") {
        return "Lo siento eres pequeño";
    }

    return generar_mensaje();
}

function procesar_mayor_14_menor_18() {

    if (leer_bebida() == "cerveza") {
        return "Lo siento eres pequeño";
    }

    return generar_mensaje();
}

function procesar_mayor_18() {

    return generar_mensaje();
}

// validación datos
function numero_valido() {

    let edad_tmp = leer_edad();
    edad_tmp = edad_tmp.trim(); // borramos espacios en blanco

    if (isNaN(edad_tmp) || edad_tmp == "" || edad_tmp < 0 || edad_tmp > 500) {
        return false;
    }
    return true;
}

// entradas
function leer_edad() {

    return document.getElementById("id_edad").value;
}

function leer_bebida() {
    let e = document.getElementById("id_bebidas");
    return e.options[e.selectedIndex].value;
}

// salida
function generar_mensaje() {
    return (`OK toma tu ${leer_bebida()}`);
}

function print_message(mensaje) {
    console.log("Respuesta:", mensaje);
}