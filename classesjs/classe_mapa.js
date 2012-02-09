/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: false */
/*
Title: Mapa

Arquivo:

i3geo/classesjs/classe_mapa.js

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
	Propriedade: AUTORESIZE
	
	Indica se o tamanho do mapa ser� ajustado toda vez que o navegador for redimensionado
	
	Type:
	{boolean}
	
	Default:
	{false}
	*/
	AUTORESIZE: false,
	/*
	Variavel: GEOXML
	Armazena o nome dos objetos geoXml adicionados ao mapa pela API do google maps

	Tipo:
	{Array}
	*/
	GEOXML: [],
	/*
	Function: insereDobraPagina
	
	Insere o �cone do tipo "dobra de�p�gina" que permite alterar o renderizador do mapa
	
	Parametros:
	
	tipo {string} - tipo de �cone googlemaps|openlayers
	
	imagem {string} - endere�o da imagem que ser� utilizada no �cone
	*/
	insereDobraPagina: function(tipo,imagem){
		var novoel = $i("i3GEOdobraPagina");
		if(!novoel){
			novoel = document.createElement("img");
		}
		novoel.src = imagem;
		novoel.id = "i3GEOdobraPagina";
		if(tipo === "googlemaps")
		{novoel.onclick = function(){i3GEO.Interface.atual2gm.inicia();};}
		if(tipo === "openlayers")
		{novoel.onclick = function(){i3GEO.Interface.atual2ol.inicia();};}
		novoel.style.cursor = "pointer";
		novoel.style.position = "absolute";
		novoel.style.top = i3GEO.parametros.h - 35 + "px";
		novoel.style.zIndex = "50000";
		novoel.style.left = i3GEO.parametros.w - 35 + "px";
		$i(i3GEO.Interface.IDMAPA).appendChild(novoel);
	},
	/*
	Function: reposicionaDobraPagina
	
	Reposiciona o �cone do tipo "dobra de�p�gina"
	*/
	reposicionaDobraPagina: function(){
		var novoel = $i("i3GEOdobraPagina");
		if(!novoel){
			return;
		}
		novoel.style.top = i3GEO.parametros.h - 35 + "px";
		novoel.style.left = i3GEO.parametros.w - 35 + "px";
	},	
	/*
	Function: ativaAutoResize
	
	Ativa o redimensionamento autom�tico do mapa sempre que o navegador for redimensionado
	
	� definido como um evento do elemento window
	*/
	ativaAutoResize: function(){
		window.onresize = function(){
			var temp,Dw,Dh, r = false;
			Dw = YAHOO.util.Dom.getViewportWidth();
			Dh = YAHOO.util.Dom.getViewportHeight();
			if(Math.abs(Dw - i3GEO.tamanhodoc[0]) > 50){
				r = true;
			}
			if(Math.abs(Dh - i3GEO.tamanhodoc[1]) > 50){
				r = true;
			}			
			if(r === false)
			{return;}
			i3GEO.tamanhodoc = [Dw,Dh];
			temp = setTimeout(function(){
				i3GEO.reCalculaTamanho();
				i3GEO.barraDeBotoes.recria("i3geo_barra2");
				if(i3GEO.Interface.TABLET === true)
				{i3GEO.guias.escondeGuias();return;}
				if(i3GEO.guias.TIPO === "movel")
				{i3GEO.guias.guiaMovel.reposiciona();}
				else
				{i3GEO.guias.ajustaAltura();}
				i3GEO.mapa.reposicionaDobraPagina();
			},2000);
		};
	},
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
		var imagemxi = 0,
			imagemyi = 0,
			imagemxref = 0,
			imagemyref = 0,
			dc = $i(elemento),
			c;
		if(!dc){return;}
		try{
			while ((dc.offsetParent) && (dc.offsetParent.id !== "i3geo")){
				dc = dc.offsetParent;
				imagemxi += dc.offsetLeft;
				imagemyi += dc.offsetTop;
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

	O tema anteriormente ativo tem sua cor alterada para a cor normal e o novo tema � destacado com uma cor diferente
	
	Executa tamb�m as fun��es armazenadas em i3GEO.eventos.ATIVATEMA

	Parametros:

	codigo {string} - c�digo da camada
	*/
	ativaTema: function(codigo){
		if(codigo){
			if(codigo === "")
			{return;}
			if(i3GEO.temaAtivo !== "")
			{i3GEO.util.defineValor("ArvoreTituloTema"+i3GEO.temaAtivo,"style.color","");}
			i3GEO.temaAtivo = codigo;
			i3GEO.util.defineValor("ArvoreTituloTema"+codigo,"style.color","brown");
		}
	},
	/*
	Function: ativaLogo

	Ativa ou desativa a logo marca.
	*/
	ativaLogo: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.ativaLogo()");}
		if(i3GEO.Interface.ATUAL === "googlemaps")
		{alert("Essa opera��o n�o funciona nessa interface");return;}
		//i3GEO.contadorAtualiza++;
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
			if ((retorno === "erro") || (typeof(retorno) === 'undefined')){
				i3GEO.mapa.ajustaPosicao();
				i3GEO.janela.fechaAguarde();
				i3GEO.mapa.recupera.inicia();
			}
			i3GEO.mapa.recupera.TENTATIVA = 0;
		}
		catch(e){
			if(i3GEO.Interface.ATUAL === "openlayers" || i3GEO.Interface.ATUAL === "googlemaps"){
				i3GEO.janela.fechaAguarde();
				return;
			}
			if(this.recupera.TENTATIVA === 0){
				alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");
				i3GEO.mapa.recupera.inicia();
			}
			else{
				alert("Recuperacao impossivel. Sera feita uma tentativa de reiniciar o mapa.");
				if (this.recupera.TENTATIVA === 1){
					this.recupera.TENTATIVA = 2;
					i3GEO.php.reiniciaMapa(i3GEO.atualiza);
				}
			}
			if(typeof(console) !== 'undefined'){console.error(e);}
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
			if(this.recupera.TENTATIVA === 0){
				this.recupera.TENTATIVA++;
				this.recupera.restaura();
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

		Atualiza o elemento HTML do mapa utilizado para mostrar a legenda
		*/
		atualiza: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.legendaHTML.atualiza()");}
			var idleg,
				temp = function(retorno){
					var s,ins,elementos,i,temp,re;
					re = new RegExp("<img src='' />", "g");
					if(i3GEO.mapa.legendaHTML.ID !== "" && $i(i3GEO.mapa.legendaHTML.ID)){
						if ((retorno.data !== "erro") && (retorno.data !== undefined)){
							s = i3GEO.configura.locaplic+"/imagens/branco.gif";
							ins = "";
							if(i3GEO.mapa.legendaHTML.incluiBotaoLibera === true)
							{ins += '<div style="cursor: pointer; text-align: left; font-size: 10px; display: block; height: 35px;" onclick="i3GEO.mapa.legendaHTML.libera()"><img id="soltaLeg" src="../imagens/branco.gif" title="clique para liberar" style="margin: 5px; position: relative;"> <p style="position: relative; left: -45px; top: -22px;">Mostra a legenda em uma janela</p></div>';}
							temp = retorno.data.legenda;
							temp = temp.replace(re,"");
							ins += "<div id='corpoLegi' >"+ temp + "</div>";
							$i(i3GEO.mapa.legendaHTML.ID).innerHTML = ins;
						}
					}
					if ($i("wlegenda")){
						$i("wlegenda").innerHTML = retorno.data.legenda;
						elementos = $i("wlegenda").getElementsByTagName("input");
						for(i=0;i<elementos.length;i += 1)
						{elementos[i].style.display="none";}
					}
				};
			if(i3GEO.mapa.legendaHTML.ID !== ""){
				idleg = $i(i3GEO.mapa.legendaHTML.ID);
				if(idleg && idleg.style.display === "block")
				{i3GEO.mapa.legendaHTML.obtem(temp);}
			}
			idleg = $i("wlegenda");
			if (idleg && idleg.style.display === "block")
			{i3GEO.mapa.legendaHTML.obtem(temp);}
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
				//i3GEO.contadorAtualiza++;
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
					temp = '<div class="hd"  >Legenda</div>';
					temp += '<div id="wlegenda" style="display:block;padding:5px 2px 5px 0px;text-align:left;background-color:white;height:300px;width:300px;overflow:auto" ></div>';
					novoel.innerHTML = temp;
					document.body.appendChild(novoel);
					YAHOO.namespace("moveLegi.xp");
					YAHOO.moveLegi.xp.panel = new YAHOO.widget.Panel("moveLegi", {width:"302px", fixedcenter: true, constraintoviewport: false, underlay:"shadow", close:true, visible:true, draggable:true, modal:false,iframe:true } );
					YAHOO.moveLegi.xp.panel.render();
					
					novoel.onmouseover = function(){
						if($i("moveLegi").style.display === "block")
						{YAHOO.util.Dom.setStyle("moveLegi", "opacity", 1);}
					};
					novoel.onmouseout = function(){
						YAHOO.util.Dom.setStyle("moveLegi", "opacity", 0.20);
					};					
					
				}
				$i("wlegenda").innerHTML = retorno.data.legenda;
				temp = $i("wlegenda").getElementsByTagName("input");
				n = temp.length;
				for(i=0;i<n;i += 1){
					temp[i].style.display = "none";
				}
				YAHOO.moveLegi.xp.panel.show();
				$i("moveLegi_c").style.zIndex = 100000;
				//$i("moveLegi").style.border = "1px solid gray";
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
		Function: animacao

		Abre a janela de di�logo da ferramenta que permite animar o mapa atual
		*/
		animacao: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.animacao()","animacao","animacao");
		},
		/*
		Function: opacidade

		Abre a janela de di�logo da ferramenta de defini��o da transpar�ncia das camadas principais do mapa
		*/
		opacidade: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.opacidade()","opacidademapa","opacidademapa");
		},
		/*
		Function: telaRemota

		Abre a janela de di�logo da ferramenta de configura��o de uma tela remota
		*/
		telaRemota: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.telaremota()","telaremota","telaremota");
		},
		/*
		Function: t3d

		Abre a janela de di�logo da ferramenta de gera��o da visualiza��o em 3d
		*/
		t3d: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.t3d()","3d","t3d");
		},
		/*
		Function: imprimir

		Abre a janela de di�logo da ferramenta que permite imprimir o mapa atual
		*/
		imprimir: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.imprimir()","imprimir","imprimir");
		},
		/*
		Function: mostraExten

		Abre a janela de di�logo da ferramenta que mostra a extens�o geogr�fica atual do mapa
		*/
		mostraExten: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.mostraExten()","mostraexten","mostraExten");
		},
		/*
		Function: outputformat

		Abre a janela de di�logo da ferramenta outputformat
		*/
		outputformat: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.outputformat()","outputformat","outputformat");
		},
		/*
		Function: autoredesenha

		Abre a janela de di�logo da ferramenta opcoes_autoredesenha
		*/
		autoredesenha: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.autoredesenha()","opcoes_autoredesenha","opcoesTempo");
		},
		/*
		Function: salvaMapa

		Abre a janela de di�logo da ferramenta salvamapa
		*/
		salvaMapa: function(){
			if(i3GEO.parametros === "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.salvaMapa()","salvamapa","salvaMapa");
		},
		/*
		Function: carregaMapa

		Abre a janela de di�logo da ferramenta carregamapa
		*/
		carregaMapa: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.carregaMapa()","carregamapa","carregaMapa");
		},
		/*
		Function: convertews

		Abre a janela de di�logo da ferramenta convertews
		*/
		convertews: function(){
			if(i3GEO.parametros.mapfile === "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.convertews()","convertews","converteMapaWS");
		},
		/*
		Function: convertekml

		Abre a janela de di�logo da ferramenta convertemapakml
		*/
		convertekml: function(){
			if(i3GEO.parametros.mapfile === "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.convertekml()","convertemapakml","converteMapaKml");
		},
		/*
		Function: queryMap

		Abre a janela de di�logo da ferramenta opcoes_querymap
		*/
		queryMap: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.queryMap()","opcoes_querymap","opcoesQuery");
		},
		/*
		Function: template

		Abre a janela de di�logo da ferramenta template
		*/
		template: function()
		{i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=1&idajuda=8' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: tamanho

		Abre a janela de di�logo da ferramenta opcoes_tamanho
		*/
		tamanho: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.tamanho()","opcoes_tamanho","opcoesTamanho");
		},
		/*
		Function: tipoimagem

		Abre a janela de di�logo da ferramenta tipoimagem
		*/
		tipoimagem: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.tipoimagem()","tipoimagem","tipoimagem");
		},
		/*
		Function: corFundo

		Abre a janela de di�logo da ferramenta opcoes_fundo
		*/
		corFundo: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.corFundo()","opcoes_fundo","opcoesFundo");
		},
		/*
		Function: opcoesEscala

		Abre a janela de di�logo da ferramenta opcoes_escala
		*/
		opcoesEscala: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.opcoesEscala()","opcoes_escala","opcoesEscala");
		},
		/*
		Function: opcoesLegenda

		Abre a janela de di�logo da ferramenta opcoes_legenda
		*/
		opcoesLegenda: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.opcoesLegenda()","opcoes_legenda","opcoesLegenda");
		},
		/*
		Function: gradeCoord

		Abre a janela de di�logo da ferramenta gradecoord
		*/
		gradeCoord: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.gradeCoord()","gradecoord","gradeCoord");
		},
		/*
		Function: cliqueTexto

		Abre a janela de di�logo da ferramenta inseretxt
		*/
		cliqueTexto: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.cliqueTexto()","inseretxt","inseretxt");
		},
		/*
		Function: selecao

		Abre a janela de di�logo da ferramenta selecao
		*/
		selecao: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.selecao()","selecao","selecao");
		},
		/*
		Function: cliquePonto

		Abre a janela de di�logo da ferramenta inserexy2
		*/
		cliquePonto: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.cliquePonto()","inserexy2","inserexy");
		},
		/*
		Function: cliqueGrafico

		Abre a janela de di�logo da ferramenta inseregrafico
		*/
		cliqueGrafico: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.cliqueGrafico()","inseregrafico","insereGrafico");
		},
		/*
		Function: cliqueIdentificaDefault

		Abre a janela de di�logo da ferramenta identifica
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

		Mostra etiquetas no mapa com informa��es sobre os temas com etiquetas ativas

		Essa � a fun��o padr�o definida em i3GEO.configura
		*/
		verificaTipDefault: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.mapa.dialogo.verificaTipDefault()");}
			var ntemas,etiquetas,j,retorna;
			ntemas = i3GEO.arvoreDeCamadas.CAMADAS.length;
			etiquetas = false;
			for(j=0;j<ntemas;j += 1)
			{if(i3GEO.arvoreDeCamadas.CAMADAS[j].etiquetas !== "")
			{etiquetas = true;}}
			if(etiquetas === false)
			{return;}
			if(i3GEO.Interface.ATUAL==="padrao")
			{$i("img").style.cursor = "wait";}
			if(i3GEO.Interface.ATUAL === "googleearth")
			{i3GEO.Interface.googleearth.aguarde.visibility = "visible";}
			retorna = function(retorno){
				var pos,temp,rfes,n,i,mostra,res,temas,ntemas,titulo,tips,j,ntips,ins,r,ds,nds,s,balloon,
					configura = i3GEO.configura,
					tipotip = configura.tipotip;
				i = $i("i3geo_rosa");
				if(i)
				{i.style.display="none";}
				mostra = false;
				//try{
					retorno = retorno.data;
					if (retorno !== "")
					{
						res = "";
						temas = retorno;
						if(!temas){return;}
						ntemas = temas.length;
						for(j=0;j<ntemas;j += 1){
							titulo = temas[j].nome;
							if (tipotip === "completo" || tipotip === "balao")
							{titulo = "<span style='text-decoration:underline;text-align:left;font-size:9pt'><b>"+titulo+"</b></span><br>";}
							else
							{titulo = "";}
							tips = (temas[j].resultado.tips).split(",");
							ntips = tips.length;
							ins = "";
							ds = temas[j].resultado.dados;
							if(ds !== " "){
								try{
									nds = ds.length;
									for(s=0;s<nds;s += 1){
										for(r=0;r<ntips;r += 1){
											try{
												eval("var alias = ds[s]."+tips[r]+".alias");
												eval("var valor = ds[s]."+tips[r]+".valor");
												eval("var link = ds[s]."+tips[r]+".link");
												eval("var img = ds[s]."+tips[r]+".img");
												if (tipotip === "completo" || tipotip === "balao"){
													if(valor !== "" && link === "") 
													{ins += "<span class='tiptexto' style='text-align:left;font-size:8pt'>" + alias + " :" + valor + "</span><br>";}
													if(valor !== "" && link !== "") 
													{ins += "<span class='tiptexto' style='text-align:left;font-size:8pt'>" + alias + " : <a style='color:blue;cursor:pointer' target=_blanck href='"+link+"' >" + valor + "</a></span><br>";}
													if(img !== "")
													{ins += img+"<br>";}
													ins += "<nl>";
													mostra = true;
												}
												else{
													ins += "<span class='tiptexto' style='text-align:left;font-size:8pt'>" + valor + "</span><br>";
													mostra = true;
												}
											}
											catch(e){}
										}
									}
								}
								catch(e){
									if(typeof(console) !== 'undefined'){console.error(e);}
								}
							}
							if(ins !== "")
							{res += titulo + ins;}
						}
						if(!mostra){
							if($i("tip"))
							{$i("tip").style.display="none";}
						}
						else{
							if(tipotip !== "balao"){
								n = i3GEO.janela.tip();
								$i(n).style.textAlign="left";
								$i(n).innerHTML += res;
							}
							else{
								if(i3GEO.Interface.ATUAL === "googleearth"){
									i3GEO.Interface.googleearth.balao(res,objposicaocursor.ddx,objposicaocursor.ddy);
									i3GEO.Interface.googleearth.aguarde.visibility = "hidden";
								}
								else{
									i3GEO.util.criaPin('marcaIdentifica',configura.locaplic+"/imagens/grabber.gif","12px","12px");
									i3GEO.janela.TIPS.push('marcaIdentifica');
									pos = i3GEO.util.posicionaImagemNoMapa("marcaIdentifica");
									balloon = new Balloon();
									BalloonConfig(balloon,'GBox');
									balloon.delayTime = 0;
									res = "<div style=text-align:left;overflow:auto;height:"+configura.alturatip+";width:"+configura.larguratip+"; >"+res+"</div>";
									temp = $i('marcaIdentifica');
									if(temp){
										balloon.showTooltip(temp,res,null,null,null,pos[1],pos[0]);
										balloon.addCloseButton();
										temp.onclick = function(e){
											if (!e){e = window.event;}
											document.body.removeChild(balloon.getEventTarget(e));
											balloon.hideTooltip();
										};
										
									}
								}
							}
						}
					}
					if($i(i3GEO.Interface.IDMAPA)){
						$i(i3GEO.Interface.IDMAPA).title = "";
						temp = "identifica";
						if(i3GEO.Interface.ATIVAMENUCONTEXTO)
						{temp = "identifica_contexto";}
						i3GEO.util.mudaCursor(configura.cursores,temp,i3GEO.Interface.IDMAPA,configura.locaplic);
					}
				
				/*
				}
				catch(e){
					if(i3GEO.Interface.ATUAL==="padrao"){
						temp = "identifica";
						if(i3GEO.Interface.ATIVAMENUCONTEXTO)
						{temp = "identifica_contexto";}
						i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,"img",i3GEO.configura.locaplic);
					}
					if(i3GEO.Interface.ATUAL === "googleearth")
					{i3GEO.Interface.googleearth.aguarde.visibility = "hidden";}
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
				*/
			};
			i3GEO.php.identifica2(retorna,objposicaocursor.ddx,objposicaocursor.ddy,"5","tip",i3GEO.configura.locaplic,i3GEO.configura.sid,"ligados",i3GEO.parametros.mapexten);
		}
	}
};
//YAHOO.log("carregou classe mapa", "Classes i3geo");