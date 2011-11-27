<?php
/*
Title: atlas_controle.php

Controle das requisi��es em Ajax feitas pela interface Atlas do i3geo

A lista de atlas � definida no sistema de administra��o do i3Geo ou em um arquivo XML

Recebe as requisi��es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

As principais vari�veis s�o obtidas da se��o, definida na inicializa��o do I3Geo. Se a vari�vel $map_file n�o for enviada, o retorno � uma mensagem linkquebrado e o fim do programa.

O par�metro "funcao" define qual a opera��o que ser� executada (veja exemplo abaixo). esse par�metro � verificado em um bloco "switch ($funcao)".

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

i3geo/classesphp/atlas_controle.php

Parametros:

funcao {string} - op��o que ser� executada.

g_sid {string} - id da se��o PHP.

Retorno:

cp - o resultado da opera��o ser� retornado em um objeto CPAINT.

Vari�veis de Se��o:

dir_tmp - diret�rio, no servidor, tempor�rio utilizado pelo I3Geo, exemplo: c:/ms4w/tmp/ms_tmp
locmapserv - localiza��o, no servidor, do CGI, exemplo: /cgi-bin/mapserv.exe
locaplic - localiza��o, no servidor, do I3Geo, exemplo: c:/ms4w/apache/htdocs/i3geo
R_path - localiza��o, no servidor, do execut�vel do pacote R, exemplo: c:/ms4w/apache/htdocs/i3geo/pacotes/r/win/bin/R.exe
imgurl - url das imagens geradas pelo mapa, exemplo: http://localhost/ms_tmp/imgTVHbdijFMk/
tmpurl - url do diret�rio tempor�rio, exemplo: http://localhost/ms_tmp/
map_file - endere�o, no servidor, do mapfile atual, exemplo: c:/ms4w/tmp/ms_tmp/TVHbdijFMk/TVHbdijFMk.map
mapext - extens�o geogr�fica do mapa atual, exemplo: -76.5125927 -39.3925675209 -29.5851853 9.49014852081
perfil - nome do perfil para controlar os temas que ser�o vis�veis na lista de temas.
mapdir - localiza��o, no servidor, do diret�rio com o mapfile tempor�rio do mapa atual.
imgdir - localiza��o, no servidor, das imagens tempor�rias do mapa atual. 
debug - (pode ser definido como "sim" indica se o erro_reporting deve ser definido como E_ALL
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
	{eval("\$".$k."='".$_SESSION[$k]."';");}
	$postgis_mapa = $_SESSION["postgis_mapa"];
}
if (($funcao == "pegaListaDeAtlas") || ($funcao == "criaAtlas"))
{$map_file = "";}
//
//ativa o php mapscript e as extens�es necess�rias
//se as extens�es j� estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r�pido
//
include_once("carrega_ext.php");
include_once("funcoes_gerais.php");
//
//verifica se o usu�rio est� tentando utilizar um link que n�o funciona mais
//
if (!isset($map_file))
{
	cpjson(array("erro"=>"linkquebrado"));
	exit;
}
include_once("classe_vermultilayer.php");

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
if(!isset($locaplic))
{
	if(file_exists("../ms_configura.php"))
	{include_once("../ms_configura.php");}
	else
	{include_once("ms_configura.php");}
}
include($locaplic."/admin/php/xml.php");
$xml = simplexml_load_string(geraXmlAtlas($locaplic,$editores));
//
//faz a busca da fun��o que deve ser executada
//
switch (strtoupper($funcao))
{
/*
Valor: PEGALISTADEATLAS

Pega a lista de Atlas definida no arquivo xml menutemas/atlas.xml.

<pegaListaDeAtlas()>
*/
	case "PEGALISTADEATLAS":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml);
		$retorno = $atl->pegaListaDeAtlas($tituloInstituicao);
	break;
/*
Valor: CRIAATLAS

Abre um Atlas espec�fico, criando o mapa e chamando a interface desejada.

Esse programa � chamado diretamente, por exemplo, i3geo/classesphp/atlas_controle.php?&atlasId=

<criaAtlas()>
*/
	case "CRIAATLAS":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml);
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
		$temasa = "";
		include_once("../ms_criamapa.php");
		exit;
	break;
/*
Valor: PEGALISTADEPRANCHAS

Pega a lista de pranchas de um atlas espec�fico.

<pegaListaDePranchas()>
*/
	case "PEGALISTADEPRANCHAS":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml);
		$retorno = $atl->pegaListaDePranchas($atlasId);
	break;
/*
Valor: ABREPRANCHA

Ativa uma prancha do atlas.

<abrePrancha()>
*/
	case "ABREPRANCHA":
		include_once("classe_atlas.php");
		$atl = new Atlas($xml);
		$retorno = $atl->abrePrancha($atlasId,$pranchaId,$map_file,$locaplic);
	break;
}

if (!connection_aborted())
{
	if ($map_file != "")
	{
		restauraCon($map_file,$postgis_mapa);
	}
	cpjson($retorno);
}
else
{exit();}
function gravaid()
{
	global $atlasId_,$tmpfname;//a variavel tmpfname vem do ms_criamapa.php
	$_SESSION["atlasId"] = $atlasId_;
	$_SESSION["utilizacgi"] = "nao";
	$m = ms_newMapObj($tmpfname);
	$c = $m->numlayers;
	for ($i=0;$i < $c;++$i)
	{
		$l = $m->getlayer($i);
		$l->setmetadata("ATLAS","nao");
		$l->setmetadata("TIP","");
	}
	$m->save($tmpfname);		
}
?>