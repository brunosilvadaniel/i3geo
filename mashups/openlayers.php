<?php
error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/html");
include_once("../ms_configura.php");
include_once("../classesphp/pega_variaveis.php");
include_once("../classesphp/carrega_ext.php");
error_reporting(E_ALL);
//
//imprime na tela a ajuda ao usu�rio
//
if(!isset($temas))
{ajuda();}
//problema na vers�o 211 do OpenLayers. Tamanho em % n�o � aceito
if(!isset($largura))
{$largura = 500;}
if(isset($largura) && !isset($altura))
{$altura = $largura;}
if(isset($altura) && !isset($largura))
{$largura = $altura;}
//
//define quais controles ser�o mostrados no mapa
//
$objControles = array();
if(isset($controles)){
	$controles = str_replace(" ",",",$controles);
	$controles = strtolower($controles);
	$controles = explode(",",$controles);
	if(in_array("navigation",$controles))
	{$objControles[] = "new OpenLayers.Control.Navigation()";}
	if(in_array("panzoombar",$controles))
	{$objControles[] = "new OpenLayers.Control.PanZoomBar()";}
	if(in_array("layerswitcher",$controles))
	{$objControles[] = "new OpenLayers.Control.LayerSwitcher({'ascending':false})";}
	if(in_array("scaleline",$controles))
	{$objControles[] = "new OpenLayers.Control.ScaleLine()";}
	if(in_array("mouseposition",$controles))
	{$objControles[] = "new OpenLayers.Control.MousePosition({'separator':' '})";}
	if(in_array("overviewmap",$controles))
	{$objControles[] = "new OpenLayers.Control.OverviewMap()";}
	if(in_array("keyboarddefaults",$controles))
	{$objControles[] = "new OpenLayers.Control.KeyboardDefaults()";}
}
//
//define quais botoes ser�o mostrados no mapa
//
$objBotoes = array();
if(isset($botoes)){
	$botoes = str_replace(" ",",",$botoes);
	$botoes = strtolower($botoes);
	$botoes = explode(",",$botoes);
	if(in_array("pan",$botoes))
	{$objBotoes[] = "'pan':true";}
	if(in_array("zoombox",$botoes))
	{$objBotoes[] = "'zoombox':true";}
	if(in_array("zoomtot",$botoes))
	{$objBotoes[] = "'zoomtot':true";}
	if(in_array("legenda",$botoes))
	{$objBotoes[] = "'legenda':true";}
	if(in_array("distancia",$botoes))
	{$objBotoes[] = "'distancia':true";}
	if(in_array("area",$botoes))
	{$objBotoes[] = "'area':true";}
	if(in_array("identifica",$botoes))
	{$objBotoes[] = "'identifica':true";}
	if(in_array("linha",$botoes))
	{$objBotoes[] = "'linha':true";}
	if(in_array("ponto",$botoes))
	{$objBotoes[] = "'ponto':true";}
	if(in_array("poligono",$botoes))
	{$objBotoes[] = "'poligono':true";}
	if(in_array("edita",$botoes))
	{$objBotoes[] = "'edita':true";}
	if(in_array("listag",$botoes))
	{$objBotoes[] = "'listag':true";}
	if(in_array("corta",$botoes))
	{$objBotoes[] = "'corta':true";}
	if(in_array("apaga",$botoes))
	{$objBotoes[] = "'apaga':true";}
	if(in_array("procura",$botoes))
	{$objBotoes[] = "'procura':true";}
	if(in_array("salva",$botoes))
	{$objBotoes[] = "'salva':true";}
	if(in_array("ajuda",$botoes))
	{$objBotoes[] = "'ajuda':true";}	
	if(in_array("fecha",$botoes))
	{$objBotoes[] = "'fecha':true";}
	if(in_array("tools",$botoes))
	{$objBotoes[] = "'tools':true";}
	if(in_array("undo",$botoes))
	{$objBotoes[] = "'undo':true";}
	if(in_array("propriedades",$botoes))
	{$objBotoes[] = "'propriedades':true";}
	if(in_array("frente",$botoes))
	{$objBotoes[] = "'frente':true";}
	if(in_array("texto",$botoes))
	{$objBotoes[] = "'texto':true";}
	$botoes = "{".implode(",",$objBotoes)."}";
}

//
//define a lista de layers do tipo baselayers
//$fundo � um array com a lista dos nomes poss�veis ou passados pela url
//cada um deve ser definido em openlayers.js.php
//
if(isset($fundo) && $fundo != ""){
	$fundo = str_replace(","," ",$fundo);
	$fundo = explode(" ",$fundo);
}
//
//define quais os layers que compor�o o mapa
//
if(isset($temas)){
	$layers = array();
	$objOpenLayers = array();
}
if($temas != "")
{
	$temas = str_replace(" ",",",$temas);
	$temas = strtolower($temas);
	$temas = explode(",",$temas);
	if(!isset($visiveis))
	{$visiveis = $temas;}
	else{
		$visiveis = str_replace(" ",",",$visiveis);
		$visiveis = strtolower($visiveis);
		$visiveis = explode(",",$visiveis);	
	}
	$layers = array();
	$objOpenLayers = array();
	if(isset($servidor) && $servidor != "../ogc.php"){
		$layers = $temas;
		foreach($temas as $tema){
			$objOpenLayers[] = 'new OpenLayers.Layer.WMS( "'.$tema.'", "'.$servidor.'?tema='.$tema.'&",{layers:"'.$tema.'",transparent: "true", format: "image/png"},{isBaseLayer:false})';
		}
	}
	else{
		foreach($temas as $tema){
			if(file_exists($locaplic."/temas/".$tema.".map")){
				$maptemp = @ms_newMapObj($locaplic."/temas/".$tema.".map");
				for($i=0;$i<($maptemp->numlayers);++$i)
				{
					$layern = $maptemp->getLayer($i);
					$layers[] = $layern->name;
				}
				$ebase = "false";
				if(isset($fundo) && in_array($tema,$fundo))
				{$ebase = "true";}
				$visivel = "false";
				if(in_array($tema,$visiveis))
				{$visivel = "true";}
				$objOpenLayers[] = 'new OpenLayers.Layer.WMS( "'.($layern->getmetadata("tema")).'", "../ogc.php?tema='.$tema.'&",{layers:"'.implode(",",$layers).'",transparent: "true", format: "image/png"},{visibility:'.$visivel.',isBaseLayer:'.$ebase.'})';
			}
			else
			{echo $tema." n�o foi encontrado.<br>";}
			$layers = array();
		}
	}
}
function ajuda(){
	echo "
<pre><b>
Mashup OpenLayers
Par�metros:
	kml - lista de endere�os (url) de um arquivos kml que ser�o adicionados ao mapa. Separado por ','
	servidor - por default � ../ogc.php o que for�a o uso do i3geo local. Esse � o programa que ser� utilizado em conjunto com a lista definida no par�metro 'temas'
	temas - lista com os temas (mapfiles) do i3Geo que ser�o inclu�dos no mapa
	visiveis - lista de temas (mesmos nomes do par�metro temas) que iniciar�o como vis�veis no mapa. Se n�o for definido, todos os temas ser�o vis�veis.
	numzoomlevels - n�mero de n�veis de zoom, default=6
	maxextent - extens�o geogr�fica m�xima do mapa (xmin,ymin,xmax,ymax)
	mapext - extens�o geogr�fica inicial do mapa (xmin,ymin,xmax,ymax)
	largura - lagura do mapa em pixels
	altura - altura do mapa em pixels
	pontos - lista de coordenadas x e y que ser�o inclu�das como marcas no mapa
	marca - nome do arquivo que cont�m a imagem que ser� utilizada para mostrar as coordenadas
	tiles (true|false) - indica se o modo tile ser� usado ou n�o (true por default). O modo tile pode tornar o mashup mais lento em algumas situa��es.
	incluilayergrafico (true|false) - indica se o layer que recebe elementos gr�ficos ser� adicionado ou n�o ao mapa
	ativalayerswicther (true|false) - inicia o mapa com a caixa de escolha das camadas (layerSwitcher) aberta ou n�o. Por default, inicia fechada
	ativarodadomouse (true|false) - ativa ou n�o o zoom com base na roda do mouse (default � true)
	
	fundo - lista com os nomes, separados por ',' dos layers que ser�o usados como fundo para o mapa. Se n�o for definido,
			ser� usado o default. O primeiro da lista ser� o fundo ativo. Se na lista de temas de fundo estiver algum
			tema incluido com o parametro 'temas', esses ser�o inclu�dos como temas de fundo.
			Os seguintes fundos podem usados nessa lista:
			
			e_oce - ESRI Ocean Basemap
			e_ims - ESRI Imagery World 2D
			e_wsm - ESRI World Street Map
			ol_mma - base cartogr�fica do Brasil
			ol_wms - base mundial da Meta Carta
			top_wms - topon�mia do servidor do MMA usado no mapa de refer�ncia
			est_wms - estados do Brasil
			
	controles - lista com os nomes dos controles que ser�o adicionados ao mapa. Se n�o for definido, todos os controles ser�o adicionados
		navigation
		panzoombar 
		layerswitcher 
		scaleline 
		mouseposition
		overviewmap 
		keyboarddefaults
	botoes - lista com os nomes dos botoes que ser�o adicionados ao mapa. Se n�o for definido, todos os bot�es ser�o adicionados
		pan
		zoombox
		zoomtot
		distancia
		area
		identifica
		ponto
		linha
		poligono
		texto
		edita
		listag (lista geometrias)
		apaga
		captura
		procura
		frente
		propriedades
		tools
		undo
		salva
		ajuda
		fecha
		corta

	Para ver a lista de c�digos de temas, que podem ser utilizados no par�metro 'temas', acesse: 
	<a href='../ogc.php?lista=temas' >lista de temas</a>. Os c�digos s�o mostrados em vermelho.

	Exemplo:

	&lt;iframe height='400px' src='http://mapas.mma.gov.br/i3geo/mashups/openlayers.php?temas=bioma&amp;altura=350&amp;largura=350' style='border: 0px solid white;' width='400px'&gt;&lt;/iframe&gt;

	";	
	exit;
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
<!--
<link rel="stylesheet" type="text/css" href="../pacotes/yui270/build/fonts/fonts-min.css" />
<link rel="stylesheet" type="text/css" href="../pacotes/yui270/build/container/assets/skins/sam/container.css" />
<script type="text/javascript" src="../pacotes/yui270/build/yahoo-dom-event/yahoo-dom-event.js"></script>
<script type="text/javascript" src="../pacotes/yui270/build/dragdrop/dragdrop-min.js"></script>
<script type="text/javascript" src="../pacotes/yui270/build/container/container-min.js"></script>
<script type="text/javascript" src="../classesjs/compactados/classe_calculo_compacto.js"></script>
<script type="text/javascript" src="../pacotes/openlayers/OpenLayers29.js"></script>
<script type="text/javascript" src="openlayers.js.php"></script>
-->

<script type="text/javascript" src="openlayers_compacto.js.php"></script>
<link rel="stylesheet" href="openlayers_compacto.css" type="text/css" />

<!--
<link rel="stylesheet" href="theme/default/style.css" type="text/css" />
<link rel="stylesheet" href="openlayers.css" type="text/css" />
-->
<style>
.yui-skin-sam .container-minimiza {
	background:transparent url(../pacotes/yui270/build/assets/skins/sam/sprite.png) no-repeat scroll 0 -450px;
	cursor:pointer;
	height:15px;
	position:absolute;
	right:30px;
	top:1px;
	width:25px;
	z-index:2001;
	opacity:.8;
	filter:alpha(opacity=80);
}
</style>
</head>
<body class=" yui-skin-sam">
<?php
if(isset($largura) && $largura != "")
{echo '<div id=i3geoMapa style="width:'.$largura.'px;height:'.$altura.'px;"></div>';}
else
{echo '<div id=i3geoMapa style="width:100%;height:100%"></div>';}

?>
<div id=i3geoSelTemaAtivo style="height:15em;z-index:3000" class=" yui-skin-sam"></div>
<script>
i3GEO.editorOL.layersIniciais = [<?php
	if(isset($objOpenLayers) && $objOpenLayers != "")
	{echo implode(",",$objOpenLayers);}
	else
	{echo "''";}
?>];
<?php if(isset($botoes)){
	echo "i3GEO.editorOL.botoes = $botoes ;";
}
?>
i3GEO.editorOL.pontos = [<?php
	if(isset($pontos)){
		$pontos = str_replace(" ",",",$pontos);
		echo $pontos;
	}
?>];
i3GEO.editorOL.kml = [<?php
	if(isset($kml)){
		$kml = str_replace(" ",",",$kml);
		$kml = explode(",",$kml);
		echo "'".implode("','",$kml)."'";
	}
?>];
i3GEO.editorOL.marca = "<?php
	if(isset($marca)){echo $marca;}
	else
	{echo "../pacotes/openlayers/img/marker-gold.png";}
?>";
i3GEO.editorOL.tiles = "<?php
	if(isset($tiles)){echo $tiles;}
	else
	{echo "true";}
?>";
i3GEO.editorOL.incluilayergrafico = "<?php
	if(isset($incluilayergrafico)){echo $incluilayergrafico;}
	else
	{echo "true";}
?>";
i3GEO.editorOL.ativalayerswitcher = "<?php
	if(isset($ativalayerswitcher)){echo $ativalayerswitcher;}
	else
	{echo "false";}
?>";
i3GEO.editorOL.ativarodadomouse = "<?php
	if(isset($ativarodadomouse)){echo $ativarodadomouse;}
	else
	{echo "true";}
?>";
<?php if(isset($fundo)){
	echo "i3GEO.editorOL.fundo = '".implode(",",$fundo)."';";
}
?>
<?php if(isset($controles)){
	echo "i3GEO.editorOL.controle = [".implode(",",$objControles)."];";
}
?>
<?php if(isset($numzoomlevels)){
	echo "i3GEO.editorOL.numzoom = ".$numzoomlevels.";";
}
?>
<?php
if(isset($maxextent)){
	$maxextent = str_replace(" ",",",$maxextent);
	echo "i3GEO.editorOL.maxext = new OpenLayers.Bounds(".$maxextent.");";
}
else
{echo "i3GEO.editorOL.maxext = new OpenLayers.Bounds(-76.5125927,-39.3925675209,-29.5851853,9.49014852081);";}
?>
<?php if(isset($mapext)){
	$mapext = str_replace(" ",",",$mapext);
	echo "i3GEO.editorOL.mapext = new OpenLayers.Bounds(".$mapext.");";
}
?>
i3GEO.editorOL.mapa = new OpenLayers.Map('i3geoMapa',{controls:[]})
i3GEO.editorOL.inicia();
</script>
</body>
</html>
<?php if(extension_loaded('zlib')){ob_end_flush();}?>