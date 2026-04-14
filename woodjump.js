// =========================================
// 🌲 JOCUL WOOD JUMP (ARCADE: CĂDERI ÎN APĂ ȘI SCUFUNDĂRI)
// =========================================

let jocWoodActiv = false;
let sarituriInRunda = 0; 
let sarituraInCurs = false; 
let tipWoodCurent = 'adunare';
let vieti = 3; 

// Poziția matematică a broaștei (în procente)
let pozCurentaX = 50; 
let pozCurentaY = 23; 

// Pozițiile fixe pe ecran (axa Y)
const BAZA_Y = 15; // Rândul de jos
const SUS_Y = 65;  // Rândul de sus

function startWoodJump() {
    document.getElementById('pagina-jocuri').style.display = 'none';
    document.getElementById('woodjump-wrapper').style.display = 'block';
    
    // Setăm animațiile CSS din JavaScript pentru o mișcare super fluidă
    const ninja = document.getElementById('personaj-wood');
    ninja.style.transition = "left 0.15s ease-out, bottom 0.4s ease-out, transform 0.4s, opacity 0.4s";
    
    initiazaWoodJump();
}

function initiazaWoodJump() {
    jocWoodActiv = true;
    vieti = 3; 
    sarituriInRunda = 0; 
    sarituraInCurs = false;
    
    // Resetăm global
    if(typeof corecte !== 'undefined') corecte = 0;
    if(typeof gresite !== 'undefined') gresite = 0;
    
    actualizeazaScor();
    document.getElementById('platforme-container').innerHTML = ''; 
    
    // Asigurăm vizibilitatea broaștei
    const ninja = document.getElementById('personaj-wood');
    ninja.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
    ninja.style.opacity = "1";
    
    // 1. Creăm bușteanul de start pe centru
    creeazaLemn("50%", BAZA_Y, "", true, true, "vechi");
    
    // Punem broasca pe buștean
    pozCurentaX = 50;
    pozCurentaY = BAZA_Y + 12;
    aplicaPozitieBroasca();

    // 2. Creăm primul obiectiv
    genereazaUrmatorulNivel();
}

function actualizeazaScor() {
    let afisajCorecte = typeof corecte !== 'undefined' ? corecte : 0;
    document.getElementById('scor-valoare-wood').innerText = `${afisajCorecte} | Vieți: ${"❤️".repeat(vieti)}`;
}

function seteazaMesaj(text) {
    const el = document.getElementById('operatie-woodjump');
    el.innerText = text;
    el.dataset.intrebareCurenta = text; // Salvăm ca să o punem înapoi dacă dă respawn
}

function aplicaPozitieBroasca() {
    const ninja = document.getElementById('personaj-wood');
    ninja.style.left = pozCurentaX + "%";
    ninja.style.bottom = pozCurentaY + "%"; 
}

function genereazaUrmatorulNivel() {
    sarituriInRunda++;
    const container = document.getElementById('platforme-container');

    if (sarituriInRunda < 4) {
        let pozRandomX = Math.floor(Math.random() * 50) + 25 + "%"; 
        creeazaLemn(pozRandomX, SUS_Y, "", true, true, "nou");
        seteazaMesaj("Stânga/Dreapta (← →) fixează ținta. Sus (↑) Sari!");
    } else {
        let intrebare = genereazaIntrebareWood(); 
        seteazaMesaj(`${intrebare.text} = ?`);
        
        let corectPeStanga = Math.random() > 0.5; 
        creeazaLemn("25%", SUS_Y, corectPeStanga ? intrebare.corect : intrebare.gresit, corectPeStanga, false, "nou");
        creeazaLemn("75%", SUS_Y, corectPeStanga ? intrebare.gresit : intrebare.corect, !corectPeStanga, false, "nou");
        
        sarituriInRunda = 0; 
    }
}

function creeazaLemn(pozitieX, pozitieY, text, esteCorect, esteSimplu, stare) {
    const container = document.getElementById('platforme-container');
    let lemn = document.createElement('div');
    lemn.className = 'platforma-lemn';
    lemn.innerText = text;
    
    lemn.dataset.corect = esteCorect; 
    lemn.dataset.simplu = esteSimplu;
    lemn.dataset.stare = stare; 
    
    if(esteSimplu) lemn.style.width = "80px"; 
    
    lemn.style.bottom = pozitieY + "%";
    lemn.style.left = pozitieX;
    lemn.style.transform = "translateX(-50%)"; // Lemnul e mereu centrat pe coordonata lui X
    lemn.style.transition = "bottom 0.5s ease, transform 0.5s ease"; // Pt scufundare
    
    // Suport click pe telefon
    lemn.onclick = function() {
        if (sarituraInCurs || this.dataset.stare === "vechi") return; 
        pozCurentaX = parseFloat(this.style.left);
        pozCurentaY = parseFloat(this.style.bottom) + 12;         
        aplicaPozitieBroasca();
        setTimeout(verificaStareAterizare, 400);
    };
    
    container.appendChild(lemn);
}

// =========================================
// 🎮 CONTROALE, CĂDERE & SCUFUNDARE
// =========================================
document.addEventListener('keydown', function(event) {
    if (!jocWoodActiv || sarituraInCurs) return;

    let actiuneEfectuata = false;
    let timpAsteptare = 150; // Așteptăm 150ms pt stânga/dreapta, 400ms pt săritură

    if (event.key === 'ArrowLeft') {
        pozCurentaX -= 5; // Facem pași de 5%
        actiuneEfectuata = true;
    } else if (event.key === 'ArrowRight') {
        pozCurentaX += 5;
        actiuneEfectuata = true;
    } else if (event.key === 'ArrowUp') {
        pozCurentaY = SUS_Y + 12; // Sărim pe rândul de sus
        actiuneEfectuata = true;
        timpAsteptare = 400; // Durează mai mult să zboare
    } else if (event.key === 'ArrowDown') {
        pozCurentaY = BAZA_Y + 12; // Ne întoarcem pe rândul de jos
        actiuneEfectuata = true;
        timpAsteptare = 400;
    }

    // Adaugă acest bloc imediat după if/else-urile cu ArrowUp/Down/Left/Right
    if (actiuneEfectuata) {
        event.preventDefault();
        
        // --- CODUL MAGIC PENTRU ANIMAȚIE ---
        const ninja = document.getElementById('personaj-wood');
        ninja.classList.remove('sare'); // Scoatem clasa veche
        void ninja.offsetWidth; // Truc tehnic: forțăm browserul să "uite" vechea animație
        ninja.classList.add('sare'); // O adăugăm la loc pentru a declanșa arcul săriturii!
        // -----------------------------------
        
        aplicaPozitieBroasca();
        setTimeout(verificaStareAterizare, timpAsteptare);
    }
});

function verificaStareAterizare() {
    let lemnAtins = null;
    const lemne = document.querySelectorAll('.platforma-lemn');
    
    lemne.forEach(lemn => {
        let lemnX = parseFloat(lemn.style.left);
        let lemnY = parseFloat(lemn.style.bottom);
        
        // Suntem pe aceeași axă Y cu lemnul? (Marjă de 5%)
        if (Math.abs(pozCurentaY - (lemnY + 12)) < 5) {
            // Suntem deasupra lemnului pe axa X? (Marjă de 12% ca să nu cadă prea ușor)
            if (Math.abs(pozCurentaX - lemnX) < 12) {
                lemnAtins = lemn;
            }
        }
    });

    if (!lemnAtins) {
        caziInApa(); // A călcat pe apă!
    } else {
        if (lemnAtins.dataset.stare === "nou" && pozCurentaY > BAZA_Y + 10) {
            // A sărit la noul nivel
            proceseazaLemnMatematic(lemnAtins);
        }
    }
}

function proceseazaLemnMatematic(lemn) {
    sarituraInCurs = true;
    // Aliniem broasca perfect pe centru ca să arate bine
    pozCurentaX = parseFloat(lemn.style.left);
    aplicaPozitieBroasca();

    if (lemn.dataset.simplu === "false") {
        if (lemn.dataset.corect === "true") {
            lemn.style.backgroundColor = "#4caf50"; 
            if(typeof corecte !== 'undefined') corecte++;
            actualizeazaScor();
            setTimeout(coboaraTotEcranul, 400);
        } else {
            lemn.style.backgroundColor = "#f44336"; 
            if(typeof gresite !== 'undefined') gresite++;
            document.getElementById('operatie-woodjump').innerText = "Răspuns greșit! Lemnul se scufundă!";
            
            // Efectul de scufundare a lemnului!
            setTimeout(() => {
                lemn.style.transform = "translateX(-50%) scale(0)"; 
                caziInApa(); 
            }, 500);
        }
    } else {
        // Dacă e doar lemn simplu de încălzire
        setTimeout(coboaraTotEcranul, 400);
    }
}

function caziInApa() {
    sarituraInCurs = true; 
    
    const ninja = document.getElementById('personaj-wood');
    // Animație: Broasca se rotește și dispare (cade în apă)
    ninja.style.transform = "translateX(-50%) scale(0) rotate(360deg)";
    ninja.style.opacity = "0";

    document.getElementById('operatie-woodjump').innerText = "💦 SPLASH! Ai căzut!";

    setTimeout(() => {
        vieti--;
        actualizeazaScor();

        if (vieti <= 0) {
            alert("Game Over! Ai rămas fără vieți.");
            initiazaWoodJump();
        } else {
            // == RESPAWN ==
            // Găsim lemnul "vechi" (de bază) și punem broasca pe el
            let lemnBaza = document.querySelector('.platforma-lemn[data-stare="vechi"]');
            if(lemnBaza) pozCurentaX = parseFloat(lemnBaza.style.left);
            else pozCurentaX = 50;
            
            pozCurentaY = BAZA_Y + 8;
            
            // Oprim animația temporar pentru a muta broasca invizibilă înapoi jos
            ninja.style.transition = "none"; 
            aplicaPozitieBroasca();
            
            // Refacem vizibilitatea
            ninja.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
            ninja.style.opacity = "1";
            
            setTimeout(() => {
                // Pornim animațiile înapoi
                ninja.style.transition = "left 0.15s ease-out, bottom 0.4s ease-out, transform 0.4s, opacity 0.4s";
                sarituraInCurs = false;
                document.getElementById('operatie-woodjump').innerText = document.getElementById('operatie-woodjump').dataset.intrebareCurenta || "Încearcă din nou!";
            }, 50);
        }
    }, 600); // Așteptăm 600ms să se termine efectul de splash
}

function coboaraTotEcranul() {
    let lemne = document.querySelectorAll('.platforma-lemn');
    
    lemne.forEach(lemn => {
        if (lemn.dataset.stare === "vechi") {
            lemn.style.bottom = "-20%"; 
            setTimeout(() => lemn.remove(), 500);
        } else if (lemn.dataset.stare === "nou") {
            lemn.style.bottom = BAZA_Y + "%"; 
            lemn.dataset.stare = "vechi";
        }
    });

    pozCurentaY = BAZA_Y + 8;
    aplicaPozitieBroasca();

    setTimeout(() => {
        genereazaUrmatorulNivel();
        sarituraInCurs = false; 
    }, 500);
}

// Creierul matematic (Rămâne intact)
function genereazaIntrebareWood() {
    let n1, n2, corect, textIntrebare;

    if (tipWoodCurent === 'adunare') {
        n1 = Math.floor(Math.random() * 20) + 1;
        n2 = Math.floor(Math.random() * 20) + 1;
        corect = n1 + n2;
        textIntrebare = `${n1} + ${n2}`;
    } else if (tipWoodCurent === 'scadere') {
        n1 = Math.floor(Math.random() * 20) + 10;
        n2 = Math.floor(Math.random() * n1) + 1;
        corect = n1 - n2;
        textIntrebare = `${n1} - ${n2}`;
    } else if (tipWoodCurent === 'inmultire') {
        n1 = Math.floor(Math.random() * 10) + 1;
        n2 = Math.floor(Math.random() * 10) + 1;
        corect = n1 * n2;
        textIntrebare = `${n1} x ${n2}`;
    } else { 
        n2 = Math.floor(Math.random() * 9) + 1;
        corect = Math.floor(Math.random() * 10) + 1;
        n1 = n2 * corect;
        textIntrebare = `${n1} : ${n2}`;
    }

    let diferenta = Math.floor(Math.random() * 3) + 1;
    let gresit = corect + (Math.random() > 0.5 ? diferenta : -diferenta);
    if (gresit < 0) gresit = corect + 2; 

    return { text: textIntrebare, corect: corect, gresit: gresit };
}

function inchideSesiuneaWoodJump() {
    jocWoodActiv = false;
    if (typeof finalizeazaSesiunea === "function") finalizeazaSesiunea(); 
    document.getElementById('woodjump-wrapper').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'block';
}