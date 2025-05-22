||===========================||
||        BACKEND API        ||
||===========================||

-- VISION
Using PHP as a REST backend instead of its HTML generation nature, afaik, using PHP for generating JSON documents that will be parsed in the client.


-- STRUCTURE
    - config (contains the json config files for the sql db, production mode and more util).
    - db (db connection related stuff, config classes, manager) (do not include directly)
    - endpoints (the different endpoints the API will serve, such as getAllLibros, getUserData, ...)
    - src (Internal classes used in the endpoints)
    - functions.php (wrapper that wraps config, db related stuff serving different functions) (use this)

-- CONFIG.JSON

    db_config:      Object,
    production:     bool,
    testingSite:    bool,
    siteName:       string,
    salt:           string,
    assetsPath:     string
    logLevel:       string

    db_config
    {
        hostname:    string <- address of the db server
        username:    string <- username of the db server
        dbname:      string <- database name
        password:    string <- password of the db server
    }
    production <- helps the client identify which address use
    testingSite <- its in the testingSite
    siteName <- name of the website
    salt <- salt offset for passwords
    assetsPath <- path where files will be uploaded
    logLevel <- Level of logging, the higher, more logs will be registered in the db.


## LOG LEVELS

    0 - Minimum <- Logs only the essentials, CRUD operations made by admins
    1 - Medium <- Logs user behaviour (purchases, which books user enters in)
    2 - Maximum <- Logs every single HTTP verb sent to the server with remote addr and port.