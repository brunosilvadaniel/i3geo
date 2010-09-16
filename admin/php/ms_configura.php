<?php
/*
Title: ms_configura.php

Fun��es utilizadas pelo editor do arquivo ms_configura

ms_configura.php cont�m uma s�rie de vari�veis de configura��o do i3Geo.

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

Arquivo:

i3geo/admin/php/ms_configura.php

Parametros:

O par�metro principal � "funcao", que define qual opera��o ser� executada, por exemplo, ms_configura.php?funcao=PEGAPARAMETROSCONFIGURA

Cada opera��o possu� seus pr�prios par�metros, que devem ser enviados tamb�m na requisi��o da opera��o.

*/
include_once("admin.php");
if(verificaEditores($editores) == "nao")
{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}

//faz a busca da fun��o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	Note:
	
	Valores que o par�metro &funcao pode receber. Os par�metros devem ser enviados na requisi��o em AJAX.
	*/
	/*
	Valor: PEGAPARAMETROSCONFIGURA
	
	Lista os valores atuais das vari�veis registradas no ms_configura
	
	Retorno:
	
	{JSON}
	*/
	case "PEGAPARAMETROSCONFIGURA":
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
			"\$conexaoadmin",
			"\$googleApiKey",
			"\$interfacePadrao"
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
			$par[$v] = utf8_encode($s);
		}
		retornaJSON($par);
		exit;
	break;
	/*
	Valor: SALVACONFIGURA
	
	Salva um novo valor de uma vari�vel no ms_configura.php

	Parameters:

	variavel - nome da vari�vel

	valor - novo valor
	
	Retorno:
	
	{JSON}
	*/
	case "SALVACONFIGURA":
		salvaConfigura($variavel,$valor);
		retornaJSON("ok");
	exit;
	break;
}
/*
Salva um novo valor de uma vari�vel no ms_configura.php
*/
function salvaConfigura($variavel,$valor)
{
	//$valor = resolveAcentos($valor,"html");
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