<?php
/*
Title: Esp�cies

Acessa os web services do MMA para recuperar os dados de esp�cies.

Por ser executado dentro do I3Geo, boa parte dos par�metros s�o obtidos da vari�vel de se��o.

See:

<pesquisa.htm>

File: pesquisa.php

19/6/2007

Include:

<"../../classesjs/cpaint/cpaint2.inc.php">, <"../../classesphp/pega_variaveis.php">

*/
set_time_limit(180);
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
$servico = "http://mapas.mma.gov.br/webservices/especiesws.php";

if ($funcao == "listaBancos")
{
	$cp->register('listaBancos');
	$cp->start();
	$cp->return_data();
}
if ($funcao == "listaFamilias")
{
	$cp->register('listaFamilias');
	$cp->start();
	$cp->return_data();
}
if ($funcao == "listaEspecies")
{
	$cp->register('listaEspecies');
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
Function: listaBancos

Obt�m a lista de bancos.
*/
function listaBancos()
{
	global $cp,$servico;
	$resultado = array();
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	$resultado = $soapclient->call("natureserveDatabase","");
	$cp->set_data($resultado);
}
/*
Function: listaFamilias

Obt�m a lista de familias.
*/
function listaFamilias()
{
	global $cp,$servico,$banco;
	$resultado = array();
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	$resultado = $soapclient->call("natureserveFamily",$banco);
	$cp->set_data($resultado);
}
/*
Function: listaEspecies

Obt�m a lista de especies.
*/
function listaEspecies()
{
	global $cp,$servico,$banco,$familia;
	$resultado = array();
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	$resultado = $soapclient->call("natureserveEspecie",array($banco,$familia));
	$cp->set_data($resultado);
}
/*
Function: adicionatema

Adiciona um tema no mapa atual.
*/
function adicionatema()
{
	global $map_file,$dir_tmp,$imgdir,$banco,$familia,$servico,$cp,$especie,$cor,$locaplic,$imgurl;
	$retorno = "erro.";
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	$resultado = $soapclient->call("natureserveGidEspecie",array($banco,$especie));
	$tabelas = $resultado["especies"];
	$mapa = ms_newMapObj($map_file);
	include("../../classesphp/classe_mapa.php");
	include("../../classesphp/funcoes_gerais.php");
	$nomeslegenda["munamb1"] = "p�ssaros (poligonos) ".$especie;
	$nomeslegenda["munamb2"] = "anf�bios (poligonos) ".$especie;
	$nomeslegenda["munamb3"] = "mam�feros (poligonos) ".$especie;
	$nomeslegenda["munamb4"] = "p�ssaros (pontos) ".$especie;
	$nomeslegenda["munamb5"] = "mam�feros (pontos) ".$especie;
	foreach ($tabelas as $tabela)
	{
		if ($tabela["gids"] != '')
		{
			$retorno = "ok";
			$nometema = explode(".",$tabela["tabela"]);
			$tema = $nometema[1];
	 		$servico = "http://mapas.mma.gov.br/webservices/especieswms.php?gid=".$tabela["gids"]."&cor=".$cor;
	 		$nome = "default";
	 		$proj = "EPSG:4291";
	 		$formato = "image/png";
	 		$nomecamada = $nomeslegenda[$tema];
	 		$suportasld = "nao";
	 		$versao = "1.1.0";
	 		$tiporep = "";
	 		$tipo = "";
			$m = new Mapa($map_file);
	 		$m->adicionatemawms($tema,$servico,$nome,$proj,$formato,$locaplic,$tipo,$versao,$nomecamada,$dir_tmp,$imgdir,$imgurl,$tiporep,$suportasld);
			$m->salva();
		}
	}
	$cp->set_data($retorno);
}
?>