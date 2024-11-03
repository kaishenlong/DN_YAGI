<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResChat extends FormRequest
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
            'message' => 'required|string|max:500',
        ];
    }
    public function messages():array{
        return [
           'message.required' => 'Vui lòng nhập tin nhắn.',
           
           'message.max' => 'Tin nhắn không thể vượt quá 500 ký tự',
        ];
    }
}