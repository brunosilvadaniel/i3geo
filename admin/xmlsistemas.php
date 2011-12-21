<?php
/*
Title: xmlsistemas

Monta um arquivo XML, no padr�o RSS, contendo a lista de sistemas adicionais que s�o mostrados na �rvore de adi��o de novos temas ao mapa.

<http://localhost/i3geo/admin/xmlsistemas.php>

<geraXmlSistemas>

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

i3geo/admin/xmlsistemas.php
*/

error_reporting(0);
if(!isset($locaplic) || !isset($editores))
{
	$locaplic = "";
	if(file_exists("../../../ms_configura.php"))
	{include("../../../ms_configura.php");}
	else
	{
		if(file_exists("../../ms_configura.php"))
		{include("../../ms_configura.php");}
		else
		{
			if(file_exists("../ms_configura.php"))
			{include("../ms_configura.php");}
			else
			include("ms_configura.php");
		}	
	}
}
include_once($locaplic."/classesphp/pega_variaveis.php");
include_once($locaplic."/admin/php/xml.php");
if(!isset($perfil)){$perfil = "";}
echo header("Content-type: application/xml");
echo geraXmlSistemas($perfil,$locaplic,$editores);
?>
