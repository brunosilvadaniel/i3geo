<?php
/*
Title: A - Controle das requisi��es em Ajax

Recebe as requisi��es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

As principais vari�veis s�o obtidas da se��o, definida na inicializa��o do I3Geo. Se a vari�vel $map_file n�o for enviada, o retorno � uma mensagem linkquebrado e o fim do programa.

Para utilizar esse programa fora do I3Geo, envie o par�metro "map_file=''", dessa forma, evita-se a mensagem de link quebrado.

O par�metro "funcao" define qual a opera��o que ser� executada (veja exemplo abaixo). esse par�metro � verificado em um bloco "switch ($funcao)".

Sequ�ncia de opera��es:

pega as vari�veis get ou post->pega as vari�veis da se��o->verifica se o debug deve ser ativado->carrega as extens�es doPHP->cria o objeto cpaint->carrega as fun��es de uso mais comuns->faz uma c�pia de seguran�a do map_file->roda a fun��o desejada->retorna os valores obtidos

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

About: Par�metros

funcao - op��o que ser� executada.

Retorno:

cp - o resultado da opera��o ser� retornado em um objeto CPAINT.

Exemplo de chamada CPAINT (Ajax) do lado do cliente (javascript):

var p = "classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid

var cp = new cpaint()

cp.set_response_type("JSON")

cp.call(p,"lente",ajaxabrelente)

About: Vari�veis de Se��o

dir_tmp - diret�rio, no servidor, tempor�rio utilizado pelo I3Geo, exemplo: c:/ms4w/tmp/ms_tmp
temasdir - diret�rio, no servidor, onde ficam os arquivos map_file de cada tema, exemplo: c:/ms4w/apache/htdocs/i3geo/temas
temasaplic - diret�rio, no servidor, onde ficam os arquivos de inicializa��o, exemplo: c:\ms4w\apache\htdocs\i3geo\aplicmap
locmapserv - localiza��o, no servidor, do CGI, exemplo: /cgi-bin/mapserv.exe
locaplic - localiza��o, no servidor, do I3Geo, exemplo: c:/ms4w/apache/htdocs/i3geo
locsistemas - localiza��o do xml com a llista de temas, exemplo: /menutemas/sistemas.xml
locidentifica - localilza��o do xml que define os sistemas adicionais inclu�dos na op��o de identifica��o, exemplo: /menutemas/identifica.xml
R_path - localiza��o, no servidor, do execut�vel do pacote R, exemplo: c:/ms4w/apache/htdocs/i3geo/pacotes/r/win/bin/R.exe
imgurl - url das imagens geradas pelo mapa, exemplo: http://localhost/ms_tmp/imgTVHbdijFMk/
tmpurl - url do diret�rio tempor�rio, exemplo: http://localhost/ms_tmp/
map_file - endere�o, no servidor, do mapfile atual, exemplo: c:/ms4w/tmp/ms_tmp/TVHbdijFMk/TVHbdijFMk.map
mapext - extens�o geogr�fica do mapa atual, exemplo: -76.5125927 -39.3925675209 -29.5851853 9.49014852081
perfil - nome do perfil para controlar os temas que ser�o vis�veis na lista de temas.
mapdir - localiza��o, no servidor, do diret�rio com o mapfile tempor�rio do mapa atual.
imgdir - localiza��o, no servidor, das imagens tempor�rias do mapa atual. 
debug - (pode ser definido como "sim" indica se o erro_reporting deve ser definido como E_ALL

File: i3geo/classesphp/mapa_controle.php

19/6/2007

Include:
<pega_variaveis.php>, <carrega_ext.php>, <cpaint2.inc.php>, <classe_vermultilayer.php>, <classe_estatistica.php>, <funcoes_gerais.php>

*/
error_reporting(0);

//sleep(5);

//
//pega as variaveis passadas com get ou post
//
include_once("pega_variaveis.php");
//
//inicializa a sess�o
//
if ($funcao != "criaMapa")
{
	session_name("i3GeoPHP");
	if (isset($g_sid))
	{session_id($g_sid);}
	session_start();
	foreach(array_keys($_SESSION) as $k)
	{
		eval("\$".$k."='".$_SESSION[$k]."';");
	}
	//
	//verifica se deve ativar o debug
	//
}
if (isset($debug) && $debug == "sim")
{error_reporting(E_ALL);}
//
//ativa o php mapscript e as extens�es necess�rias
//se as extens�es j� estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r�pido
//
include_once ("carrega_ext.php");
require_once("../classesjs/cpaint/cpaint2.inc.php");
//
//cria objeto cpaint para uso com ajax
//
$cp = new cpaint();
/*
//
//grava na sess�o o PID do processo PHP
//
if ($funcao == "terminaProcesso")
{
	$pid = $_SESSION["ultimopid"];
	@exec("taskkill /f /PID $pid 2>&1");
	$cp->set_data($pid);
	$cp->return_data();	
}
$_SESSION["ultimopid"] = getmypid();
*/
if ($funcao == "criaMapa")
{
	session_destroy();
	include("../ms_configura.php");
	chdir($locaplic);
	$interface = "mashup";
	include("ms_criamapa.php");
	$cp->set_data(session_id());
	$cp->return_data();
}	
if (!isset($map_file))
{
	//nesse caso � necess�rio criar o diret�rio tempor�rio e iniciar o mapa
	$cp->set_data("linkquebrado");
	$cp->return_data();
	exit;
}
require_once("classe_vermultilayer.php");
require_once("classe_estatistica.php");
require_once("funcoes_gerais.php");
//
//copia o map_file atual com outro nome para restaurar caso ocorra algum problema
//
copiaSeguranca($map_file);
//
//substitui a string de conex�o
//
substituiCon($map_file,$postgis_mapa);

set_time_limit(240);

//
//faz a busca da fun��o que deve ser executada
//
switch ($funcao)
{
/*
Section: Inicializa��o

Inicia o mapa.
*/
/*
Property: inicia

Inicia o mapa, pegando os par�metros necess�rios para a montagem inicial.

Include:
<mapa_inicia.php>
*/
	case "inicia":
		include("mapa_inicia.php");
		$cp->register('iniciaMapa');
		$cp->start();
		if ($cp->get_data() == "")
		{$cp->set_data("erro");}
	break;	
/*
Section: An�lise de geometrias

Op��es utilizadas no sistema de an�lise de geometrias.
*/
/*
Property: incmapageometrias

Inclu� geometrias, armazenadas no formato I3Geo, como um tema no mapa atual.

O mapfile � alterado e salvo novamente com os novos layers.

Include:
<classe_analise.php>
*/
	case "incmapageometrias":
		include("classe_analise.php");
		$m = new Analise($map_file,"");
		$resultado = $m->incmapageometrias($dir_tmp,$imgdir,$lista);
		$cp->set_data($resultado);
	break;
/*
Property: funcoesGeometrias

Processa geometrias, armazenadas no formato I3Geo, gerando uma nova geometria.
Uni�o, intersec��o, etc.

Include:
<classe_analise.php>
*/
	case "funcoesGeometrias":
		include("classe_analise.php");
		$m = new Analise($map_file,"");
		$resultado = $m->funcoesGeometrias($dir_tmp,$imgdir,$lista,$operacao);
		$cp->set_data($resultado);
	break;
/*
Property: calculaGeometrias

Processa geometrias, armazenadas no formato I3Geo, gerando c�lculos.
�rea, per�metro, etc.

Include:
<classe_analise.php>
*/
	case "calculaGeometrias":
		include("classe_analise.php");
		$m = new Analise($map_file,"");
		$resultado = $m->calculaGeometrias($dir_tmp,$imgdir,$lista,$operacao,$postgis_con,$srid_area);
		$cp->set_data($resultado);
	break;
/*
Property: listageometrias

Gera a lista de geometrias dispon�veis para o mapa atual.

As geometrias s�o armazenadas no diret�rio tempor�rio do usu�rio, utilizando um formato pr�prio do I3Geo.

Include:
<classe_analise.php>
*/
	case "listageometrias":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$resultado = $m->listaGeometrias($dir_tmp,$imgdir);
		$cp->set_data($resultado);
	break;
/*
Property: capturageometrias

Gera um arquivo de geometrias, no formato I3Geo, para um tema, considerando os elementos selecionados.

As geometrias s�o armazenadas no diret�rio tempor�rio do usu�rio, utilizando um formato pr�prio do I3Geo.

Include:
<classe_analise.php>
*/	
	case "capturageometrias":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$resultado = $m->capturaGeometrias($dir_tmp,$imgdir,$nome);
		$cp->set_data($resultado);
	break;
/*
Property: removergeometrias

Remove geometrias do diret�rio tempor�rio.

As geometrias s�o armazenadas no diret�rio tempor�rio do usu�rio, utilizando um formato pr�prio do I3Geo.

Include:
<classe_analise.php>
*/	
	case "removergeometrias":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$resultado = $m->removerGeometrias($dir_tmp,$imgdir,$lista);
		$cp->set_data($resultado);
	break;
/*
Section: Open Layers

Fun��es espec�ficas da interface OpenLayers utilizadas por aplicmap/openlayers.htm
*/
/*
Property: openlayers

Prepara o mapa atual para funcionar na interface openlayers.

Include:
<classe_mapa.php>
*/
	case "openlayers":
		$map = ms_newMapObj($map_file);
		$mapext = ($map->extent->minx).",".($map->extent->miny).",".($map->extent->maxx).",".($map->extent->maxy);
		$eb = $map->scalebar;
		$eb->set("status",MS_OFF);
		$map->setProjection("init=epsg:4326");
		$cr = $map->getlayerbyname("copyright");
		$cr->set("status",MS_OFF);
		if (connection_aborted()){exit();}
		$map->save($map_file);
		include("classe_mapa.php");
		$m = New Mapa($map_file);
		$par = $m->parametrosTemas();
		$resultado = array("mapfile"=>$map_file,"mapext"=>$mapext,"locmapserv"=>$locmapserv,"parametros"=>$par);
		$cp->set_data($resultado);
	break;
/*
Section: Mapa
*/
/*
Property: reiniciaMapa

Reinicia um mapa restaurando a c�pia de seguran�a.
*/	
	case "reiniciaMapa":
		unlink($map_file);
		copy(str_replace(".map","reinc.map",$map_file),$map_file);
		$cp->set_data("ok");
	break;
/*
Property: ativalogo

Ativa ou desativa a marca de logo no mapa.

Include:
<classe_mapa.php>
*/
	case "ativalogo":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->ativalogo());
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: ativalegenda

Ativa ou desativa a legenda inserida no mapa.

Include:
<classe_mapa.php>
*/
	case "ativalegenda":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->ativalegenda());
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: mudatamanho

Muda o tamanho da imagem do mapa atual.

Include:
<classe_mapa.php>
*/
	case "mudatamanho":
		$map = ms_newMapObj($map_file);
		$map->setsize($largura,$altura);
		if (connection_aborted()){exit();}
		$salvo = $map->save($map_file);
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$m->mudaQS($largura,$altura);
		$cp->set_data("ok");
	break;
/*
Property: gradeCoord

Inclui um tema com a grade de coordenadas.

Include:
<classe_mapa.php>
*/
	case "gradeCoord":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->gradeCoord($intervalo));
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: convertews

Converte o mapa atual em um wms.

Include:
<classe_mapa.php>
*/
	case "convertews":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$resultado = $m->converteWS($locmapserv,$h);
		$cp->set_data($resultado);
	break;
/*
Property: querymapcor

Altera a cor de sele��o.

Include:
<classe_mapa.php>
*/
	case "querymapcor":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->corQM($cor));
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: pegaquerymapcor

Pega a cor de sele��o atual.

Include:
<classe_mapa.php>
*/
	case "pegaquerymapcor":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->corQM(""));
	break;
/*
Property: corfundo

Altera a cor do fundo do mapa.

Include:
<classe_mapa.php>
*/
	case "corfundo":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->corfundo($cor));
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: pegacorfundo

Pega a cor do fundo do mapa atual.

Include:
<classe_mapa.php>
*/
	case "pegacorfundo":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->corfundo(""));
	break;	
/*
Property: corpo

Redesenha o mapa.

Include:
<classe_mapa.php>
*/
	case "corpo":
		redesenhaMapa();
	break;
/*
Property: corpoentorno

Desenha as imagens do entorno do mapa.

Include:
<classe_mapa.php>
*/
	case "corpoentorno":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$resultado = $m->redesenhaEntorno();
		$cp->set_data($resultado);
	break;
/*
Property: adicionaTemaGeoRSS

Adiciona um tema baseado em um RSS.

Include:
<classe_mapa.php>
*/
	case "adicionaTemaGeoRSS":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->adicionaTemaGeoRSS($servico,$dir_tmp,$locaplic,$canal);
		$cp->set_data($retorno);
		if ($retorno != "erro")
		{$m->salva();redesenhaMapa();}
		else
		{
			$cp->set_data("erro.Nenhum dado espacializado foi encontrado.");
		}
	break;
/*
Property: adicionaTemaSHP

Adiciona um tema baseado em um arquivo shape file.

Include:
<classe_mapa.php>
*/
	case "adicionaTemaSHP":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->adicionaTemaSHP($arq);
		$cp->set_data($retorno);
		if ($retorno != "erro")
		{$m->salva();redesenhaMapa();}
		else
		{
			$cp->set_data("erro.Nenhum dado espacializado foi encontrado.");
		}
	break;
/*
Property: adicionaTemaIMG

Adiciona um tema baseado em um arquivo de imagem.

Include:
<classe_mapa.php>
*/
	case "adicionaTemaIMG":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->adicionaTemaIMG($arq);
		$cp->set_data($retorno);
		if ($retorno != "erro")
		{$m->salva();redesenhaMapa();}
		else
		{
			$cp->set_data("erro.Nenhum dado espacializado foi encontrado.");
		}
	break;
/*
Property: listatemas

Lista os temas existentes em um mapa.

Include:
<classe_mapa.php>
*/	
	case "listatemas":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$resultado = $m->listaTemas($opcao);
		$cp->set_data($resultado);
	break;
/*
Property: listatemaslocais

Lista os temas existentes no diret�rio tempor�rio do mapa atual.

Include:
<classe_mapa.php>
*/		
	case "listatemaslocais":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$resultado = $m->listaTemasLocais();
		$cp->set_data($resultado);
	break;
/*
Property: listatemasTipo

Lista os temas existentes por tipo.

Include:
<classe_mapa.php>
*/	
	case "listatemasTipo":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$resultado = $m->listaTemasTipo($tipo);
		$cp->set_data($resultado);
	break;
/*
Property: listatemascomsel

Lista os temas que possuem sele��o.

Include:
<classe_mapa.php>
*/	
	case "listatemascomsel":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$resultado = $m->listaTemasComSel();
		$cp->set_data($resultado);
	break;
/*
Property: ligatemas

Liga e desliga temas no mapa atual.

Include:
<classe_mapa.php>
*/		
	case "ligatemas":
  	include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->ligaDesligaTemas($ligar,$desligar));
		$m->salva();
	break;
/*
Property: adtema

Adiciona um novo tema ao mapa.

Include:
<classe_mapa.php>
*/	
	case "adtema":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
		$m->adicionaTema($temas,$locaplic);
		$m->salva();
		$teste = testaMapa($map_file,$postgis_mapa);
		if ($teste == "ok")
		{$cp->set_data("ok");}
		else
		{
			$cp->set_data(array("erro"=>"A camada nao pode ser adicionada. ".$teste));	
		}
	break;
/*
Property: excluitema

Exclui um tema do mapa.

Include:
<classe_mapa.php>
*/
	case "excluitema":
	include("classe_mapa.php");
		$m = new Mapa($map_file);
		$cp->set_data($m->excluiTemas($temas));
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: adicionatemawms

Acrescenta um novo tema em um arquivo map file tendo como fonte um WMS.

Include:
<classe_mapa.php>
*/	
	case "adicionatemawms":
		include("classe_mapa.php");
		$m = new Mapa($map_file);
	 	$m->adicionatemawms($tema,$servico,$nome,$proj,$formato,$locaplic,$tipo,$versao,$nomecamada,$dir_tmp,$imgdir,$imgurl,$tiporep,$suportasld,$formatosinfo);
		$teste = testaMapa($map_file,$postgis_mapa);
		if ($teste == "ok")
		{$cp->set_data("ok");}
		else
		{
			$cp->set_data(array("erro"=>"A camada nao pode ser adicionada. ".$teste));	
		}
	break;
/*
Property: referencia

Gera a imagem do mapa de refer�ncia.
*/	
	case "referencia":
		$objMapa = ms_newMapObj($map_file);
		$nomeImagem = nomeRandomico();
		$cp->register('retornaReferencia');
		$cp->start();
	break;
/*
Property: referenciadinamica

Gera a imagem do mapa de refer�ncia de forma din�mica, variando com a escala do mapa atual.
*/	
	case "referenciadinamica":
		//$objMapa = ms_newMapObj($map_file);
		$nomeImagem = nomeRandomico();
		$cp->register('retornaReferenciaDinamica');
		$cp->start();
	break;
/*
Section: Temas

Processa os layers do mapa.
*/

/*
Property: listaDrives

Pega a lista de drives registrados para o usu�rio atual.

A lista de drives � definida no ms_configura e permite que o usu�rio navegue pelos arquivos do servidor.

Include:
<ms_configura.php>
*/
	case "listaDrives":
		include("../ms_configura.php");
		//verifica se est� cadastrado
		$ipcliente = pegaIPcliente();
		$retorno = array();
		foreach ($navegadoresLocais as $n)
		{
			if (gethostbyname($n["ip"]) == $ipcliente)
			{$retorno[] = $n["drives"];}	
		}		
		$cp->set_data($retorno);
	break;
/*
Property: alterarepresentacao

Altera o tipo de representa��o cartogr�fica do tema.

Include:
<classe_temas.php>
*/
	case "alterarepresentacao":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->alteraRepresentacao());
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: geradestaque

Gera uma imagem que ser� utilizada para destacar um determinado tema.

Include:
<classe_temas.php>
*/
	case "geradestaque":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->geraDestaque());
	break;
/*
Property: download

Gera os arquivos para download de um tema.

*/
	case "download":
		$cp->set_data(downloadTema($map_file,$tema,$locaplic,$dir_tmp));
	break;
/*
function: insereFeature

Insere elemento gr�fico em um tema.

Include:
<classe_temas.php>
*/
	case "inserefeature":
		include("classe_temas.php");
		$m = new Temas($map_file,"");
		$cp->set_data($m->insereFeature($marca,$tipo,$xy,$texto,$position,$partials,$offsetx,$offsety,$minfeaturesize,$mindistance,$force,$shadowcolor,$shadowsizex,$shadowsizey,$outlinecolor,$cor,$sombray,$sombrax,$sombra,$fundo,$angulo,$tamanho,$fonte));
		$m->salva();
		redesenhaMapa();	
	break;
/*
Property: sobetema

Sobe um tema na ordem de desenho.

Include:
<classe_temas.php>
*/
	case "sobetema":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->sobeTema());
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: descetema

Desce um tema na ordem de desenho.

Include:
<classe_temas.php>
*/
	case "descetema":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->desceTema());
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: reordenatemas

Reordena os temas baseados na localiza��o de um segundo tema no mapa.

Include:
<classe_temas.php>
*/
	case "reordenatemas":
		include("classe_temas.php");
		$m = new Temas($map_file);
		$cp->set_data($m->reordenatemas($lista));
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: zoomtema

Muda a extens�o geogr�fica do mapa de acordo com a abrang�ncia de um tema.

Include:
<classe_temas.php>
*/
	case "zoomtema":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->zoomTema());
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: insereFiltro

Inclui um filtro no tema.

Include:
<classe_temas.php>
*/
	case "inserefiltro":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->insereFiltro($filtro,$testa));
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: pegafiltro

Pega a string do filtro de um tema.

Include:
<classe_temas.php>
*/
	case "pegafiltro":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$cp->set_data($m->pegaFiltro());
	break;
/*
Property: aplicaProcessos

Aplica processos em um tema do tipo imagem

Include:
<classe_temas.php>
*/					
	case "aplicaProcessos":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$m->aplicaProcessos($lista);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: mudatransp

Altera a transpar�ncia de um tema

Include:
<classe_temas.php>
*/					
	case "mudatransp":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$m->mudaTransparencia($valor);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: mudanome

Altera o nome do tema

Include:
<classe_temas.php>
*/					
	case "mudanome":
		include("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$m->mudaNome($valor);
		$m->salva();
		redesenhaMapa();
	break;
/*
Section: Classes

Edita as caracter�sticas das classes de um tema.
*/
/*
Property: alteraclasse

Altera uma classe de um tema, aplicando uma nova classifica��o ou modificando par�metros de uma ou mais classes.

Include:
<classe_alteraclasse.php>
*/	
	case "alteraclasse":
		include("classe_alteraclasse.php");
		$m = new Alteraclasse($map_file,$tema);
		if ($opcao == "adicionaclasse")
		{$cp->set_data($m->adicionaclasse());}
		if ($opcao == "valorunico")
		{$cp->set_data($m->valorunico($item,$ignorar));}
		if ($opcao == "intervalosiguais")
		{$cp->set_data($m->intervalosiguais($item,$nclasses,$ignorar));}
		if ($opcao == "quartis")
		{$cp->set_data($m->quartis($item,$ignorar));}
		if ($opcao == "alteraclasses")
		{
			//esta opera��o � chamada com POST via cpaint
			//por isso precisa ser executada com start
			$cp->register('alteraclassesPost');
			$cp->start();
			restauraCon($map_file,$postgis_mapa);
			$cp->return_data();
			exit;
		}
		if ($opcao == "simbolounico")
		{$cp->set_data($m->simbolounico());}
		$salvo = $m->salva();
	break;
/*
Property: inverteCoresClasses

Inverte a ordem das cores das classes de um tema.

Include:
<classe_alteraclasse.php>
*/	
	case "inverteCoresClasses":
		include("classe_alteraclasse.php");
		$m = new Alteraclasse($map_file,$tema);
		$cp->set_data($m->inverteCoresClasses());
		$m->salva();
	break;
/*
Property: calculaTamanhoClasses

Calcula o tamanho dos estilos das classes, alterando o tamanho do s�mbolo.

Include:
<classe_alteraclasse.php>
*/	
	case "calculaTamanhoClasses":
		include("classe_alteraclasse.php");
		$m = new Alteraclasse($map_file,$tema);
		$cp->set_data($m->calculaTamanhoClasses());
		$m->salva();
	break;
/*
Property: alteraCoresClasses

Altera as cores das classes de um tema conforme uma cor inicial e uma final.

Include:
<classe_alteraclasse.php>
*/	
	case "alteraCoresClasses":
		include("classe_alteraclasse.php");
		$m = new Alteraclasse($map_file,$tema);
		$cp->set_data($m->alteraCoresClasses($cori,$corf));
		$m->salva();
	break;
/*
Property: inverteStatusClasse

Altera o status de desenho de uma classe, tornando-a vi�sivel ou n�o.

Include:
<classe_alteraclasse.php>
*/
	case "inverteStatusClasse":
		include("classe_alteraclasse.php");
		$m = new Alteraclasse($map_file,$tema);
		$cp->set_data($m->statusClasse($classe));
		$m->salva();
	break;	
/*
Property: verPaleta

Gera cores tendo como base uma cor inicial e uma cor final.

Include:
<class.palette.php>
*/	
	case "verPaleta":
		include("class.palette.php");
		$cori = RGB2hex(explode(",",$cori));
		$corf = RGB2hex(explode(",",$corf));
		$myPalette=new palette(array($cori,$corf),($numclasses + 1));
		foreach ($myPalette->colorRGB as $cores)
		{
			$res[] = $cores[0].",".$cores[1].",".$cores[2];
		}
		$cp->set_data(implode("*",$res));
	break;
/*
Section: An�lise geogr�fica

Executa opera��es de an�lise espacial.
*/
/*
Property: pontoEmPoligono

Cruza um tema pontual com temas poligonais ou raster.

Salva o mapa acrescentando um novo layer com o resultado.

Include:
<classe_analise.php>
*/
	case "pontoEmPoligono":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->pontoEmPoligono($temaPt,$temasPo,$locaplic));
		$m->salva();
	break;
/*
Property: nptPol

Conta o n�mero de pontos em pol�gono cruzando dois temas.

Salva o mapa acrescentando um novo layer com o resultado.

Include:
<classe_analise.php>
*/
	case "nptPol":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->nptPol($temaPt,$temaPo,$locaplic));
		$m->salva();
	break;
/*
Property - criaBuffer

Gera entorno (buffer) nos elementos selecionados de um tema.

Salva o mapa acrescentando um novo layer com o buffer.

Include:
<classe_analise.php>
*/	
	case "criabuffer":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->criaBuffer($distancia,$locaplic));
		$m->salva();
	break;
/*
Property - criaCentroide

Gera centroide dos elementos selecionados de um tema.

Salva o mapa acrescentando um novo layer com os pontos.

Include:
<classe_analise.php>
*/	
	case "criaCentroide":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->criaCentroide($locaplic));
		$m->salva();
	break;
/*
Property: analiseDistriPt

Gera an�lise de distribui��o de pontos.

Executa script R para gerar a imagem.

Include:
<classe_analise.php>,<class.palette.php>
*/	
	case "analiseDistriPt":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->analiseDistriPt($locaplic,$dir_tmp,$R_path,$numclasses,$tipo,$cori,$corf,$tmpurl));
		$m->salva();
	break;
/*
Property: gradeDePontos

Gera uma grade de pontos com espa�amento regular definido em d�cimos de grau.

Salva o mapa acrescentando um novo layer com a grade de coordenadas.

Include:
<classe_analise.php>
*/	
	case "gradedepontos":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->gradeDePontos($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty));
		$m->salva();
	break;
/*
Property: gradeDePol

Gera uma grade de pol�gonos com espa�amento regular definido em d�cimos de grau.

Salva o mapa acrescentando um novo layer com a grade.

Include:
<classe_analise.php>
*/	
	case "gradedepol":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->gradeDePol($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty));
		$m->salva();
	break;
/*
Property: gradeDeHex

Gera uma grade de pol�gonos hexagonais definido em d�cimos de grau.

Salva o mapa acrescentando um novo layer com a grade.

Include:
<classe_analise.php>
*/	
	case "gradedehex":
		include("classe_analise.php");
		$m = new Analise($map_file,$tema);
		$cp->set_data($m->gradeDeHex($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty));
		$m->salva();
	break;
/*
Section: Edi��o

Cria arquivos shapefile ou altera suas caracter�sticas.
*/
/*
Property: sphPT2shp

Converte os elementos de um tema em um arquivo shp.

Acrescenta um novo tema ao mapa.

Include:
<classe_shp.php>
*/
	case "sphPT2shp":
		include("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$cp->set_data($m->shpPT2shp($locaplic,$para));
		$m->salva();
	break;
/*
Property: listaPontosShape

Lista os pontos dos elementos de um arquivo shp.

Include:
<classe_shp.php>
*/
	case "listaPontosShape":
		include("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$cp->set_data($m->listaPontosShape($xy));
	break;
/*
Property: criashpvazio

Cria um shapefile vazio e acrescenta como tema ao mapa.

Include:
<classe_shp.php>
*/
	case "criashpvazio":
		include("classe_shp.php");
		$m = new SHP($map_file);
		$cp->set_data($m->criaSHPvazio());
		$m->salva();
	break;
/*
Property: insereSHP

Insere um ponto em um shape file existente.

Include:
<classe_shp.php>
*/
	case "insereSHP":
		include("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$m->insereSHP($xy);
		redesenhaMapa();
	break;
/*
Property: insereSHPgrafico

Cria um gr�fico e insere no mapa em um local clicado no mapa.

Os valores para o gr�fico s�o obtidos do tema indicado na classe. Para cada novo gr�fico � criado um tema no mapa.

Include:
<classe_shp.php>
*/
	case "insereSHPgrafico":
		include("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$cp->set_data($m->insereSHPgrafico($tipo,$x,$y,$itens,$imgurl,$width,$inclinacao,$shadow_height));
	break;
/*
Property: mostrawkt

Gera string wkt de um conjunto de pontos.

*/	
	case "mostrawkt":
		$res = xy2wkt($xy);
		$cp->set_data(array($res["ponto"],$res["linha"],$res["poligono"]));
	break;
/*
Section: Gr�ficos

Cria��o de representa��es gr�ficas de dados estat�sticos.
*/
/*
Property: fusaografico

Faz a fus�o da imagem de um gr�fico com a imagem do mapa atual.

Include:
<graficos.php>
*/	
	case "fusaografico":
		include("graficos.php");
		restauraCon($map_file,$postgis_mapa);
		$cp->register('fusaoGrafico');
		$cp->start();
	break;
/*
Property: graficoestrela

Cria um gr�fico do tipo estrela.

Include:
<graficos.php>
*/	
	case "graficoestrela":
		include("graficos.php");
		$cp->register('graficoEstrela');
		$cp->start();
	break;
/*
Property: graficoscatter

Cria um gr�fico de distribui��o de pontos.

Include:
<graficos.php>
*/	
	case "graficoscatter":
		include("graficos.php");
		$cp->register('graficoScatter');
		$cp->start();
	break;
/*
Property: graficoscatterbins

Cria um gr�fico de distribui��o de pontos com agrupamento em pixels (bins).

Include:
<graficos.php>
*/	
	case "graficoscatterbins":
		include("graficos.php");
		$cp->register('graficoScatterBins');
		$cp->start();
	break;
/*
Property: graficolinhas

Cria um gr�fico de linhas.

Include:
<graficos.php>
*/
	case "graficolinhas":
		include("graficos.php");
		$cp->register('graficoLinhas');
		$cp->start();
	break;
/*
Property: graficohist

Cria um gr�fico de histograma.

Include:
<graficos.php>
*/
	case "graficohist":
		include("graficos.php");
		$cp->register('graficoHist');
		$cp->start();
	break;
/*
Property: graficobarras

Cria um gr�fico de barras.

Include:
<graficos.php>
*/
	case "graficobarras":
		include("graficos.php");
		$cp->register('graficoBarras');
		$cp->start();
	break;
/*
Property: graficopizza

Cria um gr�fico de pizza.

Include:
<graficos.php>
*/
	case "graficopizza":
		include("graficos.php");
		$cp->register('graficoPizza');
		$cp->start();
	break;
/*
Section: Menu de temas

Obt�m a lista de temas, grupos e sub-grupos.
*/
/*
Property: pegalistademenus

Pega a lista de menus para incluir na guia adiciona.

Parameters:
*/
	case "pegalistademenus":
		$menutemas = "";
		if (file_exists("../ms_configura.php"))
		{require_once("../ms_configura.php");}
		$cp->set_data($menutemas);
		$cp->return_data();
	break;
/*
Property: pegalistadegrupos

Pega a lista de grupos do menu.

Parameters:

map_file

perfil - perfil do usu�rio

locsistemas - endere�o do xml com a lista de sistemas adicionais

idmenu - identificador da �rvore de menus que dever� ser considerada (veja o ms_configura.php)
Include:
<classe_menutemas.php>
*/
	case "pegalistadegrupos":
		include("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas);
		$cp->set_data(array("grupos"=>$m->pegaListaDeGrupos($idmenu,$listasistemas)));
		//$cp->return_data();
	break;
/*
Property: pegalistadetemas

Pega a lista de temas do menu.

Include:
<classe_menutemas.php>
*/
	case "pegalistadetemas":
		include("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas);
		$cp->set_data(array("temas"=>$m->pegaListaDeTemas($grupo,$subgrupo,$idmenu)));
	break;
/*
Property: procurartemas

Procura um tema no menu.

Include:
<classe_menutemas.php>
*/
	case "procurartemas":
		include("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil);
		$cp->set_data($m->procurartemas($procurar));
	break;
/*
Property: pegaMapas

Pega a lista de links para outros mapas.

Utilizado no preenchimento da guia mapas

Include:
<classe_menutemas.php>
*/
	case "pegaMapas":
		include("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil);
		$cp->set_data($m->pegaListaDeMapas($locmapas));
	break;	
/*
Section: Webservices

Processa servi�os OGC.
*/
/*
Property: georssCanais

Lista os canais de um georss.

*/
	case "georssCanais":
		$cp->set_data(georssCanais($servico,$map_file,$dir_tmp,$locaplic));
	break;
/*
Property: getcapabilities

Chama a fun��o getcapabilities e retorna o resultado.

Include:
<wmswfs.php>
*/
	case "getcapabilities":
		include("wmswfs.php");
		$cp->register('getcapabilities');
		restauraCon($map_file,$postgis_mapa);
		$cp->start();
	break;
/*
Property: getcapabilities2

Chama a fun��o getcapabilities e retorna o resultado formatado (WMS).

Include:
<wmswfs.php>
*/
	case "getcapabilities2":
		include("wmswfs.php");
		$cp->register('getcapabilities2');
		restauraCon($map_file,$postgis_mapa);
		$cp->start();
	break;
/*
Property: getcapabilities3

Chama a fun��o getcapabilities e retorna o resultado formatado (WFS).

Include:
<wmswfs.php>
*/
	case "getcapabilities3":
		include("wmswfs.php");
		$cp->register('getcapabilities3');
		restauraCon($map_file,$postgis_mapa);
		$cp->start();
	break;
/*
Property: temaswms

Retorna a lista de camadas de um WMS formatado em HTML.

Include:
<wmswfs.php>
*/	
	case "temaswms":
		include("wmswfs.php");
		restauraCon($map_file,$postgis_mapa);
		$cp->register('temaswms');
		$cp->start();
	break;
/*
Section: Atributos

Processa os atributos da tabela associada ao tema.
*/
/*
Property: buscaRapida

Acessa dados de um servi�o de geonames.

Include:
<classe_atributos.php>
*/
	case "buscaRapida":
		$cp->set_data(buscaRapida($servico,$palavra));
	break;
/*
Property: listaitens

Lista os itens de um tema.

Include:
<classe_atributos.php>
*/
	case "listaitens":
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->listaItens());
	break;
/*
Property: listavaloresitens

Procura valores em uma tabela que aderem a uma palavra de busca.

Include:
<classe_atributos.php>
*/	
	case "listavaloresitens":
	include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->buscaRegistros($palavra,$lista,$tipo,$onde));
	break;
/*
Property: identifica

Identifica elementos no mapa.

Include:
<classe_atributos.php>
*/
	case "identifica":
		if (!isset($tema)){$tema = "";}
		if (!isset($resolucao)){$resolucao = 5;}
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->identifica($opcao,$xy,$resolucao));
	break;
/*
Property: identificaunico

Identifica elementos no mapa retornando apenas o valor de um �nico item.

Include:
<classe_atributos.php>
*/
	case "identificaunico":
		if (!isset($resolucao)){$resolucao = 5;}
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$xy = explode(",",$xy);
		$cp->set_data($m->identificaQBP($tema,$xy[0],$xy[1],$map_file,$resolucao,$item,$tiporetorno="unico"));
	break;
/*
Property: estatistica

Calcula estat�sticas b�sicas de uma tabela de um tema.

Include:
<classe_atributos.php>
*/	
	case "estatistica":
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->estatDescritivas($item,$exclui));
	break;
/*
Property: listatexto

Pega todos os valores dos itens de uma tabela de um tema.

Include:
<classe_atributos.php>
*/	
	case "listatexto":
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->itensTexto($tipo));
	break;
/*
Property: listaregistros

Pega todos os valores dos itens de uma tabela de um tema.

Include:
<classe_atributos.php>
*/	
	case "listaregistros":
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->listaRegistros($itemtema,$tipo,$unico,$inicio,$fim,$tipolista));
	break;
/*
Property: extregistros

Pega a extens�o geogr�fica de um registro na tabela de atributos de um tema.

Include:
<classe_atributos.php>
*/		
	case "extregistros":
		include("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$cp->set_data($m->extensaoRegistro($registro));
		$m->salva();
	break;
/*
Section: Navega��o

Altera a extens�o geogr�fica do mapa.
*/
/*
Property: desativacgi

Desativa o modo cgi.

*/
	case "desativacgi":
		$_SESSION["utilizacgi"] = "nao";
		$cp->set_data($_SESSION["utilizacgi"]);
	break;

/*
Property: mudaext

Muda a extens�o geogr�fica do mapa.

Include:
<classe_navegacao.php>
*/
	case "mudaext":
		include("classe_navegacao.php");
		if (!isset($ext)){$ext="-76.512593 -39.392568 -29.585185 9.490149";}
		$m = new Navegacao($map_file);
		$m->mudaExtensao($ext);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: mudaescala

Muda a escala do mapa.

Include:
<classe_navegacao.php>
*/
	case "mudaescala":
		include("classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->mudaEscala($escala);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: pan

Desloca a visualiza��o de um mapa (pan).

Include:
<classe_navegacao.php>
*/
	case "pan":
		include("classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->pan($x,$y,$escala,$tipo);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: aproxima

Aproxima a visualiza��o de um mapa (zoom in)

Include:
<classe_navegacao.php>
*/
	case "aproxima":
		include("classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->aproxima($nivel);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: afasta

Afasta a visualiza��o de um mapa (zoom out)

Include:
<classe_navegacao.php>
*/
	case "afasta":
		include("classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->afasta($nivel);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: crialente

Aplica uma resolu��o nova ao mapa atual e gera uma imagem para a lente.

Include:
<classe_navegacao.php>
*/
	case "crialente":
		include("classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->aplicaResolucao($resolucao);
		//$m->desabilitaRASTER();
		$cp->set_data(($m->mapa->width).",".($m->mapa->height).",".$m->gravaImagemCorpo());
	break;
/*
Property: localizaIP

Localiza as coordenadas geogr�ficas do usu�rio atual.

Baseia-se na identifica��o do IP e no pacote geoip

Include:
<pacotes/geoip/geoipcity.php>
*/
	case "localizaIP":
		$ip = pegaIPcliente();
		$r = ip2geo($ip);
		if($r["latitude"] == null)
		{
			$ip = pegaIPcliente2();
			$r = ip2geo($ip);
		}
		$cp->set_data($r);
	break;

/*
Property: zoomponto

Desloca o centro do mapa para um ponto espec�fico.

Include:
<classe_navegacao.php>
*/
	case "zoomponto":
		include("classe_navegacao.php");
		include("classe_temas.php");
		$m = new Navegacao($map_file);
		$m->zoomPonto($xy);
		$m->salva();
		$m = new Temas($map_file,"");
		$m->insereFeature("ponto","POINT",$xy,$texto,$position,$partials,$offsetx,$offsety,$minfeaturesize,$mindistance,$force,$shadowcolor,$shadowsizex,$shadowsizey,$outlinecolor,$cor,$sombray,$sombrax,$sombra,$fundo,$angulo,$tamanho,$fonte);
		$m->salva();	
		redesenhaMapa();
	break;
/*
Section: Legenda

Processa a legenda do mapa e de temas espec�ficos.
*/
/*
Property: editasimbolo

Define as caracter�sticas de simbologia de uma classe, cria, adiciona e exclui estilos.

Include:
<classe_legenda.php>
*/
	case "editasimbolo":
		include("classe_legenda.php");
		$m = new Legenda($map_file,$locaplic,$tema);
		if ($opcao == "excluiestilo")
		{
			$cp->set_data($m->excluiEstilo($classe,$estilo));
			$m->salva();
		}
		if ($opcao == "adicionaestilo")
		{
			$cp->set_data($m->adicionaEstilo($classe,$estilo));
			$m->salva();
		}
		if ($opcao == "sobeestilo")
		{
			$cp->set_data($m->sobeEstilo ($classe,$estilo));
			$m->salva();
		}
		if ($opcao == "desceestilo")
		{
			$cp->set_data($m->desceEstilo ($classe,$estilo));
			$m->salva();
		}
		if ($opcao == "aplica")
		{
			$cp->set_data($m->aplicaParametro($classe,$estilo,$outlinecolor,$backgroundcolor,$color,$symbolname,$size));
			$m->salva();
		}
		if ($opcao == "listaSimbolos")
		{$cp->set_data($m->listaSimbolos($tipo,$dir_tmp,$imgdir));}
		if ($opcao == "pegaparametros")
		{$cp->set_data($m->pegaParametros($classe));}
	break;
/*
Property: editalegenda

Cria elementos para construir uma legenda no formato de tabela em HTML.

Include:
<classe_legenda.php>
*/
	case "editalegenda":
		include("classe_legenda.php");
		$m = new Legenda($map_file,$locaplic,$tema);
		$r = $m->tabelaLegenda();
		if (!$r){$r = "erro.Erro legenda nao disponivel";}
		$cp->set_data($r);
	break;
/*
Property: criaLegendaHTML

Gera a legenda processando o template HTML.

Include:
<classe_legenda.php>
*/
	case "criaLegendaHTML":
		include("classe_legenda.php");
		$m = new Legenda($map_file,$locaplic,$tema,$template);
		$r = $m->criaLegenda();
		if(!$r){$r = "erro. Legenda nao disponivel";}
		$cp->set_data($r);
	break;
/*
Property: contagemclasse

Acrescenta a contagem de elementos em cada classe.

Include:
<classe_legenda.php>
*/
	case "contagemclasse":
		include("classe_legenda.php");
		$m = new Legenda($map_file,$locaplic,$tema);
		$r = $m->tabelaLegenda("sim");
		if (!$r){$r = "erro.Erro legenda nao disponivel";}
		$cp->set_data($r);
	break;
/*
Property: criaLegendaImagem

Desenha a imagem da legenda.

Include:
<classe_legenda.php>
*/
	case "criaLegendaImagem":
		include("classe_legenda.php");
		$m = new Legenda($map_file);
		$cp->set_data($m->legendaGrafica());
	break;
/*
Property: pegaParametrosLegImg

Pega os par�metros da legenda embebida no mapa.

Include:
<classe_legenda.php>
*/
	case "pegaParametrosLegImg":
		include("classe_legenda.php");
		$m = new Legenda($map_file);
		$cp->set_data($m->pegaParametrosLegImg());
	break;
/*
Property: aplicaParametrosLegImg

Aplica um par�metro em um estilo de uma classe.

Include:
<classe_legenda.php>
*/
	case "aplicaParametrosLegImg":
		include("classe_legenda.php");
		$m = new Legenda($map_file);
		$cp->set_data($m->aplicaParametrosLegImg($imagecolor,$position,$status,$outlinecolor,$keyspacingy,$keyspacingx,$keysizey,$keysizex,$height,$width,$labelsize));
		$m->salva();
	break;
/*
Section: Escala gr�fica

Processa a escala gr�fica do mapa.
*/
/*
Property: escalagrafica

Gera a imagem da barra de escala.

Include:
<classe_escala.php>
*/
	case "escalagrafica":
		include("classe_escala.php");
		$m = new Escala($map_file);
		$cp->set_data($m->retornaBarraEscala());
	break;
/*
Property: testaescalagrafica

Testa os novos par�metros de uma barra de escala.

Include:
<classe_escala.php>
*/
	case "testaescalagrafica":
		include("classe_escala.php");
		$m = new Escala($map_file);
		$cp->set_data($m->testaescalagrafica($w,$h,$estilo,$intervalos,$unidade,$cor,$bcor,$ocor));
	break;
/*
Property: escalaparametros

Pega os par�metros da barra de escala atual.

Include:
<classe_escala.php>
*/
	case "escalaparametros":
		include("classe_escala.php");
		$m = new Escala($map_file);
		$cp->set_data($m->parametrosBarraEscala());
	break;
/*
Property: mudaescalagrafica

Aplica novos par�metros na barra de escala atual.

Include:
<classe_escala.php>
*/
	case "mudaescalagrafica":
		include("classe_escala.php");
		$m = new Escala($map_file);
		$cp->set_data($m->mudaEscalaGrafica($w,$h,$estilo,$intervalos,$unidade,$cor,$bcor,$ocor));
	break;
/*
Section: Sele��o

Seleciona elementos do mapa ou processa a sele��o existente.
*/
/*
Property: selecaopt

Seleciona elementos utilizando um ponto.

Include:
<classe_selecao.php>
*/	
	case "selecaopt":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecaoPT($xy,$tipo,$tolerancia));
	break;
/*
Property: selecaoext

Seleciona elementos utilizando a extens�o do mapa.

Include:
<classe_selecao.php>
*/	
	case "selecaoext":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecaoEXT($tipo));
	break;
/*
Property: selecaobox

Seleciona elementos utilizando um ret�ngulo.

Include:
<classe_selecao.php>
*/	
	case "selecaobox":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecaoBOX($tipo,$ext));
	break;

/*
Property: selecaoatrib

Seleciona elementos com base nos atributos.

Include:
<classe_selecao.php>
*/
	case "selecaoatrib":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecaoAtributos($tipo,$item,$operador,$valor));
	break;
/*
Property: selecaotema

Sleciona elementos de um tema com base em outro tema.

Include:
<classe_selecao.php>
*/
	case "selecaotema":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecaoTema($temao,$tipo));
	break;
/*
Property: selecaoPoli

Sele��o por poligono (chamado via POST).

Include:
<classe_alteraclasse.php>
*/	
	case "selecaoPoli":
		//esta opera��o � chamada com POST via cpaint
		//por isso precisa ser executada com start
		$cp->register('selecaoPoli');
		$cp->start();
		restauraCon($map_file,$postgis_mapa);
		$cp->return_data();
	break;
/*
Property: limpasel

Limpa a sele��o existente em um tema.

Include:
<classe_selecao.php>
*/
	case "limpasel":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecaoLimpa());
	break;
/*
Property: incluisel

Inclu� elementos em uma sele��o.

Include:
<classe_selecao.php>
*/
	case "incluisel":
		include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->incluiSel($ids));
	break;
/*
Property: criatemasel

Cria um novo tema com a sele��o atual.

Include:
<classe_selecao.php>
*/
	case "criatemasel":
	include("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$cp->set_data($m->selecao2tema($locaplic,$dir_tmp));
		$m->salva();
	break;
/*
Section: Topon�mia

Processa a topon�mia de um tema.
*/
/*
Property: criatoponimia

Cria um novo tema com a topon�mia do tema atual.

Include:
<classe_toponimia.php>
*/	
	case "criatoponimia":
		include("classe_toponimia.php");
		$m = new Toponimia($map_file,$tema);
		$cp->set_data($m->criaToponimia($item,$position,$partials,$offsetx,$offsety,$minfeaturesize,$mindistance,$force,$shadowcolor,$shadowsizex,$shadowsizey,$outlinecolor,$cor,$sombray,$sombrax,$sombra,$fundo,$angulo,$tamanho,$fonte,$tipo));
		if ($tipo != "teste")
		{$m->salva();}
	break;
/*
Property: ativaEtiquetas

Ativa as etiquetas de um tema.

Include:
<classe_toponimia.php>
*/
	case "ativaEtiquetas":
		include("classe_toponimia.php");
		$m = new Toponimia($map_file,$tema);
		$cp->set_data($m->ativaEtiquetas($item));
		$m->salva();
	break;
/*
Property: removeEtiquetas

Desativa as etiquetas de um tema.

Include:
<classe_toponimia.php>
*/
	case "removeEtiquetas":
		include("classe_toponimia.php");
		$m = new Toponimia($map_file,$tema);
		$cp->set_data($m->removeEtiquetas());
		$m->salva();
	break;
/*
Property: listatruetype

Lista as fontes truetype dispon�veis.

Include:
<classe_toponimia.php>
*/
	case "listatruetype":
		$cp->register('listaTrueType');
		restauraCon($map_file,$postgis_mapa);
		$cp->start();
	break;
/*
Section: Outros

Op��es de uso geral.
*/
/*
Property: listaDiretorios

Lista os diret�rios de um diret�rio.

*/
	case "listaDiretorios":
		$cp->set_data(listaDiretorios($diretorio));
	break;
/*
Property: listaArquivos

Lista os arquivos de um diret�rio.

*/
	case "listaArquivos":
		$cp->set_data(listaArquivos($diretorio));
	break;
}
if (!connection_aborted())
{
	restauraCon($map_file,$postgis_mapa);
	$cp->return_data();
}
else
{exit();}
/*
Function: alteraclassesPost

Altera as classes de um tema aplicando novos par�metros como nome e express�o.

Include:
<classe_alteraclasse.php>
*/
function alteraclassesPost($ids,$nomes,$exps)
{
	global $map_file,$tema,$cp;
	$m = new Alteraclasse($map_file,$tema);
	$m->alteraclasses($ids,$nomes,$exps);
	$m->salva();
}
/*
Function: selecaoPoli

Seleciona um tema por pol�gono baseado em uma lista de pontos.

Include:
<classe_selecao.php>
*/
function selecaoPoli($xs,$ys,$tema,$tipo)
{
	global $map_file,$cp;
	include("classe_selecao.php");
	$m = new Selecao($map_file,$tema);
	$cp->set_data($m->selecaoPorPoligono($tipo,$xs,$ys));
	$m->salva();
}
/*
Function: redesenhaMapa

Redesenha o mapa e retorna os par�metros do novo mapa.

Include:
<classe_mapa.php>
*/
function redesenhaMapa()
{
	global $map_file,$locsistemas,$locidentifica,$tipoimagem,$cp,$postgis_mapa,$utilizacgi,$locmapserv;
	if (connection_aborted()){exit();}
	include_once("classe_mapa.php");
	$m = New Mapa($map_file);
	$par = $m->parametrosTemas();
	$imagem = $m->redesenhaCorpo($locsistemas,$locidentifica,$tipoimagem,$utilizacgi,$locmapserv);
	if ($imagem == "erro")
	{
		unlink($map_file);
		copy(str_replace(".map","seguranca.map",$map_file),$map_file);
		$m = New Mapa($map_file);
		$par = $m->parametrosTemas();
		if (isset($utilizacgi) && strtolower($utilizacgi) == "sim")
		{$imagem = "var mapimagem='".$locmapserv."?map=".$map_file."&mode=map&".nomeRandomico()."'";}
		else
		{$imagem = $m->redesenhaCorpo($locsistemas,$locidentifica,$tipoimagem);}
	}
	restauraCon($map_file,$postgis_mapa);
	if (($par == "") || ($imagem == ""))
	{$cp->set_data("erro");}
	else
	{$cp->set_data($imagem.";".$par);}
}
?>