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
 * TESOURO.GS
 */
function TESOURODIRETO(trigger = 1) {
    try {
        let srcURL = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
        let jsonData = UrlFetchApp.fetch(srcURL);
        let parsedData = JSON.parse(jsonData.getContentText()).response;
        let tesouros = {};
        parsedData.TrsrBdTradgList.forEach((bond) => {
            const currBondName = bond.TrsrBd.nm;
            // tesouros[currBondName.toUpperCase()] = bond.TrsrBd.untrRedVal;      
            tesouros[currBondName.toUpperCase()] = bond.TrsrBd.untrInvstmtVal;
        })

        return JSON.stringify(tesouros);
    } catch (error) {
        console.log(error)
    }
}

function getTesouro(ticker = "TESOURO PREFIXADO 2025") {
    // const code = ticker.toUpperCase();
    // const data = JSON.parse(json);
    const cotation = getTesouroService(ticker);
    if (cotation) {
        return cotation
        // return data[code];
    } else {
        throw new Error("Not Found");
    }

}

function getTesouroService(ticker, trigger = null) {
    try {
        const cached = getCache(ticker, "value");
        if (cached) {
            return cached;
        }
        const response = UrlFetchApp.fetch(`https://bombolao-v2.rj.r.appspot.com/core/api/cotation?ticker=${ticker}`);
        const cotation = JSON.parse(response.getContentText());
        setCache(ticker, cotation, cotation && "value" in cotation, 25);
        return cotation.value;

    } catch {
        throw new Error("Not Found");
    }
}

