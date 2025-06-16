<?php

namespace App\Notifications;

use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewUserNotification extends Notification
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
                      ->subject('¡Bienvenido a BiblioTrack')
                    ->greeting('Hola ' . $this->user->name . ',')
                    ->line('Te damos la bienvenida a **BiblioTrack**, tu nueva herramienta para gestionar libros, préstamos y reservas de manera sencilla y eficaz.')
                    ->line('Tu cuenta ha sido creada correctamente. Ya puedes acceder a la plataforma y comenzar a explorar todas sus funcionalidades.')
                    ->action('Acceder a BiblioTrack', url("/login"))
                    ->line('Si tienes alguna duda o necesitas soporte, no dudes en contactarnos.')
                    ->salutation('¡Gracias por unirte!');
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
