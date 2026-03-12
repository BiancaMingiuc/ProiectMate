
// 1. Configurare Supabase (asigură-te că aceste rânduri sunt la începutul fișierului stats.js)
const SUPABASE_URL = 'https://enfqqsajxexyqesqsyne.supabase.co';
const SUPABASE_KEY = 'sb_publishable_8f72yEWJ4IhgqsMYwOLKZA_GDHHpQI6'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
//TABEL STATISTICI


// 2. Funcția ta modificată
async function finalizeazaSesiunea() {
    const numeSalvat = localStorage.getItem('nume_elev_mate') || "Anonim";

    if (corecte === 0 && gresite === 0) {
        showToast("Nicio activitate de salvat!");
        return;
    }

    
    // Trimitem datele asincron
    const { error } = await _supabase
        .from('rezultate_mate')
        .insert([
            { 
                nume_elev: numeSalvat, 
                tip_operatie: tipCurent.toUpperCase(), 
                scor_corecte: corecte, 
                scor_gresite: gresite 
            }
        ]);

    if (error) {
        console.error("Eroare la salvarea în Cloud:", error);
    }

    const tbody = document.getElementById('istoric-body');
    if (!tbody) return;

    const rand = tbody.insertRow(0); // Cele mai noi apar sus

    const acum = new Date();
    const ora = acum.getHours() + ":" + acum.getMinutes().toString().padStart(2, '0');
    
    const total = corecte + gresite;
    const procent = Math.round((corecte / total) * 100) + "%";

    // Adăugăm coloanele (Atenție: am adăugat coloana pentru NUME dacă ai modificat tabelul HTML)
    rand.insertCell(0).innerText = ora;
    rand.insertCell(1).innerText = numeSalvat 
    rand.insertCell(2).innerText = tipCurent.toUpperCase();
    rand.insertCell(3).innerText = corecte;
    rand.insertCell(4).innerText = gresite;
    rand.insertCell(5).innerText = procent;

    // Curățăm sesiunea și mergem la meniu (Codul tău original)
    corecte = 0; gresite = 0;
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.subtitle-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';

    showToast("Misiune finalizată! Datele au fost trimise în Cloud și în Statistici.");
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

        showToast("Istoricul a fost șters cu succes! 🗑️");
    }
}

function revinoLaMeniu() {
    // 1. Ascundem pagina de statistici
    document.getElementById('pagina-statistici').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'none';
    document.getElementById('zona-exercitiu').style.display = 'none';
    // 2. Afișăm înapoi meniul principal (cu FLEX ca să nu se strice grid-ul)
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.subtitle-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';
}