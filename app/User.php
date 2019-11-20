<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get all documentation for the user.
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Get all clients for the user.
     */
    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    /**
     * Get all templates for the user.
     */
    public function templates()
    {
        return $this->hasMany(Template::class);
    }

    /**
     * Get all sessions through clients for this user.
     */
    public function sessions()
    {
        return $this->hasManyThrough('App\Session', 'App\Client');
    }
}
