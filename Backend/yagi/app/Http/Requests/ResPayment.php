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
           
                'booking_id' => 'required|exists:bookings,id',
                'user_id' => 'required|exists:users,id',
                'paymen_date' => 'required|date',
                'method' => 'required|in:Credit Card,MoMo,QR',
                'status' => 'required|in:pending,complete,failed'
           
            
        ];
 
    }
    public function messages():array{
        return [
           'booking_id.required' => 'Booking ID is required',
           'booking_id.exists' => 'Booking ID is not found',
           'user_id.required' => 'User ID is required',
           'user_id.exists' => 'User ID is not found',
           'payment_date.required' => 'Payment Date is required',
           'payment_date.date' => 'Payment Date is not in the correct format',
          'method.required' => 'Payment Method is required',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}