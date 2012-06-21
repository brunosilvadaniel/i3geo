/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Wikip�dia

Busca na Wikip�dia artigos relacionados � extens�o geogr�fica do mapa atual.

A busca utiliza um Web Service do site Geonames. Para utilizar esse servi�o � necess�rio cadastrar um usu�rio.
Por padr�o, o i3Geo utiliza o usu�rio "i3geo", que pode ter sua cota de acesso di�rio ultrapassada.
Para criar um usu�rio novo, utilize o site http://www.geonames.org/login e edite o programa i3geo/ferramentas/wiki/funcoes.php
para alterar a vari�vel $usuarioGeonames

Veja:

<i3GEO.navega.dialogo.wiki>

Arquivo:

i3geo/ferramentas/wiki/index.js.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Classe: i3GEOF.wiki
*/
i3GEOF.wiki = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.wiki.html();
			i3GEOF.wiki.ativaFoco();
			if(i3GEO.Interface.ATUAL !== "googlemaps" && i3GEO.Interface.ATUAL !== "googleearth"){
				i3GEO.eventos.NAVEGAMAPA.push("i3GEOF.wiki.lista()");
			}
			if(i3GEO.Interface.ATUAL === "googlemaps"){
   				wikiDragend = google.maps.event.addListener(i3GeoMap, "dragend", function() {i3GEOF.wiki.lista();});
   				wikiZoomend = google.maps.event.addListener(i3GeoMap, "zoomend", function() {i3GEOF.wiki.lista();});						
			}
			if(i3GEO.Interface.ATUAL === "googleearth"){
   				wikiDragend = google.earth.addEventListener(i3GeoMap.getView(), "viewchangeend", function() {i3GEOF.wiki.lista();});
			}			
			i3GEOF.wiki.lista();
		}
		catch(erro){if(typeof(console) !== 'undefined'){console.error(erro);}}
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '';
		ins += '<div id=i3GEOwikiLista style=display:block;background-color:white;text-align:left; ></div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		//funcao que sera executada ao ser clicado no cabe�alho da janela
		cabecalho = function(){
			i3GEOF.wiki.ativaFoco();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.wiki");
		};
		//cria a janela flutuante
		titulo = "Wikip&eacute;dia <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=8&idajuda=73' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"250px",
			"190px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.wiki",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.wiki.aguarde = $i("i3GEOF.wiki_imagemCabecalho").style;
		i3GEOF.wiki.inicia(divid);
		temp = function(){
			if(i3GEO.Interface.ATUAL !== "googlemaps" && i3GEO.Interface.ATUAL !== "googleearth"){
				i3GEO.eventos.NAVEGAMAPA.remove("i3GEOF.wiki.lista()");
			}
			if(i3GEO.Interface.ATUAL === "googlemaps"){
				google.maps.event.removeListener(wikiDragend);
				google.maps.event.removeListener(wikiZoomend);
			}
			if(i3GEO.Interface.ATUAL === "googleearth"){
				google.earth.removeEventListener(wikiDragend);
			}			
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);		
	},
	/*
	Function: ativaFoco
	
	Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
	*/
	ativaFoco: function(){
		g_operacao = "navega";
		var i = $i("i3GEOF.wiki_c").style;
		i3GEO.janela.ULTIMOZINDEX++;
		i.zIndex = 21000 + i3GEO.janela.ULTIMOZINDEX;
	},
	/*
	Function: lista
	
	Lista os artigos
	
	Veja:
	
	<LISTAARTIGOS>
	*/
	lista: function(){
		if(i3GEOF.wiki.aguarde.visibility === "visible")
		{return;}
		i3GEOF.wiki.aguarde.visibility = "visible";
		var mostrar,p,cp;
		mostrar = function(retorno){
			i3GEOF.wiki.aguarde.visibility = "hidden";
			if (retorno.data === 'undefined' ){
				$i("i3GEOwikiLista").innerHTML = "Erro. A opera��o demorou muito.";
				return;
			}
			$i("i3GEOwikiLista").innerHTML = retorno.data+"Navegue no mapa para atualizar a lista de resultados";
		};
		cp = new cpaint();
		cp.set_response_type("JSON");
		if(i3GEO.parametros.mapexten)
		{ext = i3GEO.parametros.mapexten;}
		else
		{ext = "-49.1774741355 -16.379556709 -47.2737662565 -14.9806872512";} //apenas para exemplo
		p = i3GEO.configura.locaplic+"/ferramentas/wiki/funcoes.php?funcao=listaartigos&ret="+ext;
		cp.call(p,"listaartigos",mostrar);
		
	}
};
