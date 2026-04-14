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
    // 1. ASCUNDEM TOT (Resetăm ecranul la o pânză goală)
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.subtitle-container').style.display = 'none';
    document.querySelector('.meniu-principal').style.display = 'none';
    document.getElementById('pagina-statistici').style.display = 'none';
    document.getElementById('zona-exercitiu').style.display = 'none';
    document.getElementById('pagina-jocuri').style.display = 'none';
    document.getElementById('bingo-joc-activ').style.display = 'none';
    document.getElementById('bingo-selectie-categorie').style.display = 'none';
    document.getElementById('woodjump-wrapper').style.display = 'none';
    document.getElementById('bingo-wrapper').style.display = 'none';

    // 2. AFIȘĂM DOAR CE TREBUIE în funcție de categorie
    if (category === 'arcade') {
        document.getElementById('pagina-jocuri').style.display = 'block';
    } 
    else if (category === 'stats') {
        document.getElementById('pagina-statistici').style.display = 'block';
        // Dacă ai o funcție care actualizează tabelul când intri, o poți apela aici
        // actualizeazaTabelStatistici(); 
    }
    else if (category === 'home') {
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.subtitle-container').style.display = 'block';
        document.querySelector('.meniu-principal').style.display = 'flex'; 
    }

    // 3. Închidem meniul lateral la final, indiferent pe ce am dat click
    toggleSidebar();
}

