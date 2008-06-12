<?php
/*
Title: kml.php

Gerador de menu em kml para uso no Google Earth

L� o(s) menu(s) de temas e acrescenta os links necess�rios ao acesso aos dados no Google Earth. Veja mais detalhes em ajuda/googleearth.htm

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

File: i3geo/kml.php

*/
error_reporting(0);
include_once ("classesphp/carrega_ext.php");
include_once ("ms_configura.php");
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo "<kml xmlns='http://earth.google.com/kml/2.2'>\n";
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$protocolo = $protocolo[0];
$protocolo1 = strtolower($protocolo . '://'.$_SERVER['SERVER_NAME']);
$protocolo = $protocolo . '://'.$_SERVER['SERVER_NAME'] .":". $_SERVER['SERVER_PORT'];
if ($menutemas == "")
{$menus[] = "menutemas/menutemas.xml";}
else
{
	foreach($menutemas as $m)
	{
		$menus[] = $m["arquivo"];
	}
}
if(!isset($menus))
$menus = array("/opt/www/html/i3geo/menutemas/menutemas.xml");

echo "<Document><name>Menu i3geo</name><open>0</open><description></description><visibility>0</visibility>\n";
foreach ($menus as $menu)
{
	$xml = simplexml_load_file($menu);
	foreach($xml->GRUPO as $grupo)
	{
		$nome = mb_convert_encoding($grupo->GTIPO,"auto","auto");
		$desc = mb_convert_encoding($grupo->DTIPO,"auto","auto");
		echo "<Folder>\n";
		echo "<name>$nome</name>\n";
		echo "<description>$desc</description>\n";
		echo "<open>0</open><visibility>0</visibility>\n";
		foreach($grupo->SGRUPO as $sgrupo)
		{
			echo "<Folder>\n";
			$nome = mb_convert_encoding($sgrupo->SDTIPO,"auto","auto");
			echo "<name>$nome</name>\n";
			echo "<description></description>\n";
			echo "<open>0</open><visibility>0</visibility>\n";
			foreach($sgrupo->TEMA as $tema)
			{
				$nome = mb_convert_encoding($tema->TNOME,"auto","auto");
				$desc = mb_convert_encoding($tema->TDESC,"auto","auto");
				$id = mb_convert_encoding($tema->TID,"auto","auto");
				$fonte = mb_convert_encoding($tema->TLINK,"auto","auto");
				$tipoa = "";
				if($tema->TIPOA)
				$tipoa = mb_convert_encoding($tema->TIPOA,"auto","auto");
				$ogc = sim;
				if($tema->TID)
				{
					$kml = mb_convert_encoding($tema->KML,"auto","auto");
				}
				if(strtolower($kml) != "nao" && strtolower($tipoa) != "wms")
				{
					echo "<GroundOverlay>\n";
    					echo "<name>$nome</name>\n";
    					$fonte = "<a href='$fonte' >Fonte </a>";
    					$legenda = "<a href='$protocolo1/i3geo/ogc.php?tema=$id&layer=$id&request=getlegendgraphic&service=wms&format=image/jpeg' >Legenda </a>";
					echo "<description><![CDATA[".$fonte.$legenda.$desc."]]></description>\n";
					echo "<visibility>0</visibility>\n";      
					echo "<Icon>\n";
					$l = $protocolo."/i3geo/ogc.php?tema=$id&amp;width=1500&amp;height=1500&amp;VERSION=1.1.1&amp;REQUEST=GetMap&amp;SRS=EPSG:4326&amp;STYLES=&amp;BGCOLOR=0xFFFFFF&amp;FORMAT=image/png&amp;TRANSPARENT=TRUE&amp;layers=$id";
					echo "<viewRefreshMode>onStop</viewRefreshMode>\n";
					echo "<href>$l</href>\n";
					echo "</Icon>\n";
					echo "<LatLonBox><north>9.49014618085</north><south>-39.3925604735</south><east>-29.5851853</east><west>-76.5125927</west></LatLonBox>\n";
					echo "</GroundOverlay>\n";
				}
			}		
			echo "</Folder>\n";	
		}
		echo "</Folder>\n";
	}
}
echo "</Document></kml>\n";
?>