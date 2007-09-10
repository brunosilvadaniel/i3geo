/*
Title: Carrega os scripts do i3geo.

L� o conjunto de javascripts para o funcionamento do i3geo.

Carrega o arquivo compactado i3geo_tudo_compacto.js que inclui tamb�m os scripts do YUI

File: i3geo.js

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
Function: $i

Pega um objeto do documento.

Exemplo: $i("box1")

Par�metros:

id - id do objeto

Retorno:

object - objeto javaScript
*/
$i = function(id)
{return document.getElementById(id);}
//necessario para nao dar erro no refresh
mostradicasf = function(){}
var scriptLocation = "";
var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
	var src = scripts[i].getAttribute('src');
	if (src) {
		var index = src.lastIndexOf("i3geo.js");
		// is it found, at the end of the URL?
		if ((index > -1) && (index + "i3geo.js".length == src.length)) {
			scriptLocation = src.slice(0, -"i3geo.js".length);
			break;
		}
	}
}
//scripts
var allScriptTags = "";
var jsfiles = new Array("i3geo_tudo_compacto.js")
for (var i = 0; i < jsfiles.length; i++)
{
	var currentScriptTag = "<script src='" + scriptLocation + jsfiles[i] + "'></script>";
	allScriptTags += currentScriptTag;
}
//css
var allCssTags = "";
var cssfiles = new Array("../css/i3geo.css")
for (var i = 0; i < cssfiles.length; i++)
{
	var currentCssTag = "<link rel='stylesheet' type='text/css' href='" + scriptLocation + cssfiles[i] + "'/>";
	allCssTags += currentCssTag;
}
document.write(allCssTags);
document.write(allScriptTags);