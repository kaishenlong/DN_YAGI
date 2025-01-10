<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Build the email message.
     */
    public function build()
    {
        // Đường dẫn đến logo, ví dụ là logo trong thư mục public của Laravel
        $logoPath = public_path('images/logo.png'); // Giả sử logo nằm trong thư mục public/images

        return $this->subject('Chào mừng bạn đến với Hostel Yagi!')
                    ->view('emails.welcome')  // View email
                    ->with([
                        'user' => $this->user,
                        'userName' => $this->user->name,
                        'userEmail' => $this->user->email,
                    ])
                    ->attach($logoPath, [
                        'as' => 'logo.png',  // Tên tệp đính kèm
                        'mime' => 'image/png',  // Loại mime
                        'cid' => 'logo.png',
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
    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome',
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
