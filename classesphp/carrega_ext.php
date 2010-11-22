<?php
/*
Title: carrega_ext.php

Verifica se as extens�es do PHP necess�rias ao i3Geo est�o carregadas, inclusive o php_mapscript.
Tenta carregar as extens�es que n�o estiverem habilitadas diretamente na configura��o do PHP.

O ms_criamapa.php define a vari�vel de se��o $ler_extensoes indicando as extens�es que devem ser lidas
antes de ser utilizado o PHPMapscript.

Caso seja necess�rio carregar alguma extens�o adicional, basta incluir no array $extensoes

Se todas as extens�es forem carregadas diretamente pelo PHP, esse programa pode ser totalmente comentado 
melhorando a performance do i3geo.

Nas vers�es mais novas do PHP, o carregamento din�mico de extens�es
n�o � mais permitido, tornando esse programa in�til.

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

Arquivo:

i3geo/classesphp/carrega_ext.php
*/
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
			}
		}
		//verifica se carregou a gd se n�o, tenta carregar a gd2
		if (!function_exists('imagecreate'))
		{
			@dl( 'php_gd.'.$s );
			$ler_extensoes[] = 'gd';
		}
		if (!function_exists('imagecreate'))
		{
			@dl( 'php_gd2.'.$s );
			$ler_extensoes[] = 'gd2';
		}
		//verifica se carregou o mapscript
		if (!function_exists('ms_GetVersion'))
		{
			@dl( 'php_mapscript.'.$s );
			$ler_extensoes[] = 'php_mapscript';	
		}
	}
	if((is_array($ler_extensoes)) && (count($ler_extensoes) > 0))
	$ler_extensoes = implode(",",(array_unique($ler_extensoes)));
}
else
{$ler_extensoes = "";}
?>