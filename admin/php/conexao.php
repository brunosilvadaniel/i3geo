<?php
/*
Title: Conex�o

Define a conex�o com o banco de dados com as tabelas de administra��o dos menus do i3geo.

Verifique se sua instala��o do PHP suporta o uso da biblioteca PDO com sqlite

Voc� pode alterar a conex�o PDO modificando a vari�vel de configuara��o $conexaoadmin no i3geo/ms_configura.php

Return:

$dbh - objeto PDO com a conex�o para leitura e escrita

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
if($conexaoadmin == "")
{
	$arquivosqlite = $locaplic."/menutemas/admin.db";
	if(!file_exists($arquivosqlite))
	{
		echo "O arquivo menutemas/admin.db n�o existe. Utilize i3geo/admin/criabanco.php para criar o banco de dados SQLITE.";
		exit;
	}
	$conAdmin = "sqlite:$arquivosqlite";
	$conAdminw = "sqlite:$arquivosqlite";
	try
	{
		//para escrita
		$dbhw = new PDO($conAdmin);
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