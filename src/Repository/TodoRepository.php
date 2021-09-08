<?php

namespace App\Repository;

use App\DBAL\Types\TodoStateType;
use App\Entity\Todo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Todo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Todo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Todo[]    findAll()
 * @method Todo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TodoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Todo::class);
    }

    /**
     * @param $value
     * @return Todo[] Returns an array of Todo objects
     */
    public function findActiveTodosByUser($value)
    {
        $queryBuilder = $this->createQueryBuilder('t');
        $queryBuilder->where('t.user = :val');
        $queryBuilder->andWhere($queryBuilder->expr()->not($queryBuilder->expr()->eq('t.state', ':state')));
        $queryBuilder->setParameter('val', $value);
        $queryBuilder->setParameter('state', TodoStateType::DELETED);

        return $queryBuilder->getQuery()->getArrayResult();
    }


    /*
    public function findOneBySomeField($value): ?Todo
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
