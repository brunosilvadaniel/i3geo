/*
Title: Atlas

Executa as opera��es da interface Atlas.

File: i3geo/classesjs/atlas.js

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
/*
Function: iniciaAtlas

Inicializa o Atlas
*/
function iniciaAtlas()
{
	cpObjAtlas = new cpaint();
	cpObjAtlas.set_async("true");
	cpObjAtlas.set_response_type("JSON");
	pegaListaDeAtlas();
}
/*
Function: pegaListaDeAtlas

Pega a lista de Atlas e caracter�sticas principais de cada um.

*/
function pegaListaDeAtlas()
{
	var local = document.getElementById("listaAtlas");
	if (local)
	{
		var monta = function (retorno)
		{
			var texto = "";
			listaAtlas = retorno.data.atlas;
			var i = 0;
			do
			{
				if (listaAtlas[i].ID)
				{
					texto += "<div class='titulo' ><input type='radio' name='atlas' value='"+listaAtlas[i].ID+"'/>&nbsp;";
					texto += listaAtlas[i].TITULO+"</div>";
					texto += "<div class='descricao' >"+listaAtlas[i].DESCRICAO+"</div><br>";
				}
				var i = i + 1;
			}
			while(listaAtlas[i])
			local.innerHTML = texto;
			document.getElementById("tituloinstituicao").innerHTML = retorno.data.tituloinstituicao
		}
		var p = g_locaplic+"/classesphp/atlas_controle.php?funcao=pegaListaDeAtlas";
		cpObjAtlas.call(p,"pegaListaDeAtlas",monta);
	}
	else
	{alert("Div listaAtlas nao existe");}
}
