<?php

namespace App\Repositories;

use App\User;
use App\Document;

class DocumentRepository
{
    /**
     * Get all documentation for a given user.
     * 
     * @param User $user
     * @return Collection
     */
    public function forUser(User $user)
    {
        return Document::where('user_id', $user->id)
                        ->orderBy('session_date', 'asc')
                        ->get();
    }
}