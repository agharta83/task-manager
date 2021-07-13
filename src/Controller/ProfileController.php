<?php


namespace App\Controller;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController extends BaseController
{
    /**
     * @Route("/api/profile/personal", name="app_profile_personal", methods={"GET"})
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function getPersonalInfo(Request $request): Response
    {
        $token = $request->headers->get('bearer');

        if ($this->checkToken($token)) {
            $user = $this->getUser();

            $password = random_int(100000, 1000000);

            $data = [
                'userName' => $user->getUsername(),
                'firstName' => $user->getFirstname(),
                'lastName' => $user->getLastname(),
                'email' => $user->getEmail(),
                'password' => $password,
                'isActif' => (bool)$user->getIsActif(),
            ];

            return $this->createApiResponse($data, 200);
        }
        // Todo Logout l'utilisateur qui n'est pas autorisé à accéder à cette page
        $data = ['Invalid token'];

        return $this->createApiResponse($data, 400);
    }
}
