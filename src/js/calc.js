const display = document.getElementById('display');
const displayText = document.getElementById('display').textContent;
const igual = document.getElementById('igual');
const apagar = document.getElementById('apagar');
const maismenos = document.getElementById('maismenos');
const limparTudo = document.getElementById('limparTudo');
const porcentagem = document.getElementById('porcentagem');
const virg = document.getElementById('virg');

// querySelectorAll para pegar todos os id que contem "num"
// querySelectorAll para pegar todos os id que contem "sinal"
const nums = document.querySelectorAll("[id*=num]")
const operadores = document.querySelectorAll("[id*=sinal]")

// primeiro numero igual a true
// operador para armazenar o primeiro operador clicado
// numero anterior para armazenar o numero que foi clicado antes do operador
let primeiro = true;
let operador = null;
let numeroAnterior = null;
let numeroAtual = null;
let apagarIgual = null;

// variavel para pegar todo historico
const historico = [];

// variavel para mostrar a virgula no visor
const ajustaPontoVirgula = () => display.textContent = display.textContent.replace('.', ',');

// função inserirDisplay para receber o texto e verificar as informações do visor
const inserirDisplay = text => {

    if (primeiro){
        display.textContent = text
        primeiro = false
    } else {
        display.textContent += text //para concatenar o que vier depois do primeiro
    }

    numeroAtual = parseFloat(display.textContent.replaceAll(',', '.')).toFixed(2); 
    display.textContent = display.textContent.substring(0, 17) //maximo de numeros na calculadora

    // console.log(display.textContent.substring(0, 17), `numero de caracteres ${display.textContent.substring(0, 17).length}`)
    // console.log(numeroAtual)
    
    apagarIgual = true; // para apagar a conta do visor 
}
//função para exibir valores no visor
// forEach = ṕara cada item do for each que ele atribua o evento do clique
// e para evento do clique, chamar a função inserir
const inserir = e => inserirDisplay(e.target.textContent)
nums.forEach(e => e.addEventListener('click', inserir))

// forEach = para cada item do for each que ele atribua o evento do clique para os operadores
const inserirOperador = (element) => {
    primeiro = true;
    operador = element.target.textContent;

    // alterando os operadores para o sistemar ler corretamente
    // if(operador === 'x'){
    //     operador = '*'
    // } else if (operador === '÷') {
    //     operador = '/'
    // }
    numeroAnterior = parseFloat(display.textContent.replaceAll(',', '.')).toFixed(2); 
}
operadores.forEach(e => e.addEventListener('click', inserirOperador))

const resultCalculo = (valorInicial = 0, operador = '', valorFinal = 0) => {
    console.log(valorInicial, operador, valorFinal)

    if (operador.includes('+')) {
        return valorInicial + valorFinal
    } else if(operador.includes('-')){
        return valorInicial - valorFinal
    } else if(operador.includes('÷')){
        return valorInicial / valorFinal
    } else if(operador.includes('x')){
        return valorInicial * valorFinal
    } else {
        console.error('Operador não correspondente')
    }
}

//função para calcular os numeradores e os operadores
const calcular = () => {

    if (numeroAnterior && operador){
        // let result = numeroAnterior + operador
        // console.log(operador)
        // console.log(typeof(operador))
        console.log(resultCalculo(parseFloat(numeroAnterior), operador, parseFloat(numeroAtual)))

        // if(numeroAtual){
        //     result += numeroAtual;
        // } else {
        //     result += numeroAnterior;
        // }

        // console.log(typeof(result))
        console.log('hello world')
        let result = '0,0'
        
        //eval() função javascript que efetua calculos
        //replace para alterar a virgula para o ponto - javascript não aceita virgulas
        display.textContent = eval(result.replace(',', '.'))
        // display.textContent = eval(result.replace(',', '.'))
        ajustaPontoVirgula();


        //arrumando possiveis erros
        if (display.textContent === 'NaN')
        display.textContent = '0';

        numeroAnterior = display.textContent;
        primeiro = true;
        apagarIgual = false;
    }
}

igual.addEventListener('click', calcular)

// apaga o ultimo numero
// condição que não pode apagar o resultado!
// if para verificar se apagarIgual estiver true
// slice para pegar a ultima posição do visor e apagar o ultimo
// else caso não tenha mais numeros para apagar, ele deve retornar 0
const apagarUltimo = () => {
    if (apagarIgual){
        if(display.textContent.length > 1){ 
            display.textContent = display.textContent.slice(0, -1)
        } else {
            display.textContent = 0
        }
        primeiro = true; // voltar ao ponto inicial
    };
}
apagar.addEventListener('click', apagarUltimo)

// função para o botão +/- para inverter o sinal do numero
// sendo um numero positivo vezes menos 1, se torna positivo e vice versa
const inverteSinal = () => {
    display.textContent = parseFloat(display.textContent.replace(',', '.')) *-1
    ajustaPontoVirgula()
}
maismenos.addEventListener('click', inverteSinal)

//função para limpar tudo da tela
const limpaTudo = () => {
    display.textContent = '0'; //mostra o numero 0 na tela
    numeroAnterior = '0'; // reseta qualquer numero clicado antes
    numeroAtual = '0'; // e reseta qualquer numero clicado agora
    primeiro = true; // voltar ao ponto inicial
}
limparTudo.addEventListener('click', limpaTudo)

const calcPorcentagem = () => {
    // resultCalculo()
    console.log('to aqui')
    console.log(display.textContent)
    display.textContent = parseFloat(display.textContent.replace(',', '.')) / 100
    ajustaPontoVirgula()
    numeroAtual = display.textContent;
    primeiro = true;
}
porcentagem.addEventListener('click', calcPorcentagem)

// const insereVirg = () => {
//     if (display.textContent.indexOf(',') == -1){
//         display.textContent += ','
//     }
// }
// virg.addEventListener('click', insereVirg)



const decimal = () => display.textContent.indexOf(',') !== -1;
const inserirDecimal = () => {
    if(!decimal()){
        if(display.textContent.length > 0){
            display.textContent = display.textContent.replace(',', '.') + ','
            ajustaPontoVirgula()
        } else {
            display.textContent = display.textContent.replace(',', '.') + '0,'
            ajustaPontoVirgula()
        }
    }
}

virg.addEventListener('click', inserirDecimal)
