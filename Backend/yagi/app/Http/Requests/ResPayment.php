<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
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
           
              
               
                'method' => 'required|in:VNPAY,MoMo,QR',
               
                'firstname'=>'required|string|max:255',
                'lastname'=>'required|string|max:255',
              'phone'=>'required|min:10'
            
        ];
 
    }
    public function messages():array{
        return [
           'booking_id.required' => 'Booking ID is required',
           'booking_id.exists' => 'Booking ID is not found',
           
           'firstname.required'=>'Tên người thanh toán bắt buộc',
            'firstname.string'=>'Tên người thanh toán phải là chữ',
            'firstname.max'=>'Tên người thanh toán không quá 255 ký tự.',
           'lastname.required'=>'Họ người thanh toán bắt buộc',
            'lastname.string'=>'Họ người thanh toán phải là chữ',
            'lastname.max'=>'Họ người thanh toán không quá 255 ký tự.',
            'phone.required'=>'Số điện thoại bắt buộc',
            'phone.regex'=>'Số điện thoại không đúng đ��nh dạng',
            'phone.min'=>'Độ dài tối thiểu là 10 ký tự.',
           'method.required'=>'Phương thức thanh toán bắt buộc',
           
       
          
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}