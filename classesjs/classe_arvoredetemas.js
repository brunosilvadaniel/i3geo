/*
Class: i3GEO.arvoreDeTemas

Monta a �rvore com os temas dispon�veis para ser adicionados ao mapa.

Depend�ncias:

pacotes/yui252/build/treeview/treeview-min.js

pacotes/yui252/build/treeview/assets/skins/sam/treeview.css

classesjs/i3geo_util.js

File: i3geo/classesjs/classe_arvodetemas.js

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
i3GEO.arvoreDeTemas = {
	/*
	Property: OPCOESADICIONAIS
	
	Objeto com a defini��o das propriedades que ser�o utilizadas na inclus�o dos �cones adicionais de adi��o de temas e no item de descri��o de cada tema.

	Example:
	
	var obj = {
	
		idonde: "",
		
		incluiArvore: true,
		
		uploaddbf: true,
		
		uploadlocal: true,
		
		downloadbase: true,
		
		conectarwms: true,
		
		conectargeorss: true,
		
		nuvemTags: true,
		
		navegacaoDir: false,
		
		incluibusca: true,

		kml: true,
		
		qrcode: true,
		
		mini: true		
	}
	
	Type:
	{Object}
	*/
	OPCOESADICIONAIS: {
		idonde: "",
		incluiArvore: true,
		uploaddbf: true,
		uploadlocal: true,
		downloadbase: true,
		conectarwms: true,
		conectargeorss: true,
		nuvemTags: true,
		navegacaoDir: false,
		incluibusca: true,
		kml: true,
		qrcode: true,
		mini: true,
		estrelas: true
	},
	/*
	Property: FATORESTRELA
	
	Valor que ser� utilizado para dividir o valor bruto do n�mero de acessos de cada tema.
	
	A divis�o � utilizada para definir quantas estrelas ser�o mostradas na �rvore de op��es adicionais.<b> 

	Type:
	{Numeric}
	*/
	FATORESTRELA: "1",
	/*
	Property: INCLUISISTEMAS
	
	Inclui na �rvore a lista de sistemas adicionais definidos no i3geo?
	
	Type:
	{Boolean}
	*/
	INCLUISISTEMAS: true,
	/*
	Property: FILTRADOWNLOAD
	
	N�o mostra na �rvore os n�s que n�o possuem temas para download
	
	Type:
	{Boolean}
	*/
	FILTRADOWNLOAD: false,
	/*
	Property: FILTRAOGC
	
	N�o mostra na �rvore os n�s que n�o permitem a gera��o de WMS
	
	Type:
	{Boolean}
	*/
	FILTRAOGC: false,

	/*
	Property: ATIVATEMA
	
	Nome da fun��o que ser� inclu�da no evento onclick do elemento checkbox adicionado no in�cio do nome de um tema.
	
	Type:
	{String}
	*/
	ATIVATEMA: "",
	/*
	Property: IDSMENUS
	
	Array com a lista de ids que ser�o considerados na montagem da �rvore. Por default � vazio, o que significa que todos os menus ser�o considerados.
	
	Type:
	{Array}
	*/
	IDSMENUS: new Array(),
	/*
	Property: IDHTML
	
	Armazena o ID do elemento HTML onde a �rvore ser� incluida

	Type:
	{String}
	*/
	IDHTML: null,
	/*
	Property: LOCAPLIC
	
	Endere�o da aplica��o i3geo. Utilizado para definir o caminho para a chamada em AJAX.

	Type:
	{String}
	*/
	LOCAPLIC: null,
	/*
	Property: SID
	
	C�digo da se��o aberta no servidor pelo i3Geo

	Type:
	{String}
	*/
	SID: null,
	/*
	Variable: ARVORE
	
	Objeto com a �rvore criada com YAHOO.widget.TreeView

	Type:
	{YAHOO.widget.TreeView}
	*/
	ARVORE: null,
	/*
	Variable: DRIVES
	
	Objeto JSON com a lista de drives no servidor que podem ser abertos na op��o de navega��o pelos diret�rios
	
	Type:
	{JSON}
	*/
	DRIVES: null,

	/*
	Variable: SISTEMAS
	
	Objeto JSON com a lista de sistemas existentes
	
	Type:
	{JSON}
	*/
	SISTEMAS: null,
	/*
	Variable: MENUS
	
	Armazena o objeto JSON com a lista de menus resultante da fun��o listaMenus
	
	Type:
	{JSON}
	*/
	MENUS: null,
	/*
	Variable: GRUPOS
	
	Armazena o objeto JSON com a �ltima lista de grupos obtida

	Type:
	{JSON}
	*/
	GRUPOS: null,
	/*
	Variable: SUBGRUPOS
	
	Armazena o objeto JSON com a �ltima lista de sub-grupos obtida

	Type:
	{JSON}
	*/
	SUBGRUPOS: null,
	/*
	Variable: TEMAS
	
	Armazena o objeto JSON com a �ltima lista de temas obtida

	Type:
	{JSON}
	*/
	TEMAS: null,
	/*
	Method: listaMenus
	Lista os menus dispon�veis.
	
	Pesquisa no banco de dados administrativo ou na vari�vel de configura��o (veja ms_configura.php) a lista de menus dispon�veis.
	
	O resultado � inclu�do em i3GEO.arvoreDeTemas.MENUS.
	
	A propriedade i3GEO.arvoreDetemas.IDSMENUS pode ser utilizada para filtrar alista de menus que ser� utilizada.

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {String} nome da fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaMenus: function(g_sid,g_locaplic,funcao) {
		var retorno = function(retorno) {
			if(i3GEO.arvoreDeTemas.IDSMENUS.length == 0)
				i3GEO.arvoreDeTemas.MENUS = retorno.data;
			else{
				i3GEO.arvoreDeTemas.MENUS = new Array();
				var c = retorno.data.length;
				var m = i3GEO.arvoreDeTemas.IDSMENUS.length;
				for (var i=0, j=c; i<j; i++){
					for (var k=0, jj=m; k<jj; k++){
						if(retorno.data[i].idmenu == i3GEO.arvoreDeTemas.IDSMENUS[k]) 
						i3GEO.arvoreDeTemas.MENUS.push(retorno.data[i]);
					}
				}
			}
			if(funcao != "")
				eval(funcao+"(retorno)");
		};
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistademenus&g_sid="+g_sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"pegalistademenus",retorno);
	},
	/*
	Method: listaGrupos
	Lista os grupos de um menu.
	
	O resultado � armazenado em i3GEO.arvoreDetemas.GRUPOS 

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaGrupos: function(g_sid,g_locaplic,id_menu,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.GRUPOS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		var listasgrupos = "nao";
		if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD || i3GEO.arvoreDeTemas.FILTRAOGC)
		var listasgrupos = "sim";
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadegrupos&g_sid="+g_sid+"&idmenu="+id_menu+"&listasistemas=nao&listasgrupos="+listasgrupos;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"pegalistadegrupos",retorno);
	},
	/*
	Method: listaSubGrupos
	Lista os sub-grupos de um grupo.
	
	O resultado � armazenado emi3GEO.arvoreDetemas.SUBGRUPOS

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos
	
	id_grupo - {String} Id do grupo que contem os sub-grupos

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaSubGrupos: function(g_sid,g_locaplic,id_menu,id_grupo,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.SUBGRUPOS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadeSubgrupos&g_sid="+g_sid+"&idmenu="+id_menu+"&grupo="+id_grupo;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"pegalistadesubgrupos",retorno);
	},
	/*
	Method: listaTemas
	Lista os temas de um sub-grupo.
	
	O resultado � armazenado em i3GEO.arvoreDeTemas.TEMAS

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos
	
	id_grupo - {String} Id do grupo que contem os sub-grupos
	
	id_subgrupo - {String} Id do sub-grupo que contem os temas

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaTemas: function(g_sid,g_locaplic,id_menu,id_grupo,id_subgrupo,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.TEMAS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadetemas&g_sid="+g_sid+"&idmenu="+id_menu+"&grupo="+id_grupo+"&subgrupo="+id_subgrupo;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"pegalistadetemas",retorno);
	},
	/*
	Method: listaSistemas
	Lista os sistemas especiais de adi��o de temas.
	
	O resultado � armazenado em i3GEO.arvoreDeTemas.SISTEMAS

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaSistemas: function(g_sid,g_locaplic,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.SISTEMAS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegaSistemas&g_sid="+g_sid;
		var cp = new cpaint();
		cp.set_async("true");
		cp.set_response_type("JSON");
		cp.call(p,"pegasistemas",retorno);
	},
	/*
	Method: listaDrives
	Lista os endere�os no servidor dos drives que podem ser abertos pela op��o de navega��o em arquivos no servidor.
	
	Alista de drives deve ser definida emi3geo/ms_configura.php
	
	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaDrives: function(g_sid,g_locaplic,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.DRIVES = retorno.data[0];
			if(funcao != "")
			funcao.call();
		};
		var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=listaDrives";
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"listaDrives",retorno);
	},
	/*
	Method: cria
	Cria a �rvore com os menus dispon�veis.
	
	A �rvore cont�m opcionalmente a op��o de busca, os �cones adicionais e a lista de sistemas.
	
	Ao ser criada, os par�metros utilizados s�o armazenados em vari�veis que podem ser acessadas com
	i3geo.arvoreDeTemas.[ATIVATEMA,OPCOESADICIONAIS,IDHTML,LOCAPLIC,SID]

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	idhtml - {String} Id do elemento onde a �rvore ser� inserida. Se for vazio, ser� utilizado o ID definido em IDHTML
	
	funcaoTema - {String} (opcional) Nome da fun��o que ser� executada quando o usu�rio clicar no checkbox de um tema

	objOpcoes - {Object} (opcional) Objeto com as op��es necess�rias para cria��o dos �cones com as op��es adicionais de adi��o de temas
	*/
	cria: function(g_sid,g_locaplic,idhtml,funcaoTema,objOpcoes) {
		if(this.ARVORE){return;}
		if(idhtml != "")
		{i3GEO.arvoreDeTemas.IDHTML = idhtml;}
		var nargs = arguments.length;
		if(nargs == 4 || nargs == 5){
			i3GEO.arvoreDeTemas.ATIVATEMA = funcaoTema;
		}
		if(nargs == 5)
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS = objOpcoes;}	
		i3GEO.arvoreDeTemas.LOCAPLIC = g_locaplic;
		i3GEO.arvoreDeTemas.SID = g_sid;
		if(i3GEO.arvoreDeTemas.IDHTML == ""){return;}
		this.listaMenus(g_sid,g_locaplic,"i3GEO.arvoreDeTemas.montaArvore");
	},
	/*
	Function: montaArvore
	Monta a �rvore incluindo os n�s do primeiro n�vel. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos grupos.
	*/
	montaArvore: function() {
		var currentIconMode;
		YAHOO.example.treeExample = new function(){
			function changeIconMode(){
				var newVal = parseInt(this.value);
				if (newVal != currentIconMode)
				{currentIconMode = newVal;}
				buildTree();
			}
        	function buildTree(){
				i3GEO.arvoreDeTemas.ARVORE = new YAHOO.widget.TreeView(i3GEO.arvoreDeTemas.IDHTML);
				var root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
				var tempNode = new YAHOO.widget.TextNode('', root, false);
				tempNode.isLeaf = false;
        	}
    		buildTree();
		}();
		var root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
		//op��o de busca de temas
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluibusca == true){
			var insp = "<br><br><table  cellspacing='0' cellpadding='0' ><tr><td style='text-align:left;font-size:10px;'>";
			insp += "<span style='font-size:12px'>&nbsp;"+$trad("a1")+"</span><input class='digitar' type='text' id='i3geo_buscatema' size='15' value=''  /><img  class='tic' title='"+$trad("a1")+"' src='"+$im("branco.gif")+"' onclick='i3GEO.arvoreDeTemas.buscaTema(document.getElementById(\"i3geo_buscatema\").value)' style='cursor:pointer;top:2px;position:relative;' /></p></td></tr></table>&nbsp;";
			var d = {html:insp};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,false);
		}
		//icones com as outras op��es
		var outrasOpcoes = i3GEO.arvoreDeTemas.outrasOpcoesHTML();
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde != "")
		{document.getElementById(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde).innerHTML = outrasOpcoes;}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore == true){
			var d = {html:outrasOpcoes+"&nbsp;<br>"};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
			tempNode.isLeaf = true;
			if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir == true){
				var retorno = function(){
					var conteudo = "&nbsp;"+$trad("a6");;
					var d = {html:conteudo};
					var tempNode = new YAHOO.widget.HTMLNode(d,root, false,true);
					var drives = i3GEO.arvoreDeTemas.DRIVES;
					var iglt = drives.length;
					var ig=0;
					do{
						var d = {html:drives[ig].nome,caminho:drives[ig].caminho};
						var drive = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
						drive.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir, 1);
						ig++;
					}
					while(ig<iglt)
				};
				i3GEO.arvoreDeTemas.listaDrives(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno);
			}
		}
		//
		//adiciona na �rvore a raiz de cada menu
		//
		var dados = i3GEO.arvoreDeTemas.MENUS;
		var c = dados.length;
		for (var i=0, j=c; i<j; i++)
		{
			var desc = dados[i].desc;
			if(!dados[i].nomemenu)
			dados[i].nomemenu = dados[i].idmenu;
			if(dados[i].publicado != "NAO")
			var conteudo = "<b>&nbsp;<span title='"+desc+"'>"+dados[i].nomemenu+"</span>";
			else
			var conteudo = "<b>&nbsp;<span title='nao publicado' style=color:red; >"+dados[i].nomemenu+"</span>";
			var d = {html:conteudo,idmenu:dados[i].idmenu};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
			tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaGrupos, currentIconMode);
			if(dados[i].status == "aberto")
			{tempNode.expand();}
		}
		if(i3GEO.arvoreDeTemas.INCLUISISTEMAS){
			var retorno = function(){
				var conteudo = "<b>Sistemas</b>";
				var d = {html:conteudo};
				var tempNode = new YAHOO.widget.HTMLNode(d,root, false,true);
				var sis = i3GEO.arvoreDeTemas.SISTEMAS;
				var iglt = sis.length;
				var ig=0;
				do{
					var nomeSis = sis[ig].NOME;
					if(sis[ig].PUBLICADO){
						if(sis[ig].PUBLICADO == "NAO" || sis[ig].PUBLICADO == "nao")
						{var nomeSis = "<s>"+sis[ig].NOME+"</s>";}
					}
					var d = {html:nomeSis};
					var sisNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
					var funcoes = sis[ig].FUNCOES;
					var tempf = funcoes.length;
					for (var ig2=0;ig2<tempf;ig2++){
						var executar = funcoes[ig2].ABRIR;
						var w = funcoes[ig2].W;
						var h = funcoes[ig2].H;
						var nomeFunc = "<a href='#' onclick='abreSistema(\""+executar+"\",\""+w+"\",\""+h+"\")'>"+funcoes[ig2].NOME+"</a>";
						var d = {html:nomeFunc};
						var funcNode = new YAHOO.widget.HTMLNode(d, sisNode, false,true);
						funcNode.isLeaf = true;
					}
					ig++;
				}
				while(ig<iglt)
				i3GEO.arvoreDeTemas.ARVORE.draw();
			};
			i3GEO.arvoreDeTemas.listaSistemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno);
		}
		document.getElementById(i3GEO.arvoreDeTemas.IDHTML).style.textAlign="left";
   		if(!i3GEO.arvoreDeTemas.INCLUISISTEMAS)
   		i3GEO.arvoreDeTemas.ARVORE.draw();
	},
	/*
	Function: montaGrupos
	Monta a lista de grupos de um n� principal da �rvore. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos sub-grupos.
	*/
	montaGrupos: function(node){		
		var temp=function(){
			var grupos = i3GEO.arvoreDeTemas.GRUPOS.grupos;
			var c = grupos.length - 3;
			var raiz = grupos[c].temasraiz;
			var nraiz = raiz.length;
			for (i=0;i<nraiz; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && raiz[i].download == "nao")
				{var mostra = false;}				
				if(i3GEO.arvoreDeTemas.FILTRAOGC && raiz[i].ogc == "nao")
				{var mostra = false;}				
				if(mostra){
					var html = i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i]);
					var d = {html:html};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.isLeaf = true;
				}
			}
			for (i=0;i<c; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && grupos[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && grupos[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					var d = {html:grupos[i].nome,idmenu:node.data.idmenu,idgrupo:i};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaSubGrupos, 1);
					tempNode.isLeaf = false;
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,temp);
	},
	/*
	Function: montaSubGrupos
	Monta a lista de sub-grupos de um n� do tipo grupo. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos temas.
	*/
	montaSubGrupos: function(node){		
		var temp=function(){
			var subgrupos = i3GEO.arvoreDeTemas.SUBGRUPOS.subgrupo;
			var c = subgrupos.length;
			var raiz = i3GEO.arvoreDeTemas.SUBGRUPOS.temasgrupo;
			var nraiz = raiz.length;
			
			for (i=0;i<nraiz; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && raiz[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && raiz[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					var html = i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i]);
					var d = {html:html};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.isLeaf = true;
				}
			}
			for (i=0;i<c; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && subgrupos[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && subgrupos[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					var d = {html:subgrupos[i].nome,idmenu:node.data.idmenu,idgrupo:node.data.idgrupo,idsubgrupo:i};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaTemas, 1);
					tempNode.isLeaf = false;
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaSubGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,temp)
	},
	/*
	Function: montaTemas
	Monta a lista de temas de um n�. 
	*/
	montaTemas: function(node){		
		var temp=function(){
			var temas = i3GEO.arvoreDeTemas.TEMAS.temas;
			var c = temas.length;
			var cor = "rgb(51, 102, 102)";
			for (i=0;i<c; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && temas[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && temas[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					htmli = i3GEO.arvoreDeTemas.montaTextoTema(cor,temas[i]);
					var d = {nacessos:temas[i].nacessos,html:htmli,idtema:temas[i].tid,fonte:temas[i].link,ogc:temas[i].ogc};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					//tempNode.nowrap = true;
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.propTemas, 1);
					tempNode.isLeaf = false;
					if(cor == "rgb(51, 102, 102)")
					{var cor = "rgb(47, 70, 50)";}
					else{var cor = "rgb(51, 102, 102)";}
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaTemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,node.data.idsubgrupo,temp)
	},
	montaDir: function(node){
		var montaLista = function(retorno)
		{
			var dirs = retorno.data.diretorios;
			for (ig=0;ig<dirs.length;ig++)
			{
				var conteudo = dirs[ig];
				var d = {html:conteudo,caminho:node.data.caminho+"/"+conteudo};
				var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
				tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir, 1);
			}
			var arquivos = retorno.data.arquivos;
			for (ig=0;ig<arquivos.length;ig++)
			{
				var conteudo = arquivos[ig];
				if(conteudo.search(".tif") > 1 || conteudo.search(".TIF") > 1 || conteudo.search(".shp") > 1 || conteudo.search(".SHP") > 1)
				{
					var conteudo = "<a href='#' title='"+$trad("g2")+"' onclick='incluir(\""+node.data.caminho+"/"+conteudo+"\")' >"+conteudo+"</a>";
					var d = {html:conteudo,caminho:node.data.caminho+"/"+conteudo};
					var nodeSHP = new YAHOO.widget.HTMLNode(d, node, false,true);
					nodeSHP.isLeaf = true;
				}
			}
			node.loadComplete();
		};
		var p = g_locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.arvoreDeTemas.SID+"&funcao=listaArquivos&diretorio="+node.data.caminho;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"listaDrives",montaLista);
	},
	
	/*
	Function: montaTextoTema
	Monta o texto com o t�tulo do tema.
	
	Parameters:
	
	cor - {String} - cor que ser� utilizada no estilo "color"
	
	tema - {Object} - objeto JSON com as propriedades do tema
	
	Return:
	
	{String} - texto formatado
	*/
	montaTextoTema: function(cor,tema){
		var html = "<td style='vertical-align:top;padding-top:5px;'><span ><input style='cursor:pointer;border:solid 0 white;' ";
		if(i3GEO.arvoreDeTemas.ATIVATEMA != "")
		html += "onclick=\""+i3GEO.arvoreDeTemas.ATIVATEMA+"\"";
		else
		html += "onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeTemas.adicionaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicar\",this)'";
		html += " type='checkbox' value='"+tema.tid+"' /></td><td style='padding-top:4px;vertical-align:top;text-align:left;color:"+cor+";padding-left:3px;' >";
		html += tema.nome;
		html += "</td></span>";
		return(html);
	},
	/*
	Function: propTemas
	Monta o n� com informa��es adicionais sobre o tema.
	
	Parameters:
	
	node - {Object} - objeto com o n� que foi clicado
	*/
	propTemas: function(node){		
		var g_locaplic = i3GEO.arvoreDeTemas.LOCAPLIC;
		if(node.data.fonte != "" && node.data.fonte != " "){
			var html = "<a href='"+node.data.fonte+"' target='_blank' >Fonte</a>";
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.mini == true){
			var lkmini = g_locaplic+"/testamapfile.php?map="+node.data.idtema+".map&tipo=mini";
			var lkmini1 = g_locaplic+"/testamapfile.php?map="+node.data.idtema+".map&tipo=grande";
			var html = "<a onmouseover='mostradicasf(this,\"<img src="+lkmini+" />\")' href='"+lkmini1+"' target='blank' >Miniatura</a>";	
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}

		if (node.data.ogc != "nao"){
			if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.kml == true){
				var html = "<a href='#' onclick='abreKml(\""+node.data.idtema+"\")' >Kml</a>";		
				var d = {html:html};
				var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
				tempNode.isLeaf = true;
			}
			var ogc = g_locaplic+"/ogc.php?tema="+node.data.idtema+"&service=wms&request=getcapabilities";
			var html = "<a href='"+ogc+"' target='blank' >WMS - OGC</a>";	
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.qrcode == true){
			var lkgrcode = g_locaplic+"/pacotes/qrcode/php/qr_html.php?d="+g_locaplic+"/mobile/index.php?temasa="+node.data.idtema;
			var lkgrcode1 = g_locaplic+"/pacotes/qrcode/php/qr_img.php?d="+g_locaplic+"/mobile/index.php?temasa="+node.data.idtema;
			var html = "<a onmouseover='mostradicasf(this,\"<img src="+lkgrcode1+" />\")' href='"+lkgrcode+"' target='blank' >Qrcode</a>";	
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.estrelas == true){
			var n = parseInt(node.data.nacessos / (i3GEO.arvoreDeTemas.FATORESTRELA*1));		
			if(n >= 5){var n = 5;}
			if(n > 0)
			var html = "<img src='"+$im("e"+n+".png")+"'/>";
			else
			var html = "<img src='"+$im("e0.png")+"'/>";
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		node.loadComplete();
	},
	/*
	Function: outrasOpcoesHTML
	Constr�i o HTML com as op��es adicionais de inclus�o de temas (upload de shp, etc.).
	
	Return:
	
	{String} - html gerado
	*/
	outrasOpcoesHTML: function(){
		var ins = "<table width='120px' ><tr>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploaddbf == true)
		ins += "<td><img class='uploaddbf' onclick='uploaddbf()' src='"+$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2b")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploadlocal == true)
		ins += "<td><img class='upload' onclick='upload()' src='"+$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.downloadbase == true)
		ins += "<td><img onclick='downloadbase()' class='download' src='"+$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a3")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwms == true)
		ins += "<td><img class='conectarwms' onclick='conectarwms()' src='"+$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a4")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectargeorss == true)
		ins += "<td><img class='conectargeorss' onclick='conectargeorss()' src='"+$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTags == true)
		ins += "<td><img class='nuvemtags' onclick='nuvemTags()' src='"+$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5a")+"'/><td>";
		ins += "</tr></table>";
		return(ins);
	},
	/*
	Function: desativaCheckbox
	Desmarca todos os checkbox dos temas marcados na �rvore.
	
	*/
	desativaCheckbox: function(){
		var o = document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);
		var inputs = o.getElementsByTagName("input");
		var n = inputs.length;
		var i=0;
		do{
			inputs[i].checked = false;
			i++;
		}
		while(i<n)	
	},
	/*
	Method: listaTemasAtivos
	Lista os temas com checkbox marcados.
	
	Return:
	{Array} - array com os c�digos dos temas
	*/
	listaTemasAtivos: function(){
		var o = document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);
		var inputs = o.getElementsByTagName("input");
		var n = inputs.length;
		var i=0;
		var lista = new Array();
		do{
			if(inputs[i].checked == true)
			{lista.push(inputs[i].value);}
			i++;
		}
		while(i<n)
		return (lista);
	},
	/*
	Function: buscaTema
	Procura temas na �rvore de temas (a busca � feita no servidor e n�o na �rvore atual).
	
	Parameter:
	
	palavra {String}
	*/
	buscaTema: function(palavra){
		var procurar = i3GEO.util.removeAcentos(palavra);
		var resultadoProcurar = function(retorno)
		{
			if(!retorno.data)
			{alert("Ocorreu um erro");}
			else{
				var retorno = retorno.data;
				var conta = 0;
				if ((retorno != "erro") && (retorno != undefined)){
					var ig = retorno.length-1;
					if(ig >= 0){
						do{
							var ngSgrupo = retorno[ig].subgrupos;
							var tempn = ngSgrupo.length;
							for (var sg=0;sg<tempn;sg++){
								var nomeSgrupo = ngSgrupo[sg].subgrupo;
								var ngTema = ngSgrupo[sg].temas;
								var tempng = ngTema.length;
								for (var st=0;st<tempng;st++){
									var mostra = true;
									if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && ngTema[st].download == "nao")
									{var mostra = false;}
									if(i3GEO.arvoreDeTemas.FILTRAOGC && ngTema[st].ogc == "nao")
									{var mostra = false;}

									if(mostra){
										var d = i3GEO.arvoreDeTemas.montaTextoTema("gray",ngTema[st]);
										var lk = "";
										if ( ngTema[st].link != " ")
										{var lk = "<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>";}
										d += " ("+nomeSgrupo+") "+lk;
										var tempNode = new YAHOO.widget.HTMLNode(d, nodePalavra, false,true);
										tempNode.isLeaf = true;
									}
									conta++;
								}
							}
						}
						while(ig--)
					}
					else{
						var d = "<span style='color:red'>Nada encontrado<br><br></span>";
						var tempNode = new YAHOO.widget.HTMLNode(d, nodePalavra, false,true);
						tempNode.isLeaf = true;
					}
				}
			}
			nodePalavra.loadComplete();
		};
		//
		//funcao que ser� executada para buscar os temas
		//
		var busca = function(){
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=procurartemas&procurar="+procurar+"&g_sid="+i3GEO.arvoreDeTemas.SID;
			cpObj.call(p,"procurartemas",resultadoProcurar);
		};
		//
		//recolhe todos os n�s e acrescenta um novo
		//
		i3GEO.arvoreDeTemas.ARVORE.collapseAll();
		var root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
		if(!i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados")){
			var d = {html:"Temas encontrados",id:"temasEncontrados"};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
		}
		else
		{var tempNode = i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados");}
		var d = {html:palavra};
		nodePalavra = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
		i3GEO.arvoreDeTemas.ARVORE.draw();
		tempNode.expand();
		nodePalavra.setDynamicLoad(busca, 1);
		nodePalavra.expand();
	},
	adicionaTemas: function(){
		//
		//zera o contador de tempo
		//
		clearTimeout(objmapa.tempo);
		objmapa.tempo = "";
		objmapa.temaAtivo = "";
		//
		//pega os temas ativados na �rvore de menus
		//
		var tsl = i3GEO.arvoreDeTemas.listaTemasAtivos();
		i3GEO.arvoreDeTemas.desativaCheckbox();
		//
		//se forem encontrados temas ativos na �rvore de menus, o mapa � redesenhado com a adi��o de novos temas
		//
		if(tsl.length > 0){
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var temp = function(retorno){
				i3GEO.janela.fechaAguarde("ajaxredesenha");
				if(retorno.data.erro){
					alert(retorno.data.erro);
					return;
				}
				objmapa.atualizaCorpoMapa();					
			};
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=adtema&temas="+(tsl.toString())+"&g_sid="+i3GEO.arvoreDeTemas.SID;
			cpObj.call(p,"adicionaTema",temp);	
		}
	}
};
//
//para efeitos de compatibilidade, as op��es s�o definidas aqui
//
if($i("arvoreAdicionaTema") || $i("outrasOpcoesAdiciona"))
{
	if(!$i("arvoreAdicionaTema"))
	{i3GEO.arvoreDeCamadas.IDHTML = objmapa.guiaMenu+"obj";}
	else
	{i3GEO.arvoreDeCamadas.IDHTML = "arvoreAdicionaTema";}				
}
try {
	if (g_uploaddbf == "nao")
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploaddbf = false;}
}
catch(e){};
try {
	if (g_uploadlocal == "nao")
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploadlocal = false;}
}
catch(e){};
try {
	if (g_downloadbase == "nao")
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.downloadbase = false;}
}
catch(e){};
try {
	if (g_conectarwms == "nao")
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwms = false;}
}
catch(e){};
try {
	if (g_conectargeorss == "nao")
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectargeorss = false;}
}
catch(e){};
try {
	if (g_nuvemTags == "nao")	
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTags = false;}
}
catch(e){};
try {
	if (g_kml == "nao")	
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.kml = false;}
}
catch(e){};
try {
	if (g_qrcode == "nao")	
	{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.qrcode = false;}
}
catch(e){};