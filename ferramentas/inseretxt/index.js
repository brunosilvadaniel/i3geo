/*
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
//inicializa
parametrosURL()
//eventos das guias
$i("guia1").onclick = function()
{$i("guia1obj").style.display="block";}
$i("guia2").onclick = function()
{$i("guia2obj").style.display="block";}
$i("guia3").onclick = function()
{$i("guia3obj").style.display="block";}
$i("guia4").onclick = function()
{$i("guia4obj").style.display="block";}
mensagemAjuda("men1",$i("men1").innerHTML)
//preenche a lista de fontes
comboTrueType(function(retorno)
{
	$i("listaf").innerHTML = retorno
})
function corj(obj)
{window.parent.abreCor("wdocai",obj)}