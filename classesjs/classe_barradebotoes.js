/*
Title: Barra de bot�es

File: i3geo/classesjs/classe_barradebotoes.js

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
Class: i3GEO.barradebotoes

Constr�i a barra de bot�es flutuante
*/
i3GEO.barraDeBotoes = {
	/*
	Variable: BARRAS
	
	Array com os objetos YAHOO.janelaBotoes.xp.panel criados
	*/
	BARRAS: new Array(),
	/*
	Property: PERMITEFECHAR
	
	Mostra o bot�o para fechar as barras ou n�o.
	
	Type:
	{boolean}
	*/
	PERMITEFECHAR: true,
	/*
	Property: PERMITEDESLOCAR
	
	Permite deslocar as barras ou n�o.
	
	Type:
	{boolean}
	*/
	PERMITEDESLOCAR: true,
	/*
	Property: LISTABOTOES
	
	Objeto com a lista de bot�es.
	
	Por default utiliza os botoes definidos em i3GEO.configura.funcoesBotoes.botoes
	
	Type:
	{JSON}
	*/
	LISTABOTOES: i3GEO.configura.funcoesBotoes.botoes,
	/*
	Property: BOTAOPADRAO
	
	Bot�o que ser� ativado ao inicializar os bot�es com ativaBotoes.
	
	Correpsonde ao item iddiv de LISTABOTOES
	
	Type:
	{String}
	*/
	BOTAOPADRAO: "pan",
	/*
	Function: ativaIcone
	
	Altera as bordas de um �cone aplicando um efeito de �cone real�ado.
	
	Todos os demais �cones definidos em LISTABOTOES e que tiverem o tipo = "dinamico"
	ser�o processados para alterar as bordas dando o efeito de n�o ativo.
	
	Parameters:
	
	icone {String} - id do icone que ser� ativado. Esse id � o mesmo definido em LISTABOTOES
	*/
	ativaIcone: function(icone){
		//desativa todos os �cones
		var ko = i3GEO.barraDeBotoes.LISTABOTOES.length-1;
		if(ko >= 0)
		{
			do
			{
				var temp = $i(i3GEO.barraDeBotoes.LISTABOTOES[ko].iddiv);
				if (i3GEO.barraDeBotoes.LISTABOTOES[ko].tipo=="dinamico" && temp)
				{
					var ist = temp.style;
					ist.borderWidth="1px";
					ist.borderColor='white';
					ist.borderLeftColor='rgb(50,50,50)';
					ist.borderBottomColor='rgb(50,50,50)';
				}
			}
			while(ko--)
		}
		//ativa o icone
		if($i(icone))
		{with ($i(icone).style){
			borderColor='white';
			borderWidth="1px";
		}}
	},
	/*
	Function: ativaBotoes
	
	Ativa os botoes definidos em LISTABOTOES
	
	Os botoes s�o constru�dos e as fun��es definidas s�o embutidas no evento onclick
	
	Parameters:
	
	padrao (String} - botao que ser� mostrado como ativo (opcional).
	Se n�o for definido, ser� utilizado o bot�o especificado em BOTAOPADRAO.
	O nome do botao deve estar em LISTABOTOES na propriedade iddiv
	*/
	ativaBotoes:function(padrao){
		if(arguments.length == 0)
		{var padrao = i3GEO.barraDeBotoes.BOTAOPADRAO;}
		var l = i3GEO.barraDeBotoes.LISTABOTOES;
		var b = l.length-1;
		if (b >= 0){
			do{
				if ($i(l[b].iddiv)){
					if(l[b].conteudo)
					{eval('$i(l[b].iddiv).innerHTML = "'+l[b].conteudo+'"');}
					if(l[b].dica){
						eval('$i("'+l[b].iddiv+'").onmouseover = function(){i3GEO.ajuda.mostraJanela("'+l[b].dica+'","");}');
						eval('$i("'+l[b].iddiv+'").onmouseout = function(){i3GEO.ajuda.mostraJanela("");};');
					}
					if(l[b].funcaoonclick){
						$i(l[b].iddiv).onclick = l[b].funcaoonclick;
						if(l[b].iddiv == padrao)
						{l[b].funcaoonclick();}
					}
					if(l[b].constroiconteudo)
					{eval(l[b].constroiconteudo);}
				}
			}
			while (b--);
		}
	},
	/*
	Function: inicializaBarra
	
	Inicializa a barra de bot�es
	
	Exemplo:
	
	if ($i("barraDeBotoes1"))
	
	i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes1","i3geo_barra1",true,x1,y1);
	
	if ($i("barraDeBotoes2"))
	
	i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes2","i3geo_barra2",false,x2,y2);
	
	Os objetos criados s�o armazenados no array BARRAS, dessa forma, para acessar uma barra utilize
	por exemplo:
	
	i3GEO.barraDeBotoes.BARRAS[1].show();
	
	Parameters:
	
	idconteudo {String} - id do elemento existente no HTML e que cont�m as defini��es dos bot�es
	
	idconteudonovo {String} - id do elemento que ser� criado para adicionar os boto�es
	
	barraZoom {boolean} - indica se a barra de zoom ser� inclu�da
	
	x {Numeric} - posi��o x (pixels) da barra em rela��o ao mapa
	
	y {Numeric} - posi��o y (pixels) da barra em rela��o ao mapa
	*/
	inicializaBarra:function(idconteudo,idconteudonovo,barraZoom,x,y){
		var wj = "36px";
		var recuo = "0px";
		var novoel = document.createElement("div");
		novoel.id = idconteudonovo;
		novoel.style.display="block";
		novoel.style.border="1px solid gray";
		novoel.style.background="white";
		if (navm)
		{novoel.style.filter='alpha(opacity=90)';}
		else
		{novoel.style.opacity= .85;}
		//var temp = '<div class="hd" >&nbsp;</div>';
		//temp += '<div class="bd" style="background-color:rgb(250,250,250);width='+wj+'px"  >';		
		var temp = "";
		if (barraZoom == true)
		{
			if (navn){temp += '<div style="text-align:center;position:relative;left:9px" >';}
			temp += '<div id="vertMaisZoom" onmouseover="i3GEO.ajuda.mostraJanela(\'Amplia o mapa mantendo o centro atual.\')" onclick="i3GEO.navega.zoomin()" ></div><div id="vertBGDiv" name="vertBGDiv" tabindex="0" x2:role="role:slider" state:valuenow="0" state:valuemin="0" state:valuemax="200" title="Zoom" >';
			temp += '<div id="vertHandleDiv" ><img alt="" class="slider" src="'+i3GEO.util.$im("branco.gif")+'" /></div></div>';
			temp += '<div id=vertMenosZoom onmouseover="i3GEO.ajuda.mostraJanela(\'Reduz o mapa mantendo o centro atual.\')" onclick="i3GEO.navega.zoomout()"  ></div>';
			if (navn){temp += '</div>';}
		}
		temp += '<div id="'+idconteudonovo+'_" style="left:'+recuo+';top:-6px;"  ></div></div>';
		novoel.innerHTML = temp;
		//necess�roi para impedir o desenho da rosa dos ventos
		novoel.onmouseover = function(){
			//objposicaocursor.imgx = 0;
			if($i("i3geo_rosa"))
			{$i("i3geo_rosa").style.display="none";}
		};
		document.body.appendChild(novoel);
		//copia os botoes do HTML para a janela
		if ($i(idconteudo))
		{
			$i(idconteudonovo+"_").innerHTML = $i(idconteudo).innerHTML;
			$i(idconteudo).innerHTML = "";
		}
		YAHOO.namespace("janelaBotoes.xp");
		YAHOO.janelaBotoes.xp.panel = new YAHOO.widget.Panel(idconteudonovo, {width:wj, fixedcenter: false, constraintoviewport: false, underlay:"none", close:i3GEO.barraDeBotoes.PERMITEFECHAR, visible:true, draggable:i3GEO.barraDeBotoes.PERMITEDESLOCAR, modal:false } );
		if((barraZoom == true) && $i("img")){
			if (!$i("imgClone")){
				iclone=document.createElement('IMG');
				iclone.style.position = "relative";
				iclone.id = "imgClone";
				iclone.style.border="1px solid blue";
				$i("img").parentNode.appendChild(iclone);
			}
			else
			{iclone = $i("imgClone");}
			iclone.style.display = "none";
			verticalSlider = YAHOO.widget.Slider.getVertSlider("vertBGDiv","vertHandleDiv", 0, 70);
			verticalSlider.onChange = function(offsetFromStart)
			{g_fatordezoom = (offsetFromStart - 35) / 5;};
			verticalSlider.setValue(35,true);
			if ($i("vertBGDiv")){
				$i("vertBGDiv").onmouseup = function(){
					i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,i3geo_ns)
					g_fatordezoom = 0;
					verticalSlider.setValue(35,true);
				};
			}
			if($i("vertHandleDiv")){
				$i("vertHandleDiv").onmousedown = function(){
					var corpo = $i("img");
					if(!corpo){return;}
					iclone.src = corpo.src;
					iclone.style.width = i3GEO.parametros.w;
					iclone.style.heigth = i3GEO.parametros.h;
					iclone.style.top = corpo.style.top;
					iclone.style.left = corpo.style.left;
					$i("img").style.display = "none";
					iclone.style.display = "block";
				};
			}
			if($i("vertHandleDiv")){
				$i("vertHandleDiv").onmousemove = function(){
					var corpo = $i("img");
					if(!corpo){return;}
					var nw = i3GEO.parametros.w;
					var nh = i3GEO.parametros.h;
					var nt = 0;
					var nl = 0;
					i3geo_ns = parseInt(i3GEO.parametros.mapscale);
					if ((g_fatordezoom > 0) && (g_fatordezoom < 7)){
						g_fatordezoom = g_fatordezoom + 1;
						var velhoh = parseInt(iclone.style.height);
						var velhow = parseInt(iclone.style.width);
						nh = i3GEO.parametros.h / g_fatordezoom;
						nw = i3GEO.parametros.w / g_fatordezoom;
						var t = parseInt(iclone.style.top);
						var l = parseInt(iclone.style.left);
						nt=t + ((velhoh - nh)*.5);
						if (navm){nl=0;}
						else
						{nl=l + ((velhow - nw)*.5);}
						var fatorEscala = nh/i3GEO.parametros.h;
						i3geo_ns=parseInt(i3GEO.parametros.mapscale / fatorEscala);
					}
					if ((g_fatordezoom < 0) && (g_fatordezoom > -7)){
						g_fatordezoom = g_fatordezoom - 1;
						var velhoh = parseInt(iclone.style.height);
						var velhow = parseInt(iclone.style.width);
						nh = i3GEO.parametros.h * g_fatordezoom * -1;
						nw = i3GEO.parametros.w * g_fatordezoom * -1;
						var t = parseInt(iclone.style.top);
						var l = parseInt(iclone.style.left);
						nt = t - ((nh - velhoh)*.5);
						nl = l - ((nw - velhow)*.5);
						var fatorEscala = nh/i3GEO.parametros.h;
						i3geo_ns=parseInt(i3GEO.parametros.mapscale / fatorEscala);
					}
					iclone.style.width = nw;
					iclone.style.height = nh;
					//$top("img",nt);
					//$left("img",nl);
					if (iclone.style.pixelTop)
					{iclone.style.pixelTop=nt;}
					else
					{iclone.style.top=nt+"px";}
					if (iclone.style.pixelLeft)
					{iclone.style.pixelLeft=nl;}
					else
					{iclone.style.left=nl+"px";}					
					if ($i("i3geo_escalanum"))
					{$i("i3geo_escalanum").value=i3geo_ns;}
				};
			}		
		}
		YAHOO.janelaBotoes.xp.panel.render();
		YAHOO.janelaBotoes.xp.panel.moveTo(x,y);
		if($i("sobeferramentas")){
			$i("sobeferramentas").onclick = function(){
				var elementos = $i(idconteudonovo+"_").getElementsByTagName("div");
				if(elementos[0].style.display == "inline")
				{return;}
				if(elementos.length > 0){
					var mostra = elementos[0];
					var i = 0;
					do{
						if(elementos[i].style){
							if(elementos[i].style.display == "inline")
							{break;}
							if(elementos[i].style.display == "none")
							{var mostra = elementos[i];}
						}
						var i = i + 1;
					}
					while(i < elementos.length)
					mostra.style.display="inline";
					//esconde o �ltimo botao
					var i = elementos.length - 1;
					var mostra = elementos[i];
					do{
						if(elementos[i].style){
							if(elementos[i].style.display == "inline")
							{var mostra = elementos[i];break;}
						}
						var i = i - 1;
					}
					while(i >= 0)
					mostra.style.display="none";
				}
			};
		}
		if($i("desceferramentas")){
			$i("desceferramentas").onclick = function(){
				var tipo = "inline";
				if($i(idconteudonovo+"_")){
					var elementos = $i(idconteudonovo+"_").getElementsByTagName("div");
					if(elementos[elementos.length - 1].style.display == tipo)
					{return;}
					if(elementos.length > 0){
						//esconde o primeiro botao
						var i = 0;
						do{
							if(elementos[i].style){
								if((elementos[i].style.display == "block") || (elementos[i].style.display == "inline") || (elementos[i].style.display == ""))
								{elementos[i].style.display="none";break;}
							}
							var i = i + 1;
						}
						while(i < elementos.length)
						//mostra o �ltimo botao
						var i = elementos.length-1;
						var mostra = elementos[i];
						do{
							if(elementos[i].style){
								if(elementos[i].style.display == tipo)
								{break;}
								if(elementos[i].style.display == "none")
								{var mostra = elementos[i];}
							}
							var i = i - 1;
						}
						while(i >= 0)
						mostra.style.display=tipo;
					}
				}
			};
		}
		i3GEO.barraDeBotoes.BARRAS.push(YAHOO.janelaBotoes.xp.panel);
		YAHOO.janelaBotoes.xp.panel.show();		
	},
	/*
	Function: reativa
	
	Reativa as barras de ferramentas j� criadas
	
	Parameters:
	
	indice {Integer} - �ndice do array BARRAS que guarda os objetos YAHOO com 
	as barras Se n�o for definido, todas as barras ser�o reativadas
	*/
	reativa: function(indice){
		if(arguments.length == 1)
			i3GEO.barraDeBotoes.BARRAS[indice].show();
		else{
			var n = i3GEO.barraDeBotoes.BARRAS.length;
			for(i=0;i<n;i++){
				i3GEO.barraDeBotoes.BARRAS[i].show();
			}
		}
	}
};
//YAHOO.log("carregou classe barradebotoes", "Classes i3geo");