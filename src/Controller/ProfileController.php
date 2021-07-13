<?php


namespace App\Controller;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ProfileController
 * @package App\Controller
 */
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

    /**
     * @Route("/api/profile/personal/update", name="app_profile_personal_update", methods={"POST"})
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function updatePersonalInfo(Request $request): Response
    {
        $token = $request->headers->get('bearer');
        $datas = json_decode($request->getContent());
//        dd($datas);

        if ($datas === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        if (!$this->checkToken($token)) {
            throw new BadRequestHttpException('Invalid Token');
        }

        $user = $this->getUser();

        $result = [];

        foreach ($datas as $key => $value) {
            $methodName = 'get' . ucfirst($key);
            if (method_exists($user, $methodName) && $key !== "password") {
                if ($user->{$methodName}() !== $value) {
                    $setMethodName = 'set' . ucfirst($key);
                    $user->{$setMethodName}($value);
                    $result[] = "Champs " . $key . " de l'entité User mis à jour";
                }
            }
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        $data = [
            'userName' => $user->getUsername(),
            'firstName' => $user->getFirstname(),
            'lastName' => $user->getLastname(),
            'email' => $user->getEmail(),
            'password' => random_int(100000, 1000000),
            'isActif' => (bool)$user->getIsActif(),
        ];

        return $this->createApiResponse($data, 200);

    }
}
