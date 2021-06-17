<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SessionManager
{
    /** @var SessionInterface  */
    private $session;

    /**
     * SessionManager constructor.
     * @param SessionInterface $session
     */
    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    /**
     * @param $key
     * @param $value
     */
    public function storeInSession($key, $value)
    {
        $this->session->set($key, $value);
    }

    /**
     * @param $key
     * @return mixed
     */
    public function getInSession($key)
    {
        return $this->session->get($key);
    }

    /**
     * @return SessionInterface
     */
    public function getSession()
    {
        return $this->session;
    }

    /**
     * @param $key
     * @return bool
     */
    public function verifyIfKeyIsInSession($key)
    {
        return (bool)$this->session->has($key);
    }

    /**
     * @param $key
     * @param $value
     * @return bool
     */
    public function checkKeyValueInSession($key, $value)
    {
        $session = $this->getInSession($key);

        return $value === $session;
    }

}
