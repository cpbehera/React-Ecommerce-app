import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="card h-100 border-0 shadow-sm product-card">
            {/* Image wrapper with hover zoom */}
            <div className="product-img-wrapper position-relative overflow-hidden">
                <img
                    src={product.thumbnail}
                    className="card-img-top product-img"
                    alt={product.title}
                />
                {/* Category badge */}
                <span className="badge bg-dark bg-opacity-75 position-absolute top-0 start-0 m-3 text-capitalize px-3 py-2 rounded-pill">
                    {product.category}
                </span>

                {/* Rating badge */}
                <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill d-flex align-items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    {product.rating}
                </span>
            </div>

            <div className="card-body d-flex flex-column p-3">
                <h6 className="card-title fw-semibold mb-2 text-truncate" title={product.title}>
                    {product.title}
                </h6>

                <div className="mb-3">
                    <span className="fs-4 fw-bold text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <div className="mt-auto d-flex gap-2">
                    <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-dark btn-sm flex-fill fw-semibold"
                    >
                        View
                    </Link>

                    <button className="btn btn-dark btn-sm flex-fill fw-semibold d-flex align-items-center justify-content-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        Add
                    </button>
                </div>
            </div>

            {/* Scoped styles */}
            <style>{`
                .product-card {
                    border-radius: 16px;
                    transition: box-shadow 0.25s ease, transform 0.25s ease;
                }
                .product-card:hover {
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
                }
                .product-img-wrapper {
                    background: #f8f9fa;
                    aspect-ratio: 1 / 1;
                }
                .product-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .product-card:hover .product-img {
                    transform: scale(1.06);
                }
            `}</style>
        </div>
    )
}

export default ProductCard