function generatePdf() {
    const docDefinition = {
        content: [
            {
                stack: [
                    { image: 'ricardoinvesting', width: 150, height: 150 },
                    { text: '@ricardoinvesting', link: 'https://www.youtube.com/@ricardoinvesting', color: '#815ae8' },
                    { text: 'Relatório auxiliar para declaração de imposto de renda' },
                    { text: `Ano calendário: ${year}`, style: 'subheader' },
                ],
                style: 'header'
            },
            {
                text: [
                    `${name}\n`,
                    `CPF: ${document_number}`,
                ],
                style: { alignment: 'right' },
                pageBreak: 'after'
            },
            {
                text: "Escopo do relatório\n\n",
                style: "title",
            },
            { text: "O relatório auxiliar para Declaração de Imposto de Renda gerado pela nossa plataforma, tem por objetivo facilitar o preenchimento da declaração anual que todo investidor deve entregar para a Receita Federal do Brasil. O escopo que é atendido por esse relatório irá lhe auxiliar a preencher os seguintes dados em sua declaração:\n\n" },
            {
                ul: [
                    `Bens e direitos (Posição acionária em 31/12/${year})`,
                    'Rendimentos isentos e não tributáveis (Vendas abaixo de R$20.000,00, ativos isentos e dividendos)',
                    'Rendimentos sujeitos a tributação exclusiva (Proventos tributados como JCP)',
                    'Ganho de Capital (Para ativos adquiridos no exterior ou criptomoedas)',
                    'Renda variável (Operações comuns / Day-Trade / Fundos Imobiliários)'
                ]
            },
            {
                text: "\n\nIsenção de responsabilidade\n\n",
                style: "title",
            },
            {
                text: [
                    "Toda a informação contida no relatório foi gerada com base nos dados informados pelo utilizador da planilha, ficando sob responsabilidade do investidor a conferência dos dados cadastrados e o preenchimento da declaração de imposto de renda.",
                    " Este relatório",
                    { text: " não será sua única fonte", style: { bold: true } },
                    " de consulta para preencher sua declaração, procure também os informes fornecidos por outras instituições que geraram renda ou rendimentos durante o ano de 2023.\n\nExemplo de outras informações que deverá procurar para sua declaração:\n",
                ]
            },
            {
                ul: [
                    "Informe do banco onde possui conta corrente/poupança para informação de saldos e rendimentos",
                    "Informe de seu empregador para declaração de remuneração anual e impostos retidos",
                    "Rendimentos provenientes de aluguéis, permutas etc"
                ],
                pageBreak: 'after'
            },
            {
                text: "\n\nInstalação do programa\n\n",
                style: "title",
            },
            {
                text: [
                    `O primeiro passo para a declaração do IRPF ${year} pelo leitor é realizar o download do programa disponibilizado através do site da Receita Federal do Brasil.\n`,
                    `Repare que o IRPF de ${year} é referente ao fechamento de 2023 e a receita costuma disponibilizar o aplicativo para download próximo do final de fevereiro.`,
                    "\nPode encontrar o link de instalação no site da Receita Federal ",
                    { text: "clicando aqui", link: "https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf", color: '#815ae8' }, "\n A instalação do programa é rápida e fácil, ao abrir o instalador, serão dados todos os passos para que o programa seja instalado adequadamente na sua máquina. Após abrir o programa, o investidor deverá:\n\n"
                ]
            },
            {
                ol: [
                    `Importar a declaração realizada no ano de ${year} (competência ${year - 1}), caso tenha declarado no ano anterior;\n`,
                    "Criar uma nova Declaração, caso seja a primeira vez declarando o imposto de renda\n\n"
                ]
            },
            {
                image: 'print1',
                width: 505,
                pageBreak: 'after'
            },
            {
                text: "\n\nBens e direitos (Ativos sob sua custódia)\n\n",
                style: "title",
            },
            {
                text: [
                    `A obrigatoriedade das Ações em Bens e Direitos existe caso tenha terminado o ano de ${year} com algum ativo em sua custódia. Na declaração `,
                    { text: "é necessário informar todas as posições", style: { bold: true } },
                    ` em ações, opções, FII e ETF referentes ao dia 31/12/${year} na opção \“Bens e Direitos\”.\n\n`
                ]
            },
            {
                columns: [
                    { text: "Local da declaração \Bens e Direitos\"\n" },
                    { text: "Exemplo de preenchimento" }
                ]
            },
            {
                columns: [
                    { image: "print2", width: 255 },
                    { image: "print3", width: 255 },
                ]
            },
            {
                text: [
                    { text: "\n\nPara cada linha da tabela abaixo efetue um lançamento através do botão" },
                    { text: ' Novo', style: { bold: true } },
                    " preencha os dados da tabela e confirme em ",
                    { text: "'OK'\n\n", style: { bold: true } },
                    `Abaixo incluímos também o custo de seus ativos em ${year - 1} de acordo com os lançamentos feitos na planilha @ricardoinvesting. Caso seus lançamentos de ${year - 1} não estejam na planilha substitua os valores da coluna de 31/12/${year - 1} pelos valores que incluiu na declaração anterior.\n\n`,
                ],
                pageBreak: "after"
            },
            {
                text: "Será necessário informar na seção de bens e direitos o grupo de bens, abaixo listamos o grupo e também o código que irá declarar seus ativos.\n", style: { bold: true }
            },
            {
                style: "table",
                table: {
                    widths: ['auto', 'auto', "auto", 100, 160, 60, 60],
                    body: [
                        composeHeaderTable(["Grupo", "Cód.", "Local.", "CNPJ", "Discriminação", `Situação 31/12/${year}`, `Situação 31/12/${year}`]),
                        ...composeBensDireitos(),
                    ]
                },
                pageBreak: "after"
            },
            {
                text: "Rendimentos isentos e não tributáveis (Vendas abaixo de 20mil, ativos isentos e dividendos)\n\n",
                style: "title",
            },
            {
                text: [
                    { text: "Esta seção irá lhe demonstrar quais rendimentos teve durante e o ano e foram " },
                    { text: "isentos de imposto de renda", style: { "text-transform": "underline" } },
                    { text: ", seja por benefício fiscal ou limite de isenção.\n\n" }
                ]
            },
            {
                text: "Itens contemplados no relatório:\n",
                ul: [
                    "Vendas mensais de ações abaixo de 20 mil reais (Brasil)",
                    "Dividendos de ações",
                    "Rendimentos de (FII, FIAGRO e FI-INFRA)",
                    "Vendas de ativos com benefício fiscal",
                    "Bonificação\n\n"
                ]
            },
            {
                text: "Local e exemplo de preenchimento:\n",
                style: "subheader"
            },
            {
                image: "print4",
                width: 505,
            },
            {
                pageBreak: "before",
                text: [
                    "\n\nPara cada linha da tabela abaixo efetue um lançamento através do botão ",
                    { text: "'Novo'", style: "negrito" },
                    ", preencha os dados da tabela e confirme em ",
                    { text: "'OK'", style: "negrito" }
                ]
            },
            {
                text: "\nDividendos",
                style: "title"
            },
            {
                style: "table",
                table: {
                    widths: [30, "*", 200, "*"],
                    body: [
                        composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Valor"]),
                        ...provents.dividends,
                    ]
                },
                pageBreak: "after"
            },
            {
                text: "Rendimentos de (FII, FIAGRO e FI-INFRA)",
                style: "title"
            },
            {
                style: "table",
                table: {
                    widths: [20, "*", 100, "*", "*"],
                    body: [
                        composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Descrição", "Valor"]),
                        ...provents.rendiments,
                    ]
                }
            },
            {
                text: "\n\nVendas abaixo de R$20.000,00 no mês",
                style: "title"
            },
            {
                style: "table",
                table: {
                    widths: [30, "*"],
                    body: [
                        composeHeaderTable(["Tipo", "Valor"]),
                        ["20", SUM_SWING_TRADE_FREE.hasOwnProperty(year) ? convertCurrencyReal(SUM_SWING_TRADE_FREE[year]) : convertCurrencyReal(0)]
                    ]
                },
                pageBreak: "after"
            },
            {
                text: "Rendimentos sujeitos a tributação exclusiva (Proventos tributados como JCP)",
                style: "title"
            },
            {
                text: [
                    "\n\nEsta seção irá lhe demonstrar quais ",
                    { text: "rendimentos tiveram tributação", style: "negrito" },
                    " retida na fonte durante e o ano, não será necessário pagar imposto adicional sobre eles, mas precisará declará-los na seção de mesmo nome."
                ]
            },
            {
                text: "\nItens contemplados no relatório:",
                ul: [
                    "Juros sobre capital",
                    "Outros proventos tributados",
                ]
            },
            {
                text: "\nLocal e exemplo de preenchimento:\n",
                style: "subheader"
            },
            {
                image: "print5",
                width: 505,
            },
            {
                text: [
                    "\n\nPara cada linha da tabela abaixo efetue um lançamento através do botão ",
                    { text: "'Novo'", style: "negrito" },
                    ", preencha os dados da tabela e confirme em ",
                    { text: "'OK'", style: "negrito" }
                ]
            },
            {
                text: "\nJCP (juros sobre capital próprio - valor líquido)",
                style: "title"
            },
            {
                style: "table",
                table: {
                    widths: [30, "*", "*", "*"],
                    body: [
                        composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Valor"]),
                        ...provents.jcp,
                    ]
                },
            },
            {
                text: "\n\nRendimentos sobre JCP",
                style: "title"
            },
            {
                style: "table",
                table: {
                    widths: [30, "*", "*", "*", "*"],
                    body: [
                        composeHeaderTable(["Tipo", "CNPJ", "Nome da fonte pagadora", "Descrição", "Valor"]),
                        ...provents.rendimentsJCP,
                    ]
                },
                pageBreak: "after"
            },
            {
                text: "Renda variável (Vendas de ativos no Brasil com DARF ou no prejuízo)",
                style: "title"
            },
            {
                text: "\nEsta seção irá lhe demonstrar quais resultados obteve na bolsa do brasil e como deverá declarar os lucros, prejuízos e IR já pago.",
            },
            {
                text: "\nOperações Comuns / Day-Trade",
                style: "title"
            },
            {
                text: [
                    "\nAs operações de venda envolvendo ações, opções, futuros, ETF e BDR serão declaradas nessa seção e de forma mensal.Somente constam nessa seção suas vendas que foram",
                    { text: " tributadas", style: "negrito" },
                    " fora da isenção. Para vendas isentas, faça o lançamento na seção Rendimentos Isentos conforme mencionado acima. Abaixo descrevemos todos lançamentos que deverá fazer com base na apuração realizada em nossa plataforma.",
                    "\n\nOperações com fundos imobiliários não entram nesta seção, caso vendeu FIIs durante o ano de 2023, iremos demonstrar na seção \"Operações Fundos Investimento Imobiliário\"\n\n"
                ]
            },
            {
                image: "print6",
                width: 505,
            },
        ],
        pageMargin: [0, 0],
        defaultStyle: { alignment: "justify" },
        images: {
            ricardoinvesting: "https://i.ibb.co/FDPPj9w/Novo-Projeto-1.png",
            print1: "https://i.ibb.co/HG3hwv0/print-1.png",
            print2: "https://i.ibb.co/p0bgbwk/print-2.png",
            print3: "https://i.ibb.co/bs0HY4n/print-3.png",
            print4: "https://i.ibb.co/fk65Jw9/print4.png",
            print5: "https://i.ibb.co/G7Tm0mD/print-5.png",
            print6: "https://i.ibb.co/xSvNxT6/print-6.png",
            print7: "https://i.ibb.co/MggZg8Q/print-7.png",
            print8: "https://i.ibb.co/WDjfkTL/print-8.png"
        },
        styles: {
            table: {
                margin: [0, 5, 0, 15],
                fontSize: 10,
                alignment: "center"
            },
            tableOperation: {
                margin: [0, 5, 0, 15],
                fontSize: 10,
                alignment: "center",
                color: "#7f7f7f"
            },
            title: {
                fontSize: 15,
                bold: true,
            },
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 190, 0, 80]
            },
            subheader: {
                fontSize: 12
            },
            description: {
                fontSize: 9,
            },
            negrito: {
                bold: true,
            }
        }
    };

    // mount common operation
    const tableCommonOperationAndDayTrade = composeTableCommonOperationAndDayTrade(operationsFull);
    let tableCommonOperationAndDayTradeFiltered = {};
    _.map(tableCommonOperationAndDayTrade, (year, indexYear)=> _.map(year, (month, indexMonth) => {
        if(Object.keys(month).length > 0) {
            if(tableCommonOperationAndDayTradeFiltered.hasOwnProperty(indexYear)) {
                tableCommonOperationAndDayTradeFiltered[indexYear].push(indexMonth)
            } else {
                tableCommonOperationAndDayTradeFiltered[indexYear] = [indexMonth]
            }
        }
    }))    
    
    console.log("tableCommonOperationAndDayTrade", tableCommonOperationAndDayTrade)
    console.log("tableCommonOperationAndDayTradeFiltered", tableCommonOperationAndDayTradeFiltered)
    _.map(tableCommonOperationAndDayTrade[year], (month, indexMonth) => {
        const co = composeCommonOperationAndDayTrade(month, year, indexMonth, operationsFull, tableCommonOperationAndDayTradeFiltered[year], tableCommonOperationAndDayTrade);
        if (co) {
            docDefinition.content.push(co.title);
            docDefinition.content.push(co.content1);
            docDefinition.content.push(co.content2);
            docDefinition.content.push(co.content3);
        }
    });

    docDefinition.content.push({
        pageBreak: "before",
        text: "Operações Fundos de Investimentos Imobiliários (FII e FIAGROS)\n\n",
        style: "title"
    })
    docDefinition.content.push(
        {
            text: [
                "As operações de venda envolvendo ",
                { text: "fundos imobiliários", style: { "text-decorator": "underline", bold: true } },
                " serão declaradas nessa seção e de forma mensal. Toda venda de fundo imobiliário é tributada, abaixo poderá verificar seus ganhos/prejuízos apurados de acordo com seus lançamentos.\n\n"
            ]
        }
    )
    docDefinition.content.push(
        {
            image: "print7",
            width: 505,
        },
    )

    docDefinition.content.push({
        text: "\n"
    })

    _.map(operationsFull, (itemYear, indexYear) => _.map(itemYear, (month, indexMonth) => {
        const co = composeOperationsFII(operationsFull[indexYear][indexMonth], indexYear, indexMonth);
        if (co) {
            if (operationsFII.hasOwnProperty(indexYear)) {
                if (operationsFII[indexYear].hasOwnProperty(indexMonth)) {
                    operationsFII[indexYear][indexMonth] = co;
                } else {
                    operationsFII[indexYear] = {
                        [indexMonth]: co
                    };
                }
            } else {
                operationsFII[indexYear] = {
                    [indexMonth]: co
                };
            }
        }
    }));


    _.map(operationsFII, (opYear, indexYear) => _.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (mes) => {
        if (mes === 1) {
            if (tableOperationsFII.hasOwnProperty(indexYear)) {
                if (tableOperationsFII[indexYear].hasOwnProperty(mes)) {
                    tableOperationsFII[indexYear][mes] = [
                        MONTHS_LABEL[mes].slice(0, 3),
                        getNode(operationsFII[indexYear], mes),
                        tableOperationsFII[indexYear - 1][12][2] > 0 ? tableOperationsFII[indexYear - 1][12][2] * -1 : 0,
                        0,
                        0,
                        "20%",
                        0,
                        0,
                        0,
                        0,
                        0,
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
                            0,
                            0,
                            0,
                            0,
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
                        0,
                        0,
                        0,
                        0,
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
                0,
                0,
                0,
                0,
                0,
            ]
        }
    }))

    function composeTableOperationsFII() {        
        const table_data = [];        
        _.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (mes) => {
            if(tableOperationsFII.hasOwnProperty(year) && tableOperationsFII[year].hasOwnProperty(mes)) {
                table_data.push([
                    tableOperationsFII[year][mes][0],
                    tableOperationsFII[year][mes][1] !== 0 ? { text: convertCurrencyRealWithoutCoin(getNode(operationsFII[year], mes)), style: { color: "blue", bold: true } } : convertCurrencyRealWithoutCoin(0),
                    mes === 1? convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][2]) : {text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][2]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][3]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][4]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][5]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][6]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][7]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][8]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][9]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][10]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                    { text: convertCurrencyRealWithoutCoin(tableOperationsFII[year][mes][11]), style: { color: "#7f7f7f", fillColor: "#d3d3d3" } },
                ])
            }
        })
        return table_data;

    }

    docDefinition.content.push(
        {
            style: "tableOperation",
            table: {
                widths: [25, 35, 35, 35, 35, 35, 33, 33, 28, 30, 35, 35],
                body: [
                    composeHeaderTable(["Mês", "Resultado líquido do mês", "Resultado negativo até o mês anterior", "Base de cálculo do imposto", "Prejuízo a compensar", "Alíquota do imposto", "Imposto devido", "Saldo IR retido", "IR retido", "IR a compensar", "Imposto a pagar", "Imposto Pago"]),
                    ...composeTableOperationsFII()

                ]
            }
        },
    )

    composeTaxExternal(docDefinition);
    composerExternalDividends(docDefinition);

    return docDefinition;
}

function downloadPdf() {
    pdfMake.createPdf(pdfDefinition).open();
}
