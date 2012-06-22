
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Adiciona um tema ao mapa com base em um arquivo KML existente na Web

O usu�rio pode escolher o arquivo de uma lista. A lista � obtida do sistema de administra��o do i3Geo

Veja:

<i3GEO.arvoreDeTemas.dialogo.carregaKml>

Arquivo:

i3geo/ferramentas/carregakml/index.js.php

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
Classe: i3GEOF.carregakml
*/
i3GEOF.carregakml = {
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
			$i(iddiv).innerHTML = i3GEOF.carregakml.html();
			var monta = function(retorno){
				var raiz,nraiz,i,combo;
				raiz = retorno.data.canais;
				nraiz = raiz.length;
				combo = "<select onchange='javascript:$i(\"i3GEOcarregakmlurl\").value = this.value;'>";
				combo += "<option value=''>---</option>";
				for (i=0;i<nraiz; i++){
					combo += "<option value='"+raiz[i].link+"'>"+raiz[i].title+"</option>";
				}
				combo += "</select>";
				$i("i3GEOcarregakmlCombo").innerHTML = combo;
			};
			i3GEO.php.listaRSSwsARRAY(monta,"KML");
			new YAHOO.widget.Button(
				"i3GEOcarregakmlbotao1",
				{onclick:{fn: i3GEOF.carregakml.adiciona}}
			);			
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '' +
		'<p class="paragrafo" >Endere�o (URL) do KML (ou escolha da lista):<br><br>' +	
		$inputText("","","i3GEOcarregakmlurl","",40,"") +
		'<br><br>' +
		'<div id="i3GEOcarregakmlCombo" style="left:1px;display:block;width:315px;text-align:left;">Aguarde...' +
		'</div>' +
		'<br><br><input id=i3GEOcarregakmlbotao1 type="buttom" value="Aplicar" />';
		return ins;		
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,titulo;
		//cria a janela flutuante
		cabecalho = function(){
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.carregakml");
		};
		titulo = "Kml <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=4&idajuda=105' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"320px",
			"150px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.carregakml",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.carregakml.aguarde = $i("i3GEOF.carregakml_imagemCabecalho").style;
		$i("i3GEOF.carregakml_corpo").style.backgroundColor = "white";
		i3GEOF.carregakml.inicia(divid);
	},
	/*
	Function: adiciona
	
	Adiciona o KML ao mapa
	*/
	adiciona: function(){
		if(i3GEOF.carregakml.aguarde.visibility === "visible")
		{return;}
		var url = $i("i3GEOcarregakmlurl").value;
		if(url !== ""){
			i3GEOF.carregakml.aguarde.visibility = "visible";
			i3GEO.Interface[i3GEO.Interface.ATUAL].adicionaKml(false,url,url,true);
			i3GEOF.carregakml.aguarde.visibility = "hidden";
		}
	}
};
