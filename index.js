{
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'name@address.gserviceaccount.com'

  process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\LoNg_MuLtIlInE_sEcReT_KeY==\n-----END PRIVATE KEY-----\n'
} //! DELICATE DATA !//

const { GoogleSpreadsheet } = require('google-spreadsheet');
const sheetID = '16IjzXrXl7W7zXp_SZcLqT0V_rj79TsUGQLM8HLtSUBk';
const doc = new GoogleSpreadsheet(sheetID);

main()

async function main() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  // await doc.updateProperties({ title: 'renamed doc' });

  // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // console.log(sheet.title);
  // console.log(sheet.rowCount);

  // adding / removing sheets
  // const newSheet = await doc.addSheet({ title: 'ms' + Date.now()%1000 });
  // await newSheet.delete();


  const sheet = await doc.addSheet({ headerValues: ['name', 'email'] });

  // append rows
  const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });
  const moreRows = await sheet.addRows([
    { name: 'Sergey Brin', email: 'sergey@google.com' },
    { name: 'Eric Schmidt', email: 'eric@google.com' },
  ]);

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  // read/write row values
  console.log(rows[0].name); // 'Larry Page'
  rows[1].email = 'sergey@abc.xyz'; // update a value
  await rows[1].save(); // save updates
  // await rows[1].delete(); // delete a row
}
