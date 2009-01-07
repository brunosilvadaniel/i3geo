/*
Title: ferramentas.js

Fun��es que executam determinadas opera��es de manipula��o do mapa ou que abrem janelas internas para
a realiza��o de opera��es sobre o mapa.

Normalmente, as fun��es abrem uma janela interna no i3geo

File: i3geo/classesjs/ferramentas.js

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
Section: fun��es de movimenta��o do mouse sobre o mapa
*/
/*
Function moveMede

Calcula a dist�ncia entre pontos e mostra na tela o resultado.

Utiliza os objetos pontosdistobj e objposicaocursor para obter as coordenadas para o c�lculo.

O resultado do c�lculo � mostrado no DIV com id="mostradistancia_calculo" 
*/
function moveMede()
{
	if (g_tipoacao == "mede")
	{
		if($i("mostradistancia"))
		$i("mostradistancia").style.display="block";
		var n = pontosdistobj.xpt.length;
		if (n > 0)
		{
			var d = i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
			if (objmapa.scale > 500000)
			{var d = parseInt(d);}
			else
			{
				d= d + "";
				d = d.split(".");
				var decimal = d[1].substr(0,3);
				d = d[0]+"."+decimal;
				d = d * 1;
			}
			var da = d + pontosdistobj.dist[n-1];
			if ($i("mostradistancia_calculo"))
			{$i("mostradistancia_calculo").innerHTML = " Dist acum.= "+da+" atual= "+d+" km";}
			desenhoRichdraw("resizeLinha",pontosdistobj.linhas[n-1],n);
		}
	}
}
/*
Function movePan

Desloca cursor de zoom por box
*/
function movePan()
{
	if (((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox")) && ($i("box1").style.visibility == "visible"))
	{zoomboxf("desloca");}
}
/*
Function moveLonglat

Mostra os valores da coordenada do mouse em latitude e longitude como uma �nica string.

Os dados s�o obtidos do objeto objposicaocursor e inclu�dos no DIV = "longlat"
*/
function moveLonglat()
{
	if ($i("longlat"))
	{$i("longlat").innerHTML = objposicaocursor.dmsx + "   " +  objposicaocursor.dmsy;}
}
/*
Function moveSelecaoPoli

Mostra na tela o pol�gono desenhado na op��o de sele��o por pol�gono.

Os pontos s�o obtidos dos objetos pontosdistobj e objposicaocursor
*/
function moveSelecaoPoli()
{
	if (g_tipoacao == "selecaopoli")
	{
		var n = pontosdistobj.xpt.length;
		if (n > 0)
		{
			var d = i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
			if (objmapa.scale > 500000)
			{var d = parseInt(d);}
			else
			{
				d= d + "";
				d = d.split(".");
				var decimal = d[1].substr(0,3);
				d = d[0]+"."+decimal;
				d = d * 1;
			}
			var da = d + pontosdistobj.dist[n-1];
			if(navn){desenhoRichdraw("resizePoligono",pontosdistobj.linhastemp,0);}
			desenhoRichdraw("resizePoligono",pontosdistobj.linhas[n-1],n);
		}
	}
}
/*
Function moveArea

Cria os elementos necess�rios � fun��o de c�lculo de �rea.
*/
function moveArea()
{
	if (g_tipoacao == "area")
	{
		var n = pontosdistobj.xpt.length;
		if (n > 0)
		{
			//
			//conforme a escala, os dados s�o arredondados
			// 
			var d = i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
			if (objmapa.scale > 500000)
			{var d = parseInt(d);}
			else
			{
				d= d + "";
				d = d.split(".");
				var decimal = d[1].substr(0,3);
				d = d[0]+"."+decimal;
				d = d * 1;
			}
			var da = d + pontosdistobj.dist[n-1];
			//
			//desenha as linhas na tela com o objeto richdraw
			//
			if(navn){desenhoRichdraw("resizePoligono",pontosdistobj.linhastemp,0);}
			desenhoRichdraw("resizeLinha",pontosdistobj.linhas[n-1],n);
		}
	}
}
/*
Section: fun��es de clique sobre o mapa
*/
/*
Function: cliqueCapturaPt

Captura um ponto na tela e retorna o resultado para a janela interna que estiver aberta.

As coordenadas do ponto, em DMS, s�o repassadas para os campos do tipo input da janela interna que estiver aberta.
A janela aberta deve ter os seguintes elementos do tipo input (ids):
ixg,ixm,ixs,iyg,iym,iys
*/
function cliqueCapturaPt()
{
	if (g_tipoacao == "capturaponto")
	{
		if($i("wdocai"))
		{var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;}
		var x = objposicaocursor.dmsx.split(" ");
		var y = objposicaocursor.dmsy.split(" ");
		if (doc.getElementById("ixg"))
		{doc.getElementById("ixg").value = x[0];}
		if (doc.getElementById("ixm"))
		{doc.getElementById("ixm").value = x[1];}
		if (doc.getElementById("ixs"))
		{doc.getElementById("ixs").value = x[2];}
		if (doc.getElementById("iyg"))
		{doc.getElementById("iyg").value = y[0];}
		if (doc.getElementById("iym"))
		{doc.getElementById("iym").value = y[1];}
		if (doc.getElementById("iys"))
		{doc.getElementById("iys").value = y[2];}
	}
}
/*
Function: abreKml

Abre a janela para mostrar o link de acesso a um tema via kml.

Parameters:

tema - c�digo do tema escolhido
*/
function abreKml(tema)
{
	if(tema == "mapfile")
	{
		if(objmapa.mapfile == "")
		{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
		wdocaf("450px","250px",i3GEO.configura.locaplic+'/ferramentas/convertekml/index.htm?tema='+objmapa.mapfile,"","","Kml");
	}
	else
	{wdocaf("450px","250px",i3GEO.configura.locaplic+'/ferramentas/convertekml/index.htm?tema='+tema,"","","Kml");}
}
/*
Function: cliqueInserexy

Insere um ponto no mapa na posi��o clicada

Os pontos s�o obtidos do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
*/
function cliqueInserexy()
{
	if (g_tipoacao == "inserexy")
	{
		var n = pontosdistobj.xpt.length;
		pontosdistobj.xpt[n] = objposicaocursor.ddx;
		pontosdistobj.ypt[n] = objposicaocursor.ddy;
		if ($i("wdoca").style.display == "none")
		{wdocaf("270px","200px",i3GEO.configura.locaplic+'/ferramentas/inserexy2/index.htm',"");}
		var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
		var ins = doc.getElementById("resultado").innerHTML;
		ins = ins + "<div style='font-size:12px' >" + objposicaocursor.ddx +" " + objposicaocursor.ddy + "</div><br>";
		doc.getElementById("resultado").innerHTML = ins;
		var item = "";
		var valoritem = "";
		if((doc.getElementById("valorItem")) && (doc.getElementById("itemtema")))
		{
			var item = doc.getElementById("itemtema").value;
			var valoritem = doc.getElementById("valorItem").value;
		}
		if (g_nomepin == ""){alert("Nenhum tema definido para editar");}
		else
		{
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=insereSHP&item="+item+"&valor="+valoritem+"&tema="+g_nomepin+"&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&g_sid="+i3GEO.configura.sid;
			cpObj.call(p,"insereSHP",ajaxredesenha);
		}
	}
}
/*
Function: cliqueInseregrafico

Insere um gr�fico no mapa na posi��o clicada

Os pontos s�o obtidos do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
*/
function cliqueInseregrafico()
{
	if (g_tipoacao == "inseregrafico")
	{
		if ($i("wdoca").style.display == "none")
		{wdocaf("270px","200px",i3GEO.configura.locaplic+'/ferramentas/inseregrafico/index.htm',"");}
		var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
		var tema = doc.getElementById("temasLigados").value;
		var width = doc.getElementById("w").value;
		var inclinacao = doc.getElementById("inclinacao").value;
		var shadow_height = doc.getElementById("sombra").value;
		if (tema == ""){alert("Nenhum tema definido para pegar os dados");}
		else
		{
			//pega os itens e as cores definidas
			var listadeitens = new Array();
			var g = doc.getElementById("listai");
			var iguias = g.getElementsByTagName("input");
			var i = iguias.length-1;
			if (i >= 0)
			{
				do
				{
					if (iguias[i].checked == true)
					{
						var it = iguias[i].id;
						var c = doc.getElementById("cor"+it).value;
						listadeitens.push(it+","+c);
					}
				}
				while(i--)
			}
			var itens = listadeitens.join("*");
			if (itens == "")
			{alert("Nenhum item foi escolhido");}
			else
			{
				i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
				var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=insereSHPgrafico&tipo=pizza&tema="+tema+"&x="+objposicaocursor.ddx+"&y="+objposicaocursor.ddy+"&itens="+itens+"&shadow_height="+shadow_height+"&width="+width+"&inclinacao="+inclinacao+"&g_sid="+i3GEO.configura.sid;
				cpObj.call(p,"insereSHPgrafico",ajaxredesenha);
			}
		}
	}
}
/*
Function: cliqueInseretoponimo

Insere um texto no mapa na posi��o clicada

Os pontos s�o obtidos do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
*/
function cliqueInseretoponimo()
{
	if (g_tipoacao == "textofid")
	{
		var n = pontosdistobj.xpt.length;
		pontosdistobj.xpt[n] = objposicaocursor.ddx;
		pontosdistobj.ypt[n] = objposicaocursor.ddy;
		if ($i("wdoca").style.display == "none")
		{textofid();}
		var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
		texto = doc.getElementById("texto").value;
		var f = doc.getElementById("fonte").value;
		var t = doc.getElementById("tamanho").value;
		var a = doc.getElementById("angulo").value;
		var cf = doc.getElementById("fundoc").value;
		if (cf == ""){cf = "off";}
		var cs = doc.getElementById("sombra").value;
		if (cs == ""){cs = "off";}
		var xs = doc.getElementById("sombrax").value;
		var ys = doc.getElementById("sombray").value;
		var c = doc.getElementById("frente").value;
		var m = doc.getElementById("mascara").value;
		if (m == ""){m = "off";}
		var fcs = doc.getElementById("frentes").value;
		if (fcs == ""){fcs = "off";}
		var fxs = doc.getElementById("frentex").value;
		var fys = doc.getElementById("frentey").value;
		var forca = doc.getElementById("force").value;
		var md = doc.getElementById("mindistance").value;
		var mf = doc.getElementById("minfeaturesize").value;
		var ox = doc.getElementById("offsetx").value;
		var oy = doc.getElementById("offsety").value;
		var pl = doc.getElementById("partials").value;
		var pos = doc.getElementById("position").value;
		//o texto ser� digitado
		var digi = function(retorno)
		{
			//se texto for igual a vazio � pq o valor foi pego de um atributo
			if(texto == "")
			{
				i3GEO.janela.fechaAguarde("ajaxredesenha");
				texto = retorno.data;
			}
			if (texto != " ")
			{
				i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
				var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=inserefeature&pin="+g_nomepin+"topo&tipo=ANNOTATION&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&texto="+texto+"&position="+pos+"&partials="+pl+"&offsetx="+ox+"&offsety="+oy+"&minfeaturesize="+mf+"&mindistance="+md+"&force="+forca+"&shadowcolor="+fcs+"&shadowsizex="+fxs+"&shadowsizey="+fys+"&outlinecolor="+m+"&cor="+c+"&sombray="+ys+"&sombrax="+xs+"&sombra="+cs+"&fundo="+cf+"&angulo="+a+"&tamanho="+t+"&fonte="+f+"&g_sid="+i3GEO.configura.sid;
				cpObj.call(p,"insereFeature",ajaxredesenha);
			}
		};
		if (doc.getElementById("tipoInsere").value == "digitando")
		{eval("digi('')");}
		else
		{
			//o texto ser� capturado de um atributo do elemento
			texto = "";
			if ((doc.getElementById("temasLigados")) && (doc.getElementById("itemsel")))
			{
				var tema = doc.getElementById("temasLigados").value;
				var item = doc.getElementById("itemsel").value;
				i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
				var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=identificaunico&xy="+objposicaocursor.ddx+","+objposicaocursor.ddy+"&resolucao=5&tema="+tema+"&item="+item+"&g_sid="+i3GEO.configura.sid;
				cpObj.call(p,"identificaunico",digi);
			}			
		}
	}
}
/*
Function: cliqueSelecao

Seleciona um elemento de um tema do mapa atrav�s do clique no mapa.

Os pontos s�o obtidos do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
*/
function cliqueSelecao()
{
	if (g_tipoacao == "selecao")
	{
		var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
		var tipo = "adiciona";
		//pega o tipo de operacao da janela de selecao
		if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
		if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
		var tolerancia = doc.getElementById("toleranciapt").value;
		//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
		if ((tipo != "limpa") && (tipo != "inverte"))
		{
			var retorna = function(retorno)
			{
				ajaxredesenha(retorno);
			};
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=selecaopt&tema="+objmapa.temaAtivo+"&tipo="+tipo+"&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&tolerancia="+tolerancia+"&g_sid="+i3GEO.configura.sid;
			cpObj.call(p,"selecaoPT",retorna);
		}
	}
}
/*
Function: cliqueMede

Executa as opera��es de medi��o de dist�ncias.

Os pontos s�o obtidos do objeto objposicaocursor
*/
function cliqueMede()
{
	if (g_tipoacao == "mede")
	{
		var n = pontosdistobj.xpt.length;
		pontosdistobj.xpt[n] = objposicaocursor.ddx;
		pontosdistobj.ypt[n] = objposicaocursor.ddy;
		pontosdistobj.xtela[n] = objposicaocursor.telax;
		pontosdistobj.ytela[n] = objposicaocursor.telay;
		pontosdistobj.ximg[n] = objposicaocursor.imgx;
		pontosdistobj.yimg[n] = objposicaocursor.imgy;
		pontosdistobj.dist[n] = 0;
		try
		{
			if (navn)
			{pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1),(pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1));}
			else
			{pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n]);}				
		}
		catch(e){window.status=n+" erro ao desenhar a linha base "+e.message;}
		if (n > 0)
		{
			var d = parseInt(i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
			pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
			if($i("pararraios") && $i("pararraios").checked == true )
			{
				desenhoRichdraw("insereCirculo","",n);
				if(navm)
				{pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(objmapa.w/2),pontosdistobj.yimg[n-1],(pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n]);}
			}
		}
		var temp = function()
		{
			richdraw.fecha();
			YAHOO.util.Event.removeListener(YAHOO.janelaDocamede.xp.panel.close, "click");
			if($i("pan"))
			$i("pan").onclick.call();
		};
		inseremarcaf(objposicaocursor.telax,objposicaocursor.telay,temp);
	}
}
/*
Function: cliqueSelecaoPoli

Executa as opera��es de sele��o por pol�gono quando o mouse � movido sobre o mapa e a op��o de c�lculo estiver ativa
*/
function cliqueSelecaoPoli()
{
	if (g_tipoacao == "selecaopoli")
	{
		var n = pontosdistobj.xpt.length;
		pontosdistobj.xpt[n] = objposicaocursor.ddx;
		pontosdistobj.ypt[n] = objposicaocursor.ddy;
		pontosdistobj.xtela[n] = objposicaocursor.telax;
		pontosdistobj.ytela[n] = objposicaocursor.telay;
		pontosdistobj.ximg[n] = objposicaocursor.imgx;
		pontosdistobj.yimg[n] = objposicaocursor.imgy;
		pontosdistobj.dist[n] = 0;
		//inclui a linha para ligar com o ponto inicial
		if (n == 0)
		{
			try
			{
				if (navn)
				{
					pontosdistobj.linhastemp = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[0]-1,pontosdistobj.yimg[0]-1);
				}
				else
				{
					pontosdistobj.linhastemp = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[0])-(objmapa.w/2),pontosdistobj.yimg[0]);	
				}				
			}
			catch(e){window.status="";}
		}
		try
		{
			if (navn)
			{
				pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, pontosdistobj.ximg[n],pontosdistobj.yimg[n],pontosdistobj.ximg[n],pontosdistobj.yimg[n]);
			}
			else
			{
				pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n]);
			}				
		}
		catch(e){window.status=n+" erro ao desenhar a linha base "+e.message;}
		if (n > 0)
		{
			var d = parseInt(i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
			pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
			//verifica se deve terminar
			if (d < 3)
			{
				var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				var pontos = pontosdistobj;
				richdraw.fecha();
				var n = pontos.xpt.length;
				objmapa.temaAtivo = doc.getElementById("comboTemas").value;
				if (n > 2)
				{
					var xs = pontos.xpt.toString(",");
					var ys = pontos.ypt.toString(",");
					var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=selecaoPoli";
					var retorna = function()
					{
						i3GEO.janela.fechaAguarde("ajaxredesenha",$trad("o1"));
						remapaf();
					};
					i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_transfer_mode('POST');
					cp.set_response_type("JSON");
					cp.call(p,"selecaoPoli",retorna,xs,ys,doc.getElementById("comboTemas").value,doc.getElementById("tipoOperacao").value);
				}
				else
				{alert("Sao necessarios pelo menos tres pontos");}
			}
		}
		var temp = function()
		{
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var pontos = pontosdistobj;
			richdraw.fecha();
			var n = pontos.xpt.length;
			objmapa.temaAtivo = doc.getElementById("comboTemas").value;
			var xs = pontos.xpt.toString(",");
			var ys = pontos.ypt.toString(",");
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=selecaoPoli";
			var retorna = function()
			{
				i3GEO.janela.fechaAguarde("ajaxredesenha",$trad("o1"));
				remapaf();
			};
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_transfer_mode('POST');
			cp.set_response_type("JSON");
			cp.call(p,"selecaoPoli",retorna,xs,ys,doc.getElementById("comboTemas").value,doc.getElementById("tipoOperacao").value);
		};
		inseremarcaf(objposicaocursor.telax,objposicaocursor.telay,temp);
	}
}
/*
Function: cliqueArea

Executa as opera��es de c�lculo de �rea quando o usu�rio clica no mapa  e a op��o de c�lculo estiver ativa
*/
function cliqueArea()
{
	if (g_tipoacao == "area")
	{
		var n = pontosdistobj.xpt.length;
		pontosdistobj.xpt[n] = objposicaocursor.ddx;
		pontosdistobj.ypt[n] = objposicaocursor.ddy;
		pontosdistobj.xtela[n] = objposicaocursor.telax;
		pontosdistobj.ytela[n] = objposicaocursor.telay;
		pontosdistobj.ximg[n] = objposicaocursor.imgx;
		pontosdistobj.yimg[n] = objposicaocursor.imgy;
		pontosdistobj.dist[n] = 0;
		//inclui a linha para ligar com o ponto inicial
		if (n == 0)
		{
			try
			{
				if (navn)
				{
					pontosdistobj.linhastemp = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[0]-1,pontosdistobj.yimg[0]-1);
				}
				else
				{
					pontosdistobj.linhastemp = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[0])-(objmapa.w/2),pontosdistobj.yimg[0]);	
				}				
			}
			catch(e){window.status="";}
		}

		try
		{
			if (navn)
			{pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1);}
			else
			{pontosdistobj.linhas[n] = richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(objmapa.w/2),pontosdistobj.yimg[n]);}				
		}
		catch(e){window.status=n+" erro ao desenhar a linha base "+e.message;}
		var m = i3GEO.calculo.area(pontosdistobj,g_areapixel);
		if($i("mostraarea_calculo"))
		{$i("mostraarea_calculo").innerHTML = "<br>m2</b>= "+m+"<br><b>km2</b>= "+m/1000000+"<br><b>ha</b>= "+m/10000;}
		if (n > 3)
		{
			var d = parseInt(i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
			pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
			//verifica se deve terminar
			if (d < 3)
			{
				richdraw.fecha();
				limpacontainerf();
				if($i("pan"))
				$i("pan").onclick.call();
			}
		}
		var temp = function()
		{
			richdraw.fecha();
			limpacontainerf();
			if($i("pan"))
			$i("pan").onclick.call();
		};
		inseremarcaf(objposicaocursor.telax,objposicaocursor.telay,temp);
	}
}
/*
Section: propriedades do mapa
*/
/*
Function: temporizador

Abre a janela para defini��o do intervalo de tempo para redesenho autom�tico do mapa.
*/
function autoredesenha()
{wdocaf("300px","180px",i3GEO.configura.locaplic+"/ferramentas/opcoes_autoredesenha/index.htm","","","Temporizador");}
/*
Function: salvaMapa

Abre a janela para salvar localmente o mapfile utilizado no mapa atual
*/
function salvaMapa()
{
	if(objmapa.mapfile == "")
	{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
	wdocaf("300px","180px",i3GEO.configura.locaplic+"/ferramentas/salvamapa/index.htm","","","Salva mapa");
}
/*
Function: carregaMapa

Abre a janela para a carga de um mapfile salvo localmente na m�quina dousu�rio.
*/
function carregaMapa()
{wdocaf("300px","150px",i3GEO.configura.locaplic+"/ferramentas/carregamapa/index.htm?urlatual="+window.location,"","","Carrega mapa");}
/*
Function: convertews

Abre a janela para converter o mapa atual em web service WMS
*/
function convertews()
{
	if(objmapa.mapfile == "")
	{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
	wdocaf("440px","280px",i3GEO.configura.locaplic+"/ferramentas/convertews/index.htm","","","Web service");
}
/*
Function: queryMap

Abre a janela que altera as propriedades da exibi��o dos elementos selecionados.
*/
function queryMap()
{wdocaf("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_querymap/index.htm","","","Querymap");}
/*
Function: template

Abre a janela que muda o template do mapa atual.
*/
function template()
{wdocaf("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template");}
/*
Function: ativaLogo

Ativa ou desativa a logo marca.

*/
function ativaLogo()
{
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=ativalogo&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"ativalogo",ajaxredesenha);
}
/*
Function: tamanho

Abre a janela que muda o tamanho do mapa
*/
function tamanho()
{wdocaf("150px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_tamanho/index.htm","","","Tamanho");}
/*
Function: tipoimagem

Abre a janela que define um filtro gr�fico (s�pia por exemplo) sobre a imagem gerada alterando suas caracter�sticas
*/
function tipoimagem()
{wdocaf("300px","220px",i3GEO.configura.locaplic+"/ferramentas/tipoimagem/index.htm","","","Tipo de imagem");}
/*
Function: corFundo

Abre a janela que altera a cor do fundo do mapa atual.
*/
function corFundo()
{wdocaf("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_fundo/index.htm","","","Fundo");}
/*
Section: propriedades de um tema
*/
/*
Function: destacaTema

Cria imagem de destaque

Parameters:

tema - id ue identifica o tema no map file.
*/
function destacaTema(tema)
{
	var verifica = $i("div_d");
	if(verifica && verifica.style.display == "block")
	{document.body.removeChild(verifica);g_destaca = "";return;}
	if ($i("img_d"))
	{$i("img_d").src = "";}
	if ($i(objmapa.guiaTemas+"obj"))
	{
		var iguias = $i(objmapa.guiaTemas+"obj").getElementsByTagName("input");
		var i = iguias.length-1;
		if(i >= 0)
		{
			do
			{
				if ((iguias[i].type == "checkbox") && (iguias[i].value == tema) && (iguias[i].checked == true))
				{alert("Desligue o tema antes de destacar");return;}
			}
			while(i--)
		}
	}
	i3GEO.janela.abreAguarde("ajaxdestaca","Aguarde...gerando imagem");
	g_destaca = tema;
	var p =i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=geradestaque&tema="+tema+"&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"geraDestaque",ajaxdestaca);
}
/*
Function: excluitemaf

Exclui um tema do mapa

Parameters:

tema - c�digo do tema
*/
function excluitemaf(tema)
{
	g_operacao = "excluitema";
	//remove o tema do DOM e seus filhos
	var p = document.getElementById("idx"+tema).parentNode.parentNode.parentNode;
	do
	{
		p.removeChild(p.childNodes[0]);
	}
	while (p.childNodes.length > 0);
	p.parentNode.removeChild(p);
	i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=excluitema&temas="+tema+"&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"excluiTemas",ajaxredesenha);
	objmapa.temaAtivo = "";
}
/*
Function: sobetemaf

Sobe um tema na ordem de desenho

Parameters:

tema - c�digo do tema
*/
function sobetemaf(tema)
{
	i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=sobetema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"sobeTema",ajaxredesenha);
}
/*
Function: descetemaf

Desce um tema na ordem de desenho

Parameters:

tema - c�digo do tema
*/
function descetemaf(tema)
{
	i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?&funcao=descetema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"desceTema",ajaxredesenha);
}
/*
Function: zoomtemaf

Zoom para o tema

Parameters:

tema - c�digo do tema
*/
function zoomtemaf(tema)
{
	i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=zoomtema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"zoomTema",ajaxredesenha);
}
/*
Function: limpaseltemaf

Limpa a selecao do tema

Parameters:

tema - ID (name) do tema clicado
*/
function limpaseltemaf(tema)
{
	g_operacao = "limpasel";
	i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=limpasel&tema="+tema+"&g_sid="+i3GEO.configura.sid;
	cpObj.call(p,"selecaoLimpa",ajaxredesenha);
}
/*
Function: mudatranspf

Muda a transparencia de um tema

Parameters:

idtema - c�digo do tema
*/
function mudatranspf(idtema)
{
	g_operacao = "transparencia";
	//o campo input com o valor possui o prefixo 'tr' seguido pelo c�digo do tema
	if ($i("tr"+idtema))
	{var valor = $i("tr"+idtema).value;}
	else
	{alert("Ocorreu um erro");}
	if (valor != "")
	{
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudatransp&tema="+idtema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid;
		cpObj.call(p,"mudaTransparencia",ajaxredesenha);
	}
	else
	{alert("Valor n�o definido.");}
}
/*
Function: mudanomef

Muda o nome de um tema

Parameters:

idtema - c�digo do tema
*/
function mudanomef(idtema)
{
	g_operacao = "mudanome";
	if($i("nn"+idtema))
	{var valor = $i("nn"+idtema).value;}
	else
	{alert("Ocorreu um erro");}
	if (valor != "")
	{
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudanome&tema="+idtema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid;
		cpObj.call(p,"mudaNome",ajaxredesenha);
	}
	else
	{alert("Nome n�o definido");}
}
/*
Function: graficotema

Adiciona gr�ficos automaticamente nos elementos de um tema

Parameters:

idtema - c�digo do tema
*/
function graficotema(idtema)
{wdocaf("350px","340px",i3GEO.configura.locaplic+"/ferramentas/graficotema/index.htm?tema="+idtema,"","","Gr&aacute;fico");}

/*
Function: toponimiaf

Op��es de topon�mia de um tema.

Parameters:

idtema - c�digo do tema
*/
function toponimiaf(idtema)
{wdocaf("350px","340px",i3GEO.configura.locaplic+"/ferramentas/toponimia/index.htm?tema="+idtema,"","","Topon&iacute;mia");}
/*
Function: filtrof

Op��es de filtragem de um tema.

Parameters:

idtema - c�digo do tema
*/
function filtrof(idtema)
{wdocaf("480px","250px",i3GEO.configura.locaplic+"/ferramentas/filtro/index.htm?tema="+idtema,"","","Filtro");}
/*
Section: an�lise geogr�fica
*/
/*
Function selecao

Abre a janela com as op��es de sele��o de elementos no mapa
*/
function selecao()
{
	if (g_tipoacao != "selecao")
	{
		g_tipoacao = "selecao";
		mudaiconf("selecao");
		pontosdistobj = new pontosdist();
		objmapa.temaAtivo = "";
		criaContainerRichdraw();
		richdraw.lineColor = "red";
		richdraw.lineWidth = "2px";	
		wdocaf("430px","320px",i3GEO.configura.locaplic+'/ferramentas/selecao/index.htm',"","","Sele&ccedil;&atilde;o");
		if(g_funcoesClickMapaDefault.toString().search("cliqueSelecao()") < 0)
		{g_funcoesClickMapaDefault.push("cliqueSelecao()");}
	}
	else
	{mudaiconf("pan");}
}
/*
Function: pontosdistri

Abre a janela para executar an�lises de distribui��o de pontos
*/
function pontosdistri()
{
	//a vari�vel g_r indica se o R est� instalado no servidor e � definida na inicializa��o do I3Geo
	if (g_r == "nao")
	{alert("Op��o n�o dispon�vel");}
	else
	{wdocaf("400px","300px",i3GEO.configura.locaplic+"/ferramentas/pontosdistri/index.htm","","","Distribui&ccedil;&atilde;o de pontos");}
}

/*
Function: pontoempoligono

Abre a janela para cruzar um tema de pontos com um ou mais temas poligonais e gerar um novo tema
*/
function pontoempoligono()
{wdocaf("400px","250px",i3GEO.configura.locaplic+"/ferramentas/pontoempoligono/index.htm","","","Ponto em pol&iacute;gono");}
/*
Function: nptPol

Abre a janela para cruzar um tema de pontos com um ou tema poligona e gerar um novo tema com o n�mero de pontos em cada pol�gono
*/
function nptPol()
{wdocaf("400px","200px",i3GEO.configura.locaplic+"/ferramentas/nptpol/index.htm","","","Pontos por pol&iacute;gono");}
/*
Function: buffer

Gera um buffer em elementos selecionados
*/
function buffer()
{wdocaf("400px","180px",i3GEO.configura.locaplic+"/ferramentas/buffer/index.htm","","","Entorno");}
/*
Function: distanciaptpt

Abre a janela para calcular a dist�ncia entre um ponto e outros pontos pr�ximos
*/
function distanciaptpt()
{wdocaf("400px","220px",i3GEO.configura.locaplic+"/ferramentas/distanciaptpt/index.htm","","","Dist&acirc;ncia");}
/*
Function: centroide

Abre a janela que gera um tema com os centroides dos elementos selecionados
*/
function centroide()
{wdocaf("400px","180px",i3GEO.configura.locaplic+"/ferramentas/centroide/index.htm","","","Centr�ide");}
/*
Function: dissolve

Abre a janela que gera um tema dissolvendo as divisas entre pol�gonos.
*/
function dissolve()
{wdocaf("400px","230px",i3GEO.configura.locaplic+"/ferramentas/dissolve/index.htm","","","Dissolve");}
/*
Function: agrupaElementos

Abre a janela que gera um tema poligonal agrupando elementos de um tema.
*/
function agrupaElementos()
{wdocaf("400px","230px",i3GEO.configura.locaplic+"/ferramentas/agrupaelementos/index.htm","","","Agrupa");}

/*
Function: analisaGeometrias

Abre a janela com o sistema de an�lise de geometrias
*/
function analisaGeometrias()
{
	g_tipoacao = "selecao";
	mudaiconf("selecao");
	pontosdistobj = new pontosdist();
	objmapa.temaAtivo = "";
	wdocaf("500px","400px",i3GEO.configura.locaplic+'/ferramentas/analisageometrias/index.htm',"","","Sele&ccedil;&atilde;o");
}
/*
Function: 
	
Ativa a op��o de medi��o de �rea.

A medida � feita quando o usu�rio clica no mapa com esta op��o ativa
*/
function area()
{
	if (!$i("mostraarea"))
	{
		var novoel = document.createElement("div");
		novoel.id = "mostraarea";
		var ins = '<div class="hd" >&Aacute;rea aproximada</div>';
		ins += '<div class="bd" style="text-align:left;padding:3px;" >';
		ins += '<div style="text-align:left;padding:3px;font-size:10px" id="mostraarea_calculo" ></div>';
		ins+= '</div>';
		novoel.innerHTML = ins;
		novoel.style.borderColor="gray";
		document.body.appendChild(novoel);
		if(g_funcoesClickMapaDefault.toString().search("cliqueArea()") < 0)
		{g_funcoesClickMapaDefault.push("cliqueArea()");}
		if(g_funcoesMousemoveMapaDefault.toString().search("moveArea()") < 0)
		{g_funcoesMousemoveMapaDefault.push("moveArea()");}		
	}
	if (g_tipoacao != "area")
	{
		YAHOO.namespace("janelaDocaarea.xp");
		YAHOO.janelaDocaarea.xp.panel = new YAHOO.widget.Panel("mostraarea", {width:220,fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaDocaarea.xp.panel.render();
		YAHOO.janelaDocaarea.xp.panel.moveTo(imagemxi+150,imagemyi);
		var escondeWdocaarea = function()
		{
			richdraw.fecha();
			YAHOO.util.Event.removeListener(YAHOO.janelaDocaarea.xp.panel.close, "click");
			limpacontainerf();
		};
		YAHOO.util.Event.addListener(YAHOO.janelaDocaarea.xp.panel.close, "click", escondeWdocaarea);
		var temp = function(retorno)
		{
			i3GEO.janela.fechaAguarde("ajaxredesenha");
			g_areapixel = retorno.data;
			if (g_areapixel < 0)
			{alert("Nao e possivel calcular a area. Entre em contato com o administrador do sistema.");}
			else
			{
				alert("Clique no mapa para desenhar o poligono. Clique duas vezes para concluir");
				mudaiconf("area");
				g_tipoacao = "area";
				pontosdistobj = new pontosdist();
				criaContainerRichdraw();
				richdraw.lineColor = "green";
				richdraw.lineWidth = "2px";
			}
		};
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=areaPixel&celsize="+g_celula+"&g_sid="+i3GEO.configura.sid;
		cpObj.call(p,"areaPixel",temp);			
	}
	else
	{
		mudaiconf("pan");
		richdraw.fecha();
	}
}
/*
Function: mede
	
Ativa a op��o de medi��o de dist�ncias.

A medida � feita quando o usu�rio clica no mapa com esta op��o ativa

Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.

Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.
*/
function mede()
{
	//insere div para medida de distancias
	if (!$i("mostradistancia"))
	{
		var novoel = document.createElement("div");
		novoel.id = "mostradistancia";
		var ins = '<div class="hd" >&nbsp</div>';
		ins += '<div class="bd" style="text-align:left;padding:3px;" >';
		ins += '<div style="text-align:left;padding:3px;" id="mostradistancia_calculo" ></div>';
		ins += '<div style="text-align:left;font-size:10px" >';
		ins += "<span style='color:navy;cursor:pointer;text-align:left;' >";
		ins += "<input style='cursor:pointer' type='checkbox' id='pararraios' 'checked' />Raios</span>";
		ins += '</div>';
		ins+= '</div>';
		novoel.innerHTML = ins;
		novoel.style.borderColor="gray";
		document.body.appendChild(novoel);
		$i('pararraios').checked=true;
		if(g_funcoesClickMapaDefault.toString().search("cliqueMede()") < 0)
		{g_funcoesClickMapaDefault.push("cliqueMede()");}
		if(g_funcoesMousemoveMapaDefault.toString().search("moveMede()") < 0)
		{g_funcoesMousemoveMapaDefault.push("moveMede()");}
	}
	if (g_tipoacao != "mede")
	{
		YAHOO.namespace("janelaDocamede.xp");
		YAHOO.janelaDocamede.xp.panel = new YAHOO.widget.Panel("mostradistancia", {width:220,fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaDocamede.xp.panel.render();
		YAHOO.janelaDocamede.xp.panel.moveTo(imagemxi+150,imagemyi);
		var escondeWdocamede = function()
		{
			richdraw.fecha();
			YAHOO.util.Event.removeListener(YAHOO.janelaDocamede.xp.panel.close, "click");
		};
		YAHOO.util.Event.addListener(YAHOO.janelaDocamede.xp.panel.close, "click", escondeWdocamede);
		mudaiconf("mede");
		pontosdistobj = new pontosdist();
		$i("mostradistancia").style.display="block";
		//
		//verifica se existe o div para incluir as geometrias tempor�rias via svg ou vml
		//
		criaContainerRichdraw();
		richdraw.lineColor = "black";
		richdraw.lineWidth = "1px";	
	}
	else
	{
		mudaiconf("pan");
		richdraw.fecha();
		if($i("mostradistancia")){$i("mostradistancia").style.display="none";}
	}
}
/*
Function: inserexy
	
Ativa o bot�o de inser��o de pontos (digitaliza��o).
	
A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
e a vari�vel g_tipoacao � definida.
*/
function inserexy()
{
	if (g_tipoacao != "inserexy")
	{
		var temp = Math.random() + "a";
		temp = temp.split(".");
		g_nomepin = "pin"+temp[1];
		mudaiconf("inserexy");
		pontosdistobj = new pontosdist();
		wdocaf("400px","300px",i3GEO.configura.locaplic+'/ferramentas/inserexy2/index.htm',"","","Insere");
		if(g_funcoesClickMapaDefault.toString().search("cliqueInserexy()") < 0)
		{g_funcoesClickMapaDefault.push("cliqueInserexy()");}
	}
	else
	{mudaiconf("pan");}
}
/*
Function: inseregrafico

Ativa a op��o de inser��o de gr�ficos.
	
A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
e a vari�vel g_tipoacao � definida.
*/
function inseregrafico()
{
	if (g_tipoacao != "inseregrafico")
	{
		var temp = Math.random() + "gr";
		temp = temp.split(".");
		g_nomepin = "pin"+temp[1];
		mudaiconf("inseregrafico");
		wdocaf("400px","300px",i3GEO.configura.locaplic+'/ferramentas/inseregrafico/index.htm',"","","Insere");
		if(g_funcoesClickMapaDefault.toString().search("cliqueInseregrafico()") < 0)
		{g_funcoesClickMapaDefault.push("cliqueInseregrafico()");}
	}
	else
	{mudaiconf("pan");}
}
/*
Section: grades
*/
/*
Function: gradePontos

Abre a janela que gera grade de pontos
*/
function gradePontos()
{wdocaf("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradepontos/index.htm","","","Grade de pontos");}
/*
Function: gradePoligonos

Abre a janela que gera grade de poligonos
*/
function gradePol()
{wdocaf("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradepol/index.htm","","","Grade de pol&iacute;gonos");}
/*
Function: gradeHex

Abre a janela que gera grade de hex�gonos
*/
function gradeHex()
{wdocaf("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradehex/index.htm","","","Grade de hex&aacute;gonos");}

/*
Function: gradeCoord

Abre a janela que gera grade de coordenadas
*/
function gradeCoord()
{wdocaf("350px","280px",i3GEO.configura.locaplic+"/ferramentas/gradecoord/index.htm","","","Grade de coordenadas");}
/*
Section: atributos
*/
/*
Function: procuraratribf

Abre a janela com a op��o de procurar elementos baseados nos atributos da tabela do tema

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function procuraratribf(idtema)
{wdocaf("550px","340px",i3GEO.configura.locaplic+"/ferramentas/busca/index.htm?tema="+idtema,"","","Procurar");}
/*
Function: tabelaf

Abre a tabela com os atributos de um tema.

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function tabelaf(idtema)
{wdocaf("500px","400px",i3GEO.configura.locaplic+"/ferramentas/tabela/index.htm?tema="+idtema,"","","Tabela");}
/*
Function: etiquetas

Abre a janela de configura��o das etiquetas

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function etiquetas(idtema)
{wdocaf("400px","300px",i3GEO.configura.locaplic+"/ferramentas/etiqueta/index.htm?tema="+idtema,"","","Etiquetas");}
/*
Section: legenda
*/
/*
Function: opcoesLegenda

Abre a janela de configura��o da legenda do mapa

*/
function opcoesLegenda()
{wdocaf("300px","280px",i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/index.htm","","","Legenda");}
/*
Function: abreCor

Abre a paleta de cores

Parameters:

janela - id da janela que disparou a janela de cores

elemento - elemento da janela que receber� os valores de cor selecionada
*/
function abreCor(janela,elemento)
{
	i3GEO.janela.cria("400","240",i3GEO.configura.locaplic+"/ferramentas/colorpicker/index.htm?doc="+janela+"&elemento="+elemento,"","","Cor","i3geo_janelaCor",true);
}
/*
Function: editaLegenda

Abre a janela do editor de legenda de um tema

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function editaLegenda(idtema)
{wdocaf("490px","340px",i3GEO.configura.locaplic+"/ferramentas/legenda/index.htm?tema="+idtema,"","","Legenda");}
/*
Section: adi��o de temas
*/
/*
Function: nuvemTags

Mostra a nuvem de tags para escolha de temas baseado nos tags registrados nos menus de temas
*/
function nuvemTags()
{wdocaf("350px","350px",i3GEO.configura.locaplic+"/ferramentas/nuvemtags/index.htm","","","Nuvem de tags");}

/*
Function: navegacaoDir

Abre a janela para adicionar temas navegando pelos diret�rios do servidor
*/
function navegacaoDir()
{wdocaf("550px","350px",i3GEO.configura.locaplic+"/ferramentas/navegacaodir/index.htm","","","Diret&oacute;rios");}
/*
Function: conectarwms

Abre a janela para adicionar temas tendo como fonte um web service do tipo wms
*/
function conectarwms()
{wdocaf("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwms/index.htm","","","WMS");}
/*
Function: conectarwfs

Abre a janela para adicionar temas tendo como fonte um web service do tipo wfs
*/
function conectarwfs()
{wdocaf("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwfs/index.htm","","","WFS");}
/*
Function: conectargeorss

Abre a janela para adicionar temas tendo como fonte um georss
*/
function conectargeorss()
{wdocaf("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectargeorss/index.htm","","","GeoRSS");}
/*
Function: abreSistema

Abre em uma janela o programa escolhido pelo usu�rio e definido no menu de sistemas.

A lista de sistemas � lida de um arquivo xml definido no ms_configura.php

Parameters:

endereco - programa que ser� executado.
w - largura da janela.
h - altura da janela.
*/
function abreSistema(endereco,w,h)
{
	if(endereco != "")
	{wdocaf(w+"px",h+"px",endereco,"","","Sistemas");}
	else
	{alert("Endere�o n�o definido");}
}
/*
Function: upload

Abre a janela para o upload de shape file
*/
function upload()
{wdocaf("300px","230px",i3GEO.configura.locaplic+"/ferramentas/upload/index.htm","","","Upload");}
/*
Function: uploaddbf

Abre a janela para o upload de um arquivo dbf
*/
function uploaddbf()
{wdocaf("300px","280px",i3GEO.configura.locaplic+"/ferramentas/uploaddbf/index.htm","","","Upload");}
/*
Section: navega��o
*/
/*
Function: ativaHistoricoZoom
	
Insere na interface a op��o para mostrar o zoom anterior ou o pr�ximo.

Parameters:

iddiv - id do elemento HTML que receber� os �cones
*/	
function ativaHistoricoZoom(iddiv)
{
	if($i(iddiv))
	{
		marcadorZoom = "";
		var ins = "<table style='text-align:center;position:relative;left:";
		if(navm){ins += "0px;'>";}
		else
		{ins += "6px;'>";}
		ins += "<tr><td><img  id='i3geo_zoomanterior' class='zoomAnterior' title='anterior' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";
		ins += "<td>&nbsp;</td>";
		ins += "<td><img  id='i3geo_zoomproximo' class='zoomProximo' title='proximo' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";
		ins += "</tr></table>";
		$i(iddiv).innerHTML = ins;
		$i("i3geo_zoomanterior").onclick = function(){
			if(marcadorZoom == ""){marcadorZoom = i3GEO.gadgets.quadros.quadroatual;}
			if(i3GEO.gadgets.quadros.quadroatual > 0){
				marcadorZoom = marcadorZoom - 1;
				if(marcadorZoom >= 0)
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[marcadorZoom].extensao);
				else
				marcadorZoom = 0;
			}
		};
		$i("i3geo_zoomproximo").onclick = function(){
			if(marcadorZoom == ""){marcadorZoom = i3GEO.gadgets.quadros.quadroatual;}
			if(i3GEO.gadgets.quadros.quadroatual < i3GEO.gadgets.quadros.quadrosfilme.length){
				marcadorZoom = marcadorZoom + 1
				if(marcadorZoom < i3GEO.gadgets.quadros.quadrosfilme.length)
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[marcadorZoom].extensao);
			}
			else
			marcadorZoom = i3GEO.gadgets.quadros.quadrosfilme.length;
		};
	}
}
/*
Function: lenteDeAumento

Cria a lente de aumento.

A lente de aumento permite visualizar a mesma imagem do mapa de forma ampliada, por�m, em uma janela menor. A imagem � mostrada conforme a posi��o do mouse sobre o corpo do mapa.
*/
function lenteDeAumento()
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
		if(g_funcoesMousemoveMapaDefault.toString().search("movelentef()") < 0)
		{g_funcoesMousemoveMapaDefault.push("movelentef()");}		

	}
	with($i('boxlente').style){borderWidth='1' + g_postpx;borderColor="red";}
	if (g_lenteaberta == "sim")
	{
		$i("lente").style.display = "none";
		$i("boxlente").style.display = "none";
		$i('boxlente').style.borderWidth = 0;
		g_lenteaberta = "nao";
	}
	else
	{
		g_lenteaberta = "sim";
		i3GEO.janela.abreAguarde("ajaxabrelente",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+i3GEO.configura.sid;
		cpObj.call(p,"lente",ajaxabrelente);
	}
}
/*
Section: outros
*/
/*
Function: abreDoc

Abre a documentacao do i3geo.
*/
function abreDoc()
{window.open(i3GEO.configura.locaplic+"/documentacao/index.html");}

/*
Function: downloadbase

Abre o aplicativo datadownload

Veja:

<datadownload.htm>
*/
function downloadbase()
{window.open(i3GEO.configura.locaplic+"/datadownload.htm");}
/*
Function: download

Abre a janela que faz o download de um tema

Parameters:

idtema - id ue identifica o tema no map file.
*/
function download(idtema)
{wdocaf("300px","150px",i3GEO.configura.locaplic+"/ferramentas/download/index.htm?tema="+idtema,"","","Download");}

/*
Function: opcoesEscala

Abre a janela para defini��o das op��es da barra de escala.
*/
function opcoesEscala()
{wdocaf("250px","300px",i3GEO.configura.locaplic+"/ferramentas/opcoes_escala/index.htm",objposicaomouse.x - 75,objposicaomouse.y - 260,"Escala");}
/*
Function: textofid

Abre a ferramenta de inclus�o de textos no mapa.

A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
e a vari�vel g_tipoacao � definida.
*/
function textofid()
{
	if (g_tipoacao != "textofid")
	{
		var temp = Math.random() + "b";
		temp = temp.split(".");
		g_nomepin = "pin"+temp[1];
		mudaiconf("textofid");
		pontosdistobj = new pontosdist();
		g_tipoacao = "textofid";
		wdocaf("360px","250px",i3GEO.configura.locaplic+"/ferramentas/inseretxt/index.htm","","","Texto");
		if(g_funcoesClickMapaDefault.toString().search("cliqueInseretoponimo()") < 0)
		{g_funcoesClickMapaDefault.push("cliqueInseretoponimo()");}
	}
	else
	{mudaiconf("pan");}
}
//testa se esse script foi carregado
function testaferramentas()
{}
