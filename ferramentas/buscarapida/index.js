/*
Title: Busca r�pida

Arquivo:

i3geo/ferramentas/buscarapida/index.js

About: Licen�a

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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
Class: i3GEObuscaRapida

Procura a ocorr�ncia de uma palavra em um servi�o de busca, na �rvore de temas do i3geo e no servi�o do Google.

O resultado � mostrado como uma listagem, permitindo-se adicionar um novo tema ao mapa conforme o que foi encontrado.

Essa classe depende da classe i3geo/classesjs/classe_php.php
*/
i3GEObuscaRapida = {
	/*
	Property: servico
	
	Endere�o do servi�o de busca que ser� utilizado. Esse servi�o deve ser um Web Service no padr�o reconhecido pelo i3Geo.
	
	Type:
	{String}
	
	Default:
	{http://mapas.mma.gov.br/webservices/geonames.php}
	*/
	servico:"http://mapas.mma.gov.br/webservices/geonames.php",
	/*
	Property: servicowms
	
	Endere�o do servi�o de busca que ser� utilizado para retornar a representa��o cartogr�fica do elemento encontrado.
	
	Esse servi�o deve ser um Web Service no padr�o OGC com o par�metro adicional "gid" indicando o id do elemento que ser� mostrado na tela.
	
	Type:
	{String}
	
	Default:
	{http://mapas.mma.gov.br/webservices/geonameswms.php}
	*/
	servicowms:"http://mapas.mma.gov.br/webservices/geonameswms.php",
	/*
	Property: funcaoZoom
	
	Nome da fun��o que ser� executada ao ser clicado o bot�o de zoom para o elemento encontrado.
	
	O bot�o de zoom � mostrado logo ap�s cada elemento encontrado na busca.
	
	Alterando-se essa op��o, pode-se executar o busca r�pida como um gadget.
	
	Veja i3GEObuscaRapida.zoom para conhecer os par�metros que essa fun��o ir� receber
	
	Type:
	{String}
	
	Default:
	{i3GEObuscaRapida.zoom}
	*/
	funcaozoom: "i3GEObuscaRapida.zoom",
	/*
	Property: idresultado
	
	Id do elemento HTML que receber� o resultado da busca
	
	Type:
	{String}
	
	Default:
	{resultado}
	*/
	idresultado:"resultado",
	/*
	Property: buscatemas
	
	Indica se deve ser feita a busca na �rvore de temas
	
	Type:
	{boolean}
	
	Default:
	{true}
	*/
	buscaemtemas: true,
	/*
	Variable: palavra
	
	Palavra que ser� buscada
	
	Type:
	{String}
	*/
	palavra:"",
	/*
	Variable: locaplic
	
	Endere�o do i3geo (url)
	
	Type:{String}
	*/
	locaplic:"",
	/*
	Function: inicia
	
	Inicia a busca de uma palavra e mostra o resultado na tela
	
	Parameters:
	
	palavra {String} - palavra que ser� procurada
	
	locaplic {String} - url onde o i3geo est� instalado, pe, http://localhost/i3geo
	
	resultado {Function} (opcional) - fun��o que ser� executada para processar o resultado da busca default � i3GEObuscaRapida.montaResultado
	*/
	inicia: function(palavra,locaplic,resultado){
		if(arguments.length == 2)
		{var resultado = i3GEObuscaRapida.montaResultado;}
		aguarde("block")
		$i("resultado").innerHTML = "Aguarde..."
		var palavra = i3GEO.util.removeAcentos(palavra);
		i3GEObuscaRapida.palavra = palavra;
		i3GEObuscaRapida.locaplic = locaplic;
		i3GEO.php.buscaRapida(resultado,locaplic,i3GEObuscaRapida.servico,palavra);
		//i3GEObuscaRapida.montaResultado()
	},
	/*
	Function: montaResultado
	
	Mostra o resultado da busca. Esta � a fun��o default utilizada pelo m�todo inicia
	
	Ap�s o resultado ser mostrado, � feita a busca na base de temas, executando-se o m�todo buscaemtemas 
	
	Parameters:
	
	retorno {JSON} - resultado da fun��o i3GEO.php.buscaRapida
	*/
	montaResultado: function(retorno){
		var ins = "Nada encontrado em "+i3GEObuscaRapida.servico+"<br>";
		try{
			if(retorno.data){
				if (retorno.data.geonames){
					ins = "";
					for (i=0;i<retorno.data.geonames.length; i++){
						if (i == 0){var ins = "<table >";}
						ins += "<tr><td style='width:30%;text-align:left;background-color:rgb(220,220,220)' colspan=2 ><b>"+retorno.data.geonames[i].tema+"</b></td></tr>";
						var layer = retorno.data.geonames[i].layer
						for (j=0;j<retorno.data.geonames[i].lugares.length; j++){
							ins += "<tr><td style='text-align:left'>"
							var nm = retorno.data.geonames[i].lugares[j].nome;
							ins += nm;
							var wkt = retorno.data.geonames[i].lugares[j].limite
							ins += " "+retorno.data.geonames[i].lugares[j].centroide;
							var gid = retorno.data.geonames[i].lugares[j].gid
							ins += "</td><td onclick=\""+i3GEObuscaRapida.funcaozoom+"('"+wkt+"','"+layer+"','"+gid+"','"+nm+"')\" onmouseover=\"i3GEObuscaRapida.mostraxy('"+wkt+"')\" onmouseout='i3GEObuscaRapida.escondexy()' style='color:blue;cursor:pointer'><img title='localizar' src='../../imagens/branco.gif' class='tic' /></td></tr>"
						}
					}
				}
				ins += "</table>"
			}
		}
		catch(e){var ins = "Erro ao acessar o servi�o "+i3GEObuscaRapida.servico+"<br>";}
		$i(i3GEObuscaRapida.idresultado).innerHTML = ins
		aguarde("none")
		if(i3GEObuscaRapida.buscaemtemas){	
			try{
				window.parent.i3GEO.php.procurartemas(i3GEObuscaRapida.resultadoTemas,i3GEObuscaRapida.palavra,i3GEObuscaRapida.locaplic);	
			}catch(e){}
		}
	},
	/*
	Function: resultadoTemas
	
	Acrescenta nos resultados encontrados os dados localizados na base de temas do i3geo
	
	Essa fun��o � cahamda pelo m�todo montaResultado
	
	Parameters:
	
	retorno {Json} - resultado de 
	*/
	resultadoTemas: function(retorno){
		var retorno = retorno.data;
		if ((retorno != "erro") && (retorno != undefined)){
			var ins = "";
			for (ig=0;ig<retorno.length;ig++){
				var ngSgrupo = retorno[ig].subgrupos;
				for (sg=0;sg<ngSgrupo.length;sg++){
					var nomeSgrupo = ngSgrupo[sg].subgrupo;
					var ngTema = ngSgrupo[sg].temas;
					for (st=0;st<ngTema.length;st++){
						if (ngTema[st].link != " ")
						{var lk = "<a href="+ngTema[st].link+" target=blank>&nbsp;fonte</a>";}
						var tid = ngTema[st].tid;
						var inp = "<input style='text-align:left;cursor:pointer;' onclick='i3GEObuscaRapida.adicionatema(this)' class=inputsb style='cursor:pointer' type=\"checkbox\" value='"+tid+"'  /> ("+nomeSgrupo+")";
						var nomeTema = inp+(ngTema[st].nome)+lk+"<br>";
						ins += nomeTema;
					}
				}
			}
			if (ins != ""){	$i(i3GEObuscaRapida.idresultado).innerHTML += "<br><b>Temas:</b><br>"+ins}
		}
	},
	/*
	Function: zoom
	
	Aplica a opera��o de zoom quando o usu�rio clica no bot�o de adi��o de um resultado ao mapa.
	
	Essa � a fun��o default utilizada pela ferramenta, podendo ser substitu�da por outra se desejado.
	
	Al�m de enquadrar o mapa � uma extens�o geogr�fica espec�fica, uma nova camada � adicionada, mostrando o limite da ocorr�ncia desejada.
	
	Parameters:
	
	wkt {String} - string no formato wkt que ser� usado para definir a abrang�ncia do zoom
	
	layer {String} - nome do layer existente no servi�o definido em i3GEObuscaRapida.servicowms e que ser� adicionado ao mapa como uma camada WMS
	
	gid {String} - identificador que ser� utilizado no WMS para selecionar o elemento desejado
	
	nm {String} - nome que ser� dado � acamada que ser� adicionada ao mapa
	*/
	zoom: function(wkt,layer,gid,nm){
    	var adicionaCamada = function(layer,gid,nm,ext){
	 		var s = i3GEObuscaRapida.servicowms+"?gid="+gid+"&";
			i3GEO.php.adicionaTemaWMS(window.parent.i3GEO.atualiza,s,layer,"default","EPSG:4291","image/png","1.1.0",nm+" - "+layer,"","nao","",i3GEObuscaRapida.locaplic,window.parent.i3GEO.configura.sid);
			if(window.parent.i3GEO.Interface.ATUAL == "googlemaps"){
				window.parent.i3GEO.Interface.googlemaps.zoom2extent(ext);
			}
			if(window.parent.i3GEO.Interface.ATUAL == "openlayers"){
				window.parent.i3GEO.Interface.openlayers.zoom2ext(ext);
			}
		};
		var ext = i3GEO.util.wkt2ext(wkt,"polygon");
		if(ext == false){alert("wkt invalido");return;}
		try{window.parent.objaguarde.abre("i3GEO.atualiza","Aguarde...");}catch(e){if(typeof(console) !== 'undefined'){console.error(e);}}
		i3GEO.php.mudaext(adicionaCamada(layer,gid,nm,ext),window.parent.i3GEO.configura.tipoimagem,ext,i3GEObuscaRapida.locaplic,window.parent.i3GEO.configura.sid);
	},
	/*
	Function: adicionatema
	
	Adiciona um tema ao mapa quando a busca localiza uma ocorr�ncia nos menus de camadas
	
	Nesse caso, o tema � adicionado ao mapa
	
	Parameters:
	
	obj {Object dom} - objeto DOM do tipo INPUT tendo como valor o c�digo do tema
	*/
	adicionatema:function(obj){
		if (obj.checked)
		{
			window.parent.objaguarde.abre("i3GEO.atualiza","Aguarde...");
			var temp = function()
			{window.parent.i3GEO.atualiza("");}
			i3GEO.php.adtema(temp,obj.value,i3GEObuscaRapida.locaplic,window.parent.i3GEO.configura.sid);
		}
		else
		{alert("Escolha um tema");}
	},
	/*
	Function: mostraxy
	
	Mostra no mapa um ret�ngulo representando a extens�o geogr�fica de uma ocorr�ncia encontrada na busca
	
	Parameters:
	
	wkt {String} - coordenadas em wkt do tipo pol�gono representando a extens�o geogr�fica do elemento
	*/
	mostraxy:function mostraxy(wkt){
		try{
			if(!window.parent){return;}
			if(!window.parent.i3GEO){return;}
			if(!window.parent.i3GEO.calculo){return;}
		}
		catch(e){if(typeof(console) !== 'undefined'){console.error(e);};return;}
		var ext = i3GEO.util.wkt2ext(wkt,"polygon");
		if(ext == false){alert("wkt invalido");return;}	
		var ext = ext.split(" ");
		var xMin = ext[0];
		var xMax = ext[2];
		var yMin = ext[1];
		var yMax = ext[3];

 		var xyMin = window.parent.i3GEO.calculo.dd2tela(xMin,yMin,window.parent.document.getElementById("img"),window.parent.i3GEO.parametros.mapexten,window.parent.i3GEO.parametros.pixelsize)
 		var xyMax = window.parent.i3GEO.calculo.dd2tela(xMax,yMax,window.parent.document.getElementById("img"),window.parent.i3GEO.parametros.mapexten,window.parent.i3GEO.parametros.pixelsize)

		window.parent.i3GEO.util.criaBox("boxg");
		var box = window.parent.$i("boxg");
		var w = xyMax[0]-xyMin[0];
		var h = xyMin[1]-xyMax[1];
		box.style.display = "block";
		box.style.width = w;
		box.style.height = h;
		box.style.top = xyMax[1]+"px";
		box.style.left = xyMin[0]+"px";
	},
	/*
	Function: escondexy
	
	Esconde o box criado com mostraxy
	*/
	escondexy: function(){
		window.parent.i3GEO.util.escondeBox()
	}
}