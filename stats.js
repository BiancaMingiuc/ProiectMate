// Configurare Supabase 
const SUPABASE_URL = 'https://enfqqsajxexyqesqsyne.supabase.co';
const SUPABASE_KEY = 'sb_publishable_8f72yEWJ4IhgqsMYwOLKZA_GDHHpQI6'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


//TABEL STATISTICI

async function finalizeazaSesiunea() {
    const numeSalvat = localStorage.getItem('nume_elev_mate') || "Anonim";

    if (corecte === 0 && gresite === 0) {
        showToast("Nicio activitate de salvat!");
        return;
    }

    
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

    const rand = tbody.insertRow(0); 

    const acum = new Date();
    const ora = acum.getHours() + ":" + acum.getMinutes().toString().padStart(2, '0');
    
    const total = corecte + gresite;
    const procent = Math.round((corecte / total) * 100) + "%";

    rand.insertCell(0).innerText = ora;
    rand.insertCell(1).innerText = numeSalvat 
    rand.insertCell(2).innerText = tipCurent.toUpperCase();
    rand.insertCell(3).innerText = corecte;
    rand.insertCell(4).innerText = gresite;
    rand.insertCell(5).innerText = procent;

    corecte = 0; gresite = 0;
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.subtitle-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';

    showToast("Misiune finalizată! Datele au fost trimise în Cloud și în Statistici.");
}

function stergeIstoric() {
    const confirmare = confirm("Ești sigur că vrei să ștergi tot istoricul? Această acțiune nu poate fi anulată!");

    if (confirmare) {
        const tbody = document.getElementById('istoric-body');
        if (tbody) {
            tbody.innerHTML = "";
        }

        localStorage.removeItem('istoricMate');

        showToast("Istoricul a fost șters cu succes! 🗑️");
    }
}

function revinoLaMeniu() {
    document.getElementById('pagina-statistici').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'none';
    document.getElementById('zona-exercitiu').style.display = 'none';

    document.querySelector('.header').style.display = 'block';
    document.querySelector('.subtitle-container').style.display = 'block';
    document.querySelector('.meniu-principal').style.display = 'flex';
}