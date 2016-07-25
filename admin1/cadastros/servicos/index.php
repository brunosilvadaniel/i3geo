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
			<li>Cadastros</li>
			<li class="active">Servi&ccedil;os</li>
		</ol>
	</div>
</div>
<div class="container">
	<div class="row center-block">
		<div class="col-md-12">
			<div class="well hidden" id="titulo">
				<!--
				<button data-toggle="modal" data-target="#ajudaPrincipal"
					class="btn btn-primary btn-fab btn-fab-mini pull-right">
					<i class="material-icons">help</i>
				</button>
				-->
				<h3>{{{txtTitulo}}}</h3>
				<h4>{{{txtDesc}}}</h4>
				<!-- aqui entra o filtro -->
				<div class="form-group">
					<label class="control-label">{{{filtro}}}</label>
					<select onchange="i3GEOadmin.core.filtra(this)" id="filtro" class="form-control input-lg">
					</select>
				</div>
				<div class="row pull-right">
					<a onclick="i3GEOadmin.webservices.adicionaDialogo();" href="javascript:void(0)" class="btn btn-primary" role="button">{{{adicionar}}}</a>
				</div>
				<div class="clearfix"></div>
				<!--Modal ajuda
				<div id="ajudaPrincipal" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<p>{{{txtWebservices}}}</p>
							</div>
						</div>
					</div>
				</div>
				-->
			</div>
			<div class="well hidden">
				<div id="corpo">
				</div>
			</div>
		</div>
	</div>
</div>
<script id="templateFiltro" type="x-tmpl-mustache">
<option value="form-{{id_ws}}">{{{nome_ws}}}</option>
</script>
<script id="templateLista" type="x-tmpl-mustache">
<div class="panel panel-default" id="form-{{id_ws}}">
	<div class="panel-heading" role="tab">
		<h3 class="panel-title {{escondido}}">
			<a href="javascript:void(0)" onclick="{{onExcluir}}('{{id_ws}}')" class="btn btn-danger btn-fab btn-fab-mini" role="button">
				<i class="material-icons">delete_forever</i>
			</a>
			&nbsp;
			<a class="collapsed in" role="button" data-toggle="collapse" href="#body-form-{{id_ws}}"
			aria-expanded="false" aria-controls="#body-form-{{id_ws}}"> {{{nome_ws}}} </a>
		</h3>
	</div>
	<div class="panel-body panel-collapse collapse" id="body-form-{{id_ws}}">
		<form style="" onchange="this.style.boxShadow='2px 2px 5px 0 #009688';" class="form-horizontal" role="form" method="post" action="" >
			<div class="row">
				<div class="col-md-12">
					<h4>{{{nome_ws}}}</h4>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="nome_ws" >{{{nomeTxt}}}</label>
						<div class="col-md-10">
							<input type="text" value="{{{nome_ws}}}" class="form-control" name="nome_ws" required>
						</div>
					</div>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="login">{{{descricaoTxt}}}</label>
						<div class="col-md-10">
							<input type="text" value="{{{desc_ws}}}" class="form-control" name="desc_ws" >
						</div>
					</div>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="email">{{{autor}}}</label>
						<div class="col-md-10">
							<input type="email" value="{{{autor_ws}}}" class="form-control" name="autor_ws" required>
						</div>
					</div>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="link_ws">{{{endereco}}}</label>
						<div class="col-md-10">
							<input type="text" value="{{{link_ws}}}" class="form-control" name="link_ws">
						</div>
					</div>
					<div class="form-group form-group-lg">
						<label class="col-md-2 control-label" for="tipo_ws">{{{tipo}}}</label>
						<div class="col-md-10">
							<select name="tipo_ws" class="form-control">
								{{{opcoesTipo}}}
							</select>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div class="pull-right">
			<a href="javascript:void(0)" onclick="{{onExcluir}}('{{id_ws}}')" class="btn btn-danger" role="button">{{excluir}}</a>
			<a href="javascript:void(0)" onclick="{{onSalvar}}('{{id_ws}}')" class="btn btn-primary" role="button">{{salvar}}</a>
		</div>
	</div>
</div>
</script>
<script id="templateOpcoesTipo" type="x-tmpl-mustache">
	<option value="">---</option>
	<option {{KML-sel}} value="KML">KML</option>
	<option {{WMS-sel}} value="WMS">WMS</option>
	<option {{WMS-Tile-sel}} value="WMS-Tile">WMS-Tile</option>
	<option {{GEORSS-sel}} value="GEORSS">GEORSS</option>
	<option {{WS-sel}} value="WS">WS</option>
	<option {{DOWNLOAD-sel}} value="DOWNLOAD">DOWNLOAD</option>
	<option {{GEOJSON-sel}} value="GEOJSON">GEOJSON</option>
</script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="../../dicionario/webservices.js"></script>
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
		//complementa dicionario
		i3GEOadmin.webservices.dicionario = $.extend(
			{},
			i3GEOadmin.webservices.dicionario,
			i3GEOadmin.core.dicionario
		);

		i3GEOadmin.core.dicionario = null;

		i3GEOadmin.webservices.dicionario = i3GEO.idioma.objetoIdioma(i3GEOadmin.webservices.dicionario);

		t.html(
			Mustache.to_html(
				t.html(),
				i3GEOadmin.webservices.dicionario
			)
		);
		$.material.init();
		var inicia = function() {
			$(".hidden").removeClass('hidden');
			i3GEOadmin.webservices.init($("#corpo"));
		};
		i3GEO.login.verificaOperacao("admin/html/webservices",i3GEO.configura.locaplic, inicia, "sessao");
	});
</script>
</body>
</html>
