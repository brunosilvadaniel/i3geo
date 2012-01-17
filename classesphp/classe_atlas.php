<?php
/*
Title: classe_atlas.php

Manipula��o da interface Atlas.

Licenca:

GPL2


i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Arquivo:

i3geo/classesphp/classe_atlas.php
*/
/*
Classe: Atlas
*/
class Atlas
{
	public $atlas;
/*
Function: __construct

Cria um objeto atlas 

parameters:

$atlasxml - Objeto xml com o atlas.
*/  	
	function __construct($xml)
	{
  		error_reporting(E_ALL);
  		$this->xml = $xml;
	}
/*
Method: pegaListaDeAtlas

Pega a lista de atlas existentes e as informa��es b�sicas sobre cada um

Parametros:

tituloinstituicao - � utilizado para montar o cabe�alho HTML com a lista de atlas. Pode ser obtido do ms_configura.php
*/
	function pegaListaDeAtlas($tituloinstituicao="")
	{
		$tituloinstituicao = mb_convert_encoding($tituloinstituicao,"HTML-ENTITIES","auto");
		$atlas = array();
		foreach($this->xml->ATLAS as $s)
		{
			$atlas[] =  array("PUBLICADO"=>ixml($s,"PUBLICADO"),"ID"=>ixml($s,"ID"),"TITULO"=>ixml($s,"TITULO"),"DESCRICAO"=>ixml($s,"DESCRICAO"),"ICONE"=>ixml($s,"ICONE"),"W"=>ixml($s,"WABERTURA"),"H"=>ixml($s,"HABERTURA"),"TEMPLATEHTML"=>ixml($s,"TEMPLATEHTML"));
		}
		return (array("atlas"=>$atlas,"tituloinstituicao"=>$tituloinstituicao));
	}
/*
Method: criaAtlas

L� os par�metros necess�rios para abrir um atlas no i3geo

Parametros:

atlasId - id do atlas desejado, conforme existente em atlas.xml
*/
	function criaAtlas($atlasId)
	{
		foreach($this->xml->ATLAS as $s)
		{
			$id = ixml($s,"ID");
			if ($id == $atlasId)
			{
				$interface = ixml($s,"TEMPLATEHTML");
				$base = ixml($s,"BASEMAPFILE");
			}
		}
		return (array("interface"=>$interface,"base"=>$base));
	}
/*
Method: pegaListaDePranchas

Pega a lista de pranchas existentes em um atlas espec�fico e as informa��es b�sicas sobre cada uma

Parametros:

atlasId - identificador do Atlas desejado
*/
	function pegaListaDePranchas($atlasId)
	{
		$p = array();
		foreach($this->xml->ATLAS as $s)
		{
			$id = ixml($s,"ID");
			if ($id == $atlasId)
			{
				$titulo = ixml($s,"TITULO");
				$link = ixml($s,"LINKMAISINFO");
				$w = ixml($s,"WABERTURA");
				$h = ixml($s,"HABERTURA");
				$icone = ixml($s,"ICONE");
				$tipoguias = ixml($s,"TIPOGUIAS");
				$pdefault = ixml($s,"PRANCHADEFAULT");
				foreach($s->PRANCHAS as $pranchas)
				{
					foreach($pranchas->PRANCHA as $prancha)
					{
						$p[] = array("id"=>ixml($prancha,"ID"),"titulo"=>ixml($prancha,"TITULO"),"icone"=>ixml($prancha,"ICONE"));
					}
				}
			}
		}
		return (array("tipoguias"=>$tipoguias,"pranchadefault"=>$pdefault,"icone"=>$icone,"titulo"=>$titulo,"w"=>$w,"h"=>$h,"link"=>$link,"pranchas"=>$p));
	}
/*
Method: abrePrancha

Ativa uma prancha do atlas.

Inclui os temas definidos na configura��o da prancha.

Os layers que n�o s�o oriundos de uma prancha recebe o metadata "ATLAS" igual a "nao". Isso � feito na inicializa��o do Atlas.

Parametros:

atlasId - id do atlas

pranchaId - identificador da prancha de um atlas

map_file - nome do mapfile do mapa atual

locaplic - localiza��o do i3geo no servidor
*/
	function abrePrancha($atlasId,$pranchaId,$map_file,$locaplic)
	{
		$p = array();
		$temasa = array();
		$layers = array();
		$mapa = ms_newMapObj($map_file);
		$nomes = $mapa->getalllayernames();
		foreach ($nomes as $n)
		{
			$l = $mapa->getlayerbyname($n);
			if (($l->getmetadata("ATLAS")) != "nao")
			{$l->set("status",MS_DELETE);}
		}
		$mapa->save($map_file);
		$mp = "";
		foreach($this->xml->ATLAS as $s)
		{
			$ida = ixml($s,"ID");
			if ($ida == $atlasId)
			{
				foreach($s->PRANCHAS as $pranchas)
				{
					foreach($pranchas->PRANCHA as $prancha)
					{
						if($pranchaId == ixml($prancha,"ID"))
						{
							$link = ixml($prancha,"LINKMAISINFO");
							$w = ixml($prancha,"WABERTURA");
							$h = ixml($prancha,"HABERTURA");
							$mp = ixml($prancha,"MAPEXT");
							//pega os temas
							foreach($prancha->TEMAS as $temas)
							{
								foreach($temas->TEMA as $tema)
								{
									$codigo = ixml($tema,"CODIGO");
									$ligado = ixml($tema,"LIGADO");
									if ($codigo != "")
									{
										$temasa[] = $codigo;
										if (strtolower($ligado) == "sim")
										{$layers[] = $codigo;}
									}
								}
							}
						}
					}
				}
			}
		}
		if(count($temasa) > 0)
		{
			include_once("classe_mapa.php");
			$mapa = "";
			$m = new Mapa($map_file);
			$m->adicionaTema((implode(",",$temasa)),$locaplic,"nao");
			$m->salva();
			
			$mapa = ms_newMapObj($map_file);
			$nomes = $mapa->getalllayernames();
			foreach ($nomes as $n)
			{
				$l = $mapa->getlayerbyname($n);
				if (($l->getmetadata("ATLAS")) != "nao")
				{$l->set("status",MS_OFF);}
			}
			foreach($layers as $t)
			{
				$layer = $mapa->getlayerbyname($t);
				$layer->set("status",MS_DEFAULT);
			}
			$mapa->save($map_file);
		}
		//verifica extens�o geogr�fica
		$newext = array();
		if ($mp != "")
		{
			$ext = $mapa->extent;
			$newext = array();
			$temp = explode(",",$mp);
			foreach ($temp as $t)
			{
				if ($t != "")
				{$newext[] = $t;}
			}
			if (count($newext) == 4)
			{$ext->setextent($newext[0], $newext[1], $newext[2], $newext[3]);}
			$mapa->save($map_file);	
		}
		if(!function_exists("sobeAnno")){
			include_once("funcoes_gerais.php");
		}
		sobeAnno($map_file);		
		if ($w == ""){$w = 300;}
		if($h == ""){$h = 300;}
		return (array("link"=>$link,"w"=>$w,"h"=>$h,"mapexten"=>implode(" ",$newext)));
	}
}
?>