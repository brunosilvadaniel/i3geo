<?php
/*
Title: Vari�veis de inicializa��o.

Armazena as vari�veis de inicializa��o necess�rias ao funcionamento do I3Geo.

O ms_configura � inclu�do em v�rios programas do I3Geo.

As vari�veis de configura��o devem ser definidas para linux e windows.

File: ms_configura.php

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

About: Vari�veis

editores - ip dos usuarios que podem administrar via navegador

dir_tmp - caminho completo do diret�rio tempor�rio utilizado pelo mapserver

temasdir - caminho completo do diret�rio onde ficam os arquivos .map correspondentes aos temas dispon�veis

temasaplic - caminho completo onde ficam os arquivos .map espec�ficos do I3Geo

locmapserv - localiza��o do execut�vel do Mapserver conforme deve ser acrescentado a URL ap�s o nome do host

locaplic - caminho completo onde fica o I3Geo

locsistemas - onde fica o xml, relativo ao diret�rio i3geo, que ser� embutido na lista de temas com sistemas locais, se for "" n�o ser� feita nenhuma inclus�o

locidentifica - onde fica o xml, relativo ao diret�rio i3geo, que ser� embutido na lista de identificacao, se for "" n�o ser� feita nenhuma inclus�o

locmapas - onde fica o xml, para preencher a guia mapas. Se for vazio a guia n�o ser� mostrada no mapa

R_path - onde esta o executavel do pacote R. O R � um pacote estat�stico utilizado pelo I3Geo para gera��o de gr�ficos e an�lises estat�sticas. Se vc n�o possui o R instalado, comente a linha abaixo

postgis_con - string de conex�o com o banco de dados postgis para realiza��o de c�lculos, se n�o existir, deixe em branco

srid_area - srid utilizado nos c�lculos que exigem proje��o equivalente

postgis_mapa - string de conex�o com o banco de dados para substitui��o do CONNECTION " ". Os layers que tiverem CONNECTION " " ter�o a string de conex�o substitu�da por esse valor.
*/
$mensagemInicia = "I3Geo vers�o 3.6";
if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
{
	//ip dos usuarios que podem administrar via navegador
	$editores = array("127.0.0.1");
	//caminho completo do diret�rio tempor�rio utilizado pelo mapserver
	$dir_tmp = "c:/ms4w/tmp/ms_tmp";
	//caminho completo do diret�rio onde ficam os arquivos .map correspondentes aos temas dispon�veis
	$temasdir = "c:/ms4w/apache/htdocs/i3geo/temas";
	//caminho completo onde ficam os arquivos .map espec�ficos do I3Geo
	$temasaplic = "c:\ms4w\apache\htdocs\i3geo\aplicmap";
	//localiza��o do execut�vel do Mapserver conforme deve ser acrescentado a URL ap�s o nome do host
	$locmapserv = "/cgi-bin/mapserv.exe";
	//caminho completo onde fica o I3Geo
	$locaplic = "c:/ms4w/apache/htdocs/i3geo";
	// onde fica o xml, relativo ao diret�rio i3geo, que ser� embutido na lista de temas com sistemas locais, se for "" n�o ser� feita nenhuma inclus�o
	$locsistemas = "http://localhost/i3geo/menutemas/sistemas.xml";
	// onde fica o xml, relativo ao diret�rio i3geo, que ser� embutido na lista de identificacao, se for "" n�o ser� feita nenhuma inclus�o
	$locidentifica = "http://localhost/i3geo/menutemas/identifica.xml";
	// onde fica o xml, para preencher a guia mapas. Se for vazio a guia n�o ser� mostrada no mapa
	//$locmapas = "http://mapas.mma.gov.br/abremapa.php?id=xml";
	$locmapas = "http://localhost/i3geo/menutemas/mapas.xml";
	//onde esta o executavel do pacote R
	//o R � um pacote estat�stico utilizado pelo I3Geo para gera��o de gr�ficos e an�lises estat�sticas
	//se vc n�o possui o R instalado, comente a linha abaixo
	$R_path = "c:/r/win/bin/R.exe";
	//string de conex�o com o banco de dados postgis utilizada para realliza��o de c�lculos
	//se n�o existir, deixe em branco
	$postgis_con = "";
	//srid utilizado nos c�lculos que exigem proje��o equivalente
	$srid_area = 1;
	//string de conex�o para acesso aos dados
	//os mapfiles do diret�rio temas que tiverem CONNECTION " ", ter�o a string de conex�o substitu�da por esse valor
	//se n�o for desejado a substitui��o, deixe essa vari�vel em branco
	$postgis_mapa = "";
}
else //se for linux
{
	$editores = array("10.1.15.207","10.1.13.206","10.1.18.78");
	$dir_tmp = "/var/tmp/ms_tmp";
	$temasdir = "/opt/www/html/i3geo/temas";
	$temasaplic = "/opt/www/html/i3geo/aplicmap";
	$locmapserv = "/cgi-bin/mapserv";
	$locaplic = "/opt/www/html/i3geo";
	$locsistemas= "http://mapas.mma.gov.br/i3geo/menutemas/sistemas.xml";
	$locidentifica = "http://mapas.mma.gov.br/i3geo/menutemas/identifica.xml";
	$locmapas = "http://mapas.mma.gov.br/abremapa.php?id=xml";
	$R_path = "R";//se vc n�o instalou o R no seu servidor, tente o endere�o $R_path = $locaplic."/pacotes/r/linux/r";
	$postgis_con = "user=geodados password=geodados dbname=geodados host=mapas.mma.gov.br port=5432";
	$srid_area = 1;
	$postgis_mapa = "user=geodados password=geodados dbname=geodados host=10.1.1.36 port=5432";
}
?>
