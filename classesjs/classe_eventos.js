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
	Variable: MOUSEPARADO

	Nome das fun��es padr�o que ser�o executadas quando o usu�rio estaciona o mouse sobre o mapa 
	por alguns instantes.
	*/
	MOUSEPARADO: new Array(
		"i3GEO.gadgets.mostraCoordenadasUTM()",
		"verificaTip()",
		"i3GEO.navega.mostraRosaDosVentos()"
	),
	/*
	Function: mouseParado
	
	Executa as fun��es definidas em MOUSEPARADO quando � detectado que o mouse est� estacionado.
	
	A execu��o desse evento � controlado por um timer definido no evento onmousemove (sobre o mapa).
	
	*/
	mouseParado: function()	{
		try
		{clearTimeout(objmapa.tempoParado);}
		catch(e){objmapa.tempoParado = "";}
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
	}
}