/*
Title: Navega��o sobre o mapa

File: i3geo/classesjs/classe_navega.js

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
Class: i3GEO.navega

Realiza opera��es de navega��o do mapa, como zoom, pan, etc..

Quando todos os argumentos da fun��o forem opcionais, basta usar nomeFuncao(),
nos casos em que os primeiros argumentos forem opcionais e os demais obrigat�rios,
utilize "" no lugar do argumento que se quer usar o default, exemplo,
nomeFuncao("","",10)
*/
i3GEO.navega = {
	/*
	Property: FATORZOOM
	
	Valor utilizado nas opera��es de zoom in e out. Fator de zoom.
	
	Default:
	2
	
	Type:
	{Integer}
	*/
	FATORZOOM: 2,
	/*
	Function: zoomin
	
	Aproxima o mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomin: function(locaplic,sid){
		//YAHOO.log("zoomin", "i3geo");
		if(arguments.length > 0){
			i3GEO.configura.locaplic = locaplic;
			i3GEO.configura.sid = sid;
		}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.aproxima(i3GEO.atualiza,i3GEO.navega.FATORZOOM);
	},
	/*
	Function: zoomout
	
	Afasta o mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomout: function(locaplic,sid){
		//YAHOO.log("zoomout", "i3geo");
		if(arguments.length > 0){
			i3GEO.configura.locaplic = locaplic;
			i3GEO.configura.sid = sid;
		}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.afasta(i3GEO.atualiza,i3GEO.navega.FATORZOOM);
	},
	/*
	Function: zoomponto
	
	Centraliza o mapa em um ponto e acrescenta o ponto como uma nova camada no mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	x {Numeric} - coordenada em d�cimos de grau da longitude
	
	y {Numeric} - coordenada em d�cimos de grau da latitude
	*/
	zoomponto: function(locaplic,sid,x,y){
		//YAHOO.log("zoomponto", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.zoomponto(i3GEO.atualiza,x,y);
	},
	/*
	Function: zoompontoIMG
	
	Centraliza o mapa em um ponto de coordenadas medidas na imagem do mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	x {Numeric} - coordenada x da imagem
	
	y {Numeric} - coordenada y da imagem
	*/
	zoompontoIMG: function(locaplic,sid,x,y){
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.pan(i3GEO.atualiza,"","",x,y);
	},
	/*
	Function: xy2xy
	
	Desloca o mapa de um ponto de coordenadas xy para um segundo ponto
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	xi {Numeric} - coordenada x inicial
	
	yi {Numeric} - coordenada y inicial
	
	xf {Numeric} - coordenada x final
	
	yf {Numeric} - coordenada y final
	
	ext {String} - extens�o geogr�fica do mapa
	
	tipoimagem {String} - tipo de imagem atual do mapa (sepia,nenhum,cinza)
	*/
	xy2xy: function(locaplic,sid,xi,yi,xf,yf,ext,tipoimagem){
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		var disty = (yi * -1) + yf;
		var distx = (xi * -1) + xf;
		var ex = ext.split(" ");
		var novoxi = (ex[0] * 1) - distx;
		var novoxf = (ex[2] * 1) - distx;
		var novoyi = (ex[1] * 1) - disty;
		var novoyf = (ex[3] * 1) - disty;
		if ((distx == 0)||(disty == 0))
		{return false;}
		else{
			var nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
			i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,tipoimagem,nex);
			return true;
		}
	},	
	/*
	Function: localizaIP
	
	Localiza as coordenadas baseadas no n�mero IP do usu�rio.
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	funcao {Function} - fun��o que ser� executada ao concluir a chamada AJAX. Essa fun��o receber� o objeto JSON obtido.
	*/	
	localizaIP: function(locaplic,sid,funcao){
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		//YAHOO.log("localizaIP", "i3geo");
		i3GEO.php.localizaIP(funcao);
	},
	/*
	Function: zoomIP
	
	Mostra no mapa um ponto baseado na localiza��o do usu�rio.

	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomIP: function(locaplic,sid){
		try
		{
			if(arguments.length > 0){
				i3GEO.configura.locaplic = locaplic;
				i3GEO.configura.sid = sid;
			}
			var mostraIP = function(retorno)
			{
				if (retorno.data.latitude != null)
				{
					i3GEO.navega.zoomponto(locaplic,sid,retorno.data.longitude,retorno.data.latitude);
				}
				else
				{alert("Nao foi possivel identificar a localizacao.");}
			};
			i3GEO.navega.localizaIP(locaplic,sid,mostraIP);
		}
		catch(e){var e = "";}
	},
	/*
	Function: zoomExt
	
	Aplica uma nova extens�o geogr�fica ao mapa.

	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	tipoimagem {String} - Utlize "" para aplicar o default. Tipo de imagem que ser� retornada na imagem do mapa que ser� criada

	ext {String} - Extens�o geogr�fica no formato xmin ymin xmax ymax
	*/
	zoomExt: function(locaplic,sid,tipoimagem,ext){
		//YAHOO.log("zoomExt", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		if(tipoimagem == "")
		{var tipoimagem = "nenhum";}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.mudaext(i3GEO.atualiza,tipoimagem,ext);
	},
	/*
	Function: aplicaEscala
	
	Aplica ao mapa um novo valor de escala tendo como base o valor do denminador

	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	escala {Numeric} - denominador da escala
	*/	
	aplicaEscala: function(locaplic,sid,escala){
		//YAHOO.log("aplicaescala", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.mudaescala(i3GEO.atualiza,escala);
	},
	/*
	Function: panFixo
	
	Desloca o mapa para uma determinada dire��o com uma dist�ncia fixa.
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo

	direcao {String} - norte,sul,leste,oeste,sudeste,sudoeste,nordeste,noroeste
	
	w {Numeric} - largura da imagem do mapa em pixels
	
	h {Numeric} - altura da imagem do mapa em pixels
	
	escala {Numeric} - escala do mapa
	*/
	panFixo: function(locaplic,sid,direcao,w,h,escala){
		//YAHOO.log("panfixo", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		if (direcao == "norte"){
			var y = h / 6;
			var x = w / 2;
		}
		if (direcao == "sul"){
			var y = h - (h / 6);
			var x = w / 2;
		}
		if (direcao == "leste"){
			var x = w - (w / 6);
			var y = h / 2;
		}
		if (direcao == "oeste"){
			var x = w / 6;
			var y = h / 2;
		}
		if (direcao == "nordeste"){
			var y = h / 6;
			var x = w - (w / 6);
		}
		if (direcao == "sudeste"){
			var y = h - (h / 6);
			var x = w - (w / 6);
		}
		if (direcao == "noroeste"){
			var y = h / 6;
			var x = w / 6;
		}
		if (direcao == "sudoeste"){
			var y = h - (h / 6);
			var x = w / 6;
		}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.pan(i3GEO.atualiza,escala,tipo,x,y);
	},
	/*
	Function: mostraRosaDosVentos
	
	Mostra sobre o mapa a rosa dos ventos.
	
	A rosa permite que o usu�rio navegue no mapa sem ter de alterar a op��o atual de navega��o.
	
	A rosa � mostrada apenas se a vari�vel i3GEO.configura.mostraRosaDosVentos for = a "sim".<b> 

	Para que a rosa seja mostrada, � necess�rio que esta fun��o esteja registrada em
	
	i3GEO.eventos.MOUSEPARADO
	*/
	mostraRosaDosVentos: function(){
		try{
			if(i3GEO.configura.mostraRosaDosVentos == "nao"){return;}
			if(g_tipoacao == "area"){return;}
		}
		catch(e){};
		if(objposicaocursor.imgx < 10 || objposicaocursor.imgy < 10 || objposicaocursor.imgy > (i3GEO.parametros.h - 10))
		{return;}
		if (!$i("i3geo_rosa")){
			var novoel = document.createElement("div");
			novoel.id = "i3geo_rosa";
			novoel.style.position="absolute";
			novoel.style.zIndex=5000;
			if(navn)
			{novoel.style.opacity=".7";}
			else
			{novoel.style.filter = "alpha(opacity=70)";}
			document.body.appendChild(novoel);
		}
		var setas = "<table id='rosaV' >";
		setas += "<tr onclick=\"javascript:i3GEO.configura.mostraRosaDosVentos='nao'\"><td></td><td></td><td style=cursor:pointer >x</td></tr><tr>";
		setas += "<td><img class='rosanoroeste' title='noroeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','noroeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosanorte' title='norte' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','norte','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosanordeste' title='nordeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','nordeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr>";
		setas += "<tr><td><img class='rosaoeste' title='oeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','oeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><table><tr>";
		setas += "<td><img class='rosamais' title='aproxima' onclick=\"i3GEO.navega.zoomin('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"')\" src='"+$im("branco.gif")+"' </td>";
		setas += "<td><img class='rosamenos' title='afasta' onclick=\"i3GEO.navega.zoomout('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"')\" src='"+$im("branco.gif")+"' </td>";
		setas += "</tr></table></td>";
		setas += "<td><img class='rosaleste' title='leste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','leste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr>";
		setas += "<tr><td><img class='rosasudoeste' title='sudoeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sudoeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosasul' title='sul' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sul','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosasudeste' title='sudeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sudeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr></table>";
		var i = $i("i3geo_rosa");
		i.innerHTML = setas;	
		i.style.top = objposicaocursor.telay - 27;
		i.style.left = objposicaocursor.telax - 27;
		i.style.display="block";
		var escondeRosa = function(){
			var i = $i("i3geo_rosa");
			i.style.display="none";
			YAHOO.util.Event.removeListener(escondeRosa);
		}
		if($i("img"))
		YAHOO.util.Event.addListener($i("img"),"mousemove", escondeRosa);
		i3GEO.ajuda.mostraJanela('Clique nas pontas da rosa para navegar no mapa. Clique em x para parar de mostrar essa op��o.');
	},
	/*
	Class: i3GEO.navega.autoRedesenho
	
	Controla o redesenho autom�tico do mapa por meio de um temporizador
	*/
	autoRedesenho: {
		/*
		Variable: INTERVALO
		
		Intervalo de tempo, em milisegundos, que ser� utilizado para disparar o desenho do mapa
		
		Type:
		{Integer}
		*/
		INTERVALO: 0,
		/*
		Variable: ID
		
		Guarda o valor do ID do elemento HTML que receber� o contador de tempo
		
		Type:
		{String}
		*/
		ID: "tempoRedesenho",
		/*
		Function: ativa
		
		Ativa o auto-redesenho do mapa
		
		Parameters:
		
		id {String} - id do elemento onde o contador de tempo ser� mostrado no mapa. Por default, utiliza "tempoRedesenho".
		*/
		ativa: function(id){
			if(arguments.length == 0){var id = "tempoRedesenho";}
			i3GEO.navega.autoRedesenho.ID = id;
			if (($i(id)) && i3GEO.navega.autoRedesenho.INTERVALO > 0)
			{$i(id).style.display = "block";}
			if (i3GEO.navega.autoRedesenho.INTERVALO > 0)
			{i3GEO.navega.tempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.redesenha()',i3GEO.navega.autoRedesenho.INTERVALO);}
			if (($i(id)) && (i3GEO.navega.autoRedesenho.INTERVALO > 0)){
				$i(id).innerHTML = i3GEO.navega.autoRedesenho.INTERVALO/1000;
				i3GEO.navega.contaTempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.contagem()',1000);
			}
		},
		/*
		Function: desativa
		
		Desativa o auto-redesenho do mapa
		*/
		desativa:function(){
			i3GEO.navega.autoRedesenho.INTERVALO = 0;
			clearTimeout(i3GEO.navega.tempoRedesenho);
			clearTimeout(i3GEO.navega.contaTempoRedesenho);
			i3GEO.navega.tempoRedesenho = "";
			i3GEO.navega.contaTempoRedesenho = "";
			if ($i(i3GEO.navega.autoRedesenho.ID))
			{$i(i3GEO.navega.autoRedesenho.ID).style.display = "none";}
		},
		/*
		Function: redesenha
		
		Redesenha o mapa quando o contador de tempo chegar a zero
		*/
		redesenha: function(){
			clearTimeout(i3GEO.navega.tempoRedesenho);
			clearTimeout(i3GEO.navega.contaTempoRedesenho);
			i3GEO.atualiza("");
			i3GEO.navega.autoRedesenho.ativa(i3GEO.navega.autoRedesenho.ID);
		},
		/*
		Function: contagem
		
		Faz a contagem do tempo
		*/
		contagem: function(){
			if ($i(i3GEO.navega.autoRedesenho.ID)){$i(i3GEO.navega.autoRedesenho.ID).innerHTML = parseInt($i(i3GEO.navega.autoRedesenho.ID).innerHTML) - 1;}
			i3GEO.navega.contaTempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.contagem()',1000);
		}
	},
	/*
	Class: i3GEO.navega.zoomBox
	
	Controla o desenho de um box na tela para executar o zoom por box
	*/
	zoomBox: {
		/*
		Function: inicia
		
		Marca o in�cio do desenho do box, capturando a posi��o do mouse
		*/
		inicia: function(){
			if(g_tipoacao!='zoomli'){return;}
			if(!$i("i3geoboxZoom"))
			i3GEO.navega.zoomBox.criaBox();
			var i = $i("i3geoboxZoom").style;
			i.width=0;
			i.height=0;
			i.visibility="visible";
			i.display="block";
			i.left = objposicaocursor.telax + g_postpx;
			i.top = objposicaocursor.telay + g_postpx;
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.zoomBox.desloca()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.zoomBox.desloca()");}
			if(i3GEO.eventos.MOUSEUP.toString().search("i3GEO.navega.zoomBox.termina()") < 0)
			{i3GEO.eventos.MOUSEUP.push("i3GEO.navega.zoomBox.termina()");}
		},
		/*
		Function: criaBox
		
		Cria o DIV que ser� utilizado para desenhar o box no mapa
		*/
		criaBox: function(){
			if(!$i("i3geoboxZoom")){
				var novoel = document.createElement("div");
				novoel.style.width = "0px";
				novoel.style.height = "0px";
				novoel.id = "i3geoboxZoom";
				novoel.style.display = "none";
				novoel.style.fontSize = "0px";
				if(navn)
				{novoel.style.opacity = .25;}
				novoel.style.backgroundColor = "gray";
				novoel.style.position="absolute";
				novoel.style.border = "2px solid #ff0000";		
				if (navm)
				{novoel.style.filter = "alpha(opacity=25)";}
				novoel.onmousemove = function(){
					var b = $i("i3geoboxZoom").style;
					var wb = parseInt(b.width);
					var hb = parseInt(b.height);
					if (navm){
						if(wb > 2)
						{b.width = wb - 2;}
						if(hb > 2)
						{b.height = hb - 2;}
					}
					else{
						b.width = wb - 2 + "px";
						b.height = hb - 2 + "px";
					}
				};
				novoel.onmouseup = function(){i3GEO.navega.zoomBox.termina()};
				document.body.appendChild(novoel);
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","i3geoboxZoom",i3GEO.configura.locaplic);
				if($i("img")){
					$i("img").title = "";
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","img",i3GEO.configura.locaplic);
				}
			}
		},
		/*
		Function: desloca
		
		Desloca o box conforme o mouse � movimentado
		*/
		desloca: function(){
			if(g_tipoacao!='zoomli'){return;}
			var bxs = $i("i3geoboxZoom").style;
			if(bxs.display != "block"){return;}
			ppx = objposicaocursor.telax;
			py = objposicaocursor.telay;
			if (navm){
				if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
				{bxs.width = ppx - boxxini - 2;}
				if ((py > boxyini) && ((py - boxyini - 2) > 0))
				{bxs.height = py - boxyini - 2;}
				if (ppx < boxxini)
				{bxs.left = ppx;bxs.width = boxxini - ppx + 2;}
				if (py < boxyini)
				{bxs.top = py;bxs.height = boxyini - py + 2;}
			}
			else{
				if (ppx > boxxini)
				{bxs.width = ppx - boxxini + "px";}
				if (py > boxyini)
				{bxs.height = py - boxyini + "px";}
				if (ppx < boxxini)
				{bxs.left = ppx + "px";bxs.width = boxxini - ppx + "px";}
				if (py < boxyini)
				{bxs.top = py + "px";bxs.height = boxyini - py + "px";}
			}
		},
		/*
		Function: termina
		
		Para o desenho do box, captura seu tamanho e faz o zoom no mapa
		*/
		termina: function(){
			if(g_tipoacao!='zoomli'){
				i3GEO.eventos.MOUSEDOWN.remove("i3GEO.navega.zoomBox.inicia()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.navega.zoomBox.termina()");
				return;
			}
			try{
				var valor = i3GEO.calculo.rect2ext("i3geoboxZoom",i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
				var v = valor[0];
				var x1 = valor[1];
				var y1 = valor[2];
				var x2 = valor[3];
				var y2 = valor[4];
				var limpa = function(){
					var bxs = $i("i3geoboxZoom").style;
					bxs.display="none";
					bxs.visibility="hidden";
					bxs.width = 0;
					bxs.height = 0;
				};
				if((x1 == x2) || (y1 == y2))
				{limpa.call();return;}
				// se o retangulo for negativo pula essa parte para n� gerar erro
				i3GEO.parametros.mapexten=v;
				limpa.call();
				i3GEO.eventos.MOUSEMOVE.remove("i3GEO.navega.zoomBox.desloca()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.navega.zoomBox.termina()");
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,i3GEO.configura.tipoimagem,v);
			}
			catch(e){limpa.call();return;}
		}
	},
	/*
	Class: i3GEO.navega.entorno
	
	Controla o desenho do entorno do mapa (modo tile)
	*/
	entorno:{
		/*
		Function: ativaDesativa
		
		Ajusta o mapa para ativar ou desativar o desenho do entorno
		
		Ao ser chamada, essa fun��o muda o modo atual, ativando ou desativando o entorno
		*/
		ativaDesativa: function(){
			if(i3GEO.parametros.mapfile == "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			if (i3GEO.configura.entorno == "sim"){
				var letras=["L","O","N","S"];
				for (var l=0;l<4; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.display = "none";
						$i("img"+letras[l]).src = "";
					}
				}
				$left("img",0);
				$top("img",0);
				i3GEO.configura.entorno = "nao";
				alert("Entorno desativado");
				$i("img").style.visibility = "visible";
				$i("img").style.display = "block";
			}
			else{
				i3GEO.navega.entorno.geraURL();
				var letras=["L","O","N","S"];
				for (var l=0;l<4; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.width = i3GEO.parametros.w;
						$i("img"+letras[l]).style.height = i3GEO.parametros.h;
						$i("img"+letras[l]).style.display = "block";
					}
				}
				i3GEO.configura.entorno = "sim";
				i3GEO.navega.entorno.ajustaPosicao();
				alert("Entorno ativado. o desenho do mapa pode demorar mais.");
			}
		},
		/*
		Function: geraURL
		
		Gera as URLs que ser�o utilizadas na tag IMG dos elementos do entorno do mapa
		*/
		geraURL: function(){
			var nny = (i3GEO.parametros.h / 2) * -1;
			var nnx = i3GEO.parametros.w / 2;
			var sy = i3GEO.parametros.h + (i3GEO.parametros.h / 2);
			var sx = i3GEO.parametros.w / 2;
			var lx = i3GEO.parametros.w + (i3GEO.parametros.w / 2);
			var ly = i3GEO.parametros.h / 2;
			var ox = (parseInt(i3GEO.parametros.w/2)) * -1;
			var oy = i3GEO.parametros.h / 2;
			var u = window.location.protocol+"\/\/"+window.location.host+i3GEO.parametros.cgi+"?map="+i3GEO.parametros.mapfile;
			u += "&mode=map&imgext="+i3GEO.parametros.mapexten+"&mapsize="+nnx+" "+oy;
			var sul = u+"&imgxy="+sx/2+" "+sy/2;
			var norte = u+"&imgxy="+nnx/2+" "+nny/2;
			var leste = u+"&imgxy="+lx/2+" "+ly/2;
			var oeste = u+"&imgxy="+ox/2+" "+oy/2;
			$i("imgS").src=sul;
			$i("imgN").src=norte;
			$i("imgL").src=leste;
			$i("imgO").src=oeste;	
		},
		/*
		Function: ajustaPosicao
		
		Ajusta a posi��o das imagens do entorno do mapa
		*/
		ajustaPosicao: function(){
			$left("img",i3GEO.parametros.w*-1);
			$left("imgS",i3GEO.parametros.w*-1);
			$left("imgL",i3GEO.parametros.w);
			$left("imgO",i3GEO.parametros.w*-3);
			$left("imgN",i3GEO.parametros.w*-1);
			$top("img",i3GEO.parametros.h*-1);
			$top("imgS",i3GEO.parametros.h*-1);
			$top("imgL",i3GEO.parametros.h*-1);
			$top("imgN",i3GEO.parametros.h*-1);
			$top("imgO",i3GEO.parametros.h*-1);		
		}
	},
	/*
	Class: i3GEO.navega.lente
	
	Ativa e controla a lente de aumento.
	
	A lente de aumento � um box que pode ser ativado sobre o mapa
	mostrando uma imagem ampliada da regi�o onde est� o mouse
	*/
	lente:{
		/*
		Variable: ESTAATIVA
		
		Indica se a lente foi ou n�o aberta
		*/
		ESTAATIVA: "nao",
		/*
		Property: POSICAOX
		
		Define a posi��o em x da lente em rela��o ao corpo do mapa
		*/
		POSICAOX: 0,
		/*
		Property: POSICAOY
		
		Define a posi��o em y da lente em rela��o ao corpo do mapa
		*/
		POSICAOY:0,
		/*
		Function: inicia
		
		Ativa a lente de aumento criando os elementos gr�ficos
		necess�rios e ativando os eventos que controlam a apresenta��o
		da lente
		*/
		inicia: function(){
			//insere lente de aumento
			if (!$i("lente")){
				var novoel = document.createElement("div");
				novoel.id = 'lente';
				novoel.style.clip='rect(0px,0px,0px,0px)';
				var novoimg = document.createElement("img");
				novoimg.src="";
				novoimg.id='lenteimg';
				novoel.appendChild(novoimg);
				document.body.appendChild(novoel);
				var novoel = document.createElement("div");
				novoel.id = 'boxlente';
				document.body.appendChild(novoel);
			}
			with($i('boxlente').style){borderWidth='1' + g_postpx;borderColor="red";display = "block"}
			$i("lente").style.display = "block";
			i3GEO.navega.lente.ESTAATIVA = "sim";
			i3GEO.navega.lente.atualiza();
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.navega.lente.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.navega.lente.atualiza()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.lente.movimenta()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.lente.movimenta()");}
		},
		/*
		Function: atualiza
		
		Atualiza a imagem da lente aberta
		*/
		atualiza: function(){
			var temp = function(retorno){
				try{
					var retorno = retorno.data;
					if (retorno == "erro"){alert("A lente nao pode ser criada");return;}
					var volta = retorno.split(",");
					var nimg = volta[2];
					var olente = $i('lente');
					var oboxlente = $i('boxlente');
					var olenteimg = $i('lenteimg');
					olenteimg.src = nimg;
					olenteimg.style.width=volta[0] * 1.5;
					olenteimg.style.height=volta[1] * 1.5;
					olente.style.zIndex=1000;
					olenteimg.style.zIndex=1000;
					oboxlente.style.zIndex=1000;
					var pos = i3GEO.util.pegaPosicaoObjeto($i("corpoMapa"));
					eval ("olente.style." + g_tipoleft + " = pos[0] + i3GEO.navega.lente.POSICAOX + g_postpx");
					eval ("olente.style." + g_tipotop + " = pos[1] + i3GEO.navega.lente.POSICAOY + g_postpx");
					eval ("oboxlente.style." + g_tipoleft + " = pos[0] + i3GEO.navega.lente.POSICAOX + g_postpx");
					eval ("oboxlente.style." + g_tipotop + " = pos[1] + i3GEO.navega.lente.POSICAOY + g_postpx");
					oboxlente.style.display='block';
					oboxlente.style.visibility='visible';
					olente.style.display='block';
					olente.style.visibility='visible';
					i3GEO.janela.fechaAguarde("ajaxabrelente");
				}
				catch(e){i3GEO.janela.fechaAguarde();}
			};
			if(i3GEO.navega.lente.ESTAATIVA == "sim"){
				i3GEO.janela.abreAguarde("ajaxabrelente",$trad("o1"));
				i3GEO.php.aplicaResolucao(temp,1.5);
			}
			else{
				i3GEO.navega.lente.desativa();
			}
		},
		/*
		Function: desativa
		
		Desativa alente aberta
		*/
		desativa: function(){
			$i("lente").style.display = "none";
			$i("boxlente").style.display = "none";
			$i('boxlente').style.borderWidth = 0;
			i3GEO.navega.lente.ESTAATIVA = "nao";
			i3GEO.eventos.MOUSEMOVE.remove("i3GEO.navega.lente.movimenta()");
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.navega.lente.atualiza()");
		},
		/*
		Function: movimenta
		
		Movimenta a imagem dentro da lente para refletir a posi��o do mouse
		*/
		movimenta: function(){
			try{
				if(i3GEO.navega.lente.ESTAATIVA = "sim"){
					if ($i("lente").style.visibility=="visible")
					var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
					var esq = (objposicaocursor.telax - pos[0]) * 2.25;
					var topo = (objposicaocursor.telay - pos[1]) * 2.25;
					var clipt = "rect("+ (topo - 40) + " " + (esq + 40) + " " + (topo + 40) + " " + (esq - 40) +")";
					var i = $i("lente").style;
					i.clip = clipt;
					eval("i." + g_tipotop + "= (pos[1] - (topo - 40)) + g_postpx");
					eval("i." + g_tipoleft +  "= (pos[0] - (esq - 40)) + g_postpx");
				}
			}
			catch(e){}
		}
	},
	/*
	Class: i3GEO.navega.destacaTema
	
	Destaca um tema mostrando-o sobre os outros em um box que segue o mouse
	*/
	destacaTema:{
		/*
		Property: TAMANHO
		
		Tamanho do box
		
		Type:
		{Integer}
		*/
		TAMANHO: 75,
		/*
		Variable: ESTAATIVO
		
		Indica se o destaque est� ou n�o ativo
		
		Type:
		{sim|nao}
		*/
		ESTAATIVO: "nao",
		/*
		Variable: TEMA
		
		Tema que est� sendo destacado
		
		Type:
		{C�digo do tema}
		*/
		TEMA: "",
		/*
		Function: inicia
		
		Inicia o destaque de um tema
		
		Parameters:
		
		tema {String} - c�digo do tema
		*/
		inicia: function(tema){
			if (!$i("img_d")){
				var novoel = document.createElement("div");
				novoel.id = "div_d";
				novoel.style.zIndex = 5000;
				document.body.appendChild(novoel);
				$i("div_d").innerHTML = "<input style='position:relative;top:0px;left:0px'' type=image src='' id='img_d' />";
				$i("div_d").style.left = parseInt($i("corpoMapa").style.left);
				$i("div_d").style.top = parseInt($i("corpoMapa").style.top);
				$i("img_d").style.left = 0;
				$i("img_d").style.top = 0;
				$i("img_d").style.width = i3GEO.parametros.w;
				$i("img_d").style.height = i3GEO.parametros.h;
				$i("div_d").style.clip = 'rect(0 75 75 0)';
				var novoeli = document.createElement("div");
				novoeli.id = "div_di";
				novoel.appendChild(novoeli);
				$i("div_di").innerHTML = "<p style='position:absolute;top:0px;left:0px'>+-</p>";
			}
			i3GEO.navega.destacaTema.TEMA = tema;
			i3GEO.navega.destacaTema.ESTAATIVO = "sim";
			i3GEO.navega.destacaTema.atualiza();
			var janela = i3GEO.janela.cria(150,0,"","center","center","Parar destaque&nbsp;&nbsp;","ativadesativaDestaque");
			YAHOO.util.Event.addListener(janela[0].close, "click", i3GEO.navega.destacaTema.desativa);
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.navega.destacaTema.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.navega.destacaTema.atualiza()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.destacaTema.movimenta()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.destacaTema.movimenta()");}
		},
		/*
		Function: atualiza
		
		Atualiza o destaque
		
		� definido para o evento de navega��o do mapa
		*/
		atualiza: function(){
			if(i3GEO.navega.destacaTema.ESTAATIVO == "nao")
			{return;}
			var temp = function(retorno){
				var retorno = retorno.data;
				var m = new Image();
				m.src = retorno;
				$i("div_d").innerHTML = "";
				$i("div_d").style.display="block";
				var novoel = document.createElement("input");
				novoel.id = "img_d";
				novoel.style.position = "relative";
				novoel.style.top = "0px";
				novoel.style.left = "0px";
				novoel.type = "image";
				novoel.src = m.src;
				novoel.style.display = "block";
				$i("div_d").appendChild(novoel);
				i3GEO.janela.fechaAguarde("ajaxdestaca");	
			};
			i3GEO.janela.abreAguarde("ajaxdestaca","Aguarde...gerando imagem");
			i3GEO.php.geradestaque(temp,i3GEO.navega.destacaTema.TEMA);
		},
		/*
		Function: desativa
		
		Desativa o destaque
		*/
		desativa: function(){
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.navega.destacaTema.atualiza()");
			i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.destacaTema.movimenta()");
			i3GEO.navega.destacaTema.ESTAATIVO = "nao";
			document.body.removeChild($i("div_d"));
		},
		/*
		Function: movimenta
		
		Movimenta o destaque conforme o mouse move
		
		� definido para o evento de deslocamento do mouse
		*/
		movimenta: function(){
			if(i3GEO.navega.destacaTema.ESTAATIVO == "sim")
			$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - i3GEO.navega.destacaTema.TAMANHO)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - i3GEO.navega.destacaTema.TAMANHO)+')';
		}
	}
};
//YAHOO.log("carregou classe navega", "Classes i3geo");