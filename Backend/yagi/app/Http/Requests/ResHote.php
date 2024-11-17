<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
class ResHote extends FormRequest
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
        $rules = [
            'name' => 'required|string|max:255',
            'city_id' => 'required',
            'address' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required',
            'rating' => 'required',
            'description' => 'required',
            'map' => 'required',
            'user_id' => 'required',
            'image' => 'required|image',
        ];
    
        // Nếu là update, các trường có thể không bắt buộc
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['image'] = 'nullable|image';
        }
    
        return $rules;
    }

    public function messages(): array{
        return [
            'name.required'=> 'Tên Hotel không được bỏ trống',
            'name.string'=> 'Tên Hotel không chứa kí tự đặc biệt ',
            'email.required'=> 'email không được bỏ  trống',
            'email.unique'=> 'email đã tồn tại',
            'email.email'=> 'email không đúng định dạng',
            'address.required'=> 'Địa chỉ không được bỏ trống',
            'address.string'=> 'Địa chỉ  không chứa kí tự đặc biệt ',
            'phone.required'=> 'số điện thoại không được bỏ trống',
            'rating.required'=> 'đánh giá không được bỏ trống',
            'description.required'=> 'mô tả không được bỏ trống',
             'map.required'=> 'bản đồ không được bỏ trống',
             
            'user_id.required'=> 'người đăng không được bỏ trống',
            'image.required'=> 'ảnh không được b�� trống'
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}