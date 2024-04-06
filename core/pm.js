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
 * PM.GS
 */
function calcPMFull(trigger = "") {
    try {
        const initialLine = 0;
        const sheet = SpreadsheetApp.getActiveSpreadsheet();
        const GuiaInvestimento = sheet.getSheetByName(ABAS.MOVIMENTACOES);
        const dataRows = getDataRange(GuiaInvestimento, "C", 2, "A", 2, "V");

        const tickersId = [];
        const tickers = {};

        for (let i = initialLine; i <= dataRows.length - 1; i++) {
            const rowTicker = dataRows[i][2];
            const date = new Date(dataRows[i][3]).toISOString();
            if (tickersId.includes(rowTicker)) {
                tickers[rowTicker].movimentations.push(
                    {
                        data: date,
                        typeOperation: dataRows[i][4],
                        qtd: dataRows[i][5],
                        investedAmount: dataRows[i][9],
                    }
                );
            } else {
                tickers[rowTicker] = {
                    "movimentations": [
                        {
                            data: date,
                            typeOperation: dataRows[i][4],
                            qtd: dataRows[i][5],
                            investedAmount: dataRows[i][9],
                        }
                    ]
                };
                tickersId.push(rowTicker);
            }

        }

        const pm = { "extension": {} };
        const tickerLoopIds = Object.keys(tickers);
        tickerLoopIds.forEach(id => {
            const movimentation = tickers[id].movimentations;
            const dataSorted = movimentation.sort((p1, p2) => (p1.data < p2.data) ? -1 : (p1.data > p2.data) ? 1 : 0);
            const dataGroup = {};
            dataSorted.forEach(function (item) {
                const list = dataGroup[item.data];

                if (list) {
                    list.push(item);
                } else {
                    dataGroup[item.data] = [item];
                }
            });

            const dates = Object.keys(dataGroup)
            let accumulatedTotal = 0;
            let accumulatedInvested = 0;
            let lastDateFinishPosition = null;
            dates.forEach(date => {
                dataGroup[date].forEach(item => {
                    const typeOperation = item.typeOperation;
                    const qtd = item.qtd;
                    const investedAmount = item.investedAmount;
                    if (typeOperation === OPERATIONS.BONIFICACAO || typeOperation === OPERATIONS.COMPRA || typeOperation === OPERATIONS.COMPRA_DIREITOS) {
                        accumulatedInvested = accumulatedInvested + investedAmount;
                        accumulatedTotal = accumulatedTotal + qtd;
                    } else if (typeOperation === OPERATIONS.VENDA || typeOperation === OPERATIONS.VENDA_DIREITOS) {
                        const tempPM = accumulatedInvested / accumulatedTotal;
                        const tempTotal = accumulatedTotal - qtd;
                        if (tempTotal === 0) {
                            const year = new Date(item.data).getFullYear();
                            let month = new Date(item.data).getMonth();
                            month = month > 8 ? month + 1 : `0${month + 1}`;
                            lastDateFinishPosition = `${year}${month}`;
                        }
                        accumulatedInvested = tempPM * tempTotal;
                        accumulatedTotal = tempTotal;
                    }
                })
            });
            pm["extension"][id] = {
                "lastDateFinishPosition": lastDateFinishPosition
            }
            if (accumulatedInvested && accumulatedTotal) {
                pm[id] = accumulatedInvested / accumulatedTotal;
            } else {
                pm[id] = 0;
            }

        });

        return JSON.stringify(pm);

    } catch (error) {
        console.log(error)
        return "-";
    }
}

function getPM(jsonString, ticker) {
    try {
        const data = JSON.parse(jsonString);
        if (ticker in data) {
            return data[ticker];
        }
    } catch {
        return "-";
    }
}

function getExtensionData(jsonString, ticker, key) {
    try {
        const data = JSON.parse(jsonString);
        if (ticker in data["extension"]) {
            return data["extension"][ticker][key];
        }
    } catch {
        return "-";
    }
}

