<?php
/*
Title: Administra��o do ms_configura.php

Utilizado no sistema de administra��o do arquivo ms_configura.php

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

File: i3geo/admin/ms_configura.php

19/6/2007

*/
include_once("admin.php");
//faz a busca da fun��o que deve ser executada
switch ($funcao)
{
	//pega os par�metros do ms_configura
	case "pegaParametrosConfigura":
	$vs = array(
		"\$dir_tmp",
		"\$mensagemInicia",
		"\$tituloInstituicao",
		"\$locaplic",
		"\$temasdir",
		"\$temasaplic",
		"\$locmapserv",
		"\$locsistemas",
		"\$locidentifica",
		"\$locmapas",
		"\$R_path",
		"\$postgis_con",
		"\$srid_area",
		"\$postgis_mapa",
		"\$utilizacgi",
		"\$atlasxml",
		"\$expoeMapfile",
		"\$menutemas",
		"\$conexaoadmin"
	);
	$par = array();
	foreach ($vs as $v)
	{
		eval("\$s = $v;");
		if(is_array($s))
		{
			$par[$v] = $s;
		}
		else
		$par[$v] = $s;
	}
	retornaJSON($par);
	exit;
	break;
	//salva um novo valor para uma vari�vel do ms_configura
	case "salvaConfigura":
	salvaConfigura($variavel,$valor);
	retornaJSON("ok");
	exit;
	break;
}
/*
Function: salvaConfigura

Salva um novo valor de uma vari�vel no ms_configura.php

Parameters:

variavel - nome da vari�vel

valor - novo valor
*/
function salvaConfigura($variavel,$valor)
{
	$handle = fopen ("../../ms_configura.php", "r");
	$linhas = array();
	while (!feof ($handle)) {
    	$buffer = fgets($handle);
    	$temp = explode("=",$buffer);
    	$temp = trim($temp[0]);
    	if ($temp == $variavel)
     	$linhas[] = $variavel." = '".$valor."';\n";
     	else
     	$linhas[] = $buffer;
	}
	fclose ($handle);
	unlink("../../ms_configura.php");
	$handle = fopen ("../../ms_configura.php", "w");
	foreach ($linhas as $linha)
	{
		fwrite($handle, $linha);
	}
	fclose($handle);
}
?>