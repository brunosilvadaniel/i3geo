<?php
define ( ONDEI3GEO, "../../.." );
include (dirname ( __FILE__ ) . "/../../../ms_configura.php");
error_reporting ( 0 );
include "../../head.php";
?>
<div class="container-fluid">
	<div class="row">
		<ol class="breadcrumb">
			<li><a href="../../init/index.php">i3Geo</a></li>
			<li><a href="../../index.php">Admin</a></li>
			<li>Usu&aacute;rios</li>
			<li class="active">Opera&ccedil;&otilde;es</li>
		</ol>
	</div>
</div>
<div class="container">
	<div class="row center-block">
		<div class="col-md-12">
			<div class="well hidden" id="titulo">
				<button data-toggle="modal" data-target="#ajudaPrincipal"
					class="btn btn-primary btn-fab btn-fab-mini pull-right">
					<i class="material-icons">help</i>
				</button>
				<h3>{{{txtTitulo}}}</h3>
				<h4>{{{txtDesc}}}</h4>
				<!-- aqui entra o filtro -->
				<div class="form-group">
					<label class="control-label">{{{filtro}}}</label>
					<select onchange="i3GEOadmin.core.filtra(this)" id="filtro" class="form-control input-lg">
					</select>
				</div>
				<div class="row pull-right">
					<a onclick="i3GEOadmin.operacoes.adicionaDialogo();" href="javascript:void(0)" class="btn btn-primary" role="button">{{{adicionar}}}</a>
				</div>
				<div class="clearfix"></div>
				<!--Modal ajuda-->
				<div id="ajudaPrincipal" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<p>{{{txtAjuda}}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="well hidden">
				<div id="corpo">
				</div>
			</div>
		</div>
	</div>
</div>
<script id="templateFiltro" type="x-tmpl-mustache">
<option value="form-{{id_operacao}}">{{{codigo}}}</option>
</script>
<script id="templateLista" type="x-tmpl-mustache">
<div class="panel panel-default" id="form-{{id_operacao}}">
	<div class="panel-heading" role="tab">
		<h3 class="panel-title {{escondido}}">
			<a href="javascript:void(0)" onclick="{{onExcluir}}('{{id_operacao}}')" class="btn btn-danger btn-fab btn-fab-mini" role="button">
				<i class="material-icons">delete_forever</i>
			</a>
			&nbsp;
			<a class="collapsed in" role="button" data-toggle="collapse" href="#body-form-{{id_operacao}}"
			aria-expanded="false" aria-controls="#body-form-{{id_operacao}}"> {{{codigo}}} </a>
		</h3>
	</div>
	<div class="panel-body panel-collapse collapse" id="body-form-{{id_operacao}}">
		<form style="" onchange="this.style.boxShadow='2px 2px 5px 0 #009688';" class="form-horizontal" role="form" method="post" action="" >
			<div class="row">
				<div class="col-md-4" >
					<h4> {{{papeisv}}}</h4>
					<div class="form-group form-group-lg" style="padding-left:5px;">{{{inputPapeis}}}</div>
				</div>
				<div class="col-md-8">
					<h4>{{{operacao}}}</h4>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="codigo">{{{labelCodigo}}}</label>
						<div class="col-md-10">
							<input type="text" value="{{{codigo}}}" class="form-control" name="codigo" required>
						</div>
					</div>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="descricao">{{{labelDescricao}}}</label>
						<div class="col-md-10">
							<input type="text" value="{{{descricao}}}" class="form-control" name="descricao" required>
						</div>
					</div>
				</div>

			</div>
		</form>
		<div class="pull-right">
			<a href="javascript:void(0)" onclick="{{onExcluir}}('{{id_operacao}}')" class="btn btn-danger" role="button">{{excluir}}</a>
			<a href="javascript:void(0)" onclick="{{onSalvar}}('{{id_operacao}}')" class="btn btn-primary" role="button">{{salvar}}</a>
		</div>
	</div>
</div>
</script>
<script id="templateInputPapeis" type="x-tmpl-mustache">
	<div class="checkbox">
		<label>
			<input type="checkbox" {{checked}} name="id_papel-{{{id_papel}}}" /> <abbr title="{{{descricao}}}">{{{nome}}}</abbr>
		</label>
	</div>
</script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="../../dicionario/operacoes.js"></script>
<script>
	$(document).ready(function(){
		//vem de admin1/index.js
		iniciaMenuPrincipal();
		$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			$(this).parent().siblings().removeClass('open');
			$(this).parent().toggleClass('open');
		});
		//traducao
		var t = $("#titulo");
		//
		//complementa dicionario
		//
		i3GEOadmin.operacoes.dicionario = $.extend(
			{},
			i3GEOadmin.operacoes.dicionario,
			i3GEOadmin.core.dicionario
		);

		i3GEOadmin.core.dicionario = null;

		i3GEOadmin.operacoes.dicionario = i3GEO.idioma.objetoIdioma(i3GEOadmin.operacoes.dicionario);
		t.html(
			Mustache.to_html(
				t.html(),
				i3GEOadmin.operacoes.dicionario
			)
		);
		$.material.init();
		var inicia = function() {
			$(".hidden").removeClass('hidden');
			i3GEOadmin.operacoes.init($("#corpo"));
		};
		i3GEO.login.verificaOperacao("admin/html/operacoes",i3GEO.configura.locaplic, inicia, "sessao");
	});
</script>
</body>
</html>
