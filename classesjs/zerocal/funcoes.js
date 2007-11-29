/*
Title: Fun��es gerais

Fun��es de uso geral para processamento de dados

File: funcoes.js

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
Function: $im

Retorna o caminho correto de uma imagem.

Exemplo: $im("imagem.png")

Par�metros:

g - nome da imagem

Retorno:

string - caminho para a imagem
*/
$im = function(g)
{return g_locaplic+"/imagens/"+g;};
/*
Function: $top

Muda a posi��o (superior) de um objeto tanto no IE como no Firefox.

Exemplo: $top("imagem",100)

Par�metros:

id - identificador do objeto

valor - posi��o em rela��o ao topo.
*/
$top = function(id,valor)
{
	if (navm)
	{document.getElementById(id).style.pixelTop=valor;}
	else
	{document.getElementById(id).style.top=valor+"px";}
};
/*
Function: $left

Muda a posi��o (esquerda) de um objeto tanto no IE como no Firefox.

Exemplo: $left("imagem",100)

Par�metros:

id - identificador do objeto

valor - posi��o em rela��o a esquerda.
*/
$left = function(id,valor)
{
	if (navm)
	{document.getElementById(id).style.pixelLeft=valor;}
	else
	{document.getElementById(id).style.left=valor+"px";}
};
/*
Function: trataErro

Trata o erro de um try cacth.
*/
function trataErro()
{
	objaguarde.fecha("ajaxdestaca");
	objaguarde.fecha("ajaxabrelente");
	objaguarde.fecha("ajaxiniciaParametros");
	objaguarde.fecha("ajaxredesenha");
	objaguarde.fecha("ajaxCorpoMapa");
	objaguarde.fecha("ajaxLegenda");
	objaguarde.fecha("ajaxReferencia");
	objaguarde.fecha("ajaxEscalaGrafica");
	objaguarde.fecha("montaMapa");
	objaguarde.fecha("aguardedoc");
}
/*
Function: iCookie

Insere um cookie.
*/
function iCookie(nome,valor)
{
	document.cookie = nome+"="+valor;
}
/*
Function: pCookie

Pega um cookie.
*/
function pCookie(nome)
{
	var cookies = document.cookie;
	var i = cookies.indexOf(nome);
	if(i == -1)
	{return null;}
	var fim = cookies.indexOf(";",i);
	if (fim == -1)
	{var fim = cookies.length;}
	return (unescape(cookies.substring(i,fim))).split("=")[1];
}
/*
Section: interface
*/
/*
Function: initJanelaMen

Abre a janela com as mensagens de ajuda ao usu�rio

*/
function initJanelaMen()
{
	if (!$i("janelaMen"))
	{
		var novoel = document.createElement("div");
		with(novoel)
		{
			id = "janelaMen";
			style.display="block";
			style.border="1px solid rgb(170,170,170)";
			innerHTML = '<div class="hd">&nbsp;</div><div class="bd" ><div id="janelaMenTexto" style="color:rgb(170,170,170)">'+g_mensagempadrao+'</div></div>';
		}
		document.body.appendChild(novoel);
		with($i("janelaMenTexto"))
		{
			style.textAlign="left";
			style.fontSize="10px";
		}
		YAHOO.namespace("janelaMen.xp");
		YAHOO.janelaMen.xp.panel = new YAHOO.widget.Panel("janelaMen", { width:"266px", height:"auto", fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaMen.xp.panel.render();
		var escondeMen = function()
		{
			YAHOO.util.Event.removeListener(YAHOO.janelaMen.xp.panel.close, "click");
			YAHOO.janelaMen.xp.panel.destroy();	
			iCookie("g_janelaMen","nao");	
		};
		YAHOO.util.Event.addListener(YAHOO.janelaMen.xp.panel.close, "click", escondeMen);
		iCookie("g_janelaMen","sim");
	}
	YAHOO.janelaMen.xp.panel.show();
	YAHOO.janelaMen.xp.panel.moveTo(imagemxi - 267 ,objmapa.h - 70);
}
/*
Function: ativaGuias

Ativa as guias principais do mapa, definindo as fun��es que ser�o executadas quando a guia � escolhida.

As guias principais s�o definidas nos objetos

objmapa.guiaTemas

objmapa.guiaMenu

objmapa.guiaLegenda

objmapa.guiaListaMapas

*/
function ativaGuias()
{
	//ajusta as guias da vers�o antiga do YUI
	//pega o elemento onde est�o os tabs
	for(g=0;g<12;g++)
	{
		if ($i("guia"+g))
		var gpai = $i("guia"+g).parentNode;
	}
	if(gpai)
	{
		gpai.id = "guiasYUI";
		gpai.className = "yui-navset";
		var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 2px;border-color:rgb(240,240,240)">';
		if($i(objmapa.guiaTemas))
		{$i(objmapa.guiaTemas).innerHTML = $trad("g1");}
		if($i(objmapa.guiaMenu))
		{$i(objmapa.guiaMenu).innerHTML = $trad("g2");}
		if($i(objmapa.guiaLegenda))
		{$i(objmapa.guiaLegenda).innerHTML = $trad("g3");}
		if($i(objmapa.guiaListaMapas))
		{$i(objmapa.guiaListaMapas).innerHTML = $trad("g4");}
		for(g=0;g<12;g++)
		{
			if ($i("guia"+g))
			{
				var tituloguia = $i("guia"+g).innerHTML;
				var re = new RegExp("&nbsp;", "g");
				var tituloguia = tituloguia.replace(re,'');
				ins += '<li><a href="#"><em><div id="guia'+g+'" >'+tituloguia+'</div></em></a></li>';
			}
		}
		ins += "</ul>";
		gpai.innerHTML = ins;
		for(g=0;g<12;g++)
		{
			if ($i("guia"+g))
			{
				eval('$i("guia'+g+'").onclick = function(){g_guiaativa = "guia'+g+'";mostraguiaf('+g+');}');
				$i("guia"+g+"obj").style.overflow="auto";
				$i("guia"+g+"obj").style.height = objmapa.h;
			}
		}
	}
	//guias
	if ($i(objmapa.guiaTemas))
	{
		$i(objmapa.guiaTemas).onclick = function()
		{g_guiaativa = objmapa.guiaTemas;mostraguiaf(1);};
	}
	if ($i(objmapa.guiaMenu))
	{
		$i(objmapa.guiaMenu).onclick = function()
		{
			g_guiaativa = objmapa.guiaMenu;
			mostraguiaf(2);
			if (!$i("buscatema"))
			{
				var pegalistademenus = function(retorno)
				{
					if (retorno.data == "")
					{pegaListaDeGrupos("","sim");}
					else
					{
						for (j=0;j<retorno.data.length;j++)
						{
							if(j == retorno.data.length-1)
							{pegaListaDeGrupos(retorno.data[j].idmenu,"sim");}
							else
							{pegaListaDeGrupos(retorno.data[j].idmenu,"nao");}
						}
					}
				};
				//pega a lista de �rvores que devem ser montadas
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistademenus&g_sid="+g_sid;
				cpObj.call(p,"pegalistademenus",pegalistademenus);
			}
		};
	}
	if ($i(objmapa.guiaLegenda))
	{
		$i(objmapa.guiaLegenda).onclick = function()
		{g_guiaativa = objmapa.guiaLegenda;mostraguiaf(4);objmapa.atualizaLegendaHTML();};
	}
	if ($i(objmapa.guiaListaMapas))
	{
		$i(objmapa.guiaListaMapas).onclick = function()
		{
			g_guiaativa = objmapa.guiaListaMapas;
			mostraguiaf(5);
			if ($i("banners"))
			{
				$i("banners").innerHTML == $trad("o1");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+g_sid;
				cpObj.call(p,"pegaMapas",pegaMapas);
			}
			else
			{alert("id banners nao encontrado");}
		};
	}
}
/*
Function: mensagemf

Abre uma mensagem na tela em um DIV.

Parameters:

m - mensagem que ser� mostrada.
*/
function mensagemf(m)
{
	//insere o div para mensagens
	if (!$i("mensagem"))
	{
		var novoel = document.createElement("div");
		novoel.id = 'mensagem';
		novoel.innerHTML = '<table width="50" style="border: 1px solid #000000;"> <tr> <td onclick="mensagemf()" style="text-align:left;cursor:pointer" class="tdclara"> <img src='+$im("excluir.png")+' /> </td> <td style="text-align:left" class="tdclara"> <input style="text-align:left" class="textocb" type="text" id="mensagemt" size="50" value="" /> </td></tr> </table>';
		document.body.appendChild(novoel);
	}
	if (m == null)
	{$i("mensagem").style.visibility = "hidden";}
	else
	{
		$i("mensagemt").value = m;
		$i("mensagem").style.visibility = "visible";
	}
	eval ('document.getElementById("mensagem").style.' + g_tipoleft + ' = imagemxi + g_postpx');
	eval ('document.getElementById("mensagem").style.' + g_tipotop + ' = imagemyi + g_postpx');
}
/*
Function: wdocaf

Abre a janela doc�vel para executar algum programa.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

wsrc - endere�o do conte�do que ser� aberto

nx - posi��o da janela em x

ny - posi��o da janela em y

texto - texto que ser� mostrado no t�tulo da janela
*/
function wdocaf(wlargura,waltura,wsrc,nx,ny,texto)
{
	if($i("boxg"))
	{$i("boxg").style.display = "none";}
	var wlargura_ = parseInt(wlargura)+0+"px";
	YAHOO.namespace("janelaDoca.xp");
	if ($i("wdoca"))
	{YAHOO.janelaDoca.xp.panel.destroy();}
	var ins = '<div class="hd">'+texto+'</div><div class="bd"><iframe name="wdocai" id="wdocai" valign="top" style="border:0px white solid"></iframe></div>';
	var novoel = document.createElement("div");
	with(novoel)
	{
		id = "wdoca";
		style.display="block";
		innerHTML = ins;
	}
	document.body.appendChild(novoel);
	if ($i("wdocai"))
	{
		with ($i("wdocai").style){width = "100%";height=waltura;};
		$i("wdoca").style.display = "block";
		$i("wdocai").src = wsrc;
	}
    YAHOO.janelaDoca.xp.panel = new YAHOO.widget.Panel("wdoca", { width: wlargura_, fixedcenter: false, constraintoviewport: false, visible: true, iframe:false} );
    YAHOO.janelaDoca.xp.panel.moveTo(imagemxi,imagemyi+50);
    YAHOO.janelaDoca.xp.panel.render();
	var escondeWdoca = function()
	{
		$i("wdoca").style.display = "none";
		$i("wdocai").src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca.xp.panel.close, "click");
		YAHOO.janelaDoca.xp.panel.destroy();
		if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
		{mudaiconf("pan");}
		//esconde o box do google
		if ($i("boxg"))
		{$i("boxg").style.display = "none";}
		//fecha o container de desenho de elementos na tela
		limpacontainerf();
	};
	YAHOO.util.Event.addListener(YAHOO.janelaDoca.xp.panel.close, "click", escondeWdoca);
}
/*
Function: redimwdocaf

Redimensiona a janela doc�vel.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

*/
function redimwdocaf(wlargura,waltura)
{
	if ($i("wdoca"))
	{
		with($i("wdoca"))
		{
			style.width = wlargura;
			style.height = waltura;
		}
	}
}
/*
Function: wdocaf2

Abre uma segunda janela doc�vel para executar algum programa relativo a outra janela.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

wsrc - endere�o do conte�do que ser� aberto

nx - posi��o da janela em x

ny - posi��o da janela em y

texto - texto que ser� mostrado no t�tulo da janela
*/
function wdocaf2(wlargura,waltura,wsrc,nx,ny,texto)
{
	if (!$i("wdoca2"))
	{
		var ins = '<div class="hd">&nbsp;</div><div class="bd"><iframe name="wdocai2" id="wdocai2"  valign="top" ></iframe></div></div>';
		var novoel = document.createElement("div");
		with(novoel)
		{
			id = "wdoca2";
			style.display="none";
			innerHTML = ins;
		}
		document.body.appendChild(novoel);
	}
	YAHOO.namespace("janelaDoca2.xp");
	YAHOO.janelaDoca2.xp.panel = new YAHOO.widget.Panel("wdoca2", {width:wlargura, fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:true } );
	YAHOO.janelaDoca2.xp.panel.moveTo(imagemxi,imagemyi);
	YAHOO.janelaDoca2.xp.panel.render();
	YAHOO.janelaDoca2.xp.panel.show();
	with ($i("wdocai2").style){width = "100%";height = waltura;}
	$i("wdoca2").style.display = "block";
	$i("wdocai2").src = wsrc;
	var escondeWdoca2 = function()
	{
		$i("wdoca2").style.display = "none";
		$i("wdocai2").src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca2.xp.panel.close, "click");
	};
	YAHOO.util.Event.addListener(YAHOO.janelaDoca2.xp.panel.close, "click", escondeWdoca2);
}
/*
Function: wdocafechaf

Fecha uma janela doc�vel.

Depreciado

Parameters:

odoca - objeto janela
*/
function wdocafechaf(odoca)
{
	$i(odoca).style.display="none";
	if ((odoca != "wdocaref") && (odoca != "wdocac"))
	{
		if($i("wdocain")){$i("wdocain").value = "";}
		if($i("wdocadiv")){$i("wdocadiv").innerHTML = "";$i("wdocadiv").display="none";}
		if ($i("temp")){$i("temp").value == "";}
		$i("wdocai").src = "";
		$i("imgh").style.visibility="visible";
	}
	if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
	{mudaiconf("pan");}
}
/*
Function: mostradicasf

Mostra dicas sobre uma fun��o quando o mouse passa sobre um bot�o ou outra op��o qualquer.

Parameters:

objeto - objeto sobre o qual o mouse est� sobreposto.

dica - dica que aparece no mapa.

*/
function mostradicasf(objeto,dica,hlpt)
{
	if ($i("ajuda"))
	{
		if (dica == ""){$i("ajuda").innerHTML="-";}
		else
		{
			g_hlpt = hlpt;
			$i("ajuda").innerHTML= "<b>"+dica+" </b>";
		}
	}
	if ($i("janelaMenTexto"))
	{
		if (dica == ""){dica = g_mensagempadrao;}
		$i("janelaMenTexto").innerHTML= "<b>"+dica+" </b>";
	}
}
/*
Function: mudaiconf

Muda as bordas dos �cones de ferramentas, passando todos para normal.
Aplica uma borda sobre um �cone espec�fico

Parameters:

i - id do �cone que receber� a borda.
*/
function mudaiconf(i)
{
	//limpa o container com os tips fixos na tela
	for(ot=0;ot<objmapa.objtips.length;ot++)
	{
		if (objmapa.objtips[ot])
		{
			objmapa.objtips[ot].innerHTML = "";
			objmapa.objtips[ot].style.display="none";
		}
	}
	objmapa.objtips = new Array();
	limpacontainerf();
	var objetos=["inseregrafico","textofid","zoomli","zoomlo","zoomiauto","zoomoauto","pan","identifica","mede","inserexy","selecao"];
	for (ko=0;ko<objetos.length; ko++)
	{
		if ($i(objetos[ko]))
		with ($i(objetos[ko]).style){borderWidth=0;borderBottomWidth=1;borderLeftWidth=1;borderColor='rgb(50,50,50)';}
	}
	g_tipoacao = i;
	if($i(i))
	{
		with ($i(i).style){borderLeftWidth='0px';borderBottomWidth='0px';borderColor='black';}
	}
	$i("imgh").style.display="block";
	if ($i("divGeometriasTemp"))
	{$i("divGeometriasTemp").style.display = "none";}
	switch(i)
	{
		case "zoomli":
		$i("imgh").src= g_localimg + "/" + "ic_zoom.png";
		if($i("img")){$i("img").title = "";}
		break;
		case "pan":
		$i("imgh").src= g_localimg + "/" + "icon_pan.gif";
		if($i("img")){$i("img").title = "";}
		break;
		case "mede":
		$i("imgh").src= g_localimg + "/" + "mede.gif";
		break;
		case "inserexy":
		$i("imgh").src= g_localimg + "/" + "ic_xy.png";
		if($i("img")){$i("img").title = "clique para inserir um ponto";}
		break;
		case "textofid":
		$i("imgh").src= g_localimg + "/" + "ic_xy.png";
		if($i("img")){$i("img").title = "clique para inserir o texto";}
		break;
		case "selecao":
		$i("imgh").src= g_localimg + "/" + "ic_seleciona.png";
		if($i("img")){$i("img").title = "clique para selecionar";}
		break;
		case "inseregrafico":
		$i("imgh").src= g_localimg + "/" + "ic_seleciona.png";
		if($i("img")){$i("img").title = "clique para incluir o gr�fico";}
		break;
		case "identifica":
		$i("imgh").src= g_localimg + "/" + "ic_identifica.png";
		if($i("img")){$i("img").title = "";}
		break;
	}
}
/*
Function: mostraguiaf

Ativa a visualiza��o de uma determinada guia.

Par�metros:

guia - n�mero da guia que ser� ativada.
*/
function mostraguiaf(guia)
{
	if ($i("guia"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10];
		for (j=0;j<fs.length; j++)
		{
			if ($i("guia"+fs[j]))
			{
				jj = fs[j];
				if ($i("guia"+jj+"obj"))
				{$i("guia"+jj+"obj").style.display="none";}
			}
		}
		if ($i("guia"+guia+"obj"))
		{$i("guia"+guia+"obj").style.display="block";}
		else
		{alert("O objeto guia"+guia+"obj nao existe.");}
	}
}
/*
Function: aguarde

Cria um objeto aguarde.
O objeto � um banner mostrado na tela quando uma fun��o ajax � executada.

Method:

abre - abre o banner

Par�metros:

aguardeId - identificador do banner

texto - texto do banner

Method:

fecha - fecha o banner

Par�metros:

aguardeId - identificador do banner

*/
function aguarde()
{
	this.abre = function(aguardeId,texto)
	{
		YAHOO.namespace("aguarde."+aguardeId);
		eval ('YAHOO.aguarde.'+aguardeId+' = new YAHOO.widget.Panel("wait",{width:"240px",fixedcenter:false,underlay:"none",close:true,draggable:false,modal:true})');
		eval ('YAHOO.aguarde.'+aguardeId+'.setBody("<span style=font-size:12px; >"+texto+"</span>")');
		eval ('YAHOO.aguarde.'+aguardeId+'.body.style.height="20px"');
		eval ('YAHOO.aguarde.'+aguardeId+'.setHeader("<span><img src=\'"+g_locaplic+"/imagens/aguarde.gif\' /></span>")');
		eval ('YAHOO.aguarde.'+aguardeId+'.render(document.body)');
		eval ('YAHOO.aguarde.'+aguardeId+'.moveTo('+imagemxi+','+imagemyi+')');
		eval ('YAHOO.aguarde.'+aguardeId+'.show()');
	};
	this.fecha = function(aguardeId)
	{
		if ($i("wait"))
		{
			if (eval('YAHOO.aguarde.'+aguardeId))
			{
				if ($i(eval('YAHOO.aguarde.'+aguardeId+".id")))
				{eval('YAHOO.aguarde.'+aguardeId+'.destroy()');}
			}
		}
	};
}
/*
Function: ativaClicks

Ativa as opera��es de clique sobre o mapa

Define o que ser� executado quando o mouse � clicado ou movido sobre o mapa
*/
function ativaClicks(docMapa)
{
	docMapa.onmouseover = function()
	{
		if ($i("imgh")){$i("imgh").style.display="block";}
		if ($i("janelaMenu"))
		{$i("janelaMenu").style.display="none";}
		//verifica se o mouse esta parado
		if (objmapa.parado!="cancela")
		{
			objmapa.parado="nao";
			verificaTip();
		}
		if ($i("tip"))
		{$i("tip").style.display="none";}
		this.onmousemove=function(exy)
		{
			if ($i("tip"))
			{$i("tip").style.display="none";}
			capturaposicao(exy);
			if (g_destaca != "")
			{$i("imgh").style.display="none";$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - destacaTamanho)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - destacaTamanho)+')';}
			//if (g_realca == "sim")
			//{
			//	$i("areaRealce").style.left = objposicaocursor.telax - destacaTamanho + 10;
			//	$i("areaRealce").style.top = objposicaocursor.telay - destacaTamanho + 10;
			//}
			if ($i("img") && (g_panM == "sim"))
			{
				var nx = objposicaocursor.telax - leftinicial - clicinicialx;
				var ny = objposicaocursor.telay - topinicial - clicinicialy;
					var l = 0;
					if (parseInt($i("i3geo").style.left))
					{var l = parseInt($i("i3geo").style.left);}
					$i("img").style.left = nx - l;
					var t = 0;
					if (parseInt($i("i3geo").style.top))
					{var t = parseInt($i("i3geo").style.top);}
					$i("img").style.top = ny - t;
			}
			objmapa.verificaMousemoveMapa();
		};
	};
	docMapa.onmouseout = function()
	{
		objmapa.parado="parar";
		mostradicasf(this,'');
		if ($i("imgh")){$i("imgh").style.display="none";}
	};
	docMapa.onmousedown = function()
	{
		$i("imgh").style.display="none";
		//verifica se esta na opï¿½o de zoom box
		if ((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox"))
		{
			// inicia retï¿½gulo de zoom
			$i("imgh").style.display="none";
			with($i("box1").style)
			{width=0;height=0;visibility="visible";display="none"}
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
		}
		if ($i("img") && (g_tipoacao == "pan"))
		{
			g_panM = "sim";
			leftinicial = parseInt($i("corpoMapa").style.left);
			topinicial = parseInt($i("corpoMapa").style.top);
			clicinicialx = objposicaocursor.imgx;
			clicinicialy = objposicaocursor.imgy;
			ddinicialx = objposicaocursor.ddx;
			ddinicialy = objposicaocursor.ddy;
		}
	};
	docMapa.onclick = function()
	{objmapa.verificaClickMapa();};
	docMapa.onmouseup = function()
	{
		if (g_tipoacao == "zoomli"){zoomboxf("termina");}
		if (g_tipoacao == "selecaobox"){zoomboxf("termina");}
		if ($i("img") && (g_tipoacao == "pan"))
		{
			g_panM = "nao";
			var disty = (ddinicialy * -1) + objposicaocursor.ddy; //teladd[1]
			var distx = (ddinicialx * -1) + objposicaocursor.ddx; //teladd[0]
			var ex = objmapa.extent;
			var ex = ex.split(" ");
			var novoxi = (ex[0] * 1) - distx;
			var novoxf = (ex[2] * 1) - distx;
			var novoyi = (ex[1] * 1) - disty;
			var novoyf = (ex[3] * 1) - disty;
			if ((distx == 0)||(disty == 0))
			{
				objaguarde.abre("ajaxredesenha",$trad("o1"));
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&x="+objposicaocursor.imgx+"&y="+objposicaocursor.imgy+"&g_sid="+g_sid;
				cpObj.call(p,"pan",ajaxredesenha);
				return;
			}
			var nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
			objaguarde.abre("ajaxredesenha",$trad("o1"));
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+nex+"&g_sid="+g_sid;
			cpObj.call(p,"mudaExtensao",ajaxredesenha);
		}
	};
}
/*
Section: navega��o
*/
/*
Function: initJanelaRef

Abre a janela com o mapa de referencia

*/
function initJanelaRef()
{
	if (!$i("winRef"))
	{
		var novoel = document.createElement("div");
		with (novoel)
		{
			id = "winRef";
			style.display="none";
			style.borderColor="gray";
		}
		var ins = '<div class="hd">Refer&ecirc;ncia</div>';
		ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="javascript:movimentoRef(this)" onclick="javascript:clicouRef()">';
		ins += '<img style="cursor:pointer;" id=imagemReferencia src="" />';
		ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
		$i("imagemReferencia").style.height = objmapa.refheight+"px";
	}
	$i("winRef").style.display = "block";
	YAHOO.namespace("janelaRef.xp");
	YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
	YAHOO.janelaRef.xp.panel.render();
	if (navm){YAHOO.janelaRef.xp.panel.moveTo((imagemxi+objmapa.w-160),imagemyi+4);}
	else
	{YAHOO.janelaRef.xp.panel.moveTo((imagemxi+objmapa.w-160),imagemyi+4);}
	var escondeRef = function()
	{
		YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close, "click");
		YAHOO.janelaRef.xp.panel.destroy();	
		iCookie("g_mapaRefDisplay","none");	
	};
	//YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close, "click", escondeRef);	
	iCookie("g_mapaRefDisplay","block");
	objmapa.atualizaReferencia();
}
/*
Function: mudaboxnf

Posiciona o botao aplicar quando o check box que liga/desliga um tema � pressionado.

Par�metros:

tipo - de onde veio a requisicao ligadesliga|adicionatema
*/
function mudaboxnf(tipo)
{
	g_operacao = tipo;
	clearTimeout(objmapa.tempo);
	objmapa.tempo = setTimeout('remapaf()',(4000));
	if ($i("aplicari"))
	{
		$i("aplicari").style.display="block";
		if (navm)
		{
			mx = objposicaomouse.x - 10;
			my = objposicaomouse.y - 15;
			with ($i("aplicari").style)
			{
				pixelLeft = mx+document.body.scrollLeft;
				pixelTop = my+document.body.scrollTop;
			}
		}
		if (navn)
		{
			var l = objposicaomouse.x;
			var t = objposicaomouse.y+document.body.scrollTop;
			with ($i("aplicari").style)
			{
				left = l;
				top = t;
			}
		}
	}
}
/*
Function: movelentef

Move a imagem na lente de aumento conforme o moveimento do mouse sobre o mapa.
*/
function movelentef()
{
	if ($i("lente"))
	{
		if ($i("lente").style.visibility=="visible")
		{
			var esq = (objposicaocursor.telax - imagemxi) * 2.25;
			var topo = (objposicaocursor.telay - imagemyi) * 2.25;
			var clipt = "rect("+ (topo - 40) + " " + (esq + 40) + " " + (topo + 40) + " " + (esq - 40) +")";
			with ($i("lente").style)
			{
				clip = clipt;
				eval (g_tipotop + "= (imagemyi - (topo - 40)) + g_postpx");
				eval (g_tipoleft +  "= (imagemxi - (esq - 40)) + g_postpx");
			}
		}
	}
}
/*
Function: zoomiauto

Aproxima o mapa tendo o centro como refer�ncia.
*/
function zoomiauto()
{
	objaguarde.abre("ajaxredesenha",$trad("o1"));
	g_fatordezoom = 0;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=aproxima&nivel=2&g_sid="+g_sid;
	g_operacao = "navega";
	cpObj.call(p,"aproxima",ajaxredesenha);
}
/*
Function: zoomoauto

Afasta o mapa tendo o centro como refer�ncia.
*/
function zoomoauto()
{
	objaguarde.abre("ajaxredesenha",$trad("o1"));
	g_fatordezoom = 0;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=afasta&nivel=2&g_sid="+g_sid;
	g_operacao = "navega";
	cpObj.call(p,"afasta",ajaxredesenha);
}
/*
Function: zoomboxf

Faz o zoom no mapa utilizando a op��o de desenhar um ret�ngulo.

As coordenadas de tela devem estar no objeto "objposicaocursor".
A op��o "desloca" altera a posi��o do box (box1) na tela. A op��o "termina", pega as coordenadas
de tela do box1 e chama a fun��o ajax que redesenha o mapa.

Parameters:

tipo - desloca|termina
*/
function zoomboxf (tipo)
{
	var bx = $i("box1");
	switch(tipo)
	{
		case "desloca":
		// muda o ret�gulo de zoom conforme deslocamento do mouse
		bx.style.display="block";
		ppx = objposicaocursor.telax;
		py = objposicaocursor.telay;
		if (navm)
		{
			if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
			{with(bx.style){width = ppx - boxxini - 2;}}
			if ((py > boxyini) && ((py - boxyini - 2) > 0))
			{
				with(bx.style)
				{height = py - boxyini - 2;}
			}
			if (ppx < boxxini)
			{with(bx.style){left = ppx;width = boxxini - ppx + 2;}}
			if (py < boxyini)
			{with(bx.style){top = py;height = boxyini - py + 2;}}
		}
		else
		{
			if (ppx > boxxini)
			{with(bx.style){width = ppx - boxxini - 15 + "px";}}
			if (py > boxyini)
			{with(bx.style){height = py - boxyini - 15 + "px";}}
			if (ppx < boxxini)
			{with(bx.style){left = ppx + "px";width = boxxini - ppx + 15 + "px";}}
			if (py < boxyini)
			{with(bx.style){top = py + "px";height = boxyini - py + 15 + "px";}}
		}
		break;
		case "termina":
		// finaliza o ret�gulo de zoom
		md = 1;
		eval ('pix = parseInt(document.getElementById("box1").style.' + g_tipoleft + ")");
		eval ('piy = parseInt(document.getElementById("box1").style.' + g_tipotop + ")");
		xfig0 = parseInt(bx.style.width) - imagemxi;
		yfig0 = parseInt(bx.style.height) - imagemyi;
		xfig = pix + (parseInt(bx.style.width)) - imagemxi;
		yfig = piy + (parseInt(bx.style.height)) - imagemyi;
		amext = objmapa.extent.split(" ");
		dx = ((amext[0] * -1) - (amext[2] * -1)) / (tamanhox - 1);
		dy = ((amext[1] * 1) - (amext[3] * 1)) / (tamanhoy - 1);
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x1 = (amext[0] * 1) + nx;
		y1 = (amext[3] * 1) - ny;
		xfig = pix - imagemxi;
		yfig = piy - imagemyi;
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x2 = (amext[0] * 1) + nx;
		y2 = (amext[3] * 1) - ny;
		v = x2+" "+y2+" "+x1+" "+y1;
		// se o retangulo for negativo pula essa parte para n� gerar erro
		if (g_tipoacao != "selecaobox")
		{
			if (x1 != x2)
			{
				objmapa.extent=v;
				objaguarde.abre("ajaxredesenha",$trad("o1"));
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+v+"&g_sid="+g_sid;
				cpObj.call(p,"mudaExtensao",ajaxredesenha);
			}
		}
		else
		{
			if (x1 != x2)
			{
				var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				var tipo = "adiciona";
				//pega o tipo de operacao da janela de selecao
				if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
				if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
				//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
				if ((tipo != "limpa") && (tipo != "inverte"))
				{
					objaguarde.abre("ajaxredesenha",$trad("o1"));
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=selecaobox&ext="+v+"&g_sid="+g_sid+"&tipo="+tipo+"&tema="+objmapa.temaAtivo;
					cpObj.call(p,"selecaobox",ajaxredesenha);
				}
			}
		}		
		with(bx.style){visibility="hidden";width = 0; height = 0;}
		document.getElementById("imgh").style.display="block";
		break;
	}
}
/*
Function: zoomIP

Localiza no mapa o usu�rio baseado em seu n�mero IP.
*/
function zoomIP()
{
	var xxx = convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
	var yyy = convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
	var mostraIP = function(retorno)
	{
		if (retorno.data.latitude != null)
		{
			objaguarde.abre("ajaxredesenha",$trad("o1"));
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&tamanho=14&xy="+retorno.data.longitude+" "+retorno.data.latitude+"&g_sid="+g_sid;
			cpObj.call(p,"zoomPonto",ajaxredesenha);
		}
		else
		{alert("Nao foi possivel identificar a localizacao.");}
	};
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=localizaIP&g_sid="+g_sid;
	cpObj.call(p,"localizaIP",mostraIP);	
}
/*
Function: zoomPonto

Localiza uma coordenada no mapa.
*/
function zoomPonto()
{
	if ($i("xg"))
	{
		var xxx = convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
		var yyy = convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
		objaguarde.abre("ajaxredesenha",$trad("o1"));
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&xy="+xxx+" "+yyy+"&g_sid="+g_sid;
		cpObj.call(p,"zoomPonto",ajaxredesenha);
	}
}
/*
Function: clicouRef

Altera a abrang�ncia do mapa quando o mapa de refer�ncia � clicado

*/
function clicouRef()
{
	objposicaocursor.refx = objposicaocursor.refx - parseInt(YAHOO.janelaRef.xp.panel.element.style.left) - 5;
	objposicaocursor.refy = objposicaocursor.refy - parseInt(YAHOO.janelaRef.xp.panel.element.style.top) - 25;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&tipo=ref&x="+objposicaocursor.refx+"&y="+objposicaocursor.refy+"&g_sid="+g_sid;
	cpObj.call(p,"pan",ajaxredesenha);
}
/*
Function: movimentoRef

Pega a coordenada do cursor sobre o mapa de refer�ncia

*/
function movimentoRef(obj)
{
	obj.onmousemove =function(exy)
	{
		if (navm){capturaposicao(obj);}
		else{capturaposicao(exy);}
	};
}
/*
Function: aplicaescala

Aplica a escala numerica definida no formul�rio existente no mapa.
*/
function aplicaescala()
{
	if ($i("escalanum"))
	{var nova = $i("escalanum").value;}
	else
	{var nova = objmapa.scale;}
	objaguarde.abre("ajaxredesenha",$trad("o1"));
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaescala&escala="+nova+"&g_sid="+g_sid;
	g_operacao = "outras";
	cpObj.call(p,"mudaEscala",ajaxredesenha);
}
/*
Function: zoomtot

Zoom para a extens�o default.
*/
function zoomtot()
{
	objaguarde.abre("ajaxredesenha",$trad("o1"));
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+objmapa.extentTotal+"&g_sid="+g_sid;
	g_operacao = "navega";
	cpObj.call(p,"mudaExtensao",ajaxredesenha);
}
/*
Function: panFixo

Desloca o mapa em uma dire��o determinada.
*/
function panFixo(direcao)
{
	if (direcao == "norte")
	{
		var y = objmapa.h / 6;
		var x = objmapa.w / 2;
	}
	if (direcao == "sul")
	{
		var y = objmapa.h - (objmapa.h / 6);
		var x = objmapa.w / 2;
	}
	if (direcao == "leste")
	{
		var x = objmapa.w - (objmapa.w / 6);
		var y = objmapa.h / 2;
	}
	if (direcao == "oeste")
	{
		var x = objmapa.w / 6;
		var y = objmapa.h / 2;
	}
	objaguarde.abre("ajaxredesenha",$trad("o1"));
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&x="+x+"&y="+y+"&g_sid="+g_sid;
	g_operacao = "navega";
	cpObj.call(p,"pan",ajaxredesenha);
}
/*
Section: atributos
*/
/*
Function: verificaTip

Verifica se a op��o de identifica��o est� ativa e se o mouse est� parado.
Se o mouse estiver parado, chama a fun��o de mostrar tip.
*/
function verificaTip()
{
	//insere div para tips
	if (!$i("tip"))
	{
		var novoel = document.createElement("div");
		novoel.id = "tip";
		novoel.style.position="absolute";
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		document.body.appendChild(novoel);
	}
	if ((objmapa.parado == "parar") || (objmapa.parado=="cancela")){return;}
	if ((objmapa.parado == "sim") && (g_operacao == "identifica") && ($i("tip").style.display!="block"))
	{
		with($i("tip"))
		{
			style.top = objposicaocursor.telay +20;
			style.left = objposicaocursor.telax;
			innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>Pesquisando...</td></tr></table>";
			style.display="block";
		}
		eval(g_funcaoTip);
	}
	if ((objmapa.parado!="cancela") && ($i("tip").style.display!="block"))
	{objmapa.parado = "sim";}
	setTimeout('verificaTip()',g_tempotip);
}
/*
Function: verificaTipDefault

Executa a opera��o de identifica��o para mostrar um TIP.

Esta � a fun��o default, definida na vari�vel g_funcaoTip
*/
function verificaTipDefault()
{
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=identifica&opcao=tip&xy="+objposicaocursor.ddx+","+objposicaocursor.ddy+"&resolucao=5&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_persistent_connection(true);
	cp.set_response_type("JSON");
	cp.call(p,"identifica",mostraTip);
}
/*
Function: mostraTip

Mostra a descri��o de um elemento do mapa como um tip na posi��o do mouse.

Para que um tema tenha um tip, � necess�rio configurar o metadata TIP no map file.

Parameters:

retorno - retorno da fun��o ajax.
*/
function mostraTip(retorno)
{
	var retorno = retorno.data;
	if ((retorno != "erro") && (retorno != undefined))
	{
		if ($i("img"))
		{$i("img").title = "";}
		if (retorno != "")
		{
			var res = "<div id='cabecatip' style='text-align:left;background-color:rgb(240,240,240)'><span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapa.parado=\"cancela\"'>parar&nbsp;&nbsp;</span>";
			res += "<span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapa.objtips.push($i(\"tip\"));$i(\"tip\").id=\"\";$i(\"cabecatip\").innerHTML =\"\";$i(\"cabecatip\").id =\"\"' >fixar</span></div>";
			var temas = retorno.split("!");
			for (tema=0;tema<temas.length; tema++)
			{
				var titulo = temas[tema].split("@");
				if (g_tipotip == "completo")
				{
					res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";
				}
				var ocorrencias = titulo[1].split("*");
				for (ocorrencia=0;ocorrencia<ocorrencias.length; ocorrencia++)
				{
					if (ocorrencias[ocorrencia] != "")
					{
						var pares = ocorrencias[ocorrencia].split("##");
						for (par=0;par<pares.length; par++)
						{
							var valores = pares[par].split("#");
							if (g_tipotip == "completo")
							{
								res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
							}
							else
							{
								res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'><i>" + valores[1] + "</i></span><br>";
							}
						}
					}
				}
			}
			if ($i("janelaMen"))
			{
				$i("janelaMenTexto").innerHTML = res;
			}
			else
			{
				$i("tip").innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
				with($i("tip").style){top = objposicaocursor.telay - 10;left = objposicaocursor.telax - 20;display="block";}
			}
		}
	}
}
/*
Section: legenda
*/
/*
Function: legendaGrafico

Mostra a legenda dos gr�ficos adicionados no mapa.

Chamado pela ferramenta de inclus�o de gr�ficos

Par�metros:

par - string com os par�metros item*r,g,b*item....
*/
function legendaGrafico(par)
{
	var temp = par.split("*");
	var par = "<table>";
	for (i=0;i<temp.length; i++)
	{
		var t = temp[i];
		var t = t.split(",");
		par += "<tr style='text-align:left'><td style='background-color:rgb("+t[1]+","+t[2]+","+t[3]+")'>&nbsp;&nbsp;</td><td style='text-align:left'>"+t[0]+"</td></tr>";
	}
	par += "</table>";
	if (!$i("legendagr"))
	{
		var novoel = document.createElement("div");
		var temp = '<div class="hd">Legenda</div>';
		temp += '<div class="bd">';
		temp += '<div id="contemleggr" ></div></div>';
		with(novoel)
		{
			id = "legendagr";
			style.display="block";
			style.textAlign="left";
			innerHTML = temp;
		}
		document.body.appendChild(novoel);
		YAHOO.namespace("legendagr.xp");
		YAHOO.legendagr.xp.panel = new YAHOO.widget.Panel("legendagr", {width:"250px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
	}
	$i("contemleggr").innerHTML = par;
	YAHOO.legendagr.xp.panel.render();
	YAHOO.legendagr.xp.panel.show();
}
/*
Function: inverteStatusClasse

Ativa ou desativa a visualiza��o de uma classe de um tema.

Parameters:

leg - objeto input clicado no mapa
*/
function inverteStatusClasse(leg)
{
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inverteStatusClasse&g_sid="+g_sid+"&tema="+leg.name+"&classe="+leg.value;
	cpObj.call(p,"inverteStatusClasse",ajaxredesenha);
}
/*
Section: sistemas de busca e navega��o
*/
/*
Function: atualizagoogle

Atualiza o box do google se a fun��o google estiver ativa
*/
function atualizagoogle()
{
	if (window.parent.frames["wdocai"])
	{
		if (navn)
		{
			if ($i("wdocai"))
			{var doc = $i("wdocai").contentDocument;}
		}
		else
		{
			if(document.frames("wdocai"))
			{var doc = document.frames("wdocai").document;}
		}
		if(doc)
		{
			if (doc.getElementById("map"))
			{
				if(window.parent.frames["wdocai"].panTogoogle)
				{window.parent.frames["wdocai"].panTogoogle();}
			}
		}
	}
}
/*
Function: atualizascielo

Atualiza a lista de dados na op��o de busca Scielo
*/
function atualizascielo()
{
	if ($i("wdocai"))
	{
		if (window.parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoscielo"))
			{
				$i("wdocai").src = g_locaplic+"/ferramentas/scielo/index.htm";
			}
		}
	}
}
/*
Function: atualizaconfluence

Atualiza a lista de dados na op��o de busca confluence
*/
function atualizaconfluence()
{
	if($i("wdocai"))
	{
		if (window.parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoconfluence"))
			{
				$i("wdocai").src = g_locaplic+"/ferramentas/confluence/index.htm";
			}
		}
	}
}
/*
Function: atualizawiki

Atualiza a lista de dados na op��o de busca wiki
*/
function atualizawiki()
{
	if ($i("wdocai"))
	{
		if (window.parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadowiki"))
			{
				$i("wdocai").src = g_locaplic+"/ferramentas/wiki/index.htm";
			}
		}
	}
}
/*
Section: menu de temas e outras listagens
*/
/*
Function: procurartemas

Localiza um tema no menu de temas.
*/
function procurartemas()
{
	var procurar = removeAcentos(document.getElementById("buscatema").value);
	var resultadoProcurar = function(retorno)
	{
		if(!retorno.data)
		{$i("achados").innerHTML = "<span style='color:red'>Nada encontrado<br><br></span>";return;}
		var retorno = retorno.data;
		if ((retorno != "erro") && (retorno != undefined))
		{
			var ins = "";
			for (ig=0;ig<retorno.length;ig++)
			{
					var ngSgrupo = retorno[ig].subgrupos;
					for (sg=0;sg<ngSgrupo.length;sg++)
					{
						var nomeSgrupo = ngSgrupo[sg].subgrupo;
						var ngTema = ngSgrupo[sg].temas;
						for (st=0;st<ngTema.length;st++)
						{
								if ( ngTema[st].link != " ")
								{var lk = "<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>";}
								var tid = ngTema[st].tid;
								var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type='checkbox' value='"+tid+"' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" /> ("+nomeSgrupo+")";
								var nomeTema = inp+(ngTema[st].nome)+lk+"<br>";
								ins += nomeTema;
						}
					}
			}
			if (ins != "")
			{
				$i("achados").innerHTML = ins+"<br>";
			}
			else
			{$i("achados").innerHTML = "<span style='color:red'>Nada encontrado<br><br></span>";}
		}
	};
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=procurartemas&procurar="+procurar+"&g_sid="+g_sid;
	cpObj.call(p,"procurartemas",resultadoProcurar);
}
/*
Function: expandeTema

Busca dados sobre um tema quando o bot�o de expandir tema (guia1) � clicado.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeTema(itemID)
{
	var lista = (objmapa.temas).split(";");
	if (!document.getElementById("idx"+itemID))
	{
		for (l=0;l<lista.length; l++)
		{
			var ltema = lista[l].split("*");
			//codigo,status,nome,transparencia,tipo,selecao,escala,download,tem features,conexao,tem wfs
			if (ltema[0] == itemID)
			{
				var farol = "maisamarelo.png";
				if (ltema[8] == undefined){ltema[8] = "nao";}
				if (ltema[6]*1 < objmapa.scale*1)
				{
				 	var farol = "maisverde.png";
				 	var mfarol = $trad("t9");
				}
				if (ltema[6]*1 > objmapa.scale*1)
				{
				 	var farol = "maisvermelho.png";
					var mfarol = $trad("t10");
				}
				if (ltema[6] == 0)
				{
				 	var farol = "maisamarelo.png";
					var mfarol = $trad("t11");
				}
				tnome = "&nbsp;<img id='farol"+ltema[0]+"' src='"+$im(farol)+"' title='"+mfarol+"' \>";
				tnome += "&nbsp;<img  id='idx"+ltema[0]+"' src='"+$im("x.gif")+"' title='"+$trad("t12")+"' onclick='excluitemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t12a")+"','exclui')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("sobe.gif") +"' title='"+$trad("t13")+"' onclick='sobetemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t14")+"','sobe')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("desce.gif") +"' title='"+$trad("t15")+"' onclick='descetemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t16")+"','desce')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("extent.gif") +"' title='"+$trad("t17")+"' onclick='zoomtemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t18")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				mytreeview1.createItem("temap0"+ltema[0], tnome, imgBranco, false, true, true, ltema[0]);
				if (g_opcoesTemas == "sim")
				{mytreeview1.createItem("opc"+ltema[0], $trad("t18a"), imgBranco, true, true, true, ltema[0]);}
				mytreeview1.createItem("legenda"+ltema[0], $trad("t18b"), imgBranco, true, true, true, ltema[0]);
				if (g_opcoesTemas == "sim")
				{
					var im = "";
					if (navn)
					{var im = "<img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='13' />";}
					//transparencia
					if ((ltema[4] != 0) || (ltema[8] == "sim"))
					{
						tnome = "<span onclick='mudatranspf(\""+ltema[0]+"\")'>"+im+"<img  src='"+$im("tic.png")+"' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t19")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t20")+" </span><input  class=digitar type=text size=3 value='"+ltema[3]+"' id='tr"+ltema[0]+"' />";
						mytreeview1.createItem("temap1"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					//muda nome
					tnome = "<span onclick='mudanomef(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png")+"' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t21a")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t21")+" </span><input class=digitar type=text size=10 value='' id='nn"+ltema[0]+"' />";
					mytreeview1.createItem("temap2"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					if ((ltema[4] < 3) && (ltema[9] != 7))
					{
						tnome = "<span onclick='procuraratribf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png")+" onmouseover=\"javascript:mostradicasf(this,'"+$trad("t22")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t23")+" </span>";
						mytreeview1.createItem("temap3"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='toponimiaf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'"+$trad("t24")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t25")+" </span>";
						mytreeview1.createItem("temap4"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='etiquetas(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'"+$trad("t26")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t27")+" </span>";
						mytreeview1.createItem("temap7"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='filtrof(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'"+$trad("t28")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t29")+" </span>";
						mytreeview1.createItem("temap5"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='tabelaf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'"+$trad("t30")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t31")+" </span>";
						mytreeview1.createItem("temap6"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					if (ltema[4] < 4)
					{
						tnome = "<span onclick='editaLegenda(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png") + "' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t32")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t33")+" </span>";
						mytreeview1.createItem("temap7"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					tnome = "<span onclick='destacaTema(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png") + "' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t34")+"','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;"+$trad("t35")+" </span>";
					mytreeview1.createItem("temap8"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
				}
				mytreeview1.createItem("","", imgBranco, false, true, true, ltema[0]);
				break;
			}
		}
	}
	//verifica se clicou para expandir a legenda
	var tema = itemID.split("legenda");
	if (tema.length == 2)
	{
		var expandeLegendaVer = function (retorno)
		{
			if (retorno.data != undefined)
			{
				var retorno = retorno.data;
				if (retorno[0])
				{
					if ((navn) && (!retorno[0].imagem))
					{tabela = retorno;}
					else
					{
						var i = retorno[0].imagem;
						var re = new RegExp("tiff", "g");
						var i = i.replace(re,'png');
						var tabela = "<img src='"+i+"' />";
					}					
					retorno = "";
				}
				else
				{
					var linhas = retorno.split("#");
					if (linhas.length > 1)
					{
						var linhas = retorno.split("|");
						var tabela = "<table >";
						for (linha=0;linha<linhas.length;linha++)
						{
							var colunas = linhas[linha].split("#");
							var id = colunas[0]+"-"+colunas[1];
							var re = new RegExp("'", "g");
							var exp = colunas[3].replace(re,'"');
							tabela += "<tr style='border-top:1px solid rgb(240,240,240);'><td><img src='"+colunas[4]+"' </td><td style='text-align:left'>"+colunas[2]+"</td></tr>";
						}
						tabela += "</table><br>";
					}
					else
					{tabela = retorno;}
				}
				if (!$i(g_arvoreClick+"verdiv"))
				{
					incluir = "<div style='text-align:left' id='"+g_arvoreClick+"verdiv"+"'>"+tabela+"</div>";
					mytreeview1.createItem(g_arvoreClick+"ver", incluir, imgBranco, false, true, true, g_arvoreClick);
				}
				else
				{
					$i(g_arvoreClick+"verdiv").innerHTML = tabela;
				}
			}
		};
		g_arvoreClick = itemID;
		tema = tema[1];
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&template=legenda2.htm&tema="+tema+"&g_sid="+g_sid;
		cpObj.call(p,"criaLegenda",expandeLegendaVer);
	}
}
/*
Function: expandeGrupo

Chama a fun��o ajax que pega a lista de temas de um subgrupo no menu de temas.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeGrupo(itemID)
{
	g_arvoreClick = itemID;
	if ((itemID.search("sgrupo") > -1) && (g_arvoreClicks.search(itemID) == -1 ))
	{
		var codigos = itemID.split("_");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadetemas&grupo="+codigos[1]+"&subgrupo="+codigos[2]+"&g_sid="+g_sid+"&idmenu="+codigos[3];
		cpObj.call(p,"pegaListaDeTemas",processaTemas);
	}
}
/*
Function: pegaListaDeGrupos

Pega a lista de grupos de uma �rvore de tremas.

Parameters:

idmenu - id que identifica a �rvore. Esse id � definido no ms_configura, vari�vel $menutemas. Se idmenu for vazio, ser� considerado o arquivo de menus default do I3Geo, existente no diret�rio menutemas.

listasistemas - sim|nao pega a lista de sistemas para montar a �rvore de sistemas
*/
function pegaListaDeGrupos(idmenu,listasistemas)
{			
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadegrupos&g_sid="+g_sid+"&idmenu="+idmenu+"&listasistemas="+listasistemas;
	cpObj.call(p,"pegaListaDeGrupos",processaGrupos);
}
/*
Function: processaGrupos

Recebe os dados da fun��o Ajax com a lista de grupos e subgrupos.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaGrupos(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var idarvore = retorno.data.grupos[retorno.data.grupos.length - 2].idmenu;
		if ($i("buscatema"))
		{var busca = $i("buscatema").value;}
		//$i(objmapa.guiaMenu+"obj").innerHTML = "";
		if (!document.getElementById("buscatema"))
		{
			var insp = "<div style='text-align:left;'><table  cellspacing='0' cellpadding='0' ><tr><td style='text-align:left;font-size:10px;'>";
			insp = insp + "<img src='"+g_locaplic+"/imagens/branco.gif'  height=0 />";
			insp = insp + "<p>&nbsp;"+$trad("a1")+"<input class='digitar' type='text' id='buscatema' size='15' value=''  /><img  title='"+$trad("a1")+"' src='"+$im("tic.png")+"' onclick='procurartemas()' style='cursor:pointer'/></td></tr></table><br>";
			$i(objmapa.guiaMenu+"obj").innerHTML = insp+"<div style='text-align:left;font-size:10px;' id='achados' ></div></div>";
		}
		if (!$i("uplocal"))
		{
			var upload = "";
			if (g_uploadlocal == "sim")
			{upload += "<div id='uplocal' style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='upload()'><img src='"+$im("upload.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;"+$trad("a2")+"</div>";}
			if (g_downloadbase == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='downloadbase()'><img src='"+$im("connected-s.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;"+$trad("a3")+"</div>";}
			if (g_conectarwms == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='conectarwms()'><img src='"+$im("cmdLink.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;"+$trad("a4")+"</div>";}
			if (g_conectargeorss == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='conectargeorss()'><img src='"+g_locaplic+"/imagens/georss-1.png' style='cursor:pointer;text-align:left'  />&nbsp;"+$trad("a5")+"</div>";}
			$i(objmapa.guiaMenu+"obj").innerHTML += upload;
			if (objmapa.navegacaoDir == "sim")
			{
				var temp = "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='navegacaoDir()'><img src='"+g_locaplic+"/imagens/desktop.png' style='cursor:pointer;text-align:left'  />&nbsp;"+$trad("a6")+"</div>";
				$i(objmapa.guiaMenu+"obj").innerHTML += temp;
			}
		}
		//arvore de menus
		mytreeview2 = new Object();
		mytreeview2 = treeviewNew("mytreeview2"+idarvore, "default", objmapa.guiaMenu+"obj", null);
		var nometemas = $trad("a7");
		if (idarvore != ""){nometemas += " - "+idarvore;}
		mytreeview2.createItem("item1"+idarvore, "<b>"+nometemas+"</b>", g_locaplic+"/imagens/visual/"+g_visual+"/temas.png", true, true, true, null);
		mytreeview2.itemExpand = expandeGrupo;
		for (i=0;i<retorno.data.grupos.length; i++)
		{
			if (retorno.data.grupos[i].nome)
			{
				mytreeview2.createItem("grupo"+i+"a"+idarvore, retorno.data.grupos[i].nome, g_locaplic+"/imagens/visual/"+g_visual+"/folder-s.gif", true, true, true, "item1"+idarvore);
				var ngSgrupo = retorno.data.grupos[i].subgrupos;
				var cor = "rgb(230,230,230)";
				for (sg=0;sg<ngSgrupo.length;sg++)
				{
					if (navm)
					var nomeSgrupo = "<span style='background-color:"+cor+"' >"+ngSgrupo[sg].nome+"</span>";
					else
					var nomeSgrupo = "<span style='background-color:"+cor+"' ><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+ngSgrupo[sg].nome+"</span>";
					mytreeview2.createItem("sgrupo_"+i+"_"+sg+"a"+"grupo"+i+"_"+idarvore, nomeSgrupo, imgBranco, true, true, false, "grupo"+i+"a"+idarvore);
					if (cor == "rgb(230,230,230)"){var cor = "rgb(255,255,255)";}
					else
					{var cor = "rgb(230,230,230)";}
				}
				var ngtSgrupo = retorno.data.grupos[i].temasgrupo;
				for (sgt=0;sgt<ngtSgrupo.length;sgt++)
				{
					var no = ngtSgrupo[sgt];
					var nome = no.nome;
					var lk = no.link;
					if ( lk != " ")
					{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
					var tid = no.tid;
					var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type=\"checkbox\" value="+tid+" onmouseover=\"javascript:mostradicasf(this,'"+$trad("a8")+"','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
					if(navm)
					nomeTema = "&nbsp;"+inp+nome+lk;
					else
					nomeTema = "<span><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
					mytreeview2.createItem("sgrupo_"+i+"_"+sg+"_"+sgt+"_"+idarvore, nomeTema, imgBranco, false, true, false, "grupo"+i+"a"+idarvore);
				}				
			}
			if (retorno.data.grupos[i].temasraiz)
			{
				for (st=0;st<retorno.data.grupos[i].temasraiz.length; st++)
				{
					var no = retorno.data.grupos[i].temasraiz[st];
					var nome = no.nome;
					var lk = no.link;
					if ( lk != " ")
					{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
					var tid = no.tid;
					var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type='checkbox' value="+tid+" onmouseover=\"javascript:mostradicasf(this,'"+$trad("a8")+"','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
					if(navm)
					nomeTema = "&nbsp;"+inp+nome+lk;
					else
					nomeTema = "<span><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
					mytreeview2.createItem("tema"+i+""+st+"a"+idarvore, nomeTema, imgBranco, false, true, true, "item1"+idarvore);
				}
				mytreeview2.createItem("", "", imgBranco, false, true, true, "item1"+idarvore);
			}
		}
		if (g_locsistemas != "")
		{pegavalSistemas(retorno.data.grupos[retorno.data.grupos.length - 1].sistemas);}		
	}
}
/*
Function: processaTemas

Recebe os dados da fun��o Ajax com a lista de temas de um subgrupo.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaTemas(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var cor = "rgb(251,246,184)";
		for (st=0;st<retorno.data.temas.length; st++)
		{
			var nome = retorno.data.temas[st].nome;
			var lk = retorno.data.temas[st].link;
			if ( lk != " ")
			{var lk = "<a href="+lk+" target='blank'>&nbsp;"+$trad("a9")+"</a>";}
			var tid = retorno.data.temas[st].tid;
			var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type=\"checkbox\" value="+tid+" onmouseover=\"javascript:mostradicasf(this,'"+$trad("a8")+"','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
			if(navm)
			nomeTema = "<span style='background-color:"+cor+"' title='"+$trad("a10")+" "+tid+"'>"+inp+nome+lk+"</span>";
			else
			nomeTema = "<span style='background-color:"+cor+"' title='"+$trad("a10")+" "+tid+"'><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
			mytreeview2.createItem("tema"+sg+""+st, nomeTema, imgBranco, false, true, true, g_arvoreClick);
			if (cor == "rgb(251,246,184)"){var cor = "rgb(255,255,255)";}
			else
			{var cor = "rgb(251,246,184)";}
		}
		//inclui um item em branco
		mytreeview2.createItem("vazio", "", imgBranco, false, true, true, g_arvoreClick);
		g_arvoreClicks += ","+g_arvoreClick;
	}
}
/*
Function: pegavalSistemas

Adiciona uma �rvore no menu de adi��o de temas, contendo os sistemas que podem ser executados.

Parameters:

sis - objeto com a lista de sistemas.
*/
function pegavalSistemas(sis)
{
	if(sis.length > 0)
	{
		mytreeviewS = new Object();
		mytreeviewS = treeviewNew("mytreeviewS", "default", objmapa.guiaMenu+"obj", null);
		mytreeviewS.createItem("Sitem1", "<b>"+$trad("a11")+"</b>", g_locaplic+"/imagens/temas.png", true, true, true, null);
		for (ig=0;ig<sis.length;ig++)
		{
			var nomeSis = sis[ig].NOME;
			mytreeviewS.createItem("sis"+ig, nomeSis, g_locaplic+"/imagens/folder-s.gif", true, true, true, "Sitem1");
			var funcoes = sis[ig].FUNCOES;
			for (ig2=0;ig2<funcoes.length;ig2++)
			{
				var nomeFunc = funcoes[ig2].NOME;
				var executar = funcoes[ig2].ABRIR;
				var w = funcoes[ig2].W;
				var h = funcoes[ig2].H;
				var inp = "<img title='"+$trad("a12")+"' src='"+$im("open.gif")+"' style='cursor:pointer;text-align:left' onclick='abreSistema(\""+executar+"\",\""+w+"\",\""+h+"\")' />&nbsp;";
				mytreeviewS.createItem("sis"+ig+"func"+ig2, inp+nomeFunc, imgBranco, false, true, false, "sis"+ig);
			}
		}
	}
}
/*
Function: pegaMapas

Recebe a lista de mapas (banners) e monta a apresenta��o.

Adiciona na guia mapas os banners que d�o acesso direto a mapas especiais.

A indica��o do arquivo xml � feita em ms_configura.php

*/
function pegaMapas(retorno)
{
	var ins = "<br>";
	var mapa = retorno.data.mapas;
	for (ig1=0;ig1<mapa.length;ig1++)
	{
		var nome = mapa[ig1].NOME;
		var descricao = mapa[ig1].DESCRICAO;
		var imagem = mapa[ig1].IMAGEM;
		var temas = mapa[ig1].TEMAS;
		var ligados = mapa[ig1].LIGADOS;
		var extensao = mapa[ig1].EXTENSAO;
		var outros = mapa[ig1].OUTROS;
		var lkd = mapa[ig1].LINK;
		var link = g_locaplic+"/ms_criamapa.php?temasa="+temas+"&layers="+ligados;
		if (extensao != "")
		{link += "&mapext="+extensao;}
		if (outros != "")
		{link += "&"+outros;}
		if (lkd != "")
		{var link = lkd;}
		ins += "<div><a href='"+link+"'><img src='"+imagem+"'></a></div><br>";
		ins += "<div><p>"+nome+"</p></div><br>";
	}
	$i("banners").innerHTML = ins;
}
/*
Function: arvoreclick

Adiciona um tema no mapa quando o usu�rio clica em um novo tema no menu de adi��o de temas.

Parameters:

itemID - ID que identifica qual tema foi clicado. O ID � definido no arquivo .map e no arquivo menutemas/menutemas.xml
*/
function arvoreclick(itemID)
{
	if (itemID.search("tema") == 0)
	{
		if ($i(itemID).checked == true)
		{$i(itemID).checked = false;}
		else
		{$i(itemID).checked = true;}
	}
}
/*
Function: pegaTema

Pega o tema de um no na guia de temas.

Utilizado nas op��es que operam sobre um tema espec�fico.

Parameters:

celula - objeto que foi clicado

Returns:

Id do tema.
*/
function pegaTema(celula)
{
	var nos = celula.parentNode.childNodes;
	for (no=0;no<nos.length; no++){if (nos[no].type == "checkbox"){return nos[no].value;}}
}
/*
Section: redesenho do mapa
*/
/*
Function: remapaf

Prepara o redesenho do mapa de acordo com o que esta visivel ou nao.

Chamado por algumas fun��es que necessitam refazer o desenho do mapa.

Verifica na lista de temas j� adicionados, os temas que est�o ligados e desligados,
Chama a fun��o que verifica na lista de temas adicionais.
*/
function remapaf()
{
	clearTimeout(objmapa.tempo);
	objmapa.tempo = "";
	objmapa.temaAtivo = "";
	if ($i(objmapa.guiaTemas+"obj"))
	{
		var iguias = $i(objmapa.guiaTemas+"obj").getElementsByTagName("input");
		var tsl = new Array();
		var tsd = new Array();
		for (i=0;i<iguias.length; i++)
		{
			if (iguias[i].type == "checkbox")
			{
				if (iguias[i].checked == false)
				{tsd.push(iguias[i].value);}
				if (iguias[i].checked == true)
				{tsl.push(iguias[i].value);}
			}
		}
		var remapaAdicNovos = function remapaAdicNovos(retorno)
		{
			if ($i("buscatema"))
			{
				var g = $i(objmapa.guiaMenu+"obj");
				var iguias = g.getElementsByTagName("input");
				var ta = new Array();
				for (i=0;i<iguias.length; i++)
				{
					if (iguias[i].type == "checkbox")
					{
						if (iguias[i].checked == true)
						{
							ta.push(iguias[i].value);
							iguias[i].checked = false;
						}
					}
				}
				if (ta.length > 0)
				{
					objaguarde.fecha("remapa");
					objaguarde.abre("ajaxredesenha",$trad("o1"));
					var temp = function(retorno)
					{
						objaguarde.fecha("ajaxredesenha");
						if(retorno.data.erro)
						{
							alert(retorno.data.erro);
							return;
						}
						ajaxredesenha("");					
					};
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=adtema&temas="+(ta.toString())+"&g_sid="+g_sid;
					cpObj.call(p,"adicionaTema",temp);
				}
				else
				{
					objaguarde.fecha("remapa");
					objaguarde.abre("ajaxredesenha",$trad("o1"));
					ajaxredesenha("");
				}
			}
			else
			{
				objaguarde.fecha("remapa");
				objaguarde.abre("ajaxredesenha",$trad("o1"));
				ajaxredesenha("");
			}
		};
		if ((tsd.length > 0) || (tsl.length > 0))
		{
			objaguarde.abre("remapa",$trad("o1"));
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=ligatemas&desligar="+(tsd.toString())+"&ligar="+(tsl.toString())+"&g_sid="+g_sid;
			cpObj.call(p,"ligaDesligaTemas",remapaAdicNovos);
		}
		else{remapaAdicNovos();}
		objaguarde.fecha("remapa");
	}
	else
	{remapaAdicNovos();}
}
/*
Section: eventos
*/
/*
Function: processevent1 (depreciado)

Captura a posi��o do mouse tendo como refer�ncia o navegador.

Atualiza o objeto objposicaomouse e movimenta as janelas doc�veis.

Recalcula a posi��o correta da imagem do mapa.

Parameters:

exy1 - objeto evento.
*/
function processevent1(exy1)
{}
/*
Function: calcposf

Calcula a posi��o correta do corpo do mapa e posiciona-o.

Atualiza as vari�veis imagemxi,imagemyi,imagemxref e imagemyref
*/
function calcposf()
{
	imagemxi = 0;
	imagemyi = 0;
	imagemxref = 0;
	imagemyref = 0;
	if(!$i("i3geo")){return;}
	if ($i("i3geo").style.left){imagemxi += parseInt($i("i3geo").style.left);}
	if ($i("i3geo").style.top){imagemyi += parseInt($i("i3geo").style.top);}	
	var dc = $i("i3geo");
	if ($i("img"))
	{var dc = $i("contemImg");}
	while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo"))
	{
		dc = dc.offsetParent;
		imagemxi = imagemxi + dc.offsetLeft;
		imagemyi = imagemyi + dc.offsetTop;
	}

	if ($i("img"))
	{
		$left("corpoMapa",imagemxi);
		$top("corpoMapa",imagemyi);
		if ($i("i3geo").style.left){$left("corpoMapa",imagemxi - parseInt($i("i3geo").style.left));}
		if ($i("i3geo").style.top){$top("corpoMapa",imagemyi - parseInt($i("i3geo").style.top));}
	}
	if ($i("ref"))
	{
		var dc = $i("ref");
		while (dc.offsetParent.id != "i3geo")
		{
			dc = dc.offsetParent;
			imagemxref = imagemxref + dc.offsetLeft;
			imagemyref = imagemyref + dc.offsetTop;
		}
	}
	if ($i("aguarde"))
	{
		$top("aguarde",imagemyi);
		$left("aguarde",imagemxi);
	}
}
/*
Function: movecursor

Move o �cone que segue o mouse quando da movimenta��o sobre o mapa
*/
function movecursor()
{
	var obje = $i("obj").style;
	if ($i("img"))
	{
		eval ("obje." + g_tipotop + "= objposicaocursor.telay + 5 + g_postpx");
		eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 5 + g_postpx");
	}
	else
	{
		eval ("obje." + g_tipotop + "= objposicaocursor.telay - 15 + g_postpx");
		eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 15 + g_postpx");
	}	
	if($i("box1"))
	{
		var bx = $i("box1");
		if (bx.style.visibility != "visible")
		{
			//move o box para a posi��o correta
			with(bx.style)
			{
				left = objposicaocursor.telax + g_postpx;
				top = objposicaocursor.telay + g_postpx;
			}
		}
	}
}
/*
Function: capturaposicao

Captura a posi��o do mouse em fun��o do evento onmousemove sobre o corpo do mapa.

Atualiza o objeto objposicaocursor.
A fun��o de mostrar TIP � definida como "" quando o mouse � movimentado.

Parameters:

exy - objeto evento.
*/
function capturaposicao(exy)
{
	var e = (navn) ? exy : window.event;
	if (navm)
	{
		var storage = e.clientY+document.body.scrollTop;
		var storage1 = e.clientX+document.body.scrollLeft;
		calcposf(); 
		var xfig = e.clientX - imagemxi + document.body.scrollLeft;
		var yfig = e.clientY - imagemyi + document.body.scrollTop;
		var xreffig = e.clientX - imagemxref + document.body.scrollLeft;
		var yreffig = e.clientY - imagemyref + document.body.scrollTop;
	}
	else
	{
		var storage = e.clientY+window.pageYOffset;
		var storage1 = e.clientX+window.pageXOffset;
		calcposf(); 
		var xfig = e.clientX - imagemxi + pageXOffset;
		var yfig = e.clientY - imagemyi + pageYOffset;
		var xreffig = e.clientX - imagemxref + pageXOffset;
		var yreffig = e.clientY - imagemyref + pageYOffset;
	}
	var teladd = calcddf(xfig,yfig,g_celula,objmapa.extent);
	var teladms = convdmsf(teladd[0],teladd[1]);
	with(objposicaocursor)
	{
		ddx = teladd[0];
		ddy = teladd[1];
		dmsx = teladms[0];
		dmsy = teladms[1];
		telax = storage1;
		telay = storage;
		imgx = xfig;
		imgy = yfig;
		refx = xreffig;
		refy = yreffig;
	}
	if (objmapa.parado!="cancela")
	{objmapa.parado = "nao";}
	ajaxTip = "";
}
/*
Section: calculos
*/
/*
Function: calculadistancia

Calcula a dist�ncia entre dois pontos.

Parameters:

lga - x inicial.

lta - y inicial

lgb - x final

ltb - y final
*/
function calculadistancia(lga,lta,lgb,ltb) //0ms
{
	//calculo baseado no site http://www.wcrl.ars.usda.gov/cec/java/lat-long.htm
	var er = 6366.707;
	var radlat1 = Math.PI * lta/180;
	var radlat2 = Math.PI * ltb/180;
	var radlong1 = Math.PI * lga/180;
	var radlong2 = Math.PI * lgb/180;
	if (lta > 0) {radlat1=Math.PI/2-radlat1;}
	if (lta < 0) {radlat1=Math.PI/2+radlat1;}
	if (lga < 0) {radlong1=Math.PI*2-radlong1;}
	if (ltb > 0) {radlat2=Math.PI/2-radlat2;}
	if (ltb < 0) {radlat2=Math.PI/2+radlat2;}
	if (lgb < 0) {radlong2=Math.PI*2-radlong2;}
	var x1 = er * Math.cos(radlong1)*Math.sin(radlat1);
	var y1 = er * Math.sin(radlong1)*Math.sin(radlat1);
	var z1 = er * Math.cos(radlat1);
	var x2 = er * Math.cos(radlong2)*Math.sin(radlat2);
	var y2 = er * Math.sin(radlong2)*Math.sin(radlat2);
	var z2 = er * Math.cos(radlat2);
	var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));
	//side, side, side, law of cosines and arccos
	var theta = Math.acos((er*er+er*er-d*d)/(2*er*er));
	return theta*er;
}
/*
Function: convdmsddf

Converte dms em dd.

Parameters:

cd - grau.

cm - minuto.

cs - segundo

Returns:

Coordenada em dd.
*/
function convdmsddf(cd,cm,cs)
{
	//converte dms em dd
	var sinal = 'positivo';
	if (cd < 0)
	{
		cd = cd * -1;
		sinal = 'negativo';
	}
	spm = cs / 3600;
	mpg = cm / 60;
	var dd = (cd * 1) + (mpg * 1) + (spm * 1);
	if (sinal == 'negativo')
	{dd = dd * -1;}
	return (dd);
}
/*
Function: calcddf

Converte o x,y de unidades de tela para d�cimo de grau.

Parameters:

xfign - x em valores de imagem.

yfign - y em coordenadas de imagem.

g_celula - tamanho no terreno do pixel da imagem.

imgext - extens�o geogr�fica do mapa.

Returns:

Coordena em dd.
*/
function calcddf(xfign,yfign,g_celula,imgext)
{
	if (navm)
	{
	 xfign = xfign - 2.2;
	 yfign = yfign - 2.7;
	}
	if (navn)
	{
	 xfign = xfign - 0.12;
	 yfign = yfign - 1.05;
	}
	var nx = g_celula * xfign;
	var ny = g_celula * yfign;
	var amext = imgext.split(" ");
	var longdd = (amext[0] * 1) + nx;
	var latdd = (amext[3] * 1) - ny;
	var res = new Array();
	res[0] = longdd;
	res[1] = latdd;
	return (res);
}
/*
Function: convdmsf

Converte dd em dms.

Parameters:

x - coordenada x.

y - coordenada y.

Returns:

Array com o valor de x [0] e y [1] no formato dd mm ss
*/
function convdmsf(x,y)
{
	var m = 0;
	var s = 0;
	var dx = parseInt(x);
	if (dx > 0)
	{var restod = x - dx;}
	if (dx < 0)
	{restod = (x * -1) - (dx * -1);}
	dx = dx;
	if (restod != 0)
	{
		var mm = restod * 60;
		var m = parseInt(restod * 60);
		var restos = mm - m;
		var mx = m;
		if (restos != 0)
		{
			var s = restos * 60;
			var s = (s+"_").substring(0,5);
			var sx = s;
		}
		else  { s = "00.00" }
	}
	else
	{
		var mx = "00";
		var sx = "00.00";
	}
	if (m.length == 2){m = "0"+m+"";}
	if (s*1 < 10){s = "0"+s;}
	var xv = dx+" "+mx+" "+sx;
	var m = 0;
	var s = 0;
	var dy = parseInt(y);
	if (dy > 0)
	{var restod = y - dy;}
	if (dy < 0)
	{var restod = (y * -1) - (dy * -1);}
	dy = dy;
	if (restod != 0)
	{
		var mm = restod * 60;
		var m = parseInt(restod * 60);
		var restos = mm - m;
		var my = m;
		if (restos != 0)
		{
			var s = restos * 60;
			s = (s+"_").substring(0,5);
			var sy = s;
		}
		else  { var s = "00.00";}
	}
	else
	{
		var my = "00";
		var sy = "00.00";
	}
	if (m.length == 2){m = "0"+m;}
	if (s*1 < 10){s = "0"+s;}
	var yv = dy+" "+my+" "+sy;
	var res = new Array();
	res[0] = xv;
	res[1] = yv;
	if ($i("localizarxy"))
	{
		$i("xg").value = dx;
		$i("xm").value = mx;
		$i("xs").value = sx;
		$i("yg").value = dy;
		$i("ym").value = my;
		$i("ys").value = sy;

	}
	return res;
}
/*
Function: convddtela

Converte coordenadas dd em coordenadas de tela.

Parameters:

vx - coordenada x.

vy - coordenada y.

docmapa - objeto que cont�m o objeto imagem.

Returns:

Array com o valor de x [0] e y [1]
*/
function convddtela(vx,vy,docmapa)
{
	if(!docmapa)
	{var docmapa = window.document;}
	var dc = docmapa.getElementById("img");
	imgext = objmapa.extent;
	varimgext = imgext.split(" ");
	vx = (varimgext[0] * -1) - (vx * -1);
	vy = (vy * -1) + (varimgext[3] * 1);
	c = objmapa.cellsize * 1;
	xy = new Array();
	xy[0] = (vx  / c) + imagemxi;
	xy[1]  = (vy / c) + imagemyi;
	return (xy);
}
/*
Function: posicaomouse

Cria um objeto que guarda a posi��o do mouse na tela. A posi��o � medida em rela��o a janela do navegador.

Methods:

x - coordenada x em valores de tela

y - coordenada y em valores de tela
*/
function posicaomouse()
{
	this.x = 0;
	this.y = 0;
}
/*
Function: posicaocursor

Cria um objeto que guarda a posi��o do mouse no corpo do mapa. A posi��o � medida em rela��o � posi��o do mapa no navegador.

Methods:

ddx - coordenada x em d�cimo de grau

ddy - coordenada y em d�cimo de grau

dmsx - coordenada x em grau, minuto e segundo

dmsy - coordenada y em grau, minuto e segundo

telax - coordenada x em valores de tela

telay - coordenada y em valores de tela

imgx - coordenada x em rela��o ao mapa

imgy - coordenada y em rela��o ao mapa

refx - coordenada x em rela��o ao mapa de refer�ncia

refy - coordenada y em rela��o ao mapa de refer�ncia
*/
function posicaocursor()
{
	this.ddx = 0;
	this.ddy = 0;
	this.dmsx = '';
	this.dmsy = '';
	this.telax = 0;
	this.telay = 0;
	this.imgx = 0;
	this.imgy = 0;
	this.refx = 0;
	this.refy = 0;
}
/*
Function: pontosdist

Armazena coordenadas no objeto pontosdist para calculo de distancia

Parameters:

xpt - coordenadas x em dd

ypt - coordenadas y em dd

dist - dist�ncia entre os dois �ltimos pontos

xtela - coordenada x na tela

ytela - coordenada y na tela

ximg - coordenada x na imagem do mapa

yimg - coordenada y na imagem do mapa

linhas - lista de objetos criados pela biblioteca richdraw utilizados no desenho da linha de medi��o
*/
function pontosdist()
{
	this.xpt = new Array();
	this.ypt = new Array();
	this.dist = new Array();
	this.xtela = new Array();
	this.ytela = new Array();
	this.ximg = new Array();
	this.yimg = new Array();
	this.linhas = new Array();
}
/*
Section: desenho sobre o mapa
*/
/*
Section: outros
*/
/*
Function: inseremarcaf

Insere um ponto no mapa.

Os pontos s�o inseridos em um contaier de pontos e mostrados tempor�riamente como uma imagem.
Utilizado pela fun��o de medi��o de dist�ncias.

Parameters:

xi - coordenada x.

yi - coordenada y.
*/
function inseremarcaf(xi,yi)
{
	//verifica se existe o container para os pontos
	if (!$i("pontosins") )
	{
		var novoel = document.createElement("div");
		novoel.id = "pontosins";
		with(novoel.style){position = "absolute";top = parseInt($i("img").style.top);left = parseInt($i("img").style.left);}
		document.body.appendChild(novoel);
	}
	var container = $i("pontosins");
	var novoel = document.createElement("div");
	with (novoel.style){position = "absolute";zIndex=2000;top=(yi - 2)+"px";left=(xi - 2)+"px";width="4px";height="4px";}
	var novoimg = document.createElement("img");
	novoimg.src=g_locaplic+"/imagens/dot1.gif";
	with (novoimg.style){width="4px";height="4px";zIndex=2000;}
	novoel.appendChild(novoimg);
	container.appendChild(novoel);
}
/*
Function: limpacontainerf

Limpa o container de pontos.
*/
function limpacontainerf()
{
	if ($i("pontosins"))
	{$i("pontosins").innerHTML = "";}
	if ($i("mostradistancia"))
	{$i("mostradistancia").style.display="none";}
}
/*
Function: criaboxg

Cria o div boxg utilizado nas opera��es de navega��o, google, etc.

O boxg � utilizado para o desenho de ret�ngulos na tela.
*/
function criaboxg()
{
	if (!$i("boxg"))
	{
		var novoel = document.createElement("div");
		novoel.id = "boxg";
		novoel.style.zIndex=1;
		novoel.innerHTML = '<font face="Arial" size=0></font>';
		novoel.onmouseover = function(){$i("boxg").style.display="none";};
		document.body.appendChild(novoel);
	}
}
/*
Function: removeAcentos

Remove acentos de uma palavra ou frase

Parameters:

palavra -
*/
function removeAcentos(palavra)
{
	var re = /�|�|�|�/gi;
	palavra = palavra.replace(re,"a");
	var re = /�/gi;
	palavra = palavra.replace(re,"e");
	var re = /�/gi;
	palavra = palavra.replace(re,"i");
	var re = /�|�/gi;
	palavra = palavra.replace(re,"o");
	var re = /�/gi;
	palavra = palavra.replace(re,"c");
	var re = /�/gi;
	palavra = palavra.replace(re,"u");
	return(palavra);
}
//Mantido aqui apenas para fins de compatibilidade
function borra()
{}
//testa se esse script foi carregado
function testafuncoes()
{}
