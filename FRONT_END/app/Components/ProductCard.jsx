"use client";

import { useRouter } from "next/navigation";

const ProductCard = (props) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(props.url);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-md m-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {props.name}
        </h2>

        <p className="text-gray-700 dark:text-gray-200">{props.value}</p>

        <button
          onClick={handleViewMore}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Voir Plus
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
