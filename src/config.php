<?php

class DbConfig
{
    public string $hostname;
    public string $dbname;
    public string $username;
    public string $password;

    public function __construct() 
    {
        $this->hostname = "localhost";
        $this->username = "root";
        $this->dbname = "";
        $this->password = "";
    }

    public function set(object | array $data)
    {
        foreach ($data AS $key => $value)
        { 
            if(is_object($this->{$key})) 
            {
                $this->{$key}->set($value);
            }
            else
            {
                $this->{$key} = $value;
            }
        }
    }
}

class Config
{
    public DbConfig $db_config;
    public bool $production;
    public bool $testingSite;
    public string $siteName;
    public string $salt;
    public string $assetsPath;
    
    public function __construct() 
    {
        $this->db_config = new DbConfig();
        $this->production = false;
        $this->testingSite = false;
        $this->siteName = "CHAOS LANGUAGE";
        $this->salt = "";
        $this->assetsPath = "/";
    }

    public function set(object | array $data)
    {
        foreach ($data AS $key => $value)
        { 
            if(is_object($this->{$key})) 
            {
                $this->{$key}->set($value);
            }
            else
            {
                $this->{$key} = $value;
            }
        }
    }
}