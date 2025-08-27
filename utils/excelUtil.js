const ExcelJs = require('exceljs');

async function readExcel(filePath) 
{
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.getWorksheet('Data'); // pick sheet by name

  // Read first row (keys) and second row (values)
  const keys = [];
  const values = [];

  sheet.getRow(1).eachCell(cell => keys.push(cell.value));
  sheet.getRow(2).eachCell(cell => values.push(cell.value));

  // Build object
  const excelRecord = {};

 for (let i = 0; i < keys.length; i++) 
 {
    excelRecord[keys[i]] = values[i];
 }

  return excelRecord;
}

module.exports = { readExcel };