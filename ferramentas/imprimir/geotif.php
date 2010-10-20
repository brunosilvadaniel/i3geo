<?php
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
require_once("../../classesphp/pega_variaveis.php");
error_reporting(0);
session_name("i3GeoPHP");
if (isset($g_sid))
{session_id($g_sid);}
session_start();
foreach(array_keys($_SESSION) as $k)
{
	eval("\$".$k."='".$_SESSION[$k]."';");
}
$postgis_mapa = $_SESSION["postgis_mapa"];
//
//se as extens�es j� estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r�pido
//
include_once ("../../classesphp/carrega_ext.php");
//
//carrega o phpmapscript
//
$exts = get_loaded_extensions();
if (array_search( "MapScript", $exts) != TRUE)
{
	if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
	{
		if(!@dl('php_mapscript_48.dll'))
		dl('php_mapscript.dll');
	}
	else
	{dl('php_mapscript.so');}
}
require("../../classesphp/funcoes_gerais.php");
error_reporting(E_ALL);
$nomes = nomeRandomico();
$map = ms_newMapObj($map_file);
$temp = str_replace(".map","xxx.map",$map_file);
$map->save($temp);
substituiCon($temp,$postgis_mapa);
$of = $map->outputformat;
$of->set("driver","GDAL/GTiff");
$of->set("imagemode","RGB");
$map = ms_newMapObj($temp);
if($interface == "googlemaps")
{$map->setProjection("init=epsg:4291");}
//$legenda =$map->legend;
//$legenda->set("status",MS_EMBED);
//altera o nome das classes vazias
$temas = $map->getalllayernames();
foreach ($temas as $tema)
{
	$layer = $map->getlayerbyname($tema);
	if (($layer->data != "") && ($layer->getmetadata("escondido") != "SIM") && ($layer->getmetadata("tema") != "NAO"))
	{
		if ($layer->numclasses > 0)
		{
			$classe = $layer->getclass(0);
			if (($classe->name == "") || ($classe->name == " "))
			{$classe->set("name",$layer->getmetadata("tema"));}
		}
	}
	if ($layer->getmetadata("classe") == "NAO")
	{
		$nclasses = $layer->numclasses;
		if ($nclasses > 0)
		{
			for($i=0;$i<$nclasses;$i++)
			{
				$classe = $layer->getclass($i);
				$classe->set("name","classeNula");
			}
		}
	}	
}
$map->save($temp);
removeLinha("classeNula",$temp);
$map = ms_newMapObj($temp);
$o = $map->outputformat;
if($interface == "openlayers" || $interface == "googlemaps" || $interface == "googleearth"){
	if($mapexten != ""){
		$ext = explode(" ",$mapexten);
		$extatual = $map->extent;
		$extatual->setextent($ext[0],$ext[1],$ext[2],$ext[3]);
	}
	$legenda = $map->legend;
	$legenda->set("status",MS_EMBED);
	$o->set("imagemode",MS_IMAGEMODE_RGB);
}
$o->set("imagemode",MS_IMAGEMODE_RGB);
$imgo = $map->draw();
$nomer = ($imgo->imagepath)."mapa".$nomes.".tif";
$imgo->saveImage($nomer);
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$nomemapa = strtolower($protocolo[0])."://".$_SERVER['HTTP_HOST'].($imgo->imageurl).basename($nomer);
echo "<a style=font-family:Verdana,Arial,Helvetica,sans-serif; href='$nomemapa' >Arquivo gerado! Clique para ver.</a>";
?>