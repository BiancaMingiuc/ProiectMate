function verifica() {
    const input = document.getElementById('raspuns');
    const zonaCalcul = document.querySelector('.display-calcul');
    const valoare = parseInt(input.value);

    if (isNaN(valoare)) return;

    if (valoare === rezultatCorect) {
        // --- CORECT ---
        corecte++;
        input.classList.add('input-verde');
        
        // Așteptăm puțin să vadă culoarea, apoi facem să dispară
        setTimeout(() => {
            zonaCalcul.classList.add('dispare');
            input.classList.add('dispare');
            
            setTimeout(() => {
                // Generăm următorul exercițiu și resetăm stilul
                executaGenerare(tipCurent);
                input.classList.remove('input-verde', 'dispare');
                zonaCalcul.classList.remove('dispare');
                input.value = "";
                input.focus();
            }, 300); // Timp pentru animația de dispariție
        }, 500); // Timp în care stă verde

    } else {
        // --- GRESIT ---
        gresite++;
        input.classList.add('input-rosu');
        
        // Lăsăm culoarea roșie puțin, apoi curățăm să mai încerce
        setTimeout(() => {
            input.classList.remove('input-rosu');
            input.value = "";
            input.focus();
        }, 800);
    }
    
    actualizeazaAfisajScor();
}

//APASAREA TASTEI ENTER EFECT
document.addEventListener('keypress', function (e) {
    // Verificăm dacă tasta apăsată este Enter (cod 13)
    if (e.key === 'Enter') {
        const input = document.getElementById('raspuns');
        // Dacă inputul este activ (focus), verificăm rezultatul
        if (document.activeElement === input) {
            verifica();
        }
    }
});