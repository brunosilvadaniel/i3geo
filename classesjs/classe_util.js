/*
Title: i3geo.util

Utilit�rios.

Fun��es gerais de processamento.

Namespace:

i3GEO.util

Exemplos:



File: i3geo/classesjs/classe_util.js

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
i3GEO.util = {
	/*
	Function: insereCookie
	Cria um novo cookie. 
   
	Parameters:
	nome - {String} Nome do cookie.
	
	valor - (String) Valor do cookie
	*/
	insereCookie: function(nome,valor) {
		document.cookie = nome+"="+valor;
	},
	/*
	Function: pegaCookie
	Pega o valor de um cookie. 
   
	Parameters:
	nome - {String} Nome do cookie.

	Returns:
	(String) - valor do cookie
	*/
	pegaCookie: function(nome){
		var cookies = document.cookie;
		var i = cookies.indexOf(nome);
		if(i == -1)
		{return null;}
		var fim = cookies.indexOf(";",i);
		if (fim == -1)
		{var fim = cookies.length;}
		return (unescape(cookies.substring(i,fim))).split("=")[1];
	},
	/*
	Function: listaChaves
	Lista as chaves de um objeto. 
   
	Parameters:
	obj - {Object}

	Return:
	(Array) - array com as chaves.
	*/
	listaChaves: function (obj) {
		var keys = [];
		for(var key in obj){
   			keys.push(key);
		}
		return keys;
	},
	/*
	Function: criaBotaoAplicar
	Cria um bot�o flutuante do tipo aplicar.
	
	O novo bot�o � adicionado no DOM com ID "i3geo_aplicar"
   
	Parameters:
	nomeFuncao - {String} Nome da fun��o que ser� executada quando o bot�o for cllicado
	
	titulo (opcional) - {String} T�tulo que ser� mostrado no bot�o
	
	classe (opcional) - {String} Nome da classe (estilo) que ser� aplicado ao bot�o.
	
	obj ((opcional) - {Objeto} Objeto DOM que foi clicado para provocar a cria��o do bot�o.

	Return:
	(Object) - Objeto DOM criado.

	*/
	criaBotaoAplicar: function (nomeFuncao,titulo,classe,obj) {
		if(arguments.length == 1)
		{var titulo = "Aplicar";}
		if(arguments.length == 1 || arguments.length == 2)
		{var classe = "i3geoBotaoAplicar";}
		if (!document.getElementById("i3geo_aplicar"))
		{
			var novoel = document.createElement("input");
			novoel.id = 'i3geo_aplicar';
			novoel.type = 'button';
			novoel.value = titulo;
			novoel.style.cursor="pointer";
			novoel.style.fontSize="10px";
			novoel.style.zIndex = 15000;
			novoel.style.position="absolute";
			novoel.style.display="none";
			novoel.onmouseover = function(){this.style.display="block";};
			novoel.onmouseout = function(){this.style.display="none";};
			novoel.className = classe;
			document.body.appendChild(novoel);
		}
		else
		{var novoel = document.getElementById("i3geo_aplicar");}
		novoel.onclick = function(){
			this.style.display='none';
			eval(nomeFuncao+"\(\)");
		}
		//reposiciona o botao
		if(arguments.length == 4){
			novoel.style.display="block";
			var xy = YAHOO.util.Dom.getXY(obj);
			YAHOO.util.Dom.setXY(novoel,xy);
		}
		return (novoel);
	},
	/*
	Function: removeAcentos

	Remove acentos de uma palavra ou frase

	Parameters:

	palavra {String}
	
	Return:
	
	{String}
	*/
	removeAcentos: function(palavra) {
		var re = /�|�|�|�/gi;
		palavra = palavra.replace(re,"a");
		var re = /�/gi;
		palavra = palavra.replace(re,"e");
		var re = /�/gi;
		palavra = palavra.replace(re,"i");
		var re = /�|�/gi;
		palavra = palavra.replace(re,"o");
		var re = /�/gi;
		palavra = palavra.replace(re,"c");
		var re = /�/gi;
		palavra = palavra.replace(re,"u");
		return(palavra);
	}
};