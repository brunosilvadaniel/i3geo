<?php
/*
Title: SIBEA-MMA.

Acessa os web services do MMA para recuperar dados sobre educadores ambientais.

Por ser executado dentro do I3Geo, boa parte dos par�metros s�o obtidos da vari�vel de se��o.

See:

<pesquisa.htm>

File: pesquisa.php

19/6/2007

Include:

<"../../classesjs/cpaint/cpaint2.inc.php">, <"../../classesphp/pega_variaveis.php">

*/
require_once("../../pacotes/cpaint/cpaint2.inc.php");
require_once("../../classesphp/pega_variaveis.php");
require_once('../../pacotes/SOAP/nusoap.php');
if (isset($g_sid))
{session_id($g_sid);}
session_start();
foreach(array_keys($_SESSION) as $k)
{
	eval("\$".$k."='".$_SESSION[$k]."';");
}
require_once("../../pacotes/phpxbase/api_conversion.php");
require_once ("../../classesphp/carrega_ext.php");
$cp = new cpaint();
$servico = "http://mapas.mma.gov.br/webservices/sibeaws.php";

if ($funcao == "listaTipoFiltro")
{
	$cp->register('listaTipoFiltro');
	$cp->start();
	$cp->return_data();
}
if ($funcao == "listaValorFiltro")
{
	$cp->register('listaValorFiltro');
	$cp->start();
	$cp->return_data();
}
if ($funcao == "adicionatema")
{
	$cp->register('adicionatema');
	$cp->start();
	$cp->return_data();
}
/*
Function: listaTipoFiltro

Obt�m a lista de tipos de filtro.
*/
function listaTipoFiltro()
{
	global $cp,$servico;
	$resultado = array();
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	$resultado = $soapclient->call("tipoBusca","");
	$cp->set_data($resultado);
}
/*
Function: listaValorFiltro

Obt�m a lista de valores de um tipo de filtro.
*/
function listaValorFiltro()
{
	global $cp,$servico,$execFuncao;
	$resultado = array();
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	$resultado = $soapclient->call($execFuncao,"");
	$cp->set_data($resultado);
}
/*
Function: adicionatema

Cria um arquivo shapefile com os dados dos planos de manejo.

Adiciona o shape file como uma nova camada no mapa.

Parameters:

map_file - arquivo map file atual

dir_tmp - diret�rio tempor�rio do Mapserver

imgdir - diret�rio tempor�rio para guardar as imagens do mapa atual

filtro - nome do tipo de filtro

valor - valor do filtro
*/
function adicionatema()
{
	global $map_file,$dir_tmp,$imgdir,$filtro,$valor,$servico,$cp,$nomevalor,$cor,$locaplic,$imgurl;
	//
	//pega a lista de c�digos siafi
	//
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	if ($filtro == "tipoTitulacaoMaxima")
	{
		$resultado = $soapclient->call("sibeaTitulacaoMaxima",$valor);
		$nometema = "Titula��o m�xima";		
	}
	if ($filtro == "tipoFormacao")
	{
		$resultado = $soapclient->call("sibeaFormacao",$valor);
		$nometema = "Forma��o";		
	}
	if ($filtro == "tipoAreaFormacao")
	{
		$resultado = $soapclient->call("sibeaGrandeArea",$valor);
		$nometema = "Grande �rea de forma��o";		
	}
	//
	//converte siafi-ibge
	//
	$listaSiafi = $resultado["sibea"][0];
	$resultado = $soapclient->call("converteSiafiIbge",$listaSiafi);
	//
	//monta o sql para o layer
	//
	$listaIbge = $resultado["sibea"][0];
	if ($listaIbge == '')
	{
		$cp->set_data("erro. Nada encontrado");
		return;
	}
	include("../../classesphp/classe_mapa.php");
	include("../../classesphp/funcoes_gerais.php");
	if ($listaIbge != '')
	{
		$retorno = "ok";
		$tema = "sibeapol";
		$servico = "http://mapas.mma.gov.br/webservices/sibeawms.php?gid=".$listaIbge."&cor=".$cor;
		$nome = "default";
		$proj = "EPSG:4291";
		$formato = "image/png";
		$nomecamada = $nometema." = ".$nomevalor;
		$suportasld = "nao";
		$versao = "1.1.0";
		$tiporep = "";
		$tipo = "";
		$m = new Mapa($map_file);
		$m->adicionatemawms($tema,$servico,$nome,$proj,$formato,$locaplic,$tipo,$versao,$nomecamada,$dir_tmp,$imgdir,$imgurl,$tiporep,$suportasld);
		$m->salva();
	}
	$cp->set_data($retorno);	
	
	
/*
	$sql = "('".(str_replace(",","','",$listaIbge))."')";
	$nomes = "";
	$a = 'azertyuiopqsdfghjklmwxcvbnABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$max = strlen($a)-1;
	for($i=0; $i < 10; $i++)
	{$nomes .= $a{mt_rand(0, $max)};}
	//adiciona o layer
	$mapa = ms_newMapObj($map_file);
	$layer = ms_newLayerObj($mapa);
	$layer->set("name",$nomes);
	$layer->set("connectiontype",MS_POSTGIS);
	$layer->set("connection","user=geodados password=geodados dbname=geodados host=10.1.1.36 port=5432");
	$layer->set("data","the_geom FROM (select * FROM brasil.bralim10 where geocodigo in $sql) as foo USING UNIQUE gid USING SRID=4291");
	$layer->setmetadata("TEMA",$nometema." = ".$nomevalor);
	$layer->setmetadata("CLASSE","sim");
	$layer->set("type",MS_LAYER_POLYGON);
	$layer->set("status",MS_DEFAULT);
	$classe = ms_newClassObj($layer);
	$classe->set("name"," ");
	$estilo = ms_newStyleObj($classe);
	$cors = $estilo->color;
	$cor = explode(",",$cor);
	$cors->setRGB($cor[0],$cor[1],$cor[2]);
	$salvo = $mapa->save($map_file);
	$cp->set_data("ok");
*/
}
?>