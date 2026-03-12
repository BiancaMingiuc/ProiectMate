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
    numar2 = genereazaRandom(1, 10); // Împărțitorul
    
    // Pas 3: Calculăm numărul mare (Deîmpărțitul)
    numar1 = rezultatAsteptat * numar2; 
    
    // Regula finală: Rezultatul corect pe care îl va verifica funcția verifica()
    rezultatCorect = rezultatAsteptat;

    // Afișăm pe ecran: numar1 : numar2 = ?
    document.getElementById('num1').innerText = numar1;
    document.getElementById('num2').innerText = numar2;
    document.getElementById('operator').innerText = " : ";

    const input = document.getElementById('raspuns');
    input.value = "";
    input.focus();
}

function executaGenerare(tip) {
    // Dacă tipul este MIXT, alegem la întâmplare o operație
    let tipEfectiv = tip;
    const elementTitlu = document.getElementById('titlu-operatie');
    
    if (tip === 'mixt') {
        const optiuni = ['adunare', 'scadere', 'inmultire', 'impartire'];
        tipEfectiv = optiuni[Math.floor(Math.random() * optiuni.length)];
        
        // Titlul va arăta și ce operație a picat la zar
        if (elementTitlu) {
            elementTitlu.innerText = "MIXTE: " + tipEfectiv.toUpperCase();
            elementTitlu.style.color = "#764ba2"; // Culoare specială pentru mixt
        }
    } else {
        // 2. Dacă e un mod fix, scriem exact numele operației
        if (elementTitlu) {
            elementTitlu.innerText = tip.toUpperCase();
            elementTitlu.style.color = "#2c3e50"; // Culoare normală
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
