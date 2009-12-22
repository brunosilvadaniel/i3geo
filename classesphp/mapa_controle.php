<?php
/*
Title: mapa_controle.php

Controle das requisi��es em Ajax feitas pelas interfaces normais do i3geo

Recebe as requisi��es feitas em JavaScript (AJAX) e retorna o resultado para a interface.

As principais vari�veis s�o obtidas da se��o, definida na inicializa��o do I3Geo. Se a vari�vel $map_file n�o for enviada, o retorno � uma mensagem linkquebrado e o fim do programa.

Para utilizar esse programa fora do I3Geo, envie o par�metro "map_file=''", dessa forma, evita-se a mensagem de link quebrado.

O par�metro "funcao" define qual a opera��o que ser� executada (veja exemplo abaixo). esse par�metro � verificado em um bloco "switch ($funcao)".

Sequ�ncia de opera��es:

pega as vari�veis get ou post->pega as vari�veis da se��o->verifica se o debug deve ser ativado->carrega as extens�es doPHP->cria o objeto cpaint->carrega as fun��es de uso mais comuns->faz uma c�pia de seguran�a do map_file->roda a fun��o desejada->retorna os valores obtidos

Licenca:

GPL2

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

O resultado da opera��o ser� retornado em um objeto CPAINT.

A constru��o da string JSON � feita preferencialmente pelas fun��es nativas do PHP.
Para efeitos de compatibilidade, uma vez que at� a vers�o 4.2 a string JSON era construida pelo CPAINT,
o objeto CPAINT ainda � definido, por�m, a fun��o cpjson verifica se as fun��es nativas do PHPO (json)
est�o instaladas, se estiverem, utiliza-se a fun��o nativa, se n�o, utiliza-se o CPAINT para gerar o JSON.

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
$tempo = microtime(1);
include_once("pega_variaveis.php");
//
//inicializa a sess�o
//
if ($funcao != "criaMapa")
{
	session_name("i3GeoPHP");
	if (isset($g_sid) && $g_sid != "")
	{
		session_id($g_sid);
	}
	session_start();
	foreach(array_keys($_SESSION) as $k)
	{
		if(!is_array($_SESSION[$k]))
		eval("\$".$k."='".$_SESSION[$k]."';");
	}
	$postgis_mapa = $_SESSION["postgis_mapa"];
	if(isset($fingerprint))
	{
		if (md5('I3GEOSEC' . $_SERVER['HTTP_USER_AGENT'] . session_id()) != $fingerprint)
		{exit;}
	}
}
//
//verifica se deve ativar o debug
//
if (isset($debug) && $debug == "sim")
{error_reporting(E_ALL);}
//
//teste de timeout
//
//for($i==0;$i<5000000000;$i++){}
//
//ativa o php mapscript e as extens�es necess�rias
//se as extens�es j� estiverem carregadas no PHP, vc pode comentar essa linha para que o processamento fique mais r�pido
//
include_once ("carrega_ext.php");
include_once("funcoes_gerais.php");
//include_once("../pacotes/cpaint/cpaint2.inc.php");
//
//cria objeto cpaint para uso com ajax
//
//$cp = new cpaint();
//$cp->set_data("");
if ($funcao == "criaMapa")
{
	session_destroy();
	//
	//primeiro � necess�rio carregar o ms_configura.php para pegar a vari�vel $locaplic
	//
	$d = "";
	if(!file_exists("ms_configura.php"))
	$d = "../";
	include_once($d."ms_configura.php");
	//
	//� necess�rio mudar o diret�rio em fun��o dos includes que s�o feitos pelo ms_criamapa.php
	//
	chdir($locaplic);
	$interface = "mashup";
	include_once("ms_criamapa.php");
	//$cp->set_data(session_id());
	//$cp->return_data();
	cpjson(session_id(),$cp);
	return;
}
if (!isset($map_file))
{
	//nesse caso � necess�rio criar o diret�rio tempor�rio e iniciar o mapa
	//$cp->set_data(array("erro"=>"linkquebrado"));
	//$cp->return_data();
	cpjson(array("erro"=>"linkquebrado"));
	exit;
}
include_once("classe_vermultilayer.php");
include_once("classe_estatistica.php");

if (isset($debug) && $debug == "sim")
{error_reporting(E_ALL);}
//
//identifica qual a url do i3geo
//
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$protocolo = strtolower($protocolo[0]) . '://'.$_SERVER['HTTP_HOST'];//$_SERVER['SERVER_NAME'] .":". $_SERVER['SERVER_PORT'];
$urli3geo = str_replace("/classesphp/mapa_controle.php","",$protocolo.$_SERVER["PHP_SELF"]);
//
//substitui a string de conex�o
//
if($funcao != "recuperamapa")
{
	if(!substituiCon($map_file,$postgis_mapa))
	{
		//$cp->set_data("erro");
		//$cp->return_data();
		cpjson("erro",$cp);
		return;
	}
}
//set_time_limit(240);

//
//faz a busca da fun��o que deve ser executada
//
$retorno = ""; //string que ser� retornada ao browser via JSON
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
		include_once("mapa_inicia.php");
		iniciaMapa();
		//$cp->register('iniciaMapa');
		//$cp->start();
		//if ($cp->get_data() == "")
		//{$cp->set_data("erro");}
	break;
/*
Property: montaFlamingo

Gera o arquivo xml de configura��o para a interface Flamingo.

O arquivo xml � gravado no diret�rio tempor�rio do mapserver e cont�m a string de conex�o com o gerador de webservices classesphp/flamingoogc.php
Esse gerador, recebe como par�metro o id da se��o atual e transforma o mapfile atual em um webservcie capaz de ser entendido pelo flamingo.
*/
	case "montaFlamingo":
	include("flamingo.inc");
	$retorno = $host."/ms_tmp/".basename(dirname($map_file))."/flamingo.xml";
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
		include_once("classe_analise.php");
		$m = new Analise($map_file,"");
		$retorno = $m->incmapageometrias($dir_tmp,$imgdir,$lista);
	break;
/*
Property: chavegoogle

Retorna o valor da chave registrada para a API do Google maps

Essa chave deve ser registrada em i3geo/ms_configura.php
*/	
	case "chavegoogle":
		$retorno = $googleApiKey;
	break;	
	
/*
Property: funcoesGeometrias

Processa geometrias, armazenadas no formato I3Geo, gerando uma nova geometria.
Uni�o, intersec��o, etc.

Include:
<classe_analise.php>
*/
	case "funcoesGeometrias":
		include_once("classe_analise.php");
		$m = new Analise($map_file,"");
		$retorno = $m->funcoesGeometrias($dir_tmp,$imgdir,$lista,$operacao);
	break;
/*
Property: calculaGeometrias

Processa geometrias, armazenadas no formato I3Geo, gerando c�lculos.
�rea, per�metro, etc.

Include:
<classe_analise.php>
*/
	case "calculaGeometrias":
		include_once("classe_analise.php");
		$m = new Analise($map_file,"");
		$retorno = $m->calculaGeometrias($dir_tmp,$imgdir,$lista,$operacao,$postgis_con,$srid_area);
	break;
/*
Property: listageometrias

Gera a lista de geometrias dispon�veis para o mapa atual.

As geometrias s�o armazenadas no diret�rio tempor�rio do usu�rio, utilizando um formato pr�prio do I3Geo.

Include:
<classe_analise.php>
*/
	case "listageometrias":
		include_once("classe_temas.php");
		if(!isset($tema)){$tema = "";}
		$m = new Temas($map_file,$tema);
		$retorno = $m->listaGeometrias($dir_tmp,$imgdir);
	break;
/*
Property: capturageometrias

Gera um arquivo de geometrias, no formato I3Geo, para um tema, considerando os elementos selecionados.

As geometrias s�o armazenadas no diret�rio tempor�rio do usu�rio, utilizando um formato pr�prio do I3Geo.

Include:
<classe_analise.php>
*/	
	case "capturageometrias":
		include_once("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$retorno = $m->capturaGeometrias($dir_tmp,$imgdir,$nome);
	break;
/*
Property: removergeometrias

Remove geometrias do diret�rio tempor�rio.

As geometrias s�o armazenadas no diret�rio tempor�rio do usu�rio, utilizando um formato pr�prio do I3Geo.

Include:
<classe_analise.php>
*/	
	case "removergeometrias":
		include_once("classe_temas.php");
		if(!isset($tema)){$tema = "";}
		$m = new Temas($map_file,$tema);
		$retorno = $m->removerGeometrias($dir_tmp,$imgdir,$lista);
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
		include_once("classe_mapa.php");
		$m = New Mapa($map_file);
		$par = $m->parametrosTemas();
		$retorno = array("mapfile"=>$map_file,"mapext"=>$mapext,"locmapserv"=>$locmapserv,"parametros"=>$par);
	break;
/*
Section: Mapa
*/
/*
Property: pegaMensagens

Pega as mensagens do metadata 'mensagem'.
*/
	case "pegaMensagens":
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->pegaMensagens();
	break;
/*
Property: reiniciaMapa

Reinicia um mapa restaurando a c�pia de seguran�a.
*/	
	case "reiniciaMapa":
		if(file_exists($map_file."qy"))
		{unlink($map_file."qy");}
		unlink($map_file);
		copy(str_replace(".map","reinc.map",$map_file),$map_file);
		$retorno = "ok";
	break;
/*
Property: recuperamapa

Recupera o mapfile de seguran�a.
*/	
	case "recuperamapa":
		if(file_exists($map_file."qy"))
		{unlink($map_file."qy");}
		unlink($map_file);
		$nmf = str_replace(".map","seguranca.map",$map_file);
		if(file_exists($nmf))
		{
			copy($nmf,$map_file);
		}
		else
		{
			$nmf = str_replace(".map","reinc.map",$map_file);
			copy($nmf,$map_file);
		}
		$retorno = "ok";
	break;
/*
Property: ativalogo

Ativa ou desativa a marca de logo no mapa.

Include:
<classe_mapa.php>
*/
	case "ativalogo":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$m->ativalogo();
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
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$m->ativalegenda();
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
		copiaSeguranca($map_file);
		$map = ms_newMapObj($map_file);
		$map->setsize($largura,$altura);
		if (connection_aborted()){exit();}
		$salvo = $map->save($map_file);
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$m->mudaQS($largura,$altura);
		$retorno = "ok";
	break;
/*
Property: gradeCoord

Inclui um tema com a grade de coordenadas.

Include:
<classe_mapa.php>
*/
	case "gradeCoord":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$m->gradeCoord($intervalo,$corlinha,$larguralinha,$tipolinha,$tamanhotexto,$fonte,$cortexto,$incluitexto,$mascara,$shadowcolor,$shadowsizex,$shadowsizey);
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
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		if(!isset($h)){$h = "";}
		$retorno = $m->converteWS($locmapserv,$h);
	break;
/*
Property: querymapcor

Altera a cor de sele��o.

Include:
<classe_mapa.php>
*/
	case "querymapcor":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$m->corQM($cor);
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
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->corQM("");
	break;
/*
Property: corfundo

Altera a cor do fundo do mapa.

Include:
<classe_mapa.php>
*/
	case "corfundo":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$m->corfundo($cor);
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
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->corfundo("");
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
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->redesenhaEntorno();
	break;
/*
Property: adicionaTemaGeoRSS

Adiciona um tema baseado em um RSS.

Include:
<classe_mapa.php>
*/
	case "adicionaTemaGeoRSS":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$retorno = $m->adicionaTemaGeoRSS($servico,$dir_tmp,$locaplic,$canal);
		if ($retorno != "erro")
		{$m->salva();redesenhaMapa();}
		else
		{
			$retorno = "erro.Nenhum dado espacializado foi encontrado.";
		}
	break;
/*
Property: adicionaTemaSHP

Adiciona um tema baseado em um arquivo shape file.

Include:
<classe_mapa.php>
*/
	case "adicionaTemaSHP":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$retorno = $m->adicionaTemaSHP($arq);
		if ($retorno != "erro")
		{$m->salva();redesenhaMapa();}
		else
		{
			$retorno = "erro.Nenhum dado espacializado foi encontrado.";
		}
	break;
/*
Property: adicionaTemaIMG

Adiciona um tema baseado em um arquivo de imagem.

Include:
<classe_mapa.php>
*/
	case "adicionaTemaIMG":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$retorno = $m->adicionaTemaIMG($arq);
		if ($retorno != "erro")
		{$m->salva();redesenhaMapa();}
		else
		{
			$retorno = "erro.Nenhum dado espacializado foi encontrado.";
		}
	break;
/*
Property: listatemas

Lista os temas existentes em um mapa.

Include:
<classe_mapa.php>
*/	
	case "listatemas":
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->listaTemas($tipo);
		$retorno = array_reverse($retorno);
	break;
/*
Property: listatemaslocais

Lista os temas existentes no diret�rio tempor�rio do mapa atual.

Include:
<classe_mapa.php>
*/		
	case "listatemaslocais":
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->listaTemasLocais();
	break;
/*
Property: listatemasTipo

Lista os temas existentes por tipo.

Include:
<classe_mapa.php>
*/	
	case "listatemasTipo":
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		if(!isset($selecao)){$selecao = "nao";}
		$retorno = $m->listaTemasTipo($tipo,$selecao);
	break;
/*
Property: listatemascomsel

Lista os temas que possuem sele��o.

Include:
<classe_mapa.php>
*/	
	case "listatemascomsel":
		include_once("classe_mapa.php");
		$m = new Mapa($map_file);
		$retorno = $m->listaTemasComSel();
	break;
/*
Property: ligatemas

Liga e desliga temas no mapa atual.

Include:
<classe_mapa.php>
*/		
	case "ligatemas":
  		include_once("classe_mapa.php");
  		copiaSeguranca($map_file);
		$m = new Mapa($map_file,$locaplic);
		$retorno = $m->ligaDesligaTemas($ligar,$desligar,$adicionar);
		$m->salva();
	break;
/*
Property: adtema

Adiciona um novo tema ao mapa.

Include:
<classe_mapa.php>
*/	
	case "adtema":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$salvar = $m->adicionaTema($temas,$locaplic);
		if($salvar)
		$m->salva();
		$retorno = "ok";
		$teste = testaMapa($map_file,$postgis_mapa);
		if ($teste == "ok")
		{$retorno = "ok";}
		else
		{
			$retorno = array("erro"=>"A camada nao pode ser adicionada. ".$teste);	
		}
	break;
/*
Property: excluitema

Exclui um tema do mapa.

Include:
<classe_mapa.php>
*/
	case "excluitema":
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
		$m->excluiTemas($temas);
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
		include_once("classe_mapa.php");
		copiaSeguranca($map_file);
		$m = new Mapa($map_file);
	 	$m->adicionatemawms($tema,$servico,$nome,$proj,$formato,$locaplic,$tipo,$versao,$nomecamada,$dir_tmp,$imgdir,$imgurl,$tiporep,$suportasld,$formatosinfo,$time);
		$teste = testaMapa($map_file,$postgis_mapa);
		if ($teste == "ok")
		{$retorno = "ok";}
		else
		{
			$retorno = array("erro"=>"A camada nao pode ser adicionada. ".$teste);	
		}
	break;
/*
Property: referencia

Gera a imagem do mapa de refer�ncia.
*/	
	case "referencia":
		$objMapa = ms_newMapObj($map_file);
		$nomeImagem = nomeRandomico();
		$retorno = retornaReferencia();
	break;
/*
Property: referenciadinamica

Gera a imagem do mapa de refer�ncia de forma din�mica, variando com a escala do mapa atual.
*/	
	case "referenciadinamica":
		//$objMapa = ms_newMapObj($map_file);
		$nomeImagem = nomeRandomico();
		$retorno = retornaReferenciaDinamica();
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
		include_once("../ms_configura.php");
		//verifica se est� cadastrado
		$ipcliente = pegaIPcliente();
		$retorno = array();
		foreach ($navegadoresLocais as $n)
		{
			if (gethostbyname($n["ip"]) == $ipcliente)
			{$retorno[] = $n["drives"];}	
		}		
	break;
/*
Property: alterarepresentacao

Altera o tipo de representa��o cartogr�fica do tema.

Include:
<classe_temas.php>
*/
	case "alterarepresentacao":
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->alteraRepresentacao();
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
		include_once("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$retorno = $m->geraDestaque();
	break;
/*
Property: download

Gera os arquivos para download de um tema.
*/
	case "download":
		$retorno = downloadTema($map_file,$tema,$locaplic,$dir_tmp);
	break;
/*
function: insereFeature

Insere elemento gr�fico em um tema.

Include:
<classe_temas.php>
*/
	case "inserefeature":
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,"");
		if(!isset($marca)){$marca="";}
		$m->insereFeature($marca,$tipo,$xy,$texto,$position,$partials,$offsetx,$offsety,$minfeaturesize,$mindistance,$force,$shadowcolor,$shadowsizex,$shadowsizey,$outlinecolor,$cor,$sombray,$sombrax,$sombra,$fundo,$angulo,$tamanho,$fonte);
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
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->sobeTema();
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
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->desceTema();
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: fontetema

Busca o link para a fonte do tema

Include:
<classe_temas.php>
*/
	case "fontetema":
		include_once("classe_temas.php");
		$m = new Temas($map_file,null,$locaplic);
		$retorno = $m->fonteTema($tema);
	break;
/*
Property: reordenatemas

Reordena os temas baseados na localiza��o de um segundo tema no mapa.

Include:
<classe_temas.php>
*/
	case "reordenatemas":
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file);
		$m->reordenatemas($lista);
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
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->zoomTema();
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: zoomsel

Muda a extens�o geogr�fica do mapa de acordo com a abrang�ncia dos elementos selecionados de um tema.

Include:
<classe_temas.php>
*/
	case "zoomsel":
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->zoomSel();
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
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		if(!isset($testa)){$testa="";}
		{$retorno = $m->insereFiltro($filtro,$testa);}
		if($testa != "sim")
		{
			$m->salva();
			redesenhaMapa();
		}
	break;
/*
Property: pegafiltro

Pega a string do filtro de um tema.

Include:
<classe_temas.php>
*/
	case "pegafiltro":
		include_once("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$retorno = $m->pegaFiltro();
	break;
/*
Property: aplicaProcessos

Aplica processos em um tema do tipo imagem

Include:
<classe_temas.php>
*/					
	case "aplicaProcessos":
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
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
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
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
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->mudaNome($valor);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: tema2sld

Mostra na tela o SLD de um tema
*/
	case "tema2sld":
		include_once("classe_temas.php");
		$m = new Temas($map_file,$tema);
		$sld = $m->sld();
		echo header("Content-type: application/xml");
		echo $m->sld();
		exit;
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
		include_once("classe_alteraclasse.php");
		copiaSeguranca($map_file);
		$m = new Alteraclasse($map_file,$tema);
		if ($opcao == "adicionaclasse")
		{$retorno = $m->adicionaclasse();}
		if ($opcao == "valorunico")
		{$retorno = $m->valorunico($item,$ignorar);}
		if ($opcao == "intervalosiguais")
		{$retorno = $m->intervalosiguais($item,$nclasses,$ignorar);}
		if ($opcao == "quartis")
		{$cp->set_data($m->quartis($item,$ignorar));}
		if ($opcao == "alteraclasses")
		{
			//esta opera��o � chamada com POST via cpaint
			//por isso precisa ser executada com start
			alteraclassesPost();
			restauraCon($map_file,$postgis_mapa);
			cpjson("");
		}
		if ($opcao == "simbolounico")
		{$retorno = $m->simbolounico();}
		$salvo = $m->salva();
	break;
/*
Property: inverteCoresClasses

Inverte a ordem das cores das classes de um tema.

Include:
<classe_alteraclasse.php>
*/	
	case "inverteCoresClasses":
		include_once("classe_alteraclasse.php");
		copiaSeguranca($map_file);
		$m = new Alteraclasse($map_file,$tema);
		$retorno = $m->inverteCoresClasses();
		$m->salva();
	break;
/*
Property: calculaTamanhoClasses

Calcula o tamanho dos estilos das classes, alterando o tamanho do s�mbolo.

Include:
<classe_alteraclasse.php>
*/	
	case "calculaTamanhoClasses":
		include_once("classe_alteraclasse.php");
		copiaSeguranca($map_file);
		$m = new Alteraclasse($map_file,$tema);
		$retorno = $m->calculaTamanhoClasses();
		$m->salva();
	break;
/*
Property: alteraCoresClasses

Altera as cores das classes de um tema conforme uma cor inicial e uma final.

Include:
<classe_alteraclasse.php>
*/	
	case "alteraCoresClasses":
		include_once("classe_alteraclasse.php");
		copiaSeguranca($map_file);
		$m = new Alteraclasse($map_file,$tema);
		$retorno = $m->alteraCoresClasses($cori,$corf);
		$m->salva();
	break;
/*
Property: inverteStatusClasse

Altera o status de desenho de uma classe, tornando-a vi�sivel ou n�o.

Include:
<classe_alteraclasse.php>
*/
	case "inverteStatusClasse":
		include_once("classe_alteraclasse.php");
		copiaSeguranca($map_file);
		$m = new Alteraclasse($map_file,$tema);
		$retorno = $m->statusClasse($classe);
		$m->salva();
	break;	
/*
Property: verPaleta

Gera cores tendo como base uma cor inicial e uma cor final.

Include:
<class.palette.php>
*/	
	case "verPaleta":
		include_once("class.palette.php");
		$cori = RGB2hex(explode(",",$cori));
		$corf = RGB2hex(explode(",",$corf));
		$myPalette=new palette(array($cori,$corf),($numclasses + 1));
		foreach ($myPalette->colorRGB as $cores)
		{
			$res[] = $cores[0].",".$cores[1].",".$cores[2];
		}
		$retorno = implode("*",$res);
	break;
/*
Section: An�lise geogr�fica

Executa opera��es de an�lise espacial.
*/
/*
Property: dissolvePOligono

Elimina divisas entre pol�gonos com o mesmo atributo.

Salva o mapa acrescentando um novo layer com o resultado.

Include:
<classe_analise.php>
*/
	case "dissolvePoligono":
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		$retorno = $m->dissolvePoligono($item,$locaplic);
		$m->salva();
	break;
/*
Property: agrupaElementos

Agrupa elementos em um pol�gono.

Salva o mapa acrescentando um novo layer com o resultado.

Include:
<classe_analise.php>
*/
	case "agrupaElementos":
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		$retorno = $m->agrupaElementos($item,$locaplic);
		$m->salva();
	break;
/*
Property: pontoEmPoligono

Cruza um tema pontual com temas poligonais ou raster.

Salva o mapa acrescentando um novo layer com o resultado.

Include:
<classe_analise.php>
*/
	case "pontoEmPoligono":
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		$retorno = $m->pontoEmPoligono($temaPt,$temasPo,$locaplic);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		$retorno = $m->nptPol($temaPt,$temaPo,$locaplic);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		$retorno = $m->criaBuffer($distancia,$locaplic,$unir);
		$m->salva();
		//limpa selecao
		if (file_exists($map_file."qy"))
		{unlink ($map_file."qy");}
	break;
/*
Property - distanciaptpt

Calcula a distancia entre um ponto de origem e os pontos em um tema.

S�o considerados apenas os pontos pr�ximos definidos por um buffer.

Include:
<classe_analise.php>
*/	
	case "distanciaptpt":
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$temaorigem);
		$temaoverlay = $m->criaBuffer($distancia,$locaplic);
		$retorno = $m->distanciaptpt($temaorigem,$temadestino,$temaoverlay,$locaplic,$itemorigem,$itemdestino);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		$retorno = $m->criaCentroide($locaplic);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		if(!isset($tema2))
		{$tema2 = "";}
		if(!isset($limitepontos))
		{$limitepontos = "";}
		$m = new Analise($map_file,$tema);
		$retorno = $m->analiseDistriPt($locaplic,$dir_tmp,$R_path,$numclasses,$tipo,$cori,$corf,$tmpurl,$sigma,$limitepontos,$tema2,$extendelimite);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		if(!isset($tema)){$tema = "";}
		$m = new Analise($map_file,$tema);
		$retorno = $m->gradeDePontos($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		if(!isset($tema)){$tema = "";}
		$m = new Analise($map_file,$tema);
		$retorno = $m->gradeDePol($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty);
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
		include_once("classe_analise.php");
		copiaSeguranca($map_file);
		$m = new Analise($map_file,$tema);
		if(!isset($tema)){$tema = "";}
		$retorno = $m->gradeDeHex($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty);
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
		include_once("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$retorno = $m->shpPT2shp($locaplic,$para);
		$m->salva();
	break;
/*
Property: listaPontosShape

Lista os pontos dos elementos de um arquivo shp.

Include:
<classe_shp.php>
*/
	case "listaPontosShape":
		include_once("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$retorno = $m->listaPontosShape();
	break;
/*
Property: criashpvazio

Cria um shapefile vazio e acrescenta como tema ao mapa.

Include:
<classe_shp.php>
*/
	case "criashpvazio":
		include_once("classe_shp.php");
		$m = new SHP($map_file);
		if(!isset($tituloTema))
		{$tituloTema = "";}
		$retorno = $m->criaSHPvazio($tituloTema);
		$m->salva();
	break;
/*
Property: insereSHP

Insere um ponto em um shape file existente.

Include:
<classe_shp.php>
*/
	case "insereSHP":
		include_once("classe_shp.php");
		copiaSeguranca($map_file);
		$m = new SHP($map_file,$tema);
		if (!isset($projecao)){$projecao = "";}
		$m->insereSHP($xy,$projecao,$item,$valor);
		redesenhaMapa();
	break;
/*
Property: insereSHPdd

Insere um ponto em um shape file tendo como refer�ncia o �ltimo ponto existente no tema, a dire��o e a dist�ncia.

Include:
<classe_shp.php>
*/
	case "pegaxyUltimoPonto":
		include_once("classe_shp.php");
		$m = new SHP($map_file,$tema);
		$retorno = $m->ultimoXY();
	break;

/*
Property: insereSHPgrafico

Cria um gr�fico e insere no mapa em um local clicado no mapa.

Os valores para o gr�fico s�o obtidos do tema indicado na classe. Para cada novo gr�fico � criado um tema no mapa.

Include:
<classe_shp.php>
*/
	case "insereSHPgrafico":
		include_once("classe_shp.php");
		copiaSeguranca($map_file);
		$m = new SHP($map_file,$tema,$locaplic);
		$retorno = $m->insereSHPgrafico($x,$y,$itens,$width,$inclinacao,$shadow_height);
	break;
/*
Property: mostrawkt

Gera string wkt de um conjunto de pontos.

*/	
	case "mostrawkt":
		$res = xy2wkt($xy);
		$retorno = array($res["ponto"],$res["linha"],$res["poligono"]);
	break;
/*
Section: Gr�ficos

Cria��o de representa��es gr�ficas de dados estat�sticos.
*/
/*
Property: graficoSelecao

Pega os dados necess�rios para a gera��o dos gr�ficos da ferramenta sele��o

*/					
	case "graficoSelecao":
		include_once("graficos.php");
		if(!isset($exclui))
		{$exclui = "";}
		if(!isset($tipo))
		{$tipo = "nenhum";}
		$retorno = iniciaDadosGrafico($map_file,$tema,$exclui,$itemclasses,$itemvalores,$tipo,false);
	break;
/*
Property: graficotema

Gera graficos automaticamente para os elementos de um tema

Include:
<classe_temas.php>
*/					
	case "graficotema":
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
		$m = new Temas($map_file,$tema);
		$m->graficotema($lista,$tamanho,$tipo,$outlinecolor,$offset);
		$m->salva();
		redesenhaMapa();
	break;
/*
Property: fusaografico

Faz a fus�o da imagem de um gr�fico com a imagem do mapa atual.

Include:
<graficos.php>
*/	
	case "fusaografico":
		include_once("graficos.php");
		//$_SESSION["utilizacgi"] = "nao";
		//$utilizacgi = "nao";
		restauraCon($map_file,$postgis_mapa);
		$retorno = fusaoGrafico();
	break;
/*
Property: graficoestrela

Cria um gr�fico do tipo estrela.

Include:
<graficos.php>
*/	
	case "graficoestrela":
		include_once("graficos.php");
		$retorno = graficoEstrela();
	break;
/*
Property: graficoscatter

Cria um gr�fico de distribui��o de pontos.

Include:
<graficos.php>
*/	
	case "graficoscatter":
		include_once("graficos.php");
		$retorno = graficoScatter();
	break;
/*
Property: graficoscatterbins

Cria um gr�fico de distribui��o de pontos com agrupamento em pixels (bins).

Include:
<graficos.php>
*/	
	case "graficoscatterbins":
		include_once("graficos.php");
		$retorno = graficoScatterBins();
	break;
/*
Property: graficolinhas

Cria um gr�fico de linhas.

Include:
<graficos.php>
*/
	case "graficolinhas":
		include_once("graficos.php");
		$retorno = graficoLinhas();
	break;
/*
Property: graficohist

Cria um gr�fico de histograma.

Include:
<graficos.php>
*/
	case "graficohist":
		include_once("graficos.php");
		$retorno = graficoHist();
	break;
/*
Property: graficobarras

Cria um gr�fico de barras.

Include:
<graficos.php>
*/
	case "graficobarras":
		include_once("graficos.php");
		$retorno = graficoBarras();
	break;
/*
Property: graficopizza

Cria um gr�fico de pizza.

Include:
<graficos.php>
*/
	case "graficopizza":
		include_once("graficos.php");
		$retorno = graficoPizza();
	break;
/*
Section: Menu de temas

Obt�m a lista de temas, grupos e sub-grupos.
*/
/*
Property: listaTags

Pega a lista de tags registrados nos menus de temas.

*/
	case "listaTags":
		if(!isset($menutemas))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo);
		$retorno = $m->listatags($rss,$nrss);
	break;
/*
Property: pegalistademenus

Pega a lista de menus para incluir na guia adiciona.

Parametros:
*/
	case "pegalistademenus":
		if(!isset($menutemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo,$editores,$idioma);
		$retorno = $m->pegaListaDeMenus();
	break;
/*
Property: pegalistadegrupos

Pega a lista de grupos do menu.

Parametros:

map_file

perfil - perfil do usu�rio

locsistemas - endere�o do xml com a lista de sistemas adicionais

idmenu - identificador da �rvore de menus que dever� ser considerada (veja o ms_configura.php)
Include:
<classe_menutemas.php>
*/
	case "pegalistadegrupos":
		if(!isset($menutemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		if(!isset($urli3geo)){$urli3geo = "";}
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo,$editores,$idioma);
		if(!isset($idmenu)){$idmenu="";}
		if(!isset($listasistemas)){$listasistemas="nao";}
		if(!isset($listasgrupos)){$listasgrupos="nao";}
		$retorno = array("idmenu"=>$idmenu,"grupos"=>$m->pegaListaDeGrupos($idmenu,$listasistemas,$listasgrupos));
	break;
/*
Property: pegaSistemas

Pega a lista de sistemas.
*/
	case "pegaSistemas":
		if(!isset($locsistemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,"","",$editores,$idioma);
		$retorno = $m->pegaSistemas();
	break;

/*
Property: pegalistadeSubgrupos

Pega a lista de subgrupos de um grupo do menu.

Include:
<classe_menutemas.php>
*/
	case "pegalistadeSubgrupos":
		if(!isset($menutemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo,$editores,$idioma);
		if(!isset($idmenu)){$idmenu = "";}
		$retorno = $m->pegaListaDeSubGrupos($grupo,$idmenu);
	break;
/*
Property: pegalistadetemas

Pega a lista de temas do menu.

Include:
<classe_menutemas.php>
*/
	case "pegalistadetemas":
		if(!isset($menutemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo,$editores,$idioma);
		if(!isset($idmenu)){$idmenu = "";}
		$retorno = array("temas"=>$m->pegaListaDeTemas($grupo,$subgrupo,$idmenu));
	break;
/*
Property: procurartemas

Procura um tema no menu.

Include:
<classe_menutemas.php>
*/
	case "procurartemas":
		if(!isset($menutemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		include_once("classe_menutemas.php");
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo,$editores,$idioma);
		$retorno = $m->procurartemas($procurar);
	break;
/*
Property: pegaMapas

Pega a lista de links para outros mapas.

Utilizado no preenchimento da guia mapas

Include:
<classe_menutemas.php>
*/
	case "pegaMapas":
		include_once("classe_menutemas.php");
		if(!isset($menutemas) || !isset($editores))
		{
			if (file_exists("../ms_configura.php"))
			{include_once("../ms_configura.php");}
			else
			{include_once($locaplic."/ms_configura.php");}
		}
		$m = new Menutemas($map_file,$perfil,$locsistemas,$locaplic,$menutemas,$urli3geo,$idioma);
		$retorno = $m->pegaListaDeMapas($locmapas);
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
		$retorno = georssCanais($servico,$map_file,$dir_tmp,$locaplic);
	break;
/*
Property: getcapabilities

Chama a fun��o getcapabilities e retorna o resultado.

Include:
<wmswfs.php>
*/
	case "getcapabilities":
		include_once("wmswfs.php");
		$retorno = getcapabilities();
		restauraCon($map_file,$postgis_mapa);
	break;
/*
Property: getcapabilities2

Chama a fun��o getcapabilities e retorna o resultado formatado (WMS).

Include:
<wmswfs.php>
*/
	case "getcapabilities2":
		include_once("wmswfs.php");
		$retorno = getcapabilities2();
		restauraCon($map_file,$postgis_mapa);
	break;
/*
Property: getcapabilities3

Chama a fun��o getcapabilities e retorna o resultado formatado (WFS).

Include:
<wmswfs.php>
*/
	case "getcapabilities3":
		include_once("wmswfs.php");
		$retorno = getcapabilities3();
		restauraCon($map_file,$postgis_mapa);
	break;
/*
Property: temaswms

Retorna a lista de camadas de um WMS formatado em HTML.

Include:
<wmswfs.php>
*/	
	case "temaswms":
		include_once("wmswfs.php");
		restauraCon($map_file,$postgis_mapa);
		$retorno = temaswms();
	break;
/*
Property: listaLayersWMS

Retorna a lista de layers de um WMS.

Include:
<wmswfs.php>
*/	
	case "listaLayersWMS":
		include_once("wmswfs.php");
		$retorno = listaLayersWMS();
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
		$retorno = buscaRapida($servico,$palavra);
	break;
/*
Property: listaitens

Lista os itens de um tema.

Include:
<classe_atributos.php>
*/
	case "listaitens":
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$retorno = $m->listaItens();
	break;
/*
Property: listavaloresitens

Procura valores em uma tabela que aderem a uma palavra de busca.

Include:
<classe_atributos.php>
*/	
	case "listavaloresitens":
		include_once("classe_atributos.php");
		if(!isset($tema)){$tema = "";}
		$m = new Atributos($map_file,$tema);
		$retorno = $m->buscaRegistros($palavra,$lista,$tipo,$onde);
	break;
/*
Property: identifica

Depreciado na vers�o 4.2 (utilize "identifica2")

Identifica elementos no mapa.

Include:
<classe_atributos.php>
*/
	case "identifica":
		if (!isset($tema)){$tema = "";}
		if (!isset($resolucao)){$resolucao = 5;}
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$retorno = $m->identifica($opcao,$xy,$resolucao);
	break;
/*
Property: identifica2

Identifica elementos no mapa.

Include:
<classe_atributos.php>
*/
	case "identifica2":
		if (!isset($tema)){$tema = "";}
		if (!isset($resolucao)){$resolucao = 5;}
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$retorno = $m->identifica2($opcao,$xy,$resolucao);
	break;

/*
Property: identificaunico

Identifica elementos no mapa retornando apenas o valor de um �nico item.

Include:
<classe_atributos.php>
*/
	case "identificaunico":
		if (!isset($resolucao)){$resolucao = 5;}
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$xy = explode(",",$xy);
		$retorno = $m->identificaQBP($tema,$xy[0],$xy[1],$map_file,$resolucao,$item,$tiporetorno="unico");
	break;
/*
Property: estatistica

Calcula estat�sticas b�sicas de uma tabela de um tema.

Include:
<classe_atributos.php>
*/	
	case "estatistica":
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$retorno = $m->estatDescritivas($item,$exclui);
	break;
/*
Property: listatexto

Pega todos os valores dos itens de uma tabela de um tema.

Include:
<classe_atributos.php>
*/	
	case "listatexto":
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$retorno = $m->itensTexto($tipo);
	break;
/*
Property: listaregistros

Pega todos os valores dos itens de uma tabela de um tema.

Include:
<classe_atributos.php>
*/	
	case "listaregistros":
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		if(!isset($tipo)){$tipo = "";}
		if(!isset($inicio)){$inicio = 0;}
		if(!isset($fim)){$fim = "";}
		if(!isset($tipolista)){$tipolista = "";}
		if(!isset($itemtema)){$itemtema = "";}
		//$cp->set_data($m->listaRegistros($itemtema,$tipo,"",$inicio,$fim,$tipolista));
		$retorno = $m->listaRegistros($itemtema,$tipo,"",$inicio,$fim,$tipolista);
	break;
/*
Property: extregistros

Pega a extens�o geogr�fica de um registro na tabela de atributos de um tema.

Include:
<classe_atributos.php>
*/		
	case "extregistros":
		include_once("classe_atributos.php");
		$m = new Atributos($map_file,$tema);
		$retorno = $m->extensaoRegistro($registro);
		$m->salva();
	break;
/*
Section: Navega��o

Altera a extens�o geogr�fica do mapa.
*/
/*
Property: geo2utm

Retorna coordenadas utm a partir de coordenadas geo
*/
	case "geo2utm":
		$zona = geo2zonaUTM($x);
		$retorno = geo2utm($x,$y,$zona);
	break;
/*
Property: desativacgi

Desativa o modo cgi.

*/
	case "desativacgi":
		$_SESSION["utilizacgi"] = "nao";
		$retorno = $_SESSION["utilizacgi"];
	break;

/*
Property: mudaext

Muda a extens�o geogr�fica do mapa.

Include:
<classe_navegacao.php>
*/
	case "mudaext":
		include_once("classe_navegacao.php");
		copiaSeguranca($map_file);
		if (!isset($ext) || $ext == "" || $ext == " "){$ext="-76.512593 -39.392568 -29.585185 9.490149";}
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
		include_once("classe_navegacao.php");
		copiaSeguranca($map_file);
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
		include_once("classe_navegacao.php");
		copiaSeguranca($map_file);
		$m = new Navegacao($map_file);
		if(!isset($tipo)){$tipo = "";}
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
		include_once("classe_navegacao.php");
		copiaSeguranca($map_file);
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
		include_once("classe_navegacao.php");
		copiaSeguranca($map_file);
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
		include_once("classe_navegacao.php");
		$m = new Navegacao($map_file);
		$m->aplicaResolucao($resolucao);
		//$m->desabilitaRASTER();
		$retorno = ($m->mapa->width).",".($m->mapa->height).",".$m->gravaImagemCorpo();
	break;
/*
Property: localizaIP

Localiza as coordenadas geogr�ficas do usu�rio atual.

Baseia-se na identifica��o do IP e no pacote geoip

Include:
<pacotes/geoip/geoipcity.php>
*/
	case "localizaIP":
		copiaSeguranca($map_file);
		$ip = pegaIPcliente();
		$r = ip2geo($ip);
		if($r["latitude"] == null)
		{
			$ip = pegaIPcliente2();
			$r = ip2geo($ip);
		}
		$retorno = $r;
	break;

/*
Property: zoomponto

Desloca o centro do mapa para um ponto espec�fico.

Include:
<classe_navegacao.php>
*/
	case "zoomponto":
		include_once("classe_navegacao.php");
		include_once("classe_temas.php");
		copiaSeguranca($map_file);
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
		include_once("classe_legenda.php");
		copiaSeguranca($map_file);
		if(!isset($tema)){$tema = "";}
		$m = new Legenda($map_file,$locaplic,$tema);
		if ($opcao == "excluiestilo")
		{
			$retorno = $m->excluiEstilo($classe,$estilo);
			$m->salva();
		}
		if ($opcao == "adicionaestilo")
		{
			$retorno = $m->adicionaEstilo($classe,$estilo);
			$m->salva();
		}
		if ($opcao == "sobeestilo")
		{
			$retorno = $m->sobeEstilo ($classe,$estilo);
			$m->salva();
		}
		if ($opcao == "desceestilo")
		{
			$retorno = $m->desceEstilo ($classe,$estilo);
			$m->salva();
		}
		if ($opcao == "aplica")
		{
			$retorno = $m->aplicaParametro($classe,$estilo,$outlinecolor,$backgroundcolor,$color,$symbolname,$size);
			$m->salva();
		}
		if ($opcao == "listaSimbolos")
		{$retorno = $m->listaSimbolos($tipo,$dir_tmp,$imgdir,$onclick);}
		if ($opcao == "pegaparametros")
		{$retorno = $m->pegaParametros($classe);}
	break;
/*
Property: editalegenda

Cria elementos para construir uma legenda no formato de tabela em HTML.

Include:
<classe_legenda.php>
*/
	case "editalegenda":
		include_once("classe_legenda.php");
		$m = new Legenda($map_file,$locaplic,$tema);
		$r = $m->tabelaLegenda();
		if (!$r){$r = "erro.Erro legenda nao disponivel";}
		$retorno = $r;
	break;
/*
Property: criaLegendaHTML

Gera a legenda processando o template HTML.

Include:
<classe_legenda.php>
*/
	case "criaLegendaHTML":
		include_once("classe_legenda.php");
		//para efeitos de compatibilidade com vers�es anteriores
		if(isset($template)){$templateLegenda = $template;}
		$m = new Legenda($map_file,$locaplic,$tema,$templateLegenda);
		$r = $m->criaLegenda();
		if(!$r){$r = "erro. Legenda nao disponivel";}
		$retorno = $r;
	break;
/*
Property: testaLegenda

Testa os par�metros de defini��o da legenda inserida no mapa.

Include:
<classe_legenda.php>
*/
	case "testaLegenda":
		include_once("classe_legenda.php");
		copy($map_file,str_replace(".map","testeleg.map",$map_file));
		$m = new Legenda(str_replace(".map","testeleg.map",$map_file));
		$m->aplicaParametrosLegImg($fonte,$imagecolor,$position,$status,$outlinecolor,$keyspacingy,$keyspacingx,$keysizey,$keysizex,$height,$width,$labelsize);
		$retorno = $m->legendaGrafica();
	break;
/*
Property: contagemclasse

Acrescenta a contagem de elementos em cada classe.

Include:
<classe_legenda.php>
*/
	case "contagemclasse":
		include_once("classe_legenda.php");
		$m = new Legenda($map_file,$locaplic,$tema);
		$r = $m->tabelaLegenda("sim");
		if (!$r){$r = "erro.Erro legenda nao disponivel";}
		$retorno = $r;
	break;
/*
Property: criaLegendaImagem

Desenha a imagem da legenda.

Include:
<classe_legenda.php>
*/
	case "criaLegendaImagem":
		include_once("classe_legenda.php");
		$m = new Legenda($map_file);
		$retorno = $m->legendaGrafica();
	break;
/*
Property: pegaParametrosLegImg

Pega os par�metros da legenda embebida no mapa.

Include:
<classe_legenda.php>
*/
	case "pegaParametrosLegImg":
		include_once("classe_legenda.php");
		$m = new Legenda($map_file);
		$retorno = $m->pegaParametrosLegImg();
	break;
/*
Property: aplicaParametrosLegImg

Aplica um par�metro em um estilo de uma classe.

Include:
<classe_legenda.php>
*/
	case "aplicaParametrosLegImg":
		include_once("classe_legenda.php");
		//
		//no caso da op��o de legenda incluida no mapa, o modo cgi n�o desenha a imagem corretamente
		//
		if($status == 3)
		{
			$_SESSION["utilizacgi"] = "nao";
			$utilizacgi = "nao";
		}
		$m = new Legenda($map_file);
		$retorno = $m->aplicaParametrosLegImg($fonte,$imagecolor,$position,$status,$outlinecolor,$keyspacingy,$keyspacingx,$keysizey,$keysizex,$height,$width,$labelsize);
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
		include_once("classe_escala.php");
		$m = new Escala($map_file);
		$retorno = $m->retornaBarraEscala();
	break;
/*
Property: testaescalagrafica

Testa os novos par�metros de uma barra de escala.

Include:
<classe_escala.php>
*/
	case "testaescalagrafica":
		include_once("classe_escala.php");
		$m = new Escala($map_file);
		$retorno = $m->testaescalagrafica($w,$h,$estilo,$intervalos,$unidade,$cor,$bcor,$ocor);
	break;
/*
Property: escalaparametros

Pega os par�metros da barra de escala atual.

Include:
<classe_escala.php>
*/
	case "escalaparametros":
		include_once("classe_escala.php");
		$m = new Escala($map_file);
		$retorno = $m->parametrosBarraEscala();
	break;
/*
Property: mudaescalagrafica

Aplica novos par�metros na barra de escala atual.

Include:
<classe_escala.php>
*/
	case "mudaescalagrafica":
		include_once("classe_escala.php");
		copiaSeguranca($map_file);
		$m = new Escala($map_file);
		$retorno = $m->mudaEscalaGrafica($w,$h,$estilo,$intervalos,$unidade,$cor,$bcor,$ocor);
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
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		if(!isset($xy)){$xy = "";}
		$temas = explode(",",$tema);
		foreach($temas as $tema)
		{
			$m = new Selecao($map_file,$tema);
			$ok[] = $m->selecaoPT($xy,$tipo,$tolerancia);
		}
		$retorno = implode(",",$ok);
	break;
/*
Property: selecaoext

Seleciona elementos utilizando a extens�o do mapa.

Include:
<classe_selecao.php>
*/	
	case "selecaoext":
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		$temas = explode(",",$tema);
		foreach($temas as $tema)
		{
			$m = new Selecao($map_file,$tema);
			$ok[] = $m->selecaoEXT($tipo);
		}
		$retorno = implode(",",$ok);
	break;
/*
Property: selecaobox

Seleciona elementos utilizando um ret�ngulo.

Include:
<classe_selecao.php>
*/	
	case "selecaobox":
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		$temas = explode(",",$tema);
		foreach($temas as $tema)
		{
			$m = new Selecao($map_file,$tema);
			$ok[] = $m->selecaoBOX($tipo,$ext);
		}
		$retorno = implode(",",$ok);		
	break;

/*
Property: selecaoatrib

Seleciona elementos com base nos atributos.

Include:
<classe_selecao.php>
*/
	case "selecaoatrib":
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		$m = new Selecao($map_file,$tema);
		$retorno = $m->selecaoAtributos($tipo,$item,$operador,$valor);
	break;
/*
Property: selecaoatrib2

Seleciona elementos com base nos atributos utilizando sintaxe complexa.

Include:
<classe_selecao.php>
*/
	case "selecaoatrib2":
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		$m = new Selecao($map_file,$tema);
		$retorno = $m->selecaoAtributos2($filtro,$tipo);
	break;
/*
Property: selecaotema

Sleciona elementos de um tema com base em outro tema.

Include:
<classe_selecao.php>
*/
	case "selecaotema":
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		$temas = explode(",",$tema);
		foreach($temas as $tema)
		{
			$m = new Selecao($map_file,$tema);
			$ok[] = $m->selecaoTema($temao,$tipo);
		}
		$retorno = implode(",",$ok);		
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
		copiaSeguranca($map_file);
		$retorno = selecaoPoli();
		restauraCon($map_file,$postgis_mapa);
	break;
/*
Property: limpasel

Limpa a sele��o existente em um tema.

Include:
<classe_selecao.php>
*/
	case "limpasel":
		include_once("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$retorno = $m->selecaoLimpa();
	break;
/*
Property: incluisel

Inclu� elementos em uma sele��o.

Include:
<classe_selecao.php>
*/
	case "incluisel":
		include_once("classe_selecao.php");
		$m = new Selecao($map_file,$tema);
		$retorno = $m->incluiSel($ids);
	break;
/*
Property: criatemasel

Cria um novo tema com a sele��o atual.

Include:
<classe_selecao.php>
*/
	case "criatemasel":
		include_once("classe_selecao.php");
		copiaSeguranca($map_file);
		$m = new Selecao($map_file,$tema);
		$retorno = $m->selecao2tema($locaplic,$dir_tmp);
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
		include_once("classe_toponimia.php");
		copiaSeguranca($map_file);
		$m = new Toponimia($map_file,$tema);
		if(!isset($tipo)){$tipo="";}
		$retorno = $m->criaToponimia($item,$position,$partials,$offsetx,$offsety,$minfeaturesize,$mindistance,$force,$shadowcolor,$shadowsizex,$shadowsizey,$outlinecolor,$cor,$sombray,$sombrax,$sombra,$fundo,$angulo,$tamanho,$fonte,$tipo);
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
		include_once("classe_toponimia.php");
		copiaSeguranca($map_file);
		$m = new Toponimia($map_file,$tema);
		$retorno = $m->ativaEtiquetas($item);
		$m->salva();
	break;
/*
Property: removeEtiquetas

Desativa as etiquetas de um tema.

Include:
<classe_toponimia.php>
*/
	case "removeEtiquetas":
		include_once("classe_toponimia.php");
		copiaSeguranca($map_file);
		$m = new Toponimia($map_file,$tema);
		$retorno = $m->removeEtiquetas();
		$m->salva();
	break;
/*
Property: listatruetype

Lista as fontes truetype dispon�veis.

Include:
<classe_toponimia.php>
*/
	case "listatruetype":
		$retorno = listaTrueType();
		restauraCon($map_file,$postgis_mapa);
	break;
/*
Section: Outros

Op��es de uso geral.
*/
/*
Property: areaPixel

Calcula a �rea de um pixel da imagem.

Parameter:

celsize - tamanho de cada pixel em dd
*/
	case "areaPixel":
		$retorno = calculaAreaPixel($map_file,$celsize);
	break;
/*
Property: listaEpsg

Pega os c�digos de proje��o EPSG.

*/
	case "listaEpsg":
		$retorno = listaEpsg();
	break;
/*
Property: listaDiretorios

Lista os diret�rios de um diret�rio.

*/
	case "listaDiretorios":
		$retorno = listaDiretorios($diretorio);
	break;
/*
Property: listaArquivos*

Lista os arquivos de um diret�rio.
*/
	case "listaArquivos":
		$retorno = listaArquivos($diretorio);
	break;
}
if (!connection_aborted())
{
	if(isset($map_file) && isset($postgis_mapa) && $map_file != "")
	restauraCon($map_file,$postgis_mapa);
	//$cp->return_data();
	cpjson($retorno);
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
	global $map_file,$tema;
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
	global $map_file;
	include_once("classe_selecao.php");
	$temas = explode(",",$tema);
	foreach($temas as $tema)
	{
		$m = new Selecao($map_file,$tema);
		$ok[] = $m->selecaoPorPoligono($tipo,$xs,$ys);
		$m->salva();
	}
	return implode(",",$ok);
}
/*
Function: redesenhaMapa

Redesenha o mapa e retorna os par�metros do novo mapa.

Include:
<classe_mapa.php>

Parametros:

tipoimagem {String} - tipo de imagem que ser� gerada nenhum|cinza|sepianormal|sepiaclara
*/
function redesenhaMapa()
{
	global $tempo,$map_file,$locsistemas,$locidentifica,$tipoimagem,$cp,$postgis_mapa,$utilizacgi,$locmapserv,$interface;
	if($tipoimagem != "nenhum" && $tipoimagem != "")
	{$utilizacgi = "nao";}
	if (connection_aborted()){exit();}
	include_once("classe_mapa.php");
	$m = New Mapa($map_file);
	$par = $m->parametrosTemas();
	//
	//na interface googlemaps n�o � necess�rio gerar a imagem
	//
	if (isset($interface) && ($interface == "googlemaps" || $interface == "openlayers"))
	{$imagem = "var mapimagem='';var mapexten=''";}
	else{
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
	}
	$mensagens = "var mensagens ='".$m->pegaMensagens()."'";
	restauraCon($map_file,$postgis_mapa);
	ob_clean();
	if (($par == "") || ($imagem == ""))
	{$retorno = "erro";}
	else
	{$retorno = array("variaveis"=>($mensagens.";".$imagem.";var tempo=".(microtime(1) - $tempo)),"temas"=>$par);}
	cpjson($retorno);
}
?>