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
download()
function download()
{
	aguarde("block")
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=download&tema="+tema;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"downloadTema",mostraDownload);
}
function mostraDownload(retorno)
{

	aguarde("none")
	if (retorno.data != undefined)
	{
		var retorno = retorno.data
		var arqs = retorno.split(",")
		var n = arqs.length;
		if(retorno == "erro")
		{var ins = "<p style=color:red >Ocorreu um erro. O tema n�o foi encontrado. Pode ser que o c�digo do tema n�o existe na defini��o do mapfile. Informe o administrador do sistema.<br>";}
		else
		{
			var ins = "<b>Clique nos links para pegar os arquivos.</b><br><br>"
			for (var arq=0;arq<n;arq++)
			{
				ins += "<a href='"+window.location.protocol+"//"+window.location.host+"/"+arqs[arq]+"'>"+arqs[arq]+"<br>"
			}
		}
	}
	else
	{
		var ins = "<p style=color:red >Ocorreu um erro<br>"
	}
	document.getElementById("resultado").innerHTML = ins

}