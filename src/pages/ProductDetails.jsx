import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

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
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted fw-semibold">Loading product...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger d-flex align-items-center shadow-sm" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>{error}</div>
                </div>

                <Link to='/products' className='btn btn-dark d-inline-flex align-items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    Back to Products
                </Link>
            </div>
        )
    }

    return (
        <div className='container py-5'>

            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/products" className="text-decoration-none text-muted">Products</Link>
                    </li>
                    <li className="breadcrumb-item active text-truncate" aria-current="page" style={{ maxWidth: '220px' }}>
                        {product.title}
                    </li>
                </ol>
            </nav>

            <div className='row g-5 align-items-start'>

                {/* Image Section */}
                <div className='col-12 col-lg-6'>
                    <div className="product-image-card position-relative overflow-hidden rounded-4">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className='img-fluid w-100 product-detail-img'
                        />
                        {/* Discount badge */}
                        {product.discountPercentage > 0 && (
                            <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill fw-semibold">
                                -{Math.round(product.discountPercentage)}% OFF
                            </span>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {product.images && product.images.length > 1 && (
                        <div className="d-flex gap-2 mt-3 overflow-auto">
                            {product.images.slice(0, 5).map((img, i) => (
                                <div key={i} className="thumb-wrapper rounded-3 overflow-hidden flex-shrink-0">
                                    <img src={img} alt={`${product.title} ${i + 1}`} className="thumb-img" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className='col-12 col-lg-6'>
                    <span className="badge bg-primary bg-opacity-10 text-primary text-capitalize px-3 py-2 rounded-pill mb-3 fw-semibold">
                        {product.category}
                    </span>

                    <h1 className='fw-bold mb-3 display-6'>{product.title}</h1>

                    {/* Rating + Brand row */}
                    <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
                        <div className="d-flex align-items-center gap-1">
                            <span className="text-warning">
                                {'★'.repeat(Math.round(product.rating))}
                                <span className="text-muted">{'★'.repeat(5 - Math.round(product.rating))}</span>
                            </span>
                            <span className="text-muted ms-1 fw-semibold">{product.rating}</span>
                        </div>
                        {product.brand && (
                            <>
                                <span className="text-muted">•</span>
                                <span className="text-muted">Brand: <strong className="text-dark">{product.brand}</strong></span>
                            </>
                        )}
                    </div>

                    <p className='text-muted fs-5 mb-4'>{product.description}</p>

                    {/* Price */}
                    <div className="d-flex align-items-baseline gap-3 mb-4">
                        <span className="display-5 fw-bold text-primary">${product.price.toFixed(2)}</span>
                        {product.discountPercentage > 0 && (
                            <span className="text-muted text-decoration-line-through fs-5">
                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Info chips */}
                    <div className="row g-3 mb-4">
                        <div className="col-6">
                            <div className="info-chip rounded-3 p-3 d-flex align-items-center gap-3">
                                <div className="chip-icon bg-success bg-opacity-10 text-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-muted small">In Stock</div>
                                    <div className="fw-bold">{product.stock} units</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="info-chip rounded-3 p-3 d-flex align-items-center gap-3">
                                <div className="chip-icon bg-danger bg-opacity-10 text-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-muted small">Discount</div>
                                    <div className="fw-bold">{product.discountPercentage}%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-3 flex-wrap">
                        <button className='btn btn-dark btn-lg flex-grow-1 d-flex align-items-center justify-content-center gap-2 add-to-cart-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            Add to Cart
                        </button>
                        <button className="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center" aria-label="Add to wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </button>
                    </div>

                    {/* Back link */}
                    <Link to='/products' className='btn btn-link text-muted text-decoration-none mt-3 ps-0 d-inline-flex align-items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                        Back to Products
                    </Link>
                </div>
            </div>

            {/* Scoped styles */}
            <style>{`
                .product-image-card {
                    background: #f8f9fa;
                    aspect-ratio: 1 / 1;
                }
                .product-detail-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .product-image-card:hover .product-detail-img {
                    transform: scale(1.04);
                }
                .thumb-wrapper {
                    width: 72px;
                    height: 72px;
                    border: 2px solid transparent;
                    cursor: pointer;
                    transition: border-color 0.2s ease;
                }
                .thumb-wrapper:hover {
                    border-color: #667eea;
                }
                .thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .info-chip {
                    background: #f8f9fa;
                    border: 1px solid #eef0f3;
                }
                .chip-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .add-to-cart-btn {
                    border-radius: 12px;
                    padding: 0.75rem 1.5rem;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .add-to-cart-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
                .btn-outline-dark.btn-lg {
                    border-radius: 12px;
                }
            `}</style>
        </div>
    )
}

export default ProductDetails