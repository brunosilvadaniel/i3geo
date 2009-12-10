<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
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
Class: i3GEOF.tipoimagem

Abre janela de op��es para impress�o do mapa atual
*/
i3GEOF.tipoimagem = {
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
			$i(iddiv).innerHTML += i3GEOF.tipoimagem.html();
			var temp = function(retorno){
				g_legendaHTML = retorno.data.legenda
			}
			i3GEO.php.criaLegendaHTML(temp,"","legendaseminput.htm")
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
		var ins = '<p class=paragrafo >Escolha o filtro de cores que ser&aacute; aplicado.</p>' +
			'<table class=lista6 width="200px">' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'nenhum\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=nenhum ></td>' +
			'		<td>nenhum</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'nenhum\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_nenhum.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'cinza\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=cinza ></td>' +
			'		<td>tons de cinza</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'cinza\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_cinza.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'sepiaclara\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=sepiaclara ></td>' +
			'		<td>s&eacute;pia clara</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'sepiaclara\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_sepiaclara.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'sepianormal\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=sepianormal ></td>' +
			'		<td>s&eacute;pia normal</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'sepianormal\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_sepianormal.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'negativo\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=negativo ></td>' +
			'		<td>negativo</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'negativo\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_negativo.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'detectaBordas\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=detectaBordas ></td>' +
			'		<td>detecta bordas</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'detectaBordas\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_detectabordas.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'embassa\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=embassa ></td>' +
			'		<td>emboss</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'embassa\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_embassa.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'gaussian_blur\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=gaussian_blur ></td>' +
			'		<td>gaussian blur</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'gaussian_blur\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_gaussianblur.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'selective_blur\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=selective_blur ></td>' +
			'		<td>selective blur</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'selective_blur\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_selectiveblur.png" /></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input onclick="i3GEOF.tipoimagem.aplicar(\'mean_removal\')" style="cursor:pointer" type=radio name=i3GEOtipoimagemtipo value=mean_removal ></td>' +
			'		<td>mean removal</td>' +
			'		<td><img onclick="i3GEOF.tipoimagem.aplicar(\'mean_removal\')" src="'+i3GEO.configura.locaplic+'/imagens/filtro_meanremoval.png" /></td>' +
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
			i3GEO.janela.minimiza("i3GEOF.tipoimagem");
		};
		//cria a janela flutuante
		titulo = "Tipo de imagem <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=1' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"300px",
			"260px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.tipoimagem",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.tipoimagem_corpo").style.backgroundColor = "white";
		$i("i3GEOF.tipoimagem_corpo").style.textAlign = "left";
		i3GEOF.tipoimagem.aguarde = $i("i3GEOF.tipoimagem_imagemCabecalho").style;
		i3GEOF.tipoimagem.inicia(divid);
	},
	/*
	Function: aplicar
	
	Aplica o filtro de imagem escolhido
	*/
	aplicar: function(filtro){
		i3GEO.configura.tipoimagem = filtro;
		g_operacao = "outras";
		i3GEO.atualiza();
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>