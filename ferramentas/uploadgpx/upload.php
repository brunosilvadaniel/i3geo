<?php
require_once(dirname(__FILE__)."/../../classesphp/pega_variaveis.php");
require_once(dirname(__FILE__)."/../../classesphp/funcoes_gerais.php");
include_once (dirname(__FILE__)."/../../classesphp/carrega_ext.php");
error_reporting(0);
session_name("i3GeoPHP");
if (isset($g_sid))
{session_id($g_sid);}
session_start();
//foreach(array_keys($_SESSION) as $k)
//{eval("\$".$k."='".$_SESSION[$k]."';");}
$map_file = $_SESSION["map_file"];
$postgis_mapa = $_SESSION["postgis_mapa"];
if (ob_get_level() == 0) ob_start();
?>
<html>
<head>
<link rel="stylesheet" type="text/css" href="../../css/input.css" />
<link rel="stylesheet" type="text/css" href="../../css/geral.css" />
<title></title>
</head>
<body bgcolor="white" style="background-color:white;text-align:left;">
<p>
<?php
if (isset($_FILES['i3GEOuploadgpx']['name']))
{
	//$ndir = dirname($filen);
	require_once (dirname(__FILE__)."/../../ms_configura.php");
	$mapa = ms_newMapObj($map_file);
	echo "<p class='paragrafo' >Carregando o arquivo...</p>";
	ob_flush();
	flush();
	sleep(1);
	$dirmap = dirname($map_file);
	//verifica nomes
	$ArquivoDest = $_FILES['i3GEOuploadgpx']['name'];
	$ArquivoDest = str_replace(".gpx","",$ArquivoDest).".gpx";
	verificaNome($ArquivoDest);

	//sobe arquivo
	$Arquivo = $_FILES['i3GEOuploadgpx']['tmp_name'];
	$status =  move_uploaded_file($Arquivo,$dirmap."/".$ArquivoDest);

	if($status != 1)
	{echo "<p class='paragrafo' >Ocorreu um erro no envio do arquivo gpx";paraAguarde();exit;}
	if($status == 1)
	{
		echo "<p class='paragrafo' >Arquivo enviado. Adicionando tema...</p>";
		ob_flush();
		flush();
		sleep(1);
		$tipos = array("waypoints","routes","tracks","route_points","track_points");
		foreach($tipos as $tipo){
			$novolayer = ms_newLayerObj($mapa);
			$novolayer->set("connection",$dirmap."/".$ArquivoDest);
			if(ms_GetVersionInt() > 50201)
			{$novolayer->setconnectiontype(MS_OGR);}
			else
			{$novolayer->set("connectiontype",MS_OGR);}
			$nome = str_replace(".","",$ArquivoDest);
			$novolayer->set("name",$nome.$tipo);
			$novolayer->setmetadata("TEMA",$ArquivoDest." ".$tipo);
			$novolayer->setmetadata("DOWNLOAD","SIM");
			$novolayer->setmetadata("CLASSE","SIM");
			$novolayer->setmetadata("TEXTO","NAO");
			if($tipo == "waypoints" || $tipo == "route_points" ||$tipo == "track_points")
			{$novolayer->set("type",MS_LAYER_POINT);}
			else
			{$novolayer->set("type",MS_LAYER_LINE);}
			$novolayer->set("data",$tipo);
			$novolayer->setmetadata("TEMALOCAL","SIM");
			$novolayer->setfilter("");
			$classe = ms_newClassObj($novolayer);
			$classe->set("name","");
			$estilo = ms_newStyleObj($classe);
			if($tipo == "waypoints" || $tipo == "route_points" ||$tipo == "track_points")
			{
				$estilo->set("symbolname","ponto");
				$estilo->set("size",6);
			}
			$estilo->color->setrgb(200,50,0);
			$estilo->outlinecolor->setrgb(0,0,0);
			// le os itens
			$novolayer->set("status",MS_DEFAULT);
			$novolayer->set("template","none.htm");
			if(isset($uploadgpxEPSG) && $uploadgpxEPSG != "")
			{$novolayer->setProjection("init=epsg:".$uploadgpxEPSG);}
			//$adiciona = ms_newLayerObj($mapa, $novolayer);
		}
		$salvo = $mapa->save($map_file);
		//grava os templates de cada tema
		echo "<b><p class='paragrafo' >Camadas criadas!!! Redesenhando o mapa.";
		echo "<script>window.scrollTo(0,10000);window.parent.i3GEO.atualiza()</script>";
	}
	else
	{
		echo "<p class='paragrafo' >Erro ao enviar o arquivo.</p>";
		paraAguarde();
		exit;
	}
}
else
{
	echo "<p class='paragrafo' >Erro ao enviar o arquivo. Talvez o tamanho do arquivo seja maior do que o permitido.</p>";
}
paraAguarde();
function paraAguarde(){
	echo "<script>window.scrollTo(0,10000);window.parent.i3GEOF.uploadgpx.aguarde.visibility='hidden';</script>";
}
function verificaNome($nome)
{
	$nome = strtolower($nome);
	$lista = explode(".",$nome);
	$extensao = $lista[count($lista) - 1];
	if($extensao != "gpx")
	{
		echo "Nome de arquivo inv&aacute;lido.";
		paraAguarde();
		exit;
	}
}
?>
</body>
</html>