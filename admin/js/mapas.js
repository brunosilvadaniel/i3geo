/*
Title: Arvore

Fun��es javascript utilizadas no sistema de administra��o do menu de mapas

File: i3geo/admin/mapas.js

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
	listaMapas()
}
/*
Function: listaMapas

Monta o html com os parametros e os divs que receber�o os dados dos formul�rios.

Para cada registro na vari�vel $parameters, � montado um formul�rio.
*/
function listaMapas()
{
	$i("resultado").innerHTML = $mensagemAguarde
	var ins = "<fieldset><legend>Mapas</legend>"
	var comboMapas = function(retorno)
	{
		var d = retorno.data;
		var nm = retorno.data.length
		ins += "<p><table><tr><td><b>Selecione o mapa:</b></td><td></td></tr>"
		ins += "<tr><td><input style=font-size:10px onclick='alterarMapa(\"\")' type=button value='Adicionar um novo mapa' /></td><td><select onchange='pegaDadosMapa(this.value)'>"
		ins += "<option>---</option>"
		for (i=0;i<nm;i++)
		{
			ins += "<option value='"+d[i].id_mapa+"'>"+d[i].nome_mapa+"</option>"
		}
		$i("resultado").innerHTML = ins+"</select></tr></table></p><p><div id='dadosMapa'></div></fieldset>"
	}
	var cp = new cpaint();
	cp.set_response_type("JSON");
	var p = "../php/mapas.php?funcao=pegaMapas";
	cp.call(p,"pegaMapas",comboMapas);
}
function pegaDadosMapa(id_mapa)
{
	$i("dadosMapa").innerHTML = $mensagemAguarde
	var retorna = function(retorno)
	{
	    var d = retorno.data.mapa[0]  
	    var ins = "<table class=lista ><tr><td></td><td></td></tr>";
		var param = {
			"linhas":[
			{titulo:"Nome",prefixoid:"nome_",id:"id_mapa",valor:"nome_mapa"},
			{titulo:"Descri��o",prefixoid:"desc_",id:"id_mapa",valor:"desc_mapa"},
			{titulo:"Extens�o",prefixoid:"ext_",id:"id_mapa",valor:"ext_mapa"},
			{titulo:"Imagem",prefixoid:"imagem_",id:"id_mapa",valor:"imagem_mapa"},
			{titulo:"Outros",prefixoid:"outros_",id:"id_mapa",valor:"outros_mapa"},
			{titulo:"Direto",prefixoid:"linkdireto_",id:"id_mapa",valor:"linkdireto_mapa"},
			{titulo:"Ordem",prefixoid:"ordem_",id:"id_mapa",valor:"ordem_mapa"}
			]
		}
		ins += (geraLinhas(d,param,3));
		ins += "<tr>"
		ins += "<td>Temas: </td>"
		ins += "<td><input size=30 onchange='this.style.color=\"blue\"' type=text id='temas_"+d.id_mapa+"' value='"+d.temas_mapa+"' /></td>"
		ins += "<td><select onchange='adicionaTema(\""+d.id_mapa+"\",this.value)'>"
		ins += comboObjeto($temas,"codigo_tema","nome_tema","")
		ins += "</select>"
		ins += "</td>"
		ins += "</tr>"	
		ins += "<tr>"
		ins += "<td>Perfis: </td>"
		ins += "<td><input size=30 onchange='this.style.color=\"blue\"' type=text id='perfis_"+d.id_mapa+"' value='"+d.perfil_mapa+"' /></td>"
		var idtemp = "perfis_"+d.id_mapa
		ins += "<td><select onchange=\"registraPerfil('"+idtemp+"',this.value);this.style.color='blue'\"  >"
		ins += comboObjeto($perfis,"perfil","perfil","")
		ins += "</select></td></tr>"
		ins += "</select>"
		ins += "</td>"
		ins += "</tr>"
		ins += "<tr>"
		ins += "<td>Ligados: </td>"
		ins += "<td><input size=30 onchange='this.style.color=\"blue\"' type=text id='ligados_"+d.id_mapa+"' value='"+d.ligados_mapa+"' /></td>"
		ins += "</tr>"
		
		ins += "<tr>"
		ins += "<td>Publicado: </td>"
		ins += "<td><select onchange=this.style.color='blue'  id='publicado_"+d.id_mapa+"' >"
		ins += combosimnao(d.publicado_mapa)
		ins += "</td></tr>"
		
		
		ins += "</table>"
		ins += "<table><tr><td><div class=excluir title='Excluir' onclick='excluir(\""+d.id_mapa+"\")'/></td>"
		ins += "<td><div class=aplicar title='Aplicar altera��es' onclick='alterarMapa(\""+d.id_mapa+"\",\""+d.id_mapa+"\")'/></td>"
		ins += "</tr></table>"
		if(d.linkdireto_mapa != "")
		{var l = d.linkdireto_mapa;}
		else
		{
			var l = "../ms_criamapa.php?temasa="+d.temas_mapa+"&layers="+d.ligados_mapa
			if (d.ext_mapa != "")
			{l += "&mapext="+d.ext_mapa}
			if (d.outros_mapa != "")
			{l += "&"+d.outros_mapa}
		}
		ins += "<br>Testar: <a href='"+l+"' target=blank >"+l+"</a>"
		if(d.imagem_mapa != "")
		ins += "<br><img src='"+d.imagem_mapa+"' />"
		ins += "</div></fieldset><br>"
		if(!$i(d.id_mapa))
		ins += "</div>"
		$i("dadosMapa").innerHTML = ins
	}
	var cp = new cpaint();
	cp.set_response_type("JSON");
	var p = "../php/mapas.php?funcao=pegaDadosMapa&id_mapa="+id_mapa;
	cp.call(p,"pegaDadosMapa",retorna);
}
function adicionaTema(id,codigo)
{
	var valor = $i("temas_"+id).value
	if(valor == "")
	$i("temas_"+id).value = codigo
	else
	$i("temas_"+id).value += " "+codigo
}
function alterarMapa(id_mapa,onde)
{
	var retorna = function(retorno)
	{
		if(id_mapa == "")
		listaMapas(retorno);
		else
		{ins = "";pegaDadosMapa(id_mapa)}
	}
	if (id_mapa != "")
	{
		var nome = $i("nome_"+id_mapa).value
		var desc = $i("desc_"+id_mapa).value
		var ext = $i("ext_"+id_mapa).value
		var imagem = $i("imagem_"+id_mapa).value
		var outros = $i("outros_"+id_mapa).value
		var linkdireto = $i("linkdireto_"+id_mapa).value
		var temas = $i("temas_"+id_mapa).value
		var ligados = $i("ligados_"+id_mapa).value
		var perfil = $i("perfis_"+id_mapa).value
		var ordem_mapa = $i("ordem_"+id_mapa).value
		var publicado_mapa = $i("publicado_"+id_mapa).value
	}
	else
	{
		var nome = ""
		var desc = ""
		var ext = ""
		var imagem = ""
		var outros = ""
		var linkdireto = ""
		var temas = ""
		var ligados = ""
		var perfil = ""
		var ordem_mapa = ""
		var publicado_mapa = ""
		var id_mapa = "";
		var perfil = "";
		var nome = prompt("Nome do novo Mapa","");
		if (nome==null || nome=="")
		{
			return;
		}
	}
	var p = "../php/mapas.php?funcao=alterarMapa&publicado_mapa="+publicado_mapa+"&ordem_mapa="+ordem_mapa+"&id_mapa="+id_mapa+"&nome="+nome+"&desc="+desc+"&ext="+ext+"&imagem="+imagem+"&outros="+outros+"&linkdireto="+linkdireto+"&temas="+temas+"&ligados="+ligados+"&perfil="+perfil
	cPaint.call(p,"",retorna);	
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
		var p = "../php/mapas.php?funcao=excluir&id="+id;
		cPaint.call(p,"",retorna);	
	}
}
function importarXmlMapas()
{
	$i("resultado").innerHTML = $mensagemAguarde
	var retorna = function(retorno)
	{$i("resultado").innerHTML = retorno.data}
	var p = "../php/mapas.php?funcao=importarXmlMapas&xml="+$i("arquivo").value;
	cPaint.call(p,"",retorna);
}