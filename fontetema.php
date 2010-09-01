<?php
/*
Title: fontetema.php

Busca o registro da fonte de um tema e abre o link.

Utilizado em ogc.php

Licenca

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

Arquivo: i3geo/fontetema.php

Parametros:

tema - nome do tema do servi�o. Se for definido, o web service conter� apenas o tema.

Exemplos:

fontetema.php?tema=bioma

*/
include("ms_configura.php");
include("classesphp/pega_variaveis.php");
include("classesphp/classe_temas.php");
include("classesphp/carrega_ext.php");

$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$protocolo = $protocolo[0];
$protocolo1 = strtolower($protocolo) . '://'.$_SERVER['SERVER_NAME'];
$protocolo = strtolower($protocolo) . '://'.$_SERVER['SERVER_NAME'] .":". $_SERVER['SERVER_PORT'];
$urli3geo = str_replace("/ogc.php","",$protocolo.$_SERVER["PHP_SELF"]);

$m = new Temas("",null,$locaplic);
$retorno = $m->fonteTema($tema);
if(!headers_sent())
{header("Location:".$retorno);}
else
{echo "<meta http-equiv='refresh' content='0;url=$retorno'>";}
?>



