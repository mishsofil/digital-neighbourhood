let label1 = document.getElementById("trellicklabel")
let label2 = document.getElementById("meanwhilelabel")
let label3 = document.getElementById("wechlabel")

function openTrellick(){
    label1.classList.add("open-label");
}
function closeTrellick(){
    label1.classList.remove("open-label");
}

function openMeanwhile(){
    label2.classList.add("open-label");
}
function closeMeanwhile(){
    label2.classList.remove("open-label");
}

function openWech(){
    label3.classList.add("open-label");
}
function closeWech(){
    label3.classList.remove("open-label");
}



// Read URL parameter
const urlParams = new URLSearchParams(window.location.search);
const scanned = urlParams.get("loc");

// Load stored scans (or empty object)
let scans = JSON.parse(localStorage.getItem("scans")) || {};

if (scanned) {
    // Mark this location as scanned
    scans[scanned] = true;

    // Save it
    localStorage.setItem("scans", JSON.stringify(scans));
}



//What happens once each code is scanned
if (scans["trellick"]) {
    document.querySelector(".trellick").classList.add("location-scanned");
    document.querySelector(".prompttrellick").style.display = "block";
}

if (scans["meanwhile"]) {
    document.querySelector(".meanwhile").classList.add("location-scanned");
    document.querySelector(".promptmeanwhile").style.display = "block";
}

if (scans["wech"]) {
    document.querySelector(".wech").classList.add("location-scanned");
    document.querySelector(".promptwech").style.display = "block";
}




//SCANNING PROMPT SCREENS


// Hide all prompts first
document.querySelectorAll(".prompt-screen").forEach(el => el.style.display = "none");

// Show the specific prompt based on QR scan
if (scanned === "trellick") {
    showPrompt("prompttrellick");
}
if (scanned === "meanwhile") {
    showPrompt("promptmeanwhile");
}
if (scanned === "wech") {
    showPrompt("promptwech");
}

// Function to handle showing + tap-to-close + fade-out
function showPrompt(id) {
    const prompt = document.getElementById(id);

    // Display it
    prompt.style.display = "flex";

    // Close on click/tap anywhere
    prompt.addEventListener("click", () => {
        prompt.classList.add("hidden"); // fade out
        setTimeout(() => prompt.style.display = "none", 800);
    });
}
