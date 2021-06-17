<?php


namespace App\Service;


use App\Entity\User;

class ApiToken
{
    private $user;
    private $token;

    public function __construct(User $user)
    {
        $this->user = $user;

        try {
            $this->token = bin2hex(random_bytes(60));
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }
}
