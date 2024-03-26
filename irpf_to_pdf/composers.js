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

    // console.log("igualdade", TYPE_OPERATIONS_SELL.VENDA_DE_FII, nameOp, mountOperationsFII)
    return nameOp === TYPE_OPERATIONS_SELL.VENDA_DE_FII ? mountOperationsFII : null;
}

function composeCommonOperationAndDayTrade(operations, yearAnalysis, monthAnalysis) {

    let mountCommonOperation = 0;
    let mountDayTrade = 0;
    let mountLossCommonOperation = 0;
    let mountLossDayTrade = 0;

    _.map(operations, (op, operationName) => {
        switch (operationName) {
            case TYPE_OPERATIONS_SELL.SWING_TRADE:
            case TYPE_OPERATIONS_SELL.VENDA_DE_ETF:
            case TYPE_OPERATIONS_SELL.DIREITOS_DE_SUBSCRICAO:
            case TYPE_OPERATIONS_SELL.VENDA_DE_BDR:
                if (operationName === TYPE_OPERATIONS_SELL.SWING_TRADE) {
                    if (op.amountTransaction > LIMIT_SWING_TRADE || op.amountValues < 0) {
                        if (op.amountValues < 0) {
                            mountLossCommonOperation += op.amountValues;
                            mountCommonOperation += op.amountValues;
                        } else {
                            mountCommonOperation += op.amountValues;
                        }
                    }
                } else {
                    mountCommonOperation += op.amountValues;
                }
                break;
            case TYPE_OPERATIONS_SELL.DAY_TRADE:
                if (op.amountValues >= 0) {
                    mountDayTrade += op.amountValues;
                } else {
                    mountLossDayTrade += op.amountValues;
                }
                break;
        }

    });

    const title = {
        pageBreak: 'before',
        text: `\n\n${MONTHS_LABEL[monthAnalysis]} - ${year}`,
        style: "title"
    }

    const content1 = {
        style: "tableOperation",
        table: {
            widths: [200, "*", "*"],
            body: [
                composeHeaderTable(["Resultados", "Operações Comuns", "Day-Trade"]),
                [{ text: "Mercado à Vista - Ações", style: { color: "black" } }, { text: convertCurrencyReal(mountCommonOperation), style: { color: "blue", bold: true } }, convertCurrencyReal(0)],
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
                [{ text: "RESULTADO LÍQUIDO DO MÊS", style: { color: "black" } }, { text: convertCurrencyReal(mountCommonOperation), style: { color: "blue", bold: true } }, convertCurrencyReal(0)],
                [{ text: "Resultado negativo até o mês anterior", style: { color: "black" } }, convertCurrencyReal(0), convertCurrencyReal(0)],
                [{ text: "BASE DE CÁLCULO DO IMPOSTO", style: { color: "black" } }, { text: convertCurrencyReal(mountCommonOperation), style: { color: "blue", bold: true } }, convertCurrencyReal(0)],
                [{ text: "Prejuízo a compensar", style: { color: "black" } }, convertCurrencyReal(0), convertCurrencyReal(0)],
                [{ text: "Alíquota do imposto", style: { color: "black" } }, { text: "15%", style: { color: "black" } }, { text: "20%", style: { color: "black" } }],
                [{ text: "IMPOSTO DEVIDO", style: { color: "black" } }, { text: taxCal(mountCommonOperation, 0.15), style: { color: "blue", bold: true } }, convertCurrencyReal(0)],
            ]
        }
    }

    const content3 = {
        style: "tableOperation",
        table: {
            widths: ["*", "*"],
            body: [
                composeHeaderTable([{ text: "Consolidação do mês", colSpan: 2 }, {}]),
                [{ text: "Total do imposto devido", style: { color: "black" } }, { text: taxCal(mountCommonOperation, 0.15), style: { color: "blue", bold: true } }],
                [{ text: "IR fonte de Day-Trade no Mês", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte de Day-Trade nos meses anteriores", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte de Day-Trade a compensar", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte (Lei nº 11.033/2004) no mês", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte (Lei nº 11.033/2004) nos meses anteriores", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "IR fonte (Lei nº 11.033/2004) meses a compensar", style: { color: "black" } }, convertCurrencyReal(0)],
                [{ text: "Imposto a pagar", style: { color: "black" } }, { text: taxCal(mountCommonOperation, 0.15), style: { color: "blue", bold: true } }],
                [{ text: "Imposto pago", style: { color: "black" } }, convertCurrencyReal(0)],
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
    return { dividends, jcp, rendiments, rendimentsJCP };

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
