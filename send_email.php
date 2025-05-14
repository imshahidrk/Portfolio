<?php
// Load PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Set JSON response header
header('Content-Type: application/json');

// Configuration
$your_email = 'contact@shahid.works'; // Your email for notifications
$from_email = 'shahidxpc@gmail.com';  // Zoho email for sending
$from_password = 'iundumgdazfguczx';    // Zoho app-specific password  320gejVQFG9L
$site_name = 'www.shahid.works';         // Your website name
$site_author = 'Shahid Khan';

// Check if form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input
    $fname = filter_input(INPUT_POST, 'fname', FILTER_SANITIZE_STRING);
    $lname = filter_input(INPUT_POST, 'lname', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $tel = filter_input(INPUT_POST, 'tel', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING) ?: '(No message provided)';

    if (!$fname || !$lname || !$email || !$tel || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
        exit;
    }

    // Combine name for emails
    $full_name = $fname . ' ' . $lname;

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP settings for Zoho Mail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $from_email;
        $mail->Password = $from_password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email to user (Thank you message)
        $mail->setFrom($from_email, $site_name);
        $mail->addAddress($email); // User's email
        $mail->addReplyTo($your_email, $site_name);
        $mail->Subject = 'Thank You for Contacting Me';
        $mail->Body = "Dear $full_name,\n\nThank you for contacting $site_name. I have received your message and will get back to you shortly.\n\nHere are the details you submitted:\n\nName: $full_name\nEmail: $email\nPhone: $tel\nMessage: $message\n\nBest regards,\n$site_author\n$site_name";
        $mail->send();

        // Clear recipients for admin email
        $mail->clearAddresses();

        // Email to you (Admin notification)
        $mail->addAddress($your_email);
        $mail->addReplyTo($email, $full_name);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "You have received a new message from:\n\nName: $full_name\nEmail: $email\nPhone: $tel\nMessage: $message";
        $mail->send();

        // Return success response
        echo json_encode(['status' => 'success', 'message' => 'Emails sent successfully']);
    } catch (Exception $e) {
        // Return error response
        echo json_encode(['status' => 'error', 'message' => 'Failed to send emails: ' . $mail->ErrorInfo]);
    }
} else {
    // Invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
exit;
?>