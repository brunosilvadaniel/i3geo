/*
Title: Mapa de refer�ncia

File: i3geo/classesjs/classe_maparef.js

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
Class: i3GEO.maparef

Cria e processa o mapa de refer�ncia

Exemplo:

i3Geo.maparef.inicia()
*/
i3GEO.maparef = {
	/*
	Variable: fatorZoomDinamico
	
	Define o fator de zoom inicial do mapa de refer�ncia quando o modo din�mico for ativado
	*/
	fatorZoomDinamico: -3,
	/*
	Property: TOP
	
	Posi��o da janela em rela��o ao topo do mapa
	
	{Numeric}
	*/
	TOP: 4,
	/*
	Property: RIGHT
	
	Posi��o da janela em rela��o ao lado direito do mapa
	
	{Numeric}
	*/
	RIGHT:0,
	/*
	Function: inicia
	
	Inicializa o mapa de refer�ncia
	*/
	inicia: function(){
		//YAHOO.log("initJanelaRef", "i3geo");
		if (!$i("i3geo_winRef")){
			var novoel = document.createElement("div");
			novoel.id = "i3geo_winRef";
			novoel.style.display="none";
			novoel.style.borderColor="gray";
			var ins = '<div class="hd" style="text-align:left;z-index:20;"><span id=maparefmaismenosZoom ';
			var temp = "javascript:if(i3GEO.maparef.fatorZoomDinamico == -1){i3GEO.maparef.fatorZoomDinamico = 1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico + 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";
			ins += "<img class=mais onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />";
			var temp = "javascript:if(i3GEO.maparef.fatorZoomDinamico == 1){i3GEO.maparef.fatorZoomDinamico = -1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico - 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";
			ins += "<img class=menos onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" /></span>&nbsp;";		
			ins += "<select id='refDinamico' onchange='javascript:i3GEO.maparef.atualiza()'>";
			ins += "<option value='fixo' select >fixo</option>";
			ins += "<option value='mapa' >mapa</option>";
			ins += "<option value='dinamico' >din�mico</option>";
			ins += "</select>";
			ins += "</div>";
			ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="this.onmousemove=function(exy){i3GEO.eventos.posicaoMouseMapa(exy)}"  >';
			ins += '<img style="cursor:pointer;" id=imagemReferencia src="" onclick="javascript:i3GEO.maparef.click()">';
			//ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
			novoel.innerHTML = ins;
			document.body.appendChild(novoel);
		}
		if($i("i3geo_winRef").style.display != "block"){
			$i("i3geo_winRef").style.display = "block";
			YAHOO.namespace("janelaRef.xp");
			YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("i3geo_winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaRef.xp.panel.render();
			var r = $i("i3geo_winRef_c");
			if(r){
				r.style.clip = "rect(0px, 160px, 179px, 0px)";
				r.style.position = "absolute";
			}
			var pos = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.interface.IDCORPO));

			var moveX = pos[0] + i3GEO.parametros.w + 153 - i3GEO.maparef.RIGHT - 300;
			var moveY = pos[1] + i3GEO.maparef.TOP;
			YAHOO.janelaRef.xp.panel.moveTo(moveX,moveY);
			var escondeRef = function(){
				YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close, "click");
				YAHOO.janelaRef.xp.panel.destroy();	
				i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay","none");
			};
			YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close, "click", escondeRef);	
			i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay","block");
			if(typeof(atualizaLocalizarxy) == "function"){
				if(i3GEO.gadgets.PARAMETROS.mostraCoordenadasGEO.idhtml)
				YAHOO.util.Event.addListener($i("imagemReferencia"),"mousemove", atualizaLocalizarxy);
			}
		}
		//YAHOO.log("Fim initJanelaRef", "i3geo");
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.maparef.atualiza()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.maparef.atualiza()");}
		this.atualiza();
	},
	/*
	Function: atualiza
	
	Atualiza o mapa de refer�ncia.

	Se o modo cgi estiver ativado, o mapa de refer�ncia � desenhado utilizando-se como src da imagem o programa cgi do Mapserver.
	
	No modo din�mico, a imagem � gerada de forma diferenciada. Nesse caso, o modo cgi � desabilitado.
	
	O atualizaReferencia � sempre chamado ap�s o mapa ser redesenhado.
	
	Se houve altera��o na extens�o, � preciso refazer o mapa de refer�ncia se n�o, a imagem atual � armazenada no quado de anima��o
	*/
	atualiza: function(){
		var dinamico = false;
		if ($i("refDinamico"))
		{var tiporef = $i("refDinamico").value;}
		if ($i("mapaReferencia")){
			var temp = $i("maparefmaismenosZoom");
			if(tiporef == "dinamico"){
				i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico,tiporef);
				if(temp){temp.style.display="inline";}
			}
			if(tiporef == "fixo"){
				if(($i("imagemReferencia").src == "") || (i3GEO.parametros.cgi != "sim")){
					i3GEO.php.referencia(i3GEO.maparef.processaImagem);
					if(temp){temp.style.display="none";}
				}
				else{
					var re = new RegExp("&mode=map", "g");
					$i("imagemReferencia").src = $i(i3GEO.interface.IDMAPA).src.replace(re,'&mode=reference');
					i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src);
				}
			}
			if(tiporef == "mapa"){
				i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico,tiporef);
				if(temp){temp.style.display="inline";}
			}
		}
		else{
			if($i("imagemReferencia"))
			i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src);
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.maparef.atualiza()");
		}
	},
	/*
	Function: processaImagem
		
	Substitu� a imagem do mapa de refer�ncia pela �ltima gerada.

	Esta fun��o processa os dados de uma chamada AJAX para atualizar o mapa de refer�ncia
	
	Parameters:

	retorno - string no formato "var refimagem='nome da imagem'".
	*/
	processaImagem: function(retorno){
		i3GEO.janela.fechaAguarde("ajaxreferencia1");
		if ((retorno.data != "erro") && (retorno.data != undefined)){
			eval(retorno.data);
			i3GEO.parametros.celularef = g_celularef;
			i3GEO.parametros.extentref = extentref;
			if ($i("imagemReferencia")){
				var m = new Image();
				m.src = refimagem;
				$i("imagemReferencia").src=m.src;
			}
			i3GEO.gadgets.quadros.grava("referencia",refimagem);
			var tiporef = "fixo";
			if ($i("refDinamico"))
			{var tiporef = $i("refDinamico").value;}
			var box = $i("boxref");
			if(tiporef != "fixo"){
				if (box){box.style.display = "none"}
				return;
			}
			//
			//box movel sobre o mapa
			//
			if (!box){
				var novoel = document.createElement("div");
				novoel.id = "boxref";
				novoel.style.zIndex=10;
				novoel.style.position = 'absolute';
				//novoel.style.border = '1px solid blue';
				novoel.style.backgroundColor = "RGB(120,220,220)";
				novoel.style.cursor = "move";
				//Object.style.clip=rect(top,right,bottom,left)|auto
				//novoel.style.clip="rect(0,0,200,200)";
				if (navm)
				{novoel.style.filter='alpha(opacity=40)';}
				else
				{novoel.style.opacity= .4;}
				$i("mapaReferencia").appendChild(novoel);
				var boxrefdd = new YAHOO.util.DD("boxref");
				novoel.onmouseup = function(){
					var rect = $i("boxref");
					var telaminx = parseInt(rect.style.left);
					var telamaxy = parseInt(rect.style.top);
					var telamaxx = telaminx + parseInt(rect.style.width);
					var telaminy = telamaxy + parseInt(rect.style.height);
					var m = i3GEO.calculo.tela2dd(telaminx,telaminy,i3GEO.parametros.celularef,i3GEO.parametros.extentref);
					var x = i3GEO.calculo.tela2dd(telamaxx,telamaxy,i3GEO.parametros.celularef,i3GEO.parametros.extentref);
					var ext = m[0]+" "+m[1]+" "+x[0]+" "+x[1];
					i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",ext);
				}
				var box = $i("boxref");
			}
			i3GEO.calculo.ext2rect("boxref",extentref,i3GEO.parametros.mapexten,g_celularef,$i("mapaReferencia"));
			if(parseInt(box.style.width) > 120)
			box.style.display = "none";
			else{
				box.style.display = "block";
				box.style.top = parseInt(box.style.top)+2;
				box.style.left = parseInt(box.style.left)+2;
			}
		}
	},
	/*
	Function: click
	
	Ocorre quando o usu�rio clica sobre o mapa de refer�ncia, alterando a extens�o geogr�fica do mapa principal
	*/
	click: function(){
		try{
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			i3GEO.php.pan(i3GEO.atualiza,i3GEO.parametros.mapscale,"ref",objposicaocursor.refx,objposicaocursor.refy);
		}
		catch(e)
		{var e = "";i3GEO.janela.fechaAguarde("i3GEO.atualiza");}	
	}
};
//YAHOO.log("carregou classe maparef", "Classes i3geo");