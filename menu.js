//SIDEBAR MENU
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    
    if (sidebar.style.width === "300px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "300px";
    }
}

function switchCategory(cat) {
    console.log("Schimbăm la categoria: " + cat);
    toggleSidebar(); // Închidem meniul după selecție
    alert("Secțiunea de " + cat + " va fi disponibilă în curând!");
}


