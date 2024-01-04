<?php

class ProductAttributeModel extends Model {

    protected $id;
    protected $product_id;
    protected $title;
    protected $value;

    public function selectByProduct() {
        $pstmt = $this->connection->prepare('SELECT PA.* FROM product_attributes AS PA WHERE product_id = :product_id');
        $pstmt->bindValue("product_id", $this->product_id);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        $listAttributes = [];

        while ($row = $pstmt->fetchObject("ProductAttributeModel")) {
            $listAttributes[] = $row;
        }

        return $listAttributes;
    }


    public function insert() {
        $pstmt = $this->connection->prepare('INSERT INTO product_attributes (product_id, title, `value`) VALUES (:product_id, :title, :value)');
        $pstmt->bindValue("product_id", $this->product_id);
        $pstmt->bindValue("title", $this->title);
        $pstmt->bindValue("value", $this->value);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $this->connection->lastInsertId();
    }
}
