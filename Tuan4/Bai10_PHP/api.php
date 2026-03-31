<?php
/**
 * API Example for Docker PHP
 */

header('Content-Type: application/json');

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Simple API endpoints
if ($method === 'GET') {
    if ($_SERVER['REQUEST_URI'] === '/api/hello') {
        echo json_encode([
            'message' => 'Hello, Docker!',
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => phpversion()
        ]);
    } else {
        echo json_encode(['error' => 'Endpoint not found']);
    }
} else {
    echo json_encode(['error' => 'Method not allowed']);
}
?>
