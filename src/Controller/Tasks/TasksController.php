<?php


namespace App\Controller\Tasks;


use App\Controller\BaseController;
use App\DBAL\Types\TodoStateType;
use App\Entity\Category;
use App\Entity\Todo;
use App\Repository\CategoryRepository;
use DateTime;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
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

    /**
     * @Route("/api/tasks/create", name="app_tasks_create", methods={"POST"})
     * @param Request $request
     * @return Response
     * @IsGranted("ROLE_USER", statusCode=404, message="Unauthorized access !")
     */
    public function createTodo(Request $request): Response
    {
        $datas = json_decode($request->getContent(), true);;

        if ($datas === null) {
            throw new BadRequestHttpException(('Invalid JSON'));
        }

        if ($user = $this->getUser()) {
            $todo = new Todo();
            $todo->setUser($user);
            $todo->setTitle($datas['title']);
            $todo->setDescription($datas['description']);
            $todo->setNote($datas['note']);
            $todo->setDateCreate(new DateTime('now'));
            $todo->setState(TodoStateType::WAITING); // TODO state

            $newCategory = new Category(); // TODO Categories array !!
            $newCategory->setUser($user);
            $newCategory->setName('Development');
            $newCategory->addTodo($todo);

            $todo->addCategory($newCategory);

            $this->getDoctrine()->getManager()->persist($todo);
            $this->getDoctrine()->getManager()->flush();




            return $this->createApiResponse("create todo success !", 200);
        }

        return $this->createApiResponse("user is not authenticated", 400);
    }
}