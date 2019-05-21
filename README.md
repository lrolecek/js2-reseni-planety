# Startovací balíček pro kurz JavaScript 2

Startovací balíček pro nové projekty v rámci kurzu JavaScript #2 od Czechitas.

Pro správné fungování balíčku měj nainstalovanou LTS verzi Node.js (alespoň 10.x a novější)

## Postup při zakládání nového projektu

1. Vytvoř si na svém GitHubu nový repozitář a nějak si ho pojmenuj (např. *js-lekce-6*, *ukol3-knihovna*, apod.).
2. Při vytváření repozitáře **nezaškrtávej** volbu *Initialize this repository with README**.
3. Objeví se tvůj nový prázdný repozitář, kde máš hned na úvodní stránce několik možností. Vyber poslední z nich **Import code from another repository** - klikni na tlačítko **Import code**.
4. Na následující obrazovce do pole **Your old repository’s clone URL** zadej `https://github.com/lrolecek/javascript2-start` a klikni na zelené tlačítko **Begin import**.
5. Chvilku to potrvá, ale nakonec se objeví hlášení, že je vše hotovo. Kliknutím na odkaz se jménem tvého repozitáře ho otevřeš.
6. V repozitáři s naimportovaným kódem klikni na zelené tlačítko **Clone or download** a vyber volbu **Open in desktop**, aby se ti repozitář zkopíroval k tobě na disk.
7. V aplikaci GitHub Desktop kliknutím na **Open in VS Code** otevřeš složku s projektem v editoru.
8. V editoru otevři terminál (příkazový řádek) - klávesovou zkratkou `Ctrl ~` nebo v menu volbou `Terminal > New Terminal`.
9. Spusť `npm install`, aby se ti nainstaloval Webpack, Babel, a vše potřebné.

## Práce na projektu a spouštění

1. HTML a CSS upravuj v kořenové složce projektu v souboru **index.html**
2. JavaScript edituj uvnitř složky **/src**, výchozí soubor se vždy jmenuje **index.js**, ale podle potřeby můžeš vytvářet další *.js* soubory a do indexu je importovat.
3. Pomocí příkazu `npm run serve` v terminálu spustíš sekvenci příkazů, která zkompiluje tvůj zdrojový kód, spustí lokální webový server a otevře tvůj projekt v prohlížeči.
4. Webový server automaticky čeká na jakékoliv změny v javascriptovém kódu. Pokud v editoru upravíš svůj program, proběhne automatická kompilace a samo se obnoví okno prohlížeče. V případě, že budeš měnit HTML nebo CSS, musíš obnovení okna provést ručně.
5. Běžící server v terminálu ukončíš stiskem `Ctrl C`.

## Sestavení projektu - build

Lokální webový server pro vývoj (viz. výše) kompiluje zdrojový kód pouze do paměti počítače a výsledné soubory nikam neukládá. Pokud bys chtěla dokončený projekt vystavit někam do internetu, musíš projekt tzv. **sestavit** (build). Postupuj následovně:

1. V terminálu zadej příkaz `npm run build` - to v projektu vytvoří složku **/dist**, do které se umístí zkopilovaný javascriptový kód.
2. Na webhosting dle tvého výběru zkopíruj:
   - soubor **index.html**
   - soubor **style.css**
   - složku **/dist**
