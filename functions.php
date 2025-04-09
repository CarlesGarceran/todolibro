<?php

function JSON_CALL()
{
    header("Content-Type: application/json");
}

/**
 * Gets if the backend is running in production mode or in dev mode (if its in production it wont dump essential data for debugging).
 */
function is_in_production() : bool 
{
    include_once "db/configwrap.php";

    return createConfig()->production;
}

/**
 * Gets if the backend is running in the testing site (it will change the attack endpoints on the client).
 */
function is_in_testing_site() : bool 
{
    include_once "db/configwrap.php";

    return createConfig()->testingSite;
}

function getSalt() : string
{
    include_once "db/configwrap.php";

    return config_getSalt();
}

/**
 * Gets the SQL Handler
 */
function getSQLHandler() : PDO
{
    include_once "db/configwrap.php";
    $host = "mysql:host=" . getDBHostName() . ";dbname=" . getDBName();
    return new PDO($host, getDBUsername(), getDBPassword());
}

function getPageName() : string
{
    require "db/configwrap.php";

    return createConfig()->siteName;
}

/**
 * Calls the Logger to log admin actions into the DB
 */
function LogDB(User $user, string $message)
{
    include_once "src/Logger.php";
    LogToDB($user, $message);
}

/**
 * Converts the inputted object into a json string
 */
function toJson(mixed $data) : string
{
    return json_encode($data);
}

/**
 * converts the string into a generic object
 */
function fromJson(string $data) : object | array
{
    if($data == null)
        return [];

    return json_decode($data, true);
}

/**
 * Returns a empty json object to the stream and kills the execution
 */
function NOP()
{
    $arg = [];
    die(toJson($arg));
}

/**
 * Returns the specified object as json to the stream and kills the execution
 */
#[Deprecated("NOP_OBJ is deprecated for NOP_WRAP")]
function NOP_OBJ($any)
{
    $arg = [];
    die(toJson($any));
}

/**
 * Returns the specified object encapsulated in a specific json stream, kills the execution
 */
function NOP_WRAP($any)
{
    $arg = [];
    $arg['Success'] = !($any instanceof RuntimeError);
    $arg['Time'] = time();
    $arg['Data'] = $any;
    die(toJson($arg));
}

/**
 * Obtains the SHA512 hash of a raw string
 */
function SHA512(string $raw) : string
{
    return hash("sha512", $raw);
}

/**
 * Obtains the SHA256 hash of a raw string
 */
function SHA256(string $raw) : string
{
    return hash("sha256", $raw);
}

/**
 * Disables Cross-Origin-Resource-Sharing for the testing env
 */
function CORS() {
    
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
}

/**
 * Initializes a backend call
 */
function INIT_BACKEND_CALL()
{
    CORS();
    JSON_CALL();
}

/**
 * Returns the locale handler for website runtime translation
 */
function getLocaleHandler() : Locale
{
    include "src/Locale.php";

    return LoadLocale();
}