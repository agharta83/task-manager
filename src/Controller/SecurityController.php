<?php

namespace App\Controller;


use LogicException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @Route("/login", name="app_login")
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->createApiResponse($lastUsername, $error);
    }

    /**
     * @Route("/api/user/logout", name="app_logout", methods={"GET"})
     */
    public function logout()
    {
        throw new LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("api/user/login", name="api_login", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function loginUser(Request $request)
    {
        $data = [
            'isLogged' => false,
            'status' => 400
        ];

        if ($this->getUser()) {
            if (!$this->getUser()->getIsActif()) {
                $this->getUser()->setIsActif(true);

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($this->getUser());
                $entityManager->flush();
            }

            $data['isLogged'] = true;
            $data['status'] = 200;
        }

        return $this->createApiResponse($data, $data['status']);

    }
}
