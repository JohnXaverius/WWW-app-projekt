//Testové příkazy
//document.body.innerHTML += "<p>JavaScript byl načten a funguje.</p>";
//alert("JavaScript je načtený!");
//KONEC testu

// init VAR
let skoreIQ = 0;
let hodnotaKliku = 100; 
let upgrade2Interval = null;
let upgrade3Interval = null;
let upgrade4Interval = null;

// init UPGRADE COST
let upgrade1Cena = 100;
let upgrade2Cena = 200;
let upgrade3Cena = 400;
let upgrade4Cena = 800;

const klikButton = document.getElementById('klik-button');
const zobrazSkore = document.getElementById('hodnota');
const upgrade1button = document.getElementById('upgrade1');
const upgrade2button = document.getElementById('upgrade2');
const upgrade3button = document.getElementById('upgrade3');
const upgrade4button = document.getElementById('upgrade4');

// Když kliknu
klikButton.addEventListener('click', () => {
    skoreIQ += hodnotaKliku;
    zobrazSkore.textContent = skoreIQ.toFixed(0);
});

//upgrade #1
upgrade1button.addEventListener('click', () => {
    if (skoreIQ >= upgrade1Cena) {
        skoreIQ -= upgrade1Cena;
        hodnotaKliku *= 1.05;
        upgrade1Cena *= 1.05;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade1button.textContent = `Upgrade manuálního klikání (+5%, cena: ${upgrade1Cena.toFixed(0)} bodů)`;
    }
});

// upgrade #2
upgrade2button.addEventListener('click', () => {
    if (skoreIQ >= upgrade2Cena && !upgrade2Interval) {
        skoreIQ -= upgrade2Cena;
        upgrade2Cena *= 1.10;
        upgrade2Interval = setInterval(() => {
            skoreIQ += 0.5;
            zobrazSkore.textContent = skoreIQ.toFixed(0);
        }, 1000);
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade2button.textContent = `Autoclicker (+0.5 bodu za sekundu, cena: ${upgrade2Cena.toFixed(0)} bodů)`;
    }
});

// upgrade #3
upgrade3button.addEventListener('click', () => {
    if (skoreIQ >= upgrade3Cena && !upgrade3Interval) {
        skoreIQ -= upgrade3Cena;
        upgrade3Cena *= 1.10;
        upgrade3Interval = setInterval(() => {
            skoreIQ += 1;
            zobrazSkore.textContent = skoreIQ.toFixed(0);
        }, 1000);
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade3button.textContent = `1 bod za sekundu (cena: ${upgrade3Cena.toFixed(0)} bodů)`;
    }
});

// upgrade #4
upgrade4button.addEventListener('click', () => {
    if (skoreIQ >= upgrade4Cena && !upgrade4Interval) {
        skoreIQ -= upgrade4Cena;
        upgrade4Cena *= 1.10;
        upgrade4Interval = setInterval(() => {
            skoreIQ += 5;
            zobrazSkore.textContent = skoreIQ.toFixed(0);
        }, 1000);
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade4button.textContent = `5 bodů za sekundu (cena: ${upgrade4Cena.toFixed(0)} bodů)`;
    }
});
