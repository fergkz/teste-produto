<?php

class ProductAssetModel extends Model {

    protected $id;
    protected $product_id;
    protected $path;

    public function selectByProduct() {
        $pstmt = $this->connection->prepare('SELECT PA.* FROM product_assets AS PA WHERE product_id = :product_id');
        $pstmt->bindValue("product_id", $this->product_id);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        $listAssets = [];

        while ($row = $pstmt->fetchObject("ProductAssetModel")) {
            $listAssets[] = $row;
        }

        return $listAssets;
    }
}
