<?php
/*
Title: mapa_googlemaps.php

Faz o processamento de um mapfile segundo as necessidades do i3geo, como por exemplo, fazendo a substitui��o
das vari�veis de conex�o com banco e outras opera��es espec�ficas do i3Geo.

� utilizado especificamente nas interfaces que utilizam a biblioteca Googlemaps.

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

Arquivo:

i3geo/classesphp/mapa_googlemaps.php

*/
//error_reporting(E_ALL);
if (!function_exists('ms_GetVersion'))
{
	$s = PHP_SHLIB_SUFFIX;
	@dl( 'php_mapscript.'.$s );
	$ler_extensoes[] = 'php_mapscript';	
}
include_once("../ms_configura.php");
//
//converte a requisi��o do tile em coordenadas geo
//http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#tile_numbers_to_lon.2Flat_2
//


$x = $_GET["X"];
$y = $_GET["Y"];
$n = pow(2, $_GET["Z"]);
$lon1 = $x / $n * 360.0 - 180.0;
$lat2 = rad2deg(atan(sinh(pi() * (1 - 2 * $y / $n))));
$x++;
$y++;
$lon2 = $x / $n * 360.0 - 180.0;
$lat1 = rad2deg(atan(sinh(pi() * (1 - 2 * $y / $n))));

$projInObj = ms_newprojectionobj("proj=latlong");
$projOutObj = ms_newprojectionobj("proj=merc,a=6378137,b=6378137,lat_ts=0.0,lon_0=0.0,x_0=0.0,y_0=0,k=1.0,units=m");
$poPoint1 = ms_newpointobj();
$poPoint1->setXY($lon1, $lat1);
$poPoint1->project($projInObj, $projOutObj);
$poPoint2 = ms_newpointobj();
$poPoint2->setXY($lon2, $lat2);
$poPoint2->project($projInObj, $projOutObj);

$_GET["BBOX"] = $poPoint1->x." ".$poPoint1->y." ".$poPoint2->x." ".$poPoint2->y;

//echo $_GET["BBOX"];
$_GET["mapext"] = str_replace(","," ",$_GET["BBOX"]);
$_GET["map_size"] = "256 256";
$_GET["WIDTH"] = "256";
$_GET["HEIGHT"] = "256";

$mapa = ms_newMapObj($_GET["map"]);
/*
$qyfile = str_replace(".map",".qy",$_GET["map"]);
$qy = file_exists($qyfile);
if($qy)
{$mapa->loadquery($qyfile);}
*/
//
//resolve o problema da sele��o na vers�o nova do mapserver
//
$qyfile = dirname($_GET["map"])."/".$_GET["layer"].".php";
$qy = file_exists($qyfile);
if($qy)
{
	$l = $mapa->getLayerByname($_GET["layer"]);
	$indxlayer = $l->index;
	$handle = fopen ($qyfile, "r");
	$conteudo = fread ($handle, filesize ($qyfile));
	fclose ($handle);
	$shp = unserialize($conteudo);	
	foreach ($shp as $indx)
	{$mapa->querybyindex($indxlayer,-1,$indx,MS_TRUE);}
}
$layersNames = $mapa->getalllayernames();
$cache = false;
foreach ($layersNames as $layerName)
{
	$l = $mapa->getLayerByname($layerName);
	if ($l->getmetadata("classesnome") != "")
	{
		include_once("funcoes_gerais.php");
		autoClasses(&$l,$mapa);
	}
	if($layerName != $_GET["layer"])
	{$l->set("status",MS_OFF);}
	if($layerName == $_GET["layer"] || $l->group == $_GET["layer"] && $l->group != "")
	{
		$l->set("status",MS_DEFAULT);
		if (($postgis_mapa != "") && ($postgis_mapa != " "))
		{
			if ($l->connectiontype == MS_POSTGIS)
			{
				$lcon = $l->connection;
				if (($lcon == " ") || ($lcon == "") || (in_array($lcon,array_keys($postgis_mapa))))
				{
					if(($lcon == " ") || ($lcon == ""))
					{$l->set("connection",$postgis_mapa);}
					else
					{$l->set("connection",$postgis_mapa[$lcon]);}					
				}
			}
		}
		if($l->getProjection() == "" )
		{$l->setProjection("init=epsg:4291");}
	}
	if($layerName == $_GET["layer"])
	{
		if(strtolower($l->getmetadata("cache")) == "sim")
		{
			$cache = true;
			$nomecache = $l->getmetadata("nomeoriginal");
			if($nomecache == "")
			{$nomecache = $layerName;}
		}
	}
	$l->set("template","none.htm");
}
if($_GET["layer"] == "")
{$cache = true;}
if($_GET == false)
{$cache = false;}
if($_GET["DESLIGACACHE"] == "sim")
{$cache = false;}

if(trim($_GET["TIPOIMAGEM"]) != "" && trim($_GET["TIPOIMAGEM"]) != "nenhum")
{$cache = false;}

if($cache == true)
{carregaCacheImagem($_GET["BBOX"],$nomecache,$_GET["map"],$_GET["WIDTH"],$_GET["HEIGHT"]);}

$map_size = explode(" ",$_GET["map_size"]);
$mapa->setsize($map_size[0],$map_size[1]);
$mapext = explode(" ",$_GET["mapext"]);
$mapa->setExtent($mapext[0],$mapext[1],$mapext[2],$mapext[3]);

$o = $mapa->outputformat;
$o->set("imagemode",MS_IMAGEMODE_RGBA);

$legenda = $mapa->legend;
$legenda->set("status",MS_OFF);
$escala = $mapa->scalebar;
$escala->set("status",MS_OFF);

//
//se o layer n�o for do tipo fundo
//
if($_GET["tipolayer"] != "fundo")
{$o->set("transparent",MS_TRUE);}
if(trim($_GET["TIPOIMAGEM"]) != "" && trim($_GET["TIPOIMAGEM"]) != "nenhum")
{$o->setOption("QUANTIZE_FORCE","OFF");}
if(!$qy)
{$img = $mapa->draw();}
else
{
	$qm = $mapa->querymap;
	$qm->set("width",$map_size[0]);
	$qm->set("height",$map_size[1]);
	$img = $mapa->drawQuery();
}

if (!function_exists('imagepng'))
{
	$s = PHP_SHLIB_SUFFIX;
	@dl( 'php_gd.'.$s );
	if (!function_exists('imagepng'))
	{@dl( 'php_gd2.'.$s );}
	if (!function_exists('imagepng'))
	{$_GET["TIPOIMAGEM"] = "";}
}
if(trim($_GET["TIPOIMAGEM"]) != "" && trim($_GET["TIPOIMAGEM"]) != "nenhum")
{
	$nomer = ($img->imagepath)."filtroimgtemp".nomeRandomico();
	$img->saveImage($nomer);
	filtraImagem($nomer,trim($_GET["TIPOIMAGEM"]));
	$img = imagecreatefrompng($nomer);
	imagealphablending($img, false);
	imagesavealpha($img, true);
	ob_clean();
	echo header("Content-type: image/png \n\n");
	imagepng($img);
}
else{
	if($cache == true)
	{salvaCacheImagem($_GET["BBOX"],$nomecache,$_GET["map"],$_GET["WIDTH"],$_GET["HEIGHT"]);}
	ob_clean();
	$nomer = ($img->imagepath)."imgtemp".nomeRandomico();
	$img->saveImage($nomer);
	$img = imagecreatefrompng($nomer);
	imagealphablending($img, false);
	imagesavealpha($img, true);
	ob_clean();
	echo header("Content-type: image/png \n\n");
	imagepng($img);
}

function salvaCacheImagem($bbox,$layer,$map,$w,$h){
	global $img,$map_size;
	//layers que s�o sempre iguais
	if($layer == "copyright" || $layer == "")
	{$bbox = "";}
	if($layer == "")
	{$layer = "fundo";}
	
	$nomedir = dirname(dirname($map))."/cache/".$layer;
	@mkdir($nomedir,0777);
	$nome = $nomedir."/".$w.$h.$bbox;
	if(!file_exists($nome))
	{
		$img->saveImage($nome);
	}
}
function carregaCacheImagem($bbox,$layer,$map,$w,$h){
	if($layer == "copyright" || $layer == "")
	{$bbox = "";}
	if($layer == "")
	{$layer = "fundo";}
	$nome = $w.$h.$bbox;
	$nome = dirname(dirname($map))."/cache/".$layer."/".$nome;
	if(file_exists($nome))
	{
		if (!function_exists('imagepng'))
		{
			$s = PHP_SHLIB_SUFFIX;
			@dl( 'php_gd.'.$s );
			if (!function_exists('imagepng'))
			{@dl( 'php_gd2.'.$s );}
		}
		@$img = imagecreatefrompng($nome);
		if(!$img)
		{
			/* Create a blank image */
			$img  = imagecreatetruecolor($w, $h);
			imagealphablending($img, false);
			imagesavealpha($img, true);
			
			$bgc = imagecolorallocatealpha($img, 255, 255, 255,127);
			$tc  = imagecolorallocate($img, 255, 0, 0);
			
			imagefilledrectangle($img, 0, 0, $w, $h, $bgc);
			/* Output an error message */
			imagestring($img, 3, 5, 5, 'Erro ao ler ' . $nome, $tc);
		}
		else
		{
			imagealphablending($img, false);
			imagesavealpha($img, true);
		}
		ob_clean();
		error_reporting(0);
		echo header("Content-type: image/png \n\n");
		imagepng($img);
		imagedestroy($img);
		exit;
	}
}
function nomeRandomico($n=10)
{
	$nomes = "";
	$a = 'azertyuiopqsdfghjklmwxcvbnABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$max = 51;
	for($i=0; $i < $n; ++$i)
	{$nomes .= $a{mt_rand(0, $max)};}
	return $nomes;
}
function filtraImagem($nomer,$tipoimagem){
	include_once("classe_imagem.php");
	$tiposImagem = explode(" ",$tipoimagem);
	foreach ($tiposImagem as $tipoimagem){
		$m = new Imagem($nomer);
		if ($tipoimagem == "cinza")
		{imagepng($m->cinzaNormal(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "sepiaclara")
		{imagepng($m->sepiaClara(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "sepianormal")
		{imagepng($m->sepiaNormal(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "negativo")
		{imagepng($m->negativo(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "detectaBordas")
		{imagepng($m->detectaBordas(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "embassa")
		{imagepng($m->embassa(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "gaussian_blur")
		{imagepng($m->gaussian_blur(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "selective_blur")
		{imagepng($m->selective_blur(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "mean_removal")
		{imagepng($m->mean_removal(),str_replace("\\","/",$nomer));}
		if ($tipoimagem == "pixelate")
		{imagepng($m->pixelate(),str_replace("\\","/",$nomer));}
	}
}
?>