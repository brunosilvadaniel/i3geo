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
buscawiki()
//pega a lista de temas editaveis
function buscawiki()
{
	$i("resultadowiki").innerHTML = "Aguarde...";
	if (window.parent.objmapa.scale > 500001)
	{
		var ins = "Aproxime mais o mapa (pelo menos at� a escala 1:500.000)!";
		ins += "<br><br><div onclick='ajustarescala()' ><input  id=botao1 size=20  type=button value='Ajustar escala' /></div>"
		$i("resultadowiki").innerHTML = ins;
		YAHOO.example.init = function ()
		{
			function onPushButtonsMarkupReady()
			{new YAHOO.widget.Button("botao1");}
   			YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
		}() 	
		return;
	}
	//pega a lista de temas locais do mapfile
	var cp = new cpaint();
	cp.set_response_type("JSON");
	//cp.set_debug(2)
	var p = g_locaplic+"/ferramentas/wiki/funcoes.php?funcao=listaartigos&ret="+window.parent.objmapa.extent;
	cp.call(p,"listaartigos",listaartigos);
}
function listaartigos(retorno)
{
	var ins = "<p>A busca no Mediawiki traz apenas os 20 primeiros resultados"
	ins += "<p>Se a abrang&ecirc;ncia geogr&aacute;fica de busca for muito grande, pode ocorrer erro devido ao tempo de processamento."
	ins += '<p>Mais detalhes sobre a busca, veja <a href="http://www.geonames.org" >Geonames</a>'
	$i("resultadowiki").innerHTML = retorno.data+ins;
}
function ajustarescala()
{
	var cp = new cpaint();
	cp.set_response_type("JSON");
	//cp.set_debug(2)
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaescala&g_sid="+g_sid+"&escala=500000";
	cp.call(p,"mudaescala",window.parent.ajaxredesenha);
}