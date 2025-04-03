export interface BackendResponse<T>
{
    Success : boolean;
    Time : Date;
    Data : T;
}
