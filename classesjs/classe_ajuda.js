/*jslint white:false,undef: false, rhino: true, onevar: true, evil: false */

/*
Title: Ajuda

Arquivo:

i3geo/classesjs/classe_ajuda.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = [];
}
/*
Classe: i3GEO.ajuda

Manipula��o das janelas de ajuda e outras coisas relacionadas.

Permite definir a mensagem padr�o da janela de mensagens. Abrir a janela e definir seu conte�do.
Controla tamb�m o letreiro m�vel que mostra mensagens especiais definidas em cada layer adicionado ao mapa.

Exemplos:

	Se vc n�o quiser que a janela seja aberta, inclua em seu HTML ou javascript
	
	i3GEO.ajuda.ATIVAJANELA = false;
	
	Para enviar uma mensagem para a janela, utilize
	
	i3GEO.ajuda.mostraJanela("texto");
*/
i3GEO.ajuda = {
	/*
	Propriedade: ATIVAJANELA
	
	Define se a janela de mensagens pode ou n�o ser aberta.
	
	Default:
	
	{true}
	
	Tipo:
	{Boolean}
	*/
	ATIVAJANELA: true,
	/*
	Propriedade: DIVAJUDA
	
	Nome do elemento HTML, do tipo DIV, que ir� conter os textos de ajuda.
	
	Se esse DIV for encontrado no mapa, os textos ser�o mostrados em seu interior.
	
	Default:
	
	{"i3geo_ajuda"}
	
	Tipo:
	{String}
	*/
	DIVAJUDA: "i3geo_ajuda",
	/*
	Propriedade: DIVLETREIRO
	
	Id do elemento HTML onde ser� inclu�do o banner (letreiro) de mensagens.
	
	Esse tipo de mensagem � obtida do METADATA "MENSAGEM" que pode ser inclu�do em um layer.
	
	Default:
	
	{"i3geo_letreiro"}
	
	Tipo:
	{String}
	*/
	DIVLETREIRO: "i3geo_letreiro",
	/*
	Propriedade: MENSAGEMPADRAO
	
	Mensagem que ser� inclu�da ao iniciar a janela de mensagens ou quando n�o houver
	mensagem definida para o elemento sobre o qual o mouse estaciona.
	
	Default:
	{""}
	
	Tipo:
	{String}
	*/
	MENSAGEMPADRAO: "",	
	/*
	Propriedade: TRANSICAOSUAVE
	
	Altera a transpar�ncia quando o mouse sobrep�e � janela e quando sai
	
	Tipo:
	{boolean}
	
	Default:
	{true}
	*/
	TRANSICAOSUAVE: true,
	/*
	Propriedade: OPACIDADE
	
	Valor da opacidade m�nima utilizada quando TRANSICAOSUAVE for igual a true.
	
	Varia de 0 a 100
	
	Tipo:
	{numeric}
	
	Default:
	{20}
	*/
	OPACIDADE: 20,
	/*
	Function: abreDoc

	Abre a documentacao do i3geo em uma nova janela do navegador
	*/
	abreDoc: function()
	{window.open(i3GEO.configura.locaplic+"/documentacao/index.html");},
	/*
	Function: abreJanela
	
	Abre a janela flutuante para mostrar as mensagens de ajuda.
	
	Essa fun��o � executada na inicializa��o do i3GEO
	*/
	abreJanela: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.ajuda.abreJanela()");}
		try	{
			var nx,ny,pos,corpo,texto,janela;				
			if(i3GEO.ajuda.ATIVAJANELA === false){return;}
			if (!$i("janelaMenTexto")){
				corpo = $i(i3GEO.Interface.IDCORPO);
				if(corpo){
					pos = YAHOO.util.Dom.getXY(corpo);
					nx = pos[0] - 267;
					ny = i3GEO.parametros.h - 70;
				}
				texto = '<div id="janelaMenTexto" style="text-align:left;font-size:10px;color:rgb(80,80,80)">'+i3GEO.ajuda.MENSAGEMPADRAO+'</div>';
				janela = i3GEO.janela.cria("262","auto","",nx,ny,"&nbsp;","i3geo_janelaMensagens",false);
				janela[2].innerHTML = texto;
				YAHOO.util.Event.addListener(janela[0].close, "click", i3GEO.ajuda.fechaJanela);
				i3GEO.ajuda.ativaCookie();
			}
		}
		catch(e){
			if(typeof(console) !== 'undefined'){console.error("i3GEO.ajuda.abreJanela "+e);}
		}
	},
	/*
	Function: ativaCookie
	
	Ativa o cookie g_janelaMen e inclui o valor "sim".
	
	Toda a vez que a janela � aberta, o cookie � ativado.
	
	Ativando-se o cookie, a janela de mensagens ser� aberta automaticamente a pr�xima vez que o i3geo for iniciado
	*/
	ativaCookie: function(){
		i3GEO.util.insereCookie("g_janelaMen","sim");
	},
	/*
	Function: ativaLetreiro
	
	Busca mensagens no metadata "MENSAGEM" existentes nos layers do mapa.
	
	Se existirem mensagens, as mesmas s�o inclu�das no letreiro.
	
	O letreiro deve ser um elemento do tipo INPUT (text).
	
	Parametro:
	
	mensagem {String} - (opcional) texto que ser� mostrado no letreiro. Se n�o for informado
	ser� utilizado a vari�vel i3GEO.parametros.mensagens
	*/
	ativaLetreiro: function(mensagem){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.ajuda.ativaLetreiro()");}
		var l;
		if($i(i3GEO.ajuda.DIVLETREIRO))
		{
			if(arguments.length === 0)
			{mensagem = i3GEO.parametros.mensagens;}
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.ajuda.ativaLetreiro()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.ajuda.ativaLetreiro()");}					
			try
			{clearTimeout(i3GEO.ajuda.tempoLetreiro);}
			catch(e){i3GEO.ajuda.tempoLetreiro = "";}
			l = $i(i3GEO.ajuda.DIVLETREIRO);
			if(l.style.display=="none"){return;}
			l.style.cursor="pointer";
			if(mensagem === ""){
				l.value = "";
				return;
			}
			if (l.size == 1)
			{l.size = i3GEO.parametros.w / 8;}
			BMessage = mensagem + " ---Clique para parar--- ";
			l.onclick = function()
			{l.style.display = "none";};
			if (BMessage != " ---Clique para parar--- "){
				BQuantas = 0;
				BSize = l.size;
				BPos=BSize;
				BSpeed = 1;
				BSpaces = "";
				i3GEO.ajuda.mostraLetreiro();
			}
			i3GEO.ajuda.mostraLetreiro(mensagem);
		}
	},
	/*
	Function: desativaCookie
	
	Desativa o cookie g_janelaMen.
	
	Toda a vez que a janela � fechada, o cookie � desativado.

	Desativando-se o cookie, a janela de mensagens n�o ser� aberta automaticamente a pr�xima vez que o i3geo for iniciado
	*/
	desativaCookie: function(){
		i3GEO.util.insereCookie("g_janelaMen","nao");
	},
	/*
	Function: fechaJanela. 
	
	Fecha a janela de ajuda.
	*/
	fechaJanela: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.ajuda.fechaJanela()");}
		i3GEO.ajuda.desativaCookie();
		var j = $i("i3geo_janelaMensagens_c");
		if(j)
		{document.body.removeChild(j);}
	},
	/*
	Function: mostraJanela
	
	Mostra um texto dentro da janela de mensagens padr�o.
	
	Parametro:
	
	texto {String} - texto a ser mostrado
	*/
	mostraJanela: function(texto){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.ajuda.mostraJanela()");}
		var j,k;
		j = $i(i3GEO.ajuda.DIVAJUDA);
		if(j){
			if (texto === ""){j.innerHTML="-";}
			else
			{j.innerHTML= texto;}
		}
		else{
			k = $i("janelaMenTexto");
			if(k && i3GEO.ajuda.TRANSICAOSUAVE){
				j = $i("i3geo_janelaMensagens");
				if(texto !== ""){
					if (navm)
					{j.style.filter='alpha(opacity=100)';}
					else
					{j.style.opacity= 1;}				
				}
				else{
					if (navm)
					{j.style.filter='alpha(opacity='+i3GEO.ajuda.OPACIDADE+')';}
					else
					{j.style.opacity= i3GEO.ajuda.OPACIDADE / 100;}								
				}
			}
			if(k){k.innerHTML= texto;}
		}
	},
	/*
	Private: mostraLetreiro
	
	Preenche o elemento INPUT com a mesnagem de texto e faz a movimenta��o das letras.
	
	O aparecimento das letras � controlado por um temporizador e asmensagens s�o mostradas apenas duas vezes,
	desde o in�cio do redesenho do mapa.
	*/
	mostraLetreiro: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.ajuda.mostraLetreiro()");}
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
		{i3GEO.ajuda.tempoLetreiro = setTimeout('i3GEO.ajuda.mostraLetreiro();', 140);}
	}
};
//
//para efeitos de compatibilidade
//
try{
	if(i3GEO.ajuda.MENSAGEMPADRAO === ""){
		try {
			if (g_mensagempadrao !== "")	
			{i3GEO.ajuda.MENSAGEMPADRAO = g_mensagempadrao;}
			else
			{i3GEO.ajuda.MENSAGEMPADRAO = $trad("p1");}
		}
		catch(e){i3GEO.ajuda.MENSAGEMPADRAO = $trad("p1");}
	}
}
catch(e){}
if(document.getElementById("bannerMensagem"))
{i3GEO.ajuda.DIVLETREIRO = "bannerMensagem";}
//YAHOO.log("carregou classe ajuda", "Classes i3geo");