<?php
/*
Title: funcoes_login.php

Controle das requisi��es em Ajax utilizadas para gerenciar login de usu�rio e controle de acesso

Recebe as requisi��es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

O par�metro "funcao" define qual a opera��o que ser� executada. Esse par�metro � verificado em um bloco "switch ($funcao)".

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Edmar Moretti
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

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

i3geo/classesphp/funcoes_login.php

Parametros:

funcao - op��o que ser� executada (veja abaixo a lista de Valores que esse par�metro pode assumir).

Retorno:

O resultado da opera��o ser� retornado em um objeto CPAINT.

A constru��o da string JSON � feita preferencialmente pelas fun��es nativas do PHP.
Para efeitos de compatibilidade, uma vez que at� a vers�o 4.2 a string JSON era construida pelo CPAINT,
o objeto CPAINT ainda � definido, por�m, a fun��o cpjson verifica se as fun��es nativas do PHPO (json)
est�o instaladas, se estiverem, utiliza-se a fun��o nativa, se n�o, utiliza-se o CPAINT para gerar o JSON.

Exemplo de chamada CPAINT (Ajax) do lado do cliente (javascript):

var p = "classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid

var cp = new cpaint()

cp.set_response_type("JSON")

cp.call(p,"lente",ajaxabrelente)

*/
error_reporting(0);
//
//pega as variaveis passadas com get ou post
//
include_once("/pega_variaveis.php");
session_name("i3GeoLogin");
if(!empty($_POST["login"]) && !empty($_POST["usuario"])){
	session_regenerate_id();
	$_SESSION = array();
	session_start();
}
else{
	if(!empty($_COOKIE["i3geocodigologin"]){
		session_id($_COOKIE["i3geocodigologin"]);
		session_start();
	}
	else{
		$retorno = "erro";
	}
}

$retorno = ""; //string que ser� retornada ao browser via JSON
switch (strtoupper($funcao))
{
	/*
	Valor: LOGIN
	
	Verifica usu�rio e senha e registra id da sessao que guarda o resultado.
	
	<iniciaMapa>
	*/
	case "LOGIN":
		$_SESSION["usuario"] = $_POST["usuario"];
		$retorno = session_id();
	break;
}
cpjson($retorno);
?>