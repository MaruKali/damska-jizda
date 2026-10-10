const SHEET_ID = '1lVRNkkbWAW_NnZKCqhoogm957mlfiEXe8DsWn8Vx_yE';
const PEOPLE = ['JaK','JaV','MoK','MaU','MiD','Bě','Iv','MaK'];
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 3000) throw new Error('Neplatná data');
    const data = JSON.parse(raw);
    if (!PEOPLE.includes(data.person) || !data.votes || typeof data.votes !== 'object' || Array.isArray(data.votes)) throw new Error('Neplatný hlas');
    if (Object.keys(data.votes).length !== 16) throw new Error('Chybí hodnocení');
    const grades = Array.from({length:16}, (_,i) => data.votes[String(i+1)]);
    if (grades.some(v => !Number.isInteger(v) || v < 1 || v > 5)) throw new Error('Neplatná známka');
    lock.waitLock(15000);
    const book = SpreadsheetApp.openById(SHEET_ID);
    let sheet = book.getSheetByName('Hlasy z webu');
    if (!sheet) {
      sheet = book.insertSheet('Hlasy z webu');
      sheet.getRange(1,1,1,19).setValues([['Iniciály','Aktualizováno','Poznámka','Čerchov','Klínovec','Plechý','Tok','Milešovka','Kleť','Luž','Kamenec','Smrk','Sněžka','U oběšeného','Devět skal','Velká Deštná','Králický Sněžník','Praděd','Lysá hora']]);
      sheet.setFrozenRows(1);
    }
    // Upgrade the original sheet without shifting existing votes.
    if (sheet.getRange(1,3).getValue() === 'Čerchov') {
      sheet.insertColumnBefore(3);
      sheet.getRange(1,3).setValue('Poznámka');
    }
    const target = sheet.getLastRow() + 1;
    sheet.getRange(target,1,1,19).setValues([[data.person,new Date(),String(data.notes||'').slice(0,1000),...grades]]);
    SpreadsheetApp.flush();
    return json({ok:true,person:data.person});
  } catch(err) { return json({ok:false,error:'Hlas se nepodařilo uložit.'}); }
  finally { if(lock.hasLock()) lock.releaseLock(); }
}
function doGet() { return json({ok:true,service:'Dámská jízda 2027',version:'append-notes-v2'}); }
function json(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
