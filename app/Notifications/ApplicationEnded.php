<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationEnded extends Notification
{
    use Queueable;

    protected $recruter;
    protected $position;
    /**
     * Create a new notification instance.
     */
    public function __construct(?string $recruter, ?string $position)
    {
        $this->recruter = $recruter;
        $this->position = $position;
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
            ->subject('Application Ended')
            ->line("Dear $notifiable->first_name,  We are sorry to informe you that your application for $this->position has ended. Due to us finding different candinate,")
            ->salutation("Regards, $this->recruter");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
