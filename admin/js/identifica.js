/*
Title: identifica.js

Fun��es que controlam a interface do editor dos sistemas adicionais de identifica��o

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

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

Arquivo:

i3geo/admin/js/identifica.js
*/

YAHOO.namespace("example.container");
function initMenu()
{
	core_ativaBotaoAdicionaLinha("../php/identifica.php?funcao=alterarFuncoes")
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	pegaFuncoes();
}
function pegaFuncoes()
{
	core_pegaDados("buscando fun��es...","../php/identifica.php?funcao=pegaFuncoes","montaTabela")
}
function montaTabela(dados)
{
    YAHOO.example.InlineCellEditing = new function()
    {
        // Custom formatter for "address" column to preserve line breaks
        var formatTexto = function(elCell, oRecord, oColumn, oData)
        {
            elCell.innerHTML = "<pre ><p>" + oData + "</pre>";
        };
        var formatSalva = function(elCell, oRecord, oColumn)
        {
            elCell.innerHTML = "<div class=salvar style='text-align:center' onclick='gravaLinha(\""+oRecord._sId+"\")'></div>";
        };
        var formatExclui = function(elCell, oRecord, oColumn)
        {
            elCell.innerHTML = "<div class=excluir style='text-align:center' ></div>";//onclick='excluiLinha(\""+oRecord.getData("id_menu")+"\",\""+oRecord.getId()+"\")'></div>";
        };
        var myColumnDefs = [
            {key:"excluir",label:"excluir",formatter:formatExclui},
            {label:"salvar",formatter:formatSalva},
            {label:"id",key:"id_i", formatter:formatTexto},
			{label:"nome",resizeable:true,key:"nome_i", formatter:formatTexto, editor:"textbox"},
			{label:"publicado?",key:"publicado_i",editor:"radio" ,editorOptions:{radioOptions:["SIM","NAO"],disableBtns:false}},
			{label:"programa",resizeable:true,key:"abrir_i", formatter:formatTexto, editor:"textbox"},
			{label:"abrir como?",key:"target_i", formatter:formatTexto,editor:"dropdown" ,editorOptions:{dropdownOptions:["self","target"],disableBtns:false}}
        ];
        myDataSource = new YAHOO.util.DataSource(dados);
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
        myDataSource.responseSchema =
        {
            fields: ["publicado_i","abrir_i","id_i","nome_i","target_i"]
        };
        myDataTable = new YAHOO.widget.DataTable("tabela", myColumnDefs, myDataSource);
        // Set up editing flow
        myDataTable.highlightEditableCell = function(oArgs)
        {
            var elCell = oArgs.target;
            var column = myDataTable.getColumn(oArgs.target);
            //if(column.editor != "null")
            if(!YAHOO.lang.isNull(column.editor))
            {
				YAHOO.util.Dom.addClass(elCell,'yui-dt-highlighted');
            }
        };
        myDataTable.unhighlightEditableCell = function(oArgs)
        {
            var elCell = oArgs.target;
            if(elCell.style.cursor="pointer")
            {
				YAHOO.util.Dom.removeClass(elCell,'yui-dt-highlighted');
            }
        };
        myDataTable.subscribe("cellMouseoverEvent", myDataTable.highlightEditableCell);
        myDataTable.subscribe("cellMouseoutEvent", myDataTable.unhighlightEditableCell);
		myDataTable.subscribe('cellClickEvent',function(ev)
		{
			var target = YAHOO.util.Event.getTarget(ev);
			var column = this.getColumn(target);
			if(YAHOO.example.container.panelCK)
			{
				YAHOO.example.container.panelCK.destroy();
				YAHOO.example.container.panelCK = null;
			}
			if (column.key == 'excluir')
			{
				var record = this.getRecord(target);
				excluiLinha(record.getData('id_i'),target);
			}
			else
			{
				this.onEventShowCellEditor(ev);
			}
		});
        // Hook into custom event to customize save-flow of "radio" editor
        myDataTable.subscribe("editorUpdateEvent", function(oArgs)
        {
            if(oArgs.editor.column.key === "active")
            {
                this.saveCellEditor();
                
            }
        });
        myDataTable.subscribe("editorBlurEvent", function(oArgs)
        {
            this.cancelCellEditor();
        });
        myDataTable.subscribe("editorSaveEvent", function(oArgs)
        {
			if(oArgs.newData != oArgs.oldData)
			var linha = myDataTable.getTrEl(oArgs.editor.getRecord())
			linha.style.color = "blue";
			linha.style.textDecoration = "blink";
        });
    };
    core_carregando("desativa");
}
function gravaLinha(row)
{
	var r = myDataTable.getRecordSet().getRecord(row);
	var publicado_i = r.getData("publicado_i");
	var abrir_i = r.getData("abrir_i")
	var id_i = r.getData("id_i")
	var nome_i = r.getData("nome_i")
	var target_i = r.getData("target_i")
	var mensagem = " gravando o registro do id= "+id_i
	var sUrl = "../php/identifica.php?funcao=alterarFuncoes&publicado_i="+publicado_i+"&abrir_i="+abrir_i+"&nome_i="+nome_i+"&id_i="+id_i+"&target_i="+target_i;
	core_gravaLinha(mensagem,row,sUrl)
}
function excluiLinha(id,row)
{
	var mensagem = " excluindo o registro do id= "+id;
	var sUrl = "../php/identifica.php?funcao=excluir&id="+id;
	core_excluiLinha(sUrl,row,mensagem)
}
YAHOO.util.Event.addListener(window, "load", initMenu);