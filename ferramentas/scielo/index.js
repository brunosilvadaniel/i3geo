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
if(window.parent.i3GEO.parametros.mapscale > 150001){
	var ins = "<p>A busca &eacute; feita apenas para a regi&atilde;o de abrang&ecirc;ncia do mapa atual, cuja escala deve estar em pelo menos 1:150.000."
	ins += "<p>A restri��o de escala � necess�ria para melhorar a performance da busca."
	ins += "<p>O mapa atual est� fora do limite de escala (1:150.000)."
	ins += "<p><input id=ajustaEscala size=20  type=button value='Ajustar' />"
	$i("resultadoscielo").innerHTML = ins;
}
else{
	if(window.parent.scieloAtivo == false){
		var ins = "<p>A busca de artigos ainda � experimental."
		ins += '<p>Os dados n�o s�o obtidos diretamente da base Scielo, mas sim do Minist�rio do Meio Ambiente.'
		ins += "<p><input id=continuar size=20  type=button value='Continuar' />"
		$i("resultadoscielo").innerHTML = ins;
	}
	else{buscawiki();}
}
if($i("ajustaEscala")){
	new YAHOO.widget.Button("ajustaEscala",{onclick:{fn: function(){
		window.parent.i3GEO.parametros.mapscale=150000;
		window.parent.i3GEO.navega.aplicaEscala(window.parent.i3GEO.configura.locaplic,window.parent.i3GEO.configura.sid,150000)
	}}});
}
if($i("continuar")){
	new YAHOO.widget.Button("continuar",{onclick:{fn: function(){
		buscascielo()
	}}});
}

//pega a lista de temas editaveis
function buscascielo()
{
	window.parent.scieloAtivo = true;
	$i("resultadoscielo").innerHTML = "Aguarde...";
	//pega a lista de temas locais do mapfile
	var cp = new cpaint();
	cp.set_response_type("JSON");
	//cp.set_debug(2)
	var p = g_locaplic+"/ferramentas/scielo/funcoes.php?funcao=listaartigos&ret="+window.parent.i3GEO.parametros.mapexten;
	cp.call(p,"listaartigos",listaartigos);
}
function listaartigos(retorno)
{
	$link = "http://www.scielo.br/scielo.php?script=sci_abstract&pid=";
	if(retorno.data == "")
	{$i("resultadoscielo").innerHTML = "N&atilde;o foi poss&iacute;vel acessar os dados";return}
	var res = retorno.data.scielo
	var ins = "<span style=color:red>Navegue pelo mapa para ver o resultado!</span><br><br>"
	if (res.length == 0)
	{ins += "<br><span style=color:red>Nada encontrado nessa regi&atilde;o!</span><br><br>";}
	else
	{
		for (i=0;i<res.length;i++)
		{
			ins += "<br><a href='"+$link+res[i].codigo+"' target=blank >"+res[i].titulo+"</a><br><br>"
		}
	}
	$i("resultadoscielo").innerHTML = ins;
}
