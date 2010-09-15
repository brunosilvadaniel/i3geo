<?php
/*
Title: mapfiles.php

Fun��es utilizadas pelo editor dos mapfiles de inicializa��o

� utilizado nas fun��es em AJAX da interface de edi��o que permite alterar os mapfiles geral1.map ou geral1windows.map

O mapfile que deve ser editado � obtido por meio do programa <admin.php>

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

i3geo/admin/php/mapfiles.php

Parametros:

O par�metro principal � "funcao", que define qual opera��o ser� executada, por exemplo, arvore.php?funcao=pegaGrupos.

Cada opera��o possu� seus pr�prios par�metros, que devem ser enviados tamb�m na requisi��o da opera��o.

*/
require_once("admin.php");
//faz a busca da fun��o que deve ser executada
switch (strtoupper($funcao))
{
	/*
	Note:
	
	Valores que o par�metro &funcao pode receber. Os par�metros devem ser enviados na requisi��o em AJAX.
	*/
	/*
	Valor: PEGAPARAMETROSCONFIGURA
	
	Pega os par�metros principais de configura��o do mapfile
		
	Retorno:
	
	{JSON}
	*/
	case "PEGAPARAMETROSCONFIGURA":
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
	//depreciado
	case "RESTAURACONFIGURA":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		$cp->register('restauraConfigura');
		unlink($temasaplic."/".$mapfile.".map");
		copy ($temasaplic."/".$mapfile.".default",$temasaplic."/".$mapfile.".map");
		$cp->set_data("ok");
		$cp->return_data();
	break;
	/*
	Valor: SALVACONFIGURA
	
	Salva o valor de um par�metro no mapfile em edi��o
	
	Parametros:
	
	variavel
	
	valor
		
	Retorno:
	
	{JSON}
	*/
	case "SALVACONFIGURA":
		if(verificaEditores($editores) == "nao")
		{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
		salvaConfigura($variavel,$valor,$mapfile,$temasaplic);
		retornaJSON("ok");
		exit;
	break;
}
/*
Salva um novo valor de uma vari�vel no ms_configura.php
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