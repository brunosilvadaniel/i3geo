<?php
include_once (dirname(__FILE__)."/../../classesphp/sani_request.php");
$_GET = array_merge($_GET,$_POST);
require_once(dirname(__FILE__)."/../../classesphp/funcoes_gerais.php");
include_once (dirname(__FILE__)."/../../classesphp/carrega_ext.php");
session_name("i3GeoPHP");
if (isset($_GET["g_sid"]))
{session_id($_GET["g_sid"]);}
session_start();
$map_file = $_SESSION["map_file"];
$postgis_mapa = $_SESSION["postgis_mapa"];
if (ob_get_level() == 0) ob_start();
?>
<html>
<head>
<link rel="stylesheet" type="text/css" href="../../css/input.css" />
<link rel="stylesheet" type="text/css" href="../../css/geral.css" />
<title></title>
</head>
<body bgcolor="white" style="background-color:white;text-align:left;">
<p>
<?php
if (isset($_FILES['i3GEOuploaddbffile']['name']))
{
	//$ndir = dirname($filen);
	require_once (dirname(__FILE__)."/../../ms_configura.php");
	$mapa = ms_newMapObj($map_file);
	echo "<p class='paragrafo'>Carregando o arquivo...</p>";
	ob_flush();
	flush();
	sleep(1);
	$dirmap = dirname($map_file);
	//verifica nomes
	$ArquivoDest = $_FILES['i3GEOuploaddbffile']['name'];
	if($i3GEOuploaddbftipoarquivo != "dbf"){
		$ArquivoDest = str_replace(".csv","",$ArquivoDest).".csv";
	}
	else{
		$ArquivoDest = str_replace(".dbf","",$ArquivoDest).".dbf";
	}
	verificaNome($ArquivoDest);
	verificaNome($_FILES['i3GEOuploaddbffile']['name']);
	//sobe arquivo
	$Arquivo = $_FILES['i3GEOuploaddbffile']['tmp_name'];
	$status =  move_uploaded_file($Arquivo,$dirmap."/".$ArquivoDest);
	if($status != 1)
	{echo "Ocorreu um erro no envio do arquivo";paraAguarde();exit;}
	$nome = explode(".",$ArquivoDest);
	$nome = $nome[0];
	$nome = $nome."_".(nomeRandomico(4));
	$nomeshp = $dirmap."/".$nome.".shp";
	if($status == 1)
	{
		if(!isset($tema)) //o arquivo dever&aacute; ser transformado em uma camada no mapa
		{
			$nomex = strtoupper($i3GEOuploaddbfnomex);
			$nomey = strtoupper($i3GEOuploaddbfnomey);
			//converte de csv para dbf
			if($i3GEOuploaddbftipoarquivo != "dbf"){
				if($i3GEOuploaddbftipoarquivo == "csvpv"){$separador = ";";}
				if($i3GEOuploaddbftipoarquivo == "csvv"){$separador = ",";}
				include_once dirname(__FILE__)."/../../pacotes/phpxbase/api_conversion.php";
				include_once(dirname(__FILE__)."/../../pacotes/parsecsv/parsecsv.lib.php");
				$csv = new parseCSV();
				$csv->delimiter = $separador;
				$dados = $csv->parse($dirmap."/".$_FILES['i3GEOuploaddbffile']['name']);
				$conta = 0;
				$xy = array();
				$colunas = array_keys($csv->data[0]);
				foreach($colunas as $i){
					$i = strtoupper($i);
					$i = trim($i);
					if(($i != $nomex) && ($i != $nomey)){
						$i = str_replace("_","",$i);
						$i = str_replace("-","",$i);
						if(strlen($i) > 10){
							$i= substr($i, 0, 7).$conta++;
						}
						$def[] = array($i,"C","255");
					}
					else{
						$def[] = array($i,"C","255");
					}
				}
				if(!function_exists("dbase_create")){
					xbase_create($dirmap."/".$nome.".dbf", $def);
				}
				else{
					dbase_create($dirmap."/".$nome.".dbf", $def);
				}
				$db=xbase_open($dirmap."/".$nome.".dbf",2);
				foreach($csv->data as $d){
					$reg = array();
					foreach($d as $i){
						$reg[] = $i;
					}
					xbase_add_record($db,$reg);
				}
				xbase_close($db);
			}
			else{
				copy($dirmap."/".$_FILES['i3GEOuploaddbffile']['name'],$dirmap."/".$nome.".dbf");
			}
			echo "<p class='paragrafo'>Arquivo enviado. Criando shape file...$nomeshp </p>";
			ob_flush();
			flush();
			sleep(1);
			$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POINT);
			$novoshpf->free();
			if(!file_exists($nomeshp)){
				echo "<p class='paragrafo'>Erro ao criar arquivo shapefile</p>";
				paraAguarde();
			}
			$shapefileObj = ms_newShapefileObj($nomeshp,-2);
			$i3GEOuploaddbftipoarquivo = $_GET["i3GEOuploaddbftipoarquivo"];
			$i3GEOuploaddbfnomex = $_GET["i3GEOuploaddbfnomex"];
			$i3GEOuploaddbfnomey = $_GET["i3GEOuploaddbfnomey"];

			if($i3GEOuploaddbftipoarquivo != "dbf"){
				foreach($csv->data as $d){
					$poPoint = ms_newpointobj();
					$poPoint->setXY($d[$i3GEOuploaddbfnomex],$d[$i3GEOuploaddbfnomey]);
					$shapefileObj->addpoint($poPoint);
				}
			}
			else
			{
				require_once(dirname(__FILE__)."/../../pacotes/phpxbase/api_conversion.php");
				echo "<p class='paragrafo'>Lendo arquivo ".$dirmap."/".$_FILES['i3GEOuploaddbffile']['name']."</p>";
				$dbf = xbase_open($dirmap."/".$_FILES['i3GEOuploaddbffile']['name']);
				$records = xbase_numrecords($dbf);
				echo "<p class='paragrafo'>Numero de pontos: $records</p>";
				ob_flush();
				flush();
				sleep(1);
				$record = array();
				for($x = 1; $x <= $records; $x++)
				{
					$record = xbase_get_record_with_names($dbf, $x);
					$poPoint = ms_newpointobj();
					$poPoint->setXY($record[$nomex],$record[$nomey]);
					$shapefileObj->addpoint($poPoint);
				}
			}
			$shapefileObj->free();
			$novolayer = ms_newLayerObj($mapa);
			$novolayer->set("data",$nomeshp);
			$novolayer->set("name",basename($nomeshp));
			$novolayer->setmetadata("TEMA",basename($nomeshp));
			$novolayer->setmetadata("DOWNLOAD","SIM");
			$novolayer->setmetadata("TEMALOCAL","SIM");
			$novolayer->setmetadata("CLASSE","SIM");
			$novolayer->setmetadata("TEXTO","NAO");
			$novolayer->set("type",MS_LAYER_POINT);
			$novolayer->setfilter("");
			$classe = ms_newClassObj($novolayer);
			$classe->set("name","");
			$estilo = ms_newStyleObj($classe);
			$estilo->color->setrgb(200,50,0);
			$estilo->outlinecolor->setrgb(0,0,0);
			$estilo->set("symbolname","ponto");
			$estilo->set("size",6);
			// le os itens
			$novolayer->set("status",MS_DEFAULT);
			$abriu = $novolayer->open();
			$items = $novolayer->getItems();
			$fechou = $novolayer->close();
			if ($items != "")
			{
				$its = implode(",",$items);
				$novolayer->setmetadata("ITENS",$its);
				$novolayer->setmetadata("ITENSDESC",$its);
				$novolayer->set("template","none.htm");
			}
			if(isset($uploaddbfEPSG) && $uploaddbfEPSG != "")
			{$novolayer->setProjection("init=epsg:".$uploaddbfEPSG);}
			$salvo = $mapa->save($map_file);
			echo "<b>Tema criado!!!";
			echo "<script>window.scrollTo(0,10000);window.parent.i3GEO.atualiza()</script>";
		}
	}
	else
	{
		echo "<p>Erro ao enviar o arquivo.</p>";
		paraAguarde();
	}
}
paraAguarde();
function paraAguarde(){
	echo "<script>window.scrollTo(0,10000);window.parent.i3GEOF.uploaddbf.aguarde.visibility='hidden';</script>";
}
function verificaNome($nome)
{
	$nome = strtolower($nome);
	$lista = explode(".",$nome);
	$extensao = $lista[count($lista) - 1];
	if(($extensao != "dbf") && ($extensao != "csv") && ($extensao != "txt"))
	{
		echo "Nome de arquivo inv&aacute;lido";
		paraAguarde();
		exit;
	}
}
?>
</body>
</html>