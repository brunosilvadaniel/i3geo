<?php
/*
Title: Compacta js e css do diret�rio pacotes/richdraw

Compacta os arquivos js utilizados pelo I3Geo.

Deve ser executado sempre que forem feitas altera��es nos arquivos javascript existentes em classesjs ou nos arquivos de estilo existentes em css.

About: Licen�a

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

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

File: compactajs.php

19/7/2007

*/
//
//compacta os arquivos do i3geo
//gera um arquivo compactado para cada um
//
//packer("prototype.js","prototype_compacto.js","High ASCII");
packer("richdraw.js","richdraw_compacto.js","High ASCII");
packer("svgrenderer.js","svgrenderer_compacto.js","High ASCII");
packer("vmlrenderer.js","vmlrenderer_compacto.js","High ASCII");
//packer("prototype.js","prototype_compacto.js","High ASCII");

$s = inicia("prototype.js");
$abre = fopen("prototype_compacto.js", "wt");
$escreve = fwrite ($abre,$s);
$fecha = fclose ($abre);

//
//gera um �nico js
//
$jsfiles = array(
"richdraw_compacto.js",
"svgrenderer_compacto.js",
"vmlrenderer_compacto.js"
);
$buffer = "";
//junta todos os js em um unico
foreach ($jsfiles as $f)
{
	$abre = fopen($f, "r");
	while (!feof($abre))
	{$buffer .= fgets($abre);}
	fclose($abre);
	$buffer .= "\n";
}
$abre = fopen("richdraw_tudo_compacto.js", "wt");
$escreve = fwrite ($abre,$buffer);
$fecha = fclose ($abre);
chmod("richdraw_tudo_compacto.js",0777);
function packer($src,$out,$tipo="None")
{
//packer
//$src = 'temp.js';
//$out = 'i3geo_tudo_compacto.js';
require_once '../packer/class.JavaScriptPacker.php';
$script = file_get_contents($src);
$t1 = microtime(true);
$packer = new JavaScriptPacker($script, $tipo, true, false);
$packed = $packer->pack();
$t2 = microtime(true);
$time = sprintf('%.4f', ($t2 - $t1) );
echo 'script ', $src, ' packed in ' , $out, ', in ', $time, ' s.', "\n";
file_put_contents($out, $packed);
chmod($out,0777);
}
function inicia($arquivo)
{
	$abre = fopen($arquivo, "r");
	while (!feof($abre))
	{
		$buffer = fgets($abre);
		$maparray[] = $buffer."kkkk";
	}
	fclose($abre);
	$c = compress(implode("",$maparray));
	$c = str_replace("kkkk","\n",$c);
	$c = str_replace("kkk","",$c);
	$c = str_replace(";\n",";",$c);
	$c = str_replace("{\n","{",$c);
	$c = str_replace("\n}","}",$c);
	$c = str_replace(")\n",")",$c);
	$c = str_replace(" \n","",$c);
	$c = str_replace("\n}","}\n",$c);
	return $c;
}
function compress($code)
{ // Remove multiline comment
$mlcomment = '/\/\*(?!-)[\x00-\xff]*?\*\//';
$code = preg_replace($mlcomment,"",$code);

// Remove single line comment
$slcomment = '/[^:]\/\/.*/';
$code = preg_replace($slcomment,"",$code);

// Remove extra spaces
$extra_space = '/\s+/';
$code = preg_replace($extra_space," ",$code);

// Remove spaces that can be removed
$removable_space = '/\s?([\{\};\=\(\)\\\/\+\*-])\s?/';
$code = preg_replace('/\s?([\{\};\=\(\)\/\+\*-])\s?/',"\\1",$code);
return $code;
}

?>