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
}
