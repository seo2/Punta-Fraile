<?php 
try {
	if(isset($_POST)){
		if(is_array($_POST)){
			if($_POST['tipo'] == 'cotizar'){
				$nombre = $_POST['cot_nombre'];
				$apellido = $_POST['cot_apellido'];
				$mail = $_POST['cot_mail'];
				$telefono = $_POST['cot_telefono'];
				$depa = $_POST['cot_depa'];
				
				$body = '<table>
					<tr>
						<td><b>Nombre: </b></td>
						<td>'.$nombre.'</td>
					</tr>
					<tr>
						<td><b>Apellido: </b></td>
						<td>'.$apellido.'</td>
					</tr>
					<tr>
						<td><b>Mail: </b></td>
						<td>'.$mail.'</td>
					</tr>
					<tr>
						<td><b>Telefono: </b></td>
						<td>'.$telefono.'</td>
					</tr>
					<tr>
						<td><b>Departamento: </b></td>
						<td>'.$depa.'</td>
					</tr>
				</table>';

				//para el envío en formato HTML 
				$headers = "MIME-Version: 1.0\r\n"; 
				$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

				// mail("jaime.quinones.t@gmail.com","Cotización",$body,$headers);
				
				mail("pablopizarro@queylen.cl","Cotización",$body,$headers);
				// mail("marco@agenciafauna.com","Cotización",$body,$headers);
			}
			
			if( $_POST['tipo'] == 'contacto'){
				$nombre = $_POST['con_nombre'];
				$apellido = $_POST['con_apellido'];
				$mail = $_POST['con_mail'];
				$telefono = $_POST['con_telefono'];
				$comentario = $_POST['con_comentario'];
				
				$body = '<table>
					<tr>
						<td><b>Nombre: </b></td>
						<td>'.$nombre.'</td>
					</tr>
					<tr>
						<td><b>Apellido: </b></td>
						<td>'.$apellido.'</td>
					</tr>
					<tr>
						<td><b>Mail: </b></td>
						<td>'.$mail.'</td>
					</tr>
					<tr>
						<td><b>Telefono: </b></td>
						<td>'.$telefono.'</td>
					</tr>
					<tr>
						<td><b>Comentario: </b></td>
						<td>'.$comentario.'</td>
					</tr>
				</table>';

				//para el envío en formato HTML 
				$headers = "MIME-Version: 1.0\r\n"; 
				$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

				// if(!mail("jaime.quinones.t@gmail.com","Contacto",$body,$headers)) throw new Exception('Error mail');
				mail("pablopizarro@queylen.cl","Contacto",$body,$headers); 
				// mail("marco@agenciafauna.com","Contacto",$body,$headers);
			}
			
			echo json_encode(array("code" => 0));
		} else {
			throw new Exception('Invalid data.');
		}
	} else {
		throw new Exception('No post data.');
	}
} catch ( Exception $e ) {
	echo $e->getMessage();
}
?>
