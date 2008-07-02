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

var montaNuvem = function(retorno)
{
	if(retorno.data)
	{
		var tags = ""
		for (i=0;i<retorno.data.length;i++)
		{
			//eval("var h = retorno.data."+tag)
			var h = retorno.data[i].temas.length*1 + 7
			tags += "<span> </span> <span onmouseout='this.style.textDecoration=\"none\"' onmouseover='this.style.textDecoration=\"underline\"' onclick='procurar(this)' style='cursor:pointer;vertical-align:middle;color:rgb(98,186,192);font-size:"+h+"pt;'>"+retorno.data[i].tag+"</span"
		}
	}
	else
	{var tags = "Nenhum tag encontrado"}
	$i("resultado").innerHTML = tags;
	aguarde("none")
}

//pega a lista de tags
$i("resultado").innerHTML = "Aguarde...";
var cp = new cpaint();
cp.set_response_type("JSON");
//cp.set_debug(2)
var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=listaTags&sid="+g_sid;
cp.call(p,"listaTags",montaNuvem);

function procurar(texto)
{
	if(window.parent.document.getElementById("buscatema"))
	{
		window.parent.document.getElementById("buscatema").value = texto.innerHTML
		window.parent.procurartemas()
	}
}