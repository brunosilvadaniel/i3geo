/*
Title: configura.js

Defini��o das vari�veis de configura��o da interface.

Aqui � feita a defini��o dos t�rmos utilizados nos v�rios idiomas suportados pelo i3geo, defini��o dos
valores padr�o das vari�veis de configura��o, defini��o do conte�do do menu suspenso, defini��o das fun��es
que s�o executadas quando determinados eventos ocorrem, defini��o das funcionalidades dos bot�es, etc. 

O I3Geo utiliza vari�veis (veja o item espec�fico na documenta��o) globais que possibilitam 
alterar algumas das caracter�sticas da interface.
Essas vari�veis recebem valores default quando o I3Geo � iniciado mas podem ser alterados 
antes da inicializa��o do mapa (m�todo objmapa.inicializa()).
No arquivo aplicmapa/geral.htm existem exemplos de como fazer isso.
As vari�veis globais podem tamb�m ser alteradas em tempo de execu��o.

Pode-se criar interfaces espec�ficas com o i3geo onde essas vari�veis s�o modificadas para atender
uma necessidade espec�fica. Uma interface � um arquivo HTML que pode ser inicializado diretamente no navegador.
Veja o diret�rio i3geo/exemplos onde podem ser encontradas algumas interfaces.

Exemplo:

g_janelaMen = "nao"

objmapa = new Mapa()

objmapa.inicializa()

File: i3geo/classesjs/configura.js

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
Section: Vari�veis de configura��o
*/
/*
Variable: g_templateLegenda

Template HTML que ser� utilizado na gera��o da legenda HTML.

A sintaxe utilizada na montagem do template � baseado na sintaxe do pr�prio Mapserver.
O HTML pode ser armazenado em i3geo/aplicmap ou em um outro endere�o no servidor.
O template serve para definir o layout da legenda que � mostrada quando a guia legenda � ativada.
Se for definido como "", � utilizado o template i3geo/aplicmapa/legenda.htm.
*/
g_templateLegenda = "";
/*
Variable: g_posicaoLenteX

Define o posicionamento da lente de aumento em rela��o ao corpo do mapa.

Veja:

<redesenho.js>
*/
g_posicaoLenteX = 0;
/*
Variable: g_posicaoLenteY

Define o posicionamento da lente de aumento em rela��o ao corpo do mapa.

Veja:

<redesenho.js>

*/
g_posicaoLenteY = 0;
/*
Variable: g_autoRedesenho

Ativa o auto redesenho do mapa conforme o intervalo de tempo definido em segundos.

Ap�s decorrido o tempo definido, o mapa � redesenhado. Se for 0 o temporizador n�o � ativado.

Veja:

<funcoes.js>
*/
g_autoRedesenho = 0;
/*
Variable: g_tempo_aplicar (depreciado)
*/
/*
Variable: g_embedLegenda

Indica se a legenda deve ser incluida no corpo do mapa.

Veja:

<iniciamma.js>

Values:

sim|nao

*/
g_embedLegenda = "nao";
/*
Variable: g_3dmap

Vari�vel que define o nome do map_file que possu� o layer para uso na fun��o 3d.
Pode ser utilizado o caminho completo, se n�o, busca no diret�rio aplicmap.

O mapfile deve conter um layer para c�lculo dos valores de Z para compor o modelo do relevo
sobre o qual o mapa ser� desenhado.

Por padr�o, o i3geo utiliza o mapfile aplicmpa/3dmap.map

Veja:

<ferramentas/3d/index.js>

*/
g_3dmap = "";
/*
Variable: g_docaguias

Vari�vel que define se o mapa deve iniciar com as guias em janela ou n�o. As guias em janela causam o desenho de um mapa com tamanho extendido.

Veja:

<iniciamma.js>

Values:

sim|nao
*/
g_docaguias = "nao";
/*
Variable: g_barraFerramentas1

Define se a barra de ferramentas 1 ser� aberta ou n�o no mapa.

Veja:

<iniciamma.js>

Values:

sim|nao
*/
g_barraFerramentas1 = "sim";
/*
Variable: g_barraFerramentas2

Define se a barra de ferramentas 2 ser� aberta ou n�o no mapa.

Veja:

<iniciamma.js>

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
Valores definidos em pixel.

Veja:

<iniciamma.js>
*/
g_diminuixM = 20;
/*
Variable: g_diminuixN

Diminui a largura do mapa em pixels no caso do navegador ser o FF.
Valores definidos em pixel.

Veja:

<iniciamma.js>
*/
g_diminuixN = 25;
/*
Variable: g_diminuiyM

Diminui a altura do mapa em pixels no caso do navegador ser o IE.
Valores definidos em pixel.

Veja:

<iniciamma.js>
*/
g_diminuiyM = 106;
/*
Variable: g_diminuiyN

Diminui a altura do mapa em pixels no caso do navegador ser o FF.
Valores definidos em pixel.

Veja:

<iniciamma.js>
*/
g_diminuiyN = 103;
/*
Variable: g_mapaRefDisplay

Indica a visibilidade do mapa de refer�ncia na inicializa��o

Veja:

<iniciamma.js>

Values:

block|none

*/
g_mapaRefDisplay = "block";
/*
Variable: g_funcaoTip

Fun��o ajax que ser� executada para mostrar informa��es em etiquetas.

A fun��o � executada pelo CPAINT e avaliada com "eval".

Por padr�o a fun��o � a verificaTipDefault. Vc pode especificar uma outra fun��o se for desejado.

Veja:

<funcoes.js>
*/
g_funcaoTip = "verificaTipDefault()";
/*
Variable: g_tipotip

Define como o tip ser� mostrado. O tipo simples mostra apenas os dados, sem o cabe�alho.

Veja:

<funcoes.js>

Values:

simples|completo
*/
g_tipotip = "completo";
/*
Variable: g_tipoimagem

Indica o tipo de filtro de imagem que est� ativo.
O filtro ativo � aplicado sobre a imagem toda a vez que o mapa � refeito.

Veja:

<funcoes.js>, <iniciamma.js>, <redesenho.js>
*/
g_tipoimagem = "nenhum";
/*
Variable: g_sistemas

Nome do arquivo xml com a lista de sistemas que ser�o mostrados na guia de adi��o de temas.
O valor dessa vari�vel � definido no arquivo "ms_configura.php" e � preenchida utilizando o ajax logo na inicializa��o do i3geo.
*/
g_sistemas = "";
/*
Variable: destacaTamanho

Valor em pixel do ret�ngulo de destaque de temas utilizado na ferramenta destacatema.

Veja:

<funcoes.js>
*/
destacaTamanho = 75;
/*
Variable: g_entorno

Indica se o preenchimento do entorno do mapa est� ou n�o ativo.
Utilizado para criar o efeito de auto-preenchimento do mapa quando � executada a fun��o pan.
� alterada em uma op��o espec�fica no menu suspenso.

Veja:

<funcoes.js>, <iniciamma.js>, <redesenho.js>

Values:

sim|nao
*/
g_entorno = "nao";
/*
Variable: g_guiaativa

Indica qual guia do mapa iniciar� ativa.

Veja:

<funcoes.js>, iniciamma.js>
*/
g_guiaativa = "guia1";
/*
Section: Eventos
*/
/*
Variable: g_funcoesClickMapaDefault

Nome das fun��es padr�o que ser�o executadas quando o usu�rio clicar no mapa.

As fun��es padr�o podem ser alteradas, por�m, pode-se acrescentar outras fun��es, al�m das padr�o, utilizando-se o objeto objmapa.funcoesClickMapa

Quando o usu�rio clica em um bot�o para ativar uma ferramenta, pode-se definir a vari�vel g_tipoacao e depois critic�-la na fun��o para saber qual opera��o deve ser executada.

Veja:

<iniciamma.js>
*/
g_funcoesClickMapaDefault = new Array(
	"cliqueSelecaoPoli()",
	"cliqueCapturaPt()"
);
/*
Variable: g_funcoesMousemoveMapaDefault

Nome das fun��es padr�o que ser�o executadas quando o usu�rio mover o mouse sobre o mapa.

As fun��es padr�o podem ser alteradas, por�m, pode-se acrescentar outras fun��es

Quando o usu�rio clica em um bot�o para ativar uma ferramenta, pode-se definir a vari�vel g_tipoacao e depois critic�-la na fun��o para saber qual opera��o deve ser executada.

Veja:

<iniciamma.js>
*/
g_funcoesMousemoveMapaDefault = new Array(
	"movePan()",
	"moveLonglat()",
	"moveSelecaoPoli()"
);
/*
Variable: g_funcoesNavegaMapaDefault

Nome das fun��es padr�o que ser�o executadas quando o usu�rio navegar pelo mapa.

Veja:

<iniciamma.js>
*/
g_funcoesNavegaMapaDefault = new Array(
	"atualizaEscalaNumerica()"
);
/*
Variable: g_listaPropriedades (depreciado)
*/
/*
Section: Funcionalidades
*/
/*
Variable: oMenuData

Itens inclu�dos no menu suspenso

Veja:

<iniciamma.js>, <menususpenso.js>

Par�metros:

text - texto que ser�mostrado na tela

url - fun��o que ser� executada
*/
oMenuData = {
	"ajudas": [ 
	{ text: $trad("u1"), url: "http://www.softwarepublico.gov.br/spb/ver-comunidade?community_id=1444332" },
	{ text: $trad("u2"), url: "javascript:abreDoc()" },
	{ text: $trad("u3"), url: "http://pt.wikibooks.org/wiki/I3geo" },
	{ text: $trad("u4"), url: "http://mapas.mma.gov.br/wikibooki3geo" },
	{ text: $trad("u5a"), url: "http://www.softwarepublico.gov.br" },
	{ text: "i3Geo Blog", url: "http://sistemas.mma.gov.br/blogs/index.php?blog=6" }
	],
	"analise": [
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u22")+'</b></span>',url: "#"}, 
	{ text: $trad("u7"), url: "javascript:gradePol()"},
	{ text: $trad("u8"), url: "javascript:gradePontos()" },
	{ text: $trad("u9"), url: "javascript:gradeHex()" },
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u23")+'</b></span>',url: "#"}, 
	{ text: $trad("u11a"), url: "javascript:distanciaptpt()" },
	{ text: $trad("u12"), url: "javascript:nptPol()" },
	{ text: $trad("u13"), url: "javascript:pontoempoligono()" },
	{ text: $trad("u14"), url: "javascript:pontosdistri()" },
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u24")+'</b></span>',url: "#"}, 
	{ text: $trad("u11"), url: "javascript:centroide()" },
	{ text: $trad("u25"), url: "javascript:dissolve()" },
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u27")+'</b></span>',url: "#"}, 
	{ text: $trad("u6"), url: "javascript:analisaGeometrias()" },
	{ text: $trad("u10"), url: "javascript:buffer()" },
	{ text: $trad("u26"), url: "javascript:agrupaElementos()" }
	]
};
oMenuData.janelas = [
	{ text: $trad("u15"), url: "javascript:initJanelaZoom('1');initJanelaZoom('2')" },
	{ text: $trad("u16"), url: "javascript:i3GEO.ajuda.abreJanela()" }        
	];
oMenuData.arquivo = [
	{ text: $trad("u17"), url: "javascript:salvaMapa()" },
	{ text: $trad("u18"), url: "javascript:carregaMapa()" },
	{ text: $trad("u19"), url: "javascript:i3GEO.gadgets.quadros.listaImagens()" },
	{ text: $trad("u20"), url: "javascript:convertews()" },
	//{ text: $trad("u20a"), url: "javascript:abreKml('mapfile')" },
	{ text: $trad("u21"), url: "../geradordelinks.htm" }
	];
/*
Variable: g_listaFuncoesBotoes

Objeto com a lista de funcionalidades que ser�o adicionadas ao mapa.

Essa lista pode ser modificada antes da inicializa��o do mapa.

A montagem das opera��es � feita no iniciamma.js.

As funcionalidades apenas s�o inclu�das se o elemento HTML indicado em iddiv existir. Por isso, caso uma fun��o n�o seja desejada, basta excluir o div do HTML utilizado no mapa.


Veja:

<iniciamma.js>

Par�metros:

iddiv - id do elemento onde a ferramenta ser� inclu�da

dica - dica de tela que ser� acrescentada ao evento onmouseover

conteudo - conteudo de iddiv que ser� acrescentado como innerHTML

funcaoonclick - funcao que ser� incluida no onclick

constroiconteudo - fun��o que ativar� a op��o. Essa op��o atua como a op��o conte�do, por�m, executa uma fun��o para preenchimento do div.

*/
g_listaFuncoesBotoes = {
	"botoes": [
	{
		//Insere a op��o de zoom anterior e posterior.
		iddiv:"historicozoom",
		tipo:"",
		dica:$trad("d1"),
		constroiconteudo:'ativaHistoricoZoom("historicozoom")'
	},
	{
		//Ativa o bot�o que realiza a opera��o de zoom para a extens�o total do mapa.
		iddiv:"zoomtot",
		tipo:"",
		dica:$trad("d2"),
		funcaoonclick:function(){
			i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,g_tipoimagem,objmapa.extentTotal);
			marcadorZoom = "";
		}
	},
	{
		//Ativa o bot�o que realiza a opera��o de zoom interativo.
		iddiv:"zoomli",
		tipo:"dinamico",
		dica:$trad("d3"),
		funcaoonclick:function(){
			g_operacao='navega';
			g_tipoacao='zoomli';
			i3GEO.barraDeBotoes.ativaIcone("zoomli");
			if($i("img")){
				$i("img").title = "";
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","img",i3GEO.configura.locaplic);
			}
			marcadorZoom = "";
		}
	},
	{
		//Ativa o bot�o que realiza a opera��o de deslocamento (pan).
		iddiv:"pan",
		tipo:"dinamico",
		dica:$trad("d4"),
		funcaoonclick:function(){
			g_tipoacao='pan';
			g_operacao='navega';
			i3GEO.barraDeBotoes.ativaIcone("pan");
			if($i("img")){
				$i("img").title = "";
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"pan","img",i3GEO.configura.locaplic);
			}
			marcadorZoom = "";
		}
	},
	{
		//bot�o que realiza a opera��o de zoom in.
		iddiv:"zoomiauto",
		tipo:"",
		dica:$trad("d5"),
		funcaoonclick:function(){
			i3GEO.navega.zoomin(i3GEO.configura.locaplic,i3GEO.configura.sid);
			marcadorZoom = "";
		}
	},
	{
		//bot�o que realiza a opera��o de zoom out
		iddiv:"zoomoauto",
		tipo:"",
		dica:$trad("d6"),
		funcaoonclick:function(){
			i3GEO.navega.zoomout(i3GEO.configura.locaplic,i3GEO.configura.sid);
			marcadorZoom = "";
		}
	},
	{
		//bot�o que abre a fun��o de identifica��o.
		iddiv:"identifica",
		tipo:"dinamico",
		dica:$trad("d7"),
		funcaoonclick:function()
		{
			if($i("img")){
				$i("img").title = "";
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"identifica","img",i3GEO.configura.locaplic);
			}
			i3GEO.barraDeBotoes.ativaIcone("identifica");
			g_tipoacao='identifica';
			cliqueIdentifica = function(){
				if (g_tipoacao == "identifica")
				{wdocaf("450px","250px",i3GEO.configura.locaplic+'/ferramentas/identifica/index.htm?&x='+objposicaocursor.ddx+'&y='+objposicaocursor.ddy+'&escala='+objmapa.scale,"","","Identifica");}
			};
			if(g_funcoesClickMapaDefault.toString().search("cliqueIdentifica()") < 0)
			{g_funcoesClickMapaDefault.push("cliqueIdentifica()");}
		}
	},
	{
		//bot�o que abre a janela com o valor da extens�o geogr�fica do mapa atual
		iddiv:"exten",
		tipo:"",
		dica:$trad("d8"),
		funcaoonclick:function()
		{wdocaf("450px","340px",i3GEO.configura.locaplic+"/ferramentas/mostraexten/index.htm","","","Extens�o geogr�fica");}
	},
	{
		//bot�o que abre a janela com o mapa de refer�ncia
		iddiv:"referencia",
		tipo:"",
		dica:$trad("d9"),
		funcaoonclick:function()
		{initJanelaRef();}
	},
	{
		//bot�o de busca na wikipedia
		iddiv:"wiki",
		tipo:"",
		dica:$trad("d11"),
		funcaoonclick:function(){
			g_operacao = "navega";
			wdocaf("450px","190px",i3GEO.configura.locaplic+"/ferramentas/wiki/index.htm","","","Wiki");
			if(g_funcoesNavegaMapaDefault.toString().search("atualizawiki()") < 0)
			{g_funcoesNavegaMapaDefault.push("atualizawiki()");}		
		}
	},
	{
		//bot�o de busca de fotos
		iddiv:"buscafotos",
		tipo:"",
		dica:"Fotos",
		funcaoonclick:function(){
			g_operacao = "navega";
			wdocaf("550px","400px",i3GEO.configura.locaplic+"/ferramentas/buscafotos/index.htm","","","Fotos");
			i3GEO.util.criaPin();
		}
	},
	{
		//bot�o de impress�o
		iddiv:"imprimir",
		tipo:"",
		dica:$trad("d12"),
		funcaoonclick:function()
		{wdocaf("320px","180px",i3GEO.configura.locaplic+"/ferramentas/imprimir/index.htm","","","Imprimir");}
	},
	{
		//bot�o de localiza��o do usu�rio pelo IP
		iddiv:"ondeestou",
		tipo:"",
		dica:$trad("d13"),
		funcaoonclick:function()
		{i3GEO.navega.zoomIP(i3GEO.configura.locaplic,i3GEO.configura.sid);}
	},
	{
		//abre a op��o de gera��o de um modelo virtual de eleva��o
		iddiv:"v3d",
		tipo:"",
		dica:$trad("d14"),
		funcaoonclick:function()
		{wdocaf("400px","200px",i3GEO.configura.locaplic+"/ferramentas/3d/index.htm","","","3d");}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no Google
		iddiv:"google",
		tipo:"",
		dica:$trad("d15"),
		funcaoonclick:function(){
			i3GEO.util.criaBox();
			g_operacao = "navega";
			if(navn){wdocaf((objmapa.w/2)+20+"px",(objmapa.h/2)+20+"px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps");}
			else
			{wdocaf("500px","380px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps");}
			if(g_funcoesNavegaMapaDefault.toString().search("atualizagoogle()") < 0)
			{g_funcoesNavegaMapaDefault.push("atualizagoogle()");}		
		}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no site Scielo
		iddiv:"scielo",
		tipo:"",
		dica:$trad("d16"),
		funcaoonclick:function(){
			g_operacao = "navega";
			wdocaf("450px","190px",i3GEO.configura.locaplic+"/ferramentas/scielo/index.htm","","","Scielo");
			if(g_funcoesNavegaMapaDefault.toString().search("atualizascielo()") < 0)
			{g_funcoesNavegaMapaDefault.push("atualizascielo()");}
		}
	},
	{
		//Ativa o bot�o que realiza a opera��o de de busca no site confluence
		iddiv:"confluence",
		tipo:"",
		dica:$trad("d17"),
		funcaoonclick:function(){
			g_operacao = "navega";
			wdocaf("250px","190px",i3GEO.configura.locaplic+"/ferramentas/confluence/index.htm","","","confluence");
			i3GEO.util.criaBox();
			if(g_funcoesNavegaMapaDefault.toString().search("atualizaconfluence()") < 0)
			{g_funcoesNavegaMapaDefault.push("atualizaconfluence()");}		
		}
	},
	{
		//Ativa o bot�o que abre a lente de aumento
		iddiv:"lentei",
		tipo:"",
		dica:$trad("d18"),
		funcaoonclick:function()
		{lenteDeAumento();}
	},
	{
		//Coloca as guias em uma janela m�vel
		iddiv:"encolheFerramentas",
		tipo:"",
		dica:$trad("d19"),
		funcaoonclick:function()
		{docaguias();}
	},
	{
		//bot�o de reinicializa��o do mapa que restaura as condi��es iniciais do mapa
		iddiv:"reinicia",
		tipo:"",
		dica:$trad("d20"),
		funcaoonclick:function(){
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=reiniciaMapa&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"reiniciaMapa",ajaxredesenha);
		}
	},
	{
		//bot�o de medi��o de dist�ncias
		iddiv:"mede",
		tipo:"dinamico",
		dica:$trad("d21"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("mede");
			if($i("img")){
				$i("img").title = "";
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"distancia","img",i3GEO.configura.locaplic);
			}
			mede();
		}
	},
	{
		//bot�o de medi��o de �rea
		iddiv:"area",
		tipo:"dinamico",
		dica:$trad("d21a"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("area");
			if($i("img")){
				$i("img").title = "";
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"area","img",i3GEO.configura.locaplic);
			}
			area();
		}
	},
	{
		//bot�o de digitaliza��o
		iddiv:"inserexy",
		tipo:"dinamico",
		dica:$trad("d22"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("inserexy");
			inserexy();
			if($i("img")){
				$i("img").title = "clique para inserir um ponto";
				$i("img").style.cursor="crosshair";
			}
		}
	},
	{
		//bot�o de inclus�o de gr�ficos
		iddiv:"inseregrafico",
		tipo:"dinamico",
		dica:$trad("d23"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("inseregrafico");
			inseregrafico();
			if($i("img")){
				$i("img").title = "clique para incluir o gr�fico";
				$i("img").style.cursor="pointer";
			}		
		}
	},
	{
		//bot�o de sele��o
		iddiv:"selecao",
		tipo:"dinamico",
		dica:$trad("d24"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("selecao");
			selecao();
			if($i("img")){
				$i("img").title = "";
				$i("img").style.cursor="pointer";
			}
		}
	},
	{
		//bot�o de inser��o de topon�mia
		iddiv:"textofid",
		tipo:"dinamico",
		dica:$trad("d25"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("textofid");
			textofid();
			if($i("img")){
				$i("img").title = "clique para inserir o texto";
				$i("img").style.cursor="pointer";
			}
		}
	},
	{
		//monta o menu suspenso
		iddiv:"menus",
		tipo:"",
		constroiconteudo:'montaMenuSuspenso("menus")'
	}	
]};
