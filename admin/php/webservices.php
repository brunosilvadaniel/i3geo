<?php
/*
Title: webservices.php

Fun��es utilizadas pelo editor do cadastro de Web Services

� utilizado nas fun��es em AJAX da interface de edi��o

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

i3geo/admin/php/webservices.php

Parametros:

O par�metro principal � "funcao", que define qual opera��o ser� executada, por exemplo, webservices.php?funcao=pegaws

Cada opera��o possu� seus pr�prios par�metros, que devem ser enviados tamb�m na requisi��o da opera��o.

*/
error_reporting(0);
//
//n�o sei pq mas ob_start e clean s�o necess�rios no Linux para n�o gerar erro indesejado
//
ob_start();
include_once("admin.php");
ob_clean();
//faz a busca da fun��o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	Note:
	
	Valores que o par�metro &funcao pode receber. Os par�metros devem ser enviados na requisi��o em AJAX.
	*/
	/*
	Valor: PEGAWS
	
	Lista de servi�os cadastrados
	
	Retorno:
	
	{JSON}
	*/
	case "PEGAWS":
		if(isset($tipows) && $tipows != "")
		{$sql = "SELECT id_ws,nome_ws,tipo_ws from i3geoadmin_ws where tipo_ws = '".strtoupper($tipows)."' order by tipo_ws,nome_ws ";}
		else
		{$sql = "SELECT id_ws,nome_ws,tipo_ws from i3geoadmin_ws order by tipo_ws,nome_ws";}
		retornaJSON(pegaDados($sql));
		exit;
	break;
	/*
	Valor: PEGADADOS
	
	Dados de um servico
	
	Parametro:
	
	id_ws {string}
	
	Retorno:
	
	{JSON}
	*/	
	case "PEGADADOS":
		retornaJSON(pegaDados("SELECT * from i3geoadmin_ws where id_ws='$id_ws'"));
		exit;
	break;
	/*
	Valor: ALTERARWS
	
	Altera um registro
	
	Parametros:
	
	id_ws
	
	desc_ws
	
	nome_ws
	
	link_ws
	
	autor_ws
	
	tipo_ws
	
	Retorno:
	
	{JSON}
	*/	
	case "ALTERARWS":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		$novo = alterarWS();
		$sql = "SELECT * from i3geoadmin_ws WHERE id_ws = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
	break;
	/*
	Valor: EXCLUIR
	
	Exclui um registro
	
	Parametro:
	
	id {string}
	
	Retorno:
	
	{JSON}
	*/		
	case "EXCLUIR":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		retornaJSON(excluirWS());
		exit;
	break;
	
	case "IMPORTARXMLWS":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		retornaJSON(importarXmlWS());
		exit;
	break;
}
/*
Altera o registro de um WS
*/
function alterarWS()
{
	global $id_ws,$desc_ws,$nome_ws,$link_ws,$autor_ws,$tipo_ws;
	try 
	{
    	require_once("conexao.php");
		if($convUTF)
		{
			$nome_ws = utf8_encode($nome_ws);
			$desc_ws = utf8_encode($desc_ws);
			$autor_ws = utf8_encode($autor_ws);
		}
    	if($id_ws != "")
    	{
    		$dbhw->query("UPDATE i3geoadmin_ws SET desc_ws = '$desc_ws',nome_ws = '$nome_ws', link_ws = '$link_ws', autor_ws = '$autor_ws', tipo_ws = '$tipo_ws' WHERE id_ws = $id_ws");
    		$retorna = $id_ws;
    	}
    	else
    	{
    		$idtemp = (rand (9000,10000)) * -1;
			$dbhw->query("INSERT INTO i3geoadmin_ws (nome_ws,desc_ws,autor_ws,tipo_ws,link_ws,nacessos,nacessosok) VALUES ('$idtemp','','','','',0,0)");
			$id = $dbh->query("SELECT id_ws FROM i3geoadmin_ws WHERE nome_ws = '$idtemp'");
			$id = $id->fetchAll();
			$id = $id[0]['id_ws']);
			$dbhw->query("UPDATE i3geoadmin_ws SET nome_ws = '' WHERE id_ws = $id AND nome_ws = '$idtemp'");
			$retorna = $id;
    	}
    	$dbhw = null;
    	$dbh = null;
    	return $retorna;
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
function excluirWS()
{
	global $id;
	try 
	{
    	include("conexao.php");
    	$dbhw->query("DELETE from i3geoadmin_ws WHERE id_ws = $id");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
function adicionaAcesso($id_ws,$sucesso)
{
	try
	{
    	if($id_ws == ""){return;}
    	include("conexao.php");
    	$dados = pegaDados("select * from i3geoadmin_ws WHERE id_ws = $id_ws");
    	if(count($dados) == 0){return;};
    	if($dados[0]["nacessos"] == ""){$dados[0]["nacessos"] = 0;}
    	$acessos = $dados[0]["nacessos"] + 1;
    	
    	if($sucesso)
    	$ok = $dados[0]["nacessosok"] + 1;
    	else
    	$ok = $dados[0]["nacessosok"];
    	
    	if($ok == ""){$ok = 0;}
   		$dbhw->query("UPDATE i3geoadmin_ws SET nacessos = '$acessos',nacessosok = '$ok' WHERE id_ws = $id_ws");
    	$dbhw = null;
    	$dbh = null;
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
function importarXmlWS()
{
	global $xml,$tipo;
	set_time_limit(180);
	if(!file_exists($xml))
	{return "<br><b>Arquivo $xml n&atilde;o encontrado";}
	include_once("../../classesphp/funcoes_gerais.php");
	include("conexao.php");
	$xml = simplexml_load_file($xml);
	//
	//importa os grupos
	//
	$wsExistentes = array();
	$q = $dbh->query("select * from i3geoadmin_ws");
	$resultado = $q->fetchAll();
	foreach($resultado as $r)
	{$wsExistentes[$r["nome_ws"]] = 0;}
	foreach($xml->channel as $c)
	{
		foreach($c->item as $item)
		{
			$desc = html_entity_decode(ixml($item,"description"));
			$nome = html_entity_decode(ixml($item,"title"));
			$autor = html_entity_decode(ixml($item,"author"));
			$link = ixml($item,"link");
			if($convUTF)
			{
				$nome = utf8_encode($nome);
				$desc = utf8_encode($desc);
				$autor = utf8_encode($autor);
			}
			if(!isset($wsExistentes[$nome]))
			$dbhw->query("INSERT INTO i3geoadmin_ws (nome_ws,desc_ws,autor_ws,link_ws,tipo_ws,nacessos,nacessosok) VALUES ('$nome','$desc','$autor','$link','$tipo',0,0)");
			$wsExistentes[$nome] = 0;
		}
	}
	$dbhw = null;
	$dbh = null;
	return "Dados importados.";
}
?>