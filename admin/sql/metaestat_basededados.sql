-- i3geoestat_conexao
INSERT INTO i3geoestat_conexao (codigo_estat_conexao, bancodedados, host, porta, usuario, senha) VALUES ('1', 'dbspo', 'localhost', '5432', 'postgres', 'postgres');


-- i3geoestat_tipo_periodo
INSERT INTO i3geoestat_tipo_periodo (codigo_tipo_periodo, nome, descricao) VALUES ('1', 'Anual', '');
INSERT INTO i3geoestat_tipo_periodo (codigo_tipo_periodo, nome, descricao) VALUES ('2', 'Mensal', '');


-- i3geoestat_tipo_regiao
INSERT INTO i3geoestat_tipo_regiao (codigo_tipo_regiao, nome_tipo_regiao, descricao_tipo_regiao, codigo_estat_conexao, esquemadb, tabela, colunageo, data, identificador, colunanomeregiao, srid, colunacentroide) VALUES ('1', 'Munic�pio', 'Limites municipais', '1', 'public', 'tb_ibge', 'the_geom', '', 'ibge', 'no_cidade', '4326', 'the_geom2');


-- i3geoestat_unidade_medida
INSERT INTO i3geoestat_unidade_medida (codigo_unidade_medida, nome, sigla, permitesoma, permitemedia) VALUES ('1', 'Unidade', 'Un', '1', '1');


-- i3geoestat_medida_variavel
INSERT INTO i3geoestat_medida_variavel (id_medida_variavel, codigo_unidade_medida, codigo_tipo_periodo, codigo_variavel, codigo_tipo_regiao, codigo_estat_conexao, esquemadb, tabela, colunavalor, colunaidgeo, filtro, nomemedida) VALUES ('1', '1', '2', '1', '1', '1', 'dbacoes_saude', 'tb_farmacia_pop', 'nu_farm_funcionando', 'co_ibge', '', 'N�mero de farm�cias em funcionamento por m�s e ano');


-- i3geoestat_dimensao_medida
INSERT INTO i3geoestat_dimensao_medida (id_dimensao_medida, coluna, nomedimensao, descricao, agregavalores, id_medida_variavel) VALUES ('1', "to_date(mes_farm_pop||' '||ano_farm,'MM YYYY') as mes", 'm�s e ano', '', '0', '1');
INSERT INTO i3geoestat_dimensao_medida (id_dimensao_medida, coluna, nomedimensao, descricao, agregavalores, id_medida_variavel) VALUES ('2', 'ano_farm', 'ano', '', '1', '1');


-- i3geoestat_variavel
INSERT INTO i3geoestat_variavel (codigo_variavel, nome, descricao) VALUES ('1', 'Farm�cias populares existentes', 'Quantidade de farm�cias populares existentes');


-- i3geoestat_classificacao
INSERT INTO i3geoestat_classificacao (id_classificacao, nome, id_medida_variavel, observacao) VALUES ('1', 'Pela m�dia', '1', '');


-- i3geoestat_classes
INSERT INTO i3geoestat_classes (id_classe, expressao, titulo, vermelho, verde, azul, id_classificacao, tamanho, simbolo, overmelho, overde, oazul, otamanho) VALUES ('1', '([nu_farm_funcionando] < 1)', 'Nenhuma', '255', '0', '0', '1', '', '', '0', '0', '0', '');
INSERT INTO i3geoestat_classes (id_classe, expressao, titulo, vermelho, verde, azul, id_classificacao, tamanho, simbolo, overmelho, overde, oazul, otamanho) VALUES ('2', '([nu_farm_funcionando] = 1)', 'Uma', '0', '255', '0', '1', '', '', '', '', '', '');
INSERT INTO i3geoestat_classes (id_classe, expressao, titulo, vermelho, verde, azul, id_classificacao, tamanho, simbolo, overmelho, overde, oazul, otamanho) VALUES ('3', '([nu_farm_funcionando] > 1)', 'Mais de uma', '0', '0', '255', '1', '', '', '', '', '', '');


-- i3geoestat_medida_variavel_link
INSERT INTO i3geoestat_medida_variavel_link (link, id_medida_variavel, nome, id_link) VALUES ('http://portal.saude.gov.br/portal/saude/area.cfm?id_area=1095', '1', 'Site das F�rmacias Populares', '1');


-- i3geoestat_fontinfo_medida
INSERT INTO i3geoestat_fonteinfo_medida (id_medida_variavel, id_fonteinfo) VALUES ('1', '1');


-- i3geoestat_fonteinfo
INSERT INTO i3geoestat_fonteinfo (id_fonteinfo, titulo, link) VALUES ('1', 'Minist�rio da Sa�de', 'http://saude.gov.br');


