<?php
/*
Title: pega_variaveis.php

Processa os array $_GET e $_POST, transformando-as em vari�veis conforme as chaves.
Deve ser inclu�do sempre nos programas em PHP, evitando que o par�metro "REGISTER_GLOBALS" 
do PHP precise ser definido como "On".

No caso do uso de POST do lado cliente com a biblioteca CPAINT, � feito o processamento
dos argumentos definidos na chamada call. Para fazer a chamada utilizando-se POST, deve-se seguir o exemplo abaixo:

	var cp = new cpaint();
	cp.set_response_type("JSON");
	cp.set_transfer_mode("POST");
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid;
	cp.call(p,"criaSHPvazio",ativanovotema,"&funcao=criashpvazio");

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

Exemplo: 

include("pega_variaveis.php");

Arquivo:

i3geo/classesphp/pega_variaveis.php
*/
if (isset($_GET))
{
	foreach(array_keys($_GET) as $k)
	{
		if ($_GET[$k] != "''")
		eval("\$".$k."='".(strip_tags($_GET[$k]))."';");
	}
}
//var_dump($_POST);exit;
if (isset($_POST))
{
	//var_dump($_POST);exit;
	foreach(array_keys($_POST) as $k)
	{
		if (($_POST[$k] != "''"))
		eval("\$".$k."='".(strip_tags($_POST[$k]))."';");
		if (($_POST[$k] != "''") && ($k == "cpaint_argument"))
		{
			foreach($_POST["cpaint_argument"] as $argumento_)
			{
				if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
				{$argumento_ = str_replace("\\\"","",$argumento_);}
				else
				{$argumento_ = str_replace("\"","",$argumento_);}
				$parametros_ = explode("&",$argumento_);
				foreach($parametros_ as $parametro_)
				{	
					//echo $parametro_;
					$p_ = explode("=",$parametro_);
					if($p_[0] != "")
					eval("\$".$p_[0]."='".(strip_tags($p_[1]))."';");	
				}
			}	
			
		}
		
	}

}

?>