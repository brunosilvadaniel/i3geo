<?php
/*
Title: Fun��es de uso geral

Fun��es utilizadas por outros programas do sistema de administra��o.

No in�cio do programa � feita a inclus�o do i3geo/ms_configura.php e i3geo/classesphp/funcoes_gerais.php

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
i3geo/testamapfile.php

Arquivo:

i3geo/admin/php/admin.php
*/

if(!isset($locaplic))
{
	$locaplic = "";
	include(__DIR__."/../../ms_configura.php");
}
include_once($locaplic."/classesphp/pega_variaveis.php");
error_reporting(0);
//
//carrega o phpmapscript
//
include_once ($locaplic."/classesphp/carrega_ext.php");
include_once ($locaplic."/classesphp/funcoes_gerais.php");

$mapfile = mapfilebase($base,$locaplic);
//
//processa a variavel $esquemaadmin definida em ms_configura.php
//essa variavel precisa ter um . no final quando nao for vazia, evitando erros na inclusao dentro dos SQLs
//
if(!empty($esquemaadmin)){
	$esquemaadmin = $esquemaadmin.".";
}

/*
Function: retornaJSON

Converte um array em um objeto do tipo JSON utilizando a biblioteca CPAINT

Parametro:

obj {array}

Retorno:

Imprime na saída a string JSON
*/
function retornaJSON($obj)
{
	global $locaplic;
	//if(function_exists("json_encode"))
	//{echojson(json_encode($obj));}
	//else
	//{
		include_once($locaplic."/pacotes/cpaint/JSON/json2.php");
		error_reporting(0);
		$j = new Services_JSON();
		$texto = $j->encode($obj);
		if (!mb_detect_encoding($texto,"UTF-8",true))
		$texto = utf8_encode($texto);
		echo $texto;
	//}
/*
	include_once($locaplic."/pacotes/cpaint/JSON/json2.php");
	error_reporting(0);
	$j = new Services_JSON();
	$texto = $j->encode($obj);
	if (!mb_detect_encoding($texto,"UTF-8",true))
	$texto = utf8_encode($texto);
	header("Content-type: text/ascii; charset=UTF-8");
	header('Expires: Fri, 14 Mar 1980 20:53:00 GMT');
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
	header('Cache-Control: no-cache, must-revalidate');
	header('Pragma: no-cache');
	echo $texto;
	exit;
*/
}
/*
Function: verificaDuplicados

Verifica se o resultado de um SQL retoena mais de um registro

Parametros:

sql {string} - sql que será executado

dbh {PDO} - objeto PDO de conexão com o banco

Retorno:

{boolean}
*/
function verificaDuplicados($sql,$dbh)
{
	$res = $dbh->query($sql,PDO::FETCH_ASSOC);
	if(count($res->fetchAll())>0)
	return true;
	else
	return false;
}
/*
Function: exclui

Exlcui um registro de uma tabela do banco de dados de administração

Utiliza variáveis globais para fazer a consulta ao banco

Globals:

tabela - nome da tabela

coluna - nome da coluna

id - valor
*/
function exclui()
{
	global $tabela,$coluna,$id,$esquemaadmin;
	try 
	{
    	include("conexao.php");
    	$tabela = $esquemaadmin.$tabela;
    	$dbhw->query("DELETE from $tabela WHERE $coluna = $id");
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
Function: pegaDados

Executa um sql de busca de dados

Parametros:

sql {string} - sql que será executado

locaplic {string} - endereço do i3Geo no sistema de arquivos

Retorno:

Array originada de fetchAll
*/
function pegaDados($sql,$locaplic="")
{
	$resultado = array();    	if(!empty($esquemaadmin)){
    		$esquemaadmin = $esquemaadmin.".";
    	}
   	if($locaplic == "")
   	include("conexao.php");
   	else
   	include("$locaplic/admin/php/conexao.php");
   	error_reporting(E_ALL);
   	$q = $dbh->query($sql,PDO::FETCH_ASSOC);
   	if($q)
   	{
   		$resultado = $q->fetchAll();
   		$dbh = null;
   		$dbhw = null;
   		return $resultado;
   	}
   	else
   	{
		$e = $dbh->errorInfo();
		//$e1 = $dbhw->errorInfo();
   		$dbh = null;
   		$dbhw = null;    	
		//echo " erro: ".$e[2];
		throw new Exception(" erro admin.php funcao pegaDados: <br><span style=color:red >".$e[2]."<br><span style=color:green >");
   	}
}
/*
Function: verificaFilhos

Verifica se o pai tem filhos nos componentes hierárquicos do banco de administração

Por exemplo, pode-se verificar se um grupo possuí subgrupos, indicando-se como tabela i3geoadmin_grupos e o id do grupo

Variáveis globais:

tabela {string} - tabela do banco de dados

id {string} - valor a ser procurado

Retorno:

{booleano}
*/
function verificaFilhos()
{
	global $tabela,$id,$esquemaadmin;
	try 
	{
    	$res = false;
    	if($tabela == "i3geoadmin_n2")
    	{
    		$r = pegaDados("select * from ".$esquemaadmin."i3geoadmin_n3 where id_n2=$id");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_n1")
    	{
    		$r = pegaDados("select * from ".$esquemaadmin."i3geoadmin_n2 where id_n1=$id");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_menus")
    	{
    		$r = pegaDados("select * from ".$esquemaadmin."i3geoadmin_n1 where id_menu=$id");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_grupos")
    	{
    		$r = pegaDados("select n1.id_grupo from ".$esquemaadmin."i3geoadmin_n1 as n1, i3geoadmin_n2 as n2 where n1.id_n1 = n2.id_n1 and n1.id_grupo = '$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_subgrupos")
    	{
    		$r = pegaDados("select n2.id_subgrupo from ".$esquemaadmin."i3geoadmin_n3 as n3, i3geoadmin_n2 as n2 where n2.id_n2 = n3.id_n3 and n2.id_subgrupo = '$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_temas")
    	{
    		$r = pegaDados("select id_tema from ".$esquemaadmin."i3geoadmin_n3 where id_tema = '$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_sistemas")
    	{
    		$r = pegaDados("SELECT id_sistema from ".$esquemaadmin."i3geoadmin_sistemasf where id_sistema ='$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_atlas")
    	{
    		$r = pegaDados("SELECT id_atlas from ".$esquemaadmin."i3geoadmin_atlasp where id_atlas ='$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_atlasp")
    	{
    		$r = pegaDados("SELECT id_prancha from ".$esquemaadmin."i3geoadmin_atlast where id_prancha ='$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_n2")
    	{
    		$r = pegaDados("SELECT id_n3 from ".$esquemaadmin."i3geoadmin_n3 where id_n2 ='$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "i3geoadmin_n1")
    	{
    		$r = pegaDados("SELECT id_n2 from ".$esquemaadmin."i3geoadmin_n2 where id_n1 ='$id'");
    		if(count($r) > 0)
    		$res = true;
    		$r = pegaDados("SELECT id_raiz from ".$esquemaadmin."i3geoadmin_raiz where nivel='1' and id_nivel ='$id'");
    		if(count($r) > 0)
    		$res = true;
    	}
    	if($tabela == "mapfiles")
    	{
    		$r = pegaDados("SELECT id_tema from ".$esquemaadmin."i3geoadmin_n3 where id_tema ='$id'");
    		if(count($r) > 0)
   			$res = true;
    	}
    	return $res;
	}
	catch (PDOException $e)
	{
    	return "Error!: " . $e->getMessage();
	}
}
/*
Function: resolveAcentos

Converte uma string para uma codificação de caracteres determinada

Parametros:

palavra {string} - palavra a ser convertida

tipo {string} - ISO|UTF

Retorno:

{string}
*/
function resolveAcentos($palavra,$tipo)
{
	if($tipo == "ISO")
	{
		$palavra = mb_convert_encoding($palavra,"AUTO","ISO-8859-1");
	}
	if($tipo == "UTF")
	{
		$palavra = mb_convert_encoding($palavra,"AUTO","UTF-8");
	}
	if($tipo == "html")
	$palavra = htmlentities($palavra);
	if($tipo == "palno")
	$palavra = urldecode($palavra);
	return $palavra;
}
/*
Function: formularioLoginMaster

Mostra formul�rio para login quando � necess�rio o uso da vari�vel $i3geomaster cadastrada em ms_configura.php

Parametros:

action {string} - php que ser� executado no submit do formul�rio
*/
function formularioLoginMaster($action){
	echo "<form method=post action=$action >";
	echo "<br>Essa conex�o pode n�o ser segura e os dados de usu�rio/senha podem ser descobertos<br><br>";
	echo "Nome do usu�rio master cadastrado em ms_configura.php:<br> <input type=text name=usuario /><br>";
	echo "Senha:<br> <input type=password name=senha /><br>";
	echo "<br><input type=submit />";
}
/*
Function: verificaMaster

Verifica se um usu�rio e senha est� cadastrado no ms_configura

Parametros:

usuario {string}

senha {string}

i3geomaster {array} - vari�vel existente no ms_configura.php com o cadastro de usu�rios masters
*/
function verificaMaster($usuario,$senha,$i3geomaster){
	global $i3geomaster;
	foreach($i3geomaster as $teste){
		if(!empty($usuario) && !empty($senha) && $teste["usuario"] == $usuario && $teste["senha"] == $senha){
			return true;
		}
	}
	return false;
}
function mapfilebase($base,$locaplic){
	$versao = versao();
	$versao = $versao["principal"];
	if(isset($base) && $base != ""){
		if(file_exists($base))
		{$f = $base;}
		else
		{$f = $locaplic."/aplicmap/".$base.".map";}
	}
	else
	{
		$f = "";
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$f = $locaplic."/aplicmap/geral1windowsv".$versao.".map";}
		else
		{
			if($f == "" && file_exists('/var/www/i3geo/aplicmap/geral1debianv'.$versao.'.map')){
				$f = "/var/www/i3geo/aplicmap/geral1debianv".$versao.".map";
			}
			if($f == "" && file_exists('/var/www/html/i3geo/aplicmap/geral1fedorav'.$versao.'.map')){
				$f = "/var/www/html/i3geo/aplicmap/geral1fedorav".$versao.".map";
			}
			if($f == "" && file_exists('/opt/www/html/i3geo/aplicmap/geral1fedorav'.$versao.'.map')){
				$f = "/opt/www/html/i3geo/aplicmap/geral1v".$versao.".map";
			}
			if($f == "")
			{$f = $locaplic."/aplicmap/geral1v".$versao.".map";}
		}
	}
	return $f;
}
?>