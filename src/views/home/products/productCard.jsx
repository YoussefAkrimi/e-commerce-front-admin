import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

const ProductCard = ({ product }) => {
  const { name, description, price, ref, qte, galleries, subcategory } = product;

  // Transform galleries into the expected structure for SimpleImageSlider
  const images = galleries.map((gallery) => ({ url: `http://localhost:3000/storage/${gallery.image}` }));
/*   const images = galleries.map((gallery) => ({ url: `/storage/${gallery.image}` }));
 */
  return (
    <div className="card h-100">
      {images.length > 0 ? (
        <SimpleImageSlider
        key={JSON.stringify(images)} // Re-render on image change
          width={300}
          height={200}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      ) : (
        <div style={{ height: "200px", backgroundColor: "#f5f5f5" }} />
      )}

      
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Description: {description}</p>
        <p className="card-text">Price: ${price}</p>
        <p className="card-text">Reference: {ref}</p>
        <p className="card-text">Quantity: {qte}</p>
        <p className="card-text">
          Subcategory: {subcategory?.name || "No subcategory"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
