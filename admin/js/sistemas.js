/*
Title: sistemas.js

Fun��es que controlam a interface do editor de sistemas

Licenca:

GPL2

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

Arquivo:

i3geo/admin/js/sistemas.js
*/
YAHOO.namespace("example.container");
/*
Function: initMenu

Inicializa o editor

<ALTERARSISTEMAS>
*/
function initMenu()
{
	ativaBotaoAdicionaRaiz("../php/sistemas.php?funcao=alterarSistemas","adiciona")
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	core_pegaPerfis("pegaSistemas()");
}
function ativaBotaoAdicionaRaiz(sUrl,idBotao)
{
	var adiciona = function()
	{
		core_carregando("ativa");
		core_carregando(" adicionando um novo registro");
		var callback =
		{
  			success:function(o)
  			{
  				try
  				{
  					adicionaNosRaiz(YAHOO.lang.JSON.parse(o.responseText),true);
  					core_carregando("desativa");
  				}
  				catch(e){core_handleFailure(e,o.responseText);}
  			},
  			failure:core_handleFailure,
  			argument: { foo:"foo", bar:"bar" }
		}; 
		core_makeRequest(sUrl,callback)
	};
	//cria o bot�o de adi��o de um novo menu
	var adiciona = new YAHOO.widget.Button(idBotao,{ onclick: { fn: adiciona } });
}
/*
Function: pegaSistemas

Obt�m a lista de sistemas

<PEGASISTEMAS>
*/
function pegaSistemas()
{
	core_pegaDados("buscando sistemas...","../php/sistemas.php?funcao=pegaSistemas","montaArvore")
}
/*
Function: montaArvore

Monta a �rvore de edi��o

<PEGAFUNCOES>
*/
function montaArvore(dados)
{
	YAHOO.example.treeExample = new function()
	{
		var currentIconMode;
		tree = "";
		function changeIconMode()
		{
			var newVal = parseInt(this.value);
			if (newVal != currentIconMode)
			{currentIconMode = newVal;}
			buildTree();
		}
        function loadNodeData(node, fnLoadComplete)
        {
			var sUrl = "../php/sistemas.php?funcao=pegaFuncoes&id_sistema="+node.data.id_sistema;
			var callback =
			{
                success: function(oResponse)
                {
                    var dados = YAHOO.lang.JSON.parse(oResponse.responseText)
					adicionaNos(node,dados,false)
                    oResponse.argument.fnLoadComplete();
                },
                failure: function(oResponse)
                {
                    oResponse.argument.fnLoadComplete();
                },
                argument:
                {
                    "node": node,
                    "fnLoadComplete": fnLoadComplete
                },
                timeout: 25000
            };
            YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
        }
        function buildTree()
        {
			tree = new YAHOO.widget.TreeView("tabela");
			tree.setDynamicLoad(loadNodeData, currentIconMode);
			var root = tree.getRoot();
			var tempNode = new YAHOO.widget.TextNode('', root, false);
			tempNode.isLeaf = true;
			core_carregando("desativa");
        }
    	buildTree();
	}();
   	adicionaNosRaiz(dados)
   	tree.draw();
}
function adicionaNos(no,dados,redesenha)
{
	for (var i=0, j=dados.length; i<j; i++)
	{
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"excluir('funcao','"+dados[i].id_funcao+"')\" title=excluir width='10px' heigth='10px' src=\"../imagens/01.png\" />&nbsp;"
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"editar('funcao','"+dados[i].id_funcao+"')\" title=editar width='10px' heigth='10px' src=\"../imagens/06.png\" />&nbsp;<span>"+dados[i].nome_funcao+"</span>"
		var d = {html:conteudo,id_funcao:dados[i].id_funcao,tipo:"funcao"}
		var tempNode = new YAHOO.widget.HTMLNode(d, no, false,true);
		tempNode.isLeaf = true;
	}
	if(redesenha){tree.draw();}
}
function adicionaNosRaiz(dados,redesenha)
{
	var root = tree.getRoot();
	for (var i=0, j=dados.length; i<j; i++)
	{
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"excluir('sistema','"+dados[i].id_sistema+"')\" title=excluir src=\"../imagens/01.png\" />"
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"adicionarFuncao('"+dados[i].id_sistema+"')\" title='adiciona fun��o' src=\"../imagens/05.png\" />"
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"editar('sistema','"+dados[i].id_sistema+"')\" title=editar src=\"../imagens/06.png\" /><b>&nbsp;<span>"+dados[i].nome_sistema+"</span>"
		var d = {html:conteudo,id_sistema:dados[i].id_sistema,tipo:"sistema"};
		var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
	}
	if(redesenha){tree.draw();}
}
/*
Function: editar

Monta o editor espec�fico de um n�

<PEGAFUNCAO>

<PEGASISTEMA>
*/
function editar(tipo,id)
{
	if(tipo == "funcao")
	{
		core_carregando("ativa");
		core_carregando(" buscando dados");
		var callback =
		{
			success:function(o)
			{
				try
				{
					montaEditorFuncoes(YAHOO.lang.JSON.parse(o.responseText)[0],id);
					core_carregando("desativa");
				}
				catch(e){core_handleFailure(e,o.responseText);}
			},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
		}; 
		var sUrl = "../php/sistemas.php?funcao=pegaFuncao&id_funcao="+id;
		core_makeRequest(sUrl,callback)
	}
	if(tipo == "sistema")
	{
		core_carregando("ativa");
		core_carregando(" buscando dados");
		var callback =
		{
			success:function(o)
			{
				try
				{
					montaEditorSistemas(YAHOO.lang.JSON.parse(o.responseText)[0],id);
					core_carregando("desativa");
				}
				catch(e){core_handleFailure(e,o.responseText);}
			},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
		}; 
		var sUrl = "../php/sistemas.php?funcao=pegaSistema&id_sistema="+id;
		core_makeRequest(sUrl,callback)
	}
}
function montaEditorSistemas(dados,id)
{
	core_montaEditor("gravaDadosSistema('"+id+"')")
	$i("editor_bd").innerHTML = montaDivSistemas(dados)
	core_carregando("desativa");
	core_comboPerfis("comboPerfis","selPerfil","","registraPerfil(this.value,\"Eperfil_sistema\")")
}
function montaEditorFuncoes(dados,id)
{
	core_montaEditor("gravaDadosFuncao('"+id+"')")
	$i("editor_bd").innerHTML = montaDivFuncoes(dados)
	core_carregando("desativa");
	core_comboPerfis("comboPerfis","selPerfil","","registraPerfil(this.value,\"Eperfil_funcao\")")
}
function registraPerfil(valor,id)
{
	var inp = $i(id)
	var tags = inp.value
	if(tags == "")
	inp.value = valor
	else
	inp.value = tags+" "+valor
}
function montaDivSistemas(i)
{
	var param =
	{
		"linhas":[
		{titulo:"Nome:",id:"Enome_sistema",size:"50",value:i.nome_sistema,tipo:"text",div:""},
		{titulo:"Perfis - escolha da lista abaixo:",id:"Eperfil_sistema",size:"50",value:i.perfil_sistema,tipo:"text",div:"<div id=comboPerfis >Buscando...</div>"}
		]
	}
	var ins = ""
	ins += core_geraLinhas(param)
	ins += "<br>Publicado?<br>"
	ins += "<select id='Epublicado_sistema' >"
	ins += core_combosimnao(i.publicado_sistema)
	ins += "</select>"	
	return(ins)
}
function montaDivFuncoes(i)
{
	var param =
	{
		"linhas":[
		{titulo:"Nome da fun��o:",id:"Enome_funcao",size:"50",value:i.nome_funcao,tipo:"text",div:""},
		{titulo:"Programa que ser� executado:",id:"Eabrir_funcao",size:"50",value:i.abrir_funcao,tipo:"text",div:""},
		{titulo:"Largura da janela onde o programa ser� aberto:",id:"Ew_funcao",size:"5",value:i.w_funcao,tipo:"text",div:""},
		{titulo:"Altura da janela:",id:"Eh_funcao",size:"5",value:i.h_funcao,tipo:"text",div:""},
		{titulo:"Perfis - escolha da lista abaixo:",id:"Eperfil_funcao",size:"50",value:i.perfil_funcao,tipo:"text",div:"<div id=comboPerfis >Buscando...</div>"}
		]
	}
	var ins = ""
	ins += core_geraLinhas(param)	
	return(ins)
}
/*
Function: excluir

Exclui um n� espec�fico

<EXCLUIRSISTEMA>

<EXCLUIRFUNCAO>
*/
function excluir(tipo,id)
{
	var mensagem = " excluindo o registro do id= "+id;
	if(tipo == "sistema")
	{
		var no = tree.getNodeByProperty("id_sistema",id)
		var sUrl = "../php/sistemas.php?funcao=excluirSistema&id="+id+"&tabela=sistemas";
	}
	if(tipo == "funcao")
	{
		var no = tree.getNodeByProperty("id_funcao",id)
		var sUrl = "../php/sistemas.php?funcao=excluirFuncao&id="+id+"&tabela=funcoes";
	}
	core_excluiNoTree(sUrl,no,mensagem)
}
/*
Function: adicionarFuncao

Adiciona uma nova fun��o

<ALTERARFUNCOES>
*/
function adicionarFuncao(id)
{
	var mensagem = " adicionando fun��o...";
	var no = tree.getNodeByProperty("id_sistema",id)
	var sUrl = "../php/sistemas.php?funcao=alterarFuncoes&id_sistema="+id;
	var callback =
	{
    	success: function(oResponse)
		{
			var dados = YAHOO.lang.JSON.parse(oResponse.responseText)
			adicionaNos(no,dados,true)
		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	};
	
	core_makeRequest(sUrl,callback)
}
/*
Function: gravaDadosFuncao

Altera uma fun��o

<ALTERARFUNCOES>
*/
function gravaDadosFuncao(id)
{
	var campos = new Array("perfil","w","h","abrir","nome")
	var par = ""
	for (i=0;i<campos.length;i++)
	{par += "&"+campos[i]+"_funcao="+($i("E"+campos[i]+"_funcao").value)}
	par += "&id_funcao="+id
	core_carregando("ativa");
	core_carregando(" gravando o registro do id= "+id);
	var sUrl = "../php/sistemas.php?funcao=alterarFuncoes"+par;
	var callback =
	{
  		success:function(o)
  		{
  			try
  			{
  				if(YAHOO.lang.JSON.parse(o.responseText) == "erro")
  				{
  					core_carregando("<span style=color:red >N�o foi poss�vel excluir. Verifique se n�o existem menus vinculados a este tema</span>");
  					setTimeout("core_carregando('desativa')",3000)
  				}
  				else
  				{
  					var no = tree.getNodeByProperty("id_funcao",id)
  					no.getContentEl().getElementsByTagName("span")[0].innerHTML = document.getElementById("Enome_funcao").value
  					no.html = no.getContentEl().innerHTML;
  					core_carregando("desativa");
  				}
				YAHOO.example.container.panelEditor.destroy();
				YAHOO.example.container.panelEditor = null;
  			}
  			catch(e){core_handleFailure(e,o.responseText);}
  		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	}; 
	core_makeRequest(sUrl,callback)
}
/*
Function: gravaDadosSistema

Altera um sistema

<ALTERARSISTEMAS>
*/
function gravaDadosSistema(id)
{
	var campos = new Array("perfil","nome","publicado")
	var par = ""
	for (i=0;i<campos.length;i++)
	{par += "&"+campos[i]+"_sistema="+($i("E"+campos[i]+"_sistema").value)}
	par += "&id_sistema="+id
	core_carregando("ativa");
	core_carregando(" gravando o registro do id= "+id);
	var sUrl = "../php/sistemas.php?funcao=alterarSistemas"+par;
	var callback =
	{
  		success:function(o)
  		{
  			try
  			{
  				if(YAHOO.lang.JSON.parse(o.responseText) == "erro")
  				{
  					core_carregando("<span style=color:red >N�o foi poss�vel excluir. Verifique se n�o existem menus vinculados a este tema</span>");
  					setTimeout("core_carregando('desativa')",3000)
  				}
  				else
  				{
  					var no = tree.getNodeByProperty("id_sistema",id)
  					no.getContentEl().getElementsByTagName("span")[0].innerHTML = document.getElementById("Enome_sistema").value
  					no.html = no.getContentEl().innerHTML;
  					core_carregando("desativa");
  				}
				YAHOO.example.container.panelEditor.destroy();
				YAHOO.example.container.panelEditor = null;
  			}
  			catch(e){core_handleFailure(e,o.responseText);}
  		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	}; 
	core_makeRequest(sUrl,callback)
}
YAHOO.util.Event.addListener(window, "load", initMenu);