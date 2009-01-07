/*
Title: funcoes.js

Fun��es de uso geral para processamento de dados

File: i3geo/classesjs/funcoes.js

About: Licen�amento

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
//
//verifica se $i existe, se n�o cria.
//isso � necess�rio nos casos em que funcoes.js � utilizado separadamente
//
try
{
	$i("i3geo");
}
catch(e)
{
	$i = function(i)
	{return document.getElementById(i);};
}
/*
Function: trataErro

Fecha o objeto aguarde quando ocorre um erro.
*/
function trataErro()
{
	i3GEO.janela.fechaAguarde("ajaxdestaca");
	i3GEO.janela.fechaAguarde("ajaxabrelente");
	i3GEO.janela.fechaAguarde("ajaxiniciaParametros");
	i3GEO.janela.fechaAguarde("ajaxredesenha");
	i3GEO.janela.fechaAguarde("ajaxCorpoMapaEntorno");
	i3GEO.janela.fechaAguarde("ajaxCorpoMapa");
	i3GEO.janela.fechaAguarde("ajaxLegenda");
	i3GEO.janela.fechaAguarde("ajaxReferencia");
	i3GEO.janela.fechaAguarde("ajaxEscalaGrafica");
	i3GEO.janela.fechaAguarde("montaMapa");
	i3GEO.janela.fechaAguarde("aguardedoc");
	i3GEO.janela.fechaAguarde("ajaxCorpoMapa1");
}
/*
Section: interface
*/
/*
Function: criaContainerRichdraw

Cria os elementos 'dom' necess�rios ao uso das fun��es de desenho sobre o mapa.

As ferramentas de c�lculo de dist�ncias e �reas utilizam esse container.

Richdraw � uma biblioteca utilizada pelo i3geo para abstrair as diferen�as entre as linguagens svg e vml.

Essa abstra��o � necess�ria devido �s diferen�as entre os navegadores.
*/
function criaContainerRichdraw()
{
	try
	{
		//
		//cria o container para uso da fun��o de desenho usando
		//svg ou vml
		//esse container � sobreposto exatamente sobre o mapa
		//O id do containner � divGeometriasTemp
		//
		if (!$i("divGeometriasTemp"))
		{
			//
			//pega a posi��o da imagem do mapa para posicionar corretamente o container
			//
			var pos = [0,0];
			if($i("img"))
			var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
			//
			//cria o container
			//
			var novoel = document.createElement("div");
			novoel.id = "divGeometriasTemp";
			var ne = novoel.style;
			ne.cursor="crosshair";
			ne.zIndex=0;
			ne.position="absolute";
			ne.width=objmapa.w;
			ne.height=objmapa.h;
			ne.border="1px solid black";
			ne.display="none";
			ne.top=pos[1];
			ne.left=pos[0];
			document.body.appendChild(novoel);
		}
		//
		//como o container j� poderia ter sido criado antes � necess�rio esvazi�-lo
		//
		var divgeo = $i("divGeometriasTemp");
		divgeo.innerHTML = "";
		var renderer;
		//
		//cria o objeto renderer conforme o browser em uso
		//esse objeto ser� utilizado nas fun��es de desenho
		//mais detalhes, veja em pacotes/richdraw
		//Conforme a resposta do navegador, utiliza-se a cria��o VML ou SVG
		//
		try
		{
			renderer = new VMLRenderer();
			richdraw = new RichDrawEditor(divgeo, renderer);
		}
		catch(e)
		{
			renderer = new SVGRenderer();
			richdraw = new RichDrawEditor(divgeo, renderer);
		}
		//
		//defini��o dos s�mbolos default para os elementos gr�ficos
		//
		richdraw.editCommand('fillcolor', 'red');
		richdraw.editCommand('linecolor', 'gray');
		richdraw.editCommand('linewidth', '1px');
		richdraw.editCommand('mode', 'line');
		divgeo.style.display="block";
		//
		//ap�s o container ser criado, � necess�rio que as fun��es
		//de clique sobre o mapa sejam ativadas
		//para funcionarem sobre o container
		//
		ativaClicks(divgeo);
		
	}
	catch(e){alert("Erro ao tentar criar container richdraw");}
}
/*
Function: docaguias

Coloca as guias de navega��o em uma janela interna do mapa e altera o tamanho do mapa para ajust�-lo � nova situa��o.

O conte�do da nova janela � aquele que estiver dentro de um DIV com id= "contemFerramentas"
*/
function docaguias()
{
	if (!$i("conteudojanelaguias"))
	{
		if($i("guiasYUI")){$i("guiasYUI").style.display="none";}
		if (!$i("contemFerramentas")){return;}
		var novono = $i("contemFerramentas").innerHTML;
		$i("contemFerramentas").innerHTML = "";
		var wef = 0;
		if ($i("encolheFerramentas"))
		{wef = parseInt($i("encolheFerramentas").style.width);}
		var w = parseInt($i("contemFerramentas").style.width) - wef;
		$i("contemFerramentas").style.width="0px";
		if ($i("visual"))
		{$i("visual").style.width="0px";$i("visual").innerHTML="";}
		var pos = "px";
		var a = objmapa.h;
		var l = objmapa.w + w;
		objmapa.h = a;
		objmapa.w = l;
		if (navm){pos = "";}
		$i("img").style.width= l+pos;
		$i("img").style.height= a+pos;
		$i("corpoMapa").style.width= l+pos;
		$i("corpoMapa").style.height= a+pos;
		$i("corpoMapa").style.clip = 'rect('+0+" "+(l*1+2)+" "+(a*1+2)+" "+0+')';
		$i("mst").style.width = l + 1 + wef + pos;
		$i("contemImg").style.height= a+pos;
		$i("contemImg").style.width= l+pos;
		// entorno
		if (g_entorno == "sim")
		{
			var letras=["L","O"];
			for (var l=0;l<2; l++)
			{
				if ($i("img"+letras[l]))
				{
					$i("img"+letras[l]).style.width = objmapa.w+pos;
					$i("img"+letras[l]).style.height = objmapa.h+pos;
					$i("corpoMapa"+letras[l]).style.width=objmapa.w+pos;
					$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos+pos;
					$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
				}
			}
			var letras=["N","S"];
			for (var l=0;l<2; l++)
			{
				if ($i("img"+letras[l]))
				{
					$i("img"+letras[l]).style.width = objmapa.w * 2+pos;
					$i("img"+letras[l]).style.height = objmapa.h * 2+pos;
					$i("corpoMapa"+letras[l]).style.width=objmapa.w * 3+pos;
					$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos;
					$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
				}
			}
		}
		calcposf();
		var temp = function()
		{
			//carrega janela
			var novoel = document.createElement("div");
			novoel.id = "janelaguias";
			novoel.style.display="block";
			var temp = '<div class="hd">Guias</div>';
			temp += '<div class="bd" id="conteudojanelaguias"></div>';
			novoel.innerHTML = temp;
			if($i("i3geo"))
			{$i("i3geo").appendChild(novoel);}
			else
			{document.body.appendChild(novoel);}
			$i("conteudojanelaguias").innerHTML = novono;
			YAHOO.namespace("janelaguias.xp");
			YAHOO.janelaguias.xp.panel = new YAHOO.widget.Panel("janelaguias", {width:"268px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaguias.xp.panel.render();
			if($i(objmapa.guiaMenu+"obj"))
			{
				$i(objmapa.guiaMenu+"obj").innerHTML = "";
			}
			//ativaGuias();
			if($i("listaTemas"))
			{$i("listaTemas").innerHTML = "";}
			if($i("listaPropriedades"))
			{$i("listaPropriedades").innerHTML = "";objmapa.ativaListaPropriedades("listaPropriedades");}
			remapaf();
		};	
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudatamanho&altura="+a+"&largura="+l+"&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"mudaQS",temp);
	}
	else
	{
		YAHOO.janelaguias.xp.panel.render();
		YAHOO.janelaguias.xp.panel.show();
	}
}
/*
Function: ativaGuias

Ativa as guias principais do mapa, definindo as fun��es que ser�o executadas quando a guia � escolhida.

Quando o usu�rio clica em uma guia, todas as guias s�o escondidas e a guia clicada � ativada.

Algumas guias s� s�o preenchidas quando o usu�rio clicar nelas pela primeira vez.

O preenchimento sob demanda dessas guias torna necess�rio a defini��o da fun��o que ser� executada quando o clique ocorrer.

Essas fun��es s�o definidas por default nas guias principais.

As guias principais s�o definidas nos objetos

objmapa.guiaTemas

objmapa.guiaMenu

objmapa.guiaLegenda

objmapa.guiaListaMapas

*/
function ativaGuias()
{
	YAHOO.log("ativaGuias", "i3geo");
	//ajusta as guias da vers�o antiga do YUI para a nova
	//
	//pega o elemento onde as guias ser�o colocadas
	//
	for(var g=0;g<12;g++)
	{
		if ($i("guia"+g))
		var gpai = $i("guia"+g).parentNode;
	}
	//
	//monta as guias
	//
	if(gpai)
	{
		gpai.id = "guiasYUI";
		gpai.className = "yui-navset";
		var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 0px;border-color:rgb(240,240,240);border-bottom-color:white;">';
		//
		//define os t�tulos das guias padr�o
		//
		if($i(objmapa.guiaTemas))
		{$i(objmapa.guiaTemas).innerHTML = $trad("g1");}
		if($i(objmapa.guiaMenu))
		{$i(objmapa.guiaMenu).innerHTML = $trad("g2");}
		if($i(objmapa.guiaLegenda))
		{$i(objmapa.guiaLegenda).innerHTML = $trad("g3");}
		if($i(objmapa.guiaListaMapas))
		{$i(objmapa.guiaListaMapas).innerHTML = $trad("g4");}
		//
		//
		for(var g=0;g<12;g++)
		{
			if ($i("guia"+g))
			{
				//
				//pega os t�tulos das guias, inclusive as que n�o s�o padr�o
				//
				var tituloguia = $i("guia"+g).innerHTML;
				//
				//remove os espa�os em branco 
				//necess�rio para manter compatibilidade com vers�es antigas do i3geo
				//
				var re = new RegExp("&nbsp;", "g");
				var tituloguia = tituloguia.replace(re,'');
				//
				//monta o t�tulo das guias
				//
				ins += '<li><a href="#"><em><div id="guia'+g+'" >'+tituloguia+'</div></em></a></li>';
			}
		}
		ins += "</ul>";
		//
		//insere as guias em gpai
		//
		gpai.innerHTML = ins;
		for(var g=0;g<12;g++)
		{
			if ($i("guia"+g))
			{
				eval('$i("guia'+g+'").onclick = function(){g_guiaativa = "guia'+g+'";mostraguiaf('+g+');}');
				$i("guia"+g).onmouseover = function()
				{
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "#bfdaff";
				};
				$i("guia"+g).onmouseout = function()
				{
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "transparent";
				};
				if($i("guia"+g+"obj"))
				{
					$i("guia"+g+"obj").style.overflow="auto";
					$i("guia"+g+"obj").style.height = objmapa.h;
				}
			}
		}
	}
	//
	//define a fun��o que ser� executada quando o usu�rio clica em uma guia padr�o
	//
	if ($i(objmapa.guiaTemas))
	{
		$i(objmapa.guiaTemas).onclick = function()
		{
			g_guiaativa = objmapa.guiaTemas;mostraguiaf(1);
		};
	}
	if ($i(objmapa.guiaMenu))
	{
		$i(objmapa.guiaMenu).onclick = function()
		{
			g_guiaativa = objmapa.guiaMenu;
			mostraguiaf(2);
			//pega a lista de �rvores que devem ser montadas
			//� executado apenas se n�o existir o id=arvoreAdicionaTema
			//caso contr�rio, a �rvore � montada na inicializa��o do i3geo
			if(!$i("arvoreAdicionaTema"))
			{var ondeArvore = objmapa.guiaMenu+"obj";}
			else
			{var ondeArvore = "arvoreAdicionaTema";}
			//
			//para efeitos de compatibilidade
			//
			if(document.getElementById("outrasOpcoesAdiciona"))
			{
				i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde = "outrasOpcoesAdiciona";
				i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore = false;
			}
			//
			//cria a �rvore
			//
			i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,ondeArvore);
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
				var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+i3GEO.configura.sid;
				cpObj.call(p,"pegaMapas",pegaMapas);
			}
			else
			{alert("id banners nao encontrado");}
		};
	}
	YAHOO.log("Fim ativaGuias", "i3geo");
}
/**
Function: mudaiconf

Muda as bordas dos �cones de ferramentas, passando todos para normal.
Aplica uma borda sobre um �cone espec�fico e executa outras opera��es.

Utilizado para indicar que uma determinada op��o est� em uso.

Como esta fun��o � executada quando um �cone � clicado, algumas opera��es s�o definidas aqui
como por exemplo, definir o �cone que segue o mouse. 

Parameters:

i - id do �cone que receber� a borda.
*/
function mudaiconf(i)
{
	try
	{
		YAHOO.log("mudaiconf", "i3geo");
		//limpa o container com os tips fixos na tela
		if(objmapa.objtips.length > 0)
		{
			var ot = objmapa.objtips.length-1;
			if(ot >= 0)
			{
				do
				{
					if (objmapa.objtips[ot])
					{
						objmapa.objtips[ot].innerHTML = "";
						objmapa.objtips[ot].style.display="none";
					}
				}
				while(ot--)
			}
		}
		objmapa.objtips = new Array();
		limpacontainerf();
		g_tipoacao = i;
		if ($i("divGeometriasTemp"))
		{$i("divGeometriasTemp").style.display = "none";}
		YAHOO.log("Fim mudaiconf", "i3geo");
	}
	catch(e){alert("Ocorreu um erro. mudaiconf"+e);}
}
/*
Function: mostraguiaf

Ativa a visualiza��o de uma determinada guia.

A ativa��o consiste em tornar vis�vel os elementos correspondentes a uma determinada guia.
Esses elementos devem estar contidos em um DIV cujo id deve ser composto pela palavra "guia" seguida do n�mero da
guia e a palavra "obj", por exemplo, guia9obj.

Par�metros:

guia - n�mero da guia que ser� ativada.
*/
function mostraguiaf(guia)
{
	if ($i("guia"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10,11,12];
		for (var j=0;j<10; j++)
		{
			if ($i("guia"+fs[j]))
			{
				jj = fs[j];
				if ($i("guia"+jj+"obj"))
				{$i("guia"+jj+"obj").style.display="none";}
				$i("guia"+fs[j]).parentNode.parentNode.style.background="transparent";
			}
		}
		if ($i("guia"+guia+"obj"))
		{
			$i("guia"+guia+"obj").style.display="block";
		}
		else
		{alert("O objeto guia"+guia+"obj nao existe.");}
		$i("guia"+guia).parentNode.parentNode.style.background="white";
	}
}
/**
Function: ativaClicks

Ativa as opera��es de clique sobre o mapa

Define o que ser� executado quando o mouse � clicado ou movido sobre o mapa.

Al�m das fun��es padr�o,s�o ativadas aquelas definidas nas vari�veis de configura��o (veja configura.js)

Parameters:

docMapa - objeto que ser� alvo da ativa��o dos cliques
*/
function ativaClicks(docMapa)
{
	docMapa.onmouseover = function()
	{
		try
		{
			if ($i("janelaMenu"))
			{$i("janelaMenu").style.display="none";}
			//verifica se o mouse esta parado
			if (objmapa.parado!="cancela")
			{
				objmapa.parado="nao";
			}
			if ($i("tip"))
			{$i("tip").style.display="none";}
		}
		catch(e){var e = "";}
		this.onmousemove=function(exy)
		{
			try
			{
				if ($i("mostraUTM")){$i("mostraUTM").style.display="none";}
				if ($i("tip"))
				{$i("tip").style.display="none";}
				try
				{clearTimeout(objmapa.tempoParado);}
				catch(e){var a = e;}
				objmapa.tempoParado = setTimeout('i3GEO.eventos.mouseParado()',i3GEO.configura.tempoMouseParado);
				capturaposicao(exy);
				if (g_destaca != "")
				{$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - destacaTamanho)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - destacaTamanho)+')';}
				if ($i("img") && (g_panM == "sim"))
				{
					var nx = objposicaocursor.telax - leftinicial - clicinicialx;
					var ny = objposicaocursor.telay - topinicial - clicinicialy;
					if (g_entorno == "nao")
					{
						var l = 0;
						if (parseInt($i("i3geo").style.left))
						{var l = parseInt($i("i3geo").style.left);}
						$i("img").style.left = nx - l;
						var t = 0;
						if (parseInt($i("i3geo").style.top))
						{var t = parseInt($i("i3geo").style.top);}
						$i("img").style.top = ny - t;
					}
					else
					{
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
			}
			catch(e){var e = "";}
			try
			{objmapa.verificaMousemoveMapa();}
			catch(e){var e = "";}
		};
	};
	docMapa.onmouseout = function()
	{
		try
		{
			objmapa.parado="parar";
			mostradicasf(this,'');
		}
		catch(e){var e = "";}
	};
	docMapa.onmousedown = function(exy)
	{
		try
		{
			capturaposicao(exy);
			//verifica se esta na opï¿½o de zoom box
			if ((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox"))
			{
				// inicia retï¿½gulo de zoom
				if($i("box1"))
				{
					var i = $i("box1").style;
					i.width=0;
					i.height=0;
					i.visibility="visible";
					i.display="none";
					i.left = objposicaocursor.telax + g_postpx;
					i.top = objposicaocursor.telay + g_postpx;
				}
				boxxini = objposicaocursor.telax;
				boxyini = objposicaocursor.telay;
				tamanhox = 0;
				tamanhoy = 0;
			}
			if ($i("img") && (g_tipoacao == "pan"))
			{
				g_panM = "sim";
				if($i("corpoMapa"))
				{
					leftinicial = parseInt($i("corpoMapa").style.left);
					topinicial = parseInt($i("corpoMapa").style.top);
				}
				clicinicialx = objposicaocursor.imgx;
				clicinicialy = objposicaocursor.imgy;
				ddinicialx = objposicaocursor.ddx;
				ddinicialy = objposicaocursor.ddy;
			}
		}
		catch(e){var e = "";}
	};
	docMapa.onclick = function()
	{
		try
		{
			objmapa.verificaClickMapa();
		}
		catch(e){var e = "";}
	};
	docMapa.onmouseup = function()
	{
		try
		{
			if (g_tipoacao == "zoomli"){zoomboxf("termina");}
			if (g_tipoacao == "selecaobox"){zoomboxf("termina");}
			//
			//realiza o pan (deslocamento) do mapa em fun��o de dois pontos
			//
			if ($i("img") && (g_tipoacao == "pan"))
			{
				marcadorZoom = "";
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
					i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
					var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pan&x="+objposicaocursor.imgx+"&y="+objposicaocursor.imgy+"&g_sid="+i3GEO.configura.sid;
					cpObj.call(p,"pan",ajaxredesenha);
					return;
				}
				var nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,g_tipoimagem,nex);
			}
		}
		catch(e){var e = "";}
	};
}
/*
Function: initJanelaRef

Abre a janela com o mapa de referencia
*/
function initJanelaRef()
{
	YAHOO.log("initJanelaRef", "i3geo");
	if (!$i("winRef"))
	{
		var novoel = document.createElement("div");
		novoel.id = "winRef";
		novoel.style.display="none";
		novoel.style.borderColor="gray";
		var ins = '<div class="hd">';
		var temp = "javascript:if(g_zoomRefDinamico == -1){g_zoomRefDinamico = 1};g_zoomRefDinamico = g_zoomRefDinamico + 1 ;$i(\"refDinamico\").checked = true;objmapa.atualizaReferencia();";
		ins += "<img class=mais onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />";
		var temp = "javascript:if(g_zoomRefDinamico == 1){g_zoomRefDinamico = -1};g_zoomRefDinamico = g_zoomRefDinamico - 1 ;$i(\"refDinamico\").checked = true;objmapa.atualizaReferencia();";
		ins += "<img class=menos onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />&nbsp;";
		ins += '<input style="cursor:pointer" onclick="javascript:objmapa.atualizaReferencia()" type="checkbox" id="refDinamico" />&nbsp;'+$trad("o6")+'</div>';
		ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="javascript:movimentoRef(this)" onclick="javascript:clicouRef()">';
		ins += '<img style="cursor:pointer;" id=imagemReferencia src="" >';
		ins += '<div id=boxRef style="position:absolute;top:0px;left:0px;width:10px;height:10px;border:2px solid blue;display:none"></div></div>';
		ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
		$i("imagemReferencia").style.height = objmapa.refheight+"px";
	}
	if($i("winRef").style.display != "block")
	{
		$i("winRef").style.display = "block";
		YAHOO.namespace("janelaRef.xp");
		YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaRef.xp.panel.render();
		var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
		if (navm){YAHOO.janelaRef.xp.panel.moveTo((pos[0]+objmapa.w-160),pos[1]+4);}
		else
		{YAHOO.janelaRef.xp.panel.moveTo((pos[0]+objmapa.w-160),pos[1]+4);}
		var escondeRef = function()
		{
			YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close, "click");
			YAHOO.janelaRef.xp.panel.destroy();	
			i3GEO.util.insereCookie("g_mapaRefDisplay","none");
		};
		YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close, "click", escondeRef);	
		i3GEO.util.insereCookie("g_mapaRefDisplay","block");
	}
	YAHOO.log("Fiim initJanelaRef", "i3geo");
	objmapa.atualizaReferencia();
}

/*
Function: movelentef

Move a imagem na lente de aumento conforme o movimento do mouse sobre o mapa.

A lente de aumento � uma ferramenta do i3geo.

Esta fun��o � executada sempre que o mouse � movido sobre o mapa e se o elemento "lente" estiver vis�vel.
*/
function movelentef()
{
	try
	{
		if ($i("lente"))
		{
			if ($i("lente").style.visibility=="visible")
			{
				var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
				var esq = (objposicaocursor.telax - pos[0]) * 2.25;
				var topo = (objposicaocursor.telay - pos[1]) * 2.25;
				var clipt = "rect("+ (topo - 40) + " " + (esq + 40) + " " + (topo + 40) + " " + (esq - 40) +")";
				var i = $i("lente").style;
				i.clip = clipt;
				eval("i." + g_tipotop + "= (pos[1] - (topo - 40)) + g_postpx");
				eval("i." + g_tipoleft +  "= (pos[0] - (esq - 40)) + g_postpx");
			}
		}
	}
	catch(e){var e = "";}
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
function zoomboxf(tipo)
{
	var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
	if($i("box1"))
	{
		var bx = $i("box1");
		var bxs = bx.style;
	}
	else
	{alert("Box nao encontrado");return;}
	switch(tipo)
	{
		case "desloca":
		// muda o ret�gulo de zoom conforme deslocamento do mouse
		bxs.display="block";
		ppx = objposicaocursor.telax;
		py = objposicaocursor.telay;
		if (navm)
		{
			if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
			{bxs.width = ppx - boxxini - 2;}
			if ((py > boxyini) && ((py - boxyini - 2) > 0))
			{
				bxs.height = py - boxyini - 2;
			}
			if (ppx < boxxini)
			{bxs.left = ppx;bxs.width = boxxini - ppx + 2;}
			if (py < boxyini)
			{bxs.top = py;bxs.height = boxyini - py + 2;}
		}
		else
		{
			if (ppx > boxxini)
			{bxs.width = ppx - boxxini + "px";}
			if (py > boxyini)
			{bxs.height = py - boxyini + "px";}
			if (ppx < boxxini)
			{bxs.left = ppx + "px";bxs.width = boxxini - ppx + "px";}
			if (py < boxyini)
			{bxs.top = py + "px";bxs.height = boxyini - py + "px";}
		}
		break;
		case "termina":
		// finaliza o ret�gulo de zoom
		md = 1;
		eval ('pix = parseInt(document.getElementById("box1").style.' + g_tipoleft + ")");
		eval ('piy = parseInt(document.getElementById("box1").style.' + g_tipotop + ")");
		xfig0 = parseInt(bxs.width) - pos[0];
		yfig0 = parseInt(bxs.height) - pos[1];
		xfig = pix + (parseInt(bxs.width)) - pos[0];
		yfig = piy + (parseInt(bxs.height)) - pos[1];
		amext = objmapa.extent.split(" ");
		dx = ((amext[0] * -1) - (amext[2] * -1)) / (tamanhox - 1);
		dy = ((amext[1] * 1) - (amext[3] * 1)) / (tamanhoy - 1);
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x1 = (amext[0] * 1) + nx;
		y1 = (amext[3] * 1) - ny;
		xfig = pix - pos[0];
		yfig = piy - pos[1];
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
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,g_tipoimagem,v);
			}
		}
		else
		{
			if (x1 != x2)
			{
				try
				{
					var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
					var tipo = "adiciona";
					//pega o tipo de operacao da janela de selecao
					if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
					if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
					//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
					if ((tipo != "limpa") && (tipo != "inverte"))
					{
						i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
						var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=selecaobox&ext="+v+"&g_sid="+i3GEO.configura.sid+"&tipo="+tipo+"&tema="+objmapa.temaAtivo;
						cpObj.call(p,"selecaobox",ajaxredesenha);
					}
				}
				catch(e){var e = "";}
			}
		}		
		bxs.visibility="hidden";
		bxs.width = 0;
		bxs.height = 0;
		break;
	}
}
/*
Function: clicouRef

Altera a abrang�ncia do mapa quando o mapa de refer�ncia � clicado
*/
function clicouRef()
{
	try
	{
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&tipo=ref&x="+objposicaocursor.refx+"&y="+objposicaocursor.refy+"&g_sid="+i3GEO.configura.sid;
		cpObj.call(p,"pan",ajaxredesenha);
	}
	catch(e){var e = "";i3GEO.janela.fechaAguarde("ajaxredesenha");}
}
/*
Function: movimentoRef

Pega a coordenada do cursor sobre o mapa de refer�ncia
*/
function movimentoRef(obj)
{
	obj.onmousemove =function(exy)
	{
		capturaposicao(exy);
	};
}
/*
Function: ativaEntorno

Ativa ou desativa a carga do entorno.

Com o entorno ativo, s�o produzidas imagens no entorno do mapa, no estilo Google.
*/
function ativaEntorno()
{
	if(objmapa.mapfile == "")
	{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
	if (g_entorno == "sim")
	{
		var letras=["L","O","N","S"];
		for (var l=0;l<4; l++)
		{
			if ($i("img"+letras[l]))
			{
				$i("img"+letras[l]).style.display = "none";
				$i("img"+letras[l]).src = "";
			}
		}
		$left("img",0);
		$top("img",0);
		g_entorno = "nao";
		alert("Entorno desativado");
		$i("img").style.visibility = "visible";
		$i("img").style.display = "block";
	}
	else
	{
		geraURLentorno();
		var letras=["L","O","N","S"];
		for (var l=0;l<4; l++)
		{
			if ($i("img"+letras[l]))
			{
				$i("img"+letras[l]).style.width = objmapa.w;
				$i("img"+letras[l]).style.height = objmapa.h;
				$i("img"+letras[l]).style.display = "block";
			}
		}
		g_entorno = "sim";
		ajustaEntorno();
		alert("Entorno ativado. o desenho do mapa pode demorar mais.");
	}
}
/*
Function: geraURLentorno

Gera as urls que far�o parte dos divs de desenho do entorno do mapa.
Essas URLs utilizam o mapserver no modo CGI
*/
function geraURLentorno()
{
	var nny = (objmapa.h / 2) * -1;
	var nnx = objmapa.w / 2;
	var sy = objmapa.h + (objmapa.h / 2);
	var sx = objmapa.w / 2;
	var lx = objmapa.w + (objmapa.w / 2);
	var ly = objmapa.h / 2;
	var ox = (parseInt(objmapa.w/2)) * -1;
	var oy = objmapa.h / 2;
	var u = window.location.protocol+"\/\/"+window.location.host+objmapa.cgi+"?map="+objmapa.mapfile;
	u += "&mode=map&imgext="+objmapa.extent+"&mapsize="+nnx+" "+oy;
	var sul = u+"&imgxy="+sx/2+" "+sy/2;
	var norte = u+"&imgxy="+nnx/2+" "+nny/2;
	var leste = u+"&imgxy="+lx/2+" "+ly/2;
	var oeste = u+"&imgxy="+ox/2+" "+oy/2;
	$i("imgS").src=sul;
	$i("imgN").src=norte;
	$i("imgL").src=leste;
	$i("imgO").src=oeste;
}
/*
Function: ajustaEntorno

Ajusta o tamanho do mapa e das imagens do entorno, quando a op��o de desenho do entorno estiver ativa.

Os valores que definem o tamanho do mapa s�o obtidos do objeto objmapa (m�todos w e h)
*/
function ajustaEntorno()
{
	$left("img",objmapa.w*-1);
	$left("imgS",objmapa.w*-1);
	$left("imgL",objmapa.w);
	$left("imgO",objmapa.w*-3);
	$left("imgN",objmapa.w*-1);
	$top("img",objmapa.h*-1);
	$top("imgS",objmapa.h*-1);
	$top("imgL",objmapa.h*-1);
	$top("imgN",objmapa.h*-1);
	$top("imgO",objmapa.h*-1);
}
/*
Section: atributos
*/
/*
Function: verificaTip

Verifica se a op��o de identifica��o est� ativa e se o mouse est� parado.
Se o mouse estiver parado, chama a fun��o de mostrar tip.

A fun��o de busca dos dados para a etiqueta � definida na vari�vel de configura��o g_funcaoTip

Pode-se definir uma outra fun��o qualquer, sem a necessidade de altera��o do c�digo original do i3geo, definindo-se
no HTML da interface a vari�vel, por exemplo, gfuncaoTip = "minhasEtiquetas()"

Por default, utiliza-se a fun��o verificaTipDefault()
*/
function verificaTip()
{
	if (g_operacao != "identifica"){return;}
	//insere div para tips
	if (!$i("tip"))
	{
		var novoel = document.createElement("div");
		novoel.id = "tip";
		novoel.style.position="absolute";
		novoel.style.zIndex=5000;
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		document.body.appendChild(novoel);
	}
	if ((g_operacao == "identifica") && ($i("tip").style.display!="block"))
	{
		var i = $i("tip");
		var ist = i.style;
		ist.top = objposicaocursor.telay +20;
		ist.left = objposicaocursor.telax;
		i.innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>Pesquisando...</td></tr></table>";
		ist.display="block";
		eval(g_funcaoTip);
	}
}
/*
Function: verificaTipDefault

Executa a opera��o de identifica��o para mostrar uma etiqueta no mapa.

Esta � a fun��o default, definida na vari�vel g_funcaoTip
*/
function verificaTipDefault()
{
	YAHOO.log("verificaTipDefault", "i3geo");
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=identifica&opcao=tip&xy="+objposicaocursor.ddx+","+objposicaocursor.ddy+"&resolucao=5&g_sid="+i3GEO.configura.sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_persistent_connection(true);
	cp.set_response_type("JSON");
	cp.call(p,"identifica",mostraTip);
}
/*
Function: mostraTip

Mostra a descri��o de um elemento do mapa como uma etiqueta na posi��o do mouse.

Para que um tema tenha uma etiqueta, � necess�rio configurar o metadata TIP no map file.

Parameters:

retorno - retorno da fun��o ajax com os dados para montar a etiqueta.
*/
function mostraTip(retorno)
{
	var mostra = false;
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
			var tema = temas.length-1;
			if(tema >= 0)
			{
				do
				{
					var titulo = temas[tema].split("@");
					if (g_tipotip == "completo")
					{
						res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";
					}
					var ocorrencias = titulo[1].split("*");
					var ocorrencia = ocorrencias.length-1;
					if(ocorrencia >= 0)
					{
						do
						{
							if (ocorrencias[ocorrencia] != "")
							{
								var pares = ocorrencias[ocorrencia].split("##");
								var paresi = pares.length;
								for (var par=0;par<paresi; par++)
								{
									var valores = pares[par].split("#");
									if (g_tipotip == "completo")
									{
										res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
										var mostra = true;
									}
									else
									{
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
			if ($i("janelaMen"))
			{
				$i("janelaMenTexto").innerHTML = res;
			}
			else
			{
				var i = $i("tip");
				i.innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
				ist = i.style;
				ist.top = objposicaocursor.telay - 10;
				ist.left = objposicaocursor.telax - 20;
				ist.display="block";
			}
		}
	}
	YAHOO.log("Fim mostraTip", "i3geo");
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
	try
	{
		var temp = par.split("*");
		var par = "<table>";
		var i = temp.length-1;
		if(i >= 0)
		{
			do
			{
				var t = temp[i];
				var t = t.split(",");
				par += "<tr style='text-align:left'><td style='background-color:rgb("+t[1]+","+t[2]+","+t[3]+")'>&nbsp;&nbsp;</td><td style='text-align:left'>"+t[0]+"</td></tr>";
			}
			while(i--)
		}
		par += "</table>";
		if (!$i("legendagr"))
		{
			var novoel = document.createElement("div");
			var temp = '<div class="hd">Legenda</div>';
			temp += '<div class="bd">';
			temp += '<div id="contemleggr" ></div></div>';
			novoel.id = "legendagr";
			novoel.style.display="block";
			novoel.style.textAlign="left";
			novoel.innerHTML = temp;
			document.body.appendChild(novoel);
			YAHOO.namespace("legendagr.xp");
			YAHOO.legendagr.xp.panel = new YAHOO.widget.Panel("legendagr", {width:"250px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		}
		$i("contemleggr").innerHTML = par;
		YAHOO.legendagr.xp.panel.render();
		YAHOO.legendagr.xp.panel.show();
	}
	catch(e){alert("Ocorreu um erro. legendaGrafico"+e);}
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
	YAHOO.log("atualizagoogle", "i3geo");
	if (frames["wdocai"])
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
	YAHOO.log("Fim atualizagoogle", "i3geo");
}
/*
Function: atualizascielo

Atualiza a lista de dados na op��o de busca Scielo
*/
function atualizascielo()
{
	YAHOO.log("atualizascielo", "i3geo");
	if ($i("wdocai"))
	{
		if (window.parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoscielo"))
			{
				$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/scielo/index.htm";
			}
		}
	}
	YAHOO.log("Fim atualizascielo", "i3geo");
}	
/*
Function: atualizaconfluence

Atualiza a lista de dados na op��o de busca confluence
*/
function atualizaconfluence()
{
	YAHOO.log("atualizaconfluence", "i3geo");
	if($i("wdocai"))
	{
		if (window.parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoconfluence"))
			{
				$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/confluence/index.htm";
			}
		}
	}
	YAHOO.log("Fim atualizaconfluence", "i3geo");
}
/*
Function: atualizawiki

Atualiza a lista de dados na op��o de busca wiki
*/
function atualizawiki()
{
	YAHOO.log("atualizawiki", "i3geo");
	if ($i("wdocai"))
	{
		if (window.parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadowiki"))
			{
				$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/wiki/index.htm";
			}
		}
	}
	YAHOO.log("Fim atualizawiki", "i3geo");
}
/*
Section: menu de temas e outras listagens
*/
/*
Function: i3geo_comboGruposMenu

Busca a lista de grupos existentes no menu de temas do i3geo e monta um combo com o resultado.

Ao escolher uma op��o do combo, a fun��o de retorno receber� como par�metro o id do grupo.

Parameters:

funcaoOnchange - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

idDestino - id do elemento HTML que receber� o combo

idCombo - id do combo que ser� criado

largura - largura em pixels do combo

altura - altura do combo em linhas
*/
function i3geo_comboGruposMenu(funcaoOnchange,idDestino,idCombo,largura,altura)
{
	var combo = function (retorno)
	{
		obGrupos = retorno.data;
		var ins = "<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um grupo:</option>";
		for (ig=0;ig<obGrupos.grupos.length; ig++)
		{
			if(obGrupos.grupos[ig].nome)
			ins += "<option value="+ig+" >"+obGrupos.grupos[ig].nome+"</option>";
		}
		$i(idDestino).innerHTML = ins+"</select>";
	};
	var p = "classesphp/mapa_controle.php?funcao=pegalistadegrupos&map_file=''&listasgrupos=nao";
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"pegalistadegrupos",combo);
}
/*
Function: i3geo_comboSubGruposMenu

Monta um combo com a lista de subgrupos de um grupo do menu de temas do i3geo.

Ao escolher um subgrupo, a fun��o de retorno receber� o id do grupo e o id do subgrupo.

Parameters:

funcaoOnchange - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

idDestino - id do elemento HTML que receber� o combo

idCombo - id do combo que ser� criado

idGrupo - identificador do grupo que ser� pesquisado

largura - largura em pixels do combo

altura - altura do combo em linhas
*/
function i3geo_comboSubGruposMenu(funcaoOnchange,idDestino,idCombo,idGrupo,largura,altura)
{
	if(idGrupo != "")
	{
		var combo = function(retorno)
		{
			var ins = "<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+",this.value)' ><option value='' >Escolha um sub-grupo:</option>";
			if (retorno.data.subgrupo)
			{
				var sg = retorno.data.subgrupo;
				for (ig=0;ig<sg.length; ig++)
				{	
					ins += "<option value="+ig+" >"+sg[ig].nome+"</option>";
				}
			}
			$i(idDestino).innerHTML = ins+"</select>";
		};
		var p = "classesphp/mapa_controle.php?funcao=pegalistadeSubgrupos&map_file=''&grupo="+idGrupo;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"pegalistadeSubgrupos",combo);
	}
}
/*
Function: i3geo_comboTemasMenu

Monta um combo com a lista de subgrupos de um grupo do menu de temas do i3geo.

Ao escolher um subgrupo, a fun��o de retorno receber� o id do grupo e o id do subgrupo.

Parameters:

funcaoOnchange - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

idDestino - id do elemento HTML que receber� o combo

idCombo - id do combo que ser� criado

idGrupo - identificador do grupo que ser� pesquisado

idSubGrupo - id do subgrupo

largura - largura em pixels do combo

altura - altura do combo em linhas
*/
function i3geo_comboTemasMenu(funcaoOnchange,idDestino,idCombo,idGrupo,idSubGrupo,largura,altura)
{
	var combo = function(retorno)
	{
		var ins = "<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+","+idSubGrupo+",this.value)' ><option value='' >Escolha um tema:</option>";
		if (retorno.data.temas[i])
		{
			var sg = retorno.data.temas;
			for (ig=0;ig<sg.length; ig++)
			{	
				ins += "<option value="+sg[ig].tid+" >"+sg[ig].nome+"</option>";
			}
		}
		$i(idDestino).innerHTML = ins+"</select>";
	};
	var p = "classesphp/mapa_controle.php?funcao=pegalistadetemas&map_file=''&grupo="+idGrupo+"&subgrupo="+idSubGrupo;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"pegalistadetemas",combo);

}
/*
Function: pegaMapas

Recebe a lista de mapas (banners) e monta a apresenta��o na guia "mapas".

Adiciona na guia mapas os banners que d�o acesso direto a mapas especiais.

A indica��o do arquivo xml � feita em ms_configura.php ou no sistema de administra��o

Parameters:

retorno - objeto JSON com a lista de mapas
*/
function pegaMapas(retorno)
{
	var ins = "<br>";
	var mapa = retorno.data.mapas;
	var ig1lt = mapa.length;
	var ig1=0;
	if(ig1lt > 0)
	{
		do
		{
			var nome = mapa[ig1].NOME;
			if(mapa[ig1].PUBLICADO)
			{
				if(mapa[ig1].PUBLICADO == "NAO" || mapa[ig1].PUBLICADO == "nao")
				{var nome = "<s>"+nome+"</s>";}
			}
			var descricao = mapa[ig1].DESCRICAO;
			var imagem = mapa[ig1].IMAGEM;
			var temas = mapa[ig1].TEMAS;
			var ligados = mapa[ig1].LIGADOS;
			var extensao = mapa[ig1].EXTENSAO;
			var outros = mapa[ig1].OUTROS;
			var lkd = mapa[ig1].LINK;
			var link = i3GEO.configura.locaplic+"/ms_criamapa.php?temasa="+temas+"&layers="+ligados;
			if (extensao != "")
			{link += "&mapext="+extensao;}
			if (outros != "")
			{link += "&"+outros;}
			if (lkd != "")
			{var link = lkd;}
			ins += "<div><a href='"+link+"'><img src='"+imagem+"'></a></div><br>";
			ins += "<div><p>"+nome+"</p></div><br>";
			ig1++;
		}
		while(ig1<ig1lt)
	}
	$i("banners").innerHTML = ins;
}
/*
Section: redesenho do mapa
*/
/*
Function: autoRedesenho

Controla a op��o de redesenho autom�tico temporizado

Para funcionar, a vari�vel de inicializa��o g_autoRedesenho deve ser > 0

Parameters:

opcao: ativa|desativa|redesenha
*/
function autoRedesenho(opcao)
{
	if (opcao == "desativa")
	{
		g_autoRedesenho = 0;
		clearTimeout(objmapa.tempoRedesenho);
		clearTimeout(objmapa.contaTempoRedesenho);
		objmapa.tempoRedesenho = "";
		objmapa.contaTempoRedesenho = "";
		objmapa.tempoRedesenho = "";
		if ($i("tempoRedesenho"))
		{$i("tempoRedesenho").style.display = "none";}
	}
	if (opcao == "ativa")
	{
		if (($i("tempoRedesenho")) && (g_autoRedesenho > 0))
		{$i("tempoRedesenho").style.display = "block";}
		if (g_autoRedesenho > 0)
		{objmapa.tempoRedesenho = setTimeout('autoRedesenho("redesenha")',g_autoRedesenho);}
		if (($i("tempoRedesenho")) && (g_autoRedesenho > 0))
		{
			$i("tempoRedesenho").innerHTML = g_autoRedesenho/1000;
			objmapa.contaTempoRedesenho = setTimeout('autoRedesenho("contagem")',1000);
		}
	}
	if (opcao == "redesenha")
	{
		clearTimeout(objmapa.tempoRedesenho);
		clearTimeout(objmapa.contaTempoRedesenho);
		remapaf();
		autoRedesenho("ativa");
	}
	if (opcao == "contagem")
	{
		if ($i("tempoRedesenho"))
		{
			$i("tempoRedesenho").innerHTML = parseInt($i("tempoRedesenho").innerHTML) - 1;
			objmapa.contaTempoRedesenho = setTimeout('autoRedesenho("contagem")',1000);
		}
	}
}
/*
Function: remapaf

Prepara o redesenho do mapa de acordo com o que esta visivel ou nao.

Chamado por algumas fun��es que necessitam refazer o desenho do mapa.

Verifica na lista de temas j� adicionados, os temas que est�o ligados e desligados,
Chama a fun��o que verifica na lista de temas adicionais.
*/
function remapaf()
{
	//
	//zera o contador de tempo
	//
	YAHOO.log("remapaf", "i3geo");
	clearTimeout(objmapa.tempo);
	objmapa.tempo = "";
	objmapa.temaAtivo = "";
	if ($i(objmapa.guiaTemas+"obj"))
	{
		//
		//se g_operacao = 'legenda' significa que o usu�rio clicou em um tema na guia legenda
		//nesse caso, a busca dos temas que devem ser ligados e desligados deve ser feita no id='legenda'
		//
		if(g_operacao == "legenda")
		{var iguias = $i("legenda").getElementsByTagName("input");}
		else
		{var iguias = $i(objmapa.guiaTemas+"obj").getElementsByTagName("input");}
		var tsl = new Array();
		var tsd = new Array();
		var i = iguias.length-1;
		if (i >= 0)
		{
			do
			{
				if (iguias[i].type == "checkbox")
				{
					if(iguias[i].name == "layer")
					{
						if (iguias[i].checked == false)
						{tsd.push(iguias[i].value);}
						if (iguias[i].checked == true)
						{tsl.push(iguias[i].value);}
					}
				}
			}
			while(i--)
		}
		var remapaAdicNovos = function remapaAdicNovos(retorno)
		{
			if ($i("buscatema"))
			{
				var g = $i(objmapa.guiaMenu+"obj");
				if($i("arvoreAdicionaTema"))
				{var g = $i("arvoreAdicionaTema");}
				var iguias = g.getElementsByTagName("input");
				var ta = new Array();
				var i = iguias.length-1;
				if (i >= 0)
				{
					do
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
					while(i--)
				}
				if (ta.length > 0)
				{
					i3GEO.janela.fechaAguarde("remapa");
					i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
					var temp = function(retorno)
					{
						i3GEO.janela.fechaAguarde("ajaxredesenha");
						if(retorno.data.erro)
						{
							alert(retorno.data.erro);
							return;
						}
						ajaxredesenha("");					
					};
					var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=adtema&temas="+(ta.toString())+"&g_sid="+i3GEO.configura.sid;
					cpObj.call(p,"adicionaTema",temp);
				}
				else
				{
					i3GEO.janela.fechaAguarde("remapa");
					i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
					ajaxredesenha("");
				}
			}
			else
			{
				i3GEO.janela.fechaAguarde("remapa");
				i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
				ajaxredesenha("");
			}
		};
		if ((tsd.length > 0) || (tsl.length > 0))
		{
			i3GEO.janela.abreAguarde("remapa",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=ligatemas&desligar="+(tsd.toString())+"&ligar="+(tsl.toString())+"&g_sid="+i3GEO.configura.sid;
			cpObj.call(p,"ligaDesligaTemas",remapaAdicNovos);
		}
		else{remapaAdicNovos();}
		i3GEO.janela.fechaAguarde("remapa");
	}
	else
	{remapaAdicNovos();}
	YAHOO.log("FIm remapaf", "i3geo");
}
/*
Section: eventos
*/

/*
Function: calcposf

Calcula a posi��o do corpo do mapa e posiciona-o corretamente na tela.
*/
function calcposf()
{
	try
	{
		YAHOO.log("calcposf", "i3geo");
		imagemxi = 0;
		imagemyi = 0;
		imagemxref = 0;
		imagemyref = 0;
		if(!$i("i3geo")){return;}
		if ($i("i3geo").style.left){imagemxi += parseInt($i("i3geo").style.left);}
		if ($i("i3geo").style.top){imagemyi += parseInt($i("i3geo").style.top);}	
		var dc = $i("i3geo");
		if ($i("contemImg"))
		{var dc = $i("contemImg");}
		else
		{var dc = $i("img");}
		if ($i("openlayers"))
		{var dc = $i("openlayers");}
		if ($i("flamingo"))
		{var dc = $i("flamingo");}
		while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo"))
		{
			dc = dc.offsetParent;
			imagemxi = imagemxi + dc.offsetLeft;
			imagemyi = imagemyi + dc.offsetTop;
		}
		if ($i("corpoMapa"))
		{
			$i("corpoMapa").style.position="absolute";
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
		YAHOO.log("Fim calcposf", "i3geo");
	}
	catch(e){alert("Ocorreu um erro. calcposf"+e);}
}
/*
Function: capturaposicao

Captura a posi��o do mouse em fun��o do evento onmousemove sobre o corpo do mapa ou sobre o mapa de refer�ncia.

Atualiza o objeto objposicaocursor.
A fun��o de mostrar etiquetas � definida como "" quando o mouse � movimentado.

Parameters:

exy - objeto evento.
*/
function capturaposicao(e)
{
	if (!e) var e = window.event;
	//
	//verifica sob qual objeto o mouse est� se movendo
	//
	if (e.target)
	{var targ = e.target;}
	else if (e.srcElement) var targ = e.srcElement;
	if(targ.id == "" && $i("img"))
	{var targ = $i("img");}
	//
	//se estiver no modo pan, o movimento deve ser obtido do elemento
	//onde est� a imagem do mapa e n�o diretamente sobre o elemento 'img'
	//se n�o for feito assim, o deslocamento do mapa n�o � capturado
	//
	if (g_panM == "sim")
	{var pos = i3GEO.util.pegaPosicaoObjeto(targ.parentNode);}
	else
	{var pos = i3GEO.util.pegaPosicaoObjeto(targ);}
	if((g_entorno == "sim") && (g_panM == "sim"))
	{
		pos[0] = pos[0] - objmapa.w;
		pos[1] = pos[1] - objmapa.h;
	}
	//
	//pega a posicao correta do mouse
	//
	var mousex = 0;
	var mousey = 0;
	if (e.pageX || e.pageY) 	{
		mousex = e.pageX;
		mousey = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		mousex = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		mousey = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}

	//
	//faz os c�lculos de posicionamento
	//fig e reffig s�o a mesma coisa por enquanto
	//
	var xfig = mousex - pos[0];
	var yfig = mousey - pos[1];
	var xreffig = xfig;
	var yreffig = yfig;
	var xtela = mousex;
	var ytela = mousey;
	//
	//celula e extent s�o necess�rios para se fazer a
	//convers�o de coordenadas de tela para coordenadas geogr�ficas
	//esses valores s�o obtidos das fun��es ajax que redesenham ou inicializam o mapa
	// 
	var c = g_celula;
	var ex = objmapa.extent;
	try{
		if(targ.id == "imagemReferencia"){
			var c = g_celularef;
			var ex = objmapa.extentref;
			var r = $i("i3geo_rosa");
			if(r)
			r.style.display = "none"
		}
	}
	catch(e){g_celularef = 0;}
	var teladd = i3GEO.calculo.tela2dd(xfig,yfig,c,ex);
	var teladms = i3GEO.calculo.dd2dms(teladd[0],teladd[1]);
	objposicaocursor.ddx = teladd[0];
	objposicaocursor.ddy = teladd[1];
	objposicaocursor.dmsx = teladms[0];
	objposicaocursor.dmsy = teladms[1];
	objposicaocursor.telax = xtela;
	objposicaocursor.telay = ytela;
	objposicaocursor.imgx = xfig;
	objposicaocursor.imgy = yfig;
	objposicaocursor.refx = xreffig;
	objposicaocursor.refy = yreffig;
	ajaxTip = "";
}
/*
Section: calculos
*/
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

Cria o objeto que ir� armazenaa as coordenadas para calculo de distancia

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
Function: desenhoRichdraw

Desenha elementos na tela usando a biblioteca richdraw

Parameters:

tipo - tipo de opera��o

objeto - objeto gr�fico do container richdraw

n - �ndice do elemento no array pontosdistobj
*/
function desenhoRichdraw(tipo,objeto,n)
{
	if (richdraw && $i("img"))
	{
		var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
		//
		//faz o reposicionamento de linhas quando o mouse � movido e a linha est� ativa
		//
		if((tipo=="resizeLinha") || (tipo=="resizePoligono") && navn)
		{
			try
			{richdraw.renderer.resize(objeto,0,0,objposicaocursor.imgx,objposicaocursor.imgy);}
			catch(e){window.status=n+" erro ao movimentar a linha ";}
		}
		if((tipo=="resizeLinha") && navm)
		{
			try
			{
				//
				//no caso do ie, a linha tem de ser removida e desenhada novamente
				//
				var r = $i(richdraw.container.id);
				r.removeChild(r.lastChild);
				var dy = objposicaocursor.imgy;
				var dx = objposicaocursor.imgx - (objmapa.w/2);
				richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(objmapa.w/2)-1,pontosdistobj.yimg[n-1]-3,dx,dy-3);
			}
			catch(e){window.status=n+" erro ao movimentar a linha ";}			
		}
		if((tipo=="resizePoligono") && navm)
		{
			try
			{
				var r = $i(richdraw.container.id);
				r.removeChild(r.lastChild);
				r.removeChild(r.lastChild);
				var dy = objposicaocursor.imgy;
				var dx = objposicaocursor.imgx - (objmapa.w/2);
				richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(objmapa.w/2)-1,pontosdistobj.yimg[n-1]-3,dx,dy-3);
				richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[0])-(objmapa.w/2)-1,pontosdistobj.yimg[0]-3,dx,dy-3);
			}
			catch(e){window.status=n+" erro ao movimentar a linha ";}			
		}
		if(tipo=="insereCirculo")
		{
			if (navn)
			{
				var dx = Math.pow(((pontosdistobj.xtela[n])*1) - ((pontosdistobj.xtela[n-1])*1),2);
				var dy = Math.pow(((pontosdistobj.ytela[n])*1) - ((pontosdistobj.ytela[n-1])*1),2);
				var w = Math.sqrt(dx + dy);
				try
				{
					richdraw.renderer.create('circ', '', 'rgb(250,250,250)', richdraw.lineWidth, pontosdistobj.ximg[n-1],pontosdistobj.yimg[n-1],w,w);
				}
				catch(e){window.status=n+" erro ao desenhar o raio";}
			}
			else
			{
				var dx = Math.pow(((pontosdistobj.xtela[n])*1) - ((pontosdistobj.xtela[n-1])*1),2);
				var dy = Math.pow(((pontosdistobj.ytela[n])*1) - ((pontosdistobj.ytela[n-1])*1),2);
				var w = Math.sqrt(dx + dy);
				try
				{
					richdraw.renderer.create('circ', '', 'rgb(250,250,250)', richdraw.lineWidth, pontosdistobj.ximg[n-1]-w,pontosdistobj.yimg[n-1]-w,w*2,w*2);
				}
				catch(e){window.status=n+" erro ao desenhar o raio";}
			}
		}
	}
}
/*
Section: outros
*/
/*
Function: incluir

Inclui um arquivo shapefile no mapa atual como uma nova camada

Parameters:

path - caminho completo do shapefile
*/
function incluir(path)
{
	i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
	var temp = path.split(".");
	if ((temp[1] == "SHP") || (temp[1] == "shp"))
	{var f = "adicionaTemaSHP";}
	else
	{var f = "adicionaTemaIMG";}
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao="+f+"&arq="+path;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,f,ajaxredesenha);
}
/*
Function: inseremarcaf

Insere um ponto no mapa.

Os pontos s�o inseridos em um contaier de pontos e mostrados tempor�riamente como uma imagem.
Utilizado pela fun��o de medi��o de dist�ncias.

Parameters:

xi - coordenada x.

yi - coordenada y.

funcaoonclick - funcao que sera executada quando a marca for clicada
*/
function inseremarcaf(xi,yi,funcaoOnclick)
{
	try
	{
		//verifica se existe o container para os pontos
		if (!$i("pontosins") )
		{
			var novoel = document.createElement("div");
			novoel.id = "pontosins";
			var i = novoel.style;
			i.position = "absolute";
			i.top = parseInt($i("img").style.top);
			i.left = parseInt($i("img").style.left);
			document.body.appendChild(novoel);
		}
		var container = $i("pontosins");
		var novoel = document.createElement("div");
		var i = novoel.style;
		i.position = "absolute";
		i.zIndex=2000;
		i.top=(yi - 4)+"px";
		i.left=(xi - 4)+"px";
		i.width="4px";
		i.height="4px";
		var novoimg = document.createElement("img");
		if (arguments.length == 2)
		{funcaoOnclick = "";}
		if (funcaoOnclick != "")
		{novoimg.onclick = funcaoOnclick;}
		novoimg.src=i3GEO.configura.locaplic+"/imagens/dot1.gif";
		with (novoimg.style){width="6px";height="6px";zIndex=2000;}
		novoel.appendChild(novoimg);
		container.appendChild(novoel);
	}
	catch(e){alert("Ocorreu um erro. inseremarcaf"+e);}
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
Function: recuperamapa

Tenta recuperar o �ltimo mapa, caso tenha ocorrido algum erro.
*/
function recuperamapa()
{
	g_recupera = 1;
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=recuperamapa&g_sid="+i3GEO.configura.sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"recuperamapa",remapaf);
}
//testa se esse script foi carregado
function testafuncoes()
{}
