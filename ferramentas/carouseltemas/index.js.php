<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Carrosel de temas

Apresenta uma lista de temas que podem ser adicionados ao mapa em um layout do tipo 'carrousel'.
S�o mostradas as imagens miniatura dos temas, que devem estar armazenadas em i3geo/temas/miniaturas.
As miniaturas podem ser geradas com geraminiaturas.php.

Veja:

<i3GEO.arvoreDeTemas.dialogo.carouselTemas>

Arquivo:

i3geo/ferramentas/carrouseltemas/index.js.php

Licenca:

GPL2

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
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Class: i3GEOF.carouseltemas
*/
i3GEOF.carouseltemas = {
	/*
	Propriedade: numVisible
	
	N�mero de imagens vis�veis
	*/
	numVisible: 3,
	/*
	Propriedade: incluiAmpliacao
	
	Inclui ou n�o a imagem ampliada ao passar o mouse sobre a miniatura
	*/
	incluiAmpliacao: true,
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
			$i(iddiv).innerHTML = i3GEOF.carouseltemas.html();
			var listaimg = function(retorno){
				var ins = "<ol>",
					ngrupos,
					nsub,
					ntemas,
					i,
					j,
					k,
					grupo,
					sub,
					tema,
					min,
					max;
				ngrupos = retorno.data.length;
				
				for(i=0;i<ngrupos;i++){
					grupo = retorno.data[i];
					nsub = grupo.subgrupos.length;
					for(j=0;j<nsub;j++){
						sub = grupo.subgrupos[j];
						ntemas = sub.temas.length;
						for(k=0;k<ntemas;k++){
							tema = sub.temas[k];
							if(tema.miniatura === "sim"){
								min = i3GEO.configura.locaplic+"/temas/miniaturas/"+tema.tid+".map.mini.png";
								max = i3GEO.configura.locaplic+"/temas/miniaturas/"+tema.tid+".map.grande.png";
								ins += "<li><img onmouseover='i3GEOF.carouseltemas.amplia(\""+max+"\")' onclick='i3GEOF.carouseltemas.insereTema(\""+tema.tid+"\")' title='"+tema.nome+"' src='"+min+"' ></li>";
							}
						}
					}
				}
				$i("i3GEOcarouseltemasImagens").innerHTML = ins+"</ol>";
				var carousel = new YAHOO.widget.Carousel("i3GEOcarouseltemasImagens");
				carousel.STRINGS.PAGER_PREFIX_TEXT = "";
				carousel.set("numVisible",i3GEOF.carouseltemas.numVisible);
				carousel.render();
				carousel.show();
			};
			i3GEO.php.procurartemas(listaimg,"");
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
		var ins = "<div id=i3GEOcarouseltemasImagens ></div><p class=paragrafo >Clique na imagem para adicionar o tema ao mapa.";
		if(i3GEOF.carouseltemas.incluiAmpliacao === true)
		{ins += "<div style='text-align:left;' id=i3GEOcarouseltemasImagemmaior ></div>";}
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo,cabecalho,minimiza;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.carouseltemas");
		};
		//cria a janela flutuante
		titulo = "Miniaturas <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=6&idajuda=85' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"210px",
			"340px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.carouseltemas",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.carouseltemas_corpo").style.backgroundColor = "white";
		$i("i3GEOF.carouseltemas_corpo").style.textAlign = "left";
		i3GEOF.carouseltemas.aguarde = $i("i3GEOF.carouseltemas_imagemCabecalho").style;
		i3GEOF.carouseltemas.inicia(divid);
	},
	/*
	Function: insereTema
	
	Insere no mapa o tema escolhido
	
	Veja:
	
	<adtema>
	*/
	insereTema: function(codigotema){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		temp = function(retorno){
			i3GEO.janela.fechaAguarde("i3GEO.atualiza");
			if(retorno.data.erro){
				alert(retorno.data.erro);
				return;
			}
			i3GEO.atualiza();
		};
		i3GEO.php.adtema(temp,codigotema);
	},
	/*
	Function: amplia
	
	Mostra a imagem ampliada
	*/
	amplia: function(imagem){
		if($i("i3GEOcarouseltemasImagemmaior"))
		{$i("i3GEOcarouseltemasImagemmaior").innerHTML = "<img width='180px' src='"+imagem+"' />";}
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>