<?php

class LocaleEntry
{
    public string $ID;
    public string $ES;
    public string $EN;
    public string $VA;

    public function __construct(object $data) {
        $this->ID = $data['ID'];
        $this->ES = $data['ES'];
        $this->EN = $data['EN'];
        $this->VA = $data['VA'];
    }
}