/*
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
//inicializa
parametrosURL()
//eventos das guias
$i("guia1").onclick = function()
{$i("guia1obj").style.display="block";carregaMapFileAtual()}
//ativa o div conforme o tipo de dados
function mudaTipoDado(combo)
{
	$i("arquivo").style.display="none"
 	$i("banco").style.display="none"
	$i(combo.value).style.display="block"
}
//cria o novo tema
function criaMapa(testa)
{
	function retornoCria(retorno)
	{
		alert(retorno.data)
		window.parent.remapaf()	
	}
	//n�o mude o nome do testamapa
	var v = verificaDados()
	if (testa == "sim")
	{arquivo = "testamapa"}
	if (v == "ok")
	{
 		aguarde("block")
		var p = g_locaplic+"/classesphp/admin.php?g_sid="+g_sid+"&funcao=criaTema"
		var cp = new cpaint();
		cp.set_transfer_mode('POST');
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"criaTema",retornoCria,arquivo,tipodado,nomearquivo,conexaobanco,sql,tiporepresentacao,opacidade,nometema,escala,download);	
	}
}
function verificaDados()
{
	arquivo = $i("codigoArquivo").value
 	tipodado = $i("tipoDado").value
 	nomearquivo = '"'+$i("nomeArquivo").value+'"'
 	conexaobanco = $i("conexaoBanco").value
 	sql = $i("sql").value
 	tiporepresentacao = $i("tipoRepresentacao").value
 	opacidade = $i("opacidade").value
 	nometema = $i("nometema").value
 	escala = $i("escala").value
 	download = $i("download").value
 	if (arquivo == "")
 	{alert("O nome do arquivo precisa ser preenchido");return("erro")}
 	if (tipodado == "---")
 	{alert("Escolha o tipo de dado");return("erro")}
 	if (tipodado == "arquivo")
 	{
 	 	if (nomearquivo == "")
 	 	{alert("Nome do arquivo n�o pode ficar em branco");return("erro")}
 	}
 	if (tipodado == "banco")
 	{
 	 	if (conexaobanco == "")
 	 	{alert("Conex�o n�o pode ficar em branco");return("erro")}
 	 	if (sql == "")
 	 	{alert("Sql n�o pode ficar em branco");return("erro")} 	 	
 	}
 	if (tiporepresentacao == "---")
 	{alert("Escolha o tipo de representa��o");return("erro")}
 	if (nometema == "")
 	{alert("Escolha o nome do tema para a legenda");return("erro")}
 	return ("ok");
}

function retornoCriaTema(retorno)
{
	aguarde("none")
	var retorno = retorno.data
	var reg = /erro/gi;
	if (retorno.search(reg) != -1)
	{
		alert("OOps! Ocorreu um erro\n"+retorno);
		return;
	}
	window.parent.i3GEO.atualiza("")
}