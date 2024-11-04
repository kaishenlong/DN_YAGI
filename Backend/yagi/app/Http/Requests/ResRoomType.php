<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use SebastianBergmann\Type\TrueType;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
class ResRoomType extends FormRequest
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
            'type_room' => 'required|max:255',
            'bed' => 'nullable' // Thêm vào nếu 'bed' có thể không được cung cấp
        ];
 
    }
    public function messages():array{
        return [
            'type_room.required' => 'Tên loại phòng không được để trống',
            'type_room.max' => 'Tên loại phòng không quá 255 ký tự',
            'bed.nullable' => 'Số  giuong không được để trống'
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}