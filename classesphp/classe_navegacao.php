<?php
/*
Title: Navega��o

Opera��es de navega��o que alteram a abrang�ncia do mapa.

Altera��o de escala, deslocamento, etc.

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

File: classe_navegacao.php

19/6/2007
*/
/*
Class: Navegacao
*/
class Navegacao
{
	/*
	Variable: $mapa
	
	Objeto mapa
	*/
	public $mapa;
	/*
	Variable: $arquivo
	
	Arquivo map file
	*/
	protected $arquivo;
	
/*
function: __construct

Cria um objeto avegacao 

parameters:
$map_file - string $map_file Endere�o do mapfile no servidor. 
*/  	
	function __construct($map_file)
	{
  		$this->mapa = ms_newMapObj($map_file);
  		$this->arquivo = $map_file;
	}
/*
function: salva

Salva o mapfile atual 
*/	
 	function salva()
 	{
	  	if (connection_aborted()){exit();}
	  	$this->mapa->save($this->arquivo);
	}
/*
function: gravaImagemCorpo

Grava a imagem do mapa atual

return:
string - nome da imagem gravada
*/
	function gravaImagemCorpo()
	{
	 	$imgo = $this->mapa->draw();
		$nome = ($imgo->imagepath).nomeRandomico().".png";
		$salva = $imgo->saveImage($nome);
		if ($salva != -1)
		{return ($imgo->imageurl).basename($nome);}
		else
		{return "erro";}
	}	
/*
function: afasta

Afasta a visualiza��o de um mapa (zoom out)

O centro do mapa permanece inalterado, mudando-se apenas a escala.

parameter:
$nivel - nivel de zoom
*/
	function afasta($nivel)
	{
		$this->mapa->preparequery();
		$pt = ms_newPointObj();
		if ($pt->setXY(($this->mapa->width) / 2, ($this->mapa->height) / 2) != -1)
		{$this->mapa->zoompoint(($nivel * -1),$pt,($this->mapa->width),($this->mapa->height),$this->mapa->extent);}
		$pt->free();
		return("ok");
	}
/*
function: aproxima

Aproxima a visualiza��o de um mapa (zoom in)

O centro do mapa permanece inalterado, mudando-se apenas a escala.

paremeter:
$nivel - integer N�vel de zoom.
*/	
	function aproxima($nivel)
	{
		$this->mapa->preparequery();
		$pt = ms_newPointObj();
		if ($pt->setXY(($this->mapa->width) / 2, ($this->mapa->height) / 2) != -1)
		{$this->mapa->zoompoint($nivel,$pt,($this->mapa->width),($this->mapa->height),$this->mapa->extent);}
		$pt->free();
		return("ok");
	}
/*
function: desabilitaRASTER

Desliga o status das camadas raster

*/
	function desabilitaRASTER()
	{
	 	$ls = $this->mapa->getalllayernames();
	 	foreach ($ls as $l)
	 	{
	 		$layer = $this->mapa->getlayerbyname($l);
	 		if ($layer->type == MS_LAYER_RASTER)
	 		{$layer->set("status",MS_OFF);}
	 	}
	}
/*
function: aplicaResolucao

Aplica uma resolu��o nova ao mapa atual

Utilizado para gerar imagens ampliadas do mapa atual

parameter:
$resolucao - Resolu��o a ser aplicada
*/
	function aplicaResolucao($resolucao)
	{
	 	$this->mapa->setsize(($this->mapa->width) * $resolucao,($this->mapa->height) * $resolucao);
	}
/*
function: pan

Desloca a visualiza��o de um mapa (pan).

parameters:
$x - Valor de x em d�cimos de grau.

$y - Valor de y em d�cimos de grau.

$escala - Valor da escala (utilizado quando o clique � feito sobre o mapa de refer�ncia).

$tipo - ref| Indica se o ponto foi clicado no mapa ou no mapa de refer�ncia 
*/
	function pan($x,$y,$escala,$tipo)
	{
		$this->mapa->preparequery();
		$r = $this->mapa;
		if ($tipo == "ref")
		{$r = $this->mapa->reference;}
		$pt = ms_newPointObj();
		$pt->setXY($x , $y);
		if ($escala!="") //no caso de mudar em funcao do mapa de referencia
		{$this->mapa->zoomscale($escala,$pt,($r->width),($r->height),($r->extent));}
		else
		{$this->mapa->zoompoint(1,$pt,($this->mapa->width),($this->mapa->height),($this->mapa->extent));}
		$pt->free();
		return ("ok");
	}
/*
function: mudaExtensao

Muda a extens�o geogr�fica do mapa.

parameter:
$ext -  Extens�o geogr�fica a ser aplicada com valores separados por virgula ou espa�os.
*/
	function mudaExtensao($ext)
	{
		$e = explode(" ",$ext);
		if (count($e) != 4){$e = explode(",",$ext);}
		if (count($e) != 4){exit;}
		$extatual = $this->mapa->extent;
		if (($e[0] == $e[2]) && ($e[1] == $e[3]))
		{
			$e[0] = $e[0] - 0.0001;
			$e[2] = $e[2] + 0.0001;
			$e[1] = $e[1] - 0.0001;
			$e[3] = $e[3] + 0.0001;
		}
		$extatual->setextent((min($e[0],$e[2])),(min($e[1],$e[3])),(max($e[0],$e[2])),(max($e[1],$e[3])));
		return ("ok");
	}
/*
function: mudaEscala

Muda a escala do mapa.

parameter:
$escala - Escala a ser aplicada.
*/
	function mudaEscala($escala)
	{
		$pt = ms_newPointObj();
		$pt->setXY(($this->mapa->width) / 2, ($this->mapa->height) / 2);
		$this->mapa->zoomscale($escala,$pt,($this->mapa->width),($this->mapa->height),$this->mapa->extent);
		$pt->free();
		return("ok");
	}
/*
function: zoomPonto

Desloca o centro do mapa para um ponto espec�fico.

parameter:
$xy - XY com as coordenadas separado por espa�o
*/
	function zoomPonto($xy)
	{
		$apt = explode(" ",$xy);
		$pt = ms_newPointObj();
		$e = $this->mapa->extent;
		$pt = xy2imagem($this->arquivo,$xy);
		$this->mapa->zoompoint(1,$pt,($this->mapa->width),($this->mapa->height),$e);
		$pt->free();
	}	
}
?>