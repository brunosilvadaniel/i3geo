<?php
/*
Title: classe_vermultilayer.php

Verifica se o layer e multilayer

Analisa um mapfile e retorna a situa��o de agrupamento das camadas.

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

Arquivo:

i3geo/classesphp/classe_vermultilayer.php
*/
/*
Classe: vermultilayer
*/
class vermultilayer
{
	/*
	Variavel: $resultado
	
	Indica se � multi-layer ou n�o (0 ou 1)
	*/
	var $resultado;
	/*
	Variavel: $temas
	
	Lista de c�digos dos temas
	*/
	var $temas; //lista de nomes de temas se for um grupo
	/*
	Variavel: $layers
	
	Lista de objetos layers
	*/
	var $layers; //lista de objetos temas se for um grupo
	/*
	Variavel: $nomes
	
	Lista de nomes dos temas
	*/
	var $nomes; //lista de nomes se for um grupo
	/*
	Variavel: $nomesvisiveis
	
	Lista dos nomes dos temas vis�veis
	*/
	var $nomesvisiveis; //nomes dos temas vis�veis na escala
	/*
	Variavel: $temasvisiveis
	
	Lista com os c�digos dos temas vis�veis
	*/
	var $temasvisiveis; //temas vi'siveis na escala
	/*
	function: verifica
	
	Verifica se um tema � multilayer
	
	parameters:
	$mapfile - arquivo mapfile
	
	$tema - c�digo do tema que ser� verificado
	*/
	function verifica($mapfile,$tema) //$mapfile = arquivo .map, $tema = nome do layer
	{
		$map = ms_newMapObj($mapfile);
		$map->preparequery();
		$escala = $map->scale;
		$todoslayers = $map->getAlllayernames();
		$multilayer = 0;
		$temas = array();
		$layers = array();
		$nomes = array();
		$nomesvisiveis = array();
		$temasvisiveis = array();
		foreach ($todoslayers as $temai)
		{
			$layer = $map->getlayerbyname($temai);
			$testa = 0;
			//verifica se o tema � visivel na escala
			$mins = $layer->minscale;
			$maxs = $layer->maxscale;
			if ($mins != $maxs)
			{
				$testa = 1;
				if ($mins > 0)
				{
					if ($escala >= $mins)
					{$testa = 0;}
				}
				if ($maxs > 0)
				{
					if ($escala <= $maxs)
					{$testa = 0;}
					else {$testa = 1;}
				}
				if (($mins > 0) && ($maxs > 0))
				{
					if (($escala >= $mins) && ($escala <= $maxs))
					{$testa = 0;}
					else {$testa = 1;}
				}
			}
			if (strtoupper($layer->getmetadata("escondido")) != "SIM")
			{
				if (($layer->group == $tema) && ($layer->type != 4))
				{
					$multilayer = 1;
					$temas[] = $temai;
					$layers[] = $layer;
					$nomes[] = pegaNome($layer);
					if ($testa == 0)
					{
						$nomesvisiveis[] = pegaNome($layer);
						$temasvisiveis[] = $temai;
					}
				}
			}
		}
		$this->resultado = $multilayer;
		$this->temas = $temas;
		$this->layers = $layers;
		$this->nomes = $nomes;
		$this->nomesvisiveis = $nomesvisiveis;
		$this->temasvisiveis = $temasvisiveis;
	}
}
?>