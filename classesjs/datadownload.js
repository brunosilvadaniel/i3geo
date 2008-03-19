/*
Title: DataDownLoad

Sistema de download de dados geogr�ficos.

A lista de dados pode vir do arquivo menutemas.xml ou de um diret�rio no servidor.

File: i3geo/classesjs/datadownload.js

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

Veja:

<Aplicativo para download de dados>
*/

var loc = window.location.href;
/*
Variable: g_locaplic

Indica a localiza��o do i3geo. Por default, procura no diret�rio onde foi executada a plica��o datadownload.
No caso do datadownload.htm ser disparado de outro local, � necess�rio definir essa vari�vel antes de chamar a fun��o DDinicia
*/
g_locaplic = loc.split("/datadownload.htm");
g_locaplic = g_locaplic[0]
//
//diretorio onde esta o i3geo
//
g_i3geo = ""
//
//fun��o que ser� utilizada quando o usu�rio clicar na �rvore
//
g_arvoreClicks = ""
/*
Variable: g_tipo

Tipo de acesso aos dados.

Values:

dir - indica que os dados ser�o buscados em diret�rios no servidor.

menutemas - indica que os dados ser�o buscados no arquivo menutemas/menutemas.xml
*/
g_tipo = "menutemas"
/*
Variable: g_dirbaseDown

Url para o endere�o definido em g_dirbase.
� utilizada para montar o link de acesso aos arquivos quando g_tipo = 'dir'
*/
g_dirbaseDown = ""

/*
g_tipo � uma vari�vel que pode ser definida antes de iniciar a funcao DDinicia
g_tipo = "menutemas", indica que a lista de temas para download ser� buscada no xml com a lista de temas do I3Geo
se g_tipo for "dir", a aplica��o entender� que se trata de uma busca em diret�rios
nesse caso, g_dirbase deve conter a raiz da busca no servidor, por exemplo:
g_dirbase = "/opt/www/html/geodados"
g_dirarquivos indica o diret�rio inicial para listagem dos arquivos
por default, g_tipo = "menutemas"

exemplo:

g_tipo = "dir"
g_dirbase = "/opt/www/html/geodados/brasil/vegetacao/vegetacao2002"
g_dirbaseDown = "http://"+window.location.host+"/geodados/brasil/vegetacao/vegetacao2002"
g_dirarquivos = "/opt/www/html/geodados/brasil/vegetacao/vegetacao2002"
g_i3geo = "/i3geo"
g_locaplic = "http://"+window.location.host+g_i3geo
*/

g_dirbase = ""
g_dirarquivos = ""
/*
Function: DDinicia

Inicia o aplicativo montando a �rvore de op��es e preenchendo a DIV arvore.

Deve existir no HTML um DIV com id='arvore'.

*/
function DDinicia()
{
	if (g_tipo == "menutemas")
	{
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadegrupos&map_file=";
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"pegaListaDeGrupos",processaGrupos);
	}
	if (g_tipo == "dir")
	{
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=listaDiretorios&map_file=&diretorio="+g_dirbase;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"listaDiretorios",processaDiretorios);
	}
	dataDownloadLinks(g_RSSl)
}
/*
Function: processaDiretorios

Cahamado pela fun��o DDinicia. Recebe os dados da fun��o Ajax com a lista de diretorios.

Monta a �rvore para navega��o pelos diret�rios.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaDiretorios(retorno)
{
	if(!document.getElementById("arvoreTemas"))
	{
		alert("Nao foi encontrado o DIV arvoreTemas");
		return;
	}
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		treeDir = new Object();
		treeDir = treeviewNew("treeDir", "default", "arvoreTemas", null);
		treeDir.createItem("raiz", "<b>Diret�rios</b>", g_locaplic+"/imagens/temas.png", true, true, true, null);
		treeDir.itemExpand = expandeDiretorio;
		for (var ig=0;ig<retorno.data.length; ig++)
		{
			var nomeDir = retorno.data[ig];
			treeDir.createItem(g_dirbase+"/"+nomeDir, nomeDir, g_locaplic+"/imagens/folder-s.gif", true, true, true, "raiz");
		}
	}
}
/*
Function: expandeDiretorio

Expande um diret�rio quando o usu�rio clica no n� da �rvore de diret�rios.

Definido na fun��o processaDiretorios. Ap�s serem mostrados os sub-diret�rios � disparada a fun��o listaArquivos para mostrar a lista de arquivos existentes no diret�rio selecionado.

Parameters:

id - id do n� clicado na �rvore treeview
*/
function expandeDiretorio(id)
{
	var volta = function (retorno)
	{
		if ((retorno.data != "erro") && (retorno.data != undefined))
		{
			for (var ig=0;ig<retorno.data.length; ig++)
			{
				var nomeDir = retorno.data[ig];
				if (!document.getElementById(id+"/"+nomeDir))
				treeDir.createItem(id+"/"+nomeDir, nomeDir, g_locaplic+"/imagens/folder-s.gif", true, true, true, id);
			}
			listaArquivos(id)
		}
	}
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=listaDiretorios&map_file=&diretorio="+id;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"listaDiretorios",volta);	
}
/*
Function: listaArquivos

Lista os arquivos de um diret�rio.

No HTML deve existir um DIV com id='corpo'. Nesse div ser� inclu�da a lista.

Parameters:

dir - diret�rio no servidor 
*/
function listaArquivos(dir)
{
	if(!document.getElementById("corpo"))
	{
		alert("Nao foi encontrado o DIV corpo");
		return;
	}
	document.getElementById("corpo").innerHTML = ""
	var re = new RegExp(g_dirbase, "g");
	var d = dir.replace(re,'')
	var ins = "<div style=text-align:left; >Diret�rio: "+d+"<br><br>"
	var volta = function (retorno)
	{
		if ((retorno.data != "erro") && (retorno.data != undefined))
		{
			ins += "<b>Diret�rios:</b><br><br>"
			for (var ig=0;ig<retorno.data.diretorios.length; ig++)
			{
				ins += "<span style=cursor:pointer onclick=listaArquivos('"+g_dirbase+d+"/"+retorno.data.diretorios[ig]+"') ><img src="+g_locaplic+"/imagens/folder-s.gif />"+retorno.data.diretorios[ig]+"</span><br><br>" 
			}
			ins += "<b>Arquivos:</b><br><br>"
			for (var ig=0;ig<retorno.data.arquivos.length; ig++)
			{
				ins += "<a href='"+g_dirbaseDown+d+"/"+retorno.data.arquivos[ig]+"' target=new >"+retorno.data.arquivos[ig]+"</a><br><br>" 
			}
			document.getElementById("corpo").innerHTML = ins
		}
	}
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=listaArquivos&map_file=&diretorio="+dir;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"listaDiretorios",volta);
}
/*
Function: processaGrupos

Recebe os dados da fun��o Ajax com a lista de grupos e subgrupos.

Monta a �rvore de navega��o baseada no menutemas.xml.

No HTML da interface deve existir um DIV com id='arvoreTemas'. Esse div receber� a �rvore de navega��o.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaGrupos(retorno)
{
	if(!document.getElementById("arvoreTemas"))
	{
		alert("Nao foi encontrado o DIV arvoreTemas");
		return;
	}
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		mytreeview2 = new Object();
		mytreeview2 = treeviewNew("mytreeview2", "default", "arvoreTemas", null);
		mytreeview2.createItem("item1", "<b>Temas</b>", g_locaplic+"/imagens/temas.png", true, true, true, null);
		mytreeview2.itemExpand = expandeGrupo;
		for (var ig=0;ig<retorno.data.grupos.length; ig++)
		{
			var down = "nao";
			//verifica se existe no grupo temas para download
			var ngSgrupo = retorno.data.grupos[ig].subgrupos;
			if (retorno.data.grupos[ig].subgrupos)
			{
				for (sg=0;sg<ngSgrupo.length;sg++)
				{
					if (ngSgrupo[sg].download == "sim")
					{down = "sim"}
				}
			}
			if (down == "sim")
			{
				var nomeGrupo = retorno.data.grupos[ig].nome;
				mytreeview2.createItem("grupo"+ig, nomeGrupo, g_locaplic+"/imagens/folder-s.gif", true, true, true, "item1");
				var cor = "rgb(230,230,230)";
				for (sg=0;sg<ngSgrupo.length;sg++)
				{
					if (ngSgrupo[sg].download != "nao")
					{
						var nomeSgrupo = "<span style='background-color:"+cor+"' >"+ngSgrupo[sg].nome+"</span>";
						mytreeview2.createItem("sgrupo_"+ig+"_"+sg, nomeSgrupo, g_locaplic+"/imagens/branco0.gif", true, true, false, "grupo"+ig);
						if (cor == "rgb(230,230,230)"){var cor = "rgb(255,255,255)";}
						else
						{var cor = "rgb(230,230,230)";}
					}
				}
			}
		}
	}
}
/*
Function: expandeGrupo

Chama a fun��o ajax que pega a lista de temas de um subgrupo no menu de temas.

Essa fun��o � definida na fun��o processaGrupos.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeGrupo(itemID)
{
	g_arvoreClick = itemID;
	if ((itemID.search("sgrupo") > -1) && (g_arvoreClicks.search(itemID) == -1 ))
	{
		var codigos = itemID.split("_");
		var p = g_locaplic+"/classesphp/mapa_controle.php?map_file=''&funcao=pegalistadetemas&grupo="+codigos[1]+"&subgrupo="+codigos[2];
		var cp = new cpaint();
		//cp.set_debug(2);
		cp.set_response_type("json");
		cp.call(p,"pegaListaDeTemas",processaTemas);
	}
}
/*
Function: processaTemas

Recebe os dados da fun��o Ajax com a lista de temas de um sub-grupo.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaTemas(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var cor = "rgb(251,246,184)";
		for (var st=0;st<retorno.data.temas.length; st++)
		{
			var inp = "";
			var nome = retorno.data.temas[st].nome;
			var lk = "";
			if (retorno.data.temas[st].link != " ")
			{var lk = "<a href="+retorno.data.temas[st].link+" target=blank>&nbsp;fonte</a>";}
			if (retorno.data.temas[st].down=="sim")
			{
				var inp = "<img src="+g_locaplic+"/imagens/down1.gif style='text-align:left;cursor:pointer;' onclick='download(\""+retorno.data.temas[st].tid+"\")' />";
				nomeTema = "<span style='background-color:"+cor+"' >"+inp+nome+lk+"</span>";
				mytreeview2.createItem("tema"+g_arvoreClick+""+sg+""+st, nomeTema, g_locaplic+"/imagens/branco0.gif", false, true, true, g_arvoreClick);
				if (cor == "rgb(251,246,184)"){var cor = "rgb(255,255,255)";}
				else
				{var cor = "rgb(251,246,184)";}
			}
		}
		//inclui um item em branco
		mytreeview2.createItem("vazio", "", g_locaplic+"/imagens/branco0.gif", false, true, true, g_arvoreClick);
		g_arvoreClicks += ","+g_arvoreClick;
	}
}
/*
Function: download

Gera os arquivos para download do shape file de um tema.

Parameters:

tema - c�digo do tema para download
*/
function download(tema)
{
	document.getElementById("corpo").innerHTML = "Aguarde. Gerando arquivos..."
	var p = g_locaplic+"/classesphp/mapa_controle.php?map_file=&funcao=download&tema="+tema;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"downloadTema",mostraDownload);
}
/*
Function: mostraDownload

Mostra na tela os arquivos convertidos para shape file com link para download.
*/
function mostraDownload(retorno)
{
	if (retorno.data != undefined)
	{
		var retorno = retorno.data
		var arqs = retorno.split(",")
		var ins = "<b>Clique nos links para pegar os arquivos. Para obter os metadados, veja o link na �rvore ao lado.</b><br><br>"
		for (var arq=0;arq<arqs.length;arq++)
		{
			var temp = arqs[arq].split(".");
			arqs[arq] = temp[0];
			ins += "<a href='"+window.location.protocol+"//"+window.location.host+arqs[arq]+".shp'>"+arqs[arq]+".shp<br>"
			ins += "<a href='"+window.location.protocol+"//"+window.location.host+arqs[arq]+".dbf'>"+arqs[arq]+".dbf<br>"
			ins += "<a href='"+window.location.protocol+"//"+window.location.host+arqs[arq]+".shx'>"+arqs[arq]+".shx<br><br>"
		}
		document.getElementById("corpo").innerHTML = ins
	}
	else
	{
		document.getElementById("corpo").innerHTML = "<p style=color:red >Ocorreu um erro<br>"
	}
}
/*
Function: dataDownloadLinks

Mostra uma lista de links baseado em um arquivo rss.

Utilizado para acrescentar outros links no sistema de download

Por default, o rss � menutemas/linksdownload.xml

Parameters:

rss - endere�o do arquivo rss.
*/
function dataDownloadLinks(rss)
{
	var monta = function(retorno)
	{
		var reg = /Erro/gi;
		if (retorno.data.search(reg) != -1)
		{
			alert("OOps! Ocorreu um erro\n"+retorno.data);
			return;
		}
		var linhas = retorno.data.split("|")
		var ins = ""
		for (var i=0;i<linhas.length; i++)
		{
			var caso = linhas[i].split("#")
			if (i > 0)
			{
				ins += "<a style=text-align:left href='"+caso[2]+"' target=blank >"+caso[0]+"&nbsp;("+caso[3]+")</a>"
				ins += "<br>"
			}
			else
			{ins += "<p class=clique ><b>"+caso[0]+"</b>&nbsp;"+caso[1]+"&nbsp;</p>"}
		}
		document.getElementById("RSSl").innerHTML = ins+"<br><br>"
	}
	if (document.getElementById("RSSl"))
	{
		if (rss.length > 0)
		{
			var p = g_locaplic+"/classesphp/wscliente.php?funcao=listaRSSws&rss="+rss.join("|");
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"listaRSSws",monta);
		}
	}
}
