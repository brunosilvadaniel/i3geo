<?php
/*
Title: ativatexto.php

Ativa a toponimia de um tema

File: i3geo/mobile/desligar.php

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

Parameters:

tmpfname - nome do mapfile em uso
*/

require_once("../classesphp/funcoes_gerais.php");
include_once ("../classesphp/pega_variaveis.php");
include_once("../classesphp/carrega_ext.php");
include("../classesphp/classe_vermultilayer.php");
if (!isset($tema)){$tema = "";}
if (!isset($item)){$item = "";}
?>
<html>
<style>
body
{
	font:14pt arial,helvetica,clean,sans-serif;
	color:rgb(100,100,100);
}
p
{
	font:12pt arial,helvetica,clean,sans-serif;
	color:black;
}
input
{
	font:14pt arial,helvetica,clean,sans-serif;
	color:black;
	cursor:pointer;
	background-color:white;
}
h1
{
	font:16pt arial,helvetica,clean,sans-serif;
	color:brown;
}
</style>
<body>
<form id='f' action='ativatexto.php?' method='get'>
	<input type='hidden' name='tmpfname' value='<?php echo $tmpfname; ?>' />
	<input id='tipo' type=hidden name='tipo' value='retorno' />
	<input id='tema' type=hidden name='tema' value='<?php echo $tema; ?>' />
	<input id='item' type=hidden name='item' value='' />
</form>
<input type='button' value='retorna' style='cursor:pointer;' onclick='retorno()' /><br>
<?php
//
//ativa a topon�mia de um tema baseado no item selecionado
//
if ($item != "")
{
	include("../classesphp/classe_toponimia.php");
	$m = new Toponimia($tmpfname,$tema);
	$m->criaToponimia($item,"MS_AUTO",1,0,0,auto,auto,0,"off",1,1,"off","100 100 100",1,1,"off","off",0,8,"bitmap","");
	$m->salva();
	$tema = "";
}
//
//monta a lista de itens de um tema
//
if (($tema != '') && ($item == ""))
{
	include("../classesphp/classe_atributos.php");
	$m = new Atributos($tmpfname,$tema);
	$itens = $m->listaItens();
	echo "<h1>Escolha o item que cont�m os textos:</h1>";
	foreach($itens["valores"] as $i)
	{
		echo "<input type=radio value='".$i["item"]."' onclick='ativar(this.value)' />".$i["item"]."<br>";
	}
}
//
//monta a lista de temas
//
if ($tema == '')
{
	include("../classesphp/classe_mapa.php");
	$m = New Mapa($tmpfname);
	$par = $m->parametrosTemas();
	echo "<h1>Escolha o tema que vc quer mostrar os textos no mapa:</h1>";
	foreach($par as $p)
	{
		$existe=true;
		$titulo = mb_convert_encoding($p["tema"],"ISO-8859-1","UTF-8");
		echo "<input type=radio value='".$p["name"]."' onclick='ativartema(this.value)' />".$titulo."<br>";
	}
	if (!$existe)
	echo "<span style='color:red' >Nenhum tema dispon&iacute;vel.</br>";
}
?>
<br><input type='button' value='retorna' style='cursor:pointer;' onclick='retorno()' />
</body>
<script>
function retorno()
{
	document.getElementById('tipo').value='retorno';
	document.getElementById('f').action = 'mobile.php';
	document.getElementById('f').submit();
}
function ativar(item)
{
	document.getElementById('item').value=item;
	document.getElementById('f').submit();
}
function ativartema(tema)
{
	document.getElementById('tema').value=tema;
	document.getElementById('f').submit();
}
</script>
</html>

