//ZACATEK testu
//document.body.innerHTML += "<p>JavaScript byl načten a funguje.</p>";
//alert("JavaScript je načtený!");
//KONEC testu

// init VAR
let skoreIQ = 0;
let hodnotaKliku = 100;
let upgrade2Interval = null;
let upgrade3Interval = null;
let upgrade4Interval = null;
let upgrade1Pocet = 0;
let upgrade2Pocet = 0;
let upgrade3Pocet = 0;
let upgrade4Pocet = 0;

// init UPGRADE COST
let upgrade1Cena = 100;
let upgrade2Cena = 200;
let upgrade3Cena = 400;
let upgrade4Cena = 800;

//init Plavouci okno
function plavouciOkno(button, getText) {
    const okynko = document.createElement('div');
    okynko.className = 'okynko';
    document.body.appendChild(okynko);

    okynko.style.position = 'absolute';
    okynko.style.backgroundColor = '#333';
    okynko.style.color = '#fff';
    okynko.style.padding = '5px';
    okynko.style.borderRadius = '5px';
    okynko.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    okynko.style.display = 'none';

    button.addEventListener('mouseover', (e) => {
        okynko.textContent = getText();
        okynko.style.display = 'block';
        okynko.style.left = e.pageX + 'px';
        okynko.style.top = (e.pageY + 20) + 'px';
    });

    button.addEventListener('mousemove', (e) => {
        okynko.style.left = e.pageX + 'px';
        okynko.style.top = (e.pageY + 20) + 'px';
    });

    button.addEventListener('mouseout', () => {
        okynko.style.display = 'none';
    });
}

// init konstanty
const klikButton = document.getElementById('klik-button');
const zobrazSkore = document.getElementById('hodnota');
const upgrade1button = document.getElementById('upgrade1');
const upgrade2button = document.getElementById('upgrade2');
const upgrade3button = document.getElementById('upgrade3');
const upgrade4button = document.getElementById('upgrade4');
const zobrazIQps = document.createElement('p');
zobrazIQps.id = 'iqps';
zobrazSkore.parentNode.insertBefore(zobrazIQps, zobrazSkore.nextSibling);

// Funkce pro výpočet IQ za sekundu
function aktualizujIQps() {
    const iqps = (0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet);
    zobrazIQps.textContent = `Body za sekundu: ${iqps.toFixed(1)} IQps`;
}

// Když kliknu
klikButton.addEventListener('click', () => {
    skoreIQ += hodnotaKliku;
    zobrazSkore.textContent = skoreIQ.toFixed(0);
});

// upgrade #1
upgrade1button.addEventListener('click', () => {
    if (skoreIQ >= upgrade1Cena) {
        skoreIQ -= upgrade1Cena;
        hodnotaKliku *= 1.05;
        upgrade1Cena *= 1.05;
        upgrade1Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade1button.textContent = `Koupeno: ${upgrade1Pocet}, Cena dalšího: ${upgrade1Cena.toFixed(0)} bodů`;
    }
});
plavouciOkno(upgrade1button, () => `Upgrade manuálního klikání (+5% za kliknutí, koupeno: ${upgrade1Pocet}, cena dalšího upgradu: ${upgrade1Cena.toFixed(0)} bodů)`);

// upgrade #2
upgrade2button.addEventListener('click', () => {
    if (skoreIQ >= upgrade2Cena) {
        skoreIQ -= upgrade2Cena;
        upgrade2Cena *= 1.10;
        upgrade2Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade2button.textContent = `Autoclicker (+0.5 bodu za sekundu, koupeno: ${upgrade2Pocet}, cena dalšího: ${upgrade2Cena.toFixed(0)} bodů)`;
        aktualizujIQps();
    }
});
plavouciOkno(upgrade2button, () => `Autoclicker (+0.5 bodu za sekundu, koupeno: ${upgrade2Pocet}, cena dalšího upgradu: ${upgrade2Cena.toFixed(0)} bodů)`);

// upgrade #3
upgrade3button.addEventListener('click', () => {
    if (skoreIQ >= upgrade3Cena) {
        skoreIQ -= upgrade3Cena;
        upgrade3Cena *= 1.10;
        upgrade3Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade3button.textContent = `1 bod za sekundu (koupeno: ${upgrade3Pocet}, cena dalšího: ${upgrade3Cena.toFixed(0)} bodů)`;
        aktualizujIQps();
    }
});
plavouciOkno(upgrade3button, () => `1 bod za sekundu (koupeno: ${upgrade3Pocet}, cena dalšího upgradu: ${upgrade3Cena.toFixed(0)} bodů)`);

// upgrade #4
upgrade4button.addEventListener('click', () => {
    if (skoreIQ >= upgrade4Cena) {
        skoreIQ -= upgrade4Cena;
        upgrade4Cena *= 1.10;
        upgrade4Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        upgrade4button.textContent = `5 bodů za sekundu (koupeno: ${upgrade4Pocet}, cena dalšího: ${upgrade4Cena.toFixed(0)} bodů)`;
        aktualizujIQps();
    }
});
plavouciOkno(upgrade4button, () => `5 bodů za sekundu (koupeno: ${upgrade4Pocet}, cena dalšího upgradu: ${upgrade4Cena.toFixed(0)} bodů)`);

// Automatické přidávání bodů za sekundu
setInterval(() => {
    let bodyZaSekundu = (0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet);
    skoreIQ += bodyZaSekundu;
    zobrazSkore.textContent = skoreIQ.toFixed(0);
}, 1000);

// Aktualizace ukazatele IQ za sekundu
setInterval(aktualizujIQps, 1000);
