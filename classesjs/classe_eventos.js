/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: false */
/*
Title: Eventos

Arquivo:

i3geo/classesjs/classe_eventos.js

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
objposicaocursor = {
	ddx: "",
	ddy: "",
	dmsx: "",
	dmsy: "",
	telax: "",
	telay: "",
	imgx: "",
	imgy: "",
	refx: "",
	refy: ""
};

/*
Classe: i3GEO.eventos

Controla as opera��es que s�o executadas em eventos que ocorrem no mapa.

As listas de opera��es consistem em vari�veis com nomes de fun��es.

As listas s�o inicializadas com algunmas fun��es j� embutidas, mas podem ser acrescentadas outras.

Exemplos:

	Para incluir uma fun��o em um determinado evento utilize

	if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaNumerica()") < 0)
	
	{i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaNumerica()");}		

	Para remover utilize
	
	i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaNumerica()");
*/
i3GEO.eventos = {
	/*
	Propriedade: NAVEGAMAPA
	
	Armazena as fun��es que ser�o executadas quando � feita uma opera��o de navega��o sobre o mapa.
	
	Tipo:
	{Array}
	
	Default:
	{["atualizaEscalaNumerica()"]}
	*/
	NAVEGAMAPA: [],
	/*
	Propriedade: MOUSEPARADO

	Armazena as fun��es que ser�o executadas quando o usu�rio estaciona o mouse sobre o mapa 
	por alguns instantes.
	
	Tipo:
	{Array}
	
	Default:
	{["i3GEO.navega.mostraRosaDosVentos()"]}
	*/
	MOUSEPARADO: ["i3GEO.navega.mostraRosaDosVentos()"],
	/*
	Propriedade: MOUSEMOVE

	Armazena as fun��es que ser�o executadas quando o usu�rio move o mouse sobre o mapa 
	
	Tipo:
	{Array}
	
	Default:
	{[]}
	*/
	MOUSEMOVE: [],
	/*
	Propriedade: MOUSEDOWN

	Armazena as fun��es que ser�o executadas quando o usu�rio pressiona o bot�o do mouse sobre o mapa 
	
	Tipo:
	{Array}

	Default:
	{[]}
	*/
	MOUSEDOWN: [],
	/*
	Propriedade: MOUSEUP

	Armazena as fun��es que ser�o executadas quando o usu�rio solta o bot�o do mouse sobre o mapa 
	
	Tipo:
	{Array}
	
	Default:
	{[]}
	*/
	MOUSEUP: [],
	/*
	Propriedade: MOUSECLIQUE

	Armazena as fun��es que ser�o executadas quando o usu�rio clica sobre o mapa 
	
	Tipo:
	{Array}
	
	Default:
	{["i3GEO.eventos.cliqueCapturaPt()"]}
	*/
	MOUSECLIQUE: ["i3GEO.eventos.cliqueCapturaPt()"],
	/*
	Variavel: TIMERPARADO
	
	Timer utilizado pelo contador do mouse parado
	
	Tipo:
	{Timeout}
	*/
	TIMERPARADO: "",
	/*
	Function: mouseParado
	
	Executa as fun��es definidas em MOUSEPARADO quando � detectado que o mouse est� estacionado.
	
	A execu��o desse evento � controlado por um timer definido no evento onmousemove (sobre o mapa).
	
	*/
	mouseParado: function()	{
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.mouseParado()");}
		try
		{clearTimeout(i3GEO.eventos.TIMERPARADO);}
		catch(e){i3GEO.eventos.TIMERPARADO = "";}
		if(objposicaocursor.dentroDomapa === false){return;}
		try{
			if(objposicaocursor.imgy === ""){
				objposicaocursor.imgy = 1;
				objposicaocursor.imgx = 1;
			}
			if (i3GEO.eventos.MOUSEPARADO.length > 0 && objposicaocursor.imgy > 0 && objposicaocursor.imgx > 0){
				if(objposicaocursor.imgx > 0){
					i3GEO.eventos.executaEventos(i3GEO.eventos.MOUSEPARADO);
				}
			}
		}catch(e){
			if(typeof(console) !== 'undefined'){console.error(e);}
		}
	},
	/*
	Function: navegaMapa
	
	Executa as fun��es armazenadas em NAVEGAMAPA, ou seja, opera��es executadas quando o mapa tem sua extens�o geogr�fica alterada.
	*/
	navegaMapa: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.navegaMapa()");}
		i3GEO.eventos.executaEventos(i3GEO.eventos.NAVEGAMAPA);
	},
	/*
	Function: mousemoveMapa
	
	Executa as fun��es armazenadas em MOUSEMOVE.
	*/
	mousemoveMapa: function(){
		i3GEO.eventos.executaEventos(i3GEO.eventos.MOUSEMOVE);
	},
	/*
	Function: mousedownMapa
	
	Executa as fun��es armazenadas em MOUSEDOWN.
	*/
	mousedownMapa: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.mousedownMapa()");}
		i3GEO.eventos.executaEventos(i3GEO.eventos.MOUSEDOWN);
	},
	/*
	Function: mouseupMapa
	
	Executa as fun��es armazenadas em MOUSEUP.
	*/
	mouseupMapa: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.mouseupMapa()");}
		i3GEO.eventos.executaEventos(i3GEO.eventos.MOUSEUP);
		/*
		if (i3GEO.eventos.MOUSEUP.length > 0){
			var f,temp;
			f = i3GEO.eventos.MOUSEUP.length-1;
			if (f >= 0){
				do{
					temp = i3GEO.eventos.MOUSEUP[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function'){
						eval(i3GEO.eventos.MOUSEUP[f]);
						//YAHOO.log("mouseupMapa", "i3geo");
					}
				}
				while(f--);
			}
		}
		*/	
	},
	/*
	Function: mousecliqueMapa
	
	Executa as fun��es armazenadas em MOUSECLIQUE.
	*/
	mousecliqueMapa: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.mousecliqueMapa()");}
		i3GEO.eventos.executaEventos(i3GEO.eventos.MOUSECLIQUE);
	},
	/*
	Function: executaEventos
	
	Executa a pilha de nomes de fun��es armazenados em um array
	
	Parameter:
	
	eventos {array} - array com os nomes das fun��es
	*/
	executaEventos: function(eventos){
		try{
			var f,temp;
			if (eventos.length > 0){
				f = eventos.length-1;
				if (f >= 0){
					do{eval(eventos[f]);}
					while(f--);
				}
			}
		}
		catch(e){
			if(typeof(console) !== 'undefined'){"executaEventos "+console.error(e);}
		}
	},
	/*
	Function posicaoMouseMapa
	
	Captura a posi��o do mouse sobre um mapa. O c�lculo pode ser feito sobre o corpo do mapa principal ou sob o corpo do mapa de refer�ncia
	
	O resultado dos c�lculos s�o armazenados no objeto objposicaocursor
	esse objeto ter� as seguintes propriedades:
	
			objposicaocursor.ddx valor de x em d�cimos de grau
			
			objposicaocursor.ddy valor de y em d�cimos de grau
			
			objposicaocursor.dmsx valor de x em dms
			
			objposicaocursor.dmsy valor de y em dms
			
			objposicaocursor.telax posicao x na tela em pixels
			
			objposicaocursor.telay posicao y na tela em pixels
			
			objposicaocursor.imgx posicao x no mapa em pixels
			
			objposicaocursor.imgy: posicao y no mapa em pixels
			
			objposicaocursor.refx: posicao x no mapa de refer�ncia em pixels
			
			objposicaocursor.refy: posicao x no mapa de refer�ncia em pixels
	
	Parameters:
	
	e {Event object} - objeto do tipo evento disparado sobre o objeto em foco
	*/
	posicaoMouseMapa: function(e){
		//
		//os eventos da interface googlemaps s�o definidos em i3GEO.Interface
		//se a interface for googlemaps ou openlayers, os eventos s�o controlados
		//pelas respectivas apis
		//caso contr�rio, o i3geo ir� controlar os c�lculos
		//Entretanto, nas ferramentas que usam o richdraw (dist�ncia e �rea) o posicionamento
		//deve ser controlado pelo i3geo
		//
		var teladd,teladms,container,targ,pos,mousex,mousey,xfig,yfig,xreffig,yreffig,xtela,ytela,c,ex,r;
		try{
			//verifica se o richdraw est� sendo usaado
			container = e.target.parentNode.id;
		}
		catch(erro){
			if(typeof(console) !== 'undefined'){console.error(erro);}
		}
		if (container !== "divGeometriasTemp"){
			if((i3GEO.Interface.ATUAL === "googlemaps") || (i3GEO.Interface.ATUAL === "openlayers"))
			{return;}
		}
		if (!e){e = window.event;}
		//
		//verifica sob qual objeto o mouse est� se movendo
		//
		if (e.target)
		{targ = e.target;}
		else if (e.srcElement) {targ = e.srcElement;}
		if(targ.id === "" && $i(i3GEO.Interface.IDMAPA))
		{targ = $i(i3GEO.Interface.IDMAPA);}
		//
		//se estiver no modo pan, o movimento deve ser obtido do elemento
		//onde est� a imagem do mapa e n�o diretamente sobre o elemento 'img'
		//se n�o for feito assim, o deslocamento do mapa n�o � capturado
		//
		try{
			if(g_panM !== 'undefined' && g_panM === "sim")
			{pos = i3GEO.util.pegaPosicaoObjeto(targ.parentNode);}
			else
			{pos = i3GEO.util.pegaPosicaoObjeto(targ);}
			if((i3GEO.configura.entorno === "sim") && (g_panM === "sim")){
				pos[0] = pos[0] - i3GEO.parametros.w;
				pos[1] = pos[1] - i3GEO.parametros.h;
			}
		}
		catch(m){pos = i3GEO.util.pegaPosicaoObjeto(targ);}
		//
		//pega a posicao correta do mouse
		//
		mousex = 0;
		mousey = 0;
		if (e.pageX || e.pageY){
			mousex = e.pageX;
			mousey = e.pageY;
		}
		else if (e.clientX || e.clientY){
			mousex = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			mousey = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		//
		//faz os c�lculos de posicionamento
		//fig e reffig s�o a mesma coisa por enquanto
		//
		xfig = mousex - pos[0];
		yfig = mousey - pos[1];
		xreffig = xfig;
		yreffig = yfig;
		xtela = mousex;
		ytela = mousey;
		//
		//celula e extent s�o necess�rios para se fazer a
		//convers�o de coordenadas de tela para coordenadas geogr�ficas
		//esses valores s�o obtidos das fun��es ajax que redesenham ou inicializam o mapa
		// 
		c = i3GEO.parametros.pixelsize;
		ex = i3GEO.parametros.mapexten;
		try{
			if(targ.id === "imagemReferencia"){
				c = i3GEO.parametros.celularef;
				ex = i3GEO.parametros.extentref;
				r = $i("i3geo_rosa");
				if(r)
				{r.style.display = "none";}
			}
		}
		catch(e){i3GEO.parametros.celularef = 0;}
		teladd = i3GEO.calculo.tela2dd(xfig,yfig,c,ex);
		teladms = i3GEO.calculo.dd2dms(teladd[0],teladd[1]);
		objposicaocursor = {
			ddx: teladd[0],
			ddy: teladd[1],
			dmsx: teladms[0],
			dmsy: teladms[1],
			telax: xtela,
			telay: ytela,
			imgx: xfig,
			imgy: yfig,
			refx: xreffig,
			refy: yreffig,
			dentroDomapa: true
		};
	},
	/*
	Function: ativa

	Ativa os eventos sobre o mapa

	Define o que ser� executado quando o mouse � clicado ou movido sobre o mapa.

	Al�m das fun��es padr�o,s�o ativadas aquelas definidas nas vari�veis de configura��o (veja classe_configura.js)

	Parametro:

	docMapa {DOM node} - objeto que ser� alvo da ativa��o dos cliques
	*/
	ativa: function(docMapa){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.ativa()");}
		docMapa.onmouseover = function(){
			objposicaocursor.dentroDomapa = true;
			this.onmousemove=function(exy){
				i3GEO.eventos.posicaoMouseMapa(exy);
				try{
					try
					{clearTimeout(i3GEO.eventos.TIMERPARADO);}
					catch(e){
						if(typeof(console) !== 'undefined'){console.error(e);}
					}
					i3GEO.eventos.TIMERPARADO = setTimeout('i3GEO.eventos.mouseParado()',i3GEO.configura.tempoMouseParado);
				}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
				try
				{i3GEO.eventos.mousemoveMapa();}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
			};
		};
		docMapa.onmouseout = function(){
			objposicaocursor.dentroDomapa = true;
			try
			{objmapaparado="parar";}
			catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
			}
		};
		docMapa.onmousedown = function(exy){
			if(!i3GEO.eventos.botaoDireita(exy))
			{i3GEO.eventos.mousedownMapa();}
		};
		docMapa.onclick = function(exy){
			if(!i3GEO.eventos.botaoDireita(exy))
			{i3GEO.eventos.mousecliqueMapa();}
		};
		docMapa.onmouseup = function(exy){
			if(!i3GEO.eventos.botaoDireita(exy))
			{i3GEO.eventos.mouseupMapa();}
		};
	},
	/*
	Function: botaoDireita
	
	Retorna true se o bot�o da direita foi utilizado no evento do mouse
	
	Parametro:
	
	exy - evento
	
	Return:
	{boolean}
	*/
	botaoDireita: function(exy){
		try{
			var k;
			if(navm)
			{k = event.button;}
			else
			{k = exy.button;}
			if(k !== 2)				
			{return false;}
			else
			{return true;}
		}
		catch(e){return false;}	
	},
	/*
	Function: cliqueCapturaPt

	Captura um ponto na tela e retorna o resultado para a janela interna que estiver aberta.

	As coordenadas do ponto, em DMS, s�o repassadas para os campos do tipo input da janela interna que estiver aberta.
	A janela aberta deve ter os seguintes elementos do tipo input (ids):
	ixg,ixm,ixs,iyg,iym,iys
	*/
	cliqueCapturaPt: function(ixg,ixm,ixs,iyg,iym,iys){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.eventos.cliqueCapturaPt()");}
		if(arguments.length === 0){
			var ixg = "ixg",
				ixm = "ixm",
				ixs = "ixs",
				iyg = "iyg",
				iym = "iym",
				iys = "iys",
				x,y;
			if($i("wdocai"))
			{doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;}
		}
		else{
			var doc = document; 
			x,
			y;
		}
		if (g_tipoacao !== "capturaponto"){return;}
		else{
			try{
				x = objposicaocursor.dmsx.split(" ");
				y = objposicaocursor.dmsy.split(" ");
				if (doc.getElementById(ixg))
				{doc.getElementById(ixg).value = x[0];}
				if (doc.getElementById(ixm))
				{doc.getElementById(ixm).value = x[1];}
				if (doc.getElementById(ixs))
				{doc.getElementById(ixs).value = x[2];}
				if (doc.getElementById(iyg))
				{doc.getElementById(iyg).value = y[0];}
				if (doc.getElementById(iym))
				{doc.getElementById(iym).value = y[1];}
				if (doc.getElementById(iys))
				{doc.getElementById(iys).value = y[2];}
			}
			catch(m){
				if(typeof(console) !== 'undefined'){console.error(m);}
			}
		}
	}
};
//YAHOO.log("carregou classe eventos", "Classes i3geo");