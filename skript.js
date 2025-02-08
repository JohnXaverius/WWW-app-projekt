//třída pro definici kostry upgradu
class Upgrade {
  constructor(id, zaklCena, iqZaSekundu, nasobic, generatorPlavoucihoOkna) {
  this.id = id;
  this.zaklCena = zaklCena;
  this.aktualniCena = zaklCena;
  this.level = 0;
  this.totalIQ = 0;
  this.iqZaSekundu = iqZaSekundu;
  this.nasobic = nasobic;
  this.button = document.getElementById(id);
  this.generatorPlavoucihoOkna = generatorPlavoucihoOkna;
  this.init();
}

init() {
  this.vytvorPlavouciOkno();
  this.button.addEventListener("click", () => this.buy());
}

vytvorPlavouciOkno() {
  plavouciOkno(this.button, () => this.generatorPlavoucihoOkna());
}

buy() {
  if (Hrac.instance.skoreIQ >= this.aktualniCena) {
    Hrac.instance.skoreIQ -= this.aktualniCena;
    this.level++;
    this.aktualniCena = vypocetCenyUpgradu(this.zaklCena, this.level);

    if (this.id === "upgrade1") {
      Hrac.instance.hodnotaKliku *= this.nasobic;
    }

    Hrac.instance.aktualizujIQps();
  }
}

spocitejIQProdukci() {
  return this.level * this.iqZaSekundu;
}
}
//třída pro hráče
class Hrac {
static instance = null;
constructor() {
  if (Hrac.instance) return Hrac.instance;
  Hrac.instance = this;
  //init VAR
  this.skoreIQ = 0;
  this.celkoveNasbiraneIQ = 0;
  this.hodnotaKliku = 1000;
  this.upgrades = [];
  this.intervaly = [];
  this.naposledUlozeno = Date.now();
  this.definujUpgrady();
  this.priKliknuti();
  this.nacistStavHry();
  this.aktualizujIQSkore();
}

definujUpgrady() {
  const definiceUpgradu = [
    {
      id: "upgrade1",
      zaklCena: 10,
      iqZaSekundu: 0,
      nasobic: 1.01,
      tooltip:
        () => `Neuromotorický upgrade<br><i>"Zrychluje nervové dráhy a tím i efektivitu klikání."</i><br><br>
          Neuromotorický upgrade umožní získat ${Hrac.instance.hodnotaKliku.toFixed(
            2
          )} IQ jedním klikem.<br>
          Neuromotorický upgrade zatím vygeneroval ${this.upgrades[0].totalIQ.toFixed(0)} IQ<br>
          Což je ${(
            (this.upgrades[0].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },
    {
      id: "upgrade2",
      zaklCena: 100,
      iqZaSekundu: 1,
      nasobic: 1,
      tooltip:
        () => `Dopaminová pumpa<br><i>"Automaticky generuje body IQ za sekundu."</i><br><br>
          Dopaminová pumpa vytváří ${this.upgrades[1].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[1].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Dopaminová pumpa zatím vytvořila ${this.upgrades[1].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[1].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },
    {
      id: "upgrade3",
      zaklCena: 1100,
      iqZaSekundu: 5,
      nasobic: 1,
      tooltip:
        () => `Bioprocesory<br><i>"Elon říkal, že to půjde."</i><br><br>
          Bioprocesory vytváří ${this.upgrades[2].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[2].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Bioprocesory zatím vytvořily ${this.upgrades[2].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[2].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },      
    {
      id: "upgrade4",
      zaklCena: 12000,
      iqZaSekundu: 50,
      nasobic: 1,
      tooltip:
        () => `Cloudová výpočetní síla<br><i>"Proč k tomu nepoužít další mozky?"</i><br><br>
          Cloudová výpočetní síla vytváří ${this.upgrades[3].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[3].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Cloudová výpočetní síla zatím vytvořila ${this.upgrades[3].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[3].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },      
    {
      id: "upgrade5",
      zaklCena: 130000,
      iqZaSekundu: 275,
      nasobic: 1,
      tooltip:
        () => `Overclock mozku<br><i>"Troška elektrického proudu zrychlí CPU a co tvůj mozek?"</i><br><br>
          Overclock mozku vytváří ${this.upgrades[4].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[4].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Overclock mozku zatím vytvořil ${this.upgrades[4].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[4].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },      
    {
      id: "upgrade6",
      zaklCena: 1500000,
      iqZaSekundu: 1500,
      nasobic: 1,
      tooltip:
        () => `Genetická modifikace neuronů<br><i>"Co kdyby neuron uměl víc než doteď?"</i><br><br>
          Genetická modifikace neuronů vytváří ${this.upgrades[5].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[5].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Genetická modifikace neuronů zatím vytvořila ${this.upgrades[5].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[5].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },      
    {
      id: "upgrade7",
      zaklCena: 22000000,
      iqZaSekundu: 8250,
      nasobic: 1,
      tooltip:
        () => `Synaptický upgrade<br><i>"Optická vlákna místo synapsí?"</i><br><br>
          Synaptický upgrade vytváří ${this.upgrades[6].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[6].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Synaptický upgrade zatím vytvořil ${this.upgrades[6].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[6].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    },      
    {
      id: "upgrade8",
      zaklCena: 330000000,
      iqZaSekundu: 45000,
      nasobic: 1,
      tooltip:
        () => `Pozitronové vylepšení<br><i>"Nahrazení kritckých částí mozků pozitronovými obvody."</i><br><br>
          Pozitronové vylepšení vytváří ${this.upgrades[7].spocitejIQProdukci().toFixed(2)} IQ/s, což je<br>
          ${(
            (this.upgrades[7].spocitejIQProdukci() / this.getCelkoveIQ()) *
              100 || 0
          ).toFixed(1)}% z celkového počtu IQ/s.<br>
          Pozitronové vylepšení zatím vytvořilo ${this.upgrades[7].totalIQ.toFixed(0)} IQ.<br>
          Což je ${(
            (this.upgrades[7].totalIQ / this.celkoveNasbiraneIQ) * 100 || 0
          ).toFixed(1)}% z celkového množství IQ.`,
    }
  ];

  this.upgrades = definiceUpgradu.map(
    (config) =>
      new Upgrade(
        config.id,
        config.zaklCena,
        config.iqZaSekundu,
        config.nasobic,
        config.tooltip.bind(this)
      )
  );
}
// Když kliknu
priKliknuti() {
  document.getElementById("klik-button").addEventListener("click", () => {
    this.skoreIQ += this.hodnotaKliku;
    this.celkoveNasbiraneIQ += this.hodnotaKliku;
    this.upgrades[0].totalIQ += this.hodnotaKliku;
    this.aktualizujIQps();
  });

  document
    .getElementById("resetovaniStatistik")
    .addEventListener("click", () => {
      localStorage.removeItem("stavHry");
      location.reload();
    });

  document
    .getElementById("ulozitStatistiku")
    .addEventListener("click", () => this.ulozitStavHry());
}

aktualizujIQSkore() {
  this.intervaly.push(
    setInterval(() => {
      const IQ = this.getCelkoveIQ();
      this.skoreIQ += IQ;
      this.celkoveNasbiraneIQ += IQ;

      this.upgrades.forEach((upgrade, index) => {
        if (index > 0) {
          upgrade.totalIQ += upgrade.spocitejIQProdukci();
        }
      });

      this.aktualizujIQps();
    }, 1000)
  );

  this.intervaly.push(setInterval(() => {
      this.ulozitStavHry();
      console.log("Stav hry uložen automaticky po 60 sekundách.");
  }, 60000));
}

getCelkoveIQ() {
  return this.upgrades.reduce((acc, upgrade) => acc + upgrade.spocitejIQProdukci(), 0);
}

// Funkce pro výpočet IQps
aktualizujIQps() {
  document.getElementById("zobrazSkore").textContent = Number(
    this.skoreIQ.toFixed(0)
  ).toLocaleString();
  document.getElementById("iqps").textContent = `${new Intl.NumberFormat(
    "cs-CZ"
  ).format(this.getCelkoveIQ())} IQ/s`;

// Funkce pro výpočet ceny upgradu
  this.upgrades.forEach((upgrade) => {
    document.getElementById(
      `${upgrade.id}lvl`
    ).textContent = `LVL ${upgrade.level}`;
    document.getElementById(`${upgrade.id}CenaAktualizovana`).textContent =
      Number(upgrade.aktualniCena.toFixed(0)).toLocaleString();
  });
}
// blok pro ukládání+načítání do a z localStorage, resetování hry a uloženého progresu
//ulozeni
async ulozitStavHry() {
  const stavHry = {
    skoreIQ: this.skoreIQ,
    celkoveNasbiraneIQ: this.celkoveNasbiraneIQ,
    hodnotaKliku: this.hodnotaKliku,
    upgrady: this.upgrades.map((upgrade) => ({
      level: upgrade.level,
      totalIQ: upgrade.totalIQ,
      aktualniCena: upgrade.aktualniCena,
    })),
  };

  const dataString = btoa(JSON.stringify(stavHry));
  const hash = await vytvorHash(dataString);

  localStorage.setItem("stavHry", dataString);
  localStorage.setItem("stavHryHash", hash);
  console.log("Stav hry uložen, hashován, base64-ován. :)");
}
//nacteni
async nacistStavHry() {
  const ulozenyStav = localStorage.getItem("stavHry");
  const ulozenyHash = localStorage.getItem("stavHryHash");

  if (ulozenyStav && ulozenyHash) {
    const aktualniHash = await vytvorHash(ulozenyStav);

    if (aktualniHash === ulozenyHash) {
      const stavHry = JSON.parse(atob(ulozenyStav));
      console.log("Načteni OK.");

      this.skoreIQ = stavHry.skoreIQ;
      this.celkoveNasbiraneIQ = stavHry.celkoveNasbiraneIQ;
      this.hodnotaKliku = stavHry.hodnotaKliku;

      stavHry.upgrady.forEach((upgradeData, index) => {
        this.upgrades[index].level = upgradeData.level;
        this.upgrades[index].totalIQ = upgradeData.totalIQ;
        this.upgrades[index].aktualniCena = upgradeData.aktualniCena;
      });
    } else {
      console.error("Uložená data byla změněna nebo jsou poškozená.");
      alert("Uložená data byla změněna nebo jsou poškozená.");
    }
  } else {
    console.log("Žádný uložený stav nenalezen.");
  }
  this.aktualizujIQps();
}
}

////globalni funkce, nezávislé na třídách
//init vypocet ceny upgradu
function vypocetCenyUpgradu(zakladniCena, level, koeficient = 1.1) {
return zakladniCena * Math.pow(koeficient, level);
}

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

//hashovaci funkce
async function vytvorHash(dataString) {
const encoder = new TextEncoder();
const data = encoder.encode(dataString);
const hashBuffer = await crypto.subtle.digest("SHA-256", data);
const hashArray = Array.from(new Uint8Array(hashBuffer));
return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

// start hry + blokování označování myší - čeká na načtení HTML, proto na konci
document.addEventListener("DOMContentLoaded", () => {
new Hrac();
document.addEventListener("mousedown", (event) => event.preventDefault());
});