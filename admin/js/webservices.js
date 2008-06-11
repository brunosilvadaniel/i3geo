/*
Title: Arvore

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
	var p = "../php/webservices.php?funcao=pegaWS";
	cPaint.call(p,"",listaWS);
}
/*
Function: listaWS

Monta o html com os parametros e os divs que receber�o os dados dos formul�rios.
*/
function listaWS(retorno)
{
	ins = "<p><input style=font-size:10px onclick='alterarWS(\"\",\"resultado\")' type=button value='Adicionar um novo web service' /></p>"
	montaWS(retorno,"resultado")	
}
function montaWS(retorno,onde)
{
	var d = retorno.data;
	var nm = retorno.data.length
	for (i=0;i<nm;i++)
	{
		if(!$i(d[i].id_ws))
		{ins += "<div id="+d[i].id_ws+" >"}
		ins += "<fieldset><legend style='background-color:white;'><b>+- "+d[i].nome_ws+"</b></legend>"
	    ins += "<div style=display:none ><table class=lista ><tr><td></td><td></td></tr>";
		var param = {
			"linhas":[
			{titulo:"Nome",prefixoid:"nome_",id:"id_ws",valor:"nome_ws"},
			{titulo:"Descri��o",prefixoid:"desc_",id:"id_ws",valor:"desc_ws"},
			{titulo:"Autor",prefixoid:"autor_",id:"id_ws",valor:"autor_ws"},
			{titulo:"Endere�o",prefixoid:"link_",id:"id_ws",valor:"link_ws"},
			{titulo:"Nome",prefixoid:"nome_",id:"id_ws",valor:"nome_ws"}
			]
		}
		ins += (geraLinhas(d[i],param,2));
		ins += "<tr>"
		ins += "<td>Tipo: </td>"
		ins += "<td><select onchange='this.style.color=\"blue\"' id='tipo_"+d[i].id_ws+"' >"
		ins += combolista(tipos,d[i].tipo_ws)
		ins += "</select>"
		ins += "</td>"
		ins += "</tr>"
		ins += "</table>"
		ins += "<table><tr><td><div class=excluir title='Excluir' onclick='excluir(\""+d[i].id_ws+"\")'/></td>"
		ins += "<td><div class=aplicar title='Aplicar altera��es' onclick='alterarWS(\""+d[i].id_ws+"\",\""+d[i].id_ws+"\")'/></td>"
		ins += "</tr></table>"
		ins += "</div></fieldset><br>"
		if(!$i(d[i].id_ws))
		ins += "</div>"
	}
	$i(onde).innerHTML = ins
	ativaLegenda()
}
function adicionaTema(id,codigo)
{
	var valor = $i("temas_"+id).value
	if(valor == "")
	$i("temas_"+id).value = codigo
	else
	$i("temas_"+id).value += " "+codigo
}
function alterarWS(id_ws,onde)
{
	//if(confirm("Voc� realmente quer fazer isso?"))
	//{
		var retorna = function(retorno)
		{
			if(id_ws == "")
			listaWS(retorno);
			else
			{ins = "";montaWS(retorno,onde)}
		}
		if (id_ws != "")
		{
			var nome = $i("nome_"+id_ws).value
			var desc = $i("desc_"+id_ws).value
			var autor = $i("autor_"+id_ws).value
			var link = $i("link_"+id_ws).value
			var tipo = $i("tipo_"+id_ws).value
		}
		else
		{
			var id_ws = "";
			var nome = ""
			var desc = ""
			var autor = ""
			var link = ""
			var tipo = ""
		}
		var p = "../php/webservices.php?funcao=alterarWS&id_ws="+id_ws+"&nome="+nome+"&desc="+desc+"&autor="+autor+"&link="+link+"&tipo="+tipo
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
		var p = "../php/webservices.php?funcao=excluir&id="+id;
		cPaint.call(p,"",retorna);	
	}
}
function importarXmlWS()
{
	$i("resultado").innerHTML = $mensagemAguarde
	var retorna = function(retorno)
	{$i("resultado").innerHTML = retorno.data}
	var p = "../php/webservices.php?funcao=importarXmlWS&xml="+$i("arquivo").value+"&tipo="+$i("tipo").value;
	cPaint.call(p,"",retorna);
}