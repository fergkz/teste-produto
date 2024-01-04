<?php

class ProductModel extends Model {

    protected $id;
    protected $attributes;
    protected $assets;

    public function selectPaginated(int $ini) {
        $pstmt = $this->connection->prepare(
            'SELECT P.id FROM products AS P LIMIT ' . $ini . ', ' . PAGINATION_QUANTITY
        );
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $pstmt->fetchAll(PDO::FETCH_CLASS, "ProductModel");
    }

    public function selectCountAll() {
        $pstmt = $this->connection->prepare('SELECT count(P.id) FROM products AS P');
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $pstmt->fetchColumn();
    }

    public function select() {
        $pstmt = $this->connection->prepare('SELECT P.id FROM products AS P WHERE id = :id');
        $pstmt->bindValue("id", $this->id);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        if (!$row = $pstmt->fetchObject("ProductModel")) {
            return null;
        }

        return $row;
    }

    public function insert() {
        $pstmt = $this->connection->prepare('INSERT INTO products VALUES ()');
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $this->connection->lastInsertId();
    }

    public function delete() {
        $pstmt = $this->connection->prepare('DELETE FROM products WHERE id = :id');
        $pstmt->bindValue("id", $this->id);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));
    }
}
