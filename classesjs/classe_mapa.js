/*
Class:: i3GEO.mapa

Cria e processa o mapa principal

File: i3geo/classesjs/classe_mapa.js

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

i3GEO.mapa = {
	ajustaPosicao: function(){
		try{
			imagemxi = 0;
			imagemyi = 0;
			imagemxref = 0;
			imagemyref = 0;
			if(!$i("i3geo")){return;}
			if ($i("i3geo").style.left){imagemxi += parseInt($i("i3geo").style.left);}
			if ($i("i3geo").style.top){imagemyi += parseInt($i("i3geo").style.top);}	
			var dc = $i("i3geo");
			if ($i("contemImg"))
			{var dc = $i("contemImg");}
			else
			{var dc = $i("img");}
			if ($i("openlayers"))
			{var dc = $i("openlayers");}
			if ($i("flamingo"))
			{var dc = $i("flamingo");}
			while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo")){
				dc = dc.offsetParent;
				imagemxi = imagemxi + dc.offsetLeft;
				imagemyi = imagemyi + dc.offsetTop;
			}
			if ($i("corpoMapa")){
				$i("corpoMapa").style.position="absolute";
				$left("corpoMapa",imagemxi);
				$top("corpoMapa",imagemyi);
				if ($i("i3geo").style.left){$left("corpoMapa",imagemxi - parseInt($i("i3geo").style.left));}
				if ($i("i3geo").style.top){$top("corpoMapa",imagemyi - parseInt($i("i3geo").style.top));}
			}
			if ($i("ref")){
				var dc = $i("ref");
				while (dc.offsetParent.id != "i3geo"){
					dc = dc.offsetParent;
					imagemxref = imagemxref + dc.offsetLeft;
					imagemyref = imagemyref + dc.offsetTop;
				}
			}
			if ($i("aguarde")){
				$top("aguarde",imagemyi);
				$left("aguarde",imagemxi);
			}
		}
		catch(e){alert("Ocorreu um erro. i3GEO.mapa.ajustaPosicao"+e);}
	}
}