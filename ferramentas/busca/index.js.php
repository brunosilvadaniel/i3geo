<?php if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Ferramenta de busca de dados em um tema

File: i3geo/ferramentas/busca/index.js.php

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
Class: i3GEOF.busca

Realiza a busca de elementos em um tema tendo como base a tabela de atributos do tema.

O tema que ser� utilizado na inicializa��o � o que estiver armazenado na vari�vel global i3GEO.temaAtivo
*/
i3GEOF.busca = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Variavel: tema
	
	C�digo do tema utilizado na busca
	*/
	tema: i3GEO.temaAtivo,
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.busca.html();
			i3GEO.php.listaItensTema(i3GEOF.busca.montaListaItens,i3GEOF.busca.tema);
			new YAHOO.widget.Button(
				"i3GEObuscabotao1",
				{onclick:{fn: i3GEOF.busca.procurar}}
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
		var ins = '';
		ins += '<p class="paragrafo" >';
		ins += $inputText("","","i3GEObuscapalavra","",47,"digite aqui o texto...");
		ins += '<p class="paragrafo" ><input id=i3GEObuscabotao1 size=20  type=button value="Procurar" />';
		ins += '<br><br><table summary="Lista de opcoes" class=lista3 width="250px">';
		ins += '	<tr>';
		ins += '		<td><input style="cursor:pointer" type=radio id=i3GEObuscaqualquer name=i3GEObuscatipo checked /></td>';
		ins += '		<td>qualquer lugar do item, ou</td>';
		ins += '	</tr>';
		ins += '	<tr>';
		ins += '		<td><input style="cursor:pointer" type=radio id=i3GEObuscaexata name=i3GEObuscatipo /></td>';
		ins += '		<td>a frase exata</td>';
		ins += '	</tr><tr><td></td><td>&nbsp;</td></tr>';
		ins += '	<tr>';
		ins += '		<td><input style="cursor:pointer" type=radio id=i3GEObuscamapa name=i3GEObuscaonde checked /></td>';
		ins += '		<td>procurar no mapa todo, ou</td>';
		ins += '	</tr>';
		ins += '	<tr>';
		ins += '		<td><input style="cursor:pointer" type=radio id=i3GEObuscaregiao name=i3GEObuscaonde /></td>';
		ins += '		<td>na regi&atilde;o atual</td>';
		ins += '	</tr>';
		ins += '</table>';
		ins += '<p class="paragrafo" ><b>Buscar nos itens:</b>';
		ins += '<div id=i3GEObuscalistai class=digitar style="text-align:left;width:250px;overflow:auto;height:115px">';
		ins += '</div>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		//funcao que sera executada ao ser clicado no cabe�alho da janela
		cabecalho = function(){
			i3GEOF.busca.ativaFoco();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.busca");
		};
		//cria a janela flutuante
		titulo = "Procurar <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=35' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"280px",
			"300px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.busca",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.busca.aguarde = $i("i3GEOF.busca_imagemCabecalho").style;
		//i3GEOF.analisaGeometrias.aguarde.visibility = "visible";
		i3GEOF.busca.inicia(divid);
	},
	/*
	Function: ativaFoco
	
	Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
	*/
	ativaFoco: function(){
		if(i3GEO.arvoreDeCamadas.pegaTema(i3GEOF.busca.tema) === "")
		{alert("O tema ja nao existe mais no mapa");}
	},
	/*
	Function: montaListaItens
	
	Monta a lista de itens que poder�o ser escolhidos.
	
	A lista � inserida no elemento html com id "i3GEObuscalistai"
	*/
	montaListaItens: function(retorno){
		var ins = "",
			i,
			n;
		try{
			ins += ("<table class=lista >");
			n = retorno.data.valores.length;
			for (i=0;i<n; i++){
				ins += "<tr><td><input size=2 style='cursor:pointer' name='"+retorno.data.valores[i].item+";"+retorno.data.valores[i].tema+"' type=checkbox /></td>";
				ins += "<td>&nbsp;"+retorno.data.valores[i].item+" - "+retorno.data.valores[i].tema+"</td></tr>";
			}
			ins += "</table>";
			$i("i3GEObuscalistai").innerHTML = ins;
		}
		catch(e)
		{$i("i3GEObuscalistai").innerHTML = "<p style=color:red >Ocorreu um erro<br>"+e;}	
	},
	procurar: function(){
		if(i3GEOF.busca.aguarde.visibility === "visible")
		{return;}
		if(i3GEO.arvoreDeCamadas.pegaTema(i3GEOF.busca.tema) === "")
		{alert("O tema ja nao existe mais no mapa");return;}
		var inputs = $i("i3GEObuscalistai").getElementsByTagName("input"),
			n = inputs.length,
			listai = [],
			i,
			tipo = "exata",
			onde = "mapa",
			palavra = $i("i3GEObuscapalavra").value,
			p,
			cp;
		for (i=0;i<n; i++)
		{
			if (inputs[i].checked === true)
			{listai.push(inputs[i].name);}
		}
		if (listai.length === 0)
		{alert("Selecione um item");}
		else{
			if ($i("i3GEObuscapalavra").value === "")
			{alert("Digite uma palavra");}
			else
			{
				i3GEOF.busca.aguarde.visibility = "visible";
				if ($i("i3GEObuscaqualquer").checked === true)
				{tipo = "qualquer";}
				if ($i("i3GEObuscaregiao").checked === true)
				{onde = "regiao";}
				palavra = removeAcentos(palavra);
				
				p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=listavaloresitens&palavra="+palavra+"&lista="+listai.toString()+"&tipo="+tipo+"&onde="+onde;
				cp = new cpaint();
				cp.set_response_type("json");
				cp.call(p,"buscaRegistros",i3GEOF.busca.mostraBusca);
			}
		}	
	},
	/*
	Function: mostraBusca
	
	Monta uma nova janela com os resultados da busca.
	*/
	mostraBusca: function(retorno){
		i3GEOF.busca.aguarde.visibility = "hidden";
		var palavra = $i("i3GEObuscapalavra").value,
			idJanela = YAHOO.util.Dom.generateId(),
			naoEncontrado = "<p style=color:red >Nenhum registro encontrado<br>",
			ins = [],
			linhas,
			nlinhas,
			linha,
			nlinha,
			valores,
			x,
			y,
			i,
			er,
			tr,
			tema;		
		i3GEO.janela.cria("200px","200px","","","",palavra,idJanela);
		if (retorno.data !== undefined)
		{
			nlinhas = retorno.data.length;
			for (tema=0;tema<nlinhas; tema++){
				linhas = retorno.data[tema].resultado;
				nlinha = linhas.length;
				for (linha=0;linha<nlinha; linha++){
					valores = (linhas[linha].box).split(" ");
					x = (valores[0] * 1) + ((((valores[0] * -1) - (valores[2] * -1)) / 2) * 1);
					y = (valores[1] * 1) + ((((valores[1] * -1) - (valores[3] * -1)) / 2) * 1);			
					ins.push("<table><tr><td onclick='i3GEO.navega.zoomExt(\"\",\"\",\"\",\""+linhas[linha].box+"\")' style='cursor:pointer;color:navy'>zoom&nbsp;</td><td onclick='i3GEO.navega.zoomponto(\"\",\"\","+x+","+y+")' style='color:navy;cursor:pointer;'>&nbsp;localiza</td></tr></table>");
					for (i=0;i<linhas[linha].valores.length; i++){
						er = new RegExp(palavra, "gi");
						tr = (linhas[linha].valores[i].valor).replace(er,"<span style=color:red;text-align:left >"+palavra+"</span>");
						ins.push("<div style=width:150px;text-align:left;left:5px; >"+ linhas[linha].valores[i].item + ": " + tr + "</div><br>");
						naoEncontrado = "";
					}
			 	}
			}
			$i(idJanela+"_corpo").innerHTML = "<div style='position:relative;top:0px;left:0px;width:160;overflow:auto;'>"+naoEncontrado+ins.join("")+"</div>";
		}
		else
		{$i(idJanela+"_corpo").innerHTML = "<p style=color:red >Ocorreu um erro<br>";}
	}
};
<?php if(extension_loaded('zlib')){ob_end_flush();}?>