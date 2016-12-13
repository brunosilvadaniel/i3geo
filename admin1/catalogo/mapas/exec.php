<?php
/*
 * Licenca:
 *
 * GPL2
 *
 * i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet
 *
 * Direitos Autorais Reservados (c) 2006 Edmar Moretti
 * Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com
 *
 * Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
 * e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
 * GNU conforme publicada pela Free Software Foundation;
 *
 * Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
 * por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
 * de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
 * Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
 * Voc&ecirc; deve ter recebido uma copia da Licen&ccedil;a P&uacute;blica Geral do
 * GNU junto com este programa; se n&atilde;o, escreva para a
 * Free Software Foundation, Inc., no endere&ccedil;o
 * 59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
 */
error_reporting ( 0 );
//
// pega as variaveis passadas com get ou post
//

include_once (dirname ( __FILE__ ) . "/../../../admin/php/login.php");
if (verificaOperacaoSessao ( "admin/html/mapas" ) === false) {
	header ( "HTTP/1.1 403 Vc nao pode realizar essa operacao" );
	exit ();
}

include (dirname ( __FILE__ ) . "/../../../admin/php/conexao.php");

$id_mapa = $_POST ["id_mapa"];
testaSafeNumerico ( [
		$id_mapa
] );

$funcao = strtoupper ( $funcao );
switch ($funcao) {
	case "ADICIONAR" :
		$novo = adicionar ( $_POST ["publicado_mapa"], $_POST ["ordem_mapa"], $_POST ["perfil_mapa"], $_POST ["ligados_mapa"], $_POST ["temas_mapa"], $_POST ["desc_mapa"], $_POST ["ext_mapa"], $_POST ["imagem_mapa"], $_POST ["linkdireto_mapa"], $_POST ["nome_mapa"], $_POST ["outros_mapa"], $dbhw );
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		exit ();
		break;
	case "ALTERAR" :
		$novo = alterar ( $id_mapa, $_POST ["publicado_mapa"], $_POST ["ordem_mapa"], $_POST ["perfil_mapa"], $_POST ["ligados_mapa"], $_POST ["temas_mapa"], $_POST ["desc_mapa"], $_POST ["ext_mapa"], $_POST ["imagem_mapa"], $_POST ["linkdireto_mapa"], $_POST ["nome_mapa"], $_POST ["outros_mapa"], $_POST ["mapfile"], $dbhw );
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		$dados = pegaDados ( "SELECT id_mapa  from " . $esquemaadmin . "i3geoadmin_mapas WHERE id_mapa = $id_mapa order by ordem_mapa, nome_mapa", $dbh, false );

		if ($dados === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		$dbhw = null;
		$dbh = null;
		retornaJSON ( $dados );
		exit ();
		break;
	case "LISTAUNICO" :
		$mapfile = pegaDados ( "SELECT id_mapa, publicado_mapa, ordem_mapa, perfil_mapa, ligados_mapa, temas_mapa, desc_mapa, ext_mapa, imagem_mapa, linkdireto_mapa, nome_mapa, outros_mapa, 'nao' as contemmapfile from " . $esquemaadmin . "i3geoadmin_mapas where id_mapa = $id_mapa AND mapfile = '' or mapfile is null ", $dbh, false );
		if(count($mapfile) == 0){
			$mapfile = pegaDados ( "SELECT id_mapa, publicado_mapa, ordem_mapa, perfil_mapa, ligados_mapa, temas_mapa, desc_mapa, ext_mapa, imagem_mapa, linkdireto_mapa, nome_mapa, outros_mapa, 'sim' as contemmapfile from " . $esquemaadmin . "i3geoadmin_mapas where id_mapa = $id_mapa AND mapfile != '' and mapfile is not null ", $dbh, false );
		}
		if ($mapfile === false) {
			$dbhw = null;
			$dbh = null;
			header ( "HTTP/1.1 500 erro ao consultar banco de dados tabela de mapas" );
			exit ();
		}
		$perfis = pegaDados ( "SELECT id_perfil, perfil from " . $esquemaadmin . "i3geoadmin_perfis order by perfil", $dbh, false );
		$dbhw = null;
		$dbh = null;
		// pega a lista de temas
		include ("../../../admin/php/classe_arvore.php");
		$arvore = new Arvore ( $locaplic );
		$temas = $arvore->pegaTodosTemas ( true );
		retornaJSON ( array (
				"dados" => $mapfile[0],
				"perfis" => $perfis,
				"temas" => $temas
		) );
		break;
		case "LISTA" :
			$mapfiles = pegaDados ( "SELECT id_mapa, nome_mapa from " . $esquemaadmin . "i3geoadmin_mapas order by ordem_mapa, lower(nome_mapa)", $dbh, false );
			if ($mapfiles === false) {
				$dbhw = null;
				$dbh = null;
				header ( "HTTP/1.1 500 erro ao consultar banco de dados tabela de mapas" );
				exit ();
			}
			$perfis = pegaDados ( "SELECT id_perfil, perfil from " . $esquemaadmin . "i3geoadmin_perfis order by perfil", $dbh, false );
			$dbhw = null;
			$dbh = null;
			// pega a lista de temas
			include ("../../../admin/php/classe_arvore.php");
			$arvore = new Arvore ( $locaplic );
			$temas = $arvore->pegaTodosTemas ( true );
			retornaJSON ( array (
					"dados" => $mapfiles,
					"perfis" => $perfis,
					"temas" => $temas
			) );
			break;
	case "EXCLUIR" :
		$retorna = excluir ( $id_mapa, $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($retorna === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		retornaJSON ( $id_mapa );
		exit ();
		break;

}
cpjson ( $retorno );
function adicionar($publicado_mapa, $ordem_mapa, $perfil_mapa, $ligados_mapa, $temas_mapa, $desc_mapa, $ext_mapa, $imagem_mapa, $linkdireto_mapa, $nome_mapa, $outros_mapa, $dbhw) {
	global $esquemaadmin;
	try {
		$dataCol = array (
				"publicado_mapa" => '',
				"ordem_mapa" => 0,
				"perfil_mapa" => '',
				"desc_mapa" => '',
				"ext_mapa" => '',
				"imagem_mapa" => '',
				"linkdireto_mapa" => '',
				"outros_mapa" => '',
				"temas_mapa" => '',
				"ligados_mapa" => '',
				"nome_mapa" => '',
				"mapfile" => ''
		);
		$id_mapa = i3GeoAdminInsertUnico ( $dbhw, "i3geoadmin_mapas", $dataCol, "nome_mapa", "id_mapa" );
		$retorna = alterar ( $id_mapa, $publicado_mapa, $ordem_mapa, $perfil_mapa, $ligados_mapa, $temas_mapa, $desc_mapa, $ext_mapa, $imagem_mapa, $linkdireto_mapa, $nome_mapa, $outros_mapa, '', $dbhw );

		return $retorna;
	} catch ( PDOException $e ) {
		return false;
	}
}
// $papeis deve ser um array
function alterar($id_mapa, $publicado_mapa, $ordem_mapa, $perfil_mapa, $ligados_mapa, $temas_mapa, $desc_mapa, $ext_mapa, $imagem_mapa, $linkdireto_mapa, $nome_mapa, $outros_mapa, $mapfile, $dbhw) {
	global $convUTF, $esquemaadmin;
	if ($convUTF != true) {
		$nome_mapa = utf8_decode ( $nome_mapa );
		$desc_mapa = utf8_decode ( $desc_mapa );
		$perfil_menu = utf8_decode ( $perfil_mapa );
	}
	$perfil_mapa = str_replace ( ",", " ", trim ( $perfil_mapa ) );
	// verifica a consistencia da lista de perfis
	$perfis = pegaDados ( "SELECT perfil from " . $esquemaadmin . "i3geoadmin_perfis order by perfil", $dbw, false );
	$p = array ();
	foreach ( $perfis as $perfil ) {
		$p [] = $perfil ["perfil"];
	}
	$perfil_mapa = implode ( " ", array_intersect ( explode ( " ", $perfil_mapa ), $p ) );

	$dataCol = array (
			"publicado_mapa" => $publicado_mapa,
			"ordem_mapa" => $ordem_mapa,
			"desc_mapa" => $desc_mapa,
			"ext_mapa" => $ext_mapa,
			"imagem_mapa" => $imagem_mapa,
			"outros_mapa" => $outros_mapa,
			"nome_mapa" => $nome_mapa,
			"linkdireto_mapa" => $linkdireto_mapa,
			"temas_mapa" => $temas_mapa,
			"ligados_mapa" => $ligados_mapa,
			"perfil_mapa" => $perfil_mapa
	);
	$resultado = i3GeoAdminUpdate ( $dbhw, "i3geoadmin_mapas", $dataCol, "WHERE id_mapa = $id_mapa" );
	if ($resultado === false) {
		return false;
	}
	return $id_mapa;
}
function excluir($id_mapa, $dbhw) {
	global $esquemaadmin;
	$resultado = i3GeoAdminExclui ( $esquemaadmin . "i3geoadmin_mapas", "id_mapa", $id_mapa, $dbhw, false );
	if ($resultado === false) {
		return false;
	}
	return $resultado;
}

?>
