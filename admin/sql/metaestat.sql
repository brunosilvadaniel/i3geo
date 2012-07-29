
/* drop tables */

drop table i3geoestat_dimensao_medida;
drop table i3geoestat_medida_variavel;
drop table i3geoestat_tipo_regiao;
drop table i3geoestat_conexao;
drop table i3geoestat_tipo_periodo;
drop table i3geoestat_unidade_medida;
drop table i3geoestat_variavel;




/* create tables */

-- lista controlada dos par�metros de conex�o com o banco de dados onde residem dados
create table i3geoestat_conexao
(
	codigo_estat_conexao integer not null unique primary key autoincrement,
	-- nome do banco de dados
	bancodedados text,
	-- endere�o do servidor
	host text,
	-- porta de comunica��o
	porta text,
	-- nome do usu�rio que pode acessar o banco
	usuario text,
	-- senha do usu�rio que pode acessar o banco
	senha text
);


-- identifica as tabelas que possuem colunas com geometrias de determinado local ou regi�o
create table i3geoestat_tipo_regiao
(
	codigo_tipo_regiao integer not null unique primary key autoincrement,
	nome_tipo_regiao text,
	descricao_tipo_regiao text,
	codigo_estat_conexao integer,
	-- esquema onde encontra-se a tabela com a geometria
	esquemadb text,
	-- tabela que cont�m a coluna com a geometria
	tabela text,
	-- coluna com a geometria da regi�o
	colunageo text,
	-- data do mapeamento da regi�o
	data text,
	-- id da tabela onde est� a coluna com a geometria e que identifica a regi�o de forma �nica
	identificador integer,
	-- coluna que cont�m o nome de cada regi�o ou local
	colunanomeregiao text,
	-- c�digo srid correspondente � proje��o cartogr�fica da coluna com a geometria
	srid text default '4326',
	foreign key (codigo_estat_conexao)
	references i3geoestat_conexao (codigo_estat_conexao)
);


-- lista controlada de tipos de per�odo de tempo
create table i3geoestat_tipo_periodo
(
	codigo_tipo_periodo integer not null unique primary key autoincrement,
	nome text,
	descricao text
);


-- tabela com o nome e descri��o de uma vari�vel vari�vel
create table i3geoestat_variavel
(
	codigo_variavel integer not null unique primary key autoincrement,
	nome text,
	descricao text
);


create table i3geoestat_unidade_medida
(
	codigo_unidade_medida integer not null unique primary key autoincrement,
	nome text,
	sigla text,
	-- o tipo de unidade permite que os valores sejam somados? (0 ou 1)
	permitesoma integer default 0,
	-- o tipo de unidade permite o c�lculo de m�dia aritm�tica? (0 ou 1)
	permitemedia integer default 0
);


-- descreve as colunas que cont�m valores de algum tipo de medida, por exemplo popula��o residente
create table i3geoestat_medida_variavel
(
	id_medida_variavel integer not null unique primary key autoincrement,
	codigo_unidade_medida integer,
	codigo_tipo_periodo integer,
	codigo_variavel integer,
	codigo_tipo_regiao integer,
	codigo_estat_conexao integer,
	-- esquema no banco de dados que contem a tabela
	esquemadb text,
	-- tabela no banco de dados que cont�m a coluna
	tabela text,
	-- nome da colouna que cont�m os valores da vari�vel
	colunavalor text,
	-- nome da coluna, na mesma tabela onde est�o os valores, que identifica unicamente a regi�o geogr�fica
	colunaidgeo text,
	-- filtro opcional que ser� utilizado na cl�usula where
	filtro text,
	-- titulo da medida
	nomemedida text,
	foreign key (codigo_tipo_regiao)
	references i3geoestat_tipo_regiao (codigo_tipo_regiao),
	foreign key (codigo_tipo_periodo)
	references i3geoestat_tipo_periodo (codigo_tipo_periodo),
	foreign key (codigo_estat_conexao)
	references i3geoestat_conexao (codigo_estat_conexao),
	foreign key (codigo_variavel)
	references i3geoestat_variavel (codigo_variavel),
	foreign key (codigo_unidade_medida)
	references i3geoestat_unidade_medida (codigo_unidade_medida)
);


create table i3geoestat_dimensao_medida
(
	id_dimensao_medida integer not null unique primary key autoincrement,
	coluna text,
	nomedimensao text,
	descricao text,
	-- (0 ou 1) indica se a coluna de valores da vari�vel deve ser agregada ou n�o (soma dos valores ou m�dia) conforme o tipo de unidade de medida
	agregavalores integer default 0,
	id_medida_variavel integer,
	foreign key (id_medida_variavel)
	references i3geoestat_medida_variavel (id_medida_variavel)
);



