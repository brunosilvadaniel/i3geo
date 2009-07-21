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

if(window.parent.i3GEO.parametros.mapscale > 500001){
	var ins = "<p>A busca &eacute; feita apenas para a regi&atilde;o de abrang&ecirc;ncia do mapa atual, cuja escala deve estar em pelo menos 1:500.000."
	ins += "<p>A restri��o de escala � necess�ria para melhorar a performance da busca."
	ins += "<p>O mapa atual est� fora do limite de escala (1:500.000)."
	ins += "<p><input id=ajustaEscala size=20  type=button value='Ajustar' />"
	$i("resultadowiki").innerHTML = ins;
}
else{
	if(window.parent.wikiAtivo == false){
		var ins = "<p>A busca no Mediawiki traz apenas os 20 primeiros resultados"
		ins += '<p>Mais detalhes sobre a busca, veja <a href="http://www.geonames.org" >Geonames</a>'
		ins += "<p><input id=continuar size=20  type=button value='Continuar' />"
		$i("resultadowiki").innerHTML = ins;
	}
	else{buscawiki();}
}


if($i("ajustaEscala")){
	new YAHOO.widget.Button("ajustaEscala",{onclick:{fn: function(){
		window.parent.i3GEO.parametros.mapscale=500000;
		window.parent.i3GEO.navega.aplicaEscala(window.parent.i3GEO.configura.locaplic,window.parent.i3GEO.configura.sid,500000)
	}}});
}
if($i("continuar")){
	new YAHOO.widget.Button("continuar",{onclick:{fn: function(){
		buscawiki()
	}}});
}
//pega a lista de temas editaveis
function buscawiki()
{
	window.parent.wikiAtivo = true;
	$i("resultadowiki").innerHTML = "Aguarde...";
	//pega a lista de temas locais do mapfile
	var cp = new cpaint();
	cp.set_response_type("JSON");
	//cp.set_debug(2)
	if(window.parent.i3GEO.parametros.mapexten){var m = window.parent.i3GEO.parametros.mapexten;}
	else
	{var m = "-43.5680912209 -23.1679922593 -42.6162372815 -22.4685575305";} //apenas para exemplo
	var p = g_locaplic+"/ferramentas/wiki/funcoes.php?funcao=listaartigos&ret="+m;
	cp.call(p,"listaartigos",listaartigos);
}
function listaartigos(retorno)
{
	if (retorno.data==undefined )
	{$i("resultadowiki").innerHTML = "Erro. A opera��o demorou muito.";return;}
	$i("resultadowiki").innerHTML = retorno.data+"Navegue no mapa para atualizar a lista de resultados";
}
