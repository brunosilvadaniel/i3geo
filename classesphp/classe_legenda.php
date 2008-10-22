<?php
/*
Title: classe_legenda.php

Manipula��o da legenda.

Cria legenda, edita simbolos, etc.

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

File: i3geo/classesphp/classe_legenda.php

19/6/2007
*/
/*
Class: Legenda

*/
class Legenda
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
	Variable: $grupo
	
	Array com os temas do grupo, se houver
	*/
	protected $grupo;
	/*
	Variable: $visiveis
	
	Temas do grupo que s�o vis�veis em fun��o da escala
	*/
	protected $visiveis;
	/*
	Variable: $indices
	
	Indices dos layers do grupo
	*/
	protected $indices;
	/*
	Variable: $templateleg
	
	Template da legenda
	*/
	protected $templateleg;	
	/*
	Variable: $localaplicacao
	
	Localiza��o da aplica��o
	*/
	protected $localaplicacao;	
/*
Function: __construct

Cria um objeto Legenda 

parameters:

$map_file - Endere�o do mapfile no servidor.

$locaplic - localiza��o do I3Geo no servidor

$tema - nome do tema

$template - nome do template para processar a legenda
*/

	function __construct($map_file,$locaplic="",$tema="",$template="")
	{
  		//error_reporting(E_ALL);
  		if(file_exists($locaplic."/funcoes_gerais.php"))
  		include_once($locaplic."/funcoes_gerais.php");
  		else
  		include_once("funcoes_gerais.php");
  		$this->mapa = ms_newMapObj($map_file);
  		$this->arquivo = $map_file;
  		$this->localaplicacao = $locaplic;
   		if($tema != "" && @$this->mapa->getlayerbyname($tema))
  		{
  			$this->layer = $this->mapa->getlayerbyname($tema);
  			$this->nome = $tema;
			$vermultilayer = new vermultilayer();
			$vermultilayer->verifica($map_file,$tema);
			if ($vermultilayer->resultado == 1) // o tema e multi layer
			{
				$ls = $vermultilayer->temas;
				$this->visiveis = $vermultilayer->temasvisiveis;
			}
			else
			{
				$ls[] = $tema;
				$this->visiveis = array($tema);
			}
			$this->grupo = $ls;
			foreach ($ls as $l)
			{
				$t = $this->mapa->getlayerbyname($l);
				$this->indices[] = $t->index;
			}
  		}
  		if ($template == ""){$template="legenda.htm";}
  		if(file_exists($template))
  		{
  			$this->templateleg = $template;
  			return;
  		}
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$this->templateleg = $locaplic."\\aplicmap\\".$template;}
		else
		{$this->templateleg = $locaplic."/aplicmap/".$template;}
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
function: criaLegenda

Gera a legenda processando o template HTML.

return:
string com a legenda HTML
*/
	function criaLegenda()
	{
		$l = "";
		$numlayers = $this->mapa->numlayers;
		if($this->nome != "")
		{
			//verifica se � wms
			$c = $this->layer->connectiontype;
			if (($c == 7))
			{
				return($this->tabelaLegenda());
			}
			for ($i=0;$i < $numlayers;++$i)
			{
				$la = $this->mapa->getlayer($i);
				if ($la->name != $this->nome)
				{$la->set("status",MS_OFF);}
				if ($la->group == $this->nome)
				{$la->set("status",MS_DEFAULT);}
			}
		}
		$desligar = array();
		$conta = 0;
		$desligar = array();
		for ($i=0;$i < $numlayers;++$i)
		{
			$la = $this->mapa->getlayer($i);
			if (strtoupper($la->getmetadata("ESCONDIDO")) == "SIM")
			{$la->set("status",MS_OFF);}
			if($la->status == MS_DEFAULT)
			{
				$nc = $la->numclasses;
				for ($c = 0;$c < $nc;$c++)
				{
					$classe = $la->getclass($c);
					if($classe->status == MS_OFF)
					{$desligar[] = $conta;}
					$conta = $conta + 1;
				}
			} 
		}
		$legenda = $this->mapa->legend;
		$legenda->set("template",$this->templateleg);
		$tmparray["my_tag"] = "value_of_my_tag";
		if(!$l = @$this->mapa->processlegendtemplate($tmparray))
		{return ("erro");}
		if (function_exists("mb_convert_encoding"))
		{$l = mb_convert_encoding($l,"UTF-8","ISO-8859-1");}
		return (array("legenda"=>$l,"desativar"=>$desligar));
	}
/*
function: legendaGrafica

Desenha a imagem da legenda.

return:
string de variaveis no formato javascript que permitem montar a legenda.
*/
	function legendaGrafica()
	{
		$nomeImagem = nomeRandomico();
		$imgo = $this->mapa->drawlegend();
		$nomer = ($imgo->imagepath)."leg".$nomeImagem.".png";
		$imgo->saveImage($nomer);
		$nomer = ($imgo->imageurl).basename($nomer);
		return("var legimagem='".$nomer."';var legwidth=".$imgo->width.";var legheight=".$imgo->height.";var legpath='".$imgo->imagepath."';var legurl='".$imgo->imageurl."'");
	}
/*
function: tabelaLegenda

Cria elementos para construir uma legenda no formato de tabela em HTML.

Utilizado na fun��o de edi��o de legenda e legenda de WMS

parameters:

totaliza - sim|nao indica se os totais de elementos devem ser acrescentados ao nome da classe

return:
array
*/
	function tabelaLegenda($totaliza="nao")
	{
		$linhas = array();
		foreach ($this->visiveis as $l)
		{
			$layer = $this->mapa->getlayerbyname($l);
			//verifica se � wms ou wfs
			$c = $layer->connectiontype;
			$s = $layer->getmetadata("wms_sld_url");
			if (($c == 7))
			{
				$con = $layer->connection;
				$ver = $layer->getmetadata("wms_server_version");
				$lwms = $layer->getmetadata("wms_name");
				$f = $layer->getmetadata("wms_formatlist");
				$f = explode(",",$f);
				$f = $f[0];
				$imgLeg = $con."&request=GetLegendGraphic&version=".$ver."&service=wms&layer=".$lwms."&format=".$f."&SLD=".$s;
				if ($layer->getmetadata("legendawms") != "")
				{$imgLeg = $layer->getmetadata("legendawms");}
				$linhas[] = array("tema"=>$l,"idclasse"=>"","nomeclasse"=>"","expressao"=>"","expressao"=>"","imagem"=>$imgLeg);
			}
			else
			{
				$nc = $layer->numclasses;
				for ($c = 0;$c < $nc;$c++)
				{
					$classe = $layer->getclass($c);
					$imgi = $classe->createlegendicon(30,15);
					$classe->drawlegendicon(30,15,$imgi,5,5);
					$nomes = nomeRandomico(12);
					$nomer = ($imgi->imagepath)."icone".$nomes.".png";
					$imgi->saveImage($nomer);
					$i = ($imgi->imageurl).basename($nomer);
					$nomeclasse = $classe->name;
					if (function_exists("mb_convert_encoding"))
					{$nomeclasse = mb_convert_encoding($nomeclasse,"UTF-8","ISO-8859-1");}
					$nomeexp = $classe->getexpression();
					if (function_exists("mb_convert_encoding"))
					{$nomeexp = mb_convert_encoding($nomeexp,"UTF-8","ISO-8859-1");}

					$linhas[] = array("tema"=>$l,"idclasse"=>$c,"nomeclasse"=>$nomeclasse,"expressao"=>$nomeexp,"imagem"=>$i,"proc"=>"");
				}
				if (($totaliza=="sim") && ($nc > 1))
				{
					$layer->set("template","none.htm");
					$sopen = $layer->open();
					if($sopen == MS_FAILURE){return "erro";}
					$itens = $layer->getitems();
					$total = 0;
					$nreg = array();
					for ($c = 0;$c < $nc;$c++)
					{
						$exp = $linhas[$c]["expressao"];
						if($this->layer->connectiontype == MS_POSTGIS)
						{
							$exp = str_replace("eq"," = ",$exp);
							$exp = str_replace("ne"," != ",$exp);
							$exp = str_replace("lt"," < ",$exp);
							$exp = str_replace("gt"," < ",$exp);
							$exp = str_replace("(","",$exp);
							$exp = str_replace(")","",$exp);
							$exp = str_replace("'[","",$exp);
							$exp = str_replace("]'","",$exp);
							$exp = str_replace("' [","",$exp);
							$exp = str_replace("] '","",$exp);
							$exp = str_replace("and"," and ",$exp);
							$exp = str_replace("or"," or ",$exp);
							$exp = str_replace("[","",$exp);
							$exp = str_replace("]","",$exp);
						}
						$teste = $layer->queryByAttributes($itens[0], $exp, 1);
						if ($teste == 0)
						{
							$n = $layer->getNumResults();
							$nreg[] = $n;
						}
						else {$nreg[] = "erro";}
						$total = $total + $n;
					}
					$layer->close();
					for ($c = 0;$c < $nc;$c++)
					{
						$linhas[$c]["nomeclasse"] = $linhas[$c]["nomeclasse"]." - n=".$nreg[$c]."(".(round(($nreg[$c] * 100 / $total)))."%)";
						$linhas[$c]["nreg"] = $nreg[$c];
						$linhas[$c]["totalreg"] = $total;
					}
				}
				if ($nc == 0)
				{
					$proc = "";
					if($layer->num_processing > 0){$proc = $layer->getProcessing();}
					$linhas[] = array("tema"=>$l,"idclasse"=>"","nomeclasse"=>"","expressao"=>"","imagem"=>"","proc"=>$proc);
				}
			}
		}
		return $linhas;
	}
/*
function: excluiEstilo

Exclui um estilo de uma classe.
*/
	function excluiEstilo($classe,$estilo)
	{
		if(!$this->layer){return "erro";}
		$classe = $this->layer->getclass($classe);
		$classe->deletestyle($estilo);
	}
/*
function: adicionaEstilo

Adiciona um estilo em uma classe.

return:
objeto estilo
*/
	function adicionaEstilo($classe,$estilo)
	{
		if(!$this->layer){return "erro";}
		$classe = $this->layer->getclass($classe);
		$estilo = $classe->getstyle($estilo);
		$e = ms_newStyleObj($classe,$estilo);
		return($e);
	}
/*
function: sobeEstilo


Sobe um estilo na ordem de desenho de uma classe.

parameters:
$classe - �ndice da classe.
$estilo - �ndice do estilo de uma classe que ser� clonado.
*/
	function sobeEstilo($classe,$estilo)
	{
		if(!$this->layer){return "erro";}
		$classe = $this->layer->getclass($classe);
		$classe->movestyleup($estilo);
	}
/*
function: desceEstilo

Desce um estilo na ordem de desenho de uma classe.

parameters:
$classe - �ndice da classe.

$estilo - �ndice do estilo de uma classe que ser� clonado.
*/
	function desceEstilo($classe,$estilo)
	{
		if(!$this->layer){return "erro";}
		$classe = $this->layer->getclass($classe);
		$classe->movestyledown($estilo);
	}
/*
function: listaSimbolos

Retorna uma lista de s�mbolos clic�veis no formato HTML.

Para cada tipo de simbologia deve haver um arquivo .map com as defini��es b�sicas.

Todos os s�mbolos do arquivo symbols/simbolos ser�o retornados como imagens. 

parameters:
$tipo - Tipo de representa��o do s�mbolo, 0 pontos, 1 linhas e 2 pol�gonos.

$dir_tmp - Diret�rio tempor�rio do mapserver.

$imgdir - Diret�rio tempor�rio das imagens.

return:
String no formato HTML com as imagens dos s�mbolos
*/
function listaSimbolos($tipo,$dir_tmp,$imgdir)
{
	if ($tipo == 3){$tipo = 2;} //tipo raster
	if (!file_exists($dir_tmp."/".$imgdir."/simbolos".$tipo.".inc"))
	{
		$f = fopen($dir_tmp."/".$imgdir."/simbolos".$tipo.".inc","w");
		if ($tipo == 2){$t="simpol.map";}
		if ($tipo == 0){$t="simpt.map";}
		if ($tipo == 1){$t="simlin.map";}
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$mapatemp = ms_newMapObj($this->localaplicacao."\\aplicmap\\".$t);}
		else
		{$mapatemp = ms_newMapObj($this->localaplicacao."/aplicmap/".$t);}
		$ins = "";
		$ns = $mapatemp->getnumsymbols();
		$l = $mapatemp->getlayer(0);
		$novoss = dirname($this->mapa->symbolsetfilename)."/".basename($mapatemp->symbolsetfilename);
		$this->mapa->setsymbolset($novoss);
		for ($i=0;$i < $ns;++$i)
		{
			$oSymbol = $this->mapa->getSymbolObjectById($i);
			$nomes = $oSymbol->name;
			$adiciona = ms_newLayerObj($this->mapa, $l);
			$nomel = $l->name;
			$tematemp= $this->mapa->getlayerbyname($nomel);
			$c = $tematemp->getClass(0);
			$e = $c->getstyle(0);
			$e->set("symbolname",$nomes);
			$e->set("size",5);
			$ico = $c->createLegendIcon(40,40);
			$nimg = $ico->saveWebImage();
			$pat = $this->mapa->web->imageurl;
			$ins .= "<img src='".$nimg."' style='cursor:pointer;border: 5px solid #FFFFFF' title=".$nomes." onclick='aplicarsim(this)'>";
		}
		fwrite($f,"<?php \$res = \"".$ins."\";?>");
		fclose($f);
		copy ($dir_tmp."/".$imgdir."/simbolos".$tipo.".inc",$dir_tmp."/comum/simbolos".$tipo.".inc");
		return $ins;
	}
	else
	{
		$res = "";
		include_once $dir_tmp."/comum/simbolos".$tipo.".inc";
		return $res;
	}
}
/*
function: pegaParametros

Retorna uma lista com par�metros sobre cada estilo de uma classe.

parameters:
$classe - �ndice da classe.

return:
string com o tipo do layer,id do estilo,outlinecolor,backgroundcolor,color,symbolname,size|
*/
	function pegaParametros($classe)
	{
		if(!$this->layer){return "erro";}
		$tipoLayer = $this->layer->type;
		$classe = $this->layer->getclass($classe);
		$numestilos = $classe->numstyles;
		for ($i=0;$i<$numestilos;++$i)
		{
			$linha = array();
			$estilo = $classe->getstyle($i);
			$linha[] = $i;
			$linha[] = corRGB($estilo->outlinecolor);
			$linha[] = corRGB($estilo->backgroundcolor);
			$linha[] = corRGB($estilo->color);
			$linha[] = $estilo->symbolname;
			$linha[] = $estilo->size;
			$linhas[] = $tipoLayer."#".implode("#",$linha);
		}
		//retorna tipo do layer,id do estilo,outlinecolor,backgroundcolor,color,symbolname,size
		return implode("|",$linhas);
	}
/*
function: aplicaParametro

Aplica um par�metro em um estilo de uma classe.

parameters:
$classe - �ndice da classe.

$estilo - �ndice do estilo que ser� alterado.

$outlinecolor - Cor do contorno.

$backgroundcolor - Cor do fundo.

$color - Cor da frente.

$symbolname - Nome do s�mbolo.

$size - Tamanho que ser� aplicado ao s�mbolo. 
*/
	function aplicaParametro($classe,$estilo,$outlinecolor,$backgroundcolor,$color,$symbolname,$size)
	{
		if(!$this->layer){return "erro";}
		$classe = $this->layer->getclass($classe);
		$estilo = $classe->getstyle($estilo);
		if (isset($outlinecolor))
		{
			$cor = $estilo->outlinecolor;
			$nc = explode(",",$outlinecolor);
			$cor->setRGB($nc[0],$nc[1],$nc[2]);
		}
		if (isset($backgroundcolor))
		{
			$cor = $estilo->backgroundcolor;
			$nc = explode(",",$backgroundcolor);
			$cor->setRGB($nc[0],$nc[1],$nc[2]);
		}
		if (isset($color))
		{
			$cor = $estilo->color;
			$nc = explode(",",$color);
			$cor->setRGB($nc[0],$nc[1],$nc[2]);
		}
		if ((isset($symbolname)) && ($symbolname != ""))
		{$estilo->set("symbolname",$symbolname);}
		if ((isset ($size)) && ($size != "-1"))
		{$estilo->set("size",$size);}
		if ($this->layer->getmetadata("sld") != "")
		{
			$sld = $this->layer->getmetadata("sld");
			reSLD($this->arquivo,$this->nome,$sld);
		}
		return "ok";
	}
/*
function: pegaParametrosLegImg

Pega os par�metros da legenda embebida no mapa.

return:

array - "imagecolor"=>$imagecolor,"transparent"=>transparent,"position"=>$position,"status"=>$status,"outlinecolor"=>$outlinecolor,"keyspacingy"=>$keyspacingy,"keyspacingx"=>$keyspacingx,"keysizey"=>$keysizey,"keysizex"=>$keysizex,"heigt"=>$height,"width"=>$width

*/
	function pegaParametrosLegImg()
	{
		$legenda = $this->mapa->legend;
		$height = $legenda->height;
		$width = $legenda->width;
		$keysizex = $legenda->keysizex;
		$keysizey = $legenda->keysizey;
		$keyspacingx = $legenda->keyspacingx;
		$keyspacingy = $legenda->keyspacingy;
		$outlinecolor = corRGB($legenda->outlinecolor); //Color of outline of box, -1 for no outline
		$status = $legenda->status; //MS_ON, MS_OFF, MS_EMBED
		$position = $legenda->position;
		if ($position < 99){$position = "10".$position;}
		$transparent = $legenda->transparent;
		$imagecolor = corRGB($legenda->imagecolor);
		$label = $legenda->label;
		$labelsize = $label->size;
		return(array("imagecolor"=>$imagecolor,"transparent"=>transparent,"position"=>$position,"status"=>$status,"outlinecolor"=>$outlinecolor,"keyspacingy"=>$keyspacingy,"keyspacingx"=>$keyspacingx,"keysizey"=>$keysizey,"keysizex"=>$keysizex,"height"=>$height,"width"=>$width,"labelsize"=>$labelsize));
	}
/*
function: aplicaParametrosLegImg

Aplica os par�metros da legenda embebida no mapa.

parameters:

$imagecolor

$position

$status

$outlinecolor

$keyspacingy

$keyspacingx

$keysizey

$keysizex

$heigt

$width
*/
	function aplicaParametrosLegImg($imagecolor,$position,$status,$outlinecolor,$keyspacingy,$keyspacingx,$keysizey,$keysizex,$height,$width,$labelsize)
	{
		$legenda = $this->mapa->legend;
		$legenda->set("height",$height);
		$legenda->set("width",$width);
		$legenda->set("keysizex",$keysizex);
		$legenda->set("keysizey",$keysizey);
		$legenda->set("keyspacingx",$keyspacingx);
		$legenda->set("keyspacingy",$keyspacingy);
		$corres = $legenda->outlinecolor;
		$cor = explode(",",$outlinecolor);
		$corres->setRGB($cor[0],$cor[1],$cor[2]);
		if ($status == 3)
		{$legenda->set("status",MS_EMBED);} //MS_ON, MS_OFF, MS_EMBED
		else
		{$legenda->set("status",MS_OFF);}
		$verifica = $legenda->position;
		if ($verifica < 100)
		{
			if($position > 99){$position = 3;}
		}
		$legenda->set("position",$position);
		$corres = $legenda->imagecolor;
		$cor = explode(",",$imagecolor);
		$corres->setRGB($cor[0],$cor[1],$cor[2]);
		$label = $legenda->label;
		$label->set("size",$labelsize);		
		return("ok");
	}
}
?>