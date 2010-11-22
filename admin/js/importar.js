/*
Title: importar.js

Fun��es que controlam as op��es de importa��o de arquivos XML antigos para o banco de dados

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

i3geo/admin/js/importar.js
*/

YAHOO.namespace("example.container");
function fim ()
{
	core_carregando("desativa")
}
function importarXmlMenu()
{
	core_carregando("ativa")
	core_pegaDados("importando...","../php/menutemas.php?funcao=importarXmlMenu&nomemenu="+$i("nome").value+"&xml="+$i("arquivo").value,"fim()")
}
function importarXmlMapas()
{
	core_carregando("ativa")
	core_pegaDados("importando...","../php/mapas.php?funcao=importarXmlMapas&xml="+$i("arquivo").value,"fim()")
}
function importarXmlAtlas()
{
	core_carregando("ativa")
	core_pegaDados("importando...","../php/atlas.php?funcao=importarXmlAtlas&xml="+$i("arquivo").value,"fim()")
}
function importarXmlWS()
{
	core_carregando("ativa")
	core_pegaDados("importando...","../php/webservices.php?funcao=importarXmlWS&xml="+$i("arquivo").value+"&tipo="+$i("tipo").value,"fim()")
}
function importarXmlI()
{
	core_carregando("ativa")
	core_pegaDados("importando...","../php/identifica.php?funcao=importarXmlI&xml="+$i("arquivo").value,"fim()")
}
function importarXmlSistemas()
{
	core_carregando("ativa")
	core_pegaDados("importando...","../php/sistemas.php?funcao=importarXmlSistemas&xml="+$i("arquivo").value,"fim()")
}
