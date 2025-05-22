<?php

include_once "../functions.php";

function LogToDB(User $user, string $action)
{
    $sqlHandler = getSQLHandler();
    $sql = "INSERT INTO Log(userId, Action) VALUES (:user, :action);";
    $popen = $sqlHandler->prepare($sql);
    $popen->bindValue(":user", $user->id);
    $popen->bindValue(":action", $action);

    $popen->execute();
}