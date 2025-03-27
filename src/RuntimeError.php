<?php

class RuntimeError
{
    public int $error_code;
    public string $message;

    public function __construct(int $code, string $message)
    {
        $this->error_code = $code;
        $this->message = $message;
    }
}
