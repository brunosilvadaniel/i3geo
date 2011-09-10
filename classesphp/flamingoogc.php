<?php
/*
Title: flamingoogc.php

Gerador autom�tico de web services OGC para a interface flamingo do i3geo

Processa o mapfile tempor�rio utilizado no mapa atual transformando-o em um servi�o OGC.
Realiza as opera��es sobre o mapfile conforme as necessidades da API do software Flamingo.
Esse programa � utilizado em conjunto com flamingo.inc

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

Arquivo:

i3geo/flamingoogc.php
*/
error_reporting(E_ALL);
if (!function_exists('ms_GetVersion'))
{
	if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
	{
		if(!@dl('php_mapscript_48.dll'))
		dl('php_mapscript.dll');
	}
	else
	{dl('php_mapscript.so');}
}
include_once("carrega_ext.php");
include_once("../ms_configura.php");
include_once("pega_variaveis.php");
//
//cria o web service
//
include_once("funcoes_gerais.php");
$req = ms_newowsrequestobj();

$tipo = "";
//var_dump($_GET);
foreach ($_GET as $k=>$v)
{
	$req->setParameter($k, $v);
}

$req->setParameter("VeRsIoN","1.1.0");
$oMap = ms_newMapobj($locaplic."/aplicmap/ogcws.map");
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$proto = $protocolo[0] . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "s" : "") . "://";
$server = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
$or = $proto.$server.$_SERVER['PHP_SELF'];
$oMap->setmetadata("ows_onlineresource",$or."?g_sid=".$g_sid);
$oMap->setmetadata("ows_title",$tituloInstituicao." - i3geo");
session_name("i3GeoPHP");
if (isset($g_sid) && $g_sid != "")
{session_id($g_sid);}
session_start();
foreach(array_keys($_SESSION) as $k)
{
	eval("\$".$k."='".$_SESSION[$k]."';");
}
$postgis_mapa = $_SESSION["postgis_mapa"];
$nmap = ms_newMapobj($map_file);
$c = $nmap->numlayers;
for ($i=0;$i < $c;++$i)
{
	$l = $nmap->getlayer($i);
	if($l->connectiontype != MS_WMS)
	{
		$l->setmetadata("ows_title",pegaNome($l));
		//$l->setmetadata("ows_name",$t);
		$l->setmetadata("ows_srs","EPSG:4291 EPSG:4326");
		$l->setmetadata("gml_include_items","all");
		$l->set("dump",MS_TRUE);
		$l->setmetadata("WMS_INCLUDE_ITEMS","all");
		$l->setmetadata("WFS_INCLUDE_ITEMS","all");
		$classe = $l->getclass(0);
		if ($classe->name == "")
		{$classe->name = " ";}
		if (isset($postgis_mapa))
		{
			if ($postgis_mapa != "")
			{
				if ($l->connectiontype == MS_POSTGIS)
				{
					if ($l->connection == " ")
					{
						if(!is_array($postgis_mapa))
						$l->set("connection",$postgis_mapa);
						else
						$l->set("connection",$postgis_mapa[$l->connection]);
					}
				}
			}
		}
	}
	ms_newLayerObj($oMap, $l);
}
//$req->setParameter("LAYERS","i3geoogc");

ms_ioinstallstdouttobuffer();
$oMap->owsdispatch($req);
$contenttype = ms_iostripstdoutbuffercontenttype();
header("Content-type: $contenttype");
ms_iogetStdoutBufferBytes();
ms_ioresethandlers();
?>