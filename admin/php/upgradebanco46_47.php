<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="../html/admin.css">
</head>
<body class="yui-skin-sam fundoPonto" >
<div class="bordaSuperior"  >&nbsp;</div>
<div class="mascaraPrincipal" id="divGeral" style=text-align:left >
Upgrade do banco de administra��o<br><br>
<?php
/*
Title: upgradebanco45_47.php

Adiciona as novas tabelas utilizadas na vers�o 4.7

Se vc quiser recriar o banco de dados default, apague o arquivo
i3geo/admin/admin.db ou fa�a uma c�pia. Depois � s� executar o programa i3geo/admin/php/criabanco.php.

Se a configura��o do arquivo de conex�o foi alterada (veja ms_configura.php), o novo
banco ir� ser criado conforme a nova string de conex�o.

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

i3geo/admin/php/criabanco.php
*/
$funcao = "";
include_once("admin.php");
include_once("conexao.php");

if(empty($_POST["senha"]) || empty($_POST["usuario"])){
	formularioLoginMaster("upgradebanco46_47.php");
	exit;
}
else{
	$continua = verificaMaster($_POST["usuario"],$_POST["senha"],$i3geomaster);
	if($continua == false){
		echo "Usu�rio n�o registrado em i3geo/ms_configura.php na vari�vel i3geomaster";
		exit;
	}
}
error_reporting(E_ALL);
$tabelas = array(
"CREATE TABLE ".$esquemaadmin."i3geoadmin_usuarios (ativo NUMERIC, data_cadastro TEXT, email TEXT, id_usuario INTEGER PRIMARY KEY, login TEXT, nome_usuario TEXT, senha TEXT)",
"CREATE TABLE ".$esquemaadmin."i3geoadmin_papelusuario (papel_id NUMERIC, usuario_id NUMERIC)",
"CREATE TABLE ".$esquemaadmin."i3geoadmin_papeis (descricao TEXT, id_papel INTEGER PRIMARY KEY, nome TEXT)"
);
foreach($tabelas as $tabela)
{
	if($dbhw->getAttribute(PDO::ATTR_DRIVER_NAME) == "pgsql")
	{
		$tabela = str_replace("INTEGER PRIMARY KEY","SERIAL PRIMARY KEY NOT NULL",$tabela);
	}
	$q = $dbhw->query($tabela);
   	if($q)
   	{
		$banco = null;
		echo "<br>Feito!!!<pre>";
		var_dump($tabelas);
   	}
   	else
   	{
		echo "<pre>Ocorreu algum problema. Tabelas que deveriam ter sido criadas:\n";
		var_dump($tabelas);
		$e = $dbhw->errorInfo();
		throw new Exception($e[2]);
   	}
}
$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_papeis VALUES('Podem executar qualquer tarefa, inclusive cadastrar novos administradores',1,'admin')");
$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_papeis VALUES('Podem criar/editar qualquer tema (mapfile) mas n�o podem editar a �rvore do cat�logo de temas',2,'editores')");
$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_papeis VALUES('Podem alterar a �rvore do cat�logo e dos atlas',3,'publicadores')");
$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_usuarios VALUES(1,'','',1,'admin','admin','admin')");
$dbhw->query("INSERT INTO ".$esquemaadmin."i3geoadmin_papelusuario VALUES(1,1)");
?>
</div>