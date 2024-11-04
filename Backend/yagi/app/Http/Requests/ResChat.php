<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
class ResChat extends FormRequest
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
            'message' => 'required|string|max:500',
        ];
    }
    public function messages():array{
        return [
           'message.required' => 'Vui lòng nhập tin nhắn.',
           
           'message.max' => 'Tin nhắn không thể vượt quá 500 ký tự',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}