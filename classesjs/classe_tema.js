/*
Class:: i3GEO.tema

Fun��es de di�logo e processamento de propriedades de um tema existente no mapa

Em i3GEO.tema.dialogo est�o as fun��es de abertura dos di�logos para altera��o das propriedades do tema,

File: i3geo/classesjs/classe_tema.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
i3GEO.tema = {
	/*
	Function: dialogo
	
	Abre as telas de di�logo das op��es de manipula��o de um tema
	*/
	dialogo:{
		/*
		Function: abreKml

		Abre a janela para mostrar o link de acesso a um tema via kml.

		Parameters:

		tema - c�digo do tema escolhido
		*/
		abreKml: function(tema){
			if(tema == "mapfile"){
				if(objmapa.mapfile == "")
				{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
				i3GEO.janela.cria("450px","250px",i3GEO.configura.locaplic+'/ferramentas/convertekml/index.htm?tema='+objmapa.mapfile,"","","Kml");
			}
			else
			{i3GEO.janela.cria("450px","250px",i3GEO.configura.locaplic+'/ferramentas/convertekml/index.htm?tema='+tema,"","","Kml");}
		},
		/*
		Function: graficotema

		Adiciona gr�ficos automaticamente nos elementos de um tema

		Parameters:

		idtema - c�digo do tema
		*/
		graficotema: function(idtema)
		{i3GEO.janela.cria("350px","340px",i3GEO.configura.locaplic+"/ferramentas/graficotema/index.htm?tema="+idtema,"","","Gr&aacute;fico");},
		/*
		Function: toponimia

		Op��es de topon�mia de um tema.

		Parameters:

		idtema - c�digo do tema
		*/
		toponimia: function(idtema)
		{i3GEO.janela.cria("350px","340px",i3GEO.configura.locaplic+"/ferramentas/toponimia/index.htm?tema="+idtema,"","","Topon&iacute;mia");},
		/*
		Function: filtro

		Op��es de filtragem de um tema.

		Parameters:

		idtema - c�digo do tema
		*/
		filtro: function(idtema)
		{i3GEO.janela.cria("480px","250px",i3GEO.configura.locaplic+"/ferramentas/filtro/index.htm?tema="+idtema,"","","Filtro");},
		/*
		Function: procuraratrib

		Abre a janela com a op��o de procurar elementos baseados nos atributos da tabela do tema

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		procuraratrib: function(idtema)
		{i3GEO.janela.cria("550px","340px",i3GEO.configura.locaplic+"/ferramentas/busca/index.htm?tema="+idtema,"","","Procurar");},
		/*
		Function: tabela

		Abre a tabela com os atributos de um tema.

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		tabela: function(idtema)
		{i3GEO.janela.cria("500px","400px",i3GEO.configura.locaplic+"/ferramentas/tabela/index.htm?tema="+idtema,"","","Tabela");},
		/*
		Function: etiquetas

		Abre a janela de configura��o das etiquetas

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		etiquetas: function(idtema)
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/etiqueta/index.htm?tema="+idtema,"","","Etiquetas");},
		/*
		Function: editaLegenda

		Abre a janela do editor de legenda de um tema

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		editaLegenda: function(idtema)
		{i3GEO.janela.cria("490px","340px",i3GEO.configura.locaplic+"/ferramentas/legenda/index.htm?tema="+idtema,"","","Legenda");},
		/*
		Function: download

		Abre a janela que faz o download de um tema

		Parameters:

		idtema - id ue identifica o tema no map file.
		*/
		download: function(idtema)
		{i3GEO.janela.cria("300px","150px",i3GEO.configura.locaplic+"/ferramentas/download/index.htm?tema="+idtema,"","","Download");}
	},
	/*
	Function: exclui

	Exclui um tema do mapa

	Parameters:

	tema - c�digo do tema
	*/
	exclui: function(tema){
		g_operacao = "excluitema";
		//remove o tema do DOM e seus filhos
		var p = document.getElementById("idx"+tema).parentNode.parentNode.parentNode;
		do
		{p.removeChild(p.childNodes[0]);}
		while (p.childNodes.length > 0);
		p.parentNode.removeChild(p);
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=excluitema&temas="+tema+"&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"excluiTemas",ajaxredesenha);
		objmapa.temaAtivo = "";
	},
	/*
	Function: sobe

	Sobe um tema na ordem de desenho

	Parameters:

	tema - c�digo do tema
	*/
	sobe: function(tema){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=sobetema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"sobeTema",ajaxredesenha);
	},
	/*
	Function: desce

	Desce um tema na ordem de desenho

	Parameters:

	tema - c�digo do tema
	*/
	desce: function(tema){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?&funcao=descetema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"desceTema",ajaxredesenha);
	},
	/*
	Function: zoom

	Zoom para o tema

	Parameters:

	tema - c�digo do tema
	*/
	zoom: function(tema){
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=zoomtema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"zoomTema",ajaxredesenha);
	},
	/*
	Function: limpasel

	Limpa a selecao do tema

	Parameters:

	tema - ID (name) do tema clicado
	*/
	limpasel: function(tema){
		g_operacao = "limpasel";
		i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=limpasel&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"selecaoLimpa",ajaxredesenha);
	},
	/*
	Function: mudatransp

	Muda a transparencia de um tema

	Parameters:

	idtema - c�digo do tema
	*/
	mudatransp: function(idtema){
		g_operacao = "transparencia";
		//o campo input com o valor possui o prefixo 'tr' seguido pelo c�digo do tema
		if ($i("tr"+idtema))
		{var valor = $i("tr"+idtema).value;}
		else
		{alert("Ocorreu um erro");}
		if (valor != ""){
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudatransp&tema="+idtema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"mudaTransparencia",ajaxredesenha);
		}
		else
		{alert("Valor n�o definido.");}
	},
	/*
	Function: mudanome
	
	Muda o nome de um tema

	Parameters:

	idtema - c�digo do tema
	*/
	mudanome: function(idtema){
		g_operacao = "mudanome";
		if($i("nn"+idtema))
		{var valor = $i("nn"+idtema).value;}
		else
		{alert("Ocorreu um erro");}
		if (valor != ""){
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudanome&tema="+idtema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"mudaNome",ajaxredesenha);
		}
		else
		{alert("Nome n�o definido");}
	}
};