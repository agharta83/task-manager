<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;

class IndexController extends BaseController
{
    /**
     * @Route("/{reactRouting}", name="index", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})
     */
    public function index()
    {
        return $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }
}
