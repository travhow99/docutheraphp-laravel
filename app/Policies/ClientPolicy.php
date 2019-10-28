<?php

namespace App\Policies;

use App\User;
use App\Client;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClientPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given user can delete the given client.
     * 
     * @param User $user
     * @param Client $client
     * @return bool
     */
    public function destroy(User $user, Client $client)
    {
        return $user->id == $client->user_id;
    }

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
}
