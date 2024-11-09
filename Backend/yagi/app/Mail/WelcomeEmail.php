<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    /**
     * Create a new message instance.
     */
    // Constructor nhận người dùng để gửi thông tin trong email
    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build()
    {
        // Chỉnh sửa nội dung email trực tiếp trong hàm này
        return $this->subject('Chào mừng bạn đến với Hostel Yagi!')
                    ->view('emails.welcome')  // Sử dụng view "emails.welcome"
                    ->with([
                        'user' => $this->user,
                        // Thêm bất kỳ dữ liệu nào bạn cần vào đây
                        'userName' => $this->user->name,
                        'userEmail' => $this->user->email,
                    ]);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Chào mừng bạn đến với Hostel Yagi!',
        );
    }

    /**
     * Get the message content definition.
     */
    // public function content(): Content
    // {
    //     return new Content(
    //         view: 'view.name',
    //     );
    // }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
