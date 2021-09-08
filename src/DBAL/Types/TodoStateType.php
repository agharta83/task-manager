<?php


namespace App\DBAL\Types;


use Fresh\DoctrineEnumBundle\DBAL\Types\AbstractEnumType;

final class TodoStateType extends AbstractEnumType
{
    public const DELETED = 0;
    public const WAITING = 1;
    public const IN_PROGRESS = 2;
    public const IN_REVIEW = 3;
    public const APPROVED = 4;
    public const DONE = 5;
    public const CONVERT_TO_PROJECT = 6;

    protected static $choices = [
        self::DELETED => 'Deleted',
        self::WAITING => 'Waiting',
        self::IN_PROGRESS => 'In Progress',
        self::IN_REVIEW => 'In Review',
        self::APPROVED => 'Approved',
        self::DONE => 'Done',
        self::CONVERT_TO_PROJECT => 'Convert to Project',
    ];
}
