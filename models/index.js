import {ProductsStore,ShoppingCartStore,ProductModel} from './Product';

const shoppingCartStore=ShoppingCartStore.create({products:[]})
const productsStore=ProductsStore.create({
    data:[
        ProductModel.create({
            id:'1',
            Title:'tank',
            Amount:1000
        }),
        ProductModel.create({
            id:'2',
            Title:'robinet',
            Amount:200
        }),
        ProductModel.create({
            id:'3',
            Title:'robine2',
            Amount:200
        })
    ]
})

export const store={
    shoppingCartStore,
    productsStore
}
window.Mobxstore=store;