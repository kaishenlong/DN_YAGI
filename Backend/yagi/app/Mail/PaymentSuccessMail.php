<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $booking;
    public $payment;
    public $room;
    /**
     * Create a new message instance.
     *  @param  $user
     * @param  $booking
     * @param  $payment
     * @param  $room
     * @return void
     */
    public function __construct($user, $booking, $payment, $room)
    {
        $this->user = $user;
        $this->booking = $booking;
        $this->payment = $payment;
        $this->room = $room;
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
        return $this->subject('Thanh toán thành công')
            ->view('emails.payment_success');
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
