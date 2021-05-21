import {types} from 'mobx-state-tree';
import {store} from './index';

export const ProductModel=types.model('ProductModel',{
    id:types.identifier,
    Title:types.string,
    Amount:types.number,
    cartQuantity:0,
    inCart:false
}).actions(self=>({
    incCartQuantity(){
        self.cartQuantity+=1;
    },
    decCartQuantity(){
        self.cartQuantity-=1;
    },
    addToCart(){
        store.shoppingCartStore.addProduct(self);
        self.inCart=true;
        self.incCartQuantity();
    },
    removeFromCart(){
        store.shoppingCartStore.removeProduct(self);
        self.inCart=false;
        self.cartQuantity=0;
    }
}))

export const ProductsStore=types.model('ProductsStore',{
    data:types.array(types.reference(ProductModel))
})

export const ShoppingCartStore=types.model('ShoppingCartStore',{
    products:types.array(types.reference(ProductModel))
}).views(self=>({
    get totalProducts(){
        return self.products.length;
    }
})).actions(self=>({
    addProduct(product){
        const entry= self.products.find(el=> el.id === product.id)
        if (!entry){
            self.products.push(product)
        }
    },
    removeProduct(product){
        self.products= self.products.filter( prod => prod.id !== product.id)
    }
}))