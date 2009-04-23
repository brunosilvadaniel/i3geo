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
if(tema == "undefined"){tema = "";}
ativaGuias("")
mostraGuia("guia1")
comboi = ""
//eventos das guias
$i("guia1").onclick = function()
{mostraGuia("guia1")}
$i("guia2").onclick = function()
{mostraGuia("guia2")}
mensagemAjuda("men1",$i("men1").innerHTML)
//combo com as camadas
comboCamadas("selCamada",tema,function(retorno)
{
	if (retorno.dados == "") //tema unico
 	{$i("combot").innerHTML="";registrosf()}
 	else
 	{
		$i("combot").innerHTML = "<div style=top:10px class=destaca >O tema escolhido &eacute; composto por mais de uma camada de dados. Selecione uma das camadas para listar:</div><br>"+retorno.dados
		$i("selCamada").onchange = function()
		{
		 	tema = $i("selCamada").value
			registrosf()
		}
 	}
},"combot"
)
function registrosf()
{
	aguarde("block")
	$i("men1").style.display = "block"
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=listaitens&tema="+tema,"listaItens",listaitensComPar);
}
YAHOO.example.init = function ()
{
	function onPushButtonsMarkupReady()
	{
		new YAHOO.widget.Button("botao1");
	}
   	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
}()	
//monta a lista de itens com op��es de cores
function listaitensComPar(retorno)
{
	aguarde("none")
	if (retorno.data != undefined)
	{
		var ins = new Array()
		ins.push("<table class=lista >")
		for (i=0;i<retorno.data.valores.length; i++)
		{
			ins.push("<tr><td><input onclick='pegaitens()' size=2 style='cursor:pointer' name="+retorno.data.valores[i].item+" type=checkbox id="+retorno.data.valores[i].item+" /></td>")
			ins.push("<td>"+retorno.data.valores[i].item+"</td>")
			ins.push("<td><input id=cor"+retorno.data.valores[i].item+" type=text size=13 value="+randomRGB()+" /></td>")
			ins.push("<td><img style=cursor:pointer src='../../imagens/aquarela.gif' onclick=\"corj('cor"+retorno.data.valores[i].item+"')\" /></td></tr>")
		}
		ins.push("</table>")
		$i("listai").innerHTML = ins.join("")
	}
	else
	{$i("listai").innerHTML = "<p style=color:red >Ocorreu um erro<br>"}
}
//abre a paleta de cores
function corj(obj)
{window.parent.i3GEO.util.abreCor("wdocai",obj)}
//pega os itens
function pegaitens()
{
	var listadeitens = new Array();
	var g = document.getElementById("listai")
	var iguias = g.getElementsByTagName("input")
	for (i=0;i<iguias.length; i++)
	{
		if (iguias[i].checked == true)
		{
			var it = iguias[i].id
			var c = document.getElementById("cor"+it).value
			listadeitens.push(it+","+c)
		}
	}
	//document.getElementById("listadeitens").value = listadeitens.join("*")
	return(listadeitens.join("*"))
}
//cria o tema novo
function criar()
{
	aguarde("block")
	var lista = pegaitens()
	if (tema == "")
	{alert("selecione um tema");aguarde("none");return;}
	if (lista == "")
	{alert("selecione um item");aguarde("none");return;}
	var outlinecolor = $i("outlinecolor").value
	var offset = $i("offset").value
	var tipo = $i("tipo").value
	if (tipo == "PIE")
	var tamanho = $i("largura").value
	else
	var tamanho = $i("largura").value+" "+$i("altura").value
	var temp = function(retorno)
	{
		aguarde("none")
		window.parent.i3GEO.atualiza(retorno)
	}	
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=graficotema&tema="+tema+"&lista="+lista+"&tamanho="+tamanho+"&tipo="+tipo+"&outlinecolor="+outlinecolor+"&offset="+offset
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"graficotema",temp);
}
