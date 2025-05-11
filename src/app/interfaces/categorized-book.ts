import { Category } from "./category";

export interface CategorizedBook {
    isbn : string;
    categories : Category[];
}
