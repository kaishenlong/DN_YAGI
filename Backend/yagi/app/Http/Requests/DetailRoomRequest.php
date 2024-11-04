<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DetailRoomRequest extends FormRequest
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
            'room_id' => 'required',
            'hotel_id' => 'required',
            'price' => 'required|numeric|min:150000',
            'price_surcharge' => 'nullable|numeric|min:0',
            'available' => 'required|boolean',
            'description' => 'required|string',
            'image' => 'required|image',
            // 'gallery_id' => 'required|integer|exists:galleries,id',
            // 'into_money' => 'nullable|numeric|min:0',
        ];
        
    }
    public function messages():array{
        return[
            'room_id.required' => 'Loại phòng không được bỏ trống',
            'hotel_id.required' => 'Khách sạn không được bỏ trống',
            'price.required.numeric.min' => 'Price không hợp lệ. Vui lòng nhập một số lớn hơn 100.000vnd.',
            'price_surcharge.required.numeric.min' => 'Phí phụ thu không được để trống, phải là số không âm.',
            'available.required.boolean' => 'Trạng thái sẵn dùng không được để trống và phải là giá trị boolean (true hoặc false)',
            'description.required.string' => 'Mô tả không được để trống và phải là chuỗi.',
            'image.required.image' => 'Ảnh không được để trống và phải là tệp ảnh hợp lệ.',
        ];
    }
    
}