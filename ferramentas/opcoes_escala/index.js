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
//inicializa
aguarde("block")
parametrosURL()
var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=escalaparametros"
var cp = new cpaint();
//cp.set_debug(2)
cp.set_response_type("JSON");
cp.call(p,"parametrosBarraEscala",inicia);
YAHOO.example.init = function ()
{
	function onPushButtonsMarkupReady()
	{
		new YAHOO.widget.Button("botao1");
	}
	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()

function inicia(retorno)
{
	if (retorno.data != undefined)
	{
		var retorno = retorno.data
		eval(retorno)
		$i("w").value = w
		$i("h").value = h
		$i("estilo").value = estilo
		$i("intervalos").value = intervalos
		$i("unidade").value = unidade
		$i("cor").value = cor
		$i("bcor").value = bcor
		$i("ocor").value = ocor
	}
	aguarde("none")
}
function executa()
{
	var temp = function()
	{
		aguarde("none")
		window.parent.ajaxredesenha("")
	}
	aguarde("block")
	var w = $i("w").value
	var h = $i("h").value
	var estilo = $i("estilo").value
	var intervalos = $i("intervalos").value
	var unidade = $i("unidade").value
	var cor = $i("cor").value
	var bcor = $i("bcor").value
	var ocor = $i("ocor").value
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=mudaescalagrafica&w="+w+"&h="+h+"&estilo="+estilo+"&intervalos="+intervalos+"&unidade="+unidade+"&cor="+cor+"&bcor="+bcor+"&ocor="+ocor
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"mudaEscalaGrafica",temp);
}
//abre a paleta de cores
function corj(obj)
{window.parent.i3GEO.util.abreCor("wdocai",obj)}
function testaBarra()
{
	var muda = function(retorno)
	{$i("teste").innerHTML = "<img src='"+retorno.data+"'>"}
	var w = $i("w").value
	var h = $i("h").value
	var estilo = $i("estilo").value
	var intervalos = $i("intervalos").value
	var unidade = $i("unidade").value
	var cor = $i("cor").value
	var bcor = $i("bcor").value
	var ocor = $i("ocor").value
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=testaescalagrafica&w="+w+"&h="+h+"&estilo="+estilo+"&intervalos="+intervalos+"&unidade="+unidade+"&cor="+cor+"&bcor="+bcor+"&ocor="+ocor
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"testaescalagrafica",muda);
} 
