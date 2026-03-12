//BINGO
function startBingo() {
    // 1. Ascundem meniul de jocuri
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'none';

    // 2. Afișăm "pagina" de Bingo
    document.getElementById('bingo-wrapper').style.display = 'block';
    
    // 3. Ne asigurăm că arătăm butoanele de selecție și ascundem grila
    document.getElementById('bingo-selectie-categorie').style.display = 'block';
    document.getElementById('bingo-joc-activ').style.display = 'none';
}

function initiazaBingo(tip){
    tipBingoCurent = tip;
    tipCurent = "BINGO: " +tip.toUpperCase;
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


// 2. Desenează grila pe ecran
function deseneazaGridBingo() {
    // Găsim containerul unde vom pune butoanele
    const grid = document.getElementById('bingo-grid');
    
    // Curățăm orice butoane vechi (în caz că dăm "Joacă din nou")
    grid.innerHTML = "";
    
    // Îi dăm clasa corectă de CSS pentru a le așeza (grid-3x3 sau grid-5x5)
    grid.className = `bingo-grid grid-${dimensiuneGrid}x${dimensiuneGrid}`; 

    // Luăm lista noastră de numere și creăm un buton HTML pentru fiecare
    celuleBingo.forEach((celula, index) => {
        const btn = document.createElement('button'); // Creăm butonul
        btn.className = 'bingo-cell';                 // Îi dăm stilul de CSS
        btn.innerText = celula.valoare;               // Punem numărul pe el (ex: 56)
        btn.id = `bingo-btn-${index}`;                // Îi dăm un ID unic
        
        // Ce se întâmplă când dăm click pe el? Apelăm funcția de verificare!
        btn.onclick = () => verificaRaspunsBingo(celula.valoare, index, btn);
        
        // Adăugăm butonul terminat în grila de pe ecran
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
            // Dacă am făcut Bingo, afișăm direct fereastra mare
            document.getElementById('modal-bingo').style.display = 'flex';
        } else {
            // DACĂ NU E BINGO, SCHIMBĂM ÎNTREBAREA după o mică pauză (0.5 secunde)
            setTimeout(genereazaIntrebareNoua, 500); 
        }

    } else {
        // --- GREȘIT ---
        butonHtml.style.backgroundColor = "#F44336"; 
        butonHtml.style.color = "white";
        butonHtml.style.borderColor = "#c62828";
        butonHtml.style.pointerEvents = "none"; 
        
        celuleBingo[index].stare = 'rosu'; 
        gresite++;
        
        // IMPORTANT: Aici NU apelăm genereazaIntrebareNoua. 
        // Lăsăm întrebarea neschimbată pentru ca elevul să o caute în altă parte.
    }
}

// 5. Verifică dacă avem o linie/coloană/diagonală de BINGO complet verde
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

    // Diagonala 1
    let diag1Completa = true;
    for (let i = 0; i < d; i++) {
        if (celuleBingo[i * d + i].stare !== 'verde') diag1Completa = false;
    }
    if (diag1Completa) return true;

    // Diagonala 2
    let diag2Completa = true;
    for (let i = 0; i < d; i++) {
        if (celuleBingo[i * d + (d - 1 - i)].stare !== 'verde') diag2Completa = false;
    }
    if (diag2Completa) return true;

    return false;
}

function reincepeBingo() {
    console.log("Resetăm jocul..."); // Linie pentru test
    // 1. Ascundem fereastra de Bingo
    document.getElementById('modal-bingo').style.display = 'none';
    
    // 2. Repornim logica de generare (folosind categoria salvată anterior)
    initiazaBingo(tipBingoCurent); 
}

function inchideSesiuneaBingo() {
    console.log("Ne întoarcem la meniu..."); // Linie pentru test
    // 1. Ascundem fereastra de Bingo și tot wrapper-ul de joc
    document.getElementById('modal-bingo').style.display = 'none';
    document.getElementById('bingo-wrapper').style.display = 'none';
    
    // 2. Arătăm din nou meniul principal de jocuri
    document.getElementById('pagina-jocuri').style.display = 'block';
    
    // Opțional: resetăm scorurile globale dacă le folosești
    corecte = 0;
    gresite = 0;
}