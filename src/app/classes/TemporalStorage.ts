class TemporalStorage
{
    private tempStorage : {[key : string]: any} = [];

    public addToStorage<T>(key: string, type : T)
    {
        this.tempStorage[key] = type;
    }

    public getFromStorage<T>(key: string) : T
    {
        return this.tempStorage[key];
    }

    public releaseFromMemory(key: string)
    { 
        this.tempStorage[key] = null;
    }
}

const temporalStorage = new TemporalStorage(); 

export { temporalStorage };