<?php
/*
Title: A - Controle das requisi��es em Ajax feitas pela interface Atlas do i3geo

Recebe as requisi��es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

As principais vari�veis s�o obtidas da se��o, definida na inicializa��o do I3Geo. Se a vari�vel $map_file n�o for enviada, o retorno � uma mensagem linkquebrado e o fim do programa.

O par�metro "funcao" define qual a opera��o que ser� executada (veja exemplo abaixo). esse par�metro � verificado em um bloco "switch ($funcao)".

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

About: Par�metros

funcao - op��o que ser� executada.

Retorno:

cp - o resultado da opera��o ser� retornado em um objeto CPAINT.

Exemplo de chamada CPAINT (Ajax) do lado do cliente (javascript):

var p = "classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid

var cp = new cpaint()

cp.set_response_type("JSON")

cp.call(p,"lente",ajaxabrelente)

File: i3geo/classesphp/atlas_controle.php

19/6/2007

*/
error_reporting(0);
$tempo = microtime(1);
//
// quando as fun��es abaixo forem utilizadas, � necess�rio definir $map_file para que o programa continue.
//
//
//pega as variaveis passadas com get ou post
//
include_once("pega_variaveis.php");
if(isset($g_sid))
{
	session_name("i3GeoPHP");
	session_id($g_sid);
	session_start();
	foreach(array_keys($_SESSION) as $k)
	{
		eval("\$".$k."='".$_SESSION[$k]."';");
	}
}
if (($funcao == "pegaListaDeAtlas") || ($funcao == "criaAtlas"))
{$map_file = "";}

if (!isset($atlasxml) || $atlasxml == "")
{
	include_once("../ms_configura.php");
	$map_file = "";
}
//
//ativa o php mapscript e as extens�es necess�rias
//se as extens�es j� estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r�pido
//
include_once("carrega_ext.php");
include_once("../pacotes/cpaint/cpaint2.inc.php");

//
//cria objeto cpaint para uso com ajax
//
$cp = new cpaint();
$cp->set_data("");
//
//verifica se o usu�rio est� tentando utilizar um link que n�o funciona mais
//
if (!isset($map_file))
{
	//nesse caso � necess�rio criar o diret�rio tempor�rio e iniciar o mapa
	$cp->set_data("linkquebrado");
	$cp->return_data();
	exit;
}
include_once("classe_vermultilayer.php");
include_once("funcoes_gerais.php");
if ($map_file != "")
{
	//
	//copia o map_file atual com outro nome para restaurar caso ocorra algum problema
	//
	copiaSeguranca($map_file);
	//
	//substitui a string de conex�o
	//
	substituiCon($map_file,$postgis_mapa);
}
if($atlasxml == "")
{
	include($locaplic."/admin/php/xml.php");
	$xml = simplexml_load_string(geraXmlAtlas($locaplic));
}
else
$xml = simplexml_load_file($atlasxml);
//
//faz a busca da fun��o que deve ser executada
//
switch ($funcao)
{
/*
Property: pegaListaDeAtlas

Pega a lista de Atlas definida no arquivo xml menutemas/atlas.xml.
*/
	case "pegaListaDeAtlas":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml,$atlasxml);
		$resultado = $atl->pegaListaDeAtlas($tituloInstituicao);
		$cp->set_data($resultado);
	break;
/*
Property: criaAtlas

Abre um Atlas espec�fico, criando o mapa e chamando a interface desejada.

Esse programa � chamado diretamente, por exemplo, i3geo/classesphp/atlas_controle.php?atlasxml=&atlasId=

*/
	case "criaAtlas":
		include_once("classe_atlas.php");
		$atlasxmltemp = $atlasxml;
		$atl = new Atlas($xml,$atlasxml);
		$res = $atl->criaAtlas($atlasId_);
		$interface = $res["interface"];
		$base = $res["base"];
		if ($interface == "")
		{
			echo "Erro. Nenhuma interface definida para esse Atlas";
			exit;
		}
		if (!isset($caminho))
		{$caminho = "../";}
		//
		// a fun��o gravaId ser� executada no final do processo de gera��o do mapa (ver ms_criamapa.php)
		//
		$executa = "gravaId";
		include_once("../ms_criamapa.php");
		exit;
	break;
/*
Property: pegaListaDePranchas

Pega a lista de pranchas de um atlas espec�fico.

*/
	case "pegaListaDePranchas":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml,$atlasxml);
		$resultado = $atl->pegaListaDePranchas($atlasId);
		$cp->set_data($resultado);
	break;
/*
Property: abrePrancha

Ativa uma prancha do atlas.

*/
	case "abrePrancha":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml,$atlasxml);
		$resultado = $atl->abrePrancha($atlasId,$pranchaId,$map_file,$locaplic);
		$cp->set_data($resultado);
	break;

}

if (!connection_aborted())
{
	restauraCon($map_file,$postgis_mapa);
	$cp->return_data();
}
else
{exit();}
function gravaid()
{
	global $atlasId_,$tmpfname,$atlasxmltemp;//a variavel tmpfname vem do ms_criamapa.php
	$_SESSION["atlasId"] = $atlasId_;
	$_SESSION["utilizacgi"] = "nao";
	$_SESSION["atlasxml"] = $atlasxmltemp;
	$m = ms_newMapObj($tmpfname);
	$nomes = $m->getalllayernames();
	foreach($nomes as $n)
	{
		$l = $m->getlayerbyname($n);
		$l->setmetadata("ATLAS","nao");
		$l->setmetadata("TIP","");
	}
	$m->save($tmpfname);		
}
?>