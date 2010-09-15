<?php
/*
Title: Exemplo de arquivo de conex�o alternativo

Esse programa pode ser inclu�do em ms_configura.php caso se queira alterar o banco de dados default e usar um banco Postgres

dbhw - objeto PDO com a conex�o para leitura e escrita

dbh - objeto PDO com a conex�o para leitura

Licen�a:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

Arquivo: i3geo/admin/php/conexaomma.php

*/
try
{
	$dbh = new PDO('pgsql:dbname=geodados;user=geodados;password=geodados;host=pgsql1.mma.gov.br');
	$dbhw = new PDO('pgsql:dbname=geodados;user=pgsql;password=pgsql;host=pgsql1.mma.gov.br');
}
catch (PDOException $e)
{
   	print "Erro ao criar o objeto PDO!: " . $e->getMessage() . "<br/> Talvez exista alguma incompatibilidade entre o PHP e o banco admin.db. Vc pode apagar o arquivo menutemas/admin.db e recria-lo com admin/php/criasqlite.php";
   	die();
}
$convUTF = false;
?>
