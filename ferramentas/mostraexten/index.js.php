<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Mostra extens�o

Mostra a extens�o geogr�fica atual do mapa permitindo tamb�m alter�-la digitando-se os valores de lat e long

Veja:

<i3GEO.mapa.dialogo.mostraExten>

Arquivo:

i3geo/ferramentas/mostraexten/index.js.php

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
Classe: i3GEOF.mostraExten
*/
i3GEOF.mostraExten = {
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
			$i(iddiv).innerHTML += i3GEOF.mostraExten.html();
			new YAHOO.widget.Button(
				"i3GEOmostraExtenbotao1",
				{onclick:{fn: i3GEOF.mostraExten.executa}}
			);
			i3GEOF.mostraExten.ativaFoco();
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
		var ins = '<p class="paragrafo" >Extens&atilde;o geogr�fica atual, em d&eacute;cimos de grau. As coordenadas correspondem a menor longitude, menor latitude, maior longitude e maior latitude:</p>' +
		'<textarea id=i3GEOmostraExtenatual rows=3 cols=50 onclick="javascript:this.select();"></textarea>' +
		'<p class="paragrafo" >	Digite as coordenadas referentes a nova extens�o geogr�fica desejada para o mapa. Utilize coordenadas (graus) negativos para indicar a longitude como oeste e latitude como sul:</p>' +
		'	<table class=lista3 >' +
		'		<tr><td>Menor longitude (oeste):</td>' +
		'		<td>' +
		$inputText("","","i3GEOmostraExtenxg","",3,"-00") +
		$inputText("","","i3GEOmostraExtenxm","",3,"00") +
		$inputText("","","i3GEOmostraExtenxs","",3,"0.0") +
		'		</td></tr>' +
		'		<tr><td>Menor latitude (sul):</td>' +
		'		<td>' +
		$inputText("","","i3GEOmostraExtenyg","",3,"-00") +
		$inputText("","","i3GEOmostraExtenym","",3,"00") +
		$inputText("","","i3GEOmostraExtenys","",3,"0.0") +		
		'		</td></tr>' +
		'		<tr><td>Maior longitude (leste):</td>' +
		'		<td>' +
		$inputText("","","i3GEOmostraExtenxxg","",3,"-00") +
		$inputText("","","i3GEOmostraExtenxxm","",3,"00") +
		$inputText("","","i3GEOmostraExtenxxs","",3,"0.0") +
		'		</td></tr>' +
		'		<tr><td>Maior latitude (norte):</td>' +
		'		<td>' +
		$inputText("","","i3GEOmostraExtenyyg","",3,"-00") +
		$inputText("","","i3GEOmostraExtenyym","",3,"00") +
		$inputText("","","i3GEOmostraExtenyys","",3,"0.0") +
		'		</td></tr></table>' +
		'<br><p class="paragrafo" ><input id=i3GEOmostraExtenbotao1 type="button" size=14 value="Aplicar a nova extens�o"  /></p>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo,cabecalho,minimiza;
		//cria a janela flutuante
		cabecalho = function(){
			i3GEOF.mostraExten.ativaFoco();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.mostraExten");
		};
		titulo = "Extens�o geogr�fica <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=7&idajuda=55' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"370px",
			"320px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.mostraExten",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.mostraExten_corpo").style.backgroundColor = "white";
		$i("i3GEOF.mostraExten_corpo").style.textAlign = "left";
		i3GEOF.mostraExten.aguarde = $i("i3GEOF.mostraExten_imagemCabecalho").style;
		i3GEOF.mostraExten.inicia(divid);
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEOF.mostraExten.ativaFoco()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEOF.mostraExten.ativaFoco()");}
		temp = function(){
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEOF.mostraExten.ativaFoco()");
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);				
	},
	/*
	Function: ativaFoco
	
	Fun��o que � disparada quando o usu�rio clica no cabe�alho da ferramenta
	*/
	ativaFoco: function(){
		$i("i3GEOmostraExtenatual").innerHTML = i3GEO.parametros.mapexten;
		var i = $i("i3GEOF.mostraExten_c").style;
		i3GEO.janela.ULTIMOZINDEX++;
		i.zIndex = 10000 + i3GEO.janela.ULTIMOZINDEX;
	},
	/*
	Function: executa
	
	Altera a extens�o atual
	
	Veja:
	
	<i3GEO.navega.zoomExt>
	*/
	executa: function(){
		try{
			var x = i3GEO.calculo.dms2dd($i("i3GEOmostraExtenxg").value,$i("i3GEOmostraExtenxm").value,$i("i3GEOmostraExtenxs").value);
			var xx = i3GEO.calculo.dms2dd($i("i3GEOmostraExtenxxg").value,$i("i3GEOmostraExtenxxm").value,$i("i3GEOmostraExtenxxs").value);
			var y = i3GEO.calculo.dms2dd($i("i3GEOmostraExtenyg").value,$i("i3GEOmostraExtenym").value,$i("i3GEOmostraExtenys").value);
			var yy = i3GEO.calculo.dms2dd($i("i3GEOmostraExtenyyg").value,$i("i3GEOmostraExtenyym").value,$i("i3GEOmostraExtenyys").value);
			if ((x == xx) || (y == yy))
			{alert("Digite coordenadas v�lidas");return;}
			if ((x > xx) || (y > yy))
			{alert("Digite coordenadas v�lidas");return;}
			i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,window.parent.i3GEO.parametros.tipoimagem,(x+" "+y+" "+xx+" "+yy))
		}
		catch(e){alert(e+" Erro. Digite coordenadas v�lidas");}
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>