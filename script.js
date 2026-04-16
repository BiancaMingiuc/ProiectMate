function verifica() {
    const input = document.getElementById('raspuns');
    const zonaCalcul = document.querySelector('.display-calcul');
    const valoare = parseInt(input.value);

    if (isNaN(valoare)) return;

    if (valoare === rezultatCorect) {
        corecte++;
        input.classList.add('input-verde');
        
        setTimeout(() => {
            zonaCalcul.classList.add('dispare');
            input.classList.add('dispare');
            
            setTimeout(() => {
                executaGenerare(tipCurent);
                input.classList.remove('input-verde', 'dispare');
                zonaCalcul.classList.remove('dispare');
                input.value = "";
                input.focus();
            }, 300); 
        }, 500); 

    } else {
        gresite++;
        input.classList.add('input-rosu');
        
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
    if (e.key === 'Enter') {
        const input = document.getElementById('raspuns');
        if (document.activeElement === input) {
            verifica();
        }
    }
});