<?php

class ProductModel extends Model {

    protected $id;

    public function selectPaginated(int $ini) {
        $pstmt = $this->connection->prepare(
            'SELECT P.id FROM product AS P 
            LIMIT ' . $ini . ', ' . PAGINATION_QUANTITY
        );
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $pstmt->fetchAll(PDO::FETCH_CLASS, "ProductModel");
    }
}
