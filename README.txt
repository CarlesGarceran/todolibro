||===========================||
||        BACKEND API        ||
||===========================||

-- VISION
Using PHP as a REST backend instead of its HTML generation nature, afaik, using PHP for generating JSON documents that will be parsed and interpreted in the client.


-- STRUCTURE
    - config (contains the json config files for the sql db, production mode and more util).
    - db (db connection related stuff, config classes, manager) (do not include directly)
    - endpoints (the different endpoints the API will serve, such as getAllLibros, getUserData, ...)
    - src (Internal classes used in the endpoints)
    - functions.php (wrapper that wraps config, db related stuff serving different functions) (use this)