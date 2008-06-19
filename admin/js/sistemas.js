/*
Title: Sistemas

Fun��es javascript utilizadas no sistema de administra��o do cadastro de web services

File: i3geo/admin/webservices.js

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
Function: iniciaAdmin

Inicializa as vari�veis globais e checa o cadastro do editor do sistema de administra��o

Ao retornar, por default, executa a fun��o montaParametros()
*/
function iniciaAdmin()
{
	verificaEditores()
}
function montaParametros()
{
	if(!$i("resultado"))
	{document.body.innerHTML += "<div id=resultado ></div>"}
	$i("resultado").innerHTML = $mensagemAguarde
	var p = "../php/sistemas.php?funcao=pegaSistemas";
	cPaint.call(p,"",listaSistemas);
}
/*
Function: listaSistemas

Monta o html com os parametros e os divs que receber�o os dados dos formul�rios.
*/
function listaSistemas(retorno)
{
	ins = "<p><input style=font-size:10px onclick='alterarSistemas(\"\",\"resultado\")' type=button value='Adicionar um novo sistema' /></p>"
	montaSistemas(retorno,"resultado")
}
function montaSistemas(retorno,onde)
{
	var d = retorno.data;
	var nm = retorno.data.length
	for (i=0;i<nm;i++)
	{
		if(!$i(d[i].id_sistema))
		{ins += "<div id="+d[i].id_sistema+" >"}
		ins += "<fieldset><legend style='background-color:white;'><b>+- "+d[i].nome_sistema+"</b></legend>"
	    ins += "<div style=display:none ><table class=lista ><tr><td></td><td></td><td></td></tr>";
		var param = {
			"linhas":[
			{titulo:"Nome",prefixoid:"nome_",id:"id_sistema",valor:"nome_sistema"},
			]
		}
		ins += (geraLinhas(d[i],param,3));
		ins += "<tr>"
		ins += "<td>Perfis: </td>"
		ins += "<td><input size=30 onchange='this.style.color=\"blue\"' type=text id='perfil_"+d[i].id_sistema+"' value='"+d[i].perfil_sistema+"' /></td>"

		var idtemp = "perfil_"+d[i].id_sistema
		ins += "<td><select onchange=\"registraPerfil('"+idtemp+"',this.value);this.style.color='blue'\"  >"
		ins += comboObjeto($perfis,"perfil","perfil","")
		ins += "</select></td></tr></table>"

		ins += "<table><tr><td><div class=excluir title='Excluir' onclick='excluir(\""+d[i].id_sistema+"\")'/></td>"
		ins += "<td><div class=aplicar title='Aplicar altera��es' onclick='alterarSistemas(\""+d[i].id_sistema+"\",\""+d[i].id_sistema+"\")'/></td>"
		ins += "<td></td></tr></table>"



		ins += "<fieldset><legend>+- Fun��es</legend>"
		ins += "<div style=display:none ><p><input style=font-size:10px onclick='alterarFuncoes(\"\",\""+d[i].id_sistema+"\")' type=button value='Adicionar uma nova fun��o' /></p>"
		var nf = d[i].funcoes.length
		for (j=0;j<nf;j++)
		{
			ins += "<fieldset><legend>+- "+d[i].funcoes[j].nome_funcao+"</legend>"
			var func = d[i].funcoes[j]
		    ins += "<div style=display:none ><table class=lista ><tr><td></td><td></td><td></td></tr>";
			var param = {
				"linhas":[
				{titulo:"Nome da fun��o",prefixoid:"nomefuncao_",id:"id_funcao",valor:"nome_funcao"},
				{titulo:"Abrir programa",prefixoid:"abrir_",id:"id_funcao",valor:"abrir_funcao"},
				{titulo:"Largura da janela",prefixoid:"w_",id:"id_funcao",valor:"w_funcao"},
				{titulo:"Altura",prefixoid:"h_",id:"id_funcao",valor:"h_funcao"}
				]
			}
			ins += (geraLinhas(func,param,3));
			
		ins += "<tr>"
		ins += "<td>Perfis: </td>"
		ins += "<td><input size=30 onchange='this.style.color=\"blue\"' type=text id='perfilfuncao_"+d[i].funcoes[j].id_funcao+"' value='"+d[i].funcoes[j].perfil_funcao+"' /></td>"
		var idtemp = "perfilfuncao_"+d[i].funcoes[j].id_funcao
		ins += "<td><select onchange=\"registraPerfil('"+idtemp+"',this.value);this.style.color='blue'\"  >"
		ins += comboObjeto($perfis,"perfil","perfil","")
		ins += "</select></td></tr>"

		
			ins += "</table>"
			ins += "<table><tr><td><div class=excluir title='Excluir' onclick='excluirFuncoes(\""+d[i].funcoes[j].id_funcao+"\")'/></td>"
			ins += "<td><div class=aplicar title='Aplicar altera��es' onclick='alterarFuncoes(\""+d[i].funcoes[j].id_funcao+"\",\""+d[i].id_sistema+"\")'/></td>"
			ins += "</tr></table>"
			ins += "</div></fieldset><br>"		
			ins += "</div></fieldset>"
		}
		ins += "</div></fieldset>"
		ins += "</fieldset><br>"
		if(!$i(d[i].id_sistema))
		ins += "</div>"
	}
	$i(onde).innerHTML = ins
	ativaLegenda()
}
function alterarFuncoes(id_funcao,id_sistema)
{
	//if(confirm("Voc� realmente quer fazer isso?"))
	//{
		var retorna = function(retorno)
		{
			if(id_funcao == "")
			listaSistemas(retorno);
			else
			{ins = "";montaSistemas(retorno,id_sistema)}
		}
		if (id_funcao != "")
		{
			var nomefuncao = $i("nomefuncao_"+id_funcao).value
			var perfil = $i("perfilfuncao_"+id_funcao).value
			var abrir = $i("abrir_"+id_funcao).value
			var w = $i("w_"+id_funcao).value
			var h = $i("h_"+id_funcao).value
		}
		else
		{
			//var id_sistema = "";
			var id_funcao = ""
			var nomefuncao = ""
			var perfil = ""
			var abrir = ""
			var w = 200
			var h = 200
		}
		var p = "../php/sistemas.php?funcao=alterarFuncoes&h="+h+"&w="+w+"&abrir="+abrir+"&perfil="+perfil+"&nomefuncao="+nomefuncao+"&id_funcao="+id_funcao+"&id_sistema="+id_sistema
		cPaint.call(p,"",retorna);	
	//}
}
function alterarSistemas(id_sistema,onde)
{
	//if(confirm("Voc� realmente quer fazer isso?"))
	//{
		var retorna = function(retorno)
		{
			if(id_sistema == "")
			listaSistemas(retorno);
			else
			{ins = "";montaSistemas(retorno,onde)}
		}
		if (id_sistema != "")
		{
			var nome = $i("nome_"+id_sistema).value
			var perfil = $i("perfil_"+id_sistema).value
		}
		else
		{
			var id_sistema = "";
			var nome = ""
			var perfil = ""
		}
		var p = "../php/sistemas.php?funcao=alterarSistemas&id_sistema="+id_sistema+"&nome="+nome+"&perfil="+perfil
		cPaint.call(p,"",retorna);	
	//}
}
function excluir(id)
{
	if(confirm("Voc� realmente quer fazer isso?"))
	{
		var retorna = function(retorno)
		{
			if(retorno.data=="erro")
			{alert("N�o foi possivel excluir. Exclua as funcoes primeiro");}
			else
			{
				$i("resultado").innerHTML = $mensagemAguarde;
				montaParametros()
			}
		}
		var p = "../php/sistemas.php?funcao=excluir&id="+id;
		cPaint.call(p,"",retorna);	
	}
}
function excluirFuncoes(id)
{
	if(confirm("Voc� realmente quer fazer isso?"))
	{
		$i("resultado").innerHTML = $mensagemAguarde;
		var retorna = function()
		{
			montaParametros()	
		}
		var p = "../php/sistemas.php?funcao=excluirFuncoes&id="+id;
		cPaint.call(p,"",retorna);	
	}
}
function importarXmlSistemas()
{
	$i("resultado").innerHTML = $mensagemAguarde
	var retorna = function(retorno)
	{$i("resultado").innerHTML = retorno.data}
	var p = "../php/sistemas.php?funcao=importarXmlSistemas&xml="+$i("arquivo").value;
	cPaint.call(p,"",retorna);
}