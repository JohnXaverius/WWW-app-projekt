// init VAR
let skoreIQ = 0;
let celkoveNasbiraneIQ = 0;
let hodnotaKliku = 100;
let upgrade2Interval = null;
let upgrade3Interval = null;
let upgrade4Interval = null;
let upgrade5Interval = null;
let upgrade6Interval = null;
let upgrade7Interval = null;
let upgrade8Interval = null;
let upgrade1Pocet = 0;
let upgrade2Pocet = 0;
let upgrade3Pocet = 0;
let upgrade4Pocet = 0;
let upgrade5Pocet = 0;
let upgrade6Pocet = 0;
let upgrade7Pocet = 0;
let upgrade8Pocet = 0;
let upgrade1TotalIQ = 0;
let upgrade2TotalIQ = 0;
let upgrade3TotalIQ = 0;
let upgrade4TotalIQ = 0;
let upgrade5TotalIQ = 0;
let upgrade6TotalIQ = 0;
let upgrade7TotalIQ = 0;
let upgrade8TotalIQ = 0;

// init UPGRADE COST
// test
let upgrade1Cena = 10;
let upgrade2Cena = 100;
let upgrade3Cena = 1100;
let upgrade4Cena = 12000;
let upgrade5cena = 130000;
let upgrade6cena = 1500000;
let upgrade7cena = 22000000;
let upgrade8cena = 330000000;

//init Plavouci okno
function plavouciOkno(button, getText) {
    const okynko = document.createElement('div');
    okynko.className = 'okynko';
    document.body.appendChild(okynko);

    button.addEventListener('mouseover', (e) => {
        okynko.innerHTML = getText();
        const buttonRect = button.getBoundingClientRect(); 
        okynko.style.display = 'block';
        okynko.style.left = `${buttonRect.right + 30}px`;
        okynko.style.top = `${buttonRect.top}px`;
    });

    button.addEventListener('mouseout', () => {
        okynko.style.display = 'none';
    });
}

//blokování označování myší
document.addEventListener('mousedown', (event) => {
    event.preventDefault();
});

// init konstanty
const klikButton = document.getElementById('klik-button');
const upgrade1button = document.getElementById('upgrade1');
const upgrade2button = document.getElementById('upgrade2');
const upgrade3button = document.getElementById('upgrade3');
const upgrade4button = document.getElementById('upgrade4');
const upgrade5button = document.getElementById('upgrade5');
const upgrade6button = document.getElementById('upgrade6');
const upgrade7button = document.getElementById('upgrade7');
const upgrade8button = document.getElementById('upgrade8');
const zobrazSkore = document.getElementById('zobrazSkore');
const zobrazIQps = document.getElementById('iqps');

// Funkce pro výpočet IQps
function aktualizujIQps() {
    const iqps = (1 * upgrade2Pocet) + (5 * upgrade3Pocet) + (50 * upgrade4Pocet);
    zobrazIQps.textContent = `${iqps.toFixed(1)} IQ/s`;
}
setInterval(aktualizujIQps, 1000);

// Když kliknu
klikButton.addEventListener('click', () => {
    skoreIQ += hodnotaKliku;
    celkoveNasbiraneIQ += hodnotaKliku;
    upgrade1TotalIQ += hodnotaKliku;
    zobrazSkore.textContent = skoreIQ.toFixed(0);
});

// upgrade #1
upgrade1button.addEventListener('click', () => {
    if (skoreIQ >= upgrade1Cena) {
        skoreIQ -= upgrade1Cena;
        hodnotaKliku *= 1.001;
        upgrade1Cena *= 1.05;
        upgrade1Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        document.getElementById('upgrade1lvl').textContent = `LVL ${upgrade1Pocet}`;
        document.getElementById('upgrade1CenaAktualizovana').textContent = upgrade1Cena.toFixed(0);
    }
});
plavouciOkno(upgrade1button, () => `Neuromotorický upgrade

<i>"Zrychluje nervové dráhy a tím i efektivitu klikání."</i>

Neuromotorický upgrade umožní získat ${hodnotaKliku.toFixed(2)} IQ jedním klikem.
Neuromotorický upgrade zatím vygeneroval ${upgrade1TotalIQ.toFixed(0)} IQ.
Což je ${(upgrade1TotalIQ / celkoveNasbiraneIQ * 100).toFixed(1)}% z celkového množství IQ.`);

// upgrade #2
upgrade2button.addEventListener('click', () => {
    if (skoreIQ >= upgrade2Cena) {
        skoreIQ -= upgrade2Cena;
        upgrade2Cena *= 1.10;
        upgrade2Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        document.getElementById('upgrade2lvl').textContent = `LVL ${upgrade2Pocet}`;
        document.getElementById('upgrade2CenaAktualizovana').textContent = upgrade2Cena.toFixed(0);
        aktualizujIQps();
    }
});
plavouciOkno(upgrade2button, () => `Dopaminová pumpa

<i>"Automaticky generuje body za sekundu."</i>

Dopaminová pumpa vytváří ${(1.0 * upgrade2Pocet).toFixed(2)} IQps, což je ${((1 * upgrade2Pocet / ((1 * upgrade2Pocet) + (5 * upgrade3Pocet) + (50 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
Dopaminová pumpa zatím vytvořila ${upgrade2TotalIQ.toFixed(0)} IQ.
Což je ${(upgrade2TotalIQ / celkoveNasbiraneIQ * 100).toFixed(1)}% z celkového množství IQ.`);

// upgrade #3
upgrade3button.addEventListener('click', () => {
    if (skoreIQ >= upgrade3Cena) {
        skoreIQ -= upgrade3Cena;
        upgrade3Cena *= 1.10;
        upgrade3Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        document.getElementById('upgrade3lvl').textContent = `LVL ${upgrade3Pocet}`;
        document.getElementById('upgrade3CenaAktualizovana').textContent = upgrade3Cena.toFixed(0);
        aktualizujIQps();
    }
});
plavouciOkno(upgrade3button, () => `Bioprocesory

<i>"Elon říkal, že to půjde."</i>

Bioprocesory vytváří ${(5.0 * upgrade3Pocet).toFixed(2)} IQps, což je ${((5 * upgrade3Pocet / ((1 * upgrade2Pocet) + (5 * upgrade3Pocet) + (50 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
Bioprocesory zatím vytvořily ${upgrade3TotalIQ.toFixed(0)} IQ.
Což je ${(upgrade3TotalIQ / celkoveNasbiraneIQ * 100).toFixed(1)}% z celkového množství IQ.`);

// upgrade #4
upgrade4button.addEventListener('click', () => {
    if (skoreIQ >= upgrade4Cena) {
        skoreIQ -= upgrade4Cena;
        upgrade4Cena *= 1.10;
        upgrade4Pocet++;
        zobrazSkore.textContent = skoreIQ.toFixed(0);
        document.getElementById('upgrade4lvl').textContent = `LVL ${upgrade4Pocet}`;
        document.getElementById('upgrade4CenaAktualizovana').textContent = upgrade4Cena.toFixed(0);
        aktualizujIQps();
    }
});
plavouciOkno(upgrade4button, () => `Cloudová výpočetní síla

<i>"Proč k tomu nepoužít další mozky?"</i>

Cloudová výpočetní síla vytváří ${(50.0 * upgrade4Pocet).toFixed(2)} IQps, což je ${((50 * upgrade4Pocet / ((1 * upgrade2Pocet) + (5 * upgrade3Pocet) + (50 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
Cloudová výpočetní síla zatím vytvořila ${upgrade4TotalIQ.toFixed(0)} IQ.
Což je ${(upgrade4TotalIQ / celkoveNasbiraneIQ * 100).toFixed(1)}% z celkového množství IQ.`);

// Automatické přidávání bodů za sekundu
setInterval(() => {
    let bodyZaSekundu = (1.0 * upgrade2Pocet) + (5.0 * upgrade3Pocet) + (50.0 * upgrade4Pocet) + (275.0 * upgrade5Pocet) + (1500.0 * upgrade6Pocet) + (8250.0 * upgrade7Pocet) + (45000.0 * upgrade8Pocet);
    skoreIQ += bodyZaSekundu;
    celkoveNasbiraneIQ += bodyZaSekundu;
    upgrade2TotalIQ += (1.0 * upgrade2Pocet);
    upgrade3TotalIQ += (5.0 * upgrade3Pocet);
    upgrade4TotalIQ += (50.0 * upgrade4Pocet);
    upgrade5TotalIQ += (275.0 * upgrade5Pocet);
    upgrade6TotalIQ += (1500.0 * upgrade6Pocet);
    upgrade7TotalIQ += (8250.0 * upgrade7Pocet);
    upgrade8TotalIQ += (45000.0 * upgrade8Pocet);
    zobrazSkore.textContent = skoreIQ.toFixed(0);
}, 1000);

// Aktualizace ukazatele IQ za sekundu
setInterval(aktualizujIQps, 1000);
