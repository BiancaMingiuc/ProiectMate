function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    
    if (sidebar.style.width === "300px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "300px";
    }
}

function switchCategory(cat) {
    console.log("Schimbăm la categoria: " + cat);
    toggleSidebar(); // Închidem meniul după selecție
    alert("Secțiunea de " + cat + " va fi disponibilă în curând!");
}

function afiseazaStatistici() {
    const zona = document.getElementById('zona-statistici');
    zona.style.display = (zona.style.display === "none") ? "block" : "none";
}

let corecte = 0;
let gresite = 0;
let numar1 = 0;
let numar2 = 0;
let rezultatCorect = 0;
let tipCurent= "";


function actualizeazaAfisajScor() {
    const elCorecte = document.getElementById('scor-corecte');
    const elGresite = document.getElementById('scor-gresite');

    if (elCorecte) {
        elCorecte.innerText = corecte;
    }
    
    if (elGresite) {
        elGresite.innerText = gresite;
    }
}


function startJoc(tip){
    tipCurent = tip;
    corecte=0;
    gresite=0;
    document.querySelector('.header-container').style.display = 'none';
    document.querySelector('.meniu-principal').style.display = 'none';
    
    // Afișăm zona de lucru
    document.getElementById('zona-exercitiu').style.display = 'block';
    
    // Încărcăm scorul utilizatorului
    actualizeazaAfisajScor();

    executaGenerare(tip);

}

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

function executaGenerare(tip){
    switch(tip){
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
            console.error("tip necunoscut " + tip);
        }
}

function verifica(){
    const raspunsUser = parseInt(document.getElementById('raspuns').value);

    if (raspunsUser === rezultatCorect) {
        localStorage.setItem('scorUtilizator', corecte); // Salvăm în browser
        actualizeazaAfisajScor();
        alert("Felicitari! Ai raspuns corect");
        corecte++;
        
    } else {
        alert("Mai calculează o dată!");
        gresite++;
    }
    actualizeazaAfisajScor();
    executaGenerare(tipCurent);
}



function salveazaInTabel() {
    const tbody = document.getElementById('istoric-body');
    const rand = tbody.insertRow(0); // Adăugăm mereu sus (cel mai recent)

    const acum = new Date();
    const ora = acum.getHours() + ":" + acum.getMinutes().toString().padStart(2, '0');

    rand.insertCell(0).innerText = ora;
    rand.insertCell(1).innerText = tipCurent;
    rand.insertCell(2).innerText = corecte;
    rand.insertCell(3).innerText = gresite;
    
    // Resetăm contoarele după salvare ca să nu salvăm duplicat
    corecte = 0;
    gresite = 0;
}

function finalizeazaSesiunea() {
    if (corecte === 0 && gresite === 0) {
        alert("Nu ai făcut niciun exercițiu încă! 😊");
        return;
    }

    const tbody = document.getElementById('istoric-body');
    const randNou = tbody.insertRow(0);

    const acum = new Date();
    const ora = acum.getHours() + ":" + acum.getMinutes().toString().padStart(2, '0');

    randNou.insertCell(0).innerText = ora;
    randNou.insertCell(1).innerText = tipCurent.toUpperCase();
    randNou.insertCell(2).innerText = corecte;
    randNou.insertCell(3).innerText = gresite;

    // Resetăm și ne întoarcem
    corecte = 0; gresite = 0;
    toggleSidebar();
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.querySelector('.header-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';
}

function reseteazaTabel() {
    if(confirm("Ștergi tot istoricul?")) {
        document.getElementById('istoric-body').innerHTML = "";
    }
}