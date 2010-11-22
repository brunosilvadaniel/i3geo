/*
Title: mapfiles.js

Fun��es que controlam a interface do editor de mapfiles de inicializa��o

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Arquivo:

i3geo/admin/js/mapfiles.js
*/
YAHOO.namespace("example.container");
/*
Function: initMenu

Inicializa o editor

<PEGAPARAMETROSCONFIGURA>
*/
function initMenu()
{
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	new YAHOO.widget.Button("botao2",{ onclick: { fn: function(){window.open('../../testainstal.php') }} });
	$parametros = {
	"simples": [
	{ mensagem: "Arquivo que define as fontes de texto utilizadas",cabeca: "FONTSET", variavel: "FONTSET"},
	{ mensagem: "Arquivo que define a simbologia",cabeca: "SYMBOLSET", variavel: "SYMBOLSET"},
	{ mensagem: "Diret�rio com o caminho padr�o para arquivos shapefile",cabeca: "SHAPEPATH", variavel: "SHAPEPATH"},
	{ mensagem: "Extens�o geogr�fica (xmin ymin xmax ymax). ",cabeca: "EXTENT", variavel: "EXTENT"},
	{ mensagem: "Endere�o da imagem de refer�ncia",cabeca: "IMAGE", variavel: "IMAGE"},
	{ mensagem: "Caminho para o armazenamento das imagens tempor�rias",cabeca: "IMAGEPATH", variavel: "IMAGEPATH"},
	{ mensagem: "Complemento para a url das imagens",cabeca: "IMAGEURL", variavel: "IMAGEURL"}
	]};
	core_carregando("ativa");
	core_pegaDados("buscando par�metros...","../php/mapfiles.php?funcao=pegaParametrosConfigura","pegaParametros")
}
/*
Function: pegaParametros

Pega os par�metros do mapfiles.php

*/
function pegaParametros(retorno)
{
	var ins = ""
	for (i=0;i<$parametros.simples.length;i++)
	{
		ins += "<fieldset><legend><b>"+$parametros.simples[i].cabeca+"</b></legend>"
		ins += "<p class=mensagem >"+$parametros.simples[i].mensagem+"</p>"
		ins += "<table><tr><td><img style=cursor:pointer src=../imagens/02.png title='aplicar' onclick='salva(\""+$parametros.simples[i].variavel+"\")' /></td>"
		ins += "<td><input onchange=\"this.style.color='blue'\" type=text size=70 id='"+$parametros.simples[i].variavel+"' /></td></tr></table>"
		ins += "</fieldset><br>"	
	}
	$i("tabela").innerHTML += ins
	for (i=0;i<$parametros.simples.length;i++)
	{
		if($i($parametros.simples[i].variavel))
		{$i($parametros.simples[i].variavel).value = eval("retorno."+$parametros.simples[i].variavel);}
	}
	core_carregando("desativa");
}
/*
Function: salva

Salva o novo valor de uma vari�vel

<SALVACONFIGURA>
*/
function salva(variavel)
{
	var original = $i(variavel).value;
	$i(variavel).value = "gravando..."
	core_pegaDados("gravando...","../php/mapfiles.php?funcao=salvaConfigura&variavel="+variavel+"&valor="+original,"")
	
	$i(variavel).style.color = ""
	$i(variavel).value = original
}
YAHOO.util.Event.addListener(window, "load", initMenu);