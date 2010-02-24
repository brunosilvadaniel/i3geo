/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: false */
/*
Title: Mapa

Arquivo:

i3geo/classesjs/classe_mapa.js

Licenca:

GPL2

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
if(typeof(i3GEO) === 'undefined'){
	i3GEO = [];
}
/*
Classe: i3GEO.mapa

Cria e processa o mapa principal

Em i3GEO.mapa.dialogo est�o as fun��es de abertura dos di�logos para altera��o das propriedades do mapa,
como cor de fundo, tipo de imagem, legenda etc.
*/
i3GEO.mapa = {
	/*
	Variavel: GEOXML
	Armazena o nome dos objetos geoXml adicionados ao mapa pela API do google maps
	
	Tipo:
	{Array}
	*/
	GEOXML: [],
	/*
	Function: ajustaPosicao
	
	Ajusta o posicionamento do corpo do mapa
	
	Esse ajuste � necess�rio na inicializa��o, uma vez que o mapa utiliza style.position='absolute'
	
	Parameters:
	
	elemento {String} - id do elemento HTML que dever� ser ajustado e que cont�m o mapa
	*/
	ajustaPosicao: function(elemento){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.ajustaPosicao()");}
		if(arguments.length === 0){return;}
		if(!$i(elemento)){return;}
		var imagemxi,imagemyi,imagemxref,imagemyref,dc,c;
		try{
			imagemxi = 0;
			imagemyi = 0;
			imagemxref = 0;
			imagemyref = 0;
			dc = $i(elemento);
			while ((dc.offsetParent) && (dc.offsetParent.id !== "i3geo")){
				dc = dc.offsetParent;
				imagemxi = imagemxi + dc.offsetLeft;
				imagemyi = imagemyi + dc.offsetTop;
			}	
			c = $i(i3GEO.Interface.IDCORPO);
			if (c){
				c.style.position="absolute";
				if(navm)
				{$left(i3GEO.Interface.IDCORPO,imagemxi - 1);}
				else
				{$left(i3GEO.Interface.IDCORPO,imagemxi);}
				$top(i3GEO.Interface.IDCORPO,imagemyi);
			}
		}
		catch(e){alert("Ocorreu um erro. i3GEO.mapa.ajustaPosicao "+e);}
	},
	/*
	Function: ativaTema
	
	Altera a vari�vel i3GEO.temaAtivo e atualiza a interface em fun��o do novo tema que for ativado
	
	Parametros:
	
	codigo {string} - c�digo da camada
	*/
	ativaTema: function(codigo){
		var noArvoreCamadas = $i("arrastar_"+codigo),
			noAtualArvoreCamadas = $i("arrastar_"+i3GEO.temaAtivo);
		i3GEO.temaAtivo = codigo;
		if(noAtualArvoreCamadas){
			noAtualArvoreCamadas.style.textDecoration = "";
		}
		if(noArvoreCamadas){
			noArvoreCamadas.style.textDecoration = "underline";
		}			
	},
	/*
	Function: ativaLogo

	Ativa ou desativa a logo marca.
	*/
	ativaLogo: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.ativaLogo()");}
		i3GEO.contadorAtualiza++;
		i3GEO.php.ativalogo(i3GEO.atualiza);
	},
	/*
	Function: verifica
	
	Verifica se ocorreu algum problema na atualiza��o do corpo do mapa e inicia o processo de tentativa de recupera��o
	
	Parametro:
	
	retorno {string} - objeto recebido da fun��o PHP de atualiza��o do mapa
	*/
	verifica:function(retorno){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.verifica()");}
		try{
			i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o3"));
			if(retorno.data)
			{retorno = retorno.data;}
			if (retorno.variaveis)
			{retorno = retorno.variaveis;}
			if ((retorno === "erro") || (retorno === undefined)){
				i3GEO.mapa.ajustaPosicao();
				i3GEO.janela.fechaAguarde();
				i3GEO.mapa.recupera.inicia();
			}
			i3GEO.mapa.recupera.TENTATIVA = 0;
		}
		catch(e){
			if(i3GEO.Interface.ATUAL === "openlayers"){
				i3GEO.janela.fechaAguarde();
				return;
			}
			if(i3GEO.mapa.recupera.TENTATIVA === 0){
				alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");
				i3GEO.mapa.recupera.inicia();
			}
			else{
				alert("Recuperacao impossivel. Sera feita uma tentativa de reiniciar o mapa.");
				if (i3GEO.mapa.recupera.TENTATIVA === 1){
					i3GEO.mapa.recupera.TENTATIVA = 2;
					i3GEO.contadorAtualiza++;
					i3GEO.php.reiniciaMapa(i3GEO.atualiza);
				}		
			}
		}
	},
	/*
	Classe: i3GEO.mapa.recupera
	
	Tenta recuperar o mapa caso ocorra algum problema
	
	O i3Geo mant�m sempre uma c�pia do arquivo mapfile em uso. Essa fun��o tenta
	usar essa c�pia para restaurar o funcionamento do mapa
	*/
	recupera:{
		/*
		Variavel: TENTATIVA
		
		Armazena a quantidade de tentativas de recupera��o que foram feitas
		
		Tipo:
		{Integer}
		*/
		TENTATIVA: 0,
		/*
		Function: inicia
		
		Inicia a tentativa de recupera��o
		*/
		inicia: function(){
			i3GEO.mapa.ajustaPosicao();
			i3GEO.janela.fechaAguarde();
			if(i3GEO.mapa.recupera.TENTATIVA === 0){
				i3GEO.mapa.recupera.TENTATIVA++;
				i3GEO.mapa.recupera.restaura();
			}
		},
		/*
		Function: restaura
		
		Restaura o mapa para a c�pia de seguran�a existente no servidor
		*/
		restaura: function(){
			i3GEO.php.recuperamapa(i3GEO.atualiza);
		}
	},
	/*
	Classe: i3GEO.mapa.legendaHTML
	
	Controla a obten��o da legenda do mapa formatada em HTML.
	
	�til para mostrar a legenda na tela
	*/
	legendaHTML:{
		/*
		Propriedade: incluiBotaoLibera
		
		Define se na legenda ser� incluido o bot�o para liberar a legenda e inclu�-la em uma janela flutuante
		
		Tipo:
		{boolean}
		
		Default:
		{true}
		*/
		incluiBotaoLibera: true,
		/*
		Variavel:  ID
		
		Armazena o id definido na cria��o da legenda
		*/
		ID: "",
		/*
		Function: cria
		
		Cria a legenda HTML
		
		A legenda � incluida no id definido. Se id for igual a "", ser� apenas definido o evento de atualiza��o
		permitindo que seja criada a janela flutuante apenas, por exemplo:
		
		i3GEO.mapa.legendaHTML.cria("");
		i3GEO.mapa.legendaHTML.libera();		
		
		Parametros:
		
		id {String} - id do elemento que receber� a legenda
		*/
		cria: function(id){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaHTML.cria()");}
			if(arguments.length === 0)
			{id = "";}
			i3GEO.mapa.legendaHTML.ID = id;
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.mapa.legendaHTML.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.mapa.legendaHTML.atualiza()");}					
			i3GEO.mapa.legendaHTML.atualiza();			
		},
		/*
		Function: atualiza
		
		Atualiza a legenda do mapa que s�o utilizados para mostrar a legenda
		*/
		atualiza: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaHTML.atualiza()");}
			var temp = function(retorno){
				var s,ins,elementos,i;
				if(i3GEO.mapa.legendaHTML.ID !== "" && $i(i3GEO.mapa.legendaHTML.ID)){
					if ((retorno.data !== "erro") && (retorno.data !== undefined)){
						s = i3GEO.configura.locaplic+"/imagens/solta.gif";
						ins = "";
						if(i3GEO.mapa.legendaHTML.incluiBotaoLibera === true)
						{ins += "<img onclick='i3GEO.mapa.legendaHTML.libera()' id=soltaLeg src="+s+" title='clique para liberar'/><br>";}
						ins += "<div id='corpoLegi' >"+ retorno.data.legenda + "</div>";
						$i(i3GEO.mapa.legendaHTML.ID).innerHTML = ins;
					}
				}
				if ($i("wlegenda")){
					$i("wlegenda").innerHTML = retorno.data.legenda;
					elementos = $i("wlegenda").getElementsByTagName("input");
					for(i=0;i<elementos.length;i++)
					{elementos[i].style.display="none";}
				}
			};
			i3GEO.mapa.legendaHTML.obtem(temp);
		},
		/*
		Function: obtem
		
		Faz a chamada em AJAX que gera a legenda
		
		O resultado � processado pela fun��o passada como par�metro
		
		Parametro:
		
		funcao {function} - fun��o que receber� o resultado da chamada AJAX. O objeto CPAINT � enviado como par�metro.
		*/
		obtem: function(funcao){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaHTML.obtem()");}
			i3GEO.php.criaLegendaHTML(funcao,"",i3GEO.configura.templateLegenda);
		},
		/*
		Function: ativaDesativaTema
		
		Liga ou desliga um �nico tema. Utilizado pela legenda HTML, permitindo que um tema seja processado diretamente na legenda.
		
		Parametro:
		
		inputbox {object) - objeto do tipo input checkbox com a propriedade value indicando o c�digo do tema que ser� processado
		*/
		ativaDesativaTema: function(inputbox){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaHTML.ativaDesativaTema()");}
			var temp = function(){
				i3GEO.contadorAtualiza++;
				i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);
				i3GEO.arvoreDeCamadas.atualiza("");
				i3GEO.janela.fechaAguarde("redesenha");
			};
			i3GEO.janela.abreAguarde("redesenha",$trad("o1"));
			if(!inputbox.checked)
			{i3GEO.php.ligatemas(temp,inputbox.value,"");}
			else
			{i3GEO.php.ligatemas(temp,"",inputbox.value);}		
		},
		/*
		Function: libera
		
		Libera a legenda criando uma janela flutuante sobre o mapa
		*/
		libera: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaHTML.libera()");}
			var temp = function(retorno){
				var novoel,temp,n,i;
				if (!$i("moveLegi")){
					novoel = document.createElement("div");
					novoel.id = "moveLegi";
					novoel.style.display="block";
					temp = '<div class="hd">Legenda</div>';
					temp += '<div id="wlegenda" style="text-align:left;background-color:white" ></div>';
					novoel.innerHTML = temp;
					document.body.appendChild(novoel);
					YAHOO.namespace("moveLegi.xp");
					YAHOO.moveLegi.xp.panel = new YAHOO.widget.Panel("moveLegi", {width:"300px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false,iframe:false } );
					YAHOO.moveLegi.xp.panel.render();
				}
				$i("wlegenda").innerHTML = retorno.data.legenda;
				temp = $i("wlegenda").getElementsByTagName("input");
				n = temp.length;
				for(i=0;i<n;i++){
					temp[i].style.display = "none";
				}
				YAHOO.moveLegi.xp.panel.show();				
			};
			i3GEO.mapa.legendaHTML.obtem(temp);
		}
	},
	/*
	Classe: i3GEO.mapa.legendaIMAGEM
	
	Controla a obten��o da legenda do mapa na forma de uma imagem
	
	� utilizado principalmente para armazenar as imagens para a fun��o de 
	obten��o do hist�rico do mapa
	*/
	legendaIMAGEM:{
		/*
		Function: obtem
		
		Faz a chamada em AJAX que gera a legenda
		
		O resultado � processado pela fun��o passada como par�metro
		
		Parametro:
		
		funcao {function} - fun��o que receber� o resultado da chamada AJAX. O objeto CPAINT � enviado como par�metro.
		*/
		obtem: function(funcao){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaIMAGEML.obtem()");}
			i3GEO.php.criaLegendaImagem(funcao);
		}
	},
	/*
	Classe: i3GEO.mapa.dialogo
	
	Abre as telas de di�logo das op��es de manipula��o do mapa atual
	*/
	dialogo:{
		/*
		Function: autoredesenha

		Abre a janela para defini��o do intervalo de tempo para redesenho autom�tico do mapa.
		*/
		autoredesenha: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.autoredesenha()");}
			if(typeof(i3GEOF.opcoesTempo) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/opcoes_autoredesenha/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.opcoesTempo.criaJanelaFlutuante()","i3GEOF.opcoesTempo_script");
			}
		},
		/*
		Function: salvaMapa

		Abre a janela para salvar localmente o mapfile utilizado no mapa atual
		*/
		salvaMapa: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.salvaMapa()");}
			if(i3GEO.parametros === "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			if(typeof(i3GEOF.salvaMapa) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/salvamapa/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.salvaMapa.criaJanelaFlutuante()","i3GEOF.salvaMapa_script");
			}
		},
		/*
		Function: carregaMapa

		Abre a janela para a carga de um mapfile salvo localmente na m�quina dousu�rio.
		*/
		carregaMapa: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.carregaMapa()");}
			if(typeof(i3GEOF.carregaMapa) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/carregamapa/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.carregaMapa.criaJanelaFlutuante()","i3GEOF.carregaMapa_script");
			}
		},
		/*
		Function: convertews

		Abre a janela para converter o mapa atual em web service WMS
		*/
		convertews: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.convertews()");}
			if(i3GEO.parametros.mapfile === "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			if(typeof(i3GEOF.converteKml) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/convertews/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.converteMapaWS.criaJanelaFlutuante()","i3GEOF.converteMapaWS_script");
			}
		},
		/*
		Function: convertekml

		Abre a janela para converter o mapa atual em KML
		*/
		convertekml: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.convertekml()");}
			if(i3GEO.parametros.mapfile === "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			if(typeof(i3GEOF.converteKml) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/convertemapakml/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.converteMapaKml.criaJanelaFlutuante()","i3GEOF.converteMapaKml_script");
			}
		},
		/*
		Function: queryMap

		Abre a janela que altera as propriedades da exibi��o dos elementos selecionados.
		*/
		queryMap: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.queryMap()");}
			if(typeof(i3GEOF.opcoesQuery) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/opcoes_querymap/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.opcoesQuery.criaJanelaFlutuante()","i3GEOF.opcoesQuery_script");
			}
		},
		/*
		Function: template

		Abre a janela que muda o template do mapa atual.
		*/
		template: function()
		{i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=1&idajuda=8' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: tamanho

		Abre a janela que muda o tamanho do mapa
		*/
		tamanho: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.tamanho()");}
			if(typeof(i3GEOF.opcoesTamanho) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/opcoes_tamanho/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.opcoesTamanho.criaJanelaFlutuante()","i3GEOF.opcoesTamanho_script");
			}
		},
		/*
		Function: tipoimagem

		Abre a janela que define um filtro gr�fico (s�pia por exemplo) sobre a imagem gerada alterando suas caracter�sticas
		*/
		tipoimagem: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.tipoimagem()");}
			if(typeof(i3GEOF.tipoimagem) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/tipoimagem/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.tipoimagem.criaJanelaFlutuante()","i3GEOF.tipoimagem_script");
			}
		},
		/*
		Function: corFundo

		Abre a janela que altera a cor do fundo do mapa atual.
		*/
		corFundo: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.corFundo()");}
			if(typeof(i3GEOF.gradeCoord) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/opcoes_fundo/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.opcoesFundo.criaJanelaFlutuante()","i3GEOF.opcoesFundo_script");
			}
		},
		/*
		Function: opcoesEscala

		Abre a janela para defini��o das op��es da barra de escala.
		*/
		opcoesEscala: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.opcoesEscala()");}
			if(typeof(i3GEOF.opcoesEscala) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/opcoes_escala/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.opcoesEscala.criaJanelaFlutuante()","i3GEOF.opcoesEscala_script");
			}
		},
		/*
		Function: opcoesLegenda

		Abre a janela de configura��o da legenda do mapa
		*/
		opcoesLegenda: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.opcoesLegenda()");}
			if(typeof(i3GEOF.opcoesLegenda) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.opcoesLegenda.criaJanelaFlutuante()","i3GEOF.opcoesLegenda_script");
			}
		},
		/*
		Function: gradeCoord

		Abre a janela que gera grade de coordenadas
		*/
		gradeCoord: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.gradeCoord()");}
			if(typeof(i3GEOF.gradeCoord) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/gradecoord/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.gradeCoord.criaJanelaFlutuante()","i3GEOF.gradeCoord_script");
			}
		},
		/*
		Function: cliqueTexto
		
		Abre o di�logo para inclus�o de textos diretamente no mapa
		
		Registra os eventos que controlam o clique sobre o mapa
		*/
		cliqueTexto: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.cliqueTexto()");}
			if(typeof(i3GEOF.inseretxt) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/inseretxt/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.inseretxt.criaJanelaFlutuante()","i3GEOF.inseretxt_script");
			}
		},
		/*
		Function: selecao
		
		Abre o di�logo para sele��o de elementos
		*/
		selecao: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.selecao()");}
			if(typeof(i3GEOF.selecao) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/selecao/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.selecao.criaJanelaFlutuante()","i3GEOF.selecao_script");
			}
		},
		/*
		Function: cliquePonto
		
		Abre o di�logo para inclus�o de pontos diretamente no mapa
		
		Registra os eventos que controlam o clique sobre o mapa
		*/
		cliquePonto: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.cliquePonto()");}
			if(typeof(i3GEOF.inserexy) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/inserexy2/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.inserexy.criaJanelaFlutuante()","i3GEOF.inserexy_script");
			}
		},
		/*
		Function: cliqueGrafico
		
		Abre o di�logo para inclus�o de gr�ficos diretamente no mapa
		
		Registra os eventos que controlam o clique sobre o mapa
		*/
		cliqueGrafico: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.cliqueGrafico()");}
			if(typeof(i3GEOF.insereGrafico) === 'undefined'){
				var js = i3GEO.configura.locaplic+"/ferramentas/inseregrafico/index.js.php";
				i3GEO.util.scriptTag(js,"i3GEOF.insereGrafico.criaJanelaFlutuante()","i3GEOF.insereGrafico_script");
			}
		},
		/*
		Function: cliqueIdentificaDefault
		
		Abre o di�logo para obten��o de informa��es quando o usu�rio clica no mapa.
		
		Essa � a fun��o padr�o definida em i3GEO.configura		
		*/
		cliqueIdentificaDefault: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.cliqueIdentificaDefault()");}
			if (g_tipoacao === "identifica"){
				i3GEO.eventos.MOUSEPARADO.remove("verificaTip()");
				if(typeof(i3GEOF.identifica) === 'undefined'){
					//javascript que ser� carregado
					var js = i3GEO.configura.locaplic+"/ferramentas/identifica/index.js.php";
					//carrega o script
					i3GEO.util.scriptTag(js,"i3GEOF.identifica.criaJanelaFlutuante()","i3GEOF.identifica_script");
				}
				else{
					i3GEOF.identifica.x = objposicaocursor.ddx;
					i3GEOF.identifica.y = objposicaocursor.ddy;
					i3GEOF.identifica.buscaDadosTema(i3GEO.temaAtivo);
					return;
				}
			}
		},
		/*
		Function: verificaTipDefault
		
		Mostra bal�es de identifica��o, no ponto clicado pelo usu�rio, para os temas com etiquetas ativas
		
		Essa � a fun��o padr�o definida em i3GEO.configura		
		*/
		verificaTipDefault: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.verificaTipDefault()");}
			var ntemas,etiquetas,j,retorna;
			ntemas = i3GEO.arvoreDeCamadas.CAMADAS.length;
			etiquetas = false;
			for(j=0;j<ntemas;j++)
			{if(i3GEO.arvoreDeCamadas.CAMADAS[j].etiquetas !== "")
			{etiquetas = true;}}
			if(etiquetas === false)
			{return;}
			if($i(i3GEO.Interface.IDMAPA)){
				if($i(i3GEO.Interface.IDMAPA).style.cursor == "wait")
				{return;}
				$i(i3GEO.Interface.IDMAPA).style.cursor = "wait";
			}
			retorna = function(retorno){
				var temp,rfes,n,balloon,i,mostra,res,temas,ntemas,titulo,tips,j,ntips,ins,r,ds,nds,s;
				i = $i("i3geo_rosa");
				if(i)
				{i.style.display="none";}			
				mostra = false;
				try{
					retorno = retorno.data;
					if (retorno !== "")
					{
						res = "";
						temas = retorno;
						ntemas = temas.length;
						for(j=0;j<ntemas;j++){
							titulo = temas[j].nome;
							if (i3GEO.configura.tipotip === "completo" || i3GEO.configura.tipotip === "balao")
							{titulo = "<span style='text-decoration:underline;text-align:left;font-size:9pt'><b>"+titulo+"</b></span><br>";}
							else
							{titulo = "";}
							tips = (temas[j].resultado.tips).split(",");
							ntips = tips.length;
							ins = "";
							ds = temas[j].resultado.dados;
							if(ds[0] !== " "){
								for(r=0;r<ntips;r++){
									nds = ds.length;	
									for(s=0;s<nds;s++){
										eval("var alias = ds[s]."+tips[r]+".alias");
										eval("var valor = ds[s]."+tips[r]+".valor");
										eval("var link = ds[s]."+tips[r]+".link");
										eval("var img = ds[s]."+tips[r]+".img");
										if (i3GEO.configura.tipotip === "completo" || i3GEO.configura.tipotip === "balao"){
											if(valor !== "" && link === "") 
											{ins += "<span class='tiptexto' style='text-align:left;font-size:8pt'>" + alias + " :" + valor + "</span><br>";}
											if(valor !== "" && link !== "") 
											{ins += "<span class='tiptexto' style='text-align:left;font-size:8pt'>" + alias + " : <a style='color:blue;cursor:pointer' target=_blanck href='"+link+"' >" + valor + "</a></span><br>";}
											if(img !== "")
											{ins += img+"<br>";}
											mostra = true;
										}
										else{
											ins += "<span class='tiptexto' style='text-align:left;font-size:8pt'>" + valor + "</span><br>";
											mostra = true;
										}
									}
								}
							}
							if(ins !== "")
							{res = res + titulo + ins;}
						}
						if(!mostra){
							if($i("tip"))
							{$i("tip").style.display="none";}
							return;
						}
						else{		
							if(i3GEO.configura.tipotip !== "balao"){
								n = i3GEO.janela.tip();
								$i(n).style.textAlign="left";
								$i(n).innerHTML += res;
							}
							else{
								i3GEO.util.criaPin('marcaIdentifica',i3GEO.configura.locaplic+"/imagens/grabber.gif","12px","12px");
								i3GEO.util.posicionaImagemNoMapa("marcaIdentifica");
								balloon = new Balloon();
								balloon.delayTime = 0;
								res = "<div style=text-align:left >"+res+"</div>";
								balloon.showTooltip($i("marcaIdentifica"),res);
								$i('marcaIdentifica').onclick = $i("closeButton").onclick;
							}
						}
					}
					if(i3GEO.Interface.ATUAL==="padrao"){
						temp = "zoom";
						if(i3GEO.Interface.ATIVAMENUCONTEXTO)
						{temp = "identifica_contexto";}
					}
					else
					{temp = "identifica";}
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic);
					
				}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
					if(i3GEO.Interface.ATUAL==="padrao"){
						temp = "identifica";
						if(i3GEO.Interface.ATIVAMENUCONTEXTO)
						{temp = "identifica_contexto";}
					}
					else
					{temp = "identifica";}
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic);
				}
			};
			i3GEO.php.identifica2(retorna,objposicaocursor.ddx,objposicaocursor.ddy,"5");
		}
	}
};
//YAHOO.log("carregou classe mapa", "Classes i3geo");