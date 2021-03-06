<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

abstract class BaseController extends AbstractController
{

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

    protected function getUser()
    {
        return parent::getUser();
    }
}
