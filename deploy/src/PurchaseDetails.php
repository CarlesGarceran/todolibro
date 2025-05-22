<?php

class PurchaseDetails
{
    public string $cardDetails;
    public string $cardOwner;
    public string $cardCVV;
    public string $cardExpirationDate;

    public function __construct(string $a0, string $a1, string $a2, string $a3) {
        $this->cardDetails = $a0;
        $this->cardOwner = $a1;
        $this->cardCVV = $a2;
        $this->cardExpirationDate = $a3;
    }
}