<?php


namespace App\Service;

use Exception;

/**
 * Class Base64FileExtractor
 * @package App\Service
 */
class Base64FileExtractor
{
    /** @var string */
    private $base64EncodedFile;

    /** @var string */
    private $extension;

    /** @var string */
    private $typeRequired;

    /** @var string[] */
    private $typeAuthorized = [
        'image' => ['jpg', 'jpeg', 'gif', 'png'],
    ];

    /**
     * Base64FileExtractor constructor.
     * @param $base64EncodedFile
     * @param $typeRequired
     */
    public function __construct($base64EncodedFile, $typeRequired)
    {
        $this->base64EncodedFile = $base64EncodedFile;
        $this->typeRequired = $typeRequired;
    }

    /**
     * @throws Exception
     */
    private function checkTypeRequired()
    {
        if (array_key_exists($this->typeRequired, $this->typeAuthorized)) {
            if (preg_match('/^data:image\/(\w+);base64,/', $this->base64EncodedFile, $type)) {
                $this->extension = strtolower($type[1]);
                if (!in_array($this->extension, $this->typeAuthorized[$this->typeRequired])) {
                    throw new Exception('invalid file type');
                }

                return true;
            } else {
                throw new Exception('did not match data URI with file data');
            }
        }

        return false;
    }

    /**
     * @return array|false
     * @throws Exception
     */
    public function decodedBase64File()
    {

        if ($this->checkTypeRequired()) {
            try {
                $datas = substr($this->base64EncodedFile, strpos($this->base64EncodedFile, ',') + 1);

                $base64DecodedFile = base64_decode($datas);

                if (!$base64DecodedFile) throw new Exception('base64_decode failed');

                return [
                    'decodedFile' => $base64DecodedFile,
                    'type' => $this->extension,
                ];
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }

        return false;
    }
}
