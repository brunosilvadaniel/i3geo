<?php
/*
Title: mapa_inicia.php

Inicia o mapa.
Gera as imagens necess�rias para abrir o mapa e calcula um conjunto de vari�veis necess�rias
ao funcionamento do mapa.

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

File: i3geo/classesphp/mapa_inicia.php

19/6/2007
*/
/*
Function: iniciaMapa

Inicia um mapa, pegando os par�metros necess�rios.

Parameters:

navegadoresLocais - array que indica quais usu�rios podem navegar no servidor

cp - Objeto CPAINT.

embedLegenda - inclui a legenda no corpo do mapa sim|nao

map_file - Arquivo map file.

mapext - Extens�o geogr�fica do mapa.

w - Largura da imagem do mapa.

h - Altura da imagem do mapa.

locsistemas - Vari�vel definida no arquivo ms_configura.php que identifica se existem sistemas associados que ser�o inclu�dos na guia de adi��o de temas.

locidentifica - Vari�vel definida no arquivo ms_configura.php que identifica se existem sistemas adicionais a ser mostrados na op��o de identifica��o.

R_path - Vari�vel definida no arquivo ms_configura.php que indica se o software R est� instalado.

locmapas - Vari�vel definida no arquivo ms_configura.php que indica se a guia de mapas deve ser mostrada.

locmapserv - Vari�vel definida no arquivo ms_configura.php que indica nome do mapserver cgi.

postgis_con - Vari�vel definida no arquivo ms_configura.php que indica qual conex�o postgis deve ser utilizada (algumas fun��es de an�lise utilizam essa conex�o, se existir)

Return:

objeto cpaint contendo uma string como no exemplo abaixo

"var temas='<lista de temas>;var mapexten= '<extens�o geogr�fica do mapa criado>';
var mapscale=<escala do mapa>;var mapres=<resolu��o da imagem do mapa>;
g_celula=<tamanho do pixel em d�cimo de grau>;var mapimagem='<endere�o da imagem do mapa>'
;var mapwidth=<largura do mapa>;var mapheight=<altura do mapa>;
var mappath='<diret�rio tempor�rio do mapa>';var mapurl='<url do diret�rio do mapa>';
var refimagem='<depreciado>';var refwidth=<depreciado>;var refheight=<depreciado>;
var refpath='<depreciado>';var refurl='<depreciado>';var legimagem='<depreciado>';
var legwidth=<depreciado>;var legheight=<depreciado>;var legpath='<depreciado>';
var legurl='<depreciado>';g_locsistemas='<endere�o do xml com os sistemas adicionais>';
g_locidentifica='<endere�o do xml com os sistemas da interface de identifica��o>';
g_r='<o R est� instalado?>';g_locmapas='<endere�o do xml para a lista de mapas>';
objmapa.mapfile='<objeto mapfile>';objmapa.cgi='<objeto cgi>';;objmapa.postgis_con='<conex�o com o postgis>';"

Essa string � recuperada no lado do javascript com eval().

Se $expoeMapfile = "nao", o nome do mapfile n�o � retornado
*/
function iniciaMapa()
{
	global $tituloInstituicao,$tempo,$navegadoresLocais,$locaplic,$cp,$embedLegenda,$map_file,$mapext,$w,$h,$locsistemas,$locidentifica,$R_path,$locmapas,$locmapserv,$postgis_con,$utilizacgi,$expoeMapfile;
	//
	//pega o xml com os sietmas para identifica��o
	//
	$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
	$protocolo = $protocolo[0];
	$protocolo = strtolower($protocolo) . '://'.$_SERVER['SERVER_NAME'] .":". $_SERVER['SERVER_PORT'];
	$urli3geo = str_replace("/classesphp/mapa_controle.php","",$protocolo.$_SERVER["PHP_SELF"]);
	$locidentifica = ($locidentifica == "") ? $urli3geo."/admin/xmlidentifica.php" : $locidentifica;
	//altera o tamanho do query map para ficar igual ao do mapa
	include_once("classe_mapa.php");
	$m = new Mapa($map_file);
	$m->mudaQS($w,$h);
	$m = new Mapa($map_file);
	$m->mapa->setsize($w,$h);
	//
	//verifica se a legenda deve ser embebida no mapa
	//
	$legenda = $m->mapa->legend;
	$embedLegenda == "sim" ? $legenda->set("status",MS_EMBED) : $legenda->set("status",MS_OFF);
	//
	//salva as altera��es feitas
	//
	$m->salva();
	//prepara a legenda para incluir no mapa, preenchendo os nomes das classes em branco
	if ($embedLegenda == "sim")
	{
		foreach ($m->layers as $l)
		{
			if (($l->data != "") && (strtoupper($l->getmetadata("escondido")) != "SIM") && ($l->getmetadata("tema") != "NAO"))
			{
				if ($l->numclasses > 0)
				{
					$classe = $l->getclass(0);
					if (($classe->name == "") || ($classe->name == " "))
					{$classe->set("name",$l->getmetadata("tema"));}
				}
			}
		}
	}
	//
	//cuidado ao mexer aqui
	//o mapa precisa ser salvo para registrar a extens�o geogr�fica
	//
	$imgo = $m->mapa->draw();
	$m->salva($map_file);
	$e = $m->mapa->extent;
	$ext = ($e->minx)." ".($e->miny)." ".($e->maxx)." ".($e->maxy);
	$escalaMapa = $m->mapa->scale;
	$celula = $m->mapa->cellsize;
	//
	//pega os parametros de cada tema
	//
	$arqsel = (file_exists($map_file."qy")) ? true : false;
	$m = New Mapa($map_file);
	$temas = $m->parametrosTemas();
	$nomes = nomeRandomico(12);
	$nomer = ($imgo->imagepath)."mapa".$nomes.".png";
	$imgo->saveImage($nomer);
	if (isset($utilizacgi) && strtolower($utilizacgi) == "sim")
	{$nomer = $locmapserv."?map=".$map_file."&mode=map";}
	else
	{$nomer = ($imgo->imageurl).basename($nomer);}
	$iref = $m->mapa->reference;
	$irefH = $iref->height;
	$res = "var mapexten= '".$ext."';var mapscale=".$escalaMapa.";var mapres=".$m->mapa->resolution.";g_celula=".$celula.";var mapimagem='".$nomer."';var mapwidth=".$imgo->width.";var mapheight=".$imgo->height.";var mappath='".$imgo->imagepath."';var mapurl='".$imgo->imageurl."'";
	$res .= ";var refimagem='';var refwidth=0;objmapa.refheight=".$irefH.";var refpath='';var refurl=''";
	$res .= ";var legimagem='';var legwidth=0;var legheight=0;var legpath='';var legurl='';g_locsistemas='".$locsistemas."';g_locidentifica='".$locidentifica."'";
	$r = (isset($R_path)) ? "sim" : "nao";
	$res .= ";g_r='".$r."'"; //identifica se o r esta instalado
	$res .= ";g_locmapas='".$locmapas."'";
	if ((isset($expoeMapfile)) && ($expoeMapfile == "nao"))
	{$res .= ";objmapa.mapfile=''";}
	else
	{$res .= ";objmapa.mapfile='".$map_file."'";}
	$res .= ";objmapa.cgi='".$locmapserv."'";
	$res .= ";objmapa.utilizacgi='".$utilizacgi."'";
	$res .= ";objmapa.postgis_con='".$postgis_con."'";
	$res .= ";var titulo='".$tituloInstituicao."'";
	$versao = versao();
	$res .= ";objmapa.versaoms ='".$versao["principal"]."'";
	//Pega os estilos dispon�veis
	$visual = (file_exists($locaplic."/imagens/visual")) ? implode(",",listaDiretorios($locaplic."/imagens/visual")) : "";
	$res .= ";objmapa.listavisual='".$visual."'";
	//pega os usu�rios navegadores
	//para efeitos de compatibilidade
	$res .= ";objmapa.navegacaoDir='".$navegadoresLocais."'";
	$res .= ($navegadoresLocais == "sim") ? ";i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir=true" : ";i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir=false";
	//
	//verifica se o pacote geoip est� instalado ou n�o
	//
	$geoip = "nao";
	if (file_exists($locaplic."/pacotes/geoip") && file_exists($locaplic."/pacotes/geoip/GeoLiteCity.dat"))
	{$geoip = "sim";}
	$res .= ";objmapa.geoip='".$geoip."';";
	$res .= "var tempo =".(microtime(1) - $tempo).";";
	$res .= "objmapa.mensagens ='".$m->pegaMensagens()."';";
	//
	//salva uma copia para op��o de reiniciar o mapa
	//
	copy($map_file,(str_replace(".map","reinc.map",$map_file)));
	$cp->set_data(array("variaveis"=>$res,"temas"=>$temas));
}
?>