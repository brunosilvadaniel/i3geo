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
aguarde("block")
var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=convertews"
var cp = new cpaint();
//cp.set_debug(2)
cp.set_response_type("JSON");
cp.call(p,"converteWS",resultado);
function resultado(retorno)
{
	if (retorno.data != undefined)
	{

		aguarde("none")
		$i("resultado").innerHTML = window.location.protocol+"//"+window.location.host+retorno.data+"&<br>"
	    var getcapa = window.location.protocol+"//"+window.location.host+retorno.data+"&request=getcapabilities&service=wms&version=1.1.0"
		$i("resultado").innerHTML += "<br><a href='"+getcapa+"' target=blank >Testar</a>"
		mensagemAjuda("men1",$i("men1").innerHTML)
	}
	else
	{
		aguarde("none")
		$i("resultado").innerHTML = "<p style=color:red >Ocorreu um erro<br>"
	}
}
