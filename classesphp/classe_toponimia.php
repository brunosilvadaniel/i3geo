<?php
/*
Title: Topon�mia

Processa a topon�mia de um tema.

Adiciona, remove, altera, etc.

Cria camadas com a topon�mia e gerencia o status das etiquetas mostradas no mapa.

Abiut: Licen�a

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

File:classe_toponimia.php

19/6/2007
*/
/*
Class: Toponimia
*/

class Toponimia
{
	/*
	Variable: $mapa
	
	Objeto mapa
	*/
	protected $mapa;
	/*
	Variable: $map_file
	
	Arquivo map file
	*/
	protected $map_file;
	/*
	Variable: $layer
	
	Objeto layer
	*/
	protected $layer;
	/*
	Variable: $nome
	
	Nome do layer
	*/
	protected $nome;
/*
function __construct

Cria um objeto map e seta a variavel tema 

parameters:
$map_file - Endere�o do mapfile no servidor. 

$tema - nome do tema que ser� processado
*/
	function __construct($map_file,$tema="")
	{
  		$this->mapa = ms_newMapObj($map_file);
  		$this->arquivo = $map_file;
 		$this->layer = $this->mapa->getlayerbyname($tema);
  		$this->nome = $tema;
	}
/*
function: salva

Salva o mapfile atual 
*/		
 	function salva()
 	{
	  	$this->mapa->save($this->arquivo);
	}
/*
function: criaToponimia

Cria a topon�mia de um tema

parameter:
$item Item que ser� utilizado.

$position Posi��o da �ncora do texto.

$partials Corta texto nas bordas do mapa.

$offsetx Deslocamento em X.

$offsety Deslocamento em Y.

$minfeaturesize Tamanho m�nimo que o texto deve ter.

$mindistance Dist�ncia m�nima entre os textos.

$force For�a colis�o.

$shadowcolor Cor da sombra.

$shadowsizex Tamanho em X da sombra.

$shadowsizey Tamanho em Y da sombra.

$outlinecolor Cor do contorno.

$cor Cor do texto.

$sombray Deslocamento Y da sombra.

$sombrax Deslocamento X da sombra.

$sombra string Inclui sombra.

$fundo Cor do fundo.

$angulo �ngulo do texto.

$tamanho Tamanho do texto.

$fonte Fonte.

$tipo Tipo teste|
*/
	function criaToponimia($item,$position,$partials,$offsetx,$offsety,$minfeaturesize,$mindistance,$force,$shadowcolor,$shadowsizex,$shadowsizey,$outlinecolor,$cor,$sombray,$sombrax,$sombra,$fundo,$angulo,$tamanho,$fonte,$tipo)
	{
		if (!isset($tipo)){$tipo = "";}
		if ($item != "") //o layer nao tem tabela mas tem toponimia
		{
			$nome = pegaNome($this->layer);
			$novolayer = ms_newLayerObj($this->mapa, $this->layer);
			$nomer = nomeRandomico();
			$novolayer->set("name",$nomer);
			$novolayer->set("type",MS_LAYER_ANNOTATION);
			$nclasses = $novolayer->numclasses;
			for ($i=0; $i < $nclasses; $i++)
			{
				$c = $novolayer->getclass($i);
				$c->set("status",MS_DELETE);
			}
			$novac = ms_newClassObj($novolayer);
			$novolayer->set("status",MS_DEFAULT);
			$novolayer->set("labelitem",$item);
			$novolayer->setmetadata("tema","texto de ".$nome);
			//$novolayer->set("group",$nomer);
		}
		else
		{
			$novac = $this->layer->getclass(0);
		}
		$label = $novac->label;
		if ($fonte != "bitmap")
		{
			$label->set("type",MS_TRUETYPE);
			$label->set("font",$fonte);
			$label->set("size",$tamanho);
		}
		else
		{
			$label->set("type",MS_BITMAP);
			//$label->set("font",$fonte);
			$t = MS_TINY;
			if ($tamanho > 5 ){$t = MS_TINY;}
			if ($tamanho >= 7 ){$t = MS_SMALL;}
			if ($tamanho >= 10 ){$t = MS_MEDIUM;}
			if ($tamanho >= 12 ){$t = MS_LARGE;}
			if ($tamanho >= 14 ){$t = MS_GIANT;}
			$label->set("size",$t);
		}
		$label->set("angle",$angulo);
		if ($angulo == "AUTO")
		{$label->set("autoangle",MS_TRUE);}
		if ($angulo == "CURVO")
		{
			$label->set("angle",MS_FOLLOW);
		}
		corE($label,$fundo,"backgroundcolor");
		corE($label,$sombra,"backgroundshadowcolor");
		corE($label,$cor,"color");
		$label->set("backgroundshadowsizex",$sombrax);
		$label->set("backgroundshadowsizey",$sombray);
		corE($label,$outlinecolor,"outlinecolor");
		corE($label,$shadowcolor,"shadowcolor");
		$label->set("shadowsizex",$shadowsizex);
		$label->set("shadowsizey",$shadowsizey);
		$label->set("force",$force);
		$label->set("mindistance",$mindistance);
		$label->set("minfeaturesize",$minfeaturesize);
		$label->set("offsetx",$offsetx);
		$label->set("offsety",$offsety);
		$label->set("partials",$partials);
		$p = array("MS_AUTO"=>MS_AUTO,"MS_UL"=>MS_UL,"MS_LR"=>MS_LR,"MS_UR"=>MS_UR,"MS_LL"=>MS_LL,"MS_CR"=>MS_CR,"MS_CL"=>MS_CL,"MS_UC"=>MS_UC,"MS_LC"=>MS_LC,"MS_CC"=>MS_CC);
		$label->set("position",$p[$position]);
		if ($tipo == "teste")
		{
	 		$imgo = $this->mapa->draw();
			$nome = ($imgo->imagepath)."teste".nomeRandomico().".png";
			$imgo->saveImage($nome);
			$nome = ($imgo->imageurl).basename($nome);
			return ($nome);
		}
		else
		{
	    	return("ok");	 
		}
	}
/*
function: ativaEtiquetas

ativa a inclus�o de etiquetas em um tema

parameter:
$item Item que ser� utilizado.	
*/
	function ativaEtiquetas($item)
	{
		$this->layer->setmetadata("TIP",$item);
		return("ok");
	}
/*
function: removeEtiquetas

remove a inclus�o de etiquetas em um tema.

*/
	function removeEtiquetas()
	{
		$this->layer->setmetadata("TIP","");
		return("ok");
	}
}
?>