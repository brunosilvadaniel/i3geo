<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Cor da sele��o

Altera a cor que destaca os elementos selecionados.

Veja:

<i3GEO.mapa.dialogo.queryMap>

Arquivo:

i3geo/ferramentas/opcoes_querymap/index.js.php

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
Classe: i3GEOF.opcoesQuery
*/
i3GEOF.opcoesQuery = {
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
			i3GEOF.opcoesQuery.aguarde.visibility = "visible";
			$i(iddiv).innerHTML += i3GEOF.opcoesQuery.html();
			new YAHOO.widget.Button(
				"i3GEOopcoesQuerybotao1",
				{onclick:{fn: i3GEOF.opcoesQuery.executa}}
			);
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=pegaquerymapcor",
				cp = new cpaint(),
				retorno = function(retorno){
					i3GEOF.opcoesQuery.aguarde.visibility = "hidden";
					if(retorno.data.erro){alert("Ocorreu um erro");return;}
					$i("i3GEOopcoesQuerycor").value = retorno.data;
				};
			cp.set_response_type("JSON");
			cp.call(p,"corQM",retorno);
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
		var ins = $inputText("","","i3GEOopcoesQuerycor","",12,"") +
		'<img alt="aquarela.gif" style=cursor:pointer '+
		'src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.opcoesQuery.corj(\'i3GEOopcoesQuerycor\')" /> ' +
		'<br><br><p class=paragrafo ><input size=20 id=i3GEOopcoesQuerybotao1 type=button value="Aplica"  />';
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
			i3GEO.janela.minimiza("i3GEOF.opcoesQuery");
		};
		//cria a janela flutuante
		titulo = "Cor da sele&ccedil;&atilde;o <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=5' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"210px",
			"80px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opcoesQuery",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.opcoesQuery_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opcoesQuery_corpo").style.textAlign = "left";
		i3GEOF.opcoesQuery.aguarde = $i("i3GEOF.opcoesQuery_imagemCabecalho").style;
		i3GEOF.opcoesQuery.inicia(divid);
	},
	/*
	Function: corj
	
	Abre a janela para o usu�rio selecionar uma cor interativamente
	*/
	corj: function(obj)
	{i3GEO.util.abreCor("",obj);},
	/*
	Function: executa
	
	Aplica os par�metros definidos
	
	Veja:
	
	<QUERYMAPCOR>
	*/
	executa: function(){
		if(i3GEOF.opcoesQuery.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesQuery.aguarde.visibility = "visible";
		var temp = function(){
				i3GEOF.opcoesQuery.aguarde.visibility = "hidden";
				i3GEO.atualiza();
			},
			cor = $i("i3GEOopcoesQuerycor").value,
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=querymapcor&cor="+cor,
			cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"corQM",temp);
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>