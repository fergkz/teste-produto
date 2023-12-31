<?php

require_once __DIR__ . DIRECTORY_SEPARATOR . "defines.php";

// FUNCTION TO "LOAD" A FILE IF ITS PHP
function requireOnceIfFileIsPHP($path, $file) {
    // CHECK IF THE FILE EXTENSION IS PHP
    if (pathinfo($file, PATHINFO_EXTENSION) === "php") {
        // "LOAD" THE FILE USING ITS FULL PATH
        require_once $path . DIRECTORY_SEPARATOR . $file;
    }
}

// SCAN THE MODELS DIR FOR FILES
$MODELS = scandir(DIR_MODEL);
// ITERATES OVER EACH FILE
foreach ($MODELS as $file) {
    // USES A FUNCTION TO "LOAD" THE FILE IF POSSIBLE
    requireOnceIfFileIsPHP(DIR_MODEL, $file);
}

// SCAN THE CONTROLLERS DIR FOR FILES
$CONTROLLERS = scandir(DIR_CONTROLLER);
// ITERATES OVER EACH FILE
foreach ($CONTROLLERS as $file) {
    // USES A FUNCTION TO "LOAD" THE FILE IF POSSIBLE
    requireOnceIfFileIsPHP(DIR_CONTROLLER, $file);
}
