<?php
/*
Este programa inicia o i3geo e roda uma fun��o para processar o mapfile criado antes de abrir o mapa
*/
//
//nome da fun��o que ser� executada antes de abrir o I3Geo
//
$executa = "teste";
//
//caminho relativo ao programa atual, onde est� instalado o I3Geo
//
$caminho = "../";
//
//include do ms_criamapa.php que inicia o I3Geo
//
include ("../ms_criamapa.php");
//
//fun��o que ser� executada
//
function teste()
{
	global $tmpfname;
	//
	//inclua aqui a fun��o que ir� processar o mapfile atual
	//
	echo "<br>";
	echo "Mapfile atual= ".$tmpfname;
	//
	//para o I3Geo para mostrar o resultado
	//exclua essa linha em uma implementa��o real
	//
	exit;
}
?>
