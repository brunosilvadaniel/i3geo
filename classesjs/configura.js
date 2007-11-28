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
pt:"O I3Geo &eacute; software livre! Para download clique <a href='http://mapas.mma.gov.br/download' target=blank >aqui</a>",
en:"I3geo is a open source software! <a href='http://mapas.mma.gov.br/download' target=blank >Click</a> to 
download.",
es:""
}],
//lista de propriedades do mapa
"p2": [
{
pt:"Tipo de imagem",
en:"Image type",
es:""
}],
"p3": [
{
pt: "Legenda",
en: "Legend",
es:""
}],
"p4": [
{
pt:"Escala",
en:"Scale",
es:""
}],
"p5": [
{
pt: "Tamanho",
en:"Size",
es:""
}],
"p6": [
{
pt: "Ativa/desativa entorno",
en:"Enable/Disable surrounding",
es:""
}],
"p7": [
{
pt: "Ativa/desativa logo",
en:"Enable/Disable logo",
es:""
}],
"p8": [
{
pt: "Cor da selecao",
en:"Selection color",
es:""
}],
"p9": [
{
pt: "Cor do fundo",
en:"Background color",
es:""
}],
"p10": [
{
pt: "Grade de coordenadas",
en:"Graticule",
es:""
}],
"p11": [
{
pt: "Template",
en:"Template",
es:""
}],
"p12": [
{
pt: "Temporizador",
en:"Timer",
es:""
}],
"p13": [
{
pt: "Propriedades do mapa",
en:"Map properties",
es:""
}],
//itens do menu suspenso
"s1": [
{
pt: "Ajuda?",
en:"Help",
es:""
}],
"s2": [
{
pt: "An&aacute;lise",
en:"Analysis",
es:""
}],
"s3": [
{
pt: "Janelas",
en:"Windows",
es:""
}],
"s4": [
{
pt: "Arquivo",
en:"Files",
es:""
}],
"s5": [
{
pt: "Propriedades",
en:"Properties",
es:""
}],
//submenus
"u1": [
{
pt: "Sobre o I3Geo",
en:"About",
es:""
}],
"u2": [
{
pt: "Sistema",
en:"System",
es:""
}],
"u3": [
{
pt: "WikiBook",
en:"WikiBook",
es:""
}],
"u4": [
{
pt: "Tutoriais",
en:"Tutorials",
es:""
}],
"u5": [
{
pt: "Blog",
en:"Blog",
es:""
}],
"u6": [
{
pt: "Geometrias",
en:"Geometries",
es:""
}],
"u7": [
{
pt: "Grade de poligonos",
en:"Polygon grid",
es:""
}],
"u8": [
{
pt: "Grade de pontos",
en:"Grid of Points",
es:""
}],
"u9": [
{
pt: "Grade de hex&aacute;gonos",
en:"Grid of Hexagons",
es:""
}],
"u10": [
{
pt: "Entorno(Buffer)",
en:"Buffer",
es:""
}],
"u11": [
{
pt: "Centr&oacute;ide",
en:"Centroid",
es:""
}],
"u12": [
{
pt: "N pontos em poligono",
en:"N point in polygon",
es:""
}],
"u13": [
{
pt: "Ponto em poligono/raster",
en:"Point in polygon/raster",
es:""
}],
"u14": [
{
pt: "Distribui&ccedil;&atilde;o de pontos",
en:"Point distribution",
es:""
}],
"u15": [
{
pt: "Barras de ferramentas",
en:"Toolbars",
es:""
}],
"u16": [
{
pt: "Janela de mensagens",
en:"Message window",
es:""
}],
"u17": [
{
pt: "Salvar mapa",
en:"Save map",
es:""
}],
"u18": [
{
pt: "Carregar mapa",
en:"Load map",
es:""
}],
"u19": [
{
pt: "Pegar imagens",
en:"Get pictures",
es:""
}],
"u20": [
{
pt: "Converter em WMS",
en:"Convert to WMS",
es:""
}],
"u21": [
{
pt: "Gerador de links",
en:"Link generator",
es:""
}],
//arvore com a lista de temas
"t1": [
{
pt: "Camadas",
en:"Layers",
es:""
}],
"t2":[
{
pt:"arraste o tema aqui para excluir",
en:"Drag the layer here to remove",
es:""
}],
"t3":[
{
pt:"Clique para ligar ou desligar esse tema, mostrando-o ou
n&atilde;o 
no mapa. Ap&oacute;s alterar o estado do tema, aguarde alguns
instantes 
para o mapa ser redesenhado, ou clique no bot&atilde;o aplicar que 
ser&aacute; mostrado.",
en:"Turn the layer on/off on the map. Wait a few moments to get the map redesigned or press the button to apply it.",
es:""
}],
"t4":[
{
pt:"limpa sele&ccedil;&atilde;o",
en:"Clear selection",
es:""
}],
"t5":[
{
pt:"Limpa sele&ccedil;&atilde;o existente nesse tema",
en:"Clear selection",
es:""
}],
"t6":[
{
pt:"Clique para fazer o download desse tema no formato shapefile",
en:"Click to download in shapefile format",
es:""
}],
"t7":[
{
pt:"clique e arraste",
en:"dragging",
es:""
}],
"t8":[
{
pt:"arraste para mudar a ordem",
en:"drag to change the draw order",
es:""
}],

"t9":[
{
pt:"A escala do tema &eacute; compat&iacute;vel com a escala do
mapa",
en:"The scale of the layer is compatible with the scale of the map",
es:""
}],
"t10":[
{
pt:"A escala do tema &eacute incompat&iacute;vel com a escala do
mapa",
en:"The scale of the layer is incompatible with the scale of the
map",
es:""
}],
"t11":[
{
pt:"A escala do tema n&atilde;o &eacute conhecida",
en:"The scale of the layer is not known",
es:""
}],
"t12":[
{
pt:"excluir",
en:"delete",
es:""
}],
"t12a":[
{
pt:"Clique para excluir esse tema do mapa.",
en:"Delete layer of the map.",
es:""
}],
"t13":[
{
pt:"sobe",
en:"up",
es:""
}],
"t14":[
{
pt:"Clique para subir esse tema na ordem de desenho",
en:"Drag the layer up",
es:""
}],
"t15":[
{
pt:"desce",
en:"down",
es:""
}],
"t16":[
{
pt:"Clique para descer esse tema na ordem de desenho",
en:"Drag the layer down",
es:""
}],
"t17":[
{
pt:"zoom para o tema",
en:"zoom to a layer",
es:""
}],
"t18":[
{
pt:"Clique para ajustar o mapa de forma a mostrar todo o tema",
en:"Click to adjust the map in order to show the whole layer",
es:""
}],
"t18a":[
{
pt:"Op&ccedil;&otilde;es",
en:"Options",
es:""
}],
"t18b":[
{
pt:"Legenda",
en:"Legend",
es:""
}],
"t19":[
{
pt:"Altera a transpar�ncia do tema, possibilitando que as camadas 
inferiores possam ser vistas.",
en:"Change the layer transparency.",
es:""
}],
"t20":[
{
pt:"opacidade:",
en:"opacity",
es:""
}],
"t21a":[
{
pt:"Muda o nome atual do tema. Utilize para melhorar a legenda do
mapa.",
en:"Change layer name.",
es:""
}],
"t21":[
{
pt:"novo nome:",
en:"new name",
es:""
}],
"t22":[
{
pt:"Localize elementos no tema com base em seus atributos
descritivos.",
en:"Find elements on the layer based on their descriptive attributes.",
es:""
}],
"t23":[
{
pt:"procurar...",
en:"Search...",
es:""
}],
"t24":[
{
pt:"Crie uma nova camada no mapa para apresentar textos descritivos 
sobre esse tema, tendo como base a tabela de atributos.",
en:"Create a new layer to display descriptive texts on the subject, based on table of attributes.",
es:""
}],
"t25":[
{
pt:"texto...",
en:"label...",
es:""
}],
"t26":[
{
pt:"Defina as etiquetas que ser&atilde;o mostradas quando o mouse &eacute; estacionado sobre um elemento desse tema.",
en:"Set the tooltips that will be shown when the mouse is over the element of that layer.",
es:""
}],
"t27":[
{
pt:"etiquetas...",
en:"tooltip...",
es:""
}],
"t28":[
{
pt:"Insira um filtro nesse tema para mostrar apenas determinadas informa&ccedil;&otilde;es, com base na tabela de atributos.",
en:"Filter based on the table of attributes.",
es:""
}],
"t29":[
{
pt:"filtro...",
en:"filter...",
es:""
}],
"t30":[
{
pt:"Veja a tabela de atributos relacionada a esse tema.",
en:"See the table of attributes related to that layer.",
es:""
}],
"t31":[
{
pt:"tabela...",
en:"table...",
es:""
}],
"t32":[
{
pt:"Abre o editor de legenda, permitindo a altera��o da forma de 
representa��o desse tema.",
en:"Opens the editor of legend, allowing the modification of the form
of 
representation of this theme.",
es:""
}],
"t33":[
{
pt:"editar legenda...",
en:"legend edit...",
es:""
}],
"t34":[
{
pt:"Mostra os dados desse tema em uma janela que acompanha o mouse.",
en:"The data shows that layer in a window that tracks the mouse.",
es:""
}],
"t35":[
{
pt:"mostra em janela...",
en:"show in window",
es:""
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
en:"Upload local file",
es:""
}],
"a3":[
{
pt:"Download de dados",
en:"Data download",
es:""
}],
"a4":[
{
pt:"Conectar com servidor WMS",
en:"WMS server connection",
es:""
}],
"a5":[
{
pt:"Conectar com GeoRss",
en:"GeoRss connection",
es:""
}],
"a6":[
{
pt:"Acesso aos arquivos do servidor",
en:"Access files in server directory",
es:""
}],
"a7":[
{
pt:"Temas",
en:"Layers",
es:""
}],
"a8":[
{
pt:"Clique para ligar ou desligar esse tema, mostrando-o ou n�o no
mapa. 
Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa
ser 
redesenhado, ou clique no bot�o aplicar que ser� mostrado.",
en:"Click to connect or disconnect layer, showing it or not on
the map. After changing the layer status, wait a few moments to be
redesigned the map, or click in the button apply that will be
shown.",
es:""
}],
"a9":[
{
pt:"fonte",
en:"font",
es:""
}],
"a10":[
{
pt:"c&oacute;digo:",
en:"code",
es:""
}],
"a11":[
{
pt:"Sistemas",
en:"Systems",
es:""
}],
"a12":[
{
pt:"Abrir sistema",
en:"Open system",
es:""
}],
//guias principais
"g1":[
{
pt:"Temas",
en:"Layer",
es:""
}],
"g2":[
{
pt:"Adiciona",
en:"Add",
es:""
}],
"g3":[
{
pt:"Legenda",
en:"Legend",
es:""
}],
"g4":[
{
pt:"Mapas",
en:"Maps",
es:""
}],
//outros
"o1":[
{
pt:"Aguarde...",
en:"Wait...",
es:""
}],
"o2":[
{
pt:"busca r&aacute;pida...",
en:"quick search...",
es:""
}],
"o3":[
{
pt:"Lendo imagem...",
en:"Loading images...",
es:""
}],
"o4":[
{
pt:"Aguarde...abrindo lente",
en:"Wait...Opening lens...",
es:""
}],
"o5":[
{
pt:"Aguarde...iniciando",
en:"Wait...initializing",
es:""
}],
//dicas das ferramentas
"d1":[
{
pt:"Digite as coordenadas de um ponto (X=longitude e Y=latitude) para

localiz&acute;-lo no mapa. O centro do mapa ser&acute; deslocado para
o 
ponto digitado.",
en:"Enter the coordinates of a point (X=longitude and Y=latitude) to 
localize it on the map. The center of the map is move to the point 
entered.",
es:""
}],
"d2":[
{
pt:"Altera a escala do mapa ajustando-a para mostrar a mesma 
abrang&circ;ncia geogr&aacute;fica da inicializa&ccedil;&atilde;o.",
en:"Change the scale of the map adjusting it to show the same initial geographical 
cover.",
es:""
}],
"d3":[
{
pt:"Amplia o mapa - coloca o ponto clicado no centro da tela ou
amplia a 
regi&atilde;o indicada por um ret&acirc;ngulo.Ap&oacute;s ativada, 
clique e arraste o mouse sobre o mapa na &aacute;rea de zoom
desejada.",
en:"Extends the map - place the clicked point in the center of the
screen 
or extends the region indicated by a rectangular.After enabled, click
and drag the mouse over the map in the area of zoom desired.",
es:""
}],
"d4":[
{
pt:"Desloca a regi&atilde;o vis&iacute;vel no mapa. Ap&oacute;s
ativada, 
clique e arraste o mouse sobre o mapa para deslocar a regi&atilde;o 
vis&iacute;vel.",
en:"Shifts the region visible on the map. Once activated, click and
drag 
the mouse over the map to move the visible region.",
es:""
}],
"d5":[
{
pt:"Amplia o mapa tendo como refer&ecirc;cia o centro atual.",
en:"Magnify the map with the reference the current center.",
es:""
}],
"d6":[
{
pt:"Reduz o mapa tendo como refer&ecirccia o centro atual.",
en:"Reduces the map as having reference the current center.",
es:""
}],
"d7":[
{
pt:"Mostra informa&ccedil;&otilde;es sobre um ponto no mapa.
Ap&oacute;s 
ativada, pare o mouse por alguns instantes no ponto desejado ou
clique 
sobre o mesmo.",
en:"Displays information about a point on the map. Once activated,
stop 
the mouse for a few moments at the desired point or click on it.",
es:""
}],
"d8":[
{
pt:"Mostra a extens&atilde;o geogr&aacute;fica atual em coordenadas 
geogr&aacute;ficas",
en:"It shows the extent of current geographic coordinates",
es:""
}],
"d9":[
{
pt:"Abre-fecha o mapa de refer&ecirc;ncia",
en:"Open-close the reference map ",
es:""
}],
"d10":[
{
pt:"Digite o novo valor de escala e clique no bot&atilde;o aplicar
para 
alterar a escala do mapa",
en:"Enter the new value of scale and click the button Apply to
change 
the scale of the map",
es:""
}],
"d11":[
{
pt:"Busca dados na Wikipedia na abrang&ecirc;ncia atual do mapa. 
Fa&ccedil;a um zoom no mapa antes de abrir essa op&ccedil;&atilde;o. 
Regi&ocirc;es muito extensas podem tornar a busca muito demorada",
en:"Search data on Wikipedia in the current scope of the map. Make a 
zoom on the map before opening this option. Regions very 
extensive can make a very long search ",
es:""
}],
"d12":[
{
pt:"Imprime o mapa",
en:"Print the map",
es:""
}],
"d13":[
{
pt:"Localiza o IP do usu&aacute;rio no mapa",
en:"Locates the user's IP on the map",
es:""
}],
"d14":[
{
pt:"Gera arquivo para 3d",
en:"Generates file for 3d",
es:""
}],
"d15":[
{
pt:"Abre o Google Maps, mostrando uma imagem de sat&eacute;lite da 
regi&atilde;o vista no mapa principal",
en:"Open Google Maps, showing a satellite image of the region's main
views on the map",
es:""
}],
"d16":[
{
pt:"Pesquisa documentos na base de dados Scielo (dados
preliminares)",
en:"Search documents in the database Scielo (preliminary data)",
es:""
}],
"d17":[
{
pt:"Projeto Confluence. Pontos de intersec&ccedil;&atilde;o de 
coordenadas observadas em campo",
en:"Confluence Project. Points of intersection of coordinates
observed in field",
es:""
}],
"d18":[
{
pt:"Abre lente de amplia&ccedil;&atilde;o",
en:"Opens lens to expansion",
es:""
}],
"d19":[
{
pt:"Coloca as guias em uma janela m&oacute;vel",
en:"Open the tabs in a window mobile",
es:""
}],
"d20":[
{
pt:"Redesenha o mapa com as configura&ccedil;&ocirc;es iniciais.",
en:"Reload the map with the initial configurations.",
es:""
}],
"d21":[
{
pt:"Mede a dist&acirc;ncia entre dois ou mais pontos clicados no mapa

(menor dist&acirc;ncia). O c&aacute;lculo de dist&acirc;ncia &eacute;

aproximado e sua precis&atilde;o depende da escala do mapa.",
en:"It measures the distance between two or more clicked points on
the map (less distance). The calculation of distance is approximate and 
their accuracy depends on the scale of the map.",
es:""
}],
"d22":[
{
pt:"Insere pontos no mapa em coordenadas geogr&aacute;ficas. Os
pontos 
inclu&iacute;dos podem ser transformados em linhas ou
pol&iacute;gonos. 
Os pontos s&atilde;o armazenados em um tema tempor&aacute;rio, 
podendo-se fazer o download do arquivo shapefile.",
en:"Insert points on the map in geographical coordinates. Items
included 
can be converted into lines or polygons. Items are stored in a
temporary 
layer, can be to download shapefile.",
es:""
}],
"d23":[
{
pt:"Insere um gr&aacute;fico no ponto clicado conforme os atributos 
existentes no tema escolhido. O tema deve possuir itens com valores 
num&eacute;ricos na tabela de atributos.",
en:"Insert a graphic in the clicked point as the exist attributes in the 
chosen layer. The layer must have items with numerical values in
the 
table of attributes.",
es:""
}],
"d24":[
{
pt:"Abre as ferramentas para sele&ccedil;&atilde;o de elementos de um

tema. Os elementos selecionados podem ser utilizados em outras 
opera&ccedil;&ocirc;es, como buffer e sele&ccedil;&atilde;o por
tema.",
en:"Opens the tools to select elements of a layer. The elements
selected 
can be used in other buffer or selection operation by layer  .",
es:""
}],
"d25":[
{
pt:"Insere texto no mapa clicando em um ponto. Utilize essa 
op&ccedil;&atilde;o para adicionar informa&ccedil;&ocirc;es ao
mapa.",
en:"Insert text on the map by clicking on a point. Use this option to

add information on the map.",
es:""
}],
"d26":[
{
pt:"Escolha o visual para os bot�es e outras caracter&iacute;sticas 
visuais do mapa",
en:"Choose look for the buttons and other map's visual characteristics",
es:""
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
		dica:$trad("d1"),
		conteudo:"localiza X:<input class=digitar id='xg' title='grau' type=text size=5 value='-00'/>&nbsp;<input class=digitar id='xm' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='xs' title='segundo' type=text size=5 value='00.00'/>&nbsp;&nbsp;Y:<input class=digitar id='yg' title='grau' type=text size=3 value='-00'/>&nbsp;<input class=digitar id='ym' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='ys' title='segundo' type=text size=5 value='00.00'/><img  title='zoom' onclick='zoomPonto()' src=\"+$im(\"tic.png\")+\" id=procurarxy />"
	},
	{
		//Ativa o bot�o que realiza a opera��o de zoom para a extens�o total do mapa.
		iddiv:"zoomtot",
		dica:$trad("d2"),
		funcaoonclick:function(){zoomtot();}
	},
	{
		//Ativa o bot�o que realiza a opera��o de zoom interativo.
		iddiv:"zoomli",
		dica:$trad("d3"),
		funcaoonclick:function()
		{mudaiconf('zoomli');g_operacao='navega';}
	},
	{
		//Ativa o bot�o que realiza a opera��o de deslocamento (pan).
		iddiv:"pan",
		dica:$trad("d4"),
		funcaoonclick:function()
		{mudaiconf('pan');g_tipoacao='pan';g_operacao='navega';}
	},
	{
		//bot�o que realiza a opera��o de zoom in.
		iddiv:"zoomiauto",
		dica:$trad("d5"),
		funcaoonclick:function()
		{zoomiauto();}
	},
	{
		//bot�o que realiza a opera��o de zoom out
		iddiv:"zoomoauto",
		dica:$trad("d6"),
		funcaoonclick:function()
		{zoomoauto();}
	},
	{
		//bot�o que abre a fun��o de identifica��o.
		iddiv:"identifica",
		dica:$trad("d7"),
		funcaoonclick:function()
		{mudaiconf('identifica');g_operacao='identifica';}
	},
	{
		//bot�o que abre a janela com o valor da extens�o geogr�fica do mapa atual
		iddiv:"exten",
		dica:$trad("d8"),
		funcaoonclick:function()
		{mensagemf(objmapa.extent);}
	},
	{
		//bot�o que abre a janela com o mapa de refer�ncia
		iddiv:"referencia",
		dica:$trad("d9"),
		funcaoonclick:function()
		{initJanelaRef();}
	},
	{
		//apresenta��o da escala num�rica
		iddiv:"escala",
		dica:$trad("d10"),
		conteudo:"1:<input class='digitar' type='text' onchange='javascript:aplicaescala()' id=escalanum size=19 value=''/><img src=\"+$im(\"tic.png\")+\" onclick='javascript:aplicaescala()' />"
	},
	{
		//bot�o de busca na wikipedia
		iddiv:"wiki",
		dica:$trad("d11"),
		funcaoonclick:function()
		{wiki();}
	},
	{
		//bot�o de impress�o
		iddiv:"imprimir",
		dica:$trad("d12"),
		funcaoonclick:function()
		{imprimir();}
	},
	{
		//bot�o de localiza��o do usu�rio pelo IP
		iddiv:"ondeestou",
		dica:$trad("d13"),
		funcaoonclick:function()
		{zoomIP();}
	},
	{
		//abre a op��o de gera��o de um modelo virtual de eleva��o
		iddiv:"v3d",
		dica:$trad("d14"),
		funcaoonclick:function()
		{wdocaf("400px","200px",g_locaplic+"/ferramentas/3d/index.htm","","","3d");}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no Google
		iddiv:"google",
		dica:$trad("d15"),
		funcaoonclick:function()
		{google();}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no site Scielo
		iddiv:"scielo",
		dica:$trad("d16"),
		funcaoonclick:function()
		{scielo();}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no site confluence
		iddiv:"confluence",
		dica:$trad("d17"),
		funcaoonclick:function()
		{confluence();}
	},
	{
		//Ativa o bot�o que abre a lente de aumento
		iddiv:"lentei",
		dica:$trad("d18"),
		funcaoonclick:function()
		{lenteDeAumento();}
	},
	{
		//Coloca as guias em uma janela m�vel
		iddiv:"encolheFerramentas",
		dica:$trad("d19"),
		funcaoonclick:function()
		{docaguias();}
	},
	{
		//bot�o de reinicializa��o do mapa que restaura as condi��es iniciais do mapa
		iddiv:"reinicia",
		dica:$trad("d20"),
		funcaoonclick:function()
		{reiniciaMapa();}
	},
	{
		//bot�o de medi��o de dist�ncias
		iddiv:"mede",
		dica:$trad("d21"),
		funcaoonclick:function()
		{mede();}
	},
	{
		//bot�o de digitaliza��o
		iddiv:"inserexy",
		dica:$trad("d22"),
		funcaoonclick:function()
		{inserexy();}
	},
	{
		//bot�o de inclus�o de gr�ficos
		iddiv:"inseregrafico",
		dica:$trad("d23"),
		funcaoonclick:function()
		{inseregrafico();}
	},
	{
		//bot�o de sele��o
		iddiv:"selecao",
		dica:$trad("d24"),
		funcaoonclick:function()
		{selecao();}
	},
	{
		//bot�o de inser��o de topon�mia
		iddiv:"textofid",
		dica:$trad("d25"),
		funcaoonclick:function()
		{textofid();}
	},
	{
		//op��es de altera��o do visual do mapa
		iddiv:"visual",
		dica:$trad("d26"),
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
