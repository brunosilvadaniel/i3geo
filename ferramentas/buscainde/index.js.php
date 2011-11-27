<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Busca metadados na INDE

Experimental

Veja:

<i3GEO.arvoredetemas.dialogo.buscainde>

Arquivo:

i3geo/ferramentas/buscainde/index.js.php

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
Classe: i3GEOF.buscainde

*/
i3GEOF.buscainde = {
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
			$i(iddiv).innerHTML += i3GEOF.buscainde.html();
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
		var ins = '<iframe style="width:99%;height:99%;border:0px" src="'+i3GEO.configura.locaplic+'/pacotes/cswclient/csw.html"></iframe>';
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
			i3GEO.janela.minimiza("i3GEOF.buscainde");
		};
		//cria a janela flutuante
		titulo = "Cliente CSW <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=109&idajuda=8' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"550px",
			"350px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.buscainde",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.buscainde_corpo").style.backgroundColor = "white";
		$i("i3GEOF.buscainde_corpo").style.textAlign = "left";
		i3GEOF.buscainde.inicia(divid);
	},
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>