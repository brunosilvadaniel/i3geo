<?php
/*
Title: Vari�veis de inicializa��o ms_configura.php

Nesse programa PHP s�o definidas as vari�veis globais principais necess�rias ao funcionamento do I3Geo do lado do servidor web.

O ms_configura � inclu�do em v�rios programas do i3Geo e os valores das vari�veis devem ser editados 
caso a instala��o do i3geo tenha sido feita em um diret�rio diferente do padr�o.
No windows o diret�rio padr�o � c:\ms4w\apache\htdocs\i3geo e no linux � /opt/www/html/i3geo

Para verificar a instala��o do i3geo utilize o programa i3geo/testainstal.php, que pode fornecer algumas dicas
caso estejam ocorrendo problemas na inicialliza��o.

As vari�veis de configura��o s�o definidas em blocos diferentes conforme o sistema operacional (linux ou windows).

O ms_criamapa.php carrega o ms_configura.php e armazena a maior parte das vari�veis na se��o. Algumas vari�veis
s�o tamb�m fornecidas para o cliente (navegador) na inicializa��o do mapa e ficam dispon�veis em vari�veis javascript.


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

Arquivo: ms_configura.php

*/
/*
	Variavel: mensagemInicia
	
	Mensagem de inicializa��o mostrada pelo programa ms_criamapa.php
	
	Tipo:
	{string}
*/
$mensagemInicia = 'Vers&atilde;o 4.4 beta - Revis&atilde;o SVN 1660';
/*
	Variable: tituloInstituicao
	
	Nome que ser� utilizado em alguns cabe�alhos e t�tulos de p�ginas
	
	Tipo:
	{string}
*/
$tituloInstituicao = "i3Geo";
/*
	Variable: googleApiKey
	
	Chave utilizada pela API do Google maps.
	
	A API do Google maps � utilizada em algumas funcionalidades do i3geo. Vc deve registrar uma chave
	no site do Google para o seu endere�o de servidor web. veja como fazer em:
	http://code.google.com/apis/maps/signup.html
	
	Tipo:
	{string}
*/
$googleApiKey = "ABQIAAAAKguAlmd-hSDulF2T_tfWMxT3OAK09d_ZSDyC36iPGlww-4j-9xSrR2ZZUxVeZC01q8anfe5ntl_U4w";

if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
{
	/*
	Variable: navegadoresLocais
	
	Ip dos usuarios que podem navegar no servidor para acessar arquivos de dados geogr�ficos.
	
	O i3geo possibilita que os usu�rios acessem dados geogr�ficos no servidor diretamente, navegando pelo sistema de arquivos.
	Isso possibilita o acesso aos dados mesmo que n�o constem na �rvore de temas definida em menutemas/menutemas.xml
	Por seguran�a, essa funcionalidade s� � ativada para n�meros IP espec�ficos, definidos nessa vari�vel.
	
	Para cada IP registrado, deve-se definir os diret�rios que ser�o acess�veis, conforme mostrado abaixo.
	
	A valida��o do IP � feita com javascript, na inicializa��o do mapa, a vari�vel javascript objmapa.navegacaoDir � definida como sim (caso $navegadoresLocais for diferente de "") ou nao.
	
	Se objmapa.navegacaoDir for igual a "sim", ou seja, $navegadoresLocais � diferente de "", na guia de adi��o de temas da interface HTML, ser� mostrada a op��o de navega��o. Portanto, se vc n�o quiser que essa op��o seja ativada, mantenha essa vari�vel igual a
	
	$navegadoresLocais = "";
	
	Com a op��o ativa na interface do mapa, o ip do cliente � verificado e caso estiver registrado no array, a navega��o pelos diret�rios do servidor ser� permitida. Para mais detalhes, veja a ferramenta i3geo/ferramentas/navegacaodir
	 
	Tipo:
	{array}
	*/
	
	$navegadoresLocais = array(
							array(
							"ip"=>"127.0.0.1",
							"drives"=>array(
										array("caminho"=>"c:/","nome"=>"c"),
										array("caminho"=>"d:/","nome"=>"d")
										)
							)
						);
	/*
	Variable: editores
	
	Ip dos usuarios que podem administrar o i3geo via navegador.
	
	Separe os ips por v�rgula. Os usu�rios que tiverem seus ips listados, poder�o editar o diret�rio i3geo/temas, desde que os mesmos tenham direito de leitura e escrita nesse diret�rio.
	
	Tipo:
	{array}
	*/
	$editores = array("127.0.0.1","localhost");
	/*
	Variable: dir_tmp
	
	Caminho completo do diret�rio tempor�rio utilizado pelo mapserver.
	
	Tipo:
	{string}
	*/
	$dir_tmp = "c:/ms4w/tmp/ms_tmp";
	/*
	Variable: locaplic
	
	Caminho completo onde fica o I3Geo
	
	Tipo:
	{string}
	*/
	$locaplic = "c:/ms4w/apache/htdocs/i3geo";
	/*
	Variable: temasdir
	
	Caminho completo do diret�rio onde ficam os arquivos .map correspondentes aos temas dispon�veis
	Esta vari�vel n�o est� implementada completamente. Os mapfiles devem ficar obrigatoriamente no diret�rio temas
	
	Tipo:
	{string}
	*/
	$temasdir = $locaplic."/temas"; //"c:/ms4w/apache/htdocs/i3geo/temas";
	/*
	Variable: temasaplic
	
	Caminho completo onde ficam os arquivos .map espec�ficos do I3Geo
	
	Tipo:
	{string}
	*/
	$temasaplic = $locaplic."/aplicmap";//"c:\ms4w\apache\htdocs\i3geo\aplicmap";
	/*
	Variable: locmapserv
	
	Localiza��o do execut�vel do Mapserver conforme deve ser acrescentado a URL ap�s o nome do host.
	
	Essa vari�vel � necess�ria em processos que utilizam o mapserver no modo CGI.
	
	Por exemplo, se o endere�o for http://localhost/cgi-bin/mapserv.exe, a vari�vel dever� conter apenas /cgi-bin/mapserv.exe
	
	Tipo:
	{string}
	*/
	$locmapserv = "/cgi-bin/mapserv.exe";
	/*
	Variable: locsistemas
	
	Onde fica o xml que ser� utilizado para complementar a lista de temas dispon�veis na �rvore de adi��o de temas.
	
	Se for "" ser� utilizado o sistema de administra��o do i3geo (veja i3geo/admin).
	
	Com base no arquivo xml � montada uma �rvore de op��es que � adicionada � arvore de temas mostrada na guia "Adiciona" do i3geo.
	
	Por meio dessa nova �rvore pode-se disparar programas PHP que executam opera��es especiais para a montagem de uma nova camada a ser adicionada ao mapa.
	
	Veja a documenta��o espec�fica do arquivo sistemas.xml para maiores detalhes.
	
	Tipo:
	{string}
	*/
	$locsistemas = "";
	/*
	Variable: locidentifica 
	
	Onde fica o xml que ser� utilizado para complementar a lista de temas disppon�veis na ferramenta de identifica��o.
	
	Se for "" ser� utilizado o sistema de administra��o do i3geo (veja i3geo/admin).		
	
	Com base no arquivo xml � montada uma lista de op��es que � adicionada � lista de temas mostrada ferramenta de identifica��o de elementos no mapa.
	
	Por meio dessa lista pode-se disparar programas PHP que executam opera��es especiais para a obten��o de dados com base em um par de coordenadas xy.
	
	Veja a documenta��o espec�fica do arquivo identifica.xml para maiores detalhes.
	
	Tipo:
	{string}
	*/
	$locidentifica = "";
	/*
	Variable: locmapas 
	
	Onde fica o xml, para preencher a guia mapas.
	
	Se for "" ser� utilizado o sistema de administra��o do i3geo (veja i3geo/admin).	
	
	A guia "Mapas" mostra uma lista de links que permitem abrir mapas espec�ficos. Essa lista � utilizada tamb�m pela vers�o mobile do i3geo.
	
	Veja a documenta��o espec�fica do arquivo mapas.xml para maiores detalhes.
	
	Tipo:
	{string}
	*/
	$locmapas = "";
	/*
	Variable: R_path
	
	Onde esta o executavel do software R
	
	O R � um pacote estat�stico utilizado pelo I3Geo para gera��o de gr�ficos e an�lises estat�sticas
	Se vc n�o possui o R instalado, comente a linha abaixo
	
	Tipo:
	{string}
	*/
	$R_path = "c:/r/win/bin/R.exe";
	/*
	Depreciado - n�o � mais necess�rio na vers�o 5.x do Mapserver
	string de conex�o com o banco de dados postgis utilizada para realliza��o de c�lculos
	se n�o existir, deixe em branco
	*/
	$postgis_con = "";
	/*
	Depreciado - n�o � mais necess�rio na vers�o 5.x do Mapserver
	srid utilizado nos c�lculos que exigem proje��o equivalente
	*/
	$srid_area = 1;
	/*
	Variable: postgis_mapa
	
	String de conex�o para acesso aos dados (opcional).
	
	Com o uso opcional dessa vari�vel � poss�vel esconder a string de conex�o com o banco de dados. O Mapserver
	n�o permite esconder essa string, por isso, no i3geo, foi implementado um esquema de substitui��o.
	Toda vez que um objeto "map" � criado via PHP Mapscript, a string de conex�o � substitu�da de " " para o valor de $postgis_mapa.
	Se n�o for desejado a substitui��o, deixe essa vari�vel em branco.
	Se vc especificar essa vari�vel, o mapa ser� for�ado a recusar o modo de opera��o CGI.
	
	Para mais detalhes veja a fun��o substituiCon em classesphp/funcoes_gerais.php
	
	Importante - se vc usar o modo de substitui��o de strings, as interfaces que dependem do modo CGI
	para funcionarem, n�o ser�o capazes de acessar os dados. Isso afeta por exemplo, a interface Google Maps e Openlayers.
	
	exemplo - 
	
	$postgis_mapa = array(
		"conexao1"=>"user=geodados password=geodados dbname=geodados host=10.1.1.36 port=5432",
		"conexao2"=>"user=geodados password=geodados dbname=geodadosteste host=10.1.1.36 port=5432"
	)
	
	Tipo:
	{array ou  string}
	*/
	$postgis_mapa = array("teste"=>"user=postgres password=postgres dbname=pgutf8 host=localhost port=5432 options='-c client_encoding=LATIN1'"); //"user=geodados password=geodados dbname=geodados host=10.1.1.36 port=5432";
	/*
	Variable: menutemas
	
	Array com a lista de arquivos xml que ser�o incluidos na guia de adi��o de temas. Se for "", ser� utilizado o arquivo default menutemas/menutemas.xml.
	
	Esse xml define a lista de temas que ser�o mostrados na guia "Adiciona".
	
	Para mais detalhes veja a documenta��o espec�fica do arquivo menutemas/menutemas.xml
	
	Utilize o caminho completo no servidor para o nome dos wml, assim vc evita problemas em servi�os do tipo kml e ogc
	
	Example:

	$menutemas = array(
		array("publicado"=>"sim","idmenu"=>"A","arquivo"=>"http://localhost/i3geo/menutemas/geopr.xml","status"=>"fechado"),
		array("publicado"=>"sim","idmenu"=>"B","arquivo"=>"http://localhost/i3geo/menutemas/menutemas.xml","status"=>"aberto")
		);

		
	Para usar o menu default, utilize apenas $menutemas = ""; nesse caso, os menus ser�o obtidos do 
	banco de dados de administra��o. Para editar o banco de dados utilize http://localhost/i3geo/admin
	
	Tipo:
	{string}
	*/
	$menutemas = "";
	/*
	Variable: utilizacgi
	
	Vari�vel indicando se o desenho do corpo do mapa ser� baseado no modo cgi.
	
	Por default, o mapserver desenha o mapa via php, por�m, pode-se alterar o modo de desenho.
	
	No modo normal, a imagem do mapa � gerada e armazenada no diret�rio ms_tmp. Ap�s a gera��o da imagem 
	o endere�o do arquivo � retornado ao mapa (retorno via Ajax) e o javascript se encarrega de alterar o
	endere�o da imagem no navegador. Com o uso do CGI a imagem n�o � gerada, sendo repassado ao navegador
	o endere�o do cgi acrescentado do nome do mapfile, fazendo com que a imagem seja retornada diretamente.
	
	Em alguns casos o uso do cgi torna a aplica��o mais r�pida.
	
	Tipo:
	{string}
	*/
	$utilizacgi = "nao";
	/*
	 Variable: atlasxml
	 
	 Indica o nome do arquivo xml que ser� utilizado na interface Atlas do i3geo.
	 
	 Pode ser utilizado o caminho relativo, tendo como base i3geo/diretorio
	 
	 Tipo:
	 {string}
	*/
	$atlasxml = "";
	/*
	 Variable: expoeMapfile
	 
	 Essa vari�vel controla se o nome do mapfile atual ser� ou n�o retornado para a aplica��o via ajax.
	 
	 Quando essa vari�vel for definida como "nao" algumas das funcionalidades do i3geo poder�o ficar prejudicadas, mas sem comprometimento das fun��es principais.
	 
	 Tipo:
	 {string}
	*/
	$expoeMapfile = "sim";
	/*
	 Variable: conexaoadmin
	 
	 Arquivo PHP que define a string de conex�o (PDO) com o banco de dados administrativo.
	 
	 Esse arquivo � inclu�do no programa i3geo/admin/conexao.php
	 
	 O banco de dados administrativo � utilizado para definir coisas como a �rvore de temas, �rvore de mapas, etc.
	 
	 O banco de dados, originalmente, � montado em SQLITE, por�m, em ambientes corporativos, sugere-se o uso de bancos de daods mais robustos.
	 
	 Se voc� quiser utilizar a conex�o default, baseado no SQLITE, mantenha essa vari�vel vazia.
	 
	 O uso do banco de dados n�o � obrigat�rio, uma vez que os arquivos podem ser mantidos em disco (arquivos XML).
	
	 O programa PHP que estabelece a conex�o deve retornar objetos com nomes padronizados. Veja o arquivo i3geo/admin/conexao.php para maiores detalhes.
	
	 Exemplos:
	 
	 $conexaoadmin = $locaplic."/admin/php/conexaopostgresql.php";
	 $conexaoadmin = $locaplic."/admin/php/conexaomma.php";
	
	Tipo:
	{string}
	*/
	$conexaoadmin = "";
	/*
	 Variable: interfacePadrao
	 
	 Interface padr�o utilizada para abrir o mapa.
	 
	 A interface pode ser um arquivo com as extens�es .htm .html .phtml
	 
	 O arquivo deve estar armazenado em i3geo/aplicmap
	 
	 A interface padr�o � utilizada quando n�o � definida nenhuma interface via URL.
	 
	 Tipo:
	 {string}
	*/
	$interfacePadrao = "openlayers.htm";
}
else //se for linux
{
	$editores = array("127.0.0.1","localhost");
	$dir_tmp = "/var/tmp/ms_tmp";
	$temasdir = "/opt/www/html/i3geo/temas";
	$temasaplic = "/opt/www/html/i3geo/aplicmap";
	$locmapserv = "/cgi-bin/mapserv";
	$locaplic = "/opt/www/html/i3geo";
	$locsistemas= "";//"http://dsvmapas.mma.gov.br/i3geo/menutemas/sistemas.xml";
	$locidentifica = "";//"http://dsvmapas.mma.gov.br/i3geo/menutemas/identifica.xml";
	$locmapas = "";//"http://dsvmapas.mma.gov.br/abremapa.php?id=xml";
	$R_path = "R";//se vc n�o instalou o R no seu servidor, tente o endere�o $R_path = $locaplic."/pacotes/r/linux/r";
	$postgis_con = "";
	$srid_area = 1;
	$postgis_mapa = "";
	$menutemas = ""; 
	$utilizacgi = "nao";
	$atlasxml = "";//"../menutemas/atlas.xml";
	$expoeMapfile = "sim";
	$conexaoadmin = "";
	$interfacePadrao = "geral.htm";
}
?>
