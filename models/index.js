import {ProductsStore,ShoppingCartStore,ProductModel} from './Product';
import axios from 'axios';

// axios.get(`http://admin.amazi.rw/Productlist/`).then((res) => {
    
//     }).catch(err => {
//     console.log(err)
// })
var products=axios.get(`http://admin.amazi.rw/Productlist/`)
console.log(products)

const my_data=[{
    id:'1',
            Title:'tank',
            Amount:1000
    },
    {
        id:'2',
        Title:'tank2',
        Amount:1000
    }
]
let data=[]
for(var i=0;i<my_data.length;i++){
    var item=ProductModel.create({
        id:my_data[i].id,
        Title:my_data[i].Title,
        Amount:my_data[i].Amount,
    })
    data.push(item)
}

const shoppingCartStore=ShoppingCartStore.create({products:[]})
const productsStore=ProductsStore.create({
    data:data
    //[
        // ProductModel.create({
        //     id:'1',
        //     Title:'tank',
        //     Amount:1000
        // }),
        // ProductModel.create({
        //     id:'2',
        //     Title:'robinet',
        //     Amount:200
        // }),
        // ProductModel.create({
        //     id:'3',
        //     Title:'robine2',
        //     Amount:200
        // }),
        // ProductModel.create({
        //     id:'4',
        //     Title:'Pipe',
        //     Amount:2000
        // }),
        // ProductModel.create({
        //     id:'5',
        //     Title:'robinet4',
        //     Amount:500
        // }),
        // ProductModel.create({
        //     id:'6',
        //     Title:'urbain',
        //     Amount:500
        // }),
    //]
})

export const store={
    shoppingCartStore,
    productsStore
}
window.Mobxstore=store;