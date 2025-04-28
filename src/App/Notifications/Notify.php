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
        return (new MailMessage)
                    ->subject('Book available: ' . $this->book->title)
                    ->line('The book you reservated is now available to loan')
                    ->line('Title: ' . $this->book->title)
                    ->line('ISBN: ' . $this->book->isbn)
                    ->action('Take it loaned now', url("/loans/create?isbn={$this->book->isbn}"))
                    ->line('Thank you for using our application!');
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
