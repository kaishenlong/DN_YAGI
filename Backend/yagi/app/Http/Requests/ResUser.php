<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
class  ResUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:255',
            'password' => 'nullable|string|min:8',
            'role' => 'in:admin,business,user',
        ];
    }
    public function messages():array {
        return [
            'name.string' => 'Tên không chứa kí tự đặc biệt ',
            'name.max' => 'Tên không được vượt quá 255 ký tự',
            'password.min' => 'Mật khẩu phải dài ít nhất 8 ký tự',
            'role.in' => 'Phải nhập vai trò admin, business, or user',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}