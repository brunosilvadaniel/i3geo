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
g_mensagempadrao = "O I3Geo &eacute; software livre! Para download clique <a href='http://mapas.mma.gov.br/download' target=blanck >aqui</a>";
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
	"cliqueMede()"
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
	{ text: "Tipo de imagem", url: "javascript:tipoimagem()" },
	{ text: "Legenda", url: "javascript:opcoesLegenda()" },
	{ text: "Escala", url: "javascript:opcoesEscala()" },
	{ text: "Tamanho", url: "javascript:tamanho()" },
	{ text: "Ativa/desativa entorno", url: "javascript:ativaEntorno()" },
	{ text: "Ativa/desativa logo", url: "javascript:ativaLogo()" },
	{ text: "Cor da selecao", url: "javascript:queryMap()" },
	{ text: "Cor do fundo", url: "javascript:corFundo()" },
	{ text: "Grade de coordenadas", url: "javascript:gradeCoord()" },
	{ text: "Template", url: "javascript:template()" },
	{ text: "Temporizador", url: "javascript:autoredesenha()" }
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
	{ text: "Sobre o I3Geo", url: "javascript:g_hlpt = 'sobrei3geo';ajudaf('abre')" },
	{ text: "Sistema", url: "javascript:abreDoc()" },
	{ text: "WikiBook", url: "http://pt.wikibooks.org/wiki/I3geo" },
	{ text: "Tutoriais", url: "http://mapas.mma.gov.br/wikibooki3geo" },
	{ text: "Blog", url: "http://sistemas.mma.gov.br/blogs/index.php?blog=6" },
	],
	"analise": [
	{ text: "Geometrias", url: "javascript:analisaGeometrias()" },
	{ text: "Grade de poligonos", url: "javascript:gradePol()" },
	{ text: "Grade de pontos", url: "javascript:gradePontos()" },
	{ text: "Grade de hex&aacute;gonos", url: "javascript:gradeHex()" },
	{ text: "Entorno (buffer)", url: "javascript:buffer()" },
	{ text: "Centr&oacute;ide", url: "javascript:centroide()" },
	{ text: "N pontos em poligono", url: "javascript:nptPol()" },
	{ text: "Ponto em poligono/raster", url: "javascript:pontoempoligono()" },
	{ text: "Distribui&ccedil;&atilde;o de pontos", url: "javascript:pontosdistri()" }
	]
};
oMenuData.janelas = [
	{ text: "Barras de ferramentas", url: "javascript:initJanelaZoom('1');initJanelaZoom('2')" },
	{ text: "Janela de mensagens", url: "javascript:initJanelaMen()" }        
	];
oMenuData.arquivo = [
	{ text: "Salvar mapa", url: "javascript:salvaMapa()" },
	{ text: "Carregar mapa", url: "javascript:carregaMapa()" },
	{ text: "Pegar imagens", url: "javascript:pegaimagens()" },
	{ text: "Converter em WMS", url: "javascript:convertews()" },
	{ text: "Gerador de links", url: "../geradordelinks.htm" }
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
