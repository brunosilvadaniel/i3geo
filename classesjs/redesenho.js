/*
Title: redesenho.js

Executa as opera��es de redesenho do mapa.

Obt�m os par�metros necess�rios ao funcionamento da interface, como resolu��o, escala, etc.

File: i3geo/classesjs/redesenho.js

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
/*
Function: ajaxredesenha

Prepara o mapa para receber os elementos que compor�o o mapa e chama a fun��o que ir� gerar os novos elementos.

Parameters:

retorno - string indicando se houve erro na fun��o que chamou.
*/
function ajaxredesenha(retorno)
{
	if(arguments.length == 0 || retorno == ""){
		var legimagem = "";
		i3GEO.janela.abreAguarde("ajaxiniciaParametros",$trad("o1"));
		i3GEO.php.corpo(ajaxIniciaParametros,g_tipoimagem);
	}
	else{	
		i3GEO.janela.abreAguarde("ajaxiniciaParametros",$trad("o1"));
		ajaxIniciaParametros(retorno);
	}
}
/*
Function: ajaxIniciaParametros

Refaz o mapa e os elementos marginais, como legenda, escala, lista de temas, etc.

Parameters:

retorno - objeto JSON.
*/
function ajaxIniciaParametros(retorno)
{
	if(arguments.length == 0){return;}
	//YAHOO.log("ajaxIniciaParametros", "redesenho");
	i3GEO.mapa.corpo.verifica(retorno);
	var tempo = "";
	if(i3GEO.desenho.richdraw)
	{i3GEO.desenho.richdraw.clearWorkspace();}
	//try
	//{
		mapscale = "";
		mapexten = "";
		eval(retorno.data.variaveis);
		objmapa.mapimagem = mapimagem;
		i3GEO.interface.redesenha();
		//
		//verifica se precisa mudar a lista de temas
		//
		i3GEO.arvoreDeCamadas.atualiza(retorno.data.temas);
		//
		//atualiza o indicador de compatibilidade de escala se houve um processo de navegacao
		//
		if (objmapa.scale != mapscale)
		i3GEO.arvoreDeCamadas.atualizaFarol(mapscale);
		//
		//atualliza os valores do objmapa
		//
		objmapa.scale = mapscale;
		g_operacao = "";
		i3GEO.arvoreDeCamadas.CAMADAS = retorno.data.temas;
		objmapa.cellsize = g_celula;
		objmapa.extent = mapexten;
		//
		//atualiza a janela com o valor da extens�o geogr�fica do mapa se for o caso
		//
		if ($i("mensagemt"))
		{$i("mensagemt").value = objmapa.extent;}
		//
		//atualiza as ferramentas de consulta que dependem da extens�o geogr�fica
		//
		i3GEO.eventos.navegaMapa();
		//
		//atualiza as imagens do entorno do mapa caso essa op��oestiver ativa
		//
		if (i3GEO.configura.entorno == "sim")
		{
			i3GEO.navega.entorno.geraURL();
			i3GEO.navega.entorno.ajustaPosicao();
		}
		//YAHOO.log("Fim ajaxIniciaParametros", "redesenho");
	//}
	//catch(e){alert("erro no mapa ajaxiniciaparametros "+e);}
	i3GEO.ajuda.mostraJanela("Tempo de redesenho em segundos: "+tempo,"");
}
//testa se esse script foi carregado
function testaajax()
{}