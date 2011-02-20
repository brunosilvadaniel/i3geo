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
	Propriedade: FILTRO

	Filtro que ser� aplicado para restringir os tipos de camadas mostradas na �rvore

	Default:
	{""}
	 
	Type:
	{string} - ligados|desligados|selecionados|download|wms|raster|toponimia
	*/
	FILTRO: "",
	/*
	Propriedade: VERIFICAABRANGENCIATEMAS

	Verifica ou n�o se um tema da �rvore est� dentro da abrang�ncia do mapa atual

	A verifica��o s� � feita se o tema possuir a extens�o geogr�fica registrada (veja o sistema de administra��o)

	Default:
	{true}
	 
	Type:
	{boolean}
	*/
	VERIFICAABRANGENCIATEMAS: true,
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
	Propriedade: FILTRAR

	Mostra o �cone para filtrar as camadas.

	Default:
	{true}

	Type:
	{boolean}
	*/
	FILTRAR: true,
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
	{false}

	Tipo:
	{Boolean}
	*/
	AGUARDALEGENDA: false,
	/*
	Propriedade: ICONETEMA

	Mostra ou n�o o �cone do tema caso exista.

	O �cone � definido no METADATA ICONETEMA no mapfile correspondente ao tema

	Default:
	{true}

	Tipo:
	{Boolean}
	*/
	ICONETEMA: true,
	/*
	Variavel: CAMADAS

	Objeto com a lista de camadas existentes no mapa. � definido na inicializa��o ou no redesenho do mapa.

	Este objeto � constru�do nas opera��es em PHP de inicializa��o ou redesenho do mapa e lista todos os 
	layers existentes no mapfile tempor�rio em uso.

	Exemplo:

	"CAMADAS":[

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

			"editorsql":"sim",

			"iconetema":"",

			"permitecomentario":"",

			"exttema":""
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

	Default:
	{listaTemas}
	*/
	IDHTML: "listaTemas",
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
		if(!YAHOO.lang.isUndefined(funcaoTema)){
			i3GEO.arvoreDeCamadas.ATIVATEMA = funcaoTema;
		}
		i3GEO.arvoreDeCamadas.SID = typeof(g_sid) !== 'undefined' ? g_sid : i3GEO.configura.sid;
		i3GEO.arvoreDeCamadas.LOCAPLIC = typeof(g_locaplic) !== 'undefined' ? g_locaplic : i3GEO.configura.locaplic;
		if(onde !== "")
		{i3GEO.arvoreDeCamadas.IDHTML = onde;}
		if(i3GEO.arvoreDeCamadas.IDHTML === "")
		{return;}
		if(!$i(i3GEO.arvoreDeCamadas.IDHTML))
		{return;}
		if(YAHOO.lang.isUndefined(temas))
		{return;}
		i3GEO.arvoreDeCamadas.atualiza(temas);
		if(i3GEO.arvoreDeCamadas.finaliza !== ""){
			eval(i3GEO.arvoreDeCamadas.finaliza);
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
	
	forca {boolean} - for�a a atualiza��o da �rvore, sem verificar automaticamente se a atualiza��o deve ou n�o ser feita
	*/
	atualiza: function(temas,forca){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.atualiza()");}
		if(arguments.length === 0){
			temas = i3GEO.arvoreDeCamadas.CAMADAS;
			i3GEO.arvoreDeCamadas.CAMADAS = "";
			forca = false;
		}
		var estilo,temp,currentIconMode,newVal,root,tempNode,titulo,d,c,ltema,temaNode,grupoNode,i,j,n,nk,k,
			incluidos=[],
			grupoLayers = i3GEO.configura.grupoLayers,
			textoTema = "";
		//
		//essa verificacao � necessaria quando a arvore � criada fora dos padr�es normais
		//
		temp = $i(i3GEO.arvoreDeCamadas.IDHTML);
		if(temp){
			if(forca === true)
			{temp.innerHTML = "";}
			if(temp.innerHTML !== ""){
				if(i3GEO.arvoreDeCamadas.comparaTemas(temas,i3GEO.arvoreDeCamadas.CAMADAS)){
					if(typeof(console) !== 'undefined'){console.info("Nao � necessario atualizar arvoreDeCamadas - return");}
					return;
				}
			}
		}
		else
		{return;}
		i3GEO.util.defineValor(i3GEO.arvoreDeCamadas.IDHTML,"innerHTML","");
		i3GEO.arvoreDeCamadas.CAMADAS = temas;
		(function(){
			function changeIconMode(){
				newVal = parseInt(this.value,10);
				if (newVal !== currentIconMode)
				{currentIconMode = newVal;}
				buildTree();
			}
			function buildTree(){
				i3GEO.arvoreDeCamadas.ARVORE = new YAHOO.widget.TreeView(i3GEO.arvoreDeCamadas.IDHTML);
				root = i3GEO.arvoreDeCamadas.ARVORE.getRoot();
			}
			buildTree();
		})();
		root = i3GEO.arvoreDeCamadas.ARVORE.getRoot();
		titulo = "<table><tr><td><b>"+$trad("a7")+"</b></td><td>";
		if(this.ARRASTARLIXEIRA === true)
		{titulo += "<img id='i3geo_lixeira' title='"+$trad("t2")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";}
		if(this.FILTRAR === true)
		{titulo += "<img onclick='i3GEO.arvoreDeCamadas.dialogo.filtro();' id='i3geo_filtro' title='"+$trad("t2a")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";}
		if(this.LIGARDESLIGARTODOS === true){
			titulo += "&nbsp;<img onclick='i3GEO.arvoreDeCamadas.aplicaTemas(\"ligartodos\");' id='olhoAberto' title='"+$trad("t3a")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";
			titulo += "&nbsp;<img onclick='i3GEO.arvoreDeCamadas.aplicaTemas(\"desligartodos\");' id='olhoFechado' title='"+$trad("t3b")+"'  src='"+i3GEO.util.$im("branco.gif")+"' />";
		}
		titulo += "</td></tr></table>";
		tempNode = new YAHOO.widget.HTMLNode({expanded:true,html:titulo,hasIcon:true,enableHighlight: false}, root);
		//
		//estilo usado no input qd existirem grupos
		//
		estilo = navm ? "text-align:left;font-size:11px;vertical-align:middle;display:table-cell;" : "text-align:left;font-size:11px;vertical-align:vertical-align:top;padding-top:4px;";
		//
		//monta a �rvore.
		//se i3GEO.configura.grupoLayers estiver definido
		//o processo � diferenciado
		//
		if (grupoLayers === ""){
			c = temas.length;
			for (i=0, j=c; i<j; i += 1){
				ltema = temas[i];
				try{
					if(ltema.escondido !== "sim"){
						textoTema = i3GEO.arvoreDeCamadas.montaTextoTema(ltema);
						if(textoTema !== ""){
							temaNode = new YAHOO.widget.HTMLNode(
								{expanded:this.EXPANDIDA,html:textoTema,id:ltema.name,tipo:"tema",enableHighlight:false},
								tempNode
							);
							if(this.PERMITEEXPANDIRTEMAS === true){
								if(this.EXPANDESOLEGENDA === false)
								{temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, 1);}
								else
								{temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraLegenda, 1);}
							}
						}
					}
				}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
			}
		}
		else{
			nk = temas.length;
			c = grupoLayers.length;
			//grupos
			for(i=0;i<c; i += 1){
				temp = "";
				if(grupoLayers[i].icone && grupoLayers[i].icone === true){
					temp += "<p style="+estilo+" ><input class=inputsb style=cursor:pointer onclick='i3GEO.arvoreDeCamadas.ligaDesligaTemas(\""+i3GEO.configura.grupoLayers[i].layers+"\",this.checked)' type=checkbox title='Ligar/desligar temas do grupo' />&nbsp;";
				}
				temp += "<span style="+estilo+";vertical-align:top ><b>"+grupoLayers[i].nome+"</b></span></p>";
				d = this.EXPANDIDA;
				if(grupoLayers[i].expandido && grupoLayers[i].expandido === true)
				{d = true;}
				grupoNode = new YAHOO.widget.HTMLNode({enableHighlight:false,html:temp,expanded:d}, tempNode);
				n = grupoLayers[i].layers.length;
				//layers de um grupo
				for(j=0;j<n; j += 1){
					//busca na lista de temas
					for(k=0;k<nk; k += 1){
						ltema = temas[k];
						if(ltema.name === grupoLayers[i].layers[j]  && ltema.escondido === "nao"){
							textoTema = i3GEO.arvoreDeCamadas.montaTextoTema(ltema);
							if(textoTema !== ""){
								d = {enableHighlight:false,expanded:i3GEO.arvoreDeCamadas.EXPANDIDA,html:textoTema,id:ltema.name,tipo:"tema"};
								if(grupoLayers[i].dinamico && grupoLayers[i].dinamico === true)
								{temaNode = new YAHOO.widget.HTMLNode(d, grupoNode);}
								else
								{temaNode = new YAHOO.widget.HTMLNode(d, tempNode);}
								temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, 1);
								incluidos.push(ltema.name);
							}
						}
					}
				}
			}
			//inclui os temas n�o agrupados
			grupoNode = new YAHOO.widget.HTMLNode({expanded:false,enableHighlight:false,html:"<b>Outros</b>"}, tempNode);
			c = incluidos.length;
			for(k=0;k<nk; k += 1){
				ltema = temas[k];
				n = false;
				for(j=0;j<c; j += 1){
					if(incluidos[j] === ltema.name || ltema.escondido.toLowerCase() === "sim")
					{n = true;}
				}
				if (n === false){
					temaNode = new YAHOO.widget.HTMLNode({enableHighlight:false,expanded:false,html:i3GEO.arvoreDeCamadas.montaTextoTema(ltema),id:ltema.name,tipo:"tema"}, grupoNode, i3GEO.arvoreDeCamadas.EXPANDIDA,true);
					temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, 1);
				}
			}
		}
		document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).style.textAlign="left";
		i3GEO.arvoreDeCamadas.ARVORE.draw();
		if(this.ARRASTARORDEM === true || this.ARRASTARLIXEIRA === true)
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
		i3GEO.mapa.ativaTema(i3GEO.temaAtivo);
		i3GEO.arvoreDeCamadas.verificaAbrangenciaTemas();
		if(this.VERIFICAABRANGENCIATEMAS === true && i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.arvoreDeCamadas.verificaAbrangenciaTemas()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.arvoreDeCamadas.verificaAbrangenciaTemas()");}
	},
	/*
	Function: ligaDesligaTemas

	Marca ou desmarca os checkbox da �rvore de uma lista de temas

	Parametros:

	lista {string} - lista, separada por v�rgulas, dos c�digos dos temas

	status {boolean} - marca ou desmarca
	*/
	ligaDesligaTemas: function(lista,status){
		var c,n,i,aplica = false;
		lista = lista.split(",");
		n = lista.length;
		for(i=0;i<n;i+=1){
			c = i3GEO.arvoreDeCamadas.capturaCheckBox(lista[i]);
			if(c.checked !== status)
			{aplica = true;}
			c.checked = status;
			if(aplica === true && i3GEO.Interface.ATUAL !== "padrao")
			{c.onclick.call();}
		}
		if(aplica === true && i3GEO.Interface.ATUAL === "padrao")
		{i3GEO.arvoreDeCamadas.aplicaTemas();}
	},
	/*
	Function: ativaDragDrop

	Ativa a funcionalidade de arrastar um tema para mudar sua ordem de desenho ou excluir do mapa
	*/
	ativaDragDrop: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.ativaDragDrop()");}
		var Dom = YAHOO.util.Dom,
			Event = YAHOO.util.Event,
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
			YAHOO.util.Dom.setStyle(this.getDragEl(), "opacity", 0.67); // The proxy is slightly transparent
			this.goingUp = false;
			this.lastY = 0;
		};
		YAHOO.extend(
			YAHOO.example.DDList, YAHOO.util.DDProxy, {
				startDrag: function(x, y){
					var dragEl,clickEl,
						Dom = YAHOO.util.Dom; 
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
							var Dom = YAHOO.util.Dom;
							Dom.setStyle(proxyid, "visibility", "hidden");
							Dom.setStyle(thisid, "visibility", "");
						}
					);
					a.animate();
					YAHOO.util.Dom.setStyle('i3geo_lixeira', 'border', '0px solid blue');
				},
				onDragDrop: function(e, id){
					var pt,region,tema,destEl,els,lista,noid,temp,
						DDM = YAHOO.util.DragDropMgr,
						Dom = YAHOO.util.Dom;
					if (DDM.interactionInfo.drop.length === 1){
						pt = DDM.interactionInfo.point; 
						region = DDM.interactionInfo.sourceRegion; 
						if (!region.intersect(pt)){
							DDM.refreshCache();
							//exclui tema
							if(DDM.getDDById(id).id === "i3geo_lixeira"){
								if(i3GEO.arvoreDeCamadas.ARRASTARLIXEIRA === true){
									(new YAHOO.util.Anim("i3geo_lixeira", { opacity: { from: 0, to: 1 } },3, YAHOO.util.Easing.easeOutStrong)).animate();
									tema = (this.getEl()).id.split("arrastar_")[1];
									i3GEO.tema.exclui(tema);
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
									//i3GEO.contadorAtualiza++;
									temp = function(retorno){
										i3GEO.atualiza(retorno);
										if(i3GEO.Interface.ATUAL === "openlayers")
										{i3GEO.Interface.openlayers.ordenaLayers();}
									};
									i3GEO.php.reordenatemas(temp,lista);
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
				onDragOver: function(e, id){
					var srcEl,destEl;
					srcEl = this.getEl();
					destEl = YAHOO.util.Dom.get(id);
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
		var d,conteudo,opcoesNode,idtema,ltema,farol,mfarol,tnome,iconesNode,
			imb = i3GEO.util.$im("branco.gif");
		idtema = node.data.id;
		ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		if(i3GEO.arvoreDeCamadas.OPCOESICONES === true){
			//
			//define o farol indicativo da compatibilidade de escala do mapa com a fonte do layer
			//
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
			tnome = "&nbsp;<img id='farol"+ltema.name+"' src='"+i3GEO.util.$im(farol)+"' title='"+mfarol+"' />" +
			"&nbsp;<img  id='idx"+ltema.name+"' class='x' src='"+imb+"' title='"+$trad("t12")+"' onclick='i3GEO.tema.exclui(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t12a")+"','exclui')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />" +
			"&nbsp;<img class='sobe' src='"+imb +"' title='"+$trad("t13")+"' onclick='i3GEO.tema.sobe(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t14")+"','sobe')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />" +
			"&nbsp;<img class='desce' src='"+imb +"' title='"+$trad("t15")+"' onclick='i3GEO.tema.desce(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t16")+"','desce')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />" +
			"&nbsp;<img class='fonte' src='"+imb +"' title='"+$trad("a9")+"' onclick='i3GEO.tema.fonte(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("a9")+"','fonte')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			//a opera��o de zoom para o tema n�o funciona na interface flamingo
			if( (ltema.zoomtema === "sim") && (i3GEO.Interface.ATUAL !== "flamingo"))
			{tnome += "&nbsp;<img class='extent' src='"+imb +"' title='"+$trad("t17")+"' onclick='i3GEO.tema.zoom(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t18")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";}
			iconesNode = new YAHOO.widget.HTMLNode({html:tnome,enableHighlight: false,isLeaf:true,expanded:false}, node);
			if(ltema.permitecomentario.toLowerCase() !== "nao" && i3GEO.arvoreDeTemas.OPCOESADICIONAIS.comentarios === true)
			{
				temp = i3GEO.configura.locaplic+"/ms_criamapa.php?layers="+ltema.name;
				tnome = i3GEO.social.compartilhar("",temp,temp,"semtotal");
				iconesNode = new YAHOO.widget.HTMLNode({html:tnome,enableHighlight:false,isLeaf:true,expanded:false},node);
			}
		}
		if(i3GEO.arvoreDeCamadas.OPCOESTEMAS === true){
			opcoesNode = new YAHOO.widget.HTMLNode({html:$trad("t18a"),idopcoes:ltema.name,identifica:ltema.identifica,enableHighlight:false,expanded:false}, node);
			opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraOpcoes, 1);
		}
		if(i3GEO.arvoreDeCamadas.OPCOESLEGENDA === true){
			opcoesNode = new YAHOO.widget.HTMLNode({html:$trad("p3"),idlegenda:ltema.name,enableHighlight:false,expanded:i3GEO.arvoreDeCamadas.LEGENDAEXPANDIDA}, node);
			opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraLegenda, 1);
		}
		node.loadComplete();
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
		var tnome,d,n,temp,
			idtema = node.data.idopcoes,
			ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		if(navm)
		{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t19")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+$trad("t20")+"</span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=42' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","tr"+ltema.name,"","3",ltema.transparency)+"&nbsp;<a  class='tic' onclick='i3GEO.tema.mudatransp(\""+ltema.name+"\")' href='#' /a>";}
		else
		{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t19")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+$trad("t20")+"</span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=42' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","tr"+ltema.name,"","3",ltema.transparency)+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudatransp(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";}
		n = new YAHOO.widget.HTMLNode({expanded:false,enableHighlight:false,isLeaf:true,html:tnome}, node);
		if(navm)
		{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t21a")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />"+$trad("t21")+" </span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=43' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","nn"+ltema.name,"","8","")+"&nbsp;<a  class='tic' onclick='i3GEO.tema.mudanome(\""+ltema.name+"\")' href='#' />";}
		else
		{tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t21a")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />"+$trad("t21")+" </span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=43' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","nn"+ltema.name,"","10","")+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudanome(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";}

		n = new YAHOO.widget.HTMLNode({expanded:false,enableHighlight:false,isLeaf:true,html:tnome}, node);
		if ((ltema.type < 3) && (ltema.connectiontype !== 7)){
			if(i3GEO.Interface.ATUAL !== "flamingo")
			{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t22"),$trad("t23"),'i3GEO.tema.dialogo.procuraratrib(\"'+ltema.name+'\")',node);}
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t24"),$trad("t25"),'i3GEO.tema.dialogo.toponimia(\"'+ltema.name+'\")',node);
			if(ltema.identifica.toLowerCase() === "sim" || ltema.identifica === "")
			{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t26"),$trad("t27"),'i3GEO.tema.dialogo.etiquetas(\"'+ltema.name+'\")',node);}
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t28"),$trad("t29"),'i3GEO.tema.dialogo.filtro(\"'+ltema.name+'\")',node);
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t30"),$trad("t31"),'i3GEO.tema.dialogo.tabela(\"'+ltema.name+'\")',node);
			if(i3GEO.parametros.versaoms > 4){
				i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t37"),$trad("t37"),'i3GEO.tema.dialogo.graficotema(\"'+ltema.name+'\")',node);
			}
		}
		if (ltema.type < 4){
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t32"),$trad("t33"),'i3GEO.tema.dialogo.editaLegenda(\"'+ltema.name+'\")',node);
		}
		if(i3GEO.Interface.ATUAL !== "googlemaps" && i3GEO.Interface.ATUAL !== "googleearth" && i3GEO.Interface.ATUAL !== "flamingo"){
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t34"),$trad("t35"),'i3GEO.navega.destacaTema.inicia(\"'+ltema.name+'\")',node);
		}
		if(i3GEO.Interface.ATUAL !== "padrao" &&  i3GEO.Interface.ATUAL !== "googleearth"  && i3GEO.Interface.ATUAL !== "flamingo"){
			i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t42"),$trad("t42"),'i3GEO.tema.dialogo.cortina(\"'+ltema.name+'\")',node);
		}
		//as op��es SLD foram migradas para a ferramenta de edi��o de legenda
		//i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t38"),$trad("t39"),'i3GEO.tema.dialogo.sld(\"'+ltema.name+'\")',node);
		//i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t43"),$trad("t43"),'i3GEO.tema.dialogo.aplicarsld(\"'+ltema.name+'\")',node);
		if(ltema.editorsql.toLowerCase() === "sim")
		{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t40"),$trad("t41"),'i3GEO.tema.dialogo.editorsql(\"'+ltema.name+'\")',node);}
		if(ltema.permitecomentario.toLowerCase() !== "nao" && i3GEO.arvoreDeTemas.OPCOESADICIONAIS.comentarios === true)
		{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t45"),$trad("t45"),'i3GEO.tema.dialogo.comentario(\"'+ltema.name+'\")',node);}
		if(i3GEO.parametros.editor === "sim")
		{i3GEO.arvoreDeCamadas.adicionaOpcaoTema($trad("t44"),"<span style=color:red title='Apenas usu�rios editores podem ver essa op��o' >"+$trad("t44")+"</span>",'i3GEO.tema.dialogo.salvaMapfile(\"'+ltema.name+'\")',node);}
		node.loadComplete();
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
		var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+dica+"','');\" onclick="+onclick+">"+titulo+" </a>",
		temp = new YAHOO.widget.HTMLNode({html:tnome,enableHighlight:false,isLeaf:true,expanded:false}, node);
	},
	/*
	Function: mostraLegenda

	Monta os n�s filhos do n� "legenda"

	Parametro:

	node - {YAHOO.widget.HTMLNode}
	*/
	mostraLegenda: function(node){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.mostraLegenda()");}
		var retorna,
			idtema = node.data.idlegenda,
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
			nodeLeg = new YAHOO.widget.HTMLNode({html:incluir,enableHighlight:false,expanded:false}, node);
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
					if (elementos[i].type === "checkbox")
					{inputs.push(elementos[i]);}
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
		i3GEO.configura.templateLegenda = i3GEO.configura.templateLegenda !== "" ? i3GEO.php.criaLegendaHTML(retorna,idtema,i3GEO.configura.templateLegenda) : i3GEO.php.criaLegendaHTML(retorna,idtema);
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
	},
	/*
	Function: escolheCorClasse

	Abre uma janela para escolher uma nova cor para o s�mbolo da classe.

	A chamada dessa fun��o � definida em aplicmap/legenda2.htm

	Parametro:

	leg {Object input} - objeto do tipo INPUT com o id da classe e o id do tema
	*/
	escolheCorClasse: function (leg){
		//cria um elemento que receber� a escolha da cor e que ir� disparar a fun��o de mudan�a de cor da classe
		var obj,novoel;
		leg = leg.parentNode.getElementsByTagName("input")[0];
		if(!$i("tempinputcorclasse")){
			novoel = document.createElement("input");
			novoel.id = "tempinputcorclasse";
			novoel.style.display="none";
			novoel.alt = "objeto criado para guardar dados da funcao escolohercorclasse";
			novoel.onchange = "";
			document.body.appendChild(novoel);
		}
		obj = $i("tempinputcorclasse");
		obj.value = "";
		obj.tema = leg.name;
		obj.idclasse = leg.value;
		obj.onchange = function(){
			var obj = $i("tempinputcorclasse");
			i3GEO.tema.alteracorclasse(obj.tema,obj.idclasse,obj.value);
		};
		i3GEO.util.abreCor("","tempinputcorclasse");
	},
	/*
	Function: inverteStatusClasse

	Liga ou desliga uma classe da legenda.

	A chamada dessa fun��o � definida em aplicmap/legenda2.htm

	Parametro:

	leg {Object input} - objeto do tipo INPUT com o id da classe e o id do tema
	*/
	inverteStatusClasse: function (leg){
		var temp = function(retorno){
			i3GEO.atualiza();
			i3GEO.Interface.atualizaTema(retorno,leg.name);
		};
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
		var ck,html,display="none",estilo,
			iu = i3GEO.util;
		if(tema.status*1 === 2)
		{ck = ' CHECKED ';}
		else
		{ck = "";}
		//
		//verifica se o filtro de camadas est� ativo
		//
		if(this.FILTRO !== ""){
			if(this.FILTRO === "desligados" && ck !== "")
			{return "";}
			if(this.FILTRO === "ligados" && ck === "")
			{return "";}
			if(this.FILTRO === "selecionados" && tema.sel !== "sim")
			{return "";}
			if(this.FILTRO === "download" && tema.download.toLowerCase() !== "sim")
			{return "";}
			if(this.FILTRO === "wms" && tema.connectiontype*1 !== 7)
			{return "";}
			if(this.FILTRO === "raster" && tema.type*1 !== 3)
			{return "";}
			if(this.FILTRO === "toponimia" && tema.type*1 !== 4)
			{return "";}
		}
		estilo = navm ? "text-align:left;font-size:11px;vertical-align:middle;display:table-cell;" : "text-align:left;font-size:11px;vertical-align:vertical-align:top;padding-top:4px;";
		html = "<p onclick='i3GEO.mapa.ativaTema(\""+tema.name+"\")' id='arrastar_"+tema.name+"' style='"+estilo+"' ><input class=inputsb style='cursor:pointer;' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t3")+"','ligadesliga')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" type='checkbox' name=\"layer\" value='"+tema.name+"' "+ ck ;
		if(i3GEO.arvoreDeCamadas.ATIVATEMA !== "")
		{html += "onclick=\""+i3GEO.arvoreDeCamadas.ATIVATEMA+"\"";}
		else
		{html += "onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeCamadas.aplicaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicarCamadas\",this)'";}
		html += " />";
		//
		//inclui icone do tema
		//
		estilo = navm ? "cursor:pointer;vertical-align:35%;padding-top:0px;" : "cursor:pointer;vertical-align:top;";
		if (tema.iconetema !== "" && i3GEO.arvoreDeCamadas.ICONETEMA === true)
		{html += "&nbsp;<img style='"+estilo+"' src='"+tema.iconetema+"' />";}
		//
		//inclui icone indicando que o tema muda conforme a escala
		//
		if (tema.contextoescala === "sim")
		{html += "&nbsp;<img style='"+estilo+"' src="+iu.$im("contextoescala.png")+" title='"+$trad("t36")+"' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t36")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";}
		if (tema.sel === "sim"){
			html += "&nbsp;<img style='"+estilo+"' src="+iu.$im("estasel.png")+" title='"+$trad("t4")+"' onclick='i3GEO.tema.limpasel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','limpasel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
			html += "&nbsp;<img style='"+estilo+"' src="+iu.$im("zoomsel.gif")+" title='"+$trad("t4a")+"' onclick='i3GEO.tema.zoomsel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','zoomsel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";
		}
		if (tema.download.toLowerCase() === "sim")
		{html += "&nbsp;<img style='"+estilo+"' src="+iu.$im("down1.gif") +" title='download' onclick='i3GEO.tema.dialogo.download(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t6")+"','download')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />";}
		estilo = navm ? "cursor:move;vertical-align:35%;padding-top:0px;color:black;" : "cursor:move;vertical-align:top;color:black;";
		if(i3GEO.arvoreDeCamadas.AGUARDALEGENDA)
		{html += "&nbsp;<span id='ArvoreTituloTema"+tema.name+"' style='"+estilo+"' onclick=\"i3GEO.tema.mostralegendajanela('"+tema.name+"','"+tema.tema+"','abrejanela');\" onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7a")+"','');i3GEO.tema.mostralegendajanela('"+tema.name+"','"+tema.tema+"','ativatimer');\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('');i3GEO.tema.mostralegendajanela('"+tema.name+"','','desativatimer');\" >"+tema.tema+"</span>";}
		else
		{html += "&nbsp;<span id='ArvoreTituloTema"+tema.name+"' style='"+estilo+"' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+tema.tema+"</span>";}
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
		var farol,l,ltema,escala,
			iu = i3GEO.util,
			im = i3GEO.configura.locaplic+"/imagens/",
			camadas = i3GEO.arvoreDeCamadas.CAMADAS;
		farol = "maisamarelo.png";
		l = camadas.length-1;
		if (l >= 0){
			do{
				ltema = camadas[l];
				escala = ltema.escala;
				if (escala*1 < mapscale*1)
				{farol = "maisverde.png";}
				if (escala*1 > mapscale*1)
				{farol = "maisvermelho.png";}
				if (escala*1 === 0)
				{farol = "maisamarelo.png";}
				iu.defineValor("farol"+ltema.name,"src",im+farol);
			}
			while(l--);
		}
	},
	/*
	Function: aplicaTemas

	Refaz o mapa ligando e desligando os temas conforme consta na �rvore de camadas ou ligando/desligando todos

	Parametro:

	tipo {String} - tipo de opera��o normal|ligartodos|desligartodos a op��o 'normal' ir� desligar/ligar o que estiver marcado
	*/
	aplicaTemas: function(tipo){
		if(arguments.length === 0)
		{tipo = "normal";}
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.aplicaTemas()");}
		var t,temp,ligar,desligar;
		if(tipo === "normal")
		{t = i3GEO.arvoreDeCamadas.listaLigadosDesligados("mantem");}
		if(tipo === "ligartodos"){
			t = i3GEO.arvoreDeCamadas.listaLigadosDesligados("marca");
			if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["googleearth","openlayers","googlemaps"]))
			{return;}
		}
		if(tipo === "desligartodos"){
			t = i3GEO.arvoreDeCamadas.listaLigadosDesligados("desmarca");
			if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["googleearth","openlayers","googlemaps"]))
			{return;}
		}
		//
		//zera o contador de tempo
		//
		temp = function(){
			i3GEO.atualiza();
			i3GEO.janela.fechaAguarde("redesenha");
		};
		try{clearTimeout(tempoBotaoAplicar);}
		catch(erro){
			if(typeof(console) !== 'undefined'){console.error(erro);}
		}
		tempoBotaoAplicar = "";
		i3GEO.janela.abreAguarde("redesenha",$trad("o1"));
		if(tipo === "normal"){
			i3GEO.php.ligatemas(temp,t[1].toString(),t[0].toString());
			return;
		}
		if(tipo === "ligartodos"){
			i3GEO.php.ligatemas(temp,"",t[2].toString());
			return;
		}
		if(tipo === "desligartodos"){
			i3GEO.php.ligatemas(temp,t[2].toString(),"");
		}
	},
	/*
	Function: listaLigadosDesligados

	Lista os temas que est�o ligados e os que est�o desligados
	tendo como fonte de busca os checkbox existentes na �rvore.

	Esse m�todo � mais demorado pois varre a �rvore toda. Por�m, obt�m o status verdadeiro do tema.

	Parametro:

	tipo {String} - mantem|marca|desmarca marca, desmarca ou mant�m o checkbox ap�s identificar seu status atual

	Return:
	{Array} - array de arrays com os c�digos dos temas [0]=ligados [1]=desligados [2]=todos na ordem encontrada
	*/
	listaLigadosDesligados: function(tipo){
		if(!$i(i3GEO.arvoreDeCamadas.IDHTML))
		{return [[],[],[]];}
		if(arguments.length === 0)
		{tipo = "manter";}
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.listaLigadosDesligados()");}
		var no,cs,csn,j,c,temp,
			nos = i3GEO.arvoreDeCamadas.ARVORE.getNodesByProperty("tipo","tema"),
			ligados = [],
			desligados = [],
			todos = [],
			n = nos.length,
			i=0,
			ATUAL = i3GEO.Interface.ATUAL;
		do{
			try{
				no = nos[i].getEl();
				cs = no.getElementsByTagName("input");
				csn = cs.length;
				for(j=0;j<csn;j += 1){
					c = cs[j];
					if(c.name==="layer"){
						temp = c.checked === true ? ligados.push(c.value) : desligados.push(c.value);
						todos.push(c.value);
						if(tipo === "marca"){
							c.checked = true;
							if(i3GEO.util.in_array(ATUAL,["googleearth","openlayers","googlemaps"])){
								i3GEO.Interface[ATUAL].ligaDesliga(c);
							}
						}
						if(tipo === "desmarca"){
							c.checked = false;
							if(i3GEO.util.in_array(ATUAL,["googleearth","openlayers","googlemaps"])){
								i3GEO.Interface[ATUAL].ligaDesliga(c);
							}
						}
					}
				}
				i++;
			} catch(e){i += 1;}
		}
		while(i<n);
		return ([ligados,desligados,todos]);
	},
	/*
	Function: capturaCheckBox

	Retorna o objeto input (check box) que corresponde a uma determinada camada na �rvore.

	Parametro:

	tema {String} - c�digo do tema ao qual o elemento se refere

	Return:
	{Objeto} - objeto do tipo input checkbox
	*/
	capturaCheckBox: function(tema){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.capturaCheckBox()");}
		if(!$i(i3GEO.arvoreDeCamadas.IDHTML))
		{return;}
		var nos,ligados,desligados,todos,n,i,no,cs,csn,j,c;
		nos = i3GEO.arvoreDeCamadas.ARVORE.getNodesByProperty("tipo","tema");
		n = nos.length;
		i=0;
		do{
			try{
				no = nos[i].getEl();
				cs = no.getElementsByTagName("input");
				csn = cs.length;
				for(j=0;j<csn;j += 1){
					c = cs[j];
					if(c.name==="layer" && c.value === tema){
						return c;
					}
				}
				i += 1;
			} catch(e){i += 1;}
		}
		while(i<n);
		return (null);
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
			for (i=0;i<novon;i += 1){
				if(novo[i].name !== atual[i].name)
				{return (false);}
				if(novo[i].tema !== atual[i].tema)
				{return (false);}
				if(novo[i].sel !== atual[i].sel)
				{return (false);}
				if(novo[i].status !== atual[i].status)
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
		var i,
			v = "",
			c = i3GEO.arvoreDeCamadas.CAMADAS.length;
		for (i=0; i<c; i += 1){
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
				if(ltema.escondido !== "sim"){
					temp = ltema[propriedade];
					if(operador === "igual"){
						if(temp === valor)
						{resultado.push(ltema);}
					}
					if(operador === "diferente"){
						if(temp !== valor)
						{resultado.push(ltema);}
					}
				}
				i += 1;
		}
			while(i < nelementos);
		}
		return resultado;
	},
	/*
	Function: alteraPropCamadas

	Altera o valor de uma propriedade de um tema do objeto i3GEO.arvoreDeCamadas.CAMADAS

	Parameters:

	propriedade {string} - propriedade que ser� modificada

	valor - novo valor

	camada {string} - c�digo da camada
	*/
	alteraPropCamadas: function(propriedade,valor,camada){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.alteraPropCamadas()");}
		var resultado = [],
			i = 0,
			temp,
			nelementos = i3GEO.arvoreDeCamadas.CAMADAS.length,
			ltema;
		if (nelementos > 0){
			do{
				ltema = i3GEO.arvoreDeCamadas.CAMADAS[i];
				if(ltema.name === camada){
					ltema[propriedade] = valor;
				}
				i += 1;
		}
			while(i < nelementos);
		}
	},
	/*
	Function: verificaAbrangenciaTemas

	Verifica se um tema est� ou n�o na abrang�ncia espacial do mapa atual modificando a cor com que o nome � mostrado na �rvore
	*/
	verificaAbrangenciaTemas: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.verificaAbrangenciaTemas()");}
		if(i3GEO.arvoreDeCamadas.VERIFICAABRANGENCIATEMAS === false)
		{return;}
		try{
			var resultado = [],
				i = 0,
				temp,
				nelementos = i3GEO.arvoreDeCamadas.CAMADAS.length,
				ltema,
				intersec,
				node;
			if (nelementos > 0){
				do{
					ltema = i3GEO.arvoreDeCamadas.CAMADAS[i];
					temp = ltema.exttema;

					if(temp !== ""){
						if(i3GEO.util.intersectaBox(temp,i3GEO.parametros.mapexten) === false){
							$i("ArvoreTituloTema"+ltema.name).style.color = "gray";
						}
						else{
							$i("ArvoreTituloTema"+ltema.name).style.color = "black";
						}
					}
					i += 1;
				}
				while(i < nelementos);
			}
		}
		catch(e){}
	},
	/*
	Function: verificaAplicaExtensao

	Verifica se algum tema est� marcado com o metadado Aplicaextensao. Retorna a primeira ocorr�ncia se houver

	Return:

	{string} c�digo do tema ou ""
	*/
	verificaAplicaExtensao: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.arvoreDeCamadas.verificaAplicaExtensao()");}
		var i = 0,
			temp = "",
			nelementos = i3GEO.arvoreDeCamadas.CAMADAS.length,
			ltema;
		try{
			if (nelementos > 0){
				do{
					ltema = i3GEO.arvoreDeCamadas.CAMADAS[i];
					if(ltema.aplicaextensao === "sim"){
						temp = ltema.name;
					}
					i += 1;
				}
				while(i < nelementos);
			}
		}
		catch(e){return "";}
		return temp;
	},
	/*
	Classe: i3GEO.arvoreDeCamadas.dialogo

	Abre as telas de di�logo das op��es de manipula��o da �rvore
	*/
	dialogo: {
		/*
		Function: abreFiltro
		
		Abre a janela de di�logo para o usu�rio escolher ou alterar o filtro aplicado � �rvore
		*/
		filtro: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.arvoreDeCamadas.dialogo.filtro()","filtroarvore","filtroarvore");
		}
	}
};