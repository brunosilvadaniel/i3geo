<?php
/*
Title: classe_menutemas.php

Manipula��o dos temas do arquivo menutemas.xml ou sistema de administra��o

Quando o i3Geo est� configurado para acessar o sistema de administra��o, os m�todos desta classe
passam a utilizar a classe i3geo/admin/php/classe_arvore.php

Lista temas, grupos,etc.

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

i3geo/classesphp/classe_menutemas.php

*/
/*
Classe: Menutemas
*/
class Menutemas
{
/*
function: __construct

Cria um objeto Menutemas

parameters:

$map_file - (opcional) endere�o do mapfile no servidor

$perfil - (opcional) lista dos perfis, separados por espa�os, que devem restringir a lista de menus, grupos, temas e etc.

$locsistemas - (opcional) endere�o do xml com a lista de sistemas adicionais que ser�o listados na op��o de adi�ao de temas

$locaplic - (opcional) endere�o f�sico do i3geo

$menutemas - (opcional) array contendo a lista de menus para compor a �rvore de temas (veja o i3geo/ms_configura)

$urli3geo - (opcional) url onde est� o i3geo (p.ex. http://localhost/i3geo

$editores - (opcional) array com os editores cadastrados no ms_configura.php
*/  	
	function __construct($map_file="",$perfil="",$locsistemas="",$locaplic="",$menutemas="",$urli3geo="",$editores="")
	{
		error_reporting(0);
		$perfil = str_replace(" ",",",$perfil);
		$this->perfil = explode(",",$perfil);
		$this->locsistemas = $locsistemas;
		$this->xmlsistemas = "";
		$this->locaplic = $locaplic;
		$this->menutemas = $menutemas;
		$this->urli3geo = $urli3geo;
		if (($map_file != "") && (file_exists($map_file)))
		{
			$this->mapa = ms_newMapObj($map_file);
			$this->arquivo = $map_file;
			if ($this->mapa)
			{
				$c = $this->mapa->numlayers;
				for ($i=0;$i < $c;++$i)
				{$this->layers[] = $this->mapa->getlayer($i);}
			}
		}
		//
		//verifica se o ip atual est� cadastrado como um dos editores
		//editores podem ver as coisas marcadas como n�o publicado
		//no sistema de administra��o
		//
		$this->editor = false;
		if($editores != "")
		{$this->editor = $this->verificaeditores($editores);}
		$this->editores = $editores;
	}
/*
function: pegaListaDeMenus

Pega a lista de menus do banco de dados de administra��o.

O perfil do usu�rio � armazenado na se��o na inicializa��o do I3Geo.

Parametros:

return:
array
*/
	function pegaListaDeMenus()
	{
		$resultado = array();
		//necess�rio por conta da inclusao do conexao.php
		$locaplic = $this->locaplic;
		//
		//se $menutemas estiver "", o i3geo
		//ir� utilizar o sistema de administra��o para pegar os menus
		//
		if($this->menutemas == "")
		{
			if(!isset($this->locaplic))
			{return "locaplic nao foi definido";}
			include_once("../admin/php/classe_arvore.php");
			$arvore = new Arvore($this->locaplic);
			$resultado = $arvore->pegaListaDeMenus($this->perfil);
			unset($arvore);
		}
		else
		{$resultado = $this->menutemas;}
		if(count($resultado) == 0)
		{
			$resultado[] = array("idmenu"=>"i3geo (xml)","arquivo"=>"../menutemas/menutemas.xml","status"=>"aberto");
		}
		return ($resultado);
	}
/*
function: pegaListaDeGrupos

Pega a lista de grupos, subgrupos e sistemas adicionais.

O perfil do usu�rio � armazenado na se��o na inicializa��o do I3Geo.

Os grupos e subgrupos s�o definidos no xml menutemas/menutemas.xml e os sistemas em menutemas/sistemas.xml.

Parametros:

idmenu - id que identifica o xml que ser� utilizado (definido na vari�vel $menutemas em ms_configura.php)

listasistemas - sim|nao pega a lista de sistemas para montar a �rvore de sistemas

listasgrupos - sim|nao lista tamb�m os subgrupos associados

return:

array
*/
	function pegaListaDeGrupos($idmenu="",$listasistemas="sim",$listasgrupos="sim")
	{
		//
		//l� os arquivos xml
		//"&tipo=gruposeraiz" pega apenas os nomes dos grupos e temas na raiz
		//
		//necess�rio por conta da inclusao do conexao.php
		$locaplic = $this->locaplic;
		include_once($this->locaplic."/admin/php/xml.php");
		if($listasgrupos == "sim")
		{$tipo = "";}
		else
		{$tipo = "gruposeraiz";}
		$this->xml = "";
		$tempm = $this->pegaListaDeMenus();
		$xmls = array();
		foreach($tempm as $menu)
		{
			if($menu["idmenu"] == $idmenu || $idmenu == "")
			{
				if(!isset($menu["url"])){$menu["url"] = "";} //para efeitos de compatibilidade entre vers�es do i3geo
				$ondexml = $menu["arquivo"];
				if(!isset($menu["publicado"])){$ondexml = $menu["url"];}
				if($ondexml != "" && $this->menutemas != "")
				{
					$xml = simplexml_load_file($ondexml);
					$grupos = $this->retornaGrupos($xml,$listasistemas,$idmenu,$listasgrupos);
				}
				else //pega o xml do sistema de administra��o
				{
					//$xml = simplexml_load_string(geraXmlMenutemas(implode(" ",$this->perfil),$idmenu,$tipo,$this->locaplic));	
					//$grupos = $this->retornaGrupos($xml,$listasistemas,$idmenu,$listasgrupos);
					include_once("../admin/php/classe_arvore.php");
					$arvore = new Arvore($this->locaplic);
					$grupos = $arvore->formataGruposMenu($idmenu,$this->perfil,$listasgrupos);
					unset($arvore);
				}
			}
		}
		return ($grupos);
	}
	function retornaGrupos($xml,$listasistemas,$idmenu,$listasgrupos)
	{
		$sistemas = array();
		$grupos = array();
		$temasraiz = array();
		//
		//pega os temas na raiz
		//
		foreach($xml->TEMA as $temar)
		{
			$down = "nao";
			$ogc = "sim";
			$temp = ixml($temar,"DOWNLOAD");
			if (($temp == "sim") || ($temp == "SIM"))
			{$down = "sim";}
			$temp = ixml($temar,"OGC");
			if (($temp == "nao") || ($temp == "NAO"))
			{$ogc = "nao";}
			$link = " ";
			$temp = ixml($temar,"TLINK");
			if ($temp != "")
			{$link = $temp;}
			$tid = ixml($temar,"TID");
			$nome = ixml($temar,"TNOME");
			$temasraiz[] = array("tid"=>$tid,"nome"=>$nome,"link"=>$link,"download"=>$down,"ogc"=>$ogc);
		}
		foreach($xml->GRUPO as $grupo)
		{
			$incluigrupo = TRUE;
			//filtra pelo perfil
			$temp = ixml($grupo,"PERFIL");
			if ($temp != "")
			{
				$incluigrupo = FALSE;
				$perfis = str_replace(","," ",$temp);
				$perfis = explode(" ",$perfis);
				if ($this->array_in_array($this->perfil,$perfis))
				{$incluigrupo = TRUE;}
			}
			//verifica se existem temas no n�vel de grupo
			if ($incluigrupo == TRUE)
			{
				$temas = array();
				foreach($grupo->TEMA as $temar)
				{
					$down = "nao";
					$ogc = "sim";
					$temp = ixml($temar,"DOWNLOAD");
					if (($temp == "sim") || ($temp == "SIM"))
					{$down = "sim";}
					$temp = ixml($temar,"OGC");
					if (($temp == "nao") || ($temp == "NAO"))
					{$ogc = "nao";}
					$link = " ";
					$temp = ixml($temar,"TLINK");
					if ($temp != "")
					{$link = $temp;}
					$tid = ixml($temar,"TID");
					$nome = ixml($temar,"TNOME");
					$temas[] = array("tid"=>$tid,"nome"=>$nome,"link"=>$link,"download"=>$down,"ogc"=>$ogc);
				}
				$grupodown = "nao";
				$grupoogc = "nao";
				foreach($grupo->SGRUPO as $sgrupo)
				{
					foreach($sgrupo->TEMA as $tema)
					{
						$temp = ixml($tema,"DOWNLOAD");
						if (($temp == "sim") || ($temp == "SIM"))
						{$grupodown = "sim";}						
						$temp = ixml($tema,"OGC");
						if (($temp == "") || ($temp == "sim") || ($temp == "SIM"))
						{$grupoogc = "sim";}						
					}
				}
				$subgrupos = array();
				if($listasgrupos=="sim")
				{
					foreach($grupo->SGRUPO as $sgrupo)
					{
						$incluisgrupo = TRUE;
						$temp = ixml($sgrupo,"PERFIL");
						if ($temp != "")
						{
							$incluisgrupo = FALSE;
							$perfis = str_replace(","," ",$temp);
							$perfis = explode(" ",$perfis);
							if ($this->array_in_array($this->perfil,$perfis))
							{$incluisgrupo = TRUE;}
						}
						if ($incluisgrupo == TRUE)
						{
							//verifica se existem temas que podem receber download
							$down = "nao";
							$ogc = "nao";
							foreach($sgrupo->TEMA as $tema)
							{
								$temp = ixml($tema,"DOWNLOAD");
								if (($temp == "sim") || ($temp == "SIM"))
								{$down = "sim";}
								$temp = ixml($tema,"OGC");
								if (($temp == "") || ($temp != "sim") || ($temp != "SIM"))
								{$ogc = "sim";}
							}
							$nome = ixml($sgrupo,"SDTIPO");
							$subgrupos[] = array("nome"=>$nome,"download"=>$down,"ogc"=>$ogc);
						}
					}
				}
				$nome = ixml($grupo,"GTIPO");
				$grupos[] = array("nome"=>$nome,"ogc"=>$grupoogc,"download"=>$grupodown,"subgrupos"=>$subgrupos,"temasgrupo"=>$temas);
			}
		}
		$grupos[] = array("temasraiz"=>$temasraiz);
		//pega os sistemas checando os perfis
		$sistemas = array();
		if ($listasistemas == "sim")
		{$sistemas = pegaSistemas();}
		$grupos[] = array("idmenu"=>$idmenu);
		$grupos[] = array("sistemas"=>$sistemas);
		return($grupos);		
		
	}
/*
function: pegaListaDeSubGrupos

Pega a lista de sub-grupos.

O perfil do usu�rio � armazenado na se��o na inicializa��o do I3Geo.

Os grupos e subgrupos s�o definidos no xml menutemas/menutemas.xml e os sistemas em menutemas/sistemas.xml.

Parametros:

idmenu - id que identifica o xml que ser� utilizado (definido na vari�vel $menutemas em ms_configura.php)

grupo - c�digo do grupo

return:

array
*/
	function pegaListaDeSubGrupos($codgrupo,$idmenu="")
	{
		$locaplic=$this->locaplic;
		include_once($this->locaplic."/admin/php/xml.php");
		$tipo = "subgrupos";
		$this->xml = "";
		foreach($this->pegaListaDeMenus() as $menu)
		{
			if($menu["idmenu"] == $idmenu || $idmenu == "")
			{
				if(!isset($menu["url"])){$menu["url"] = "";} //para efeitos de compatibilidade entre vers�es do i3geo
				$ondexml = $menu["arquivo"];
				if($menu["url"] != ""){$ondexml = $menu["url"];}
				if($ondexml != "" && $this->menutemas != "")
				{$this->xml = simplexml_load_file($ondexml);}
				else //pega o xml do sistema de administra��o
				{
					//$this->xml = simplexml_load_string(geraXmlMenutemas(implode(" ",$this->perfil),$idmenu,$tipo,$this->locaplic));
					//echo geraXmlMenutemas(implode(" ",$this->perfil),$idmenu,$tipo,$this->locaplic);exit;	
					include_once("../admin/php/classe_arvore.php");
					$arvore = new Arvore($this->locaplic);
					$subGrupos = $arvore->formataSubgruposGrupo($idmenu,$codgrupo,$this->perfil);
					unset($arvore);
					return($subGrupos);
				}
			}
		}
		$conta = 0;
		$subgrupos[] = array();
		foreach($this->xml->GRUPO as $grupo)
		{
			$temp = ixml($grupo,"PERFIL");
			if ($conta == $codgrupo)
			{
				$incluigrupo = TRUE;
				if ($temp != "")
				{
					$incluigrupo = FALSE;
					$perfis = str_replace(","," ",$temp);
					$perfis = explode(" ",$perfis);
					if ($this->array_in_array($this->perfil,$perfis))
					{$incluigrupo = TRUE;}
				}
				//verifica se existem temas no n�vel de grupo
				if ($incluigrupo == TRUE)
				{
					$subgrupos = array();
					foreach($grupo->SGRUPO as $sgrupo)
					{
						$incluisgrupo = TRUE;
						$temp = ixml($sgrupo,"PERFIL");
						if ($temp != "")
						{
							$incluisgrupo = FALSE;
							$perfis = str_replace(","," ",$temp);
							$perfis = explode(" ",$perfis);
							if ($this->array_in_array($this->perfil,$perfis))
							{$incluisgrupo = TRUE;}
						}
						if (($incluisgrupo == TRUE))
						{
							$down = "nao";
							$ogc = "nao";
							foreach($sgrupo->TEMA as $tema)
							{
								$temp = ixml($tema,"DOWNLOAD");
								if (($temp == "sim") || ($temp == "SIM"))
								{$down = "sim";}
								$temp = ixml($tema,"OGC");
								if (($temp == "") || ($temp == "sim") || ($temp == "SIM"))
								{$ogc = "sim";}						
							}
							$nome = ixml($sgrupo,"SDTIPO");
							$subgrupos[] = array("nome"=>$nome,"ogc"=>$ogc,"download"=>$down,"ogc"=>$ogc);
						}
					}
				}
				$temas = array();
				foreach($grupo->TEMA as $temar)
				{
					$down = "nao";
					$ogc = "nao";
					$temp = ixml($temar,"DOWNLOAD");
					if (($temp == "sim") || ($temp == "SIM"))
					{$down = "sim";}
					$temp = ixml($temar,"OGC");
					if (($temp == "") || ($temp == "sim") || ($temp == "SIM"))
					{$ogc = "sim";}
					$link = " ";
					$temp = ixml($temar,"TLINK");
					if ($temp != "")
					{$link = $temp;}
					$tid = ixml($temar,"TID");
					$nome = ixml($temar,"TNOME");
					$temas[] = array("tid"=>$tid,"nome"=>$nome,"link"=>$link,"download"=>$down,"ogc"=>$ogc);
				}
			}
			$conta = $conta + 1;
		}
		return (array("subgrupo"=>$subgrupos,"temasgrupo"=>$temas));
	}
/*
function: pegaListaDeTemas

Le o arquivo xml com os temas e retorna um array com a lista de temas de um subgrupo.

parameters:
$grupo - Id do grupo.

$subgrupo - Id do subgrupo

return:
array
*/
	function pegaListaDeTemas($grupo,$subgrupo,$idmenu)
	{
		include_once($this->locaplic."/admin/php/xml.php");
		$tipo = "";
		$this->xml = "";
		foreach($this->pegaListaDeMenus() as $menu)
		{
			if($menu["idmenu"] == $idmenu || $idmenu == "")
			{
				if(!isset($menu["url"])){$menu["url"] = "";} //para efeitos de compatibilidade entre vers�es do i3geo
				$ondexml = $menu["arquivo"];
				if($menu["url"] != ""){$ondexml = $menu["url"];}
				if($ondexml != "" && $this->menutemas != "")
				{$this->xml = simplexml_load_file($ondexml);}
				else //pega o xml do sistema de administra��o
				{
					//$this->xml = simplexml_load_string(geraXmlMenutemas(implode(" ",$this->perfil),$idmenu,$tipo,$this->locaplic));	
					include_once("../admin/php/classe_arvore.php");
					$arvore = new Arvore($this->locaplic);
					$temas = $arvore->formataTemasSubgrupo($subgrupo,$this->perfil);
					unset($arvore);
					return($temas);
				}
			}
		}
		$contagrupo = 0;
		$temas = array();
		foreach($this->xml->GRUPO as $g)
		{
			$incluigrupo = TRUE;
			if (ixml($g,"PERFIL") != "")
			{
				$incluigrupo = FALSE;
				$temp = ixml($g,"PERFIL");
				$perfis = str_replace(","," ",$temp);
				$perfis = explode(" ",$perfis);
				if ($this->array_in_array($this->perfil,$perfis))
				{$incluigrupo = TRUE;}
			}
			if ($incluigrupo == TRUE)
			{
				if ($contagrupo == $grupo)
				{
					$contasubgrupo = 0;
					foreach ($g->SGRUPO as $s)
					{
						$incluisgrupo = TRUE;
						if (ixml($s,"PERFIL") != "")
						{
							$incluisgrupo = FALSE;
							$temp = ixml($s,"PERFIL");
							$perfis = str_replace(","," ",$temp);
							$perfis = explode(" ",$perfis);
							if ($this->array_in_array($this->perfil,$perfis))
							{$incluisgrupo = TRUE;}
						}
						if ($incluisgrupo == TRUE)
						{
							if ($contasubgrupo == $subgrupo)
							{
								foreach($s->TEMA as $tema)
								{
									$inclui = TRUE;
									if (ixml($tema,"PERFIL") != "")
									{
										
										$inclui = FALSE;
										$temp = ixml($tema,"PERFIL");
										$perfis = str_replace(","," ",$temp);
										$perfis = explode(" ",$perfis);
										if ($this->array_in_array($this->perfil,$perfis))
										{$inclui = TRUE;}
									}
									if ($inclui == TRUE)
									{
										$down = "nao";
										if (($tema->DOWNLOAD == "sim") || ($tema->DOWNLOAD == "SIM"))
										{$down = "sim";}
										$ogc = "sim";
										if (($tema->OGC == "nao") || ($tema->OGC == "NAO"))
										{$ogc = "nao";}
										$link = " ";
										if ($tema->TLINK != "")
										{$link = ixml($tema,"TLINK");}
										$tid = ixml($tema,"TID");
										$nome = ixml($tema,"TNOME");
										$temas[] = array("nacessos"=>(ixml($tema,"NACESSOS")),"tid"=>$tid,"nome"=>$nome,"link"=>$link,"download"=>$down,"ogc"=>$ogc);
									}
								}
							}
							$contasubgrupo = $contasubgrupo + 1;
						}
					}
				}
				$contagrupo = $contagrupo + 1;
			}
		}
		return ($temas);
	}
/*
function: pegaListaDeMapas

Le o arquivo xml com a lista de mapas existente no xml $locmapas.

O perfil do usu�rio � armazenado na se��o na inicializa��o do I3Geo.

Parametros:

locmapas - endere�o do arquivo xml.

return:
array
*/
	function pegaListaDeMapas($locmapas)
	{
		//necess�rio por conta da inclusao do conexao.php
		$locaplic = $this->locaplic;
		$perfilgeral = implode(" ",$this->perfil);
		if($locmapas != "")
		{$this->xml = simplexml_load_file($locmapas);}
		else
		{
			include_once($this->locaplic."/admin/php/xml.php");
			$this->xml = simplexml_load_string(geraXmlMapas(implode(" ",$this->perfil),$this->locaplic,$this->editores));
		}
		$mapas = array();
		//pega os sistemas checando os perfis
		foreach($this->xml->MAPA as $s)
		{
			$ps = ixml($s,"PERFIL");
			$perfis = str_replace(","," ",$ps);
			$perfis = explode(" ",$perfis);
			if (($this->array_in_array($this->perfil,$perfis)) || ($ps == ""))
			{
				$n = ixml($s,"NOME");
				$i = ixml($s,"IMAGEM");
				$t = ixml($s,"TEMAS");
				$l = ixml($s,"LIGADOS");
				$e = ixml($s,"EXTENSAO");
				$o = ixml($s,"OUTROS");
				$k = ixml($s,"LINKDIRETO");
				$p = ixml($s,"PUBLICADO");
				$mapas[] =  array("PUBLICADO"=>$p,"NOME"=>$n,"IMAGEM"=>$i,"TEMAS"=>$t,"LIGADOS"=>$l,"EXTENSAO"=>$e,"OUTROS"=>$o,"LINK"=>$k);
			}
		}
		return (array("mapas"=>$mapas));
	}	
/*
function: pegaSistemas

Retorna a lista de sistemas especiais de adi��o de temas.

parameters:

Return:

Array
*/
	function pegaSistemas()
	{
		error_reporting(0);
		include_once($this->locaplic."/admin/php/xml.php");
		if ($this->locsistemas != "")
		{$xmlsistemas = simplexml_load_file($this->locsistemas);}
		else
		{$xmlsistemas = simplexml_load_string(geraXmlSistemas(implode(" ",$this->perfil),$this->locaplic,$this->editores));}
		foreach($xmlsistemas->SISTEMA as $s)
		{
			$publicado = ixml($s,"PUBLICADO");
			if(strtolower($publicado) != "nao" || $this->editor)
			{
				$nomesis = ixml($s,"NOMESIS");
				$ps = ixml($s,"PERFIL");
				$perfis = str_replace(","," ",$ps);
				$perfis = explode(" ",$perfis);
				if (($this->array_in_array($this->perfil,$perfis)) || ($ps == ""))
				{
					$funcoes = array();
					foreach($s->FUNCAO as $f)
					{
						$n = ixml($f,"NOMEFUNCAO");
						$a = ixml($f,"ABRIR");
						$w = ixml($f,"JANELAW");
						$h = ixml($f,"JANELAH");
						$p = ixml($f,"PERFIL");
						if (($this->array_in_array($this->perfil,$perfis)) || ($p == ""))
						{$funcoes[] = array("NOME"=>$n,"ABRIR"=>$a,"W"=>$w,"H"=>$h);}
					}
					$sistemas[] =  array("PUBLICADO"=>$publicado,"NOME"=>$nomesis,"FUNCOES"=>$funcoes);
				}
			}
		}
		return $sistemas;		
	}

/*
function: procurartemas

Procura um tema no menu de temas.

Le o arquivo de temas xml e retorna o nome do mapfile correspondente.

parameters:
$procurar - String que ser� procurada.
*/
	function procurartemas($procurar)
	{
		include_once($this->locaplic."/admin/php/xml.php");
		$tipo = "";
		$this->xml = "";
		if($this->menutemas != "")
		{
			foreach($this->pegaListaDeMenus() as $menu)
			{
				if(!isset($menu["url"])){$menu["url"] = "";} //para efeitos de compatibilidade entre vers�es do i3geo
				$ondexml = $menu["arquivo"];
				if($menu["url"] != ""){$ondexml = $menu["url"];}
				$this->xml[] = simplexml_load_file($ondexml);
			}
		}
		else
		{
				//$this->xml[] = simplexml_load_string(geraXmlMenutemas(implode(" ",$this->perfil),$menu["idmenu"],$tipo,$this->locaplic));	
				include_once("../admin/php/classe_arvore.php");
				$arvore = new Arvore($this->locaplic);
				$temas = $arvore->procuraTemas($procurar,$this->perfil);
				unset($arvore);
				return($temas);
		}
		$resultado = array();
		$texto = array();
		foreach ($this->xml as $xml)
		{
			$listadetemas = array();
			$subgrupo = array();
			foreach($xml->GRUPO as $grupo)
			{
				$incluigrupo = TRUE;
				$temp = ixml($grupo,"PERFIL");
				if ($temp != "")
				{
					$incluigrupo = FALSE;
					$perfis = str_replace(","," ",$temp);
					$perfis = explode(" ",$perfis);
					if ($this->array_in_array($this->perfil,$perfis))
					{$incluigrupo = TRUE;}
				}
				if ($incluigrupo == TRUE)
				{
					foreach($grupo->SGRUPO as $sgrupo)
					{
						$incluisgrupo = TRUE;
						if ($this->perfil != "")
						{
							$temp = ixml($sgrupo,"PERFIL");
							$perfis = str_replace(","," ",$temp);
							$perfis = explode(" ",$perfis);
							if (!$this->array_in_array($this->perfil,$perfis))
							{$incluisgrupo = FALSE;}
						}
						if ($incluisgrupo == TRUE)
						{
							foreach($sgrupo->TEMA as $tema)
							{
								$inclui = TRUE;
								if ($this->perfil != "")
								{
									$temp = ixml($tema,"PERFIL");
									$perfis = str_replace(","," ",$temp);
									$perfis = explode(" ",$perfis);
									if (!$this->array_in_array($this->perfil,$perfis))
									{$inclui = FALSE;}
								}
								if ($inclui == TRUE)
								{
									$down = "nao";
									$temp = ixml($tema,"DOWNLOAD");
									if (($temp == "sim") || ($temp == "SIM"))
									{$down = "sim";}
									$link = ixml($tema,"TLINK");
									$tid = ixml($tema,"TID");
									
									if(!isset($texto[$tid]))
									{
										$texto[$tid] = array("tid"=>$tid,"nome"=>(ixml($tema,"TNOME")),"link"=>$link,"download"=>$down);
										$p1 = $this->removeAcentos($procurar);
										$p1 = $this->removeAcentos(htmlentities($p1));
										$pp1 = $this->removeAcentos(ixml($tema,"TNOME"));
										$pp1 = $this->removeAcentos($pp1);
										$pp1 = $this->removeAcentos(htmlentities($pp1));
										if (stristr($pp1,$p1) || stristr(ixml($tema,"TNOME"),htmlentities($procurar)))
										{
											$listadetemas[] = $texto[$tid];
										}
										else
										if(ixml($tema,"TAGS") != "")
										{
											$pp1 = ixml($tema,"TAGS");
											$pp1 = $this->removeAcentos($pp1);
											if (stristr($pp1,$p1))
											{$listadetemas[] = $texto[$tid];}	
										}
									}
								}
							}
							if (count($listadetemas) > 0)
							{
								$subgrupo[] = array("subgrupo"=>(ixml($sgrupo,"SDTIPO")),"temas"=>$listadetemas);
							}
							$listadetemas = array();
						}
						
					}
					if (count($subgrupo) > 0)
					{
						$resultado[] = array("grupo"=>(ixml($grupo,"GTIPO")),"subgrupos"=>$subgrupo);
					}
					$subgrupo = array();
				}
			}
		}
		return ($resultado);
	}
/*
function: listaTags

Lista os tags registrados nos menus de temas.

Parametros:

rss - (opcional) endere�o de um RSS para cruzar com as tags.

nrss - (opcional) n�mero de registros no rss que ser�o considerados

*/
	function listaTags($rss="",$nrss="")
	{
		include_once($this->locaplic."/admin/php/xml.php");
		$tipo = "";
		//carrega os t�tulos e links do rss especificado
		$noticiasRSS = array(); //guarda as not�cias originais do RRS
		if($rss != "")
		{
			$conta = 0;
			foreach ( simplexml_load_file($rss)->channel->item as $item )
			{
				if($conta < $nrss)
				$noticiasRSS[] = array("desc"=>(ixml($item,"description")),"titulo"=>(ixml($item,"title")),"link"=>(ixml($item,"link")));
				$conta++;
			}	
		}
		$this->xml = array();
		foreach($this->pegaListaDeMenus() as $menu)
		{
			if(!isset($menu["url"])){$menu["url"] = "";} //para efeitos de compatibilidade entre vers�es do i3geo
			$ondexml = $menu["arquivo"];
			if($menu["url"] != ""){$ondexml = $menu["url"];}
			if($ondexml != "")
			{$this->xml[] = simplexml_load_file($ondexml);}
			else //pega o xml do sistema de administra��o
			{
				$this->xml[] = simplexml_load_string(geraXmlMenutemas(implode(" ",$this->perfil),$menu["idmenu"],$tipo,$this->locaplic));	
			}
		}

		$resultado = array();
		$noticias = array();
		foreach ($this->xml as $xml)
		{
			foreach($xml->GRUPO as $grupo)
			{
				$incluigrupo = TRUE;
				$temp = ixml($grupo,"PERFIL");
				if ($temp != "")
				{
					$incluigrupo = FALSE;
					$perfis = explode(",",$temp);
					if ($this->array_in_array($this->perfil,$perfis))
					{$incluigrupo = TRUE;}
				}
				if ($incluigrupo == TRUE)
				{
					foreach($grupo->SGRUPO as $sgrupo)
					{
						$incluisgrupo = TRUE;
						if ($this->perfil != "")
						{
							$temp = ixml($sgrupo,"PERFIL");
							$perfis = str_replace(","," ",$temp);
							$perfis = explode(" ",$perfis);
							if (!$this->array_in_array($this->perfil,$perfis))
							{$incluisgrupo = FALSE;}
						}
						if ($incluisgrupo == TRUE)
						{
							foreach($sgrupo->TEMA as $tema)
							{
								$inclui = TRUE;
								if ($this->perfil != "")
								{
									$perfis = str_replace(","," ",$temp);
									$perfis = explode(" ",$perfis);
									if (!$this->array_in_array($this->perfil,$perfis))
									{$inclui = FALSE;}
								}
								if ($inclui == TRUE)
								{
									$tid = ixml($tema,"TID");
									$tags = explode(" ",ixml($tema,"TAGS"));
									foreach ($tags as $tag)
									{
										if($tag != "")
										{
											if(!isset($resultado[$tag]))
											{
												$resultado[$tag] = array($tid);
												//busca noticias
												if(count($noticiasRSS) > 0)
												{
													foreach($noticiasRSS as $noticia)
													{
														$titulo = explode(" ",strtolower($this->removeAcentos($noticia["desc"])));
														$t = $this->removeAcentos($tag);
														if(in_array(strtolower($t),$titulo))
														{
															//echo $noticia["link"]."<br>";
															if(!isset($noticias[$tag]))
															$noticias[$tag] = array("titulo"=>$noticia["titulo"],"link"=>$noticia["link"]);
															else
															$noticias[$tag] = array_merge($noticias[$tag],array("titulo"=>$noticia["titulo"],"link"=>$noticia["link"]));
														}
													}	
												}
											}
											else
											{
												$resultado[$tag] = array_merge($resultado[$tag],array($tid));
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		ksort($resultado);
		foreach(array_keys($resultado) as $k)
		{
			
			if(isset($noticias[$k]))
			{$not = array($noticias[$k]);}
			else
			{$not = array();}
			$final[] = array("tag"=>$k,"temas"=>$resultado[$k],"noticias"=>$not);
		}
		return ($final);
	}
	
	function removeAcentos($s)
	{
		$s = ereg_replace("[����]","a",$s);
		$s = ereg_replace("[����]","A",$s);
		$s = ereg_replace("[���]","e",$s);
		$s = ereg_replace("[�]","i",$s);
		$s = ereg_replace("[�]","I",$s);
		$s = ereg_replace("[���]","E",$s);
		$s = ereg_replace("[����]","o",$s);
		$s = ereg_replace("[����]","O",$s);
		$s = ereg_replace("[���]","u",$s);
		$s = ereg_replace("[���]","U",$s);
		$s = str_replace("�","c",$s);
		$s = str_replace("�","C",$s);
		//$str = htmlentities($s);
		$str = preg_replace("/(&)([a-z])([a-z]+;)/i", '$2', $s);
		$str = preg_replace("/[^A-Z0-9]/i", ' ', $str);
		$str = preg_replace("/\s+/i", ' ', $str);
		return $str;
	}
	/*
	Function: array_in_array

	Procura ocorr�ncias de um array em outro array
	*/
	function array_in_array($needle, $haystack)
	{
    	//Make sure $needle is an array for foreach
    	if(!is_array($needle)) $needle = array($needle);
    	//For each value in $needle, return TRUE if in $haystack
    	foreach($needle as $pin)
        	if(in_array($pin, $haystack)) return TRUE;
    	//Return FALSE if none of the values from $needle are found in $haystack
    	return FALSE;
	}
	function verificaEditores($editores)
	{
		$editor = false;
		foreach ($editores as $e)
		{
			$e = gethostbyname($e);
			$ip = "UNKNOWN";
			if (getenv("HTTP_CLIENT_IP")) $ip = getenv("HTTP_CLIENT_IP");
			else if(getenv("HTTP_X_FORWARDED_FOR")) $ip = getenv("HTTP_X_FORWARDED_FOR");
			else if(getenv("REMOTE_ADDR")) $ip = getenv("REMOTE_ADDR");
			else $ip = "UNKNOWN";
			if ($e == $ip){$editor=true;}
		}
		return $editor;
	}
}
?>