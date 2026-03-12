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
    
    executaGenerare(tip);

    actualizeazaAfisajScor();
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

//NOTIFICARE
function showToast(mesaj) {
    let container = document.getElementById('toast-container');

    // 2. Dacă NU există, îl creăm noi prin cod acum
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // 3. Creăm notificarea propriu-zisă
    const toast = document.createElement('div');
    toast.className = 'notificare-telefon'; // sau 'toast'
    toast.innerText = mesaj;
    container.appendChild(toast);

    // Îl ștergem automat după 3 secunde
    setTimeout(() => {
        toast.classList.add('dispare-toast');
        
        // Așteptăm să se termine animația CSS (500ms) apoi îl ștergem
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}


//SALVARE NUME UTILIZATOR
function incepeAventura() {
    const inputNume = document.getElementById('nume-start');
    const nume = inputNume.value.trim();

    if (nume.length < 2) {
        alert("Te rugăm să introduci un nume valid (minim 2 caractere).");
        return;
    }

    numeUtilizatorGlobal = nume;
    // Salvăm și în localStorage ca să nu-l mai cerem dacă dă refresh (opțional)
    localStorage.setItem('nume_elev_mate', nume);

    // Ascundem ecranul cu o animație lină
    const overlay = document.getElementById('welcome-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);

    showToast(`Succes, ${nume}!`);
}

// Dacă vrem să-l sărim pe viitor dacă numele există deja:
window.addEventListener('load', () => {
    const numeSalvat = localStorage.getItem('nume_elev_mate');
    if (numeSalvat) {
        numeUtilizatorGlobal = numeSalvat;
        document.getElementById('welcome-overlay').style.display = 'none';
    }
});


