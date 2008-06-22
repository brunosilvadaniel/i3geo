/*
Title: Identifica

Fun��es javascript utilizadas no sistema de administra��o do cadastro de sistemas da ferramenta identifica

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
	var p = "../php/identifica.php?funcao=pegaFuncoes";
	cPaint.call(p,"",listaFuncoes);
}
/*
Function: listaFuncoes

Monta o html com os parametros e os divs que receber�o os dados dos formul�rios.
*/
function listaFuncoes(retorno)
{
	ins = "<p><input style=font-size:10px onclick='alterarFuncoes(\"\",\"resultado\")' type=button value='Adicionar uma nova fun��o' /></p>"
	montaFuncoes(retorno,"resultado")
	
}
function montaFuncoes(retorno,onde)
{
	var d = retorno.data;
	var nm = retorno.data.length
	for (i=0;i<nm;i++)
	{
		if(!$i(d[i].id_i))
		{ins += "<div id='"+d[i].id_i+"' >"}
		ins += "<fieldset><legend style='background-color:white;'><b>+- "+d[i].nome_i+"</b></legend>"
	    ins += "<div style=display:none ><table class=lista ><tr><td></td><td></td></tr>";
		var param = {
			"linhas":[
			{titulo:"Nome",prefixoid:"nome_",id:"id_i",valor:"nome_i"},
			{titulo:"Destino",prefixoid:"destino_",id:"id_i",valor:"target_i"},
			{titulo:"Programa",prefixoid:"abrir_",id:"id_i",valor:"abrir_i"}
			]
		}
		ins += (geraLinhas(d[i],param,2));
		
		ins += "<tr>"
		ins += "<td>Publicado: </td>"
		ins += "<td><select onchange=this.style.color='blue'  id='publicado_"+d[i].id_i+"' >"
		ins += combosimnao(d[i].publicado_i)
		ins += "</td></tr>"
		
		ins += "</table>"
		ins += "<table><tr><td><div class=excluir title='Excluir' onclick='excluir(\""+d[i].id_i+"\")'/></td>"
		ins += "<td><div class=aplicar title='Aplicar altera��es' onclick='alterarFuncoes(\""+d[i].id_i+"\",\""+d[i].id_i+"\")'/></td>"
		ins += "</tr></table>"
		ins += "</div></fieldset><br>"
		if(!$i(d[i].id_i))
		ins += "</div>"		
	}
	$i(onde).innerHTML = ins
	ativaLegenda()
}

function alterarFuncoes(id,onde)
{
	//if(confirm("Voc� realmente quer fazer isso?"))
	//{
		var retorna = function(retorno)
		{
			if(id == "")
			listaFuncoes(retorno);
			else
			{ins = "";montaFuncoes(retorno,onde)}
		}
		if (id != "")
		{
			var nome = $i("nome_"+id).value
			var destino = $i("destino_"+id).value
			var abrir = $i("abrir_"+id).value
			var publicado = $i("publicado_"+id).value
		}
		else
		{
			var id = "";
			var destino = ""
			var abrir = ""
			var nome = ""
			var publicado = ""
		}
		var p = "../php/identifica.php?funcao=alterarFuncoes&publicado_i="+publicado+"&id_i="+id+"&nome_i="+nome+"&target_i="+destino+"&abrir_i="+abrir
		cPaint.call(p,"",retorna);	
	//}
}
function excluir(id)
{
	if(confirm("Voc� realmente quer fazer isso?"))
	{
		$i("resultado").innerHTML = $mensagemAguarde;
		var retorna = function()
		{
			montaParametros()	
		}
		var p = "../php/identifica.php?funcao=excluir&id="+id;
		cPaint.call(p,"",retorna);	
	}
}
function importarXmlI()
{
	$i("resultado").innerHTML = $mensagemAguarde
	var retorna = function(retorno)
	{$i("resultado").innerHTML = retorno.data}
	var p = "../php/identifica.php?funcao=importarXmlI&xml="+$i("arquivo").value;
	cPaint.call(p,"",retorna);
}