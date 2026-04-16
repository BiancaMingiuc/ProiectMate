
let jocWoodActiv = false;
let sarituriInRunda = 0; 
let sarituraInCurs = false; 
let tipWoodCurent = 'adunare';
let vieti = 3; 

let pozCurentaX = 50; 
let pozCurentaY = 22; 

const BAZA_Y = 10; 
const SUS_Y = 75;  

let tastaStanga = false;
let tastaDreapta = false;
let loopMiscare = null;
let inAnimatieCadere = false;

function startWoodJump() {
    document.getElementById('pagina-jocuri').style.display = 'none';
    document.getElementById('woodjump-wrapper').style.display = 'block';
    
    const ninja = document.getElementById('personaj-wood');
    ninja.style.transition = "left 0.05s linear, transform 0.8s ease-out, opacity 0.4s";
    
    initiazaWoodJump();
}

function initiazaWoodJump() {
    jocWoodActiv = true;
    vieti = 3; 
    sarituriInRunda = 0; 
    sarituraInCurs = false;
    inAnimatieCadere = false;
    
    if(typeof corecte !== 'undefined') corecte = 0;
    if(typeof gresite !== 'undefined') gresite = 0;
    
    actualizeazaScor();
    document.getElementById('platforme-container').innerHTML = ''; 
    
    const ninja = document.getElementById('personaj-wood');
    ninja.classList.remove('sare'); 
    ninja.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
    ninja.style.opacity = "1";
    
    creeazaLemn("50%", BAZA_Y, "", true, true, "vechi");
    
    pozCurentaX = 50;
    pozCurentaY = BAZA_Y + 12;
    aplicaPozitieBroasca();

    if (loopMiscare) clearInterval(loopMiscare);
    loopMiscare = setInterval(motorMiscareLina, 30);

    genereazaUrmatorulNivel();
}

function motorMiscareLina() {
    if (!jocWoodActiv || inAnimatieCadere) return;

    let sAMiscat = false;
    let viteza = 2; 

    if (tastaStanga) {
        pozCurentaX -= viteza;
        if (pozCurentaX < 5) pozCurentaX = 5;
        sAMiscat = true;
    }
    if (tastaDreapta) {
        pozCurentaX += viteza;
        if (pozCurentaX > 95) pozCurentaX = 95;
        sAMiscat = true;
    }

    if (sAMiscat) {
        aplicaPozitieBroasca();
        if (!sarituraInCurs) verificaAterizareInMers();
    }
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
    void ninja.offsetWidth; 
    ninja.classList.add('sare');
}

function genereazaUrmatorulNivel() {
    sarituriInRunda++;
    
    if (sarituriInRunda < 2) {
        let pozRandomX = Math.floor(Math.random() * 50) + 25 + "%"; 
        creeazaLemn(pozRandomX, SUS_Y, "", true, true, "nou");
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
    lemn.style.transform = "translateX(-50%)"; 
    lemn.style.transition = "bottom 0.5s ease, transform 0.5s ease"; 
    
    lemn.onclick = function() {
        if (sarituraInCurs || this.dataset.stare === "vechi" || inAnimatieCadere) return; 
        sarituraInCurs = true;
        
        pozCurentaX = parseFloat(this.style.left);
        pozCurentaY = parseFloat(this.style.bottom) + 12;
        
        declanseazaAnimatieSarit();
        aplicaPozitieBroasca();
        setTimeout(() => verificaAterizareDupaSaritura(), 800); 
    };
    
    container.appendChild(lemn);
}

document.addEventListener('keydown', function(event) {
    if (!jocWoodActiv || inAnimatieCadere) return;

    if (event.key === 'ArrowLeft') {
        tastaStanga = true;
        event.preventDefault();
    } 
    else if (event.key === 'ArrowRight') {
        tastaDreapta = true;
        event.preventDefault();
    } 
    else if (event.key === 'ArrowUp') {
        if (sarituraInCurs) return; 
        
        sarituraInCurs = true; 
        pozCurentaY = SUS_Y + 12; 
        
        declanseazaAnimatieSarit();
        aplicaPozitieBroasca();
        
        setTimeout(() => verificaAterizareDupaSaritura(), 800); 
        event.preventDefault();
    } 
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') tastaStanga = false;
    if (event.key === 'ArrowRight') tastaDreapta = false;
});

function verificaAterizareInMers() {
    let lemnAtins = null;
    const lemne = document.querySelectorAll('.platforma-lemn');
    
    lemne.forEach(lemn => {
        let lemnX = parseFloat(lemn.style.left);
        let lemnY = parseFloat(lemn.style.bottom);
        
        if (Math.abs(pozCurentaY - (lemnY + 12)) <= 10) {
            if (Math.abs(pozCurentaX - lemnX) <= 25) {
                lemnAtins = lemn;
            }
        }
    });

    if (!lemnAtins) caziInApa("Ai alunecat de pe lemn!"); 
}

function verificaAterizareDupaSaritura() {
    let lemnAtins = null;
    const lemne = document.querySelectorAll('.platforma-lemn');
    
    lemne.forEach(lemn => {
        let lemnX = parseFloat(lemn.style.left);
        let lemnY = parseFloat(lemn.style.bottom);
        
        if (Math.abs(pozCurentaY - (lemnY + 12)) <= 10) {
            if (Math.abs(pozCurentaX - lemnX) <= 25) {
                lemnAtins = lemn;
            }
        }
    });

    if (!lemnAtins) {
        caziInApa("Ai ratat aterizarea!"); 
    } else {
        pozCurentaX = parseFloat(lemnAtins.style.left);
        aplicaPozitieBroasca();

        if (lemnAtins.dataset.stare === "nou" && pozCurentaY > BAZA_Y + 10) {
            proceseazaLemnMatematic(lemnAtins);
        } else {
             sarituraInCurs = false; 
        }
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
                caziInApa("Lemnul s-a scufundat!"); 
            }, 500);
        }
    } else {
        setTimeout(coboaraTotEcranul, 400);
    }
}

function caziInApa(mesaj) {
    if (inAnimatieCadere) return; 
    
    inAnimatieCadere = true;
    sarituraInCurs = true; 
    tastaStanga = false; 
    tastaDreapta = false;
    
    const ninja = document.getElementById('personaj-wood');
    ninja.style.transform = "translateX(-50%) scale(0) rotate(360deg)";
    ninja.style.opacity = "0";

    document.getElementById('operatie-woodjump').innerText = `💦 SPLASH! ${mesaj}`;

    setTimeout(() => {
        vieti--;
        actualizeazaScor();

        if (vieti <= 0) {
            alert("Game Over! Ai rămas fără vieți.");
            initiazaWoodJump();
        } else {
            let lemnBaza = document.querySelector('.platforma-lemn[data-stare="vechi"]');
            if(lemnBaza) pozCurentaX = parseFloat(lemnBaza.style.left);
            else pozCurentaX = 50;
            
            pozCurentaY = BAZA_Y + 12;
            
            ninja.style.transition = "none"; 
            aplicaPozitieBroasca();
            
            ninja.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
            ninja.style.opacity = "1";
            
            setTimeout(() => {
                ninja.style.transition = "left 0.05s linear, bottom 0.8s ease-out, opacity 0.4s";
                sarituraInCurs = false;
                inAnimatieCadere = false;
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
    const operatiiPosibile = ['adunare','scadere','inmultire','impartire'];
    let operatie = operatiiPosibile[Math.floor(Math.random()*operatiiPosibile.length)];

    if (operatie === 'adunare') {
        n1 = Math.floor(Math.random() * 20) + 1;
        n2 = Math.floor(Math.random() * 20) + 1;
        corect = n1 + n2;
        textIntrebare = `${n1} + ${n2}`;
    } else if (operatie === 'scadere') {
        n1 = Math.floor(Math.random() * 20) + 10;
        n2 = Math.floor(Math.random() * n1) + 1;
        corect = n1 - n2;
        textIntrebare = `${n1} - ${n2}`;
    } else if (operatie === 'inmultire') {
        n1 = Math.floor(Math.random() * 10) + 1;
        n2 = Math.floor(Math.random() * 10) + 1;
        corect = n1 * n2;
        textIntrebare = `${n1} x ${n2}`;
    } else { 
        n2 = Math.floor(Math.random() * 5) - 2;
        corect = Math.floor(Math.random() * 10) + 1;
        n1 = n2 * corect;
        textIntrebare = `${n1} : ${n2}`;
    }

    let diferenta = Math.floor(Math.random() * 3) + 1;
    let gresit = corect + diferenta;
    if (gresit < 0) gresit = corect + 2; 

    return { text: textIntrebare, corect: corect, gresit: gresit };
}

function inchideSesiuneaWoodJump() {
    jocWoodActiv = false;
    if (loopMiscare) clearInterval(loopMiscare);
    if (typeof finalizeazaSesiunea === "function") finalizeazaSesiunea(); 
    document.getElementById('woodjump-wrapper').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'block';
}