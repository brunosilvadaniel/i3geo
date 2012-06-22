<?php
/*
Title: conexao.php

Define a conex�o com o banco de dados que cont�m as tabelas do sistema de administra��o do i3geo.

Verifique se sua instala��o do PHP suporta o uso da biblioteca PDO com sqlite

Por padr�o, a conex�o � feita com o banco de dados SQLITE i3geo/admin/admin.db mas vc pode usar outro banco de dados

Voc� pode alterar a conex�o PDO modificando a vari�vel de configuara��o $conexaoadmin no i3geo/ms_configura.php

O programa define duas vari�veis que s�o usadas no acesso ao banco

dbhw - objeto PDO com a conex�o para leitura e escrita

dbh - objeto PDO com a conex�o para leitura

Licen�a:

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

Arquivo: i3geo/admin/php/conexao.php

*/
if(isset($locaplic) && $locaplic != "")
{include($locaplic."/ms_configura.php");}
else
{
	if (file_exists("../../../ms_configura.php"))
	{include("../../../ms_configura.php");}
	else
	{
		if (file_exists("../../ms_configura.php"))
		{include("../../ms_configura.php");}
		else
		{
			if (file_exists("../ms_configura.php"))
			{include("../ms_configura.php");}
			else
			if (file_exists("ms_configura.php"))
			{include("ms_configura.php");}
		}
	}
}
if(!isset($conexaoadmin))
{$conexaoadmin = "";}
if(!isset($conexaoadmin))
{$esquemaadmin = "";}
//
//indica se deve ser feita a convers�o para UTF8 ao gravar os dados
//
$convUTF = true;

if($conexaoadmin == "")
{
	$arquivosqlite = $locaplic."/admin/admin.db";
	if(!file_exists($arquivosqlite))
	{
		echo "O arquivo admin.db n�o existe. Utilize i3geo/admin/criabanco.php para criar o banco de dados SQLITE.";
		exit;
	}
	$conAdmin = "sqlite:$arquivosqlite";
	$conAdminw = "sqlite:$arquivosqlite";
	if(!extension_loaded("PDO")){
		echo "A extensao do PHP 'PDO' nao esta instalada.";
	}
	try
	{
		//para escrita
		$dbhw = new PDO($conAdminw);
		//para leitura
		$dbh = new PDO($conAdmin);
	}
	catch (PDOException $e)
	{
    	print "Erro ao criar o objeto PDO!: " . $e->getMessage() . "<br/> Talvez exista alguma incompatibilidade entre o PHP e o banco admin.db. Vc pode apagar o arquivo menutemas/admin.db e recria-lo com admin/php/criasqlite.php";
    	die();
	}

}
else
include($conexaoadmin);

?>