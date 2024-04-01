/**
* ############### composers ###############
*/
function composeOperationsFII(operations, yearAnalysis, monthAnalysis) {

    let mountOperationsFII = 0;
    let mountLossOperationsFII = 0;
    let nameOp = "";

    _.map(operations, (op, operationName) => {
        switch (operationName) {
            case TYPE_OPERATIONS_SELL.VENDA_DE_FII:
                nameOp = operationName;
                if (op.amountValues >= 0) {
                    mountOperationsFII += op.amountValues;
                } else {
                    mountLossOperationsFII += op.amountValues;
                    mountOperationsFII += op.amountValues;
                    if (lossesSalesFii.hasOwnProperty(yearAnalysis)) {
                        lossesSalesFii[yearAnalysis] += mountLossOperationsFII;
                    } else {
                        lossesSalesFii = {
                            [yearAnalysis]: mountLossOperationsFII
                        }
                    }
                }
                break;
        }


    })

    return nameOp === TYPE_OPERATIONS_SELL.VENDA_DE_FII ? mountOperationsFII : null;
}

function composeTableCommonOperationAndDayTrade(operations) {

    let tableCommonOperationAndDayTradeProcessed = {};
    const arrayYears = Object.keys(operations);
    const firstYear = arrayYears.length > 0 ? arrayYears[0] : 0;

    _.map(operations, (years, indexYear) => {
        tableCommonOperationAndDayTradeProcessed[indexYear] = {
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {},
            12: {},
            accumulatedCommon: 0,
            accumulatedTrade: 0,
        }

        _.map(years, (months, indexMonth) => {
            let ops = { commonList: [], dayTradeList: [], totalCommon: 0, totalTrade: 0 };
            _.map(months, (op, operationName) => {
                switch (operationName) {
                    case TYPE_OPERATIONS_SELL.SWING_TRADE:
                        // comuns, acima de 20k para acoes ou prejuizo
                        if (op.amountTransaction > LIMIT_SWING_TRADE || op.amountValues < 0) {
                            ops.commonList.push(op);
                        }
                        break;
                    case TYPE_OPERATIONS_SELL.VENDA_DE_ETF:
                    case TYPE_OPERATIONS_SELL.VENDA_DE_BDR:
                    case TYPE_OPERATIONS_SELL.DIREITOS_DE_SUBSCRICAO:
                        // communs independente de valor
                        ops.commonList.push(op)
                        break;
                    case TYPE_OPERATIONS_SELL.DAY_TRADE:
                        // day trade                
                        ops.dayTradeList.push(op)
                        break;
                }

            })
            ops.totalCommon = _.sumBy(ops.commonList, "amountValues")
            ops.totalTrade = _.sumBy(ops.dayTradeList, "amountValues")
            tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth] = ops;
            // calculando accumulado do mês
            calcAccumulatedMonth(indexYear, firstYear, indexMonth, tableCommonOperationAndDayTradeProcessed);
        })
        // calculando accumulado no ano
        calcAccumulatedYear(indexYear, firstYear, tableCommonOperationAndDayTradeProcessed);

    })
    return tableCommonOperationAndDayTradeProcessed
}

function calcAccumulatedMonth(indexYear, firstYear, indexMonth, tableCommonOperationAndDayTradeProcessed) {
    const itemMonth = tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth]
    if (indexYear === firstYear) {
        if (indexMonth === "1") { // é o primeiro mês
            tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth] = {
                ...itemMonth,
                accumulatedCommon: sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon", indexMonth),
                accumulatedTrade: sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade", indexMonth)
            }

        } else {
            tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth] = {
                ...itemMonth,
                accumulatedCommon: tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth - 1].accumulatedCommon || 0 + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon", indexMonth),
                accumulatedTrade: tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth - 1].accumulatedTrade || 0 + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade", indexMonth)
            }

        }
    } else {
        const _firstPosition = getLastOrFirstPositionYear(tableCommonOperationAndDayTradeProcessed, indexYear, 1);
        if (_firstPosition.month == indexMonth) { // verifica é a primeira operação do ano
            const _lastAccumulatorCommon = tableCommonOperationAndDayTradeProcessed[indexYear - 1].accumulatedCommon
            const _lastAccumulatorTrade = tableCommonOperationAndDayTradeProcessed[indexYear - 1].accumulatedTrade
            // existe acumulado mes anterior negativo COMMON
            tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedCommon = _lastAccumulatorCommon + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon")
            tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedTrade = _lastAccumulatorTrade + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade")

        } else {
            const _pastPosition = getOtherLastPosition(tableCommonOperationAndDayTradeProcessed, indexYear, indexMonth)
            // existe acumulado mes anterior negativo COMMON
            if (_pastPosition.op.accumulatedCommon < 0) {
                tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedCommon = _pastPosition.op.accumulatedCommon + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon")
            } else {
                tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedCommon = sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon")
            }
            // existe acumulado mes anterior negativo TRADER 
            if (_pastPosition.op.accumulatedTrade < 0) {
                tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedTrade = _pastPosition.op.accumulatedTrade + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade")
            } else {
                tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedTrade = sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade")
            }
        }
    }
    const acc = tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedCommon;
    const accTrader = tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedTrade;
    if (acc > 0) {
        tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedCommon = 0;
    }
    if (accTrader > 0) {
        tableCommonOperationAndDayTradeProcessed[indexYear][indexMonth].accumulatedTrade = 0;
    }
}

function calcAccumulatedYear(indexYear, firstYear, tableCommonOperationAndDayTradeProcessed) {
    if (indexYear === firstYear) {
        tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedCommon = sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon")
        tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedTrade = sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade")
    } else {
        // existe acumulado ano anterior negativo COMMON
        if (tableCommonOperationAndDayTradeProcessed[indexYear - 1].accumulatedCommon < 0) {
            tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedCommon = tableCommonOperationAndDayTradeProcessed[indexYear - 1].accumulatedCommon + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon")
        } else {
            tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedCommon = sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalCommon")
        }

        // existe acumulado ano anterior negativo TRADER
        if (tableCommonOperationAndDayTradeProcessed[indexYear - 1].accumulatedTrade < 0) {
            tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedTrade = tableCommonOperationAndDayTradeProcessed[indexYear - 1].accumulatedTrade + sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade")
        } else {
            tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedTrade = sumAccumulator(tableCommonOperationAndDayTradeProcessed, indexYear, "totalTrade")
        }

    }
    const acc = tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedCommon;
    const accTrader = tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedTrade;
    if (acc > 0) {
        tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedCommon = 0;
    }
    if (accTrader > 0) {
        tableCommonOperationAndDayTradeProcessed[indexYear].accumulatedTrade = 0;
    }
}

function composeCommonOperationAndDayTrade(operations, yearAnalysis, monthAnalysis, operationsFull, monthsFilter = [], operationsGeneral) {

    if (!monthsFilter.includes(monthAnalysis)) {
        return null;
    }

    let negativePastCommon = 0
    let negativePastTrade = 0
    const indexAtual = monthsFilter.indexOf(monthAnalysis);

    const arrayYears = Object.keys(operationsFull);
    const firstYear = arrayYears.length > 0 ? arrayYears[0] : 0;
    const totalCommon = convertCurrencyReal(convertCurrencyReal(operations.totalCommon))
    const totalTrade = convertCurrencyReal(convertCurrencyReal(operations.totalTrade))

    if (yearAnalysis !== firstYear) { // se for diferente do ano inicial de investimento
        if (indexAtual === 0) { // se for a primeira operação do ano
            negativePastCommon = operationsGeneral[yearAnalysis - 1].accumulatedCommon
            negativePastTrade = operationsGeneral[yearAnalysis - 1].accumulatedTrade
        } else {
            negativePastCommon = operationsGeneral[yearAnalysis][monthsFilter[indexAtual - 1]].accumulatedCommon
            negativePastTrade = operationsGeneral[yearAnalysis][monthsFilter[indexAtual - 1]].accumulatedTrade
        }
    } else {
        if (indexAtual === 0) { // se for a primeira operação do ano
            negativePastCommon = 0
            negativePastTrade = 0
        } else {
            negativePastCommon = operationsGeneral[yearAnalysis][monthsFilter[indexAtual - 1]].accumulatedCommon
            negativePastTrade = operationsGeneral[yearAnalysis][monthsFilter[indexAtual - 1]].accumulatedTrade
        }

    }

    const baseCalcCommon = Math.abs(negativePastCommon) >= operations.totalCommon ? 0 : operations.totalCommon - negativePastCommon;
    const baseCalcTrade = Math.abs(negativePastTrade) >= operations.totalTrade ? 0 : operations.totalTrade - negativePastTrade;
    const prejuizoCompensarComum = negativePastCommon > operations.totalCommon ? negativePastCommon - operations.totalCommon : 0;
    const prejuizoCompensarTrade = negativePastTrade > operations.totalTrade ? negativePastTrade - operations.totalTrade : 0;

    const title = {
        pageBreak: 'before',
        text: `\n\n${MONTHS_LABEL[monthAnalysis]} - ${yearAnalysis}`,
        style: "title"
    }

    const content1 = {
        style: "tableOperation",
        table: {
            widths: [200, "*", "*"],
            body: [
                composeHeaderTable(["Resultados", "Operações Comuns", "Day-Trade"]),
                [{ text: "Mercado à Vista - Ações", style: { color: "black" } }, { text: totalCommon, style: { color: "blue", bold: true } }, { text: totalTrade, style: { color: "blue", bold: true } }],
            ]
        }
    }


    // Alíquotas 15% e 20% 
    const content2 = {
        style: "tableOperation",
        table: {
            widths: [200, "*", "*"],
            body: [
                composeHeaderTable(["Resultados", "Operações Comuns", "Day-Trade"]),
                [{ text: "RESULTADO LÍQUIDO DO MÊS", style: { color: "black" } }, { text: totalCommon, style: { color: "blue", bold: true } }, { text: convertCurrencyReal(0), style: { color: "blue", bold: true } }],
                [{ text: "Resultado negativo até o mês anterior", style: { color: "black" } }, convertCurrencyReal(Math.abs(negativePastCommon)), convertCurrencyReal(negativePastTrade)],
                [{ text: "BASE DE CÁLCULO DO IMPOSTO", style: { color: "black" } }, { text: convertCurrencyReal(baseCalcCommon), style: { color: "blue", bold: true } }, { text: convertCurrencyReal(baseCalcTrade), style: { color: "blue", bold: true } }],
                [{ text: "Prejuízo a compensar", style: { color: "black" } }, convertCurrencyReal(Math.abs(prejuizoCompensarComum)), convertCurrencyReal(prejuizoCompensarTrade)],
                [{ text: "Alíquota do imposto", style: { color: "black" } }, { text: "15%", style: { color: "black" } }, { text: "20%", style: { color: "black" } }],
                [{ text: "IMPOSTO DEVIDO", style: { color: "black" } }, { text: taxCal(baseCalcCommon, 0.15), style: { color: "blue", bold: true } }, { text: taxCal(baseCalcTrade, 0.20), style: { color: "blue", bold: true } }],
            ]
        }
    }

    const content3 = {
        style: "tableOperation",
        table: {
            widths: ["*", "*"],
            body: [
                composeHeaderTable([{ text: "Consolidação do mês", colSpan: 2 }, {}]),
                [{ text: "Total do imposto devido", style: { color: "black" } }, { text: convertCurrencyReal((baseCalcCommon * 0.15) + (baseCalcTrade * 0.20)), style: { color: "blue", bold: true } }],
                [{ text: "IR fonte de Day-Trade no Mês", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte de Day-Trade nos meses anteriores", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte de Day-Trade a compensar", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte (Lei nº 11.033/2004) no mês", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte (Lei nº 11.033/2004) nos meses anteriores", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte (Lei nº 11.033/2004) meses a compensar", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "Imposto a pagar", style: { color: "black" } }, { text: convertCurrencyReal((baseCalcCommon * 0.15) + (baseCalcTrade * 0.20)), style: { color: "blue", bold: true } }],
                [{ text: "Imposto pago", style: { color: "black" } }, convertCurrencyReal((baseCalcCommon * 0.15) + (baseCalcTrade * 0.20))],
            ]
        },
    };
    return { title, content1, content2, content3 };
}

function composeAmountOperations(operation) {
    operation["amountTransaction"] = _.sum(operation.transactions);
    operation["amountValues"] = _.sum(operation.values);
}

function composeOperations(operations, indexMonth, indexYear, op) {
    if (!operations.hasOwnProperty(indexYear)) {
        operations[indexYear] = {
            [indexMonth]: {
                [op.operation]: {
                    transactions: [op.transaction],
                    values: [op.value],
                }
            }
        }
        composeAmountOperations(operations[indexYear][indexMonth][op.operation]);
    } else {
        if (!operations[indexYear].hasOwnProperty(indexMonth)) {
            operations[indexYear][indexMonth] = {
                [op.operation]: {
                    transactions: [op.transaction],
                    values: [op.value],
                }
            }
            composeAmountOperations(operations[indexYear][indexMonth][op.operation]);
        } else {
            if (!operations[indexYear][indexMonth].hasOwnProperty(op.operation)) {
                operations[indexYear][indexMonth][op.operation] = {
                    transactions: [op.transaction],
                    values: [op.value],
                }
                composeAmountOperations(operations[indexYear][indexMonth][op.operation]);
            } else {
                operations[indexYear][indexMonth][op.operation].transactions.push(op.transaction);
                operations[indexYear][indexMonth][op.operation].values.push(op.value);
                composeAmountOperations(operations[indexYear][indexMonth][op.operation]);
            }
        }
    }
    return operations;
}

function composeSwingTradeFree(operations) {
    _.map(operations, (year, indexYear) => {
        let sumSwingTradeFree = 0;
        _.map(year, (month) => _.map(month, (operation, indexOp) => {
            if (indexOp === TYPE_OPERATIONS_SELL.SWING_TRADE || indexOp === TYPE_OPERATIONS_SELL.VENDA_DE_FI_INFRA) {
                if (operation.amountTransaction <= LIMIT_SWING_TRADE) {
                    sumSwingTradeFree += operation.amountValues
                    SUM_SWING_TRADE_FREE[indexYear] = sumSwingTradeFree;
                }
            }
        }))
    })

}

function composeListYears() {
    const currentYear = new Date().getFullYear();
    const select = document.getElementById("year_select");
    let options_str = "";
    for (let i = currentYear; i >= firstYear; i--) {
        options_str = options_str + `<option value='${i}'> ${i}</option>`;
    }
    select.innerHTML = options_str;
}

function composeProvents(provents) {
    const externalProvents = provents && provents.hasOwnProperty("external") ? provents.external : null;
    if (provents && provents.hasOwnProperty("external")) { delete provents.external }
    const sortProvents = Object.keys(provents).sort();
    const dividends = [];
    const jcp = [];
    const rendiments = [];
    const rendimentsJCP = [];

    sortProvents.forEach((item) => {

        if (provents[item].amountDividend) {
            dividends.push([
                "09",
                provents[item].document_number_principal,
                provents[item].name,
                convertCurrencyReal(provents[item].amountDividend)
            ]
            );
        }
        if (provents[item].amountJcp) {
            jcp.push([
                "10",
                provents[item].document_number_principal,
                provents[item].name,
                convertCurrencyReal(provents[item].amountJcp || 0)
            ]
            );
        }

        if (provents[item].amountRendiment) {
            rendiments.push([
                "99",
                provents[item].document_number_principal,
                provents[item].name,
                `Rendimentos de ${item} - (Administradora: ${provents[item].admin ? provents[item].admin : provents[item].document_number_principal})`,
                convertCurrencyReal(provents[item].amountRendiment || 0)
            ]
            );
        }
        if (provents[item].amountRendimentJCP) {
            rendimentsJCP.push([
                "12",
                provents[item].document_number_principal,
                provents[item].name,
                `Rendimentos tributados sobre juros recebidos de (${provents[item].name})`,
                convertCurrencyReal(provents[item].amountRendimentJCP),
            ]
            );
        }
    })
    return { dividends, jcp, rendiments, rendimentsJCP, external: externalProvents };

}

function composeBensDireitos() {
    const bens = [];
    itensWalletFiltered.forEach((item) => {
        bens.push(
            [
                getCodes(item.classe).group,
                getCodes(item.classe).cod,
                getCodes(item.classe).locale,
                item.document_number_principal && item.document_number_principal !== "" ? item.document_number_principal : item.document_number_admin,
                { text: item.description, style: "description" },
                item.past_year,
                item.this_year,
            ]
        )
    })
    return bens;
}

function composeHeaderTable(text = [], fillColor = "#300668", color = "white") {
    const headers = [];
    text.forEach((item) => {
        headers.push(
            { text: item, fillColor, color, style: { alignment: "center" } }
        )
    });
    return headers;
}

function composerExternalDividends(docDefinition) {
    if (provents.hasOwnProperty("external") && Object.keys(provents["external"]).length > 0) {

        const table = {
            dividends: {
                1: {values: [], amount: 0},
                2: {values: [], amount: 0},
                3: {values: [], amount: 0},
                4: {values: [], amount: 0},
                5: {values: [], amount: 0},
                6: {values: [], amount: 0},
                7: {values: [], amount: 0},
                8: {values: [], amount: 0},
                9: {values: [], amount: 0},
                10: {values: [], amount: 0},
                11: {values: [], amount: 0},
                12: {values: [], amount: 0},
            },
            tax: {
                1: {values: [], amount: 0},
                2: {values: [], amount: 0},
                3: {values: [], amount: 0},
                4: {values: [], amount: 0},
                5: {values: [], amount: 0},
                6: {values: [], amount: 0},
                7: {values: [], amount: 0},
                8: {values: [], amount: 0},
                9: {values: [], amount: 0},
                10: {values: [], amount: 0},
                11: {values: [], amount: 0},
                12: {values: [], amount: 0},

            }

        }

        _.map(provents.external, (ticker) => {
            _.map(ticker.dividendPerMonth, (value, month) => {
                const currentMonth = Number(month) + 1;
                table.dividends[currentMonth].values.push(value)
                table.dividends[currentMonth].amount = _.sum(table.dividends[currentMonth].values)
            })
            _.map(ticker.taxPerMonth, (value, month) => {
                const currentMonth = Number(month) + 1;
                table.tax[currentMonth].values.push(value)
                table.tax[currentMonth].amount = _.sum(table.tax[currentMonth].values)
            })

        })

        const tablePdf = []
        _.map(table.dividends, (mes, indexMonth) => {
            if (mes.values.length) {
                tablePdf.push([MONTHS_LABEL[indexMonth], convertCurrencyReal(table.dividends[indexMonth].amount), convertCurrencyReal(table.tax[indexMonth].amount)]);
            }
        })
         

        const title = {
            pageBreak: "before",
            text: "Carnê-Leão (Dividendos recebidos no exterior)",
            style: "title",

        }
        const content1 = {
            text: [
                "\nOs ",
                { text: "dividendos recebidos nos Estados Unidos", style: "negrito" },
                " tem seu imposto de renda retido na fonte, mas devem ser declarados através do Programa Carnê-Leão.\n\n",
                { text: "O Carnê-Leão Online pode ser acessado pelo e-CAC " },
                { text: "[CLIQUE AQUI]", link: "https://www.gov.br/pt-br/servicos/apurar-carne-leao", color: "#815ae8" },
                { text: "\n\n Veja vídeo tutorial ensinando como deve ser o prenchimento dos dados: " },
                { text: "[VÍDEO TUTORIAL]\n", link: "https://youtu.be/bYZH-D4h51Y?si=SogRBTtyjGkL_MgN", color: "#815ae8" }

            ]
        }

        const content2 = {
            style: "table",
            table: {
                widths: [70, "*", "*"],
                body: [
                    composeHeaderTable(["Mês", "Rendimentos do exterior (R$)", "Imposto pago no exterior"]),
                    ...tablePdf,
                ]
            },
        }

        docDefinition.content.push(title);
        docDefinition.content.push(content1);
        docDefinition.content.push(content2);
    }
    return null

}

function composeTaxExternal(docDefinition) {
    if (provents.hasOwnProperty("external") && Object.keys(provents["external"]).length > 0) {
        let taxAmount = 0
        _.map(provents["external"], (item) => {
            taxAmount += item.amountTax;
        })
        const title = {
            pageBreak: "before",
            text: "Imposto Pago/Retido (IR a compensar ou retido no exterior)",
            style: "title",

        }
        const content1 = {
            text: "\nEsta seção irá lhe demonstrar impostos já retidos no exterior para demonstração a Receita e/ou impostos retidos na fonte que podem ser compensados ao fim do ano.\n\n",
        }

        const content2 =
        {
            image: 'print8',
            width: 505,

        }
        const content3 = {
            text: "\nDados a declarar",
            style: "title"

        }

        const content4 = {
            style: "table",
            table: {
                widths: [340, "*"],
                body: [
                    composeHeaderTable(["Imposto", "Valor"]),
                    [{
                        text: [
                            { text: "02.", style: "negrito" },
                            " Imposto pago no exterior pelo titular e pelos dependentes"
                        ]
                    }, convertCurrencyReal(taxAmount)]
                ]
            },
        }
        docDefinition.content.push(title);
        docDefinition.content.push(content1);
        docDefinition.content.push(content2);
        docDefinition.content.push(content3)
        docDefinition.content.push(content4)
        return null
    }
    return null
}
