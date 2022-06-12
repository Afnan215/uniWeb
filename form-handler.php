<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];


$email_from = 'info@yourwebsite.com';   // Domain Name

$email_subject = 'New Form Submission'; // Email Subject

$email_body = "User Name: $name.\n".
                "User Email: $visitor_email.\n".
                 "Subject: $subject.\n".
                 "User Message: $message.\n";

$to = 'shahafnan786@gmail.com'; // Where we want to receive the personal enquiry

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);    // Sending data to email

header("Location: contact.html");   // Detect the usere at this page after submit the data
?>

<!-- Now in order to use this file we need to do online website hosting then this form will 
work i.e if someone submit the form then we will receive the email -->