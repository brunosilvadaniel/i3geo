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

simples|completo|balao
*/
g_tipotip = "balao";
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
	{ text: $trad("u2"), url: "javascript:i3GEO.ajuda.abreDoc()" },
	{ text: $trad("u3"), url: "http://pt.wikibooks.org/wiki/I3geo" },
	{ text: $trad("u4"), url: "http://mapas.mma.gov.br/wikibooki3geo" },
	{ text: $trad("u5a"), url: "http://www.softwarepublico.gov.br" },
	{ text: "i3Geo Blog", url: "http://sistemas.mma.gov.br/blogs/index.php?blog=6" }
	],
	"analise": [
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u22")+'</b></span>',url: "#"}, 
	{ text: $trad("u7"), url: "javascript:i3GEO.analise.dialogo.gradePol()"},
	{ text: $trad("u8"), url: "javascript:i3GEO.analise.dialogo.gradePontos()" },
	{ text: $trad("u9"), url: "javascript:i3GEO.analise.dialogo.gradeHex()" },
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u23")+'</b></span>',url: "#"}, 
	{ text: $trad("u11a"), url: "javascript:i3GEO.analise.dialogo.distanciaptpt()" },
	{ text: $trad("u12"), url: "javascript:i3GEO.analise.dialogo.nptPol()" },
	{ text: $trad("u13"), url: "javascript:i3GEO.analise.dialogo.pontoempoligono()" },
	{ text: $trad("u14"), url: "javascript:i3GEO.analise.dialogo.pontosdistri()" },
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u24")+'</b></span>',url: "#"}, 
	{ text: $trad("u11"), url: "javascript:i3GEO.analise.dialogo.centroide()" },
	{ text: $trad("u25"), url: "javascript:i3GEO.analise.dialogo.dissolve()" },
    { text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u27")+'</b></span>',url: "#"}, 
	{ text: $trad("u6"), url: "javascript:i3GEO.analise.dialogo.analisaGeometrias()" },
	{ text: $trad("u10"), url: "javascript:i3GEO.analise.dialogo.buffer()" },
	{ text: $trad("u26"), url: "javascript:i3GEO.analise.dialogo.agrupaElementos()" }
	]
};
oMenuData.janelas = [
	{ text: $trad("u15"), url: "javascript:initJanelaZoom('1');initJanelaZoom('2')" },
	{ text: $trad("u16"), url: "javascript:i3GEO.ajuda.abreJanela()" }        
	];
oMenuData.arquivo = [
	{ text: $trad("u17"), url: "javascript:i3GEO.mapa.dialogo.salvaMapa()" },
	{ text: $trad("u18"), url: "javascript:i3GEO.mapa.dialogo.carregaMapa()" },
	{ text: $trad("u19"), url: "javascript:i3GEO.gadgets.quadros.listaImagens()" },
	{ text: $trad("u20"), url: "javascript:i3GEO.mapa.dialogo.convertews()" },
	//{ text: $trad("u20a"), url: "javascript:i3GEO.tema.dialogo.abreKml('mapfile')" },
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
		constroiconteudo:'i3GEO.gadgets.mostraHistoricoZoom()'
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
			i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","img",i3GEO.configura.locaplic);
			if(!$i("i3geoboxZoom"))
			i3GEO.navega.zoomBox.criaBox();
			g_operacao='navega';
			g_tipoacao='zoomli';
			i3GEO.barraDeBotoes.ativaIcone("zoomli");
			marcadorZoom = "";
			if(i3GEO.eventos.MOUSEDOWN.toString().search("i3GEO.navega.zoomBox.inicia()") < 0)
			{i3GEO.eventos.MOUSEDOWN.push("i3GEO.navega.zoomBox.inicia()");}
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
			panMapaInicia = function(){
				if ($i("img") && (g_tipoacao == "pan")){
					g_panM = "sim";
					if($i("corpoMapa")){
						leftinicial = parseInt($i("corpoMapa").style.left);
						topinicial = parseInt($i("corpoMapa").style.top);
					}
					clicinicialx = objposicaocursor.imgx;
					clicinicialy = objposicaocursor.imgy;
					ddinicialx = objposicaocursor.ddx;
					ddinicialy = objposicaocursor.ddy;
				}
			};
			panMapaDesloca = function(){
				if ($i("img") && (g_panM == "sim")){
					var nx = objposicaocursor.telax - leftinicial - clicinicialx;
					var ny = objposicaocursor.telay - topinicial - clicinicialy;
					if (i3GEO.configura.entorno == "nao"){
						var l = 0;
						if (parseInt($i("i3geo").style.left))
						{var l = parseInt($i("i3geo").style.left);}
						$i("img").style.left = nx - l;
						var t = 0;
						if (parseInt($i("i3geo").style.top))
						{var t = parseInt($i("i3geo").style.top);}
						$i("img").style.top = ny - t;
					}
					else{
						$left("img",objmapa.w*-1 + nx);
						$left("imgS",objmapa.w*-1 + nx);
						$left("imgL",objmapa.w + nx);
						$left("imgO",objmapa.w*-3 + nx);
						$left("imgN",objmapa.w*-1 + nx);
						$top("img",objmapa.h*-1 + ny);
						$top("imgS",objmapa.h*-1 + ny);
						$top("imgL",objmapa.h*-1 + ny);
						$top("imgN",objmapa.h*-1 + ny);
						$top("imgO",objmapa.h*-1 + ny);
					}
				}
			};
			panMapaTermina = function(){
				if ($i("img") && (g_tipoacao == "pan")){
					marcadorZoom = "";
					g_panM = "nao";
					var res = i3GEO.navega.xy2xy(i3GEO.configura.locaplic,i3GEO.configura.sid,ddinicialx,ddinicialy,objposicaocursor.ddx,objposicaocursor.ddy,objmapa.extent,g_tipoimagem);
					if(res == false){i3GEO.navega.zoompontoIMG(i3GEO.configura.locaplic,i3GEO.configura.sid,objposicaocursor.imgx,objposicaocursor.imgy)}
				}
			};
			if(i3GEO.eventos.MOUSEDOWN.toString().search("panMapaInicia()") < 0)
			{i3GEO.eventos.MOUSEDOWN.push("panMapaInicia()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("panMapaDesloca()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("panMapaDesloca()");}
			if(i3GEO.eventos.MOUSEUP.toString().search("panMapaTermina()") < 0)
			{i3GEO.eventos.MOUSEUP.push("panMapaTermina()");}
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
			g_operacao='identifica';
			cliqueIdentifica = function(){
				if (g_tipoacao == "identifica")
				{
					i3GEO.eventos.MOUSEPARADO.remove("verificaTip()");
					var janela = i3GEO.janela.cria("450px","250px",i3GEO.configura.locaplic+'/ferramentas/identifica/index.htm?&x='+objposicaocursor.ddx+'&y='+objposicaocursor.ddy+'&escala='+objmapa.scale,"","","Identifica");
					var temp = function(){
						i3GEO.eventos.MOUSECLIQUE.remove("cliqueIdentifica()");
						i3GEO.barraDeBotoes.ativaBotoes();
					};
					YAHOO.util.Event.addListener(janela[0].close, "click", temp);
				}
			};
			verificaTip = function(){
				if (g_operacao != "identifica"){return;}
				//funcao default para pegar os dados
				verificaTipDefault = function(){
					var retorna = function(retorno){
						var i = $i("i3geo_rosa");
						if(i){i.style.display="none";}			
						var mostra = false;
						try{
							var retorno = retorno.data;
							if ($i("img"))
							{$i("img").title = "";}
							if (retorno != ""){
								var res = "";
								var temas = retorno.split("!");
								var tema = temas.length-1;
								if(tema >= 0){
									do{
										var titulo = temas[tema].split("@");
										if (g_tipotip == "completo" || g_tipotip == "balao")
										{res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";}
										var ocorrencias = titulo[1].split("*");
										var ocorrencia = ocorrencias.length-1;
										if(ocorrencia >= 0){
											do{
												if (ocorrencias[ocorrencia] != ""){
													var pares = ocorrencias[ocorrencia].split("##");
													var paresi = pares.length;
													for (var par=0;par<paresi; par++){
														var valores = pares[par].split("#");
														if (g_tipotip == "completo" || g_tipotip == "balao"){
															res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
															var mostra = true;
														}
														else{
															res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'><i>" + valores[1] + "</i></span><br>";
															var mostra = true;
														}
													}
												}
											}
											while(ocorrencia--)
										}
									}
									while(tema--)
								}
								if(!mostra){$i("tip").style.display="none";return;}
								else{		
									if(g_tipotip != "balao"){
										var n = i3GEO.janela.tip();
										$i(n).style.textAlign="left";
										$i(n).innerHTML += res;
									}
									else{
										var n = i3GEO.janela.tip("<img src='"+i3GEO.configura.locaplic+"/imagens/grabber.gif' />");
										balloon = new Balloon;
										balloon.delayTime = 0;
										var res = "<div style=text-align:left >"+res+"</div>";
										$i(n+"cabecatip").onmouseover = function(evt){balloon.showTooltip(evt,res);};
									}
								}
							}
						}
						catch(e){}
					};
					i3GEO.php.identifica(retorna,objposicaocursor.ddx,objposicaocursor.ddy,"5");
				};				
				if (g_operacao == "identifica"){
					eval(g_funcaoTip);
				}
			};
			if(i3GEO.eventos.MOUSECLIQUE.toString().search("cliqueIdentifica()") < 0)
			{i3GEO.eventos.MOUSECLIQUE.push("cliqueIdentifica()");}
			if(i3GEO.eventos.MOUSEPARADO.toString().search("verificaTip()") < 0)
			{i3GEO.eventos.MOUSEPARADO.push("verificaTip()");}
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
		{i3GEO.maparef.inicia();}
	},
	{
		//bot�o de busca na wikipedia
		iddiv:"wiki",
		tipo:"",
		dica:$trad("d11"),
		funcaoonclick:function(){
			g_operacao = "navega";
			wdocaf("450px","190px",i3GEO.configura.locaplic+"/ferramentas/wiki/index.htm","","","Wiki");
			atualizawiki = function(){
				var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				if (docel.getElementById("resultadowiki"))
				{$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/wiki/index.htm";}
				else
				{i3GEO.eventos.NAVEGAMAPA.remove("atualizawiki()");}
			};
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizawiki()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizawiki()");}		
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
			if(navn){wdocaf((objmapa.w/2)+40+"px",(objmapa.h/2)+50+"px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps");}
			else
			{wdocaf("500px","380px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps");}
			atualizagoogle = function(){
				try{
					if (navn){
						if ($i("wdocai"))
						{var doc = $i("wdocai").contentDocument;}
					}
					else{
						if(document.frames("wdocai"))
						{var doc = document.frames("wdocai").document;}
					}
					if(window.parent.frames["wdocai"].panTogoogle)
					{window.parent.frames["wdocai"].panTogoogle();}
					else{i3GEO.eventos.NAVEGAMAPA.remove("atualizagoogle()");}
					
				}
				catch(e){}
			};		
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizagoogle()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizagoogle()");}		
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
			atualizascielo = function(){
				try{
					var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
					if (docel.getElementById("resultadoscielo"))
					{$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/scielo/index.htm";}
					else
					{i3GEO.eventos.NAVEGAMAPA.remove("atualizascielo()");}
				}
				catch(e){}
			};
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizascielo()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizascielo()");}
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
			atualizaconfluence = function(){
				var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				if (docel.getElementById("resultadoconfluence"))
				{$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/confluence/index.htm";}
				else
				{i3GEO.eventos.NAVEGAMAPA.remove("atualizaconfluence()")}
			};
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaconfluence()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizaconfluence()");}		
		}
	},
	{
		//Ativa o bot�o que abre a lente de aumento
		iddiv:"lentei",
		tipo:"",
		dica:$trad("d18"),
		funcaoonclick:function()
		{
			if (i3GEO.navega.lente.ESTAATIVA == "nao"){
			i3GEO.navega.lente.inicia();}
			else
			i3GEO.navega.lente.desativa();
		}
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
			i3GEO.php.reiniciaMapa(ajaxredesenha);
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
			g_tipoacao = "";
			i3GEO.analise.medeDistancia.inicia();
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
			g_tipoacao = "";
			i3GEO.analise.medeArea.inicia();
		}
	},
	{
		//bot�o de digitaliza��o
		iddiv:"inserexy",
		tipo:"dinamico",
		dica:$trad("d22"),
		funcaoonclick:function(){
			i3GEO.barraDeBotoes.ativaIcone("inserexy");
			g_tipoacao = "";
			i3GEO.mapa.dialogo.cliquePonto();
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
			g_tipoacao = "";
			i3GEO.mapa.dialogo.cliqueGrafico();
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
			i3GEO.selecao.janelaOpcoes();
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
			g_tipoacao = "";
			i3GEO.mapa.dialogo.cliqueTexto();
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
