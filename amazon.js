function redirectToPage() {
    const select = document.getElementById("productSelect");
    const value = select.value;

    switch (value) {
        case 'saree':
            window.location.href = "saree.html";
            break;
        case 'kurta':
            window.location.href = "kurta.html";
            break;
        case 'lehenga':
            window.location.href = "lehenga.html";
            break;
        case 'tunic':
            window.location.href = "tunic.html";
            break;
        case 'shawl':
            window.location.href = "shawl.html";
            break;
        case 'all':
            window.location.href = "amazon.html"; // Assuming you have an 'all' page
            break;
        default:
            break; // Do nothing if no valid option is selected
    }
}