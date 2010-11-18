<?php
/*
Title: geraminiatura.php

Gera as miniaturas dos mapas baseado nos mapfiles existentes em i3geo/temas. As miniaturas s�o utilizadas no i3geo na guia temas para mostrar um preview de cada tema.

Por padr�o, as imagens s�o armazenadas no diret�rio tempor�rio do i3geo e devem ser movidas para o diret�rio i3geo/temas/miniaturas 
para poderem ser utilizadas. O programa verifica se a miniatura j� existe no diret�rio temas/miniaturas e gera apenas as que faltarem.

� utilizado tamb�m como um include pelo sistema de administra��o, permitindo armazenar as miniaturas no local correto.

Licenca:

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Colabora��o: Luis Henrique Weirich de Matos

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

Arquivo: i3geo/geraminiatura.php

Exemplo:

geraminiatura.php?tipo=mini

Parametro:

tipo - tipo de retorno mini|grande|todos
*/
error_reporting(E_ALL);
set_time_limit(300);
ini_set('max_execution_time', 300);
//
//carrega o phpmapscript
//
if (!function_exists('ms_GetVersion'))
{
	if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
	{
		if(!@dl('php_mapscript_48.dll'))
		dl('php_mapscript.dll');
	}
	else
	{dl('php_mapscript.so');}
}
//
//no caso do programa ser utilizado via URL
//
if(!isset($tipo))
{$tipo = "";}
if($tipo == "mini" || $tipo == "todos" || $tipo == "grande")
{
	ms_ResetErrorList();
	if (!isset($tipo))
	{
		echo "Utilize geraminiatura.php?tipo=mini ou grande ou todos. As imagens s�o armazenadas no diret�rio tempor�rio.";
		echo "<br>Ap�s geradas as imagens, copie os arquivos para o diret�rio i3geo/temas/miniaturas.";
		echo "<br>As miniaturas s�o geradas apenas para os arquivos que ainda n�o existem no diret�rio temas/miniaturas.";
		echo "<br><a href='geraminiatura.php?tipo=todos' >Gerar todas as miniaturas</a>";
		echo "<br><a href='geraminiatura.php?tipo=mini' >Gerar apenas as pequenas</a>";
		echo "<br><a href='geraminiatura.php?tipo=grande' >Gerar apenas as grandes</a>";
		exit;
	}

	include("ms_configura.php");
	include("classesphp/funcoes_gerais.php");
	require_once("classesphp/pega_variaveis.php");
	include_once ("classesphp/carrega_ext.php");
	$arqs = listaArquivos("temas");
	foreach ($arqs["arquivos"] as $arq)
	{
		$temp = explode(".",$arq);
		if($temp[(count($temp) - 1)] == "map")
		{
			if($tipo == "mini" || $tipo == "todos")
			{if(!file_exists('temas/miniaturas/'.$arq.'.mini.png')){echo "<br>".$arq."<br>";verificaMiniatura($arq,"mini");}}
			if($tipo == "grande"  || $tipo == "todos")
			{if(!file_exists('temas/miniaturas/'.$arq.'.grande.png')){echo "<br>".$arq."<br>";verificaMiniatura($arq,"grande");}}
		}
	}
}
//
//se tipo for igual a "admin", as imagens s�o gravadas em i3geo/temas/miniaturas
//
function verificaMiniatura($map,$tipo,$admin=false)
{
	global $locaplic;
	ms_ResetErrorList();
	error_reporting(E_ALL);
	$tema = "";
	$map = str_replace("\\","/",$map);
	$map = basename($map);
	if (file_exists($locaplic.'/temas/'.$map))
	{$tema = $locaplic.'/temas/'.$map;}
	if (file_exists($locaplic.'/temas/'.$map.'.map'))
	{$tema = $locaplic.'/temas/'.$map.".map";}
	if ($tema != "")
	{
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$mapa = ms_newMapObj("$locaplic/aplicmap/geral1windows.map");}
		else
		{$mapa = ms_newMapObj("$locaplic/aplicmap/geral1.map");}
		if(@ms_newMapObj($tema))
		{$nmapa = ms_newMapObj($tema);}
		else
		{
			echo "erro no arquivo $map <br>";
			return;
		}
		$temasn = $nmapa->getAllLayerNames();
		$dados = "";
		foreach ($temasn as $teman)
		{
			$layern = $nmapa->getLayerByName($teman);
			$layern->set("status",MS_DEFAULT);
			ms_newLayerObj($mapa, $layern);
			autoClasses(&$layern,$mapa,$locaplic);
			if ($layern->data == "")
			$dados = $layern->connection;
			else
			$dados = $layern->data;
			$pegarext = $teman;	
		}
		if (isset($postgis_mapa))
		{
			if ($postgis_mapa != "")
			{
				$numlayers = $mapa->numlayers;
				for ($i=0;$i < $numlayers;++$i)
				{
					$layer = $mapa->getlayer($i);
					if ($layer->connectiontype == MS_POSTGIS)
					{
						if ($layer->connection == " ")
						{
							$layer->set("connection",$postgis_mapa);
						}
					}
				}
			}
		}
		zoomTemaMiniatura($pegarext,&$mapa);
		if ($tipo == "mini"  || $tipo == "todos")
		{
		 	$mapa->setsize(50,50);
			$sca = $mapa->scalebar;
			$sca->set("status",MS_OFF);
			$objImagemM = @$mapa->draw();
			if (!$objImagemM)
			{echo "Problemas ao gerar o mapa<br>";return;}
			$weboM = $mapa->web;
			$urlM = $weboM->imageurl."/".$map;
		}
		if ($tipo == "grande"  || $tipo == "todos")
		{
		 	$mapa->setsize(300,300);
			$sca = $mapa->scalebar;
			$sca->set("status",MS_OFF);
			$objImagemG = @$mapa->draw();
			if (!$objImagemG)
			{echo "Problemas ao gerar o mapa<br>";return;}
			$weboG = $mapa->web;
			$urlG = $weboG->imageurl."/".$map;
		}
		if($tipo=="mini" || $tipo == "todos")
		{
			$nomecM = ($objImagemM->imagepath).$map.".mini.png";
			$objImagemM->saveImage($nomecM);
		}
		if($tipo=="grande" || $tipo == "todos")
		{
			$nomecG = ($objImagemG->imagepath).$map.".grande.png";
			$objImagemG->saveImage($nomecG);
		}

		if($admin == false)
		{
			if($tipo=="mini" || $tipo == "todos")
			{echo "<br><img src='".$urlM.".mini.png' /><br>";}
			if($tipo=="grande" || $tipo == "todos")
			{echo "<br><img src='".$urlG.".grande.png' /><br>";}
		}
		//
		//copia a imagem
		//
		if($admin == true)
		{
			$dir = $locaplic."/temas/miniaturas";
			$mini = $dir."/".$map.".map.mini.png";
			$grande = $dir."/".$map.".map.grande.png";
			if(file_exists($mini))
			{unlink($mini);}
			if(file_exists($grande))
			{unlink($grande);}
			copy(($objImagemG->imagepath).$map.".grande.png",$grande);
			copy(($objImagemM->imagepath).$map.".mini.png",$mini);
		}
	}
}
function zoomTemaMiniatura($nomelayer,&$mapa)
{
	$layer = $mapa->getlayerbyname($nomelayer);
	if($layer->type > 2)
	{return;}
	$prjMapa = $mapa->getProjection();
	$prjTema = $layer->getProjection();
	$extatual = $mapa->extent;
	$ret = $layer->getmetadata("extensao");
	$ct = $layer->connectiontype;
	if(($ret == "") && ($ct != 1))
	{return;}
	if ($ret == "")
	{
		$ret = $layer->getextent();
		//reprojeta o retangulo
		if (($prjTema != "") && ($prjMapa != $prjTema))
		{
			$projInObj = ms_newprojectionobj($prjTema);
			$projOutObj = ms_newprojectionobj($prjMapa);
			$ret->project($projInObj, $projOutObj);
		}
		$extatual->setextent($ret->minx,$ret->miny,$ret->maxx,$ret->maxy);
	}
	else
	{
		$ret = explode(" ",$ret);
		$extatual->setextent($ret[0],$ret[1],$ret[2],$ret[3]);
	}
}

?>