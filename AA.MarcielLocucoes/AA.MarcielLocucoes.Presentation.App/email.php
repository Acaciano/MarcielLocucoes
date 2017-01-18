<?php
header('Access-Control-Allow-Origin: *');
	
$remetente = $_POST['name'] . " <" . $_POST['email'] . ">";
$nome = $_POST['name'];
$email = $_POST['email'];
$assunto = $_POST['fone'];
$msg = $_POST['message'];

$destino = "contato@granisoproducoes.com.br"; // o email que irá receber os emails do site

$html_msg = "<div>Olá, Graniso Produções </div><div>Você recebeu uma mensagem de contato, através do Portal - Graniso Produções.</div><div></div></br></br><div>Nome: ".$nome."</div><div><div>Telefone: ".$fone."</div><div><div>E-mail: ".$email."</div><div><div>Mensagem: ".$msg."</div><div>";

$email_remetente = "contato@granisoproducoes.com.br";
            
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: ". $email_remetente ."\r\n";
$headers .= "Reply-To: ". $email_remetente ."\r\n";
$headers .= "X-Priority: 1\r\n";
$headers .= "X-MSMail-Priority: High\r\n";
$headers .= "X-Mailer: Just My Server";
    
 $enviaremail = mail($destino, 'Graniso Produções - Contato', ($html_msg), $headers, "-f" .$email_remetente);
if ($enviaremail) {
    $data = array('enviado' => $enviaremail, 'html' => $html_msg , 'email' => $email  );
    echo json_encode($data);
}else{
 	$data = array('enviado' => $enviaremail);
    echo json_encode($data);
}
