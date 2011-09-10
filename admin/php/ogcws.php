<?php
/*
Title: ogcws.php

Fun��es utilizadas pelo editor do arquivo ogcws.map

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

i3geo/admin/php/ogcws.php

Parametros:

O par�metro principal � "funcao", que define qual opera��o ser� executada, por exemplo, ms_configura.php?funcao=PEGAPARAMETROSCONFIGURA

Cada opera��o possu� seus pr�prios par�metros, que devem ser enviados tamb�m na requisi��o da opera��o.

*/
include_once("admin.php");
if(verificaEditores($editores) == "nao")
{echo "Vc nao e um editor cadastrado. Apenas os editores definidos em i3geo/ms_configura.php podem acessar o sistema de administracao.";exit;}
//error_reporting(E_ALL);
$versao = versao();
$map_file = $locaplic."/aplicmap/ogcwsv".$versao["principal"].".map";

$mapa = ms_newMapObj($map_file);
$web = $mapa->web;
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
			"ows_abstract",
			"ows_keywordlist",
			"ows_fees",
			"ows_accessconstraints",
			"ows_contactperson",
			"ows_contactorganization",
			"ows_contactposition",
			"ows_addresstype",
			"ows_address",
			"ows_city",
			"ows_stateorprovince",
			"ows_postcode",
			"ows_country",
			"ows_contactelectronicmailaddress",
			"ows_name"			
		);
		$par = array();
		foreach ($vs as $v)
		{
			$par[$v] = utf8_encode($web->metadata->get($v));
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
		$web->metadata->set($variavel,$valor);
		$mapa->save($map_file);
		retornaJSON("ok");
	exit;
	break;
}

?>