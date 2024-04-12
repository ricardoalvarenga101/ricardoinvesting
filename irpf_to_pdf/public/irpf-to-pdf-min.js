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
let loading=!1,operationsFull={},itensWalletFiltered=[],provents={},year=2022,name="",document_number="",_firstYear=(new Date).getFullYear(),operationsFII={},tableOperationsFII={},lossesSalesFii={},pdfDefinition={},_local=!1,SUM_SWING_TRADE_FREE={},SUM_SWING_TRADE_CRIPTO_FREE={},SUM_SWING_TRADE_FREE_99={},bonifications={};const LIMIT_SWING_TRADE=2e4,LIMIT_SWING_TRADE_CRIPTO=35e3,LIMIT_SWING_EXTERIOR=35e3,TYPE_OPERATIONS_SELL={VENDA_DE_FII:"VENDA DE FII/FIAGRO",DAY_TRADE:"DAY TRADE DE AÇÃO",SWING_TRADE:"SWING TRADE DE AÇÃO",VENDA_DE_ACAO_ESTRANGEIRA:"VENDA DE AÇÃO ESTRANGEIRA",VENDA_DE_BDR:"VENDA DE BDR",VENDA_DE_ETF:"VENDA DE ETF",VENDA_DE_FI_INFRA:"VENDA DE FI INFRA",VENDA_DE_CRIPTOMOEDA:"VENDA DE CRIPTOMOEDA",DIREITOS_DE_SUBSCRICAO:"DIREITOS DE SUBSCRIÇÃO"},MONTHS_LABEL={1:"Janeiro",2:"Fevereiro",3:"Março",4:"Abril",5:"Maio",6:"Junho",7:"Julho",8:"Agosto",9:"Setembro",10:"Outubro",11:"Novembro",12:"Dezembro"};function closeWindow(){google.script.host.close()}function getOtherLastPosition(e,t,o){const a=[1,2,3,4,5,6,7,8,9,10,11,12].reverse();let n={};for(let r=13-o;r<a.length;r++)if(Object.keys(e[t][a[r]]).length>0){n={op:e[t][a[r]],year:t,month:a[r]};break}return n}function getLastOrFirstPositionYear(e,t,o=1){let a=[1,2,3,4,5,6,7,8,9,10,11,12];-1===o&&a.reverse();let n={};for(let o=0;o<a.length;o++)if(Object.keys(e[t][a[o]]).length>0){n={op:e[t][a[o]],year:t,month:a[o]};break}return n}function sumAccumulator(e,t,o,a=!1){let n=0;const r=e[t];return _.map(r,((e,t)=>{Object.keys(e).length>0&&(n+=e[o])})),n}function subtractionLosses(e,t){return e>=t?0:t-e}function getNode(e,t){return e.hasOwnProperty(t)?e[t]:0}function taxCal(e,t){return convertCurrencyReal(e>0?e*t:0)}function convertCurrencyReal(e){return e.toLocaleString("pt-br",{minimumFractionDigits:2,style:"currency",currency:"BRL"})}function convertCurrencyRealWithoutCoin(e){return e.toLocaleString("pt-br",{minimumFractionDigits:2})}function errorLoadingData(e){}function getCodes(e){let t="-",o="-",a="105 - Brasil";switch(e){case"Criptomoeda":t="08",o="99";break;case"Ação":t="03",o="01";break;case"FI-INFRA":t="07",o="99";break;case"FII":t="07",o="03";break;case"Fiagro":t="07",o="02";break;case"STOCK":t="03",o="01",a="249 - Estados Unidos";break;case"REIT":t="03",o="01",a="249 - Estados Unidos";case"ETF-EXTERIOR":t="07",o="09",a="249 - Estados Unidos";break;case"Renda Fixa":t="04",o="02";break;case"Renda Fixa - Outros":t="04",o="02";break}return{group:t,cod:o,locale:a}}function calcLossesAcumulator(e,t){return e-t}function checkNegativeSald(e){return e<=0?0:e}function startAnimation(e,t,o="right"){$(`#${t}`).hide(),$(`#${e}`).show("slide",{direction:o},350)}function _getFirstYear(){document.getElementById("btn_generate").style.display="none",document.getElementById("ir_form").style.display="none",document.getElementById("loading_spinner").style.display="flex",document.getElementById("txt_await").style.display="none",document.getElementById("txt_await_form").style.display="flex",document.getElementById("btn_download").style.display="none",document.getElementById("btn_close1").style.display="none",document.getElementById("btn_close2").style.display="none",document.getElementById("btn_back").style.display="none",itensWalletFiltered=[],provents={},bonifications={},operationsFII={},tableOperationsFII={},lossesSalesFii={},pdfDefinition={},operationsFull={},SUM_SWING_TRADE_FREE={},SUM_SWING_TRADE_FREE_99={},SUM_SWING_TRADE_CRIPTO_FREE={},name=document.getElementById("input_name").value.toUpperCase(),document_number=document.getElementById("input_cpf").value,_local?getFirstYear(2022):google.script.run.withSuccessHandler(getFirstYear).withFailureHandler(errorLoadingData).getFirstYear()}function _loadingData(){document.getElementById("btn_generate").style.display="none",document.getElementById("ir_form").style.display="none",document.getElementById("loading_spinner").style.display="flex",document.getElementById("txt_await").style.display="flex",document.getElementById("btn_close1").style.display="none",document.getElementById("btn_close2").style.display="none",document.getElementById("btn_back").style.display="none",name=document.getElementById("input_name").value.toUpperCase(),document_number=document.getElementById("input_cpf").value,_local?getJson(mockBonification2024):google.script.run.withSuccessHandler(getJson).withFailureHandler(errorLoadingData).irReportLoadingData(year,!1,!0)}function getFirstYear(e){_firstYear=e,document.getElementById("btn_generate").style.display="block",document.getElementById("ir_form").style.display="inline",document.getElementById("loading_spinner").style.display="none",document.getElementById("txt_await").style.display="none",document.getElementById("txt_await_form").style.display="none",document.getElementById("btn_close1").style.display="block",document.getElementById("btn_close2").style.display="none",document.getElementById("btn_back").style.display="none",composeListYears(),name=document.getElementById("input_name").value.toUpperCase();const t=document.getElementById("year_select");year=t.options[t.selectedIndex].value,document_number=document.getElementById("input_cpf").value}function getJson(e){itensWalletFiltered=e.itensWallletFiltered,provents=composeProvents(e.provents),bonifications=e.bonifications,operations={};_.map(e.sells,((e,t)=>_.map(e,((e,o)=>{const a=_.groupBy(e.operations,(e=>e.operation));_.map(a,((e,a)=>{_.map(e,(e=>{composeOperations(operationsFull,o,t,e)}))}))}))));composeSwingTradeFree(operationsFull),document.getElementById("btn_generate").style.display="block",document.getElementById("loading_spinner").style.display="none",document.getElementById("btn_download").style.display="block",document.getElementById("txt_await").style.display="none",document.getElementById("btn_close1").style.display="none",document.getElementById("btn_close2").style.display="block",document.getElementById("btn_back").style.display="block",pdfDefinition=generatePdf()}function onChange(){const e=document.getElementById("year_select");year=e.options[e.selectedIndex].value}function generatePdf(){const e={content:[{stack:[{image:"ricardoinvesting",width:150,height:150},{text:"@ricardoinvesting",link:"https://www.youtube.com/@ricardoinvesting",color:"#815ae8"},{text:"Relatório auxiliar para declaração de imposto de renda"},{text:`Ano calendário: ${year}`,style:"subheader"}],style:"header"},{text:[`${name||"<Não informado>"}\n`,`CPF: ${document_number||"<Não informado>"}`],style:{alignment:"right"},pageBreak:"after"},{text:"Escopo do relatório\n\n",style:"title"},{text:"O relatório auxiliar para Declaração de Imposto de Renda gerado pela nossa plataforma, tem por objetivo facilitar o preenchimento da declaração anual que todo investidor deve entregar para a Receita Federal do Brasil. O escopo que é atendido por esse relatório irá lhe auxiliar a preencher os seguintes dados em sua declaração:\n\n"},{ul:[`Bens e direitos (Posição acionária em 31/12/${year})`,"Rendimentos isentos e não tributáveis (Vendas abaixo de R$20.000,00, ativos isentos e dividendos)","Rendimentos sujeitos a tributação exclusiva (Proventos tributados como JCP)","Renda variável (Operações comuns / Day-Trade / Fundos Imobiliários)","Bonificações",{text:"Não contempla ganho de capital em vendas de criptoativos acima de R$35.000,00",color:"red"},{text:"Não contempla ganho de capital nas vendas de ativos do exterior",color:"red"}]},{text:"\n\nIsenção de responsabilidade\n\n",style:"title"},{text:["Toda a informação contida no relatório foi gerada com base nos dados informados pelo utilizador da planilha, ficando sob responsabilidade do investidor a conferência dos dados cadastrados e o preenchimento da declaração de imposto de renda."," Este relatório",{text:" não será sua única fonte",style:{bold:!0}},` de consulta para preencher sua declaração, procure também os informes fornecidos por outras instituições que geraram renda ou rendimentos durante o ano de ${year}.\n\nExemplo de outras informações que deverá procurar para sua declaração:\n`]},{ul:["Informe do banco onde possui conta corrente/poupança para informação de saldos e rendimentos","Informe de seu empregador para declaração de remuneração anual e impostos retidos","Rendimentos provenientes de aluguéis, permutas etc"],pageBreak:"after"},{text:"Instalação do programa\n\n",style:"title"},{text:[`O primeiro passo para a declaração do IRPF ${Number(year)+1} pelo leitor é realizar o download do programa disponibilizado através do site da Receita Federal do Brasil.\n`,`Repare que o IRPF de ${Number(year)+1} é referente ao fechamento de ${year} e a receita costuma disponibilizar o aplicativo para download próximo do final de fevereiro.`,"\nPode encontrar o link de instalação no site da Receita Federal ",{text:"[BAIXAR AQUI]",link:"https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf",color:"#815ae8"},"\n A instalação do programa é rápida e fácil, ao abrir o instalador, serão dados todos os passos para que o programa seja instalado adequadamente na sua máquina. Após abrir o programa, o investidor deverá:\n\n"]},{ol:[`Importar a declaração realizada no ano de ${Number(year)+1} (competência ${year}), caso tenha declarado no ano anterior;\n`,"Criar uma nova Declaração, caso seja a primeira vez declarando o imposto de renda\n\n"]},{image:"print1",width:505,pageBreak:"after"},{text:"Bens e direitos (Ativos sob sua custódia)\n\n",style:"title"},{text:[`A obrigatoriedade das Ações em Bens e Direitos existe caso tenha terminado o ano de ${year} com algum ativo em sua custódia. Na declaração `,{text:"é necessário informar todas as posições",style:{bold:!0}},` em ações, opções, FII e ETF referentes ao dia 31/12/${year} na opção “Bens e Direitos”.\n\n`]},{columns:[{text:'Local da declaração Bens e Direitos"\n'},{text:"Exemplo de preenchimento"}]},{columns:[{image:"print2",width:255},{image:"print3",width:255}]},{text:[{text:"\n\nPara cada linha da tabela abaixo efetue um lançamento através do botão"},{text:" Novo",style:{bold:!0}}," preencha os dados da tabela e confirme em ",{text:"'OK'\n\n",style:{bold:!0}},`Abaixo incluímos também o custo de seus ativos em ${year-1} de acordo com os lançamentos feitos na planilha @ricardoinvesting. Caso seus lançamentos de ${year-1} não estejam na planilha substitua os valores da coluna de 31/12/${year-1} pelos valores que incluiu na declaração anterior.\n\n`],pageBreak:"after"},{text:"Será necessário informar na seção de bens e direitos o grupo de bens, abaixo listamos o grupo e também o código que irá declarar seus ativos.\n",style:{bold:!0}},{style:"table",table:{widths:["auto","auto","auto",100,160,60,60],body:[composeHeaderTable(["Grupo","Cód.","Local.","CNPJ","Discriminação","Situação 31/12/"+(year-1),`Situação 31/12/${year}`]),...composeBensDireitos()]}},...renderRendimentsPrint(),...renderBonifications(),...renderDividends(),...renderRendimentsIsentos(),...renderLow20kMonth(),...renderCriptoLow35kMonth(),...renderJCPs(),...renderRendimentsJCP()],pageMargin:[0,0],defaultStyle:{alignment:"justify"},images:{ricardoinvesting:"https://i.ibb.co/FDPPj9w/Novo-Projeto-1.png",print1:"https://i.ibb.co/HG3hwv0/print-1.png",print2:"https://i.ibb.co/p0bgbwk/print-2.png",print3:"https://i.ibb.co/bs0HY4n/print-3.png",print4:"https://i.ibb.co/fk65Jw9/print4.png",print5:"https://i.ibb.co/G7Tm0mD/print-5.png",print6:"https://i.ibb.co/xSvNxT6/print-6.png",print7:"https://i.ibb.co/MggZg8Q/print-7.png",print8:"https://i.ibb.co/WDjfkTL/print-8.png"},styles:{table:{margin:[0,5,0,15],fontSize:10,alignment:"center"},tableOperation:{margin:[0,5,0,15],fontSize:10,alignment:"center",color:"#7f7f7f"},title:{fontSize:15,bold:!0},header:{fontSize:18,bold:!0,alignment:"right",margin:[0,190,0,80]},subheader:{fontSize:12},description:{fontSize:9},negrito:{bold:!0}}};return renderCommonsOperations(e),renderOperationsFII(e),composeTaxExternal(e),composerExternalDividends(e),e}function downloadPdf(){pdfMake.createPdf(pdfDefinition).open()}function composeOperationsFII(e,t,o){let a=0,n=0,r="";return _.map(e,((e,o)=>{switch(o){case TYPE_OPERATIONS_SELL.VENDA_DE_FII:r=o,e.amountValues>=0?a+=e.amountValues:(n+=e.amountValues,a+=e.amountValues,lossesSalesFii.hasOwnProperty(t)?lossesSalesFii[t]+=n:lossesSalesFii={[t]:n});break}})),r===TYPE_OPERATIONS_SELL.VENDA_DE_FII?a:null}function composeTableCommonOperationAndDayTrade(e){let t={};const o=Object.keys(e),a=o.length>0?o[0]:0;return _.map(e,((e,o)=>{t[o]={1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},accumulatedCommon:0,accumulatedTrade:0},_.map(e,((e,n)=>{let r={commonList:[],dayTradeList:[],totalCommon:0,totalTrade:0};_.map(e,((e,t)=>{switch(t){case TYPE_OPERATIONS_SELL.SWING_TRADE:(e.amountTransaction>2e4||e.amountValues<0)&&r.commonList.push(e);break;case TYPE_OPERATIONS_SELL.VENDA_DE_ETF:case TYPE_OPERATIONS_SELL.VENDA_DE_BDR:case TYPE_OPERATIONS_SELL.DIREITOS_DE_SUBSCRICAO:r.commonList.push(e);break;case TYPE_OPERATIONS_SELL.DAY_TRADE:r.dayTradeList.push(e);break}})),r.totalCommon=_.sumBy(r.commonList,"amountValues"),r.totalTrade=_.sumBy(r.dayTradeList,"amountValues"),t[o][n]=r,calcAccumulatedMonth(o,a,n,t)})),calcAccumulatedYear(o,a,t)})),t}function composeTableOperationsCriptos(e){let t={};const o=Object.keys(e),a=o.length>0?o[0]:0;return _.map(e,((e,o)=>{t[o]={1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},accumulatedTrade:0,accumulatedCommon:0},_.map(e,((e,n)=>{let r={commonList:[],dayTradeList:[],totalCommon:0,totalTrade:0};_.map(e,((e,t)=>{switch(t){case TYPE_OPERATIONS_SELL.VENDA_DE_CRIPTOMOEDA:e.amountTransaction>35e3?r.dayTradeList.push(e):r.commonList.push(e);break}})),r.totalCommon=_.sumBy(r.commonList,"amountValues"),r.totalTrade=_.sumBy(r.dayTradeList,"amountValues"),t[o][n]=r,calcAccumulatedMonth(o,a,n,t)})),calcAccumulatedYear(o,a,t)})),t}function calcAccumulatedMonth(e,t,o,a){const n=a[e][o];if(e===t)a[e][o]="1"===o?{...n,accumulatedCommon:sumAccumulator(a,e,"totalCommon",o),accumulatedTrade:sumAccumulator(a,e,"totalTrade",o)}:{...n,accumulatedCommon:a[e][o-1].accumulatedCommon||0+sumAccumulator(a,e,"totalCommon",o),accumulatedTrade:a[e][o-1].accumulatedTrade||0+sumAccumulator(a,e,"totalTrade",o)};else{if(getLastOrFirstPositionYear(a,e,1).month==o){const t=a[e-1].accumulatedCommon,n=a[e-1].accumulatedTrade;a[e][o].accumulatedCommon=t+sumAccumulator(a,e,"totalCommon"),a[e][o].accumulatedTrade=n+sumAccumulator(a,e,"totalTrade")}else{const t=getOtherLastPosition(a,e,o);t.op.accumulatedCommon<0?a[e][o].accumulatedCommon=t.op.accumulatedCommon+sumAccumulator(a,e,"totalCommon"):a[e][o].accumulatedCommon=sumAccumulator(a,e,"totalCommon"),t.op.accumulatedTrade<0?a[e][o].accumulatedTrade=t.op.accumulatedTrade+sumAccumulator(a,e,"totalTrade"):a[e][o].accumulatedTrade=sumAccumulator(a,e,"totalTrade")}}const r=a[e][o].accumulatedCommon,s=a[e][o].accumulatedTrade;r>0&&(a[e][o].accumulatedCommon=0),s>0&&(a[e][o].accumulatedTrade=0)}function calcAccumulatedYear(e,t,o){e===t?(o[e].accumulatedCommon=sumAccumulator(o,e,"totalCommon"),o[e].accumulatedTrade=sumAccumulator(o,e,"totalTrade")):(o[e-1].accumulatedCommon<0?o[e].accumulatedCommon=o[e-1].accumulatedCommon+sumAccumulator(o,e,"totalCommon"):o[e].accumulatedCommon=sumAccumulator(o,e,"totalCommon"),o[e-1].accumulatedTrade<0?o[e].accumulatedTrade=o[e-1].accumulatedTrade+sumAccumulator(o,e,"totalTrade"):o[e].accumulatedTrade=sumAccumulator(o,e,"totalTrade"));const a=o[e].accumulatedCommon,n=o[e].accumulatedTrade;a>0&&(o[e].accumulatedCommon=0),n>0&&(o[e].accumulatedTrade=0)}function composeCommonOperationAndDayTrade(e,t,o,a,n=[],r){if(!n.includes(o))return null;if(!e.commonList.length&&!e.dayTradeList.length)return null;let s=0,i=0;const l=n.indexOf(o),d=Object.keys(a),c=d.length>0?d[0]:0,u=convertCurrencyReal(convertCurrencyReal(e.totalCommon)),m=convertCurrencyReal(convertCurrencyReal(e.totalTrade));t!==c?0===l?(s=r[t-1].accumulatedCommon,i=r[t-1].accumulatedTrade):(s=r[t][n[l-1]].accumulatedCommon,i=r[t][n[l-1]].accumulatedTrade):0===l?(s=0,i=0):(s=r[t][n[l-1]].accumulatedCommon,i=r[t][n[l-1]].accumulatedTrade);const p=Math.abs(s)>=e.totalCommon?0:e.totalCommon-s,y=Math.abs(i)>=e.totalTrade?0:e.totalTrade-i,b=s>e.totalCommon?s-e.totalCommon:0,_=i>e.totalTrade?i-e.totalTrade:0;return{title:{pageBreak:"before",text:`\n\n${MONTHS_LABEL[o]} - ${t}`,style:"title"},content1:{style:"tableOperation",table:{widths:[200,"*","*"],body:[composeHeaderTable(["Resultados","Operações Comuns","Day-Trade"]),[{text:"Mercado à Vista - Ações",style:{color:"black"}},{text:u,style:{color:"blue",bold:!0}},{text:m,style:{color:"blue",bold:!0}}]]}},content2:{style:"tableOperation",table:{widths:[200,"*","*"],body:[composeHeaderTable(["Resultados","Operações Comuns","Day-Trade"]),[{text:"RESULTADO LÍQUIDO DO MÊS",style:{color:"black"}},{text:u,style:{color:"blue",bold:!0}},{text:convertCurrencyReal(0),style:{color:"blue",bold:!0}}],[{text:"Resultado negativo até o mês anterior",style:{color:"black"}},convertCurrencyReal(Math.abs(s)),convertCurrencyReal(i)],[{text:"BASE DE CÁLCULO DO IMPOSTO",style:{color:"black"}},{text:convertCurrencyReal(p),style:{color:"blue",bold:!0}},{text:convertCurrencyReal(y),style:{color:"blue",bold:!0}}],[{text:"Prejuízo a compensar",style:{color:"black"}},convertCurrencyReal(Math.abs(b)),convertCurrencyReal(_)],[{text:"Alíquota do imposto",style:{color:"black"}},{text:"15%",style:{color:"black"}},{text:"20%",style:{color:"black"}}],[{text:"IMPOSTO DEVIDO",style:{color:"black"}},{text:taxCal(p,.15),style:{color:"blue",bold:!0}},{text:taxCal(y,.2),style:{color:"blue",bold:!0}}]]}},content3:{style:"tableOperation",table:{widths:["*","*"],body:[composeHeaderTable([{text:"Consolidação do mês",colSpan:2},{}]),[{text:"Total do imposto devido",style:{color:"black"}},{text:convertCurrencyReal(.15*p+.2*y),style:{color:"blue",bold:!0}}],[{text:"IR fonte de Day-Trade no Mês",style:{color:"black"}},convertCurrencyReal(0)],[{text:"IR fonte de Day-Trade nos meses anteriores",style:{color:"black"}},convertCurrencyReal(0)],[{text:"IR fonte de Day-Trade a compensar",style:{color:"black"}},convertCurrencyReal(0)],[{text:"IR fonte (Lei nº 11.033/2004) no mês",style:{color:"black"}},convertCurrencyReal(0)],[{text:"IR fonte (Lei nº 11.033/2004) nos meses anteriores",style:{color:"black"}},convertCurrencyReal(0)],[{text:"IR fonte (Lei nº 11.033/2004) meses a compensar",style:{color:"black"}},convertCurrencyReal(0)],[{text:"Imposto a pagar",style:{color:"black"}},{text:convertCurrencyReal(.15*p+.2*y),style:{color:"blue",bold:!0}}],[{text:"Imposto pago",style:{color:"black"}},convertCurrencyReal(.15*p+.2*y)]]}}}}function composeAmountOperations(e){e.amountTransaction=_.sum(e.transactions),e.amountValues=_.sum(e.values)}function mountSalesFiInfra(e,t,o){if(o.operation!==TYPE_OPERATIONS_SELL.VENDA_DE_FI_INFRA)return null;SUM_SWING_TRADE_FREE_99.hasOwnProperty(e,t,o)?SUM_SWING_TRADE_FREE_99[e].hasOwnProperty(o.ticker)?(SUM_SWING_TRADE_FREE_99[e][o.ticker].transactions.push(o.transaction),SUM_SWING_TRADE_FREE_99[e][o.ticker].values.push(o.value),composeAmountOperations(SUM_SWING_TRADE_FREE_99[e][o.ticker])):(SUM_SWING_TRADE_FREE_99[e]={...SUM_SWING_TRADE_FREE_99[e],[o.ticker]:{transactions:[o.transaction],values:[o.value],name:o.name,ticker:o.ticker,type:o.type,classe:o.classe,document_number_admin:o.document_number_admin,document_number_principal:o.document_number_principal}},composeAmountOperations(SUM_SWING_TRADE_FREE_99[e][o.ticker])):(SUM_SWING_TRADE_FREE_99[e]={[o.ticker]:{transactions:[o.transaction],values:[o.value],name:o.name,ticker:o.ticker,type:o.type,classe:o.classe,document_number_admin:o.document_number_admin,document_number_principal:o.document_number_principal}},composeAmountOperations(SUM_SWING_TRADE_FREE_99[e][o.ticker]))}function composeOperations(e,t,o,a){return mountSalesFiInfra(o,t,a),e.hasOwnProperty(o)?e[o].hasOwnProperty(t)?e[o][t].hasOwnProperty(a.operation)?(e[o][t][a.operation].transactions.push(a.transaction),e[o][t][a.operation].values.push(a.value),composeAmountOperations(e[o][t][a.operation])):(e[o][t][a.operation]={transactions:[a.transaction],values:[a.value]},composeAmountOperations(e[o][t][a.operation])):(e[o][t]={[a.operation]:{transactions:[a.transaction],values:[a.value]}},composeAmountOperations(e[o][t][a.operation])):(e[o]={[t]:{[a.operation]:{transactions:[a.transaction],values:[a.value]}}},composeAmountOperations(e[o][t][a.operation])),e}function composeSwingTradeFree(e){_.map(e,((e,t)=>{let o=0;_.map(e,(e=>_.map(e,((e,a)=>{a===TYPE_OPERATIONS_SELL.SWING_TRADE&&e.amountTransaction<=2e4&&(o+=e.amountValues,SUM_SWING_TRADE_FREE[t]=o)}))))}))}function composeListYears(){const e=(new Date).getFullYear(),t=document.getElementById("year_select");let o="";for(let t=e;t>=_firstYear;t--)o+=`<option value='${t}'>${t}</option>`;t.innerHTML=o}function composeProvents(e){const t=e&&e.hasOwnProperty("external")?e.external:null;e&&e.hasOwnProperty("external")&&delete e.external;const o=Object.keys(e).sort(),a=[],n=[],r=[],s=[];return o.forEach((t=>{e[t].amountDividend&&a.push(["09",e[t].document_number_principal,e[t].name,convertCurrencyReal(e[t].amountDividend)]),e[t].amountJcp&&n.push(["10",e[t].document_number_principal,e[t].name,convertCurrencyReal(e[t].amountJcp||0)]),e[t].amountRendiment&&r.push(["99",e[t].document_number_principal,e[t].name,`Rendimentos de ${t} - (Administradora: ${e[t].admin?e[t].admin:e[t].document_number_principal})`,convertCurrencyReal(e[t].amountRendiment||0)]),e[t].amountRendimentJCP&&s.push(["12",e[t].document_number_principal,e[t].name,`Rendimentos tributados sobre juros recebidos de (${e[t].name})`,convertCurrencyReal(e[t].amountRendimentJCP)])})),{dividends:a,jcp:n,rendiments:r,rendimentsJCP:s,external:t}}function composeBensDireitos(){const e=[];return itensWalletFiltered.forEach((t=>{e.push([getCodes(t.classe).group,getCodes(t.classe).cod,getCodes(t.classe).locale,t.document_number_principal&&""!==t.document_number_principal?t.document_number_principal:t.document_number_admin,{text:t.description,style:"description"},t.past_year,t.this_year])})),e}function composeHeaderTable(e=[],t="#300668",o="white"){const a=[];return e.forEach((e=>{a.push({text:e,fillColor:t,color:o,style:{alignment:"center"}})})),a}function composerExternalDividends(e){if(provents.hasOwnProperty("external")&&provents.external&&Object.keys(provents.external).length>0){const t={dividends:{1:{values:[],amount:0},2:{values:[],amount:0},3:{values:[],amount:0},4:{values:[],amount:0},5:{values:[],amount:0},6:{values:[],amount:0},7:{values:[],amount:0},8:{values:[],amount:0},9:{values:[],amount:0},10:{values:[],amount:0},11:{values:[],amount:0},12:{values:[],amount:0}},tax:{1:{values:[],amount:0},2:{values:[],amount:0},3:{values:[],amount:0},4:{values:[],amount:0},5:{values:[],amount:0},6:{values:[],amount:0},7:{values:[],amount:0},8:{values:[],amount:0},9:{values:[],amount:0},10:{values:[],amount:0},11:{values:[],amount:0},12:{values:[],amount:0}}};_.map(provents.external,(e=>{_.map(e.dividendPerMonth,((e,o)=>{const a=Number(o)+1;t.dividends[a].values.push(e),t.dividends[a].amount=_.sum(t.dividends[a].values)})),_.map(e.taxPerMonth,((e,o)=>{const a=Number(o)+1;t.tax[a].values.push(e),t.tax[a].amount=_.sum(t.tax[a].values)}))}));const o=[];_.map(t.dividends,((e,a)=>{e.values.length&&o.push([MONTHS_LABEL[a],convertCurrencyReal(t.dividends[a].amount),convertCurrencyReal(t.tax[a].amount)])}));const a={pageBreak:"before",text:"Carnê-Leão (Dividendos recebidos no exterior)",style:"title"},n={text:["\nOs ",{text:"dividendos recebidos nos Estados Unidos",style:"negrito"}," tem seu imposto de renda retido na fonte, mas devem ser declarados através do Programa Carnê-Leão.\n\n",{text:"O Carnê-Leão Online pode ser acessado pelo e-CAC "},{text:"[CLIQUE AQUI]",link:"https://www.gov.br/pt-br/servicos/apurar-carne-leao",color:"#815ae8"},{text:"\n\n Veja vídeo tutorial ensinando como deve ser o prenchimento dos dados: "},{text:"[VÍDEO TUTORIAL]\n",link:"https://youtu.be/bYZH-D4h51Y?si=SogRBTtyjGkL_MgN",color:"#815ae8"}]},r={style:"table",table:{widths:[70,"*","*"],body:[composeHeaderTable(["Mês","Rendimentos do exterior (R$)","Imposto pago no exterior"]),...o]}};e.content.push(a),e.content.push(n),e.content.push(r)}return null}function composeTaxExternal(e){if(provents.hasOwnProperty("external")&&provents.external&&Object.keys(provents.external).length>0){let t=0;_.map(provents.external,(e=>{t+=e.amountTax}));const o={pageBreak:"before",text:"Imposto Pago/Retido (IR a compensar ou retido no exterior)",style:"title"},a={text:"\nEsta seção irá lhe demonstrar impostos já retidos no exterior para demonstração a Receita e/ou impostos retidos na fonte que podem ser compensados ao fim do ano.\n\n"},n={image:"print8",width:505},r={text:"\nDados a declarar",style:"title"},s={style:"table",table:{widths:[340,"*"],body:[composeHeaderTable(["Imposto","Valor"]),[{text:[{text:"02.",style:"negrito"}," Imposto pago no exterior pelo titular e pelos dependentes"]},convertCurrencyReal(t)]]}};return e.content.push(o),e.content.push(a),e.content.push(n),e.content.push(r),e.content.push(s),null}return null}function composeTableOperationsFII(){const e=[];return _.map([1,2,3,4,5,6,7,8,9,10,11,12],(t=>{if(tableOperationsFII.hasOwnProperty(year)&&tableOperationsFII[year].hasOwnProperty(t)){let o="blue";getNode(operationsFII[year],t)<0&&(o="red"),e.push([tableOperationsFII[year][t][0],0!==tableOperationsFII[year][t][1]?{text:convertCurrencyRealWithoutCoin(getNode(operationsFII[year],t)),style:{color:o,bold:!0}}:convertCurrencyRealWithoutCoin(0),1===t?convertCurrencyRealWithoutCoin(tableOperationsFII[year][t][2]):{text:convertCurrencyRealWithoutCoin(tableOperationsFII[year][t][2]),style:{color:"#7f7f7f",fillColor:"#d3d3d3"}},{text:convertCurrencyRealWithoutCoin(tableOperationsFII[year][t][3]),style:{color:"#7f7f7f",fillColor:"#d3d3d3"}},{text:convertCurrencyRealWithoutCoin(tableOperationsFII[year][t][4]),style:{color:"#7f7f7f",fillColor:"#d3d3d3"}},{text:convertCurrencyRealWithoutCoin(tableOperationsFII[year][t][5]),style:{color:"#7f7f7f",fillColor:"#d3d3d3"}},{text:convertCurrencyRealWithoutCoin(tableOperationsFII[year][t][6]),style:{color:"#7f7f7f",fillColor:"#d3d3d3"}}])}})),e}function renderLow20kMonth(){const e=[];if(!SUM_SWING_TRADE_FREE.hasOwnProperty(year))return[{}];SUM_SWING_TRADE_FREE.hasOwnProperty(year)&&e.push(["20",SUM_SWING_TRADE_FREE.hasOwnProperty(year)?convertCurrencyReal(SUM_SWING_TRADE_FREE[year]):convertCurrencyReal(0)]);return[{text:"\n\nVendas abaixo de R$20.000,00 no mês",style:"title"},{style:"table",table:{widths:[30,"*"],body:[composeHeaderTable(["Tipo","Valor"]),...e]}}]}function renderCriptoLow35kMonth(){const e=composeTableOperationsCriptos(operationsFull);_.map(e,((e,t)=>{const o=[];_.map(e,(e=>{e.hasOwnProperty("totalCommon")&&o.push(e.totalCommon)})),SUM_SWING_TRADE_CRIPTO_FREE[t]=_.sumBy(o)}));const t=[];if(!SUM_SWING_TRADE_CRIPTO_FREE.hasOwnProperty(year))return[{}];if(SUM_SWING_TRADE_CRIPTO_FREE.hasOwnProperty(year)&&t.push(["05",SUM_SWING_TRADE_CRIPTO_FREE.hasOwnProperty(year)?convertCurrencyReal(SUM_SWING_TRADE_CRIPTO_FREE[year]):convertCurrencyReal(0)]),0===SUM_SWING_TRADE_CRIPTO_FREE[year])return[{}];return[{text:"\n\nVendas em criptoativos abaixo de R$35.000,00 no mês",style:"title"},{style:"table",table:{widths:[30,"*"],body:[composeHeaderTable(["Tipo","Valor"]),...t]}}]}function renderRendimentsJCP(){if(!provents.rendimentsJCP.length)return[{}];return[{text:"\n\nRendimentos sobre JCP",style:"title"},{style:"table",table:{widths:[30,"*","*","*","*"],body:[composeHeaderTable(["Tipo","CNPJ","Nome da fonte pagadora","Descrição","Valor"]),...provents.rendimentsJCP]}}]}function renderBonifications(){if(!Object.keys(bonifications).length)return[{}];const e=[];_.map(bonifications,((t,o)=>{e.push(["18",t.cnpj,t.name,convertCurrencyReal(t.amount)])}));return[{text:"Bonificações",style:"title"},{style:"table",table:{widths:[30,"*",200,"*"],body:[composeHeaderTable(["Tipo","CNPJ","Nome da fonte pagadora","Valor"]),...e]},pageBreak:"after"}]}function renderDividends(){if(!provents.dividends.length)return[{}];return[{text:"Dividendos",style:"title"},{style:"table",table:{widths:[30,"*",200,"*"],body:[composeHeaderTable(["Tipo","CNPJ","Nome da fonte pagadora","Valor"]),...provents.dividends]},pageBreak:"after"}]}function renderJCPs(){if(!provents.jcp.length)return[{}];return[{text:"Rendimentos sujeitos a tributação exclusiva (Proventos tributados como JCP)",style:"title",pageBreak:"before"},{text:["\n\nEsta seção irá lhe demonstrar quais ",{text:"rendimentos tiveram tributação",style:"negrito"}," retida na fonte durante e o ano, não será necessário pagar imposto adicional sobre eles, mas precisará declará-los na seção de mesmo nome."]},{text:"\nItens contemplados no relatório:",ul:["Juros sobre capital","Outros proventos tributados"]},{text:"\nLocal e exemplo de preenchimento:\n",style:"subheader"},{image:"print5",width:505},{text:["\n\nPara cada linha da tabela abaixo efetue um lançamento através do botão ",{text:"'Novo'",style:"negrito"},", preencha os dados da tabela e confirme em ",{text:"'OK'",style:"negrito"}]},{text:"\nJCP (juros sobre capital próprio - valor líquido)",style:"title"},{style:"table",table:{widths:[30,"*","*","*"],body:[composeHeaderTable(["Tipo","CNPJ","Nome da fonte pagadora","Valor"]),...provents.jcp]}}]}function renderCommonsOperations(e){const t={text:"Renda variável (Vendas de ativos no Brasil com DARF ou no prejuízo)",style:"title",pageBreak:"before"},o={text:"\nEsta seção irá lhe demonstrar quais resultados obteve na bolsa do brasil e como deverá declarar os lucros, prejuízos e IR já pago."},a={text:"\nOperações Comuns / Day-Trade",style:"title"},n={text:["\nAs operações de venda envolvendo ações, opções, futuros, ETF e BDR serão declaradas nessa seção e de forma mensal.Somente constam nessa seção suas vendas que foram",{text:" tributadas",style:"negrito"}," fora da isenção. Para vendas isentas, faça o lançamento na seção Rendimentos Isentos conforme mencionado acima. Abaixo descrevemos todos os lançamentos que deverá fazer com base na apuração realizada na planilha de investimentos.",`\n\nOperações com fundos imobiliários não entram nesta seção, caso vendeu FIIs durante o ano de ${year}, iremos demonstrar na seção "Operações Fundos Investimento Imobiliário"\n\n`]},r={image:"print6",width:505},s=composeTableCommonOperationAndDayTrade(operationsFull);let i={};_.map(s,((e,t)=>_.map(e,((e,o)=>{Object.keys(e).length>0&&(i.hasOwnProperty(t)?i[t].push(o):i[t]=[o])}))));const l=[];_.map(s[year],((e,t)=>{const o=composeCommonOperationAndDayTrade(e,year,t,operationsFull,i[year],s);o&&(l.push(o.title),l.push(o.content1),l.push(o.content2),l.push(o.content3))})),l.length&&(e.content.push(t),e.content.push(o),e.content.push(a),e.content.push(n),e.content.push(r),e.content=[...e.content,...l])}function renderOperationsFII(e){_.map(operationsFull,((e,t)=>_.map(e,((e,o)=>{const a=composeOperationsFII(operationsFull[t][o],t,o);a&&(operationsFII.hasOwnProperty(t)?operationsFII[t][o]=a:operationsFII[t]={[o]:a})})))),operationsFII.hasOwnProperty(year)||(operationsFII[year]={1:0}),_.map(operationsFII,((e,t)=>_.map([1,2,3,4,5,6,7,8,9,10,11,12],(e=>{if(1===e)if(tableOperationsFII.hasOwnProperty(t))if(tableOperationsFII[t].hasOwnProperty(e)){const o=Number(t)===Number(_firstYear)?0:tableOperationsFII[t-1][12][2]>0?-1*tableOperationsFII[t-1][12][2]:0;tableOperationsFII[t][e]=[MONTHS_LABEL[e].slice(0,3),getNode(operationsFII[t],e),o,0,0,"20%",0]}else tableOperationsFII[t]={[e]:[MONTHS_LABEL[e].slice(0,3),getNode(operationsFII[t],e),tableOperationsFII[t-1][12][2]>0?-1*tableOperationsFII[t-1][12][2]:0,0,0,"20%",0]};else tableOperationsFII[t]={[e]:[MONTHS_LABEL[e].slice(0,3),getNode(operationsFII[t],e),tableOperationsFII.hasOwnProperty(t-1)&&tableOperationsFII[t-1][12][2]>0?tableOperationsFII[t-1][12][2]:0,0,0,"20%",0]};else tableOperationsFII[t][e]=[MONTHS_LABEL[e].slice(0,3),getNode(operationsFII[t],e),subtractionLosses(tableOperationsFII[t][e-1][1],tableOperationsFII[t][e-1][2]),0,0,"20%",0]}))));const t={style:"tableOperation",table:{widths:[30,"*","*","*","*","*","*"],body:[composeHeaderTable(["Mês","Resultado líquido do mês","Resultado negativo até o mês anterior","Base de cálculo do imposto","Prejuízo a compensar","Alíquota do imposto","Imposto a pagar"]),...composeTableOperationsFII()]}};e.content.push({pageBreak:"before",text:"Operações Fundos de Investimentos Imobiliários (FII e FIAGROS)\n\n",style:"title"}),e.content.push({text:["As operações de venda envolvendo ",{text:"fundos imobiliários",style:{"text-decorator":"underline",bold:!0}}," serão declaradas nessa seção e de forma mensal. Toda venda de fundo imobiliário é tributada, abaixo poderá verificar seus ganhos/prejuízos apurados de acordo com seus lançamentos.\n\n"]}),e.content.push({image:"print7",width:505}),e.content.push({text:"\n"}),e.content.push(t)}function renderRendimentsIsentos(){if(!provents.rendiments.length&&!SUM_SWING_TRADE_FREE_99.hasOwnProperty(year))return[{}];const e=[];SUM_SWING_TRADE_FREE_99.hasOwnProperty(year)&&_.map(SUM_SWING_TRADE_FREE_99[year],(t=>{e.push(["99",t.document_number_principal,t.name,`Ganho de capital na venda de ${t.ticker} - (Administradora: ${t.document_number_admin?t.document_number_admin:t.document_number_principal})`,convertCurrencyReal(t.amountValues||0)])}));const t=[...provents.rendiments,...e];return[{text:"Rendimentos de (FII, FIAGRO e FI-INFRA)",style:"title"},{style:"table",table:{widths:[20,"*",100,"*","*"],body:[composeHeaderTable(["Tipo","CNPJ","Nome da fonte pagadora","Descrição","Valor"]),...t]}}]}function renderRendimentsPrint(){if(!provents.dividends.length&&!provents.rendiments.length&&!SUM_SWING_TRADE_FREE_99.hasOwnProperty(year))return[{}];return[{text:"Rendimentos isentos e não tributáveis (Vendas abaixo de 20mil, ativos isentos e dividendos)\n\n",style:"title",pageBreak:"before"},{text:[{text:"Esta seção irá lhe demonstrar quais rendimentos teve durante e o ano e foram "},{text:"isentos de imposto de renda",style:{"text-transform":"underline"}},{text:", seja por benefício fiscal ou limite de isenção.\n\n"}]},{text:"Itens contemplados no relatório:\n",ul:["Vendas mensais de ações abaixo de 20 mil reais (Brasil)","Dividendos de ações","Rendimentos de (FII, FIAGRO e FI-INFRA)","Vendas de ativos com benefício fiscal\n\n"]},{text:"Local e exemplo de preenchimento:\n",style:"subheader"},{image:"print4",width:505},{pageBreak:"before",text:["Para cada linha da tabela abaixo efetue um lançamento através do botão ",{text:"'Novo'",style:"negrito"},", preencha os dados da tabela e confirme em ",{text:"'OK'\n\n",style:"negrito"}]}]}