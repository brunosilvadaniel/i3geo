<?php
/*
Title: Atlas

Manipula��o da interface Atlas.

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

File: i3geo/classesphp/classe_atlas.php

19/6/2007
*/
/*
Class: Atlas
*/
class Atlas
{
	/*
	Variable: $tlas
	
	Objeto Atlas
	*/
	public $atlas;
/*
Function: __construct

Cria um objeto atlas 

parameters:

$atlasxml - Endere�o do arquivo xml com as defini��es do Atlas.
*/  	
	function __construct($atlasxml)
	{
  		$this->arquivo = $atlasxml;
  		$this->xml = simplexml_load_file($atlasxml);
	}
/*
Method: pegaListaDeAtlas

Pega a lista de atlas existentes e as informa��es b�sicas sobre cada um
*/
	function pegaListaDeAtlas($tituloinstituicao)
	{
		$tituloinstituicao = mb_convert_encoding($tituloinstituicao,"HTML-ENTITIES","auto");
		$atlas = array();
		foreach($this->xml->ATLAS as $s)
		{
			$id = mb_convert_encoding($s->ID,"HTML-ENTITIES","auto");
			$titulo = mb_convert_encoding($s->TITULO,"HTML-ENTITIES","auto");
			$descricao = mb_convert_encoding($s->DESCRICAO,"HTML-ENTITIES","auto");
			$icone = mb_convert_encoding($s->ICONE,"HTML-ENTITIES","auto");
			$w = mb_convert_encoding($s->WABERTURA,"HTML-ENTITIES","auto");
			$h = mb_convert_encoding($s->HABERTURA,"HTML-ENTITIES","auto");
			$templatehtml = mb_convert_encoding($s->TEMPLATEHTML,"HTML-ENTITIES","auto");
			$atlas[] =  array("ID"=>$id,"TITULO"=>$titulo,"DESCRICAO"=>$descricao,"ICONE"=>$icone,"W"=>$w,"H"=>$h,"TEMPLATEHTML"=>$templatehtml);
		}
		return (array("atlas"=>$atlas,"tituloinstituicao"=>$tituloinstituicao));
	}
}
?>