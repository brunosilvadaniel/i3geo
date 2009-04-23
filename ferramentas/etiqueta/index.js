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
//preenche a lista de itens
radioitensf
(
	tema,
	function(retorno)
	{
		$i("listai").innerHTML = retorno.dados
	},
	"listai"
)
YAHOO.example.init = function ()
{
	function onPushButtonsMarkupReady()
	{
		new YAHOO.widget.Button("botao1");
		new YAHOO.widget.Button("botao2");
	}
   	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()	
//executa a operacao
$i("executar").onclick = function()
{
	//se for vazio o tema nao possui tabela, mas a toponimia pode existir
	var listai = new Array;
	var tema = "";
	var item = "";
	if ($i("listai").innerHTML != "")
	{
		var ipt = $i("listai").getElementsByTagName("input")
		for (i=0;i<ipt.length; i++)
		{
			if (ipt[i].checked)
			{
				var temp = (ipt[i].id).split(";")
				var tema = temp[1]
				var item = temp[0]			
			}
		}
	}
	else {var tema = ipt[i].id;var item = ""}
	if (tema == "")
	{alert("selecione um item");aguarde("none");}
	else
	{
		aguarde("block")
		var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=ativaEtiquetas&tema="+tema+"&item="+item
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"ativaEtiquetas",concluido);
	}
}
//remove a etiqueta
$i("remover").onclick = function()
{
		aguarde("block")
		var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=removeEtiquetas&tema="+tema
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"removeEtiquetas",concluido);
}
function concluido()
{
	aguarde("none")
}