/*
Title: Janelas

File: i3geo/classesjs/classe_janela.js

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
/*
Class:: i3GEO.janela

Abre janelas flutuantes

As janelas s�o criadas por meio da biblioteca YUI
*/
i3GEO.janela = {
	/*
	Variable: TIPS
	
	Lista os tips inseridos no mapa, possibilitando sua remo��o em lote
	*/
	TIPS: new Array(),
	/*
	Property: ANTESCRIA
	
	Lista com os nomes das fun��es que ser�o executadas antes de abrir a janela.
	
	Este � um array que pode ser modificado utilizando-se as fun��es javascript de
	manipula��o de arrays.
	
	Por default, ao criar uma janela � executada a fun��o i3GEO.janela.prepara

	Type:
	{Array}
	*/
	ANTESCRIA: new Array(
		"i3GEO.janela.prepara()"
	),
	/*
	Property: ANTESFECHA
	
	Lista com os nomes das fun��es que ser�o executadas ap�s fechar a janela.
	
	Este � um array que pode ser modificado utilizando-se as fun��es javascript de
	manipula��o de arrays.
	
	Por default, ao fechar uma janela � executada a fun��o i3GEO.janela.fecha

	Type:
	{Array}
	*/
	ANTESFECHA: new Array(),
	/*
	Function: prepara
	
	Executa fun��es default antes de abrir a janela
	*/
	prepara: function(){
		//
		//esconde o box de zoom e outros objetos tempor�rios se estiverem vis�veis
		//
		i3GEO.util.escondePin();
		i3GEO.util.escondeBox();
	},
	/*
	Function: cria
	
	Cria uma janela flutuante.
	
	Vc pode obter o elemento HTML interno da janela por meio de:
	
	{retorno}[2].innerHTML
	
	Parameters:
	
	wlargura {integer} - largura da janela em pixels
	
	waltura {integer} - altura da janela em pixels
	
	wsrc {String} - URL que ser� inclu�da no SRC do iframe interno da janela. Se for "", o iframe n�o ser� criado
	
	nx {Integer} - posi��o x da janela em pixels. Se for "" ser� fixada no centro
	
	ny {Integer} - posi��o y da janela em pixels. Se for "" ser� fixada no centro

	id {String} - (opcional) nome que ser� dado ao id que conter� a janela. Se n�o for definido, ser� usado o id="wdoca". O
		id do iframe interno � sempre igual ao id + a letra i. Por default, ser� "wdocai".
		O id do cab�alho ser� igual a id+"_cabecalho" e o id do corpo ser� id+"_corpo"
	
	modal {Boolean} - (opcional) indica se a janela bloquear� as inferiores ou n�o. Por default � false
	
	Return:
	
	{Array} Array contendo: objeto YAHOO.panel criado,elemento HTML com o cabecalho, elemento HTML com o corpo
	*/
	cria: function(wlargura,waltura,wsrc,nx,ny,texto,id,modal){
		//executa as fun��es de prepara��o
		//YAHOO.log("Cria janela", "janela");
		if(i3GEO.janela.ANTESCRIA){
			for(i=0;i<i3GEO.janela.ANTESCRIA.length;i++)
			{eval(i3GEO.janela.ANTESCRIA[i]);}
		}
		//
		//por default o id ser� 'wdoca'
		//
		if (arguments.length < 7 || id == ""){
			var id = "wdoca";
			var modal = false;
		}
		if (arguments.length == 7){
			var modal = false;
		}
		var wlargura_ = parseInt(wlargura)+0+"px";
		YAHOO.namespace("janelaDoca.xp");
		if ($i(id))
		{YAHOO.janelaDoca.xp.panel.destroy();}
		var ins = '<div id="'+id+'_cabecalho" class="hd">'+texto+'</div><div id="'+id+'_corpo" class="bd">';
		if(wsrc != "")
		ins += '<iframe name="'+id+'i" id="'+id+'i" valign="top" style="border:0px white solid"></iframe>';
		ins += '</div>';
		var novoel = document.createElement("div");
		novoel.id = id;
		novoel.style.display="block";
		novoel.innerHTML = ins;
		if($i("i3geo"))
		{$i("i3geo").appendChild(novoel);}
		else
		{document.body.appendChild(novoel);}
		var wdocaiframe = $i(id+"i");
		if (wdocaiframe)
		{
			with (wdocaiframe.style){width = "100%";height=waltura;};
			wdocaiframe.style.display = "block";
			wdocaiframe.src = wsrc;
			//i3GEO.janela.ANTESFECHA.push("$i('"+id+"i').src = ''");
		}
		var fix = false;
		if(nx == "" || nx == "center"){var fix = true;}
		if(waltura == "auto")
		YAHOO.janelaDoca.xp.panel = new YAHOO.widget.Panel(id, { zIndex:5000, modal:modal, width: wlargura_,underlay:"none", fixedcenter: fix, constraintoviewport: false, visible: true, iframe:false} );	
		else
		YAHOO.janelaDoca.xp.panel = new YAHOO.widget.ResizePanel(id, { zIndex:5000, modal:modal, width: wlargura_, fixedcenter: fix, constraintoviewport: false, visible: true, iframe:false} );
		if(nx != "" && nx != "center"){
			var pos = new Array(nx,ny);
			YAHOO.janelaDoca.xp.panel.moveTo(pos[0],pos[1]+50);
		}
		YAHOO.janelaDoca.xp.panel.render();
		YAHOO.util.Event.addListener(YAHOO.janelaDoca.xp.panel.close, "click", i3GEO.janela.fecha,id);
		//YAHOO.log("Fim cria janela", "janela");
		return(new Array(YAHOO.janelaDoca.xp.panel,$i(id+"_cabecalho"),$i(id+"_corpo")));
	},
	/*
	Function: fecha
	
	Aplica a op��o definida em ANTESFECHA e elimina alguns objetos que s�o comumente adicionados por algumas opera��es do i3geo
	como richdraw, box, pin
	
	Parameters:
	
	id {String} - id da janela que ser� fechada
	*/
	fecha: function(r,id){
		//esconde o box do google
		i3GEO.util.escondePin();
		i3GEO.util.escondeBox();
		//fecha o container de desenho de elementos na tela
		if($i("divGeometriasTemp"))
		{i3GEO.desenho.richdraw.fecha();}
		if($i("flamingoi")){$i("flamingoi").style.display="block";}
		//executa as fun��es de fechamento
		if(i3GEO.janela.ANTESFECHA){
			for(i=0;i<i3GEO.janela.ANTESFECHA.length;i++)
			{eval(i3GEO.janela.ANTESFECHA[i]);}
		}
		document.body.removeChild($i(id+"_c"));
		//YAHOO.janelaDoca.xp.panel.destroy();
	},
	/*
	Function: alteraTamanho
	
	Altera o tamanho de uma janela aberta
	
	Parameters:
	
	w {Integer} - nova largura
	
	h {Integer} - nova altura
	
	id {String} - (opcional) id que identifica a janela aberta, por padr�o utiliza "wdoca"
	*/
	alteraTamanho: function(w,h,id){
		if(arguments.length == 3)
		{var i = $i(id);}
		else
		{var i = $i("wdoca");}
		if(i){
			i.style.width = w;
			i.style.height = h;
		}
	},
	/*
	Function: abreAguarde
	
	Abre uma janela com a mensagem de agurde e bloqueia cliques nomapa
	
	Parameters:
	
	id {String} - id danovajanela
	
	texto {String} - texto da janela
	*/
	abreAguarde: function(id,texto){
		//YAHOO.log("abreAguarde", "janela");
		if($i(id+"_mask"))
		{document.body.removeChild($i(id+"_mask"));}
		if($i(id+"_c"))
		{document.body.removeChild($i(id+"_c"));}
		YAHOO.namespace("aguarde."+id);
		var pos = [0,0];
		if($i("corpoMapa"))
		{var pos = YAHOO.util.Dom.getXY($i("corpoMapa"));}
		else if ($i("contemImg"))
		{var pos = YAHOO.util.Dom.getXY($i("contemImg"));}
		eval ('YAHOO.aguarde.'+id+' = new YAHOO.widget.Panel("'+id+'",{width:"240px",fixedcenter:false,underlay:"none",close:true,draggable:false,modal:true})');
		eval ('YAHOO.aguarde.'+id+'.setBody("<span style=font-size:12px; >"+texto+"</span>")');
		eval ('YAHOO.aguarde.'+id+'.body.style.height="20px"');
		eval ('YAHOO.aguarde.'+id+'.setHeader("<span><img src=\'"+i3GEO.configura.locaplic+"/imagens/aguarde.gif\' /></span>")');
		eval ('YAHOO.aguarde.'+id+'.render(document.body)');
		if($i("flamingo"))
		{eval ('YAHOO.aguarde.'+id+'.moveTo(0,0)');}
		else
		{eval ('YAHOO.aguarde.'+id+'.moveTo('+pos[0]+','+pos[1]+')');}
		eval ('YAHOO.aguarde.'+id+'.show()');
		if($i(id+"_mask"))
		{$i(id+"_mask").style.zIndex=5000;}
		if($i(id+"_c"))
		{$i(id+"_c").style.zIndex=6000;}
		//YAHOO.log("Fim abreAguarde", "janela");	
	},
	/*
	Function: tip
	
	Cria um DIV e posiciona sobre o mapa na posi��o do mouse.
	
	Parameters:
	
	cabecalho {String} - texto que ser� usado no cabe�alho (op��o fixar) (opcional)
	
	Return:
	
	ID do DIV criado
	*/
	tip: function(cabecalho){
		if(arguments.length == 0){var cabecalho = "fixar";}
		var Nid = YAHOO.util.Dom.generateId();
		var i = $i("i3geo_rosa");
		if(i)
		i.style.display="none";
		if ($i("img"))
		{$i("img").title = "";}
		//insere div para tips
		var novoel = document.createElement("div");
		novoel.id = Nid;
		novoel.style.position="absolute";
		novoel.style.zIndex=5000;
		novoel.style.textAlign="left";
		novoel.style.background="white";
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		else
		{novoel.style.opacity = ".9";}
		document.body.appendChild(novoel);
		i3GEO.janela.TIPS.push($i(Nid));
		//
		//monta o TIP com o id �nico criado
		//quando o usu�rio escolhe a op��o de fixar,
		//o div � incluido no array i3GEO.janela.TIPS
		//quando o mapa � redesenhado, esses elementos s�o exclu�dos do mapa
		//
		var res = "<div id='"+Nid+"cabecatip' style='text-align:left;background-color:rgb(240,240,240)'>";
		res += "<span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:$i(\""+Nid+"cabecatip\").innerHTML =\"\";' >"+cabecalho+"</span></div>";
		novoel.innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
		ist = novoel.style;
		ist.top = objposicaocursor.telay - 10;
		ist.left = objposicaocursor.telax - 4;
		ist.display="block";
		//
		//registra a fun��o de elimina��o dos tips
		//
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.janela.excluiTips('todos')") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.janela.excluiTips('todos')");}	
		if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.janela.excluiTips('naofixos')") < 0)
		{i3GEO.eventos.MOUSEMOVE.push("i3GEO.janela.excluiTips('naofixos')");}		
		//
		return(Nid);
	},
	/*
	Function: excluiTips
	
	Exclui os tips armazenados na vari�vel i3GEO.janela.TIPS
	
	Parameters:
	
	tipo {String} - todos|naofixos tipos de tips que ser�o exclu�dos
	*/
	excluiTips: function(tipo){
		if(i3GEO.janela.TIPS.length > 0){
			var ot = i3GEO.janela.TIPS.length-1;
			if (ot >= 0){
				do{
					if(tipo == 'todos'){
						if(i3GEO.janela.TIPS[ot]){
							var i = $i(i3GEO.janela.TIPS[ot].id);
							document.body.removeChild(i);
						}
					}
					if(tipo == 'naofixos'){
						if ($i(i3GEO.janela.TIPS[ot])){
							if($i(i3GEO.janela.TIPS[ot].id+"cabecatip").innerHTML != ""){
								document.body.removeChild($i(i3GEO.janela.TIPS[ot].id));
							}
						}
					}
				}
				while(ot--)
				if(tipo == "todos")
				{i3GEO.janela.TIPS = new Array();}
			}
		}
	},
	/*
	Function: fechaAguarde
	
	Fecha uma janela do tipo aguarde
	
	Paremeters:
	
	id {String} - id da janela que ser� fechada. Se n�o for definido, tenta fechar as janelas principais.
	*/
	fechaAguarde: function(id){
		if(arguments.length > 0){
			try{eval('YAHOO.aguarde.'+id+'.destroy()');}
			catch(e){};
		}
		else{
			i3GEO.janela.fechaAguarde("ajaxdestaca");
			i3GEO.janela.fechaAguarde("ajaxabrelente");
			i3GEO.janela.fechaAguarde("ajaxiniciaParametros");
			i3GEO.janela.fechaAguarde("i3GEO.atualiza");
			i3GEO.janela.fechaAguarde("ajaxCorpoMapaEntorno");
			i3GEO.janela.fechaAguarde("ajaxCorpoMapa");
			i3GEO.janela.fechaAguarde("ajaxLegenda");
			i3GEO.janela.fechaAguarde("ajaxReferencia");
			i3GEO.janela.fechaAguarde("ajaxEscalaGrafica");
			i3GEO.janela.fechaAguarde("montaMapa");
			i3GEO.janela.fechaAguarde("aguardedoc");
			i3GEO.janela.fechaAguarde("ajaxCorpoMapa1");		
		}
	}
};
try{
	//controle dos pain�is que podem ser redimensionados
	YAHOO.widget.ResizePanel = function(el, userConfig)
	{
    	if (arguments.length > 0) 
    	{YAHOO.widget.ResizePanel.superclass.constructor.call(this, el, userConfig);}
	};
	YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE = "yui-resizepanel";
	YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE = "resizehandle";
	YAHOO.extend(
		YAHOO.widget.ResizePanel, YAHOO.widget.Panel,{
   			init: function(el, userConfig){
    			YAHOO.widget.ResizePanel.superclass.init.call(this, el);
       			this.beforeInitEvent.fire(YAHOO.widget.ResizePanel);
       			var Dom = YAHOO.util.Dom,
           			Event = YAHOO.util.Event,
           			oInnerElement = this.innerElement,
           			oResizeHandle = document.createElement("DIV"),
           			sResizeHandleId = this.id + "_resizehandle";
       			oResizeHandle.id = sResizeHandleId;
       			oResizeHandle.className = YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE;
       			Dom.addClass(oInnerElement, YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE);
       			this.resizeHandle = oResizeHandle;
       			function initResizeFunctionality(){
           			var me = this,
               			oHeader = this.header,
               			oBody = this.body,
               			oFooter = this.footer,
               			nStartWidth,
               			nStartHeight,
               			aStartPos,
               			nBodyBorderTopWidth,
               			nBodyBorderBottomWidth,
               			nBodyTopPadding,
               			nBodyBottomPadding,
               			nBodyOffset;
           			oInnerElement.appendChild(oResizeHandle);
           			this.ddResize = new YAHOO.util.DragDrop(sResizeHandleId, this.id);
           			this.ddResize.setHandleElId(sResizeHandleId);
           			this.ddResize.onMouseDown = function(e){
               			nStartWidth = oInnerElement.offsetWidth;
               			nStartHeight = oInnerElement.offsetHeight;
               			if (YAHOO.env.ua.ie && document.compatMode == "BackCompat")
               			{nBodyOffset = 0;}
               			else{
                   			nBodyBorderTopWidth = parseInt(Dom.getStyle(oBody, "borderTopWidth"), 10);
                   			nBodyBorderBottomWidth = parseInt(Dom.getStyle(oBody, "borderBottomWidth"), 10);
                   			nBodyTopPadding = parseInt(Dom.getStyle(oBody, "paddingTop"), 10);
                   			nBodyBottomPadding = parseInt(Dom.getStyle(oBody, "paddingBottom"), 10);
                   			nBodyOffset = nBodyBorderTopWidth + nBodyBorderBottomWidth + nBodyTopPadding + nBodyBottomPadding;
               			}
               			me.cfg.setProperty("width", nStartWidth + "px");
               			aStartPos = [Event.getPageX(e), Event.getPageY(e)];
           			};
           			this.ddResize.onDrag = function(e){
               			var aNewPos = [Event.getPageX(e), Event.getPageY(e)],
                   			nOffsetX = aNewPos[0] - aStartPos[0],
                   			nOffsetY = aNewPos[1] - aStartPos[1],
                   			nNewWidth = Math.max(nStartWidth + nOffsetX, 10),
                   			nNewHeight = Math.max(nStartHeight + nOffsetY, 10),
                   			nBodyHeight = (nNewHeight - (oFooter.offsetHeight + oHeader.offsetHeight + nBodyOffset));
               			me.cfg.setProperty("width", nNewWidth + "px");
               			if (nBodyHeight < 0)
               			{nBodyHeight = 0;}
               			oBody.style.height =  nBodyHeight + "px";
               			if ($i("wdocai"))
               			{$i("wdocai").style.height = nBodyHeight;}
           			};
       			};
       			function onBeforeShow(){
       				initResizeFunctionality.call(this);
       				this.unsubscribe("beforeShow", onBeforeShow);
       			};
       			function onBeforeRender(){
           			if (!this.footer)
           			{this.setFooter("");}
           			if (this.cfg.getProperty("visible"))
           			{initResizeFunctionality.call(this);}
           			else
           			{this.subscribe("beforeShow", onBeforeShow);}
       				this.unsubscribe("beforeRender", onBeforeRender);
       			};
       			this.subscribe("beforeRender", onBeforeRender);
       			if (userConfig)
       			{this.cfg.applyConfig(userConfig, true);}
       			this.initEvent.fire(YAHOO.widget.ResizePanel);
   			},
   			toString: function()
   			{return "ResizePanel " + this.id;}
		}
	);
}
catch(e){};
YAHOO.log("carregou classe janela", "Classes i3geo");
