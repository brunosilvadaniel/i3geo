/*
Title: Admin

Fun��es javascript utilizadas no sistema de administra��o

File: i3geo/admin/admin.js

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
*/
function iniciaAdmin()
{
$parametros = {
	"simples": [
	{ mensagem: "Mensagem mostrada sempre que o i3geo � inicializado",cabeca: "Mensagem de inicializa��o", variavel: "$mensagemInicia"},
	{ mensagem: "Texto mostrado na barra superior do navegador e em alguns aplicativos do i3geo, como a vers�o mobile",cabeca: "T�tulo", variavel: "$tituloInstituicao"},
	{ mensagem: "Diret�rio (caminho absoluto) utilizado para armazenar os mapfiles tempor�rios e outros arquivos utilizados durante a opera��o do i3geo",cabeca: "Diret�rio tempor�rio", variavel: "$dir_tmp"},
	{ mensagem: "Local no servidor (caminho absoluto) onde o i3geo est� armazenado",cabeca: "Localiza��o do i3geo", variavel: "$locaplic"},
	{ mensagem: "Diret�rio onde ficam os arquivos mapfiles dos temas dispon�veis para uso na guia de adi��o de temas",cabeca: "Diret�rio com os temas", variavel: "$temasdir"},
	{ mensagem: "Diret�rio onde ficam armazenados os arquivos de template HTML e mapfiles iniciais",cabeca: "Diret�rio aplicmap", variavel: "$temasaplic"},
	{ mensagem: "Onde est� armazenado o mapserv CGI no servidor",cabeca: "Mapserv CGI", variavel: "$locmapserv"},
	{ mensagem: "Endere�o do arquivo XML ou programa PHP que gera o xml com a lista de sistemas que s�o inclu�dos na guia de adi��o de temas",cabeca: "XML sistemas", variavel: "$locsistemas"},
	{ mensagem: "Endere�o do arquivo XML ou programa PHP que gera o xml com a lista de programas especiais executados na ferramenta de identifica��o",cabeca: "XML identifica", variavel: "$locidentifica"},
	{ mensagem: "Endere�o do arquivo XML ou programa PHP que gera o xml com a lista de mapas que s�o mostrados na vers�o mobile e na guia mapas",cabeca: "XML mapas", variavel: "$locmapas"},
	{ mensagem: "(opcional) Endere�o do arquivo XML ou programa PHP que gera o xml com a lista de atlas e pranchas utilizadas na interface Atlas do i3geo.",cabeca: "XML Atlas", variavel: "$atlasxml"},
	{ mensagem: "Caminho onde fica o arquivo execut�vel do software R",cabeca: "Caminho para o R", variavel: "$R_path"},
	{ mensagem: "(depreciado) string de conex�o com o banco de dados postgis para a realiza��o de c�lculos geom�tricos, como �rea. Na vers�o 5.x do mapserver n�o � mais necess�rio",cabeca: "Conex�o postgis para c�lculos", variavel: "$postgis_con"},
	{ mensagem: "(depreciado) c�digo da proje��o definida no banco de dados postgis para c�lculos de �rea",cabeca: "SRID postgis", variavel: "$srid_area"},
	{ mensagem: "(opcional) string de conex�o com o banco de dados para substituir o item CONECTION quando o mesmo estiver vazio",cabeca: "Substitui��o de conex�o", variavel: "$postgis_mapa"},
	{ mensagem: "sim|nao Define se o desenho da imagem do mapa ser� feito por meio do CGI ou n�o. A escolha do uso do CGI ou n�o deve ser testada para verificar qual a melhor performance em cada instala��o.",cabeca: "Utiliza CGI", variavel: "$utilizacgi"},
	{ mensagem: "sim|nao Exp�e ou n�o o endere�o do arquivo mapfile utilizado no mapa que est� sendo usado. Quando essa vari�vel for definida como nao algumas das funcionalidades do i3geo poder�o ficar prejudicadas, mas sem comprometimento das fun��es principais",cabeca: "Exp�e o mapfile", variavel: "$expoeMapfile"},	
	{ mensagem: "Arquivo (PHP) que define a conex�o com o banco de dados administrativo. Mantendo esse valor como vazio, o i3geo ir� utilizar o banco de dados padr�o em SQLITE. Veja i3geo/ms_configura.php e i3geo/admin/conexao.php para maiores informa��es sobre como utilizar outros bancos de dados.",cabeca: "Conex�o com o banco de dados administrativo", variavel: "$conexaoadmin"}	
	]};
	verificaEditores()
}
/*
Function: montaParametros

Monta o html com os parametros
*/
function montaParametros()
{
	montaCampos()
	pegaParametros()
}
/*
Function: pegaParametros

Pega os par�metros do ms_configura.php

*/
function pegaParametros()
{
	var retorna = function(retorno)
	{
		for (i=0;i<$parametros.simples.length;i++)
		{
			if($i($parametros.simples[i].variavel))
			{$i($parametros.simples[i].variavel).value = eval("retorno.data."+$parametros.simples[i].variavel);}
		}
		document.getElementById("aguarde").style.display="none"
	}
	var p = "../php/ms_configura.php?funcao=pegaParametrosConfigura";
	cPaint.call(p,"",retorna);
}
/*
Function - restauraPadrao

Copia o arquivo ms_configura.default para ms_configura.php
*/
function restauraPadrao()
{
	if(confirm("Voc� realmente quer fazer isso?"))
	{
		var retorna = function(retorno)
		{window.location.reload();}
		var p = "../php/ms_configura.php?funcao=restauraConfigura";
		cPaint.call(p,"",retorna);	
	}
}
/*
Function - salva

Salva o novo valor de uma vari�vel
*/
function salva(variavel)
{
	if(confirm("Voc� realmente quer fazer isso?"))
	{
		var retorna = function(retorno)
		{window.location.reload();}
		var p = "../php/ms_configura.php?funcao=salvaConfigura&variavel="+variavel+"&valor="+$i(variavel).value;
		cPaint.call(p,"",retorna);	
	}
}