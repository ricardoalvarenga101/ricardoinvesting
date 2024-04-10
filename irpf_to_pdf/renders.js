function renderLow20kMonth() {
    const lines = [];
    if (!SUM_SWING_TRADE_FREE.hasOwnProperty(year)) {
        return [{}]
    }
    if (SUM_SWING_TRADE_FREE.hasOwnProperty(year)) {
        lines.push(
            ["20", SUM_SWING_TRADE_FREE.hasOwnProperty(year) ? convertCurrencyReal(SUM_SWING_TRADE_FREE[year]) : convertCurrencyReal(0)]
        )
    }
    const title = {
        text: "\n\nVendas abaixo de R$20.000,00 no mês",
        style: "title"
    }
    const content1 = {
        style: "table",
        table: {
            widths: [30, "*"],
            body: [
                composeHeaderTable(["Tipo", "Valor"]),
                ...lines
            ]
        }
    }
    return [title, content1]
}

function renderRendimentsJCP() {
    if (!provents.rendimentsJCP.length) {
        return [{}];
    }
    const title = {
        text: "\n\nRendimentos sobre JCP",
        style: "title"
    }
    const content1 = {
        style: "table",
        table: {
            widths: [30, "*", "*", "*", "*"],
            body: [
                composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Descrição", "Valor"]),
                ...provents.rendimentsJCP,
            ]
        }
    }
    return [title, content1]
}

function renderDividends() {
    if (!provents.dividends.length) {
        return [{}]
    }
    const title = {
        text: "Dividendos",
        style: "title"
    }
    const content1 = {
        style: "table",
        table: {
            widths: [30, "*", 200, "*"],
            body: [
                composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Valor"]),
                ...provents.dividends,
            ]
        },
        pageBreak: "after"
    }
    return [title, content1]
}

function renderJCPs() {
    if (!provents.jcp.length) {
        return [{}]
    }
    const title = {
        text: "Rendimentos sujeitos a tributação exclusiva (Proventos tributados como JCP)",
        style: "title",
        pageBreak: 'before'
    }
    const content1 = {
        text: [
            "\n\nEsta seção irá lhe demonstrar quais ",
            { text: "rendimentos tiveram tributação", style: "negrito" },
            " retida na fonte durante e o ano, não será necessário pagar imposto adicional sobre eles, mas precisará declará-los na seção de mesmo nome."
        ]
    }
    const content2 = {
        text: "\nItens contemplados no relatório:",
        ul: [
            "Juros sobre capital",
            "Outros proventos tributados",
        ]
    }
    const content3 = {
        text: "\nLocal e exemplo de preenchimento:\n",
        style: "subheader"
    }
    const content4 = {
        image: "print5",
        width: 505,
    }
    const content5 = {
        text: [
            "\n\nPara cada linha da tabela abaixo efetue um lançamento através do botão ",
            { text: "'Novo'", style: "negrito" },
            ", preencha os dados da tabela e confirme em ",
            { text: "'OK'", style: "negrito" }
        ]
    }
    const content6 = {
        text: "\nJCP (juros sobre capital próprio - valor líquido)",
        style: "title"
    }
    const content7 = {
        style: "table",
        table: {
            widths: [30, "*", "*", "*"],
            body: [
                composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Valor"]),
                ...provents.jcp,
            ]
        },
    }
    return [title, content1, content2, content3, content4, content5, content6, content7]
}

function renderCommonsOperations(docDefinition) {
    const title = {
        text: "Renda variável (Vendas de ativos no Brasil com DARF ou no prejuízo)",
        style: "title",
        pageBreak: "before",
    }
    const content1 = {
        text: "\nEsta seção irá lhe demonstrar quais resultados obteve na bolsa do brasil e como deverá declarar os lucros, prejuízos e IR já pago.",
    }
    const content2 = {
        text: "\nOperações Comuns / Day-Trade",
        style: "title"
    }
    const content3 = {
        text: [
            "\nAs operações de venda envolvendo ações, opções, futuros, ETF e BDR serão declaradas nessa seção e de forma mensal.Somente constam nessa seção suas vendas que foram",
            { text: " tributadas", style: "negrito" },
            " fora da isenção. Para vendas isentas, faça o lançamento na seção Rendimentos Isentos conforme mencionado acima. Abaixo descrevemos todos os lançamentos que deverá fazer com base na apuração realizada na planilha de investimentos.",
            `\n\nOperações com fundos imobiliários não entram nesta seção, caso vendeu FIIs durante o ano de ${year}, iremos demonstrar na seção \"Operações Fundos Investimento Imobiliário\"\n\n`
        ]
    }
    const content4 = {
        image: "print6",
        width: 505,
    }

    // mount common operation
    const tableCommonOperationAndDayTrade = composeTableCommonOperationAndDayTrade(operationsFull);
    let tableCommonOperationAndDayTradeFiltered = {};
    _.map(tableCommonOperationAndDayTrade, (year, indexYear) => _.map(year, (month, indexMonth) => {
        if (Object.keys(month).length > 0) {
            if (tableCommonOperationAndDayTradeFiltered.hasOwnProperty(indexYear)) {
                tableCommonOperationAndDayTradeFiltered[indexYear].push(indexMonth)
            } else {
                tableCommonOperationAndDayTradeFiltered[indexYear] = [indexMonth]
            }
        }
    }))

    console.log("tableCommonOperationAndDayTrade", tableCommonOperationAndDayTrade)
    console.log("tableCommonOperationAndDayTradeFiltered", tableCommonOperationAndDayTradeFiltered)
    const commonOperationsAnalised = []
    _.map(tableCommonOperationAndDayTrade[year], (month, indexMonth) => {
        const co = composeCommonOperationAndDayTrade(month, year, indexMonth, operationsFull, tableCommonOperationAndDayTradeFiltered[year], tableCommonOperationAndDayTrade);
        if (co) {
            commonOperationsAnalised.push(co.title)
            commonOperationsAnalised.push(co.content1)
            commonOperationsAnalised.push(co.content2)
            commonOperationsAnalised.push(co.content3)
        }
    });

    if (commonOperationsAnalised.length) {
        docDefinition.content.push(title)
        docDefinition.content.push(content1)
        docDefinition.content.push(content2)
        docDefinition.content.push(content3)
        docDefinition.content.push(content4)
        docDefinition.content = [...docDefinition.content, ...commonOperationsAnalised]
    }
}

function renderOperationsFII(docDefinition) {

    _.map(operationsFull, (itemYear, indexYear) => _.map(itemYear, (month, indexMonth) => {
        const co = composeOperationsFII(operationsFull[indexYear][indexMonth], indexYear, indexMonth);
        if (co) {
            if (operationsFII.hasOwnProperty(indexYear)) {
                operationsFII[indexYear][indexMonth] = co;
            } else {
                operationsFII[indexYear] = {
                    [indexMonth]: co
                };
            }
        }
    }));

    if (!operationsFII.hasOwnProperty(year)) {
        operationsFII[year] = {
            1: 0
        }
    }

    _.map(operationsFII, (opYear, indexYear) => _.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (mes) => {
        if (mes === 1) {
            if (tableOperationsFII.hasOwnProperty(indexYear)) {
                if (tableOperationsFII[indexYear].hasOwnProperty(mes)) {                    
                    const lossesOldYear = Number(indexYear) === Number(_firstYear) ? 0 : tableOperationsFII[indexYear - 1][12][2] > 0 ? tableOperationsFII[indexYear - 1][12][2] * -1 : 0
                    tableOperationsFII[indexYear][mes] = [
                        MONTHS_LABEL[mes].slice(0, 3),
                        getNode(operationsFII[indexYear], mes),
                        lossesOldYear,
                        0,
                        0,
                        "20%",
                        0,
                    ]

                } else {
                    tableOperationsFII[indexYear] = {
                        [mes]: [
                            MONTHS_LABEL[mes].slice(0, 3),
                            getNode(operationsFII[indexYear], mes),
                            tableOperationsFII[indexYear - 1][12][2] > 0 ? tableOperationsFII[indexYear - 1][12][2] * -1 : 0,
                            0,
                            0,
                            "20%",
                            0,
                        ]
                    }
                }
            } else {
                tableOperationsFII[indexYear] = {
                    [mes]: [
                        MONTHS_LABEL[mes].slice(0, 3),
                        getNode(operationsFII[indexYear], mes),
                        tableOperationsFII.hasOwnProperty(indexYear - 1) ? tableOperationsFII[indexYear - 1][12][2] > 0 ? tableOperationsFII[indexYear - 1][12][2] : 0 : 0,
                        0,
                        0,
                        "20%",
                        0,
                    ]
                }
            }

        } else {
            tableOperationsFII[indexYear][mes] = [
                MONTHS_LABEL[mes].slice(0, 3),
                getNode(operationsFII[indexYear], mes),
                subtractionLosses(tableOperationsFII[indexYear][mes - 1][1], tableOperationsFII[indexYear][mes - 1][2]),
                0,
                0,
                "20%",
                0,
            ]
        }
    }))

    const title = {
        pageBreak: "before",
        text: "Operações Fundos de Investimentos Imobiliários (FII e FIAGROS)\n\n",
        style: "title"
    }

    const content1 = {
        text: [
            "As operações de venda envolvendo ",
            { text: "fundos imobiliários", style: { "text-decorator": "underline", bold: true } },
            " serão declaradas nessa seção e de forma mensal. Toda venda de fundo imobiliário é tributada, abaixo poderá verificar seus ganhos/prejuízos apurados de acordo com seus lançamentos.\n\n"
        ]
    }

    const content2 = {
        image: "print7",
        width: 505,
    }

    const content3 = {
        text: "\n"
    }

    const content4 = {
        style: "tableOperation",
        table: {
            widths: [30, "*", "*", "*", "*", "*", "*"],
            body: [
                composeHeaderTable(["Mês", "Resultado líquido do mês", "Resultado negativo até o mês anterior", "Base de cálculo do imposto", "Prejuízo a compensar", "Alíquota do imposto", "Imposto a pagar"]),
                ...composeTableOperationsFII()

            ]
        }
    }
    docDefinition.content.push(title)
    docDefinition.content.push(content1)
    docDefinition.content.push(content2)
    docDefinition.content.push(content3)
    docDefinition.content.push(content4)
}

function renderRendimentsIsentos() {
    if (!provents.rendiments.length && !SUM_SWING_TRADE_FREE_99.hasOwnProperty(year)) {
        return [{}]
    }
    const gcapInfra = [];
    if (SUM_SWING_TRADE_FREE_99.hasOwnProperty(year)) {
        _.map(SUM_SWING_TRADE_FREE_99[year], (ticker) => {
            gcapInfra.push(
                [
                    "99",
                    ticker.document_number_principal,
                    ticker.name,
                    `Ganho de capital na venda de ${ticker.ticker} - (Administradora: ${ticker.document_number_admin ? ticker.document_number_admin : ticker.document_number_principal})`,
                    convertCurrencyReal(ticker.amountValues || 0)
                ]
            )

        })
    }

    const body = [...provents.rendiments, ...gcapInfra]

    const title = {
        text: "Rendimentos de (FII, FIAGRO e FI-INFRA)",
        style: "title"
    }
    const content1 = {
        style: "table",
        table: {
            widths: [20, "*", 100, "*", "*"],
            body: [
                composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Descrição", "Valor"]),
                ...body,
            ]
        }
    }
    return [title, content1]
}

function renderRendimentsPrint() {
    if (!provents.dividends.length) {
        return [{}]
    }
    const title = {
        text: "Rendimentos isentos e não tributáveis (Vendas abaixo de 20mil, ativos isentos e dividendos)\n\n",
        style: "title",
        pageBreak: "before"
    }
    const content1 = {
        text: [
            { text: "Esta seção irá lhe demonstrar quais rendimentos teve durante e o ano e foram " },
            { text: "isentos de imposto de renda", style: { "text-transform": "underline" } },
            { text: ", seja por benefício fiscal ou limite de isenção.\n\n" }
        ]
    }
    const content2 = {
        text: "Itens contemplados no relatório:\n",
        ul: [
            "Vendas mensais de ações abaixo de 20 mil reais (Brasil)",
            "Dividendos de ações",
            "Rendimentos de (FII, FIAGRO e FI-INFRA)",
            "Vendas de ativos com benefício fiscal\n\n",            
        ]
    }
    const content3 = {
        text: "Local e exemplo de preenchimento:\n",
        style: "subheader"
    }
    const content4 = {
        image: "print4",
        width: 505,
    }
    const content5 = {
        pageBreak: "before",
        text: [
            "Para cada linha da tabela abaixo efetue um lançamento através do botão ",
            { text: "'Novo'", style: "negrito" },
            ", preencha os dados da tabela e confirme em ",
            { text: "'OK'\n\n", style: "negrito" }
        ]
    }
    return [title, content1, content2, content3, content4, content5]
}