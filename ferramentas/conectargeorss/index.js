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

mensagemOpcao("opc1","")
aguarde("none");
$i("guia1").onclick = function()
{
	$i("guia1obj").style.display="block";
	$i("resultadoget").innerHTML = "";
}
$i("guia2").onclick = function(){clickGuia2();}

function clickGuia2()
{
	$i("guia1obj").style.display="none";
	$i("resultadoget").innerHTML = "";
	if ($i("servico").value == ""){alert("Servi�o n�o definido");}
	else
	{
		$i("guia2obj").style.display="block";
		aguarde("block")
		var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=georssCanais&servico="+$i("servico").value
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"georssCanais",listaCanais);
	}
}
function registraws(nome)
{
	$i("servico").value = nome;
	clickGuia2()
}
function listaCanais(retorno)
{
	var ins = mensagemAjuda("","Clique no bot&atilde;o 'mapa' para incluir os dados do canal desejado")
	if (retorno.data != undefined)
	{
		var retorno = (retorno.data).split("*")
		for (i=0;i<retorno.length; i++)
		{
			var canal = retorno[i]
			var descs = canal.split("#")
			ins += "<p style=cursor:pointer onclick=adicionatema('"+i+"') ><input type=radio name=cn value=mapa >&nbsp;<b>"+descs[0]+ "</b></p>"
			ins += "<br><a href="+descs[1]+" target=blank >"+descs[1]+"</a>"
			ins += "<br><i>Descri&ccedil;&atilde;o:</i> "+descs[2]
			ins += "<br><i>Categoria: </i>"+descs[3]
		}
		$i("resultadoget").innerHTML = ins
	}
	else
	{
		$i("resultadoget").innerHTML = "<p style=color:red >Ocorreu um erro<br>"
	}
	aguarde("none")
}
function adicionatema(id)
{
	aguarde("block")
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=adicionaTemaGeoRSS&canal="+id+"&servico="+$i("servico").value
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"adicionaTemaGeoRSS",window.parent.ajaxredesenha);
	aguarde("none")
}