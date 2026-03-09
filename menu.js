//SIDEBAR MENU
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    
    if (sidebar.style.width === "300px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "300px";
    }
}

function switchCategory(category) {
    if (category === 'arcade') {
        // Ascundem elementele paginii principale
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.subtitle-container').style.display = 'none';
        document.querySelector('.meniu-principal').style.display = 'none';
        document.getElementById('pagina-statistici').style.display = 'none';
        document.getElementById('zona-exercitiu').style.display = 'none';

        // Afișăm pagina cu cele 3 jocuri noi
        document.getElementById('pagina-jocuri').style.display = 'block';
        
        // Închidem meniul lateral
        toggleSidebar();
    }
}


function deschidePaginaJocuri() {
    // 1. Ascundem tot restul (Meniu principal, Start screen, etc.)
    document.querySelector('.meniu-principal').style.display = 'none';
    document.querySelector('.subtitle-container').style.display = 'none';
    document.getElementById('pagina-statistici').style.display = 'none';
    document.getElementById('zona-exercitiu').style.display = 'none';
    
    // 2. Afișăm pagina de jocuri
    document.getElementById('pagina-jocuri').style.display = 'block';
    
    // Închidem meniul lateral dacă e deschis
    inchideMeniuLateral(); 
}

