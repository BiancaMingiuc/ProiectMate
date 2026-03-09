//TABEL STATISTICI

function afiseazaStatistici() {
    // Închidem sidebar-ul
    toggleSidebar();

    // 1. Ascundem tot restul
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.subtitle-container').style.display = 'none';
    document.querySelector('.meniu-principal').style.display = 'none';
    document.getElementById('zona-exercitiu').style.display = 'none';

    // 2. Afișăm pagina de statistici
    document.getElementById('pagina-statistici').style.display = 'block';
}


function finalizeazaSesiunea() {
    if (corecte === 0 && gresite === 0) {
        alert("Nicio activitate de salvat!");
        return;
    }
    const tbody = document.getElementById('istoric-body');
    if (!tbody) return;

    const rand = tbody.insertRow(0); // Cele mai noi apar sus

    const acum = new Date();
    const ora = acum.getHours() + ":" + acum.getMinutes().toString().padStart(2, '0');
    
    const total = corecte + gresite;
    const procent = Math.round((corecte / total) * 100) + "%";

    rand.insertCell(0).innerText = ora;
    rand.insertCell(1).innerText = tipCurent.toUpperCase();
    rand.insertCell(2).innerText = corecte;
    rand.insertCell(3).innerText = gresite;
    rand.insertCell(4).innerText = procent;

    // Curățăm sesiunea și mergem la meniu
    corecte = 0; gresite = 0;
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.subtitle-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';

    alert("Misiune finalizată! Datele au fost trimise în pagina de Statistici.");
}

function stergeIstoric() {
    // 1. Întrebăm utilizatorul dacă este sigur (ca să nu șteargă din greșeală)
    const confirmare = confirm("Ești sigur că vrei să ștergi tot istoricul? Această acțiune nu poate fi anulată!");

    if (confirmare) {
        // 2. Curățăm tabelul din HTML
        const tbody = document.getElementById('istoric-body');
        if (tbody) {
            tbody.innerHTML = "";
        }

        // 3. Ștergem datele din memoria browserului (LocalStorage)
        localStorage.removeItem('istoricMate');

        alert("Istoricul a fost șters cu succes! 🗑️");
    }
}

function revinoLaMeniu() {
    // 1. Ascundem pagina de statistici
    document.getElementById('pagina-statistici').style.display = 'none';

    // 2. Afișăm înapoi meniul principal (cu FLEX ca să nu se strice grid-ul)
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.subtitle-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';
}