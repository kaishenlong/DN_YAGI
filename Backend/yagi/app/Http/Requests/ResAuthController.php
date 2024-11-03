<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResAuthController extends FormRequest
{
    
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=> 'required|string|max:255',
            'email'=> 'required|string|email|max:255|unique:users',
            'password'=> 'required|string|min:6',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required'=> 'email không được bỏ trống',
            'name.string'=> 'Tên không chứa kí tự đặc biệt ',
           'email.unique'=> 'email đã tồn tại',
            'email.required'=> 'email không được bỏ  trống',
            'email.exists'=> 'email chưa được đăng kí ',
            'email.email'=> 'email không đúng định dạng',
           
            'password.required'=> 'mật khâu không được bỏ trống',
            'password.min'=> 'mật khâu phải lớn hơn 6  ký tự',
        ];
    }
}