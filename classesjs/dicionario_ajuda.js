g_traducao_ajuda = {
	ferramentas: {
		"1": {
			titulo: "Filtro de cores",
			diretorio:"i3geo/ferramentas/tipoimagem",
			categoria:"1",
			pt:"O filtro possibilita gerar efeitos de colora��o no mapa. � aplicado sobre a imagem gerada toda vez que o mapa � alterado. No caso de temas baseados em dados RASTER, os n�veis de cores obtidos com a ferramenta de identifica��o n�o s�o alterados.",
			complemento:"Os filtros podem provocar um tempo maior de desenho do mapa, devendo ser utilizados com cuidado. As op��es s�pia e tons de cinza utilizam algor�tmos pr�prios do i3Geo, j� as demais, utilizam a op��o de filtro dispon�vel com o PHP 5. Mais detalhes <a href='http://www.php.net/manual/pt_BR/function.imagefilter.php' >aqui</a>."
		},
		"2": {
			titulo: "Legenda",
			diretorio:"i3geo/ferramentas/opcoes_legenda",
			categoria:"1",
			pt:"A legenda do mapa � utilizada em v�rias op��es do i3Geo e pode tamb�m ficar inserida na pr�pria imagem do mapa. A legenda mostra os s�mbolos utilizados no desenho de cada tema, podendo-se alterar caracter�sticas como fonte, tamanho dos textos, tamanho dos ret�ngulos com os s�mbolos, etc.",
			complemento:"Antes de aplicar uma altera��o, voc� pode testar os par�metros escolhidos para avaliar o resultado. No caso dos par�metros que definem cores, utilize -1,-1,-1 para anular seu efeito."
		},
		"3": {
			titulo: "Barra de escala",
			diretorio:"i3geo/ferramentas/opcoes_escala",
			categoria:"1",
			pt:"A barra de escala � uma imagem inserida no mapa que mostra a rela��o entre uma medida feita no mapa e no mundo real. A barra pode ser modificada especificando-se seu tamanho, n�mero de divis�es e cores.",
			complemento:"Existem dois modelos b�sicos para a escala: linear e bloco. Para n�o mostrar a escala no mapa, escolha a 'sem escala' na op��o estilo."
		},
		"4": {
			titulo: "Tamanho do mapa",
			diretorio:"i3geo/ferramentas/opcoes_tamanho",
			categoria:"1",
			pt:"O tamanho do mapa � definido automaticamente quando o i3Geo � aberto, buscando-se otimizar o uso do espa�o dispon�vel no monitor. A op��o de modifica��o do tamanho altera apenas o corpo do mapa, for�ando o ajuste dos outros elementos, o que nem sempre provoca bons resultados.",
			complemento:"O ajuste do tamanho do mapa pode ser utilizado para gerar imagens em tamanhos espec�ficos, principalmente para efeitos de impress�o. A medida do tamanho utilizado � pixel, que corresponde ao tamanho m�nimo de uma c�lula da imagem do mapa. Para calcular o tamanho do mapa em outra unidade de medida, necess�rio nos casos em que se deseja imprimir o mapa, deve ser feito considerando-se a resolu��o de impress�o desejada."
		},
		"5": {
			titulo: "Cor da sele��o",
			diretorio:"i3geo/ferramentas/opcoes_querymap",
			categoria:"1",
			pt:"A cor da sele��o � utilizada para mostrar no mapa os elementos de um determinado tema que est�o selecionados. A sele��o consiste em destacar elementos para uso em determinadas opera��es, como por exemplo o c�lculo de entorno (buffer). A defini��o da cor � baseada no modelo R,G,B, sendo que cada componente varia de 0 a 255.",
			complemento:"Ao definir os valores de RGB, separe-os com ','. Quando um tema possuir elementos selecionados, � inclu�da uma marca antes do nome do tema na lista de camadas dispon�veis no mapa."
		},
		"6": {
			titulo: "Cor do fundo",
			diretorio:"i3geo/ferramentas/opcoes_fundo",
			categoria:"1",
			pt:"O corpo do mapa � constitu�do por uma imagem gerada com tamanho fixo. Essa imagem possu� uma cor padr�o, sobre a qual s�o sobrepostas as camadas. Por padr�o, a cor do fundo � definida como azul. A defini��o da cor � baseada no modelo R,G,B, sendo que cada componente varia de 0 a 255.",
			complemento:"Ao definir os valores de RGB, separe-os com ','. Ao utilizar as op��es de convers�o do mapa atual para kml ou WMS, a altera��o da cor do fundo para 255,255,255 oferece melhores resultados na visualiza��o dos dados."
		},
		"7": {
			titulo: "Grade de coordenadas",
			diretorio:"i3geo/ferramentas/gradecoord",
			categoria:"1",
			pt:"A grade de coordenadas � formada por linhas verticais e horizontais representando determinadas latitudes e longitudes. A grade � um dos elementos principais na defini��o de um mapa, sendo utilizada na impress�o ou gera��o de figuras.",
			complemento:"Ao adicionar uma grade, � criado uma nova camada no mapa, possibilitando que mais de uma grade seja criada. Uma grade pode ou n�o conter os textos indicando os valores de lat long, permitindo que se crie uma grade com espa�amento de linhas diferente do espa�amento dos textos."
		},
		"8": {
			titulo: "Templates",
			diretorio:"i3geo/ferramentas/template",
			categoria:"1",
			pt:"Um template define como os componentes de um mapa s�o organizados no navegador. O administrador do i3Geo pode criar templates diferentes conforme as necessidades do usu�rio, sendo que alguns templates s�o fornecidos com o pr�prio i3Geo.",
			complemento:"A cria��o de templates � uma tarefa do administrador do i3Geo. Para abrir um template espec�fico diretamente, utilize a URL que � mostrada no navegador quando um template � escolhido."
		},
		"9": {
			titulo: "Temporizador",
			diretorio:"i3geo/ferramentas/opcoes_autoredesenha",
			categoria:"1",
			pt:"O temporizador permite definir um intervalo de tempo em segundos que ir� disparar o redesenho do mapa.",
			complemento:"Quando o mapa � redesenhado, as camadas existentes s�o lidas novamente para compor o novo mapa. Essa op��o � �til quando existirem camadas no mapa que sofrem atualiza��es frequentes, como por exemplo o deslocamento de aeronaves, carros ou navios."
		},
		"10": {
			titulo: "Salvar mapa",
			diretorio:"i3geo/ferramentas/salvamapa",
			categoria:"2",
			pt:"O mapa que o usu�rio est� utilizando pode ser salvo localmente (na m�quina do usu�rio) para ser aberto posteriormente. Isso permite que um trabalho seja continuado em outro momento, uma vez que o mapa em uso � sempre perdido quando o usu�rio fecha o navegador.",
			complemento:"Os dados locais que foram criados n�o s�o salvos, sendo necess�rio o seu download quando desejado. Isso afeta as op��es de inclus�o de pontos ou convers�o de elementos selecionados em camadas."
		},
		"11": {
			titulo: "Carregar mapa",
			diretorio:"i3geo/ferramentas/carregamapa",
			categoria:"2",
			pt:"O mapa que o usu�rio est� utilizando pode ser salvo localmente (na m�quina do usu�rio) para ser aberto posteriormente. Isso permite que um trabalho seja continuado em outro momento, uma vez que o mapa em uso � sempre perdido quando o usu�rio fecha o navegador.",
			complemento:"A op��o de carregar um mapa permite enviar para o servidor, onde o i3Geo est� instalado, o mapa que foi salvo anteriormente."
		},
		"12": {
			titulo: "Converter em WMS",
			diretorio:"i3geo/ferramentas/convertews",
			categoria:"2",
			pt:"",
			complemento:""
		}
	}
};

g_traducao_ajuda_categorias = {
	"1":{titulo:"Propriedades do mapa"},
	"2":{titulo:"Arquivos"}
};
