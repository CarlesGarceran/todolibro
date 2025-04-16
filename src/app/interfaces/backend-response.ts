export interface BackendResponse<T>
{
    readonly Success : boolean;
    readonly Time : Date;
    Data : T;
}
