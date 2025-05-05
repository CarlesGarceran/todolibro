<?php

/**
 * Set JSON header
 */
function JSON_CALL()
{
    header("Content-Type: application/json");
}

/**
 * Gets if the backend is running in production mode or in dev mode (if its in production it wont dump essential data for debugging).
 */
function is_in_production() : bool 
{
    include_once $_SERVER['DOCUMENT_ROOT'] . "db/configwrap.php";

    return createConfig()->production;
}

/**
 * Gets if the backend is running in the testing site (it will change the attack endpoints on the client).
 */
function is_in_testing_site() : bool 
{
    include_once $_SERVER['DOCUMENT_ROOT'] . "db/configwrap.php";

    return createConfig()->testingSite;
}

/**
 * Gets the SALT offset
 */
function getSalt() : string
{
    include_once $_SERVER['DOCUMENT_ROOT'] . "db/configwrap.php";

    return config_getSalt();
}

/**
 * Gets the AssetPath
 */
function getAssetsPath() : string
{
    include_once $_SERVER['DOCUMENT_ROOT'] . "db/configwrap.php";

    return config_getAssetsPath();
}


/**
 * Gets the SQL Handler
 */
function getSQLHandler() : PDO
{
    include_once $_SERVER['DOCUMENT_ROOT'] .  "db/configwrap.php";
    $host = "mysql:host=" . getDBHostName() . ";dbname=" . getDBName();
    return new PDO($host, getDBUsername(), getDBPassword());
}

function getPageName() : string
{
    require $_SERVER['DOCUMENT_ROOT'] . "db/configwrap.php";

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
    
    if (isset($_SERVER['HTTP_ORIGIN'])) 
    {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    }
    else
    {
        header("Access-Control-Allow-Origin: http://localhost:27033");
    }
    
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
    {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, PATCH, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
}


function getLogLevel() : int
{
    include_once $_SERVER['DOCUMENT_ROOT'] . "db/configwrap.php";

    return config_getLogLevel();
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
    include $_SERVER['DOCUMENT_ROOT'] . "src/Locale.php";

    return LoadLocale();
}

/**
 * Is a GET Verb
 */
function isGET() : bool
{
    return ($_SERVER['REQUEST_METHOD'] === 'GET');
}


/**
 * Is a PUT Verb
 */
function isPUT() : bool
{
    return ($_SERVER['REQUEST_METHOD'] === 'PUT');
}


/**
 * Is a POST Verb
 */
function isPOST() : bool
{
    return ($_SERVER['REQUEST_METHOD'] === 'POST');
}


/**
 * Is a PATCH Verb
 */
function isPATCH() : bool
{
    return ($_SERVER['REQUEST_METHOD'] === 'PATCH');
}


/**
 * Is a DELETE Verb
 */
function isDELETE() : bool
{
    return ($_SERVER['REQUEST_METHOD'] === 'DELETE');
}


/**
 * Is a OPTIONS Verb
 */
function isOPTIONS() : bool
{
    return ($_SERVER['REQUEST_METHOD'] === 'OPTIONS');
}


/**
 * Is a CUSTOM Verb
 */
function isCUSTOM(string $expected) : bool
{
    return ($_SERVER['REQUEST_METHOD'] === $expected);
}


/**
 * Execute $callback on a GET Verb
 */
function onGET($callback)
{
    LOG_REQUESTS();

    if(isGET())
        $callback();
}

/**
 * Execute $callback on a POST Verb
 */
function onPOST($callback)
{
    LOG_REQUESTS();

    if(isPOST())
        $callback();
}

/**
 * Execute $callback on a PUT Verb
 */
function onPUT($callback)
{
    LOG_REQUESTS();

    if(isPUT())
        $callback();
}

/**
 * Execute $callback on a PATCH Verb
 */
function onPATCH($callback)
{
    LOG_REQUESTS();

    if(isPATCH())
        $callback();
}

/**
 * Execute $callback on a DELETE Verb
 */
function onDELETE($callback)
{
    LOG_REQUESTS();

    if(isDELETE())
        $callback();
}

/**
 * Execute $callback on a CUSTOM Verb
 */
function onCUSTOM($expected, $callback)
{
    LOG_REQUESTS();

    if(isCUSTOM($expected))
        $callback();
}

/**
 * Consumable method with the struct of a callable.
 * Automatically calls callback on ran.
 * 
 * @param mixed $callback Method to invoke, can be inlined as a anonymous function or lambda.
 * @param mixed $args Arguments to pass to the function. 
 * 
 * @return mixed Returns what the $callback returns, in case of returning something
 */
function invoke($callback, ...$args) : mixed
{
    return $callback(...$args);
}

function LOG_REQUESTS()
{
    if(getLogLevel() >= 2)
    {
        $verb = $_SERVER['REQUEST_METHOD'];
        $remote_addr = $_SERVER['REMOTE_ADDR'] . $_SERVER['REMOTE_PORT'];
        $socket = $_SERVER['SERVER_ADDR'] . ":" . $_SERVER['SERVER_PORT'];
        LogDB(new User(-1, "Automated", "", "", ""), "A petition to the $socket [$verb] has been done from $remote_addr");
    }
}

function logOnMinimum($callback)
{
    if(getLogLevel() >= 0)
        $callback();
}

function logOnMedium($callback)
{
    if(getLogLevel() >= 1)
        $callback();
}

function logOnMaximum($callback)
{
    if(getLogLevel() >= 2)
        $callback();
}