<?php
/*
Title: Inicializa o I3Geo via URL

Cria os diret�rios tempor�rios para o I3Geo e o mapfile inicial.

Abre o I3Geo com a interface padr�o ou uma espec�fica.

File: ms_criamapa.php

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

temasa - lista separada por espa�os com os nomes dos arquivos map que ser�o adicionados

layers - lista separada por espa�os com os nomes dos layers que ser�o ligados

mapext - extensao geografica que ser� utilizada

executa - programa ou fun��o em php adicional que ser� executado via include. O mapfile nessa altura est� na vari�vel tmpfname

interface - nome da interface que ser� utilizada para abrir o mapa As interfaces s�o arquivos HTML que podem estar no diret�rio aplicmap

perfil - perfil utilizado para restringir os menus de temas

caminho - caminho para os programas que ser�o inclu�dos com "include"

pontos - lista de coordenadas x e y que ser�o adicionadas como pontos no mapa.

nometemapontos - nome do tema de pontos

debug - ativa o retorno de mensagens de erro do PHP sim|nao

About: Exemplo

http://localhost/i3geo/ms_criamapa.php?temasa=estadosl
*/
//
//verifica se o debug deve ser ativado, checando a vari�vel debug
//
if (!isset($debug))
{error_reporting(0);$debug="nao";}
else
{error_reporting(E_ALL);$debug="sim";}
//
//verifica se a vari�vel $caminho est� definida
//
if (isset($_GET["caminho"]))
{$caminho = $_GET["caminho"];}
if (!isset($caminho)){$caminho = "";}
//
//carrega as extens�es
//
require_once ($caminho."classesphp/carrega_ext.php");
//
//carrega as fun��es adicionais
//
require_once ($caminho."classesphp/pega_variaveis.php");
require_once ($caminho."classesphp/funcoes_gerais.php");
require_once ($caminho."ms_configura.php");
//
//define a vari�vel $mapext que define a extens�o geogr�fica do mapa
//
if (!isset($mapext)){$mapext="";}
//
//prepara as vari�veis que ser�o incluidas na sess�o
//as vari�veis v�m do arquivo ms_configura
//
$dir_tmp_ = $dir_tmp;
$temasdir_ = $temasdir;
$temasaplic_ = $temasaplic;
$locmapserv_ = $locmapserv;
$locaplic_ = $locaplic;
$locsistemas_ = $locsistemas;
$locidentifica_ = $locidentifica;
$R_path_ = $R_path;
$mapext_ = $mapext;
$locmapas_ = $locmapas;
$postgis_con_ = $postgis_con;
$srid_area_ = $srid_area;
$debug_ = $debug;
$ler_extensoes_ = $ler_extensoes;
$postgis_mapa_ = $postgis_mapa;
//
//inicia a sess�o
//
session_name("i3GeoPHP");
session_start();
//
//se j� houver uma sess�o aberta, em fun�a� de outro browser estar ativo, cria uma nova
//
if (!isset($g_sid)){$g_sid="";}
if(isset($_SESSION["map_file"]) || $g_sid!="")
{session_regenerate_id();}
//
//copia as vari�veis para a sess�o
//
$_SESSION["dir_tmp"] = $dir_tmp_;
$_SESSION["temasdir"] = $temasdir_;
$_SESSION["temasaplic"] = $temasaplic_;
$_SESSION["locmapserv"] = $locmapserv_;
$_SESSION["locaplic"] = $locaplic_;
$_SESSION["locsistemas"] = $locsistemas_;
$_SESSION["locidentifica"] = $locidentifica_;
$_SESSION["R_path"] = $R_path_;
$_SESSION["mapext"] = $mapext_;
$_SESSION["locmapas"] = $locmapas_;
$_SESSION["postgis_con"] = $postgis_con_;
$_SESSION["srid_area"] = $srid_area_;
$_SESSION["debug"] = $debug_;
$_SESSION["ler_extensoes"] = $ler_extensoes_;
$_SESSION["postgis_mapa"] = $postgis_mapa_;
//
//pega todas as vari�veis da sess�o
//
foreach(array_keys($_SESSION) as $k)
{
	eval("\$".$k."='".$_SESSION[$k]."';");
}
//
//monta a apresenta��o do aguarde
//
if (!isset($interface))
{
	echo "<html><head>";
	echo '<div id="aguarde">';
	echo '<p class=paguarde style="font-family: Verdana, Arial, Helvetica, sans-serif;color:black;text-align:center;font-size:12pt"><b>'.$mensagemInicia.'</b><br> Aguarde...criando o mapa</p>';
	echo "<center><img src='".$caminho."imagens/i3geo1.jpg'><br><br>";
	echo "<center><img src='".$caminho."imagens/mapserv.png'><br><br>";
	echo "<center><a href='http://mapas.mma.gov.br/download' target=blank ><img src='".$caminho."imagens/somerights20_pt.gif' ></a>";
	echo '<BODY bgcolor="white" style="background-color:white">';
}
//
//define os arquivos .map conforme o tipo de sistema operacional
//
if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
{
	if (!isset($base)){$base = "geral1windows";}
	$estadosl = "estadoslwindows";
}
else
{
	if (!isset($base)){$base = "geral1";}
	$estadosl = "estadosl";
}
if (file_exists($base))
{$mapdefault = ms_newMapObj($base);}
else
{$mapdefault = ms_newMapObj($temasaplic."/".$base.".map");}
//
//pega os par�metros para a inicializa��o se os mesmos n�o forem passados pela URL
//
if (!isset($mapext))
{$mapext = $mapdefault->extent->minx." ".$mapdefault->extent->miny." ".$mapdefault->extent->maxx." ".$mapdefault->extent->maxy;}
if (!isset ($map_reference_image)) //arquivo com a imagem de refer&ecirc;ncia
{$map_reference_image = $mapdefault->reference->image;}
if (!isset ($map_reference_extent)) //extens&atilde;o geogr&aacute;fica da imagem do mapa de refer&ecirc;ncia
{$map_reference_extent = $mapdefault->reference->extent->minx." ".$mapdefault->reference->extent->miny." ".$mapdefault->reference->extent->maxx." ".$mapdefault->reference->extent->maxy;}
if (!isset($interface))
{$interface = "geral.htm";}
//
//cria os diret�rios tempor�rios
//
$diretorios = criaDirMapa($dir_tmp);
$_SESSION["mapdir"] = $diretorios[1];
$_SESSION["imgdir"] = $diretorios[2];
//
//cria arquivos para impedir a leitura dos diret�rios tempor�rios
//
if (!file_exists($dir_tmp."/index.htm"))
{
	$f = fopen($dir_tmp."/index.htm",x);
	fclose($f);
	$f = fopen($dir_tmp."/index.html",x);
	fclose($f);
	$f = fopen($dir_tmp."/".$diretorios[1]."/index.html",x);
	fclose($f);
	$f = fopen($dir_tmp."/".$diretorios[1]."/index.htm",x);
	fclose($f);
	$f = fopen($dir_tmp."/".$diretorios[2]."/index.html",x);
	fclose($f);
	$f = fopen($dir_tmp."/".$diretorios[2]."/index.htm",x);
	fclose($f);
}
if (!file_exists($dir_tmp."/index.htm"))
{
	echo "Erro. N�o foi poss�vel gravar no diret�rio tempor�rio";
	exit;
}
//
//cria os objetos map
//
if (file_exists($base))
{
	$map = ms_newMapObj($base);
	$mapn = ms_newMapObj($base);	
}
else
{
	$map = ms_newMapObj($temasaplic."/".$base.".map");
	$mapn = ms_newMapObj($temasaplic."/".$base.".map");
}
//
//verifica a lista de temas da inicializacao, adicionando-os se necess�rio
//
if (!isset($temasa)){$temasa = $estadosl;}
$temasa = str_replace(','," ",$temasa);
$alayers = explode(" ",$temasa);
foreach ($alayers as $arqt)
{
	$arqtemp = "";
	$arqt = trim($arqt);
	if ($arqt == "")
	{continue;}
	if (file_exists($arqt))
	{$arqtemp = $arqt;}
	if ((strtoupper(substr(PHP_OS, 0, 3) == 'WIN')) && (file_exists($temasaplic."\\".$arqt.".map")))
	{$arqtemp = $temasaplic."\\".$arqt.".map";}
	elseif (file_exists($temasaplic."/".$arqt.".map"))
	{$arqtemp = $temasaplic."/".$arqt.".map";}
	if ((strtoupper(substr(PHP_OS, 0, 3) == 'WIN')) && (file_exists($temasdir."\\".$arqt.".map")))
	{$arqtemp = $temasdir."\\".$arqt.".map";}
	elseif (file_exists($temasdir."/".$arqt.".map"))
	{$arqtemp = $temasdir."/".$arqt.".map";}
	if ($arqtemp == "")
	{echo "<br>Imposs&iacute;vel acessar tema $arqtemp";}
	else
	{
		if (!@ms_newMapObj($arqtemp))
		{echo "<br>Problemas com a camada $arqtemp<br>";}
		else
		{
			$maptemp = @ms_newMapObj($arqtemp);
			for($i=0;$i<($maptemp->numlayers);$i++)
			{
				$layern = $maptemp->getLayer($i);
				$layern->setmetadata("NOMEORIGINAL",$layern->name);
				if ($layern->name == "estadosl")
				{$layern->set("data",$temasaplic."/dados/estados.shp");}
				ms_newLayerObj($mapn, $layern);
			}
		}	
	}
}
//
//liga os temas definidos em $layers
//
if (isset($layers))
{
	$layers = str_replace(','," ",$layers);
	$lista = explode(" ", $layers);
	foreach ($lista as $l)
	{
		$arqt = trim($l);
		if ($l == "")
		{continue;}
		if(@$mapn->getLayerByName($l))
		{$layern = $mapn->getLayerByName($l);$layern->set("status",MS_DEFAULT);}
	}
}
//
//aplica ao mapa os par�metros passados pela URL
//
if (isset($map_reference_image))
{$mapn->reference->set("image",$map_reference_image);}
$extr = $mapn->reference->extent;
if (isset($map_reference_extent))
{
	$temp = explode(" ",$map_reference_extent);
	foreach ($temp as $t)
	{
		if ($t != "")
		{$newext[] = $t;}
	}
	if (count($newext) == 4)
	{$extr->setextent($newext[0], $newext[1], $newext[2], $newext[3]);}
}
$ext = $mapn->extent;
$newext = array();
if ((isset($mapext)) && ($mapext != ""))
{
	$temp = explode(" ",$mapext);
	foreach ($temp as $t)
	{
		if ($t != "")
		{$newext[] = $t;}
	}
	if (count($newext) == 4)
	{$ext->setextent($newext[0], $newext[1], $newext[2], $newext[3]);}
}
if (isset($perfil))
{
	$mapn->setmetadata("PERFIL",$perfil);
	$_SESSION["perfil"] = $perfil;
}
//
//configura os endere�os corretos
//
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$w = $mapn->web;
$atual = $w->imagepath;
$w->set("imagepath",$atual.$diretorios[2]."/");
$atual = $w->imageurl;
$w->set("imageurl",$atual.$diretorios[2]."/");
$salvo = $mapn->save($diretorios[0]);
$_SESSION["imgurl"] = $protocolo[0]."://".$_SERVER['HTTP_HOST'].$atual.$diretorios[2]."/";
$_SESSION["tmpurl"] = $protocolo[0]."://".$_SERVER['HTTP_HOST'].$atual;
//
//faz o include de um programa se tiver sido passado pela URL
//
$tmpfname = $diretorios[0];
$_SESSION["map_file"] = $diretorios[0];
$_SESSION["mapext"] = $mapext;
if (isset($executa))
{
	if (file_exists($executa))
	{include ($executa);}
	if (function_exists($executa))
	{eval($executa."();");}
}
//inclui pontos via url
if (isset($pontos))
{
	require_once "pacotes/phpxbase/api_conversion.php";
	if (!isset($nometemapontos))
	{$nometemapontos="Pontos";}
	if ($nometemapontos == "")
	{$nometemapontos="Pontos";}
	//
	//cria o shape file
	//
	$tipol = MS_SHP_POINT;
	$nomeshp = $dir_tmp."/".$imgdir."/pontosins";
	// cria o dbf
	$def = array();
	$items = array("COORD");
	foreach ($items as $ni)
	{$def[] = array($ni,"C","254");}
	xbase_create($nomeshp.".dbf", $def);
	$dbname = $nomeshp.".dbf";
	$db=xbase_open($dbname,2);
	$novoshpf = ms_newShapefileObj($nomeshp, $tipol);
	$pontos = explode(" ",trim($pontos));
	foreach ($pontos as $p)
	{if (is_numeric($p)){$pontosn[] = $p;}}
	$pontos = $pontosn;
	for ($ci = 0;$ci < count($pontos);$ci=$ci+2)
	{
		$reg = array();
		$reg[] = $pontos[$ci]." ".$pontos[$ci+1];
		$shape = ms_newShapeObj($tipol);
		$linha = ms_newLineObj();
		$linha->addXY($pontos[$ci],$pontos[$ci+1]);
		$shape->add($linha);
		$novoshpf->addShape($shape);
		xbase_add_record($db,$reg);
	}
	$novoshpf->free();
	xbase_close($db);
	//adiciona o layer
	$mapa = ms_newMapObj($tmpfname);
	$layer = ms_newLayerObj($mapa);
	$layer->set("name","pontoins");
	$layer->set("data",$nomeshp);
	$layer->setmetadata("tema",$nometemapontos);
	$layer->setmetadata("classe","sim");
	$layer->set("type",MS_LAYER_POINT);
	$layer->set("status",MS_DEFAULT);
	$classe = ms_newClassObj($layer);
	$estilo = ms_newStyleObj($classe);
	$estilo->set("symbolname","ponto");
	$estilo->set("size",6);
	$cor = $estilo->color;
	$cor->setRGB(255,0,0);
	$salvo = $mapa->save($tmpfname);
}
//
//se vc quiser para o script aqui, para verificar erros, descomente a linha abaixo
//
//exit;

//
// gera a url para abrir o mapa
// interface = arquivo html que ser� aberto
//
if (count(explode(".php",$interface)) > 1)
{
	if (file_exists($caminho."aplicmap/".$interface))
	{include_once($caminho."aplicmap/".$interface);}
	else 
	{include_once($interface);}
	exit;
}
else
{
	if (file_exists($caminho."aplicmap/".$interface))
	{$urln = $caminho."aplicmap/".$interface."?".session_id();}
	else 
	{$urln = $interface."?".session_id();}
	//header("Location:".$urln);
	echo "<meta http-equiv='refresh' content='0;url=$urln'>";
}
?>