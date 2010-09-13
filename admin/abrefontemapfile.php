<?php
/*
Title: abrefontemapfile

Abre no navegador a p�gina com os metadados sobre um tema.

O link para os metadados � obtido do banco de administra��o.

Para usar esse programa digite <http://localhost/i3geo/admin/abrefontemapfile.php?tema=codigo>

Parametro:

tema {string} - codigo do tema (nome do mapfile existente em i3geo/temas)

Licenca:

GPL2


i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

i3geo/admin/abrefontemapfile.php
*/
error_reporting(0);
if(!isset($locaplic))
{
	$locaplic = "";
	if(file_exists("../../../ms_configura.php"))
	{include_once("../../../ms_configura.php");}
	else
	{
		if(file_exists("../../ms_configura.php"))
		{include_once("../../ms_configura.php");}
		else
		{
			if(file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			include_once("ms_configura.php");
		}	
	}
}
include_once($locaplic."/classesphp/pega_variaveis.php");
include_once($locaplic."/admin/php/admin.php");
if(!isset($tema))
{echo "Nenhum tema definido.";exit;}
$editor = verificaEditores($editores);
$dbh = "";
include($locaplic."/admin/php/conexao.php");
$r = pegaDados("select * from i3geoadmin_temas where codigo_tema = '$tema'");
$link = $r[0]["link_tema"];
if($link == "")
{echo "Link n�o encontrado";}
else
{echo "<meta http-equiv='refresh' content='0;url=$link'>";}
?>