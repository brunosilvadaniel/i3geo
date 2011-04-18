<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Centro de massa

Calcula o centro m�dio e centro m�dio ponderado de um conjunto de pontos

Veja:

<i3GEO.analise.centromassa>

Arquivo:

i3geo/ferramentas/centromassa/index.js.php

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
Classe: i3GEOF.centromassa
*/
i3GEOF.centromassa = {
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
			$i(iddiv).innerHTML += i3GEOF.centromassa.html();
			i3GEOF.centromassa.t0();
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
		var ins = '';
		ins +=	'<div style="background-color:#F2F2F2;top:0px;left:0px;display:block;width:98%;" id="i3GEOcentromassaresultado" >';
		ins +=	'</div>';
		ins +=	'<div style="top:10px;left:0px;display:block;width:98%;color:red" id="i3GEOcentromassafim" >';
		ins +=	'</div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		//cria a janela flutuante
		titulo = "Centro de massa <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=94' >&nbsp;&nbsp;&nbsp;</a>";
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.centromassa");
		};
		janela = i3GEO.janela.cria(
			"400px",
			"250px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.centromassa",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.centromassa.aguarde = $i("i3GEOF.centromassa_imagemCabecalho").style;
		i3GEOF.centromassa.inicia(divid);
		temp = function(){
			if(i3GEO.eventos.ATUALIZAARVORECAMADAS.toString().search("i3GEOF.centromassa.t0()") > 0)
			{i3GEO.eventos.ATUALIZAARVORECAMADAS.remove("i3GEOF.centromassa.t0()");}
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
		if(i3GEO.eventos.ATUALIZAARVORECAMADAS.toString().search("i3GEOF.centromassa.t0()") < 0)
		{i3GEO.eventos.ATUALIZAARVORECAMADAS.push("i3GEOF.centromassa.t0()");}
	},
	t0: function()
	{
		var ins = "<p class='paragrafo'>O centro m�dio � uma opera&ccedil;&atilde;o que resulta em um novo tema contendo o ponto que indica o centro de equil�brio de uma distribui��o.</p>";
		ins += "<p class='paragrafo'>Para gerar o c�lculo &eacute; necess&aacute;rio que no mapa exista pelo menos um tema de pontos. Se n�o houverem elementos selecionados, ser� considerada a extens�o geogr�fica.</p>";
		i3GEO.util.proximoAnterior("","i3GEOF.centromassa.t1()",ins,"i3GEOFgradeDePontost0","i3GEOcentromassaresultado");
	},
	t1: function(){
		var ins = "<p class='paragrafo' >Tema contendo os pontos:<br>";
		ins += "<div style='text-align:left;' id='i3GEOcentromassaDivPontos' ></div><br>";
		ins += "<p class='paragrafo' >Utilizar o seguinte item para ponderar os valores:<br>";
		ins += "<div id=i3GEOondeItens style='text-align:left;display:block' ></div>";
		i3GEO.util.proximoAnterior("i3GEOF.centromassa.t0()","i3GEOF.centromassa.t2()",ins,"i3GEOF.centromassa.t1","i3GEOcentromassaresultado");
		i3GEOF.centromassa.comboTemasPontos();
	},
	t2: function(){
		var ins = "<p class='paragrafo'>O tema com o centro ser&aacute; adicionado ao mapa atual.";
		ins += "<br><br><input id=i3GEOcentromassabotao1 type='buttom' value='Calcular' />";
		i3GEO.util.proximoAnterior("i3GEOF.centromassa.t1()","",ins,"i3GEOF.centromassa.t2","i3GEOcentromassaresultado");
		new YAHOO.widget.Button(
			"i3GEOcentromassabotao1",
			{onclick:{fn: i3GEOF.centromassa.calcula}}
		);		
	},
	/*
	Function: calcula
	
	Faz o c�lculo
	
	Veja:
	
	<centromassa>
	*/
	calcula: function(){
		try{
			if(i3GEOF.centromassa.aguarde.visibility === "visible")
			{return;}
			i3GEOF.centromassa.aguarde.visibility = "visible";
			var p,
			cp,
			fim = function(retorno){
				if (retorno.data==undefined )
				{$i("i3GEOcentromassafim").innerHTML = "<p class='paragrafo' >Erro. A opera��o demorou muito.";}
				else
				{i3GEO.atualiza();}
				i3GEOF.centromassa.aguarde.visibility = "hidden";
			},
			ext;
			if(i3GEO.Interface.ATUAL === "googlemaps")
			{ext = i3GEO.Interface.googlemaps.bbox();}
			else
			{ext = i3GEO.parametros.mapexten;}
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=centromassa&tema="+$i("i3GEOFcentromassaPontos").value+"&item="+$i("i3GEOFcentromassaItem").value+"&ext="+ext;
			cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"centromassa",fim);
		}
		catch(e){$i("i3GEOcentromassafim").innerHTML = "<p class='paragrafo' >Erro. "+e;i3GEO.janela.fechaAguarde();i3GEOF.centromassa.aguarde.visibility = "hidden";}
	},
	/*
	Function: comboTemasPontos
	
	Cria um combo com a lista de temas pontuais
	
	Veja:
	
	<i3GEO.util.comboTemas>
	*/
	comboTemasPontos: function(){
		i3GEO.util.comboTemas(
			"i3GEOFcentromassaPontos",
			function(retorno){
				$i("i3GEOcentromassaDivPontos").innerHTML = retorno.dados;
				var c = $i("i3GEOFcentromassaPontos");
		 		$i("i3GEOcentromassaDivPontos").style.display = "block";
		 		if (c){
		 			c.onchange = function(){
		 				$i("i3GEOondeItens").style.display = "block";
						$i("i3GEOondeItens").innerHTML = "Aguarde...";
						i3GEO.mapa.ativaTema(c.value);
						i3GEOF.centromassa.comboItens();
		 			};
				}
				if(i3GEO.temaAtivo !== ""){
					if(c)
					{c.value = i3GEO.temaAtivo;}
		 			$i("i3GEOondeItens").style.display = "block";
					$i("i3GEOondeItens").innerHTML = "Aguarde...";
					i3GEOF.centromassa.comboItens();					
				}
			},
			"i3GEOcentromassaDivPontos",
			"",
			false,
			"pontos"
		);	
	},
	/*
	Function: comboItens
	
	Cria um combo para escolha de um item do tema

	Veja:
	
	<i3GEO.util.comboItens>

	*/
	comboItens: function(){
		i3GEO.util.comboItens(
			"i3GEOFcentromassaItem",
			$i("i3GEOFcentromassaPontos").value,
			function(retorno){
		 		$i("i3GEOondeItens").innerHTML = retorno.dados;
		 		$i("i3GEOondeItens").style.display = "block";
			},
			"i3GEOondeItens"
		);
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>