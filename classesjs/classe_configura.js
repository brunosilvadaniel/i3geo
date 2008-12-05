/*
Class:: i3GEO.configura

Configura��o do i3geo

Define os par�metros vari�veis do i3geo. Vc pode alterar com esta classeamaioria dos par�metros que controlam
o funcionamento do i3geo.

File: i3geo/classesjs/classe_configura.js

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
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
i3GEO.configura = {

	/*
	Variable: listaDePropriedadesDoMapa
	
	Lista com as fun��es que s�o inclu�das no item "Propriedades do mapa"	
	*/
	listaDePropriedadesDoMapa: {
		"propriedades": [
		{ text: "p2", url: "javascript:tipoimagem()" },
		{ text: "p3", url: "javascript:opcoesLegenda()" },
		{ text: "p4", url: "javascript:opcoesEscala()" },
		{ text: "p5", url: "javascript:tamanho()" },
		{ text: "p6", url: "javascript:ativaEntorno()" },
		{ text: "p7", url: "javascript:ativaLogo()" },
		{ text: "p8", url: "javascript:queryMap()" },
		{ text: "p9", url: "javascript:corFundo()" },
		{ text: "p10", url: "javascript:gradeCoord()" },
		{ text: "p11", url: "javascript:template()" },
		{ text: "p12", url: "javascript:autoredesenha()"}
		]
	},
	/*
	Variable: tempoAplicar
	
	Tempo em milisegundos que ser� esperado at� que o mapa seja desenhado automaticamente.
	
	Utilizado no bot�o Aplicar, quando o usu�rio liga/desliga ou adiciona umtema
	
	*/
	tempoAplicar: 4000,
	/*
	Variable: iniciaJanelaMensagens
	
	Inicia o i3geo com a janela de mensagens aberta ou fechada.
	
	Se o cookie g_janelaMen estiver definido, essa vari�vel n�o ter� efeito
	*/
	iniciaJanelaMensagens: true,
	/*
	Function: alteraVariavel
	*/
	/*
	Function: adicionaVariavel
	*/
};
//
//para efeitos de compatibilidade
try {
	if (g_listaPropriedades)
	{i3GEO.configura.listaDePropriedadesDoMapa = g_listaPropriedades;}
}
catch(e){};
try {
	if (g_tempo_aplicar)
	{i3GEO.configura.tempoAplicar = g_tempo_aplicar;}
}
catch(e){};
try {
	if (g_janelaMen == "nao")
	{i3GEO.configura.iniciaJanelaMensagens = false;}
}
catch(e){};