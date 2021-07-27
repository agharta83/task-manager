<?php


namespace App\Controller\Setting;


use App\Controller\BaseController;
use App\Service\Base64FileExtractor;
use App\Service\UploadedBase64File;
use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ProfileController
 * @package App\Controller
 * @IsGranted("ROLE_USER")
 */
class ProfileController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @Route("/api/profile/personal", name="app_profile_personal", methods={"GET"})
     * @return Response
     * @throws Exception
     */
    public function getPersonalInfo(): Response
    {
        $user = $this->getUser();

//        $password = random_int(100000, 1000000);

        $data = [
            'userName' => $user->getPseudo(),
            'firstName' => $user->getFirstname(),
            'lastName' => $user->getLastname(),
            'email' => $user->getEmail(),
//            'password' => $password,
            'isActif' => (bool)$user->getIsActif(),
            'imagePath' => $user->getImagePath(),
        ];

        return $this->createApiResponse($data, 200);
    }

    /**
     * @Route("/api/profile/personal/update", name="app_profile_personal_update", methods={"POST"})
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function updatePersonalInfo(Request $request): Response
    {
        $datas = json_decode($request->getContent());

        if ($datas === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $user = $this->getUser();

//        $result = [];

        foreach ($datas as $key => $value) {
            $methodName = 'get' . ucfirst($key);
            if (method_exists($user, $methodName) && ($key !== "password" && $key !== "imagePath")) {
                if ($user->{$methodName}() !== $value) {
                    $setMethodName = 'set' . ucfirst($key);
                    $user->{$setMethodName}($value);
//                    $result[] = "Champs " . $key . " de l'entité User mis à jour"; // TODO @Logger
                }
            }
        }

        /** UPLOADS */
        if ($datas->imagePath !== "") {
            /** Base64 Decode */
            $base64FileExtractor = new Base64FileExtractor($datas->imagePath, 'image');
            $dataImage = $base64FileExtractor->decodedBase64File();
            /** Upload File */
            if ($dataImage) {
                $uploadedBase64File = new UploadedBase64File($user->getId(), $this->getParameter('kernel.project_dir'), $dataImage);
                $userImgPath = $uploadedBase64File->saveFile();
                /** Set user image */
                if ($userImgPath) $user->setImagePath($userImgPath);
            }
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $data = [
            'userName' => $user->getPseudo(),
            'firstName' => $user->getFirstname(),
            'lastName' => $user->getLastname(),
            'email' => $user->getEmail(),
//            'password' => random_int(100000, 1000000),
            'isActif' => (bool)$user->getIsActif(),
            'imagePath' => $user->getImagePath(),
        ];

        return $this->createApiResponse($data, 200);

    }
}
