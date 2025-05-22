<?php

class Author
{
    public int $authorId;
    public string $Name;
    public string $Image;

    public function __construct(int $authorId, string $Name, string $Image) {
        $this->authorId = $authorId;
        $this->Name = $Name;
        $this->Image = $Image;
    }
}