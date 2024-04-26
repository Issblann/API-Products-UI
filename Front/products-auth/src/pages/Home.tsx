import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../components/Pagination';
import { fetchProducts } from '../redux/productsSlice';
import { AppThunkDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';

export const Home = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products, 'products home redux');

  return (
    <div>
      <h1>
        <h1>Products</h1>

        {products.loading && <p>Loading...</p>}

        {products.data.map((product) => (
          <div key={product.id}>
            {product.title}
            <img
              width={20}
              height={20}
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
        ))}
      </h1>
      <Pagination />
    </div>
  );
};
