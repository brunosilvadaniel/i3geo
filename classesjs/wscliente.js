/*
Title: Cliente de web services

Classe javascript da aplica��o de consulta de web services.

L� o conjunto de javascripts para o funcionamento da interface wscliente.htm

Arquivo:

i3geo/classesjs/wscliente.js

Licenca:

GPL2

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Veja:

<i3geo/wscliente.htm>

<i3geo/classesjs/wscliente.js>
*/
var scriptLocation = "";
var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
	var src = scripts[i].getAttribute('src');
	if (src) {
		var index = src.lastIndexOf("wscliente.js");
		// is it found, at the end of the URL?
		if ((index > -1) && (index + "wscliente.js".length == src.length)) {
			scriptLocation = src.slice(0, -"wscliente.js".length);
			break;
		}
	}
}
var allScriptTags = "";
var jsfiles = []
if(typeof(testafuncoes) == 'undefined')
{jsfiles[0] = "compactados/classe_calculo_compacto.js"}
if(typeof(cpaint) == 'undefined')
{jsfiles[1] = "../pacotes/cpaint/cpaint2.inc.compressed.js"}
if(typeof(OpenLayers) == 'undefined')
{jsfiles[2] = "../pacotes/openlayers/OpenLayers.js"}
for (var i = 0; i < jsfiles.length; i++)
{
	var currentScriptTag = "<script src='" + scriptLocation + jsfiles[i] + "'></script>";
	allScriptTags += currentScriptTag;
}
document.write(allScriptTags);
/**
Classe: i3geo_wscliente_configura

Cria o objeto javascript com os par�metros de configura��o da api e com as fun��es de manipula��o dos elementos da interface.

Example:

var i3geo_wscliente_configura = new i3geo_wscliente_configura
(
	g_locaplic,
	"corpo",
	"enderecows",
	"enderecowms",
	new Array("http://mapas.mma.gov.br/i3geo/menutemas/servicosws.xml"),
	new Array("http://mapas.mma.gov.br/i3geo/menutemas/servicoswms.php")
)

Parametros:

loc_i3geo - endere�o web onde est� instalado o i3geo.

corpo - id do div principal onde as mensagens ser�o mostradas no navegador

enderecows - id do elemento html do tipo input que receber� o valor da sele��o feita pelo usu�rio ao clicar em um endere�o ws 

enderecowms - id do elemento html do tipo input que receber� o valor da sele��o feita pelo usu�rio ao clicar em um endere�o wms 

rssws - array com a lista de endere�os dos servi�os RSS com a lista de webservices convencionais

rsswms - array com a lista de endere�os dos servi�os RSS com a lista de webservices OGC-WMS
*/
function i3geo_wscliente_configura(loc_i3geo,corpo,enderecows,enderecowms,rssws,rsswms)
{
	/*
	Guarda o valor do par�metro loc_i3geo
	*/
	this.loc_i3geo = loc_i3geo;
	/*
	Guarda o valor do par�metro corpo
	*/
	this.corpo = corpo;
	if(!$i("corpo")){alert("id "+corpo+" nao existe");}
	/*
	Guarda o valor do par�metro enderecows
	*/
	this.enderecows = enderecows;
	/*
	Guarda o valor do par�metro enderecowms
	*/
	this.enderecowms = enderecowms;
	/*
	Guarda o valor do par�metro rssws
	*/
	this.rssws = rssws;
	/*
	Guarda o valor do par�metro rsswms
	*/
	this.rsswms = rsswms;
	/* 
	Tipo de servi�o wms ativo
	*/
	this.tipo = ""
	/* 
	C�digo do tema wms escolhido
	*/
	this.tema = ""
	/* 
	Nome do tema wms escolhido
	*/
	this.nometema = ""
	/* 
	Fun��o do ws escolhida.
	*/
	this.funcao = ""
	/*
	Function: inicia

	Monta a �rvore de op��es preenchendo a div definida em this.corpo
	*/
	this.inicia = function()
	{
		var ins = ""
		var i = "&nbsp;&nbsp;<img style=position:relative;top:3px; src='"+this.loc_i3geo+"/imagens/new.gif' >"
		var ii = "onmouseover='javascript:this.style.textDecoration=\"underline\"' onmouseout='javascript:this.style.textDecoration=\"none\"'"
		ins += "<b>&nbsp;Ajuda</b><br>";
		ins += i+"<span "+ii+" class=clique onclick='$i3geo_wscliente.ativa(\"oquews\")'>Web Services</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.ativa(\"oqueogc\")'>Padr�es OGC</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.ativa(\"oquecarto\")'>WS cartogr�fico</span><br><br>";
		ins += "</table>"
		ins += "<b>&nbsp;Mapas</b><br>"
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.servicoswms()'>Escolher servi�o</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.listatemas()'>Escolher um tema</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.getcapabilities(\"WMS\")'>Resposta XML (WMS)</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.getcapabilities(\"WFS\")'>Resposta XML (WFS)</span><br>";
/*
		ins += "<b>&nbsp;Dados</b><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.servicosws()'>Escolher servi�o</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.listafuncoes()'>Escolher fun&ccedil;&atilde;o</span><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.wsdl()'>WSDL</span><br><br>";

		ins += "<b>&nbsp;RSS</b><br>";
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.listaLinkServicos(\"ws\")'>Dados</span><br>";
*/
		ins += i+"<span "+ii+"  class=clique onclick='$i3geo_wscliente.listaLinkServicos(\"wms\")'>RSS</span><br>";
		$i("arvoreMenu").innerHTML = ins;
		/*
			pega parametros pela url
			servico,tema
		*/
		parametros = "";
		parServico = "";
		parTema = "";
		parTipo = "";
		parametros = window.location.href.split("?");
		if (parametros.length > 1)
		{
			valores = parametros[1].split(",");
			if (valores.length == 2)
			{
				if (valores[0] == "wms")
				{
					$i(this.enderecowms).value = valores[1]
					this.listatemas()
				}
			}
		}
	}
	/*
	Function: ativa

	Ativa uma op��o escolhida pelo usu�rio, mostrando o seu respectivo texto no navegador. � utilizado nas op��es que apresentam textos explicativos. 

	O conte�do do div (id) � lido e inclu�do na div corpo

	Por padr�o, os conte�dos devem ser inclu�dos em DIVS com os seguintes ids- oquews oqueogc oquecarto

	Par�metros:

	id - id do div com o conte�do que ser� ativado
	*/
	this.ativa = function (id)
	{
		var novo = document.getElementById(id)
		$i(this.corpo).innerHTML = novo.innerHTML
	}
	/*
	Function: listaLinkServicos

	Mostra links que permitem ao usu�rio abrir os RSSs cadastrados para determinado servi�o.

	Parametros:

	tipo - ws|wms

	*/
	this.listaLinkServicos = function(tipo)
	{
		if (tipo == ("ws"))
		{var lista = this.rssws}
		else
		{var lista = this.rsswms}
		for (i=0;i<lista.length; i++)
		{
			var ins = "<p class=clique onclick=\"window.open('"+lista[i]+"')\" ><img src="+this.loc_i3geo+"/imagens/xml.gif >&nbsp;"+lista[i]+"</p>"
		}
		$i(this.corpo).innerHTML = ins
	}
	/*
	Function: servicosws

	Lista os web services existentes nos arquivos definidos na vari�vel rssws.

	� feita a leitura dos arquivos RSS e montada uma lista clic�vel com os servi�os encontrados.
	*/
	this.servicosws = function()
	{
		//monta a lista retornada pela fun��o ajax
		var monta = function(retorno)
		{
			var linhas = retorno.data.split("|")
			var ins = ""
			if(linhas.length == 1)
			{var ins = "<br><span style=color:red >"+retorno.data+"</span>"}
			else
			{
				for (i=0;i<linhas.length; i++)
				{
					var caso = linhas[i].split("#")
					var clique = "javascript:document.getElementById(\""+$i3geo_wscliente.enderecows+"\").value='"+caso[2]+"';document.getElementById('"+$i3geo_wscliente.enderecows+"').value='"+caso[2]+"'"
					ins += "<p class=clique onclick="+clique+" ><b>"+caso[0]+"</b><span style=color:gray ><br>&nbsp;"+caso[1]+"<br>&nbsp;("+caso[3]+")</span>"
					if (caso[4])
					{ins += " <span style=color:gray >(disponibilidade: "+parseInt(caso[4])+"%, dias considerados: "+caso[5]+")</span></p>";}
					else {ins += "</p>"}
				}
			}
			$i("resultadoRSSws").innerHTML = ins
			$i($i3geo_wscliente.corpo).style.display="none"
			$i("RSSwms").style.display="none"
			$i("RSSws").style.display="block"
			aguardeTotal("none");
		}
		if (this.rssws.length > 0)
		{
			aguardeTotal("block");
			var p = this.loc_i3geo+"/classesphp/wscliente.php?funcao=listaRSSwsARRAY&rss="+this.rssws.join("|")+"&g_sid=";
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"listaRSSwsARRAY",monta);
		}
	}
	/*
	Function: servicoswms

	Lista os web services existentes no arquivo definido na vari�vel rsswms.

	A vari�vel rsswms deve ser definida no arquivo html que inicia o wscliente.

	*/
	this.servicoswms = function()
	{
		var mostraRetornowmsRSS = function(retorno)
		{
			var reg = /Erro/gi;
			try{
				if (retorno.data.rss.search(reg) != -1)
				{
					alert("OOps! Ocorreu um erro\n"+retorno.data);
					aguardeTotal("none");
					return;
				}
			}
			catch(e){alert(e);}

			var canais = retorno.data.canais
			var ncanais = canais.length
			var ins = "<br>"+retorno.data.rss
			/*
				for (i=0;i<linhas.length; i++)
				{
					var caso = linhas[i].split("#")
					if (i > 0)
					{
						var clique = "javascript:document.getElementById(\""+$i3geo_wscliente.enderecowms+"\").value='"+caso[2]+"';document.getElementById('"+$i3geo_wscliente.enderecowms+"').value='"+caso[2]+"'"
						ins += "<p class=clique onclick="+clique+" ><b>"+caso[0]+"</b>&nbsp;"+caso[1]+"&nbsp;("+caso[3]+")"
						if (caso[4])
						{ins += " <span style=color:gray >(disponibilidade: "+parseInt(caso[4])+"%, dias considerados: "+caso[5]+")</span></p>";}
						else {ins += "</p>"}
					}
					else
					{{ins += ""}}
				}
			*/
			for (i=0;i<ncanais; i++){
				var caso = canais[i]
				var clique = "javascript:document.getElementById(\""+$i3geo_wscliente.enderecowms+"\").value='"+caso.link+"';document.getElementById('"+$i3geo_wscliente.enderecowms+"').value='"+caso.link+"'"
				ins += "<p class=clique onclick="+clique+" ><b>"+caso.title+"</b>"

				//ins += "\<p class=clique onclick=\"registraws('"+caso.link+"','"+caso.id_ws+"')\" \>\<b\>"+caso.title+"\<\/b\>&nbsp;"+caso.description+"&nbsp;("+caso.author+")"
				if(caso.nacessos > 0)
				{
					var pc = (parseInt(caso.nacessosok) * 100) / parseInt(caso.nacessos)
					ins += " \<span style=color:gray \>(disponibilidade: "+pc+"%, acessos considerados: "+caso.nacessos+")\<\/span>\<\/p\>";
				}
			}

			$i("resultadoRSSwms").innerHTML = ins+"<br.<br>";
			$i($i3geo_wscliente.corpo).style.display="none"
			$i("RSSws").style.display="none"
			$i("RSSwms").style.display="block"

			aguardeTotal("none");
		}
		if ($i("RSSwms"))
		{
			aguardeTotal("block");
			var p = this.loc_i3geo+"/classesphp/wscliente.php?tipo=WMS&funcao=listaRSSwsARRAY&rss=&g_sid=";
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"listaRSSwsARRAY",mostraRetornowmsRSS);
		}
	}
	/*
	Function: getcapabilities

	Executa ajax para buscar resultado do getcapabilities.

	Par�metros:

	tipo - tipo de chamada WMS|WFS

	*/
	this.getcapabilities = function(tipo)
	{
		$i("RSSws").style.display="none"
		$i("RSSwms").style.display="none"
		$i($i3geo_wscliente.corpo).style.display="block"
		var monta = function (retorno)
		{
			aguardeTotal("none");
			$i($i3geo_wscliente.corpo).innerHTML = "<div class=listaAjuda ><p>"+retorno.data+"</div>"
		}
		if ($i(this.enderecowms).value != "")
		{
			aguardeTotal("block");
			var p = this.loc_i3geo+"/classesphp/wscliente.php?funcao=getcapabilities&onlineresource="+$i(this.enderecowms).value+"&tipo="+tipo+"&g_sid=";
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"getcapabilities",monta);
		}
		else
		$i(this.corpo).innerHTML = "<p>Nenhum servi�o foi escolhido.</p>"
	}
	/*
	Function: listatemas

	Busca a lista de temas de um WMS ou WFS
	*/
	this.listatemas = function()
	{
		var WCservico = $i(this.enderecowms).value
		var WCmostraTemas = function(retorno)
		{
			aguardeTotal("none");
			document.cookie = 'i3GeoPHP=; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=/';
			var ins = "<div style='text-align:left'><p>Selecione a camada que ser&aacute; adicionada ao mapa e depois clique em Aplicar.<br></div>"
			ins += '<p><div onclick="$i3geo_wscliente.verMapa()" ><input id=botao3 type="button" class=executar value="Aplicar&nbsp;&nbsp;"  /></div>'
			ins += '<br><div style="text-align:left;height:260px;overflow:auto;width:555px;" >'
			$i($i3geo_wscliente.corpo).innerHTML = ins+"<p>"+retorno.data+"</div>"
			YAHOO.example.init = function ()
			{
				function onPushButtonsMarkupReady()
				{new YAHOO.widget.Button("botao3");}
				YAHOO.util.Event.onContentReady("botao3", onPushButtonsMarkupReady);
			}()
		}
		$i("RSSws").style.display="none"
		$i("RSSwms").style.display="none"
		$i(this.corpo).style.display="block"
		if(WCservico == "")
		{$i(this.corpo).innerHTML = "<p>Nenhum servi�o foi escolhido.</p>"}
		aguardeTotal("block");
		var p = this.loc_i3geo+"/classesphp/mapa_controle.php?map_file=''&funcao=temaswms&servico="+WCservico+"&g_sid="
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"temaswms",WCmostraTemas);
	}
	/*
	Function: verMapa

	Mostra o mapa

	*/
	this.verMapa = function()
	{
		var WCservico = $i(this.enderecowms).value
		var epsg = $i("proj").value.split(",")
		var epsg = epsg[0]
		var epsg = epsg.split(":")
		var epsg = epsg[1]
		$i(this.corpo).innerHTML = "<div style=text-align:left id=i3geo_wscliente_id_mapa ></div><div style=width:550px;text-align:left id=localizarxy ></div><div style=text-align:left ><iframe width=400 id=desc ></iframe></div>"
		var map = new OpenLayers.Map('i3geo_wscliente_id_mapa');
		var bounds = new OpenLayers.Bounds(-73,5,-27,-34);
		if (this.tipo != "estilo")
		{var wms = new OpenLayers.Layer.WMS( "OpenLayers WMS",WCservico, {layers: this.tema, srs: epsg} );}
		else
		{
			var wms = new OpenLayers.Layer.WMS( "OpenLayers WMS",WCservico, {layers: this.tema, styles: this.nometema, srs: epsg});
		}
		map.addLayer(wms);
		map.zoomToExtent(bounds);
		map.events.register("mousemove", map, function(e)
		{
			//pega as coordenadas do cursor
			if(e.xy)
			{var p = e.xy;}
			else
			{var p = new OpenLayers.Pixel(e.x,e.y);}
			//altera o indicador de localizacao
			var lonlat = map.getLonLatFromViewPortPx(p);
			var d = i3GEO.calculo.dd2dms(lonlat.lon,lonlat.lat);
			$i("localizarxy").innerHTML = d[0]+" , "+d[1]
		})
		map.events.register("click", map, function(e)
		{
			//pega as coordenadas do cursor
			if(e.xy)
			{var p = e.xy;}
			else
			{var p = new OpenLayers.Pixel(e.x,e.y);}
			//altera o indicador de localizacao
			var lonlat = map.getLonLatFromViewPortPx(p);
			var url = wms.getFullRequestString()
			url = url.replace("GetMap","getfeatureinfo")
			url += "&QUERY_LAYERS="+$i3geo_wscliente.tema
			var bb = map.getExtent()
			url += "&BBOX="+bb.toBBOX()
			//var xy = p.split(",")
			url += "&x="+p.x
			url += "&y="+p.y
			var size = map.getSize()
			url += "&WIDTH="+size.w
			url += "&HEIGHT="+size.h
			$i("desc").src = url
		})
	}
	/*
	Function: listafuncoes

	Busca a lista de fun��es de um WS

	*/
	this.listafuncoes = function()
	{
		var WCmostraFuncoes = function(retorno)
		{
			aguardeTotal("none");
			var ins = "<p>Selecione a fun&ccedil;&atilde;o que ser&aacute; acionada depois clique em Aplicar.<br></div>"
			ins += '<p><div onclick="$i3geo_wscliente.selParFuncao()" ><input id=botao4 type="buttom" class=executar value="Aplicar&nbsp;&nbsp;" /></div>'
			ins += '<br><div style="text-align:left;height:260px;overflow:auto;width:555px;" >'
			if(!retorno.data)
			{$i($i3geo_wscliente.corpo).innerHTML="<br><span style=color:red ><b>Erro ao acessar o servi&ccedil;o!</span>";return;}
			var funcs = retorno.data.split("|");
			for (i=0;i<funcs.length; i++)
			{
				var f = funcs[i].split("#")
				ins += "<br><b><input style='cursor:pointer' type=radio name='funcao' onclick=\"$i3geo_wscliente.selParFuncao('"+f[0]+"')\" />&nbsp;"+f[0]+"</b>&nbsp;"+f[3]+"<br>"
				ins += "<i>Entrada:</i>"+f[1]
				ins += "<br><i>Sa&iacute;da:</i>"+f[2]+"<br>"
			}
			$i($i3geo_wscliente.corpo).innerHTML = ins+"</div>"
			YAHOO.example.init = function ()
			{
				function onPushButtonsMarkupReady()
				{new YAHOO.widget.Button("botao4");}
				YAHOO.util.Event.onContentReady("botao4", onPushButtonsMarkupReady);
			}()
			$i("RSSws").style.display="none"
			$i("RSSwms").style.display="none"
			$i($i3geo_wscliente.corpo).style.display="block"
		}
		var WCservico = $i(this.enderecows).value
		if (WCservico != "")
		{
			aguardeTotal("block");
			var p = this.loc_i3geo+"/classesphp/wscliente.php?funcao=funcoesws&servico="+WCservico+"&g_sid="
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"funcoesws",WCmostraFuncoes);
		}
		else
		$i(this.corpo).innerHTML = "<p>Nenhum servi�o foi escolhido.</p>"
	}
	/*
	Function: selParFuncao

	Lista os par�metros de uma fun��o para o usu�rio digitar os valores.

	Par�metros:

	funcao - fun��o que ser� chamada

	*/
	this.selParFuncao = function(funcao)
	{
		var WCmostraParFuncoes = function (retorno)
		{
			aguardeTotal("none");
			if (retorno.data == ""){$i3geo_wscliente.chamadados(retorno.data)}
			else
			{
				var pars = retorno.data.split("|")
				var ins = "<p>Digite os valores dos par&acirc;metros e depois em clique em 'Aplicar'.<br>"
				ins += '<p><input type="button" class=executar value="Aplicar&nbsp;&nbsp;" onclick=$i3geo_wscliente.chamadados(\"'+retorno.data+'\") />'
				ins += '<br><div style="text-align:left;height:260px;overflow:auto;width:555px;" >'
				for (i=0;i<pars.length; i++)
				{
					var temp = pars[i].split("#")
					ins+= "<br>"+temp[0]+"&nbsp("+temp[1]+")<input type=text size=20 value='' id=xxx"+temp[0]+" /><br>"
				}
				$i($i3geo_wscliente.corpo).innerHTML = ins+"</div>"
			}
			$i("RSSws").style.display="none"
			$i("RSSwms").style.display="none"
			$i($i3geo_wscliente.corpo).style.display="block"
		}
		aguardeTotal("block");
		this.funcao = funcao;
		var p = this.loc_i3geo+"/classesphp/wscliente.php?funcao=parfuncoesws&servico="+$i(this.enderecows).value+"&funcaows="+funcao+"&g_sid="
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"parFuncoesws",WCmostraParFuncoes);
	}
	/*
	Function: chamadados

	Busca os dados de uma fun��o de um servi�o

	*/
	this.chamadados = function(retorno)
	{
		var monta = function (retorno)
		{
			aguardeTotal("none");
			$i($i3geo_wscliente.corpo).innerHTML = "<div style='text-align:left;height:320px;overflow:auto;width:555px;' >"+retorno.data+ "</div>"
			$i("RSSws").style.display="none"
			$i("RSSwms").style.display="none"
			$i($i3geo_wscliente.corpo).style.display="block"
		}
		aguardeTotal("block");
		var par = []
		if (retorno != "")
		{
			var pars = retorno.split("|")
			for (i=0;i<pars.length; i++)
			{
				var temp = pars[i].split("#")
				par.push(temp[0]+"*"+$i("xxx"+temp[0]).value)
			}
		}
		var p = this.loc_i3geo+"/classesphp/wscliente.php?funcao=dadosws&servico="+$i(this.enderecows).value+"&funcaows="+this.funcao+"&param="+par.join("|")+"&g_sid="
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"dadosWS",monta);
	}
	/*
	Function: wsdl

	Abre o servico WSDL em uma nova janela

	*/
	this.wsdl = function()
	{window.open($i(this.enderecows).value)}
}

/*
Function: i3geo_wscliente_inicia

Inicia a interface do cliente de web services.

Parametros:

objeto_i3geo_wscliente_configura - objeto com os par�mentros de configura��o criado pela fun��o i3geo_gl_configura
*/
function i3geo_wscliente_inicia(objeto_i3geo_wscliente_configura)
{
	/*
	Propriedade: $i3geo_wscliente

	Cont�m o objeto $i3geo_wscliente com todas as propriedades e fun��es de controle da interface
	*/
	$i3geo_wscliente = objeto_i3geo_wscliente_configura;
	$i3geo_wscliente.inicia();
	YAHOO.example.init = function ()
	{
		function onPushButtonsMarkupReady()
		{new YAHOO.widget.Button("botao1");new YAHOO.widget.Button("botao2");}
   		YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
	}();
}

/*
Function: seltema

Seta as vari�veis necess�rias para visualizar o mapa com o OpenLayers ap�s o usu�rio escolher uma camada de um servi�o.

Essa fun��o � chamada por padr�o quando uma camada � escolhida na lista de camadas retornada pelo i3geo.

Parametros:

tipo - tipo de tema
tema - nome do tema
legenda - endere�o da legenda
nometema - nome completo do tema

*/
function seltema(tipo,tema,legenda,nometema)
{
	$i3geo_wscliente.tipo = tipo; //tipo de tema
	$i3geo_wscliente.tema = tema; //tema selecionado do ws
	$i3geo_wscliente.nometema = nometema; //nome do tema
}