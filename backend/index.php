<?php

// BOOTSTRAP THE APPLICATION
require_once __DIR__ . DIRECTORY_SEPARATOR . "includes" . DIRECTORY_SEPARATOR . "bootstrap.php";

// var_dump(ARRAY_REQUEST_URI);
// exit;

try {
    switch (ARRAY_REQUEST_URI[0]) {
        case "product":
            ProductController::handleRoutes();
            break;
        default:
            http_response_code(404);
            echo '{"message": "Página não encontrada"}';
    }
} catch (Exception $e) {
    http_response_code('400');
    echo '{"message": "' . $e->getMessage() . '"}';
}
