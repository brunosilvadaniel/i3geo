<?php
/*
Title: Monotor remoto

Monitora as mudan�as em um mapa original. Obt�m os dados necess�rios para atualizar o mapa clonado.

Veja:

<i3GEO.tema.dialogo.telaremota>

Arquivo:

i3geo/ferramentas/telaremota/openlayers1.php

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
*/
session_name("i3GeoPHP");
session_id($_GET["g_sid"]);
session_start();
if($_GET["funcao"] == "registra"){
	$_SESSION["extenttelaremota"] = $_GET["ext"];
	ob_clean();
	echo header("Content-type: text/html \n\n");	
	echo json_encode(array("data"=>"ok"));
	return;
}
if($_GET["funcao"] == "recupera"){
	ob_clean();
	echo header("Content-type: text/html \n\n");	
	echo json_encode(array("data"=>array("extent"=>$_SESSION["extenttelaremota"],"contadorsalva"=>$_SESSION["contadorsalva"])));
	return;
}
?>