/*
Title: Inicializa��o do i3geo.

Cria o objeto objmapa e inicializa o mapa.

Define as opera��es das funcionalidades principais.

Exemplo:

g_janelaMen = "nao"

objmapa = new Mapa()

objmapa.inicializa()

File: iniciamma.js

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
Section: vari�veis de configura��o
*/
/*
Variable: g_autoRedesenho

Ativa o auto redesenho ap�s um determinado temp.

Ap�s decorrido o tempo definido, o mapa � redesenhado. Se for 0 o temporizador n�o � ativado.
*/
g_autoRedesenho = 0;
/*
Variable: g_sid

Id da se��o atual no servidor.

*/
if (window.location.href.split("?")[1])
{
	g_sid = window.location.href.split("?")[1];
	if (g_sid.split("#")[0])
	{g_sid = g_sid.split("#")[0];}
}
else 
{g_sid = "";}
/*
Variable: imagemxi

Inicializa��o da vari�vel de c�lculo de posicionamento.

*/
imagemxi = 0;
/*
Variable: imagemyi

Inicializa��o da vari�vel de c�lculo de posicionamento.

*/
imagemyi = 0;
/*
Variable: atuaLeg

Vari�vel interna que define se a legenda doc�vel deve ser atualizada.

*/
atuaLeg="nao";
/*
Variable: g_mashuppar

Par�metros de inicializa��o que podem ser utilizados na interface mashup.

Os par�metros s�o os mesmos que podem ser utilizados quando o i3geo � inicializado pelo ms_criamapa.php.

Exemplo: g_mashuppar = "&pontos=-54 -12&temasa=biomas&layers=biomas"
*/
g_mashuppar = "";
/*
Variable: g_operacao

Nome da �ltima opera��o que foi executada.

Dependendo do tipo de opera��o s�o aplicadas as atualiza��es necess�rias aos componentes do mapa. Por exemplo, redesenha o corpo do mapa, atualiza a lista de temas, etc.

Essas opera��es s�o controladas pela fun��o ajaxiniciaparametros.
*/
g_operacao = "";
/*
Variable: g_nomepin

Nome do tema atual que ir� receber dados pontuais ou toponimia.

*/
g_nomepin = "";
/*
Variable: g_arvoreClick

Item da �rvore de temas que foi clicado por �ltimo. Guarda o identificador do n� da �rvore de temas.
*/
g_arvoreClick = "";
/*
Variable: g_arvoreClicks

Guarda os n�s da �rvore de temas que j� foram clicados. Evita que a fun��o ajax que busca os filhos de um n� na �rvore de temas seja executado novamente, recuperando o que j� est� na mem�ria.
*/
g_arvoreClicks = "";
/*
Variable: g_movedoca (depreciado)

Indica o status (0 ou 1) atual da janela interna.
Se a janela estiver sendo movimentada, o status � igual a 1.
*/
g_movedoca = 0;
/*
Variable: g_movedocac (depreciado)

Indica o status (0 ou 1) atual da janela para sele��o de cores.
Se a janela estiver sendo movimentada, o status � igual a 1.
*/
g_movedocac = 0;
/*
Variable: g_movedocar (depreciado)

Indica o status (0 ou 1) atual da janela do mapa de refer�ncia.
Se a janela estiver sendo movimentada, o status � igual a 1.
*/
g_movedocar = 0;
/*
Variable: g_tipoacao

Tipo de a��o que est� sendo executada.
Quando o usu�rio clica no mapa, essa vari�vel � pesquisada para definir o tipo de opera��o que deve ser executada.
� definida quando o usu�rio seleciona uma determinada ferramenta do i3Geo.
*/
g_tipoacao = "zoomli";
/*
Variable: g_realca

Define se o realce do mapa deve ficar ativo.
O realce � um box que segue o mouse, por ter uma colora��o diferente, provoca um efeito de destaque.
*/
g_realca = "nao";
/*
Variable: g_destaca

Armazena o c�digo do tema que est� em destaque.
Um tema em destaque � mostrado em um ret�ngulo que segue o mouse.
O tema destacado � selecionado nas op��es de cada tema.
*/
g_destaca = "";
/*
Variable: g_lenteaberta

Indica se a lente de aumento est� ou n�o aberta.
� definida quando o usu�rio clica no �cone "lente".
Quando o mapa � redesenhado, essa vari�vel � checada para verificar se a lente deve ser refeita.
*/
g_lenteaberta = "nao";
/*
Variable: g_hlpt

Indica qual o nome do arquivo de ajuda que ser� aberto quando a letra "a" for digiada.
� definida quando o usu�rio passa o mouse sobre um �cone ou outro objeto.
*/
g_hlpt = "";
/*
Variable: g_panM

Indica se o mapa deve ou n�o ser deslocado.
� utilizada no controle da fun��o "pan".
*/
g_panM = "nao";
/*
Variable: quadrofilme

Array que guarda os objetos do quadro de anima��o.
Cada elemento guarda um objeto com par�metros espec�ficos da classe quadrofilme
*/
quadrosfilme = new Array();
/*
Variable: g_quadrooriginal

Guarda a URL da imagem do mapa atual.
� utilizada para recuperar a imagem correta do corpo do mapa atual, uma vez que ao mover de um objeto quadofilme para outro, a imagem do corpo do mapa � alterada.
*/
g_quadrooriginal = "";
/*
Variable: wd (depreciado)

Indica se a janela interna foi clicada.
Utilizada na movimenta��o interativa da janela interna.
*/
wd = 0;
/*
Variable: navm

Verdadeiro (true) se o navegador for o Internet Explorer
*/
navm = false;
/*
Variable: navn

Verdadeiro (true) se o navegador for o Firefox
*/
navn = false;
/*
Variable: g_r

Indica se o software R esta instalado (sim ou nao). � preenchida na inicializa��o do mapa via AJAX.
*/
g_r = "nao";

/*
Section: vari�veis p�blicas que podem ser alteradas pelo usu�rio antes de inicializar o mapa
*/
/*
Variable: g_embedLegenda

Indica se a legenda deve ser incluida no corpo do mapa.

Values:

sim|nao

*/
g_embedLegenda = "nao";
/*
Variable: oMenuData

Array com a arvore do menu suspenso

Se for igual a "" ser� utilizado o menu padr�o.
*/
oMenuData = "";
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
//seta as vari�veis navn e navm
var app = navigator.appName.substring(0,1);
if (app=='N') navn=true; else navm=true;
if (navm)
{
	g_postpx = "";  //utilizado para crossbrowser
	g_tipotop = "pixelTop"; //utilizado para crossbrowser
	g_tipoleft = "pixelLeft"; //utilizado para crossbrowser
}
else
{
	g_postpx = "px";
	g_tipotop = "top";
	g_tipoleft = "left";
}
//inclui uma mensagem no rodap� da janela quando a tela do navegador tem seu tamanho modificado pelo usu�rio
window.onresize = function(){window.status = "Ap&oacute;s alterar o tamanho da janela, clique no bot&atilde;o de refresh do navegador";};

function cria()
{
	var mashup = function (retorno)
	{
		g_sid = retorno.data;
		objmapa.inicializa();
	};
	var cp = new cpaint();
	cp.set_async(true);
	cp.set_response_type("JSON");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa";
	cp.call(p,"",mashup);		
}

/*
Class: Mapa

Objeto mapa (objmapa).

Executa os programas ajax que geram o corpo do mapa, o mapa de refer�ncia, a barra de escala e a legenda.
Preenche os elementos HTML necess�rios para visualiza��o do mapa.

Parameters:

e - (opcional, se n�o existir, o valor ser� buscado na URL) extens�o geogr�fica do mapa com valores separados por espa�o

m - (opcional, se n�o existir, o valor ser� buscado na URL) nome do mapfile criado para o mapa

return:

objmapa - objeto mapa do i3geo

Constructor: 

objmapa = New Mapa()
*/
function Mapa(e,m)
{
	objaguarde = new aguarde();
	objposicaocursor = new posicaocursor();
	objposicaomouse = new posicaomouse();
	//faz o cache das imagens para desenhar mais r�pido
	imgBranco = new Image();
	imgBranco.src = g_locaplic+"/imagens/branco.gif";
	var icache = new Array("foldermapa.gif","extent.gif","tic.png","maisvermelho.png","maisverde.png","maisamarelo.png","temas.png","x.gif","sobe.gif","desce.gif","quadro.png","quadro1.png","excluir.png");
	for (i=0;icache.lenght;i++)
	{
		var temp = new Image();
		temp.src = g_locaplic+"/imagens/"+icache[i];
	}
	var temp = new Image();
	temp.src = g_locaplic+"/classesjs/jsobjects/jsUI-Treeview/plus.gif";
	temp.src = g_locaplic+"/classesjs/jsobjects/jsUI-Treeview/minus.gif";
	//calcula o tamanho do mapa
	var diminuix = (navm) ? g_diminuixM : g_diminuixN;
	var diminuiy = (navm) ? g_diminuiyM : g_diminuiyN;
	/*
	Variable: objmapa.w
	
	Largura do mapa criado

	� calculado em fun��o do tamanho da tela. No caso do corpo do mapa possuir a propridedade de largura em seu estilo, � utilizado esse tamanho.
	*/
	/*
	Variable: objmapa.h
	
	Altura do mapa criado

	� calculado em fun��o do tamanho da tela. No caso do corpo do mapa possuir a propridedade de largura em seu estilo, � utilizado esse tamanho.
	*/
	if (e == undefined)
	{
		var menos = 0;
		if ($i("contemFerramentas"))
		{menos = menos + parseInt($i("contemFerramentas").style.width);}
		if ($i("encolheFerramentas"))
		{menos = menos + parseInt($i("encolheFerramentas").style.width);}
		if ($i("ferramentas"))
		{menos = menos + parseInt($i("ferramentas").style.width);}
		var novow = screen.availWidth - diminuix;
		var novoh = screen.availHeight - diminuiy;
		if (novow >= 1024)
		{
			novow = 1000;
		}
		if (novoh >= 700)
		{
			novoh = 700;
		}
		if (document.body.style.width < 400)
		{
			var novow = screen.availWidth - diminuix;
			var novoh = screen.availHeight - diminuiy;
			window.resizeTo(screen.availWidth,screen.availHeight);
			window.moveTo(0,0);
		}
		document.body.style.width = novow;
		document.body.style.height = novoh;
		this.w = parseInt(document.body.style.width) - menos - diminuix;
		this.h = parseInt(document.body.style.height) - diminuiy;
		if (document.getElementById("corpoMapa"))
		{
			if (document.getElementById("corpoMapa").style.width)
			{
				this.w = parseInt(document.getElementById("corpoMapa").style.width);
				this.h = parseInt(document.getElementById("corpoMapa").style.width);
			}
			if (document.getElementById("corpoMapa").style.height)
			{this.h = parseInt(document.getElementById("corpoMapa").style.height);}
		}
	}
	else
	{
		this.w = document.body.offsetWidth - parseInt($i("contemFerramentas").style.width) - diminuix;
		this.h = document.body.offsetHeight - diminuiy;
	}
	if ($i("openlayers"))
	{
		$i("openlayers").style.width = this.w;
		$i("openlayers").style.height = this.h;
	}
	/*
	Variable: objmapa.navegacaoDir
	
	Indica se deve ser incluida a op��o de navega��o nos diret�rios do servidor.

	A indica��o sim|nao � obtida na inicializa��o do i3geo, e � definido no ms_configura.php
	*/
	this.navegacaoDir = "nao";	
	/*
	Variable: objmapa.listavisual
	
	String com a lista de visuais dispon�veis no i3geo.

	A lista � obtida na inicializa��o do i3geo, lendo-se os diret�rios dispon�veis em imagens/visual
	*/
	this.listavisual = "";
	/*
	Variable: objmapa.visualatual
	
	Indica qual o visual atualmente em uso.
	*/
	this.visualatual = "default";
	/*
	Variable: objmapa.funcoesClickMapa
	
	Array com a lista de fun��es que ser�o executadas quando o usu�rio clica no mapa

	� utilizado quando o i3geo � customizado, acrescentando outras funcionalidades al� do padr�o.
	
	Na customiza��o, deve ser definida ap�s a inicializa��o do mapa.
	*/
	this.funcoesClickMapa = new Array();
	/*
	Variable: objmapa.objtips
	
	Array que guarda os objetos tips fixos na tela.
	
	Os objetos s�o acrescentados � essa vari�vel quando um tip � fixado na tela pelo usu�rio.
	
	Quando o mapa � redesenhado, essa vari�vel � limpa.
	*/
	this.objtips = new Array(); //
	/*
	Variable: objmapa.tempo
	
	Inicia o temporizador para redesenhar o mapa.
	
	*/
	this.tempo = ""; //
	/*
	Variable: objmapa.autoRedesenho
	
	Inicia o temporizador para redesenhar o mapa automaticamente.
	
	*/
	this.tempoRedesenho = ""; //
	this.contaTempoRedesenho = ""; //
	/*
	Variable: objmapa.temaAtivo
	
	Tema que esta ativo.
	
	Utilizado em varias operacoes onde o tema e selecionado de um combo
	*/	
	this.temaAtivo = ""; 
	/*
	Variable: objmapa.pinmarca
	
	Simbolo utilizado para insercao de pontos.
	
	A inser��o � utilizada em algumas ferramentas, como a digitaliza��o de elementos.
	*/
	this.pinmarca = "marca"; //
	/*
	Variable: objmapa.pintamanho
	
	Tamanho da marca utilizada na inclus�o de pontos
	*/
	this.pintamanho= "5";
	/*
	Variable: objmapa.escala
	
	Escala do mapa atual.
	
	� sempre redefinida quando o mapa � redesenhado.
	*/
	this.scale = 50000;
	/*
	Variable: objmapa.temas
	
	Temas dispon�veis no mapa atual.
	
	Guarda a lista de temas e suas caracter�sticas. � definida quando o mapa � inicializado ou redesenhado.
	*/
	this.temas = "";
	/*
	Variable: objmapa.legenda
	
	Legenda HTML do mapa atual.
	
	Guarda o HTML que apresenta a legenda no mapa.
	*/
	this.legenda="";
	/*
	Variable: objmapa.finaliza
	
	Fun��o que ser� executada no final do processo de montagem do mapa.
	
	Pode ser utilizada quando se deseja customizar o I3Geo.
	*/
	this.finaliza="";
	/*
	Variable: objmapa.guiaTemas
	
	Define qual a guia para listar os temas do mapa
	*/
	this.guiaTemas = "guia1";
	/*
	Variable: objmapa.guiaMenu
	
	Define qual a guia que receber� o menu de sele��o de temas
	*/
	this.guiaMenu = "guia2";
	/*
	Variable: objmapa.guiaLegenda
	
	Define qual a guia receber� a legenda do mapa
	*/
	this.guiaLegenda = "guia4";
	/*
	Variable: objmapa.guiaListaMapas
	
	Define a guia que receber� a lista de mapas
	*/
	this.guiaListaMapas = "guia5";
	/*
	Function: inicializa
	
	Inicializa o mapa
	
	Paremeters:
	
	void
	*/
	this.inicializa= function()
	{
		if (!$i("i3geo"))
		{document.body.id = "i3geo";}
		//altera a classe do corpo do HTML
		$i("i3geo").className = "yui-skin-sam";
		$i("i3geo").onmouseover = function()
		{
			this.onmousemove=function(exy1)
			{
				//if ($i("img")){calcposf();}
				if (navn)
				{
					objposicaomouse.x = exy1.clientX;
					objposicaomouse.y = exy1.clientY;
				}
				if (navm)
				{
					objposicaomouse.x = window.event.clientX;
					objposicaomouse.y = window.event.clientY;
				}
			};
		};
		//
		//se g_sid="", o html foi aberto diretamente
		//ent�o, � necess�rio criar o mapa
		//
		if (g_sid=="")
		{
			var mashup = function (retorno)
			{
				g_sid = retorno.data;
				objmapa.inicializa();
			};
			var cp = new cpaint();
			cp.set_async("true");
			cp.set_response_type("JSON");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa"+g_mashuppar;
			cp.call(p,"",mashup);
			return;
		}	
		//testa se os javascripts foram carregados
		if (!window.testafuncoes)
		{alert("funcoes.js com problemas");}
		if (!window.testamenususpenso)
		{alert("menususpenso.js com problemas");}
		if (!window.testaferramentas)
		{alert("ferramentas.js com problemas");}
		if (!window.testaajax)
		{alert("redesenho.js com problemas");}
		//
		//objeto que guarda os parametros de posicionamento do cursor
		objaguarde.abre("montaMapa","Aguarde...iniciando o mapa");
		var cp = new cpaint();
		cp.set_response_type("JSON");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inicia&embedLegenda="+g_embedLegenda+"&w="+this.w+"&h="+this.h+"&g_sid="+g_sid;
		cp.call(p,"iniciaMapa",this.montaMapa);
	};
	/*
	Function: montaMapa
	
	Processa os resultados da inicializa��o e monta o mapa
	
	Parameters:
	
	Resultado da fun��o inicializa
	*/
	this.montaMapa = function (retorno)
	{
		if (retorno.data.search(" erro.") > -1)
		{
			alert(retorno.data);
		}
		if (retorno.data == "linkquebrado")
		{
			objaguarde.fecha("montaMapa");
			document.body.style.backgroundColor="white";
			document.body.innerHTML = "<br>Para abrir o mapa utilize o link:<br><a href="+g_locaplic+"/ms_criamapa.php >"+g_locaplic+"/ms_criamapa.php</a>";
			return("linkquebrado");
		}
		else
		{
			if ((retorno.data != "erro") && (retorno.data != undefined))
			{
				eval(retorno.data);
				/*
				menu suspenso
				*/
				if (oMenuData == "")
				{
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
				if (!$i("listaPropriedades"))
               	{
                   	oMenuData.propriedades = [
                       { text: "Tipo de imagem", url: "javascript:tipoimagem()" },
                       { text: "Legenda", url: "javascript:opcoesLegenda()" },
                       { text: "Escala", url: "javascript:opcoesEscala()" },
                       { text: "Tamanho", url: "javascript:tamanho()" },
                       { text: "Ativa/desativa entorno", url: "javascript:ativaEntorno()" },
                       { text: "Ativa/desativa logo", url: "javascript:ativaLogo()" },
                       { text: "Cor da selecao", url: "javascript:queryMap()" },
                       { text: "Cor do fundo", url: "javascript:corFundo()" },
                       { text: "Grade de coordenadas", url: "javascript:gradeCoord()" }
                       ];
                   }
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
               }
               if ($i("menus"))
               {montaMenuSuspenso();}
				//insere botao dinamico de aplicar
				if (!$i("aplicari"))
				{
					var novoel = document.createElement("input");
					novoel.id = 'aplicari';
					novoel.type = 'button';
					novoel.value = 'Aplicar';
					novoel.style.cursor="pointer";
					novoel.style.fontSize="10px";
					novoel.style.zIndex = 15000;
					novoel.style.position="absolute";
					novoel.style.display="none";
					novoel.onclick=function()
					{
						remapaf();
						this.style.display="none"
					};
					novoel.onmouseover = function(){this.style.display="block";};
					novoel.onmouseout = function(){this.style.display="none";};
					document.body.appendChild(novoel);
				}
				gerafilmef(10);
				//inicia as barras de ferramentas
				if (g_barraFerramentas1 == "sim")
				{initJanelaZoom(1);}
				if (g_barraFerramentas2 == "sim")
				{initJanelaZoom(2);}				
				objmapa.atualizaListaTemas(temas);
				objmapa.atualizaReferencia(mapexten);
				objmapa.scale = parseInt(mapscale);
				objmapa.temas = temas;
				objmapa.cellsize = g_celula;
				objmapa.extent = mapexten;
				objmapa.extentTotal = mapexten;
				objmapa.criaCorpoMapa();
				ajaxCorpoMapa(retorno);
				objmapa.criaEscalaGrafica();
				objmapa.atualizaEscalaGrafica();
				objmapa.ativaLocallizarXY("localizarxy");
				objmapa.ativaBuscaRapida("buscaRapida");
				objmapa.ativaListaPropriedades("listaPropriedades");
				objmapa.ativaRealce("realca");
				objmapa.ativaGoogle("google");
				objmapa.ativaScielo("scielo");
				objmapa.ativaConfluence("confluence");
				objmapa.ativaZoomtot("zoomtot");
				objmapa.ativaZoomli("zoomli");
				objmapa.ativaPan("pan");
				objmapa.ativaZoomiauto("zoomiauto");
				objmapa.ativaZoomoauto("zoomoauto");
				objmapa.ativaIdentifica("identifica");
				objmapa.ativaLente("lentei");
				objmapa.ativaExten("exten");
				objmapa.ativaReferencia("referencia");
				objmapa.ativaEscalanum("escala");
				objmapa.ativaWiki("wiki");
				objmapa.ativaReinicia("reinicia");
				objmapa.ativaMede("mede");
				objmapa.ativaInserexy("inserexy");	
				objmapa.ativaInsereGrafico("inseregrafico");
				objmapa.ativaSelecao("selecao");
				objmapa.ativaTextofid("textofid");
				objmapa.ativa3D("v3d");
				objmapa.ativaImpressao("imprimir");
				objmapa.ativaVisual("visual");
				objmapa.ativaOndeEstou("ondeestou");
				ativaGuias();
				//esconde guias
				if(($i("encolheFerramentas")) && ($i("contemFerramentas")))
				{
					$i("encolheFerramentas").onclick = function()
					{docaguias();};
				}
				calcposf();           //calcula a posicao do mapa no browser
				g_leftinicial = imagemxi;
				if ($i("corpoMapa"))
				{
					$i("img").style.width=objmapa.w +"px";
					$i("img").style.height=objmapa.h +"px";
					$i("corpoMapa").style.width=objmapa.w +"px";
					$i("corpoMapa").style.height=objmapa.h +"px";
					$i("corpoMapa").style.clip = 'rect('+0+" "+(objmapa.w)+" "+(objmapa.h)+" "+0+')';
				}
				var temp = 0;
				if ($i("contemFerramentas")){temp = temp + parseInt($i("contemFerramentas").style.width);}
				if ($i("encolheFerramentas")){temp = temp + parseInt($i("encolheFerramentas").style.width);}
				if ($i("ferramentas")){temp = temp + parseInt($i("ferramentas").style.width);}
				$i("mst").style.width=objmapa.w + temp + "px";
				$i("contemImg").style.height=objmapa.h + "px";
				$i("contemImg").style.width=objmapa.w + "px";
				calcposf();
				//reposiciona a janela de botoes
				if(navn){var desloca = 40;}else{var desloca = 40;}
				if ($i("maisBotoes1")){YAHOO.janelaBotoes1.xp.panel.moveTo(imagemxi+desloca,imagemyi+10);}
				if ($i("maisBotoes2")){YAHOO.janelaBotoes2.xp.panel.moveTo(imagemxi,imagemyi+10);}
				mudaiconf("pan"); //inicia no icone de zoom por box
				if (g_entorno == "sim")
				{
					geraURLentorno();
					var letras=["L","O","N","S"];
					for (l=0;l<letras.length; l++)
					{
						if ($i("img"+letras[l]))
						{
							$i("img"+letras[l]).style.width = objmapa.w;
							$i("img"+letras[l]).style.height = objmapa.h;
							$i("img"+letras[l]).style.display = "block";
						}
					}
					ajustaEntorno();
				}
				autoRedesenho("ativa");
			}
			else
			{alert("Erro. Impossivel criar o mapa "+retorno.data);return;}
			//ativa a guia correta
			var temp = g_guiaativa.split("guia");
			mostraguiaf(temp[1]);
			//verifica se a guia5 (mapas) deve ou n�o ser mostrada
			if ($i(objmapa.guiaListaMapas))
			{
				if (g_locmapas == ""){$i(objmapa.guiaListaMapas).style.display = "none"}
			}
			if (pCookie("g_janelaMen")){g_janelaMen = pCookie("g_janelaMen");}
			if (g_janelaMen == "sim"){initJanelaMen();}
			if (pCookie("g_mapaRefDisplay")){g_mapaRefDisplay = pCookie("g_mapaRefDisplay");}
			if (g_mapaRefDisplay == "block"){initJanelaRef();}
			if($i("img")){g_quadrooriginal = $i("img").src;}
			objaguarde.fecha("montaMapa");
			if (g_docaguias == "sim"){docaguias();}
			if (document.getElementById("botao3d"))
			{
				if (g_3dmap == ""){document.getElementById("botao3d").style.display="none";}
			}
		}
		rebobinaf();
	};
	/*
	Function: ativaVisual
	
	Ativa os �cones de escolha do visual do mapa.
	
	Parameters:
	
	id - id do elemento	
	*/
	this.ativaVisual = function(visual)
	{
		//verifica se o elemento existe
		if ($i(visual))
		{
			if (objmapa.listavisual != "")
			{
				var l = objmapa.listavisual.split(",");
				var visuais = "";
				for (li=0;li<l.length; li++)
				{
					visuais += "<img title='muda visual - "+l[li]+"' style=cursor:pointer onclick='mudaVisual(\""+l[li]+"\")' src='"+g_locaplic+"/imagens/visual/"+l[li]+".png' />&nbsp;";
				}
				$i(visual).innerHTML = visuais;
			}
		}
	};
	/*
	Function: ativaLocallizarXY
	
	Insere a op��o de localiza��o de coordenadas.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/
	this.ativaLocallizarXY = function(id)
	{
		if ($i(id))
		{
			$i(id).innerHTML = "localiza X:<input class=digitar id='xg' title='grau' type=text size=5 value='-00'/>&nbsp;<input class=digitar id='xm' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='xs' title='segundo' type=text size=5 value='00.00'/>&nbsp;&nbsp;Y:<input class=digitar id='yg' title='grau' type=text size=3 value='-00'/>&nbsp;<input class=digitar id='ym' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='ys' title='segundo' type=text size=5 value='00.00'/><img  title='zoom' onclick='zoomPonto()' src="+$im("tic.png") +" id=procurarxy />";
			$i(id).onmouseover = function(){mostradicasf(this,'Digite as coordenadas de um ponto (X=longitude e Y=latitude) para localiz&acute;-lo no mapa. O centro do mapa ser&acute; deslocado para o ponto digitado.','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaBuscaRapida
	
	Insere a op��o de busca r�pida.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaBuscaRapida = function (id)
	{
		if($i(id))
		{
			var ins = "<input onclick='javascript:this.value=\"\"' id=valorBuscaRapida title='digite o texto para busca' type=text size=30 class=digitar value='busca r&aacute;pida...' />";
			ins += "<img  src='"+g_locaplic+"/imagens/tic.png' onclick='buscaRapida()' />";
			$i(id).innerHTML = ins;
		}
	};
	/*
	Function: ativaListaPropriedades
	
	Mostra a lista de propriedades do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaListaPropriedades = function(id)
	{
		if ($i(id))
		{
			var lista = {
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
			listaPr = new Object();
			listaPr = treeviewNew("listaPr", "default", id, null);
			listaPr.createItem("propriedadesRaiz", "<b>Propriedades do mapa</b>", g_locaplic+"/imagens/visual/"+g_visual+"/foldermapa1.gif", true, false, true, null);
			var im = "";
			if (navn)
			{var im = "<img src='"+g_locaplic+"/imagens/branco.gif' width=0 height=13 />";}
			for (l=0;l<lista.propriedades.length; l++)
			{
				tnome = "<span onclick='"+lista.propriedades[l].url+"'>"+im+"<img  src='"+g_locaplic+"/imagens/visual/"+g_visual+"/tic.png' />&nbsp;"+lista.propriedades[l].text+" </span>";
				listaPr.createItem("propriedadesMapa"+l, tnome, imgBranco, false, true, false, "propriedadesRaiz");
			}
			listaPr.createItem("","", imgBranco, false, true, false, "propriedadesRaiz");				
		}
	};
	/*
	Function: ativaRealce
	
	Ativa o bot�o que realiza o realce de um tema.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaRealce = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function realcaAtiva()
			{
				if (!$i("areaRealce"))
				{
					var novoel = document.createElement("div");
					novoel.id = 'areaRealce';
					novoel.style.display="none";
					document.body.appendChild(novoel);
					if (navm)
					{
						$i("areaRealce").style.filter = "alpha(opacity=20)";
					}
				}
				if (g_realca == "sim")
				{
					g_realca = "nao";
					$i("areaRealce").style.display = "none";
					$i(id).style.borderWidth=0;
					$i(id).style.borderColor='red';
				}
				else
				{
					g_realca = "sim";
					$i("areaRealce").style.display = "block";
					$i(id).style.borderWidth=1;
					$i(id).style.borderColor='red';
				}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Ativa/desativa &aacute;rea de destaque no mapa','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaGoogle
	
	Ativa o bot�o que realiza a opera��o de de busca no Google.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaGoogle = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick= function google()
			{
				//div para google
				if (!$i("boxg"))
				{
					var novoel = document.createElement("div");
					novoel.id = "boxg";
					novoel.style.zIndex=1;
					novoel.innerHTML = '<font face="Arial" size=0></font>';
					novoel.onmouseover = function(){$i("boxg").style.display="none";};
					document.body.appendChild(novoel);
				}
				g_operacao = "navega";
				wdocaf("340px","340px",g_locaplic+"/ferramentas/googlemaps/index.htm","","","Google maps");
			};
			$i(id).onmouseover=function(){mostradicasf(this,'Abre o Google Maps, mostrando uma imagem de sat&eacute;lite da regi&atilde;o vista no mapa principal.','google');};
			$i(id).onmouseout=function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaScielo
	
	Ativa o bot�o que realiza a opera��o de de busca no site Scielo.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaScielo = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick= function scielo()
			{
				g_operacao = "navega";
				wdocaf("450px","190px",g_locaplic+"/ferramentas/scielo/index.htm","","","Scielo");
			};
			$i(id).onmouseover=function(){mostradicasf(this,'Pesquisa documentos na base de dados Scielo (dados preliminares)','scielo');};
			$i(id).onmouseout=function(){mostradicasf(this,'');};
		}	
	};
	/*
	Function: ativaConfluence
	
	Ativa o bot�o que realiza a opera��o de de busca no site confluence.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaConfluence = function(id)
	{	
		if ($i(id))
		{
			$i(id).onclick= function confluence()
			{
				g_operacao = "navega";
				wdocaf("250px","190px",g_locaplic+"/ferramentas/confluence/index.htm","","","confluence");
				if (!$i("boxg"))
				{
					var novoel = document.createElement("div");
					novoel.id = "boxg";
					novoel.style.zIndex=5000;
					novoel.innerHTML = '<font face="Arial" size=0></font>';
					document.body.appendChild(novoel);
				} 
			};
			$i(id).onmouseover=function(){mostradicasf(this,'Projeto Confluence. Pontos de intersec&ccedil;&atilde;o de coordenadas observadas em campo.','confluence');};
			$i(id).onmouseout=function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomtot
	
	Ativa o bot�o que realiza a opera��o de zoom para a extens�o total do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaZoomtot = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function (){zoomtot();};
			$i(id).onmouseover = function(){mostradicasf(this,'Altera a escala do mapa ajustando-a para mostrar a mesma abrang&circ;ncia geogr&aacute;fica da inicializa&ccedil;&atilde;o.','geral');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomli
	
	Ativa o bot�o que realiza a opera��o de zoom interativo.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaZoomli = function (id)
	{
		if ($i(id))
		{
			$i(id).onclick =function(){mudaiconf("zoomli");g_operacao="navega";};
			$i(id).onmouseover = function(){mostradicasf(this,'Amplia o mapa - coloca o ponto clicado no centro da tela ou amplia a regi&atilde;o indicada por um ret&acirc;ngulo.Ap&oacute;s ativada, clique e arraste o mouse sobre o mapa na &aacute;rea de zoom desejada.','zoomli');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaPan
	
	Ativa o bot�o que realiza a opera��o de deslocamento (pan).
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaPan = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick =function(){mudaiconf("pan");g_tipoacao = "pan";g_operacao="navega";};
			$i(id).onmouseover = function(){mostradicasf(this,'Desloca a regi&atilde;o vis&iacute;vel no mapa. Ap&oacute;s ativada, clique e arraste o mouse sobre o mapa para deslocar a regi&atilde;o vis&iacute;vel.','pan');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomiauto
	
	Ativa o bot�o que realiza a opera��o de zoom in.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaZoomiauto = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function() {zoomiauto();};
			$i(id).onmouseover = function(){mostradicasf(this,'Amplia o mapa tendo como refer&ecirc;cia o centro atual.','zoomiauto');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomoauto
	
	Ativa o bot�o que realiza a opera��o de zoom out.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaZoomoauto = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function(){zoomoauto();};
			$i(id).onmouseover = function(){mostradicasf(this,'Reduz o mapa tendo como refer&ecirccia o centro atual.','zoomoauto');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaIdentifica
	
	Ativa o bot�o que abre a fun��o de identifica��o.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/
	this.ativaIdentifica = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function()
			{
				mudaiconf("identifica");
				g_operacao="identifica";
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Mostra informa&ccedil;&otilde;es sobre um ponto no mapa. Ap&oacute;s ativada, pare o mouse por alguns instantes no ponto desejado ou clique sobre o mesmo.','identifica');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaLente
	
	Ativa o bot�o que abre a lente de aumento.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaLente = function(id)
	{	
		if ($i(id))
		{
			$i(id).onclick = function lentei()
			{
				//insere lente de aumento
				if (!$i("lente"))
				{
					var novoel = document.createElement("div");
					novoel.id = 'lente';
					novoel.style.clip='rect(0px,0px,0px,0px)';
					var novoimg = document.createElement("img");
					novoimg.src="";
					novoimg.id='lenteimg';
					novoel.appendChild(novoimg);
					document.body.appendChild(novoel);
					var novoel = document.createElement("div");
					novoel.id = 'boxlente';
					document.body.appendChild(novoel);
				}
				with($i(id).style){borderWidth='1' + g_postpx;borderColor="red";}
				if (g_lenteaberta == "sim")
				{
					$i("lente").style.display = "none";
					$i("boxlente").style.display = "none";
					$i(id).style.borderWidth = 0;
					g_lenteaberta = "nao";
				}
				else
				{
					g_lenteaberta = "sim";
					objaguarde.abre("ajaxabrelente","Aguarde...");
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid;
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_response_type("JSON");
					cp.call(p,"lente",ajaxabrelente);
				}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Abre lente de amplia&ccedil;&atilde;o','lente');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaExten
	
	Ativa o bot�o que abre a janela com o mapa de refer�ncia.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/
	this.ativaExten = function (id)
	{
		if ($i(id))
		{
			$i(id).onclick = function(){mensagemf(objmapa.extent);};
			$i(id).onmouseover = function(){mostradicasf(this,'Mostra a extens&atilde;o geogr&aacute;fica atual em coordenadas geogr&aacute;ficas.','extensao');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaReferencia
	
	Ativa o bot�o que abre a janela com o mapa de refer�ncia.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o
	*/
	this.ativaReferencia = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function(){initJanelaRef();};
			$i(id).onmouseover = function(){mostradicasf(this,'Abre/fecha o mapa de refer&ecirc;ncia','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaEscalanum
	
	Ativa a apresenta��o da escala num�rica.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/	
	this.ativaEscalanum = function(id)
	{
		if($i(id))
		{
			$i(id).innerHTML = "1:<input class='digitar' type='text' onchange='javascript:aplicaescala()' id=escalanum size=19 value=''/><img src=\""+g_localimg+"/tic.png\" onclick='javascript:aplicaescala()' />";
			$i("escalanum").onmouseover = function(){mostradicasf(this,'Digite o novo valor de escala e clique no bot&atilde;o aplicar para alterar a escala do mapa.','escala');};
			$i("escalanum").onmouseout = function(){mostradicasf(this,'');};
			if ($i("escalanum")){$i("escalanum").value = this.scale;}
		}
	};
	/*
	Function: ativaWiki
	
	Ativa o bot�o de busca na wikipedia.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaWiki = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick= function wiki()
			{
				g_operacao = "navega";
				wdocaf("450px","190px",g_locaplic+"/ferramentas/wiki/index.htm","","","Wiki");
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Busca dados na Wikipedia na abrang&ecirc;ncia atual do mapa. Fa&ccedil;a um zoom no mapa antes de abrir essa op&ccedil;&atilde;o. Regi&ocirc;es muito extensas podem tornar a busca muito demorada.','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaReinicia
	
	Ativa o bot�o de reinicializa��o do mapa que restaura as condi��es iniciais do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaReinicia = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick =function()
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=reiniciaMapa&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2);
				cp.set_response_type("JSON");
				cp.call(p,"reiniciaMapa",ajaxredesenha);
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Redesenha o mapa com as configura&ccedil;&ocirc;es iniciais.','redesenha');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaMede
	
	Ativa o bot�o de medi��o de dist�ncias.
	
	A medida � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.
	
	Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaMede = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function mede()
			{
				//insere div para medida de distancias
				if (!$i("mostradistancia"))
				{
					var novoel = document.createElement("div");
					novoel.id = "mostradistancia";
					novoel.style.display="none";
					novoel.style.position="absolute";
					novoel.style.zIndex=5000;
					novoel.style.height="50px";
					novoel.style.border="1px solid black";
					novoel.style.padding="5px";
					var calculo = document.createElement("div");
					calculo.id = "mostradistancia_calculo";
					novoel.appendChild(calculo);
					var divin = document.createElement("div");
					divin.innerHTML = "<span style='color:navy;cursor:pointer' onclick='javascript:richdraw.fecha()' >Parar de medir</span>";
					novoel.appendChild(divin);				
					document.body.appendChild(novoel);
				}
				if (g_tipoacao != "mede")
				{
					mudaiconf("mede");
					pontosdistobj = new pontosdist();
					$i("mostradistancia").style.display="block";
					//
					//verifica se existe o div para incluir as geometrias tempor�rias via svg ou vml
					//
					if (!$i("divGeometriasTemp"))
					{
						var novoel = document.createElement("div");
						novoel.id = "divGeometriasTemp";
						novoel.style.cursor="crosshair";
						novoel.style.zIndex=0;
						novoel.style.position="absolute";
						novoel.style.width=objmapa.w;
						novoel.style.height=objmapa.h;
						novoel.style.border="1px solid black";
						novoel.style.display="none";
						novoel.style.top=imagemyi;
						novoel.style.left=imagemxi;
						document.body.appendChild(novoel);
					}
					if ($i("divGeometriasTemp"))
					{
			    		var renderer;
			    		if (navn) {renderer = new SVGRenderer();}
    					else {renderer = new VMLRenderer();}
			    		richdraw = new RichDrawEditor(document.getElementById('divGeometriasTemp'), renderer);
    					richdraw.editCommand('fillcolor', 'red');
    					richdraw.editCommand('linecolor', 'black');
    					richdraw.editCommand('linewidth', '1px');
			    		richdraw.editCommand('mode', 'line');
			    		$i("divGeometriasTemp").style.display="block";
					}
					if(navn){ativaClicks($i("divGeometriasTemp"));}
				}
				else
				{
					richdraw.fecha();
					mudaiconf("pan");
					limpacontainerf(); //tira os pontos da tela
					$i("mostradistancia").style.display="none";
				}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Mede a dist&acirc;ncia entre dois ou mais pontos clicados no mapa (menor dist&acirc;ncia). O c&aacute;lculo de dist&acirc;ncia &eacute; aproximado e sua precis&atilde;o depende da escala do mapa.','mede');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaInserexy
	
	Ativa o bot�o de inser��o de pontos (digitaliza��o).
	
	A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaInserexy = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function inserexy()
			{
				if (g_tipoacao != "inserexy")
				{
					var temp = Math.random() + "a";
					temp = temp.split(".");
					g_nomepin = "pin"+temp[1];
					mudaiconf("inserexy");
					pontosdistobj = new pontosdist();
					wdocaf("400px","300px",g_locaplic+'/ferramentas/inserexy2/index.htm',"","","Insere");
				}
				else
				{mudaiconf("pan");}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Insere pontos no mapa em coordenadas geogr&aacute;ficas. Os pontos inclu&iacute;dos podem ser transformados em linhas ou pol&iacute;gonos. Os pontos s&atilde;o armazenados em um tema tempor&aacute;rio, podendo-se fazer o download do arquivo shapefile.','inserexy');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaInsereGrafico
	
	Ativa o bot�o de inser��o de gr�ficos.
	
	A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaInsereGrafico = function(id)
	{
		//insere grafico
		if ($i(id))
		{
			$i(id).onclick = function inseregrafico()
			{
				if (g_tipoacao != "inseregrafico")
				{
					var temp = Math.random() + "gr";
					temp = temp.split(".");
					g_nomepin = "pin"+temp[1];
					mudaiconf("inseregrafico");
					wdocaf("400px","300px",g_locaplic+'/ferramentas/inseregrafico/index.htm',"","","Insere");
				}
				else
				{mudaiconf("pan");}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Insere um gr&aacute;fico no ponto clicado conforme os atributos existentes no tema escolhido. O tema deve possuir itens com valores num&eacute;ricos na tabela de atributos.','inseregrafico');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaSelecao
	
	Ativa o bot�o de sele��o.
	
	A sele��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaSelecao = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function selecao()
			{
				if (g_tipoacao != "selecao")
				{
					g_tipoacao = "selecao";
					mudaiconf("selecao");
					pontosdistobj = new pontosdist();
					objmapa.temaAtivo = "";
					wdocaf("360px","320px",g_locaplic+'/ferramentas/selecao/index.htm',"","","Sele&ccedil;&atilde;o");
				}
				else
				{mudaiconf("pan");}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Abre as ferramentas para sele&ccedil;&atilde;o de elementos de um tema. Os elementos selecionados podem ser utilizados em outras opera&ccedil;&ocirc;es, como buffer e sele&ccedil;&atilde;o por tema.','selecao');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaTextoFid
	
	Ativa o bot�o de inser��o de topon�mia.
	
	A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaTextofid = function(id)
	{
		if ($i("textofid"))
		{
			$i("textofid").onclick = function textofid()
			{
				if (g_tipoacao != "textofid")
				{
					var temp = Math.random() + "b";
					temp = temp.split(".");
					g_nomepin = "pin"+temp[1];
					mudaiconf("textofid");
					pontosdistobj = new pontosdist();
					g_tipoacao = "textofid";
					wdocaf("350px","200px",g_locaplic+"/ferramentas/inseretxt/index.htm","","","Texto");
				}
				else
				{mudaiconf("pan");}
			};
			$i("textofid").onmouseover = function(){mostradicasf(this,'Insere um texto no mapa clicando no ponto desejado no mapa. Utilize essa op&ccedil;&atilde;o para adicionar informa&ccedil;&ocirc;es ao mapa.','inseretxt');};
			$i("textofid").onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativa3d
	
	Ativa a funcionalidade do bot�o 3d.
	
	O bot�o 3d abre a op��o de gera��o de um modelo virtual de eleva��o.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativa3D = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function v3d()
			{wdocaf("400px","200px",g_locaplic+"/ferramentas/3d/index.htm","","","3d");};
			$i(id).onmouseover = function(){mostradicasf(this,'Gera arquivo para 3d','3d');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaImpress�o
	
	Ativa o bot�o de impress�o do mapa.
	
	O bot�o de impress�o abre as op��es para impress�o do mapa atual.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaImpressao = function(id)
	{	
		if ($i(id))
		{
			$i(id).onclick = function imprimir()
			{wdocaf("320px","180px",g_locaplic+"/ferramentas/imprimir/index.htm","","","Imprimir");};
			$i(id).onmouseover = function(){mostradicasf(this,'Imprime o mapa','imprimir');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaOndeEstou
	
	Ativa o bot�o de localiza��o do usu�rio pelo IP.
	
	Essa op��o s� � ativada se a vari�vel objmapa.geoip for igual a "sim" e se existir o div com id=ondeestou.
	
	O valor dessa vari�vel � obtida na inicializa��o.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaOndeEstou = function(id)
	{	
		if ($i(id))
		{
			if (objmapa.geoip == "nao")
			{$i(id).style.display="none";}
			else
			{
				$i(id).onclick = function(){zoomIP();};
				$i(id).onmouseover = function(){mostradicasf(this,'Localiza o IP do usuario no mapa','');};
				$i(id).onmouseout = function(){mostradicasf(this,'');};
			}
		}
	};	
	/*
	Function: criaEscalaGrafica
	
	Cria a escala gr�fica como um lemento HTML se existir o id escalaGrafica
	*/
	this.criaEscalaGrafica = function()
	{
		if ( ($i("escalaGrafica")) && (!$i("imagemEscalaGrafica")) )
		{$i("escalaGrafica").innerHTML = "<img src=\""+g_localimg+"/icon_menuarrow.gif\" title='op&ccedil;&otilde;es' onclick='opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />";}
	};
	/*
	Function: atualizaEscalaGrafica
	
	Atualilza a escala gr�fica
	*/
	this.atualizaEscalaGrafica = function()
	{
		if ($i("escalaGrafica"))
		{
			//objaguarde.abre("ajaxEscalaGrafica","Aguarde...criando escala gr&aacute;fica");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=escalagrafica&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"retornaBarraEscala",ajaxEscalaGrafica);
		}
	};
	/*
	Function: atualizaReferencia
	
	Atualiza o mapa de refer�ncia
	
	Parameters:
	
	mapexten - extens�o geogr�fica
	*/
	this.atualizaReferencia = function(mapexten)
	{
		//
		//se houve altera��o na extens�o, � preciso refazer o mapa de refer�ncia
		//se n�o, a imagem atual � armazenada no quado de anima��o
		//
		if ($i("mapaReferencia") && objmapa.extent != mapexten)
		{
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=referencia&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2);
			cp.set_response_type("JSON");
			cp.call(p,"retornaReferencia",ajaxReferencia);
		}
		else
		{
			if($i("imagemReferencia"))
			gravaQuadro("referencia",$i("imagemReferencia").src);
		}		
	};
	/*
	Function: atualizaLegendaHTML
	
	Atualiza a legenda, em HTML, nos ids legenda e moveLegi
	*/
	this.atualizaLegendaHTML = function()
	{
		if  (($i("moveLegi")) || ($i("legenda") && $i(objmapa.guiaLegenda+"obj") && $i(objmapa.guiaLegenda+"obj").style.display == "block"))
		{
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"criaLegenda",ajaxLegendaHTML);
		}
	};
	/*
	Function: atualizaLegendaImagem
	
	Atualiza a legenda no formato de uma imagem
	*/
	this.atualizaLegendaImagem = function()
	{
		if ($i("legenda"))
		{
			//objaguarde.abre("ajaxLegenda","Aguarde...atualizando a legenda");
			var p =g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaImagem&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"legendaGrafica",ajaxLegendaImagem);
		}
	};
	/*
	Function: atualizaListaTemas
	
	Atualiza a lista de temas dispon�veis no mapa (guia com a lista de temas)
	
	Parameters:
	
	temas - lista de temas. Se vazio, utiliza o objeto objmapa.temas
	*/
	this.atualizaListaTemas = function(temas)
	{
		if (($i("listaTemas")) && (objmapa.temas != temas))
		{
			$i("listaTemas").innerHTML = "";
			var lista = temas.split(";");
			mytreeview1 = new Object();
			mytreeview1 = treeviewNew("mytreeview1", "default", "listaTemas", null);
			var titulo = "<b>Camadas</b><img id='lixeira' style='position:relative;top:5px' title='arraste o tema aqui para excluir'  src='"+$im("gnome-fs-trash-full.png")+"' />";
			mytreeview1.createItem("g1",titulo, g_locaplic+"/imagens/foldermapa.gif", true, true, true, null);
			mytreeview1.itemExpand = expandeTema;
			var cor = "rgb(250,250,250)";
			//codigo,status,nome,transparencia,tipo,selecao,escala,download,tem features,conexao,tem wfs
			for (l=0;l<lista.length; l++)
			{
				var ltema = lista[l].split("*");
				var ck = "";
				if(ltema[1] == 2){ck = 'CHECKED';}
				//ltema[8]==sim indica que e um tema com features
				if (ltema[8] == undefined){ltema[8] = "nao";}
				tnome = "<input class=inputsb style='cursor:pointer' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n&atilde;o no mapa. Ap&oacute;s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot&atilde;o aplicar que ser&aacute; mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" type='checkbox' name=\"layer\" value='"+ltema[0]+"' "+ ck +" onclick='mudaboxnf(\"ligadesliga\")'/>";
				if (ltema[5] == "sim") //o tema tem selecao
				{tnome += "&nbsp;<img src="+$im("estasel.png")+" title='limpa sele&ccedil;&atilde;o' onclick='limpaseltemaf(this)' onmouseover=\"javascript:mostradicasf(this,'Limpa sele&ccedil;&atilde;o existente nesse tema','limpasel')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				//verifica se e um wms que tem wfs
				if ((ltema[10] == "sim") || (ltema[10] == "SIM"))
				{tnome += "&nbsp;<img src="+$im("down1.gif") +" title='download' onclick='download(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para fazer o download desse tema no formato shapefile','download')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				if ((ltema[7] == "sim") || (ltema[7] == "SIM"))
				{tnome += "&nbsp;<img src="+$im("down1.gif") +" title='download' onclick='download(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para fazer o download desse tema no formato shapefile','download')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				if (navm)
				{tnome += "<span title=1clique e arraste' style='background-color:"+cor+"' id=nometema"+ltema[0]+">&nbsp;" + ltema[2]+"</span>";}
				else
				{tnome += "<span title='arraste para mudar a ordem' style='background-color:"+cor+"' id=nometema"+ltema[0]+">&nbsp;" +"<img src='"+g_locaplic+"/imagens/branco.gif' width=0 height=15 />" +ltema[2]+"</span>";}
				mytreeview1.createItem(ltema[0], tnome, null, true, true, true, "g1");
				tnome = "<img width=0px src="+$im("branco.gif") + " />";
				mytreeview1.createItem("", tnome, imgBranco, false, true, false, ltema[0]);
				if (cor == "rgb(250,250,250)"){var cor = "none";}
				else
				{var cor = "rgb(250,250,250)";}
			}
		}
		ativaDragDrop();
	};
	/*
	Function: atualizaFarol
	
	Atualiza o farol de cada tema.
	
	O farol identifica a compatibilidade da escala do mapa com a escala de cada tema
	
	Parameters:
	
	mapscale - escala de compara��o com a escala de cada tema
	*/
	this.atualizaFarol = function(mapscale)
	{
		//mapscale � o valor da escala do novo mapa
		if (objmapa.scale != mapscale)
		{
			var lista = (objmapa.temas).split(";");
			var farol = "maisamarelo.png";
			for (l=0;l<lista.length; l++)
			{
				var ltema = lista[l].split("*");
				if (ltema[6]*1 < mapscale*1)
				{var farol = "maisverde.png";}
				if (ltema[6]*1 > mapscale*1)
				{var farol = "maisvermelho.png";}
				if (ltema[6]*1 == 0)
				{var farol = "maisamarelo.png";}
				if ($i("farol"+ltema[0]))
				{
					$i("farol"+ltema[0]).src = g_locaplic+"/imagens/"+farol;
				}
			}
		}
	};
	/*
	Function: criaCorpoMapa
	
	Cria os objetos para preenchimento com a imagem do corpo do mapa.
	
	*/
	this.criaCorpoMapa = function()
	{
		if ($i("corpoMapa"))
		{
			var ins = "<table>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgN' /></td><td class=verdeclaro ></td></tr>";
			ins += "<tr><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgL' /></td><td class=verdeclaro ><input style='position:relative;top:0px;left:0px'' type=image src='' id='img' /></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgO' /></td></tr>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgS' /></td><td class=verdeclaro ></td></tr>";
			ins += "</table>";
			$i("corpoMapa").innerHTML = ins;
		}
		//insere a figura que segue o mouse
		var novoel = document.createElement("div");
		novoel.style.zIndex=1000;
		novoel.id="obj";
		var novoimg = document.createElement("img");
		novoimg.src= g_locaplic+"/imagens/pan.gif";
		novoimg.name="imgh";
		novoimg.id='imgh';
		novoimg.style.width = "15px";
		novoimg.style.height = "15px";
		novoel.appendChild(novoimg);
		novoel.onmouseover = function()
		{this.style.display = "none";};
		novoel.onmouseout = function()
		{this.style.display = "block";};
		document.body.appendChild(novoel);
		var docMapa = "";
		if (document.getElementById("openlayers_OpenLayers_Container"))
		{
			var docMapa = $i("openlayers_OpenLayers_Container");
		}
		if (document.getElementById("img"))
		{
			var docMapa = $i("img");
			//insere box de zoom
			var novoel = document.createElement("div");
			novoel.style.width = "0px";
			novoel.style.height = "0px";
			novoel.id = "box1";
			document.body.appendChild(novoel);
			if (navm)
			{
				$i("box1").style.filter = "alpha(opacity=25)";
			}
			$i("box1").onmousemove = function()
			{
				var wb = parseInt($i("box1").style.width);
				var hb = parseInt($i("box1").style.height);
				if (navn)
				{
					with(this.style){width = wb - 10 + "px";}
					with(this.style){height = hb - 10 + "px";}
				}
				if (navm)
				{
					$i("box1").style.width = wb - 2;
					$i("box1").style.height = hb - 2;
				}
			};
			$i("box1").onmouseup = function(){zoomboxf("termina")};
			//funcoes que operam sobre o mapa
			this.parado = "nao"; //utilizado para verificar se o mouse esta parado
		}
		if (docMapa != "")
		{
			ativaClicks(docMapa);
		}
		this.atualizaCorpoMapa = function()
		{
			objaguarde.abre("ajaxCorpoMapa","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=corpo&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"redesenhaCorpo",ajaxCorpoMapa);
		};
		if (objmapa.finaliza)
		{eval(objmapa.finaliza);}
		//
		//altera o tamanho das guias
		//
		if ($i(objmapa.guiaTemas+"obj"))
		{
			$i(objmapa.guiaTemas+"obj").style.overflow="auto";
			$i(objmapa.guiaTemas+"obj").style.height = objmapa.h-13;
		}
		if ($i(objmapa.guiaMenu+"obj"))
		{
			$i(objmapa.guiaMenu+"obj").style.overflow="auto";
			$i(objmapa.guiaMenu+"obj").style.height = objmapa.h-13;
			$i(objmapa.guiaMenu+"obj").style.width = "100%";
		}
		if ($i(objmapa.guiaLegenda+"obj"))
		{
			$i(objmapa.guiaLegenda+"obj").style.overflow="auto";
			$i(objmapa.guiaLegenda+"obj").style.height = objmapa.h-13;
			$i(objmapa.guiaLegenda+"obj").style.width = "100%";
		}
	};
	/*
	Function: verificaClickMapa
	
	Verifica se existem fun��es adicionais que devem ser executadas quando o usu�rio clica no mapa.
	*/
	this.verificaClickMapa = function()
	{
		if (this.funcoesClickMapa.length > 0)
		{
			for (f=0;f<this.funcoesClickMapa.length; f++)
			{
				eval(this.funcoesClickMapa[f]);
			}
		}
	};
}