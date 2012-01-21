<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no;">
<meta name="HandheldFriendly" content="yes" />
<meta name="MobileOptimized" content="width" />
<meta name="apple-mobile-web-app-capable" content="yes">
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="../../pacotes/cpaint/cpaint2_compacto.inc.js"></script>
<script type="text/javascript" src="../../pacotes/yui290/build/yahoo/yahoo-min.js"></script>
<script type="text/javascript" src="../../pacotes/yui290/build/dom/dom-min.js"></script>
</head>
<body onload="inicia()">
<div id=googlemapsdiv style="width:500px;height:500px;"></div>
<script>

/*
Title: Interface GoogleMaps para a ferramenta tela remota

Clone de um mapa aberto no i3Geo.

O clone monitora as mudan�as no mapa original e aplica a extens�o geogr�fica e recarrega o mapfile utilizado no original.

A abertura de um clone s� � poss�vel tendo-se o c�digo de abertura, gerado pela ferramenta Tela Remota do i3Geo

Veja:

<i3GEO.tema.dialogo.telaremota>

Arquivo:

i3geo/ferramentas/telaremota/googlemaps1.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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
*/

/*
Title: Tela remota - Google Maps

Interface baseada na API Google Maps utilizada na apresenta��o remota do mapa em uso.

Parametros:

g_sid {string} - c�digo da "section" PHP aberta na cria��o do mapa em uso

telaR {string} - c�digo especial que autoriza o uso do mapa atual em um navegador diferente daquele utilizado na cria��o do mapa em uso

Veja:

<i3GEO.tema.dialogo.telaremota>

Arquivo:

i3geo/ferramentas/telaremota/index.js.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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
*/

function inicia(){
	var mapa = document.getElementById("googlemapsdiv");
	mapa.style.width = YAHOO.util.Dom.getViewportWidth() - 30 + "px";
	mapa.style.height = YAHOO.util.Dom.getViewportHeight() - 30 + "px";
	extentAnterior = "";
	contadorSalva = 0;
	$i = function(id){return document.getElementById(id);};
	navn = false;
	//seta as vari�veis navn e navm
	navn = false;
	navm = false;
	var app = navigator.appName.substring(0,1);
	if (app==='N'){navn=true;}else{navm=true;}
	
	mapaRemoto = new google.maps.Map($i("googlemapsdiv"),{scaleControl:true});
	mapaRemoto.setMapTypeId("terrain");
	
	i3GeoMapOverlay = new google.maps.OverlayView();
	i3GeoMapOverlay.draw = function() {};
	criaLayer();
	i3GeoMapOverlay.setMap(mapaRemoto);
	recuperaMapa();
}
function criaLayer(){
	i3GEOTileO = new google.maps.ImageMapType({
		getTileUrl: function(coord, zoom) {
			var url = "../../classesphp/mapa_googlemaps.php?DESLIGACACHE=sim&g_sid=<?php echo $_GET["g_sid"];?>" +
				"&Z="+ zoom + "&X=" + coord.x + "&Y=" + coord.y + "&layer=&telaR=<?php echo $_GET["telaR"];?>&r="+Math.random();
			return url;
		},
		tileSize: new google.maps.Size(256, 256),
		isPng: true,
		name: "Remoto"
	});	
	mapaRemoto.overlayMapTypes.insertAt(0, i3GEOTileO);
}
function zoom2ext(ext){
	var ret = ext.split(" ");
	sw = new google.maps.LatLng(ret[1],ret[0]);
	ne = new google.maps.LatLng(ret[3],ret[2]);
	mapaRemoto.fitBounds(new google.maps.LatLngBounds(sw,ne));	
}
function atualizaMapa(){
	mapaRemoto.overlayMapTypes.removeAt(0);
	criaLayer();
}
function recuperaMapa(){
	var temp = function(retorno){
		if(!retorno.data){
			setTimeout('recuperaMapa()',<?php echo $_GET["tempo"];?>);
			return;
		}
		retorno = retorno.data;
		if(extentAnterior != retorno.extent){
			zoom2ext(retorno.extent);
			extentAnterior = retorno.extent;
			contadorSalva = retorno.contadorsalva;
		}
		else{
			if(contadorSalva != retorno.contadorsalva){
				atualizaMapa()
				contadorSalva = retorno.contadorsalva;
			}
		}
		setTimeout('recuperaMapa()',<?php echo $_GET["tempo"];?>);
	};
	p = "recuperamapa.php?g_sid=<?php echo $_GET["g_sid"];?>&funcao=recupera";
	cp = new cpaint();
	cp.set_response_type("JSON");
	cp.call(p,"telaremota",temp);
}
</script>
</body>
</html>