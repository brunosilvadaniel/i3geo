/**
Title: menususpenso.js

Monta o menu suspenso com as op��es adicionais do i3geo.

O menu suspenso � criado utilizando-se a biblioteca YUI.

O conte�do do menu � definido na vari�vel oMenuData, veja configura.js

File: i3geo/classesjs/menususpenso.js


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
/*
Function: montaMenuSuspenso

Monta o menu baseado na vari�vel oMenuData

Parameters:

iddiv - id do DIV que receber� o menu
*/
function montaMenuSuspenso(iddiv)
{ 
	idstemp = new Array();
	if($i(iddiv))
	{
		$i(iddiv).className="yuimenubar yuimenubarnav";

		if(oMenuData.ajudas)
		{
			var ins = "";
			ins += '<div class="bd" style="align:right;border: 0px solid white;z-index:2000;line-height:1.4" >';
			ins += '<ul class="first-of-type" style="border:0px solid white;top:10px;">';
 			if(objmapa.w >= 500)
 			{
				ins += '<li class="yuimenubaritem" style="border: 0px solid white;" >';
				ins += '<img style="border: 0px solid white;padding-right:0px;padding:1px;" src="'+$im("branco.gif")+'" onclick="trocalingua(\'pt\')" id="brasil" /></li>';
				ins += '<li class="yuimenubaritem" ><img style="border: 0px solid white;padding-right:0px;padding:1px;" src="'+$im("branco.gif")+'" onclick="trocalingua(\'en\')" id="uk" /></li>';
				ins += '<li class="yuimenubaritem" ><img style="border: 0px solid white;padding-right:0px;padding:1px;" src="'+$im("branco.gif")+'" onclick="trocalingua(\'es\')" id="espanhol" /></li>';
			}
 			ins += '<li class="yuimenubaritem" style="padding-bottom:5px"><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menuarquivos" >&nbsp;&nbsp;'+$trad("s4")+'</a></li>';
 			ins += '<li class="yuimenubaritem" style="padding-bottom:5px"><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menujanelas" >&nbsp;&nbsp;'+$trad("s3")+'</a></li>';
			ins += '<li class="yuimenubaritem" style="padding-bottom:5px"><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menuanalise" >&nbsp;&nbsp;'+$trad("s2")+'</a></li>';
			ins += '<li class="yuimenubaritem first-of-type" style="padding-bottom:5px" ><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menuajuda" >&nbsp;&nbsp;'+$trad("s1")+'</a></li>';
 			ins += '</ul>'; 
 			ins+='</div>';
 			$i("menus").innerHTML=ins;
 		}
		function onMenuBarBeforeRender(p_sType, p_sArgs)
		{
			if(objmapa.w >= 500)
			{var conta = 6;}
			else
			{var conta = 3;}
			for(var nomeMenu in oMenuData)
			{
				var v="this.getItem("+conta+").cfg.setProperty('submenu',{id:'"+nomeMenu+"',itemdata: oMenuData['"+nomeMenu+"']})";
				idstemp.push(nomeMenu);
				eval(v);
				var conta=conta-1;
			}
		}
	}
	else{return;}
 	var oMenuBar=new YAHOO.widget.MenuBar(iddiv,{autosubmenudisplay: true, showdelay: 250, hidedelay: 750, lazyload: true});
 	oMenuBar.beforeRenderEvent.subscribe(onMenuBarBeforeRender);
 	oMenuBar.render();
	//
	//corrige problemas de estilo
	//
	var temp = $i("menus").style;
	temp.backgroundRepeat = "scroll";
	temp.backgroundPosition = "0px -5px";
	temp.border = "0px solid white";
	var temp = $i(iddiv).style;
	temp.backgroundRepeat = "scroll";
	temp.backgroundPosition = "0px -5px";
	temp.border = "0px solid white";
	if($i("contemMenu"))
	{
		var temp = $i("contemMenu").style;
		temp.backgroundRepeat = "scroll";
		temp.backgroundPosition = "0px 0px";
		temp.border = "0px solid white";
	}
}
function testamenususpenso(){}
