import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="pc d-flex flex-column h-100">
            {/* Image */}
            <div className="pc-media position-relative overflow-hidden">
                <img
                    src={product.thumbnail}
                    className="pc-img"
                    alt={product.title}
                    loading="lazy"
                />

                {/* Rating */}
                <span className="pc-rating position-absolute d-flex align-items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    {Number(product.rating).toFixed(1)}
                </span>
            </div>

            {/* Details */}
            <div className="pc-body d-flex flex-column flex-grow-1">
                <span className="pc-category">
                    {String(product.category).replace(/-/g, ' ')}
                </span>

                <h3 className="pc-title" title={product.title}>
                    {product.title}
                </h3>

                <div className="pc-price">
                    ${product.price.toFixed(2)}
                </div>

                <div className="pc-actions mt-auto d-flex gap-2">
                    <Link
                        to={`/products/${product.id}`}
                        className="pc-btn pc-btn-view flex-fill"
                        aria-label={`View ${product.title}`}
                    >
                        View
                    </Link>

                    <button
                        type="button"
                        className="pc-btn pc-btn-add flex-fill"
                        onClick={onAddToCart}
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        Add
                    </button>
                </div>
            </div>

            {/* Scoped styles */}
            <style>{`
                .pc {
                    --pc-ink: #12161f;
                    --pc-soft: #5a6272;
                    --pc-line: #e2e5eb;
                    --pc-amber: #f5b83d;
                    --pc-amber-ink: #1b1303;

                    overflow: hidden;
                    border: 1px solid var(--pc-line);
                    border-radius: 18px;
                    background-color: #fff;
                    color: var(--pc-ink);
                    font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .pc:hover {
                    border-color: #c9cfda;
                    box-shadow: 0 10px 28px rgba(18, 22, 31, 0.08);
                }

                /* Image */
                .pc-media {
                    aspect-ratio: 1 / 1;
                    background-color: #eceff5;
                }
                .pc-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .pc:hover .pc-img {
                    transform: scale(1.04);
                }
                .pc-rating {
                    top: 0.75rem;
                    right: 0.75rem;
                    padding: 0.3rem 0.65rem;
                    border-radius: 999px;
                    background-color: #fff;
                    font-size: 0.8rem;
                    font-weight: 600;
                    line-height: 1;
                    box-shadow: 0 1px 3px rgba(18, 22, 31, 0.12);
                }
                .pc-rating svg {
                    color: var(--pc-amber);
                }

                /* Text */
                .pc-body {
                    padding: 1rem 1.1rem 1.1rem;
                }
                .pc-category {
                    margin-bottom: 0.3rem;
                    font-size: 0.82rem;
                    font-weight: 500;
                    text-transform: capitalize;
                    color: var(--pc-soft);
                }
                .pc-title {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    min-height: 2.7em;
                    margin: 0 0 0.6rem;
                    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
                    font-size: 1.05rem;
                    font-weight: 700;
                    letter-spacing: -0.015em;
                    line-height: 1.35;
                }
                .pc-price {
                    margin-bottom: 1rem;
                    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 1;
                }

                /* Buttons */
                .pc-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    padding: 0.55rem 0.9rem;
                    border: 1.5px solid transparent;
                    border-radius: 999px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    line-height: 1.2;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
                }
                .pc-btn-view {
                    border-color: var(--pc-ink);
                    background-color: transparent;
                    color: var(--pc-ink);
                }
                .pc-btn-view:hover {
                    background-color: var(--pc-ink);
                    color: #fff;
                }
                .pc-btn-add {
                    background-color: var(--pc-amber);
                    color: var(--pc-amber-ink);
                }
                .pc-btn-add:hover {
                    background-color: #ffc95c;
                }
                .pc-btn-add:active {
                    background-color: #e7a82a;
                }
                .pc-btn:focus-visible {
                    outline: 3px solid var(--pc-amber);
                    outline-offset: 2px;
                }

                @media (prefers-reduced-motion: reduce) {
                    .pc,
                    .pc-img,
                    .pc-btn { transition: none; }
                    .pc:hover .pc-img { transform: none; }
                }
            `}</style>
        </div>
    )
}

export default ProductCard
