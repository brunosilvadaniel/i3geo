/*
Class: i3GEO.navega

Realiza opera��es de navega��o do mapa, como zoom, pan, etc..

File: i3geo/classesjs/classe_navega.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
i3GEO.navega = {
	/*
	Property: FATORZOOM
	
	Valor utilizado nas opera��es de zoom in e out. Fator de zoom.
	
	O valor default � 2.
	
	Type:
	{Integer}
	*/
	FATORZOOM: 2,
	/*
	Function: zoomin
	
	Aproxima o mapa
	
	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomin: function(locaplic,sid){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=aproxima&nivel="+i3GEO.navega.FATORZOOM+"&g_sid="+sid;
		//g_operacao = "navega";
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"aproxima",ajaxredesenha);
	},
	/*
	Function: zoomout
	
	Afasta o mapa
	
	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomout: function(locaplic,sid){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=afasta&nivel="+i3GEO.navega.FATORZOOM+"&g_sid="+sid;
		//g_operacao = "navega";
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"afasta",ajaxredesenha);
	},
	/*
	Function: zoomponto
	
	Centraliza o mapa em um ponto e acrescenta o ponto como uma nova camada no mapa
	
	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	
	x {Numeric} - coordenada em d�cimos de grau da longitude
	
	y {Numeric} - coordenada em d�cimos de grau da latitude
	*/
	zoomponto: function(locaplic,sid,x,y){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&xy="+x+" "+y+"&g_sid="+sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"zoomPonto",ajaxredesenha);
	},
	/*
	Function: localizaIP
	
	Localiza as coordenadas baseadas no n�mero IP do usu�rio.
	
	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	
	funcao {Function} - fun��o que ser� executada ao concluir a chamada AJAX. Essa fun��o receber� o objeto JSON obtido.
	*/	
	localizaIP: function(locaplic,sid,funcao){
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=localizaIP&g_sid="+sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"IP",funcao);
	},
	/*
	Function: zoomIP
	
	Mostra no mapa um ponto baseado na localiza��o do usu�rio.

	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomIP: function(locaplic,sid){
		try
		{
			var mostraIP = function(retorno)
			{
				if (retorno.data.latitude != null)
				{
					i3GEO.navega.zoomponto(locaplic,sid,retorno.data.longitude,retorno.data.latitude);
				}
				else
				{alert("Nao foi possivel identificar a localizacao.");}
			};
			i3GEO.navega.localizaIP(locaplic,sid,mostraIP);
		}
		catch(e){var e = "";}
	},
	/*
	Function: zoomExt
	
	Aplica uma nova extens�o geogr�fica ao mapa.

	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	
	tipoimagem {String} - Utlize "" para aplicar o default. Tipo de imagem que ser� retornada na imagem do mapa que ser� criada

	ext {String} - Extens�o geogr�fica no formato xmin ymin xmax ymax
	*/
	zoomExt: function(locaplic,sid,tipoimagem,ext){
		if(tipoimagem == "")
		{var tipoimagem = "nenhum";}
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&tipoimagem="+tipoimagem+"&ext="+ext+"&g_sid="+sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"mudaExtensao",ajaxredesenha);
	},
	/*
	Function: aplicaEscala
	
	Aplica ao mapa um novo valor de escala tendo como base o valor do denminador

	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo
	
	escala {Numeric} - denominador da escala
	*/	
	aplicaEscala: function(locaplic,sid,escala){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=mudaescala&escala="+escala+"&g_sid="+sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"mudaEscala",ajaxredesenha);
	},
	/*
	Function: panFixo
	
	Desloca o mapa para uma determinada dire��o com uma dist�ncia fixa.
	
	Parameters:
	
	locaplic {String} - endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - c�digo da se��o aberta no servidor pelo i3geo

	direcao {String} - norte,sul,leste,oeste,sudeste,sudoeste,nordeste,noroeste
	
	w {Numeric} - largura da imagem do mapa em pixels
	
	h {Numeric} - altura da imagem do mapa em pixels
	
	escala {Numeric} - escala do mapa
	*/
	panFixo: function(locaplic,sid,direcao,w,h,escala){
		if (direcao == "norte"){
			var y = h / 6;
			var x = w / 2;
		}
		if (direcao == "sul"){
			var y = h - (h / 6);
			var x = w / 2;
		}
		if (direcao == "leste"){
			var x = w - (w / 6);
			var y = h / 2;
		}
		if (direcao == "oeste"){
			var x = w / 6;
			var y = h / 2;
		}
		if (direcao == "nordeste"){
			var y = h / 6;
			var x = w - (w / 6);
		}
		if (direcao == "sudeste"){
			var y = h - (h / 6);
			var x = w - (w / 6);
		}
		if (direcao == "noroeste"){
			var y = h / 6;
			var x = w / 6;
		}
		if (direcao == "sudoeste"){
			var y = h - (h / 6);
			var x = w / 6;
		}
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+escala+"&x="+x+"&y="+y+"&g_sid="+sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"pan",ajaxredesenha);
	}
};
