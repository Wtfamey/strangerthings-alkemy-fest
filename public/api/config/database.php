<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

class Database {
    private $host = "localhost";
    private $db_name = "stranger_things_db";
    private $username = "root";
    private $password = ""; // XAMPP MySQL password is empty by default
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            // Create PDO connection with proper error handling
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name}",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
                )
            );

            // Test connection with a simple query
            $test_query = $this->conn->query("SELECT 1");
            if ($test_query) {
                // Connection is working
                return $this->conn;
            } else {
                // Connection failed
                throw new Exception("Database connection failed");
            }
        } catch (PDOException $e) {
            // Log error for debugging
            error_log("Database connection error: " . $e->getMessage());
            
            // Return null to indicate failure
            return null;
        }
    }
}
?>
