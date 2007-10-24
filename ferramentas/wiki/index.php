<?
/*
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
*/

//abre o rss do wiki com parser do geonames
//http://ws.geonames.org/wikipediaBoundingBox?srv=121&north=4&south=-5&east=-45&west=-55.2
$e = explode(" ",$extent);
$url = "http://ws.geonames.org/wikipediaBoundingBox?srv=121&north=".$e[3]."&south=".$e[1]."&east=".$e[2]."&west=".$e[0]."&maxRows=20";

$xml = simplexml_load_file($url."&lang=".$lang);
$conta = 0;
$resultado = array();
echo '
<html>
<head>
<meta http-equiv="Category" content="Busca Wikipedia">
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
<title>I3Geo</title>
<style>
A
{text-align:left;font-size: 10px;font-family: Verdana, Arial, Helvetica, sans-serif;color: #2F4632;}
A:hover 
{color: #4142ff;font-weight: normal;font-family: Verdana, Arial, Helvetica, sans-serif;}
P,BODY 
{COLOR: #2F4632;text-align: left;font-size: 12px;font-family: Verdana, Arial, Helvetica, sans-serif;}

</style>
</head>
<body>
<p>A busca no Mediawiki traz apenas os 20 primeiros resultados
<p>Se a abrang&ecirc;ncia geogr&aacute;fica de busca for muito grande, pode ocorrer erro devido ao tempo de processamento.
<p>Mais detalhes sobre a busca, veja <a href="http://www.geonames.org" >Geonames</a>
<p>Url de busca: <p>';
echo $url."&amp;lang=pt";
echo '<p>Voc&ecirc; pode tentar a busca em ingl&ecirc;s no link:';
echo '<a href="index.php?extent='.$extent.'&lang=en" >busca em ingles</a>';
echo '<p>Resultados:<hr>';

foreach($xml->entry as $e)
{
	$r = $e->xpath('title');
	if (function_exists(mb_convert_encoding))
	{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
	echo "<b>".$r."</b> - ";
	
	$r = $e->xpath('feature');
	if (function_exists(mb_convert_encoding))
	{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
	echo "<span style=color:red >".$r."</span><br>";	
	
	$r = $e->xpath('summary');
	if (function_exists(mb_convert_encoding))
	{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
	echo $r."<br>";
	
	$r = $e->xpath('wikipediaUrl');
	if (function_exists(mb_convert_encoding))
	{$r = mb_convert_encoding($r[0],"HTML-ENTITIES","auto");}
	echo "<a href='".$r."' >abrir Wikpedia</a><br>";	
	echo "<hr>";
}
echo "Fim.";
?>