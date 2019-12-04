import React from 'react';
import { url, mainUrl } from '../constants'
import { request, GraphQLClient } from 'graphql-request'

export default function Products(props) {
  const [products, setProducts] = React.useState([])

    React.useEffect( () => {
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${localStorage.auth}`
        //     },
        //     body: JSON.stringify({
        //         query
        //     })
        // })
        //
        //     .then(data => data.json())
        //     .then(
        //         data => {
        //             console.log(data)
        //         })

        const client = new GraphQLClient( url, {
            headers: {
                Authorization: `Bearer ${localStorage.auth}`,
            },
        })

        const query = `query {
          GoodFind(query:"[{}]"){
                _id
                name
                description
                price
                images {url}
              }
            }`

        client.request(query).then(data => {
            setProducts(data.GoodFind)
        })

    }, [])


  return (
      <div className="product">
          {products.length > 0 ? products.map(product => (
              <div key={product._id} className="product__item">
                  <div className="product__title">{product.name + ' '}</div>
                  <span className="product__price">${product.price}</span>
                  <div className="product__desc">{product.description}</div>
                  <img
                      src={product.images ? mainUrl + product.images[0].url : './default_product.jpg'}
                      className="product__img"/>
              </div>
          )) : 'loading...'}
      </div>
  );
}
