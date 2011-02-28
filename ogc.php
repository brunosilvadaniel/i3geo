<?php
/*
Title: ogc.php

Gera web services nos padr�es OGC

A lista de proje��es mostradas na fun��o getcapabilities � definida na vari�vel $listaepsg. Edite essa vari�vel
se forem necess�rias outras proje��es al�m das existentes

Licenca:

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

Arquivo: i3geo/ogc.php

Parametros:

lista - se for igual a "temas", mostra uma lista dos temas dispon�veis

ajuda - se for definida na URL, mostra uma ajuda ao usu�rio

tema - nome do tema do servi�o. Se for definido, o web service conter� apenas o tema.

intervalo - valor inicial e final com o n�mero de temas que ser�o mostrados no servi�o

legenda - mostra a legenda no corpo do mapa sim|nao

perfil - perfil utilizado para escolher os menus

Exemplos:

ogc.php?lista=temas

ogc.php?tema=bioma

ogc.php?intervalo=0,50
*/
//
//valida��es e includes
//
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
require_once("classesphp/carrega_ext.php");
include("ms_configura.php");
include("classesphp/pega_variaveis.php");
include("classesphp/classe_menutemas.php");
error_reporting(0);
//
//pega os endere�os para compor a url de chamada do gerador de web services
//ogc.php
//
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$protocolo = $protocolo[0];
$protocolo1 = strtolower($protocolo) . '://'.$_SERVER['SERVER_NAME'];
$protocolo = strtolower($protocolo) . '://'.$_SERVER['SERVER_NAME'] .":". $_SERVER['SERVER_PORT'];
$urli3geo = str_replace("/ogc.php","",$protocolo.$_SERVER["PHP_SELF"]);
//
//imprime na tela a ajuda
//
if (isset($ajuda))
{
	ogc_imprimeAjuda();
	exit;
}
//
//imprime na tela a lista de temas dispon�veis
//
if($lista == "temas")
{
	ogc_imprimeListaDeTemas();
	exit;
}
//
//cria o web service
//
include("classesphp/funcoes_gerais.php");
$req = ms_newowsrequestobj();
$tipo = "";
$_GET = array_merge($_GET,$_POST);
foreach ($_GET as $k=>$v)
{
	$req->setParameter($k, $v);
	if(strtolower($v) == "getcapabilities")
	{$tipo = "metadados";}
	if(strtolower($k) == "layers")
	{$tema = $v;}
	if(strtolower($k) == "layer")
	{$tema = $v;}
}
$listaepsg = $srs." EPSG:4291 EPSG:4326 EPSG:22521 EPSG:22522 EPSG:22523 EPSG:22524 EPSG:22525 EPSG:29101 EPSG:29119 EPSG:29120 EPSG:29121 EPSG:29122 EPSG:29177 EPSG:29178 EPSG:29179 EPSG:29180 EPSG:29181 EPSG:29182 EPSG:29183 EPSG:29184 EPSG:29185";
if(count($_GET) == 0){
	$tipo="intervalo";
	$req->setParameter("REQUEST", "getCapabilities");
	$req->setParameter("SERVICE", "WMS");
}
if(isset($tema) && $tipo != "metadados")
{$tipo = "";}
if(!isset($version))
{$req->setParameter("VeRsIoN","1.1.0");}
$oMap = ms_newMapobj("aplicmap/ogcws.map");
//
//altera os caminhos das imagens
//
if((isset($legenda)) && ($legenda == "sim"))
{
	$leg = $oMap->legend;
	$leg->set("status",MS_EMBED);
}
$proto = "http" . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "s" : "") . "://";
$server = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
$or = $proto.$server.$_SERVER['PHP_SELF'];
if((isset($tema)) && ($tema != "") && ($tipo=="metadados"))
{$or = $or."?tema=".$tema."&";}
//
//parametros no n�vel maior
//
$oMap->setmetadata("ows_onlineresource",$or);
$oMap->setmetadata("wms_onlineresource",$or);
$oMap->setmetadata("wms_title",$tituloInstituicao." - i3geo");
$oMap->setmetadata("wfs_title",$tituloInstituicao." - i3geo");
//qd definido aqui, n�o funciona no qgis
//$oMap->setmetadata("ows_srs",$listaepsg);
//$oMap->setmetadata("wms_srs",$listaepsg);
$oMap->setmetadata("wms_attribution_logourl_format","image/png");
$oMap->setmetadata("wms_attribution_logourl_height","56");
$oMap->setmetadata("wms_attribution_logourl_width","85");
$oMap->setmetadata("wms_attribution_logourl_href",$proto.$server.dirname($_SERVER['PHP_SELF'])."/imagens/i3geo.png");
$oMap->setmetadata("wms_attribution_onlineresource",$proto.$server.dirname($_SERVER['PHP_SELF']));
$oMap->setmetadata("wms_attribution_title",$tituloInstituicao);

$e = $oMap->extent;
$extensaoMap = ($e->minx)." ".($e->miny)." ".($e->maxx)." ".($e->maxy);

if (!isset($intervalo))
{$intervalo = "0,5000";}
else
{$tipo = "intervalo";}
if(!isset($tema)){
	if(!isset($intervalo))
	{$intervalo = "0,5000";}
	$tipo = "intervalo";
}
if ($tipo == "" || $tipo == "metadados")
{
	$tema = explode(" ",$tema);
	foreach ($tema as $tx)
	{
		$nmap = ms_newMapobj("temas/".$tx.".map");
		$ts = $nmap->getalllayernames();
		foreach ($ts as $t)
		{
			$l = $nmap->getlayerbyname($t);
			$l->setmetadata("ows_title",pegaNome($l));
			$l->setmetadata("ows_srs",$listaepsg);
			//essa linha � necess�ria pq as vezes no mapfile n�o tem nenhum layer com o nome igual ao nome do mapfile
			if(count($ts)==1)
			{
				$l->set("name",$tx);
			}
			$l->setmetadata("gml_include_items","all");
			$l->set("dump",MS_TRUE);
			$l->setmetadata("WMS_INCLUDE_ITEMS","all");
			$l->setmetadata("WFS_INCLUDE_ITEMS","all");
			if(file_exists($locaplic."/temas/miniaturas/".$t.".map.mini.png"))
			{
				$mini = $proto.$server.dirname($_SERVER['PHP_SELF'])."/temas/miniaturas/".$t.".map.mini.png";
				$l->setmetadata("wms_attribution_logourl_format","image/png");
				$l->setmetadata("wms_attribution_logourl_height","50");
				$l->setmetadata("wms_attribution_logourl_width","50");
				$l->setmetadata("wms_attribution_logourl_href",$mini);
			}
			if($l->type == MS_LAYER_RASTER)
			{
				$c = $l->getclass(0);
				if ($c->name == "")
				{$c->name = " ";}
			}
			//inclui extensao geografica
			$extensao = $l->getmetadata("EXTENSAO");
			if($extensao == "")
			{$extensao = $extensaoMap;}
			$l->setmetadata("wms_extent",$extensao);
			if (isset($postgis_mapa))
			{			
				if ($postgis_mapa != "")
				{				
					if ($l->connectiontype == MS_POSTGIS)
					{
						$lcon = $l->connection;
						if (($lcon == " ") || ($lcon == "") || (in_array($lcon,array_keys($postgis_mapa))))
						{
							//
							//o metadata CONEXAOORIGINAL guarda o valor original para posterior substitui��o
							//				
							if(($lcon == " ") || ($lcon == ""))
							{
								$l->set("connection",$postgis_mapa);
								$l->setmetadata("CONEXAOORIGINAL",$lcon);
							}
							else
							{
								$l->set("connection",$postgis_mapa[$lcon]);
								$l->setmetadata("CONEXAOORIGINAL",$lcon);
							}					
						}
					}
				}
			}
			autoClasses(&$l,$oMap);
			$permite = $l->getmetadata("permiteogc");
			if($permite != "nao")
			ms_newLayerObj($oMap, $l);
		}
	}
}
else
{
	$conta = 0;
	$int = explode(",",$intervalo);
	$codigosTema = array();
	$m = new Menutemas("",$perfil,$locaplic,$urli3geo);
	$menus = $m->pegaListaDeMenus();
	foreach ($menus as $menu)
	{	
		$grupos = $m->pegaListaDeGrupos($menu["idmenu"],$listasistemas="nao",$listasgrupos="sim");
		foreach($grupos as $grupo)
		{
			if($grupo["ogc"] == "sim")
			{
				foreach($grupo["subgrupos"] as $sgrupo)
				{
					if($sgrupo["ogc"] == "sim")
					{
						$temas = $m->pegaListaDeTemas($grupo["id_n1"],$sgrupo["id_n2"],$menu["idmenu"]);
						foreach($temas as $tema)
						{
							if($tema["ogc"] == "sim")
							{
								$codigosTema[] = array("tema"=>$tema["tid"],"fonte"=>$tema["link"]);
							}
						}
					}
				}
			}
		}
	}
	foreach($codigosTema as $c)
	{
		$codigoTema = $c["tema"];
		if(file_exists("temas/".$codigoTema.".map"))
		{
			if (@ms_newMapobj("temas/".$codigoTema.".map"))
			{
				$nmap = ms_newMapobj("temas/".$codigoTema.".map");
				$ts = $nmap->getalllayernames();
				if (count($ts) == 1)
				{ 
					foreach ($ts as $t)
					{
						if ($oMap->getlayerbyname($t) == "")
						{
							$conta++;
							if (($conta >= $int[0]) && ($conta <= $int[1]))
							{
								$l = $nmap->getlayerbyname($t);
								$extensao = $l->getmetadata("EXTENSAO");
								if($extensao == "")
								{$extensao = $extensaoMap;}
								$l->setmetadata("wms_extent",$extensao);

								$l->setmetadata("ows_title",pegaNome($l));
								$l->setmetadata("ows_srs",$listaepsg);
								//$l->setmetadata("wms_srs","EPSG:4291 EPSG:4326");
								$l->set("status",MS_OFF);
								$l->setmetadata("gml_include_items","all");
								$l->set("dump",MS_TRUE);
								$l->setmetadata("WMS_INCLUDE_ITEMS","all");
								$l->setmetadata("WFS_INCLUDE_ITEMS","all");
								$l->setmetadata("ows_metadataurl_href",$c["fonte"]);
								$l->setmetadata("ows_metadataurl_type","TC211");
								$l->setmetadata("ows_metadataurl_format","text/html");
								if(file_exists($locaplic."/temas/miniaturas/".$t.".map.mini.png"))
								{
									$mini = $proto.$server.dirname($_SERVER['PHP_SELF'])."/temas/miniaturas/".$t.".map.mini.png";
									$l->setmetadata("wms_attribution_logourl_format","image/png");
									$l->setmetadata("wms_attribution_logourl_height","50");
									$l->setmetadata("wms_attribution_logourl_width","50");
									$l->setmetadata("wms_attribution_logourl_href",$mini);
								}
								ms_newLayerObj($oMap, $l);
							}
						}
					}
				}
			}
		}
	}
}

ms_ioinstallstdouttobuffer();
$oMap->owsdispatch($req);
$contenttype = ms_iostripstdoutbuffercontenttype();
//header("Content-type: application/xml");
header("Content-type: $contenttype");

ms_iogetStdoutBufferBytes();
ms_ioresethandlers();
//
//fun��es
//
function ogc_pegaListaDeMenus()
{
	global $perfil,$locaplic,$urli3geo;
	if(!isset($perfil)){$perfil = "";}
	$m = new Menutemas("",$perfil,$locsistemas,$locaplic,"",$urli3geo);
	foreach($m->pegaListaDeMenus() as $menu)
	{$menus[] = $urli3geo."/admin/xmlmenutemas.php?id_menu=".$menu["idmenu"];}
	return $menus;
}
function ogc_imprimeAjuda()
{
	echo "<pre><b>Construtor de web services do I3Geo.</b><br><br>";
	echo "Esse utilit�rio usa os arquivos mapfiles existentes em <br>";
	echo "i3geo/temas para gerar web services no padr�o OGC.<br>";
	echo "Para escolher um tema, utilize:<br>";
	echo "ogc.php?lista=temas - para listar os temas dispon�veis<br>";
	echo "Para usar esse web service, al�m dos par�metros normais, vc dever� incluir o par�metro &tema=,<br>";
	echo "ou seja,http://[host]/i3geo/ogc.php?tema=[c�digo do tema]<br><br>";
	echo "Utilize o sistema de administra��o do i3Geo para configurar quais os temas podem ser utilizados.";
	echo "Utilize o parametro &intervalo=0,20 para definir o n�mero de temas desejado na fun��o getcapabilities.";
}
function ogc_imprimeListaDeTemas()
{
	global $urli3geo,$perfil,$locaplic;
	$m = new Menutemas("",$perfil,$locaplic,$urli3geo);
	$menus = $m->pegaListaDeMenus();
	echo '<html><head><title>WMS</title><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1"><meta name="description" content="OGC"><meta name="keywords" content="WMS OGC mapa sig gis webmapping geo geoprocessamento interativo meio ambiente MMA cartografia geografia"> <meta name="robots" content="index,follow">';
	echo "<body><b>Lista de temas por grupos e subgrupos e endere�os de acesso aos dados por meio de Web Services WMS (os c�digos dos temas est�o em vermelho)</b><br><br>";
	$imprimir = "";
	foreach ($menus as $menu)
	{
		$grupos = $m->pegaListaDeGrupos($menu["idmenu"],$listasistemas="nao",$listasgrupos="sim");
		foreach($grupos as $grupo)
		{
			if($grupo["ogc"] == "sim")
			{
				$imprimegrupo = "<i>".$grupo["nome"]."</i>";
				foreach($grupo["subgrupos"] as $sgrupo)
				{
					if($sgrupo["ogc"] == "sim")
					{
						$imprimesubgrupo = $sgrupo["nome"];
						$temas = $m->pegaListaDeTemas($grupo["id_n1"],$sgrupo["id_n2"],$menu["idmenu"]);
						foreach($temas as $tema)
						{
							if($tema["ogc"] == "sim")
							{
								$imprimir .= $imprimegrupo."->".$imprimesubgrupo."<br>";
								$imprimir .= "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
								$imprimir .= "<span style=color:red >".$tema["tid"]."</span>";
								$imprimir .= "&nbsp;-&nbsp;".$tema["nome"]."&nbsp";
								$imprimir .= "&nbsp;<a href='".$urli3geo."/ogc.php?tema=".$tema["tid"]."&service=wms&request=getcapabilities' >Getcapabilities</a>";
								$imprimir .= "&nbsp;<a href='".$urli3geo."/ogc.php?tema=".$tema["tid"]."&SRS=EPSG:4291&WIDTH=500&HEIGHT=500&BBOX=-76.5125927,-39.3925675209,-29.5851853,9.49014852081&FORMAT=image/png&service=wms&version=1.1.0&request=getmap&layers=".$tema["tid"]."' >GetMap </a>";
								if($tema["link"] != " ")
								$imprimir .= "&nbsp;&nbsp;<a href='".$tema["link"]."' >fonte</a>";
								$imprimir .= "<br>";
							}
						}
					}
				}
			}
		}
	}
	echo $imprimir."</body></html>";
}
?>



