<?php
/*
Title: funcoes.php

Acessa o Web Service do Geonames que busca artigos na Wikipedia, retornando o resultado no formato HTML.
Licenca:

GPL2

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
*/
//set_time_limit(600);
require_once("../../pacotes/cpaint/cpaint2.inc.php");
require_once("../../classesphp/pega_variaveis.php");
require_once("../../classesphp/carrega_ext.php");
error_reporting(0);
$cp = new cpaint();
$cp->register('listaartigos');
$cp->start();
$cp->return_data();
function listaartigos()
{
	global $ret, $cp;
	$e = explode(" ",$ret);
	$url = "http://ws.geonames.org/wikipediaBoundingBox?srv=121&north=".$e[3]."&south=".$e[1]."&east=".$e[2]."&west=".$e[0]."&maxRows=20";
	$xml = simplexml_load_file($url."&lang=pt");
	$conta = 0;
	$fim = array();
	$resultado = "";
	foreach($xml->entry as $e)
	{
		$r = $e->xpath('title');
		if (function_exists(mb_convert_encoding))
		{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
		$resultado .= "<b>".$r."</b> - ";

		$r = $e->xpath('feature');
		if (function_exists(mb_convert_encoding))
		{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
		$resultado .=  "<span style=color:red >".$r."</span><br>";

		$r = $e->xpath('summary');
		if (function_exists(mb_convert_encoding))
		{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
		$resultado .=  $r."<br>";

		$r = $e->xpath('wikipediaUrl');
		if (function_exists(mb_convert_encoding))
		{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
		$resultado .=  "<a href='".$r."' target=blank >abrir Wikpedia</a><br>";
		$resultado .=  "<hr>";
	}
	if ($resultado == "")
	{$resultado = "<span style=color:red >Nada encontrado</span><br><hr>";}
	$cp->set_data($resultado);
}
?>