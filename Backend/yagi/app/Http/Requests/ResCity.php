<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResCity extends FormRequest
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
            //
         'name' => 'required',
        ];
    }
    public function messages(): array{
        return [
           'name.required' => 'Tên City không được bỏ trống',
        'name.string'=> 'Tên City không chứa kí tự đặc biệt ',
        ];
        
    }
}