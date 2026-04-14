// =========================================
// 🌲 JOCUL WOOD JUMP (SĂRITURI GHIDATE / SMART AIM)
// =========================================

let jocWoodActiv = false;
let sarituriInRunda = 0; 
let sarituraInCurs = false; 
let tipWoodCurent = 'adunare';
let vieti = 3; 

let pozCurentaX = 50; 
let pozCurentaY = 27; 

const BAZA_Y = 15; 
const SUS_Y = 65;  

function startWoodJump() {
    document.getElementById('pagina-jocuri').style.display = 'none';
    document.getElementById('woodjump-wrapper').style.display = 'block';
    
    const ninja = document.getElementById('personaj-wood');
    ninja.style.transition = "left 0.15s ease-out, transform 0.4s, opacity 0.4s";
    
    initiazaWoodJump();
}

function initiazaWoodJump() {
    jocWoodActiv = true;
    vieti = 3; 
    sarituriInRunda = 0; 
    sarituraInCurs = false;
    
    if(typeof corecte !== 'undefined') corecte = 0;
    if(typeof gresite !== 'undefined') gresite = 0;
    
    actualizeazaScor();
    document.getElementById('platforme-container').innerHTML = ''; 
    
    const ninja = document.getElementById('personaj-wood');
    ninja.classList.remove('sare'); 
    ninja.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
    ninja.style.opacity = "1";
    
    // Start pe centru
    creeazaLemn("50%", BAZA_Y, "", true, true, "vechi");
    
    pozCurentaX = 50;
    pozCurentaY = BAZA_Y + 12;
    aplicaPozitieBroasca();

    genereazaUrmatorulNivel();
}

function actualizeazaScor() {
    let afisajCorecte = typeof corecte !== 'undefined' ? corecte : 0;
    document.getElementById('scor-valoare-wood').innerText = `${afisajCorecte} | Vieți: ${"❤️".repeat(vieti)}`;
}

function seteazaMesaj(text) {
    const el = document.getElementById('operatie-woodjump');
    el.innerText = text;
    el.dataset.intrebareCurenta = text; 
}

function aplicaPozitieBroasca() {
    const ninja = document.getElementById('personaj-wood');
    ninja.style.left = pozCurentaX + "%";
    ninja.style.bottom = pozCurentaY + "%"; 
}

function declanseazaAnimatieSarit() {
    const ninja = document.getElementById('personaj-wood');
    ninja.classList.remove('sare');
    void ninja.offsetWidth; // Force reflow
    ninja.classList.add('sare');
}

function genereazaUrmatorulNivel() {
    sarituriInRunda++;
    const container = document.getElementById('platforme-container');

    if (sarituriInRunda < 2) {
        let pozRandomX = Math.floor(Math.random() * 50) + 25 + "%"; 
        creeazaLemn(pozRandomX, SUS_Y, "", true, true, "nou");
        seteazaMesaj("Apasă Săgeata SUS (↑) pentru a sări!");
    } else {
        let intrebare = genereazaIntrebareWood(); 
        seteazaMesaj(`${intrebare.text} = ? (Stânga ← / Dreapta →)`);
        
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
    lemn.style.transform = "translateX(-50%)"; 
    lemn.style.transition = "bottom 0.5s ease, transform 0.5s ease"; 
    
    // Suport click pe telefon sau mouse
    lemn.onclick = function() {
        efectueazaSarituaGhidata(this);
    };
    
    container.appendChild(lemn);
}

// =========================================
// 🎮 CONTROALE GHIDATE
// =========================================
document.addEventListener('keydown', function(event) {
    if (!jocWoodActiv || sarituraInCurs) return;

    const lemneNoi = document.querySelectorAll('.platforma-lemn[data-stare="nou"]');
    if (lemneNoi.length === 0) return;

    let lemnTinta = null;

    // Logica de Auto-Aintire
    if (lemneNoi.length === 1) { 
        if (event.key === 'ArrowUp') lemnTinta = lemneNoi[0];
    } else if (lemneNoi.length === 2) { 
        // Găsim care lemn e în stânga și care e în dreapta
        let lemnStanga = parseFloat(lemneNoi[0].style.left) < 50 ? lemneNoi[0] : lemneNoi[1];
        let lemnDreapta = parseFloat(lemneNoi[0].style.left) > 50 ? lemneNoi[0] : lemneNoi[1];

        if (event.key === 'ArrowLeft') lemnTinta = lemnStanga;
        else if (event.key === 'ArrowRight') lemnTinta = lemnDreapta;
    }

    if (lemnTinta) {
        event.preventDefault();
        efectueazaSarituaGhidata(lemnTinta);
    }
});

function efectueazaSarituaGhidata(lemnDestinatie) {
    if (sarituraInCurs || lemnDestinatie.dataset.stare === "vechi") return; 
    
    sarituraInCurs = true; 
    
    // Setăm coordonatele broaștei exact pe lemnul dorit (nu mai există șansa să rateze!)
    pozCurentaX = parseFloat(lemnDestinatie.style.left);
    pozCurentaY = parseFloat(lemnDestinatie.style.bottom) + 12;
    
    declanseazaAnimatieSarit();
    aplicaPozitieBroasca();
    
    // Așteptăm 400ms să se termine animația de zbor
    setTimeout(() => {
        verificaStareAterizare(lemnDestinatie);
    }, 400); 
}

function verificaStareAterizare(lemnAtins) {
    // Verificăm dacă e nivel nou
    if (lemnAtins.dataset.stare === "nou" && pozCurentaY > BAZA_Y + 10) {
        proceseazaLemnMatematic(lemnAtins);
    }
}

function proceseazaLemnMatematic(lemn) {
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
            
            setTimeout(() => {
                lemn.style.transform = "translateX(-50%) scale(0)"; 
                caziInApa(); 
            }, 500);
        }
    } else {
        setTimeout(coboaraTotEcranul, 400);
    }
}

function caziInApa() {
    sarituraInCurs = true; 
    
    const ninja = document.getElementById('personaj-wood');
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
            // Respawn pe lemnul de jos
            let lemnBaza = document.querySelector('.platforma-lemn[data-stare="vechi"]');
            if(lemnBaza) pozCurentaX = parseFloat(lemnBaza.style.left);
            else pozCurentaX = 50;
            
            pozCurentaY = BAZA_Y + 12;
            
            ninja.style.transition = "none"; 
            aplicaPozitieBroasca();
            
            ninja.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
            ninja.style.opacity = "1";
            
            setTimeout(() => {
                ninja.style.transition = "left 0.15s ease-out, transform 0.4s, opacity 0.4s";
                sarituraInCurs = false;
                document.getElementById('operatie-woodjump').innerText = document.getElementById('operatie-woodjump').dataset.intrebareCurenta || "Încearcă din nou!";
            }, 50);
        }
    }, 600); 
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

    pozCurentaY = BAZA_Y + 12;
    aplicaPozitieBroasca();

    setTimeout(() => {
        genereazaUrmatorulNivel();
        sarituraInCurs = false; 
    }, 500);
}

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