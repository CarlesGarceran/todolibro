export class CacheStorage
{
    private cache : {[key: string]: any} = [];

    public addToCache<V>(key: string, type : any)
    {
        this.cache[key] = type as V;
    }

    public getFromCache<V>(key: string) : any
    {
        return this.cache[key] as V;
    }

    public releaseFromCache(key: string)
    { 
        this.cache[key] = null;
    }
}