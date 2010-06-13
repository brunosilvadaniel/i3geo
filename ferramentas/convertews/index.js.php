<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Converte um mapa em WMS

Arquivo:

i3geo/ferramentas/convertews/index.js.php

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
Class: i3GEOF.converteMapaWS

Converte um mapa em WMS
*/
i3GEOF.converteMapaWS = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta

	Parametros:
	
	divid {String} - id do div que receber� o conteudo HTML da ferramenta

	*/
	html:function(divid,enderecowms,enderecowmc){
		try{
			var ins = '<p class="paragrafo" >Voc&ecirc; pode utilizar o endere&ccedil;o em softwares de geoprocessamento instalados em seu computador, como por exemplo, o <a href="http://www.openjump.org" target=blank >OpenJump</a> ou <a href="http://www.gvsig.gva.es/" target=blank > gvSig</a>' +
			'<p class="paragrafo" >O "web service" criado, utiliza o padr&atilde;o WMS, conforme definido pelo OGC. A disponibilidade do endere&ccedil;o &eacute; tempor&aacute;ria, permanecendo ativa apenas no dia em que foi criado.' +
			'<p class="paragrafo" >O Web Map Context (WMC) pode ou n�o ser gerado dependendo da configura��o do servidor onde o i3Geo est� instalado. <a href="'+enderecowmc+'" target=_blank >Clique para obter o Web Map Context</a>'+
			'<p class="paragrafo" ><b>WMS: </b></p>' +
			'<p class="paragrafo" > <textarea cols="65" rows="3" style=cursor:pointer onclick="javascript:this.select()">' +
			enderecowms + '</textarea></p>' +
			'<p class="paragrafo" >Para testar, utilize: ' +
			'<a href="' + enderecowms + '&request=getcapabilities&version=1.1.0&service=wms" target=blank >' +
			enderecowms + '&request=getcapabilities&version=1.1.0&service=wms';
			$i(divid).innerHTML += ins;
			i3GEOF.converteMapaWS.aguarde.visibility = "hidden";
		}catch(e){alert(e);i3GEOF.converteMapaWS.aguarde.visibility = "hidden";}
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo,p,cp;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.converteMapaWS");
		};
		titulo = "WMS <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=2&idajuda=12' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"440px",
			"280px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.converteMapaWS",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.converteMapaWS.aguarde = $i("i3GEOF.converteMapaWS_imagemCabecalho").style;
		i3GEOF.converteMapaWS.aguarde.visibility = "visible";
		temp = function(retorno){
			var enderecowms = "Ocorreu um erro ao criar o WMS",
				enderecowmc = "Ocorreu um erro ao criar o WMS";
			if (retorno.data != undefined){
				enderecowms = window.location.protocol+"//"+window.location.host+retorno.data.wms+"&"+retorno.data.wms+"&";
				enderecowmc = window.location.protocol+"//"+window.location.host+retorno.data.wmc+"&"+retorno.data.wmc+"&";
			}
			i3GEOF.converteMapaWS.html(divid,enderecowms,enderecowmc);
		};
		p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=convertewmswmc&h="+window.location.host;
		cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"converteWMSWMC",temp);		
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>