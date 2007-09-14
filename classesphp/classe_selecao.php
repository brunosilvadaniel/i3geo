<?php
/*
Title: Sele��o

Sele��o de elementos de um tema.

Adiciona, remove, etc.

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

File: classe_selecao.php

19/6/2007
*/
/*
Class: Selecao
*/
class Selecao
{
	/*
	Variable: $mapa
	
	Objeto mapa
	*/
	protected $mapa;
	/*
	Variable: $arquivo
	
	Arquivo map file
	*/
	protected $arquivo;
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
Function: __construct

Cria um objeto Selecao 

parameters:

$map_file - Endere�o do mapfile no servidor.

$tema - nome do tema
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
function: selecaoTema

Seleciona os elementos de um tema baseado nos elementos selecionados em outro.

parameters:

$temao - Tema que ser� processado.

$tipo - Tipo de opera��o adiciona|retira|inverte|limpa
*/
	function selecaoTema($temao,$tipo)
	{
		set_time_limit(2000);
		if ($tipo == "limpa")
		{return($this->selecaoLimpa());}
		if ($tipo == "inverte")
		{return($this->selecaoInverte());}
		$layero = $this->mapa->getlayerbyname($temao);
		if ($layero->type == MS_LAYER_LINE)
		{return("erro. O tema de sobreposicao nao pode ser do tipo linear.");}
		$tipoLayer = $this->layer->type;
		$tipoLayero = $layero->type;
		$this->layer->set("template","none.htm");
		$layero->set("template","none.htm");
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$indxlayer = $this->layer->index;
		$res_count = $this->layer->getNumresults();
		$res_counto = $layero->getNumresults();
		if ($res_counto == 0)
		{return("erro. O tema de sobreposicao nao possui selecao.");}
		$shp_atual = array();
		for ($i = 0; $i < $res_count;$i++)
		{
			$rc = $this->layer->getResult($i);
			$shp_atual[] = $rc->shapeindex;
		}
		$this->mapa->freequery($indxlayer);
		$shpi = array();
		$i = $layero->index;
		$selecao = "";
		if (($selecao != "ok") && ($layero->data != ""))
		{
			$layero->open();
			$res_count = $layero->getNumresults();
			for ($i = 0; $i < $res_count; $i++)
			{
				$result = $layero->getResult($i);
				$s  = $result->shapeindex;
				$sh = $layero->getShape(-1,$s);
				$tiposh = $sh->type;
				if ($tiposh == 2)
				{$ident = @$this->layer->querybyshape($sh);}
				if ($tiposh == 0)
				{
					$lin = $sh->line(0);
					$npt = $lin->numpoints;
					if ($npt == 1)
					{
						$ptlin = $lin->point(0);
						$ident = $this->layer->queryByPoint($ptlin, 1, 0);
					}
					if ($npt > 1)
					{
					 	for ($k = 0; $k < $npt; $k++)
					 	{
					 	 	$ptlin = $lin->point($k);
				 		 	$s = $this->layer->queryByPoint($ptlin, 1, 0);
							if ($s != 1)
							{
								$res_countl = $this->layer->getNumresults();
								for ($kk = 0; $kk < $res_countl; $kk++)
								{
									$result = $this->layer->getResult($kk);
									$shpi[]  = $result->shapeindex;
								}
							}
				 		}
						$ident = 1;
					}
				}
				if ($ident != 1)
				{
					$res_countl = $this->layer->getNumresults();
					for ($ii = 0; $ii < $res_countl; $ii++)
					{
						$result = $this->layer->getResult($ii);
						$shpi[]  = $result->shapeindex;
					}
				}
			}
			$layero->close();
			if (count($shpi)>0){$selecao = "ok";}
		}
		if (($selecao != "ok") && ($layero->data == ""))
		{
			$layero->queryByRect($this->mapa->extent);
			$layero->open();
			$conta = $layero->getNumresults();
			for ($k = 0; $k < $conta; $k++)
			{
				if (@$layero->getshape(-1,$k))
				{
					$s = $layero->getshape(-1,$k);
					if ($s->type == 2)
					{
						$this->layer->querybyshape($s);
						$res_count = $this->layer->getNumresults();
						for ($i = 0; $i < $res_count; $i++)
						{
							$result = $this->layer->getResult($i);
							$shpi[]  = $result->shapeindex;
						}
					}
					else
					{
						$lin = $s->line(0);
						$npt = $lin->numpoints;
						for ($c = 0; $c < $npt; $c++)
						{
							$pt = $lin->point($c);
							$this->layer->set("tolerance",0);
							$this->layer->set("toleranceunits",6);
							if (($this->layer->type == MS_POINT) || ($this->layer->type == MS_LINE))
							{
								$this->layer->set("tolerance",5);
								$ident = $this->layer->queryByPoint($pt, 1, 0);
							}
							else
							{$ident = $this->layer->queryByPoint($pt, 1, 0);}
							if ($ident != 1)
							{
								$res_countl = $this->layer->getNumresults();
								for ($ii = 0; $ii < $res_countl; $ii++)
								{
								$result = $this->layer->getResult($ii);
									if ($result->shapeindex != "")
									{$shpi[] = $result->shapeindex;}
								}
							}
						}
					}
				}
			}
			$layero->close();
		}
		if (($tipo == "adiciona") && (count($shpi) > 0))
		{return($this->selecaoAdiciona($shpi,$shp_atual));}
		if (($tipo == "retira") && (count ($shp_atual) > 0))
		{return($this->selecaoRetira($shpi,$shp_atual));}
	}
/*
function: selecaoAtributos

Seleciona por atributo.

parameters:
$tipo - Tipo de opera��o adiciona|retira|inverte|limpa

$item - Item que ser� consultado.

$operador - Operador.

$valor - Valor.
*/
	function selecaoAtributos($tipo,$item,$operador,$valor)
	{
		if ($tipo == "limpa")
		{return($this->selecaoLimpa());}
		if ($tipo == "inverte")
		{return($this->selecaoInverte());}
		$operador = explode(",",$operador);
		$operador = $operador[1];
		$this->layer->set("template","none.htm");
		$indxlayer = $this->layer->index;
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$res_count = $this->layer->getNumresults();
		$shp_atual = array();
		for ($i = 0; $i < $res_count;$i++)
		{
			$rc = $this->layer->getResult($i);
			$shp_atual[] = $rc->shapeindex;
		}
		$this->mapa->freequery($indxlayer);
		$shpi = array();
		if($this->layer->connectiontype == MS_POSTGIS)
		{$this->layer->querybyattributes($item,$item." ".$operador." '".$valor."' ",1);}
		else
		{$this->layer->querybyattributes($item,'("['.$item.']"'.$operador.'"'.$valor.'")',1);}
		$res_count = $this->layer->getNumresults();
		$shpi = array();
		for ($i = 0; $i < $res_count; $i++)
		{
			$result = $this->layer->getResult($i);
			$shpi[]  = $result->shapeindex;
		}
		if ($tipo == "adiciona")
		{return($this->selecaoAdiciona($shpi,$shp_atual));}
		if ($tipo == "retira")
		{return($this->selecaoRetira($shpi,$shp_atual));}
		return("ok");
	}
/*
function: selecaoPT

Seleciona por ponto.

parameters:

$xy - X e Y separados por v�rgula.

$tipo - Tipo de opera��o adiciona|retira|inverte|limpa
*/
	function selecaoPT($xy,$tipo)
	{
		if ($tipo == "limpa")
		{return ($this->selecaoLimpa());}
		if ($tipo == "inverte")
		{return ($this->selecaoInverte());}
		$this->layer->set("template","none.htm");
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$indxlayer = $this->layer->index;
		$res_count = $this->layer->getNumresults();
		$shp_atual = array();
		for ($i = 0; $i < $res_count;$i++)
		{
			$rc = $this->layer->getResult($i);
			$shp_atual[] = $rc->shapeindex;
		}
		$this->mapa->freequery($indxlayer);
		$shpi = array();
		$c = explode(" ",$xy);
		$pt = ms_newPointObj();
		$pt->setXY($c[0], $c[1]);
		$this->layer->set("tolerance",0);
		$this->layer->set("toleranceunits",6);
		if (($this->layer->type == MS_LAYER_POINT) || ($this->layer->type == MS_LAYER_LINE))
		{
			$this->layer->set("tolerance",5);
			$ident = @$this->layer->queryByPoint($pt, 1, 0);
		}
		else
		{$ident = @$this->layer->queryByPoint($pt, 1, 0);}
		if ($ident != 1)
		{
			$res_count = $this->layer->getNumresults();
			$shpi = array();
			for ($i = 0; $i < $res_count; $i++)
			{
				$result = $this->layer->getResult($i);
				$shpi[]  = $result->shapeindex;
			}
		}
		if ($tipo == "adiciona")
		{return($this->selecaoAdiciona($shpi,$shp_atual));}
		if ($tipo == "retira")
		{return($this->selecaoRetira($shpi,$shp_atual));}
	}
/*
function: selecaoLimpa

Limpa a sele��o do tema.
*/
	function selecaoLimpa()
	{
		if ($this->nome != "") //limpa de um tema
		{
			if (file_exists(($this->arquivo)."qy"))
			{$this->mapa->loadquery(($this->arquivo)."qy");}
			$indxlayer = $this->layer->index;
			$this->mapa->freequery($indxlayer);
			$this->mapa->savequery(($this->arquivo)."qy");
		}
		else //limpa de todos os temas
		{
			if (file_exists(($this->arquivo)."qy"))
			{unlink (($this->arquivo)."qy");}
		}
		return("ok");
	}

/*
function: selecaoInverte

Inverte sele��o do tema.
*/
	function selecaoInverte()
	{
		$this->layer->set("template","none.htm");
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$indxlayer = $this->layer->index;
		$items = pegaItens($this->layer);
		$res_count = $this->layer->getNumresults();
		$shp_atual = array();
		for ($i = 0; $i < $res_count;$i++)
		{
			$rc = $this->layer->getResult($i);
			$shp_atual[] = $rc->shapeindex;
		}
		$this->mapa->freequery($indxlayer);
		//$qstring = "/.*/";
		//if($this->layer->connectiontype == MS_POSTGIS)
		//{$qstring = $items[0].' ~* \'^.\'  ';}
		$this->layer->queryByrect($this->mapa->extent);
		$res_count = $this->layer->getNumresults();
		$shp_todos = array();
		for ($i = 0; $i < $res_count;$i++)
		{
			$rc = $this->layer->getResult($i);
			$shp_todos[] = $rc->shapeindex;
		}
		$shp = array_diff($shp_todos,$shp_atual);
		$this->mapa->freequery($indxlayer);
		foreach ($shp as $indx)
		{$this->mapa->querybyindex($indxlayer,-1,$indx,MS_TRUE);}
		$this->mapa->savequery(($this->arquivo)."qy");
		return("ok");
	}
/*
function: selecaoAdiciona

Adiciona elementos na sele��o do tema.

parameters:
$shpi - Indices dos registros novos.

$shp_atual - Indices dos elementos j� selecionados.
*/
	function selecaoAdiciona($shpi,$shp_atual)
	{
		$this->layer->set("template","none.htm");
		$indxlayer = $this->layer->index;
		$shp = array_merge($shpi,$shp_atual);
		$this->mapa->freequery($indxlayer);
		foreach ($shp as $indx)
		{@$this->mapa->querybyindex($indxlayer,-1,$indx,MS_TRUE);}
		$this->mapa->savequery(($this->arquivo)."qy");
		return("ok");
	}
/*
function: selecaoRetira

Retira elementos na sele��o do tema.

parameters:

$shpi - Indices dos registros que ser�o retirados.

$shp_atual - Indices dos elementos j� selecionados.
*/
	function selecaoRetira($shpi,$shp_atual)
	{
		$this->layer->set("template","none.htm");
		$indxlayer = $this->layer->index;
		$this->mapa->freequery($indxlayer);
		$shp = array_diff($shp_atual,$shpi);
		$this->mapa->freequery($indxlayer);
		foreach ($shp as $indx)
		{$this->mapa->querybyindex($indxlayer,-1,$indx,MS_TRUE);}
		$this->mapa->savequery(($this->arquivo)."qy");
		return("ok");
	}
/*
function: incluiSel

Inclui uma lista de ids na sele��o do tema.

Salva o arquivo .qy adicionando os novos registros

parameters:

$ids - Ids separados por v�rgula correspondendo aos registros.
*/
	function incluiSel($ids)
	{
		$this->layer->set("template","none.htm");
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$ids = explode(",",$ids);
		$indxlayer = $this->layer->index;
		foreach ($ids as $i)
		{$this->mapa->queryByIndex($indxlayer, -1, $i);}
		$this->mapa->savequery(($this->arquivo)."qy");
		return("ok");
	}
/*
function: selecao2tema

Exporta elementos selecionados de um tema em shape file e adiciona no mapa atual.

parameters:
$locaplic - localiza��o do I3geo

$dir_tmp - localiza��o do diret�rio tempor�rio
*/
	function selecao2tema($locaplic,$dir_tmp)
	{
		$this->layer->set("template","none.htm");
		$this->layer->setfilter("");
		$nomeshp = criaSHP($this->nome,$this->arquivo,$locaplic,$dir_tmp);
		$novolayer = criaLayer($this->mapa,$this->layer->type,MS_DEFAULT,"Sele��o de ".(pegaNome($this->layer))." (".$this->nome.")",$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->set("name",basename($nomeshp));
		$novolayer->setmetadata("DOWNLOAD","sim");
		$tipo = $this->layer->type;
		if ($this->layer->getmetadata("TABELA") != '')
		{$novolayer->setmetadata("TABELA","NAO");}
		$novolayer->setmetadata("TEMALOCAL","SIM");
		$novolayer->setfilter("");
		return("ok");
	}
/*
function: selecaoEXT

Seleciona por extens�o geogr�fica.

parameters:

$tipo - Tipo de opera��o adiciona|retira|inverte|limpa
*/
	function selecaoEXT($tipo)
	{
		if ($tipo == "limpa")
		{return ($this->selecaoLimpa());}
		if ($tipo == "inverte")
		{return ($this->selecaoInverte());}
		$this->layer->set("template","none.htm");
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$indxlayer = $this->layer->index;
		$res_count = $this->layer->getNumresults();
		$shp_atual = array();
		for ($i = 0; $i < $res_count;$i++)
		{
			$rc = $this->layer->getResult($i);
			$shp_atual[] = $rc->shapeindex;
		}
		$this->mapa->freequery($indxlayer);
		$shpi = array();
		$rect = $this->mapa->extent;
		$ident = @$this->layer->queryByRect($rect);
		if ($ident != 1)
		{
			$res_count = $this->layer->getNumresults();
			$shpi = array();
			for ($i = 0; $i < $res_count; $i++)
			{
				$result = $this->layer->getResult($i);
				$shpi[]  = $result->shapeindex;
			}
		}
		if ($tipo == "adiciona")
		{return($this->selecaoAdiciona($shpi,$shp_atual));}
		if ($tipo == "retira")
		{return($this->selecaoRetira($shpi,$shp_atual));}
	}
}
?>