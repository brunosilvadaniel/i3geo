<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
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
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Class: i3GEOF.metar

Busca as esta��es meteorol�gicas da rede METAR na extens�o geogr�fica do mapa atual.
*/
i3GEOF.metar = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.metar.html();
			i3GEOF.metar.ativaFoco();
			if(i3GEO.Interface.ATUAL !== "googlemaps"){
				i3GEO.eventos.NAVEGAMAPA.push("i3GEOF.metar.lista()");
			}
			if(i3GEO.Interface.ATUAL === "googlemaps"){
   				metarDragend = GEvent.addListener(i3GeoMap, "dragend", function() {i3GEOF.metar.lista();});
   				metarZoomend = GEvent.addListener(i3GeoMap, "zoomend", function() {i3GEOF.metar.lista();});						
			}
			i3GEOF.metar.lista();
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '';
		ins += '<div id=i3GEOmetarLista style=display:block;background-color:white;text-align:left; ></div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		//funcao que sera executada ao ser clicado no cabe�alho da janela
		cabecalho = function(){
			i3GEOF.metar.ativaFoco();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.metar");
		};
		//cria a janela flutuante
		titulo = "Metar <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=8&idajuda=87' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"250px",
			"190px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.metar",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.metar.aguarde = $i("i3GEOF.metar_imagemCabecalho").style;
		i3GEOF.metar.inicia(divid);
		temp = function(){
			if(i3GEO.Interface.ATUAL !== "googlemaps"){
				i3GEO.eventos.NAVEGAMAPA.remove("i3GEOF.metar.lista()");
			}
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);		
	},
	/*
	Function: ativaFoco
	
	Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
	*/
	ativaFoco: function(){
		g_operacao = "navega";
		var i = $i("i3GEOF.metar_c").style;
		i3GEO.janela.ULTIMOZINDEX++;
		i.zIndex = 10000 + i3GEO.janela.ULTIMOZINDEX;
	},
	/*
	Function: lista
	
	Lista as esta��es
	*/
	lista: function(){
		$i("i3GEOmetarLista").innerHTML = "";
		if(i3GEOF.metar.aguarde.visibility === "visible")
		{return;}
		i3GEOF.metar.aguarde.visibility = "visible";
		var montaResultado = {
	  		success:function(o){
	  			var ins,dados,ndados,i,temp,temp1;
				i3GEOF.metar.aguarde.visibility = "hidden";
				dados = YAHOO.lang.JSON.parse(o.responseText)[0].weatherObservations;
				ndados = dados.length;
				ins = "<p class=paragrafo >Navegue no mapa para atualizar a lista de resultados (s�o mostradas apenas as 10 primeiras esta��es encontradas)</p>";
				ins += "<table class=lista4 >";
				for(i=0;i<ndados;i++){
					temp = "i3GEOF.metar.mostraxy("+dados[i].lng+","+dados[i].lat+")";
					temp1 = "i3GEO.navega.zoomponto(i3GEO.configura.locaplic,i3GEO.configura.sid,"+dados[i].lng+","+dados[i].lat+")";
					ins += 	"<tr><td style=background:yellow ><b>Esta��o</b></td><td style=background:yellow ><b>" + dados[i].stationName + "</b></td></tr>" +
							"<tr><td></td><td><a href='#' onclick='"+temp1+"' onmouseover='"+temp+"' onmouseout='i3GEO.util.escondeBox()' >long: " + dados[i].lng + ", lat: "+dados[i].lat+"</a></td></tr>" +
							"<tr><td>temperatura</td><td>" + dados[i].temperature + " C</td></tr>" +
							"<tr><td>condi��o</td><td>" + dados[i].weatherCondition + "</td></tr>" +
							"<tr><td>observa��o</td><td>" + dados[i].observation + "</td></tr>" +
							"<tr><td>nuvens</td><td>" + dados[i].clouds + "</td></tr>" +
							"<tr><td>dire��o do vento</td><td>" + dados[i].windDirection + "</td></tr>" +
							"<tr><td>ponto de orvalho</td><td>" + dados[i].dewPoint + " C</td></tr>" +
							"<tr><td>velocidade do vento</td><td>" + dados[i].windSpeed + " mph</td></tr>" +
							"<tr><td>humidade</td><td>" + dados[i].humidity + " %</td></tr>" +
							"<tr><td>data</td><td>" + dados[i].datetime + "</td></tr>" +
							"<tr><td>press�o</td><td>" + dados[i].hectoPascAltimeter +" hpa</td></tr>" +
							"<tr><td>ICAO</td><td>" + dados[i].ICAO + "</td></tr>";					
				}
				$i("i3GEOmetarLista").innerHTML = ins+"</table>";  				
	  		},
	  		failure: function(o){
	 			$i("i3GEOmetarLista").innerHTML = "Erro. A opera��o demorou muito.";
	 			i3GEOF.metar.aguarde.visibility = "hidden";
				return; 		  		
	  		},
	  		argument: { foo:"foo", bar:"bar" }
		}
		if(i3GEO.parametros.mapexten)
		{ext = i3GEO.parametros.mapexten;}
		else
		{ext = "-49.1774741355 -16.379556709 -47.2737662565 -14.9806872512";} //apenas para exemplo
		p = i3GEO.configura.locaplic+"/ferramentas/metar/metarextensao.php?ret="+ext;
		var request = YAHOO.util.Connect.asyncRequest("GET", p, montaResultado);		
	},
	mostraxy: function(x,y){
		i3GEO.util.criaBox("boxpin");
		xy = i3GEO.calculo.dd2tela(x*1,y*1,$i(i3GEO.Interface.IDCORPO),i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
		var box = $i("boxpin");
		box.style.display = "block";
		box.style.width = "5px";
		box.style.height = "5px";
		box.style.top = parseInt(xy[1],10)-5+"px";
		box.style.left = parseInt(xy[0],10)-5+"px";
		box.style.position = "absolute";
		box.style.border = "solid 2px red"
		box.style.zIndex = 5000
	}

};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>