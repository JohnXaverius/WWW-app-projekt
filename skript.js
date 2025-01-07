// init VAR
let skoreIQ = 0;
let celkoveNasbiraneIQ = 0;
let hodnotaKliku = 1;
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
let upgrade1Cena = 10;
let upgrade2Cena = 100;
let upgrade3Cena = 1100;
let upgrade4Cena = 12000;
let upgrade5Cena = 130000;
let upgrade6Cena = 1500000;
let upgrade7Cena = 22000000;
let upgrade8Cena = 330000000;

//init Plavouci okno
function plavouciOkno(button, getText) {
  const okynko = document.createElement("div");
  okynko.className = "okynko";
  document.body.appendChild(okynko);

  button.addEventListener("mouseover", (e) => {
    okynko.innerHTML = getText();
    const buttonRect = button.getBoundingClientRect();
    okynko.style.display = "block";
    okynko.style.left = `${buttonRect.right + 30}px`;
    okynko.style.top = `${buttonRect.top}px`;
  });

  button.addEventListener("mouseout", () => {
    okynko.style.display = "none";
  });
}

//blokování označování myší
document.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

// init konstanty
const klikButton = document.getElementById("klik-button");
const upgrade1button = document.getElementById("upgrade1");
const upgrade2button = document.getElementById("upgrade2");
const upgrade3button = document.getElementById("upgrade3");
const upgrade4button = document.getElementById("upgrade4");
const upgrade5button = document.getElementById("upgrade5");
const upgrade6button = document.getElementById("upgrade6");
const upgrade7button = document.getElementById("upgrade7");
const upgrade8button = document.getElementById("upgrade8");
const zobrazSkore = document.getElementById("zobrazSkore");
const zobrazIQps = document.getElementById("iqps");
const resetButton = document.getElementById("resetovaniStatistik");
const saveButton = document.getElementById("ulozitStatistiku");

//hashovaci funkce
async function vytvorHash(dataString) {
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

// blok pro ukládání+načítání do a z localStorage, resetování hry a uloženého progresu
async function ulozitStavHry() {
  const stavHry = {
    skoreIQ: skoreIQ,
    celkoveNasbiraneIQ: celkoveNasbiraneIQ,
    hodnotaKliku: hodnotaKliku,
    upgrady: {
      upgrade1: { level: upgrade1Pocet, totalIQ: upgrade1TotalIQ },
      upgrade2: { level: upgrade2Pocet, totalIQ: upgrade2TotalIQ },
      upgrade3: { level: upgrade3Pocet, totalIQ: upgrade3TotalIQ },
      upgrade4: { level: upgrade4Pocet, totalIQ: upgrade4TotalIQ },
      upgrade5: { level: upgrade5Pocet, totalIQ: upgrade5TotalIQ },
      upgrade6: { level: upgrade6Pocet, totalIQ: upgrade6TotalIQ },
      upgrade7: { level: upgrade7Pocet, totalIQ: upgrade7TotalIQ },
      upgrade8: { level: upgrade8Pocet, totalIQ: upgrade8TotalIQ },
    },
  };

  const dataString = btoa(JSON.stringify(stavHry));
  const hash = await vytvorHash(dataString);

  localStorage.setItem("stavHry", dataString);
  localStorage.setItem("stavHryHash", hash);
  console.log("Stav hry uložen, hashován, base64-ován. :)");
}

function vypocetCenyUpgradu(zakladniCena, level, koeficient = 1.1) {
  return zakladniCena * Math.pow(koeficient, level);
}
async function nacistStavHry() {
  const ulozenyStav = localStorage.getItem("stavHry");
  const ulozenyHash = localStorage.getItem("stavHryHash");

  if (ulozenyStav && ulozenyHash) {
    const aktualniHash = await vytvorHash(ulozenyStav);

    if (ulozenyHash === aktualniHash) {
      const stavHry = JSON.parse(atob(ulozenyStav));
      console.log("Načteni OK.");

      skoreIQ = stavHry.skoreIQ;
      celkoveNasbiraneIQ = stavHry.celkoveNasbiraneIQ;
      hodnotaKliku = stavHry.hodnotaKliku;
      upgrade1Pocet = stavHry.upgrady.upgrade1.level;
      upgrade1TotalIQ = stavHry.upgrady.upgrade1.totalIQ;
      upgrade1Cena = vypocetCenyUpgradu(10, upgrade1Pocet);
      upgrade2Pocet = stavHry.upgrady.upgrade2.level;
      upgrade2TotalIQ = stavHry.upgrady.upgrade2.totalIQ;
      upgrade2Cena = vypocetCenyUpgradu(100, upgrade2Pocet);
      upgrade3Pocet = stavHry.upgrady.upgrade3.level;
      upgrade3TotalIQ = stavHry.upgrady.upgrade3.totalIQ;
      upgrade3Cena = vypocetCenyUpgradu(1100, upgrade3Pocet);
      upgrade4Pocet = stavHry.upgrady.upgrade4.level;
      upgrade4TotalIQ = stavHry.upgrady.upgrade4.totalIQ;
      upgrade4Cena = vypocetCenyUpgradu(12000, upgrade4Pocet);
      upgrade5Pocet = stavHry.upgrady.upgrade5.level;
      upgrade5TotalIQ = stavHry.upgrady.upgrade5.totalIQ;
      upgrade5Cena = vypocetCenyUpgradu(130000, upgrade5Pocet);
      upgrade6Pocet = stavHry.upgrady.upgrade6.level;
      upgrade6TotalIQ = stavHry.upgrady.upgrade6.totalIQ;
      upgrade6Cena = vypocetCenyUpgradu(1500000, upgrade6Pocet);
      upgrade7Pocet = stavHry.upgrady.upgrade7.level;
      upgrade7TotalIQ = stavHry.upgrady.upgrade7.totalIQ;
      upgrade7Cena = vypocetCenyUpgradu(22000000, upgrade7Pocet);
      upgrade8Pocet = stavHry.upgrady.upgrade8.level;
      upgrade8TotalIQ = stavHry.upgrady.upgrade8.totalIQ;
      upgrade8Cena = vypocetCenyUpgradu(330000000, upgrade8Pocet);
      aktualizovatZobrazeniUpgradu();
    } else {
      console.error("Uložená data byla změněna nebo jsou poškozená.");
      alert("Uložená data byla změněna nebo jsou poškozená.");
    }
  } else {
    console.log("Žádný uložený stav nenalezen.");
  }
}

setInterval(() => {
  ulozitStavHry();
  console.log("Stav hry uložen.");
}, 60000);

saveButton.addEventListener("click", () => {
  ulozitStavHry();
  console.log("Stav hry uložen.");
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem("stavHry");
  location.reload();
});

// Funkce pro výpočet IQps
function aktualizujIQps() {
  const iqps =
    1 * upgrade2Pocet +
    5 * upgrade3Pocet +
    50 * upgrade4Pocet +
    275.0 * upgrade5Pocet +
    1500.0 * upgrade6Pocet +
    8250.0 * upgrade7Pocet +
    45000.0 * upgrade8Pocet;
  zobrazIQps.textContent = `${new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(iqps)} IQ/s`;
}
setInterval(aktualizujIQps, 1000);

// Když kliknu
klikButton.addEventListener("click", () => {
  skoreIQ += hodnotaKliku;
  celkoveNasbiraneIQ += hodnotaKliku;
  upgrade1TotalIQ += hodnotaKliku;
  zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
});

// upgrade #1
upgrade1button.addEventListener("click", () => {
  if (skoreIQ >= upgrade1Cena) {
    skoreIQ -= upgrade1Cena;
    hodnotaKliku *= 1.001;
    upgrade1Pocet++;
    upgrade1Cena = vypocetCenyUpgradu(10, upgrade1Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade1lvl").textContent = `LVL ${upgrade1Pocet}`;
    document.getElementById("upgrade1CenaAktualizovana").textContent = Number(
      upgrade1Cena.toFixed(0)
    ).toLocaleString();
  }
});
plavouciOkno(
  upgrade1button,
  () => `Neuromotorický upgrade

<i>"Zrychluje nervové dráhy a tím i efektivitu klikání."</i>

Neuromotorický upgrade umožní získat ${hodnotaKliku.toFixed(
    2
  )} IQ jedním klikem.
Neuromotorický upgrade zatím vygeneroval ${upgrade1TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade1TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

// upgrade #2
upgrade2button.addEventListener("click", () => {
  if (skoreIQ >= upgrade2Cena) {
    skoreIQ -= upgrade2Cena;
    upgrade2Pocet++;
    upgrade2Cena = vypocetCenyUpgradu(100, upgrade2Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade2lvl").textContent = `LVL ${upgrade2Pocet}`;
    document.getElementById("upgrade2CenaAktualizovana").textContent = Number(
      upgrade2Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade2button,
  () => `Dopaminová pumpa

<i>"Automaticky generuje body za sekundu."</i>

Dopaminová pumpa vytváří ${(1.0 * upgrade2Pocet).toFixed(2)} IQps, což je ${(
    ((1 * upgrade2Pocet) /
      (1 * upgrade2Pocet + 5 * upgrade3Pocet + 50 * upgrade4Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Dopaminová pumpa zatím vytvořila ${upgrade2TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade2TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

// upgrade #3
upgrade3button.addEventListener("click", () => {
  if (skoreIQ >= upgrade3Cena) {
    skoreIQ -= upgrade3Cena;
    upgrade3Pocet++;
    upgrade3Cena = vypocetCenyUpgradu(1100, upgrade3Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade3lvl").textContent = `LVL ${upgrade3Pocet}`;
    document.getElementById("upgrade3CenaAktualizovana").textContent = Number(
      upgrade3Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade3button,
  () => `Bioprocesory

<i>"Elon říkal, že to půjde."</i>

Bioprocesory vytváří ${(5.0 * upgrade3Pocet).toFixed(2)} IQps, což je ${(
    ((5 * upgrade3Pocet) /
      (1 * upgrade2Pocet + 5 * upgrade3Pocet + 50 * upgrade4Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Bioprocesory zatím vytvořily ${upgrade3TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade3TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

// upgrade #4
upgrade4button.addEventListener("click", () => {
  if (skoreIQ >= upgrade4Cena) {
    skoreIQ -= upgrade4Cena;
    upgrade4Pocet++;
    upgrade4Cena = vypocetCenyUpgradu(12000, upgrade4Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade4lvl").textContent = `LVL ${upgrade4Pocet}`;
    document.getElementById("upgrade4CenaAktualizovana").textContent = Number(
      upgrade4Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade4button,
  () => `Cloudová výpočetní síla

<i>"Proč k tomu nepoužít další mozky?"</i>

Cloudová výpočetní síla vytváří ${(50.0 * upgrade4Pocet).toFixed(
    2
  )} IQps, což je ${(
    ((50 * upgrade4Pocet) /
      (1 * upgrade2Pocet + 5 * upgrade3Pocet + 50 * upgrade4Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Cloudová výpočetní síla zatím vytvořila ${upgrade4TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade4TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

//upgrade#5
upgrade5button.addEventListener("click", () => {
  if (skoreIQ >= upgrade5Cena) {
    skoreIQ -= upgrade5Cena;
    upgrade5Pocet++;
    upgrade5Cena = vypocetCenyUpgradu(130000, upgrade5Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade5lvl").textContent = `LVL ${upgrade5Pocet}`;
    document.getElementById("upgrade5CenaAktualizovana").textContent = Number(
      upgrade5Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade5button,
  () => `Overclock mozku

<i>"Troška elektrického proudu zrychlí CPU a co tvůj mozek?"</i>

Overclock mozku vytváří ${(275.0 * upgrade5Pocet).toFixed(2)} IQps, což je ${(
    ((275 * upgrade5Pocet) /
      (1 * upgrade2Pocet +
        5 * upgrade3Pocet +
        50 * upgrade4Pocet +
        275 * upgrade5Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Overclock mozku zatím vytvořil ${upgrade5TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade5TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

//upgrade#6
upgrade6button.addEventListener("click", () => {
  if (skoreIQ >= upgrade6Cena) {
    skoreIQ -= upgrade6Cena;
    upgrade6Pocet++;
    upgrade6Cena = vypocetCenyUpgradu(1500000, upgrade6Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade6lvl").textContent = `LVL ${upgrade6Pocet}`;
    document.getElementById("upgrade6CenaAktualizovana").textContent = Number(
      upgrade6Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade6button,
  () => `Genetická modifikace neuronů

<i>"Co kdyby neuron uměl víc než doteď?"</i>

Genetická modifikace neuronů vytváří ${(1500.0 * upgrade6Pocet).toFixed(
    2
  )} IQps, což je ${(
    ((1500 * upgrade6Pocet) /
      (1 * upgrade2Pocet +
        5 * upgrade3Pocet +
        50 * upgrade4Pocet +
        275 * upgrade5Pocet +
        1500 * upgrade6Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Genetická modifikace neuronů zatím vytvořila ${upgrade6TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade6TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

//upgrade#7
upgrade7button.addEventListener("click", () => {
  if (skoreIQ >= upgrade7Cena) {
    skoreIQ -= upgrade7Cena;
    upgrade7Pocet++;
    upgrade7Cena = vypocetCenyUpgradu(22000000, upgrade7Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade7lvl").textContent = `LVL ${upgrade7Pocet}`;
    document.getElementById("upgrade7CenaAktualizovana").textContent = Number(
      upgrade7Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade7button,
  () => `Synaptický upgrade

<i>"Optická vlákna místo synapsí?"</i>

Synaptický upgrade vytváří ${(8250.0 * upgrade7Pocet).toFixed(
    2
  )} IQps, což je ${(
    ((8250 * upgrade7Pocet) /
      (1 * upgrade2Pocet +
        5 * upgrade3Pocet +
        50 * upgrade4Pocet +
        275 * upgrade5Pocet +
        1500 * upgrade6Pocet +
        8250 * upgrade7Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Synaptický upgrade zatím vytvořil ${upgrade7TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade7TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

//upgrade#8
upgrade8button.addEventListener("click", () => {
  if (skoreIQ >= upgrade8Cena) {
    skoreIQ -= upgrade8Cena;
    upgrade8Pocet++;
    upgrade8Cena = vypocetCenyUpgradu(330000000, upgrade8Pocet);
    zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
    document.getElementById("upgrade8lvl").textContent = `LVL ${upgrade8Pocet}`;
    document.getElementById("upgrade8CenaAktualizovana").textContent = Number(
      upgrade8Cena.toFixed(0)
    ).toLocaleString();
    aktualizujIQps();
  }
});
plavouciOkno(
  upgrade8button,
  () => `Pozitronové vylepšení

<i>"Nahrazení kritckých částí mozků pozitronovými obvody."</i>

Pozitronové vylepšení vytváří ${(45000.0 * upgrade8Pocet).toFixed(
    2
  )} IQps, což je ${(
    ((45000 * upgrade8Pocet) /
      (1 * upgrade2Pocet +
        5 * upgrade3Pocet +
        50 * upgrade4Pocet +
        275 * upgrade5Pocet +
        1500 * upgrade6Pocet +
        8250 * upgrade7Pocet +
        45000 * upgrade8Pocet)) *
    100
  ).toFixed(1)}% z celkového počtu IQps.
Pozitronové vylepšení zatím vytvořila ${upgrade8TotalIQ.toFixed(0)} IQ.
Což je ${((upgrade8TotalIQ / celkoveNasbiraneIQ) * 100).toFixed(
    1
  )}% z celkového množství IQ.`
);

// Automatické přidávání bodů za sekundu
setInterval(() => {
  let bodyZaSekundu =
    1.0 * upgrade2Pocet +
    5.0 * upgrade3Pocet +
    50.0 * upgrade4Pocet +
    275.0 * upgrade5Pocet +
    1500.0 * upgrade6Pocet +
    8250.0 * upgrade7Pocet +
    45000.0 * upgrade8Pocet;
  skoreIQ += bodyZaSekundu;
  celkoveNasbiraneIQ += bodyZaSekundu;
  upgrade2TotalIQ += 1.0 * upgrade2Pocet;
  upgrade3TotalIQ += 5.0 * upgrade3Pocet;
  upgrade4TotalIQ += 50.0 * upgrade4Pocet;
  upgrade5TotalIQ += 275.0 * upgrade5Pocet;
  upgrade6TotalIQ += 1500.0 * upgrade6Pocet;
  upgrade7TotalIQ += 8250.0 * upgrade7Pocet;
  upgrade8TotalIQ += 45000.0 * upgrade8Pocet;
  zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
}, 1000);

// Aktualizace ukazatele IQ za sekundu
setInterval(aktualizujIQps, 1000);

function aktualizovatZobrazeniUpgradu() {
  document.getElementById("upgrade1lvl").textContent = `LVL ${upgrade1Pocet}`;
  document.getElementById("upgrade1CenaAktualizovana").textContent = Number(
    upgrade1Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade2lvl").textContent = `LVL ${upgrade2Pocet}`;
  document.getElementById("upgrade2CenaAktualizovana").textContent = Number(
    upgrade2Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade3lvl").textContent = `LVL ${upgrade3Pocet}`;
  document.getElementById("upgrade3CenaAktualizovana").textContent = Number(
    upgrade3Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade4lvl").textContent = `LVL ${upgrade4Pocet}`;
  document.getElementById("upgrade4CenaAktualizovana").textContent = Number(
    upgrade4Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade5lvl").textContent = `LVL ${upgrade5Pocet}`;
  document.getElementById("upgrade5CenaAktualizovana").textContent = Number(
    upgrade5Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade6lvl").textContent = `LVL ${upgrade6Pocet}`;
  document.getElementById("upgrade6CenaAktualizovana").textContent = Number(
    upgrade6Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade7lvl").textContent = `LVL ${upgrade7Pocet}`;
  document.getElementById("upgrade7CenaAktualizovana").textContent = Number(
    upgrade7Cena.toFixed(0)
  ).toLocaleString();
  document.getElementById("upgrade8lvl").textContent = `LVL ${upgrade8Pocet}`;
  document.getElementById("upgrade8CenaAktualizovana").textContent = Number(
    upgrade8Cena.toFixed(0)
  ).toLocaleString();
}

document.addEventListener("DOMContentLoaded", () => {
  nacistStavHry();
  zobrazSkore.textContent = Number(skoreIQ.toFixed(0)).toLocaleString();
  aktualizovatZobrazeniUpgradu();
  aktualizujIQps();
});
