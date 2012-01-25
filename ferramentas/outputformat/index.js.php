<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Formato de imagem

Define qual o formato de imagem ser� utilizado escolhendo o OUTPUTFORMAT existente no mapfile atual

Veja:

<i3GEO.mapa.dialogo.outputformat>

Arquivo:

i3geo/ferramentas/outputformat/index.js.php

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
Classe: i3GEOF.outputformat
*/
i3GEOF.outputformat = {
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
			$i(iddiv).innerHTML += i3GEOF.outputformat.html();
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
		var ins = '<p class=paragrafo >Escolha o tipo de imagem para a gera��o do mapa. Para mais detalhes veja <a href="http://mapserver.org/mapfile/outputformat.html" target=_blank >outputformat</a></p>' +
			'<table class=lista4 width="250px">' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.outputformat.aplicar(\'AGG_Q\')" style="cursor:pointer;border:0px solid white;" type=radio name=i3GEOoutputformattipo value=nenhum ></td>' +
			'		<td>png</td>' +
			'		<td>Formato PNG com 256 cores gerado com a tecnologia AGG. Utilizado como default na vers�o 4.3 e posteriores do i3Geo</td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.outputformat.aplicar(\'jpeg\')" style="cursor:pointer;border:0px solid white;" type=radio name=i3GEOoutputformattipo value=nenhum ></td>' +
			'		<td>jpeg</td>' +
			'		<td>Formato JPEG com 256 cores gerado com o driver GD</td>' +
			'	</tr>' +

			'</table>';
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
			i3GEO.janela.minimiza("i3GEOF.outputformat");
		};
		//cria a janela flutuante
		titulo = "Formato da imagem <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=89' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"300px",
			"260px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.outputformat",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.outputformat_corpo").style.backgroundColor = "white";
		$i("i3GEOF.outputformat_corpo").style.textAlign = "left";
		i3GEOF.outputformat.aguarde = $i("i3GEOF.outputformat_imagemCabecalho").style;
		i3GEOF.outputformat.inicia(divid);
	},
	/*
	Function: aplicar
	
	Aplica tipo de imagem
	
	Veja:
	
	<mudaOutputFormat>
	*/
	aplicar: function(tipo){
		if(i3GEOF.outputformat.aguarde.visibility === "visible")
		{return;}
		i3GEOF.outputformat.aguarde.visibility = "visible";
		try{
			var cp = new cpaint(),
				p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=mudaOutputFormat&tipo="+tipo,
				temp = function(retorno){
					i3GEOF.outputformat.aguarde.visibility = "hidden";
					if(retorno.data != "erro"){
						i3GEO.Interface.atualizaMapa();
					}
					else
					{alert("Nao foi possivel alterar o tipo");}
				};
			cp.set_response_type("JSON");
			cp.call(p,"void",temp);
		}
		catch(e){alert("Nao foi possivel alterar o tipo");i3GEOF.outputformat.aguarde.visibility = "hidden";}
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>