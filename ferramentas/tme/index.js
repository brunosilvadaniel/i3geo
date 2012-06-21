
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: TME

Cria um arquivo KML com a representa��o em mapa tem�tico baseado no pacote TME

<i3GEO.tema.dialogo.tme>

Arquivo:

i3geo/ferramentas/tme/index.js.php

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
Classe: i3GEOF.tme
*/
i3GEOF.tme = {
	/*
	Variavel: tema
	
	Tema que ser� utilizado
	
	Type:
	{string}
	*/
	tema: i3GEO.temaAtivo,
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
		i3GEO.janela.comboCabecalhoTemas("i3GEOFtmeComboCabeca","i3GEOFtmeComboCabecaSel","tme","ligadosComTabela");
		if(i3GEO.temaAtivo === ""){
			$i(iddiv).innerHTML = '<img src="../imagens/opcoes.gif" ><p style="position: relative; top: -35px; width: 180px; font-size: 15px; text-align: left; left: 35px;">Escolha um tema da lista</p>';
			return;
		}
		try{
			$i(iddiv).innerHTML += i3GEOF.tme.html();
			new YAHOO.widget.Button(
				"i3GEOtmebotao1",
				{onclick:{fn: i3GEOF.tme.ativa}}
			);
			i3GEO.util.comboItens(
				"i3GEOTMEregioes",
				i3GEOF.tme.tema,
				function(retorno){
					if($i("i3GEOTMEregioeslista"))
			 		{$i("i3GEOTMEregioeslista").innerHTML = retorno.dados;}
				},
				"i3GEOTMEregioeslista"
			);			
			i3GEO.util.mensagemAjuda("i3GEOtmemen1",$i("i3GEOtmemen1").innerHTML);
			i3GEOF.tme.ativaFoco();
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
		var ins = '' +
		'<div style="text-align:left;" id=i3GEOTMEresultado ></div>' +
		'<p class="paragrafo" >' +
		'T�tulo que ser� mostrado no mapa';
		ins += $inputText("","","i3GEOTMEtitulo","",48,"") +
		'<br><br>Descri��o do mapa';
		ins += $inputText("","","i3GEOTMEdesc","",48,"") +
		'<br><br>Coluna que cont�m os nomes das regi�es (exemplo: nomes dos Estados ou nomes dos munic�pios):' +
		'<div id="i3GEOTMEregioeslista" style="text-align:left;" ></div>' +
		'<p class="paragrafo" >' +
		'<br>Escolha uma ou mais colunas que cont�m os dados estat�sticos que ser�o representados:' +	
		'<div id=i3GEOtmelistai class=digitar style="text-align:left;left:0px;top:0px;330px;height:80px;overflow:auto;display:block;"></div>' +
		'<br>' +
		'<input id=i3GEOtmebotao1 size=35  type=button value="Aplicar" />' +
		'<div id=i3GEOtmemen1 style=top:15px;left:0px; ><p class=paragrafo >Ser� criado um arquivo KML que pode ser aberto com o Google Earth. A coluna com os nomes das regi�es define o nome que ser� mostrado para cada elemento mapeado. Quando os nomes das colunas com os valores corresponderem a um determinado ano, ser� mostrado um bot�o do tipo slide no Google Earth, mas isso s� ocorre se o nome da coluna for o mesmo nome do ano, exemplo, para o ano de 1980 o nome da coluna dever� ser 1980</div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo,cabecalho,minimiza;
		if($i("i3GEOF.tme")){
			i3GEOF.tme.inicia("i3GEOF.tme_corpo");
			return;
		}
		cabecalho = function(){
			i3GEOF.tme.ativaFoco();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.tme");
		};
		//cria a janela flutuante
		titulo = "<div style='z-index:1;position:absolute' id='i3GEOFtmeComboCabeca' >------</div><span style=margin-left:60px>tme</span><a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=108' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"380px",
			"320px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.tme",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.tme.aguarde = $i("i3GEOF.tme_imagemCabecalho").style;
		$i("i3GEOF.tme_corpo").style.backgroundColor = "white";
		i3GEOF.tme.inicia(divid);
		temp = function(){
			if(i3GEO.eventos.ATUALIZAARVORECAMADAS.toString().search('i3GEO.janela.comboCabecalhoTemas("i3GEOFtmeComboCabeca","i3GEOFtmeComboCabecaSel","tme","ligadosComTabela")') > 0)
			{i3GEO.eventos.ATUALIZAARVORECAMADAS.remove('i3GEO.janela.comboCabecalhoTemas("i3GEOFtmeComboCabeca","i3GEOFtmeComboCabecaSel","tme","ligadosComTabela")');}			
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
	},
	/*
	Function: ativaFoco
	
	Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
	*/
	ativaFoco: function(){
		i3GEO.php.listaItensTema(i3GEOF.tme.montaListaItens,i3GEOF.tme.tema);
		var i = $i("i3GEOF.tme_c").style;
		i3GEO.janela.ULTIMOZINDEX++;
		i.zIndex = 21000 + i3GEO.janela.ULTIMOZINDEX;
	},
	/*
	Function: montaListaItens
	
	Monta a lista de itens que poder�o ser escolhidos para compor o mapa.
	
	A lista � inserida no elemento html com id "i3GEOtmelistai"
	*/
	montaListaItens: function(retorno){
		var ins,i,n,itensatuais,item,checado;
		try{
			ins = [];
			ins.push("<table class=lista >");
			n = retorno.data.valores.length;
			for (i=0;i<n; i++){
				item = retorno.data.valores[i].item;
				ins.push("<tr><td><input size=2 style='cursor:pointer' "+checado+" type=checkbox id=i3GEOtme"+item+" /></td>");
				ins.push("<td>&nbsp;"+item+"</td>");
			}
			$i("i3GEOtmelistai").innerHTML = ins.join("");
			ins.push("</table>");
		}
		catch(e)
		{$i("i3GEOtmelistai").innerHTML = "<p style=color:red >Ocorreu um erro<br>"+e;}	
	},
	/*
	Function: pegaItensMarcados
	
	Recupera os itens que foram marcados e monta uma lista para enviar como par�metro para a fun��o de gera��o dos gr�ficos
	*/
	pegaItensMarcados: function(){
		var listadeitens = [],
			inputs = $i("i3GEOtmelistai").getElementsByTagName("input"),
			i,
			it,
			c,
			n;
		n = inputs.length;
		for (i=0;i<n; i++){
			if (inputs[i].checked === true){
				it = inputs[i].id;
				listadeitens.push(it.replace("i3GEOtme",""));
			}
		}
		return(listadeitens);
	},
	/*
	Function: ativa
	
	Cria o arquivo KML com os itens marcados
	
	Veja:
	
	<ATIVAtme>
	*/
	ativa: function(){
		try{
			if(i3GEOF.tme.aguarde.visibility === "visible")
			{return;}
			var lista = i3GEOF.tme.pegaItensMarcados(),
				cp = new cpaint(),
				temp,
				p,
				colunanomeregiao = $i("i3GEOTMEregioes").value;
			if(lista.length === 0)
			{alert("selecione um item");return;}
			if(colunanomeregiao === 0)
			{alert("selecione um item com as regi�es");return;}
			i3GEOF.tme.aguarde.visibility = "visible";
			temp = function(retorno){
				i3GEOF.tme.aguarde.visibility = "hidden";
				var ins = "<p class=paragrafo >Clique no arquivo para fazer o download:<br><a href='"+retorno.data.url+"' target=new >"+retorno.data.url+"</a><br>";
				ins += "<br>Ou clique para abrir no i3Geo:<br><a href='"+i3GEO.configura.locaplic+"/ms_criamapa.php?interface=googleearth.phtml&kmlurl="+retorno.data.url+"' target='new' >interface Google Earth</a><br>";
				$i("i3GEOTMEresultado").innerHTML = ins;
				
			};
			p = i3GEO.configura.locaplic+"/pacotes/tme/TME_i3geo.php?sid="+i3GEO.configura.sid+"&nomelayer="+i3GEO.temaAtivo+"&colunasvalor="+lista.toString(",")+"&colunanomeregiao="+colunanomeregiao+"&titulo="+$i("i3GEOTMEtitulo").value+"&descricao="+$i("i3GEOTMEdesc").value;
			cp.set_response_type("JSON");
			cp.call(p,"tme",temp);
		}catch(e){alert("Erro: "+e);i3GEOF.tme.aguarde.visibility = "hidden";}
	}
};
