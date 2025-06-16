<?php

namespace App\Notifications;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoanUserNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public Book $book;
    public User $user;
    public string $startDate;
    public string $endDate;
    public function __construct(Book $book, User $user, string $startDate, string $endDate)
    {
        $this->book = $book;
        $this->user = $user;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
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
            ->subject('Confirmación de préstamo de "' . $this->book->title . '"')
            ->greeting('Hola ' . $this->user->name . ',')
            ->line("Te informamos que se ha realizado correctamente el préstamo del libro titulado \"{$this->book->title}\".")
            ->line("Este préstamo fue registrado a tu nombre (**{$this->user->name}**, correo: {$this->user->email}) el día **{$this->startDate}**.")
            ->line("Recuerda que tienes hasta el **{$this->endDate}** para devolverlo.")
            ->line("Gracias por utilizar BiblioTrack. ¡Feliz lectura!")
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
