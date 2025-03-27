<?php

include "./LocaleEntry.php";

class Locale
{
    public array $entries;

    public function __construct() {
        $this->entries = array();
    }

    public function set(array $a) : void
    {
        foreach ($a as $value) {
            array_push(
                new LocaleEntry($value)
            );
        }
    }

    public function getLocalizedString(string $id, string $language) : string
    {
        foreach ($this->entries as $value) 
        {
            if($value['ID'] == $id)
            {
                return $value[$language];
            }
        }

        return "";
    }
}

function UnwrapLocales(array $tmp)
{
    $locale = new Locale();
    $locale->set($tmp);
}


function LoadLocale() : Locale
{
    $localFilePath = $_SERVER["DOCUMENT_ROOT"] . "/config/locale.json";
    $file = fopen($localFilePath, "r");
    $contents = fread($file, filesize($localFilePath));
    $localeData = json_decode($contents, true);
    fclose($file);
    UnwrapLocales($localeData);

    return $locale;
}