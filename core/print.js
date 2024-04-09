/**
 * Desenvolvimento: Ricardo Alvarenga
 * Contato: ricardoinvesting10@gmail.com
 * Youtube: https://www.youtube.com/@ricardoinvesting
 * PIX: ricardoinvesting10@gmail.com
 *             _                   _       _                     _   _             
    ____      (_)                 | |     (_)                   | | (_)            
   / __ \ _ __ _  ___ __ _ _ __ __| | ___  _ _ ____   _____  ___| |_ _ _ __   __ _ 
  / / _` | '__| |/ __/ _` | '__/ _` |/ _ \| | '_ \ \ / / _ \/ __| __| | '_ \ / _` |
 | | (_| | |  | | (_| (_| | | | (_| | (_) | | | | \ V /  __/\__ \ |_| | | | | (_| |
  \ \__,_|_|  |_|\___\__,_|_|  \__,_|\___/|_|_| |_|\_/ \___||___/\__|_|_| |_|\__, |
   \____/                                                                     __/ |
                                                                             |___/ 
 */

/**
 * PRINT.GS
 */
const PRINT_OPTIONS = {
    'size': 7,               // paper size. 0=letter, 1=tabloid, 2=Legal, 3=statement, 4=executive, 5=folio, 6=A3, 7=A4, 8=A5, 9=B4, 10=B
    'fzr': false,            // repeat row headers
    'portrait': false,        // false=landscape
    'fitw': true,            // fit window or actual size
    'gridlines': false,      // show gridlines
    'printtitle': false,
    'sheetnames': false,
    'pagenum': 'UNDEFINED',  // CENTER = show page numbers / UNDEFINED = do not show
    'attachment': false
}

const PDF_OPTS = objectToQueryString(PRINT_OPTIONS);

// function onOpen(e) {
//   SpreadsheetApp.getUi().createMenu('Print...').addItem('Print selected range', 'printSelectedRange').addToUi();
// }

function printSelectedRange() {
    SpreadsheetApp.flush();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    const IR = Planilha.getSheetByName(ABAS.BENS_DIREITOS);

    const range = sheet.getRange(`F3:W103`);

    const gid = IR.getSheetId();
    const printRange = objectToQueryString({
        'c1': range.getColumn() - 1,
        'r1': range.getRow() - 1,
        'c2': range.getColumn() + range.getWidth() - 1,
        'r2': range.getRow() + range.getHeight() - 1
    });
    const url = ss.getUrl().replace(/edit$/, '') + 'export?format=pdf' + PDF_OPTS + printRange + "&gid=" + gid;

    const htmlTemplate = HtmlService.createTemplateFromFile('@ricardoinvesting-html');
    htmlTemplate.url = url;
    SpreadsheetApp.getUi().showModalDialog(htmlTemplate.evaluate().setHeight(10).setWidth(100), 'Preparando impressão...');
}

function objectToQueryString(obj) {
    return Object.keys(obj).map(function (key) {
        return Utilities.formatString('&%s=%s', key, obj[key]);
    }).join('');
}