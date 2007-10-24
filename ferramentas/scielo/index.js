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

buscascielo()
//pega a lista de temas editaveis
function buscascielo()
{
	g_sid = window.parent.objmapa.sid
	g_locaplic = window.parent.g_locaplic
	$i("resultadoscielo").innerHTML = "Aguarde...";
	if (window.parent.objmapa.scale > 150001)
	{
		$i("resultadoscielo").innerHTML = "Aproxime mais o mapa (pelo menos at� a escala 1:150.000)!";
		return;
	}
	//pega a lista de temas locais do mapfile
	var cp = new cpaint();
	cp.set_response_type("JSON");
	//cp.set_debug(2)
	var p = g_locaplic+"/ferramentas/scielo/funcoes.php?funcao=listaartigos&ret="+window.parent.objmapa.extent;
	cp.call(p,"listaartigos",listaartigos);
}
function listaartigos(retorno)
{
	$link = "http://www.scielo.br/scielo.php?script=sci_abstract&pid=";
	var res = retorno.data.split("#")
	var ins = "<span style=color:red>Navegue pelo mapa para ver o resultado!</span><br><br>"
	for (i=0;i<res.length;i++)
	{
		var val = res[i].split("*")
		if (val[0] != "")
		{ins += "<br><a href='"+$link+val[0]+"' target=blank >"+val[1]+"</a><br><br>"}
		else
		{ins += "<br>"+val[1]+"<br><br>"}
	}
	$i("resultadoscielo").innerHTML = ins;
}