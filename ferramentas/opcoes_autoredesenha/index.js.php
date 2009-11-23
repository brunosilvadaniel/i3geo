<?php if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

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
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Class: i3GEOF.opcoesTempo

Inicia ou altera o temporizador de redesenho do mapa.
*/
i3GEOF.opcoesTempo = {
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
			$i(iddiv).innerHTML += i3GEOF.opcoesTempo.html();
			new YAHOO.widget.Button(
				"i3GEOopcoesTempobotao1",
				{onclick:{fn: i3GEOF.opcoesTempo.executa}}
			);
			new YAHOO.widget.Button(
				"i3GEOopcoesTempobotao2",
				{onclick:{fn: i3GEO.navega.autoRedesenho.desativa}}
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
		var ins = '<table summary="" class=lista width="100%">' +
		'<table summary="" class=lista > '+
		'	<tr><td>Tempo em segundos ap�s o qual o mapa ser� redesenhado automaticamente:</td><td>' +
		$inputText("","","i3GEOopcoesTempoT","",8,"") +
		'</table><br>' +
	  	'<p class=paragrafo ><input id=i3GEOopcoesTempobotao1 size=16  type=button value="Aplicar"/>' +
	  	'&nbsp;<input id=i3GEOopcoesTempobotao2 size=16 type=button value="Parar"/>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.opcoesTempo");
		};
		//cria a janela flutuante
		titulo = "Temporizador <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=9' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"300px",
			"110px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opcoesTempo",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.opcoesTempo_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opcoesTempo_corpo").style.textAlign = "left";
		i3GEOF.opcoesTempo.aguarde = $i("i3GEOF.opcoesTempo_imagemCabecalho").style;
		i3GEOF.opcoesTempo.inicia(divid);
	},
	/*
	Function: executa
	
	Altera a legenda
	*/
	executa: function(){
		i3GEO.navega.autoRedesenho.desativa();
		var i = $i("i3GEOopcoesTempoT");
		i3GEO.navega.autoRedesenho.INTERVALO = i.value * 1000;
		if ((i.value == 0) || (i.value == ""))
		{i3GEO.navega.autoRedesenho.desativa();}
		else
		{i3GEO.navega.autoRedesenho.ativa();}
	}
};
<?php if(extension_loaded('zlib')){ob_end_flush();}?>