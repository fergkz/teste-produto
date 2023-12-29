<?php

class Model {

    // VARIABLE TO STORE / USE DB CONNECTION
    protected $connection = null;

    // MAGIC METHOD TO GET AN ATTRIBUTE VALUE
    public function __get($name) {
        return $this->$name;
    }

    // MAGIC METHOD TO SET AN ATTRIBUTE VALUE
    public function __set($name, $value) {
        $this->$name = $value;
    }
    
    // WHEN FILE IS LOADED, LOADS THE DB CONNECTION
    public function __construct() {
        try {
            $this->connection = new PDO(
                'mysql:host=' . DB_HOST . '; dbname=' . DB_NAME . '; charset=utf8',
                DB_USERNAME,
                DB_PASSWORD,
                [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8']
            );
        } catch (PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }
}
