# Funkční specifikace: Braindead Clicker
## 1. Datový konceptuální model - textovy
### Popis dat v aplikaci
- **Skóre hráče:** 
  - `PROMĚNNÁ`: Celkové skóre hráče.
  - `PROMĚNNÁ`: Aktuální skóre hráče.
- **Upgrady:** \
Každý upgrade má:
  - Název (např. "NEUROMOTORICKÝ UPGRADE").
  - Cena (`PROMĚNNÁ`).
  - Aktuální úroveň (`PROMĚNNÁ`).
  - Celkový přínos (`PROMĚNNÁ`).
- **Rychlost získávání bodů:**
  - Body za sekundu (`PROMĚNNÁ`), generované upgrady.

### Konceptuální model
- **Entita: Hráč**
  - Atributy: `CELKOVE SKORE`, `SKORE ZA MINUTU`, `POCET UPGRADU`, atd.
  - Relace: Hráč vlastní několik upgradů.
- **Entita: Upgrade**
  - Atributy: `NAZEV`, `CENA`, `LEVEL`, `GENERUJE`.
`
---

## 2. Charakteristika funkcionality aplikace
### Hlavní funkce:
1. **Klikání:**
   - Hráč kliká na tlačítko a získává body (`PROMĚNNÁ`).
   - Body se přičítají k aktuálnímu skóre (`PROMĚNNÁ`).
2. **Automatické generování bodů:**
   - Některé upgrady zvyšují pasivní příjem bodů (`PROMĚNNÁ`).
3. **Upgrady:**
   - Nákup upgradů za body.
   - Upgrady zvyšují efektivitu klikání nebo přidávají pasivní příjem.
4. **Statistiky:**
   - Zobrazení nasbíraných bodů, rychlosti generování bodů a přehled upgradů.

---

## 3. Specifikace uživatelských rolí a oprávnění
### Role:
1. **Hráč:**
   - Přístup ke všem funkcím aplikace: `klikání`, `upgrady`, `statistiky`.
   - Žádné omezení přístupu.

> **Poznámka:** Další role (`tester`) nejsou aktuálně implementovány, ale mohou být přidány v budoucnu.

---

## 4. Uživatelské grafické rozhraní a jeho funkčnosti
### Hlavní části:
1. **Zóna klikání:**
   - Umístění - Levá část obrazovky
   - Obsahuje:
     - Tlačítko klikání (`HTML/CSS tlačítko`) s obrázkem.
     - Zobrazení skóre (`PROMĚNNÁ`).
     - Ukazatel bodů za sekundu (`PROMĚNNÁ`).
   - Funkce: Po kliknutí hráč získává body.

2. **Zóna upgradů:**
   - Umístění - Střední část obrazovky
   - Obsahuje:
     - Seznam dostupných upgradů (`UPGRADE1`, `UPGRADE2`, atd.).
     - Každý upgrade má tlačítko s `názvem`, `cenou` a `aktuální úrovní`.
   - Funkce: Po kliknutí se zvyšuje úroveň upgradu a aktualizují se jeho parametry.

3. **Statistiky:**
   - Umístění - Pravá část obrazovky
   - Obsahuje textové informace o stavu hry.

4. **Záhlaví a zápatí:**
   - **Záhlaví:** Název hry (`ZAHLAVI`).
   - **Zápatí:** Kontaktní informace (`ZAPATI`).

---

## 5. Návrh rozložení UI
### Návrh rozložení:
```plaintext
+----------------------------------+
|           Záhlaví               |
+----------------------------------+
|   Klikání   |   Upgrady   | Statistiky |
|             |             |            |
+----------------------------------+
|            Zápatí                 |
+----------------------------------+
```

---

## 6. Budoucí rozšíření
- statistika
- bonusy za určitý počet koupených upgradů
- náhodné události
- speciální obrázky pro každý upgrade
- hezčí rozhraní za použití bitmap obrázků

---
---


# Technické řešení a specifikace
## 1. Datový logický model
### Popis dat
Aplikace zpracovává následující logické entity:

1. **Hráč:**
   - **Atributy:**
     - `SKORE`: Aktuální skóre hráče.
     - `celkoveSkore`: Celkové nasbírané IQ.
     - `hodnotaKliknuti`: Počet bodů získaných za jeden klik.
   - **Logika:**
     - Hráč klikáním na tlačítko zvyšuje skóre (`Skore`).
     - Pasivní příjem bodů se počítá z aktivních upgradů.

2. **Upgrade:**
   - **Atributy:**
     - `nazev`: Název upgradu.
     - `uroven`: Úroveň upgradu (zvyšuje se při nákupu).
     - `cena`: Cena upgradu.
     - `celkoveSkore`: Celkové IQ generované upgradem.
   - **Logika:**
     - Cena upgradu roste exponenciálně s jeho úrovní.
     - Každý upgrade zvyšuje efektivitu klikání nebo generuje IQ za sekundu.

3. **Statistiky:**
   - **Atributy:**
     - `IQ za sekundu`: Body generované za sekundu.
   - **Logika:**
     - Statistiky se pravidelně aktualizují a zobrazují přehled výkonu hráče.

### Datové vazby
- Hráč vlastní několik upgradů.
- Statistiky jsou generovány na základě aktivních upgradů a akcí hráče.

---

## 2. Popis architektury a jejích jednotlivých částí
Aplikace je postavena na architektuře **front-end single-page aplikace**. Obsahuje následující vrstvy:

1. **Prezentační vrstva (HTML + CSS):**
   - Definuje strukturu a vzhled uživatelského rozhraní.
   - Skládá se ze sekcí:
     - `Zóna klikání`: Tlačítko pro získávání bodů, zobrazení skóre.
     - `Zóna upgradů`: Tlačítka pro nákup a správu upgradů.
     - `Statistiky`: Přehled generovaného IQ a dalších herních parametrů.

2. **Logická vrstva (JavaScript):**
   - Zajišťuje veškerou logiku hry, včetně:
     - Klikací mechanismus (přičítání bodů).
     - Dynamické aktualizace upgradů.
     - Výpočty bodů za sekundu.
     - Správa statistik.

3. **Dynamické prvky (DOM manipulace):**
   - Manipulace s DOM pro dynamické aktualizace:
     - Zobrazení skóre, statistik a úrovní upgradů.
     - Plovoucí popisky.

### Pracovní tok aplikace:
1. Uživatel kliká na hlavní tlačítko.
2. Body se přičítají a zobrazují ve skóre.
3. Uživatel nakupuje upgrady, které zvyšují efektivitu hry.
4. Statistiky se pravidelně aktualizují na základě aktuálního stavu hry.

---

## 3. Popis tříd a jejich funkcí
Aplikace je organizována pomocí funkcí a logických skupin proměnných. Pro rozšíření lze přejít na model tříd:

1. **Třída `hrac`:**
   - **Popis:** Reprezentuje hráče a jeho vlastnosti.
   - **Atributy:**
     - `skore`, `celkoveSkore`, `hodnotaKliknuti`.
   - **Metody:**
     - `klik()`: Zvyšuje skóre hráče o hodnotu `hodnotaKliku`.
     - `reset()`: Resetuje skóre hráče.

2. **Třída `Upgrade`:**
   - **Popis:** Spravuje upgrady a jejich logiku.
   - **Atributy:**
     - `nazev`, `cena`, `uroven`, `totalIQ`.
   - **Metody:**
     - `kupUpgrade()`: Zvýší úroveň upgradu, pokud má hráč dostatek bodů.
     - `vypocetIQps()`: Spočítá příspěvek upgradu k bodům za sekundu.

3. **Třída `Statistics`:**
   - **Popis:** Spravuje statistiky hráče.
   - **Atributy:**
     - `iqps`.
   - **Metody:**
     - `aktualizujStatistiky()`: Aktualizuje statistiky na základě stavu hry.

---

## 4. Použité technologie a funkčnosti jednotlivých částí aplikace
### Použité technologie:
1. **HTML:**
   - Definuje strukturu aplikace:
     - Sekce: Zóna klikání, zóna upgradů, statistiky.
     - Dynamické elementy: Tlačítka pro upgrady, zobrazování statistik.

2. **CSS:**
   - Zajišťuje vzhled aplikace:
     - Stylování tlačítek, textů a statistik.
     - Responzivní design pro různé velikosti obrazovek.
   - Klíčové třídy:
     - `.upgradeButton`: Styluje tlačítka upgradů.
     - `#klik-button`: Styluje hlavní tlačítko klikání.

3. **JavaScript:**
   - Realizuje logiku aplikace:
     - Funkce:
       - `klikButton.addEventListener('click', ...)`: Přidává body za kliknutí.
       - `aktualizujIQps()`: Aktualizuje body za sekundu.
       - `setInterval()`: Automaticky přičítá body za sekundu.
     - Manipulace s DOM:
       - Dynamické aktualizace skóre, statistik a tlačítek upgradů.

---

## 5. Funkčnosti jednotlivých částí aplikace
### Hlavní funkčnosti:
1. **Klikání:**
   - Zajišťuje aktivní přičítání bodů.
   - Dynamicky aktualizuje skóre hráče.

2. **Upgrady:**
   - Nabízí možnost zvýšit efektivitu klikání nebo generování bodů.
   - Dynamicky mění cenu upgradu na základě úrovně.

3. **Statistiky:**
   - Zobrazuje rychlost získávání bodů (`iqps`).
   - Poskytuje přehled o nasbíraných bodech a výkonu jednotlivých upgradů.

4. **Interaktivita:**
   - Plovoucí popisky (`mouseover`) pro zobrazení detailů upgradů.
   - Responzivní design zajišťující správné zobrazení na různých zařízeních.

---

## 6. Návrhy na rozšíření
- Implementace více uživatelských rolí (např. administrátor).
- Přidání nových typů upgradů s unikátními efekty.
- Rozšíření statistik o grafické zobrazení výkonu.
- Optimalizace pro mobilní zařízení.

---

## 7. Kontaktní údaje
Autor: Braindead Clicker tým \
Kontakt:[lukas.suchy@outlook.com](mailto:lukas.suchy@outlook.com) \
Betatest: [helmut_von_klobasa@outlook.com](mailto:helmut_von_klobasa@outlook.com)