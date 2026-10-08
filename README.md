# Dámská jízda 2027
Statická stránka pro GitHub Pages, mapa a 16 hodnocení 1–5. Bez závislostí.

## Stav
Připraven lokální náhled. GitHub ani produkční ukládání zatím nejsou propojené.
Prázdný endpoint v config.js záměrně blokuje odeslání. Lokální rozepsané hlasy nejsou společné výsledky.

## Spuštění
`python3 -m http.server 4173 --directory web` z nadřazené složky.

## Společné ukládání
1. V existující Google tabulce otevřít Rozšíření → Apps Script.
2. Vložit backend/Code.gs. Nasadit jako webovou aplikaci, spouštět jako vlastník, přístup Kdokoli. Povolit pouze potřebný přístup k Tabulkám Google.
3. URL webové aplikace /exec vložit do config.js jako endpoint.
4. Ověřit skutečný zápis, potvrzení v prohlížeči a opakované odeslání. Nasazení a chování CORS ještě nebylo živě ověřeno; úspěch se v UI zobrazuje pouze po skutečném JSON potvrzení serveru.

Hlasy jsou v samostatném listu „Hlasy z webu“, původní list zůstává zachován. Server ověřuje všech 16 známek a povolené iniciály, souběžné zápisy používají zámek. Opakovaný hlas stejných iniciál nahradí jejich předchozí řádek. Výběr iniciál není přihlášení: osoba s odkazem může hlasovat pod cizími iniciálami. Určeno pro důvěryhodnou skupinu osmi kamarádek. Endpoint neposkytuje čtení výsledků.

## GitHub Pages
Nahrát obsah web/ do nového repozitáře. Settings → Pages → Source: GitHub Actions. Přiložený workflow publikuje pouze klientské soubory a assets. Žádné tokeny ani hesla nesmí být v repozitáři.

## Ověření
`node --check web/app.js`
`node web/backend/test.cjs`
Před finálním předáním nutné živě otestovat odesílání přes produkční endpoint z GitHub Pages.
