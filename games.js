//BINGO
function startBingo() {
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'none';

    document.getElementById('bingo-wrapper').style.display = 'block';
    
    document.getElementById('bingo-selectie-categorie').style.display = 'block';
    document.getElementById('bingo-joc-activ').style.display = 'none';
}

function initiazaBingo(tip){
    tipBingoCurent = tip;
    celuleBingo = [];
    dimensiuneGrid = (tip === 'inmultire') ? 5 : 3;
    let totalCelule = dimensiuneGrid * dimensiuneGrid;

    while (celuleBingo.length < totalCelule){
        if (tip === 'inmultire'){
            let n1,n2,produs;
            do{
                n1=genereazaRandom(1,10);
                n2=genereazaRandom(1,10);
                produs = n1*n2;
            } while (celuleBingo.some(c => c.valoare === produs));

            celuleBingo.push ({ valoare: produs, text: `${n1} x ${n2}`, stare: 'liber' });
        }else{
            let cat, d, i;
            do{
                cat = genereazaRandom(1,10);
            }while (celuleBingo.some(c => c.valoare == cat));

            i = genereazaRandom(1,10);
            d = cat*i;
            celuleBingo.push({ valoare: cat, text: `${d} : ${i}`, stare: 'liber'});
        }
    }

    celuleBingo.sort(() => Math.random() - 0.5);
    deseneazaGridBingo();
    genereazaIntrebareNoua();

    document.getElementById('bingo-selectie-categorie').style.display = 'none';
    document.getElementById('bingo-joc-activ').style.display = 'block';
}


function deseneazaGridBingo() {
    const grid = document.getElementById('bingo-grid');
    
    grid.innerHTML = "";
    
    grid.className = `bingo-grid grid-${dimensiuneGrid}x${dimensiuneGrid}`; 

    celuleBingo.forEach((celula, index) => {
        const btn = document.createElement('button'); 
        btn.className = 'bingo-cell';                 
        btn.innerText = celula.valoare;               
        btn.id = `bingo-btn-${index}`;                
        
        btn.onclick = () => verificaRaspunsBingo(celula.valoare, index, btn);
        
        grid.appendChild(btn);
    });
}


function genereazaIntrebareNoua(){
    let celuleDisponibile = celuleBingo.filter(c => c.stare === 'liber');

    if (celuleDisponibile.length === 0 ){
        document.getElementById('operatie-bingo').innerText = 'Joc Terminat';
        return;
    }

    let indexAleator = Math.floor(Math.random() * celuleDisponibile.length);
    let celulaAleasa = celuleDisponibile[indexAleator];
    
    raspunsCorectBingo = celulaAleasa.valoare;
    document.getElementById('operatie-bingo').innerText = celulaAleasa.text;
}


function verificaRaspunsBingo(valoareAleasa, index, butonHtml) {
    if (celuleBingo[index].stare !== 'liber') return;

    if (valoareAleasa === raspunsCorectBingo) {
        // --- CORECT ---
        butonHtml.style.backgroundColor = "#4CAF50"; 
        butonHtml.style.color = "white";
        butonHtml.style.borderColor = "#2e7d32";
        butonHtml.style.pointerEvents = "none"; 
        
        celuleBingo[index].stare = 'verde'; 
        corecte++; 

        if (verificaDacaAvemBingo()) {
            document.getElementById('modal-bingo').style.display = 'flex';
        } else {
            setTimeout(genereazaIntrebareNoua, 400); 
        }

    } else {
        butonHtml.style.backgroundColor = "#F44336"; 
        butonHtml.style.color = "white";
        butonHtml.style.borderColor = "#c62828";
        butonHtml.style.pointerEvents = "none"; 
        
        celuleBingo[index].stare = 'rosu'; 
        gresite++;
        
    }
}

function verificaDacaAvemBingo() {
    let d = dimensiuneGrid;
    
    // Linii
    for (let rand = 0; rand < d; rand++) {
        let linieCompleta = true;
        for (let col = 0; col < d; col++) {
            if (celuleBingo[rand * d + col].stare !== 'verde') linieCompleta = false;
        }
        if (linieCompleta) return true;
    }

    // Coloane
    for (let col = 0; col < d; col++) {
        let coloanaCompleta = true;
        for (let rand = 0; rand < d; rand++) {
            if (celuleBingo[rand * d + col].stare !== 'verde') coloanaCompleta = false;
        }
        if (coloanaCompleta) return true;
    }

    // Diag1
    let diag1Completa = true;
    for (let i = 0; i < d; i++) {
        if (celuleBingo[i * d + i].stare !== 'verde') diag1Completa = false;
    }
    if (diag1Completa) return true;

    // Diag2
    let diag2Completa = true;
    for (let i = 0; i < d; i++) {
        if (celuleBingo[i * d + (d - 1 - i)].stare !== 'verde') diag2Completa = false;
    }
    if (diag2Completa) return true;

    return false;
}

function reincepeBingo() {
    console.log("Resetăm jocul..."); 
    document.getElementById('modal-bingo').style.display = 'none';
    
    initiazaBingo(tipBingoCurent); 
}

function inchideSesiuneaBingo() {
    console.log("Ne întoarcem la meniu..."); 
    tipCurent = "BINGO: " + tipBingoCurent.toUpperCase();

    finalizeazaSesiunea();

    document.getElementById('modal-bingo').style.display = 'none';
    document.getElementById('bingo-wrapper').style.display = 'none';
    document.getElementById('meniu-principal').style.display = 'none';
    
    document.getElementById('pagina-jocuri').style.display = 'block';
    
    corecte = 0;
    gresite = 0;
}