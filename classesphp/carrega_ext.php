<?php
/*
Title: A - Extens�es PHP

Verifica se as extens�es do PHP necess�rias ao I3Geo est�o carregadas.
Tenta carregar as extens�es que n�o estiverem habilitadas por default.

O ms_criamapa.php define a vari�vel de se��o $ler_extensoes indicando as que devem ser lidas.

Se a vari�vel $ler_extensoes n�o estiver definida, o programa ir� criar.

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

File: carrega_ext.php

19/6/2007
*/
if (isset($ler_extensoes))
{
	$temp = explode(",",$ler_extensoes);
	$temp1 = array();
	
}
else
{
	$temp = array("libxml","SimpleXML","dom","xml","simplexml","mbstring");
	$temp1 = get_loaded_extensions();
}
$ler_extensoes = array();
if (count($temp) > 0)
{
	foreach ($temp as $templ)
	{
		if (in_array( $templ, $temp1) != TRUE)
		{
			if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
			{
				@dl('php_'.$templ.'.dll');
				$ler_extensoes[] = $templ;
			}
			else
			{
				@dl('php_'.$templ.'.so');
				$ler_extensoes[] = $templ;
			}
		}
	}
	//verifica se carregou a gd se n�o, tenta carregar a gd2
	if (!function_exists('imagecreate'))
	{
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			@dl('php_gd.dll');
			$ler_extensoes[] = 'gd';
		}
		else
		{
			@dl('php_gd.so');
			$ler_extensoes[] = 'gd';
		}
	}
	if (!function_exists('imagecreate'))
	{
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			@dl('php_gd2.dll');
			$ler_extensoes[] = 'gd2';
		}
		else
		{
			@dl('php_gd2.so');
			$ler_extensoes[] = 'gd2';
		}
	}
	//verifica se carregou o mapscript
	if (!function_exists('ms_GetVersion'))
	{
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			if(!@dl('php_mapscript_48.dll'))
			{
				@dl('php_mapscript.dll');
				$ler_extensoes[] = 'mapscript';
			}
			else
			{$ler_extensoes[] = 'mapscript_48';}
		}
		else
		{
			dl('php_mapscript.so');
			$ler_extensoes[] = 'mapscript';
		}
	}
}
if((is_array($ler_extensoes)) && (count($ler_extensoes) > 0))
$ler_extensoes = implode(",",(array_unique($ler_extensoes)));
?>