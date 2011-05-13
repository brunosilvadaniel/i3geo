<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Tela remota

Mostra um link que permite clonar o mapa atual e exib�-lo em uma outra tela. O mapa clonado � atualizado de tempos em tempos, permitindo a visualiza��o remota do mapa aberto poroutro usu�rio.

Veja:

<i3GEO.tema.dialogo.telaremota>

Arquivo:

i3geo/ferramentas/telaremota/index.js.php

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
*/
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Classe: i3GEOF.telaremota
*/
i3GEOF.telaremota = {
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Veja:
	
	<TELAREMOTA>

	Parametros:
	
	divid {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	html:function(divid,tema){
		var cp,p,ins;
		ins = '<p class="paragrafo" >Utilize o link abaixo para abrir o mapa em outro navegador ou computador.</p>';
		ins += '<p class="paragrafo" >N�o feche essa janela ou a janela remota n�o receber� o valor da extens�o geogr�fica do mapa original.</p>';
		ins += '<p class="paragrafo" ><div id=i3GEOtelaremotaResultado style=text-align:left ></div>';
		$i(divid).innerHTML += ins;
		mostraLink = function(retorno){
			var ins = "";
			var url1 = "?tempo=7000&telaR="+retorno.data+"&g_sid="+i3GEO.configura.sid;
			var url2 = i3GEO.configura.locaplic+"/ferramentas/telaremota/openlayers1.php"+url1;
			ins += "<p style='font-size:13px;text-align:left' >Openlayers:</p><br>";
			ins += "<a href="+url2+" target=_blank >"+url2+"</a>";
			var url2 = i3GEO.configura.locaplic+"/ferramentas/telaremota/googlemaps1.php"+url1;
			ins += "<br><br><p style='font-size:13px;text-align:left' >Google Maps:</p><br>";
			ins += "<a href="+url2+" target=_blank >"+url2+"</a>";
			var url2 = i3GEO.configura.locaplic+"/ferramentas/telaremota/googleearth1.php"+url1;
			ins += "<br><br><p style='font-size:13px;text-align:left' >Google Earth:</p><br>";
			ins += "<a href="+url2+" target=_blank >"+url2+"</a>";
			$i("i3GEOtelaremotaResultado").innerHTML = ins;
			i3GEOF.telaremota.aguarde.visibility = "hidden";
		}
		p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=telaremota";
		cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"telaremota",mostraLink);		
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	
	Parametros:
	
	tema {String} - c�digo do tema
	*/	
	criaJanelaFlutuante: function(tema){
		var janela,divid,temp,titulo;
		if(arguments.length == 0)
		{tema = i3GEO.temaAtivo;}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.telaremota");
		};
		titulo = "Tela remota <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=7&idajuda=99' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"400px",
			"350px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.telaremota",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.telaremota.aguarde = $i("i3GEOF.telaremota_imagemCabecalho").style;
		i3GEOF.telaremota.aguarde.visibility = "visible";
		i3GEOF.telaremota.html(divid,tema);
		i3GEOF.telaremota.gravaExtent()
		temp = function(){
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("gravaExtent()") > 0)
			{i3GEO.eventos.NAVEGAMAPA.remove("i3GEOF.telaremota.gravaExtent()");}		
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("gravaExtent()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEOF.telaremota.gravaExtent()");}
	},
	/*
	Function: gravaExtent
	
	Grava a extens�o geogr�fica do mapa atual na section PHP aberta pelo mapa atual.
	*/
	gravaExtent: function(){
		var p,cp,temp;
		temp = function(){};
		p = i3GEO.configura.locaplic+"/ferramentas/telaremota/recuperamapa.php?funcao=registra&g_sid="+i3GEO.configura.sid+"&ext="+i3GEO.parametros.mapexten;
		cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"recuperamapa",temp);	
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>