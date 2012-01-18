<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Upload KML

Envia para o servidor um arquivo no formato KML local e insere como novas camadas no mapa.

Veja:

<i3GEO.arvoreDeTemas.dialogo.uploadkml>

Arquivo:

i3geo/ferramentas/uploadkml/index.js.php

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
Classe: i3GEOF.uploadkml
*/
i3GEOF.uploadkml = {
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
			$i(iddiv).innerHTML += i3GEOF.uploadkml.html();
			new YAHOO.widget.Button(
				"i3GEOuploadkmlbotao1",
				{onclick:{fn: i3GEOF.uploadkml.submete}}
			);
			i3GEO.util.radioEpsg(
				function(retorno)
				{$i("i3GEOuploadkmlListaepsg").innerHTML = retorno.dados;},
				"i3GEOuploadkmlListaepsg",
				"uploadkml"
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
		var ins = '<form id=i3GEOuploadkmlf target="i3GEOuploadkmliframe" action="'+i3GEO.configura.locaplic+'/ferramentas/uploadkml/upload.php" method="post" ENCTYPE="multipart/form-data">' +
		'<p class="paragrafo" style=color:red >N�o use arquivos ou nome de layer com espa�os em branco ou acentua��o</p>' +
		'<p class="paragrafo" >Arquivo kml: <br><input class=digitar type="file" size=32 name="i3GEOuploadkml" style="top:0px;left:0px;cursor:pointer;"></p>' +
		'<p class=paragrafo >Nome do layer KML: <br><input type=text size=42 name=layerkml value=""/></p>' +
		'<p class=paragrafo >Proje&ccedil;&atilde;o:</p>' +
		'<div id=i3GEOuploadkmlListaepsg width="98%" style="text-align:left;border:1px solid gray;left:0px;overflow:auto;height:60px"></div>' +
		'<br><p class="paragrafo" ><input id=i3GEOuploadkmlbotao1 type="button" value="Criar camada" size=12 name="submit">' +
		'<br><p class="paragrafo" >O nome do "layer" corresponde ao elemento folder->name existente no arquivo KML. Para descobrir esse valor, abra o arquivo KML em um editor de textos comum.</p>'+
		'<input type=hidden name=g_sid value="'+i3GEO.configura.sid+'" >' +
		'<input type="hidden" name="MAX_FILE_SIZE" value="100000">' +
		'</form>' +
		'<br><iframe name=i3GEOuploadkmliframe style="text-align:left;border:1px solid gray;" width="98%" height="60px"></iframe>';
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
			i3GEO.janela.minimiza("i3GEOF.uploadkml");
		};
		titulo = "Upload de arquivo KML <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=4&idajuda=104' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"450px",
			"360px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.uploadkml",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.uploadkml_corpo").style.backgroundColor = "white";
		i3GEOF.uploadkml.aguarde = $i("i3GEOF.uploadkml_imagemCabecalho").style;
		i3GEOF.uploadkml.inicia(divid);
	},
	/*
	Function: submete
	
	Submete o arquivo ao servidor.
	*/
	submete: function(){
		if(i3GEOF.uploadkml.aguarde.visibility==="visible")
		{return;}
		i3GEOF.uploadkml.aguarde.visibility="visible";
		$i("i3GEOuploadkmlf").submit();
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>
