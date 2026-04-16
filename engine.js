function genereazaRandom(min, max){
    let n = Math.floor(Math.random()* (max - min + 1)) + min;
    return n;
}

function genereazaAdunare(){
    let numar1 = genereazaRandom(1,100);
    let numar2 = genereazaRandom(1,100);
    rezultatCorect = numar1 + numar2;

    document.getElementById('num1').innerText = numar1;
    document.getElementById('num2').innerText = numar2;
    document.getElementById('operator').innerText = " + ";

    const input = document.getElementById('raspuns')
    input.value = "";
    input.focus();
}

function genereazaScadere(){
    let numar1 = genereazaRandom(10,100);
    let numar2 =0;
    do{
        numar2 = genereazaRandom(1,90);
    }while(numar2>numar1);
    rezultatCorect = numar1 - numar2;

    document.getElementById('num1').innerText = numar1;
    document.getElementById('num2').innerText = numar2;
    document.getElementById('operator').innerText = " - ";

    const input = document.getElementById('raspuns')
    input.value = "";
    input.focus();
}

function genereazaInmultire(){
    let numar1 = genereazaRandom(0,10);
    let numar2 = genereazaRandom(0,11);
    rezultatCorect = numar1 * numar2;

    document.getElementById('num1').innerText = numar1;
    document.getElementById('num2').innerText = numar2;
    document.getElementById('operator').innerText = " * ";

    const input = document.getElementById('raspuns')
    input.value = "";
    input.focus();
}

function genereazaImpartire() {
    let rezultatAsteptat = genereazaRandom(1, 10);
    numar2 = genereazaRandom(1, 10); 
    
    numar1 = rezultatAsteptat * numar2; 
    
    rezultatCorect = rezultatAsteptat;

    document.getElementById('num1').innerText = numar1;
    document.getElementById('num2').innerText = numar2;
    document.getElementById('operator').innerText = " : ";

    const input = document.getElementById('raspuns');
    input.value = "";
    input.focus();
}

function executaGenerare(tip) {
    let tipEfectiv = tip;
    const elementTitlu = document.getElementById('titlu-operatie');
    
    if (tip === 'mixt') {
        const optiuni = ['adunare', 'scadere', 'inmultire', 'impartire'];
        tipEfectiv = optiuni[Math.floor(Math.random() * optiuni.length)];
        
        if (elementTitlu) {
            elementTitlu.innerText = "MIXTE: " + tipEfectiv.toUpperCase();
            elementTitlu.style.color = "#764ba2"; 
        }
    } else {
        if (elementTitlu) {
            elementTitlu.innerText = tip.toUpperCase();
            elementTitlu.style.color = "#2c3e50"; 
        }
    }

    switch(tipEfectiv){
        case 'adunare':
            genereazaAdunare();
            break;
        case 'scadere':
            genereazaScadere();
            break;
        case 'inmultire':
            genereazaInmultire();
            break;
        case 'impartire':
            genereazaImpartire();
            break;
        default:
            console.error("tip necunoscut " + tipEfectiv);
        }
}
