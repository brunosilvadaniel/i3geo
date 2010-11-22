<?php
/*
Title: sqlite.php

Lista as defini��es do banco de dados de administra��o

Obt�m as defini��es do arquivo i3geo/menutemas/admin.db

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

i3geo/admin/php/sqlite.php
*/
if(!file_exists("../../menutemas/admin.db"))
{
	echo "O arquivo menutemas/admin.db n�o existe. Utilize i3geo/admin/criasqlite.php para criar o banco de dados SQLITE.";
	exit;
}
echo "<pre>";
$dbh = new PDO('sqlite:../../menutemas/admin.db');
echo "<br><br><span style=color:red >Lista de tabelas</span><br><br>";
$q = $dbh->query("SELECT name FROM (SELECT * FROM sqlite_master UNION ALL SELECT * FROM sqlite_temp_master) WHERE type='table' ORDER BY name",PDO::FETCH_ASSOC);
$resultado = $q->fetchAll();
foreach ($resultado as $r)
echo $r["name"]."<br>";
$q = $dbh->query("select * from sqlite_master",PDO::FETCH_ASSOC);
$resultado = $q->fetchAll();
echo "<br><br><span style=color:red >SQL no padr�o SQLITE</span><br><br>";
foreach($resultado as $r)
{
	echo $r["sql"]."<br>";
}
echo "<br><br><span style=color:red >SQL no padr�o POSTGRES</span><br><br>";
echo "<br><br>Ap�s criar as tabelas no Postgres, vc deve definir as permiss�es para os usu�rios.<br><br>";
echo "<br><br>Para usar outro banco de dados que n�o seja o default (SQLITE), voc� ter� de alterar o programa i3geo/admin/php/conexao.php<br><br>";
foreach($resultado as $r)
{
	echo str_ireplace("INTEGER PRIMARY KEY","SERIAL",$r["sql"])."<br>";
}
echo "<br><br><span style=color:red >Listagem completa</span><br><br>";

var_dump($resultado);
$dbh = null;
$dbhw = null;
?>