<?php

class Publisher
{
    public int $publisherId;
    public string $Name;
    public string $Image;

    public function __construct(int $publisherId, string $Name, string $Image) {
        $this->publisherId = $publisherId;
        $this->Name = $Name;
        $this->Image = $Image;
    }
}