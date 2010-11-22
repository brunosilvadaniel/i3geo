<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Cortina

Aplica um efeito de cortina a um tema, permitindo mostr�-lo ou escond�-lo de forma controlada por um bot�o deslizante.
Funciona apenas nas interfaces que utilizam camadas m�ltiplas, como a interface openlayers

Veja:

<i3GEO.tema.dialogo.cortina>

Arquivo:

i3geo/ferramentas/cortina/index.js.php

Licenca:

GPL2

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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
Classe: i3GEOF.cortina
*/
i3GEOF.cortina = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Variavel: tema
	
	C�digo do tema definido na inicializa��o da janela e que ser� alvo da cortina.
	*/
	tema: "",	
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		if(navm)
		{alert("Esta ferramenta nao funciona adequadamente no Internet Explorer. Experimente usar o Firefox");}
		try{
			$i(iddiv).innerHTML = i3GEOF.cortina.html();
		}
		catch(erro){alert(erro);}
		i3GEOF.cortina.criaslide();
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '<div id="slider-bg" class="yui-h-slider" style="background: url('+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/bg-h.gif) no-repeat 5px 0;height: 28px;width: 210px;" tabindex="-1" title="Slider">' +
				'<div id="slider-thumb" class="yui-slider-thumb"><img src="'+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/thumb-n.gif"></div>' +
				'</div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	
	Parametro:
	
	tema {string} - codigo do tema
	*/	
	criaJanelaFlutuante: function(tema){
		if(arguments.length == 0)
		{tema = i3GEO.temaAtivo;}
		var janela,divid,temp,titulo;
		i3GEOF.cortina.tema = tema;
		//cria a janela flutuante
		titulo = "Cortina "+tema+" <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=86' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"230px",
			"40px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.cortina",
			false,
			"hd"
		);
		divid = janela[2].id;
		$i("i3GEOF.cortina_corpo").style.backgroundColor = "white";
		$i("i3GEOF.cortina_corpo").style.textAlign = "left";
		i3GEOF.cortina.aguarde = $i("i3GEOF.cortina_imagemCabecalho").style;
		i3GEOF.cortina.inicia(divid);
		temp = function(){
			if(i3GEO.Interface.ATUAL === "openlayers"){
				try{
					var divlayer = i3geoOL.getLayersByName(i3GEO.temaAtivo);
					var estilo = divlayer[0].div.style;
					if(navm)
					{estilo.clip = "rect(0px,"+i3GEO.parametros.w+"px,"+i3GEO.parametros.h+"px,0px)";}
					else
					{estilo.clip = "";}
				}
				catch(e){}
			}
			if(i3GEO.Interface.ATUAL === "googlemaps"){
				var estilo = (i3GEO.Interface.googlemaps.retornaDivLayer(i3GEO.temaAtivo)).style;
				if(navm)
				{estilo.clip = "rect(0px,"+i3GEO.parametros.w+"px,"+i3GEO.parametros.h+"px,0px)";}
				else
				{estilo.clip = "";}
			}
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
	},
	/*
	Function: criaslide
	
	Cria a barra deslizante com base em YAHOO.widget.Slider
	*/
	criaslide: function(){
		var slider = YAHOO.widget.Slider.getHorizSlider($i("slider-bg"),$i("slider-thumb"), 0, 200, 0),
			layer,
			estilo;
		if(i3GEO.Interface.ATUAL === "openlayers"){
			layer = i3geoOL.getLayersByName(i3GEOF.cortina.tema)[0];
			estilo = layer.div.style;
		}
		if(i3GEO.Interface.ATUAL === "googlemaps"){
			layer = i3GEO.Interface.googlemaps.retornaDivLayer(i3GEOF.cortina.tema);
			estilo = layer.style;
		}
		estilo.clip = "rect(0px,"+i3GEO.parametros.w+"px,"+i3GEO.parametros.h+"px,0px)";
		slider.setValue(0,false);
		slider.subscribe("change", function(offsetFromStart) {
			var t=0,
				r=i3GEO.parametros.w,
				b=i3GEO.parametros.h,
				l=0,
				escala = r / 200;
			l = l + (offsetFromStart * escala);
			estilo.clip = "rect("+t+"px,"+r+"px,"+b+"px,"+l+"px)";
		});
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>