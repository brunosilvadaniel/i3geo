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
parametrosURL()
var endereco = window.location.protocol+"//"+window.location.host
var tema = window.location.href.split("=")
var tema = tema[1].split(",");
var tipo = tema[1]
var tema = tema[0]
var endereco = "<p><b>Kml com 'GroundOverlay' baseado em um servico WMS: </b></p><p>"+g_locaplic+"/pacotes/kmlmapserver/kmlservice.php?map="+tema+"&typename="+tema+"&request=kml"
if(tipo == "kmz")
endereco += "<p><b>Kmz que gera um arquivo kml vetorial: </b></p><p>"+g_locaplic+"/pacotes/kmlmapserver/kmlservice.php?map="+tema+"&typename="+tema+"&request=kmz"
$i("resultado").innerHTML = endereco
$i("men1").innerHTML += "<br><br><b>Voc&ecirc; pode tamb�m utilizar o link <span style=color:red >"+g_locaplic+"/kml.php </span><br>para mostrar a &aacute;rvore completa de temas no GoogleEarth"