<?php
/*
Title: Gerador de menu em kml para uso no Google Earth

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
echo "<kml xmlns='http://earth.google.com/kml/2.2'>";
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$protocolo = $protocolo[0];
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
echo "<Document><name>Menu i3geo</name><open>0</open><description></description><visibility>0</visibility>";
foreach ($menus as $menu)
{
	$xml = simplexml_load_file($menu);
	foreach($xml->GRUPO as $grupo)
	{
		$nome = mb_convert_encoding($grupo->GTIPO,"auto","auto");
		$desc = mb_convert_encoding($grupo->DTIPO,"auto","auto");
		echo "<Folder>";
		echo "<name>$nome</name>";
		echo "<description>$desc</description>";
		echo "<open>0</open><visibility>0</visibility>";
		foreach($grupo->SGRUPO as $sgrupo)
		{
			echo "<Folder>";
			$nome = mb_convert_encoding($sgrupo->SDTIPO,"auto","auto");
			echo "<name>$nome</name>";
			echo "<description></description>";
			echo "<open>0</open><visibility>0</visibility>";
			foreach($sgrupo->TEMA as $tema)
			{
				$nome = mb_convert_encoding($tema->TNOME,"auto","auto");
				$desc = mb_convert_encoding($tema->TDESC,"auto","auto");
				$id = mb_convert_encoding($tema->TID,"auto","auto");
				$ogc = sim;
				if($tema->TID)
				{
					$ogc = mb_convert_encoding($tema->OGC,"auto","auto");
				}
				if(strtolower($ogc != "nao"))
				{
					echo "<GroundOverlay>";
    				echo "<name>$nome</name>";
					echo "<description>$desc</description>";
					echo "<visibility>0</visibility>";      
					echo "<Icon>";
					$l = $protocolo."/i3geo/ogc.php?tema=$id&amp;width=1500&amp;height=1500&amp;VERSION=1.1.1&amp;REQUEST=GetMap&amp;SRS=EPSG:4326&amp;STYLES=&amp;BGCOLOR=0xFFFFFF&amp;FORMAT=image/png&amp;TRANSPARENT=TRUE&amp;layers=$id";
					echo "<href>$l</href>";
					echo "</Icon>";
					echo "<LatLonBox><north>9.49014618085</north><south>-39.3925604735</south><east>-29.5851853</east><west>-76.5125927</west></LatLonBox>";
					echo "</GroundOverlay>";
				}
			}		
			echo "</Folder>";	
		}
		echo "</Folder>";
	}
}
echo "</Document></kml>";
?>