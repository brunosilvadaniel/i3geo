<?php
/*
Title: Arvore

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

File: i3geo/admin/arvore.php

19/6/2007

*/
require_once("admin.php");
$cp = new cpaint();
//faz a busca da fun��o que deve ser executada
switch ($funcao)
{
	//verifica os editores
	case "verificaEditores":
	$cp->set_data(verificaEditores($editores));
	$cp->return_data();
	break;
	case "pegaTemasRaiz":
	$cp->set_data(pegaDados("select * from i3geoadmin_raiz LEFT JOIN i3geoadmin_temas ON i3geoadmin_raiz.id_tema = i3geoadmin_temas.id_tema"));
	$cp->return_data();
	break;
	case "pegaN1":
	$cp->set_data(pegaDados("select * from i3geoadmin_n1 where id_menu=$menu"));
	$cp->return_data();
	break;
	case "alterarRaiz":
	alterarRaiz();
	$cp->set_data(pegaDados("select * from i3geoadmin_raiz LEFT JOIN i3geoadmin_temas ON i3geoadmin_raiz.id_tema = i3geoadmin_temas.id_tema"));	
	$cp->return_data();
	break;	
	case "alteraN1":
	$cp->set_data(alteraN1());
	$cp->return_data();
	break;
	case "alteraN2":
	$cp->set_data(alteraN2());
	$cp->return_data();
	break;
	case "alteraN3":
	$cp->set_data(alteraN3());
	$cp->return_data();
	break;
	case "pegaN2":
	$cp->set_data(pegaDados("select * from i3geoadmin_n2 where id_n1=$idn1"));
	$cp->return_data();
	break;
	case "pegaN3":
	$cp->set_data(pegaDados("select * from i3geoadmin_n3 where id_n2=$idn2"));
	$cp->return_data();
	break;
	case "excluir";
	if($tabela != "i3geoadmin_raiz")
	{
		$f = verificaFilhos();
		if(!$f)
		$cp->set_data(exclui());
		else
		$cp->set_data("erro");
	}
	else
	{
		exclui();
		$cp->set_data(pegaDados("select * from i3geoadmin_raiz LEFT JOIN i3geoadmin_temas ON i3geoadmin_raiz.id_tema = i3geoadmin_temas.id_tema"));
	}
	$cp->return_data();
	break;
}
/*
Function: alteraN3

Altera o registro de um n�vel 3 (temas)
*/
function alteraN3()
{
	global $perfil,$id,$idtema,$idsubgrupo;
	try 
	{
    	require_once("conexao.php");
    	if($id != "")
    	$dbhw->query("UPDATE i3geoadmin_n3 SET id_tema = '$idtema', n3_perfil = '$perfil' WHERE id_n3 = $id");
    	else
    	$dbhw->query("INSERT INTO i3geoadmin_n3 (id_n2,id_tema,n3_perfil) VALUES ($idsubgrupo,'', '')");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
/*
Function: alteraN2

Altera o registro de um n�vel 2
*/
function alteraN2()
{
	global $perfil,$id,$idsubgrupo,$idgrupo;
	try 
	{
    	require_once("conexao.php");
    	if($id != "")
    	$dbhw->query("UPDATE i3geoadmin_n2 SET id_subgrupo = '$idsubgrupo', n2_perfil = '$perfil' WHERE id_n2 = $id");
    	else
    	$dbhw->query("INSERT INTO i3geoadmin_n2 (id_n1,id_subgrupo,n2_perfil) VALUES ($idgrupo,'', '')");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
/*
Function: alteraN1

Altera o registro de um n�vel 1
*/
function alteraN1()
{
	global $perfil,$idgrupo,$id,$idmenu;
	try 
	{
    	require_once("conexao.php");
    	if($id != "")
    	$dbhw->query("UPDATE i3geoadmin_n1 SET id_grupo = '$idgrupo', n1_perfil = '$perfil' WHERE id_menu = $idmenu and id_n1 = $id");
    	else
    	$dbhw->query("INSERT INTO i3geoadmin_n1 (id_menu,id_grupo,n1_perfil) VALUES ($idmenu,'', '')");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
/*
Function: alterarRaiz

Altera o registro na raiz de um n�vel
*/
function alterarRaiz()
{
	global $id_nivel,$nivel,$id_raiz,$id_menu,$perfil,$id_tema;
	try 
	{
    	include("conexao.php");
    	if($id_raiz != "")
    	$dbhw->query("UPDATE i3geoadmin_raiz SET id_nivel = '$nivel', nivel = '$nivel', perfil = '$perfil', id_menu = '$id_menu', id_tema = '$id_tema'  WHERE id_raiz = $id_raiz");
    	else
    	$dbhw->query("INSERT INTO i3geoadmin_raiz (id_nivel,nivel,id_menu,perfil,id_tema) VALUES ($id_nivel,$nivel,$id_menu,'','')");
    	$dbhw = null;
    	$dbh = null;
    	return "ok";
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}

?>