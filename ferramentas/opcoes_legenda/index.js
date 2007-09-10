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
parametrosURL()
var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=pegaParametrosLegImg"
var cp = new cpaint();
//cp.set_debug(2)
cp.set_response_type("JSON");
cp.call(p,"pegaParametrosLegImg",inicia);
YAHOO.example.init = function ()
{
	function onPushButtonsMarkupReady()
	{new YAHOO.widget.Button("botao1");}
	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()
function inicia(retorno)
{
	if(retorno.data != "")
	{
		$i("imagecolor").value = retorno.data.imagecolor;
		$i("position").value = retorno.data.position
		$i("status").value = retorno.data.status
		$i("outlinecolor").value = retorno.data.outlinecolor
		$i("keyspacingy").value = retorno.data.keyspacingy
		$i("keyspacingx").value = retorno.data.keyspacingx
		$i("keysizey").value = retorno.data.keysizey
		$i("keysizex").value = retorno.data.keysizex
		$i("labelsize").value = retorno.data.labelsize
	}
	aguarde("none")
}
function executa()
{
	var par = ""
	var v = $i("imagecolor").value
	if (v == ""){v = "-1,-1,-1"}
	par += "&imagecolor="+v
	par += "&position="+$i("position").value
	par += "&status="+$i("status").value
	var v = $i("outlinecolor").value
	if (v == ""){v = "-1,-1,-1"}
	par += "&outlinecolor="+v
	par += "&keyspacingy="+$i("keyspacingy").value
	par += "&keyspacingx="+$i("keyspacingx").value
	par += "&keysizey="+$i("keysizey").value
	par += "&keysizex="+$i("keysizex").value
	par += "&height=0"
	par += "&width=0"
	par += "&labelsize="+$i("labelsize").value
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=aplicaParametrosLegImg"+par
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"mudaEscalaGrafica",window.parent.ajaxredesenha);
}
//abre a paleta de cores
function corj(obj)
{window.parent.abreCor("wdocai",obj)}
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
