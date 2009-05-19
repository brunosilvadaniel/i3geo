/*
Title: i3Geo

File: i3geo/classesjs/classe_i3geo.js

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
/*
Class: i3GEO

A classe i3GEO possu� os m�todos de cria��o e atualiza��o do mapa. Todas as subclasses
s�o baseadas em i3GEO, por exemplo, para criar uma janela flutuante sobre o mapa,
utilize i3GEO.janela.cria()

Para inicializar o mapa, utilize i3GEO.inicia() e para atualizar o mapa, utilize i3GEO.atualiza()

Ao inicializar ou atualizar o i3Geo, � feita uma chamada em AJAX 
para a obten��o dos par�metros necess�rios ao funcionamento do mapa. Esses par�metros
s�o armazenados na vari�vel i3GEO.parametros

Nessa classe est�o dispon�veis vari�veis internas utilizadas em v�rias fun��es, como i3GEO.temaAtivo
*/
i3GEO = {
	
	/*
	Variable: parametros
	
	Par�metros obtidos do mapa atual. Os par�metros s�o fornecidos pelos programas
	PHP de redesenho e cria��o do mapa e atualizados sempre que o mapa � alterado.
	
	Exemplos:
	
	Para acessar um valor, utilize por exemplo
	
	alert(i3GEO.parametros.mapexten)
	
	Parameters:
	
	mapexten {String} - extens�o geogr�fica do mapa no formato xmin ymin xmax ymax
	
	mapscale {Numeric} - denominador da escala do mapa
	
	mapres {Numeric} - resolu��o da imagem do mapa em DPI
	
	pixelsize {Numeric} - tamanho em unidades de terreno dos pixels da imagem
	
	mapfile {String} - nome do mapfile atualmente em uso
	
	cgi {String} - endere�o do execut�vel do mapserver no servidor acess�vel pela URL
	
	extentTotal {String} - extens�o do mapa na inicializa��o
	
	mapimagem {String} - URL da imagem que comp�e o mapa
	
	geoip {sim|nao} - indica se o geoip est� instalado
	
	listavisual {String} - lista de visuais dispon�veis
	
	utilizacgi {sim|nao} - indica se o mapa atual est� no modo CGI
	
	versaoms {String} - vers�o do Mapserver instalado no servidor (maior)
	
	versaomscompleta {String} - vers�o do Mapserver instalado no servidor (completa)
	
	mensagens {String} - mensagens para uso no letreiro
	
	w {Integer} - largura do mapa atual
	
	h {Integer} - altura do mapa atual
	
	locsistemas {String} - endere�o do xml com a lista de sistemas adicionais
	
	locidentifica {String} - endere�o do xml com a lista de sistemas de identifica��o
	
	r {sim|nao} - indica se o software R est� instalado no servidor
	
	locmapas {String} - endere�o do xml com a lista de mapas
	
	extentref {String} - extens�o geogr�fica do mapa de refer�ncia
	
	celularef {Numeric} - tamanho do pixel do mapa de refer�ncia em unidades do terreno
	
	kmlurl {String} - url de um arquivo kml que ser� inserido no mapa. V�lido apenas na interface Google Maps
	*/
	parametros: {
		mapexten: "",
		mapscale: "",
		mapres: "",
		pixelsize: "",
		mapfile: "",
		cgi: "",
		extentTotal: "",
		mapimagem: "",
		geoip: "",
		listavisual: "",
		utilizacgi:"",
		versaoms:"",
		versaomscompleta: "",
		mensagens:"",
		w: "",
		h: "",
		locsistemas:"",
		locidentifica:"",
		r:"",
		locmapas:"",
		celularef:"",
		kmlurl:""
	},
	/*
	Variable: temaAtivo
	
	Indica o �ltimo tema que foi ativado no mapa
	
	Um tema � ativado em algumas ferramentas, permitindo aue ao se passar de uma ferramenta
	para outra, os menus reflitam a �ltima escolha
	*/
	temaAtivo: "",
	/*
	Function: cria
	
	Cria e configura a visualiza��o do mapa, definindo posicionamentos, tamanho etc
	
	Ap�s as defini��es b�sicas, � executado o programa <i3GEO.interface.cria> que ir�
	realizar as opera��es conforme a interface atualmente em uso. A interface � definida
	em <i3GEO.interface.ATUAL>
	
	<i3GEO.interface>
	*/
	cria:function(){
		if (window.location.href.split("?")[1]){
			i3GEO.configura.sid = window.location.href.split("?")[1];
			g_sid = i3GEO.configura.sid;
			//
			//a biblioteca YUI, por algum motivo, acrescenta # na URL. O # precisa ser removido, caso contr�rio, a op��o de reload da p�gina pelo browser as vezes n�o funciona
			//
			if (i3GEO.configura.sid.split("#")[0])
			{i3GEO.configura.sid = i3GEO.configura.sid.split("#")[0];}
		}
		else
		{i3GEO.configura.sid = "";}
		//para efeitos de compatibilidade
		g_panM = "nao";
		try {i3GEO.configura.locaplic = g_locaplic;}
		catch(e){g_locaplic = i3GEO.configura.locaplic;};	
		try{i3GEO.configura.diminuixM = g_diminuixM;}catch(e){}
		try{i3GEO.configura.diminuixN = g_diminuixN;}catch(e){}
		try{i3GEO.configura.diminuiyM = g_diminuiyM;}catch(e){}
		try{i3GEO.configura.diminuiyN = g_diminuiyN;}catch(e){}			
		//
		//calcula o tamanho do mapa
		var diminuix = (navm) ? i3GEO.configura.diminuixM : i3GEO.configura.diminuixN;
		var diminuiy = (navm) ? i3GEO.configura.diminuiyM : i3GEO.configura.diminuiyN;
		var menos = 0;
		if ($i("contemFerramentas"))
		{menos = menos + parseInt($i("contemFerramentas").style.width);}
		if ($i("ferramentas"))
		{menos = menos + parseInt($i("ferramentas").style.width);}
		var novow = parseInt(screen.availWidth) - diminuix;
		var novoh = parseInt(screen.availHeight) - diminuiy;		
		window.resizeTo(screen.availWidth,screen.availHeight);
		window.moveTo(0,0);

		//o try aqui � necess�rio por conta do uso poss�vel do i3geo em um iframe
		try{
			if (novow < 800){
				var novow = 800;
				var novoh = 600;
			}
		}
		catch(e){var e = "";}
		document.body.style.width = novow - diminuix;
		document.body.style.height = novoh;
		var w = novow - menos - diminuix;
		var h = novoh - diminuiy;
		var temp = $i("corpoMapa");
		if (temp){
			if(temp.style){
				if (temp.style.width){
					var w = parseInt(temp.style.width);
					var h = parseInt(temp.style.width);
				}
				if (temp.style.height)
				{var h = parseInt(temp.style.height);}
			}
		}
		if($i("contemImg")){
			$i("contemImg").style.height=h + "px";
			$i("contemImg").style.width=w + "px";
		}
		i3GEO.interface.cria(w,h);
		i3GEO.parametros = {
			mapexten: "",
			mapscale: "",
			mapres: "",
			pixelsize: "",
			mapfile: "",
			cgi: "",
			extentTotal: "",
			mapimagem: "",
			geoip: "",
			listavisual: "",
			utilizacgi:"",
			versaoms:"",
			versaomscompleta:"",
			mensagens:"",
			w: w,
			h: h,
			locsistemas:"",
			locidentifica:"",
			r:"",
			locmapas:"",
			extentref:"",
			kmlurl:""
		};
		if(w < 550){
			var i = $i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml);
			if(i){i.style.display = "none"};
		}
	},
	/*
	Function: inicia
	
	Inicializa o mapa ap�s ter sido criado com i3GEO.cria()
	
	Verifica se o mapa apresenta algum problema no processamento no lado do servidor e
	realiza as opera��es de tentativa de recupera��o, se for o caso
	
	No in�cio do processo � executada a fun��o <i3GEOmantemCompatibilidade>
	para realizar as opera��es necess�rias de manuten��o de compatibilidade da vers�o atual para as anteriores
	
	A inicializa��o � baseada em <i3GEO.php.inicia> cujo retorno � utilizado para definir a
	vari�vel <i3GEO.parametrso>
	
	Ap�s a inicializa��o � executado <i3GEO.interface.inicia>
	*/
	inicia:function(){
		if(typeof("i3GEOmantemCompatibilidade") == 'function')
		i3GEOmantemCompatibilidade();
		var montaMapa = function(retorno){
			if(retorno == ""){alert("Ocorreu um erro no mapa - montaMapa");retorno = {data:{erro: "erro"}};}
			if(retorno.data.erro){
				i3GEO.janela.fechaAguarde("montaMapa");
				document.body.style.backgroundColor="white";
				document.body.innerHTML = "<br>Para abrir o i3Geo utilize o link:<br><a href="+i3GEO.configura.locaplic+"/ms_criamapa.php >"+i3GEO.configura.locaplic+"/ms_criamapa.php</a>";
				return("linkquebrado");
			}
			else{
				if(retorno.data.variaveis){
					//
					//executa com eval a string que � retornada pelo servidor (fun��o inicia do mapa_controle.php
					//
					var tempo = "";
					var titulo = "";
					eval(retorno.data.variaveis);
					try{
						if (titulo != "")
						{top.document.title = titulo;}
					}
					catch(e){var e = "";}
					i3GEO.ajuda.mostraJanela("Tempo de desenho em segundos: "+tempo,"");

					i3GEO.parametros.mapexten= mapexten;
					i3GEO.parametros.mapscale= parseInt(mapscale);
					i3GEO.parametros.mapres= mapres;
					i3GEO.parametros.pixelsize= g_celula;
					i3GEO.parametros.mapfile= mapfile;
					i3GEO.parametros.cgi= cgi;
					i3GEO.parametros.extentTotal=mapexten;
					i3GEO.parametros.mapimagem= mapimagem;
					i3GEO.parametros.geoip= geoip;
					i3GEO.parametros.listavisual= listavisual;
					i3GEO.parametros.utilizacgi= utilizacgi;
					i3GEO.parametros.versaoms= versaoms;
					i3GEO.parametros.mensagens= mensagens;
					i3GEO.parametros.locsistemas = locsistemas;
					i3GEO.parametros.locidentifica = locidentifica;
					i3GEO.parametros.r = r;
					i3GEO.parametros.locmapas = locmapas;
					i3GEO.parametros.extentref = extentref;
					i3GEO.parametros.versaoms = versaoms;
					i3GEO.parametros.versaomscompleta = versaomscompleta;
					i3GEO.parametros.kmlurl = kmlurl;
					
					i3GEO.gadgets.quadros.inicia(10);
					i3GEO.gadgets.quadros.grava("extensao",mapexten);
					i3GEO.arvoreDeCamadas.cria("",retorno.data.temas,i3GEO.configura.sid,i3GEO.configura.locaplic);
					i3GEO.util.arvore("<b>"+$trad("p13")+"</b>","listaPropriedades",i3GEO.configura.listaDePropriedadesDoMapa);
					i3GEO.gadgets.mostraBuscaRapida();
					i3GEO.guias.cria();
					if($i("arvoreAdicionaTema"))
					i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,"arvoreAdicionaTema");
					
					if($i("mst")){$i("mst").style.display="block";}
					i3GEO.atualiza(retorno);
					//
					//calcula (opcional) o tamanho correto da tabela onde fica o mapa
					//se n�o for feito esse c�lculo, o mapa fica ajustado � esquerda
					//			
					var temp = 0;
					if ($i("contemFerramentas")){temp = temp + parseInt($i("contemFerramentas").style.width);}
					if ($i("ferramentas")){temp = temp + parseInt($i("ferramentas").style.width);}
					if($i("mst"))
					{$i("mst").style.width=i3GEO.parametros.w + temp + "px";}
					if (i3GEO.configura.entorno == "sim"){
						i3GEO.configura.entorno == "nao";
						i3GEO.navega.entorno.ativaDesativa();
					}
					i3GEO.navega.autoRedesenho.ativa();
					if ($i("i3geo_escalanum")){$i("i3geo_escalanum").value = i3GEO.parametros.mapscale;}
					if ((i3GEO.parametros.geoip == "nao") && ($i("ondeestou")))
					{$i("ondeestou").style.display="none";}
					i3GEO.interface.inicia();
				}
				else
				{alert("Erro. Impossivel criar o mapa "+retorno.data);return;}
				//
				//ativa a janela de mensagens se for o caso
				//
				if(document.getElementById("ajuda")) //para efeitos de compatibilidade com as vers�es anteriores a 4.1
				{i3GEO.ajuda.DIVAJUDA = "ajuda";}
				var abreJM = "sim";
				if (i3GEO.util.pegaCookie("g_janelaMen")){
					var abreJM = i3GEO.util.pegaCookie("g_janelaMen");
					if(abreJM == "sim")
					i3GEO.configura.iniciaJanelaMensagens = true;
					else
					i3GEO.configura.iniciaJanelaMensagens = false;
				}
				if(i3GEO.configura.iniciaJanelaMensagens == true)
				{i3GEO.ajuda.abreJanela();}		
				i3GEO.janela.fechaAguarde("montaMapa");
				if (i3GEO.configura.liberaGuias == "sim"){i3GEO.guias.libera();}
			}
			if($i("mst")){$i("mst").style.visibility ="visible";}	
		};
		if (!$i("i3geo"))
		{document.body.id = "i3geo";}
		$i("i3geo").className = "yui-skin-sam";
		if($i("mst"))
		$i("mst").style.visibility ="hidden";
		//
		//se g_sid="", o html foi aberto diretamente
		//ent�o, � necess�rio criar os arquivos tempor�rios do mapa
		//essa opera��o deve ser ass�ncrona
		//
		if(i3GEO.configura.sid==""){
			var mashup = function (retorno){
				i3GEO.configura.sid = retorno.data;
				i3GEO.inicia();
			};
			i3GEO.php.criamapa(mashup,i3GEO.configura.mashuppar);
		}
		else{
			//YAHOO.log("Chamada AJAX para obter o mapa inicial", "i3geo");
			i3GEO.janela.abreAguarde("montaMapa",$trad("o5"));
			i3GEO.php.inicia(montaMapa,i3GEO.configura.embedLegenda,i3GEO.parametros.w,i3GEO.parametros.h);
		}
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.janela.fechaAguarde()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.janela.fechaAguarde()");}
		eval(i3GEO.finaliza);
	},
	finaliza:"",
	/*
	Function: atualiza
	
	Atualiza o mapa atual, alterando a imagem do mapa os gadgets ativos e os par�metros e
	verifica a integridade do mapa em uso (arquivo mapfile)
	
	O processo executa tamb�m a fun��o de atualiza��o espec�fica da interface atual em uso, veja
	<i3GEO.interface.redesenha>
	
	Os seguintes gadgets s�o processados
	
	<i3GEO.arvoreDeCamadas.atualiza>
	
	<i3GEO.arvoreDeCamadas.atualizaFarol>
	
	Os eventos definidos em <i3GEO.eventos.navegaMapa> s�o executados
	
	Parameters:
	
	retorno {String} - string com os par�metros do novo mapa. Se retorno n�o
	for especificado, ser� feita uma chamada em ajax para sua obten��o. O resultado
	dessa chamada � armazenada em i3GEO.parametros
	*/
	atualiza: function(retorno){
		var corpoMapa = function(){
			i3GEO.janela.abreAguarde("ajaxiniciaParametros",$trad("o1")+" atualizando");
			i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);		
		};
		if(arguments.length == 0){
			corpoMapa.call();
			return;
		}
		if(!retorno.data){
			corpoMapa.call();
			return;
		}
		//verifica se o par�metro retorno existe, caso contr�rio,
		//faz a chamada ao programa PHP para obter os par�metros
		try{
			if (retorno.data == "erro"){
				alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");
				i3GEO.mapa.recupera.inicia();return;
			}
			else
			if(retorno.data == "ok" || retorno.data == ""){corpoMapa.call();return;}
		}
		catch(e){}
		var erro = function(){
			var legimagem = "";
			var c = confirm("Ocorreu um erro, quer tentar novamente?");
			if(c){
				corpoMapa.call();
			}
			else{
				i3GEO.janela.fechaAguarde();
			}
			return;
		}
		try{eval(retorno.data.variaveis);}
		catch(e){erro.call();return;}
		if(arguments.length == 0 || retorno == "" || retorno.data.variaveis == undefined){erro.call();return;}
		else{	
			if(arguments.length == 0){return;}
			i3GEO.mapa.corpo.verifica(retorno);
			var tempo = "";
			if(i3GEO.desenho.richdraw)
			{i3GEO.desenho.richdraw.clearWorkspace();}
			mapscale = "";
			mapexten = "";
			//transforma o retorno em vari�veis
			eval(retorno.data.variaveis);

			i3GEO.arvoreDeCamadas.atualiza(retorno.data.temas);
			if (i3GEO.parametros.mapscale != mapscale)
			i3GEO.arvoreDeCamadas.atualizaFarol(mapscale);

			i3GEO.parametros.mapexten = mapexten;
			i3GEO.parametros.mapscale = mapscale;
			i3GEO.parametros.mapres = mapres;
			i3GEO.parametros.pixelsize = g_celula;
			i3GEO.parametros.mapimagem = mapimagem;

			i3GEO.interface.redesenha();
			
			g_operacao = "";
			i3GEO.parametros.mapexten = mapexten;
			if ($i("mensagemt"))
			{$i("mensagemt").value = i3GEO.parametros.mapexten;}
			
			i3GEO.arvoreDeCamadas.CAMADAS = retorno.data.temas;
			i3GEO.eventos.navegaMapa();
			if (i3GEO.configura.entorno == "sim"){
				i3GEO.navega.entorno.geraURL();
				i3GEO.navega.entorno.ajustaPosicao();
			}
			i3GEO.ajuda.mostraJanela("Tempo de redesenho em segundos: "+tempo,"");
		}	
	}
};
//YAHOO.log("carregou classe i3geo", "Classes i3geo");