/*
Title: funcoes.js

Fun��es de uso geral para processamento de dados

File: i3geo/classesjs/funcoes.js

About: Licenciamento

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
/*
Section: interface
*/
/*
Function: criaContainerRichdraw

Cria os elementos 'dom' necess�rios ao uso das fun��es de desenho sobre o mapa.

As ferramentas de c�lculo de dist�ncias e �reas utilizam esse container.

Richdraw � uma biblioteca utilizada pelo i3geo para abstrair as diferen�as entre as linguagens svg e vml.

Essa abstra��o � necess�ria devido �s diferen�as entre os navegadores.
*/
function criaContainerRichdraw()
{
	pontosdistobj = {
		xpt: new Array(),
		ypt: new Array(),
		dist: new Array(),
		xtela: new Array(),
		ytela: new Array(),
		ximg: new Array(),
		yimg: new Array(),
		linhas: new Array()
	};
	try
	{
		//
		//cria o container para uso da fun��o de desenho usando
		//svg ou vml
		//esse container � sobreposto exatamente sobre o mapa
		//O id do containner � divGeometriasTemp
		//
		if (!$i("divGeometriasTemp"))
		{
			//
			//pega a posi��o da imagem do mapa para posicionar corretamente o container
			//
			var pos = [0,0];
			if($i("img"))
			var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
			//
			//cria o container
			//
			var novoel = document.createElement("div");
			novoel.id = "divGeometriasTemp";
			var ne = novoel.style;
			ne.cursor="crosshair";
			ne.zIndex=0;
			ne.position="absolute";
			ne.width=objmapa.w;
			ne.height=objmapa.h;
			ne.border="1px solid black";
			ne.display="none";
			ne.top=pos[1];
			ne.left=pos[0];
			document.body.appendChild(novoel);
		}
		//
		//como o container j� poderia ter sido criado antes � necess�rio esvazi�-lo
		//
		var divgeo = $i("divGeometriasTemp");
		divgeo.innerHTML = "";
		var renderer;
		//
		//cria o objeto renderer conforme o browser em uso
		//esse objeto ser� utilizado nas fun��es de desenho
		//mais detalhes, veja em pacotes/richdraw
		//Conforme a resposta do navegador, utiliza-se a cria��o VML ou SVG
		//
		try
		{
			renderer = new VMLRenderer();
			richdraw = new RichDrawEditor(divgeo, renderer);
		}
		catch(e)
		{
			renderer = new SVGRenderer();
			richdraw = new RichDrawEditor(divgeo, renderer);
		}
		//
		//defini��o dos s�mbolos default para os elementos gr�ficos
		//
		richdraw.editCommand('fillcolor', 'red');
		richdraw.editCommand('linecolor', 'gray');
		richdraw.editCommand('linewidth', '1px');
		richdraw.editCommand('mode', 'line');
		divgeo.style.display="block";
		//
		//ap�s o container ser criado, � necess�rio que as fun��es
		//de clique sobre o mapa sejam ativadas
		//para funcionarem sobre o container
		//
		i3GEO.eventos.ativa(divgeo);
		
	}
	catch(e){alert("Erro ao tentar criar container richdraw");}
}
/*
Section: desenho sobre o mapa
*/
/*
Function: desenhoRichdraw

Desenha elementos na tela usando a biblioteca richdraw

Parameters:

tipo - tipo de opera��o

objeto - objeto gr�fico do container richdraw

n - �ndice do elemento no array pontosdistobj
*/
function desenhoRichdraw(tipo,objeto,n)
{
	if (richdraw && $i("img"))
	{
		var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
		//
		//faz o reposicionamento de linhas quando o mouse � movido e a linha est� ativa
		//
		if((tipo=="resizeLinha") || (tipo=="resizePoligono") && navn)
		{
			try
			{richdraw.renderer.resize(objeto,0,0,objposicaocursor.imgx,objposicaocursor.imgy);}
			catch(e){window.status=n+" erro ao movimentar a linha ";}
		}
		if((tipo=="resizeLinha") && navm)
		{
			try
			{
				//
				//no caso do ie, a linha tem de ser removida e desenhada novamente
				//
				var r = $i(richdraw.container.id);
				r.removeChild(r.lastChild);
				var dy = objposicaocursor.imgy;
				var dx = objposicaocursor.imgx - (objmapa.w/2);
				richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(objmapa.w/2)-1,pontosdistobj.yimg[n-1]-3,dx,dy-3);
			}
			catch(e){window.status=n+" erro ao movimentar a linha ";}			
		}
		if((tipo=="resizePoligono") && navm)
		{
			try
			{
				var r = $i(richdraw.container.id);
				r.removeChild(r.lastChild);
				r.removeChild(r.lastChild);
				var dy = objposicaocursor.imgy;
				var dx = objposicaocursor.imgx - (objmapa.w/2);
				richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(objmapa.w/2)-1,pontosdistobj.yimg[n-1]-3,dx,dy-3);
				richdraw.renderer.create(richdraw.mode, richdraw.fillColor, richdraw.lineColor, richdraw.lineWidth, (pontosdistobj.ximg[0])-(objmapa.w/2)-1,pontosdistobj.yimg[0]-3,dx,dy-3);
			}
			catch(e){window.status=n+" erro ao movimentar a linha ";}			
		}
		if(tipo=="insereCirculo")
		{
			if (navn)
			{
				var dx = Math.pow(((pontosdistobj.xtela[n])*1) - ((pontosdistobj.xtela[n-1])*1),2);
				var dy = Math.pow(((pontosdistobj.ytela[n])*1) - ((pontosdistobj.ytela[n-1])*1),2);
				var w = Math.sqrt(dx + dy);
				try
				{
					richdraw.renderer.create('circ', '', 'rgb(250,250,250)', richdraw.lineWidth, pontosdistobj.ximg[n-1],pontosdistobj.yimg[n-1],w,w);
				}
				catch(e){window.status=n+" erro ao desenhar o raio";}
			}
			else
			{
				var dx = Math.pow(((pontosdistobj.xtela[n])*1) - ((pontosdistobj.xtela[n-1])*1),2);
				var dy = Math.pow(((pontosdistobj.ytela[n])*1) - ((pontosdistobj.ytela[n-1])*1),2);
				var w = Math.sqrt(dx + dy);
				try
				{
					richdraw.renderer.create('circ', '', 'rgb(250,250,250)', richdraw.lineWidth, pontosdistobj.ximg[n-1]-w,pontosdistobj.yimg[n-1]-w,w*2,w*2);
				}
				catch(e){window.status=n+" erro ao desenhar o raio";}
			}
		}
	}
}
/*
Function: recuperamapa

Tenta recuperar o �ltimo mapa, caso tenha ocorrido algum erro.
*/
function recuperamapa()
{
	g_recupera = 1;
	var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=recuperamapa&g_sid="+i3GEO.configura.sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"recuperamapa",ajaxredesenha);
}
