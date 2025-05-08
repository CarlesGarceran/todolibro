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

    static function Category(mixed $any): bool
    {
        if (!isset($any['CategoryId']))
            return false;

        if (!isset($any['Name']))
            return false;

        return true;
    }

    static function User(mixed $any): bool
    {
        if (!isset($any['id']))
            return false;

        if (!isset($any['email']))
            return false;

        if (!isset($any['username']))
            return false;

        if (!isset($any['profile_picture']))
            return false;

        if (!isset($any['password']))
            return false;

        return true;
    }

    static function CartEntry(mixed $any): bool
    {
        if (!isset($any['Users_userId']))
            return false;

        if (!isset($any['Books_ISBN']))
            return false;

        if (!isset($any['Quantity']))
            return false;

        return true;
    }

    static function Author(mixed $any) : bool
    {
        if (!isset($any['AuthorId']))
            return false;

        if (!isset($any['Name']))
            return false;

        if (!isset($any['Image']))
            return false;

        return true;
    }

    static function Publisher(mixed $any) : bool
    {
        if (!isset($any['PublisherId']))
            return false;

        if (!isset($any['Name']))
            return false;

        if (!isset($any['Image']))
            return false;

        return true;
    }


    static function Review(mixed $any): bool
    {
        if (!isset($any['ISBN']))
            return false;

        if (!isset($any['UserId']))
            return false;

        if (!isset($any['Comment']))
            return false;

        if (!isset($any['Rating']))
            return false;

        return true;
    }

    static function PurchaseDetail(mixed $any) : bool
    {
        if (!isset($any['cardDetails']))
            return false;

        if (!isset($any['cardOwner']))
            return false;

        if (!isset($any['cardCVV']))
            return false;

        if (!isset($any['cardExpirationDate']))
            return false;

        return true;
    }
};
