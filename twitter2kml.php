<?php
//exemplo: http://localhost/i3geo/twitter2kml.php?q=twit2kml&rpp=20
include("classesphp/carrega_ext.php");
/*
C�digo de consulta � API adaptado de http://www.reynoldsftw.com/2009/02/using-jquery-php-ajax-with-the-twitter-api/
*/
$par = array_merge($_POST,$_GET);
$chaves = array_keys($par);
$query = array();
foreach($chaves as $chave)
{$query[] = $chave."=".$par[$chave];}
$query = implode("&",$query);
$s = PHP_SHLIB_SUFFIX;
if(!function_exists('curl_init'))
{@dl( 'php_curl'.'.'.$s );}
if(!function_exists('curl_init'))
{echo "curl n�o instalado";}
$curl = curl_init();
curl_setopt ($curl, CURLOPT_URL, "http://search.twitter.com/search.json?".($query));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec ($curl);
curl_close ($curl);
$result = fixEncoding($result);
$result = json_decode( $result, true );
$kml = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://earth.google.com/kml/2.0"><Document><name>twitter</name>';
$kml .= '<Folder><description>'.$q.'</description><name>'.$q.'</name><open>1</open>';
$icon = array();
if(!$result["results"])
{exit;}
foreach($result["results"] as $r)
{
	if(!in_array($r["from_user"],$icon))
	{
		$kml .= '<Style id="'.$r["from_user"].'"><IconStyle><Icon>';
		$kml .= '<href>'.$r["profile_image_url"].'</href>';
		$kml .= '</Icon></IconStyle></Style>';
	}
	$icon[] = $r["from_user"];
}
$id = 0;
foreach($result["results"] as $r)
{ 
	$xy = retornaXY($r["text"]);
	if($xy != "")
	{
		$html = "<table><tr>";
		$html .= "<td><img src='".$r["profile_image_url"]."' /></td>";
		$html .= "<td><span style=color:gray >".$r["from_user"]."<br>";
		$html .= $r["created_at"]."</span><br>";
		$html .= $r["text"]."<br></td></tr></table>";
		$kml .='<Placemark><name>'.$id.'</name>';
		$kml .= '<description><![CDATA['.$html.']]></description>';
		$kml .= '<styleUrl>'.$r["from_user"].'</styleUrl>';
		$kml .= '<Point id="'.$id.'"><coordinates>'.$xy.'</coordinates></Point></Placemark>';
		$id++;
	}
}
$kml .= '</Folder></Document></kml>';
echo header("Content-type: application/xml");
echo $kml;
function retornaXY($s)
{
	$x = preg_replace("/(.*#x)|(\s.*)/i","",$s);
	if($x == "")
	{$x = preg_replace("/(.*#long)|(\s.*)/i","",$s);}
	if($x == "")
	{$x = preg_replace("/(.*#lon)|(\s.*)/i","",$s);}
	$y = preg_replace("/(.*#y)|(\s.*)/i","",$s);
	if($y == "")
	{$y = preg_replace("/(.*#lat)|(\s.*)/i","",$s);}
	$x = str_replace(",",".",$x);
	$y = str_replace(",",".",$y);
	if(!is_numeric($x) || !is_numeric($y))
	{return "";}
	else
	{return $x.",".$y;}
}
function fixEncoding($in_str)
{
	$cur_encoding = mb_detect_encoding($in_str) ;
	if($cur_encoding == "UTF-8" && mb_check_encoding($in_str,"UTF-8"))
	{return $in_str;}
	else
	{return utf8_encode($in_str);}
} 
?>