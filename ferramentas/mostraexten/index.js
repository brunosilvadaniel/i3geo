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
	{
		new YAHOO.widget.Button("botao1");
	}
   	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()
$i("extatual").innerHTML = window.parent.objmapa.extent
function aplicar()
{
	try
	{
		var temp = function (retorno)
		{
			eval(retorno.data)
			$i("extatual").innerHTML = mapexten
			window.parent.ajaxredesenha("")
		}
		var x = window.parent.convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
		var xx = window.parent.convdmsddf($i("xxg").value,$i("xxm").value,$i("xxs").value);
		var y = window.parent.convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
		var yy = window.parent.convdmsddf($i("yyg").value,$i("yym").value,$i("yys").value);
		if ((x == xx) || (y == yy))
		{alert("Digite coordenadas v�lidas");return;}
		var cp = new cpaint();
		cp.set_response_type("JSON");
		//cp.set_debug(2) 
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&tipoimagem="+window.parent.g_tipoimagem+"&ext="+x+" "+y+" "+xx+" "+yy+"&g_sid="+window.parent.g_sid;
		cp.call(p,"sphPT2shp",temp);
	}
	catch(e){alert("Digite coordenadas v�lidas");}
}
