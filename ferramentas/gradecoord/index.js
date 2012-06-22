
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Grade de coordenadas

Cria um tema contendo a grade de coordenadas

Veja:

<i3GEO.mapa.dialogo.gradeCoord>

Arquivo:

i3geo/ferramentas/gradecoord/index.js.php

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
Classe: i3GEOF.gradeCoord
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
		var ins = '<table summary="" class=lista >' +
		'<tr><td>Intervalo em d&eacute;cimos de grau:</td><td>' +
		$inputText("","","i3GEOgradeCoordintervalo","",4,"2") +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Cor das linhas:</td><td>' +
		$inputText("","","i3GEOgradeCoordcorlinha","",11,"200,200,200") +
		'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordcorlinha\')" />' +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Largura das linhas:</td><td>' +
		$inputText("","","i3GEOgradeCoordlarguralinha","",11,"1") +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Tipo de linha:</td><td>' +
		'	<select id=i3GEOgradeCoordtipolinha >' +
		'		<option value="linha" >s�lido</option>' +
		'		<option value="ferrovia-line2" >tracejado</option>' +
		'	</select>' +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Inclui textos:</td><td>' +
		'	<select id=i3GEOgradeCoordincluitexto >' +
		'		<option value="sim" >sim</option>' +
		'		<option value="nao" >n�o</option>' +
		'	</select>' +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Tamanho do texto:</td><td>' +
		$inputText("","","i3GEOgradeCoordtamanhotexto","",3,"10") +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Fonte:</td>' +
		'	<td id=i3GEOgradeCoordfontef ></td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr>' +
		'	<td>Cor da m&aacute;scara de um pixel de entorno:</td><td>' +
		$inputText("","","i3GEOgradeCoordmascara_i","",11,"-1,-1,-1") +
		'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordmascara_i\')" />' +
		'	</td>' +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Cor da sombra:</td><td>' +
		$inputText("","","i3GEOgradeCoordshadowcolor","",11,"-1,-1,-1") +
		'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordshadowcolor\')" />' +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr>' +
		'	<td>Deslocamento da sombra:</td><td>' +
		'		x '+$inputText("","","i3GEOgradeCoordshadowsizex","",3,"0") +
		'		<br>y '+$inputText("","","i3GEOgradeCoordshadowsizey","",3,"0") +
		'</td></tr>' +
		'<tr><td>&nbsp;</td><td></td></tr>' +
		'<tr><td>Cor dos textos:</td><td>' +
		$inputText("","","i3GEOgradeCoordcortexto","",11,"0,0,0") +
		'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.gradeCoord.corj(\'i3GEOgradeCoordcortexto\')" />' +
		'</td></tr>' +
		'</table><br>' +
		'<p class=paragrafo ><input id=i3GEOgradeCoordbotao1 size=10  type=button value="Criar grade" />';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,titulo;
		//cria a janela flutuante
		titulo = "Grade de coordenadas <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=7' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"350px",
			"440px",
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
	
	Veja:
	
	<GRADECOORD>
	*/
	executa: function(){
		if (($i("i3GEOgradeCoordintervalo").value == 0) || ($i("i3GEOgradeCoordintervalo").value == ""))
		{alert("Entre com a dist�ncia entre as linhas");}
		else
		{
			if(i3GEOF.gradeCoord.aguarde.visibility === "visible")
			{return;}
			i3GEOF.gradeCoord.aguarde.visibility = "visible";
			var temp = function(){
				i3GEO.atualiza();
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
