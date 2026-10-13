import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

/* Page styles (shared by the empty and filled views) */
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

  .ct {
    --ink: #12161f;
    --ink-soft: #5a6272;
    --paper: #f5f6f8;
    --surface: #ffffff;
    --line: #e2e5eb;
    --amber: #f5b83d;
    --amber-ink: #1b1303;

    min-height: calc(100vh - 70px);
    padding: 3.5rem 0 5rem;
    background-color: var(--paper);
    color: var(--ink);
    font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  }
  .ct a:focus-visible,
  .ct button:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 3px;
  }

  .ct-title {
    margin: 0 0 0.35rem;
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }
  .ct-subtitle {
    margin: 0 0 2rem;
    color: var(--ink-soft);
    font-size: 1.05rem;
  }

  /* Buttons */
  .ct-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1.6rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }
  .ct-btn-accent {
    background-color: var(--amber);
    color: var(--amber-ink);
  }
  .ct-btn-accent:hover {
    background-color: #ffc95c;
    color: var(--amber-ink);
  }
  .ct-btn-ghost {
    border-color: var(--ink);
    color: var(--ink);
  }
  .ct-btn-ghost:hover {
    background-color: var(--ink);
    color: #fff;
  }

  /* Cart rows */
  .ct-item {
    display: grid;
    grid-template-columns: 96px 1fr auto 96px auto;
    grid-template-areas: "img info qty total remove";
    align-items: center;
    gap: 1rem 1.25rem;
    margin-bottom: 0.9rem;
    padding: 1rem;
    border: 1px solid var(--line);
    border-radius: 20px;
    background-color: var(--surface);
  }
  .ct-img {
    grid-area: img;
    width: 96px;
    height: 96px;
    overflow: hidden;
    border-radius: 14px;
    background-color: #eceff5;
  }
  .ct-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ct-info { grid-area: info; min-width: 0; }
  .ct-name {
    margin: 0 0 0.25rem;
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.3;
  }
  .ct-unit {
    margin: 0;
    font-size: 0.92rem;
    color: var(--ink-soft);
  }

  /* Quantity stepper */
  .ct-qty {
    grid-area: qty;
    display: inline-flex;
    align-items: center;
    justify-self: start;
    border: 1.5px solid var(--line);
    border-radius: 999px;
    background-color: var(--surface);
  }
  .ct-qty button {
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--ink);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  .ct-qty button:hover:not(:disabled) {
    background-color: #eceff5;
  }
  .ct-qty button:disabled {
    color: #b4bac6;
    cursor: not-allowed;
  }
  .ct-qty span {
    min-width: 28px;
    text-align: center;
    font-weight: 600;
  }

  .ct-total {
    grid-area: total;
    text-align: right;
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .ct-remove {
    grid-area: remove;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: var(--ink-soft);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }
  .ct-remove:hover {
    background-color: #fdecec;
    color: #c93a3a;
  }

  /* Summary */
  .ct-summary {
    position: sticky;
    top: 96px;
    padding: 1.75rem;
    border-radius: 24px;
    background-color: var(--ink);
    color: #fff;
  }
  .ct-summary h3 {
    margin: 0 0 1.25rem;
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .ct-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
  }
  .ct-row strong {
    color: #fff;
    font-weight: 600;
  }
  .ct-grand {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 1.25rem 0 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }
  .ct-grand span:first-child {
    color: rgba(255, 255, 255, 0.7);
  }
  .ct-grand-amount {
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .ct-summary .ct-btn {
    width: 100%;
  }
  .ct-summary .ct-btn-ghost {
    border-color: rgba(255, 255, 255, 0.35);
    color: #fff;
  }
  .ct-summary .ct-btn-ghost:hover {
    background-color: #fff;
    border-color: #fff;
    color: var(--ink);
  }

  /* Empty state */
  .ct-empty {
    max-width: 30rem;
    margin: 3rem auto 0;
    text-align: center;
  }
  .ct-empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    margin-bottom: 1.5rem;
    border-radius: 20px;
    background-color: var(--ink);
    color: var(--amber);
  }
  .ct-empty h2 {
    margin: 0 0 0.5rem;
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
  }
  .ct-empty p {
    margin: 0 0 1.75rem;
    color: var(--ink-soft);
    font-size: 1.05rem;
  }

  /* Responsive */
  @media (max-width: 767.98px) {
    .ct { padding-top: 2rem; }
    .ct-item {
      grid-template-columns: 80px 1fr auto;
      grid-template-areas:
        "img info remove"
        "img qty  total";
      gap: 0.6rem 1rem;
    }
    .ct-img { width: 80px; height: 80px; }
    .ct-summary { position: static; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ct-btn,
    .ct-qty button,
    .ct-remove { transition: none; }
  }
`

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

  const removeFromCart = (productId) => {
    setCart((prevCart) =>{
      return prevCart.filter(item => item.id !== productId);
    })
  }

  if (cart.length === 0) {
    return (
      <div className="ct">
        <style>{pageStyles}</style>
        <div className="container">
          <div className="ct-empty">
            <div className="ct-empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="ct-btn ct-btn-accent">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="ct">
      <style>{pageStyles}</style>
      <div className="container">
        <h1 className="ct-title">My shopping cart</h1>
        <p className="ct-subtitle">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
        </p>

        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map((item) => {
              return (
                <div className="ct-item" key={item.id}>

                  <div className="ct-img">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  <div className="ct-info">
                    <h2 className="ct-name">{item.title}</h2>
                    <p className="ct-unit">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="ct-qty" role="group" aria-label={`Quantity for ${item.title}`}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>

                    <span aria-live="polite">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="ct-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    className="ct-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div className="col-lg-4">
            <aside className="ct-summary">
              <h3>Order summary</h3>

              <div className="ct-row">
                <span>Items</span>
                <strong>{itemCount}</strong>
              </div>

              <div className="ct-grand">
                <span>Subtotal</span>
                <span className="ct-grand-amount">${subtotal.toFixed(2)}</span>
              </div>

              <Link to="/products" className="ct-btn ct-btn-ghost">
                Continue shopping
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
