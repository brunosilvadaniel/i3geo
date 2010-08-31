<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Upload de arquivo shapefile

Envia para o servidor um arquivo shapefile local e insere como uma camada no mapa.

Veja:

<i3GEO.arvoreDeTemas.dialogo.upload>

Arquivo: i3geo/ferramentas/upload/index.js.php

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
Classe: i3GEOF.upload
*/
i3GEOF.upload = {
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
			$i(iddiv).innerHTML += i3GEOF.upload.html();
			new YAHOO.widget.Button(
				"i3GEOuploadbotao1",
				{onclick:{fn: i3GEOF.upload.submete}}
			);
			i3GEO.util.radioEpsg(
				function(retorno)
				{$i("i3GEOuploadListaepsg").innerHTML = retorno.dados;},
				"i3GEOuploadListaepsg",
				"upload"
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
		var ins = '<form id=i3GEOuploadf target="i3GEOuploadiframe" action="'+i3GEO.configura.locaplic+'/ferramentas/upload/upload.php" method="post" ENCTYPE="multipart/form-data">' +
		'<p class="paragrafo" >shp: <br><input class=digitar type="file" size=42 name="i3GEOuploadshp" style="top:0px;left:0px;cursor:pointer;"></p>' +
		'<p class="paragrafo" >shx: <br><input class=digitar type="file" size=42 name="i3GEOuploadshx" style="top:0px;left:0px;cursor:pointer;"></p>' +
		'<p class="paragrafo" >dbf: <br><input class=digitar type="file" size=42 name="i3GEOuploaddbf" style="top:0px;left:0px;cursor:pointer;"></p>' +
		'<p class=paragrafo >Proje&ccedil;&atilde;o:</p>' +
		'<div id=i3GEOuploadListaepsg width="98%" style="border:1px solid gray;left:0px;overflow:auto;height:60px"></div>' +
		'<br><p class="paragrafo" ><input id=i3GEOuploadbotao1 type="button" value="Criar camada" size=12 name="submit">' +
		'<input type=hidden name=g_sid value="'+i3GEO.configura.sid+'" >' +
		'<input type="hidden" name="MAX_FILE_SIZE" value="100000">' +
		'</form>' +
		'<br><iframe name=i3GEOuploadiframe style="text-align:left;" width="98%" height="60px"></iframe>';
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
			i3GEO.janela.minimiza("i3GEOF.upload");
		};
		titulo = "Upload de shapefile <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=4&idajuda=27' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"320px",
			"360px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.upload",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.upload_corpo").style.backgroundColor = "white";
		i3GEOF.upload.aguarde = $i("i3GEOF.upload_imagemCabecalho").style;
		i3GEOF.upload.inicia(divid);
	},
	/*
	Function: submete
	
	Submete o arquivo ao servidor
	*/
	submete: function(){
		if(i3GEOF.upload.aguarde.visibility==="visible")
		{return;}
		i3GEOF.upload.aguarde.visibility="visible";
		$i("i3GEOuploadf").submit();
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>
