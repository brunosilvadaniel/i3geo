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
Class: i3GEOF.gradeCoord

Cria um tema contendo uma grade de coordenadas.
*/
i3GEOF.gradeCoord = {
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
			$i(iddiv).innerHTML += i3GEOF.gradeCoord.html();
			i3GEO.util.comboFontes("i3GEOgradeCoordfonte","i3GEOgradeCoordfontef");
			new YAHOO.widget.Button(
				"i3GEOgradeCoordbotao1",
				{onclick:{fn: i3GEOF.gradeCoord.executa}}
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
		var ins = '<table summary="" class=lista >';
		ins += '<tr><td>Intervalo em d&eacute;cimos de grau:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordintervalo","",4,"2");
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Cor das linhas:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordcorlinha","",11,"200,200,200");
		ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordcorlinha\')" />';
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Largura das linhas:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordlarguralinha","",11,"1");
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Tipo de linha:</td><td>';
		ins += '	<select id=i3GEOgradeCoordtipolinha >';
		ins += '		<option value="linha" >s�lido</option>';
		ins += '		<option value="ferrovia-line2" >tracejado</option>';
		ins += '	</select>';
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Inclui textos:</td><td>';
		ins += '	<select id=i3GEOgradeCoordincluitexto >';
		ins += '		<option value="sim" >sim</option>';
		ins += '		<option value="nao" >n�o</option>';
		ins += '	</select>';
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Tamanho do texto:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordtamanhotexto","",3,"10");
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Fonte:</td>';
		ins += '	<td id=i3GEOgradeCoordfontef ></td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr>';
		ins += '	<td>Cor da m&aacute;scara de um pixel de entorno:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordmascara_i","",11,"-1,-1,-1");
		ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordmascara_i\')" />';
		ins += '	</td>';
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Cor da sombra:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordshadowcolor","",11,"-1,-1,-1");
		ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordshadowcolor\')" />';
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr>';
		ins += '	<td>Deslocamento da sombra:</td><td>';
		ins += '		x '+$inputText("","","i3GEOgradeCoordshadowsizex","",3,"0");
		ins += '		<br>y '+$inputText("","","i3GEOgradeCoordshadowsizey","",3,"0");
		ins += '</td></tr>';
		ins += '<tr><td>&nbsp;</td><td></td></tr>';
		ins += '<tr><td>Cor dos textos:</td><td>';
		ins += $inputText("","","i3GEOgradeCoordcortexto","",11,"0,0,0");
		ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordcortexto\')" />';
		ins += '</td></tr>';
		ins += '</table><br>';
		ins += '<p class=paragrafo ><input id=i3GEOgradeCoordbotao1 size=10  type=button value="Criar grade" />';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo;
		//cria a janela flutuante
		titulo = "Grade de coordenadas <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=7' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"350px",
			"250px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.gradeCoord",
			true,
			"hd"
		);
		divid = janela[2].id;
		$i("i3GEOF.gradeCoord_corpo").style.backgroundColor = "white";
		i3GEOF.gradeCoord.aguarde = $i("i3GEOF.gradeCoord_imagemCabecalho").style;
		i3GEOF.gradeCoord.inicia(divid);
	},
	/*
	Function: corj
	
	Abre a janela para o usu�rio selecionar uma cor interativamente
	*/
	corj: function(obj)
	{i3GEO.util.abreCor("",obj);},
	/*
	Function: executa
	
	Insere a grade no mapa
	*/
	executa: function(){
		if (($i("i3GEOgradeCoordintervalo").value == 0) || ($i("i3GEOgradeCoordintervalo").value == ""))
		{alert("Entre com a dist�ncia entre as linhas")}
		else
		{
			if(i3GEOF.gradeCoord.aguarde.visibility === "visible")
			{return;}
			i3GEOF.gradeCoord.aguarde.visibility = "visible";
			var temp = function(){
				i3GEO.atualiza()
				i3GEOF.gradeCoord.aguarde.visibility = "hidden";
			},
			p,
			cp;
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=gradeCoord";
			p += "&intervalo="+$i("i3GEOgradeCoordintervalo").value;
			p += "&corlinha="+$i("i3GEOgradeCoordcorlinha").value;
			p += "&larguralinha="+$i("i3GEOgradeCoordlarguralinha").value;
			p += "&tipolinha="+$i("i3GEOgradeCoordtipolinha").value;
			p += "&tamanhotexto="+$i("i3GEOgradeCoordtamanhotexto").value;
			p += "&cortexto="+$i("i3GEOgradeCoordcortexto").value;
			p += "&incluitexto="+$i("i3GEOgradeCoordincluitexto").value;
			p += "&mascara="+$i("i3GEOgradeCoordmascara_i").value;
			p += "&shadowcolor="+$i("i3GEOgradeCoordshadowcolor").value;
			p += "&shadowsizex="+$i("i3GEOgradeCoordshadowsizex").value;
			p += "&shadowsizey="+$i("i3GEOgradeCoordshadowsizey").value;
			p += "&fonte="+$i("i3GEOgradeCoordfonte").value;
			cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"gradeCoord",temp);
		}
	}
};
<?php if(extension_loaded('zlib')){ob_end_flush();}?>