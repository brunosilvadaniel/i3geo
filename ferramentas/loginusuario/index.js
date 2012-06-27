/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Login

Abre di�logo de login

Arquivo:

i3geo/ferramentas/loginusuario/index.js.php

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
Classe: i3GEOF.loginusuario
*/
i3GEOF.loginusuario = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.loginusuario.html();
			new YAHOO.widget.Button(
				"i3GEOFloginusuario",
				{onclick:{fn: i3GEOF.loginusuario.enviar}}
			);
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '' +
		'<p class="paragrafo" >Usu�rio:<br>' +
		'<input id=i3geousuario type=text style="width:250px;" value=""/>' +
		'<p class="paragrafo" >Senha:<br>' +
		'<input id=i3geosenha type=text style="width:250px;" value=""/><br>' +
		'<p class="paragrafo" ><input id=i3GEOFloginusuario size=20  type=button value="Enviar" />';
		return ins;	
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		//cria a janela flutuante
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.loginusuario");
		};
		titulo = "Login &nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"260px",
			"110px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.loginusuario",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.loginusuario.aguarde = $i("i3GEOF.loginusuario_imagemCabecalho").style;
		$i("i3GEOF.loginusuario_corpo").style.backgroundColor = "white";
		i3GEOF.loginusuario.inicia(divid);
	},
	/*
	Function: enviar
	
	Envia os daods de login
	*/
	enviar: function(){
		var u = $i("i3geousuario").value,
			s = $i("i3geosenha").value,
			temp,p,cp;
		if(i3GEOF.loginusuario.aguarde.visibility === "visible")
		{return;}
		i3GEOF.loginusuario.aguarde.visibility = "visible";
		if(u == "" || s == ""){
			i3GEOF.loginusuario.aguarde.visibility = "hidden";
			return;
		}
		/*
		 * @TODO criptografar o envio de usuario e senha
		 */
		temp = function(){
				i3GEOF.opcoesEscala.aguarde.visibility = "hidden";
				i3GEO.util.insereCookie("i3geocodigologin",retorno.data);
			};
		p = i3GEO.configura.locaplic+"/classesphp/funcoes_login.php?funcao=login";
		cp = new cpaint();
		cp.set_transfer_mode("POST");	
		cp.set_response_type("JSON");
		cp.call(p,"login",temp,"&usuario="+u+"&senha="+s);
	}
};
