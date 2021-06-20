import {ProductsStore,ShoppingCartStore,ProductModel} from './Product';
import axios from 'axios';

// axios.get(`http://wateraccess.t3ch.rw:8234/Productlist/`).then((res) => {
    
//     }).catch(err => {
//     console.log(err)
// })

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
        }),
        ProductModel.create({
            id:'4',
            Title:'Pipe',
            Amount:2000
        }),
        ProductModel.create({
            id:'5',
            Title:'robinet4',
            Amount:500
        }),
        ProductModel.create({
            id:'6',
            Title:'urbain',
            Amount:500
        }),
    ]
})

export const store={
    shoppingCartStore,
    productsStore
}
window.Mobxstore=store;