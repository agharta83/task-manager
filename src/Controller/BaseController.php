<?php


namespace App\Controller;


use App\Service\SessionManager;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;

class BaseController extends AbstractController
{
    protected $sessionManager;

    /**
     * BaseController constructor.
     * @param SessionManager $sessionManager
     */
    public function __construct(SessionManager $sessionManager)
    {
        $this->sessionManager = $sessionManager;
    }

    /**
     * @param $data // Usually on object you want to serialize
     * @param int $statusCode
     * @return JsonResponse
     */
    protected function createApiResponse($data, $statusCode = 200)
    {
        $json = $this->get('serializer')->serialize($data, 'json');

        return new JsonResponse($json, $statusCode, [], true);
    }


    /**
     * @param FormInterface $form
     * @return array
     */
    protected function getErrorsFromForm(FormInterface $form)
    {
        $errors = [];
        foreach ($form->getErrors(true, true) as $error) {
            $propertyName = $error->getOrigin()->getName();
            $errors[$propertyName] = $error->getMessage();
        }

        return $errors;
    }

    /**
     * @param string $clientToken
     * @return bool
     */
    protected function checkToken(string $clientToken): bool
    {
        return $this->sessionManager->checkKeyValueInSession('apitoken', $clientToken);
    }
}
