<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function listProduct(){
        $listProduct = Product::select('name','description','images','price')->get();

    return response()->json([
        'data' => $listProduct,
        'status_code' => '200',
        'message' => 'success'
    ], 200);
    }
    public function getProduct($idProduct){
        $product = Product::select('id','name','description','images','price')->find($idProduct);
        if($product){
            return response()->json([
                'data' => $product,
                'status_code' => '200',
               'message' =>'success'
            ], 200);
        }else{
            return response()->json([
               'status_code' => '404',
               'message' => 'Not found'
            ], 404);
        }
    }
    public function addProduct(Request $req){
        $req->validate([
            'name' => 'required',
            'price'=> 'required',
            'description' => 'required',
        ]);

        $data = [
            'name' => $req->name,
            'price' => $req->price,
            'description' => $req->description,
        ];
        $newProduct = Product::create($data);

        return response()->json([
            'data' => $newProduct,
            'message' => 'Product created successfully',
            'status_code' =>'200',
        ],200);
    }

    public function updateProduct(Request $req){
        $req->validate([
            'name' => 'required',
            'price'=> 'required',
        ]);

        $data = [
            'name' => $req->name,
            'price' => $req->price,
        ];
        $product = Product::find($req->idProduct);
        $product->update($data);
        return response()->json([
            'data' => $product,
            'message' => 'Product update successfully',
            'status_code' =>'200',
        ],200);
    }
    public function deleteProduct(Request $req){
      $req->validate([
        'idProduct' =>'required',
      ]);  
      Product::find($req->idProduct)->delete();
      return response()->json([
        'message' => 'Product delete successfully',
        'status_code' =>'200',
    ],200);
    }
}
