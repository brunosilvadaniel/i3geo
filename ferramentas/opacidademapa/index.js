/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: opacidademapa

Altera a opacidade de todas as camadas existentes no mapa modificando o estilo.

O Mapfile n�o � alterado, apenas o estilo dos elementos HTML.

Veja:

<i3GEO.tema.dialogo.opacidademapa>

Arquivo:

i3geo/ferramentas/opacidademapa/index.js.php

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
Classe: i3GEOF.opacidademapa
*/
i3GEOF.opacidademapa = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Variavel: janela
	
	Janela flutuante criada
	
	Type:
	{YAHOO.panel}
	*/
	janela: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML = i3GEOF.opacidademapa.html();
		}
		catch(erro){alert(erro);}
		i3GEOF.opacidademapa.criaslide();
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = "";
		if(navm){
			ins += '<div id="slider-bg" class="yui-h-slider" style="background: url('+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/bg-h.gif) no-repeat -108px 0;height: 28px;width: 210px;" tabindex="-1" title="Slider">' +
				'<div id="slider-thumb" class="yui-slider-thumb"><img src="'+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/thumb-n.gif"></div>' +
				'</div>';
		}
		else{
			ins += '<div id="slider-bg" class="yui-h-slider" style="background: url('+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/bg-h.gif) no-repeat 5px 0;height: 28px;width: 210px;" tabindex="-1" title="Slider">' +
				'<div id="slider-thumb" class="yui-slider-thumb"><img src="'+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/thumb-n.gif"></div>' +
				'</div>';
		}
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	
	Parametro:
	
	mx {numero} - (opcional) posi��o em x para onde a janela ser� movida ap�s ser criada
	
	my {numero} - (opcional) posi��o em y para onde a janela ser� movida ap�s ser criada
	*/
	criaJanelaFlutuante: function(mx,my){
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.opacidademapa");
		};		
		var janela,divid,temp,titulo;
		//cria a janela flutuante
		titulo = "Opacidade <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=102' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"230px",
			"40px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opacidademapa",
			false,
			"hd",
			"",
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.opacidademapa.janela = janela[0];
		if(mx != undefined)
		{janela[0].moveTo(mx,my);}
		$i("i3GEOF.opacidademapa_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opacidademapa_corpo").style.textAlign = "left";
		i3GEOF.opacidademapa.aguarde = $i("i3GEOF.opacidademapa_imagemCabecalho").style;
		i3GEOF.opacidademapa.inicia(divid);
	},
	/*
	Function: criaslide
	
	Cria a barra deslizante com base em YAHOO.widget.Slider
	*/
	criaslide: function(){
		i3GEOF.opacidademapa.slider = YAHOO.widget.Slider.getHorizSlider($i("slider-bg"),$i("slider-thumb"), 0, 200, 0);
		i3GEOF.opacidademapa.slider.setValue(200,false);
		i3GEOF.opacidademapa.slider.subscribe("change", function(offsetFromStart) {
			i3GEO.Interface.aplicaOpacidade(offsetFromStart / 200);
		});
		if(navm){
			$i("slider-bg").style.left = "-100px";
			$i("i3GEOF.opacidademapa_corpo").style.background = "url("+i3GEO.configura.locaplic+"/pacotes/yui270/build/slider/assets/bg-h.gif) white no-repeat 10px 0px";
		}
	}
};
