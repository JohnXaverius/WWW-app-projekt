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
let upgrade2TotalIQ = 0;
let upgrade3TotalIQ = 0;
let upgrade4TotalIQ = 0;

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
    okynko.style.padding = '10px';
    okynko.style.borderRadius = '5px';
    okynko.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    okynko.style.display = 'none';
    okynko.style.whiteSpace = 'pre-line';

    button.addEventListener('mouseover', (e) => {
        okynko.innerHTML = getText();
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
plavouciOkno(upgrade1button, () => `Neuromotorický upgrade

<i>"Autoklik každou sekundu."</i>

Neuromotorický upgrade vytváří ${hodnotaKliku.toFixed(2)} IQps.
Neuromotorický upgrade vytváří ${hodnotaKliku.toFixed(2)} IQps, což je ${((hodnotaKliku / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
Neuromotorický upgrade zatím vytvořil ${hodnotaKliku.toFixed(0)} IQ.`);

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
plavouciOkno(upgrade2button, () => `Autoclicker

<i>"Popis: Automaticky generuje body za sekundu."</i>

"Autoclicker" vytváří ${(0.5 * upgrade2Pocet).toFixed(2)} jednotek IQps.
"Autoclicker" vytváří ${(0.5 * upgrade2Pocet).toFixed(2)} IQps, což je ${((0.5 * upgrade2Pocet / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
"Autoclicker" zatím vytvořil ${upgrade2TotalIQ.toFixed(0)} IQ.`);

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
plavouciOkno(upgrade3button, () => `Bioprocesory

<i>"Popis: Automaticky generuje 1 bod za sekundu."</i>

"Bioprocesory" vytváří ${(1 * upgrade3Pocet).toFixed(2)} jednotek IQps.
"Bioprocesory" vytváří ${(1 * upgrade3Pocet).toFixed(2)} IQps, což je ${((1 * upgrade3Pocet / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
"Bioprocesory" zatím vytvořil ${upgrade3TotalIQ.toFixed(0)} IQ.`);

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
plavouciOkno(upgrade4button, () => `Cloudová výpočetní síla

<i>"Popis: Automaticky generuje 5 bodů za sekundu."</i>

"Cloudová výpočetní síla" vytváří ${(5 * upgrade4Pocet).toFixed(2)} jednotek IQps.
"Cloudová výpočetní síla" vytváří ${(5 * upgrade4Pocet).toFixed(2)} IQps, což je ${((5 * upgrade4Pocet / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
"Cloudová výpočetní síla" zatím vytvořila ${upgrade4TotalIQ.toFixed(0)} IQ.`);

// Automatické přidávání bodů za sekundu
setInterval(() => {
    let bodyZaSekundu = (0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet);
    skoreIQ += bodyZaSekundu;
    upgrade2TotalIQ += (0.5 * upgrade2Pocet);
    upgrade3TotalIQ += (1 * upgrade3Pocet);
    upgrade4TotalIQ += (5 * upgrade4Pocet);
    zobrazSkore.textContent = skoreIQ.toFixed(0);
}, 1000);

// Aktualizace ukazatele IQ za sekundu
setInterval(aktualizujIQps, 1000);
