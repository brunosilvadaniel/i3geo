/*
Class: i3GEO.ajuda

Manipula��o das janelas de ajuda e outras coisas relacionadas.

Permite definir a mensagem padr�o da janela de mensagens. Abria a janela e definir seu conte�do.

File: i3geo/classesjs/classe_ajuda.js

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
i3GEO.ajuda = {
	/*
	Property: MENSAGEMPADRAO
	
	Mensagem que ser� inclu�da ao iniciar a janela de mensagens.
	
	Default ""
	
	Type:
	{String}
	*/
	MENSAGEMPADRAO: "",
	/*
	Property: ATIVAJANELA
	
	Define se a janela de mensagens pode ou n�o ser aberta.
	
	Default true
	
	Type:
	{Boolean}
	*/
	ATIVAJANELA: true,
	/*
	Property: DIVAJUDA
	
	Nome do elemento HTML do tipo DIV que ir� conter os textos de ajuda.
	
	Se esse DIV for encontrado no mapa, os textos ser�o mostrados em seu interior.
	
	Default "i3geo_ajuda"
	
	Type:
	{String}
	*/
	DIVAJUDA: "i3geo_ajuda",
	/*
	Property: DIVLETREIRO
	
	Id do elemento HTML onde ser� inclu�do o banner (letreiro) de mensagens.
	
	Esse tipo de mensagem � obtida do METADATA "MENSAGEM" que pode ser inclu�do em um layer.
	
	Default "bannerMensagem"
	
	Type:
	{String}
	*/
	DIVLETREIRO: "i3geo_letreiro",
	
		
	mostraTip: function(){
	},
	/*
	Function: mostraJanela
	
	Mostra um texto dentro da janela de mensagens
	
	Parameters:
	
	texto {String} - tetxo a ser inclu�do
	*/
	mostraJanela: function(texto){
		if ($i(i3GEO.ajuda.DIVAJUDA)){
			if (texto == ""){$i(i3GEO.ajuda.DIVAJUDA).innerHTML="-";}
			else
			{$i(i3GEO.ajuda.DIVAJUDA).innerHTML= texto;}
		}
		else{
			if ($i("janelaMenTexto"))
			{$i("janelaMenTexto").innerHTML= texto;}
		}
	},
	/*
	Function: abreJanela
	
	Abre a janela flutuante para mostrar as mensagens de ajuda.
	
	*/
	abreJanela: function(){
		try	{
			if(i3GEO.ajuda.ATIVAJANELA == false){return;}
			if (!$i("janelaMenTexto")){
				var nx = "";
				var ny = "";
				if($i("img")){
					var pos = YAHOO.util.Dom.getXY($i("img"));
					var nx = pos[0] - 267;
					var ny = objmapa.h - 70;
				}
				var texto = '<div id="janelaMenTexto" style="text-align:left;font-size:10px;color:rgb(80,80,80)">'+i3GEO.ajuda.MENSAGEMPADRAO+'</div>';
				var janela = i3GEO.janela.cria("266","auto","",nx,ny,"&nbsp;","i3geo_janelaMensagens",false);
				janela[2].innerHTML = texto;
				YAHOO.util.Event.addListener(janela[0].close, "click", i3GEO.ajuda.fechaJanela);
				i3GEO.ajuda.ativaCookie();
			}
		}
		catch(e){}
	},
	/*
	Function: fechaJanela
	
	Fecha a janela de ajuda.
	*/
	fechaJanela: function(){
		i3GEO.ajuda.desativaCookie();
		document.body.removeChild($i("i3geo_janelaMensagens_c"));
	},
	/*
	Function: ativaCookie
	
	Ativa o cookie g_janelaMen e inclui o valor "sim".
	
	Ativando-se o cookie, a janela de mensagens ser� aberta automaticamente a pr�xima vez que o i3geo for iniciado
	*/
	ativaCookie: function(){
		i3GEO.util.insereCookie("g_janelaMen","sim");
	},
	/*
	Function: desativaCookie
	
	Desativa o cookie g_janelaMen.

	Desativando-se o cookie, a janela de mensagens n�o ser� aberta automaticamente a pr�xima vez que o i3geo for iniciado
	*/
	desativaCookie: function(){
		i3GEO.util.insereCookie("g_janelaMen","nao");
	},
	
	reposicionaJanela: function(){
	},
	
	/*
	Function: ativaLetreiro
	
	Busca mensagens no metadata "MENSAGEM" existentes nos layers do mapa.
	
	Se existirem mensagens, as mesmas s�o inclu�das no letreiro.
	
	O letreiro deve ser um elemento do tipo INPUT (text).
	
	Parameters:
	
	locaplic {String} - endere�o do i3geo para a chamada ajax
	
	sid {String} - c�digoda se��o no servidor
	*/
	ativaLetreiro: function(locaplic,sid){
		if($i(i3GEO.ajuda.DIVLETREIRO))
		{
			try
			{clearTimeout(i3GEO.ajuda.tempoLetreiro);}
			catch(e){i3GEO.ajuda.tempoLetreiro = "";}
			var l= $i(i3GEO.ajuda.DIVLETREIRO);
			if(l.style.display=="none"){return;}
			l.style.cursor="pointer";
			var montaLetreiro = function(retorno)
			{
				if(retorno.data == ""){
					l.value = "";
					return;
				}
				if (l.size == 1)
				{l.size = objmapa.w / 8;}
				BMessage = retorno.data + " ---Clique para parar--- ";
				l.onclick = function()
				{l.style.display = "none";};
				if (BMessage != " ---Clique para parar--- ")
				{
					BQuantas = 0;
					BSize = l.size;
					BPos=BSize;
					BSpeed = 1;
					BSpaces = "";
					i3GEO.ajuda.mostraLetreiro();
				}
			};
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			var p = locaplic+"/classesphp/mapa_controle.php?funcao=pegaMensagens&g_sid="+sid;
			cp.call(p,"pegaMensagem",montaLetreiro);	
		}
	},
	mostraLetreiro: function(){
		for (count=0; count<BPos; count++)
		{BSpaces+= " ";}
		if (BPos < 1){
			$i(i3GEO.ajuda.DIVLETREIRO).value = BMessage.substring(Math.abs(BPos), BMessage.length);
			if (BPos+BMessage.length < 1)
			{BPos = BSize;BQuantas = BQuantas + 1;}
		}
		else
		{$i(i3GEO.ajuda.DIVLETREIRO).value = BSpaces + BMessage;}
		BPos-=BSpeed;
		if (BQuantas < 2)
		i3GEO.ajuda.tempoLetreiro = setTimeout('i3GEO.ajuda.mostraLetreiro();', 140);
	}
};
//
//para efeitos de compatibilidade
//
if(i3GEO.ajuda.MENSAGEMPADRAO == ""){
	try {
		if (g_mensagempadrao != "")	
		{i3GEO.ajuda.MENSAGEMPADRAO = g_mensagempadrao;}
		else
		i3GEO.ajuda.MENSAGEMPADRAO = $trad("p1");
	}
	catch(e){i3GEO.ajuda.MENSAGEMPADRAO = $trad("p1");}
}
if(document.getElementById("bannerMensagem"))
{i3GEO.ajuda.DIVLETREIRO = "bannerMensagem";}
