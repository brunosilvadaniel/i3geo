<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Editor de SQL

Permite alterar os par�metros de conex�o com banco de dados do tema.

Opera apenas em temas baseados em conex�es com bancos de dados.

Veja:

<i3GEO.tema.dialogo.editorsql>

Arquivo:

i3geo/ferramentas/editorsql/index.js.php

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
Classe: i3GEOF.editorsql
*/
i3GEOF.editorsql = {
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
			$i(iddiv).innerHTML = i3GEOF.editorsql.html();
			new YAHOO.widget.Button(
				"i3GEOeditorsqlbotao1",
				{onclick:{fn: i3GEOF.editorsql.altera}}
			);
			i3GEOF.editorsql.pega();
			
			i3GEO.util.comboItens(
				"i3GEOeditorsqlItem",
				i3GEO.temaAtivo,
				function(retorno){
			 		$i("i3GEOeditorsqlDivItem").innerHTML = retorno.dados;
			 		$i("i3GEOeditorsqlItem").onchange = function(){
						i3GEO.util.comboValoresItem(
							"i3GEOeditorsqlitens",
							i3GEO.temaAtivo,
							$i("i3GEOeditorsqlItem").value,
							function(retorno){
								$i("i3GEOeditorsqlvalores").innerHTML = "<p class=paragrafo >Valores encontrados:<br><br>"+retorno.dados+"</p>";
							},
							"i3GEOeditorsqlvalores"
						);
			 		
			 		};
				},
				"i3GEOeditorsqlDivItem"
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
		var ins = "<textarea rows='4' colums='20' cols='38' id=i3GEOeditorsqlSQL ></textarea>" +
			'<br><br><p class=paragrafo ><input size=20 id=i3GEOeditorsqlbotao1 type=button value="Aplica"  />' +
			'<br><br><a class=paragrafo href="http://postgis.refractions.net/documentation/manual-1.4/ch07.html" target=_blank >Veja aqui o manual de fun��es SQL do Postgis</a>' +
			'<br><p class=paragrafo >Lista de itens existentes na tabela de atributos do tema (escolha um para ver os valores):</p>' +
			'<div class=paragrafo id=i3GEOeditorsqlDivItem ></div>' +
			'<div class=paragrafo id=i3GEOeditorsqlvalores ></div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo;
		//cria a janela flutuante
		titulo = "Altera SQL <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=86' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"300px",
			"260px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.editorsql",
			true,
			"hd"
		);
		divid = janela[2].id;
		$i("i3GEOF.editorsql_corpo").style.backgroundColor = "white";
		$i("i3GEOF.editorsql_corpo").style.textAlign = "left";
		i3GEOF.editorsql.aguarde = $i("i3GEOF.editorsql_imagemCabecalho").style;
		i3GEOF.editorsql.inicia(divid);
	},
	/*
	Function: pega
	
	Pega o SQL
	
	Veja:
	
	<i3GEO.php.pegaData>
	*/
	pega: function(){
		if(i3GEOF.editorsql.aguarde.visibility === "visible")
		{return;}
		i3GEOF.editorsql.aguarde.visibility = "visible";
		var temp = function(retorno){
			i3GEOF.editorsql.aguarde.visibility = "hidden";
			$i("i3GEOeditorsqlSQL").innerHTML = retorno.data;
		};
		i3GEO.php.pegaData(temp,i3GEO.temaAtivo);
	},
	/*
	Function: altera
	
	Altera o SQL
	
	Veja:
	
	<i3GEO.php.alteraData>
	*/
	altera: function(){
		if(i3GEOF.editorsql.aguarde.visibility === "visible")
		{return;}
		i3GEOF.editorsql.aguarde.visibility = "visible";
		var temp = function(){
			i3GEOF.editorsql.aguarde.visibility = "hidden";
			i3GEO.atualiza();
		};
		i3GEO.php.alteraData(temp,i3GEO.temaAtivo,$i("i3GEOeditorsqlSQL").value);
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>