export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    createdAt?: Date;
    quantity:number;
  }
  export interface cartItem {
   
    name: string;
    price: number;
    quantity: number;
    isCancelled: boolean;
    stockitemId: string;
    }
    export interface Items{
      userId: string;
      items:cartItem[];
    }
    export interface stockItem{
      id:string;
      name:string;
      quantity:number;
      price :number
    }
