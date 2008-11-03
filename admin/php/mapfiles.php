<?php
/*
Title: Administra��o dos mapfiles principais

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

File: i3geo/admin/mapfiles.php

19/6/2007

*/
require_once("admin.php");
//faz a busca da fun��o que deve ser executada
switch ($funcao)
{
	//pega os par�metros do ms_configura
	case "pegaParametrosConfigura":
	$vs = array(
		"FONTSET ",
		"SYMBOLSET ",
		"SHAPEPATH ",
		"EXTENT ",
		"IMAGE ",
		"IMAGEPATH ",
		"IMAGEURL "
	);
	$par = array();
	foreach ($vs as $v)
	{
		$handle = fopen ($temasaplic."/".$mapfile.".map", "r");
		while (!feof ($handle)) {
    		$buffer = fgets($handle);
			if(!(stristr($buffer, $v) === FALSE))
			{
    			$temp = explode(trim($v),$buffer);
    			if(trim($temp[0]) != "#")
    			{
    				$temp = trim($temp[1]);
    				$par[trim($v)] = $temp;
    				fclose ($handle);
    				break;
    			}
  			}    		
		}
	}
	retornaJSON($par);
	exit;
	break;
	
	//retorna o mapfile atual como texto
	case "restauraConfigura":
	$cp->register('restauraConfigura');
	unlink($temasaplic."/".$mapfile.".map");
	copy ($temasaplic."/".$mapfile.".default",$temasaplic."/".$mapfile.".map");
	$cp->set_data("ok");
	$cp->return_data();
	break;
	
	//salva um novo valor para uma vari�vel do ms_configura
	case "salvaConfigura":
	salvaConfigura($variavel,$valor,$mapfile,$temasaplic);
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
function salvaConfigura($variavel,$valor,$mapfile,$temasaplic)
{
	$handle = fopen ($temasaplic."/".$mapfile.".map", "r");
	$linhas = array();
	$valor = str_replace("\\\"",'"',$valor);
	while (!feof ($handle)) {

    	$buffer = fgets($handle);
		if(!(stristr($buffer, $variavel) === FALSE))
		{
    		$temp = explode(trim($variavel),$buffer);
    		if(trim($temp[0]) != "#")
    		{
    			$temp = trim($temp[1]);
    			$par[trim($variavel)] = $temp;
    			$linhas[] = $variavel." ".$valor."\n";
    			$variavel = "______________";
    		}
    		else{$linhas[] = $buffer;}
  		}    		
		else
		$linhas[] = $buffer;
	}
	fclose ($handle);
	unlink($temasaplic."/".$mapfile.".map");
	$handle = fopen ($temasaplic."/".$mapfile.".map", "w");
	foreach ($linhas as $linha)
	{
		fwrite($handle, $linha);
	}
	fclose($handle);
}

?>