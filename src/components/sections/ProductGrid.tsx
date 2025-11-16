import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch } from "../../store";
import { setSelectedProduct } from "../../store/slices/productSlice";
import type { Product } from "../../utils/products";

interface ProductGridProps {
  products: Product[];
  fallbackText?: string;
}

const ProductGrid = ({ products, fallbackText }: ProductGridProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        {fallbackText || "Coming soon..."}
      </div>
    );
  }

  const handleSelect = (item: Product) => {
    dispatch(setSelectedProduct(item));
    navigate("/customization/select-template");
  };

  return (
    <div className="grid bg-[#F9F5EF] rounded-lg p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
      {products.map((item) => (
        <div
          onClick={() => handleSelect(item)}
          key={item.id}
          className="bg-[#EFE7DC] shadow-sm rounded-lg p-3 flex items-center justify-center cursor-pointer hover:bg-next transition"
        >
          <img
            src={item.image}
            alt="Product"
            className="w-[200px] h-[200px] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
