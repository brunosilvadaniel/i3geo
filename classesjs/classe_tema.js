/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Temas

File: i3geo/classesjs/classe_tema.js

About: Licen�a

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
if(typeof(i3GEO) === 'undefined'){
	i3GEO = [];
}
/*
Classe: i3GEO.tema

Fun��es de di�logo e processamento de propriedades de um tema existente no mapa

Em i3GEO.tema.dialogo est�o as fun��es de abertura dos di�logos para altera��o das propriedades do tema,
*/
i3GEO.tema = {
	/*
	Variable: TEMPORIZADORESID
	
	Objeto que cont�m os identificadores dos temporizadores (setInterval) estabelecidos para cada camada
	
	Type:
	{objeto} - {idtema:{idtemporizador:,tempo:}}
	*/
	TEMPORIZADORESID: {},
	/*
	Function: exclui

	Exclui um tema do mapa

	Parametros:

	tema - c�digo do tema
	*/
	exclui: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.exclui()");}
		g_operacao = "excluitema";
		//remove o tema do DOM e seus filhos
		var layer,
			indice,
			p;
		try{
			p = document.getElementById("idx"+tema).parentNode.parentNode.parentNode;
			do
			{p.removeChild(p.childNodes[0]);}
			while
			(p.childNodes.length > 0);
			p.parentNode.removeChild(p);
		}
		catch(e){}
		i3GEO.php.excluitema(i3GEO.atualiza,[tema]);
		i3GEO.mapa.ativaTema("");
		i3GEO.temaAtivo = "";
	},
	/*
	Function: fonte

	Abre os metadados registrados para o tema

	Parametros:

	tema - c�digo do tema
	*/
	fonte: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.fonte()");}
		i3GEO.mapa.ativaTema(tema);
		window.open(i3GEO.configura.locaplic+"/admin/abrefontemapfile.php?tema="+tema);
	},
	/*
	Function: sobe

	Sobe um tema na ordem de desenho

	Parametros:

	tema - c�digo do tema
	*/
	sobe: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.sobe()");}
		i3GEO.mapa.ativaTema(tema);
		var temp = function(retorno){
			//
			//atualiza apenas remonta a �rvore
			//no caso de interfaces como openlayers
			//� necess�rio mover o DIV tbm
			//
			i3GEO.atualiza(retorno);
			if(i3GEO.Interface.ATUAL === "openlayers")
			{i3GEO.Interface.openlayers.ordenaLayers();}
		};
		i3GEO.php.sobetema(temp,tema);
	},
	/*
	Function: desce

	Desce um tema na ordem de desenho

	Parametros:

	tema - c�digo do tema
	*/
	desce: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.desce()");}
		i3GEO.mapa.ativaTema(tema);
		var temp = function(retorno){
			//
			//atualiza apenas remonta a �rvore
			//no caso de interfaces como openlayers
			//� necess�rio mover o DIV tbm
			//
			i3GEO.atualiza(retorno);
			if(i3GEO.Interface.ATUAL === "openlayers")
			{i3GEO.Interface.openlayers.ordenaLayers();}
		};
		i3GEO.php.descetema(temp,tema);
	},
	/*
	Function: zoom

	Zoom para o tema

	Parametros:

	tema - c�digo do tema
	*/
	zoom: function(tema){
		i3GEO.mapa.ativaTema(tema);
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.zoom()");}
		i3GEO.php.zoomtema(i3GEO.atualiza,tema);
	},
	/*
	Function: zoomsel

	Zoom para os elementos selecionados de um tema

	Parametros:

	tema - c�digo do tema
	*/
	zoomsel: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.zoomsel()");}
		i3GEO.mapa.ativaTema(tema);
		i3GEO.php.zoomsel(i3GEO.atualiza,tema);
	},
	/*
	Function: limpasel

	Limpa a selecao do tema

	Parametros:

	tema - ID (name) do tema clicado
	*/
	limpasel: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.limpasel()");}
		i3GEO.mapa.ativaTema(tema);
		g_operacao = "limpasel";
		var temp = function(retorno){
			i3GEO.atualiza(retorno);
			i3GEO.Interface.atualizaTema(retorno,tema);
		};
		i3GEO.php.limpasel(temp,tema);
	},
	/*
	Function: mudatransp

	Muda a transparencia de um tema

	Parametros:

	idtema - c�digo do tema
	*/
	mudatransp: function(idtema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.mudatransp()");}
		i3GEO.mapa.ativaTema(idtema);
		g_operacao = "transparencia";
		var valor,
			temp = function(retorno){
				i3GEO.atualiza(retorno);
				i3GEO.Interface.atualizaTema(retorno,idtema);
			};
		//o campo input com o valor possui o prefixo 'tr' seguido pelo c�digo do tema
		if ($i("tr"+idtema))
		{valor = $i("tr"+idtema).value;}
		else
		{alert("Ocorreu um erro");}
		if (valor !== ""){
			i3GEO.php.mudatransp(temp,idtema,valor);
		}
		else
		{alert("Valor n�o definido.");}
	},
	/*
	Function: invertestatuslegenda

	Inverte o status atual do metadata CLASSE, permitindo esconder ou mostrar a legenda do tema

	Parametros:

	idtema - c�digo do tema
	*/
	invertestatuslegenda: function(idtema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.invertestatuslegenda()");}
		alert("Essa op��o afeta apenas a impress�o do mapa");
		i3GEO.mapa.ativaTema(idtema);
		g_operacao = "transparencia";
		var temp = function(retorno){
			i3GEO.atualiza(retorno);
			i3GEO.arvoreDeCamadas.atualiza();
		};
		i3GEO.php.invertestatuslegenda(temp,idtema);
	},
	/*
	Function: alteracorclasse

	Altera a cor de uma classe de um tema

	Parametros:

	idtema - c�digo do tema

	idclasse - id da classe

	rgb - nova cor (r,g,b)
	*/
	alteracorclasse: function(idtema,idclasse,rgb){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.alteracorclasse()");}
		i3GEO.mapa.ativaTema(idtema);
		var temp = function(){
			i3GEO.atualiza();
			i3GEO.Interface.atualizaTema("",idtema);
			i3GEO.arvoreDeCamadas.atualizaLegenda(idtema);
		};
		i3GEO.php.aplicaCorClasseTema(temp,idtema,idclasse,rgb);
	},
	/*
	Function: mudanome

	Muda o nome de um tema

	Parametros:

	idtema - c�digo do tema
	*/
	mudanome: function(idtema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.mudanome()");}
		i3GEO.mapa.ativaTema(idtema);
		g_operacao = "mudanome";
		var valor;
		if($i("nn"+idtema))
		{valor = $i("nn"+idtema).value;}
		else
		{alert("Ocorreu um erro");}
		if (valor !== ""){
			i3GEO.php.mudanome(i3GEO.atualiza,idtema,valor);
		}
		else
		{alert("Nome n�o definido");}
	},
	/*
	Function: mostralegendajanela

	Mostra a legenda de um tema em uma janela flutuante espec�fica

	Na configura��o padr�o, essa fun��o � disparada quando o usu�rio estaciona o ouse sobre o nome de um tema na �rvore de camadas

	O uso normal seria nas op��es onmouseover e onmouseout

	Exemplo:

	onmouseover = i3GEO.tema.mostralegendajanela(idtema,nome,"ativatimer")

	onmouseout = i3GEO.tema.mostralegendajanela(idtema,nome,"desaativatimer")

	onclick = i3GEO.tema.mostralegendajanela(idtema,nome,"abrejanela")

	Parametros:

	idtema {String} - c�digo do tema

	nome {String} - nome completo do tema que ser� mostrado no cabe�alho da janela

	tipoOperacao {String} {ativatimer|desativatimer|abrejanela} - tipo de opera��o que ser� executada
	*/
	mostralegendajanela: function(idtema,nome,tipoOperacao){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.mostralegendajanela()");}
		//alert(idtema+" "+status)
		var retorna,janela;
		if(tipoOperacao === "ativatimer"){
			mostralegendajanelaTimer = setTimeout("i3GEO.tema.mostralegendajanela('"+idtema+"','"+nome+"','abrejanela')",4000);
		}
		if(tipoOperacao === "abrejanela"){
			try{clearTimeout(mostralegendajanelaTimer);}
			catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
			}
			retorna = function(retorno){
				$i("janelaLegenda"+idtema+"_corpo").innerHTML = retorno.data.legenda;
			};
			if(!$i("janelaLegenda"+idtema)){
				janela = i3GEO.janela.cria("250px","","","","",nome,"janelaLegenda"+idtema,false);
				janela[2].style.textAlign="left";
				janela[2].style.background="white";
				janela[2].innerHTML = $trad("o1");
			}
			i3GEO.php.criaLegendaHTML(retorna,idtema,"legenda3.htm");
		}
		if(tipoOperacao === "desativatimer"){
			clearTimeout(mostralegendajanelaTimer);
		}
	},
	/*
	Function: temporizador

	Aplica um temporizador para que a camada seja redesenhada em determinado intervalo de tempo.

	O campo com o valor de tempo (em segundos) � composto por "temporizador"+idtema

	Parametros:

	idtema - id que identifica o tema no map file.
	*/
	temporizador: function(idtema,tempo){
		if(!tempo)
		{tempo = $i("temporizador"+idtema).value;}
		if(tempo != "" && parseInt(tempo,10) > 0){
			eval('i3GEO.tema.TEMPORIZADORESID.'+idtema+' = {tempo: '+tempo+',idtemporizador: setInterval(function('+idtema+'){if(!$i("arrastar_'+idtema+'")){delete(i3GEO.tema.TEMPORIZADORESID.'+idtema+');return;}i3GEO.Interface.atualizaTema("",idtema);},parseInt('+tempo+',10)*1000)};');
		}
		else{
			try{
				window.clearInterval(i3GEO.tema.TEMPORIZADORESID[idtema].idtemporizador);
				delete(i3GEO.tema.TEMPORIZADORESID[idtema]);
			}
			catch(e){}
		}
	},		
	/*
	Classe: i3GEO.tema.dialogo

	Abre as telas de di�logo das op��es de manipula��o de um tema

	Return:

	i3GEO.janela.cria
	*/
	dialogo:{
		/*
		Function: tme

		Abre a ferramenta TME

		Parametros:

		tema - c�digo do tema escolhido
		*/
		tme: function(tema){
			i3GEO.mapa.ativaTema(tema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tme()","tme","tme");
		},
		/*
		Function: mostraWms

		Mostra a url que d� acesso ao WMS de um tema

		Parametros:

		tema - c�digo do tema escolhido
		*/
		mostraWms: function(tema){
			i3GEO.janela.mensagemSimples(i3GEO.configura.locaplic+"/ogc.php?tema="+tema,"Endere�o do WMS");
		},
		/*
		Function: comentario

		Abre a janela de di�logo para o usu�rio ver e inserir comentarios em um tema

		Parametros:

		tema - c�digo do tema escolhido
		*/
		comentario: function(tema){
			i3GEO.janela.cria("530px","330px",i3GEO.configura.locaplic+"/ferramentas/comentarios/index.php?tema="+tema+"&g_sid="+i3GEO.configura.sid+"&locaplic="+i3GEO.configura.locaplic,"","","<img src='"+i3GEO.configura.locaplic+"/imagens/player_volta.png' style=cursor:pointer onclick='javascript:history.go(-1)'><span style=position:relative;top:-2px; > Coment�rios de "+tema+" </span><a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=7&idajuda=68' >&nbsp;&nbsp;&nbsp;</a>","comentario"+Math.random());
		},
		/*
		Function: cortina

		Abre a janela de di�logo da ferramenta cortina

		Parametros:

		tema - c�digo do tema escolhido

		*/
		cortina: function(tema){
			i3GEO.mapa.ativaTema(tema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.cortina()","cortina","cortina");
		},
		/*
		Function: abreKml

		Abre a janela de di�logo da ferramenta convertekml

		Parametros:

		tema - c�digo do tema escolhido

		tipo - tipo de kml - kml|kmz , o tipo kmz permite acessar os dados via kml (por meio de um WMS) e via kml vetorial.
		*/
		abreKml: function(tema,tipo){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.tema.dialogo.abreKml()");}
			if(arguments.lenght === 1)
			{tipo = "kml";}
			if(typeof(i3GEOF.converteKml) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/convertekml/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.converteKml.criaJanelaFlutuante('"+tema+"','"+tipo+"')","i3GEOF.converteKml_script");
			}
			else
			{i3GEOF.converteKml.criaJanelaFlutuante(tema,tipo);}
		},
		/*
		Function: salvaMapfile

		Abre a janela de di�logo da ferramenta salvamapfile

		Parametros:

		idtema - c�digo do tema
		*/
		salvaMapfile: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.salvamapfile()","salvamapfile","salvamapfile");
		},
		/*
		Function: graficotema

		Abre a janela de di�logo da ferramenta graficotema

		Parametros:

		idtema - c�digo do tema
		*/
		graficotema: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.graficotema()","graficotema","graficoTema");
		},
		/*
		Function: toponimia

		Abre a janela de di�logo da ferramenta toponimia

		Parametros:

		idtema - c�digo do tema
		*/
		toponimia: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.toponimia()","toponimia","toponimia");
		},
		/*
		Function: filtro

		Abre a janela de di�logo da ferramenta filtro

		Parametros:

		idtema - c�digo do tema
		*/
		filtro: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.filtro()","filtro","filtro");
		},
		/*
		Function: procuraratrib

		Abre a janela de di�logo da ferramenta busca

		Parametros:

		idtema - id que identifica o tema conforme definido no map file
		*/
		procuraratrib: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.procuraratrib()","busca","busca");
		},
		/*
		Function: tabela

		Abre a janela de di�logo da ferramenta tabela

		Parametros:

		idtema - id que identifica o tema conforme definido no map file
		*/
		tabela: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tabela()","tabela","tabela");
		},
		/*
		Function: etiquetas

		Abre a janela de di�logo da ferramenta etiqueta

		Parametros:

		idtema - id que identifica o tema conforme definido no map file
		*/
		etiquetas: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.etiquetas()","etiqueta","etiqueta");
		},
		/*
		Function: editaLegenda

		Abre a janela de di�logo da ferramenta legenda

		Parametros:

		idtema - id que identifica o tema conforme definido no map file
		*/
		editaLegenda: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editaLegenda()","legenda","legenda");
		},
		/*
		Function: download

		Abre a janela de di�logo da ferramenta download

		Parametros:

		idtema - id que identifica o tema no map file.
		*/
		download: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.download()","download","download");
		},
		/*
		Function: sld

		Converte a legenda do tema para o formato SLD (utilizado em requisi��es de Web Services OGC)

		O SLD � mostrado em uma janela sobre o mapa

		Parametros:

		idtema - id que identifica o tema no map file.
		*/
		sld: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.janela.cria("500px","350px",i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=tema2sld&tema="+idtema+"&g_sid="+i3GEO.configura.sid,"","","SLD <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=41' >&nbsp;&nbsp;&nbsp;</a>");
		},
		/*
		Function: aplicarsld

		Fax o upload de um arquivo SLD (xml) e aplica ao tema

		Parametros:

		idtema - id que identifica o tema no map file.
		*/
		aplicarsld: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.aplicarsld()","aplicarsld","aplicarsld");
		},
		/*
		Function: editorsql

		Abre a janela de di�logo da ferramenta editorsql

		Parametros:

		idtema - id que identifica o tema no map file.
		*/
		editorsql: function(idtema){
			i3GEO.mapa.ativaTema(idtema);
			i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editorsql()","editorsql","editorsql");
		}
	}
};
//YAHOO.log("carregou classe tema", "Classes i3geo");