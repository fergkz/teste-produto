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

    public function insert() {
        $pstmt = $this->connection->prepare('INSERT INTO product_assets (product_id, `type`, `path`) VALUES (:product_id, :type, :path)');
        $pstmt->bindValue("product_id", $this->product_id);
        $pstmt->bindValue("type", $this->type);
        $pstmt->bindValue("path", $this->path);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));

        return $this->connection->lastInsertId();
    }

    public function delete() {
        $pstmt = $this->connection->prepare('DELETE FROM product_assets WHERE id = :id');
        $pstmt->bindValue("id", $this->id);
        $pstmt->execute() or die(print_r($pstmt->errorInfo()));
    }
}
