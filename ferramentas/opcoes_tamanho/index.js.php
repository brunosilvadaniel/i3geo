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
Class: i3GEOF.opcoesTamanho

Altera o tamanho do mapa.
*/
i3GEOF.opcoesTamanho = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.opcoesTamanho.html();
			new YAHOO.widget.Button(
				"i3GEOopcoesTamanhobotao1",
				{onclick:{fn: i3GEOF.opcoesTamanho.executa}}
			);
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '<table summary="" class=lista width="100%">' +
		'<table summary="" class=lista > '+
		'	<tr><td>Largura:</td><td>' +
		$inputText("","","i3GEOopcoesTamanhol","",4,i3GEO.parametros.w) +
		'	</td></tr><tr><td>&nbsp;</td><td></td></tr>'+
		'	<tr><td>Altura:</td><td>' +
		$inputText("","","i3GEOopcoesTamanhoa","",4,i3GEO.parametros.h) +
		'	</td></tr><tr><td>&nbsp;</td><td></td></tr>'+
		'</table>' +
		'<p class=paragrafo >Valores em pixels.</p>' +
	  	'<p class=paragrafo ><input id=i3GEOopcoesTamanhobotao1 size=16  type=button value="Aplicar"/>';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo,cabecalho,minimiza;
		cabecalho = function(){};
		minimiza = function(){
			var temp = $i("i3GEOF.opcoesTamanho_corpo");
			if(temp){
				if(temp.style.display === "block")
				{temp.style.display = "none";}
				else
				{temp.style.display = "block";}
			}
		};
		//cria a janela flutuante
		titulo = "Tamanho <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=4' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"150px",
			"120px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opcoesTamanho",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.opcoesTamanho_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opcoesTamanho_corpo").style.textAlign = "left";
		i3GEOF.opcoesTamanho.aguarde = $i("i3GEOF.opcoesTamanho_imagemCabecalho").style;
		i3GEOF.opcoesTamanho.inicia(divid);
	},
	/*
	Function: executa
	
	Altera a legenda
	*/
	executa: function(){
		if(i3GEOF.opcoesTamanho.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesTamanho.aguarde.visibility = "visible";
		var l = $i("i3GEOopcoesTamanhol").value,
			a = $i("i3GEOopcoesTamanhoa").value,
			calc = 5,
			temp,
			p,
			cp;
		if ((l > 5) && (a > 5)){
			i3GEO.parametros.w = l;
			i3GEO.parametros.h = a;
			$i(i3GEO.Interface.IDMAPA).style.width= l+"px";
			$i(i3GEO.Interface.IDMAPA).style.height= a+"px";
			$i(i3GEO.Interface.IDCORPO).style.width= l+"px";
			$i(i3GEO.Interface.IDCORPO).style.height= a+"px";
			$i(i3GEO.Interface.IDCORPO).style.clip = 'rect('+0+" "+(l*1+2)+" "+(a*1+2)+" "+0+')';
			if($i("ferramentas"))
			{calc += parseInt($i("ferramentas").style.width,10);}
			if ($i("contemFerramentas"))
			{calc += parseInt($i("contemFerramentas").style.width,10);}		
			if($i("mst"))
			{$i("mst").style.width = (l * 1) + calc + "px";}
			if($i("contemImg")){
				$i("contemImg").style.height= a+"px";
				$i("contemImg").style.width= l+"px";
			}
			temp = function(){
				i3GEO.atualiza();
				i3GEO.guias.ajustaAltura();
				i3GEOF.opcoesTamanho.aguarde.visibility = "hidden";
			};
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=mudatamanho&altura="+a+"&largura="+l;
			cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"mudatamanho",temp);
		}
	}
};
<?php if(extension_loaded('zlib')){ob_end_flush();}?>