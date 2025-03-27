<?php

class User
{
    public int $id;
    public string $username;
    public string $email;
    public string $profilePic;
    private string $passwordHash;

    public function __construct(int $id, string $name, string $email, string $profilePic, string $password) 
    {
        $this->id = $id;
        $this->username = $name;
        $this->email = $email;
        $this->profilePic = $profilePic;
        $this->passwordHash = $password or "";
    }
}