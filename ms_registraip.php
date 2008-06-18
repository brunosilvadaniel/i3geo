<?php
/*
Title: ms_registraip.php

Com esta op��o ativada, toda vez que um usu�rio abre o i3geo seu IP � identificado e a coordenada geogr�fica � pesquisada 
no banco de dados pacotes/geoip/GeoLiteCity.dat. A coordenada � ent�o registrada em um banco de dados cuja conex�o � definida 
na vari�vel $conexao.
Com base nesses registros, � poss�vel criar um tema que mostra a localiza��o dos visitantes registrados.

Se vc n�o quiser que essa opera��o seja executada, basta comentar o c�digo todo ou retirar o include existente em 
ms_criamapa.php. Se n�o existir o arquivo pacotes/geoip/GeoLiteCity.dat, o programa tamb�m n�o funcionar�.

� preciso tamb�m que exista o arquivo pacotes/geoip/GeoLiteCity.dat, que pode ser obtido em http://www.maxmind.com/


Para mostrar os visitantes, basta usar o tema temas/visitantes.map. Exemplo

http://host/i3geo/ms_criamapa.php?temasa=visitantes&layers=visitantes

Esse mapfile deve ser editado para refletir a conex�o correta ao banco de dados.

Para o funcionamento correto dessa fun��o, deve-se ter o pacote geoip instalado em i3geo/pacotes.

� necess�rio tamb�m alterar os par�metros de query no banco de dados e conex�o para refletir as configura��es locais do banco de dados.

As informa��es sobre o IP do cliente s�o armazenados em uma tabela em seu banco de dados. Essa tabela deve ser criada e estar acess�vel para leitura e escrita.

Exemplo de script para cria��o da tabela:

CREATE TABLE visitantes_i3geo
(
  gid serial NOT NULL,
  latitude numeric,
  longitude numeric,
  n integer,
  CONSTRAINT i3geo_visitantes_pkey PRIMARY KEY (gid)
) 
WITHOUT OIDS;
ALTER TABLE visitantes_i3geo OWNER TO pgsql;
GRANT ALL ON TABLE visitantes_i3geo TO pgsql;
GRANT SELECT ON TABLE visitantes_i3geo TO geodados;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE visitantes_i3geo TO geoeditor;
COMMENT ON TABLE visitantes_i3geo IS 'Registra as coordenadas dos usu�rios que acessam o I3Geo. � mantido pelo i3geo/ms_criamapa.php.';

File: i3geo/ms_registraip.php

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

*/
if (file_exists($locaplic."/pacotes/geoip") && file_exists($locaplic."/pacotes/geoip/GeoLiteCity.dat"))
{
	$r["latitude"] = "";
	require_once($locaplic."/classesphp/funcoes_gerais.php");
	$conexao = "host=10.1.1.36 port=5432 dbname=geodados user=pgsql password=pgsql";
	//identifica o IP do usu�rio
	$ip = pegaIPcliente();
	//$ip="200.252.111.1";
	$r = ip2geo($ip,$locaplic);
	if($r["latitude"] == null)
	{
		$ip = pegaIPcliente2();
		$r = ip2geo($ip);
	}
	//registra no banco o IP
	if(($r["latitude"] != null) && ($r["latitude"] != ""))
	{
		$pgconn = pg_connect($conexao);
		if($pgconn)
		{
			//
			$sqlVerificaExistencia = "select * from visitantes_i3geo where latitude = ".$r["latitude"]." and longitude = ".$r["longitude"];
			//
			$result = pg_query($pgconn, $sqlVerificaExistencia);
			$numrows = pg_num_rows($result);
			if ($numrows != 0)
			{
				//
				$sqlGravaMaisUm = "update visitantes_i3geo set n = n+1 where (latitude = ".$r["latitude"]." and longitude = ".$r["longitude"].")";
				//
				$result = pg_query($pgconn, $sqlGravaMaisUm);
			}
			else
			{
				//
				$sqlGravaNovo = "insert into visitantes_i3geo (gid,latitude,longitude,n) values(default,".$r["latitude"].",".$r["longitude"].",1)";
				//
				$result = pg_query($pgconn, $sqlGravaNovo);		
			}
			pg_close($pgconn);
		}
	}
}
?>