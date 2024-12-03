<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            'old_password' => 'required|string|min:6',  // Mật khẩu cũ
            'new_password' => 'required|string|min:6|confirmed',  // Mật khẩu mới, cần xác nhận
        ];
    }
    public function messages()
    {
        return [
            'old_password.required' => 'Mật khẩu cũ là bắt buộc.',
            'new_password.required' => 'Mật khẩu mới là bắt buộc.',
            'new_password.min' => 'Mật khẩu mới phải có ít nhất 6 ký tự.',
            'new_password.confirmed' => 'Mật khẩu mới và xác nhận mật khẩu không khớp.',
        ];
    }
}
