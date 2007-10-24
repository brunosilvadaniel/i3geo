<?php
/*
Title: OGC

Faz a leitura e o processamento de web services nos padr�es OGC.
Atualmente, processa apenas servi�os no padr�o WMS.

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

File: wmswfs.php

19/6/2007
*/
/*
function: existeTemaWFS

Verifica se existe um tema em um servico WFS processando o getcapabilities.

parameters:
$wfs - endere�o do servi�o

$tema - tema que ser� verificado
*/
function existeTemaWFS()
{
	global $wfs,$tema;
	$capabilities = implode("",$wfs);
	$dom = new DomDocument();
	$dom->loadXML($capabilities);
	$xpath = new DOMXPath($dom);
	$query = '//WFS_Capabilities/FeatureTypeList/FeatureType';
	$entries = $xpath->query($query);
	foreach($entries as $e)
	{
		$e->getElementsByTagName("Name");
		$n = $e->nodeValue;
		if ($n == $tema)
		{return "sim";}
	}
	return "nao";
}
/*
function: existeWFS

Verifica se existe um servico WFS invocando o getcapabilities.

parameters:
$servico - endere�o do servi�o
*/
function existeWFS()
{
	global $servico;
	$teste = explode("=",$servico);
	if ( count($teste) > 1 ){$servico = $servico."&";}
	$wms_service_request = $servico . "REQUEST=GetCapabilities&SERVICE=WFS";
	# -------------------------------------------------------------
	# Test that the capabilites file has successfully downloaded.
	#
	if( !($wfs_capabilities = file($wms_service_request)) ) {
		# Cannot download the capabilities file.
		return "nao";
	}
	else
	{return $wfs_capabilities;}
}
/*
function: getcapabilities

Chama a fun��o getcapabilities e retorna o resultado.

parameters:
$servico - Endere�o do web service.

$cp - Objeto CPAINT.
*/
function getcapabilities()
{
	global $servico,$cp;
	$teste = explode("=",$servico);
	if ( count($teste) > 1 ){$servico = $servico."&";}
	$wms_service_request = $servico . "REQUEST=GetCapabilities&SERVICE=WMS&version=1.1.0";
	# -------------------------------------------------------------
	# Test that the capabilites file has successfully downloaded.
	#
	if( !($wms_capabilities = file($wms_service_request)) ) {
		# Cannot download the capabilities file.
		$cp->set_data("Erro de acesso");
		return;
	}
	$wms_capabilities = implode("",$wms_capabilities);
	$cp->set_data(xml2html($wms_capabilities));
}
/*
function: getcapabilities2

Chama a fun��o getcapabilities e retorna o resultado formatado (WMS).

parameters:
$servico - Endere�o do web service.

$cp - Objeto CPAINT.
*/
function getcapabilities2()
{
	global $servico,$cp;
	$teste = explode("=",$servico);
	if ( count($teste) > 1 ){$servico = $servico."&";}
	$wms_service_request = $servico . "REQUEST=GetCapabilities&SERVICE=WMS&version=1.1.0";
	# -------------------------------------------------------------
	# Test that the capabilites file has successfully downloaded.
	#
	if( !($wms_capabilities = file($wms_service_request)) ) {
		# Cannot download the capabilities file.
		$cp->set_data("Erro de acesso");
		return;
	}
	$wms_capabilities = implode("",$wms_capabilities);
	$dom = new DomDocument();
	$dom->loadXML($wms_capabilities);
	$xpath = new DOMXPath($dom);
	$retorno = "";
	$query = '//WMT_MS_Capabilities/Service/Name';
	$entries = $xpath->query($query);
	$temp = "";
	foreach ($entries as $entry){$temp .= $entry->nodeValue;}
	$retorno .= "<b>Nome: </b>".$temp;

	$query = '//WMT_MS_Capabilities/Service/Title';
	$entries = $xpath->query($query);
	$temp = "";
	foreach ($entries as $entry){$temp .= $entry->nodeValue;}
	$retorno .= "<br><br><b>T&iacute;tulo: </b>".$temp;

	$query = '//WMT_MS_Capabilities/Service/Abstract';
	$entries = $xpath->query($query);
	$temp = "";
	foreach ($entries as $entry){$temp .= $entry->nodeValue;}
	$retorno .= "<br><br><b>Resumo: </b>".$temp;

	$query = '//WMT_MS_Capabilities/Service/KeywordList';
	$entries = $xpath->query($query);
	$temp = "";
	foreach ($entries as $entry){$temp .= $entry->nodeValue.".";}
	$retorno .= "<br><br><b>Palavras-chave: </b>".$temp;

	$query = '//WMT_MS_Capabilities/Service/ContactInformation';
	$entries = $xpath->query($query);
	$temp = "";
	foreach ($entries as $entry){$temp .= $entry->nodeValue.".";}
	$retorno .= "<br><br><b>Contato: </b>".$temp;

	$cp->set_data($retorno);
}
/*
function: getcapabilities3

Chama a fun��o getcapabilities e retorna o resultado formatado (WFS).

parameters:

$servico - Endere�o do web service.

$cp - Objeto CPAINT.
*/
function getcapabilities3()
{
	global $servico,$cp;
	$teste = explode("=",$servico);
	if ( count($teste) > 1 ){$servico = $servico."&";}
	$wms_service_request = $servico . "request=getcapabilities&service=wfs&version=1.0.0";
	# -------------------------------------------------------------
	# Test that the capabilites file has successfully downloaded.
	#
	if( !($wms_capabilities = file($wms_service_request)) ) {
		# Cannot download the capabilities file.
		$cp->set_data("Erro de acesso");
		return;
	}
	$wms_capabilities = implode("",$wms_capabilities);
	$dom = new DomDocument();
	$dom->loadXML($wms_capabilities);
	$retorno = "";
	$services = $dom->getElementsByTagName("Service");
	foreach ($services as $service)
	{
		$vs = $service->getElementsByTagName("Name");
		$temp = "";
		foreach ($vs as $v)
		{$temp .= $v->nodeValue;}
		$retorno .= "<b>Nome: </b>".$temp;
		$vs = $service->getElementsByTagName("Title");
		$temp = "";
		foreach ($vs as $v)
		{$temp .= $v->nodeValue;}
		$retorno .= "<br><br><b>T&iacute;tulo: </b>".$temp;
	}
	$cp->set_data($retorno);
}
/*
function: temaswms

Lista os temas de um web service WMS.

parameters:

$servico - Endere�o do web service.

$cp - Objeto CPAINT.
*/
function temaswms()
{
	global $servico,$cp;
	$teste = explode("=",$servico);
	if ( count($teste) > 1 ){$servico = $servico."&";}
	$wms_service_request = $servico . "REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.1.1";
	# -------------------------------------------------------------
	# Test that the capabilites file has successfully downloaded.
	#
	if( !($wms_capabilities = file($wms_service_request)) ) {
		# Cannot download the capabilities file.
		$cp->set_data("Erro de acesso");
		return;
	}
	$wms_capabilities = implode("",$wms_capabilities);
	$dom = new DomDocument();
	$dom->loadXML($wms_capabilities);
	$layers = wms_layers($dom);
	$xpath = new DOMXPath($dom);
	//verifica sld
	$query = '//WMT_MS_Capabilities/Capability/UserDefinedSymbolization';
	$entries = $xpath->query($query);
	foreach($entries as $e)
	{$n = $e->getAttribute("SupportSLD");}
	$suporta = "nao";
	if ($n == 1){$suporta = "sim";}
	
	$query = '//WMT_MS_Capabilities/Capability/Layer/Layer/Style';
	$entries = $xpath->query($query);
	$nums = $entries->length;
	if ($entries->length > 0)
	{
	 	 $query = '//WMT_MS_Capabilities/Capability/Layer';
		 $entries = $xpath->query($query);	 	 
	}
	$tval = "";
	foreach ($layers as $layer)
	{
		$noslayer = $layer->childNodes;
		for ($i = 0; $i < $noslayer->length; $i++)
		{
			$tnome = $noslayer->item($i)->tagName;
			$tvalor = $noslayer->item($i)->nodeValue;
			if ($tnome == "Title")
			{$retorna[] = "<b>Titulo da camada: ".$tvalor."</b><br><br>Sub-camadas:<br><br>";}
			if ($tnome == "Layer")
			{
				$retorna[] = "<hr>";
				$sublayers = $noslayer->item($i)->childNodes;
				for ($j = 0; $j < $sublayers->length; $j++)
				{
					$tnome = $sublayers->item($j)->tagName;
					$tvalor = $sublayers->item($j)->nodeValue;
					if ($tnome != "Style")
					{
						$ns = "";
						if ($tnome == "Name")
						{$retorna[] = "<br><b>Nome: </b>".$tvalor;$tval = $tvalor;}
						if ($tnome == "Title")
						{
							$retorna[] = "<br><span style=color:red ><b>Titulo: </b>".$tvalor."</span><br>";
							$nomecamada = $tvalor;
						}
						if ($tnome == "Abstract")
						{$retorna[] = "<b>Resumo: </b>".$tvalor."<br><br>Estilos:<br><br>";}
					}
					else
					{
						$estilos = $sublayers->item($j)->childNodes;
						for ($k = 0; $k < $estilos->length; $k++)
						{
							$nomeestilo = "";
							$tituloestilo = "";
							if ($estilos->item($k)->tagName == "Name")
							{$nomeestilo = $estilos->item($k)->nodeValue;}
							if ($estilos->item($k)->tagName == "Title")
							{
								$tituloestilo = $estilos->item($k)->nodeValue;
								$nomecamada = $tituloestilo;
							}
							$tituloestilo = $estilos->item($k + 2)->nodeValue;
							if ($nomeestilo != "")
							{
								$retorna[] = "<input style='cursor:pointer' type=radio NAME='checks' onClick='seltema(\"estilo\",\"" . $tval . "\",\"\",\"" . $nomeestilo . "\",\"".$nomecamada."\",\"".$suporta."\")' value='" . $nomeestilo . "'/>" . $nomeestilo." <i>".$tituloestilo."</i><br>";
							}
						}
					}
				}
				if ($nums == 0)
				{
					if ($tituloestilo == "")
					{$tituloestilo = "default";}
					$retorna[] = "<input style='cursor:pointer' type=radio NAME='checks' onClick='seltema(\"tema\",\"" . $tval . "\",\"\",\"" . $tituloestilo . "\",\"".$nomecamada."\",\"".$suporta."\")' value='" . $tval . "'/>" . $nomeestilo." ".$tituloestilo."<br>";
				}
			}
		}
	}
	$retorna[] = "<br>Proj.:<input size=30 id=proj type=text class=digitar value='".implode(",",wms_srs($dom))."'/><br>";
	$retorna[] = "<br>Formatos imagem:<input size=30 id=formatos type=text class=digitar value='".implode(",",wms_formats($dom))."'/><br><br>";
	$retorna[] = "<br>Formatos info:<input size=30 id=formatosinfo type=text class=digitar value='".implode(",",wms_formatsinfo($dom))."'/><br><br>";
	$retorna[] = "<br>Versao:<input size=30 id=versao type=text class=digitar value='".(wms_version($dom))."'/><br><br>";
	$retorna[] = "<br>Suporta SLD:<input size=30 id=suportasld type=text class=digitar value='".$suporta."'/><br><br><br>";
	$cp->set_data(implode($retorna));
}

/*
function: temaswfs

Lista os temas de um web service WFS.

parameters:
$servico - Endere�o do web service.

$cp - Objeto CPAINT.
*/
function temaswfs()
{
	global $servico,$cp;
	$teste = explode("=",$servico);
	if ( count($teste) > 1 ){$servico = $servico."&";}
	$wms_service_request = $servico . "REQUEST=GetCapabilities&SERVICE=WFS";
	# -------------------------------------------------------------
	# Test that the capabilites file has successfully downloaded.
	#
	if( !($wms_capabilities = file($wms_service_request)) ) {
		# Cannot download the capabilities file.
		$cp->set_data("Erro de acesso");
		return;
	}
	$wms_capabilities = implode("",$wms_capabilities);
	$dom = new DomDocument();
	$dom->loadXML($wms_capabilities);
	$services = $dom->getElementsByTagName("Service");
	foreach ($services as $service)
	{
		$vs = $service->getElementsByTagName("Name");
		$serv = "";
		foreach ($vs as $v)
		{$serv .= $v->nodeValue;}
	}	
	$layers = $dom->getElementsByTagName("FeatureType");
	foreach ($layers as $layer)
	{
		$vs = $layer->getElementsByTagName("Title");
		$temp1 = "";
		foreach ($vs as $v)
		{$temp1 .= $v->nodeValue;}
		
		$vs = $layer->getElementsByTagName("Abstract");
		$temp2 = "";
		foreach ($vs as $v)
		{$temp2 .= $v->nodeValue;}
		
		$vs = $layer->getElementsByTagName("SRS");
		$temp3 = array();
		foreach ($vs as $v)
		{$temp3[] = $v->nodeValue;}
		$temp3 = implode("#",$temp3);

		$vs = $layer->getElementsByTagName("Name");
		$temp = "";
		foreach ($vs as $v)
		{$temp .= $v->nodeValue;}
		$temp = "<input style='cursor:pointer' type=radio NAME='checks' onClick='seltema(\"" . $temp . "\",\"" .$temp1. "\",\"" . $temp3 . "\",\"" . $serv ."\")' /><span style=color:red >" . $temp . "</span><br>";		
		$retorno .= "<br>".$temp.$temp1."<br>".$temp2."<hr>";
	}
	$cp->set_data($retorno);
}
/*
function: xml2html

Converte caracteres XML em HTML.

parameters:

$str - Xml.
*/
function xml2html ( $str )
{
	$str = ereg_replace("&","&amp;",$str);
	$str = ereg_replace("<","&lt;",$str);
	$str = ereg_replace(">","&gt;<BR>",$str);
	return $str;
}
/*
function: wms_descricao

Retorna a descri��o de um servi�o (n�).
*/
function wms_descricao ( $dom,$xp )
{
	$xpath = new DOMXPath($dom);
	$query = $xp;
	$entries = $xpath->query($query);
	$n = "";
	foreach ($entries as $entry)
	{
		$n = $entry->nodeValue;
	}
	return $n;
}
/*
function: wms_descricaov

Retorna a descri��o de um servi�o (atributo).
*/
function wms_descricaov ( $dom,$xp,$attrib )
{
	$xpath = new DOMXPath($dom);
	$query = $xp;
	$entries = $xpath->query($query);
	$n = "";
	foreach ($entries as $entry)
	{
		$n = $entry->getAttribute($attrib);
	}
	return $n;
}
/*
function: wms_descricaon

Retorna a descri��o de um servi�o (filho de um n�).
*/
function wms_descricaon ( $dom,$xp,$n ) {
	$ctx = xpath_new_context($dom);
	$xpnode = xpath_eval($ctx,$xp);
	$dtnode = $xpnode->nodeset[$n]->first_child();
	return $dtnode->content;
}
/*
function: wms_title

Retorna o t�tulo de um WMS.
*/
function wms_title ( $dom ) {
	#
	# Read the WMS service title and return it as text.
	#
	$xpath = new DOMXPath($dom);
	$query = '//WMT_MS_Capabilities/Service/Title';
	$entries = $xpath->query($query);
	foreach ($entries as $entry){$nomeserv = $entry->nodeValue;}
	return $nomeserv;
}
/*
function: wms_onlineresource

Retorna o recurso on-line de um WMS.
*/
function wms_onlineresource ( $dom ) {
	#
	# Read the WMS online resource URL and return it as text.
	#
	$xp = "/WMT_MS_Capabilities/Service/OnlineResource";
	$ctx = xpath_new_context($dom);
	$xpnode = xpath_eval($ctx,$xp);
	return $xpnode->nodeset[0]->get_attribute("href");
}
/*
function: wms_formats

Retorna os formatos de imagem de um WMS.
*/
function wms_formats ( $dom )
{
	$xpath = new DOMXPath($dom);
	$query = '//WMT_MS_Capabilities/Capability/Request/GetMap/Format';
	$entries = $xpath->query($query);
	$arr = array();
	foreach ($entries as $entry)
	{
		$arr[] = $entry->nodeValue;
	}
	return $arr;
}
/*
function: wms_formatsinfo

Retorna os formatos existentes de retorno da op��o getfeatureinfo.
*/
function wms_formatsinfo ( $dom )
{
	$xpath = new DOMXPath($dom);
	$query = '//WMT_MS_Capabilities/Capability/Request/GetFeatureInfo/Format';
	$entries = $xpath->query($query);
	$arr = array();
	foreach ($entries as $entry)
	{
		$arr[] = $entry->nodeValue;
	}
	return $arr;
}
/*
function: wms_estilos

Retorna os estilos de um WMS.
*/
function wms_estilos ( $dom ) {
	#
	# Read the WMS image formats and return them as an array.
	#
	//$xp = "/Style";
	//$ctx = xpath_new_context($dom);
	//$xpnode = xpath_eval($ctx,$xp);
	//return $xpnode->nodeset;
	$return = $dom->getElementsByTagName("Style");

}
/*
function: wms_exceptions

Retorna as exceptions de um WMS.
*/
function wms_exceptions ( $dom ) {
	#
	# Read the WMS exception formats and return them as an array.
	#
	$xp = "/WMT_MS_Capabilities/Capability/Exception/Format";
	$ctx = xpath_new_context($dom);
	$xpnode = xpath_eval($ctx,$xp);
	$arr = array();
	for( $i = 0; $i < sizeof($xpnode->nodeset); $i++ ) {
		$dtnode = $xpnode->nodeset[0]->first_child();
		array_push($arr,$dtnode->content);
	}
	return $arr;
}
/*
function: wms_version

Retorna a versao.
*/
function wms_version ( $dom )
{
	$n = $dom->getElementsByTagName('WMT_MS_Capabilities');
	$params = $dom->getElementsByTagName('*');

	foreach ($params as $param) {
		$v = $param -> getAttribute('version');
		break;
	}
	return $v;
}
/*
function: wms_layers

Retorna os layers de um WMS.
*/
function wms_layers ( $dom ) {
	#
	# Read the WMS first level layers and return an
	# array of nodes.
	#
	$xpath = new DOMXPath($dom);
	$query = '//WMT_MS_Capabilities/Capability/Layer/Layer/Layer';
	$entries = $xpath->query($query);
	if ($entries->length == 0)
	{
		$query = '//WMT_MS_Capabilities/Capability/Layer';
		$entries = $xpath->query($query);		
	}
	else
	{
		$query = '//WMT_MS_Capabilities/Capability/Layer/Layer';
		$entries = $xpath->query($query);		
	}
	return $entries;
}
/*
function: wms_xpnode2content

Read the content child node of an element tag node WMS.
*/
function wms_xpnode2content( $xp_node ) {
	#
	# Read the content child node of an element tag
	# node.
	#
	$content = "";
	if( $xp_node->nodeset[0] ) {
		$node = $xp_node->nodeset[0]->first_child();
		$content = $node->content;
	}
	return $content;
}
/*
function: wms_srs

Retorna os SRSs WMS.
*/
function wms_srs( $dom )
{
	$xpath = new DOMXPath($dom);
	$query = '//WMT_MS_Capabilities/Capability/Layer/SRS';
	$entries = $xpath->query($query);
	$srs = "";
	//utiliza apenas os epsg do Brasil
	$single = array();
	foreach ($entries as $entry)
	{
		$arr[] = $entry->nodeValue;
		if ($entry->nodeValue == "EPSG:4326")
		{$single[] = "EPSG:4326";}
		if ($entry->nodeValue == "EPSG:4291")
		{$single[] = "EPSG:4291";}
	}
	if (count($single) > 0)
	{$arr = $single;}
	return $arr;
}
/*
function: wms_bbox

Retorna o BBOX de um WMS.
*/
function wms_bbox( $dom )
{
	$xpath = new DOMXPath($dom);
	$query = '//WMT_MS_Capabilities/Capability/Layer/LatLonBoundingBox';
	$entries = $xpath->query($query);
	foreach ($entries as $entry){$bbox = $entry->nodeValue;}
	if ($bbox == '-1,-1,-1,-1')
	{return '-180,-90,180,90';}
	else
	{return wms_bbox2txt($bbox);}
}
/*
function: wms_bbox2txt

Convert a BoundingBox node into a text string de um wms.
*/
function wms_bbox2txt( $node ) {
	#
	# Convert a BoundingBox node into a text string.
	#
	if( $node ) {
		$txt .= 1 * $node->get_attribute("minx");
		$txt .= ",";
		$txt .= 1 * $node->get_attribute("miny");
		$txt .= ",";
		$txt .= 1 * $node->get_attribute("maxx");
		$txt .= ",";
		$txt .= 1 * $node->get_attribute("maxy");
	}
	else {
		$txt = "-180,-90,180,90";
	}
	return $txt;
}
/*
function: wms_layer2html

Convert a Layer node into an HTML representation wms.
*/
function wms_layer2html( $node, $tipo , $layer ) {
	#
	# Convert a Layer node into an HTML representation.
	#
	$ctx = xpath_new_context($node);
	$xp_title  = xpath_eval($ctx,"/Title");
	$xp_name   = xpath_eval($ctx,"/Name");
	if (wms_xpnode2content($xp_name) == ""){$xp_name = xpath_eval($ctx,"/name");}
	$xp_srs    = xpath_eval($ctx,"/SRS");
	$xp_llbbox = xpath_eval($ctx,"/LatLonBoundingBox");
	$xp_bbox   = xpath_eval($ctx,"/BoundingBox");
	$txt_title = wms_xpnode2content($xp_title);
	$txt_name  = wms_xpnode2content($xp_name);
	$txt_srs   = strtoupper(wms_xpnode2content($xp_srs));
	$node_llbbox = $xp_llbbox->nodeset[0];
	$node_bbox   = $xp_bbox->nodeset[0];
	$queryable = 0;
	if ( $node->get_attribute("queryable") ) {
		$queryable = 1;
	}
	$opaque = 0;
	if ( $node->get_attribute("opaque") ) {
		$opaque = 1;
	}
	//legenda
	$xp_legenda   = xpath_eval($ctx,"/LegendURL/OnlineResource");
	$nodelegenda = $xp_legenda->nodeset[0];
	if($nodelegenda)
	{  $legenda = $nodelegenda->get_attribute("href");}

	$html  = "<INPUT TYPE='radio' NAME='checks' VALUE='$txt_name' onClick='toggle(event,\"$tipo\",\"$layer\",\"$legenda\",\"$txt_title\")'>";
	$html .= "&nbsp;&nbsp;";
	$html .= $txt_title . "\n";
	$html .= wms_hidden("bbox_$txt_name", wms_bbox2txt($node_bbox));
	$html .= wms_hidden("llbox_$txt_name", wms_bbox2txt($node_llbbox));
	$html .= wms_hidden("srs_$txt_name", $txt_srs);
	$html .= wms_hidden("query_$txt_name", $queryable );
	$html .= wms_hidden("opaque_$txt_name", $opaque );
	$html .= "<BR>";
	return $html;
}
/*
function: wms_layer3html

Convert a Layer node into an HTML representation sem radio.
*/
function wms_layer3html( $node ) {
	#
	# Convert a Layer node into an HTML representation sem radio.
	#
	$ctx = xpath_new_context($node);
	$xp_title  = xpath_eval($ctx,"/Title");
	$xp_abs  = xpath_eval($ctx,"/Abstract");
	$txt_title = wms_xpnode2content($xp_title);
	$txt_abs = wms_xpnode2content($xp_abs);
	$html .= "<b>".$txt_title . "</b><i style='color:gray'>" . "-" . $txt_abs . "</i>\n";
	$html .= "<BR>";
	return $html;
}
/*
function: wms_layer4html

Convert a Layer into an HTML WMS.
*/
function wms_layer4html( $layer ) {
	$estilos = wms_estilos($layer);
	if (count($estilos) > 0)
	{
		$ctxl = xpath_new_context($layer);
		$xp_namel   = xpath_eval($ctxl,"/Name");
		if (wms_xpnode2content($xp_namel) == ""){$xp_namel = xpath_eval($ctxl,"/name");}
		$txt_namel  = wms_xpnode2content($xp_namel);
		$html .= wms_layer3html($layer);
		foreach ($estilos as $estilo)
		{
			$html .= wms_layer2html($estilo,"estilo",$txt_namel);
		}
	}
	else
	{
		$html .= wms_layer2html($layer,"tema","");
	}
	return $html;
}
?>