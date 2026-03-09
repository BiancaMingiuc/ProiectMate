//START
function startJoc(tip){
    tipCurent = tip;
    corecte=0;
    gresite=0;
    document.querySelector('.header-container').style.display = 'none';
    document.querySelector('.meniu-principal').style.display = 'none';
    document.querySelector('.subtitle-container').style.display = 'none';
    
    // Afișăm zona de lucru
    document.getElementById('zona-exercitiu').style.display = 'block';
    
    // Încărcăm scorul utilizatorului
    actualizeazaAfisajScor();

    executaGenerare(tip);

}


//ACTUALIZARE SCORURI
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


//SALVARE IN TABEL
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


