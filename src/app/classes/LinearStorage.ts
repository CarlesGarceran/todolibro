export class LinearStorage<T>
{
    protected dataName = "";
    protected data: T[] = [];

    protected buffer: T[] = [];

    constructor(dN : string) 
    {
        this.dataName = dN;
        this.data = [];
    }
}