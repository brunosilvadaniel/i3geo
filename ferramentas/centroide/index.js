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
ins = ""
tema = ""
comboTemasSel("temasComSel",function(retorno){comboTemas = retorno.dados;t0()})

function t0()
{
	ins = "<p>Os centr&oacute;ides s&atilde;o pontos localizados no centro de massa de uma forma."
	ins += "<p>Para gerar os centr&oacute;ides, voc&ecirc; precisa selecionar alguns elementos de um tema. Utilize para isso a op&ccedil;&atilde;o de sele&ccedil;&atilde;o ou a tabela de atributos do tema desejado."
	mostraOpcao("","t1()",ins,"t0")
}
function t1()
{
	ins = "Tema que ser&aacute; utilizado:<br><br>"
	ins += comboTemas
	mostraOpcao("t0()","t2()",ins,"t1")
}
function t2()
{
	ins = "O tema com os centr�ides ser&atilde;o adicionados ao mapa atual."
	ins += "<br><br><div onclick='criarcentroide()' style='text-align:left;left:0px'><input id=botao1 size=18 class=executar type='buttom' value='Criar centr�ides' /></div>"
	mostraOpcao("","",ins,"t2")
	YAHOO.example.init = function ()
	{
		function onPushButtonsMarkupReady()
		{new YAHOO.widget.Button("botao1");}
    	YAHOO.util.Event.onContentReady("botao1", onPushButtonsMarkupReady);
	}()	
}
function criarcentroide()
{
	var fim = function(retorno)
	{
		aguarde("none");
		if (retorno.data==undefined )
		{$i("fim").innerHTML = "Erro. A opera��o demorou muito.";}
		else
		{window.parent.i3GEO.atualiza("");}
	}
	aguarde("block")
	tema = $i("temasComSel").value
	var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=criaCentroide&tema="+tema
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("JSON");
	cp.call(p,"criaCentroide",fim);
}
