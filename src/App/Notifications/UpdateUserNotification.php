<?php

namespace App\Notifications;

use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateUserNotification extends Notification
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
                    ->subject('Datos actualizados - BiblioTrack')
                    ->greeting('Hola ' . $this->user->name . ',')
                    ->line('Tus datos han sido actualizados correctamente en BiblioTrack.')
                    ->line('**Nombre:** ' . $this->user->name)
                    ->line('**Correo:** ' . $this->user->email)
                    ->action('Accede a tu cuenta', url('/login'))
                    ->salutation('Gracias por confiar en BiblioTrack');
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
