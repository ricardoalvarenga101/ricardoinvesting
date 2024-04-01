/**
 * @preserve
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
 * @endpreserve
 */

/**
 * ############### vars ###############
*/
let loading = false;
let operationsFull = {};
let itensWalletFiltered = [];
let provents = {};
let year = 2023;
let name = "";
let document_number = "";
let firstYear = new Date().getFullYear();
let operationsFII = {}
let tableOperationsFII = {}
let lossesSalesFii = {};
let pdfDefinition = {}
let _local = false;

/**
* ############### constants ###############
*/
const LIMIT_SWING_TRADE = 20000;
const LIMIT_SWING_EXTERIOR = 35000;
const SUM_SWING_TRADE_FREE = {};
const TYPE_OPERATIONS_SELL = {
    "VENDA_DE_FII": "VENDA DE FII/FIAGRO", //
    "DAY_TRADE": "DAY TRADE DE AÇÃO", //
    "SWING_TRADE": "SWING TRADE DE AÇÃO", //
    "VENDA_DE_ACAO_ESTRANGEIRA": "VENDA DE AÇÃO ESTRANGEIRA",
    "VENDA_DE_BDR": "VENDA DE BDR", //
    "VENDA_DE_ETF": "VENDA DE ETF", //
    "VENDA_DE_FI_INFRA": "VENDA DE FI INFRA", //
    "VENDA_DE_CRIPTOMOEDA": "VENDA DE CRIPTOMOEDA",
    "DIREITOS_DE_SUBSCRICAO": "DIREITOS DE SUBSCRIÇÃO", //
}
const MONTHS_LABEL = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
}
/**
* ############### utils ###############
*/

function getOtherLastPosition(operations, year, initialPosition) {
    const listMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].reverse();    
    let lastRegister = {}
    for(let i=13-initialPosition; i < listMonths.length; i++) {
        if (Object.keys(operations[year][listMonths[i]]).length > 0) {
            lastRegister = { op: operations[year][listMonths[i]], year, month: listMonths[i] };
            break;

        }
    }
    return lastRegister 
}

function getLastOrFirstPositionYear(operations, year, sort=1) {
    let listMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if(sort===-1) {
        listMonths.reverse()
    }
    let lastRegister = {}
    for(let i=0; i < listMonths.length; i++) {
        if (Object.keys(operations[year][listMonths[i]]).length > 0) {
            lastRegister = { op: operations[year][listMonths[i]], year, month: listMonths[i] };
            break;

        }
    }
    return lastRegister 
}

function sumAccumulator(operations, year, keySum, breakMonth = false) {
    let acc = 0
    const op = operations[year]
    _.map(op, (month, indexMonth) => {
        if (Object.keys(month).length > 0) {
            if (breakMonth && breakMonth <= indexMonth) {
                acc += month[keySum];
            } else {
                acc += month[keySum];
            }
        }
    })
    return acc;
}

function subtractionLosses(valueA, valueB) {
    if (valueA >= valueB) {
        return 0
    }
    return valueB - valueA;

}

function getNode(object, key) {
    if (object.hasOwnProperty(key)) {
        return object[key]
    } else {
        return 0
    }
}

function taxCal(value, percent) {
    if (value > 0) {
        return convertCurrencyReal(value * percent);
    }
    return convertCurrencyReal(0);
}

function convertCurrencyReal(value) {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}
function convertCurrencyRealWithoutCoin(value) {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}

function errorLoadingData(error) {
    console.log(`erro ao carregar dados`, error);
}

function getCodes(classe) {

    let group = "-";
    let cod = "-";
    let locale = "105 - Brasil";

    switch (classe) {
        case "Ação":
            group = "03";
            cod = "01";
            break;
        case "FI-INFRA":
            group = "07";
            cod = "99";
            break;
        case "FII":
            group = "07";
            cod = "03";
            break;
        case "Fiagro":
            group = "07";
            cod = "02";
            break;
        case "STOCK":
            group = "03";
            cod = "01";
            locale = "249 - Estados Unidos";
            break;
        case "REIT":
            group = "03";
            cod = "01";
            locale = "249 - Estados Unidos";
        case "ETF-EXTERIOR":
            group = "07";
            cod = "09";
            locale = "249 - Estados Unidos";
            break;
        case "Renda Fixa":
            group = "04";
            cod = "02";
            break;
        case "Renda Fixa - Outros":
            group = "04";
            cod = "02";
            break;
    }

    return {
        group,
        cod,
        locale
    }
}

function calcLossesAcumulator(historyAcumulator, mountLoss) {
    const sub = historyAcumulator - mountLoss;
    return sub;
}

function checkNegativeSald(value) {
    if (value <= 0) {
        return 0
    }
    return value;
}
/**
* ############### server ###############
*/

function _getFirstYear() {
    document.getElementById("btn_generate").style.display = "none";
    document.getElementById("ir_form").style.display = "none";
    document.getElementById("loading_spinner").style.display = "flex";
    document.getElementById("txt_await").style.display = "none";
    document.getElementById("txt_await_form").style.display = "flex";
    name = (document.getElementById("input_name").value).toUpperCase();
    document_number = document.getElementById("input_cpf").value;
    if (_local) {
        getFirstYear(2022) // test local
    } else {
        google.script.run
            .withSuccessHandler(getFirstYear)
            .withFailureHandler(errorLoadingData)
            .getFirstYear();
    }
}

function _loadingData() {
    document.getElementById("btn_generate").style.display = "none";
    document.getElementById("ir_form").style.display = "none";
    document.getElementById("loading_spinner").style.display = "flex";
    document.getElementById("txt_await").style.display = "flex";
    name = (document.getElementById("input_name").value).toUpperCase();
    document_number = document.getElementById("input_cpf").value;
    if (_local) {
        getJson(mockFullData) // test local
    } else {
        google.script.run
            .withSuccessHandler(getJson)
            .withFailureHandler(errorLoadingData)
            .irReportLoadingData(year, false, true);
    }
}
/**
* ############### process data ###############
*/

function getFirstYear(data) {
    firstYear = data;
    composeListYears();
    document.getElementById("btn_generate").style.display = "block";
    document.getElementById("ir_form").style.display = "inline";
    document.getElementById("loading_spinner").style.display = "none";
    document.getElementById("txt_await").style.display = "none";
    document.getElementById("txt_await_form").style.display = "none";
    name = (document.getElementById("input_name").value).toUpperCase();
    const e = document.getElementById("year_select");
    year = e.options[e.selectedIndex].value;
    document_number = document.getElementById("input_cpf").value;
}

function getJson(data) {
    itensWalletFiltered = data.itensWallletFiltered;
    provents = composeProvents(data.provents);

    operations = {};
    const t = _.map(data.sells, (year, indexYear) => _.map(year, (month, indexMonth) => {
        const filterOperations = _.groupBy(month.operations, (x) => x.operation);
        _.map(filterOperations, (ops, indexOp) => {
            _.map(ops, (op) => {
                composeOperations(operationsFull, indexMonth, indexYear, op);
            })
        })
    }))
    composeSwingTradeFree(operationsFull);
    document.getElementById("btn_generate").style.display = "block";
    document.getElementById("loading_spinner").style.display = "none";
    document.getElementById("btn_download").style.display = "block";
    document.getElementById("btn_back").style.display = "block";
    document.getElementById("txt_await").style.display = "none";
    pdfDefinition = generatePdf();
    console.log("operationsFull", operationsFull);
}

function onChange() {
    const e = document.getElementById("year_select");
    year = e.options[e.selectedIndex].value;
}
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
                        composeHeaderTable(["Grupo", "Cód.", "Local.", "CNPJ", "Discriminação", `Situação 31/12/${year-1}`, `Situação 31/12/${year}`]),
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
    if (provents.hasOwnProperty("external") && provents["external"] && Object.keys(provents["external"]).length > 0) {

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
    if (provents.hasOwnProperty("external") && provents["external"] && Object.keys(provents["external"]).length > 0) {
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
