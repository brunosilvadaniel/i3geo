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
*/
i3GEO.maparef = {
	/*
	Variable: fatorZoomDinamico
	
	Define o fator de zoom inicial do mapa de refer�ncia quando o modo din�mico for ativado
	*/
	fatorZoomDinamico: -3,
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
			var ins = '<div class="hd">';
			var temp = "javascript:if(i3GEO.maparef.fatorZoomDinamico == -1){i3GEO.maparef.fatorZoomDinamico = 1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico + 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";
			ins += "<img class=mais onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />";
			var temp = "javascript:if(i3GEO.maparef.fatorZoomDinamico == 1){i3GEO.maparef.fatorZoomDinamico = -1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico - 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";
			ins += "<img class=menos onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />&nbsp;";
			
			ins += "<select id='refDinamico' onchange='javascript:i3GEO.maparef.atualiza()'>";
			ins += "<option value='fixo' select >fixo</option>";
			ins += "<option value='mapa' >mapa</option>";
			ins += "<option value='dinamico' >din�mico</option>";
			ins += "</select>";
			ins += "</div>";
			//ins += '<input style="cursor:pointer" onclick="javascript:i3GEO.maparef.atualiza()" type="checkbox" id="refDinamico" />&nbsp;'+$trad("o6")+'</div>';
			ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="this.onmousemove=function(exy){i3GEO.eventos.posicaoMouseMapa(exy)}" onclick="javascript:i3GEO.maparef.click()">';
			ins += '<img style="cursor:pointer;" id=imagemReferencia src="" >';
			//ins += '<div id=boxRef style="position:absolute;top:0px;left:0px;width:10px;height:10px;border:2px solid blue;display:none"></div></div>';
			ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
			novoel.innerHTML = ins;
			document.body.appendChild(novoel);
		}
		if($i("i3geo_winRef").style.display != "block"){
			$i("i3geo_winRef").style.display = "block";
			YAHOO.namespace("janelaRef.xp");
			YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("i3geo_winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaRef.xp.panel.render();
			var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
			if (navm){YAHOO.janelaRef.xp.panel.moveTo((pos[0]+i3GEO.parametros.w-160),pos[1]+4);}
			else
			{YAHOO.janelaRef.xp.panel.moveTo((pos[0]+i3GEO.parametros.w-160),pos[1]+4);}
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
			//YAHOO.log("Atualizando o mapa de refer�ncia", "i3geo");
			if(tiporef == "dinamico"){
				i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico,tiporef);
			}
			if(tiporef == "fixo"){
				if(($i("imagemReferencia").src == "") || (i3GEO.parametros.cgi != "sim")){
					i3GEO.php.referencia(i3GEO.maparef.processaImagem);
				}
				else{
					var re = new RegExp("&mode=map", "g");
					$i("imagemReferencia").src = $i(i3GEO.interface.IDMAPA).src.replace(re,'&mode=reference');
					i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src);
				}
			}
			if(tiporef == "mapa"){
				i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico,tiporef);
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
				if ((i3GEO.parametros.mapscale < 15000000) && (i3GEO.parametros.mapscale > 10000000)){
					$i("refmensagem").innerHTML = "Para navegar no mapa principal, voc&ecirc; pode clicar em um ponto no mapa de refer&ecirc;ncia.";
					$i("refmensagem").style.fontSize="10px";
				}
				else{
					$i("refmensagem").innerHTML = "";
					$i("refmensagem").style.fontSize="0px";
				}
			}
			i3GEO.gadgets.quadros.grava("referencia",refimagem);
			//YAHOO.log("Conclu�da imagem de refer�ncia", "redesenho");
		}
		else
		{YAHOO.log("Erro na imagem de refer�ncia", "redesenho");}
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