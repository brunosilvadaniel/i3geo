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
YAHOO.example.init = function ()
{
	function onPushButtonsMarkupReady()
	{new YAHOO.widget.Button("botao1");}
	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()
//pega a cor atual
var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=pegacorfundo"
var cp = new cpaint();
//cp.set_debug(2)
cp.set_response_type("JSON");
var retorno = function(retorno){
	if(retorno.data.erro){aguarde("none");return;}
	$i("cor").value = retorno.data;
}
cp.call(p,"corQM",retorno);

function mudacor()
{
	var temp = function()
	{
		aguarde("none")
		window.parent.i3GEO.atualiza("")
	}
	aguarde("block")
	var cor = $i("cor").value
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=corfundo&cor="+cor
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	window.parent.g_operacao = "outras"
	cp.call(p,"corQM",temp);
}
//abre a paleta de cores
function cor(obj)
{window.parent.i3GEO.util.abreCor("wdocai",obj)}
