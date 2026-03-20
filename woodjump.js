// =========================================
// 🌲 JOCUL WOOD JUMP
// =========================================

function startWoodJump() {
    // 1. Ascundem meniul principal
    document.getElementById('pagina-jocuri').style.display = 'none';
    
    // 2. Afișăm jocul Wood Jump
    document.getElementById('woodjump-wrapper').style.display = 'block';
    
    // Aici vom apela mai târziu funcția care generează întrebările și platformele
    // initiazaWoodJump();
}


function gliseazaPersonaj(event) {
    // 1. Oprim comportamentul normal al browserului
    event.preventDefault(); 

    const padure = document.getElementById('padure-container');
    const personaj = document.getElementById('personaj-wood');
    
    // 2. Aflăm unde sunt marginile pădurii pe ecran
    const rect = padure.getBoundingClientRect();

    // 3. Luăm coordonata X a degetului (pe telefon) sau a mouse-ului (pe laptop)
    let clientX;
    if (event.touches) {
        clientX = event.touches[0].clientX; // Pentru Telefon
    } else {
        clientX = event.clientX; // Pentru Laptop
    }

    // 4. Calculăm poziția în interiorul pădurii
    let pozitieX = clientX - rect.left;

    // 5. Punem limite ca Ninja să nu iasă din ecran (păstrăm o margine de 30px)
    if (pozitieX < 30) pozitieX = 30;
    if (pozitieX > rect.width - 30) pozitieX = rect.width - 30;

    // 6. Aplicăm noua poziție personajului!
    personaj.style.left = pozitieX + 'px';
}

function inchideSesiuneaWoodJump() {
    // Salvăm scorul dacă e cazul
    finalizeazaSesiunea(); 

    // Ascundem jocul și arătăm meniul
    document.getElementById('woodjump-wrapper').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'block';
}