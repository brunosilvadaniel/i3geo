<?php
/*
Title: identifica.php

Fun��es utilizadas pelo editor das op��es de identifica��o

Essas op��es s�o utilizadas na ferramenta de identifica��o de elementos do mapa

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

i3geo/admin/php/identifica.php

Parametros:

O par�metro principal � "funcao", que define qual opera��o ser� executada, por exemplo, identifica.php?funcao=pegafuncoes

Cada opera��o possu� seus pr�prios par�metros, que devem ser enviados tamb�m na requisi��o da opera��o.

*/
include_once("admin.php");
error_reporting(0);
//faz a busca da fun��o que deve ser executada
switch (strtoupper($funcao))
{
	//verifica os editores
	case "VERIFICAEDITORES":
		retornaJSON(verificaEditores($editores));
		exit;
	break;
	/*
	Note:
	
	Valores que o par�metro &funcao pode receber. Os par�metros devem ser enviados na requisi��o em AJAX.
	*/
	/*
	Valor: PEGAFUNCOES
	
	Lista de opera��es cadastradas
	
	Retorno:
	
	{JSON}
	*/	
	case "PEGAFUNCOES":
		if(isset($id_i) && $id_i != "")
		{$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_identifica where id_i = $id_i ");}
		else
		{$dados = pegaDados('SELECT * from ".$esquemaadmin."i3geoadmin_identifica');}
		retornaJSON($dados);
		exit;
	break;
	/*
	Valor: ALTERARFUNCOES
	
	Altera uma opera��o cadastrada
	
	Parametros:
	
	id_i - id da op��o
	
	abrir_i
	
	nome_i
	
	target_i
	
	publicado_i
	
	Retorno:
	
	{JSON}
	*/	
	case "ALTERARFUNCOES":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		$novo = alterarFuncoes();
		$sql = "SELECT * from ".$esquemaadmin."i3geoadmin_identifica WHERE id_i = '".$novo."'";
		retornaJSON(pegaDados($sql));
		exit;
	break;
	/*
	Valor: EXCLUIR
	
	Exclui uma opera��o cadastrada
	
	Parametros:
	
	id - id da op��o

	Retorno:
	
	{JSON}
	*/	
	case "EXCLUIR":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		retornaJSON(excluirFuncoes());
		exit;
	break;
	
	case "IMPORTARXMLI":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		retornaJSON(importarXmlI());
		exit;;
	break;
}
/*
Altera o registro de um WS
*/
function alterarFuncoes()
{
	global $id_i,$abrir_i,$nome_i,$target_i,$publicado_i,$esquemaadmin;
	try 
	{
    	//$nome_i = mb_convert_encoding($nome_i,"UTF-8","ISO-8859-1");
    	require_once("conexao.php");
		if($convUTF)
		{
			$nome_i = utf8_encode($nome_i);
		}
    	if($id_i != "")
    	{
    		$dbhw->query("UPDATE ".$esquemaadmin."i3geoadmin_identifica SET publicado_i = '$publicado_i',nome_i = '$nome_i',abrir_i = '$abrir_i', target_i = '$target_i' WHERE id_i = $id_i");
    		$retorna = $id_i;
    	}
    	else
    	{
    		$idtemp = (rand (9000,10000)) * -1;
			$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_identifica (publicado_i,nome_i,abrir_i,target_i) VALUES ('','$idtemp','','')");
			$id_i = $dbh->query("SELECT id_i FROM ".$esquemaadmin."i3geoadmin_identifica WHERE nome_i = '$idtemp'");
			$id_i = $id_i->fetchAll();
			$id_i = $id_i[0]['id_i'];
			$dbhw->query("UPDATE ".$esquemaadmin."i3geoadmin_identifica SET nome_i = '' WHERE id_i = $id AND nome_i = '$idtemp'");
			$retorna = $id_i;
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
function excluirFuncoes()
{
	global $id,$esquemaadmin;
	try 
	{
    	include("conexao.php");
    	$dbhw->query("DELETE from ".$esquemaadmin."i3geoadmin_identifica WHERE id_i = $id");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
function importarXmlI()
{
	global $xml,$esquemaadmin;
	if(!file_exists($xml))
	{return "<br><b>Arquivo $xml n&atilde;o encontrado";}
	include_once("../../classesphp/funcoes_gerais.php");
	include("conexao.php");
	$xml = simplexml_load_file($xml);
	//
	//importa os grupos
	//
	$wsExistentes = array();
	$q = $dbh->query("select * from ".$esquemaadmin."i3geoadmin_identifica");
	$resultado = $q->fetchAll();
	foreach($resultado as $r)
	{$iExistentes[$r["nome_i"]] = 0;}
	foreach($xml->FUNCAO as $item)
	{
		$nome_i = html_entity_decode(ixml($item,"NOMESIS"));
		if($convUTF)
		{
			$nome_i = utf8_encode($nome_i);
		}
		$target_i = ixml($item,"TARGET");
		$abrir_i = ixml($item,"ABRIR");
		if(!isset($iExistentes[$nome_i]))
		$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_identifica (publicado_i,nome_i,target_i,abrir_i) VALUES ('','$nome_i','$target_i','$abrir_i')");
		$iExistentes[$nome_i] = 0;
	}
	$dbhw = null;
	$dbh = null;
	return "Dados importados.";
}

?>