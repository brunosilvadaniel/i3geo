<?php
/*
Title: metarextensao

Acessa o Web Service http://ws.geonames.org/weatherJSON do Geonames que busca esta��es da rede Metar, retornando o resultado no formato HTML.

Licenca:

GPL2

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

Parametros:

ret {string} - extens�o geogr�fica do ret�ngulo que ser� utilizado na busca (xmin ymin xmax ymax)

Return:

{json} - lista com o resultado
*/
//set_time_limit(600);
require_once("../../pacotes/cpaint/cpaint2.inc.php");
require_once("../../classesphp/pega_variaveis.php");
require_once("../../classesphp/carrega_ext.php");
error_reporting(0);
$e = explode(" ",$ret);
$url = "http://ws.geonames.org/weatherJSON?lang=pt&north=".$e[3]."&south=".$e[1]."&east=".$e[2]."&west=".$e[0]."&maxRows=10";
$s = file($url);
header("Content-type: text/ascii; charset=UTF-8");
header('Expires: Fri, 14 Mar 1980 20:53:00 GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
echo "[".$s[0]."]";

?>