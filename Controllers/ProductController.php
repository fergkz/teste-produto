<?php

class ProductController extends Controller {

    public static function handleRoutes() {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                if (!isset(ARRAY_REQUEST_URI[1])) {
                    self::list();
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
        $jsonData = [];
        // INTERATES OVER PRODUCT LIST TO STRUCTURE ITS DATA TO ARRAY / JSON FORMAT    
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
}
