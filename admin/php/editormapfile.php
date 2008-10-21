<?php
/*
Title: Administra��o do cadastro de sistemas

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

File: i3geo/admin/sistemas.php

19/6/2007

*/

include_once("admin.php");
include_once("../../ms_configura.php");
include_once("../../classesphp/funcoes_gerais.php");
error_reporting(0);
//faz a busca da fun��o que deve ser executada
switch ($funcao)
{
	case "pegaMapfiles":
		retornaJSON(pegaLayers());
		exit;
	break;
	case "criarNovoMap":
		retornaJSON(criarNovoMap());
		exit;
	break;
	case "pegaLayers":
		retornaJSON(pegaLayers());
		exit;
	break;
	case "excluirMapfile":
		$tabela = "mapfiles";
		$id = $codigoMap;
		$f = verificaFilhos();
		if($f)
		{
			retornaJSON("erro");
			exit;
		}
		else
		{
			unlink("../../temas/".$codigoMap.".map");
			retornaJSON("ok");
			exit;
		}
	break;
	case "criarNovoLayer":
		retornaJSON(criarNovoLayer());
		exit;
	break;
	case "excluirLayer":
		retornaJSON(excluirLayer());
		exit;
	break;	
	case "listaClasses":
		retornaJSON(listaClasses());
		exit;
	break;
	case "criarNovaClasse":
		retornaJSON(criarNovaClasse());
		exit;
	break;
	case "excluirClasse":
		excluirClasse();
		retornaJSON(listaClasses());
		exit;
	break;
	case "listaEstilos":
		retornaJSON(listaEstilos());
		exit;
	break;	
	case "criarNovoEstilo":
		retornaJSON(criarNovoEstilo());
		exit;
	break;	
	case "excluirEstilo":
		excluirEstilo();
		retornaJSON(listaEstilos());
		exit;
	break;
	case "pegaConexao":
		retornaJSON(pegaConexao());
		exit;
	break;	
	case "alterarConexao":
		alterarConexao();
		retornaJSON(pegaConexao());
		exit;
	break;
	case "pegaMetadados":
		retornaJSON(pegaMetadados());
		exit;
	break;
	case "alterarMetadados":
		alterarMetadados();
		retornaJSON(pegaMetadados());
		exit;
	break;
	case "pegaGeral":
		retornaJSON(pegaGeral());
		exit;
	break;
	case "alterarGeral":
		alterarGeral();
		$codigoLayer = $name;
		retornaJSON(pegaGeral());
		exit;
	break;
	case "pegaClasseGeral":
		retornaJSON(pegaClasseGeral());
		exit;
	break;
	case "alterarClasseGeral":
		alterarClasseGeral();
		retornaJSON(pegaClasseGeral());
		exit;
	break;
	case "pegaClasseLabel":
		retornaJSON(pegaClasseLabel());
		exit;
	break;
}
function criarNovoMap()
{
	global $nome,$codigo,$locaplic;
	$arq = $locaplic."/temas/".$codigo.".map";
	if(!file_exists($arq))
	{
		$dados[] = "SYMBOLSET ../symbols/simbolos.sym";
		$dados[] = 'FONTSET   "../symbols/fontes.txt"';
		$dados[] = "LAYER";
		$dados[] = "	NAME base";
		$dados[] = "	TYPE line";
		$dados[] = '	DATA ""';
		$dados[] = '	METADATA';
		$dados[] = '		TEMA "'.$nome.'"';
		$dados[] = '	METADATA';
		$dados[] = "END";
		$dados[] = "END";
		$fp = fopen($arq,"w");
		foreach ($dados as $dado)
		{
			fwrite($fp,$dado."\n");
		}
    	require_once("conexao.php");
    	$dbh->query("INSERT INTO i3geoadmin_temas (link_tema,kml_tema,ogc_tema,download_tema,desc_tema,tipoa_tema,tags_tema,nome_tema,codigo_tema) VALUES ('','', '','','','','','$nome','$codigo')");
    	$dbh = null;
    	$dbhw = null;
		return "ok";
	}
	return "erro";
}
function criarNovoLayer()
{
	global $locaplic,$codigoMap;
	include_once("../../classesphp/funcoes_gerais.php");
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = ms_newLayerObj($mapa);
	$nl->set("name",nomeRandomico());
	$nl->set("type",MS_LAYER_LINE);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return array("layers"=>(array($nl->name)));
}
function criarNovaClasse()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$nclasses = $nl->numclasses;
	$classe = ms_newClassObj($nl);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	$dados[] = array("indice"=>($nclasses),"nome"=>(""));
	return $dados;
}
function criarNovoEstilo()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$classObj = $nl->getclass($indiceClasse);
	$numestilos = $classObj->numstyles;
	$nestilo = ms_newStyleObj($classObj);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	$dados[] = array("estilo"=>$numestilos);
	return $dados;
}
function pegaLayers()
{
	global $codigoMap,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layers = $mapa->getalllayernames();
	$dados["layers"] = $layers;
	return $dados;
}
function listaClasses()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$nclasses = $layer->numclasses;
	for($i=0;$i<$nclasses;++$i)
	{
		$classe = $layer->getclass($i);
		$dados[] = array("indice"=>$i,"nome"=>($classe->name));
	}
	return $dados;
}
function listaEstilos()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($indiceClasse);
	$numestilos = $classe->numstyles;
	for($i=0;$i<$numestilos;++$i)
	{
		$dados[] = array("estilo"=>$i);
	}
	return $dados;
}

function excluirLayer()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$nl->set("status",MS_DELETE);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function excluirClasse()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$classObj = $nl->getclass($indiceClasse);
	$classObj->set("status",MS_DELETE);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function excluirEstilo()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$indiceEstilo,$locaplic;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$nl = $mapa->getlayerbyname($codigoLayer);
	$classObj = $nl->getclass($indiceClasse);
	$classObj->deletestyle($indiceEstilo);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaConexao()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["connection"] = $layer->connection;
	$dados["connectiontype"] = $layer->connectiontype;
	$dados["data"] = $layer->data;
	$dados["tileindex"] = $layer->tileindex;
	$dados["tileitem"] = $layer->tileitem;
	if($dados["tileindex"] == ""){$dados["tileitem"] = "";}
	$dados["postgis_mapa"] = array_keys($postgis_mapa);
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	return $dados;
}
function alterarConexao()
{
	global $codigoMap,$codigoLayer,$locaplic,$connection,$connectiontype,$data,$tileitem,$tileindex;
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$layer->set("connection",$connection);
	$layer->set("connectiontype",$connectiontype);
	$layer->set("data",$data);
	$layer->set("tileitem",$tileitem);
	$layer->set("tileindex",$tileindex);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaMetadados()
{
	global $codigoMap,$codigoLayer,$locaplic,$postgis_mapa;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["itens"] = $layer->getmetadata("itens");
	$dados["itensdesc"] = $layer->getmetadata("itensdesc");
	$dados["itenslink"] = $layer->getmetadata("itenslink");
	$dados["tip"] = $layer->getmetadata("tip");
	$dados["tema"] = $layer->getmetadata("tema");
	$dados["classe"] = $layer->getmetadata("classe");
	$dados["escala"] = $layer->getmetadata("escala");
	$dados["download"] = $layer->getmetadata("download");
	$dados["escondido"] = $layer->getmetadata("escondido");
	$dados["extensao"] = $layer->getmetadata("extensao");
	$dados["identifica"] = $layer->getmetadata("identifica");
	$dados["mensagem"] = $layer->getmetadata("mensagem");
	$dados["classesitem"] = $layer->getmetadata("classesitem");
	$dados["classesnome"] = $layer->getmetadata("classesnome");
	$dados["classescor"] = $layer->getmetadata("classescor");
	$dados["classessimbolo"] = $layer->getmetadata("classessimbolo");
	$dados["classestamanho"] = $layer->getmetadata("classestamanho");
	$dados["aplicaextensao"] = $layer->getmetadata("aplicaextensao");
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$colunas = "";
	if($layer->type < 3)
	{
		if(@$layer->open())
		{
			$layer->open();
			$colunas = implode(", ",$layer->getitems());
			$layer->close();
		}
	}
	$dados["colunas"] = $colunas;
	
	return $dados;
}
function alterarMetadados()
{
	global $codigoMap,$codigoLayer,$locaplic,$aplicaextensao,$classestamanho,$classessimbolo,$classescor,$classesnome,$classesitem,$mensagem,$identifica,$extensao,$escondido,$download,$escala,$tema,$classe,$tip,$itenslink,$itens,$itensdesc;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$layer->setmetadata("itens",$itens);
	$layer->setmetadata("itensdesc",$itensdesc);
	$layer->setmetadata("itenslink",$itenslink);
	$layer->setmetadata("tip",$tip);
	$layer->setmetadata("tema",$tema);
	$layer->setmetadata("classe",$classe);
	$layer->setmetadata("escala",$escala);
	$layer->setmetadata("download",$download);
	$layer->setmetadata("escondido",$escondido);
	$layer->setmetadata("extensao",$extensao);
	$layer->setmetadata("identifica",$identifica);
	$layer->setmetadata("mensagem",$mensagem);
	$layer->setmetadata("classesitem",$classesitem);
	$layer->setmetadata("classesnome",$classesnome);
	$layer->setmetadata("classescor",$classescor);
	$layer->setmetadata("classessimbolo",$classessimbolo);
	$layer->setmetadata("classestamanho",$classestamanho);
	$layer->setmetadata("aplicaextensao",$aplicaextensao);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaGeral()
{
	global $codigoMap,$codigoLayer,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$dados["type"] = $layer->type;
	$dados["filter"] = $layer->getfilter();
	if($dados["filter"]== ""){$dados["filter"] = "";}
	$dados["filteritem"] = $layer->filteritem;
	$dados["group"] = $layer->group;
	//$dados["labelangleitem"] = $layer->labelangleitem;
	$dados["labelitem"] = $layer->labelitem;
	$dados["labelmaxscale"] = $layer->labelmaxscale;
	$dados["labelmaxscale"] = $layer->labelmaxscale;
	$dados["labelminscale"] = $layer->labelminscale;
	//$dados["labelsizeitem"] = $layer->labelsizeitem;
	$dados["maxscale"] = $layer->maxscale;
	$dados["minscale"] = $layer->minscale;
	$dados["offsite"] = $layer->offsite->red.",".$layer->offsite->green.",".$layer->offsite->blue;
	$dados["opacity"] = $layer->opacity;
	$dados["symbolscale"] = $layer->symbolscale;
	$dados["tolerance"] = $layer->tolerance;
	$dados["toleranceunits"] = $layer->toleranceunits;
	$dados["status"] = $layer->status;
	$dados["sizeunits"] = $layer->sizeunits;
	$dados["projection"] = $layer->getProjection();
	$dados["name"] = $layer->name;
	$colunas = "";
	if($layer->type < 3)
	{
		if(@$layer->open())
		{
			$layer->open();
			$colunas = implode(", ",$layer->getitems());
			$layer->close();
		}
	}
	if($dados["projection"] == "null")
	$dados["projection"] = "";
	$dados["colunas"] = $colunas;
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	return $dados;	
}
function alterarGeral()
{
	global $codigoMap,$codigoLayer,$locaplic,$name,$projection,$sizeunits,$status,$toleranceunits,$tolerance,$symbolscale,$opacity,$offsite,$minscale,$maxscale,$labelsizeitem,$labelminscale,$labelmaxscale,$labelitem,$group,$filteritem,$type,$filter;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	
	if($offsite == -1 || $offsite == "null")
	{$offsite = "-1,-1,-1";}
	$layer->set("name",$name);
	$layer->set("type",$type);
	$layer->setfilter($filter);
	$layer->set("filteritem",$filteritem);
	$layer->set("group",$group);
	//$layer->set("labelangleitem",$labelangleitem);
	$layer->set("labelitem",$labelitem);
	$layer->set("labelmaxscale",$labelmaxscale);
	$layer->set("labelminscale",$labelminscale);
	//$layer->set("labelsizeitem",$labelsizeitem);
	$layer->set("maxscale",$maxscale);
	$layer->set("minscale",$minscale);
	$cor = $layer->offsite;
	$c = explode(",",$offsite);
	if(count($c) < 3)
	$c = explode(" ",$offsite);
	$cor->setrgb($c[0],$c[1],$c[2]);
	$layer->offsite->red.",".$layer->offsite->green.",".$layer->offsite->blue;
	$layer->set("opacity",$opacity);
	$layer->set("symbolscale",$symbolscale);
	$layer->set("tolerance",$tolerance);
	$layer->set("toleranceunits",$toleranceunits);
	$layer->set("status",$status);
	$layer->set("sizeunits",$sizeunits);
	
	if($layer->getprojection() == MS_TRUE)
	$layer->setprojection($projection);
	if($layer->getprojection() == MS_FALSE && $projection != "")
	$layer->setprojection($projection);
	
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";	
}
function pegaClasseGeral()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($indiceClasse);
	$dados["name"] = $classe->name;
	$dados["expression"] = $classe->getExpression();
	$dados["keyimage"] = $classe->keyimage;
	$dados["maxscale"] = $classe->maxscale;
	$dados["minscale"] = $classe->minscale;
	$dados["status"] = $classe->status;
	$dados["text"] = $classe->getTextString();
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$dados["indiceClasse"] = $indiceClasse;
	$colunas = "";
	if($layer->type < 3)
	{
		if(@$layer->open())
		{
			$layer->open();
			$colunas = implode(", ",$layer->getitems());
			$layer->close();
		}
	}
	return $dados;
}
function alterarClasseGeral()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$locaplic,$status,$minscale,$maxscale,$name,$expression,$keyimage;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($indiceClasse);
	$classe->set("name",$name);
	$classe->setexpression($expression);
	$classe->set("keyimage",$keyimage);
	$classe->set("maxscale",$maxscale);
	$classe->set("minscale",$minscale);
	$classe->set("status",$status);
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}
function pegaClasseLabel()
{
	global $codigoMap,$codigoLayer,$indiceClasse,$locaplic;
	$dados = array();
	$mapfile = $locaplic."/temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($indiceClasse);
	$label = $classe->label;
	if ($label != "")
	{
		$dados["font"] = $label->font;
		$dados["type"] = $label->type;
		$dados["backgroundcolor"] = $label->backgroundcolor->red.",".$label->backgroundcolor->green.",".$label->backgroundcolor->blue;
		$dados["backgroundshadowcolor"] = $label->backgroundshadowcolor->red.",".$label->backgroundshadowcolor->green.",".$label->backgroundshadowcolor->blue;
		$dados["color"] = $label->color->red.",".$label->color->green.",".$label->color->blue;
		$dados["outlinecolor"] = $label->outlinecolor->red.",".$label->outlinecolor->green.",".$label->outlinecolor->blue;
		$dados["shadowcolor"] = $label->shadowcolor->red.",".$label->shadowcolor->green.",".$label->shadowcolor->blue;
		$dados["shadowsizex"] = $label->shadowsizex;
		$dados["shadowsizey"] = $label->shadowsizey;
		$dados["backgroundshadowsizex"] = $label->backgroundshadowsizex;
		$dados["backgroundshadowsizey"] = $label->backgroundshadowsizey;
		$dados["size"] = $label->size;
		$dados["minsize"] = $label->minsize;
		$dados["maxsize"] = $label->maxsize;
		$dados["position"] = $label->position;
		$dados["offsetx"] = $label->offsetx;
		$dados["offsety"] = $label->offsety;
		$dados["angle"] = $label->angle;
		$dados["autoangle"] = $label->autoangle;
		$dados["buffer"] = $label->buffer;
		$dados["antialias"] = $label->antialias;
		$dados["wrap"] = $label->wrap;
		$dados["minfeaturesize"] = $label->minfeaturesize;
		$dados["autominfeaturesize"] = $label->autominfeaturesize;
		$dados["mindistance"] = $label->mindistance;
		$dados["partials"] = $label->partials;
		$dados["force"] = $label->force;
		$dados["encoding"] = $label->encoding;		
	}
	$dados["codigoMap"] = $codigoMap;
	$dados["codigoLayer"] = $codigoLayer;
	$dados["indiceClasse"] = $indiceClasse;
	$colunas = "";
	if($layer->type < 3)
	{
		if(@$layer->open())
		{
			$layer->open();
			$colunas = implode(", ",$layer->getitems());
			$layer->close();
		}
	}
	return $dados;
}


















function pegaFontes()
{
	$arq = "../../symbols/fontes.txt";
	$h = fopen ($arq,"r");
	while ($i = fscanf ($h, "%s\t%s\t"))
	{
		list ($f,$g) = $i;
		$nome[] = $f;
	}
	return $nome;
}
function alteraEstilo()
{
	global $codigoMap,$codigoLayer,$classe,$estilo,$parametro,$valor;
	$mapfile = "../../temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($classe);
	$estilo = $classe->getstyle($estilo);
	$ok = false;
	$cor = "";
	switch ($parametro)
	{
		case "backgroundcolor":
		$cor = $estilo->backgroundcolor;
		$ok = true;
		break;
		case "color":
		$cor = $estilo->color;
		$ok = true;
		break;
		case "outlinecolor":
		$cor = $estilo->outlinecolor;
		$ok = true;
		break;
		default:
		if(!$ok)$estilo->set($parametro,$valor);
	}
	if ($cor != "")
	{
		$c = explode(",",$valor);
		if(count($c) < 3)
		$c = explode(" ",$valor);
		$cor->setrgb($c[0],$c[1],$c[2]);		
	}
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}

function alteraClasseLabel()
{
	global $codigoMap,$codigoLayer,$classe,$parametro,$valor;
	$mapfile = "../../temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$classe = $layer->getclass($classe);
	$label = $classe->label;
	$ok = false;
	$cor = "";
	switch ($parametro)
	{
		case "backgroundcolor":
		$cor = $label->backgroundcolor;
		$ok = true;
		break;
		case "backgroundshadowcolor":
		$cor = $label->backgroundshadowcolor;
		$ok = true;
		break;
		case "color":
		$cor = $label->color;
		$ok = true;
		break;
		case "outlinecolor":
		$cor = $label->outlinecolor;
		$ok = true;
		break;
		case "shadowcolor":
		$cor = $label->shadowcolor;
		$ok = true;
		break;
		case "shadowsizex":
		$cor = $label->shadowsizex;
		$ok = true;
		break;
		case "shadowsizey":
		$cor = $label->shadowsizey;
		$ok = true;
		break;
		case "backgroundshadowsizex":
		$cor = $label->backgroundshadowsizex;
		$ok = true;
		break;
		case "backgroundshadowsizey":
		$cor = $label->backgroundshadowsizey;
		$ok = true;
		break;
		default:
		if(!$ok)$label->set($parametro,$valor);
	}
	if ($cor != "")
	{
		$c = explode(",",$valor);
		if(count($c) < 3)
		$c = explode(" ",$valor);
		$cor->setrgb($c[0],$c[1],$c[2]);
	}
	$mapa->save($mapfile);
	removeCabecalho($mapfile);
	return "ok";
}

function removeCabecalho($arq)
{
	global $postgis_mapa;
	restauraCon($arq,$postgis_mapa);
	$handle = fopen($arq, "r");
	if ($handle)
	{
    	$final[] = "SYMBOLSET ../symbols/simbolos.sym\n";
    	$final[] = "FONTSET   ".'"'."../symbols/fontes.txt".'"'."\n";
    	$grava = false;
    	while (!feof($handle)) 
    	{
        	$linha = fgets($handle);
        	if(strtoupper(trim($linha)) == "LAYER")
        	{$grava = true;}
        	if($grava)
        	{$final[] = rtrim($linha, "\r\n") . PHP_EOL;}//$linha."\n";}
    	}
    	fclose($handle);
	}
	$handle = fopen($arq, "w+");
	foreach ($final as $f)
	{
		if(($f != "") && ($f != 'FILTERITEM ""') && ($f != 'LABELITEM ""'))
		fwrite($handle,$f);
	}
	fclose($handle);
}

function pegaDadosEstilo()
{
	global $codigoMap,$codigoLayer;
	$dados = array();
	$mapfile = "../../temas/".$codigoMap.".map";
	$mapa = ms_newMapObj($mapfile);
	$layer = $mapa->getlayerbyname($codigoLayer);
	$nclasses = $layer->numclasses;
	for($i=0;$i<$nclasses;++$i)
	{
		$classe = $layer->getclass($i);
		$numestilos = $classe->numstyles;
		$estilos = array();
		for($j=0;$j<$numestilos;++$j)
		{
			$estilo = $classe->getstyle($j);
			$temp["symbolname"] = $estilo->symbolname;
			$temp["color"] = $estilo->color->red.",".$estilo->color->green.",".$estilo->color->blue;
			$temp["size"] = $estilo->size;
			$temp["minsize"] = $estilo->minsize;
			$temp["maxsize"] = $estilo->maxsize;
			$temp["offsetx"] = $estilo->offsetx;
			$temp["offsety"] = $estilo->offsety;
			$temp["antialias"] = $estilo->antialias;
			$temp["backgroundcolor"] = $estilo->backgroundcolor->red.",".$estilo->backgroundcolor->green.",".$estilo->backgroundcolor->blue;
			$temp["outlinecolor"] = $estilo->outlinecolor->red.",".$estilo->outlinecolor->green.",".$estilo->outlinecolor->blue;
			$temp["width"] = $estilo->width;
			$temp["minwidth"] = $estilo->minwidth;
			$temp["maxwidth"] = $estilo->maxwidth;
			$temp["angle"] = $estilo->angle;
			$temp["angleitem"] = $estilo->angleitem;  
			$temp["sizeitem"] = $estilo->sizeitem;
			$temp["minvalue"] = $estilo->minvalue;
			$temp["maxvalue"] = $estilo->maxvalue;
			$estilos[] = array("estilo"=>$j,"dados"=>$temp);
		}
		$dados[] = array("classe"=>$i,"estilos"=>$estilos);
	}
	return $dados;
}

?>