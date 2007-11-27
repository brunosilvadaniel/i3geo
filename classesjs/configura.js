/*
Title: Configura��o da interface.

Defini��o das vari�veis de configura��o da interface.

O I3Geo utiliza vari�veis (veja o item espec�fico na documenta��o) globais que possibilitam alterar algumas das caracter�sticas da interface.
Essas vari�veis recebem valores default quando o I3Geo � iniciado mas podem ser alterados antes da inicializa��o do mapa (m�todo inicializa()).
No arquivo aplicmapa/geral.htm existem exemplos de como fazer isso.
As vari�veis globais podem tamb�m ser alteradas em tempo de execu��o.

Exemplo:

g_janelaMen = "nao"

objmapa = new Mapa()

objmapa.inicializa()

File: configura.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
/*
Variable: g_traducao

Termos utilizados na interface conforme a linguagem
*/
g_traducao = {
	//texto da janela de mensagens
	"p1": [
	{
		pt:"O I3Geo &eacute; software livre! Para download clique <a href='http://mapas.mma.gov.br/download' target=blanck >aqui</a>",
		en:"I3geo is a open source software. <a href='http://mapas.mma.gov.br/download' target=blanck >Click</a> to download."
	}],
	//lista de propriedades do mapa
	"p2": [
	{
		pt:"Tipo de imagem",
		en:"Image type"
	}],
	"p3": [
	{
		pt: "Legenda",
		en: "Legend"
	}],
	"p4": [
	{
		pt:"Escala",
		en:"Scale"
	}],
	"p5": [
	{
		pt: "Tamanho",
		en:"Size"
	}],
	"p6": [
	{
		pt: "Ativa/desativa entorno",
		en:"Activate/Disable surrounding"
	}],
	"p7": [
	{
		pt: "Ativa/desativa logo",
		en:"Activate/Disable logo"
	}],
	"p8": [
	{
		pt: "Cor da selecao",
		en:"Selection color"
	}],
	"p9": [
	{
		pt: "Cor do fundo",
		en:"Background color"
	}],
	"p10": [
	{
		pt: "Grade de coordenadas",
		en:"Graticule"
	}],
	"p11": [
	{
		pt: "Template",
		en:"Template"
	}],
	"p12": [
	{
		pt: "Temporizador",
		en:"Timer"
	}],
	"p13": [
	{
		pt: "Propriedades do mapa",
		en:"Map properties"
	}],
	//itens do menu suspenso
	"s1": [
	{
		pt: "&nbsp;Ajuda?",
		en:"&nbsp;Help"
	}],
	"s2": [
	{
		pt: "&nbsp;An&aacute;lise",
		en:"&nbsp;Analysis"
	}],
	"s3": [
	{
		pt: "&nbsp;Janelas",
		en:"&nbsp;Windows"
	}],
	"s4": [
	{
		pt: "&nbsp;Arquivo",
		en:"&nbsp;Files"
	}],
	"s5": [
	{
		pt: "&nbsp;Propriedades",
		en:"&nbsp;Properties"
	}],
	//submenus
	"u1": [
	{
		pt: "Sobre o I3Geo",
		en:"About"
	}],
	"u2": [
	{
		pt: "Sistema",
		en:"System"
	}],
	"u3": [
	{
		pt: "WikiBook",
		en:"WikiBook"
	}],
	"u4": [
	{
		pt: "Tutoriais",
		en:"Tutorials"
	}],
	"u5": [
	{
		pt: "Blog",
		en:"Blog"
	}],
	"u6": [
	{
		pt: "Geometrias",
		en:"Geometries"
	}],
	"u7": [
	{
		pt: "Grade de poligonos",
		en:"Polygon grid"
	}],
	"u8": [
	{
		pt: "Grade de pontos",
		en:"Point grid"
	}],
	"u9": [
	{
		pt: "Grade de hex&aacute;gonos",
		en:"Hexagonal grid"
	}],
	"u10": [
	{
		pt: "Entorno(Buffer)",
		en:"Buffer"
	}],
	"u11": [
	{
		pt: "Centr&oacute;ide",
		en:"Centroid"
	}],
	"u12": [
	{
		pt: "N pontos em poligono",
		en:"N point in polygon"
	}],
	"u13": [
	{
		pt: "Ponto em poligono/raster",
		en:"Point in polygon/raster"
	}],
	"u14": [
	{
		pt: "Distribui&ccedil;&atilde;o de pontos",
		en:"Point distribuition"
	}],
	"u15": [
	{
		pt: "Barras de ferramentas",
		en:"Tools"
	}],
	"u16": [
	{
		pt: "Janela de mensagens",
		en:"Message window"
	}],     
	"u17": [
	{
		pt: "Salvar mapa",
		en:"Save map"
	}],
	"u18": [
	{
		pt: "Carregar mapa",
		en:"Load map"
	}],
	"u19": [
	{
		pt: "Pegar imagens",
		en:"Take pictures"
	}],
	"u20": [
	{
		pt: "Converter em WMS",
		en:"Convert to WMS"
	}],
	"u21": [
	{
		pt: "Gerador de links",
		en:"Link generator"
	}],
	//arvore com a lista de temas
	"t1": [
	{
		pt: "Camadas",
		en:"Layers"
	}],
	"t2":[
	{
		pt:"arraste o tema aqui para excluir",
		en:"Drag the theme here to exclude"
	}],
	"t3":[
	{
		pt:"Clique para ligar ou desligar esse tema, mostrando-o ou n&atilde;o no mapa. Ap&oacute;s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot&atilde;o aplicar que ser&aacute; mostrado.",
		en:"Click to connect or disconnect the subject, showing it or not on the map. After changing the status of the topic, wait a few moments to be redesigned the map, or click the button to apply that will be shown."
	}],
	"t4":[
	{
		pt:"limpa sele&ccedil;&atilde;o",
		en:"Clear the selection"
	}],
	"t5":[
	{
		pt:"Limpa sele&ccedil;&atilde;o existente nesse tema",
		en:"Clear the selection"
	}],
	"t6":[
	{
		pt:"Clique para fazer o download desse tema no formato shapefile",
		en:"Download in shapefile format"
	}],
	"t7":[
	{
		pt:"clique e arraste",
		en:"click and drag"
	}],
	"t8":[
	{
		pt:"arraste para mudar a ordem",
		en:"drag to change the draw order"
	}],

	
	"t9":[
	{
		pt:"A escala do tema &eacute; compat&iacute;vel com a escala do mapa",
		en:"The scale of the issue is compatible with the scale of the map"
	}],
	"t10":[
	{
		pt:"A escala do tema &eacute incompat&iacute;vel com a escala do mapa",
		en:"The scale of the issue is incompatible with the scale of the map"
	}],	
	"t11":[
	{
		pt:"A escala do tema n&atilde;o &eacute conhecida",
		en:"The scale of the issue is not known"
	}],
	"t12":[
	{
		pt:"excluir",
		en:"delete"
	}],
	"t12a":[
	{
		pt:"Clique para excluir esse tema do mapa.",
		en:"Click to exclude the subject of the map."
	}],
	"t13":[
	{
		pt:"sobe",
		en:"up"
	}],
	"t14":[
	{
		pt:"Clique para subir esse tema na ordem de desenho",
		en:"Click to raise this issue in order to design"
	}],
	"t15":[
	{
		pt:"desce",
		en:"down"
	}],
	"t16":[
	{
		pt:"Clique para descer esse tema na ordem de desenho",
		en:"Click to fall this subject in the order of drawing"
	}],
	"t17":[
	{
		pt:"zoom para o tema",
		en:"zoom to the layer"
	}],
	"t18":[
	{
		pt:"Clique para ajustar o mapa de forma a mostrar todo o tema",
		en:"Click to adjust the map in order to show the whole issue"
	}],
	"t18a":[
	{
		pt:"Op&ccedil;&otilde;es",
		en:"Options"
	}],
	"t18b":[
	{
		pt:"Legenda",
		en:"Legend"
	}],
	"t19":[
	{
		pt:"Altera a transpar�ncia do tema, possibilitando que as camadas inferiores possam ser vistas.",
		en:"Amends the transparency of the subject so that the layers can be seen below."
	}],
	"t20":[
	{
		pt:"opacidade:",
		en:"opacity"
	}],
	"t21a":[
	{
		pt:"Muda o nome atual do tema, utilize para melhorar a leganda do mapa.",
		en:"Change the name"
	}],
	"t21":[
	{
		pt:"novo nome:",
		en:"new name"
	}],
	"t22":[
	{
		pt:"Localize elementos no tema com base em seus atributos descritivos.",
		en:"Locate evidence on the issue based on their attributes descriptive."
	}],
	"t23":[
	{
		pt:"procurar...",
		en:"locate..."
	}],
	"t24":[
	{
		pt:"Crie uma nova camada no mapa para apresentar textos descritivos sobre esse tema, tendo como base a tabela de atributos.",
		en:"Create a new layer on the map to display descriptive texts on the subject, drawing upon the table of attributes."
	}],
	"t25":[
	{
		pt:"texto...",
		en:"text..."
	}],
	"t26":[
	{
		pt:"Defina as etiquetas que ser�o mostradas quando o mouse � estacionado sobre um elemento desse tema.",
		en:"Set the labels that will be shown when the mouse is parked on an element of that theme."
	}],
	"t27":[
	{
		pt:"etiquetas...",
		en:"labels..."
	}],
	"t28":[
	{
		pt:"Insira um filtro nesse tema para mostrar apenas determinadas informa��es, com base na tabela de atributos.",
		en:"Enter a topic that filter to show only certain information, based on the table of attributes."
	}],
	"t29":[
	{
		pt:"filtro...",
		en:"filter..."
	}],
	"t30":[
	{
		pt:"Veja a tabela de atributos relacionada a esse tema.",
		en:"See the table of attributes related to that theme."
	}],
	"t31":[
	{
		pt:"tabela...",
		en:"table..."
	}],
	"t32":[
	{
		pt:"Abre o editor de legenda, permitindo a altera��o da forma de representa��o desse tema.",
		en:"Opens the editor of legend, allowing the modification of the form of representation of this theme."
	}],
	"t33":[
	{
		pt:"editar legenda...",
		en:"legend edit..."
	}],
	"t34":[
	{
		pt:"Mostra os dados desse tema em uma janela que acompanha o mouse.",
		en:"The data shows that theme in a window that tracks the mouse."
	}],
	"t35":[
	{
		pt:"mostra em janela...",
		en:"show in window"
	}],
	//guia adiciona
	"a1":[
	{
		pt:"procurar:",
		en:"search:"
	}],
	"a2":[
	{
		pt:"Upload de arquivo local",
		en:"Upload local file"
	}],
	"a3":[
	{
		pt:"Download de dados",
		en:"Data download"
	}],
	"a4":[
	{
		pt:"Conectar com servidor WMS",
		en:"WMS server connection"
	}],
	"a5":[
	{
		pt:"Conectar com GeoRss",
		en:"GeoRss connection"
	}],
	"a6":[
	{
		pt:"Acesso aos arquivos do servidor",
		en:"Access files in server directory"
	}],
	"a7":[
	{
		pt:"Temas",
		en:"Layers"
	}],
	"a8":[
	{
		pt:"Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.",
		en:"Click to connect or disconnect the subject, showing it or not on the map. After changing the status of the topic, wait a few moments to be redesigned the map, or click the button to apply that will be shown."
	}],
	"a9":[
	{
		pt:"fonte",
		en:"font"
	}],
	"a10":[
	{
		pt:"c&oacute;digo:",
		en:"code"
	}],
	"a11":[
	{
		pt:"Sistemas",
		en:"Systems"
	}],
	"a12":[
	{
		pt:"Abrir sistema",
		en:"System open"
	}],
	//guias principais
	"g1":[
	{
		pt:"Temas",
		en:"Themes"
	}],
	"g2":[
	{
		pt:"Adiciona",
		en:"Add"
	}],
	"g3":[
	{
		pt:"Legenda",
		en:"Legend"
	}],
	"g4":[
	{
		pt:"Mapas",
		en:"Maps"
	}],	
	//outros
	"o1":[
	{
		pt:"Aguarde...",
		en:"Wait..."
	}],
	"o2":[
	{
		pt:"busca r&aacute;pida...",
		en:"quick search..."
	}],
	"o3":[
	{
		pt:"Lendo imagem...",
		en:"Loading images..."
	}],
	"o4":[
	{
		pt:"Aguarde...abrindo lente",
		en:"Wait...Opening lens..."
	}],
	"o5":[
	{
		pt:"Aguarde...iniciando",
		en:"Wait...initializing"
	}]
};
/*
Variable: g_linguagem

L�ngua utilizada na interface.

*/
g_linguagem = "pt";
var temp = pCookie("i3geolingua");
if(temp != undefined)
{g_linguagem = temp;}
/*
Variable: g_posicaoLenteX

Posicionamento da lente de aumento em x.

*/
g_posicaoLenteX = 0;
/*
Variable: g_posicaoLenteY

Posicionamento da lente de aumento em y.

*/
g_posicaoLenteY = 0;
/*
Variable: g_autoRedesenho

Ativa o auto redesenho ap�s um determinado tempo.

Ap�s decorrido o tempo definido, o mapa � redesenhado. Se for 0 o temporizador n�o � ativado.
*/
g_autoRedesenho = 0;
/*
Variable: g_embedLegenda

Indica se a legenda deve ser incluida no corpo do mapa.

Values:

sim|nao

*/
g_embedLegenda = "nao";
/*
Variable: g_3dmap

Vari�vel que define o nome do map_file que possu� o layer para uso na fun��o 3d.
Pode ser caminho completo. Se n�o, busca no aplicmap.

*/
g_3dmap = "";
/*
Variable: g_opcoesTemas

Vari�vel que define se as opcoes adicionais de cada tema serao mostradas. As op��es s�o aquelas apresentadas na lista de temas do mapa quando um tema � expandido.

Values:

sim|nao

*/
g_opcoesTemas = "sim";
/*
Variable: g_mostraRosa

Vari�vel que define se a rosa dos ventos deve ser mostrada junto ao mouse. A rosa dos ventos permite a navega��o pelo mapa sem a necessidade de alterar a op��o atual. Por exemplo, pode-se navegar pelo mapa mesmo estando na op��o de identifica��o.

O aparecimento da rosa � temporizada.

Values:

sim|nao
*/
g_mostraRosa = "sim";
/*
Variable: g_visual

Indica qual o tipo de visual para abertura do mapa.

Os visuais dispon�veis s�o obtidos do diret�rio i3geo/imagens/visual na inicializa��o do i3geo.
*/
g_visual = "default";

/*
Variable: g_janelaMen

Define se a janela de mensagens come�ar� aberta.

Values:

siim|nao
*/
g_janelaMen = "sim";
/*
Variable: g_downloadbase

Define se na guia 2 ser� mostrada a op��o de download dos dados.

Values:

sim|nao
*/
g_downloadbase = "sim";
/*
Variable: g_conectargeorss

Define se na guia 2 ser� mostrada a op��o de conex�o com GeoRSS.

Values:

sim|nao
*/
g_conectargeorss = "sim";
/*
Variable: g_uploadlocal

Vari�vel que define se na guia 2 ser� mostrada a op��o de upload.

Values:

sim|nao
*/
g_uploadlocal = "sim";
/*
Variable: g_conectarwms

Vari�vel que define se na guia 2 ser� mostrada a op��o de conex�o com WMS.

Values:

sim|nao
*/
g_conectarwms = "sim";
/*
Variable: g_docaguias

Vari�vel que define se o mapa deve iniciar com as guias em janela ou n�o. As guias em janela causam o desenho de um mapa com tamanho extendido.

Values:

sim|nao
*/
g_docaguias = "nao";
/*
Variable: g_barraFerramentas1

Define se a barra de ferramentas 1 ser� aberta ou n�o no mapa.

Values:

sim|nao
*/
g_barraFerramentas1 = "sim";
/*
Variable: g_barraFerramentas2

Define se a barra de ferramentas 2 ser� aberta ou n�o no mapa.

Values:

sim|nao
*/
g_barraFerramentas2 = "sim";
/*
Variable: g_fatordezoom

Vari�vel interna para a barra de zoom.

*/
g_fatordezoom = 0;
/*
Variable: g_diminuixM

Diminui a largura do mapa em pixels no caso do navegador ser o IE.

*/
g_diminuixM = 20;
/*
Variable: g_diminuixN

Diminui a largura do mapa em pixels no caso do navegador ser o FF.

*/
g_diminuixN = 25;
/*
Variable: g_diminuiyM

Diminui a altura do mapa em pixels no caso do navegador ser o IE.

*/
g_diminuiyM = 106;
/*
Variable: g_diminuiyN

Diminui a altura do mapa em pixels no caso do navegador ser o FF.

*/
g_diminuiyN = 103;
/*
Variable: g_mapaRefDisplay

Indica a visibilidade do mapa de refer�ncia na inicializa��o

Values:

block|none

*/
g_mapaRefDisplay = "block";
/*
Variable: g_funcaoTip

Fun��o ajax que ser� executada para mostrar informa��es do tipo TIP.

A fun��o � executada pelo CPAINT e avaliada com "eval".

Por padr�o a fun��o � a verificaTipDefault
*/
g_funcaoTip = "verificaTipDefault()";
/*
Variable: g_tempotip

Tempo utilizado para verificar se o mouse est� parado.

Se o mouse estiver parado, a fun��o de mostrar tip � ativada.
*/
g_tempotip = 4500;
/*
Variable: g_tipotip

Define como o tip ser� mostrado.

Values:

simples|completo
*/
g_tipotip = "completo";
/*
Variable: g_tipoimagem

Indica o tipo de filtro de imagem que est� ativo. O filtro ativo � aplicado sobre a imagem toda a vez que o mapa � refeito.
*/
g_tipoimagem = "nenhum";
/*
Variable: g_sistemas

Nome do arquivo xml com a lista de sistemas que ser�o mostrados na guia de adi��o de temas.
O valor dessa vari�vel � definido no arquivo "ms_configura.php" e � preenchida utilizando o ajax.
*/
g_sistemas = "";
/*
Variable: destacaTamanho

Valor em pixel do ret�ngulo de destaque de temas.
*/
destacaTamanho = 75;
/*
Variable: g_mensagempadrao

Mensagem padr�o que ser� mostrada na janela de mensagens.
*/
g_mensagempadrao = $trad("p1");//"O I3Geo &eacute; software livre! Para download clique <a href='http://mapas.mma.gov.br/download' target=blanck >aqui</a>";
/*
Variable: g_entorno

Indica se o preenchimento do entorno do mapa est� ou n�o ativo.
Utilizado para criar o efeito de auto-preenchimento do mapa quando � executada a fun��o pan.
� alterada em uma op��o espec�fica no menu suspenso.

Values:

sim|nao
*/
g_entorno = "nao";
/*
Variable: g_guiaativa

Indica qual guia do mapa iniciar� ativa.
*/
g_guiaativa = "guia1";
/*
Variable: g_funcoesClickMapaDefault

Nome das fun��es padr�o que ser�o executadas quando o usu�rio clicar no mapa.

As fun��es padr�o podem ser alteradas, por�m, pode-se acrescentar outras fun��es, al�m das padr�o, utilizando-se o objeto objmapa.funcoesClickMapa

Quando o usu�rio clica em um bot�o para ativar uma ferramenta, pode-se definir a vari�vel g_tipoacao e depois critic�-la na fun��o para saber qual opera��o deve ser executada.
*/
g_funcoesClickMapaDefault = new Array(
	"cliqueIdentifica()",
	"cliqueInserexy()",
	"cliqueInseregrafico()",
	"cliqueInseretoponimo()",
	"cliqueSelecao()",
	"cliqueMede()",
	"cliqueSelecaoPoli()",
	"cliqueCapturaPt()"
);
/*
Variable: g_funcoesMousemoveMapaDefault

Nome das fun��es padr�o que ser�o executadas quando o usu�rio mover o mouse sobre o mapa.

As fun��es padr�o podem ser alteradas, por�m, pode-se acrescentar outras fun��es

Quando o usu�rio clica em um bot�o para ativar uma ferramenta, pode-se definir a vari�vel g_tipoacao e depois critic�-la na fun��o para saber qual opera��o deve ser executada.
*/
g_funcoesMousemoveMapaDefault = new Array(
	"movecursor()",
	"movePan()",
	"moveMede()",
	"movelentef()",
	"moveLonglat()",
	"moveSelecaoPoli()"
);

/*
Variable: g_listaPropriedades

Objeo com as fun��es que s�o incluidas no item propriedades do mapa

Parameters:

text - texto que ser� mostrado na tela

url - fun��o que ser� executada
*/
g_listaPropriedades = {
	"propriedades": [
	{ text: "p2", url: "javascript:tipoimagem()" },
	{ text: "p3", url: "javascript:opcoesLegenda()" },
	{ text: "p4", url: "javascript:opcoesEscala()" },
	{ text: "p5", url: "javascript:tamanho()" },
	{ text: "p6", url: "javascript:ativaEntorno()" },
	{ text: "p7", url: "javascript:ativaLogo()" },
	{ text: "p8", url: "javascript:queryMap()" },
	{ text: "p9", url: "javascript:corFundo()" },
	{ text: "p10", url: "javascript:gradeCoord()" },
	{ text: "p11", url: "javascript:template()" },
	{ text: "p12", url: "javascript:autoredesenha()" }
]};
/*
Variable: oMenuData

Itens inclu�dos no menu suspenso


Parameters:

text - texto que ser�mostrado na tela

url - fun��o que ser� executada
*/
oMenuData = {
	"ajudas": [ 
	{ text: $trad("u1"), url: "javascript:g_hlpt = 'sobrei3geo';ajudaf('abre')" },
	{ text: $trad("u2"), url: "javascript:abreDoc()" },
	{ text: $trad("u3"), url: "http://pt.wikibooks.org/wiki/I3geo" },
	{ text: $trad("u4"), url: "http://mapas.mma.gov.br/wikibooki3geo" },
	{ text: $trad("u5"), url: "http://sistemas.mma.gov.br/blogs/index.php?blog=6" }
	],
	"analise": [
	{ text: $trad("u6"), url: "javascript:analisaGeometrias()" },
	{ text: $trad("u7"), url: "javascript:gradePol()" },
	{ text: $trad("u8"), url: "javascript:gradePontos()" },
	{ text: $trad("u9"), url: "javascript:gradeHex()" },
	{ text: $trad("u10"), url: "javascript:buffer()" },
	{ text: $trad("u11"), url: "javascript:centroide()" },
	{ text: $trad("u12"), url: "javascript:nptPol()" },
	{ text: $trad("u13"), url: "javascript:pontoempoligono()" },
	{ text: $trad("u14"), url: "javascript:pontosdistri()" }
	]
};
oMenuData.janelas = [
	{ text: $trad("u15"), url: "javascript:initJanelaZoom('1');initJanelaZoom('2')" },
	{ text: $trad("u16"), url: "javascript:initJanelaMen()" }        
	];
oMenuData.arquivo = [
	{ text: $trad("u17"), url: "javascript:salvaMapa()" },
	{ text: $trad("u18"), url: "javascript:carregaMapa()" },
	{ text: $trad("u19"), url: "javascript:pegaimagens()" },
	{ text: $trad("u20"), url: "javascript:convertews()" },
	{ text: $trad("u21"), url: "../geradordelinks.htm" }
	];
/*
Variable: g_listaFuncoesBotoes

Objeto com a lista de funcionalidades que ser�o adicionadas ao mapa.

Essa lista pode ser modificada antes da inicializa��o do mapa.

A montagem das opera��es � feita no iniciamma.js.

As funcionalidades apenas s�o inclu�das se o elemento HTML indicado em iddiv existir. Por isso, caso uma fun��o n�o seja desejada, basta excluir o div do HTML utilizado no mapa.

Parameters:

iddiv - id do elemento onde a ferramenta ser� inclu�da

dica - dica de tela que ser� acrescentada ao evento onmouseover

conteudo - conteudo de iddiv que ser� acrescentado como innerHTML

funcaoonclick - funcao que ser� incluida no onclick

constroiconteudo - fun��o que ativar� a op��o. Essa op��o atua como a op��o conte�do, por�m, executa uma fun��o para preenchimento do div.

*/
g_listaFuncoesBotoes = {
	"botoes": [
	{
		//Insere a op��o de localiza��o de coordenadas.
		iddiv:"localizarxy",
		dica:"Digite as coordenadas de um ponto (X=longitude e Y=latitude) para localiz&acute;-lo no mapa. O centro do mapa ser&acute; deslocado para o ponto digitado.",
		conteudo:"localiza X:<input class=digitar id='xg' title='grau' type=text size=5 value='-00'/>&nbsp;<input class=digitar id='xm' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='xs' title='segundo' type=text size=5 value='00.00'/>&nbsp;&nbsp;Y:<input class=digitar id='yg' title='grau' type=text size=3 value='-00'/>&nbsp;<input class=digitar id='ym' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='ys' title='segundo' type=text size=5 value='00.00'/><img  title='zoom' onclick='zoomPonto()' src=\"+$im(\"tic.png\")+\" id=procurarxy />"
	},
	{
		//Ativa o bot�o que realiza a opera��o de zoom para a extens�o total do mapa.
		iddiv:"zoomtot",
		dica:"Altera a escala do mapa ajustando-a para mostrar a mesma abrang&circ;ncia geogr&aacute;fica da inicializa&ccedil;&atilde;o.",
		funcaoonclick:function(){zoomtot();}
	},
	{
		//Ativa o bot�o que realiza a opera��o de zoom interativo.
		iddiv:"zoomli",
		dica:"Amplia o mapa - coloca o ponto clicado no centro da tela ou amplia a regi&atilde;o indicada por um ret&acirc;ngulo.Ap&oacute;s ativada, clique e arraste o mouse sobre o mapa na &aacute;rea de zoom desejada.",
		funcaoonclick:function()
		{mudaiconf('zoomli');g_operacao='navega';}
	},
	{
		//Ativa o bot�o que realiza a opera��o de deslocamento (pan).
		iddiv:"pan",
		dica:"Desloca a regi&atilde;o vis&iacute;vel no mapa. Ap&oacute;s ativada, clique e arraste o mouse sobre o mapa para deslocar a regi&atilde;o vis&iacute;vel.",
		funcaoonclick:function()
		{mudaiconf('pan');g_tipoacao='pan';g_operacao='navega';}
	},
	{
		//bot�o que realiza a opera��o de zoom in.
		iddiv:"zoomiauto",
		dica:"Amplia o mapa tendo como refer&ecirc;cia o centro atual.",
		funcaoonclick:function()
		{zoomiauto();}
	},
	{
		//bot�o que realiza a opera��o de zoom out
		iddiv:"zoomoauto",
		dica:"Reduz o mapa tendo como refer&ecirccia o centro atual.",
		funcaoonclick:function()
		{zoomoauto();}
	},
	{
		//bot�o que abre a fun��o de identifica��o.
		iddiv:"identifica",
		dica:"Mostra informa&ccedil;&otilde;es sobre um ponto no mapa. Ap&oacute;s ativada, pare o mouse por alguns instantes no ponto desejado ou clique sobre o mesmo.",
		funcaoonclick:function()
		{mudaiconf('identifica');g_operacao='identifica';}
	},
	{
		//bot�o que abre a janela com o valor da extens�o geogr�fica do mapa atual
		iddiv:"exten",
		dica:"Mostra a extens&atilde;o geogr&aacute;fica atual em coordenadas geogr&aacute;ficas",
		funcaoonclick:function()
		{mensagemf(objmapa.extent);}
	},
	{
		//bot�o que abre a janela com o mapa de refer�ncia
		iddiv:"referencia",
		dica:"Abre/fecha o mapa de refer&ecirc;ncia",
		funcaoonclick:function()
		{initJanelaRef();}
	},
	{
		//apresenta��o da escala num�rica
		iddiv:"escala",
		dica:"Digite o novo valor de escala e clique no bot&atilde;o aplicar para alterar a escala do mapa",
		conteudo:"1:<input class='digitar' type='text' onchange='javascript:aplicaescala()' id=escalanum size=19 value=''/><img src=\"+$im(\"tic.png\")+\" onclick='javascript:aplicaescala()' />"
	},
	{
		//bot�o de busca na wikipedia
		iddiv:"wiki",
		dica:"Busca dados na Wikipedia na abrang&ecirc;ncia atual do mapa. Fa&ccedil;a um zoom no mapa antes de abrir essa op&ccedil;&atilde;o. Regi&ocirc;es muito extensas podem tornar a busca muito demorada",
		funcaoonclick:function()
		{wiki();}
	},
	{
		//bot�o de impress�o
		iddiv:"imprimir",
		dica:"Imprime o mapa",
		funcaoonclick:function()
		{imprimir();}
	},
	{
		//bot�o de localiza��o do usu�rio pelo IP
		iddiv:"ondeestou",
		dica:"Localiza o IP do usu&aacute;rio no mapa",
		funcaoonclick:function()
		{zoomIP();}
	},
	{
		//abre a op��o de gera��o de um modelo virtual de eleva��o
		iddiv:"v3d",
		dica:"Gera arquivo para 3d",
		funcaoonclick:function()
		{wdocaf("400px","200px",g_locaplic+"/ferramentas/3d/index.htm","","","3d");}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no Google
		iddiv:"google",
		dica:"Abre o Google Maps, mostrando uma imagem de sat&eacute;lite da regi&atilde;o vista no mapa principal",
		funcaoonclick:function()
		{google();}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no site Scielo
		iddiv:"scielo",
		dica:"Pesquisa documentos na base de dados Scielo (dados preliminares)",
		funcaoonclick:function()
		{scielo();}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no site confluence
		iddiv:"confluence",
		dica:"Projeto Confluence. Pontos de intersec&ccedil;&atilde;o de coordenadas observadas em campo",
		funcaoonclick:function()
		{confluence();}
	},
	{
		//Ativa o bot�o que abre a lente de aumento
		iddiv:"lentei",
		dica:"Abre lente de amplia&ccedil;&atilde;o",
		funcaoonclick:function()
		{lenteDeAumento();}
	},
	{
		//Coloca as guias em uma janela m�vel
		iddiv:"encolheFerramentas",
		dica:"Coloca as guias em uma janela m&oacute;vel",
		funcaoonclick:function()
		{docaguias();}
	},
	{
		//bot�o de reinicializa��o do mapa que restaura as condi��es iniciais do mapa
		iddiv:"reinicia",
		dica:"Redesenha o mapa com as configura&ccedil;&ocirc;es iniciais.",
		funcaoonclick:function()
		{reiniciaMapa();}
	},
	{
		//bot�o de medi��o de dist�ncias
		iddiv:"mede",
		dica:"Mede a dist&acirc;ncia entre dois ou mais pontos clicados no mapa (menor dist&acirc;ncia). O c&aacute;lculo de dist&acirc;ncia &eacute; aproximado e sua precis&atilde;o depende da escala do mapa.",
		funcaoonclick:function()
		{mede();}
	},
	{
		//bot�o de digitaliza��o
		iddiv:"inserexy",
		dica:"Insere pontos no mapa em coordenadas geogr&aacute;ficas. Os pontos inclu&iacute;dos podem ser transformados em linhas ou pol&iacute;gonos. Os pontos s&atilde;o armazenados em um tema tempor&aacute;rio, podendo-se fazer o download do arquivo shapefile.",
		funcaoonclick:function()
		{inserexy();}
	},
	{
		//bot�o de inclus�o de gr�ficos
		iddiv:"inseregrafico",
		dica:"Insere um gr&aacute;fico no ponto clicado conforme os atributos existentes no tema escolhido. O tema deve possuir itens com valores num&eacute;ricos na tabela de atributos.",
		funcaoonclick:function()
		{inseregrafico();}
	},
	{
		//bot�o de sele��o
		iddiv:"selecao",
		dica:"Abre as ferramentas para sele&ccedil;&atilde;o de elementos de um tema. Os elementos selecionados podem ser utilizados em outras opera&ccedil;&ocirc;es, como buffer e sele&ccedil;&atilde;o por tema.",
		funcaoonclick:function()
		{selecao();}
	},
	{
		//bot�o de inser��o de topon�mia
		iddiv:"textofid",
		dica:"Insere texto no mapa clicando em um ponto. Utilize essa op&ccedil;&atilde;o para adicionar informa&ccedil;&ocirc;es ao mapa.",
		funcaoonclick:function()
		{textofid();}
	},
	{
		//op��es de altera��o do visual do mapa
		iddiv:"visual",
		dica:"Escolha o visual para os bot�es e outras caracter&iacute;sticas visuais do mapa",
		funcaoonclick:"",
		constroiconteudo:'visual("visual")'
	},
	{
		//monta o menu suspenso
		iddiv:"menus",
		constroiconteudo:'montaMenuSuspenso("menus")'
	},
	{
		//ativa as op��es de busca r�pida
		iddiv:"buscaRapida",
		constroiconteudo:'ativaBuscaRapida("buscaRapida")'
	}
]};
