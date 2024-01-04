<?php

class ProductController extends Controller {

    public static function handleRoutes() {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                // CHECK IF CURRENT URL DOESNT HAVE MORE PARTS
                if (!isset(ARRAY_REQUEST_URI[1])) {
                    self::list();
                    // CHECK IF CURRENT URL SECOND PART IS AN INTEGER
                } else if (filter_var(ARRAY_REQUEST_URI[1], FILTER_VALIDATE_INT)) {
                    self::get();
                }
                break;
            case "POST":
                if (isset(ARRAY_REQUEST_URI[1]) && ARRAY_REQUEST_URI[1] == "store") {
                    self::store();
                }
                break;
        }
    }

    private static function list() {
        // CREATES A NEW INSTACE OF PRODUCT MODEL
        $product = new ProductModel();

        // CHECK IF HAS "GET" PAGE PARAM AND IF IS NUMBER THEN SET IT AS PAGE VALUE, OTHERWISE SETS PAGE AS 1
        $page = isset($_GET['page']) && filter_var($_GET['page'], FILTER_VALIDATE_INT) ? $_GET['page'] : 1;
        // CALCULATE SELECT OFFSET
        $ini = PAGINATION_QUANTITY * $page - PAGINATION_QUANTITY;

        // RETRIEVE PRODUCTS IN A PAGINATED LIST
        $productList = $product->selectPaginated($ini);
        // COUNT TOTAL OF PRODUCTS
        $countList = $product->selectCountAll();

        // CREATE A ARRAY / JSON WITH TOTAL COUNT AND TOTAL PAGE COUNT        
        $json = [
            'total' => $countList,
            // CHECK IF COUNT IS GREATER THAN PAGINATION QUANTITY THEN SET THE DIFFERENCE AS THE TOTAL OF PAGES, OTHERWISE SET TOTAL PAGE OF 1
            'totalPages' => $countList > PAGINATION_QUANTITY ? round($countList / PAGINATION_QUANTITY) : 1
        ];

        // ITERATES OVER PRODUCT LIST TO STRUCTURE ITS DATA TO ARRAY / JSON FORMAT    
        $jsonData = [];
        foreach ($productList  as $productL) {
            $jsonData[] = [
                'id' => $productL->id,
            ];
        }
        // SET PRODUCTS PAGINATE LIST TO DATA FIELD INSIDE ARRAY / JSON       
        $json['data'] = $jsonData;

        // RETURNS THE ARRAY CONVERTED TO JSON
        echo json_encode($json);
    }

    private static function get() {
        // CREATES A NEW INSTACE OF PRODUCT MODEL
        $product = new ProductModel();
        // SET PRODUCT INSTANCE ID TO CURRENT URL SECOND PART
        $product->id = ARRAY_REQUEST_URI[1];
        // CHECK IF PRODUCT EXISTS
        if (!$product = $product->select()) {
            // RETURN ERROR IF DOESNT EXISTS
            throw new Exception("Product does not exists.");
        }

        // CREATE INSTACE OF PRODUCT ATTRIBUTE
        $productAttribute = new ProductAttributeModel();
        // SET ATTRIBUTE PRODUCT_ID AS CURRENT PRODUCT ID
        $productAttribute->product_id = $product->id;
        // RETRIEVE ALL ATTRIBUTES RELATED TO THE PRODUCT
        $listAttributes = (array) $productAttribute->selectByProduct();
        // ITERATES OVER ATTRIBUTES LIST TO STRUCTURE ITS DATA TO ARRAY / JSON FORMAT 
        $jsonAttributes = [];
        foreach ($listAttributes as $attribute) {
            $jsonAttributes[] = [
                'id' => $attribute->id,
                'title' => $attribute->title,
                'value' => $attribute->value,
            ];
        }

        // CREATE INSTACE OF PRODUCT ASSET
        $productAsset = new ProductAssetModel();
        // SET ASSET PRODUCT_ID AS CURRENT PRODUCT ID
        $productAsset->product_id = $product->id;
        // RETRIEVE ALL ASSETS RELATED TO THE PRODUCT
        $listAssets = $productAsset->selectByProduct();
        // ITERATES OVER ASSETS LIST TO STRUCTURE ITS DATA TO ARRAY / JSON FORMAT 
        $jsonAssets = [];
        foreach ($listAssets as $asset) {
            $jsonAssets[] = [
                'id' => $asset->id,
                'type' => $asset->type,
                'path' => $asset->path,
            ];
        }

        // RETURNS AN ARRAY / JSON WITH ALL THE DATA
        echo json_encode([
            'id' => $product->id,
            'attributes' => $jsonAttributes,
            'assets' =>  $jsonAssets,
        ]);
    }

    private static function store() {
        $product = new ProductModel();
        $product->id = $product->insert();

        if (
            isset($_POST['title']) && is_array($_POST['title'])
            && isset($_POST['value']) && is_array($_POST['value'])
        ) {
            foreach ($_POST['title'] as $keyT => $title) {
                $productAttribute = new ProductAttributeModel();
                $productAttribute->product_id = $product->id;
                $productAttribute->title = $title;
                $productAttribute->value = $_POST['value'][$keyT];
                $productAttribute->insert();
            }
        }
    }
}
