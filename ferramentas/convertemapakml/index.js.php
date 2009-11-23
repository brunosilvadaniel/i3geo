<?php if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
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
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Class: i3GEOF.converteMapaKml

Converte um mapa em KML
*/
i3GEOF.converteMapaKml = {
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta

	Parametros:
	
	divid {String} - id do div que receber� o conteudo HTML da ferramenta

	*/
	html:function(divid){
		var ins,lista,tema;
		lista = i3GEO.arvoreDeCamadas.CAMADAS;
		tema = lista[0].name;	
		var ins = '<p class="paragrafo" >Voc&ecirc; pode utilizar os endere&ccedil;os para visualizar o mapa atual em softwares que aceitam o formato kml,' +
		'como o <a href="http://earth.google.com/intl/pt/" target="_blank" > Google Earth</a>. O endere�o de acesso � tempor�rio, ficando dispon�vel por determinado per�odo de tempo conforme definido pelo administrador do i3Geo.' +
		'<p class="paragrafo" >Clique <a href="'+i3GEO.configura.locaplic+'/documentacao/ajuda/googleearth.htm" target="blank" >aqui</a> para mais detalhes sobre como usar o link kml no Google Earth.' +
		'<p class="paragrafo" ><b>Kml baseado em um servico WMS: </b></p>' +
		'<p class="paragrafo" > <textarea cols="65" rows="3" style=cursor:pointer onclick="javascript:this.select()">' + 
		i3GEO.configura.locaplic + '/pacotes/kmlmapserver/kmlservice.php?map='+i3GEO.parametros.mapfile+'&typename='+tema+'&request=kml</textarea></p>';
		ins += '<p class="paragrafo" >Voc&ecirc; pode tamb�m utilizar o link abaixo para mostrar a &aacute;rvore completa de temas no GoogleEarth' +
		'<p class="paragrafo" ><textarea cols="65" rows="2" style=cursor:pointer onclick="javascript:this.select()">' + i3GEO.configura.locaplic + '/kml.php </textarea></p>';
		$i(divid).innerHTML += ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.converteMapaKml");
		};
		titulo = "Kml <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=2&idajuda=13' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"440px",
			"280px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.converteMapaKml",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.converteMapaKml.html(divid);
	}
};
<?php if(extension_loaded('zlib')){ob_end_flush();}?>