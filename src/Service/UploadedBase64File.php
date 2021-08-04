<?php


namespace App\Service;

/**
 * Class UploadedBase64File
 * @package App\Service
 */
class UploadedBase64File
{
    /** @var int */
    private $userDirectory;

    /** @var string */
    private $baseHref;

    /** @var string */
    private static $uploadsDirectory = '/public/uploads/';

    /** @var string */
    private $uploadsPath;

    /** @var array */
    private $file;


    /**
     * UploadedBase64File constructor.
     * @param int $idUser
     * @param string $baseHref
     * @param array $file
     */
    public function __construct(int $idUser, string $baseHref, array $file)
    {
        $this->userDirectory = $idUser;
        $this->baseHref = $baseHref;
        $this->uploadsPath = $this->baseHref . self::$uploadsDirectory . $this->userDirectory;
        $this->file = $file;
    }

    /**
     * @return false|string
     */
    public function saveFile()
    {
        if ($this->checkUploadsDirectory()) {
            $nameFile = uniqid() . '.' . $this->file['type'];
            $tmpPath = $this->uploadsPath . '/' . $nameFile;
            if (file_put_contents($tmpPath, $this->file['decodedFile'])) {
                return $this->userDirectory . '/' . $nameFile;
            }

            return false;
        }

        return false;
    }

    /**
     * @return bool
     */
    private function checkUploadsDirectory()
    {
        if (!file_exists($this->uploadsPath)) {
            return mkdir($this->uploadsPath, 0777, true);
        }

        return true;
    }

    /**
     * @return string
     */
    public static function getUploadsDirectory()
    {
        return self::$uploadsDirectory;
    }
}
