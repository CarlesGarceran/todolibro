<?php

function createConfig() : Config
{
    require_once $_SERVER['DOCUMENT_ROOT'] . "/src/config.php";

    $configFilePath = $_SERVER["DOCUMENT_ROOT"] . "/config/config.json";
    $file = fopen($configFilePath, "r");
    $contents = fread($file, filesize($configFilePath));

    $configData = json_decode($contents, true);

    fclose($file);

    // Create config object

    $config = new Config();
    $config->set($configData);

    return $config;
}

function getDBHostName(): string
{
    return createConfig()->db_config->hostname;
}

function getDBName(): string
{
    return createConfig()->db_config->dbname;
}

function getDBUsername(): string
{
    return createConfig()->db_config->username;
}

function getDBPassword(): string
{
    return createConfig()->db_config->password;
}


function config_getSiteName(): string
{
    return createConfig()->siteName;
}

function config_getSalt(): string
{
    return createConfig()->salt;
}

function config_getAssetsPath() : string
{
    return createConfig()->assetsPath;
}