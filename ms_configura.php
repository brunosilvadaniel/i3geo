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

Arquivo: ms_configura.php

*/
/*
	Variavel: linkedinoauth (ainda n�o implementado)
	
	Par�metros registrados no Linkedin para permitir que o i3Geo fa�a autentica��o com base na conta do usu�rio
	
	O Lin$basekedin exige que cada site seja registrado para permitir que a API de autentica��o funcione
	
	Veja o site para maiores informa��es: http://developer.linkedin.com/docs/DOC-1008

	Caso vc n�o queira permitir essa op��o, deixe essa vari�vel vazia, e.x
		
	Ao registrar utilize o valor http://meuservidor/i3geo/pacotes/openid/login.php?login

	Exemplo:
	
	$linkedinoauth = array(
		"consumerkey" => "0oQ30ge-ggKarx4HGaXVK118n8mekMBbFYTrC-agGV9hvxUXfeWwS1q7ZMvD-8LL",
		"consumersecret" => "nRGXfHp1XNMt0eCG7tWJpoCcXX1uoZseDtgiU-CRy1ajqipo4KpjjZdDUXmqZGQA"
	);	
	
	Tipo:
	{array}
*/
$linkedinoauth = "";
/*
	Variavel: facebookoauth
	
	Par�metros registrados no Facebook para permitir que o i3Geo fa�a autentica��o com base na conta do usu�rio
	
	O Facebook exige que cada site seja registrado para permitir que a API de autentica��o funcione
	
	Veja o site para maiores informa��es: http://developers.facebook.com/setup/

	Caso vc n�o queira permitir essa op��o, deixe essa vari�vel vazia, e.x
		
	Ao registrar utilize o valor http://meuservidor/i3geo/pacotes/openid/login.php?login

	Exemplo:
	
	$facebookoauth = array(
		"consumerkey" => "136279263094148",
		"consumersecret" => "679fc4a007b1d289377fa8af8f7086b6"
	);	
	
	Tipo:
	{array}
*/
$facebookoauth = array(
	"consumerkey" => "136279263094148",
	"consumersecret" => "679fc4a007b1d289377fa8af8f7086b6"
);
/*
	Variavel: twitteroauth
	
	Par�metros registrados no Twitter para permitir que o i3Geo fa�a autentica��o com base na conta do usu�rio
	
	O Twitter exige que cada site seja registrado para permitir que a API de autentica��o funcione
	
	Veja o site para maiores informa��es: http://www.snipe.net/2009/07/writing-your-first-twitter-application-with-oauth/

	Lista de aplica��es cadastradas: https://twitter.com/oauth_clients/

	Caso vc n�o queira permitir essa op��o, deixe essa vari�vel vazia, e.x
	
	$twitteroauth = "";
	
	Ao registrar a aplica��o, utilize o endere�o do i3geo em Application Website, por exemplo http://meuservidor/i3geo
	
	Ao registrar utilize como "Callback URL" o valor http://meuservidor/i3geo/pacotes/openid/login.php?login

	Exemplo:
	
	$twitteroauth = array(
		"consumerkey" => "vUvBcsOULjS0ewxuSvbS6w",
		"consumersecret" => "0Hj6uCyycDCeNOgzTUF1bBSel75KtfbnCS4bxWVqaxk",
		"requesttokenurl" => "https://twitter.com/oauth/request_token",
		"accesstokenurl" => "https://twitter.com/oauth/access_token",
		"authorizeurl" => "https://twitter.com/oauth/authorize"
	);	
	
	Tipo:
	{array}
*/
$twitteroauth = array(
	"consumerkey" => "vUvBcsOULjS0ewxuSvbS6w",
	"consumersecret" => "0Hj6uCyycDCeNOgzTUF1bBSel75KtfbnCS4bxWVqaxk",
	"requesttokenurl" => "https://twitter.com/oauth/request_token",
	"accesstokenurl" => "https://twitter.com/oauth/access_token",
	"authorizeurl" => "https://twitter.com/oauth/authorize"
);	
/*
	Variavel: mensagemInicia
	
	Mensagem de inicializa��o mostrada pelo programa ms_criamapa.php
	
	� obtida de um include para permitir a atualiza��o da vers�o nos pacotes de corre��o
	
	Tipo:
	{string}
*/
if(file_exists("versao.php"))
{include_once("versao.php");}
else
{$mensagemInicia = "";}
/*
	Variable: tituloInstituicao
	
	Nome que ser� utilizado em alguns cabe�alhos e t�tulos de p�ginas
	
	Tipo:
	{string}
*/
$tituloInstituicao = "i3Geo";
/*
	Variable: emailInstituicao
	
	Endere�o de e-mail que pode ser mostrado na interface do mapa
	
	Tipo:
	{string}
*/
$emailInstituicao = "geoprocessamento@mma.gov.br";
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
	Variable: locmapserv
	
	Localiza��o do execut�vel do Mapserver conforme deve ser acrescentado a URL ap�s o nome do host.
	
	Essa vari�vel � necess�ria em processos que utilizam o mapserver no modo CGI.
	
	Por exemplo, se o endere�o for http://localhost/cgi-bin/mapserv.exe, a vari�vel dever� conter apenas /cgi-bin/mapserv.exe
	
	Tipo:
	{string}
	*/
	$locmapserv = "/cgi-bin/mapserv.exe";
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
	Variable: postgis_mapa
	
	String de conex�o para acesso aos dados (opcional).
	
	Prefira usar o esquema de criptografia nativo do Mapserver, veja em:
	
	http://mapserver.org/utilities/msencrypt.html
	
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
	$postgis_mapa = array(
		"teste"=>"user=postgres password=postgres dbname=postgis host=localhost port=5432 options='-c client_encoding=LATIN1'",
		"postgres"=>"user=postgres password=postgres dbname=postgis host=localhost port=5432'",
	); //"user=geodados password=geodados dbname=geodados host=10.1.1.36 port=5432";
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
	//verifica se est� sendo utilizado o diret�rio "opt" ou "var"
	if(file_exists("/opt/www/html/i3geo/ms_criamapa.php")){
		$dir_tmp = "/var/tmp/ms_tmp";
		$locaplic = "/opt/www/html/i3geo";	
	}
	if(file_exists("/var/www/i3geo/ms_criamapa.php")){
		$dir_tmp = "/tmp/ms_tmp";
		$locaplic = "/var/www/i3geo";
	}
	if(file_exists("/var/www/html/i3geo/ms_criamapa.php")){
		$dir_tmp = "/tmp/ms_tmp";
		$locaplic = "/var/www/html/i3geo";
	}
	$editores = array("127.0.0.1","localhost");
	//$navegadoresLocais = "";
	$navegadoresLocais = array(
							array(
							"ip"=>"127.0.0.1",
							"drives"=>array(
										array("caminho"=>"/home","nome"=>"home")
										)
							)
						);
	$locmapserv = "/cgi-bin/mapserv";
	$R_path = "R";//se vc n�o instalou o R no seu servidor, tente o endere�o $R_path = $locaplic."/pacotes/r/linux/r";
	$postgis_mapa = "";
	$utilizacgi = "nao";
	$expoeMapfile = "sim";
	$conexaoadmin = "";//$locaplic."/admin/php/conexaopostgresql.php";
	$interfacePadrao = "openlayers.htm";
}
?>
