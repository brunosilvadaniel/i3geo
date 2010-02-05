<?php
/*
Title: inicia.php

Cria o mapa e abre a interface.

Esse programa inclui o arquivo i3geo/ms_criamapa.php ativando alguns par�metros especiais para a vers�o mobile.

Cria os arquivos tempor�rios do mapa e faz o include de <mobile.php>

Licenca:

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


Arquivo: i3geo/mobile/inicia.php

*/
include_once("../classesphp/pega_variaveis.php");
$caminho = "../";
if(!isset($layers))
$layers = $temasa;
$executa = "iniciamobile";
if(!isset($tipo)){$tipo = "inicia";}
include("../ms_criamapa.php");

/*
Function: iniciamobile

Fun��o que ser� executada pelo ms_criamapa.php

Faz o include do programa mobile.php.

As vari�veis wmobile e hmobile, que especificam o tamanho da tela do dispositivo, s�o definidas por index.php.

A vari�vel tmpfname � definida no processo de cria��o do mapa, feito pelo ms_criamapa.php, e guarda o nome do mapfile criado.

Globais:

$wmobile

$hmobile

$tmpfname

$postgis_mapa
*/
function iniciamobile()
{
	global $wmobile,$hmobile,$tmpfname,$tipo,$postgis_mapa;
	substituiCon($tmpfname,$postgis_mapa);
	$mapa = ms_newMapObj($tmpfname);
	$mapa->setsize($wmobile,$hmobile);
	$eb = $mapa->scalebar;
	$eb->set("style",0);
	$eb->set("position",MS_LL);
	$cornb = $eb->backgroundcolor;
	//$n = explode(",",$bcor);
	$cornb->setrgb(255,0,0);
	$mapa->save($tmpfname);
	include("mobile.php");
	exit;
}	
?>