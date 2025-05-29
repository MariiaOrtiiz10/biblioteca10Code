<?php

namespace Domain\Loans\Models;

use Database\Factories\LoanFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

class Loan extends Model
{
    use HasFactory,HasUuids;



    protected static function newFactory()
    {
        return LoanFactory::new();
    }

    protected $fillable = [
        'id',
        'user_id',
        'book_id',
        'start_date',
        'end_date',
        'loan_duration',
        'status',
        'delayed_days',
        'returned_at',
    ];



    public function book()
    {
        return $this->belongsTo(Book::class)->withTrashed();
    }


    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

}



