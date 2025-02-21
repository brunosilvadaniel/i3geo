<?php
namespace restmapserver;

use PDO;

class Admin
{

    function __construct()
    {}

    /**
     * Obtem dados do sistema de administracao
     *
     * @param string $sql
     * @return array|false
     */
    function getData($sql = "")
    {
        $resultado = array();
        include_once (I3GEOPATH . "/classesphp/conexao.php");
        error_reporting(0);
        $q = $dbh->query($sql, PDO::FETCH_ASSOC);
        if ($q) {
            $resultado = $q->fetchAll();
            return $resultado;
        } else {
            return false;
        }
    }
    /**
     * Obtem os dados da tabela i3geoestat_medida_variavel para um id ou todos
     *
     * @param string $id_medida_variavel
     * @return array|boolean
     */
    //listaTabelaMedidaVariavel
    function i3geoestat_medida_variavel($id_medida_variavel=""){
        if ($id_medida_variavel != "") {
            $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoestat_medida_variavel where id_medida_variavel='" . $id_medida_variavel * 1 . "'";
            $data = $this->getData($sql)[0];
        } else {
            $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoestat_medida_variavel";
            $data = $this->getData($sql);
        }
        return $data;
    }
    //listaMedidaVariavel
    function i3geoestat_medida_variavel_variavel($codigo_variavel="",$id_medida_variavel=""){
        $sql = "SELECT i3geoestat_medida_variavel.*,i3geoestat_variavel.nome as nome_variavel,i3geoestat_unidade_medida.permitemedia,i3geoestat_unidade_medida.permitesoma,i3geoestat_unidade_medida.nome as unidade_medida ";
        $sql .= "FROM ".$_SESSION["esquemaadmin"]."i3geoestat_variavel ";
        $sql .= "JOIN ".$_SESSION["esquemaadmin"]."i3geoestat_medida_variavel ";
        $sql .= "ON i3geoestat_variavel.codigo_variavel = i3geoestat_medida_variavel.codigo_variavel ";
        $sql .= "LEFT JOIN ".$_SESSION["esquemaadmin"]."i3geoestat_unidade_medida ";
        $sql .= "ON i3geoestat_unidade_medida.codigo_unidade_medida = i3geoestat_medida_variavel.codigo_unidade_medida ";
        if($codigo_variavel != ""){
            $sql .= "WHERE i3geoestat_variavel.codigo_variavel = $codigo_variavel ";
            if($id_medida_variavel != ""){
                $sql .= "AND i3geoestat_medida_variavel.id_medida_variavel = $id_medida_variavel ";
            }
        }
        elseif($id_medida_variavel != "") {
            $sql .= "WHERE i3geoestat_medida_variavel.id_medida_variavel = $id_medida_variavel ";
        }
        $sql .= "ORDER BY i3geoestat_medida_variavel.nomemedida";
        $dados = $this->getData($sql);
        if($id_medida_variavel != ""){
            return $dados[0];
        }
        return $dados;
    }
    /**
     * Obtem os dados da tabela i3geoestat_unidade_medida
     * @param codigo da unidade
     */
    function i3geoestat_unidade_medida($codigo_unidade_medida=""){
        if ($codigo_unidade_medida != "") {
            $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoestat_unidade_medida where codigo_unidade_medida='" . $codigo_unidade_medida * 1 . "'";
            $sql .= " ORDER BY nome";
            $data = $this->getData($sql)[0];
        } else {
            $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoestat_unidade_medida";
            $sql .= " ORDER BY nome";
            $data = $this->getData($sql);
        }
        return $data;
    }
    /**
     * Obtem os dados da tabela i3geousr_grupotema
     *
     * @return array|boolean
     */
    function i3geousr_grupotema()
    {
        $data = $this->getData("select id_grupo,codigo_tema from " . $_SESSION["esquemaadmin"] . "i3geousr_grupotema as gt," . $_SESSION["esquemaadmin"] . "i3geoadmin_temas as te where gt.id_tema = te.id_tema");
        return $data;
    }

    /**
     * Obtem os dados publicados da tabela i3geoadmin_mapas para um id ou todos
     *
     * @param string $id_mapa
     * @return array|boolean
     */
    function i3geoadmin_mapas($id_mapa = "")
    {
        if ($id_mapa != "") {
            $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoadmin_mapas where publicado_mapa = 'sim' OR publicado_mapa = 'SIM' AND id_mapa='" . $id_mapa * 1 . "'";
            $data = $this->getData($sql)[0];
        } else {
            $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoadmin_mapas where publicado_mapa = 'sim' OR publicado_mapa = 'SIM'";
            $data = $this->getData($sql);
        }
        return $data;
    }
    /**
     * Lista uma ou todas as agregacoes de regioes existentes para um tipo de regiao
     * @param codigo do tipo de regiao
     * @param id da agregacao
     */
    function i3geoestat_agregaregiao($codigo_tipo_regiao="",$id_agregaregiao=""){
        $sql = "select * from " . $_SESSION["esquemaadmin"] . "i3geoestat_agregaregiao ";
        if($id_agregaregiao != ""){
            $sql .= "WHERE id_agregaregiao = " . $id_agregaregiao*1;
        }
        else{
            if($codigo_tipo_regiao != ""){
                $sql .= "WHERE codigo_tipo_regiao = " . $codigo_tipo_regiao*1;
            }
        }
        $sql .= " ORDER BY colunaligacao_regiaopai";
        $data = $this->getData($sql);
        if($id_agregaregiao != ""){
            return $data[0];
        } else {
            return $data;
        }
    }
    /**
     * Lista os dados de uma ou todas as classes de uma classificacao
     * @param id da classificacao
     * @param id da classe
     */
    //listaClasseClassificacao
    function i3geoestat_classes($id_classificacao,$id_classe=""){
        if(!empty($id_classificacao)){
            $sql = "SELECT * from ". $_SESSION["esquemaadmin"] ."i3geoestat_classes WHERE id_classificacao = " . $id_classificacao*1;
        }
        if(!empty($id_classe)){
            $sql = "SELECT * from ". $_SESSION["esquemaadmin"] ."i3geoestat_classes WHERE id_classe = " . $id_classe*1;
        }
        return $data = $this->getData($sql);
    }
    /**
     * Lista os dados de uma ou todas as classificacoes de uma medida de variavel
     * @param id da medida de variavel
     * @param id da classificacao
     */
    //listaClassificacaoMedida
    function i3geoestat_classificacao($id_medida_variavel,$id_classificacao=""){
        if(!empty($id_medida_variavel)){
            $sql = "SELECT * from ". $_SESSION["esquemaadmin"] ."i3geoestat_classificacao WHERE id_medida_variavel = " . $id_medida_variavel;
        }
        if(!empty($id_classificacao)){
            $sql = "SELECT * from ". $_SESSION["esquemaadmin"] ."i3geoestat_classificacao WHERE id_classificacao = " . $id_classificacao;
        }
        return $data = $this->getData($sql);
    }
    /**
     * Lista os dados de uma ou todas as regioes cadastradas
     * @param codigo do tipo de regiao
     */
    //listaTipoRegiao
    function i3geoestat_tipo_regiao($codigo_tipo_regiao="",$completo=true){
        if($completo == true){
            $colunas = "*";
        } else {
            $colunas = "codigo_tipo_regiao,nome_tipo_regiao,descricao_tipo_regiao";
        }
        $sql = "select $colunas from ". $_SESSION["esquemaadmin"] ."i3geoestat_tipo_regiao ";
        if($codigo_tipo_regiao != ""){
            $sql .= "WHERE codigo_tipo_regiao = " . $codigo_tipo_regiao*1;
            $sql .= " ORDER BY nome_tipo_regiao";
            return $this->getData($sql)[0];
        } else {
            $sql .= " ORDER BY nome_tipo_regiao";
            return $this->getData($sql);
        }
    }
    /**
     * Lista os dados de um ou de todos os parametros relacionados a uma medida de variavel
     *
     * @param string $id_medida_variavel
     * @param string $id_parametro_medida
     * @param string $id_pai
     *            id do pai (se definido, lista apenas os filhos deste)
     * @param boolean $apenasTempo
     * @param boolean $ordenaPeloPai
     * @return array
     */
    function i3geoestat_parametro_medida($id_medida_variavel, $id_parametro_medida = "", $id_pai = "", $apenasTempo = false, $ordenaPeloPai = false)
    {
        $id_medida_variavel = $id_medida_variavel * 1;
        if(empty($id_medida_variavel*1)){
            return false;
        }
        $sql = "SELECT i3geoestat_parametro_medida.*,i3geoestat_medida_variavel.* ";
        $sql .= "FROM " . $_SESSION["esquemaadmin"] . "i3geoestat_parametro_medida ";
        $sql .= "INNER JOIN " . $_SESSION["esquemaadmin"] . "i3geoestat_medida_variavel ";
        $sql .= "ON i3geoestat_parametro_medida.id_medida_variavel = i3geoestat_medida_variavel.id_medida_variavel ";
        if ($id_medida_variavel != "") {
            $sql .= "WHERE i3geoestat_parametro_medida.id_medida_variavel = $id_medida_variavel ";
            if ($id_parametro_medida != "") {
                $sql .= "AND i3geoestat_parametro_medida.id_parametro_medida = $id_parametro_medida ";
            }
        } elseif ($id_parametro_medida != "") {
            $sql .= "WHERE i3geoestat_parametro_medida.id_parametro_medida = $id_parametro_medida ";
        }
        if ($id_pai != "") {
            $sql .= " AND id_pai = $id_pai";
        }
        if ($apenasTempo == true) {
            $tempo = " AND i3geoestat_parametro_medida.tipo > 0 AND i3geoestat_parametro_medida.tipo < 5 ";
            $sql .= $tempo;
        }
        if ($ordenaPeloPai == true) {
            $sql .= " ORDER BY id_pai";
        }
        return $this->getData($sql);
    }
}
