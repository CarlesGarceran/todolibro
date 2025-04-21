<?php

class IsA
{
    static function Libro(mixed $any): bool
    {
        if (!isset($any['ISBN']))
            return false;

        if (!isset($any['Name']))
            return false;

        if (!isset($any['Publisher']))
            return false;

        if (!isset($any['Author']))
            return false;

        if (!isset($any['Image']))
            return false;

        if (!isset($any['LaunchDate']))
            return false;

        if (!isset($any['Price']))
            return false;

        if (!isset($any['Synopsis']))
            return false;

        if (!isset($any['Stock']))
            return false;

        return true;
    }

    static function Category(mixed $any) : bool
    {
        if(!isset($any['CategoryId']))
            return false;
        
        if(!isset($any['Name']))
            return false;
        
        return true;
    }

    static function CartEntry(mixed $any) : bool
    {
        if(!isset($any['Users_userId']))
            return false;
        
        if(!isset($any['Books_ISBN']))
            return false;
        
        if(!isset($any['Quantity']))
            return false;

        return true;
    }


    static function Review(mixed $any) : bool
    {
        if(!isset($any['ISBN']))
            return false;
        
        if(!isset($any['UserId']))
            return false;
        
        if(!isset($any['Comment']))
            return false;

        if(!isset($any['Rating']))
            return false;

        return true;
    }
};