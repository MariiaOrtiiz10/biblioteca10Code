<?php

namespace App\Notifications;

use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DeleteUserNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public User $user)
    {
      $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Cuenta eliminada - BiblioTrack')
            ->greeting('Hola,')
            ->line('Queremos informarte que la cuenta asociada al usuario **' . $this->user->name . '**  ha sido eliminada del sistema de BiblioTrack.')
            ->line('Si consideras que se trata de un error o necesitas asistencia, no dudes en contactarnos.')
            ->salutation('Atentamente, el equipo de BiblioTrack');
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
