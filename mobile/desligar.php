<?php
/*
Title: desligar.php

Desliga um tema que est� vis�vel no mapa

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
include("../classesphp/classe_mapa.php");
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
<form id='f' action='desligar.php?' method='get'>
	<input type='hidden' name='tmpfname' value='<?php echo $tmpfname; ?>' />
	<input id='tipo' type=hidden name='tipo' value='retorno' />
	<input id='tema' type=hidden name='tema' value='' />
</form>
<input type='button' value='retorna' style='cursor:pointer;' onclick='retorno()' /><br>
<?php
$m = New Mapa($tmpfname);
if(isset($tema) && $tema != '')
{
	$m->ligaDesligaTemas("","$tema");
	$m->salva();
}
$m = New Mapa($tmpfname);
$par = $m->parametrosTemas();
$par = mb_convert_encoding($par,"ISO-8859-1","UTF-8");
$par = explode("'",$par);
$par = explode(";",$par[1]);
echo "<h1>Escolha o tema que vc n�o quer ver no mapa:</h1>";
$existe = false;
foreach($par as $p)
{
	$p = explode("*",$p);
	if($p[1] == 2)
	{
		$existe=true;
		echo "<input type=radio value='$p[0]' onclick='desligar(this.value)' />".$p[2]."<br>";
	}
}
if (!$existe)
echo "<span style='color:red' >Nenhum tema dispon&iacute;vel.</br>";
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
function desligar(tema)
{
	document.getElementById('tema').value=tema;
	document.getElementById('f').submit();
}
</script>
</html>

