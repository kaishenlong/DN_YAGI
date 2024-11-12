<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResPayment extends FormRequest
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
           
                'booking_id' => 'required|exists:bookings,id',
                'user_id' => 'required|exists:users,id',
                'paymen_date' => 'required|date',
                'method' => 'required|in:Credit Card,MoMo,QR',
                'total_amount' => 'required|numeric|min:0',
                'status' => 'required|in:pending,complete,failed',
           
            
        ];
 
    }
    // public function messages():array{
    //     return [
    //         'type_room.required' => 'Tên loại phòng không được để trống',
    //         'type_room.max' => 'Tên loại phòng không quá 255 ký tự',
    //         'bed.nullable' => 'Số  giuong không được để trống'
    //     ];
    // }
}
