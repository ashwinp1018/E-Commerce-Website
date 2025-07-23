  import React, { useState } from 'react';
  import { addToCart } from '../api/cartAPI';
  import toast from 'react-hot-toast';

  const ProductCard = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAddToCart = async (id) => {
      try {
        await addToCart(id);
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        toast.error('Failed to add product to cart');
      }
    };

    const nextImage = () => {
      setCurrentImage((prev) =>
        (prev + 1) % (product.images?.length || 1)
      );
    };

    const prevImage = () => {
      setCurrentImage((prev) =>
        (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1)
      );
    };

    return (
      <>
        {/* Product Card */}
        <div
          className="border border-black bg-white p-4 transition-all hover:shadow-lg flex flex-col items-center cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          {/* Image Carousel */}
          <div className="w-full h-64 md:h-72 lg:h-80 relative overflow-hidden">
            <img
              src={product.images ? product.images[currentImage] : product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            {product.images && product.images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 bg-black text-white px-2 py-1 text-xs opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  ◀
                </button>
                <button
                  className="absolute top-1/2 right-2 bg-black text-white px-2 py-1 text-xs opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  ▶
                </button>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-black">{product.name}</h3>
            <p className="text-gray-800 font-bold text-lg mt-2">₹{product.price}</p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product._id);
            }}
            className="mt-4 w-full bg-black text-white py-2 text-sm uppercase tracking-wide hover:bg-gray-900 transition"
          >
            Add to Cart
          </button>
        </div>

        {/* Expanded View with Blurred Background */}
        {isExpanded && (
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50"
            onClick={() => setIsExpanded(false)}
          >
            <div
              className="bg-white border border-black rounded-lg p-6 max-w-4xl w-full md:w-3/4 lg:w-2/3 relative flex flex-col md:flex-row transform scale-95 animate-[fadeIn_0.3s_ease-out_forwards]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-black text-xl font-bold"
                onClick={() => setIsExpanded(false)}
              >
                ✕
              </button>

              {/* Image Carousel */}
              <div className="flex-1 relative">
                <img
                  src={product.images ? product.images[currentImage] : product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-96 object-cover rounded"
                />
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-2 bg-black text-white px-2 py-1 text-xs opacity-70 hover:opacity-100"
                      onClick={prevImage}
                    >
                      ◀
                    </button>
                    <button
                      className="absolute top-1/2 right-2 bg-black text-white px-2 py-1 text-xs opacity-70 hover:opacity-100"
                      onClick={nextImage}
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 mt-4 md:mt-0 md:ml-6 text-left">
                <h2 className="text-2xl font-bold text-black mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-bold text-black mb-6">₹{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full bg-black text-white py-3 uppercase font-semibold hover:bg-gray-900 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  export default ProductCard;
