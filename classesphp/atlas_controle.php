<?php
/*
Title: A - Controle das requisi��es em Ajax feitas pela interface Atlas do i3geo

Recebe as requisi��es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

As principais vari�veis s�o obtidas da se��o, definida na inicializa��o do I3Geo. Se a vari�vel $map_file n�o for enviada, o retorno � uma mensagem linkquebrado e o fim do programa.

O par�metro "funcao" define qual a opera��o que ser� executada (veja exemplo abaixo). esse par�metro � verificado em um bloco "switch ($funcao)".

Sequ�ncia de opera��es:

pega as vari�veis get ou post->pega as vari�veis da se��o->verifica se o debug deve ser ativado->carrega as extens�es doPHP->cria o objeto cpaint->carrega as fun��es de uso mais comuns->faz uma c�pia de seguran�a do map_file->roda a fun��o desejada->retorna os valores obtidos

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

About: Vari�veis de Se��o

dir_tmp - diret�rio, no servidor, tempor�rio utilizado pelo I3Geo, exemplo: c:/ms4w/tmp/ms_tmp
temasdir - diret�rio, no servidor, onde ficam os arquivos map_file de cada tema, exemplo: c:/ms4w/apache/htdocs/i3geo/temas
temasaplic - diret�rio, no servidor, onde ficam os arquivos de inicializa��o, exemplo: c:\ms4w\apache\htdocs\i3geo\aplicmap
locmapserv - localiza��o, no servidor, do CGI, exemplo: /cgi-bin/mapserv.exe
locaplic - localiza��o, no servidor, do I3Geo, exemplo: c:/ms4w/apache/htdocs/i3geo
locsistemas - localiza��o do xml com a llista de temas, exemplo: /menutemas/sistemas.xml
locidentifica - localilza��o do xml que define os sistemas adicionais inclu�dos na op��o de identifica��o, exemplo: /menutemas/identifica.xml
R_path - localiza��o, no servidor, do execut�vel do pacote R, exemplo: c:/ms4w/apache/htdocs/i3geo/pacotes/r/win/bin/R.exe
imgurl - url das imagens geradas pelo mapa, exemplo: http://localhost/ms_tmp/imgTVHbdijFMk/
tmpurl - url do diret�rio tempor�rio, exemplo: http://localhost/ms_tmp/
map_file - endere�o, no servidor, do mapfile atual, exemplo: c:/ms4w/tmp/ms_tmp/TVHbdijFMk/TVHbdijFMk.map
mapext - extens�o geogr�fica do mapa atual, exemplo: -76.5125927 -39.3925675209 -29.5851853 9.49014852081
perfil - nome do perfil para controlar os temas que ser�o vis�veis na lista de temas.
mapdir - localiza��o, no servidor, do diret�rio com o mapfile tempor�rio do mapa atual.
imgdir - localiza��o, no servidor, das imagens tempor�rias do mapa atual. 
debug - (pode ser definido como "sim" indica se o erro_reporting deve ser definido como E_ALL

File: i3geo/classesphp/atlas_controle.php

19/6/2007

Include:
<pega_variaveis.php>, <carrega_ext.php>, <cpaint2.inc.php>, <classe_vermultilayer.php>, <classe_estatistica.php>, <funcoes_gerais.php>

*/
error_reporting(0);

//sleep(5);

//
//pega as variaveis passadas com get ou post
//
$tempo = microtime(1);
include_once("pega_variaveis.php");
//
// se $atlasId estiver definido, define $map_file para o programa continuar
//
if (isset ($atlasId) || isset ($atlasId_))
{
	$map_file = "";	
}
//
// define $map_file para o programa poder continuar
// esse caso acontece na lista de atlas inicial
//
if (!isset($atlasxml))
{
	include_once("../ms_configura.php");
	$map_file = "";
}
if (isset ($g_sid))
{
	session_name("i3GeoPHP");
	session_id($g_sid);
	session_start();
	foreach(array_keys($_SESSION) as $k)
	{
		eval("\$".$k."='".$_SESSION[$k]."';");
	}
}
if (isset($debug) && $debug == "sim")
{error_reporting(E_ALL);}
//
//ativa o php mapscript e as extens�es necess�rias
//se as extens�es j� estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r�pido
//
include_once ("carrega_ext.php");
require_once("../classesjs/cpaint/cpaint2.inc.php");
//
//cria objeto cpaint para uso com ajax
//
$cp = new cpaint();
if ($funcao == "criaMapa")
{
	session_destroy();
	include("../ms_configura.php");
	chdir($locaplic);
	$interface = "mashup";
	include("../ms_criamapa.php");
	$cp->set_data(session_id());
	$cp->return_data();
}
if (!isset($map_file))
{
	//nesse caso � necess�rio criar o diret�rio tempor�rio e iniciar o mapa
	$cp->set_data("linkquebrado");
	$cp->return_data();
	exit;
}
require_once("classe_vermultilayer.php");
require_once("funcoes_gerais.php");
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
//
//faz a busca da fun��o que deve ser executada
//
switch ($funcao)
{
/*
Property: pegaListaDeAtlas

Pega a lista de Atlas definida no arquivo xml menutemas/atlas.xml.

Include:
<mapa_inicia.php>
*/
	case "pegaListaDeAtlas":
		include("classe_atlas.php");
		$atl = new Atlas($atlasxml);
		$resultado = $atl->pegaListaDeAtlas($tituloInstituicao);
		$cp->set_data($resultado);
	break;
/*
Property: criaAtlas

Abre um Atlas espec�fico, criando o mapa e chamando a interface desejada.

Esse programa � chamado diretamente, por exemplo, i3geo/classesphp/atlas_controle.php?atlasxml=&atlasId=

*/
	case "criaAtlas":
		include("classe_atlas.php");
		$atl = new Atlas($atlasxml);
		$interface = $atl->criaAtlas($atlasId_);
		if ($interface == "")
		{
			echo "Erro. Nenhuma interface definida para esse Atlas";
			exit;
		}
		$caminho = "../";
		$executa = "gravaId";
		include("../ms_criamapa.php");
	break;
/*
Property: pegaListaDePranchas

Pega a lista de pranchas de um atlas espec�fico.

*/
	case "pegaListaDePranchas":
		include("classe_atlas.php");
		$atl = new Atlas($atlasxml);
		$resultado = $atl->pegaListaDePranchas($atlasId);
		$cp->set_data($resultado);
	break;
/*
Property: abrePrancha

Ativa uma prancha do atlas.

*/
	case "abrePrancha":
		include("classe_atlas.php");
		$atl = new Atlas($atlasxml);
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
	global $atlasId_;
	$_SESSION["atlasId"] = $atlasId_;	
}
?>