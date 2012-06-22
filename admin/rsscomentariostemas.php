<?php
/*
Title: rsscomentariostemas

Monta um arquivo XML no padr�o RSS contendo os coment�rios postados para os temas cadastrados.

<http://localhost/i3geo/admin/rsscomentariostemas.php>

Parametros:

id_tema {numeric} - (opcional) id do tema para mostrar apenas os coment�rios de um tema

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

i3geo/admin/rsscomentariostemas.php
*/

error_reporting(0);
if(!isset($locaplic)){
	include(__DIR__."/../ms_configura.php");
}
include_once($locaplic."/classesphp/pega_variaveis.php");
include_once($locaplic."/admin/php/xml.php");
$parametros = array_merge($_POST,$_GET);
if(empty($parametros["id_tema"]))
{$parametros["id_tema"] = "";}
echo header("Content-type: application/xml");
echo geraRSScomentariosTemas($locaplic,$parametros["id_tema"]);
?>
