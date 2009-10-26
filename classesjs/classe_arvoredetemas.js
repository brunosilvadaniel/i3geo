/*jslint white:false,undef: false, rhino: true, onevar: true, evil: false */

/*
Title: �rvore de temas

Arquivo:

i3geo/classesjs/classe_arvodetemas.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = [];
}
/*
Classe: i3GEO.arvoreDeTemas

Monta a �rvore com os temas dispon�veis para ser adicionados ao mapa.
*/
i3GEO.arvoreDeTemas = {
	/*
	Propriedade: OPCOESADICIONAIS
	
	Objeto com a defini��o das propriedades que ser�o utilizadas na inclus�o dos �cones adicionais de adi��o de temas e no item de descri��o de cada tema.

	Example:
	
	var obj = {
	
		idonde: "",
		
		incluiArvore: true,
		
		uploaddbf: true,
		
		uploadlocal: true,
		
		downloadbase: true,
		
		conectarwms: true,
		
		conectarwmst: true,
		
		conectargeorss: true,
		
		nuvemTags: true,
		
		navegacaoDir: false,
		
		incluibusca: true,

		kml: true,
		
		qrcode: true,
		
		mini: true,
		
		estrelas:true,
		
		refresh: true	
	}
	
	Tipo:
	{Object}
	*/
	OPCOESADICIONAIS: {
		idonde: "",
		incluiArvore: true,
		uploaddbf: true,
		uploadlocal: true,
		downloadbase: true,
		conectarwms: true,
		conectarwmst: true,
		conectargeorss: true,
		nuvemTags: true,
		navegacaoDir: false,
		incluibusca: true,
		kml: true,
		qrcode: true,
		mini: true,
		estrelas: true,
		refresh: true
	},
	/*
	Propriedade: FATORESTRELA
	
	Valor que ser� utilizado para dividir o valor bruto do n�mero de acessos de cada tema.
	
	A divis�o � utilizada para definir quantas estrelas ser�o mostradas na �rvore de op��es adicionais.<b> 

	Tipo:
	{Numeric}
	*/
	FATORESTRELA: "1",
	/*
	Propriedade: INCLUISISTEMAS
	
	Inclui na �rvore a lista de sistemas adicionais definidos no i3geo?
	
	Tipo:
	{Boolean}
	*/
	INCLUISISTEMAS: true,
	/*
	Propriedade: INCLUIWMS
	
	Inclui na �rvore a lista de Web Services WMS?
	
	Tipo:
	{Boolean}
	*/
	INCLUIWMS: true,
	/*
	Propriedade: FILTRADOWNLOAD
	
	N�o mostra na �rvore os n�s que n�o possuem temas para download
	
	Tipo:
	{Boolean}
	*/
	FILTRADOWNLOAD: false,
	/*
	Propriedade: FILTRAOGC
	
	N�o mostra na �rvore os n�s que n�o permitem a gera��o de WMS
	
	Tipo:
	{Boolean}
	*/
	FILTRAOGC: false,

	/*
	Propriedade: ATIVATEMA
	
	Nome da fun��o que ser� inclu�da no evento onclick do elemento checkbox adicionado no in�cio do nome de um tema.
	
	Tipo:
	{String}
	*/
	ATIVATEMA: "",
	/*
	Propriedade: IDSMENUS
	
	Array com a lista de ids que ser�o considerados na montagem da �rvore. Por default � vazio, o que significa que todos os menus ser�o considerados.
	
	Tipo:
	{Array}
	*/
	IDSMENUS: [],
	/*
	Propriedade: RETORNAGUIA
	
	Guia que ser� ativada ap�s uma opera��o de adi��o de temas ter sido conclu�da.
	
	Se for vazia, a guia atual ser� mantida.
	
	A string corresponde ao nome da guia que deve estar definida em i3GEO.guias.CONFIGURA, por exemplo i3GEO.arvoreDeTemas.RETORNAGUIA = "temas"
	
	Tipo:
	{String}
	
	Default: ""
	*/
	RETORNAGUIA: "",
	/*
	Variavel: IDHTML
	
	Armazena o ID do elemento HTML onde a �rvore ser� incluida

	Tipo:
	{String}
	*/
	IDHTML: null,
	/*
	Variavel: LOCAPLIC
	
	Endere�o da aplica��o i3geo. Utilizado para definir o caminho para a chamada em AJAX.

	Tipo:
	{String}
	*/
	LOCAPLIC: null,
	/*
	Variavel: SID
	
	C�digo da se��o aberta no servidor pelo i3Geo

	Tipo:
	{String}
	*/
	SID: null,
	/*
	Variavel: ARVORE
	
	Objeto com a �rvore criada com YAHOO.widget.TreeView

	Tipo:
	{YAHOO.widget.TreeView}
	*/
	ARVORE: null,
	/*
	Variavel: DRIVES
	
	Objeto JSON com a lista de drives no servidor que podem ser abertos na op��o de navega��o pelos diret�rios
	
	Tipo:
	{JSON}
	*/
	DRIVES: null,
	/*
	Variavel: SISTEMAS
	
	Objeto JSON com a lista de sistemas existentes
	
	Tipo:
	{JSON}
	*/
	SISTEMAS: null,
	/*
	Variavel: MENUS
	
	Armazena o objeto JSON com a lista de menus resultante da fun��o listaMenus
	
	Tipo:
	{JSON}
	*/
	MENUS: null,
	/*
	Variavel: GRUPOS
	
	Armazena o objeto JSON com a �ltima lista de grupos obtida

	Tipo:
	{JSON}
	*/
	GRUPOS: null,
	/*
	Variavel: SUBGRUPOS
	
	Armazena o objeto JSON com a �ltima lista de sub-grupos obtida

	Tipo:
	{JSON}
	*/
	SUBGRUPOS: null,
	/*
	Variavel: TEMAS
	
	Armazena o objeto JSON com a �ltima lista de temas obtida

	Tipo:
	{JSON}
	*/
	TEMAS: null,
	/*
	Function: listaWMS
	
	Lista os WMS cadastrados preenchendo o n� OGC-WMS
	*/
	listaWMS: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaWMS()");}
		var monta = function(retorno){
			var node,raiz,nraiz,cor,i,html,tempNode;
			node = i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("idwms","raiz");
			raiz = retorno.data.canais;
			nraiz = raiz.length;
			cor = "rgb(51, 102, 102)";
			for (i=0;i<nraiz; i++){
				html = "<span style='color:"+cor+"' title='"+raiz[i].description+"'> "+raiz[i].title;
				if(raiz[i].nacessos > 0){
					html += " ("+((raiz[i].nacessosok * 100) / (raiz[i].nacessos*1))+"%)</span>";
				}
				else
				{html += " (% de acessos n�o definido)</span>";}
				html += "<hr>";
				tempNode = new YAHOO.widget.HTMLNode(
					{html:html,id_ws:raiz[i].id_ws,url:raiz[i].link,nivel:0},
					node,
					false,
					true
				);
				tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.listaLayersWMS, 1);
				tempNode.enableHighlight = false;
				if(cor == "rgb(51, 102, 102)")
				{cor = "rgb(47, 70, 50)";}
				else{cor = "rgb(51, 102, 102)";}
			}
			node.loadComplete();
		};
		i3GEO.php.listaRSSwsARRAY(monta,"WMS");
	},
	/*
	Function: listaLayersWMS
	
	Lista os layers de um WMS e preenche o n� OGC-WMS
	*/
	listaLayersWMS: function(node){
		//node = no;
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaLayersWMS()");}
		var monta = function(retorno){
			var n,cor,i,cabeca,tempNode,ns,j,tempNodeS;
			n = 0;
			try{n = retorno.data.length;}
			catch(m){node.loadComplete();return;}
			cor = "rgb(51, 102, 102)";
			html = "";
			for(i=0;i<n; i++){
				cabeca = retorno.data[i].nome+" - "+retorno.data[i].titulo;
				if (cabeca != "undefined - undefined"){
					tempNode = new YAHOO.widget.HTMLNode(
						{
							html:"<span style='color:"+cor+"' >"+cabeca,
							url:node.data.url,
							nivel:(node.data.nivel*1 + 1),
							id_ws:"",
							layer:retorno.data[i].nome
						},
						node,
						false,
						true
					);
					tempNode.enableHighlight = false;
					if(!retorno.data[i].estilos)
					{tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.listaLayersWMS, 1);}
					if(retorno.data[i].estilos){
						ns = retorno.data[i].estilos.length;
						for (j=0;j<ns; j++){
							tempNodeS = new YAHOO.widget.HTMLNode(
								{
									html:i3GEO.arvoreDeTemas.montaTextoTemaWMS(
										node.data.url,
										retorno.data[i].nome,
										retorno.data[i].estilos[j].nome,
										retorno.data[i].estilos[j].titulo,
										retorno.data[i].srs.toString(),
										retorno.data[i].formatsinfo.toString(),
										retorno.data[i].version.toString(),
										retorno.data[i].formats.toString(),
										cor
									)
								},
								tempNode,
								false,
								true
							);
							tempNode.isleaf = true;
							tempNodeS.enableHighlight = false;		
						}
					}
					if(cor == "rgb(51, 102, 102)")
					{cor = "rgb(47, 70, 50)";}
					else{cor = "rgb(51, 102, 102)";}		
				}
			}
			node.loadComplete();
		};
		i3GEO.php.listaLayersWMS(monta,node.data.url,(node.data.nivel*1 + 1),node.data.id_ws,node.data.layer);
	},
	/*
	Function: montaTextoTemaWMS
	
	Monta o texto que ser� mostrado ao lado de cada layer de um WMS, permitindo incluir o layer no mapa.
	*/
	montaTextoTemaWMS: function(servico,layer,estilo,titulo,proj,formatoinfo,versao,formatoimg,cor){
		var html,temp,adiciona;
		html = "<td style='vertical-align:top;padding-top:5px;'><span ><input style='cursor:pointer;border:solid 0 white;' ";
		temp = function(){
			i3GEO.janela.fechaAguarde("ajaxredesenha");
			i3GEO.atualiza();
		};
		adiciona = 	"javascript:i3GEO.janela.abreAguarde(\"ajaxredesenha\",\""+$trad("o1")+"\");this.checked=false;i3GEO.php.adicionaTemaWMS("+temp+",";
		adiciona += "\""+servico+"\",";
		adiciona += "\""+layer+"\",";
		adiciona += "\""+estilo+"\",";
		adiciona += "\""+proj+"\",";
		adiciona += "\""+formatoimg+"\",";
		adiciona += "\""+versao+"\",";
		adiciona += "\""+titulo+"\",";
		adiciona += "\"\",";
		adiciona += "\"nao\",";
		adiciona += "\""+formatoinfo+"\")";
		html += "onclick='"+adiciona+"' ";
		html += " type='radio'  /></td><td style='padding-top:4px;vertical-align:top;text-align:left;padding-left:3px;color:"+cor+";' >";
		html += layer+" - "+titulo;
		html += "</td></span>";
		return(html);
	},
	/*
	Function: listaMenus

	Lista os menus dispon�veis.
	
	Pesquisa no banco de dados administrativo ou na vari�vel de configura��o (veja ms_configura.php) a lista de menus dispon�veis.
	
	O resultado � inclu�do em i3GEO.arvoreDeTemas.MENUS.
	
	A propriedade i3GEO.arvoreDetemas.IDSMENUS pode ser utilizada para filtrar alista de menus que ser� utilizada.

	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {String} nome da fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaMenus: function(g_sid,g_locaplic,funcao) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaMenus()");}
		var retorno = function(retorno) {
			var c,m,i,k,jj,j;
			if(i3GEO.arvoreDeTemas.IDSMENUS.length === 0)
			{i3GEO.arvoreDeTemas.MENUS = retorno.data;}
			else{
				i3GEO.arvoreDeTemas.MENUS = [];
				c = retorno.data.length;
				m = i3GEO.arvoreDeTemas.IDSMENUS.length;
				for (i=0, j=c; i<j; i++){
					for (k=0, jj=m; k<jj; k++){
						if(retorno.data[i].idmenu == i3GEO.arvoreDeTemas.IDSMENUS[k]) 
						{i3GEO.arvoreDeTemas.MENUS.push(retorno.data[i]);}
					}
				}
			}
			if(funcao !== "")
			{eval(funcao+"(retorno)");}
		};
		i3GEO.php.pegalistademenus(retorno);
	},
	/*
	Function: listaGrupos
	
	Lista os grupos de um menu.
	
	O resultado � armazenado em i3GEO.arvoreDetemas.GRUPOS 

	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaGrupos: function(g_sid,g_locaplic,id_menu,funcao) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaGrupos()");}
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.GRUPOS = retorno.data;
			if(funcao !== "")
			{funcao.call();}
		};
		if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD || i3GEO.arvoreDeTemas.FILTRAOGC)
		{i3GEO.php.pegalistadegrupos(retorno,id_menu,"sim");}
		else
		{i3GEO.php.pegalistadegrupos(retorno,id_menu,"nao");}
	},
	/*
	Function: listaSubGrupos
	
	Lista os sub-grupos de um grupo.
	
	O resultado � armazenado emi3GEO.arvoreDetemas.SUBGRUPOS

	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos
	
	id_grupo - {String} Id do grupo que contem os sub-grupos

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaSubGrupos: function(g_sid,g_locaplic,id_menu,id_grupo,funcao) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaSubGrupos()");}
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.SUBGRUPOS = retorno.data;
			if(funcao !== "")
			{funcao.call();}
		};
		i3GEO.php.pegalistadeSubgrupos(retorno,id_menu,id_grupo);
	},
	/*
	Function: listaTemas
	
	Lista os temas de um sub-grupo.
	
	O resultado � armazenado em i3GEO.arvoreDeTemas.TEMAS

	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos
	
	id_grupo - {String} Id do grupo que contem os sub-grupos
	
	id_subgrupo - {String} Id do sub-grupo que contem os temas

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaTemas: function(g_sid,g_locaplic,id_menu,id_grupo,id_subgrupo,funcao) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaTemas()");}
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.TEMAS = retorno.data;
			if(funcao !== "")
			{funcao.call();}
		};
		i3GEO.php.pegalistadetemas(retorno,id_menu,id_grupo,id_subgrupo);
	},
	/*
	Function: listaSistemas
	
	Lista os sistemas especiais de adi��o de temas.
	
	O resultado � armazenado em i3GEO.arvoreDeTemas.SISTEMAS

	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaSistemas: function(g_sid,g_locaplic,funcao) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaSistemas()");}
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.SISTEMAS = retorno.data;
			if(funcao !== "")
			{funcao.call();}
		};
		i3GEO.php.pegaSistemas(retorno);
	},
	/*
	Function: listaDrives
	
	Lista os endere�os no servidor dos drives que podem ser abertos pela op��o de navega��o em arquivos no servidor.
	
	Alista de drives deve ser definida emi3geo/ms_configura.php
	
	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaDrives: function(g_sid,g_locaplic,funcao) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaDrives()");}
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.DRIVES = retorno.data[0];
			if(funcao !== "")
			{funcao.call();}
		};
		i3GEO.php.listadrives(retorno);
	},
	/*
	Function: cria
	
	Cria a �rvore com os menus dispon�veis.
	
	A �rvore cont�m opcionalmente a op��o de busca, os �cones adicionais e a lista de sistemas.
	
	Ao ser criada, os par�metros utilizados s�o armazenados em vari�veis que podem ser acessadas com
	i3geo.arvoreDeTemas.[ATIVATEMA,OPCOESADICIONAIS,IDHTML,LOCAPLIC,SID]

	Parametros:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	idhtml - {String} Id do elemento onde a �rvore ser� inserida. Se for vazio, ser� utilizado o ID definido em IDHTML
	
	funcaoTema - {String} (opcional) Nome da fun��o que ser� executada quando o usu�rio clicar no checkbox de um tema

	objOpcoes - {Object} (opcional) Objeto com as op��es necess�rias para cria��o dos �cones com as op��es adicionais de adi��o de temas
	*/
	cria: function(g_sid,g_locaplic,idhtml,funcaoTema,objOpcoes) {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.cria()");}
		if(this.ARVORE){return;}
		if(idhtml !== "")
		{i3GEO.arvoreDeTemas.IDHTML = idhtml;}
		var nargs = arguments.length;
		if(nargs == 4 || nargs == 5){
			i3GEO.arvoreDeTemas.ATIVATEMA = funcaoTema;
		}
		if(nargs == 5)
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS = objOpcoes;}	
		i3GEO.arvoreDeTemas.LOCAPLIC = g_locaplic;
		i3GEO.arvoreDeTemas.SID = g_sid;
		if(i3GEO.arvoreDeTemas.IDHTML === ""){return;}
		this.listaMenus(g_sid,g_locaplic,"i3GEO.arvoreDeTemas.montaArvore");
	},
	/*
	Function: atualiza
	
	Refaz a �rvore atual
	*/
	atualiza: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.atualiza()");}
		this.ARVORE = null;
		this.cria(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,i3GEO.arvoreDeTemas.IDHTML);
	},
	/*
	Function: montaArvore
	
	Monta a �rvore incluindo os n�s do primeiro n�vel. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos grupos.
	*/
	montaArvore: function() {
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.montaArvore()");}
		var newVal,currentIconMode,d,tempNode,retorno,nomeSis,root,insp,outrasOpcoes,dados,c,i,j,conteudo;
		YAHOO.example.treeExample = function(){
			function changeIconMode(){
				newVal = parseInt(this.value,10);
				if (newVal != currentIconMode)
				{currentIconMode = newVal;}
				buildTree();
			}
       		function buildTree(){
				i3GEO.arvoreDeTemas.ARVORE = new YAHOO.widget.TreeView(i3GEO.arvoreDeTemas.IDHTML);
				tempNode = new YAHOO.widget.TextNode('',root,false);
				tempNode.isLeaf = false;
				tempNode.enableHighlight = false;
       		}
   			buildTree();
   		}();
		//op��o de busca de temas
		root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluibusca === true){
			insp = "<br><br><table><tr>";
			insp += "<td><span style='font-size:12px'>&nbsp;"+$trad("a1")+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=31' >&nbsp;&nbsp;&nbsp;</a></span></td>";
			insp += "<td><input onclick='javascript:this.select();' class='digitar' type='text' id='i3geo_buscatema' size='15' value=''  /></td>";
			insp += "<td><img  class='tic' ";
			if(navm){insp += "style='top:0px;'";}
			else
			{insp += "style='top:4px;'";}
			insp += " title='"+$trad("a1")+"' src='"+i3GEO.util.$im("branco.gif")+"' onclick='i3GEO.arvoreDeTemas.buscaTema(document.getElementById(\"i3geo_buscatema\").value)' style='cursor:pointer;top:2px;position:relative;' /></td>";
			insp += "</tr></table>&nbsp;";
			tempNode = new YAHOO.widget.HTMLNode(
				{html:insp},
				root,
				false,
				false
			);
			tempNode.enableHighlight = false;
		}
		//icones com as outras op��es
		//conforme definido em i3GEO.arvoreDeTemas.OPCOESADICIONAIS
		outrasOpcoes = i3GEO.arvoreDeTemas.outrasOpcoesHTML();
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde !== "")
		{document.getElementById(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde).innerHTML = outrasOpcoes;}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore === true){
			tempNode = new YAHOO.widget.HTMLNode(
				{html:outrasOpcoes+"&nbsp;<br>"},
				root,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.isLeaf = true;
			if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir === true){
				retorno = function(){
					var drives,iglt,ig,drive;
					tempNode = new YAHOO.widget.HTMLNode(
						{
							html:"&nbsp;"+$trad("a6")+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=32' >&nbsp;&nbsp;&nbsp;</a>"
						},
						root,
						false,
						true
					);
					tempNode.enableHighlight = false;
					drives = i3GEO.arvoreDeTemas.DRIVES;
					iglt = drives.length;
					ig=0;
					do{
						drive = new YAHOO.widget.HTMLNode(
							{html:drives[ig].nome,caminho:drives[ig].caminho},
							tempNode,
							false,
							true
						);
						drive.enableHighlight = false;
						drive.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir, 1);
						ig++;
					}
					while(ig<iglt);
				};
				i3GEO.arvoreDeTemas.listaDrives(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno);
			}
		}
		//
		//op��es para abrir o sistema de administra��o
		//
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir === true){
			tempNode = new YAHOO.widget.HTMLNode(
				{
					html:"<a href='../admin' target=blank >Sistema de administra��o</a>",
					idmenu:""
				},
				root,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode = new YAHOO.widget.HTMLNode(
				{
					html:"<a href='../admin/html/arvore.html' target=blank >Editor de menus</a>",
					idmenu:""
				},
				root,
				false,
				true
			);
			tempNode.enableHighlight = false;
		}
		//
		//wms
		//
		if(i3GEO.arvoreDeTemas.INCLUIWMS === true){
			tempNode = new YAHOO.widget.HTMLNode(
				{
					html:"<b>&nbsp;OGC-WMS</b>"+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=33' >&nbsp;&nbsp;&nbsp;</a>",
					idwms:"raiz"
				},
				root,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.listaWMS, 1);
		}
		//
		//adiciona na �rvore a raiz de cada menu
		//
		dados = i3GEO.arvoreDeTemas.MENUS;
		c = dados.length;
		for (i=0, j=c; i<j; i++)
		{
			if(!dados[i].nomemenu)
			{dados[i].nomemenu = dados[i].idmenu;}
			if(!dados[i].publicado){dados[i].publicado = "sim";}
			if(dados[i].publicado.toLowerCase() != "nao")
			{conteudo = "<b>&nbsp;<span title='"+(dados[i].desc)+"'>"+dados[i].nomemenu+"</span>";}
			else
			{conteudo = "<b>&nbsp;<span title='nao publicado' style=color:red; >"+dados[i].nomemenu+"</span>";}
			tempNode = new YAHOO.widget.HTMLNode(
				{html:conteudo,idmenu:dados[i].idmenu},
				root,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaGrupos, currentIconMode);
			if(dados[i].status == "aberto")
			{tempNode.expand();}
		}
		if(i3GEO.arvoreDeTemas.INCLUISISTEMAS){
			retorno = function(){
				var sis,iglt,tempNode,ig,nomeSis,sisNode,funcoes,tempf,ig2,abre,nomeFunc,funcNode;
				try{
					sis = i3GEO.arvoreDeTemas.SISTEMAS;
					iglt = sis.length;
					tempNode = new YAHOO.widget.HTMLNode(
						{
							html:"<b>Sistemas</b>"+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=34' >&nbsp;&nbsp;&nbsp;</a>"
						},
						root,
						false,
						true
					);
					tempNode.enableHighlight = false;
				}catch(e){i3GEO.arvoreDeTemas.ARVORE.draw();return;}
				ig=0;
				do{
					nomeSis = sis[ig].NOME;
					if(sis[ig].PUBLICADO){
						if(sis[ig].PUBLICADO == "NAO" || sis[ig].PUBLICADO == "nao")
						{nomeSis = "<s>"+sis[ig].NOME+"</s>";}
					}
					sisNode = new YAHOO.widget.HTMLNode(
						{html:nomeSis},
						tempNode,
						false,
						true
					);
					sisNode.enableHighlight = false;
					funcoes = sis[ig].FUNCOES;
					tempf = funcoes.length;
					for (ig2=0;ig2<tempf;ig2++){
						abre = "i3GEO.janela.cria('"+(funcoes[ig2].W)+"px','"+(funcoes[ig2].H)+"px','"+(funcoes[ig2].ABRIR)+"','','','Sistemas')";
						nomeFunc = "<a href='#' onclick=\""+abre+"\">"+funcoes[ig2].NOME+"</a>";
						funcNode = new YAHOO.widget.HTMLNode(
							{html:nomeFunc},
							sisNode,
							false,
							true
						);
						funcNode.enableHighlight = false;
						funcNode.isLeaf = true;
					}
					ig++;
				}
				while(ig<iglt);
				i3GEO.arvoreDeTemas.ARVORE.draw();
			};
			i3GEO.arvoreDeTemas.listaSistemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno);
		}
		document.getElementById(i3GEO.arvoreDeTemas.IDHTML).style.textAlign="left";
   		if(!i3GEO.arvoreDeTemas.INCLUISISTEMAS)
   		{i3GEO.arvoreDeTemas.ARVORE.draw();}
	},
	/*
	Function: montaGrupos
	
	Monta a lista de grupos de um n� principal da �rvore. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos sub-grupos.
	*/
	montaGrupos: function(node){		
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.montaGrupos()");}
		var temp=function(){
			var grupos,c,raiz,nraiz,mostra,html,i,d;
			grupos = i3GEO.arvoreDeTemas.GRUPOS.grupos;
			c = grupos.length - 3;
			raiz = grupos[c].temasraiz;
			nraiz = raiz.length;
			for (i=0;i<nraiz; i++){
				mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && raiz[i].download == "nao")
				{mostra = false;}				
				if(i3GEO.arvoreDeTemas.FILTRAOGC && raiz[i].ogc == "nao")
				{mostra = false;}				
				if(mostra){
					tempNode = new YAHOO.widget.HTMLNode(
						{html:i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i])},
						node,
						false,
						true
					);
					tempNode.enableHighlight = false;
					tempNode.isLeaf = true;
				}
			}
			for (i=0;i<c; i++){
				mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && grupos[i].download == "nao")
				{mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && grupos[i].ogc == "nao")
				{mostra = false;}
				if(mostra){
					//se id_n1 existir, significa que os grupos possuem id, pois s�o oriundos do sistema
					//de administra��o
					//no caso do uso de menu de temas com base em arquivos xml, o id n�o existe
					//sendo necess�rio o uso da ordem dos grupos como identificador
					if(grupos[i].publicado){
						if(grupos[i].publicado == "NAO"){
							grupos[i].nome = "<span title='nao publicado' style=color:red; >"+grupos[i].nome+"</span>";
						}
					}
					d = {html:grupos[i].nome,idmenu:node.data.idmenu,idgrupo:i};
					if(grupos[i].id_n1)
					{d = {html:grupos[i].nome,idmenu:node.data.idmenu,idgrupo:grupos[i].id_n1};}
					tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.enableHighlight = false;
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
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.montaSubGrupos()");}
		var temp=function(){
			var i,c,mostra,d,html,tempNode,nraiz,subgrupos,raiz;
			subgrupos = i3GEO.arvoreDeTemas.SUBGRUPOS.subgrupo;
			c = subgrupos.length;
			raiz = i3GEO.arvoreDeTemas.SUBGRUPOS.temasgrupo;
			nraiz = raiz.length;
			for (i=0;i<nraiz; i++){
				mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && raiz[i].download == "nao")
				{mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && raiz[i].ogc == "nao")
				{mostra = false;}
				if(mostra){
					tempNode = new YAHOO.widget.HTMLNode(
						{html:i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i])},
						node,
						false,
						true
					);
					tempNode.enableHighlight = false;
					tempNode.isLeaf = true;
				}
			}
			for (i=0;i<c; i++){
				mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && subgrupos[i].download == "nao")
				{mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && subgrupos[i].ogc == "nao")
				{mostra = false;}

				if(mostra){
					//se id_n2 existir, significa que os grupos possuem id, pois s�o oriundos do sistema
					//de administra��o
					//no caso do uso de menu de temas com base em arquivos xml, o id n�o existe
					//sendo necess�rio o uso da ordem dos grupos como identificador
					if(subgrupos[i].publicado){
						if(subgrupos[i].publicado == "NAO"){
							subgrupos[i].nome = "<span title='nao publicado' style=color:red; >"+subgrupos[i].nome+"</span>";
						}
					}	
					d = {html:subgrupos[i].nome,idmenu:node.data.idmenu,idgrupo:node.data.idgrupo,idsubgrupo:i};
					if(subgrupos[i].id_n2)
					{d = {html:subgrupos[i].nome,idmenu:node.data.idmenu,idgrupo:node.data.idgrupo,idsubgrupo:subgrupos[i].id_n2};}
					tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaTemas, 1);
					tempNode.isLeaf = false;
					tempNode.enableHighlight = false;
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaSubGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,temp);
	},
	/*
	Function: montaTemas
	
	Monta a lista de temas de um n�. 
	*/
	montaTemas: function(node){		
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.montaTemas()");}
		var temp=function(){
			var i,cor,temas,c,mostra,tempNode;
			temas = i3GEO.arvoreDeTemas.TEMAS.temas;
			c = temas.length;
			cor = "rgb(51, 102, 102)";
			for (i=0;i<c; i++){
				mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && temas[i].download == "nao")
				{mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && temas[i].ogc == "nao")
				{mostra = false;}
				if(mostra){
					if(temas[i].publicado){
						if(temas[i].publicado == "NAO"){
							temas[i].nome = "<span title='nao publicado' style=color:red; >"+temas[i].nome+"</span>";
						}
					}
					tempNode = new YAHOO.widget.HTMLNode(
						{
							nacessos:temas[i].nacessos,
							html:i3GEO.arvoreDeTemas.montaTextoTema(cor,temas[i]),
							idtema:temas[i].tid,
							fonte:temas[i].link,
							ogc:temas[i].ogc,
							kmz:temas[i].kmz
						},
						node,
						false,
						true
					);
					//tempNode.nowrap = true;
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.propTemas, 1);
					tempNode.isLeaf = false;
					tempNode.enableHighlight = false;
					if(cor == "rgb(51, 102, 102)")
					{cor = "rgb(47, 70, 50)";}
					else{cor = "rgb(51, 102, 102)";}
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaTemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,node.data.idsubgrupo,temp);
	},
	/*
	Function: montaDir
	
	Inclu� na �rvore o navegador de diret�rios
	
	Parametro:
	
	node {node} - n� onde ser� criada a lista 
	*/
	montaDir: function(node){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.montaDir()");}
		var montaLista = function(retorno)
		{
			var ig,d,conteudo,dirs,tempNode,arquivos,nodeSHP;
			dirs = retorno.data.diretorios;
			for (ig=0;ig<dirs.length;ig++)
			{
				tempNode = new YAHOO.widget.HTMLNode(
					{
						html:dirs[ig],
						caminho:node.data.caminho+"/"+conteudo
					},
					node,
					false,
					true
				);
				tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir, 1);
				tempNode.enableHighlight = false;
			}
			arquivos = retorno.data.arquivos;
			for (ig=0;ig<arquivos.length;ig++)
			{
				conteudo = arquivos[ig];
				if(conteudo.search(".img") > 1 || conteudo.search(".tif") > 1 || conteudo.search(".TIF") > 1 || conteudo.search(".shp") > 1 || conteudo.search(".SHP") > 1)
				{
					conteudo = "<a href='#' title='"+$trad("g2")+"' onclick='i3GEO.util.adicionaSHP(\""+node.data.caminho+"/"+conteudo+"\")' >"+conteudo+"</a>";
					nodeSHP = new YAHOO.widget.HTMLNode(
						{html:conteudo,caminho:node.data.caminho+"/"+conteudo},
						node,
						false,
						true
					);
					nodeSHP.enableHighlight = false;
					nodeSHP.isLeaf = true;
				}
			}
			node.loadComplete();
		};
		i3GEO.php.listaarquivos(montaLista,node.data.caminho);
	},
	/*
	Function: montaTextoTema
	
	Monta o texto com o t�tulo do tema.
	
	Parametros:
	
	cor - {String} - cor que ser� utilizada no estilo "color"
	
	tema - {Object} - objeto JSON com as propriedades do tema
	
	Return:
	
	{String} - texto formatado
	*/
	montaTextoTema: function(cor,tema){
		var html = "<td style='vertical-align:top;padding-top:5px;'><span ><input style='cursor:pointer;border:solid 0 white;' ";
		if(i3GEO.arvoreDeTemas.ATIVATEMA !== "")
		{html += "onclick=\""+i3GEO.arvoreDeTemas.ATIVATEMA+"\"";}
		else
		{html += "onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeTemas.adicionaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicar\",this)'";}
		html += " type='checkbox' value='"+tema.tid+"' /></td><td style='padding-top:4px;vertical-align:top;text-align:left;color:"+cor+";padding-left:3px;' >";
		html += tema.nome;
		html += "</td></span>";
		return(html);
	},
	/*
	Function: propTemas
	
	Monta o n� com informa��es adicionais sobre o tema.
	
	Parametro:
	
	node - {Object} - objeto com o n� que foi clicado
	*/
	propTemas: function(node){		
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.propTemas()");}
		var d,tempNode,html,lkmini,lkmini1,lkgrcode,lkgrcode1,n,ogc;
		if(node.data.fonte !== "" && node.data.fonte != " "){
			tempNode = new YAHOO.widget.HTMLNode(
				{html:"<a title='' href='"+node.data.fonte+"' target='_blank' >Fonte</a>"},
				node,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.mini === true){
			lkmini = i3GEO.arvoreDeTemas.LOCAPLIC+"/testamapfile.php?map="+node.data.idtema+".map&tipo=mini";
			lkmini1 = i3GEO.arvoreDeTemas.LOCAPLIC+"/testamapfile.php?map="+node.data.idtema+".map&tipo=grande";
			tempNode = new YAHOO.widget.HTMLNode(
				{html:"<a title='' onmouseover='i3GEO.ajuda.mostraJanela(\"<img src="+lkmini+" />\")' href='"+lkmini1+"' target='blank' >Miniatura</a>"},
				node,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.isLeaf = true;
		}
		if (node.data.ogc != "nao"){
			if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.kml === true){
				html = "<a href='#' title='' onclick='i3GEO.tema.dialogo.abreKml(\""+node.data.idtema+"\",\"kml\")' >Kml</a>";		
				if (node.data.kmz == "sim")
				{html = "<a href='#' title='' onclick='i3GEO.tema.dialogo.abreKml(\""+node.data.idtema+"\",\"kmz\")' >Kml</a>";}		
				tempNode = new YAHOO.widget.HTMLNode(
					{html:html},
					node,
					false,
					true
				);
				tempNode.enableHighlight = false;
				tempNode.isLeaf = true;
			}
			ogc = i3GEO.arvoreDeTemas.LOCAPLIC+"/ogc.php?tema="+node.data.idtema+"&service=wms&request=getcapabilities";	
			tempNode = new YAHOO.widget.HTMLNode(
				{html:"<a title='' href='"+ogc+"' target='blank' >WMS - OGC</a>"},
				node,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.qrcode === true){
			lkgrcode = i3GEO.arvoreDeTemas.LOCAPLIC+"/pacotes/qrcode/php/qr_html.php?d="+i3GEO.arvoreDeTemas.LOCAPLIC+"/mobile/index.php?temasa="+node.data.idtema;
			lkgrcode1 = i3GEO.arvoreDeTemas.LOCAPLIC+"/pacotes/qrcode/php/qr_img.php?d="+i3GEO.arvoreDeTemas.LOCAPLIC+"/mobile/index.php?temasa="+node.data.idtema;
			tempNode = new YAHOO.widget.HTMLNode(
				{html:"<a title='' onmouseover='i3GEO.ajuda.mostraJanela(\"<img src="+lkgrcode1+" />\")' href='"+lkgrcode+"' target='blank' >Qrcode</a>"},
				node,
				false,
				true
			);
			tempNode.enableHighlight = false;
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.estrelas === true){
			n = parseInt(node.data.nacessos / (i3GEO.arvoreDeTemas.FATORESTRELA*1),10);		
			if(n >= 5){n = 5;}
			if(n > 0)
			{html = "<img src='"+i3GEO.util.$im("e"+n+".png")+"'/>";}
			else
			{html = "<img src='"+i3GEO.util.$im("e0.png")+"'/>";}
			tempNode = new YAHOO.widget.HTMLNode({html:html}, node, false,true);
			tempNode.enableHighlight = false;
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
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.outrasOpcoesHTML()");}
		var ins = "",t = 0;
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.refresh === true){
			ins += "<td><img class='refresh' onclick='i3GEO.arvoreDeTemas.atualiza()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='Refresh'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploaddbf === true){
			ins += "<td><img class='uploaddbf' onclick='i3GEO.arvoreDeTemas.dialogo.uploaddbf()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2b")+"'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploadlocal === true){
			ins += "<td><img class='upload' onclick='i3GEO.arvoreDeTemas.dialogo.upload()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2")+"'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.downloadbase === true){
			ins += "<td><img onclick='i3GEO.arvoreDeTemas.dialogo.downloadbase()' class='download' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a3")+"'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwms === true){
			ins += "<td><img class='conectarwms' onclick='i3GEO.arvoreDeTemas.dialogo.conectarwms()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a4")+"'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwmst === true){
			ins += "<td><img class='conectarwmst' onclick='i3GEO.arvoreDeTemas.dialogo.conectarwmst()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a4b")+"'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectargeorss === true){
			ins += "<td><img class='conectargeorss' onclick='i3GEO.arvoreDeTemas.dialogo.conectargeorss()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5")+"'/><td>";
			t += 20;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTags === true){
			ins += "<td><img class='nuvemtags' onclick='i3GEO.arvoreDeTemas.dialogo.nuvemTags()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5a")+"'/><td>";
			t += 20;
		}
		return("<table width='"+t+"px' ><tr>"+ins+"</tr></table>");
	},
	/*
	Function: desativaCheckbox
	
	Desmarca todos os checkbox dos temas marcados na �rvore.
	*/
	desativaCheckbox: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.desativaCheckbox()");}
		var o,inputs,n,i;
		o = document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);
		inputs = o.getElementsByTagName("input");
		n = inputs.length;
		i=0;
		do{
			inputs[i].checked = false;
			i++;
		}
		while(i<n);
	},
	/*
	Function: listaTemasAtivos
	
	Lista os temas com checkbox marcados.
	
	Return:
	{Array} - array com os c�digos dos temas
	*/
	listaTemasAtivos: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.listaTemasAtivos()");}
		var o,inputs,n,i,lista;
		o = document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);
		inputs = o.getElementsByTagName("input");
		n = inputs.length;
		i=0;
		lista = [];
		do{
			if(inputs[i].checked === true)
			{lista.push(inputs[i].value);}
			i++;
		}
		while(i<n);
		return (lista);
	},
	/*
	Function: buscaTema
	
	Procura temas na �rvore de temas (a busca � feita no servidor e n�o na �rvore atual).
	
	Parametro:
	
	palavra {String}
	*/
	buscaTema: function(palavra){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.buscaTema()");}
		var busca,root,nodePalavra;
		resultadoProcurar = function(retorno)
		{
			var mostra,tempNode,d,conta,ig,ngSgrupo,tempn,sg,ngTema,tempng,st,lk;
			if(!retorno.data)
			{alert("Ocorreu um erro");}
			else{
				retorno = retorno.data;
				conta = 0;
				if ((retorno != "erro") && (retorno !== undefined)){
					ig = retorno.length-1;
					if(ig >= 0){
						do{
							ngSgrupo = retorno[ig].subgrupos;
							tempn = ngSgrupo.length;
							for (sg=0;sg<tempn;sg++){
								ngTema = ngSgrupo[sg].temas;
								tempng = ngTema.length;
								for (st=0;st<tempng;st++){
									mostra = true;
									if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && ngTema[st].download == "nao")
									{mostra = false;}
									if(i3GEO.arvoreDeTemas.FILTRAOGC && ngTema[st].ogc == "nao")
									{mostra = false;}

									if(mostra){
										d = i3GEO.arvoreDeTemas.montaTextoTema("gray",ngTema[st]);
										if ( ngTema[st].link != " ")
										{lk = "<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>";}
										d += "<td style='text-allign:left'> ("+(ngSgrupo[sg].subgrupo)+") "+lk+"</td>";
										tempNode = new YAHOO.widget.HTMLNode(d, nodePalavra, false,true);
										tempNode.isLeaf = true;
										tempNode.enableHighlight = false;
									}
									conta++;
								}
							}
						}
						while(ig--);
					}
					else{
						d = "<span style='color:red'>Nada encontrado<br><br></span>";
						tempNode = new YAHOO.widget.HTMLNode(d, nodePalavra, false,true);
						tempNode.isLeaf = true;
						tempNode.enableHighlight = false;
					}
				}
			}
			nodePalavra.loadComplete();
		};
		//
		//funcao que ser� executada para buscar os temas
		//
		busca = function(){
			i3GEO.php.procurartemas(resultadoProcurar,i3GEO.util.removeAcentos(palavra));
		};
		//
		//recolhe todos os n�s e acrescenta um novo
		//
		i3GEO.arvoreDeTemas.ARVORE.collapseAll();
		root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
		if(!i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados")){
			tempNode = new YAHOO.widget.HTMLNode(
				{html:"Temas encontrados",id:"temasEncontrados"},
				root,
				false,
				true
			);
			tempNode.enableHighlight = false;
		}
		else
		{tempNode = i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados");}
		nodePalavra = new YAHOO.widget.HTMLNode({html:palavra}, tempNode, false,true);
		nodePalavra.enableHighlight = false;
		i3GEO.arvoreDeTemas.ARVORE.draw();
		tempNode.expand();
		nodePalavra.setDynamicLoad(busca, 1);
		nodePalavra.expand();
	},
	/*
	Function: adicionaTemas
	
	Adiciona ao mapa os temas selecionados na �rvore
	*/
	adicionaTemas: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.adicionaTemas()");}
		var tsl,temp;
		//
		//zera o contador de tempo
		//
		clearTimeout(tempoBotaoAplicar);
		tempoBotaoAplicar = "";
		i3GEO.temaAtivo = "";
		//
		//pega os temas ativados na �rvore de menus
		//
		tsl = i3GEO.arvoreDeTemas.listaTemasAtivos();
		i3GEO.arvoreDeTemas.desativaCheckbox();
		//
		//se forem encontrados temas ativos na �rvore de menus, o mapa � redesenhado com a adi��o de novos temas
		//
		if(tsl.length > 0){
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			temp = function(retorno){
				i3GEO.janela.fechaAguarde("i3GEO.atualiza");
				if(retorno.data.erro){
					alert(retorno.data.erro);
					return;
				}
				i3GEO.atualiza();
				//
				//verifica se deve ser ativada uma outra guia que n�o a atual
				//
				if(i3GEO.arvoreDeTemas.RETORNAGUIA !== ""){
					if(i3GEO.arvoreDeTemas.RETORNAGUIA != i3GEO.guias.ATUAL){
						i3GEO.guias.mostra(i3GEO.arvoreDeTemas.RETORNAGUIA);
					}
				}
				//
				//verifica se a janela a ferramenta identifica est� ativa para atualizar a lista de temas
				//
				try{
					if($i("i3GEOidentificalistaTemas")){
						i3GEOF.identifica.listaTemas();
						g_tipoacao = "identifica";
					}
				}
				catch(r){
					if(typeof(console) !== 'undefined'){console.error(r);}
				}
			};
			i3GEO.php.adtema(temp,tsl.toString());
		}
	},
	/*
	Function: comboMenus

	Busca a lista de menus existentes no i3geo e monta um combo com o resultado.

	Ao escolher uma op��o do combo, a fun��o de retorno receber� como par�metro o id do menu.

	Parametros:

	locaplic {String} - endere�o do i3geo
	
	funcaoOnchange {String} - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino {String} - id do elemento HTML que receber� o combo

	idCombo {String} - id do combo que ser� criado

	largura {Numeric} - largura em pixels do combo

	altura {Numeric} - altura do combo em linhas
	*/
	comboMenus: function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.comboMenus()");}
		i3GEO.configura.locaplic = locaplic;
		var combo = function (retorno){
			var ob,ins,ig;
			ob = retorno.data;
			ins = "<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um menu:</option>";
			for (ig=0;ig<ob.length; ig++){
				if(ob[ig].publicado != "nao" && ob[ig].publicado != "NAO"){
					if(ob[ig].nomemenu)
					{ins += "<option value="+ob[ig].idmenu+" >"+ob[ig].nomemenu+"</option>";}
				}
			}
			$i(idDestino).innerHTML = ins+"</select>";
		};
		i3GEO.php.pegalistademenus(combo);
	},
	/*
	Function: comboGruposMenu

	Busca a lista de grupos existentes no menu de temas do i3geo e monta um combo com o resultado.

	Ao escolher uma op��o do combo, a fun��o de retorno receber� como par�metro o id do grupo.

	Parametros:

	locaplic {String} - endere�o do i3geo
	
	funcaoOnchange {String} - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino {String} - id do elemento HTML que receber� o combo

	idCombo {String} - id do combo que ser� criado

	largura {Numeric} - largura em pixels do combo

	altura {Numeric} - altura do combo em linhas
	
	id_menu {Numeric} - id do menu que ser� utilizado para obter os dados
	*/
	comboGruposMenu: function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura,id_menu){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.comboGruposMenu()");}
		i3GEO.configura.locaplic = locaplic;
		var combo = function (retorno){
			var obGrupos,ins,ig;
			obGrupos = retorno.data;
			ins = "<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um grupo:</option>";
			for (ig=0;ig<obGrupos.grupos.length; ig++){
				if(obGrupos.grupos[ig].nome)
				{ins += "<option value="+obGrupos.grupos[ig].id_n1+" >"+obGrupos.grupos[ig].nome+"</option>";}
			}
			$i(idDestino).innerHTML = ins+"</select>";
		};
		i3GEO.php.pegalistadegrupos(combo,id_menu,"nao");
	},
	/*
	Function: comboSubGruposMenu
	
	Monta um combo com a lista de subgrupos de um grupo do menu de temas do i3geo.

	Ao escolher um subgrupo, a fun��o de retorno receber� o id do grupo e o id do subgrupo.

	Parametros:

	locaplic {String} - endere�o do i3geo

	funcaoOnchange {String} - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino {String} - id do elemento HTML que receber� o combo

	idCombo {String} - id do combo que ser� criado

	idGrupo {String} - identificador do grupo que ser� pesquisado

	largura {Numeric} - largura em pixels do combo

	altura {Numeric} - altura do combo em linhas
	*/
	comboSubGruposMenu: function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,largura,altura){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.comboSubGruposMenu()");}
		if(idGrupo !== ""){
			var combo = function(retorno){
				var ins,sg,ig;
				ins = "<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+",this.value)' ><option value='' >Escolha um sub-grupo:</option>";
				if (retorno.data.subgrupo){
					sg = retorno.data.subgrupo;
					for (ig=0;ig<sg.length; ig++){	
						ins += "<option value="+sg[ig].id_n2+" >"+sg[ig].nome+"</option>";
					}
				}
				$i(idDestino).innerHTML = ins+"</select>";
			};
			i3GEO.php.pegalistadeSubgrupos(combo,"",idGrupo);
		}
	},
	/*
	Function: comboTemasMenu

	Monta um combo com a lista de subgrupos de um grupo do menu de temas do i3geo.

	Ao escolher um subgrupo, a fun��o de retorno receber� o id do grupo e o id do subgrupo.

	Parametros:

	locaplic {String} - endere�o do i3geo

	funcaoOnchange - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino - id do elemento HTML que receber� o combo

	idCombo - id do combo que ser� criado

	idGrupo - identificador do grupo que ser� pesquisado

	idSubGrupo - id do subgrupo

	largura - largura em pixels do combo

	altura - altura do combo em linhas
	
	id_menu - id do menu escolhido
	*/
	comboTemasMenu: function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,idSubGrupo,largura,altura,id_menu){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeTemas.comboTemasMenu()");}
		var combo = function(retorno){
			var ins,sg,ig;
			ins = "<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+","+idSubGrupo+",this.value)' ><option value='' >Escolha um tema:</option>";
			if (retorno.data.temas[i]){
				sg = retorno.data.temas;
				for (ig=0;ig<sg.length; ig++){	
					ins += "<option value="+sg[ig].tid+" >"+sg[ig].nome+"</option>";
				}
			}
			$i(idDestino).innerHTML = ins+"</select>";
		};
		i3GEO.php.pegalistadetemas(combo,id_menu,idGrupo,idSubGrupo);
	},
	/*
	Classe: dialogo
	
	Abre as janelas de di�logo com as op��es adicionais que permitem acrescentar temas ao mapa
	
	Por exemplo, para abrir a janela de upload de arquivos dbf, utilize
	
	i3GEO.arvoreDeTemas.dialogo.uploaddbf()
	*/
	dialogo:{
		/*
		Function: nuvemTags

		Mostra a nuvem de tags para escolha de temas baseado nos tags registrados nos menus de temas
		*/
		nuvemTags: function()
		{i3GEO.janela.cria("350px","350px",i3GEO.configura.locaplic+"/ferramentas/nuvemtags/index.htm","","","Nuvem de tags <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=30' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: navegacaoDir

		Abre a janela para adicionar temas navegando pelos diret�rios do servidor
		*/
		navegacaoDir: function()
		{i3GEO.janela.cria("550px","350px",i3GEO.configura.locaplic+"/ferramentas/navegacaodir/index.htm","","","Diret&oacute;rios");},
		/*
		Function: conectarwms

		Abre a janela para adicionar temas tendo como fonte um web service do tipo wms
		*/
		conectarwms: function()
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwms/index.htm","","","Conex�o WMS <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=28' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: conectarwmst

		Abre a janela para adicionar temas tendo como fonte um web service do tipo wms-t (time)
		*/
		conectarwmst: function(){
			var l,a;
			if(i3GEO.parametros.w)
			{l = i3GEO.parametros.w + 150;}
			else
			{l = 400;}
			if(i3GEO.parametros.h)
			{a = i3GEO.parametros.h + 200;}
			else
			{a = 350;}
			i3GEO.janela.cria(l/2 + "px",a/2 + "px",i3GEO.configura.locaplic+"/ferramentas/wmstime/index.htm","","","Conex�o WMS-T <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=76' >&nbsp;&nbsp;&nbsp;</a>");
		},
		/*
		Function: conectarwfs

		Abre a janela para adicionar temas tendo como fonte um web service do tipo wfs
		*/
		conectarwfs: function()
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwfs/index.htm","","","WFS");},
		/*
		Function: conectargeorss

		Abre a janela para adicionar temas tendo como fonte um georss
		*/
		conectargeorss: function()
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectargeorss/index.htm","","","Conex�o GeoRSS <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=29' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: upload

		Abre a janela para o upload de shape file
		*/
		upload: function(){
			if(typeof(i3GEOF.upload) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/upload/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.upload.criaJanelaFlutuante()","i3GEOF.upload_script");
			}
		},
		/*
		Function: uploaddbf

		Abre a janela para o upload de um arquivo dbf
		*/
		uploaddbf: function()
		{i3GEO.janela.cria("300px","280px",i3GEO.configura.locaplic+"/ferramentas/uploaddbf/index.htm","","","Upload DBF <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=26' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: downloadbase

		Abre o aplicativo datadownload
		*/
		downloadbase: function()
		{window.open(i3GEO.configura.locaplic+"/datadownload.htm");}
	}
};
//YAHOO.log("carregou classe arvoredetemas", "Classes i3geo");