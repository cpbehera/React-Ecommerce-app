import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const decreaseQuantity = (id) =>{
    setCart((prevcart)=>{
      return prevcart.map((item)=>{
        if(item.id === id && item.quantity > 1){
          return {...item, quantity: item.quantity - 1}
        }
        return item;
      })
    })
  }

  const increaseQuantity = (id) =>{
    setCart((prevcart)=>{
      return prevcart.map((item)=>{
        if(item.id === id){
          return {...item, quantity: item.quantity + 1}
        }
        return item;
      })
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: 'lightgray' }}></i>
        <h2 className="mt-3">Your cart is empty</h2>
        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary mt-3">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Shopping Cart</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map((item) => {
            return (
              <div className="card mb-3 shadow-sm" key={item.id}>
                <div className="card-body">
                  <div className="row align-items-center g-3">

                    <div className="col-4 col-md-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>

                    <div className="col-8 col-md-4">
                      <h5>{item.title}</h5>
                      <p className="text-muted mb-0">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="col-6 col-md-3">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-4 col-md-2">
                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>

                    <div className="col-2 col-md-1">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className=""></div>
      </div>
    </div>
  )
}

export default Cart