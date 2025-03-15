<?php
session_start();
$conn = new mysqli("localhost", "root", "", "user db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if passwords match
    if ($password !== $confirm_password) {
        die("Error: Passwords do not match.");
    }

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check if username already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        die("Error: Username already taken.");
    }
    $stmt->close();

    // Insert new user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashed_password);
    if ($stmt->execute()) {
        echo "Registration successful! <a href='login.html'>Login here</a>";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
}
$conn->close();
?>

