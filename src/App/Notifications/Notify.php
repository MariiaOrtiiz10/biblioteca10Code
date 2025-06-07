<?php

namespace App\Notifications;

use Domain\Books\Models\Book;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Notify extends Notification
{
    use Queueable;



    /**
     * Create a new notification instance.
     */
    public function __construct(public Book $book)
    {
        $this->book = $book;
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
        $expiryDate = now()->addDays(3)->format('d/m/Y');

        return (new MailMessage)
                    ->subject('Libro disponible: ' . $this->book->title)
                    ->line('¡El libro que reservaste está listo para recoger!')
                    ->line('Título: ' . $this->book->title)
                    ->line('ISBN: ' . $this->book->isbn)
                    ->line("**Tienes hasta el {$expiryDate} para recogerlo.**")
                    ->action('Recoger ahora', url("/dashboard"))
                    ->line('Pasada esta fecha, el libro estará disponible para otros.');
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
