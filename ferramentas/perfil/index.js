
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Perfil

Cria um gr�fico de perfil do "relevo"

Veja:

<i3GEO.analise.dialogo.perfil>

Arquivo:

i3geo/ferramentas/perfil/index.js.php

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
Class: i3GEOF.perfil
*/
i3GEOF.perfil = {
	/*
	Variavel: pontos
	
	Objeto com a lista de pontos iniciais enviadas como par�metro na inicializa��o da ferramenta
	*/
	pontos: "",
	/*
	Variavel: dadosGrafico
	
	Dados no formato aceito pela ferramenta i3GEOF.graficointerativo
	*/
	dadosGrafico: [],
	/*
	Variavel: aguarde
	
	Objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
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
			$i(iddiv).innerHTML += i3GEOF.perfil.html();
			i3GEOF.perfil.comboTemas();
			new YAHOO.widget.Button(
				"i3GEOperfilbotao1",
				{onclick:{fn: i3GEOF.perfil.criaPerfil}}
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
		var ins = "<p class='paragrafo' >Escolha qual ser� a fonte dos dados de Z:";
		ins += "<p class='paragrafo' ><input onclick='if(this.checked == true){$i(\"i3GEOFperfilTemasSel\").value = \"\";$i(\"i3GEOFperfilDivComboItens\").innerHTML = \"\";}' style=cursor:pointer checked type=radio name=i3GEOFperfilFonte id=i3GEOFperfilFonteGoogle /> Google ou";
		ins += "<p class='paragrafo' >um tema do mapa: <div style=text-align:left; id=i3GEOFperfilTemas ></div>";
		ins += "<div style=text-align:left; id=i3GEOFperfilDivComboItens ></div><br>";
		
		ins += "<p class='paragrafo' ><input type=text id=i3GEOFperfilAmostragem value=20 size=3 /> N�mero de pontos que ser�o obtidos ao longo da linha";
		ins += "<br><br><input id=i3GEOperfilbotao1 type='buttom' value='Criar gr�fico' />";
		ins += "<br><br><div style=text-align:left id=i3GEOperfilfim ></div>";
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	
	Parametro:
	
	pontos {objeto} - cont�m as coordenadas dos pontos que ser�o usados nos c�lculos, como no exemplo
	
	pontos = {xpt: [],ypt:[]}; //xpt s�o os valores de x (array) e ypt os valores de y (array)
	*/	
	criaJanelaFlutuante: function(pontos){
		var minimiza,cabecalho,janela,divid,temp,titulo,cabecalho,minimiza;
		i3GEOF.perfil.pontos = pontos;
		//cria a janela flutuante
		titulo = "Perfil <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=3&idajuda=96' >&nbsp;&nbsp;&nbsp;</a>";
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.perfil");
		};
		janela = i3GEO.janela.cria(
			"400px",
			"250px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.perfil",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.perfil.aguarde = $i("i3GEOF.perfil_imagemCabecalho").style;
		i3GEOF.perfil.inicia(divid);
	},
	/*
	Function: criaPerfil
	
	Executa a opera��o de gera��o do perfil
	
	Veja:
	
	<DADOSPERFILRELEVO>
	*/
	criaPerfil: function(){
		try{
			if(i3GEOF.perfil.aguarde.visibility === "visible")
			{return;}
			var temp,
				p,
				cp;
			fim = function(retorno){
				i3GEOF.perfil.aguarde.visibility = "hidden";
				if (retorno.data === undefined )
				{$i("i3GEOperfilfim").innerHTML = "Erro.";return;}
				else{
					if(retorno.data.status != "OK")
					{$i("i3GEOperfilfim").innerHTML = "Erro ao acessar o servi�o de fornecimento dos dados";return;}
					i3GEOF.perfil.converteDados(retorno.data.results);
					if(!$i("i3GEOF.graficointerativo_script")){
						var js = i3GEO.configura.locaplic+"/ferramentas/graficointerativo/index.js.php";
						i3GEO.util.scriptTag(js,"i3GEOF.perfil.iniciaGrafico()","i3GEOF.graficointerativo_script");
					}
					//� obrigado mostrar o mapa do google quando o perfil usa o google
					if($i("i3GEOFperfilFonteGoogle").checked === true && i3GEO.Interface.ATUAL !== "googlemaps"){
						i3GEO.navega.dialogo.google(i3GEOF.perfil.listaPontos(true).split(","));
					}	
				}
			};
			if($i("i3GEOFperfilFonteGoogle").checked === true){
				i3GEOF.perfil.aguarde.visibility = "visible";
				var pontos = i3GEOF.perfil.listaPontos(false);
				i3GEO.php.dadosPerfilRelevo(fim,"google",pontos,$i("i3GEOFperfilAmostragem").value,"");
			}
			else{
				var pontos = i3GEOF.perfil.listaPontos(false);
				if($i("i3GEOFperfilTemasSel").value === "")
				{alert("Selecione um tema");return;}
				if($i("i3GEOFperfilComboItens").value === "")
				{alert("Selecione um item");return;}
				i3GEOF.perfil.aguarde.visibility = "visible";
				i3GEO.php.dadosPerfilRelevo(fim,$i("i3GEOFperfilTemasSel").value,pontos,$i("i3GEOFperfilAmostragem").value,$i("i3GEOFperfilComboItens").value);
			}
			
		}
		catch(e){$i("i3GEOperfilfim").innerHTML = "<p class='paragrafo' >Erro. "+e;i3GEO.janela.fechaAguarde();i3GEOF.perfil.aguarde.visibility = "hidden";}
	},
	/*
	Function: iniciaGrafico
	
	Inicializa o gr�fico de perfil definindo os par�metros da ferramenta i3GEOF.graficointerativo
	*/
	iniciaGrafico: function(){
		i3GEOF.graficointerativo.tipo = "line";
		i3GEOF.graficointerativo.titulo = "Perfil";
		i3GEOF.graficointerativo.criaJanelaFlutuante(i3GEOF.perfil.dadosGrafico);
	},
	/*
	Function: listaPontos
	
	Converte o objeto i3GEOF.perfil.pontos em uma string com a lista de pontos
	
	Parametro:
	
	normal {booblean} - quando true, retorna x e y, quando falso, retorna y e x
	
	Retorno:
	{string}
	*/
	listaPontos: function(normal){
		var n = i3GEOF.perfil.pontos.xpt.length,
			i = 0,
			lista = [],
			xs = i3GEOF.perfil.pontos.xpt,
			ys = i3GEOF.perfil.pontos.ypt;
		if(normal === true){
			xs = i3GEOF.perfil.pontos.ypt;
			ys = i3GEOF.perfil.pontos.xpt;
		}
		for(i=0;i<n;i++){
			lista.push(ys[i]+" "+xs[i])
		}
		return lista.toString(",");
	},
	/*
	Function: converteDados
	
	Converte os dados com a altimetria para o formato aceito pela ferramenta de gr�ficos
	
	Parametro:
	
	google {objeto} - objeto no padr�o da API do google veja http://code.google.com/intl/pt-BR/apis/maps/documentation/elevation
	
	Retorno:
	
	*/
	converteDados: function(google){
		var n = google.length,
			i = 0,
			dados = ["n;x"];
		for (i=0; i<n;i++){
			dados.push(i+";"+google[i].elevation);
		}
		i3GEOF.perfil.dadosGrafico = dados;
		return dados;
	},
	/*
	Function: comboTemas
	
	Cria um combo com a lista de temas
	
	Veja:
	
	<i3GEO.util.comboTemas>
	*/
	comboTemas: function(){
		i3GEO.util.comboTemas(
			"i3GEOFperfilTemasSel",
			function(retorno){
		 		$i("i3GEOFperfilTemas").innerHTML = retorno.dados;
		 		$i("i3GEOFperfilTemas").style.display = "block";
		 		if ($i("i3GEOFperfilTemasSel")){
		 			$i("i3GEOFperfilTemasSel").onchange = function(){
		 				i3GEO.mapa.ativaTema($i("i3GEOFperfilTemasSel").value);
						$i("i3GEOFperfilFonteGoogle").checked = false;
						//combodeitens
						if(i3GEO.temaAtivo !== ""){
							i3GEO.util.comboItens(
								"i3GEOFperfilComboItens",
								i3GEO.temaAtivo,
								function(retorno){
									$i("i3GEOFperfilDivComboItens").innerHTML = "<p class=paragrafo >Item com os valores: <br>"+retorno.dados+"</p>";
								}
							);
						}
						else
						{$i("i3GEOFperfilDivComboItens").innerHTML = "";}
		 			};
				}
				if(i3GEO.temaAtivo !== ""){
					$i("i3GEOFperfilTemasSel").value = i3GEO.temaAtivo;
					$i("i3GEOFperfilTemasSel").onchange.call();
				}
			},
			"i3GEOFperfilTemas",
			"",
			false,
			"ligados"
		);	
	}	
};
