<?php

class ProductModel extends Model {

    protected $id;

    public function selectPaginated(int $ini) {
        $pstmt = $this->connection->prepare(
            'SELECT P.id FROM products AS P 
            LIMIT ' . $ini . ', ' . PAGINATION_QUANTITY
        );
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $pstmt->fetchAll(PDO::FETCH_CLASS, "ProductModel");
    }

    public function selectCountAll() {
        $pstmt = $this->connection->prepare('SELECT count(P.id) FROM products AS P');
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $pstmt->fetchColumn();
    }
}
