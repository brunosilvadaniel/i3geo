/*
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
*/
parametrosURL()
//variaveis globais
g_tipo = ""; //tipo de tema
g_tema = ""; //tema selecionado do ws
g_legenda = ""; //legenda do tema
g_nometema = ""; //nome do tema
aguarde("none");
$i("guia1").onclick = function()
{
	$i("guia1obj").style.display="block";
	$i("resultadoget").innerHTML = "";
}
$i("guia2").onclick = function(){clickGuia2();}
$i("guia3").onclick = function(){clickGuia3();}

function getcapabilities()
{
	if ($i("servico").value == ""){alert("Servi�o n�o definido");}
	else
	{
		window.open($i("servico").value+"&service=wfs&request=getcapabilities&version=1.1.0")
	}
}

function clickGuia2()
{
	if ($i("servico").value == ""){alert("Servi�o n�o definido");}
	else
	{
		$i("guia2obj").style.display="block";
		aguarde("block")
		var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=getcapabilities3&servico="+$i("servico").value
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"getcapabilities3",metadados);
	}
}
function clickGuia3()
{
	$i("guia3obj").style.display="block";
	$i("guia1obj").style.display="none";
	$i("listatemas").innerHTML = "";
	aguarde("block")
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=temaswfs&servico="+$i("servico").value
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"temaswfs",listatemas);
}
function registraws(nome)
{
	$i("servico").value = nome;
	g_tipo = ""; //tipo de tema
	g_tema = ""; //tema selecionado do ws
	g_legenda = ""; //legenda do tema
	g_nometema = ""; //nome do tema
	clickGuia3()
}

function metadados(retorno)
{
	if (retorno.data != undefined)
	{
		aguarde("none");
		$i("resultadoget").innerHTML = retorno.data;
	}
	else
	{
		aguarde("none")
		$i("resultadoget").innerHTML = "<p style=color:red >Ocorreu um erro<br>"
	}
}
function listatemas(retorno)
{
	aguarde("none");
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		$i("listatemas").innerHTML = retorno.data;
	}
	else
	{$i("listatemas").innerHTML = "erro";}
}
function seltema(nome,titulo,prj,serv)
{
	var par = "&nome="+nome+"&titulo="+titulo+"&prj="+prj+"&wfs="+serv;
	aguarde("block")
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=importawfs&servico="+$i("servico").value+par
	var cp = new cpaint();
	cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"importawfs",window.parent.i3GEO.atualiza);	
}
