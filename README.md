# On Mars Board Game Companion 🚀 (Danijel & Ceca)

Interaktivni pratilac (Companion Web App) za kompleksnu društvenu igru **On Mars** (dizajner: **Vital Lacerda**, ilustracije: **Ian O'Toole**), posebno prilagođen za mečeve u **2 igrača: Danijel (žuta boja) i Ceca (crvena boja)**.

---

## 🌟 Ključne Funkcionalnosti

1. **Brza Pretraga Pojmova i Komponenti (Search & Glossar)**
   - Instant pretraga svih akcija, pločica (Discovery, Research, Tech), zgrada (Mines, Generators, Greenhouses, Shelters, itd.), resursa, ugovora i pravila tokom igranja.
   - Prikaz originalnih engleskih i srpskih termina uz tačan broj strane u zvaničnom pravilniku.

2. **Pravila i Kalkulator za 2 Igrača (Danijel & Ceca)**
   - **Kalkulator cene Crvenog Koloniste (Red Colonist Cost):** u 2 igrača se plaća 1 kristal ili kolonista u Working Area za svakog prethodnog kolonistu na toj akciji (i Danijelovog i Cecinog!).
   - **Kompletna lista razlika:**
     - Magacin (Warehouse) ima samo po 2 od svakog resursa i kristala.
     - Tech Grid koristi samo 1 set pločica (8 se trajno uklanja) i nikada se ne dopunjava.
     - Pozicije početnih Skloništa za 2 igrača.
     - Pravilo čišćenja prepunih mesta za akcije.

3. **Faze Igre & Vodič kroz Akcije**
   - **Colony Side (Mars):** Control Center (Bot & Rover), Construct a Building (pravila za komplekse, tehnologije, minerale i LSS), Upgrade a Building, Welcome a Ship, Hire Scientist / Take Earth Contract.
   - **Orbit Side:** Landing Pod (hitno sletanje), Obtain Blueprint, Learn Tech, R&D, Resupply.
   - **Izvršne Akcije (Executive Actions):** otključavanje slotova u Depotu i sinergija sa Naučnicima.
   - **Shuttle Faza:** dijagram putovanja, postavljanje Discovery pločice na tačno 3 polja od Rovera, vraćanje kolonista i proizvodnja.

4. **Kraj Igre, Trigeri & Zvanični Tie-Break Kalkulator**
   - Uslovi za kraj (3 misije, ili Colony Lvl 3 -> 2 misije, Lvl 4 -> 1 misija, Lvl 5 -> trenutni kraj).
   - Pravilo poslednje runde (završava se tekuća runda + tačno još 1 runda bez Shuttle faze).
   - **Zvanični Tie-Break redosled (Strana 21):**
     1. Najviše Kristala u Depotu
     2. Najviše Naprednih Zgrada na mapi
     3. Najviše Kockica Progresa u Progress Area
     4. Deljena pobeda!
   - Interaktivni kalkulator bodova sa automatskim proglašenjem pobednika.

5. **Baza Rešenih Nedoumica (FAQ)**
   - Mogu li se minerali koristiti za Zemaljske ugovore? (NE!)
   - Šta se dešava kada se gradi preko bota ili kristala? (Displacement rule).
   - Kako funkcioniše korišćenje tuđe tehnologije (besplatni kiseonik i reakcija na kraju poteza).

---

## 🛠️ Kako Pokrenuti Lokalno

```bash
# Instalacija zavisnosti
npm install

# Pokretanje razvojnog servera
npm run dev
```

Aplikacija će raditi na `http://localhost:3000`.

---

## 🚀 Kako Objaviti na GitHub (GitHub Pages / Vercel)

### 1. Inicijalizacija i Push na GitHub:
```bash
git init
git add .
git commit -m "On Mars Companion App for Danijel and Ceca"
git branch -M main
git remote add origin https://github.com/VASE_KORISNICKO_IME/on-mars-companion.git
git push -u origin main
```

### 2. Besplatan Hosting:
- **Vercel (preporučeno):** Idite na [vercel.com](https://vercel.com), povežite GitHub nalog i uvezite ovaj repozitorijum. Sajt je onlajn za par sekundi.
- **GitHub Pages:** Projekat je već konfigurisan sa `base: './'` u `vite.config.ts`, tako da se može bildovati (`npm run build`) i distribuirati preko `gh-pages`.
