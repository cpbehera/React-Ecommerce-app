import { useState, useEffect } from 'react'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [search,setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products')
      setProducts(response.data.products)
      console.log('Fetched products:', response.data.products)
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.')
    } finally {
      console.log('Finished fetching products.')
      setLoading(false)
    }
  }

  if(loading) {
    return (
      <div className="container text-center mt-5">
        <div className='spinner-border'></div>
        <p className='mt-2'>Loading products...</p>
      </div>
    )
  }

  if(error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter((product)=>{
    return product.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>

      <div className="row mb-4">
        <div className="col-12 col-md-6">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="text-muted">{product.description}</p>
                  <h5 className="text-primary"><strong>${product.price.toFixed(2)}</strong></h5>

                  <button className="btn btn-dark mt-auto">
                    <i className="bi bi-cart-plus me-2"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products