<?php

namespace App\Repositories;

use App\User;
use App\Client;

class ClientRepository
{
    /**
     * Get all of the clients for a given user.
     *
     * @param  User  $user
     * @return Collection
     */
    public function forUser(User $user)
    {
        return Client::where('user_id', $user->id)
                        ->orderBy('name', 'asc')
                        ->get();
    }
}