<?php
/*
Title: carrega_ext.php

Verifica se as extens�es do PHP necess�rias ao I3Geo est�o carregadas.
Tenta carregar as extens�es que n�o estiverem habilitadas por default.

O ms_criamapa.php define a vari�vel de se��o $ler_extensoes indicando as que devem ser lidas.

Se a vari�vel $ler_extensoes n�o estiver definida, o programa ir� criar. Essa � a situa��o
quando o ms_criamapa.php � executado.

Caso seja necess�rio carregar alguma extens�o adicional, basta incluir no array $extensoes

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

Arquivo:

i3geo/classesphp/carrega_ext.php
*/
/*
Array com a lista de extensoes que devem ser carregadas pelo i3geo.

Outras extensoes exigidas pelo i3geo tamb�m s�o verificadas, como mapscript e gd.
*/
$ler_extensoes = array();
if(function_exists("dl")){
	$extensoes = array("zlib","libxml","SimpleXML","dom","xml","simplexml","mbstring");
	if (isset($ler_extensoes))
	{
		$extensoes = explode(",",$ler_extensoes);
		$temp1 = array();
	}
	else
	{
		$temp1 = get_loaded_extensions();
	}
	$ler_extensoes = array();
	if (count($extensoes) > 0)
	{
		$s = PHP_SHLIB_SUFFIX;
		foreach ($extensoes as $templ)
		{
			if (in_array( $templ, $temp1) != TRUE)
			{
				@dl( 'php_'.$templ.".".$s );
				$ler_extensoes[] = $templ;
				/*
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
				*/
			}
		}
		//verifica se carregou a gd se n�o, tenta carregar a gd2
		if (!function_exists('imagecreate'))
		{
			@dl( 'php_gd.'.$s );
			$ler_extensoes[] = 'gd';
			/*
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
			*/
		}
		if (!function_exists('imagecreate'))
		{
			@dl( 'php_gd2.'.$s );
			$ler_extensoes[] = 'gd2';
			/*
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
			*/
		}
		//verifica se carregou o mapscript
		if (!function_exists('ms_GetVersion'))
		{
			@dl( 'php_mapscript.'.$s );
			$ler_extensoes[] = 'php_mapscript';	
			/*
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
			*/
		}
	}
	if((is_array($ler_extensoes)) && (count($ler_extensoes) > 0))
	$ler_extensoes = implode(",",(array_unique($ler_extensoes)));
}
?>