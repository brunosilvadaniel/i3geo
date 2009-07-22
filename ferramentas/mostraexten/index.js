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
//pega o elemento boxref para desenhar um ret�ngulo no mapa de refer�ncia

//inicializa alguns par�metros.
parametrosURL()
YAHOO.example.init = function ()
{
	function onPushButtonsMarkupReady()
	{
		new YAHOO.widget.Button("botao1");
	}
   	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()
$i("extatual").innerHTML = window.parent.i3GEO.parametros.mapexten
function aplicar()
{
	try
	{
		$i("extatual").innerHTML = "Para ver a nova extens�o aplicada, abra novamente esta ferramenta";
		var x = window.parent.i3GEO.calculo.dms2dd($i("xg").value,$i("xm").value,$i("xs").value);
		var xx = window.parent.i3GEO.calculo.dms2dd($i("xxg").value,$i("xxm").value,$i("xxs").value);
		var y = window.parent.i3GEO.calculo.dms2dd($i("yg").value,$i("ym").value,$i("ys").value);
		var yy = window.parent.i3GEO.calculo.dms2dd($i("yyg").value,$i("yym").value,$i("yys").value);
		if ((x == xx) || (y == yy))
		{alert("Digite coordenadas v�lidas");return;}
		if ((x > xx) || (y > yy))
		{alert("Digite coordenadas v�lidas");return;}
		window.parent.i3GEO.navega.zoomExt(g_locaplic,g_sid,window.parent.i3GEO.parametros.tipoimagem,(x+" "+y+" "+xx+" "+yy))
	}
	catch(e){alert(e+" Erro. Digite coordenadas v�lidas");}
}
//muda o box no mapa de refer�ncia
function mudabox()
{
	if((boxref) && !window.parent.document.getElementById("refDinamico").checked)
	{
		var x = window.parent.i3GEO.calculo.dms2dd($i("xg").value,$i("xm").value,$i("xs").value);
		var xx = window.parent.i3GEO.calculo.dms2dd($i("xxg").value,$i("xxm").value,$i("xxs").value);
		var y = window.parent.i3GEO.calculo.dms2dd($i("yg").value,$i("ym").value,$i("ys").value);
		var yy = window.parent.i3GEO.calculo.dms2dd($i("yyg").value,$i("yym").value,$i("yys").value);
		if ((x == xx) || (y == yy))
		{return;}
		if ((x > xx) || (y > yy))
		{return;}
		//calculo da nova posi��o do box
		var extr = window.parent.objmapa.extentref.split(" ");
		boxref.style.left = ((extr[0] - x) / window.parent.g_celularef) * -1
		boxref.style.width = ((xx - x) / window.parent.g_celularef)
		boxref.style.top = ((extr[3] - yy) / window.parent.g_celularef)
		boxref.style.height = ((yy - y) / window.parent.g_celularef)
	}
}