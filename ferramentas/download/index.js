
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Download de um tema

Faz o download de um tema existente na �rvore de camadas.

Veja:

<i3GEO.tema.dialogo.download>

Arquivo:

i3geo/ferramentas/download/index.js.php

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
*/
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Classe: i3GEOF.download
*/
i3GEOF.download = {
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Veja:
	
	<DOWNLOAD2>

	Parametros:
	
	divid {String} - id do div que receber� o conteudo HTML da ferramenta

	tema {String} - c�digo do tema
	*/
	html:function(divid,tema){
		var cp,p,ins,mostraDownload;
		ins = '<p class="paragrafo" >Clique com o bot�o da direita do mouse sobre o(s) arquivo(s) abaixo para fazer o download.</p>';
		ins += '<p class="paragrafo" ><div id=i3GEOdownloadResultado ></div>';
		$i(divid).innerHTML += ins;
		mostraDownload = function(retorno){
			var ins = "",
				arqs,n,arq;
			if (retorno.data != undefined){
				retorno = retorno.data;
				arqs = retorno.arquivos.split(",");
				n = arqs.length;
				if(retorno == "erro")
				{ins = "<p style=color:red >Ocorreu um erro. O tema n�o foi encontrado. Pode ser que o c�digo do tema n�o existe na defini��o do mapfile. Informe o administrador do sistema.<br>";}
				else{
					for (arq=0;arq<n;arq++){
						ins += "<a href='"+window.location.protocol+"//"+window.location.host+"/"+arqs[arq]+"'>"+arqs[arq]+"</a><br>";
					}
				}
				if(retorno.nreg)
				{ins += "<br><br>N&uacute;mero de registros ="+retorno.nreg;}
			}
			else
			{ins = "<p style=color:red >Ocorreu um erro<br>";}
			$i("i3GEOdownloadResultado").innerHTML = ins;
			i3GEOF.download.aguarde.visibility = "hidden";
		};
		p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=download2&tema="+tema;
		cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"downloadTema",mostraDownload);		
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	
	Parametros:
	
	tema {String} - c�digo do tema
	*/	
	criaJanelaFlutuante: function(tema){
		var janela,divid,titulo;
		if(arguments.length == 0)
		{tema = i3GEO.temaAtivo;}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.download");
		};
		titulo = "Download <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=2&idajuda=82' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"300px",
			"150px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.download",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.download.aguarde = $i("i3GEOF.download_imagemCabecalho").style;
		i3GEOF.download.aguarde.visibility = "visible";
		i3GEOF.download.html(divid,tema);
	}
};
