<?php

namespace App\Policies;

use App\User;
use App\Template;
use Illuminate\Auth\Access\HandlesAuthorization;

class TemplatePolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given user can delete the given Template.
     * 
     * @param User $user
     * @param Template $template
     * @return bool
     */
    public function destroy(User $user, Template $template)
    {
        return $user->id == $template->user_id;
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
