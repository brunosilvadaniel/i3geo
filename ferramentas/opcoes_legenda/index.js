
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Legenda gr&aacute;fica do mapa

Edita a legenda que &eacute; mostrada no corpo do mapa, controlando o tamanho, posi&ccedil;&atilde;o, fontes, etc.

Veja:

<i3GEO.mapa.dialogo.opcoesLegenda>

Arquivo:

i3geo/ferramentas/opcoes_legenda/index.js.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEOF) === 'undefined'){
	var i3GEOF = {};
}
/*
Classe: i3GEOF.opcoesLegenda

*/
i3GEOF.opcoesLegenda = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/*
		Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n&atilde;o tinha dicion&aacute;rio
	*/
	criaJanelaFlutuante: function(){
		i3GEOF.opcoesLegenda.iniciaDicionario();
	},
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.opcoesLegenda.dicionario);
		dicionario["sim"] = $trad("x14");
		dicionario["nao"] = $trad("x15");
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		dicionario["imagecolor"] = $inputText('','','i3GEOopcoesLegendaimagecolor','',12,'');
		dicionario["asp"] = '"';
		dicionario["outlinecolor"] = $inputText('','','i3GEOopcoesLegendaoutlinecolor','',12,'');
		dicionario["keyspacingy"] = $inputText('','','i3GEOopcoesLegendakeyspacingy','',4,'');
		dicionario["keyspacingx"] = $inputText('','','i3GEOopcoesLegendakeyspacingx','',4,'');
		dicionario["keysizey"] = $inputText('','','i3GEOopcoesLegendakeysizey','',4,'');
		dicionario["keysizex"] = $inputText('','','i3GEOopcoesLegendakeysizex','',4,'');
		dicionario["labelsize"] = $inputText('','','i3GEOopcoesLegendalabelsize','',4,'');
		return dicionario;
	},
	/*
	Function: iniciaDicionario

	Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta

	O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script
	*/
	iniciaDicionario: function(){
		if(typeof(i3GEOF.opcoesLegenda.dicionario) === 'undefined'){
			i3GEO.util.scriptTag(
				i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/dicionario.js",
				"i3GEOF.opcoesLegenda.iniciaJanelaFlutuante()",
				"i3GEOF.opcoesLegenda.dicionario_script"
			);
		}
		else{
			i3GEOF.opcoesLegenda.iniciaJanelaFlutuante();
		}
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML = i3GEOF.opcoesLegenda.html();
			new YAHOO.widget.Button(
				"i3GEOopcoesLegendabotao1",
				{onclick:{fn: i3GEOF.opcoesLegenda.executa}}
			);
			new YAHOO.widget.Button(
				"i3GEOopcoesLegendabotao2",
				{onclick:{fn: i3GEOF.opcoesLegenda.testa}}
			);
			i3GEO.util.comboFontes("i3GEOopcoesLegendafonte","i3GEOopcoesLegendafontef");
			i3GEOF.opcoesLegenda.parametrosAtuais();
		}
		catch(erro){if(typeof(console) !== 'undefined'){console.error(erro);}}
		if(i3GEO.Interface.ATUAL !== "padrao")
		{i3GEO.janela.tempoMsg($trad('msg',i3GEOF.opcoesLegenda.dicionario));}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function() {
		var ins = Mustache.render(i3GEOF.opcoesLegenda.MUSTACHE, i3GEOF.opcoesLegenda.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.opcoesLegenda");
		};
		//cria a janela flutuante
		titulo = $trad("t18b")+" <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=2' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"320px",
			"390px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opcoesLegenda",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.opcoesLegenda_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opcoesLegenda_corpo").style.textAlign = "left";
		i3GEOF.opcoesLegenda.aguarde = $i("i3GEOF.opcoesLegenda_imagemCabecalho").style;
		i3GEOF.opcoesLegenda.inicia(divid);
	},
	/*
	Function: corj

	Abre a janela para o usu&aacute;rio selecionar uma cor interativamente
	*/
	corj: function(obj)
	{i3GEO.util.abreCor("",obj);},
	/*
	Function: executa

	Altera a legenda

	Veja:

	<APLICAPARAMETROSLEGIMG>
	*/
	executa: function(){
		if(i3GEOF.opcoesLegenda.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesLegenda.aguarde.visibility = "visible";
		var temp = function(){
				i3GEOF.opcoesLegenda.aguarde.visibility = "hidden";
				if(i3GEO.Interface.ATUAL === "padrao")
				{i3GEO.atualiza();}
			},
			par = i3GEOF.opcoesLegenda.parametrosFormulario(),
			p = i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/exec.php?g_sid="+i3GEO.configura.sid+"&funcao=aplicaParametrosLegImg"+par,
			cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"void",temp);
	},
	/*
	Function: parametrosAtuais

	Pega os par�metros atuais da legenda

	Veja:

	<PEGAPARAMETROSLEGIMG>
	*/
	parametrosAtuais: function(){
		i3GEOF.opcoesLegenda.aguarde.visibility = "visible";
		var p = i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/exec.php?g_sid="+i3GEO.configura.sid+"&funcao=pegaParametrosLegImg",
			cp = new cpaint(),
			temp = function(retorno){
				try{
					if(retorno.data !== ""){
						$i("i3GEOopcoesLegendaimagecolor").value = retorno.data.imagecolor;
						$i("i3GEOopcoesLegendaposition").value = retorno.data.position;
						$i("i3GEOopcoesLegendastatus").value = retorno.data.status;
						$i("i3GEOopcoesLegendaoutlinecolor").value = retorno.data.outlinecolor;
						$i("i3GEOopcoesLegendakeyspacingy").value = retorno.data.keyspacingy;
						$i("i3GEOopcoesLegendakeyspacingx").value = retorno.data.keyspacingx;
						$i("i3GEOopcoesLegendakeysizey").value = retorno.data.keysizey;
						$i("i3GEOopcoesLegendakeysizex").value = retorno.data.keysizex;
						$i("i3GEOopcoesLegendalabelsize").value = retorno.data.labelsize;
					}
					i3GEOF.opcoesLegenda.aguarde.visibility = "hidden";
					//i3GEOF.opcoesLegenda.testa();
				}catch(e){
					i3GEO.janela.tempoMsg("Erro. "+e);
					i3GEOF.opcoesLegenda.aguarde.visibility = "hidden";
				}
			};
		cp.set_response_type("JSON");
		cp.call(p,"pegaParametrosLegImg",temp);
	},
	/*
	Function: parametrosFormulario

	Pega os valores do formul&aacute;rio atual
	*/
	parametrosFormulario: function(){
		var par = "",
			v = $i("i3GEOopcoesLegendaimagecolor").value;
		if (v === "")
		{v = "-1,-1,-1";}
		par += "&imagecolor="+v;
		par += "&position="+$i("i3GEOopcoesLegendaposition").value;
		par += "&status="+$i("i3GEOopcoesLegendastatus").value;
		v = $i("i3GEOopcoesLegendaoutlinecolor").value;
		if (v === "")
		{v = "-1,-1,-1";}
		par += "&outlinecolor="+v;
		par += "&keyspacingy="+$i("i3GEOopcoesLegendakeyspacingy").value;
		par += "&keyspacingx="+$i("i3GEOopcoesLegendakeyspacingx").value;
		par += "&keysizey="+$i("i3GEOopcoesLegendakeysizey").value;
		par += "&keysizex="+$i("i3GEOopcoesLegendakeysizex").value;
		par += "&height=0";
		par += "&width=0";
		par += "&labelsize="+$i("i3GEOopcoesLegendalabelsize").value;
		par += "&fonte="+$i("i3GEOopcoesLegendafonte").value;
		return(par);
	},
	/*
	Function: testa

	Testa a legenda, mostrando uma imagem tempor&aacute;ria

	Veja:

	<TESTALEGENDA>
	*/
	testa: function(){
		if(i3GEOF.opcoesLegenda.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesLegenda.aguarde.visibility = "visible";
		var temp = function(retorno){
				i3GEOF.opcoesLegenda.aguarde.visibility = "hidden";
				eval(retorno.data);
				$i("i3GEOopcoesLegendatesteLegenda").src = legimagem;
				$i("i3GEOopcoesLegendatesteLegenda").style.display = "block";
			},
			par = i3GEOF.opcoesLegenda.parametrosFormulario(),
			p = i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/exec.php?g_sid="+i3GEO.configura.sid+"&funcao=testaLegenda"+par,
			cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"testaLegenda",temp);
	}
};