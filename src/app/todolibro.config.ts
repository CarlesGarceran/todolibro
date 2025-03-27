export class TodoLibroConfig
{
    private static backendUrl? : string;

    static setBackendUrl(bUrl : string)
    {
        this.backendUrl = bUrl;
    }

    static getBackendUrl()
    {
        return this.backendUrl;
    }
}