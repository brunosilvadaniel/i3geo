if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Function: iCookie (depreciado)

Utilize i3GEO.util

Cria um cookie.
*/
function iCookie(nome,valor)
{
	i3GEO.util.insereCookie(nome,valor);
}
/*
Function: pCookie (depreciado)

Utilize i3GEO.util.pegaCookie
*/
function pCookie(nome)
{
	i3GEO.util.pegaCookie(nome);
}
/*
Function: trocalingua (depreciado)

Utilize i3GEO.idioma.trocaIdioma
*/
function trocalingua(l)
{
	i3GEO.idioma.trocaIdioma(l);
}
/*
Function: initJanelaMen (depreciado)
*/
function initJanelaMen()
{i3GEO.ajuda.abreJanela();}
/* 
Function: pegalistademenus (depreciado)
*/
function pegalistademenus(retorno)
{alert("Funcao pegalistademenus foi depreciado. Utilize i3GEO.arvoreDeTemas");}
/*
Function: wdocaf (depreciado)
*/
function wdocaf(wlargura,waltura,wsrc,nx,ny,texto)
{var janela = i3GEO.janela.cria(wlargura,waltura,wsrc,nx,ny,texto);}
/*
Function: redimwdocaf (depreciado)
*/
function redimwdocaf(w,h)
{i3GEO.janela.alteraTamanho(w,h);}
/*
Function: wdocaf2 (depreciado)
*/
function wdocaf2(wlargura,waltura,wsrc,nx,ny,texto)
{
	var id = YAHOO.util.Dom.generateId();
	i3GEO.janela.cria(wlargura,waltura,wsrc,nx,ny,texto,id,true);
}
/*
Function: wdocafechaf (depreciado)
*/
function wdocafechaf(odoca)
{alert("wdocafechaf foi depreciado");}
/*
Function: mostradicasf (depreciado)
*/
function mostradicasf(objeto,dica,hlpt)
{i3GEO.ajuda.mostraJanela(dica);}	
/*
Function: mudaboxnf (depreciado)
*/
function mudaboxnf(tipo,obj,nomeFuncao)
{
	alert("mudaboxnf foi depreciado");
}
/*
Function: inverteStatusClasse (depreciado)
*/
/*
Function: procurartemas (depreciado)

Localiza um tema no menu de temas.
*/
function procurartemas(texto)
{}
/*
Function: expandeTema (depreciado)

*/
function expandeTema(itemID)
{
	//verifica se clicou para expandir a legenda
	var tema = itemID.split("legenda");
	if (tema.length == 2)
	{
		g_arvoreClick = itemID;
		tema = tema[1];
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&template=legenda2.htm&tema="+tema+"&g_sid="+g_sid;
		cpObj.call(p,"criaLegenda",expandeLegendaVer);
	}
}
/*
Function: expandeGrupo (depreciado)
*/
/*
Function: processaGrupos (depreciado)
*/
/*
Function: pegavalSistemas (depreciado)

Adiciona uma �rvore no menu de adi��o de temas, contendo os sistemas que podem ser executados.
*/
function pegavalSistemas(sis)
{alert("Funcao pegavalSistemas foi depreciada - veja i3GEO.arvoreDeTemas");}
/*
Function: processevent1 (depreciado)

Captura a posi��o do mouse tendo como refer�ncia o navegador.

Atualiza o objeto objposicaomouse e movimenta as janelas doc�veis.

Recalcula a posi��o correta da imagem do mapa.

Parameters:

exy1 - objeto evento.
*/
function processevent1(exy1)
{}
/*
Function: ativaDragDrop (depreciado)

Ativa a funcionalidade de arrastar e soltar para altera��o da ordem de desenho dos temas e para excluir um tema do mapa.
*/
/*
Function: removeAcentos (depreciado)
*/
function removeAcentos(palavra)
{
	return(i3GEO.util.removeAcentos(palavra));
}
/*
Function: ativaMensagemBanner (depreciado
*/
function ativaMensagemBanner()
{alert("veja i3GEO.ajuda");}
/*
Function: mensagemBanner (depreciado)
*/
function mensagemBanner()
{}
/*
Function: mensagemf (depreciado)

Abre uma mensagem na tela em um DIV.

A mensagem � inclu�da em um elemento HTML com id ="mensagem"

Parameters:

m - mensagem que ser� mostrada.
*/
function mensagemf(m)
{
	try
	{
		//insere o div para mensagens
		if (!$i("mensagem"))
		{
			var novoel = document.createElement("div");
			novoel.id = 'mensagem';
			novoel.innerHTML = '<table width="50" style="border: 1px solid #000000;"> <tr> <td onclick="mensagemf()" style="text-align:left;cursor:pointer" class="tdclara"> <img src="'+g_locaplic+'/imagens/excluir.png" /> </td> <td style="text-align:left" class="tdclara"> <input style="text-align:left" class="textocb" type="text" id="mensagemt" size="70" value="" /> </td></tr> </table>';
			if($i("i3geo"))
			{$i("i3geo").appendChild(novoel);}
			else
			{document.body.appendChild(novoel);}
		}
		if (m == null)
		{$i("mensagem").style.visibility = "hidden";}
		else
		{
			$i("mensagemt").value = m;
			$i("mensagem").style.visibility = "visible";
		}
		var pos = pegaPosicaoObjeto($i("img"));
		pos[1] = pos[1] + parseInt($i("img").style.height) - 22;
		eval ('document.getElementById("mensagem").style.' + g_tipoleft + ' = pos[0] + g_postpx');
		eval ('document.getElementById("mensagem").style.' + g_tipotop + ' = pos[1] + g_postpx');
	}
	catch(e){alert("Impossivel criar mensagem."+e);}
}
/*
Function: aguarde (depreciado)
*/
function aguarde()
{
	this.abre = function(aguardeId,texto)
	{
		i3GEO.janela.abreAguarde(aguardeId,texto);		
	};
	this.fecha = function(aguardeId)
	{
		i3GEO.janela.fechaAguarde(aguardeId);
	};
}
/*
Function: zoomiauto (depreciado)
*/
function zoomiauto()
{i3GEO.navega.zoomin(g_locaplic,g_sid);}
/*
Function: zoomoauto (depreciado)
*/
function zoomoauto()
{i3GEO.navega.zoomout(g_locaplic,g_sid);}
/*
Function: convdmsddf (depreciado)
*/
function convdmsddf(cd,cm,cs)
{return (i3GEO.util.dsm2dd(cd,cm,cs));}
/*
Function: zoomPonto (depreciado)
*/
function zoomPonto()
{alert("utilize i3GEO.navega.zoomponto");}
/*
Function: zoomIP (depreciado)
*/
function zoomIP()
{alert("zoomIP foi depreciado. Utilize i3GEO.navega.zoomIP");}
/*
Function: zoomtot
*/
function zoomtot()
{alert("zoomtot foi depreciado. Utilize i3GEO.navega.zoomExt");}
/*
Function: atualizaFarol (depreciado)
*/
/*
Function: panFixo (depreciado)
*/
function panFixo(direcao,w,h,escala)
{alert("panFixo foi depreciado. Utilize i3GEO.navega.panFixo");}
/*
Function: protocolo (depreciado)

Utilize i3GEO.util
*/
function protocolo()
{i3GEO.util.protocolo();}
//Mantido aqui apenas para fins de compatibilidade
function borra()
{}
/*
Function: pegaPosicaoObjeto (depreciado)
*/
function pegaPosicaoObjeto(obj)
{i3GEO.util.pegaPosicaoObjeto(obj);}
/*
Function: i3geo_pegaElementoPai (depreciado)
*/
function i3geo_pegaElementoPai(e)
{i3GEO.util.pegaElementoPai(e);}
/*
Function: convddtela (depreciado)
*/
function convddtela(vx,vy,docmapa)
{i3GEO.util.dd2tela(vx,vy,docmapa,objmapa.extent,objmapa.cellsize);}
/*
Function: convdmsf (depreciado)
*/
function convdmsf(x,y)
{i3GEO.util.dd2dms(x,y);}
/*
Function: calcddf (depreciado)
*/
function calcddf(xfign,yfign,g_celula,imgext)
{i3GEO.util.tela2dd(xfign,yfign,g_celula,imgext);}