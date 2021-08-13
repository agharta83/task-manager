<?php


namespace App\Controller\Category;


use App\Controller\BaseController;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends BaseController
{
    /**
     * @Route("/api/category/list", name="app_category_list", methods={"GET"})
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
}
