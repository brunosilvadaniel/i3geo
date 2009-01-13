/*
Class:: i3GEO.eventos

Controla as opera��es que s�o executadas em eventos que ocorrem no mapa.

As listas de opera��es consistem em vari�veis com nomes de fun��es.

As listas s�o inicializadas com algunmas fun��es j� embutidas, mas podem ser acrescentadas outras.

File: i3geo/classesjs/classe_eventos.js

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
i3GEO.eventos = {
	/*
	Variable: NAVEGAMAPA
	
	Armazena as fun��es que ser�o executadas quando � feita uma opera��o de navega��o sobre o mapa.
	
	Type:
	{Array}
	*/
	NAVEGAMAPA: new Array(
		"atualizaEscalaNumerica()"
	),
	/*
	Variable: MOUSEPARADO

	Nome das fun��es padr�o que ser�o executadas quando o usu�rio estaciona o mouse sobre o mapa 
	por alguns instantes.
	
	Type:
	{Array}
	*/
	MOUSEPARADO: new Array(
		"i3GEO.gadgets.mostraCoordenadasUTM()",
		"i3GEO.navega.mostraRosaDosVentos()"
	),
	/*
	Variable: MOUSEMOVE

	Nome das fun��es que ser�o executadas quando o usu�rio move o mouse sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSEMOVE: new Array(
		"movePan()",
		"moveLonglat()",
		"moveSelecaoPoli()"
	),
	/*
	Variable: MOUSEDOWN

	Nome das fun��es que ser�o executadas quando o usu�rio pressiona o bot�o do mouse sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSEDOWN: new Array(),
	/*
	Variable: MOUSEUP

	Nome das fun��es que ser�o executadas quando o usu�rio solta o bot�o do mouse sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSEUP: new Array(),
	/*
	Variable: MOUSECLIQUE

	Nome das fun��es que ser�o executadas quando o usu�rio clica sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSECLIQUE: new Array(
		"cliqueSelecaoPoli()",
		"cliqueCapturaPt()"	
	),
	/*
	Variable: TIMERPARADO
	
	Timer utilizado pelo contador do mouse parado
	
	Type:
	{Timeout}
	*/
	TIMERPARADO: "",
	/*
	Function: mouseParado
	
	Executa as fun��es definidas em MOUSEPARADO quando � detectado que o mouse est� estacionado.
	
	A execu��o desse evento � controlado por um timer definido no evento onmousemove (sobre o mapa).
	
	*/
	mouseParado: function()	{
		try
		{clearTimeout(i3GEO.eventos.TIMERPARADO);}
		catch(e){i3GEO.eventos.TIMERPARADO = "";}
		if (i3GEO.eventos.MOUSEPARADO.length > 0 && objposicaocursor.imgy > 0 && objposicaocursor.imgx > 0)
		{
			var f = i3GEO.eventos.MOUSEPARADO.length-1;
			if (f >= 0)
			{
				do
				{
					if(objposicaocursor.imgx > 0)
					{eval(i3GEO.eventos.MOUSEPARADO[f]);}
				}
				while(f--)
			}
		}
	},
	/*
	Function: navegaMapa
	
	Executa as fun��es armazenadas em NAVEGAMAPA, ou seja, opera��es executadas quando o mapa tem sua extens�o geogr�fica alterada.
	*/
	navegaMapa: function(){
		if (i3GEO.eventos.NAVEGAMAPA.length > 0){
			var f = i3GEO.eventos.NAVEGAMAPA.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.NAVEGAMAPA[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function')
					eval(i3GEO.eventos.NAVEGAMAPA[f]);
				}
				while(f--)
			}
		}
	},
	/*
	Function: mousemoveMapa
	
	Executa as fun��es armazenadas em MOUSEMOVE.
	*/
	mousemoveMapa: function(){
		if (i3GEO.eventos.MOUSEMOVE.length > 0){
			var f = i3GEO.eventos.MOUSEMOVE.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.MOUSEMOVE[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function')
					eval(i3GEO.eventos.MOUSEMOVE[f]);
				}
				while(f--)
			}
		}	
	},
	/*
	Function: mousedownMapa
	
	Executa as fun��es armazenadas em MOUSEDOWN.
	*/
	mousedownMapa: function(){
		if (i3GEO.eventos.MOUSEDOWN.length > 0){
			var f = i3GEO.eventos.MOUSEDOWN.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.MOUSEDOWN[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function')
					eval(i3GEO.eventos.MOUSEDOWN[f]);
				}
				while(f--)
			}
		}
	},
	/*
	Function: mouseupMapa
	
	Executa as fun��es armazenadas em MOUSEUP.
	*/
	mouseupMapa: function(){
		if (i3GEO.eventos.MOUSEUP.length > 0){
			var f = i3GEO.eventos.MOUSEUP.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.MOUSEUP[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function')
					eval(i3GEO.eventos.MOUSEUP[f]);
				}
				while(f--)
			}
		}	
	},
	/*
	Function: mousecliqueMapa
	
	Executa as fun��es armazenadas em MOUSECLIQUE.
	*/
	mousecliqueMapa: function(){
		if (i3GEO.eventos.MOUSECLIQUE.length > 0){
			var f = i3GEO.eventos.MOUSECLIQUE.length-1;
			if (f >= 0){
				do{
					eval(i3GEO.eventos.MOUSECLIQUE[f]);
				}
				while(f--)
			}
		}
		if (i3GEO.eventos.MOUSECLIQUE.length > 0){
			var lle = i3GEO.eventos.MOUSECLIQUE.length;
			for (var f=0;f<lle; f++){
				eval(i3GEO.eventos.MOUSECLIQUE[f]);
			}
		}
	
	}
}