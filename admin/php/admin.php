<?php
/*
Title: Fun��es gerais

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

File: i3geo/admin/mapfiles.php

19/6/2007

*/
if(!isset($locaplic))
{
	$locaplic = "";
	if(file_exists("../../../ms_configura.php"))
	{include_once("../../../ms_configura.php");}
	else
	{
		if(file_exists("../../ms_configura.php"))
		{include_once("../../ms_configura.php");}
		else
		{
			if(file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			include_once("ms_configura.php");
		}	
	}
}
include_once($locaplic."/classesphp/pega_variaveis.php");

error_reporting(0);
/*
session_name("i3GeoPHP");
if (isset($g_sid))
{session_id($g_sid);}
session_start();
foreach(array_keys($_SESSION) as $k)
{
	eval("\$".$k."='".$_SESSION[$k]."';");
}
*/
//
//carrega o phpmapscript
//
include_once ($locaplic."/classesphp/carrega_ext.php");
include_once($locaplic."/pacotes/cpaint/cpaint2.inc.php");
set_time_limit(120);
//
//verifica se o cliente pode editar
//se funcao for verificaEditores vai para case espec�fico
//
if($funcao !="verificaEditores")
{if(verificaEditores($editores) == "nao"){exit;}}
if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
{
	$mapfile = "geral1windows";
}
else
{
	$mapfile = "geral1";
}
if($funcao == "limpar")
{
	$tabelas = array("i3geoadmin_atlas","i3geoadmin_atlasp","i3geoadmin_atlast","i3geoadmin_grupos","i3geoadmin_identifica","i3geoadmin_mapas","i3geoadmin_menus","i3geoadmin_n1","i3geoadmin_n2","i3geoadmin_n3","i3geoadmin_raiz","i3geoadmin_sistemas","i3geoadmin_sistemasf","i3geoadmin_subgrupos","i3geoadmin_tags","i3geoadmin_temas","i3geoadmin_ws");
	include("conexao.php");
	foreach($tabelas as $t)
	{
    	$dbh->query("DELETE from $t");
	}
    $dbh = null;
    exit;
}
function verificaDuplicados($sql,$dbh)
{
	$res = $dbh->query($sql,PDO::FETCH_ASSOC);
	if(count($res->fetchAll())>0)
	return true;
	else
	return false;
}
/*
Function: verificaEditores

Verifica se o usu�rio atual est� cadastrado como editor

Parameters:

editores - array com a lista de editores obtido do ms_configura.php

Return:

string - sim|nao
*/
function verificaEditores($editores)
{
	$editor = "nao";
	foreach ($editores as $e)
	{
		$e = gethostbyname($e);
		$ip = "UNKNOWN";
		if (getenv("HTTP_CLIENT_IP")) $ip = getenv("HTTP_CLIENT_IP");
		else if(getenv("HTTP_X_FORWARDED_FOR")) $ip = getenv("HTTP_X_FORWARDED_FOR");
		else if(getenv("REMOTE_ADDR")) $ip = getenv("REMOTE_ADDR");
		else $ip = "UNKNOWN";
		if ($e == $ip){$editor="sim";}
	}
	return $editor;
}
/*
Function: exclui

Exlcui um registro de uma tabela
*/
function exclui()
{
	global $tabela,$coluna,$id;
	try 
	{
    	include("conexao.php");
    	$dbh->query("DELETE from $tabela WHERE $coluna = $id");
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
/*
Function: pegaDados

Executa um sql de busca de dados
*/
function pegaDados($sql)
{
	try 
	{
    	$resultado = array();
    	include("conexao.php");
    	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
    	$resultado = $q->fetchAll();
    	$dbh = null;
    	return $resultado;
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}

?>