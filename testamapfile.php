<?php
/*
Title: Testa um mapfile.

Permite testar um mapfile espec�fico existente no diret�rio "temas" ou gerar uma imagem miniatura.

File: i3geo/testamapfile.php

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

About: Exemplo

testamapfile.php?map=bioma

Parameters:

map - nome do mapfile que ser� aberto. O arquivo � procurado no caminho indicado e no diret�rio i3geo/temas
	se map=todos, todos os mapas s�o desenhados de 10 em 10.
tipo - (opcional) tipo de retorno mini|grande . A op��o mini retorna uma miniatura do mapa
*/
set_time_limit(300);
ini_set('max_execution_time', 300);
include("ms_configura.php");
include("classesphp/funcoes_gerais.php");
require_once("classesphp/pega_variaveis.php");
include_once ("classesphp/carrega_ext.php");
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
ms_ResetErrorList();
if(!isset($tipo))
{$tipo = "";}
if ($tipo == "")
{
	echo '<html><head><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1"></head><script>function roda(){window.location.href = "?map="+document.getElementById("nomemap").value;}</script><body ><form action="testamapfile.php" method="post" id=f >Nome do arquivo map (deve estar no diret�rio temas, digite "todos" para testar todos de uma s� vez):<br><br><input id=nomemap class=digitar type="file" size=20 ><input id=map type="hidden" value="" name="map"><input type="button" onclick="roda()" class=executar value="Testar" size=10 name="submit"></form></body></html>';
}
if (isset($map) && $map != "")
{
	if ($map == "todos")
	{
		$tipo = "todos";
		$arqs = listaArquivos("temas");
		$conta = 0;
		echo "<br>N�mero de mapas = ".(count($arqs["arquivos"]))." Faltam= ".(count($arqs["arquivos"])-$iniciar-10)."<br>";
		if (!isset($iniciar)){$iniciar = 0;}
		sort($arqs["arquivos"]);
		foreach ($arqs["arquivos"] as $arq)
		{
			if (($conta >= $iniciar) && ($conta < $iniciar+10))
			{
				$temp = explode(".",$arq);
				if($temp[1] == "map")
				verifica($arq);
				else
				{echo "<br>Arquivo <i>$map</i> n�o � v�lido. <br>";}
			}
			$conta++;
		}
		echo "<hr><br><br><a href='testamapfile.php?map=todos&iniciar=".($iniciar+10)."' >Pr�ximos mapas</a>";
	}
	else
	{verifica($map);}	
}
function verifica($map)
{
	global $tipo;
	ms_ResetErrorList();
	$tema = "";
	$map = str_replace("\\","/",$map);
	$map = basename($map);
	if (file_exists('temas/'.$map))
	{$tema = 'temas/'.$map;}
	if (file_exists('temas/'.$map.'.map'))
	{$tema = 'temas/'.$map.".map";}
	if(($tipo == "") || ($tipo == "todos"))
	echo "<hr><br><br><span style='color:red' ><b>Testando: $tema </span><pre></b>";
	if ($tema != "")
	{
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$mapa = ms_newMapObj("aplicmap/geral1windows.map");}
		else
		{$mapa = ms_newMapObj("aplicmap/geral1.map");}
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
			if ($layern->data == "")
			$dados = $layern->connection;
			else
			$dados = $layern->data;			
		}
		if (isset($postgis_mapa))
		{
			if ($postgis_mapa != "")
			{
				$numlayers = $mapa->numlayers;
				for ($i=0;$i < $numlayers;$i++)
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
		if ($tipo == "mini")
		{
		 	 $mapa->setsize(50,50);
			 $sca = $mapa->scalebar;
			 $sca->set("status",MS_OFF);
		}
		if ($tipo == "grande")
		{
		 	 $mapa->setsize(300,300);
			 $sca = $mapa->scalebar;
			 $sca->set("status",MS_OFF);
		}
		if($tipo == "todos")
		{
		 	 $mapa->setsize(150,150);
			 $sca = $mapa->scalebar;
			 $sca->set("status",MS_OFF);
		}
		$objImagem = @$mapa->draw();
		if (!$objImagem)
		{echo "Problemas ao gerar o mapa<br>";return;}
		$nomec = ($objImagem->imagepath).nomeRandomico()."teste.png";
		$objImagem->saveImage($nomec);
		$nomer = ($objImagem->imageurl).basename($nomec);
		if(($tipo == "") || ($tipo == "todos"))
		{
			echo "<img src=".$nomer." />";
			if($tipo == "todos")
			{
			 echo "<br>".$dados."<br>";
			}
			if($map != "todos")
			{
				echo "<br>Erros:<br>";
				$error = "";
				$error = ms_GetErrorObj();
				while($error && $error->code != MS_NOERR)
				{
					echo "<br>Error in %s: %s<br>", $error->routine, $error->message;
					$error = $error->next();
				}
			}		
		}
		else
		{
			Header("Content-type: image/png");
			ImagePng(ImageCreateFromPNG($nomec));
		}
		$objImagem->free();
	}
}
?>