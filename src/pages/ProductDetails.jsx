import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

/* Page styles (shared by the loading, error and main views) */
const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

    .pd {
        --ink: #12161f;
        --ink-soft: #5a6272;
        --paper: #f5f6f8;
        --surface: #ffffff;
        --line: #e2e5eb;
        --amber: #f5b83d;
        --amber-soft: #fde9bd;
        --amber-ink: #1b1303;

        min-height: calc(100vh - 70px);
        padding: 2.5rem 0 5rem;
        background-color: var(--paper);
        color: var(--ink);
        font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
    }
    .pd a:focus-visible,
    .pd button:focus-visible {
        outline: 3px solid var(--amber);
        outline-offset: 3px;
    }

    /* Breadcrumb */
    .pd-crumbs {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 0.6rem;
        margin: 0 0 2rem;
        padding: 0;
        list-style: none;
        font-size: 0.92rem;
        color: var(--ink-soft);
    }
    .pd-crumbs li + li::before {
        content: '/';
        margin-right: 0.6rem;
        color: #b4bac6;
    }
    .pd-crumbs a {
        color: var(--ink-soft);
        text-decoration: none;
    }
    .pd-crumbs a:hover {
        color: var(--ink);
        text-decoration: underline;
    }
    .pd-crumbs li:last-child {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--ink);
        font-weight: 500;
    }

    /* Gallery */
    .pd-image {
        position: relative;
        overflow: hidden;
        aspect-ratio: 1 / 1;
        border: 1px solid var(--line);
        border-radius: 24px;
        background-color: #eceff5;
    }
    .pd-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }
    .pd-image:hover img {
        transform: scale(1.04);
    }
    .pd-discount {
        position: absolute;
        top: 1rem;
        left: 1rem;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        background-color: var(--amber);
        color: var(--amber-ink);
        font-size: 0.9rem;
        font-weight: 700;
    }
    .pd-thumbs {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.9rem;
        overflow-x: auto;
        padding-bottom: 4px;
    }
    .pd-thumb {
        flex: 0 0 auto;
        width: 76px;
        height: 76px;
        overflow: hidden;
        border: 2px solid var(--line);
        border-radius: 14px;
        background-color: #eceff5;
        transition: border-color 0.15s ease;
    }
    .pd-thumb:hover {
        border-color: var(--ink);
    }
    .pd-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Info */
    .pd-category {
        display: inline-block;
        margin-bottom: 1rem;
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        background-color: var(--amber-soft);
        color: #5c4208;
        font-size: 0.88rem;
        font-weight: 500;
        text-transform: capitalize;
    }
    .pd-title {
        margin: 0 0 1rem;
        font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        letter-spacing: -0.035em;
        line-height: 1.05;
    }
    .pd-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1.25rem;
        margin-bottom: 1.5rem;
        color: var(--ink-soft);
    }
    .pd-stars {
        color: var(--amber);
        letter-spacing: 2px;
    }
    .pd-stars .pd-stars-off {
        color: #d3d7df;
    }
    .pd-meta strong {
        color: var(--ink);
        font-weight: 600;
    }
    .pd-desc {
        max-width: 38rem;
        margin: 0 0 1.75rem;
        font-size: 1.1rem;
        line-height: 1.65;
        color: var(--ink-soft);
    }

    /* Price */
    .pd-price-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
        margin-bottom: 1.75rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--line);
    }
    .pd-price {
        font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
        font-size: clamp(2.4rem, 5vw, 3.2rem);
        font-weight: 800;
        letter-spacing: -0.04em;
        line-height: 1;
    }
    .pd-price-old {
        font-size: 1.25rem;
        color: var(--ink-soft);
        text-decoration: line-through;
    }

    /* Facts */
    .pd-fact {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.9rem 1rem;
        border: 1px solid var(--line);
        border-radius: 16px;
        background-color: var(--surface);
    }
    .pd-fact-icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background-color: var(--ink);
        color: var(--amber);
    }
    .pd-fact-label {
        font-size: 0.85rem;
        color: var(--ink-soft);
    }
    .pd-fact-value {
        font-weight: 700;
    }

    /* Actions */
    .pd-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.95rem 1.75rem;
        border: 1.5px solid transparent;
        border-radius: 999px;
        font-size: 1.05rem;
        font-weight: 600;
        line-height: 1.2;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    .pd-btn-primary {
        background-color: var(--amber);
        color: var(--amber-ink);
    }
    .pd-btn-primary:hover {
        background-color: #ffc95c;
        color: var(--amber-ink);
    }
    .pd-btn-primary:active {
        background-color: #e7a82a;
    }
    .pd-btn-icon {
        width: 56px;
        padding-left: 0;
        padding-right: 0;
        border-color: var(--ink);
        background-color: transparent;
        color: var(--ink);
    }
    .pd-btn-icon:hover {
        background-color: var(--ink);
        color: #fff;
    }
    .pd-back {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1.5rem;
        color: var(--ink-soft);
        font-weight: 500;
        text-decoration: none;
    }
    .pd-back:hover {
        color: var(--ink);
    }
    .pd-btn-dark {
        background-color: var(--ink);
        color: #fff;
    }
    .pd-btn-dark:hover {
        background-color: #262c3a;
        color: #fff;
    }

    /* Loading skeleton */
    .pd-skel {
        background: linear-gradient(90deg, #eceef2 25%, #f6f7f9 50%, #eceef2 75%);
        background-size: 200% 100%;
        animation: pd-shimmer 1.4s linear infinite;
        border-radius: 8px;
    }
    @keyframes pd-shimmer {
        to { background-position: -200% 0; }
    }

    /* Error */
    .pd-error {
        display: flex;
        align-items: flex-start;
        gap: 0.9rem;
        max-width: 38rem;
        margin: 0 auto 1.5rem;
        padding: 1.1rem 1.25rem;
        border: 1px solid #f1c3c3;
        border-left: 5px solid #d64545;
        border-radius: 12px;
        background-color: #fff;
        color: #7a1f1f;
        font-weight: 500;
    }
    .pd-error svg {
        flex: 0 0 auto;
        margin-top: 2px;
        color: #d64545;
    }

    @media (max-width: 575.98px) {
        .pd { padding-top: 1.5rem; }
        .pd-btn-primary { flex: 1 1 100%; }
    }
    @media (prefers-reduced-motion: reduce) {
        .pd-image img,
        .pd-thumb,
        .pd-btn { transition: none; }
        .pd-image:hover img { transform: none; }
        .pd-skel { animation: none; }
    }
`

const backArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
)

function ProductDetails() {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProduct();
    }, [id])

    const getProduct = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`)
            setProduct(response.data)
        } catch (error) {
            setError("Product not found")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="pd">
                <style>{pageStyles}</style>
                <div className="container" role="status">
                    <span className="visually-hidden">Loading product...</span>
                    <div className="row g-5" aria-hidden="true">
                        <div className="col-12 col-lg-6">
                            <div className="pd-skel" style={{ aspectRatio: '1 / 1', borderRadius: 24 }}></div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="pd-skel mb-3" style={{ height: 28, width: 120, borderRadius: 999 }}></div>
                            <div className="pd-skel mb-3" style={{ height: 48, width: '85%' }}></div>
                            <div className="pd-skel mb-4" style={{ height: 18, width: '40%' }}></div>
                            <div className="pd-skel mb-2" style={{ height: 16 }}></div>
                            <div className="pd-skel mb-2" style={{ height: 16 }}></div>
                            <div className="pd-skel mb-5" style={{ height: 16, width: '70%' }}></div>
                            <div className="pd-skel" style={{ height: 56, borderRadius: 999 }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="pd">
                <style>{pageStyles}</style>
                <div className="container mt-4">
                    <div className="pd-error" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>{error}</div>
                    </div>

                    <div className="text-center">
                        <Link to='/products' className='pd-btn pd-btn-dark'>
                            {backArrow}
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const rounded = Math.round(product.rating)

    return (
        <div className='pd'>
            <style>{pageStyles}</style>
            <div className='container'>

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="pd-crumbs">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li aria-current="page">{product.title}</li>
                    </ol>
                </nav>

                <div className='row g-5 align-items-start'>

                    {/* Image Section */}
                    <div className='col-12 col-lg-6'>
                        <div className="pd-image">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            {/* Discount badge */}
                            {product.discountPercentage > 0 && (
                                <span className="pd-discount">
                                    {Math.round(product.discountPercentage)}% off
                                </span>
                            )}
                        </div>

                        {/* Thumbnail strip */}
                        {product.images && product.images.length > 1 && (
                            <div className="pd-thumbs">
                                {product.images.slice(0, 5).map((img, i) => (
                                    <div key={i} className="pd-thumb">
                                        <img src={img} alt={`${product.title} ${i + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className='col-12 col-lg-6'>
                        <span className="pd-category">
                            {String(product.category).replace(/-/g, ' ')}
                        </span>

                        <h1 className='pd-title'>{product.title}</h1>

                        {/* Rating + Brand row */}
                        <div className="pd-meta">
                            <div className="d-flex align-items-center gap-2" aria-label={`Rated ${product.rating} out of 5`}>
                                <span className="pd-stars" aria-hidden="true">
                                    {'★'.repeat(rounded)}
                                    <span className="pd-stars-off">{'★'.repeat(5 - rounded)}</span>
                                </span>
                                <strong>{Number(product.rating).toFixed(1)}</strong>
                            </div>
                            {product.brand && (
                                <span>Brand: <strong>{product.brand}</strong></span>
                            )}
                        </div>

                        <p className='pd-desc'>{product.description}</p>

                        {/* Price */}
                        <div className="pd-price-row">
                            <span className="pd-price">${product.price.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                                <span className="pd-price-old">
                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Info chips */}
                        <div className="row g-3 mb-4">
                            <div className="col-6">
                                <div className="pd-fact">
                                    <div className="pd-fact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="pd-fact-label">In stock</div>
                                        <div className="pd-fact-value">{product.stock} units</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pd-fact">
                                    <div className="pd-fact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                                            <circle cx="4.5" cy="4.5" r="2" />
                                            <circle cx="11.5" cy="11.5" r="2" />
                                            <path d="M13 3L3 13" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="pd-fact-label">Discount</div>
                                        <div className="pd-fact-value">{product.discountPercentage}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="d-flex gap-3 flex-wrap">
                            <button className='pd-btn pd-btn-primary flex-grow-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                Add to cart
                            </button>
                            <button className="pd-btn pd-btn-icon" aria-label="Add to wishlist">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                            </button>
                        </div>

                        {/* Back link */}
                        <Link to='/products' className='pd-back'>
                            {backArrow}
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
