<?php


namespace App\Controller;


use App\Service\Base64FileExtractor;
use App\Service\ImageManager;
use App\Service\UploadedBase64File;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\File\File as FileObject;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class ProfileController
 * @package App\Controller
 * @IsGranted("ROLE_USER")
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
        $user = $this->getUser();

        $password = random_int(100000, 1000000);

        $data = [
            'userName' => $user->getUsername(),
            'firstName' => $user->getFirstname(),
            'lastName' => $user->getLastname(),
            'email' => $user->getEmail(),
            'password' => $password,
            'isActif' => (bool)$user->getIsActif(),
            'imagePath' => $user->getImagePath(),
        ];

        return $this->createApiResponse($data, 200);

//        return $this->createApiResponse($data, 400);
    }

    /**
     * @Route("/api/profile/personal/update", name="app_profile_personal_update", methods={"POST"})
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function updatePersonalInfo(Request $request): Response
    {
        $datas = json_decode($request->getContent());

        if ($datas === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $user = $this->getUser();

        $result = [];

        foreach ($datas as $key => $value) {
            $methodName = 'get' . ucfirst($key);
            if (method_exists($user, $methodName) && ($key !== "password" && $key !== "imagePath")) {
                if ($user->{$methodName}() !== $value) {
                    $setMethodName = 'set' . ucfirst($key);
                    $user->{$setMethodName}($value);
                    $result[] = "Champs " . $key . " de l'entité User mis à jour";
                }
            }
        }

        /** UPLOADS TEST */
        if ($datas->imagePath !== "") {
            /** TODO A REFACTO */
            if (preg_match('/^data:image\/(\w+);base64,/', $datas->imagePath, $type)) {
                $data = substr($datas->imagePath, strpos($datas->imagePath, ',') + 1);
                $type = strtolower($type[1]); // extension

                if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
                    throw new \Exception('invalid image type');
                }

                $data = base64_decode($data);

                if ($data === false) {
                    throw new \Exception('base64_decode failed');
                }
            } else {
                throw new \Exception('did not match data URI with image data');
            }

            // Verifier si le dossier existe
            $userDirectory = $user->getId();
            $pathDirectory = $this->getParameter('kernel.project_dir') . '/public/uploads/' . $userDirectory;
            if (!file_exists($pathDirectory)) {
                mkdir($pathDirectory, 0777, true);
            }
            $userFile = uniqid() . '.' . $type;
            $tmpPath = $pathDirectory . '/' . $userFile;
            file_put_contents($tmpPath, $data);

            $userImgPath = $userDirectory . '/' . $userFile;
            $user->setImagePath($userImgPath);
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
            'imagePath' => $user->getImagePath(),
        ];

        return $this->createApiResponse($data, 200);

    }
}
