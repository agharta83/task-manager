<?php


namespace App\Controller\Tasks;


use App\Controller\BaseController;
use App\DBAL\Types\TodoStateType;
use App\Repository\CategoryRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TasksController extends BaseController
{
    /**
     * @Route("/api/tasks/list-categories", name="app_tasks_list-categories", methods={"GET"})
     * @param CategoryRepository $categoryRepository
     * @return Response
     * @IsGranted("ROLE_USER", statusCode=404, message="Unauthorized access !")
     */
    public function getCategoryList(CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findBy(['user' => $this->getUser()]);
        $data = [];

        if (count($categories) > 0) {
            foreach ($categories as $category) {
                $data[]['title'] = $category->getName();
            }

            return $this->createApiResponse($data, 200);
        }

        return $this->createApiResponse("No setting for category", 400);
    }

    /**
     * @Route("/api/tasks/list-status", name="app_tasks_list-status", methods={"GET"})
     * @return Response
     * @IsGranted("ROLE_USER", statusCode=404, message="Unauthorized access !")
     */
    public function getStatusList(): Response
    {
        $data = [];

        foreach (TodoStateType::getChoices() as $choice => $value) {
            $data[] = $choice;
        }

        return $this->createApiResponse($data, 200);
    }
}
