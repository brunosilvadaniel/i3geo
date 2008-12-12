/*
Class:: i3GEO.janela

Abre janelas flutuantes

As janelas s�o criadas por meio da biblioteca YUI

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
i3GEO.janela = {
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
		//esconde o mapa na interface flamingo se estiver ativa
		//isso � necess�rio pq em flash as janelas n�o ficam por cima
		//
		if($i("flamingoi")){$i("flamingoi").style.display="none";}
		//
		//esconde o box de zoom e outros objetos tempor�rios se estiverem vis�veis
		//
		if($i("boxg"))
		{$i("boxg").style.display = "none";}
		if($i("boxpin"))
		{$i("boxpin").style.display = "none";}		
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
		}
		
		var fix = false;
		if(nx == ""){var fix = true;}
		YAHOO.janelaDoca.xp.panel = new YAHOO.widget.ResizePanel(id, { modal:modal, width: wlargura_, fixedcenter: fix, constraintoviewport: false, visible: true, iframe:false} );
		if(nx != ""){
			var pos = new Array(nx,ny);
			YAHOO.janelaDoca.xp.panel.moveTo(pos[0],pos[1]+50);
		}
		YAHOO.janelaDoca.xp.panel.render();
		YAHOO.util.Event.addListener(YAHOO.janelaDoca.xp.panel.close, "click", i3GEO.janela.fecha);
		return(new Array(YAHOO.janelaDoca.xp.panel,$i(id+"_cabecalho"),$i(id+"_corpo")));
	},
	fecha: function(){
		/*
		$i(id).style.display = "none";
		$i(id).src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca.xp.panel.close, "click");
		YAHOO.janelaDoca.xp.panel.destroy();
		*/
		if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
		{mudaiconf("pan");}
		//esconde o box do google
		if ($i("boxg"))
		{$i("boxg").style.display = "none";}
		if ($i("boxpin"))
		{$i("boxpin").style.display = "none";}
		//fecha o container de desenho de elementos na tela
		if($i("divGeometriasTemp"))
		{richdraw.fecha();}
		limpacontainerf();
		if($i("flamingoi")){$i("flamingoi").style.display="block";}
		//executa as fun��es de fechamento
		if(i3GEO.janela.ANTESFECHA){
			for(i=0;i<i3GEO.janela.ANTESFECHA.length;i++)
			{eval(i3GEO.janela.ANTESFECHA[i]);}
		}
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
		eval ('YAHOO.aguarde.'+id+'.setHeader("<span><img src=\'"+g_locaplic+"/imagens/aguarde.gif\' /></span>")');
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
	},
	/*
	Function: fechaAguarde
	
	Fecha uma janela do tipo aguarde
	
	Paremeters:
	
	id {String} - id da janela que ser� fechada
	*/
	fechaAguarde: function(id){
		try{eval('YAHOO.aguarde.'+id+'.destroy()');}
		catch(e){};
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
