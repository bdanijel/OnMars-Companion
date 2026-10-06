import { GameAction, ComponentItem, SetupStep, FAQItem } from '../types';

export const PLAYERS = {
  danijel: {
    name: 'Danijel',
    color: 'yellow' as const,
    colorNameSr: 'Žuta',
    hexColor: '#eab308',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    badgeBorder: 'border-amber-500',
    accentBg: 'bg-amber-500',
    accentText: 'text-amber-400',
  },
  ceca: {
    name: 'Ceca',
    color: 'red' as const,
    colorNameSr: 'Crvena',
    hexColor: '#ef4444',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    badgeBorder: 'border-red-500',
    accentBg: 'bg-red-500',
    accentText: 'text-red-400',
  },
};

export const ACTIONS: GameAction[] = [
  // --- ORBIT ACTIONS ---
  {
    id: 'landing-pod',
    title: 'Sletanje Kapsulom (Landing Pod)',
    titleEn: 'Landing Pod',
    side: 'orbit',
    requiresRedColonist: false,
    costDescription: 'Besplatno (Nije potreban kolonista na tabli)',
    shortDesc: 'Hitno putovanje iz Orbite na Koloniju bez čekanja Šatla.',
    steps: [
      'Pomerite svoju figuru igrača na stranu Kolonije prateći pravila Shuttle Faze (strana 20).',
      'PRESKOČITE korak 1 (ne postavljate Discovery pločicu na tablu!).',
      'Izvršite vraćanje kolonista sa Kolonije (ako ih ima) i iz Working Area u Living Quarters.',
      'Postavite svoju figuru na slobodno Turn Order polje na strani Kolonije i uzmite bonus tog polja.',
      'Položite figuru (lay down) – vaš potez za ovu rundu je završen! Ako Šatl kasnije u rundi putuje, možete putovati sa njim regularno.'
    ],
    importantNotes: [
      'Korisno kada ste zaglavljeni u orbiti a hitno vam trebaju akcije na površini Marsa.',
      'Ne trošite brod iz hangara za ovo prinudno sletanje.'
    ],
    referencePage: 9
  },
  {
    id: 'obtain-blueprint',
    title: 'Uzmi Nacrt (Obtain Blueprint)',
    titleEn: 'Obtain Blueprint',
    side: 'orbit',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje akcije (+ trošak po kolonistima već na polju)',
    boostOptions: [
      'Teal Colonist: Pomerite 1 kolonistu u Working Area za svaki dodatni nacrt koji želite da uzmete.'
    ],
    shortDesc: 'Uzmite 1 Blueprint karticu iz ponude za buduća unapređenja zgrada.',
    steps: [
      'Postavite svog kolonistu iz Living Quarters na polje akcije (u 2 igrača plaćate 1 Kristal ili kolonistu u Working Area za svakog kolonistu koji je već tu, svog ili Cecinog/Danijelovog!).',
      'Izaberite 1 Blueprint kartu iz prikaza od 6 karata pored table.',
      'Uzmite resurs ili kristal prikazan u donjem desnom uglu karte u svoje skladište/depot.',
      'Postavite 1 svoj slobodni Advanced Building marker na kartu (ako nemate slobodnih markera, ne možete uzeti Blueprint!).',
      'Karta se stavlja otvorena pored vaše table. Dok je marker na njoj, izvršna akcija sa te karte se NE MOŽE koristiti.',
      'Ne vuče se zamenska karta odmah – displej se dopunjava tek pri Colony Status Update-u!'
    ],
    importantNotes: [
      'Nivo 1 Blueprint može unaprediti bilo koju zgradu tog tipa.',
      'Nivo 3 Blueprint zahteva da zgrada na Marsu bude deo kompleksa veličine bar 3!',
      'Na kraju igre svaki NEIZGRAĐENI nacrt donosi negativne poene: -3 OP za Lvl 1, -5 OP za Lvl 3!'
    ],
    referencePage: 10
  },
  {
    id: 'learn-technology',
    title: 'Nauči Novu Tehnologiju (Learn Technology)',
    titleEn: 'Learn new Technology',
    side: 'orbit',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje + cena sa Tech Grid-a (donji red: besplatno; srednji: 1 Baterija; gornji: 1 Baterija + 1 bilo koji resurs)',
    boostOptions: [
      'Teal Colonist: Pomerite 1 kolonistu u Working Area da uzmete još jednu Tech pločicu po istim pravilima cene.'
    ],
    shortDesc: 'Uzmite Tech pločicu sa Tech mreže i stavite je u najlevlju kolonu svoje laboratorije.',
    steps: [
      'Postavite kolonistu na akciju (platite dodatni trošak ako već ima kolonista).',
      'Izaberite pločicu iz Tech Grid-a i platite cenu u zavisnosti od reda gde se nalazi (Dno: besplatno; Sredina: 1 Baterija; Vrh: 1 Baterija + 1 resurs po izboru).',
      'Stavite pločicu na prazno polje u koloni 1 (najlevlja kolona) u svojoj laboratoriji. Ako su oba polja u koloni 1 zauzeta, ne možete uzeti ovu akciju!',
      'Odmah dobijate bonus odštampan na tom polju laboratorije (npr. kristal, resurs, pomeranje bota/rovera). Neki bonusi se mogu dodatno bustovati kolonistom!',
      'Pravilo unikatnosti: Svaki igrač sme imati samo 1 Tech pločicu svakog tipa!'
    ],
    importantNotes: [
      'U 2 IGRAČA: Koristi se samo 1 set Tech pločica, 8 rezervnih je uklonjeno iz igre, i Tech Grid se NIKADA ne dopunjava!',
      'Razvijena tehnologija donosi pobedničke poene na kraju igre (1, 2, 3, 4 ili 6 OP po pločici u zavisnosti od kolone).'
    ],
    referencePage: 10
  },
  {
    id: 'rnd-technology',
    title: 'Istraživanje i Razvoj (R&D)',
    titleEn: 'Research and Development',
    side: 'orbit',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje akcije (+ trošak po prisutnim kolonistima)',
    boostOptions: [
      'Teal Colonist: Za svakog poslatog kolonistu u Working Area razvijte bilo koju tehnologiju još 1 korak udesno (može i ista više puta).'
    ],
    shortDesc: 'Razvijte 1 Tech pločicu dvaput ili 2 različite Tech pločice po jednom udesno.',
    steps: [
      'Postavite kolonistu na polje akcije.',
      'Izvršite razvoj: 1 pločicu za 2 mesta udesno, ILI 2 pločice za po 1 mesto udesno.',
      'Za svako pomeranje u novu kolonu, platite resurs prikazan na vrhu te kolone (npr. Kiseonik, Voda, Baterija, Biljka).',
      'Ako polje na koje pomerite pločicu ima nacrtan bonus, odmah uzmite taj bonus (može se iskoristiti za plaćanje sledećeg koraka!).',
      'Pločica se može pomeriti samo na prazno polje u susednoj desnoj koloni.'
    ],
    importantNotes: [
      'Korišćenje tuđe tehnologije: Kad god koristite tehnologiju drugog igrača, taj igrač uzima 1 Kiseonik. Na kraju vašeg poteza taj igrač može BESPLATNO razviti tu svoju tehnologiju 1 korak (i vrati kiseonik), ili zadržati kiseonik ako ne želi/ne može!'
    ],
    referencePage: 11
  },
  {
    id: 'resupply',
    title: 'Snabdevanje iz Magacina (Resupply)',
    titleEn: 'Resupply',
    side: 'orbit',
    requiresRedColonist: false,
    costDescription: 'Besplatno (Nije potreban kolonista na tabli!)',
    boostOptions: [
      'Teal Colonist: Za svakog kolonistu poslatog u Working Area uzmite po 1 dodatni resurs ili kristal iz magacina (Warehouse).'
    ],
    shortDesc: 'Uzmite 1 resurs ili 1 kristal iz Warehouse-a u svoje skladište/depot.',
    steps: [
      'Deklarišite akciju Resupply.',
      'Uzmite 1 resurs (Mineral, Baterija, Voda, Biljka, Kiseonik) ili 1 Kristal iz magacina na glavnoj tabli.',
      'Ako pošaljete koloniste u Working Area, uzmite po još 1 stavku iz magacina za svakog.',
      'Pazite na kapacitet skladišta: Možete držati onoliko komada svakog resursa koliko imate Skloništa (Shelters) na mapi + 1! Kristali se čuvaju u slobodnim slotovima Depota.'
    ],
    importantNotes: [
      'Ne možete uzeti resurs/kristal ako nemate slobodnog mesta u skladištu/depotu!',
      'U 2 igrača: Magacin počinje sa samo po 2 primerka svakog resursa i kristala, i dopunjava se samo do 2 pri Colony Status Update-u.'
    ],
    referencePage: 11
  },

  // --- COLONY ACTIONS ---
  {
    id: 'control-center',
    title: 'Kontrolni Centar (Control Center: Botovi & Rover)',
    titleEn: 'Control Center',
    side: 'colony',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje akcije (+ trošak po prisutnim kolonistima)',
    boostOptions: [
      'Kristali (Depot): Svaki potrošeni kristal daje +1 Movement point za bota ili rovera.',
      'Rover Tech: Koristite nivo Rover tehnologije da povećate domet rovera.'
    ],
    shortDesc: 'Pomerite svoje Botove (2 poena kretanja) i svog Rovera (2 poena kretanja).',
    steps: [
      'Imate 2 poena kretanja za Botove i 2 poena za Rovera. Možete kombinovati redosled kako želite (npr. bot 1 polje, pa rover, pa bot još 1 polje).',
      'Trošenjem kristala iz Depota dobijate dodatne poene kretanja 1:1.',
      'Korišćenje Rover Tech pločice dodaje domet jednak nivou te tehnologije.',
      'ROVER: Sakuplja kristale samo prolaskom preko njih (idu ispod Depota za sledeći potez). Ako završi kretanje na Discovery ili Research pločici, uzima je ako plati cenu i ispunjava uslove.',
      'BOTOVI: Ako bot završi kretanje na Discovery/Research pločici, pločica se UNIŠTAVA i vraća u kutiju! Ako završi na kristalu, kristal se vraća u zalihu.',
      'Građevinska zona (Building Zone): Polje gde se bot nalazi i svih 6 susednih polja čine zonu u kojoj smete graditi i unapređivati zgrade!'
    ],
    importantNotes: [
      'Pravilo prelaženja: Botovi i Roveri mogu PROĆI kroz polje sa figurom, ali NE SMEJU završiti potez na polju sa drugom figurom (drugi bot, rover, kolonista ili advanced zgrada).',
      'Na početku igre Rover startuje na početnom Rudniku (Mine) u centru table!'
    ],
    referencePage: 12
  },
  {
    id: 'construct-building',
    title: 'Izgradi Zgradu (Construct a Building)',
    titleEn: 'Construct a Building',
    side: 'colony',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje + cena zgrade sa table (ili 1 Kiseonik za Sklonište)',
    boostOptions: [
      'Tehnologija (Tech): Obavezna za izgradnju kompleksa! Nivo tehnologije mora biti >= ukupnom broju postojećih zgrada u kompleksu.'
    ],
    shortDesc: 'Postavite novu zgradu (LSS, Rudnik ili Sklonište) na Mars u zoni svog bota.',
    steps: [
      '1. Izaberite zgradu: Rudnik (Mine), Generator, Vodeni Ekstraktor, Staklena bašta (Greenhouse), Kondenzator kiseonika, ili svoje najniže Sklonište (Shelter).',
      '2. Platite cenu prikazanu na tabli za zgrade. Za Sklonište se plaća 1 Kiseonik. Za Rudnik se NE plaća resurs, već se postavlja 1 kolonista iz Living Quarters na pločicu rudnika!',
      '3. Pozicija: Zgrada mora biti u zoni građenja jednog od vaših botova (na polju bota ili susednom). Može se postaviti: a) Susedno zgradi istog tipa (stvara KOMPLEKS – zahteva Tech pločicu nivoa jednakog ili većeg od veličine kompleksa na koji se spaja!), ili b) Tačno 2 polja daleko od iste zgrade (zasebna zgrada, ne traži Tech).',
      '4. Kristali: Ako poleđina pločice ima strelice, postavite 1 kristal iz opšte zalihe na svako susedno prazno polje na koje strelica pokazuje, pa okrenite pločicu licem nagore.',
      '5. Resursi: Dobijate onoliko resursa tog tipa kolika je nova veličina kompleksa (ili 1 resurs za zasebnu). Za Sklonište dobijate KRISTALE umesto resursa!',
      '6. Kockica progresa (Progress Cube): Prvi put u igri kada napravite ili povećate kompleks datog tipa (2+ povezane), pomerite svoju kockicu progresa na polje te zgrade u Progress Area.',
      '7. Pomerite LSS marker za 1 polje nagore ako je izgrađena LSS zgrada. Ako je marker bio ispod nivoa Kolonije, dobijate LSS nagradu i OP poene!'
    ],
    importantNotes: [
      'Displacement pravilo: Ako gradite preko kristala, kristal ide u zalihu. Ako gradite preko Discovery/Research pločice, vraća se u kutiju. Ako gradite preko bota/rovera, vlasnik ga pomera na najbliže slobodno polje!',
      'Skloništa protivnika se računaju kao različiti tipovi zgrada – ne možete se spojiti na tuđe sklonište!',
      'Skloništa NE pomeraju kockicu progresa u Progress Area!'
    ],
    referencePage: 13
  },
  {
    id: 'upgrade-building',
    title: 'Unapredi Zgradu u Naprednu (Upgrade a Building)',
    titleEn: 'Upgrade a Building',
    side: 'colony',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje + 1 Mineral u opštu zalihu',
    boostOptions: [
      'Upgrade Tech: Omogućava ponavljanje akcije onoliko puta koliki je nivo tehnologije (npr. nivo 2 tech omogućava do 3 unapređenja u istom potezu!).'
    ],
    shortDesc: 'Pretvorite osnovnu zgradu u Naprednu Zgradu (Advanced Building) pomoću svog Blueprint-a.',
    steps: [
      'Zgrada koja se unapređuje mora biti u građevinskoj zoni jednog vašeg bota.',
      'Izaberite svoj Blueprint koji odgovara tipu zgrade na mapi. Za Blueprint nivoa 3, zgrada MORA biti deo kompleksa veličine bar 3!',
      'Svaka zgrada na mapi može biti unapređena samo JEDNOM. Svaki Blueprint se može iskoristiti samo jednom.',
      'Za Sklonište (Shelter) smete unaprediti samo SVOJE sklonište, nikada tuđe!',
      'Platite 1 Mineral u opštu zalihu.',
      'Uzmite svoj Advanced Building marker sa Blueprint karte i postavite ga na unapređenu zgradu na mapi.',
      'Ako je na pločici bio kolonista (npr. rudar na rudniku), vraća se vlasniku u Living Quarters (ili ličnu zalihu ako nema mesta). Ako je bio bot/rover, primenjuje se displacement pravilo.',
      'Od sada ova zgrada donosi resurse tokom putovanja u Orbitu i otključava svoju Izvršnu Akciju (Executive Action)!'
    ],
    importantNotes: [
      'Naučnici mogu raditi u ovoj naprednoj zgradi: i vlasnik naučnika i vlasnik zgrade tada mogu besplatno koristiti njenu izvršnu akciju!'
    ],
    referencePage: 16
  },
  {
    id: 'welcome-ship',
    title: 'Dozovi Privatni Brod (Welcome a Ship)',
    titleEn: 'Welcome a Ship',
    side: 'colony',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje + 1 Biljka i 1 Voda (iz vašeg skladišta)',
    boostOptions: [
      'Teal Colonist: Pomerite kolonistu u Working Area za svaki dodatni brod koji želite dozvati (plaćate 1 Biljku i 1 Vodu za svaki brod!). Ne mogu se koristiti tek dobijeni kolonisti.'
    ],
    shortDesc: 'Premestite brod iz Depota u Hangar i osvojite nove koloniste/botove.',
    steps: [
      'Platite 1 Vodu i 1 Biljku u opštu zalihu.',
      'Premestite 1 svoj brod sa najvišeg slobodnog mesta u Depotu u svoj Hangar.',
      'Birate nagradu: a) 1 novi Kolonista i 1 novi Bot, ILI b) 2 nova Kolonista.',
      'Nove koloniste stavljate u slobodne slotove Living Quarters (ako nema mesta, stoje pored table).',
      'Novog bota stavljate na jedno od svojih praznih Skloništa. Ako su sva zauzeta, stavljate ga na najbliže slobodno polje do skloništa.',
      'Ograničenje broja brodova: Ukupan broj brodova uklonjenih iz Depota NE SME preći trenutni nivo Kolonije (Colony Level)! Npr. na nivou 2 kolonije možete imati najviše 2 broda uklonjena iz depota.'
    ],
    importantNotes: [
      'Brodovi u Hangaru vrede po 3 OP na kraju igre, ali se mogu žrtvovati u Shuttle fazi za vanredno putovanje!',
      'Svaki brod sklonjen iz depota otključava prostor za skladištenje još kristala i otključava novu Izvršnu Akciju (Executive Action)!'
    ],
    referencePage: 17
  },
  {
    id: 'hire-scientist-contract',
    title: 'Unajmi Naučnika ili Uzmi Ugovor (Hire Scientist / Earth Contract)',
    titleEn: 'Hire a Scientist or Take an Earth Contract',
    side: 'colony',
    requiresRedColonist: true,
    costDescription: '1 Crveni kolonista na polje (samo 1 slot po igraču!) + cena sa displeja',
    shortDesc: 'Unajmite jednog od 6 naučnika ili uzmite Zemaljski ugovor za poene na kraju igre.',
    steps: [
      'Pravilo slota: Za ovu akciju postoji SAMO JEDAN slot po igraču. Ne možete ponovo uzeti ovu akciju dok ne povučete svog kolonistu sa tog slota (npr. putovanjem u Orbitu)! Ovi slotovi se NE ČISTE automatski kada se popune.',
      'Platite cenu naznačenu na displeju: Za naučnika cena piše na tabli (npr. Geolog košta pomeranje 2 kolonista u Working Area; drugi koštaju kristale). Za Earth Contract cena je 1 Kristal.',
      'Uzmite kartu ispred sebe. Ako je naučnik, uzmite i figuru naučnika na kartu.',
      'Dopuna displeja na kraju vašeg poteza: Ako je uzet naučnik, polje se dopunjava Zemaljskim Ugovorom (Earth Contract) PO VAŠEM IZBORU iz špila ugovora (možete pregledati ceo špil i izabrati šta vam odgovara!). Karta se stavlja tako da pokrije staru cenu naučnika, ostavljajući ikonu kristala vidljivom.'
    ],
    importantNotes: [
      'Dva tipa Earth Ugovora: 1) Delivery Contract (traži resurse/kristale stavljene na kartu – MINERALI SE NE MOGU KORISTITI KAO ZAMENA!), 2) Upgrade Contract (traži vaš marker na zgradi u kompleksu veličine bar 4).',
      'Neispunjeni ugovor na kraju igre DONOSI MINUS POENE navedene na karti (-4, -6 OP itd.)!'
    ],
    referencePage: 17
  },

  // --- EXECUTIVE ACTIONS ---
  {
    id: 'executive-actions-overview',
    title: 'Izvršne Akcije (Executive Actions)',
    titleEn: 'Executive Actions',
    side: 'executive',
    requiresRedColonist: false,
    costDescription: 'Troše se Kristali iz Depota (količina zavisi od otključanog polja)',
    shortDesc: 'Možete uraditi tačno 1 Izvršnu Akciju po potezu (pre ili posle Glavne akcije).',
    steps: [
      'Izvršne akcije se nalaze levo od vašeg Depota. Dostupne su samo one akcije sa kojih je brod uklonjen u Hangar!',
      'Na početku igre imate otključane samo donje 3 akcije.',
      'Platite naznačeni broj kristala iz svog Depota u opštu zalihu (kristali dobijeni u istom potezu su ispod depota i ne mogu se trošiti!).',
      'Akcije uključuju: pomeranje rovera/bota, korišćenje sopstvene Napredne Zgrade (košta 2 kristala), osvežavanje, itd.',
      'Ako imate Naučnika u odgovarajućoj Naprednoj Zgradi (bilo svojoj ili protivnikovoj), ta akcija je BESPLATNA (0 kristala) i za vlasnika naučnika i za vlasnika zgrade!'
    ],
    importantNotes: [
      'Teal Colonist boosting: Neke napredne zgrade imaju ikonu plavog koloniste – možete poslati koloniste u Working Area da privremeno povećate nivo potrebne tehnologije!'
    ],
    referencePage: 18
  }
];

export const SETUP_STEPS: SetupStep[] = [
  {
    id: 's1',
    stepNumber: 1,
    title: 'Postavka Glavne Table i Discovery Pločica',
    description: 'Postavite glavnu tablu u sredinu stola (levo je Orbita, desno Kolonija). Promešajte Discovery pločice, stavite ih licem nadole pored table i otvorite gornje 2 na polje Exploration.',
    isTwoPlayerSpecial: false,
    pageRef: 4
  },
  {
    id: 's2',
    stepNumber: 2,
    title: 'Magacin (Warehouse) – VAŽNO ZA 2 IGRAČA',
    description: 'Postavite po 2 primerka svakog resursa u Warehouse: 2 Kristala, 2 Baterije, 2 Vode, 2 Biljke i 2 Kiseonika (u 3-4 igrača se stavlja po 3).',
    isTwoPlayerSpecial: true,
    twoPlayerNote: 'U 2 igrača: Samo po 2 od svakog resursa i kristala u magacinu! Takođe, tokom igre pri Colony Status Update-u dopunjava se samo do 2.',
    pageRef: 4
  },
  {
    id: 's3',
    stepNumber: 3,
    title: 'Tech Grid – VAŽNO ZA 2 IGRAČA',
    description: 'Odvojite 4 Shelter Tech pločice (u bojama igrača). Preostale Tech pločice podelite u dva seta po boji poleđine. Promešajte 1 set i poređajte nasumično licem nagore na Tech Grid.',
    isTwoPlayerSpecial: true,
    twoPlayerNote: 'U 2 igrača: Koristi se SAMO 1 set Tech pločica! Drugi set od 8 pločica se potpuno UKLANJA iz igre. Tech Grid se NIKADA ne dopunjava tokom cele partije!',
    pageRef: 4
  },
  {
    id: 's4',
    stepNumber: 4,
    title: 'Nacrti (Blueprints)',
    description: 'Razdvojite Blueprint karte na Lvl 1 i Lvl 3 špilove. Promešajte svaki zasebno. Stavite Lvl 1 špil PREKO Lvl 3 špila licem nadole. Otvorite gornjih 6 karata u prikaz pored table.',
    isTwoPlayerSpecial: false,
    pageRef: 4
  },
  {
    id: 's5',
    stepNumber: 5,
    title: 'Naučnici i Zemaljski Ugovori',
    description: 'Postavite tablu za naučnike pored glavne table. Postavite 6 naučnika sleva nadesno: Geolog, R&D Inženjer, Hidrolog, Biohemičar, Geohemičar, Sistem Inženjer. Prekrijte ikonu kristala gornjim delom karte (cena ostaje vidljiva). Postavite figuru naučnika na svaku kartu. Špil Earth Contracts stavite licem nadole pored.',
    isTwoPlayerSpecial: false,
    pageRef: 4
  },
  {
    id: 's6',
    stepNumber: 6,
    title: 'Početne Zgrade na Mapi',
    description: 'Postavite početni Rudnik (sa slovom S na poleđini) na označeno heks polje u centru table. Postavite preostale 4 početne zgrade (sa slovom S) nasumično na naznačena heks polja (zarez/notch mora biti okrenut ka dnu table!).',
    isTwoPlayerSpecial: false,
    pageRef: 5
  },
  {
    id: 's7',
    stepNumber: 7,
    title: 'Displej Zgrada i Research Pločice',
    description: 'Postavite Building displej sa gomilama zgrada poređanim po tipu licem nadole. Razvrstajte Research pločice po boji i slovu i stavite ih na naznačena polja na mapi (u odgovarajući ugao).',
    isTwoPlayerSpecial: false,
    pageRef: 5
  },
  {
    id: 's8',
    stepNumber: 8,
    title: 'Misije (Missions)',
    description: 'Razdvojite Mission karte na Short i Long. Za standardnu partiju: promešajte i izvucite 2 Short i 1 Long (ili 1 Short i 2 Long za dužu igru). Postavite kocke za praćenje misija na polja za 2 igrača (polje sa oznakom za 2 igrača!). Oznaku preostalih misija stavite na polje 3 trake misija.',
    isTwoPlayerSpecial: true,
    twoPlayerNote: 'Kockica za misiju se postavlja na polje koje odgovara broju igrača (2 igrača ima manji zahtev nego 4). Za prvu partiju preporučuje se First Colonists varijanta (strana 24).',
    pageRef: 5
  },
  {
    id: 's9',
    stepNumber: 9,
    title: 'Life Support System (LSS)',
    description: 'Oznaku nivoa kolonije (Colony Level) stavite na levo polje drugog reda (Colony level počinje na 1!). Oznake LSS traka stavite na dno svake kolone. Promešajte LSS Reward pločice i postavite 4 nasumično na vrh kolona (preostale 4 u kutiju).',
    isTwoPlayerSpecial: false,
    pageRef: 5
  },
  {
    id: 's10',
    stepNumber: 10,
    title: 'Postavka Igrača (Danijel - Žuta, Ceca - Crvena)',
    description: 'Svaki igrač uzima svoju tablu, OP marker na 0, po 1 od svih 5 resursa u Storage, 1 Kristal u Depot, svoju Shelter Tech pločicu u drugu kolonu laboratorije (srednje polje), 5 brodova na gornjih 5 mesta u Depotu, 4 Skloništa na svoju tablu i 1 Sklonište na mapu, 3 bota pored table i 1 bot na svoje sklonište na mapi, Rover pored table (računa se da startuje na početnom rudniku), 3 koloniste u Living Quarters (ostalih 9 pored table), 8 Advanced markera pored table, 5 kockica progresa ispod resursa, i 3 tajne Private Goal karte.',
    isTwoPlayerSpecial: true,
    twoPlayerNote: 'Početna skloništa za 2 igrača: Danijel (žuta) i Ceca (crvena) postavljaju svoja početna skloništa na specifična heks polja predviđena za 2 igrača (vidi dijagram na strani 6).',
    pageRef: 6
  },
  {
    id: 's11',
    stepNumber: 11,
    title: 'Prvi Igrač i Početak Šatla (Shuttle)',
    description: 'Igrač koji je najviše puta gledao film "Marsovac" (The Martian) je prvi igrač! U smeru kazaljke na satu, igrači biraju prazno Turn Order polje (1-8) i odmah uzimaju bonus tog polja. Igrač na polju sa najvećim brojem postavlja Šatl na crveno polje 1 (po svom izboru na Orbiti ili Koloniji).',
    isTwoPlayerSpecial: false,
    pageRef: 7
  }
];

export const COMPONENTS: ComponentItem[] = [
  {
    id: 'mine',
    name: 'Rudnik (Mine)',
    nameEn: 'Mine',
    category: 'building',
    icon: 'Pickaxe',
    description: 'Zgrada za vađenje minerala. Nije deo LSS sistema i minerali se ne mogu uzeti iz magacina.',
    rulesDetail: 'Izgradnja ne traži plaćanje resursa, već postavljanje 1 koloniste iz Living Quarters direktno na rudnik (postaje Rudar). Prilikom svakog putovanja u Orbitu, svaki vaš rudar proizvodi po 1 Mineral! Rudnik može unaprediti bilo koji igrač (tada se kolonista vraća vlasniku).',
    pageRef: 15
  },
  {
    id: 'generator',
    name: 'Generator Energije (Power Generator)',
    nameEn: 'Power Generator',
    category: 'building',
    icon: 'Zap',
    description: 'LSS zgrada koja generiše Baterije. Potrebna za izgradnju Vodenih Ekstraktora.',
    rulesDetail: 'Izgradnja košta Minerale prema tabeli. Povećava LSS traku za struju. Donosi baterije u zavisnosti od veličine kompleksa.',
    pageRef: 13
  },
  {
    id: 'water-extractor',
    name: 'Ekstraktor Vode (Water Extractor)',
    nameEn: 'Water Extractor',
    category: 'building',
    icon: 'Droplets',
    description: 'LSS zgrada koja ekstrahuje vodu iz leda. Zahteva Baterije za izgradnju.',
    rulesDetail: 'Izgradnja košta Baterije. Povećava LSS traku za vodu. Proizvodi Vodu.',
    pageRef: 13
  },
  {
    id: 'greenhouse',
    name: 'Staklena Bašta (Greenhouse)',
    nameEn: 'Greenhouse',
    category: 'building',
    icon: 'Leaf',
    description: 'LSS zgrada koja gaji biljke i proizvodi hranu. Zahteva Vodu za izgradnju.',
    rulesDetail: 'Izgradnja košta Vodu. Povećava LSS traku za hranu/biljke. Proizvodi Biljke (Plants).',
    pageRef: 13
  },
  {
    id: 'oxygen-condenser',
    name: 'Kondenzator Kiseonika (Oxygen Condenser)',
    nameEn: 'Oxygen Condenser',
    category: 'building',
    icon: 'Wind',
    description: 'LSS zgrada koja kondenzuje kiseonik. Zahteva Biljke za izgradnju.',
    rulesDetail: 'Izgradnja košta Biljke. Povećava LSS traku za kiseonik. Proizvodi Kiseonik.',
    pageRef: 13
  },
  {
    id: 'shelter',
    name: 'Sklonište (Shelter)',
    nameEn: 'Shelter',
    category: 'building',
    icon: 'Home',
    description: 'Stambeni prostor za koloniste u vašoj boji. Zahteva Kiseonik za izgradnju.',
    rulesDetail: 'Izgradnja košta 1 Kiseonik. Donosi Kristale umesto resursa! Svako izgrađeno sklonište povećava kapacitet skladišta za +1 za svaki resurs, i otvara +2 mesta u Living Quarters. Možete unaprediti samo sopstveno sklonište!',
    pageRef: 13,
    twoPlayerNote: 'Početno sklonište se postavlja na posebno označena polja za 2 igrača (vidi dijagram p.6).'
  },
  {
    id: 'crystals',
    name: 'Kristali (Marsinum / Uranijum)',
    nameEn: 'Crystals (Marsinum)',
    category: 'resource',
    icon: 'Gem',
    description: 'Glavna univerzalna valuta Marsa. Koristi se za izvršne akcije, plaćanje prolaza i kretanje.',
    rulesDetail: 'KRITIČNO PRAVILO: Svi kristali dobijeni tokom vašeg poteza stavljaju se ISPOD Depota – ne možete ih trošiti u istom potezu! Tek na početku vašeg sledećeg poteza premeštaju se u Depot. Ako nemate mesta u depotu, višak propada u opštu zalihu.',
    pageRef: 7
  },
  {
    id: 'minerals',
    name: 'Minerali (Minerals)',
    nameEn: 'Minerals',
    category: 'resource',
    icon: 'Boxes',
    description: 'Univerzalni građevinski resurs na površini Marsa.',
    rulesDetail: 'Minerali se mogu koristiti UMESTO BILO KOG DRUGOG RESURSA (Baterije, Voda, Biljka, Kiseonik), ali NE umesto kristala! IZUZETAK: Minerali se NE MOGU koristiti kao zamena za ispunjavanje Zemaljskih Ugovora (Earth Contracts)!',
    pageRef: 7
  },
  {
    id: 'rover',
    name: 'Istraživački Rover (Rover)',
    nameEn: 'Rover',
    category: 'unit',
    icon: 'Compass',
    description: 'Vozilo za istraživanje površine i sakupljanje kristala i pločica.',
    rulesDetail: 'Startuje na početnom rudniku u centru. Sakuplja kristale samim prolaskom preko njih. Može uzeti Discovery ili Research pločicu samo ako završi kretanje na tom polju i plati cenu. Ne može završiti na polju gde je druga figura.',
    pageRef: 12
  },
  {
    id: 'bot',
    name: 'Građevinski Bot (Bot)',
    nameEn: 'Bot',
    category: 'unit',
    icon: 'Bot',
    description: 'Autonomni robot za izgradnju i pripremu terena.',
    rulesDetail: 'Definiše vašu "Building Zone" (polje gde se nalazi + svih 6 susednih polja). Samo u ovoj zoni možete graditi i unapređivati! Ako bot završi kretanje na Discovery/Research pločici, pločica se UNIŠTAVA iz igre. Ako završi na kristalu, kristal ide u zalihu.',
    pageRef: 12
  },
  {
    id: 'colonist-red',
    name: 'Crveni Kolonista (Red Colonist Icon)',
    nameEn: 'Red Colonist Action Slot',
    category: 'mechanic',
    icon: 'UserPlus',
    description: 'Zahtev za slanje koloniste iz Living Quarters na akciju.',
    rulesDetail: 'U 2 IGRAČA: Za svakog kolonistu koji se već nalazi na slotovima te akcije (bilo vašeg ili protivnikovog!), morate platiti 1 Kristal ili pomeriti 1 kolonistu iz Living Quarters u Working Area! Ako su sva mesta popunjena, sklanjaju se kolonisti igrača sa najviše figura u Working Area pre plaćanja.',
    pageRef: 9,
    twoPlayerNote: 'U 2 igrača formula glasi: 1 Kristal ili kolonista u Working Area po SVAKOM kolonisti na toj akciji (ukupno), a ne po broju boja kao u 3-4 igrača!'
  },
  {
    id: 'colonist-teal',
    name: 'Tirkizni Kolonista (Teal Colonist Icon)',
    nameEn: 'Teal Colonist (Boost)',
    category: 'mechanic',
    icon: 'Users',
    description: 'Mogućnost pojačavanja akcije slanjem kolonista u Working Area.',
    rulesDetail: 'Pomeranjem koloniste iz Living Quarters u Working Area povećavate snagu akcije (npr. uzimanje dodatnog resursa, dodatnog nacrta, ili veći nivo tech-a). Svi kolonisti iz Working Area vraćaju se u Living Quarters tek kada putujete Šatlom!',
    pageRef: 8
  },
  {
    id: 'tech-tile',
    name: 'Tehnološke Pločice (Tech Tiles)',
    nameEn: 'Tech Tiles',
    category: 'mechanic',
    icon: 'Cpu',
    description: 'Poboljšavaju akcije i omogućavaju gradnju većih kompleksa.',
    rulesDetail: 'Postavljaju se u laboratoriju. Kada koristite tehnologiju drugog igrača, taj igrač uzima 1 Kiseonik, i na kraju vašeg poteza može BESPLATNO razviti tu tehnologiju 1 korak udesno! Na kraju igre donose poene zavisno od nivoa (1, 2, 3, 4 ili 6 OP).',
    pageRef: 11,
    twoPlayerNote: 'U 2 igrača se koristi samo 1 set (drugi se odbacuje) i nikada se ne dopunjava na tabli!'
  },
  {
    id: 'scientists',
    name: 'Naučnici (Scientists)',
    nameEn: 'Scientists',
    category: 'card',
    icon: 'GraduationCap',
    description: '6 specijalizovanih naučnika koji daju besplatne akcije i poene.',
    rulesDetail: 'Mogu se poslati da rade na Naprednim zgradama (i vašim i protivnikovim!). Dok je naučnik na zgradi, i vlasnik naučnika i vlasnik zgrade koriste tu akciju BESPLATNO kao izvršnu akciju! Na kraju igre svaki naučnik donosi 3 OP po svakoj Naprednoj zgradi svoje specijalnosti na mapi (bez obzira ko je vlasnik!).',
    pageRef: 18
  },
  {
    id: 'earth-contracts',
    name: 'Zemaljski Ugovori (Earth Contracts)',
    nameEn: 'Earth Contracts',
    category: 'card',
    icon: 'FileCheck',
    description: 'Ugovori koji donose velike poene na kraju igre, ali i kazne ako se ne ispune!',
    rulesDetail: 'Delivery ugovori: zahtevaju stavljanje resursa i kristala na samu kartu (ne mogu se koristiti minerali kao zamena!). Upgrade ugovori: traže vaš marker na zgradi u kompleksu veličine bar 4. Ako ne ispunite ugovor na kraju igre, GUBITE označene poene!',
    pageRef: 17
  },
  {
    id: 'displacement',
    name: 'Pravilo Pomeranja (Displacement Rule)',
    nameEn: 'Displacement Rule',
    category: 'mechanic',
    icon: 'Move',
    description: 'Šta se dešava kada se gradi preko drugih komponenti na mapi.',
    rulesDetail: '1. Preko kristala: Kristal se vraća u opštu zalihu. 2. Preko Discovery/Research pločice: Pločica se vraća u kutiju igre (uništena). 3. Preko bota ili rovera: Vlasnik ga pomera na najbliže slobodno polje (prazan heks ili zgrada bez druge figure).',
    pageRef: 13
  },
  {
    id: 'building-complex',
    name: 'Kompleks Zgrada (Building Complex)',
    nameEn: 'Building Complex',
    category: 'building',
    icon: 'Layers',
    description: 'Grupa spojenih zgrada istog tipa.',
    rulesDetail: 'Da biste spojili zgradu sa postojećom zgradom istog tipa, MORATE upotrebiti Tech pločicu tog tipa, čiji nivo mora biti veći ili jednak ukupnom broju postojećih zgrada u kompleksu. Zasebna zgrada (tačno 2 heksa daleko) NE zahteva tehnologiju.',
    pageRef: 14
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-minerals-contract',
    question: 'Mogu li se Minerali koristiti umesto drugih resursa za ispunjavanje Zemaljskih Ugovora (Earth Contracts)?',
    answer: 'NE! Minerali se mogu koristiti umesto bilo kog resursa za gradnju, LSS i troškove, ALI NE i za ispunjavanje ugovora. Na Delivery Contract se moraju staviti isključivo tačni nacrtani resursi i kristali.',
    category: 'contracts',
    pageRef: 7,
    highlight: true
  },
  {
    id: 'faq-red-colonist-2p',
    question: 'Kako tačno funkcioniše cena za Crvenog Kolonistu na akciji u 2 igrača (Danijel i Ceca)?',
    answer: 'U partiji za 2 igrača plaćate 1 Kristal ili šaljete 1 kolonistu u Working Area za SVAKOG kolonistu koji se već nalazi na slotovima te akcije – bez obzira da li je to vaš sopstveni ili protivnikov kolonista! (U 3-4 igrača se broje samo različite tuđe boje, ali u 2 igrača se broji svaka pojedinačna figura!).',
    category: 'twoplayer',
    pageRef: 9,
    highlight: true
  },
  {
    id: 'faq-action-slots-full',
    question: 'Šta se dešava kada su sva mesta za koloniste na nekoj akciji popunjena?',
    answer: 'Pre nego što odigrate akciju, uklonite SVE koloniste igrača koji ima najviše kolonista na tim slotovima (ako je nerešeno, sklanjaju se svi izjednačeni!). Ti kolonisti se vraćaju u Working Area svojih vlasnika. Zatim plaćate dodatni trošak samo za one koloniste koji su preostali na slotovima.',
    category: 'actions',
    pageRef: 9
  },
  {
    id: 'faq-hire-scientist-full',
    question: 'Da li se slotovi za akciju "Hire Scientist / Take Contract" ikada automatski čiste kao ostali?',
    answer: 'NE! Za razliku od ostalih akcija, polje za Naučnike/Ugovore ima samo po 1 slot po igraču i ta mesta se NIKADA ne čiste kada se popune. Svojog kolonistu sa tog mesta možete povući isključivo kada putujete Šatlom na drugu stranu table!',
    category: 'actions',
    pageRef: 17,
    highlight: true
  },
  {
    id: 'faq-crystals-timing',
    question: 'Kada tačno mogu da trošim kristale koje sam dobio u toku poteza?',
    answer: 'Kristali dobijeni tokom poteza se stavljaju ISPOD vašeg Depota. NE MOŽETE ih trošiti u istom potezu u kome ste ih dobili! Tek na početku vašeg SLEDEĆEG poteza prebacujete ih gore u Depot. Ako nemate dovoljno slobodnih mesta u depotu, višak se vraća u opštu zalihu.',
    category: 'colonists',
    pageRef: 7,
    highlight: true
  },
  {
    id: 'faq-use-opponent-tech',
    question: 'Šta se dešava kada iskoristim tehnologiju drugog igrača?',
    answer: 'Možete slobodno iskoristiti tuđu tehnologiju! Kada to uradite, taj igrač odmah uzima 1 Kiseonik iz opšte zalihe na vrh svoje table. Na kraju vašeg poteza, taj igrač ima pravo da BESPLATNO razvije tu tehnologiju 1 korak udesno (i vrati kiseonik u zalihu) ili da zadrži kiseonik ako ne može/ne želi da razvije tehnologiju.',
    category: 'tech',
    pageRef: 11,
    highlight: true
  },
  {
    id: 'faq-end-game-trigger',
    question: 'Kada se tačno trigeruje kraj igre?',
    answer: 'Kraj igre se trigeruje na kraju Colonization faze kada oznaka preostalih misija (Remaining Missions marker) stigne na polje 1 i potom se pomeri van trake. To se dešava kada se završe ukupno 3 misije, ILI brže ako nivo kolonije poraste: na nivou 3 kolonije potrebne su 2 misije; na nivou 4 samo 1 misija; na nivou 5 kolonije kraj se trigeruje ODMAH bez obzira na misije!',
    category: 'endgame',
    pageRef: 19,
    highlight: true
  },
  {
    id: 'faq-final-round-rules',
    question: 'Šta se tačno igra nakon što se trigeruje kraj igre?',
    answer: 'Kada se trigeruje kraj igre, igra se do kraja tekuće runde, i zatim se igra još TAČNO JEDNA PUNA RUNDA! U toj poslednjoj rundi se PRESKAČE Shuttle Faza (nema putovanja). Svi kristali stečeni u poslednjoj rundi se prebacuju u depot pre konačnog bodovanja.',
    category: 'endgame',
    pageRef: 21,
    highlight: true
  },
  {
    id: 'faq-tie-break',
    question: 'Šta se radi u slučaju istog broja poena (Tie-Break pravila)?',
    answer: 'Ako dva igrača imaju isti broj OP poena na kraju igre, pobednik se određuje sledećim redosledom:\n1. Igrač sa više Kristala u Depotu;\n2. Ako je i dalje nerešeno: Igrač sa više Naprednih Zgrada (Advanced Buildings) na Marsu;\n3. Ako je i dalje nerešeno: Igrač sa više Kockica Progresa u Progress Area;\n4. Ako je i dalje nerešeno: Igrači dele pobedu!',
    category: 'endgame',
    pageRef: 21,
    highlight: true
  },
  {
    id: 'faq-build-complex-requirements',
    question: 'Koliki nivo Tech pločice mi je potreban da proširim kompleks?',
    answer: 'Nivo tehnologije mora biti jednak ili veći od UKUPNOG broja zgrada koje već čine taj kompleks! Na primer, ako spajate novu zgradu na kompleks od 2 zgrade, potreban vam je Tech nivoa bar 2. Ako novu zgradu stavljate između dve zgrade tako da spajate 3 zgrade, potreban vam je Tech nivoa 3.',
    category: 'actions',
    pageRef: 14
  },
  {
    id: 'faq-build-standalone',
    question: 'Mogu li da izgradim zgradu bez odgovarajuće tehnologije?',
    answer: 'DA! Ako zgradu postavite tačno 2 heksa daleko od bilo koje postojeće zgrade tog tipa (tako da nije susedna nijednoj istoj zgradi), tehnologija vam uopšte NIJE potrebna! To se smatra zasebnom zgradom (Standalone) i proizvodi 1 resurs.',
    category: 'actions',
    pageRef: 13
  },
  {
    id: 'faq-shelters-progress-cube',
    question: 'Da li izgradnja kompleksa Skloništa (Shelters) pomera kockicu progresa u Progress Area?',
    answer: 'NE! Pravilo eksplicitno navodi: izgradnja kompleksa Skloništa NE pomera kockicu progresa u Progress Area. Kockice progresa se pomeraju samo za Rudnike, Generatore, Vodene Ekstraktore, Staklene bašte i Kondenzatore kiseonika.',
    category: 'lss',
    pageRef: 13
  },
  {
    id: 'faq-private-goals-crystals',
    question: 'Kako mogu da iskoristim Private Goal karte kao kristale?',
    answer: 'Tokom svog poteza možete odbaciti bilo koju Private Goal kartu iz ruke (tajno je vratite u kutiju igre) i iskoristiti je DIREKTNO kao 1 Kristal za plaćanje troškova tog poteza! Ne uzimate fizički kristal u depot, već je karta instant zamena za kristal.',
    category: 'colonists',
    pageRef: 19
  },
  {
    id: 'faq-shuttle-free-travel',
    question: 'Ko ima pravo na besplatno putovanje Šatlom?',
    answer: 'Samo igrač čija se figura nalazi na strani table SA KOJE Šatl upravo polazi! Ako Šatl ne putuje u toj rundi, ili ako ste na suprotnoj strani table a želite da putujete, morate platiti žrtvovanjem jednog broda iz svog Hangara (vraća se u kutiju igre).',
    category: 'actions',
    pageRef: 19
  },
  {
    id: 'faq-discovery-placement-3-hexes',
    question: 'Gde se tačno postavlja Discovery pločica prilikom putovanja na Koloniju?',
    answer: 'Pločica se uzima sa Exploration polja i postavlja se na prazan heks TAČNO 3 polja udaljen od vašeg Rovera! Ako vaš rover još nije stupio na mapu, računa se kao da je na početnom rudniku u centru. Ako nema slobodnog heksa na tačno 3 polja, pločica se ne postavlja.',
    category: 'actions',
    pageRef: 20
  },
  {
    id: 'faq-living-quarters-capacity',
    question: 'Koliki je kapacitet Living Quarters za koloniste?',
    answer: 'Početni kapacitet je 4 kolonista. Svako dodatno izgrađeno Sklonište na mapi otključava još +2 slota u Living Quarters. Ako kolonisti treba da uđu a nema mesta, višak se drži pored table u ličnoj zalihi.',
    category: 'colonists',
    pageRef: 6
  },
  {
    id: 'faq-unbuilt-blueprints-penalty',
    question: 'Kolika je tačno kazna za neizgrađene Blueprinte na kraju igre?',
    answer: 'Za svaki Blueprint nivoa 1 koji niste uspeli da ugradite u naprednu zgradu gubite 3 OP (-3). Za svaki Blueprint nivoa 3 koji niste ugradili gubite čak 5 OP (-5)! Budite pažljivi kada uzimate nacrte u orbiti.',
    category: 'endgame',
    pageRef: 21,
    highlight: true
  }
];

export const SCORING_CATEGORIES = [
  {
    id: 'progress',
    name: 'Kockice u Progress Area',
    nameEn: 'Progress Cubes',
    formula: '1 / 2 / 4 / 7 / 11 OP za 1 / 2 / 3 / 4 / 5 kockica u zoni progresa',
    desc: 'Poeni za uspešno formirane komplekse zgrada na Marsu tokom partije.'
  },
  {
    id: 'hangar',
    name: 'Brodovi u Hangaru',
    nameEn: 'Hangar Ships',
    formula: '3 OP po svakom brodu u Hangaru',
    desc: 'Brodovi koji nisu potrošeni za prinudna putovanja Šatlom.'
  },
  {
    id: 'colonists',
    name: 'Kolonisti u Spavaonicama (Living Quarters)',
    nameEn: 'Living Quarters Colonists',
    formula: 'OP označen pored najvišeg popunjenog koloniste (popunjava se odozdo nagore)',
    desc: 'Pre bodovanja svi kolonisti sa table na kojoj se nalazite i iz Working Area vraćaju se u spavaonice.'
  },
  {
    id: 'tech',
    name: 'Razvijene Tehnologije (Laboratory)',
    nameEn: 'Tech Tiles in Lab',
    formula: '1 / 2 / 3 / 4 / 6 OP za svaku pločicu prema koloni u kojoj se nalazi',
    desc: 'Vrednost tehnološkog nivoa u vašoj laboratoriji.'
  },
  {
    id: 'advanced',
    name: 'Napredne Zgrade (Advanced Buildings)',
    nameEn: 'Advanced Buildings & Blueprints',
    formula: '+3 OP za izgrađen Lvl 1, +5 OP za Lvl 3; KAZNA: -3 OP po neizgrađenom Lvl 1, -5 OP po neizgrađenom Lvl 3',
    desc: 'Ostvareni građevinski projekti umanjeni za neispunjene nacrte sa Zemlje.'
  },
  {
    id: 'scientists',
    name: 'Naučnici (Scientists)',
    nameEn: 'Scientists Scoring',
    formula: '3 OP po svakoj Naprednoj zgradi na Marsu odgovarajuće specijalnosti (bez obzira na vlasnika!)',
    desc: 'Naučnici boduju sve napredne zgrade na mapi koje odgovaraju njihovoj oblasti.'
  },
  {
    id: 'contracts',
    name: 'Zemaljski Ugovori (Earth Contracts)',
    nameEn: 'Earth Contracts',
    formula: '+OP za ispunjene ugovore, -OP kazna za neispunjene ugovore!',
    desc: 'Igrači mogu preneti resurse/kristale na ugovore neposredno pred konačno bodovanje.'
  }
];

export const TIE_BREAKER_HIERARCHY = [
  {
    step: 1,
    title: 'Najviše Kristala u Depotu',
    description: 'Igrač koji na kraju igre ima više kristala (uključujući i one prebačene na kraju poslednje runde) pobeđuje!',
    icon: 'Gem'
  },
  {
    step: 2,
    title: 'Najviše Naprednih Zgrada na Mapi',
    description: 'Ako je broj kristala isti, pobeđuje igrač sa više postavljenih Advanced Building markera na Marsu.',
    icon: 'Building'
  },
  {
    step: 3,
    title: 'Najviše Kockica Progresa u Progress Area',
    description: 'Ako je i dalje nerešeno, pobeđuje igrač sa više svojih kockica u zoni progresa u donjem desnom uglu table.',
    icon: 'Grid'
  },
  {
    step: 4,
    title: 'Deljena Pobeda (Shared Victory)',
    description: 'Ako su svi prethodni kriterijumi jednaki, Danijel i Ceca ravnopravno dele pobedu!',
    icon: 'Award'
  }
];
