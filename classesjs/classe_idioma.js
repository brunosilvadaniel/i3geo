/*
Title: Idioma

File: i3geo/classesjs/classe_idioma.js

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
Class: i3geo.idioma

Tradu��o da interface principal.

Fornece os m�todos para traduzir frases para idiomas espec�ficos.

O dicion�rio � definido em i3geo/classesjs/dicionario.js

Se voc� est� customizando o i3geo,acrescentandonovas funcionalidades,
utilize o m�todo alteraDicionario para acrescentar novas tradu��es, dessa forma,
quandoo usu�rio escolher oidioma ainterface ser� adaptada corretamente.

Exemplos:

i3GEO.idioma.define("pt");

i3GEO.idioma.defineDicionario(g_traducao);

i3GEO.idioma.alteraDicionario("d22","novo oi");

alert($trad("d22"))
*/
i3GEO.idioma = {
	/*
	Property: MOSTRASELETOR
	
	Define se o i3Geo ir� incluir no mapa as bandeiras de sele��o de idiomas
	
	Type:
	{Boolean}
	
	Default:
	true
	*/
	MOSTRASELETOR: true,
	/*
	Property: IDSELETOR
	
	Define o id do elemento HTML que receber� o seletor. Se n�o for definido, o seletor ser�
	posicionado automaticamente pelo i3Geo
	
	Type:
	{String}
	
	Default:
	""
	*/
	IDSELETOR: "",
	/*
	Property: SELETORES
	
	Lista os seletores (bandeiras) que ser�o inclu�das no seletor
	
	Type:
	{Array}
	
	Default:
	"pt","en","es","it"
	*/
	SELETORES: new Array("pt","en","es","it"),
	/*
	Property: DICIONARIO
	
	Define o objeto com o dicion�rio utilizado
	*/
	DICIONARIO: g_traducao,
	/*
	Function: define
	
	Define qual o idioma em uso. O default � "pt". 
   
	Parameters:
	codigo - {String} C�digo do idioma.
	*/
	define: function(codigo) {
		i3GEO.idioma.ATUAL = codigo;
		i3GEO.util.insereCookie("i3geolingua",codigo);
	},
	/*
	Function: retornaAtual
	
	Retorna o idioma atual. 
       
	Returns:
	{string} C�digo do idioma.
	*/	
	retornaAtual: function() {
		return (i3GEO.idioma.ATUAL);
	},
	/*
	Function: defineDicionario
	
	Define o objeto com as tradu��es. O default � "g_traducao"
   
	Parameters:
	obj - {Object} Objeto com a tradu��o.
     
	Example:
	
	g_traducao = {
	
	"p1": [{
	
		pt:"texto em portugues",
		
		en:"texto em ingles",
		
		es:"texto em espanhol"
		
		}]
		
	}
	*/
	defineDicionario: function(obj) {
		i3GEO.idioma.DICIONARIO = obj;
	},
	/*
	Function: alteraDicionario
	
	Altera um texto do dicionario ou acresecenta um novo texto para o idioma atual. 
   
	Parameters:
	id - {String} C�digo do texto.
	novo - (String) Novo texto.
     
	*/
	alteraDicionario: function(id,novo) {
		i3GEO.idioma.DICIONARIO[id][0][i3GEO.idioma.ATUAL] = novo;
	},
	/*
	Function: traduzir
	
	Traduz um texto para o idioma escolhido
   
	Parameters:
	id - {String} C�digo do texto.
     
	Returns:
	{String} Texto traduzido.
	*/
	traduzir: function(id) {
		if(i3GEO.idioma.DICIONARIO[id]){
			//YAHOO.log("traduzir", "i3geo");
			var t = i3GEO.idioma.DICIONARIO[id][0];
			//YAHOO.log("Fim traduzir", "i3geo");
			return t[i3GEO.idioma.ATUAL];
		}
		else return;
	},
	/*
	Function: adicionaDicionario
	
	Adiciona novos registros ao dicion�rio atual
   
	Parameters:
	novodic - {Object} Objeto novo dicion�rio.
     
	Example:
	
	var novodic ={ 	"pp": [{
	
		pt:"texto em portugues",
		
		en:"texto em ingles",
		
		es:"texto em espanhol"
		
		}]}
		
	i3GEO.idioma.adicionaDicionario(novodic)
	
	alert($trad("pp"))
	*/
	adicionaDicionario: function(novodic) {
		for (k in novodic) { i3GEO.idioma.DICIONARIO[k] = novodic[k]; }
	},
	/*
	Function: mostraDicionario
	
	Abre uma nova janela do navegador com a lista de palavras do dicion�rio.
	*/
	mostraDicionario: function() {
		var w = window.open();
		for (k in i3GEO.idioma.DICIONARIO) { w.document.write(k+" = "+i3GEO.idioma.traduzir(k)+"<br>"); }
	},

	/*
	Function: trocaIdioma
	
	Troca o idioma atual por outro.
	
	A troca � baseada na defini��o de um cookie e reload da p�gina.
   
	Parameters:
	codigo - {String} C�digo do idioma (p.e. "en")
	*/
	trocaIdioma: function(codigo) {
		i3GEO.util.insereCookie("i3geolingua",codigo);
		window.location.reload(true)
	},
	/*
	Function: listaIdiomas
	
	Lista os idiomas dispon�veis no dicion�rio ativo
   
	Returns:
	{Array} Array com os c�digos de idioma dispon�veis.
	*/
	listaIdiomas: function() {
		for (k in i3GEO.idioma.DICIONARIO){
			return (i3GEO.util.listaChaves(i3GEO.idioma.DICIONARIO[k][0]));
		}
	},
	/*
	Function: mostraSeletor
	
	Inclui as bandeiras no mapa permitindo a sele��o do idioma
	
	As imagens das bandeiras devem estar definidas no CSS do i3geo, recebendo como identificadores
	os ids uk,brasil,italiano,espanhol
	*/
	mostraSeletor: function(){
		//alert(i3GEO.idioma.MOSTRASELETOR)
		if(!i3GEO.idioma.MOSTRASELETOR){return;}
		//
		//monta o elemento HTML com as bandeiras
		//
		var ins = "";
		var n = i3GEO.idioma.SELETORES.length;
		if(i3GEO.parametros.w < 550)
		{var w = "width:12px;"}
		else {var w = "";}
		for(i=0;i<n;i++){
			ins += '<img  style="'+w+'padding:0 0px;top:-7px;padding-right:0px;border: 1px solid white;" src="'+i3GEO.util.$im("branco.gif")+'" onclick="i3GEO.idioma.trocaIdioma(\''+i3GEO.idioma.SELETORES[i]+'\')" ';
			if(i3GEO.idioma.SELETORES[i] == "en")
			ins += 'alt="Ingles" id="uk" />';
			if(i3GEO.idioma.SELETORES[i] == "pt")
			ins += 'alt="Portugues" id="brasil" />';
			if(i3GEO.idioma.SELETORES[i] == "es")
			ins += 'alt="Espanhol" id="espanhol" />';
			if(i3GEO.idioma.SELETORES[i] == "it")
			ins += 'alt="Italiano" id="italiano" />';
		}
		if(i3GEO.idioma.IDSELETOR != "" && $i(i3GEO.idioma.IDSELETOR))
		{$i(i3GEO.idioma.IDSELETOR).innerHTML = ins;}
		else{
			var pos = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.interface.IDMAPA))
			if(!$i("i3geoseletoridiomas")){
				var novoel = document.createElement("div");
				novoel.innerHTML = ins;
				novoel.id = "i3geoseletoridiomas";
				document.body.appendChild(novoel);
			}
			else
			{var novoel = $i("i3geoseletoridiomas");}
			novoel.style.position = "absolute";
			novoel.style.top = pos[1] - 17 +"px";
			novoel.style.left = pos[0]+"px";
			novoel.style.zIndex = 5000;
		}
	}
};
/*
Function: $trad

Atalho para a fun��o de tradu��o
  
Parameters:
id - {String} C�digo do texto.
    
Returns:
{String} Texto traduzido.
*/
var $trad = function(id){return (i3GEO.idioma.traduzir(id))};
//
	try {
		var c = i3GEO.util.pegaCookie("i3geolingua");
		if(c) {
			i3GEO.idioma.define(c);
			g_linguagem = c;
		}
		else {
			if(typeof(g_linguagem) != "undefined")
			{i3GEO.idioma.define(g_linguagem);}
			else {
				g_linguagem = "pt";
				i3GEO.idioma.define("pt");
			}
		}
		if(typeof('g_traducao') != "undefined")
		{i3GEO.idioma.defineDicionario(g_traducao);}
	}
	catch(e){alert("Problemas com idiomas "+e);};
//YAHOO.log("carregou classe idioma", "Classes i3geo");