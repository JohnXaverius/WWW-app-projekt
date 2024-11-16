// init VAR
let skoreIQ = 0;
let celkoveNasbiraneIQ = 0;
let hodnotaKliku = 100;
let upgrade2Interval = null;
let upgrade3Interval = null;
let upgrade4Interval = null;
let upgrade1Pocet = 0;
let upgrade2Pocet = 0;
let upgrade3Pocet = 0;
let upgrade4Pocet = 0;
let upgrade1TotalIQ = 0;
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
        setInterval(() => {
            okynko.innerHTML = getText();
        }, 1000);
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
const zobrazSkore = document.getElementById('zobrazSkore');
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
    celkoveNasbiraneIQ += hodnotaKliku;
    upgrade1TotalIQ += hodnotaKliku;
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

Dopaminová pumpa vytváří ${(0.5 * upgrade2Pocet).toFixed(2)} IQps, což je ${((0.5 * upgrade2Pocet / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
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

Bioprocesory vytváří ${(1 * upgrade3Pocet).toFixed(2)} IQps, což je ${((1 * upgrade3Pocet / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
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

Cloudová výpočetní síla vytváří ${(5 * upgrade4Pocet).toFixed(2)} IQps, což je ${((5 * upgrade4Pocet / ((0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet))) * 100).toFixed(1)}% z celkového počtu IQps.
Cloudová výpočetní síla zatím vytvořila ${upgrade4TotalIQ.toFixed(0)} IQ.
Což je ${(upgrade4TotalIQ / celkoveNasbiraneIQ * 100).toFixed(1)}% z celkového množství IQ.`);

// Automatické přidávání bodů za sekundu
setInterval(() => {
    let bodyZaSekundu = (0.5 * upgrade2Pocet) + (1 * upgrade3Pocet) + (5 * upgrade4Pocet);
    skoreIQ += bodyZaSekundu;
    celkoveNasbiraneIQ += bodyZaSekundu;
    upgrade2TotalIQ += (0.5 * upgrade2Pocet);
    upgrade3TotalIQ += (1 * upgrade3Pocet);
    upgrade4TotalIQ += (5 * upgrade4Pocet);
    zobrazSkore.textContent = skoreIQ.toFixed(0);
}, 1000);

// Aktualizace ukazatele IQ za sekundu
setInterval(aktualizujIQps, 1000);
