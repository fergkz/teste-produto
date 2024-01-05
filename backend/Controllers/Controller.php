<?php

class Controller {

    // FUNCTION TO RETRIEVE "POST" BODY CONTENT
    protected static function getData(){
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        return $data;
    }
}