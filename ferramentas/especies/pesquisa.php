<?php
/*
Title: Esp�cies (PHP)

Acessa os web services do MMA para recuperar os dados de esp�cies.

Por ser executado dentro do i3Geo, boa parte dos par�metros s�o obtidos da vari�vel de se��o.

Arquivos:

i3geo/ferramentas/especies/pesquisa.php
i3geo/ferramentas/especies/pesquisa.htm

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

*/
set_time_limit(180);
require_once("../../pacotes/cpaint/cpaint2.inc.php");
require_once("../../classesphp/pega_variaveis.php");
if (function_exists('ereg'))
{require_once('../../pacotes/SOAPdepreciado/nusoap.php');}
else
{require_once('../../pacotes/SOAP/nusoap.php');}
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
	if (function_exists('ereg'))
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	else
	$soapclient = new nusoap_client($servico);	
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
	if (function_exists('ereg'))
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	else
	$soapclient = new nusoap_client($servico);
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
	if (function_exists('ereg'))
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	else
	$soapclient = new nusoap_client($servico);
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
	
	if (function_exists('ereg'))
	$soapclient = new Xsoapclient($servico."?wsdl","wsdl");
	else
	$soapclient = new nusoap_client($servico);
	
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