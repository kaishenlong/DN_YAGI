<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ReqBooking extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'detail_room_id' => 'required|exists:detail_rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'required|integer|min:1',
            'adult' => 'required|integer|min:1',
            'children' => 'nullable|integer|min:0',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric',
            'status' => 'nullable|string',
        ];
    }
    public function messages() :array{
        return [
            'user_id.required' => 'Trường "User ID" là bắt buộc.',
            'user_id.exists' => 'User ID không tồn tại trong cơ sở dữ liệu.',
            'detail_room_id.required' => 'Trường "Detail Room ID" là bắt buộc.',
            'detail_room_id.exists' => 'Detail Room ID không tồn tại trong cơ sở dữ liệu.',
            'check_in.required' => 'Trường "Ngày nhận phòng" là bắt buộc.',
            'check_in.date' => 'Ngày nhận phòng phải là một ngày hợp lệ.',
            'check_in.after_or_equal' => 'Ngày nhận phòng phải lớn hơn hoặc bằng ngày hôm nay.',
            'check_out.required' => 'Trường "Ngày trả phòng" là bắt buộc.',
            'check_out.date' => 'Ngày trả phòng phải là một ngày hợp lệ.',
            'check_out.after' => 'Ngày trả phòng phải sau ngày nhận phòng.',
            'guests.required' => 'Trường "Số khách" là bắt buộc.',
            'guests.integer' => 'Số khách phải là một số nguyên.',
            'guests.min' => 'Số khách phải ít nhất là 1.',
            'adult.required' => 'Trường "Số người lớn" là bắt buộc.',
            'adult.integer' => 'Số người lớn phải là một số nguyên.',
            'adult.min' => 'Số người lớn phải ít nhất là 1.',
            'children.integer' => 'Số trẻ em phải là một số nguyên.',
            'quantity.required' => 'Trường "Số lượng" là bắt buộc.',
            'quantity.integer' => 'Số lượng phải là một số nguyên.',
            'quantity.min' => 'Số lượng phải ít nhất là 1.',
            'total_price.required' => 'Trường "Tổng giá" là bắt buộc.',
            'total_price.numeric' => 'Tổng giá phải là một số.',
            'total_price.min' => 'Tổng giá phải lớn hơn hoặc bằng 0.',
            'status.string' => 'Trạng thái phải là pending, confirmed, cancelled',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $response = new Response([
            'errors' => $validator -> errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw (new ValidationException($validator,$response));
    }
}