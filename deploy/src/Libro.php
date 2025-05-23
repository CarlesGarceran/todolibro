<?php

class Libro
{
    public string $ISBN;
    public string $Name;
    public int $PublisherId;
    public int $AuthorId;
    public string $ImageUrl;
    public DateTime $LaunchDate;
    public float $Price;
    public string $Synopsis;
    public int $Stock;

    public function __construct(string $ISBN, string $Name, int $PublisherId, int $AuthorId, string $ImageUrl, DateTime $LaunchDate, float $price, string $Synopsis, int $Stock) 
    {
        $this->ISBN = $ISBN;
        $this->Name = $Name;
        $this->PublisherId = $PublisherId;
        $this->AuthorId = $AuthorId;
        $this->ImageUrl = $ImageUrl;
        $this->LaunchDate = $LaunchDate;
        $this->Price = $price;
        $this->Synopsis = $Synopsis;
        $this->Stock = $Stock;
    }
}