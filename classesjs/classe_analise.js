/*jslint white:false,undef: false, rhino: true, onevar: true, evil: false */

/*
Title: An�lise geogr�fica

Arquivo:

i3geo/classesjs/classe_analise.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = [];
}
/*
Classe: i3GEO.analise

Fun��es de gera��o das an�lises e abertura dos di�logos das op��es de an�lise espacial

Em i3GEO.analise.dialogo est�o as fun��es de abertura dos di�logos
*/
i3GEO.analise = {
	/*
	Classe: i3GEO.analise.dialogo
	
	Abre as telas de di�logo das op��es de an�lise
	
	Exemplo:

	Para abrir a mensagem de di�logo de gera��o de buffer, utilize
	
	i3GEO.analise.dialogo.buffer()
	*/
	dialogo:{
		/*
		Function: gradePontos

		Abre a janela que gera grade de pontos
		*/
		gradePontos: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradepontos/index.htm","","","Grade de pontos <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=15' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: gradePol

		Abre a janela que gera grade de poligonos
		*/
		gradePol: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradepol/index.htm","","","Grade de pol&iacute;gonos <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=14' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: gradeHex

		Abre a janela que gera grade de hex�gonos
		*/
		gradeHex: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradehex/index.htm","","","Grade de hex&aacute;gonos <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=16' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: analisaGeometrias

		Abre a janela com o sistema de an�lise de geometrias
		*/
		analisaGeometrias: function(){
			g_tipoacao = "selecao";
			i3GEO.temaAtivo = "";
			i3GEO.janela.cria("500px","400px",i3GEO.configura.locaplic+'/ferramentas/analisageometrias/index.htm',"","","An&aacute;lise de geometrias <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=23' >&nbsp;&nbsp;&nbsp;</a>");
		},
		/*
		Function: pontosdistri

		Abre a janela para executar an�lises de distribui��o de pontos
		*/
		pontosdistri: function(){
			if (i3GEO.parametros.r == "nao")
			{alert("Op��o n�o dispon�vel");}
			else
			{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/pontosdistri/index.htm","","","Distribui&ccedil;&atilde;o de pontos <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=20' >&nbsp;&nbsp;&nbsp;</a>");}
		},
		/*
		Function: pontoempoligono

		Abre a janela para cruzar um tema de pontos com um ou mais temas poligonais e gerar um novo tema
		*/
		pontoempoligono: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/pontoempoligono/index.htm","","","Ponto em pol&iacute;gono <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=18' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: nptPol

		Abre a janela para cruzar um tema de pontos com um ou tema poligona e gerar um novo tema com o n�mero de pontos em cada pol�gono
		*/
		nptPol: function()
		{i3GEO.janela.cria("400px","200px",i3GEO.configura.locaplic+"/ferramentas/nptpol/index.htm","","","Pontos por pol&iacute;gono <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=19' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: buffer

		Gera um buffer em elementos selecionados
		*/
		buffer: function()
		{i3GEO.janela.cria("400px","180px",i3GEO.configura.locaplic+"/ferramentas/buffer/index.htm","","","Entorno <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=24' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: distanciaptpt

		Abre a janela para calcular a dist�ncia entre um ponto e outros pontos pr�ximos
		*/
		distanciaptpt: function()
		{i3GEO.janela.cria("400px","220px",i3GEO.configura.locaplic+"/ferramentas/distanciaptpt/index.htm","","","Dist&acirc;ncia <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=17' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: centroide

		Abre a janela que gera um tema com os centroides dos elementos selecionados
		*/
		centroide: function()
		{i3GEO.janela.cria("400px","180px",i3GEO.configura.locaplic+"/ferramentas/centroide/index.htm","","","Centr�ide <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=21' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: dissolve

		Abre a janela que gera um tema dissolvendo as divisas entre pol�gonos.
		*/
		dissolve: function()
		{i3GEO.janela.cria("400px","230px",i3GEO.configura.locaplic+"/ferramentas/dissolve/index.htm","","","Dissolve <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=22' >&nbsp;&nbsp;&nbsp;</a>");},
		/*
		Function: agrupaElementos

		Abre a janela que gera um tema poligonal agrupando elementos de um tema.
		*/
		agrupaElementos: function()
		{i3GEO.janela.cria("400px","230px",i3GEO.configura.locaplic+"/ferramentas/agrupaelementos/index.htm","","","Agrupa <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=25' >&nbsp;&nbsp;&nbsp;</a>");}
	},
	/*
	Classe: i3GEO.analise.medeDistancia
	
	Ativa e controla a op��o de medi��o de dist�ncias.

	A medida � feita quando o usu�rio clica no mapa com esta op��o ativa

	Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.

	Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.
	*/
	medeDistancia:{
		/*
		Function: inicia
		
		Inicia a opera��o de medi��o, abrindo a janela de resultados e criando os componentes necess�rios
		
		S�o registrados os eventos de clique sobre o mapa e fechamento da janela de resultados
		*/
		inicia: function(){
			pontosdistobj = [];
			i3GEO.analise.medeDistancia.criaJanela();
			if (g_tipoacao != "mede"){
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.analise.medeDistancia.clique()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.analise.medeDistancia.clique()");}
				if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.analise.medeDistancia.movimento()") < 0)
				{i3GEO.eventos.MOUSEMOVE.push("i3GEO.analise.medeDistancia.movimento()");}
				$i("mostradistancia").style.display="block";
				i3GEO.desenho.criaContainerRichdraw();
				i3GEO.desenho.richdraw.lineColor = "black";
				i3GEO.desenho.richdraw.lineWidth = "1px";
				g_tipoacao = "mede";
			}
			else{
				i3GEO.desenho.richdraw.fecha();
				if($i("mostradistancia")){$i("mostradistancia").style.display="none";}
				if($i("pontosins")){$i("pontosins").style.display="none";}
			}	
		},
		/*
		Function: criaJanela
		
		Cria a janela para mostrar os resultados da medi��o
		*/
		criaJanela: function(){
			var novoel,ins,imagemxy;
			if (!$i("mostradistancia")){
				novoel = document.createElement("div");
				novoel.id = "mostradistancia";
				ins = '<div class="hd" >&nbsp;  <a class=ajuda_usuario target=_blank href="'+i3GEO.configura.locaplic+'/ajuda_usuario.php?idcategoria=6&idajuda=50" >&nbsp;&nbsp;&nbsp;</a></div>';
				ins += '<div class="bd" style="text-align:left;padding:3px;" >';
				ins += '<div style="text-align:left;padding:3px;" id="mostradistancia_calculo" ></div>';
				ins += '<div style="text-align:left;font-size:10px" >';
				ins += "<span style='color:navy;cursor:pointer;text-align:left;' >";
				ins += "<table><tr><td><input style='cursor:pointer' type='checkbox' id='pararraios' checked /></td><td>Raios</td><td>&nbsp;</td>";
				ins += "<td><input style='cursor:pointer' type='checkbox' id='parartextos' checked /></td><td>Textos<td></tr></table></span>";
				ins += '</div>';
				ins += '</div>';
				//ins += "<a href='http://www.movable-type.co.uk/scripts/latlong.html' target='_blank'>sobre o c�lculo</a>";
				novoel.innerHTML = ins;
				novoel.style.borderColor="gray";
				document.body.appendChild(novoel);
			}
			else{
				if ($i("mostradistancia_calculo"))
				{$i("mostradistancia_calculo").innerHTML = "";}
			}
			YAHOO.namespace("janelaDocamede.xp");
			YAHOO.janelaDocamede.xp.panel = new YAHOO.widget.Panel("mostradistancia", {width:300,fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaDocamede.xp.panel.render();
			imagemxy = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));
			YAHOO.janelaDocamede.xp.panel.moveTo(imagemxy[0]+150,imagemxy[1]);
			YAHOO.util.Event.addListener(YAHOO.janelaDocamede.xp.panel.close, "click", i3GEO.analise.medeDistancia.fechaJanela);
		},
		/*
		Function: fechaJanela
		
		Fecha a janela e os elementos gr�ficos criados para a ferramenta de medi��o
		*/
		fechaJanela: function(){
			i3GEO.desenho.richdraw.fecha();
			if($i("pontosins")){document.body.removeChild($i("pontosins"));}
			YAHOO.util.Event.removeListener(YAHOO.janelaDocamede.xp.panel.close, "click");
			i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.analise.medeDistancia.clique()");
			i3GEO.eventos.MOUSEMOVE.remove("i3GEO.analise.medeDistancia.movimento()");
			i3GEO.barraDeBotoes.ativaBotoes();
		},
		/*
		Function: clique
		
		Adiciona uma marca na tela e realiza o c�lculo de dist�ncia dos pontos inseridos
		*/
		clique: function(){
			var n,d;
			if (g_tipoacao == "mede"){
				n = pontosdistobj.xpt.length;
				pontosdistobj.xpt[n] = objposicaocursor.ddx;
				pontosdistobj.ypt[n] = objposicaocursor.ddy;
				pontosdistobj.xtela[n] = objposicaocursor.telax;
				pontosdistobj.ytela[n] = objposicaocursor.telay;
				pontosdistobj.ximg[n] = objposicaocursor.imgx;
				pontosdistobj.yimg[n] = objposicaocursor.imgy;
				pontosdistobj.dist[n] = 0;
				try{
					if (navn)
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1),(pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1));}
					else
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);}				
				}
				catch(e){window.status=n+" erro ao desenhar a linha base "+e.message;}
				if (n > 0){
					d = parseInt(i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy),10);
					pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
					if($i("pararraios") && $i("pararraios").checked === true ){
						i3GEO.desenho.aplica("insereCirculo","",n);
						if(navm)
						{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n-1],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);}
					}
					if($i("parartextos") && $i("parartextos").checked === true ){
						i3GEO.desenho.aplica("insereTexto","",n,d+" km");
					}
				}
				i3GEO.util.insereMarca.cria(objposicaocursor.imgx,objposicaocursor.imgy,i3GEO.analise.medeDistancia.fechaJanela,"divGeometriasTemp");
			}
		},
		/*
		Function: movimento
		
		Realiza os c�lculos e desenho da linha conforme o usu�rio movimenta o mouse
		*/
		movimento: function(){
			var n,d,r,decimal,da,mostra;
			if (g_tipoacao == "mede"){
				if($i("mostradistancia"))
				{$i("mostradistancia").style.display="block";}
				n = pontosdistobj.xpt.length;
				if (n > 0){
					d = i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					r = i3GEO.calculo.direcao(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					r = i3GEO.calculo.dd2dms(r,r);
					r = r[0];
					if (i3GEO.parametros.mapscale > 500000)
					{d = parseInt(d,10);}
					else{
						d = d + "";
						d = d.split(".");
						decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					da = d + pontosdistobj.dist[n-1];
					mostra = $i("mostradistancia_calculo");
					if (mostra){
						mostra.innerHTML = " Dist acum.= "+da+" atual= "+d+" km <br> Dire��o (DMS)= "+r;
					}
					i3GEO.desenho.aplica("resizeLinha",pontosdistobj.linhas[n-1],n);
				}
			}
		}
	},
	/*
	Classe: i3GEO.analise.medeArea
	
	Ativa e controla a op��o de medi��o de �rea.

	A medida � feita quando o usu�rio clica no mapa com esta op��o ativa

	Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.

	Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.
	*/
	medeArea:{
		/*
		Function: inicia
		
		Inicia a opera��o de medi��o, abrindo a janela de resultados e criando os componentes necess�rios
		
		S�o registrados os eventos de clique sobre o mapa e fechamento da janela de resultados
		*/
		inicia: function(){
			var temp;
			i3GEO.analise.medeArea.criaJanela();
			if (g_tipoacao != "area"){
				$i("mostraarea_calculo").innerHTML = "";
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.analise.medeArea.clique()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.analise.medeArea.clique()");}
				if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.analise.medeArea.movimento()") < 0)
				{i3GEO.eventos.MOUSEMOVE.push("i3GEO.analise.medeArea.movimento()");}		
				YAHOO.util.Event.addListener(YAHOO.janelaDocaarea.xp.panel.close, "click", i3GEO.analise.medeArea.fechaJanela);
				temp = function(retorno){
					i3GEO.janela.fechaAguarde("i3GEO.atualiza");
					g_areapixel = retorno.data;
					if (g_areapixel < 0)
					{alert("Nao e possivel calcular a area. Entre em contato com o administrador do sistema.");}
					else{
						alert("Clique no mapa para desenhar o poligono. Clique duas vezes para concluir");
						i3GEO.barraDeBotoes.ativaIcone("area");
						g_tipoacao = "area";
						i3GEO.desenho.criaContainerRichdraw();
						i3GEO.desenho.richdraw.lineColor = "green";
						i3GEO.desenho.richdraw.lineWidth = "2px";
					}
				};
				if(i3GEO.Interface.ATUAL == "padrao"){
					i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
					i3GEO.php.areaPixel(temp,i3GEO.parametros.pixelsize);
				}
				else
				{alert("Operacao nao disponivel");}
			}
			else{i3GEO.desenho.richdraw.fecha();}
		},
		/*
		Function: criaJanela
		
		Cria a janela para mostrar os resultados da medi��o
		*/
		criaJanela: function(){
			var novoel,ins,imagemxy;
			if (!$i("mostraarea")){
				novoel = document.createElement("div");
				novoel.id = "mostraarea";
				ins = "<div class='hd' >&Aacute;rea aproximada <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=6&idajuda=51' >&nbsp;&nbsp;&nbsp;</a></div>";
				ins += '<div class="bd" style="text-align:left;padding:3px;" >';
				ins += '<div style="text-align:left;padding:3px;font-size:10px" id="mostraarea_calculo" ></div>';
				ins+= '</div>';
				novoel.innerHTML = ins;
				novoel.style.borderColor="gray";
				document.body.appendChild(novoel);
			}
			YAHOO.namespace("janelaDocaarea.xp");
			YAHOO.janelaDocaarea.xp.panel = new YAHOO.widget.Panel("mostraarea", {width:220,fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaDocaarea.xp.panel.render();
			imagemxy = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));
			YAHOO.janelaDocaarea.xp.panel.moveTo(imagemxy[0]+150,imagemxy[1]);
		},
		/*
		Function: fechaJanela
		
		Fecha a janela e os elementos gr�ficos criados para a ferramenta de medi��o
		*/
		fechaJanela: function(){
			i3GEO.desenho.richdraw.fecha();
			if($i("pontosArea")){document.body.removeChild($i("pontosArea"));}
			i3GEO.eventos.MOUSECLIQUE.remove("cliqueArea()");
			i3GEO.eventos.MOUSEMOVE.remove("moveArea()");
			i3GEO.barraDeBotoes.ativaBotoes();
		},
		/*
		Function: clique
		
		Adiciona uma marca na tela e realiza o c�lculo de dist�ncia dos pontos inseridos
		*/
		clique: function(){
			var n,m;
			if (g_tipoacao == "area"){
				n = pontosdistobj.xpt.length;
				pontosdistobj.xpt[n] = objposicaocursor.ddx;
				pontosdistobj.ypt[n] = objposicaocursor.ddy;
				pontosdistobj.xtela[n] = objposicaocursor.telax;
				pontosdistobj.ytela[n] = objposicaocursor.telay;
				pontosdistobj.ximg[n] = objposicaocursor.imgx;
				pontosdistobj.yimg[n] = objposicaocursor.imgy;
				pontosdistobj.dist[n] = 0;
				//inclui a linha para ligar com o ponto inicial
				if (n === 0){
					try	{
						if (navn)
						{pontosdistobj.linhastemp = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[0]-1,pontosdistobj.yimg[0]-1);}
						else
						{pontosdistobj.linhastemp = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[0])-(i3GEO.parametros.w/2),pontosdistobj.yimg[0]);	}				
					}
					catch(e){}
				}
				try{
					if (navn)
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1);}
					else
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);}				
				}
				catch(e){}
				m = i3GEO.calculo.area(pontosdistobj,g_areapixel);
				if($i("mostraarea_calculo"))
				{$i("mostraarea_calculo").innerHTML = "<br>m2</b>= "+m.toFixed(2)+"<br><b>km2</b>= "+(m/1000000).toFixed(2)+"<br><b>ha</b>= "+(m/10000).toFixed(2);}
				if (n > 3){
				//var d = parseInt(i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
				//pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
				}
				i3GEO.util.insereMarca.cria(objposicaocursor.imgx,objposicaocursor.imgy,i3GEO.analise.medeArea.fechaJanela,"pontosArea");
			}
		},
		/*
		Function: movimento
		
		Realiza os c�lculos e desenho da linha conforme o usu�rio movimenta o mouse
		*/
		movimento: function(){
			var n,d,decimal,da;
			if (g_tipoacao == "area"){
				n = pontosdistobj.xpt.length;
				if (n > 0){
					//
					//conforme a escala, os dados s�o arredondados
					// 
					d = i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					if (i3GEO.parametros.mapscale > 500000)
					{d = parseInt(d,10);}
					else{
						d= d + "";
						d = d.split(".");
						decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					da = d + pontosdistobj.dist[n-1];
					//
					//desenha as linhas na tela com o objeto richdraw
					//
					if(navn){i3GEO.desenho.aplica("resizePoligono",pontosdistobj.linhastemp,0);}
					i3GEO.desenho.aplica("resizeLinha",pontosdistobj.linhas[n-1],n);
				}
			}
		}
	}
};
//YAHOO.log("carregou classe analise", "Classes i3geo");