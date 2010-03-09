/*jslint white:false,undef: false, rhino: true, onevar: true, evil: false */

/*
Title: �rvore de camadas

Arquivo:

i3geo/classesjs/classe_arvoredecamadas.js

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
if(typeof(i3GEO) === 'undefined'){
	i3GEO = [];
}
/*
Classe: i3GEO.arvoreDeCamadas

Monta a �rvore com os temas existentes no mapa atual. A �rvore cont�m as op��es de ligar e desligar temas.

Permite controlar quais as op��es que ser�o mostradas na �rvore.

Exemplos:

	Para alterar as op��es da �rvore, modifique as propriedades

	i3GEO.arvoreDeCamadas.OPCOESTEMAS = false;
*/
i3GEO.arvoreDeCamadas = {
	/*
	Propriedade: finaliza
	
	Nome de uma fun��o que ser� executada ap�s a �rvore ter sido montada
	
	Default:
	{""}
	 
	Type:
	{String}
	*/
	finaliza: "",
	/*
	Propriedade: EXPANDESOLEGENDA
	
	Ao expandir um tema mostra apenas a legenda, sem as outras op��es
	
	Default:
	{false}
	
	Type:
	{boolean}
	*/
	EXPANDESOLEGENDA: false,
	/*
	Propriedade: PERMITEEXPANDIRTEMAS
	
	Permite que as op��es abaixo dos n�s referentes acada tema sejam mostradas
	
	Default:
	{true}
	
	Type:
	{boolean}
	*/
	PERMITEEXPANDIRTEMAS:true,
	/*
	Propriedade: ARRASTARORDEM
	
	Ativa a op��o de arrastar um tema para alterar a ordem de desenho das camadas
	
	Default:
	{true}
	
	Type:
	{boolean}
	*/
	ARRASTARORDEM: true,
	/*
	Propriedade: ARRASTARLIXEIRA
	
	Ativa a op��o de arrastar um tema para a lixeria quando se quer remov�-lo do mapa.
	
	Default:
	{true}
	
	Type:
	{boolean}
	*/
	ARRASTARLIXEIRA: true,
	/*
	Propriedade: LIGARDESLIGARTODOS
	
	Mostra os �cones de desligar/ligar todos os temas.
	
	Default:
	{true}
	
	Type:
	{boolean}
	*/
	LIGARDESLIGARTODOS: true,
	/*
	Propriedade: EXPANDIDA
	
	Indica se a �rvore ser� montada de forma expandida ou n�o. Se true, os n�s do primeiro n�vel ser�o abertos na inicializa��o da �rvore.
	
	Default:
	{false}
	
	Tipo:
	{Boolena}
	*/
	EXPANDIDA: false,
	/*
	Propriedade: LEGENDAEXPANDIDA
	
	Indica se a legenda da �rvore ser� montada de forma expandida ou n�o.
	
	Default:
	{false}
	
	Tipo:
	{Boolena}
	*/
	LEGENDAEXPANDIDA: false,
	/*
	Propriedade: OPCOESICONES
	
	Inclui ou n�o os �cones de op��es em cada tema (farol, zoom para o tema, etc)
	
	Default:
	{true}
	
	Tipo:
	{boolean}
	*/
	OPCOESICONES: true,
	/*
	Propriedade: OPCOESTEMAS
	
	Inclui ou n�o o n� com as op��es de manipula��o de cada tema.
	
	Default:
	true
	
	Tipo:
	{Boolean}
	*/
	OPCOESTEMAS: true,
	/*
	Propriedade: OPCOESLEGENDA
	
	Inclui ou n�o o n� para mostrar a legenda do tema.
	
	Default:
	true
	
	Tipo:
	{Boolean}
	*/
	OPCOESLEGENDA: true,
	/*
	Propriedade: AGUARDALEGENDA
	
	Ativa a op��o de aguarde para mostrar a legenda de um tema quando o usu�rio estaciona o mouse sobre o nome de um tema.
	
	Default:
	{true}
	
	Tipo:
	{Boolean}
	*/
	AGUARDALEGENDA: false,
	/*
	Variavel: CAMADAS
	
	Objeto com a lista de camadas existentes no mapa. � definido na inicializa��o ou no redesenho do mapa.
	
	Este objeto � constru�do nas opera��es em PHP de inicializa��o ou redesenho do mapa.
	
	Exemplo:
	
	"temas":[
		
		{
		
			"name":"estadosl", //c�digo do layer
			
			"status":2, //ver constante MS_STATUS do Mapserver
			
			"tema":"Limite Estadual",
			
			"transparency":100,
			
			"type":1, //ver constante MS_TYPE do Mapserver
			
			"sel":"nao",
			
			"escala":"250000",
			
			"download":"",
			
			"features":"nao",
			
			"connectiontype":1, //ver constante MS_CONNECTIONTYPE do Mapserver
			
			"zoomtema":"sim",
			
			"contextoescala":"nao",
			
			"etiquetas":"",
			
			"editorsql":"sim"
			
		}
	]
	
	Tipo:
	{JSON}
	*/
	CAMADAS: "",
	/*
	Variavel: ARVORE
	
	Objeto com a �rvore criada com YAHOO.widget.TreeView

	Tipo:
	{YAHOO.widget.TreeView}
	*/
	ARVORE: null,
	/*
	Variavel: IDHTML
	
	Armazena o ID do elemento DOM onde a �rvore foi inserida.
	
	Tipo:
	{String}
	*/
	IDHTML: null,
	/*
	Variavel: SID
	
	C�digo da se��o aberta no servidor pelo i3Geo

	Tipo:
	{String}
	*/
	SID: null,
	/*
	Variavel: LOCAPLIC
	
	Endere�o da aplica��o i3geo. Utilizado para definir o caminho para a chamada em AJAX.
	
	Exemplo: 'http://localhost/i3geo'

	Tipo:
	{String}
	*/
	LOCAPLIC: null,
	/*
	Variavel: ATIVATEMA
	
	Nome da fun��o que ser� inclu�da no evento onclick do elemento checkbox adicionado no in�cio do nome de um tema.
	
	Tipo:
	{String}
	*/
	ATIVATEMA: "",

	/*
	Function: cria
	
	Cria a �rvore com as op��es de manipula��o das camadas existentes no mapa
	
	Parametros:
	
	onde {String} - ID do elemento DOM onde a �rvore ser� inserida. Se for definido como "" o id ser� buscado da vari�vel IDHTML.
	
	temas {JSON} - Objeto JSON com as camadas e propriedades
	
	g_sid {String} -  C�digo da se��o PHP criada ao abrir o i3Geo

	funcaoTema {String} - (opcional) Nome da fun��o que ser� incluida no evento disparado quando o usu�rio clicar no checkbox de um tema
	*/
	cria: function(onde,temas,g_sid,g_locaplic,funcaoTema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.cria()");}
		//YAHOO.log("Criando a �rvore de camadas", "i3geo");
		if(arguments.length === 5){
			i3GEO.arvoreDeCamadas.ATIVATEMA = funcaoTema;
		}
		if(g_sid)
		{this.SID = g_sid;}
		else
		{this.SID = i3GEO.configura.sid;}
		if(g_locaplic)
		{this.LOCAPLIC = g_locaplic;}
		else
		{this.LOCAPLIC = i3GEO.configura.locaplic;}
		if(onde !== "")
		{this.IDHTML = onde;}
		if(this.IDHTML === ""){return;}
		this.atualiza(temas);
		if(this.finaliza != ""){
			eval(this.finaliza);
		}
	},
	/*
	Function: atualiza
	
	Atualiza a �rvore de camadas.
	
	Antes de executar a atualiza��o, essa fun��o verifica se � necess�rio faz�-lo.
	O objeto CAMADAS � comparado com o par�metro "temas" para verificar se existem diferen�as que
	justifiquem a atualiza��o.
	
	Parametro:
	
	temas {JSON} - Objeto com a lista de camadas e propriedades (veja CAMADAS). Se n�o existir, a �rvore � redesenhada
	*/
	atualiza: function(temas){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.atualiza()");}
		if(arguments.length === 0){
			temas = this.CAMADAS;
			this.CAMADAS = "";
		}
		var temp,currentIconMode,newVal,root,tempNode,titulo,d,c,ltema,temaNode,i,j,n,nk,k,incluidos=[];
		//
		//essa verificacao � necessaria quando a arvore � criada fora dos padr�es normais
		//
		var temp = $i(i3GEO.arvoreDeCamadas.IDHTML);
		if(temp){
			if(temp.innerHTML !== ""){
				if(this.comparaTemas(temas,this.CAMADAS))
				{return;}
			}
		}
		else
		{return;}
		document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).innerHTML = "";
		this.CAMADAS = temas;
		YAHOO.example.treeExample = function(){
			function changeIconMode(){
				newVal = parseInt(this.value,10);
				if (newVal !== currentIconMode)
				{currentIconMode = newVal;}
				buildTree();
			}
        	function buildTree(){
				i3GEO.arvoreDeCamadas.ARVORE = new YAHOO.widget.TreeView(i3GEO.arvoreDeCamadas.IDHTML);
				root = i3GEO.arvoreDeCamadas.ARVORE.getRoot();
				tempNode = new YAHOO.widget.TextNode('', root, false);
				tempNode.isLeaf = false;
				tempNode.enableHighlight = false;
        	}
    		buildTree();
		}();
		root = i3GEO.arvoreDeCamadas.ARVORE.getRoot();
		titulo = "<table><tr><td><b>"+$trad("a7")+"</b></td><td>";
		if(i3GEO.arvoreDeCamadas.ARRASTARLIXEIRA === true)
		{titulo += "<img id='i3geo_lixeira' title='"+$trad("t2")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";}
		if(i3GEO.arvoreDeCamadas.LIGARDESLIGARTODOS === true){
			titulo += "&nbsp;<img onclick='i3GEO.arvoreDeCamadas.aplicaTemas(\"ligartodos\");' id='olhoAberto' title='"+$trad("t3a")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";
			titulo += "&nbsp;<img onclick='i3GEO.arvoreDeCamadas.aplicaTemas(\"desligartodos\");' id='olhoFechado' title='"+$trad("t3b")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";
		}
		titulo += "</td></tr></table>";
		d = {html:titulo};
		tempNode = new YAHOO.widget.HTMLNode(d, root, true,true);
		tempNode.enableHighlight = false;
		//
		//monta a �rvore.
		//se i3GEO.configura.grupoLayers estiver definido
		//o processo � diferenciado
		//
		if (i3GEO.configura.grupoLayers === ""){
			c = temas.length;
			for (i=0, j=c; i<j; i++){
				ltema = temas[i];		
				d = {html:i3GEO.arvoreDeCamadas.montaTextoTema(ltema),id:ltema.name,tipo:"tema"};
				temaNode = new YAHOO.widget.HTMLNode(d, tempNode, i3GEO.arvoreDeCamadas.EXPANDIDA,true);
				if(i3GEO.arvoreDeCamadas.PERMITEEXPANDIRTEMAS === true){
					if(i3GEO.arvoreDeCamadas.EXPANDESOLEGENDA === false)
					{temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, currentIconMode);}
					else
					{temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraLegenda, 1);}
				}
				temaNode.expanded = i3GEO.arvoreDeCamadas.EXPANDIDA;
				temaNode.enableHighlight = false;
			}
		}
		else{
			nk = temas.length;
			c = i3GEO.configura.grupoLayers.length;
			//grupos
			for(i=0;i<c; i++){
				d = {html:"<b>"+i3GEO.configura.grupoLayers[i].nome+"</b>"};
				temaNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
				temaNode.expanded = false;
				temaNode.enableHighlight = false;				
				n = i3GEO.configura.grupoLayers[i].layers.length;
				//layers de um grupo
				for(j=0;j<n; j++){
					//busca na lista de temas
					for(k=0;k<nk; k++){
						ltema = temas[k];
						if(ltema.name === i3GEO.configura.grupoLayers[i].layers[j]){
							d = {html:i3GEO.arvoreDeCamadas.montaTextoTema(ltema),id:ltema.name,tipo:"tema"};
							temaNode = new YAHOO.widget.HTMLNode(d, tempNode, i3GEO.arvoreDeCamadas.EXPANDIDA,true);
							temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, currentIconMode);							
							temaNode.expanded = false;
							temaNode.enableHighlight = false;
							incluidos.push(ltema.name);					
						}
					}
				}
			}
			//inclui os temas n�o agrupados
			d = {html:"<b>Outros</b>"};
			temaNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
			temaNode.expanded = false;
			temaNode.enableHighlight = false;
			c = incluidos.length;
			for(k=0;k<nk; k++){
				ltema = temas[k];
				n = false;
				for(j=0;j<c; j++){
					if(incluidos[j] === ltema.name)
					{n = true;}
				}
				if (n === false){
					d = {html:i3GEO.arvoreDeCamadas.montaTextoTema(ltema),id:ltema.name,tipo:"tema"};
					temaNode = new YAHOO.widget.HTMLNode(d, tempNode, i3GEO.arvoreDeCamadas.EXPANDIDA,true);
					temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, currentIconMode);
					temaNode.expanded = false;
					temaNode.enableHighlight = false;	
				}
			}
		}
		document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).style.textAlign="left";
   		i3GEO.arvoreDeCamadas.ARVORE.draw();
   		if(i3GEO.arvoreDeCamadas.ARRASTARORDEM === true || i3GEO.arvoreDeCamadas.ARRASTARLIXEIRA === true)
   		{this.ativaDragDrop();}
		//
		//verifica se a ferramenta identifica est� ativa para atualizar a lista de temas
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
		if(i3GEO.temaAtivo !== ""){
			i3GEO.mapa.ativaTema(i3GEO.temaAtivo);
		}
	},
	/*
	Function: ativaDragDrop
	
	Ativa a funcionalidade de arrastar um tema para mudar sua ordem de desenho ou excluir do mapa
	*/
	ativaDragDrop: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.ativaDragDrop()");}
		var Dom,Event,DDM;
		Dom = YAHOO.util.Dom;
		Event = YAHOO.util.Event;
		DDM = YAHOO.util.DragDropMgr;
		YAHOO.example.DDList = "";
		YAHOO.example.DDApp = {
    		init: function() 
    		{
        		var ddtarget,i,ltema,ddlist;
        		if($i("i3geo_lixeira") && i3GEO.arvoreDeCamadas.ARRASTARLIXEIRA === true)
        		{ddtarget = new YAHOO.util.DDTarget("i3geo_lixeira");}
        		i = i3GEO.arvoreDeCamadas.CAMADAS.length-1;
        		if (i3GEO.arvoreDeCamadas.CAMADAS.length-1 >= 0){
	       	 		do{
               			ltema = i3GEO.arvoreDeCamadas.CAMADAS[i];
               			if($i("arrastar_"+ltema.name))
               			{ddlist = new YAHOO.example.DDList("arrastar_"+ltema.name);}
        			}
        			while(i--);
        		}
    		}
		};
		YAHOO.example.DDList = function(id, sGroup, config) {
		    YAHOO.example.DDList.superclass.constructor.call(this, id, sGroup, config);
		    this.logger = this.logger || YAHOO;
	    	Dom.setStyle(this.getDragEl(), "opacity", 0.67); // The proxy is slightly transparent
		    this.goingUp = false;
	   		this.lastY = 0;
		};
		YAHOO.extend(
			YAHOO.example.DDList, YAHOO.util.DDProxy, {
		    	startDrag: function(x, y){
    	    		var dragEl,clickEl;
    	    		this.logger.log(this.id + " startDrag");
		        	// make the proxy look like the source element
    		    	dragEl = this.getDragEl();
        			clickEl = this.getEl();
        			Dom.setStyle(clickEl, "visibility", "hidden");
	    	    	dragEl.innerHTML = clickEl.innerHTML;
	    	    	Dom.setStyle(dragEl, "color", Dom.getStyle(clickEl, "color"));
   		 	   		Dom.setStyle(dragEl, "backgroundColor", Dom.getStyle(clickEl, "backgroundColor"));
    	 	   		Dom.setStyle(dragEl, "border", "4px solid gray");
    	 	   		Dom.setStyle(dragEl, "z-index", "5000");
    			},
	    		endDrag: function(e){
	        		var srcEl,proxy,a,thisid,proxyid;
	        		srcEl = this.getEl();
    	    		proxy = this.getDragEl();
	        		// Show the proxy element and animate it to the src element's location
    	    		Dom.setStyle(proxy, "visibility", "");
        			a = new YAHOO.util.Motion( 
           				proxy,{ 
                			points:
                			{to: Dom.getXY(srcEl)}
    	        		}, 
        	   	 		0.2, 
            			YAHOO.util.Easing.easeOut
        			);
        			proxyid = proxy.id;
        			thisid = this.id;
	        		// Hide the proxy and show the source element when finished with the animation
	        		a.onComplete.subscribe(
	        			function(){
                			Dom.setStyle(proxyid, "visibility", "hidden");
                			Dom.setStyle(thisid, "visibility", "");
            			}
            		);
	        		a.animate();
	        		if ($i("i3geo_lixeira"))
	        		{$i("i3geo_lixeira").style.border = "0px solid blue";} 	
    			},
	    		onDragDrop: function(e, id){
	        		var pt,region,tema,destEl,els,lista,noid;
	        		if (DDM.interactionInfo.drop.length === 1){
	            		pt = DDM.interactionInfo.point; 
		            	region = DDM.interactionInfo.sourceRegion; 
	            		if (!region.intersect(pt)){
	                		DDM.refreshCache();
	                		//exclui tema
   		             		if(DDM.getDDById(id).id === "i3geo_lixeira"){
                				if(i3GEO.arvoreDeCamadas.ARRASTARLIXEIRA === true){
                					i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o1"));
                					tema = (this.getEl()).id.split("arrastar_")[1];
									i3GEO.contadorAtualiza++;
									i3GEO.php.excluitema(i3GEO.atualiza,tema);							
									i3GEO.mapa.ativaTema("");
								}
							}
							//muda ordem de desenho do tema
							else{
								if(i3GEO.arvoreDeCamadas.ARRASTARORDEM === true){
		                			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		                			destEl = Dom.get(id);
	   		             			noid = id.split("arrastar_")[1];
	   	    	         			destEl.appendChild(this.getEl()); 
	 								els = i3GEO.arvoreDeCamadas.listaLigadosDesligados();
	 								lista = els[2].join(",");
	 								i3GEO.contadorAtualiza++;
	 								i3GEO.php.reordenatemas(i3GEO.atualiza,lista);
	 							}
							}
        	    		}
	    	    	}
	    		},
	    		onDrag: function(e){
	        		// Keep track of the direction of the drag for use during onDragOver
	        		var y;
	        		y = Event.getPageY(e);
	        		if (y < this.lastY) 
	        		{this.goingUp = true;}
        			else
        			if (y > this.lastY)
        			{this.goingUp = false;}
	        		this.lastY = y;
	    		},
	    		onDragOver: function(e, id) {
	        		var srcEl,destEl;
	        		srcEl = this.getEl();
	        		destEl = Dom.get(id);
	        		// We are only concerned with list items, we ignore the dragover
	        		// notifications for the list.
	        		if ($i("i3geo_lixeira") && id === "i3geo_lixeira")
	        		{$i("i3geo_lixeira").style.border = "1px solid red";}
	        		else{destEl.style.textDecoration="underline";}
	    		},
	    		onDragOut: function(e, id)
	    		{$i(id).style.textDecoration="none";}
			}
		);
		Event.onDOMReady(YAHOO.example.DDApp.init, YAHOO.example.DDApp, true);
	},
	/*
	Function: montaOpcoes
	
	Abre o segundo n�vel da �rvore de temas, mostrando as op��es dispon�veis para cada tema.
	
	Nesse segundo n�vel s�o mostrados alguns �cones como o farol, excluir, etc, al�m do n� de op��es e legenda.
	
	Parametro:
	
	node {YAHOO.widget.HTMLNode} - N� que foi clicado
	*/
	montaOpcoes: function(node){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.montaOpcoes()");}
		//YAHOO.log("Montando as op��es da �rvore de camadas", "i3geo");
		var d,conteudo,opcoesNode,idtema,ltema,farol,mfarol,tnome,iconesNode;
		idtema = node.data.id;
		ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		if(i3GEO.arvoreDeCamadas.OPCOESICONES === true){
			farol = "maisamarelo.png";
			mfarol = "";
			if (ltema.escala*1 < i3GEO.parametros.mapscale*1){
	 			farol = "maisverde.png";
	 			mfarol = $trad("t9");
			}
			if (ltema.escala*1 > i3GEO.parametros.mapscale*1){
	 			farol = "maisvermelho.png";
				mfarol = $trad("t10");
			}
			if (ltema.escala === 0){
	 			farol = "maisamarelo.png";
				mfarol = $trad("t11");
			}
			tnome = "&nbsp;<img id='farol"+ltema.name+"' src='"+i3GEO.util.$im(farol)+"' title='"+mfarol+"' />";
			tnome += "&nbsp;<img  id='idx"+ltema.name+"' class='x' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("t12")+"' onclick='i3GEO.tema.exclui(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t12a")+"','exclui')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			tnome += "&nbsp;<img class='sobe' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("t13")+"' onclick='i3GEO.tema.sobe(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t14")+"','sobe')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			tnome += "&nbsp;<img class='desce' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("t15")+"' onclick='i3GEO.tema.desce(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t16")+"','desce')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			tnome += "&nbsp;<img class='fonte' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("a9")+"' onclick='i3GEO.tema.fonte(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("a9")+"','fonte')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			//a opera��o de zoom para o tema n�o funciona na interface flamingo
			if( (ltema.zoomtema === "sim") && (i3GEO.Interface.ATUAL !== "flamingo"))
			{tnome += "&nbsp;<img class='extent' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("t17")+"' onclick='i3GEO.tema.zoom(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t18")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";}
			d = {html:tnome};
			iconesNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			iconesNode.enableHighlight = false;
			iconesNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeCamadas.OPCOESTEMAS === true){
			conteudo = $trad("t18a");
			d = {html:conteudo,idopcoes:ltema.name};
			opcoesNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			opcoesNode.enableHighlight = false;
			opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraOpcoes, 1);
		}
		if(i3GEO.arvoreDeCamadas.OPCOESLEGENDA === true){
			conteudo = $trad("p3");
			d = {html:conteudo,idlegenda:ltema.name};
			opcoesNode = new YAHOO.widget.HTMLNode(d, node, i3GEO.arvoreDeCamadas.LEGENDAEXPANDIDA,true);
			opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraLegenda, 1);
			opcoesNode.enableHighlight = false;
		}	
		node.loadComplete();
		//YAHOO.log("Op��es OK", "i3geo");	
	},
	/*
	Function: mostraOpcoes
	
	Monta os n�s filhos do n� "op��es"
	
	Parametro:
	
	node {YAHOO.widget.HTMLNode}
	*/
	mostraOpcoes: function(node){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.mostraOpcoes()");}
		//YAHOO.log("Mostrando as op��es da �rvore de camadas", "i3geo");
		var idtema,ltema,tnome,d,n;
		idtema = node.data.idopcoes;
		ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		if(navm)
			{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t19")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+$trad("t20")+"</span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=42' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","tr"+ltema.name,"","3",ltema.transparency)+"&nbsp;<a  class='tic' onclick='i3GEO.tema.mudatransp(\""+ltema.name+"\")' href='#' /a>";}
		else
			{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t19")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+$trad("t20")+"</span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=42' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","tr"+ltema.name,"","3",ltema.transparency)+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudatransp(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";}
		d = {html:tnome};
		n = new YAHOO.widget.HTMLNode(d, node, false,true);
		n.enableHighlight = false;
		n.isLeaf = true;
		if(navm)
			{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t21a")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />"+$trad("t21")+" </span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=43' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","nn"+ltema.name,"","8","")+"&nbsp;<a  class='tic' onclick='i3GEO.tema.mudanome(\""+ltema.name+"\")' href='#' />";}
		else
			{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t21a")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />"+$trad("t21")+" </span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=43' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","nn"+ltema.name,"","10","")+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudanome(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";}			
		d = {html:tnome};
		n = new YAHOO.widget.HTMLNode(d, node, false,true);
		n.enableHighlight = false;
		n.isLeaf = true;

		if ((ltema.type < 3) && (ltema.connectiontype !== 7)){
			if(i3GEO.Interface.ATUAL !== "flamingo")
			{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t22"),$trad("t23"),'i3GEO.tema.dialogo.procuraratrib(\"'+ltema.name+'\")',node);}
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t24"),$trad("t25"),'i3GEO.tema.dialogo.toponimia(\"'+ltema.name+'\")',node);
			if(i3GEO.Interface.ATUAL === "padrao"){
				i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t26"),$trad("t27"),'i3GEO.tema.dialogo.etiquetas(\"'+ltema.name+'\")',node);
			}
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t28"),$trad("t29"),'i3GEO.tema.dialogo.filtro(\"'+ltema.name+'\")',node);
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t30"),$trad("t31"),'i3GEO.tema.dialogo.tabela(\"'+ltema.name+'\")',node);
			if(i3GEO.parametros.versaoms > 4){
				i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t37"),$trad("t37"),'i3GEO.tema.dialogo.graficotema(\"'+ltema.name+'\")',node);
			}
		}
		if (ltema.type < 4){
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t32"),$trad("t33"),'i3GEO.tema.dialogo.editaLegenda(\"'+ltema.name+'\")',node);
		}
		if(i3GEO.Interface.ATUAL === "padrao"){
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t34"),$trad("t35"),'i3GEO.navega.destacaTema.inicia(\"'+ltema.name+'\")',node);
		}	
		i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t38"),$trad("t39"),'i3GEO.tema.dialogo.sld(\"'+ltema.name+'\")',node);
		if(ltema.editorsql == "sim" || ltema.editorsql == "SIM")
		{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t40"),$trad("t41"),'i3GEO.tema.dialogo.editorsql(\"'+ltema.name+'\")',node);}

		node.loadComplete();

		//YAHOO.log("Op��es OK", "i3geo");
	},
	/*
	Function: adicionaOpcaoTema
	
	Adiciona uma nova op��o no n� de op��es de um tema
	
	Parametros:
	
	dica {String} - dica que ser� mostrada na janela de mensagens do mapa quando o usu�rio sobrepoem o mouse
	
	titulo {String} - t�tulo que ser� mostrado no n�
	
	onclick {String} - string que define o evento onclick sobre o t�tulo da op��o
	
	node {String} - objeto node da �rvore (YUI) que receber� o novo n�
	*/
	adicionaOpcaoTema:function(dica,titulo,onclick,node){
		var tnome,d,n;
		tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+dica+"','');\" onclick="+onclick+">"+titulo+" </a>";
		d = {html:tnome};
		n = new YAHOO.widget.HTMLNode(d, node, false,true);
		n.enableHighlight = false;
		n.isLeaf = true;	
	},
	/*
	Function: mostraLegenda
	
	Monta os n�s filhos do n� "legenda"
	
	Parametro:
	
	node - {YAHOO.widget.HTMLNode}
	*/
	mostraLegenda: function(node){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.mostraLegenda()");}
		//YAHOO.log("Mostrando a legenda da �rvore de camadas", "i3geo");
		var idtema,ltema,retorna;
		idtema = node.data.idlegenda;
		ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		retorna = function(retorno){
			var original,i,re,tabela,linhas,linha,colunas,id,exp,incluir,d,nodeLeg,elementos,nelementos,inputs,desativar,nindices;
			if(retorno.data.legenda){
				original = retorno;
				retorno = retorno.data.legenda;
				if (retorno[0]){
					if ((navn) && (!retorno[0].imagem)){tabela = retorno;}
					else{
						i = retorno[0].imagem;
						re = new RegExp("tiff", "g");
						i = i.replace(re,'png');
						tabela = "<img src='"+i+"' />";
					}					
					retorno = "";
				}
				else{
					linhas = retorno.split("#");
					if (linhas.length > 1){
						linhas = retorno.split("|");
						tabela = "<table>";
						linha = linhas.length-1;
						if(linha >= 0){
							do{
								colunas = linhas[linha].split("#");
								id = colunas[0]+"-"+colunas[1];
								re = new RegExp("'", "g");
								exp = colunas[3].replace(re,'"');
								tabela += "<tr style='border-top:1px solid rgb(240,240,240);'><td><img src='"+colunas[4]+"' </td><td style='text-align:left'>"+colunas[2]+"</td></tr>";
							}
							while(linha--);
						}
						tabela += "</table><br>";
					}
					else{tabela = retorno;}
				}
			}
			else {tabela = "<img src='"+retorno.data[0].imagem+"' />";} //o tema � um wms
			incluir = "<div style='text-align:left' id='"+idtema+"verdiv"+"'>"+tabela+"</div>";
			d = {html:incluir};
			nodeLeg = new YAHOO.widget.HTMLNode(d, node, false,false);
			nodeLeg.enableHighlight = false;
			node.loadComplete();
			//
			//desliga os checkbox que foram desativados
			//pega os objetos input
			//
			elementos = document.getElementById(idtema+"verdiv").getElementsByTagName("input");
			nelementos = elementos.length;
			inputs = [];
			i = 0;
			if (nelementos > 0){
				do{
					if (elementos[i].type === "checkbox"){inputs.push(elementos[i]);}
					i++;
				}
				while(i < nelementos);
			}
			if(original.data.desativar){
				desativar = original.data.desativar;
				nindices = desativar.length;
				i = 0;
				if (nindices > 0){
					do{
						inputs[desativar[i]].checked = false;
						i++;
					}
					while(i < nindices);
				}
			}
		};
		if(i3GEO.configura.templateLegenda !== "")
		{i3GEO.php.criaLegendaHTML(retorna,idtema,i3GEO.configura.templateLegenda);}
		else
		{i3GEO.php.criaLegendaHTML(retorna,idtema);}
	},
	/*
	Function: atualizaLegenda
	
	Atualiza a legenda de um tema.
	
	A legenda precisa ser atualizada emalgumas circunst�ncias, como quando � feitoumzoom no mapa.
	
	Parametro:
	
	id {String} - ID (name) do tema
	*/
	atualizaLegenda: function(idtema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.atualizaLegenda()");}
		//YAHOO.log("Atualizando a legenda da �rvore de camadas", "i3geo");
		var node;
		if(document.getElementById(idtema+"verdiv"))
		{
			node = i3GEO.arvoreDeCamadas.ARVORE.getNodeByProperty("idlegenda",idtema);
			if(node)
			{
				i3GEO.arvoreDeCamadas.ARVORE.removeChildren(node);
				this.mostraLegenda(node);
				//atualiza as janelas individuais com as legendas de cada tema
				if($i("janelaLegenda"+idtema+"_corpo"))
				{i3GEO.tema.mostralegendajanela(idtema,"","abrejanela");}
			}
		}
		//YAHOO.log("Legenda OK", "i3geo");
	},
	/*
	Function: inverteStatusClasse
	
	Liga ou desliga uma classe da legenda.
	
	A chamada dessa fun��o � definida em aplicmap/legenda2.htm
	
	Parametro:
	
	leg {Object input} - objeto do tipo INPUT com o id da classe e o id do tema
	*/
	inverteStatusClasse: function (leg){
		//YAHOO.log("Invertendo o status da �rvore de camadas", "i3geo");
		var temp = function()
		{i3GEO.atualiza("");};
		i3GEO.php.inverteStatusClasse(temp,leg.name,leg.value);
	},	
	/*
	Function: montaTextoTema
	
	Monta o texto com o t�tulo do tema. Esse texto � o que ser� mostrado nos n�s principais da �rvore e
	cont�m o checkbox para ligar e desligar o tema.
	
	Parametro:
	
	tema - {Object} - objeto JSON com as propriedades do tema
	
	Return:
	
	{String} - texto formatado
	*/
	montaTextoTema: function(tema){
		var ck,html;
		if(tema.status === 2){ck = ' CHECKED ';}
		else
		{ck = "";}
		html = "<p onclick='i3GEO.mapa.ativaTema(\""+tema.name+"\")' id='arrastar_"+tema.name+"' style='text-align:left;font-size:11px;' ><input class=inputsb style='cursor:pointer;' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t3")+"','ligadesliga')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" type='checkbox' name=\"layer\" value='"+tema.name+"' "+ ck ;

		if(i3GEO.arvoreDeCamadas.ATIVATEMA !== "")
		{html += "onclick=\""+i3GEO.arvoreDeCamadas.ATIVATEMA+"\"";}
		else
		{html += "onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeCamadas.aplicaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicarCamadas\",this)'";}
		html += " />";
		if (tema.contextoescala === "sim")
		{html += "&nbsp;<img src="+i3GEO.util.$im("contextoescala.png")+" title='"+$trad("t36")+"' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t36")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";}				
		if (tema.sel === "sim"){
			html += "&nbsp;<img src="+i3GEO.util.$im("estasel.png")+" title='"+$trad("t4")+"' onclick='i3GEO.tema.limpasel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','limpasel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			html += "&nbsp;<img src="+i3GEO.util.$im("zoomsel.gif")+" title='"+$trad("t4a")+"' onclick='i3GEO.tema.zoomsel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','zoomsel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
		}
		if ((tema.download === "sim") || (tema.download === "SIM"))
		{html += "&nbsp;<img src="+i3GEO.util.$im("down1.gif") +" title='download' onclick='i3GEO.tema.dialogo.download(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t6")+"','download')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";}
		if(i3GEO.arvoreDeCamadas.AGUARDALEGENDA)
		{html += "&nbsp;<span style='cursor:move' onclick=\"i3GEO.tema.mostralegendajanela('"+tema.name+"','"+tema.tema+"','abrejanela');\" onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7a")+"','');i3GEO.tema.mostralegendajanela('"+tema.name+"','"+tema.tema+"','ativatimer');\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('');i3GEO.tema.mostralegendajanela('"+tema.name+"','','desativatimer');\" >"+tema.tema+"</span>";}
		else
		{html += "&nbsp;<span style='cursor:move' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+tema.tema+"</span>";}
		
		html += "</p>";
		return(html);
	},
	/*
	Function: atualizaFarol
	
	Atualiza o farol de cada tema.
	
	O farol identifica a compatibilidade da escala do mapa com a escala de cada tema
	
	Parametro:
	
	mapscale {Numeric} - escala de compara��o com a escala de cada tema
	*/
	atualizaFarol: function(mapscale)
	{
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.atualizaFarol()");}
		//YAHOO.log("Atualizando o farol da �rvore de camadas", "i3geo");
		var farol,l,ltema,escala;
		farol = "maisamarelo.png";
		l = i3GEO.arvoreDeCamadas.CAMADAS.length-1;
		if (l >= 0){
			do{
				ltema = i3GEO.arvoreDeCamadas.CAMADAS[l];
				escala = ltema.escala;
				if (escala*1 < mapscale*1)
				{farol = "maisverde.png";}
				if (escala*1 > mapscale*1)
				{farol = "maisvermelho.png";}
				if (escala*1 === 0)
				{farol = "maisamarelo.png";}
				if ($i("farol"+ltema.name)){
					$i("farol"+ltema.name).src = i3GEO.configura.locaplic+"/imagens/"+farol;
				}
			}
			while(l--);
		}
		//YAHOO.log("Farol OK", "i3geo");
	},
	/*
	Function: aplicaTemas
	
	Refaz o mapa ligando e desligando os temas conforme consta na �rvore de camadas ou ligando/desligando todos
	
	Parametro:
	
	tipo {String} - tipo de opera��o normal|ligartodos|desligartodos a op��o 'normal' ir� desligar/ligar o que estiver marcado
	*/
	aplicaTemas: function(tipo){
		if(arguments.length == 0)
		{tipo = "normal";}
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.aplicaTemas()");}
		//YAHOO.log("Mudando status ligado/desligado de um tema", "i3geo");
		var t,temp,ligar,desligar;
		if(tipo === "normal")
		{t = i3GEO.arvoreDeCamadas.listaLigadosDesligados("mantem");}
		if(tipo === "ligartodos")
		{t = i3GEO.arvoreDeCamadas.listaLigadosDesligados("marca");}
		if(tipo === "desligartodos")
		{t = i3GEO.arvoreDeCamadas.listaLigadosDesligados("desmarca");}
		//
		//zera o contador de tempo
		//
		temp = function(){
			i3GEO.atualiza();
			i3GEO.janela.fechaAguarde("redesenha");
		};
		try{clearTimeout(tempoBotaoAplicar);}
		catch(erro){if(typeof(console) !== 'undefined'){console.error(erro);}}
		tempoBotaoAplicar = "";
		i3GEO.janela.abreAguarde("redesenha",$trad("o1"));
		if(tipo === "normal"){
			ligar = t[0].toString();
			desligar = t[1].toString();
		}
		if(tipo === "ligartodos"){
			ligar = t[2].toString();
			desligar = "";
		}
		if(tipo === "desligartodos"){
			ligar = "";
			desligar = t[2].toString();
		}		
		i3GEO.php.ligatemas(temp,desligar,ligar);
	},
	/*
	Function: listaLigadosDesligados
	
	Lista os temas que est�o ligados e os que est�o desligados
	tendo como fonte de busca os checkbox existentes na �rvore.
	
	Esse m�todo � mais demorado pois varre a �rvore toda. Por�m, obt�m o status verdadeiro do tema.
	
	Parametro:
	
	tipo {String} - mantem|marca|desmarca marca, desmarca ou mant�m o checkbox ap�s identificar seu status atual
	
	Return:
	{Array} - array com os c�digos dos temas [0]=ligados [1]=desligados [2]=todos na ordem encontrada
	*/
	listaLigadosDesligados: function(tipo){
		if(arguments.length === 0)
		{tipo = "manter";}
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.listaLigadosDesligados()");}
		var nos,ligados,desligados,todos,n,i,no,cs,csn,j,c;
		nos = i3GEO.arvoreDeCamadas.ARVORE.getNodesByProperty("tipo","tema");
		ligados = [];
		desligados = [];
		todos = [];
		n = nos.length;
		i=0;
		do{
			try{
				no = nos[i].getEl();
				cs = no.getElementsByTagName("input");
				csn = cs.length;
				for(j=0;j<csn;j++){
					c = cs[j];
					if(c.name==="layer"){
						if(c.checked === true)
						{ligados.push(c.value);}
						else
						{desligados.push(c.value);}
						todos.push(c.value);
						if(tipo === "marca")
						{c.checked = true;}
						if(tipo === "desmarca")
						{c.checked = false;}
					}
				}
				i++;
			} catch(e){i++;}
		}
		while(i<n);
		return ([ligados,desligados,todos]);
	},
	/*
	Function: comparaTemas
	
	Compara se dois objetos com as camadas s�o iguais
	
	Parametros:
	
	novo {JSON} - objeto novo
	
	atual {JSON} - objeto atual
	
	Return:
	
	{Boolean}
	*/
	comparaTemas: function(novo,atual){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.comparaTemas()");}
		try{
			var novon = novo.length,i;
			if(novon !== atual.length)
			{return (false);}
			for (i=0;i<novon;i++){
				if(novo[i].name !== atual[i].name)
				{return (false);}
				if(novo[i].tema !== atual[i].tema)
				{return (false);}
				if(novo[i].sel !== atual[i].sel)
				{return (false);}
			}
			return(true);
		}
		catch(e){return true;}
	},
	/*
	Function: pegaTema
	
	Procura um tema no objeto CAMADAS.
	
	Parametro:
	
	idtema - {String} ID do tema que ser� procurado
	
	Return:
	
	{JSON}
	*/
	pegaTema: function(idtema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.pegaTema()");}
		var c,i,v = "";
		c = i3GEO.arvoreDeCamadas.CAMADAS.length;
		for (i=0; i<c; i++){
			if(i3GEO.arvoreDeCamadas.CAMADAS[i].name === idtema){
				v = i3GEO.arvoreDeCamadas.CAMADAS[i];
			}
		}
		return v;	
	},
	/*
	Function: filtraCamadas
	
	Busca temas na vari�vel i3GEO.arvoreDeCamadas.CAMADAS aplicando um filtro
	
	Parameters:
	
	propriedade {string} - propriedade de CAMADAS que ser� filtrado
	
	valor - valor do filtro
	
	operador {string} - operador entre propriedade e valor igual|diferente
	
	camadas {array} - array do tipo i3GEO.arvoreDeCamadas.CAMADAS
	
	Return:
	{Array}
	*/
	filtraCamadas: function(propriedade,valor,operador,camadas){
    	if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.filtraCamadas()");}
    	var resultado = [],
    		i = 0,
    		temp,
    		nelementos = camadas.length,
    		ltema;
    	if (nelementos > 0){
	 		do{
	   			ltema = camadas[i];
          		temp = eval("ltema."+propriedade);
          		if(operador === "igual"){
          			if(temp === valor)
           			{resultado.push(ltema);}
           		}
          		if(operador === "diferente"){
          			if(temp !== valor)
           			{resultado.push(ltema);}
           		}
           		i++;        		
      		}
   			while(i < nelementos);
   		}
   		return resultado;
	}
};
//
//para efeitos de compatibilidade
i3GEO.arvoreDeCamadas.IDHTML = "listaTemas";
//YAHOO.log("carregou classe arvoredecamadas", "Classes i3geo");