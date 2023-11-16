<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InterviewInvitation extends Notification
{
    use Queueable;

    protected $text;
    protected $datetime;
    protected $place;
    protected $sender;
    protected $subject = 'Your Interview Details...';
    /**
     * Create a new notification instance.
     */
    public function __construct(?string $text, ?string $datetime, ?string $place, ?string $sender)
    {
        $this->text = $text;
        $this->datetime = $datetime;
        $this->place = $place;
        $this->sender = $sender;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Invitation to Interview')
            ->line($this->text)
            ->line($this->datetime)
            ->line($this->place);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'datetime' => $this->datetime,
            'place' => $this->place,
            'text' => $this->text,
            'from' => $this->sender,
            'subject' => $this->subject
        ];
    }
}
