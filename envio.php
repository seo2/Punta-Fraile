<? require("copihueb.php"); 
function enviaMail($datos,$asunto,$destinatario){
	
	$cuerpo = '<p>Nombre :  '.$datos["nombre"].'</p>';
	$cuerpo .= '<p>Rut : '.$datos["rut"].'</p>';
	$cuerpo .= '<p>Email : '.$datos["email"].'</p>';
	$cuerpo .= '<p>Telefono : '.$datos["telefono"].'</p>';
	$cuerpo .= '<p>Comentarios : '.$datos["detalle"].'</p>';
	if($datos["tipo"]=="cotizar"){
		$cuerpo .= '<p>Departamento : '.$datos["radio"].'</p>';
		}
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
	$headers .= "From: ".$datos["nombre"]." <".$datos["email"].">\r\n";
	if(mail($destinatario,$asunto,$cuerpo,$headers)){
		return true;
		}else{
		return false;	
			}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?php  $activo=5; ?>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Punta Fraile</title>
<link href="css.css" rel="stylesheet" type="text/css" />
<? require("mtr_slide.php"); ?>
<style>
.alerta{
	background-color:#F00;
	}
</style>
</head>



<body>

<div id="cont_gral">

<? require("menu.php"); ?>
<? require("slide.php"); ?>

<div id="fnd_contenido">
<div id="cont_contacto">
<div id="menu_contenido">
<div class="ttlo_proyecto"><? muestra_contenido("ttlo_cont"); ?></div>
</div><!--FIN menu_cont-->

<div id="cont_izq_contacto">
<div id="img_contacto"><? muestra_contenido("img_cont"); ?></div>
</div>

<div id="texto_contacto"><p><? muestra_contenido("txt_cont"); ?></p><a href="mailto:queylen@queylen.cl">queylen@queylen.cl</a></div>


<div id="form_contacto">
<?
if($_POST["tipo"]=="cotizar"){
	$asunto = "COTIZACION DEPARTAMENTO PUNTA FRAILE";
	}else{
	$asunto = "CONTACTO PUNTA FRAILE";	
		}


if(enviaMail($_POST,$asunto,_opc("correo_admin"))){

echo "<p>Su mail ha sido enviado</p>";
}else{
echo "<p>Ha ocurrido un error con el envío favor enviar nuevamente</p>";
	
	}
?>


</div>





</div><!--FIN cont_contenido-->


<? require("pie.php"); ?>

</div><!--FIN fnd_contenido-->
</div><!--FIN cont_gral-->

</body>
</html>
