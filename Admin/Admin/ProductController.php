<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    public function listProduct(){
        $product =  Product::paginate(5);
        return view('admin.products.list-product')
        ->with(['product'=> $product]);
    }
    public function addProduct(){
        return view('admin.products.add-product');
    }
    public function addPostProduct(Request $req){
        $imageUrl = '';
        if ($req->hasFile('imageProduct')) {
            $image = $req->file('imageProduct');
            $nameImage = time(). "." . $image ->getClientOriginalExtension();
            $link = "imageProduct/";
            $image->move(public_path($link),$nameImage);
            $imageUrl = $link.$nameImage;
        }
        $data = [
            'name' => $req->nameProduct,
            'price' => $req->priceProduct,
            'images' => $imageUrl
        ];
        
        Product::create($data);
        return redirect()->route('admin.product.listProduct')->with([
            'message' => 'Them moi thanh cong'
        ]);
    }
    public function deleteProduct(Request $req){
        $product = Product::find($req->idProduct);
        if($product->image !== null && $product->image !=''){
            File::delete(public_path($product->image));
        }
        $product->delete();
        return redirect()->back()->with([
           'message' => 'Xoa thanh cong'
        ]);
    }
}
