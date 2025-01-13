<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PayMangEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $bookings;
    public $payment;
    public $room;
    public $type;
    /**
     * Create a new message instance.
     *  @param  $user
     * @param  $bookings
     * @param  $payment
     * @param  $room
     * @param  $type
     * @return void
     */
    public function __construct($user, $bookings, $payment, $room, $type)
    {
        $this->user = $user;
        $this->bookings = $bookings;
        $this->payment = $payment;
        $this->room = $room;
        $this->type = $type;  // Thêm thông tin loại phòng
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Cảm ơn bạn đã sử dụng dịch vụ của Hotel Yagi chúng tôi',
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        $logoPath = public_path('images/logo.png');
        return $this->subject('Thanh toán thành công')
            ->view('emails.paymang')
            ->with([
                'user' => $this->user,
                'bookings' => $this->bookings,
                'payment' => $this->payment,
                'room' => $this->room,
                'roomType' => $this->type, 
            ])
            ->attach($logoPath, [
                'as' => 'logo.png',
                'mime' => 'image/png',
                'cid' => 'logo.png',
            ]);
    }
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
