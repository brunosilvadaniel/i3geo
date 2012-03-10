<?php
/*
Title: mapas.php

Fun��es utilizadas pelo editor do cadastro de mapas (links).

� utilizado nas fun��es em AJAX da interface de edi��o dos links para mapas

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

i3geo/admin/php/mapas.php

Parametros:

O par�metro principal � "funcao", que define qual opera��o ser� executada, por exemplo, mapas.php?funcao=pegamapas.

Cada opera��o possu� seus pr�prios par�metros, que devem ser enviados tamb�m na requisi��o da opera��o.

*/
include_once("admin.php");
error_reporting(0);
//faz a busca da fun��o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	Note:
	
	Valores que o par�metro &funcao pode receber. Os par�metros devem ser enviados na requisi��o em AJAX.
	*/
	/*
	Valor: PEGAMAPAS
	
	Lista os links existentes
	
	Retorno:
	
	{JSON}
	*/
	case "PEGAMAPAS":
	retornaJSON(pegaDados('SELECT id_mapa,nome_mapa,ordem_mapa from i3geoadmin_mapas order by ordem_mapa'));
	exit;
	break;
	/*
	Valor: PEGADADOSMAPA
	
	Lista os dados de um link
	
	Parametro:
	
	id_mapa {string}
	
	Retorno:
	
	{JSON}
	*/
	case "PEGADADOSMAPA":
	$dadosMapa = pegaDados('SELECT * from i3geoadmin_mapas where id_mapa ='.$id_mapa);
	retornaJSON($dadosMapa);
	exit;
	break;
	/*
	Valor: ALTERARMAPA
	
	Altera os dados de um link
	
	Parametro:
	
	publicado_mapa
	
	ordem_mapa
	
	id_mapa
	
	desc_mapa
	
	ext_mapa
	
	imagem_mapa
	
	outros_mapa
	
	nome_mapa
	
	linkdireto_mapa
	
	temas_mapa
	
	ligados_mapa
	
	perfil_mapa
	
	Retorno:
	
	{JSON}
	*/
	case "ALTERARMAPA":
	if(verificaEditores($editores) == "nao")
	{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
	$novo = alterarMapa();
	$sql = "SELECT * from i3geoadmin_mapas WHERE id_mapa = '".$novo."'";
	retornaJSON(pegaDados($sql));
	exit;
	break;
	/*
	Valor: EXCLUIRMAPA
	
	Exclui um link
	
	Parametro:
	
	id {string}
	
	Retorno:
	
	{JSON}
	*/	
	case "EXCLUIRMAPA":
	if(verificaEditores($editores) == "nao")
	{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
	retornaJSON(excluirMapa());
	exit;
	break;
	
	case "IMPORTARXMLMAPAS":
	if(verificaEditores($editores) == "nao")
	{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
	retornaJSON(importarXmlMapas());
	exit;
	break;
}
/*
Altera o registro de um mapa
*/
function alterarMapa()
{
	global $publicado_mapa,$ordem_mapa,$id_mapa,$desc_mapa,$ext_mapa,$imagem_mapa,$outros_mapa,$nome_mapa,$linkdireto_mapa,$temas_mapa,$ligados_mapa,$perfil_mapa;
	try 
	{
    	require_once("conexao.php");
		if($convUTF)
		{
			$nome_mapa = utf8_encode($nome_mapa);
			$desc_mapa = utf8_encode($desc_mapa);
		}
    	$retorna = "";
    	if($id_mapa != "")
    	{
    		$dbhw->query("UPDATE i3geoadmin_mapas SET publicado_mapa='$publicado_mapa',ordem_mapa='$ordem_mapa',desc_mapa = '$desc_mapa',ext_mapa = '$ext_mapa',imagem_mapa = '$imagem_mapa',outros_mapa = '$outros_mapa',nome_mapa = '$nome_mapa', linkdireto_mapa = '$linkdireto_mapa',temas_mapa = '$temas_mapa',ligados_mapa = '$ligados_mapa',perfil_mapa = '$perfil_mapa' WHERE id_mapa = $id_mapa");
    		$retorna = $id_mapa;
    	}
    	else
    	{
    		$idtemp = (rand (9000,10000)) * -1;
			$dbhw->query("INSERT INTO i3geoadmin_mapas (publicado_mapa,ordem_mapa,perfil_mapa,desc_mapa,ext_mapa,imagem_mapa,linkdireto_mapa,outros_mapa,temas_mapa,ligados_mapa,nome_mapa) VALUES ('','','','','','','','','','','$id_temp')");
			$id = $dbh->query("SELECT * FROM i3geoadmin_mapas WHERE nome_mapa = '$id_temp'");
			$id = $id->fetchAll();
			$id = $id[0]['id_mapa'];
			$dbhw->query("UPDATE i3geoadmin_mapas SET nome_mapa = '' WHERE id_mapa = $id AND nome_mapa = '$idtemp'");
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
function excluirMapa()
{
	global $id;
	try 
	{
    	include("conexao.php");
    	$dbhw->query("DELETE from i3geoadmin_mapas WHERE id_mapa = $id");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
function importarXmlMapas()
{
	global $xml;
	if(!file_exists($xml))
	{return "<br><b>Arquivo $xml n&atilde;o encontrado";}
	include_once("../../classesphp/funcoes_gerais.php");
	include("conexao.php");
	$xml = simplexml_load_file($xml);
	//
	//importa os grupos
	//
	$mapasExistentes = array();
	$q = $dbh->query("select * from i3geoadmin_mapas");
	$resultado = $q->fetchAll();
	foreach($resultado as $r)
	{$mapasExistentes[$r["nome_mapa"]] = 0;}
	$conta = 1;
	foreach($xml->MAPA as $mapa)
	{
		$perfil = ixml($mapa,"PERFIL");
		$descricao = html_entity_decode(ixml($mapa,"DESCRICAO"));
		$nome = html_entity_decode(ixml($mapa,"NOME"));
		if($convUTF)
		{
			$nome = utf8_encode($nome);
			$descricao = utf8_encode($descricao);
		}
		$imagem = ixml($mapa,"IMAGEM");
		$temas = ixml($mapa,"TEMAS");
		$ligados = ixml($mapa,"LIGADOS");
		$extensao = ixml($mapa,"EXTENSAO");
		$outros = ixml($mapa,"OUTROS");
		$linkdireto = ixml($mapa,"LINKDIRETO");
		if(!isset($mapasExistentes[$nome]))
		$dbhw->query("INSERT INTO i3geoadmin_mapas (publicado_mapa,perfil_mapa,desc_mapa,ext_mapa,imagem_mapa,linkdireto_mapa,nome_mapa,outros_mapa,temas_mapa,ligados_mapa,ordem_mapa) VALUES ('','$perfil','$descricao','$extensao','$imagem','$linkdireto','$nome','$outros','$temas','$ligados',$conta)");
		$mapasExistentes[$nome] = 0;
		$conta++;
	}
	$dbhw = null;
	$dbh = null;
	return "Dados importados.";
}
?>