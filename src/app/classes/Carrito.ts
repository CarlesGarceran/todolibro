import { Cart } from "../interfaces/Cart";

export class Carrito
{
    private cartEntries : Cart[] = []; 
    
    public setCartEntries(v : Cart[]) {
        this.cartEntries = v;
    }
 
    public getCartEntries() : Cart[] {
        return this.cartEntries;
    }
    
}