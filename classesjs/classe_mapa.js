/*
Class:: i3GEO.mapa

Cria e processa o mapa principal

Em i3GEO.mapa.dialogo est�o as fun��es de abertura dos di�logos para altera��o das propriedades do mapa,
como cor de fundo, tipo de imagem, legenda etc.

File: i3geo/classesjs/classe_mapa.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
i3GEO.mapa = {
	/*
	Function: ajustaPosicao
	
	Ajusta o posicionamento do corpo do mapa
	
	Esse ajuste � necess�rio na inicializa��o, uma vez que o mapa utiliza style.position='absolute'
	*/
	ajustaPosicao: function(){
		try{
			imagemxi = 0;
			imagemyi = 0;
			imagemxref = 0;
			imagemyref = 0;
			var dc = $i("i3geo");
			if(!dc){return;}
			if (dc.style.left){imagemxi += parseInt(dc.style.left);}
			if (dc.style.top){imagemyi += parseInt(dc.style.top);}	
			if ($i("contemImg"))
			{var dc = $i("contemImg");}
			else
			{var dc = $i("img");}
			if ($i("openlayers"))
			{var dc = $i("openlayers");}
			if ($i("flamingo"))
			{var dc = $i("flamingo");}
			while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo")){
				dc = dc.offsetParent;
				imagemxi = imagemxi + dc.offsetLeft;
				imagemyi = imagemyi + dc.offsetTop;
			}
			var c = $i("corpoMapa");
			if (c){
				c.style.position="absolute";
				$left("corpoMapa",imagemxi);
				$top("corpoMapa",imagemyi);
				if ($i("i3geo").style.left){$left("corpoMapa",imagemxi - parseInt($i("i3geo").style.left));}
				if ($i("i3geo").style.top){$top("corpoMapa",imagemyi - parseInt($i("i3geo").style.top));}
			}
			if ($i("ref")){
				var dc = $i("ref");
				while (dc.offsetParent.id != "i3geo"){
					dc = dc.offsetParent;
					imagemxref = imagemxref + dc.offsetLeft;
					imagemyref = imagemyref + dc.offsetTop;
				}
			}
			if ($i("aguarde")){
				$top("aguarde",imagemyi);
				$left("aguarde",imagemxi);
			}
		}
		catch(e){alert("Ocorreu um erro. i3GEO.mapa.ajustaPosicao"+e);}
	},
	/*
	Function: recupera
	
	Tenta recuperar o mapa de backup caso ocorra algum problema
	
	O i3Geo mant�m sempre uma c�pia do arquivo mapfile em uso. Essa fun��o tenta
	usar essa c�pia para restaurar o funcionamento do mapa
	*/
	recupera:{
		/*
		Variable: TENTATIVA
		
		Armazena a quantidade de tentativas de recupera��o que foram feitas
		
		Type:
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
			if(i3GEO.mapa.recupera.TENTATIVA == 0){
				i3GEO.mapa.recupera.TENTATIVA++;
				i3GEO.mapa.recupera.restaura();
			}
		},
		/*
		Function: restaura
		
		Restaura o mapa para a c�pia de seguran�a existente no servidor
		*/
		restaura: function(){
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=recuperamapa&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"recuperamapa",ajaxredesenha);
		}
	},
	/*
	Controla a obten��o da legenda do mapa formatada em HTML.
	
	�til para mostrar a legenda na tela
	*/
	legendaHTML:{
		/*
		Variable: ID
		
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
		
		Parameters:
		
		id {String} - id do elemento que receber� a legenda
		*/
		cria: function(id){
			if(arguments.length == 0){var id = "";}
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
			var temp = function(retorno){
				if(i3GEO.mapa.legendaHTML.ID != "" && $i(i3GEO.mapa.legendaHTML.ID))
				{
					if ((retorno.data != "erro") && (retorno.data != undefined)){
						var s = i3GEO.configura.locaplic+"/imagens/solta.gif";
						$i(i3GEO.mapa.legendaHTML.ID).innerHTML = "<img onclick='i3GEO.mapa.legendaHTML.libera()' id=soltaLeg src="+s+" title='clique para liberar'/><br><div id='corpoLegi' >"+ retorno.data.legenda + "</div>";
					}
				}
				if ($i("wlegenda")){
					$i("wlegenda").innerHTML = retorno.data.legenda;
					var elementos = $i("wlegenda").getElementsByTagName("input");
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
		
		Parameters:
		
			funcao {function} - fun��o que receber� o resultado da chamada AJAX. O objeto CPAINT � enviado como par�metro.
		*/
		obtem: function(funcao){
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&templateLegenda="+g_templateLegenda+"&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"criaLegenda",funcao);
		},
		/*
		Function: libera
		
		Libera a legenda criando uma janela flutuante sobre o mapa
		*/
		libera: function(){
			var temp = function(retorno){
				if (!$i("moveLegi")){
					var novoel = document.createElement("div");
					novoel.id = "moveLegi";
					novoel.style.display="block";
					var temp = '<div class="hd">Legenda</div>';
					temp += '<div id="wlegenda" style="text-align:left;background-color:white" ></div>';
					novoel.innerHTML = temp;
					document.body.appendChild(novoel);
					YAHOO.namespace("moveLegi.xp");
					YAHOO.moveLegi.xp.panel = new YAHOO.widget.Panel("moveLegi", {width:"300px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
					YAHOO.moveLegi.xp.panel.render();
				}
				$i("wlegenda").innerHTML = retorno.data.legenda;
				var temp = $i("wlegenda").getElementsByTagName("input");
				var n = temp.length;
				for(i=0;i<n;i++){
					temp[i].style.display = "none";
				}
				YAHOO.moveLegi.xp.panel.show();				
			}
			i3GEO.mapa.legendaHTML.obtem(temp);
		}
	},
	/*
	Function: legendaIMAGEM
	
	Controla a obten��o da legenda do mapa na forma de uma imagem
	
	� utilizado principalmente para armazenar as imagens para a fun��o de 
	obten��o do hist�rico do mapa
	*/
	legendaIMAGEM:{
		/*
		Function: obtem
		
		Faz a chamada em AJAX que gera a legenda
		
		O resultado � processado pela fun��o passada como par�metro
		
		Parameters:
		
			funcao {function} - fun��o que receber� o resultado da chamada AJAX. O objeto CPAINT � enviado como par�metro.
		*/
		obtem: function(funcao){
			var p =i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaImagem&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"legendaGrafica",funcao);
		}
	},
	/*
	Function: dialogo
	
	Abre as telas de di�logo das op��es de manipula��o do mapa atual
	*/
	dialogo:{
		/*
		Function: autoredesenha

		Abre a janela para defini��o do intervalo de tempo para redesenho autom�tico do mapa.
		*/
		autoredesenha: function()
		{i3GEO.janela.cria("300px","180px",i3GEO.configura.locaplic+"/ferramentas/opcoes_autoredesenha/index.htm","","","Temporizador");},
		/*
		Function: salvaMapa

		Abre a janela para salvar localmente o mapfile utilizado no mapa atual
		*/
		salvaMapa: function(){
			if(objmapa.mapfile == "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.janela.cria("300px","180px",i3GEO.configura.locaplic+"/ferramentas/salvamapa/index.htm","","","Salva mapa");
		},
		/*
		Function: carregaMapa

		Abre a janela para a carga de um mapfile salvo localmente na m�quina dousu�rio.
		*/
		carregaMapa: function()
		{i3GEO.janela.cria("300px","150px",i3GEO.configura.locaplic+"/ferramentas/carregamapa/index.htm?urlatual="+window.location,"","","Carrega mapa");},
		/*
		Function: convertews

		Abre a janela para converter o mapa atual em web service WMS
		*/
		convertews: function(){
			if(objmapa.mapfile == "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.janela.cria("440px","280px",i3GEO.configura.locaplic+"/ferramentas/convertews/index.htm","","","Web service");
		},
		/*
		Function: queryMap

		Abre a janela que altera as propriedades da exibi��o dos elementos selecionados.
		*/
		queryMap: function()
		{i3GEO.janela.cria("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_querymap/index.htm","","","Querymap");},
		/*
		Function: template

		Abre a janela que muda o template do mapa atual.
		*/
		template: function()
		{i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template");},
		/*
		Function: tamanho

		Abre a janela que muda o tamanho do mapa
		*/
		tamanho: function()
		{i3GEO.janela.cria("150px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_tamanho/index.htm","","","Tamanho");},
		/*
		Function: tipoimagem

		Abre a janela que define um filtro gr�fico (s�pia por exemplo) sobre a imagem gerada alterando suas caracter�sticas
		*/
		tipoimagem: function()
		{i3GEO.janela.cria("300px","220px",i3GEO.configura.locaplic+"/ferramentas/tipoimagem/index.htm","","","Tipo de imagem");},
		/*
		Function: corFundo

		Abre a janela que altera a cor do fundo do mapa atual.
		*/
		corFundo: function()
		{i3GEO.janela.cria("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_fundo/index.htm","","","Fundo");},
		/*
		Function: opcoesEscala

		Abre a janela para defini��o das op��es da barra de escala.
		*/
		opcoesEscala: function()
		{i3GEO.janela.cria("250px","300px",i3GEO.configura.locaplic+"/ferramentas/opcoes_escala/index.htm","center","center","Escala");},
		/*
		Function: opcoesLegenda

		Abre a janela de configura��o da legenda do mapa
		*/
		opcoesLegenda: function()
		{i3GEO.janela.cria("300px","280px",i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/index.htm","","","Legenda");},
		/*
		Function: gradeCoord

		Abre a janela que gera grade de coordenadas
		*/
		gradeCoord: function()
		{i3GEO.janela.cria("350px","280px",i3GEO.configura.locaplic+"/ferramentas/gradecoord/index.htm","","","Grade de coordenadas");}

	},
	/*
	Function: ativaLogo

	Ativa ou desativa a logo marca.

	*/
	ativaLogo: function(){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=ativalogo&g_sid="+i3GEO.configura.sid;
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"ativalogo",ajaxredesenha);
	}
	
};