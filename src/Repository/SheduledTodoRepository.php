<?php

namespace App\Repository;

use App\Entity\SheduledTodo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SheduledTodo|null find($id, $lockMode = null, $lockVersion = null)
 * @method SheduledTodo|null findOneBy(array $criteria, array $orderBy = null)
 * @method SheduledTodo[]    findAll()
 * @method SheduledTodo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SheduledTodoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SheduledTodo::class);
    }

    // /**
    //  * @return SheduledTodo[] Returns an array of SheduledTodo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SheduledTodo
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
