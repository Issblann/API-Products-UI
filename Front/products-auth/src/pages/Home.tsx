import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../components/Pagination';
import { fetchProducts } from '../redux/productsSlice';
import { AppThunkDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';
import { Search } from '../components/searcher';

export const Home = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products, 'products home redux');

  return (
    <section className="flex flex-col max-w-7xl gap-6 w-full p-4 text-slate-100 ">
      <div className="flex w-full justify-between items-center bg-slate-950 p-4 rounded-lg">
        <h1 className="text-3xl font-semibold text-slate-400">Products</h1>
        <Search />
      </div>

      {products.loading && <p>Loading...</p>}
      <div className="flex md:flex-col flex-col-reverse w-full gap-4 justify-center">
        <div className="flex flex-col md:grid h-full  md:grid-cols-3 gap-5">
          {products.data.map((product) => (
            <div
              className="bg-gray-700 flex flex-col rounded-xl p-4 w-full h-full"
              key={product.id}
            >
              <p className="text-xl mb-3 font-medium">{product.title}</p>
              <div className="flex flex-col h-full justify-between">
                <img
                  className="object-contain w-full h-[180px] rounded-xl"
                  alt={product.title}
                  src={product.thumbnail}
                />

                <p className="text-2xl mt-6">$ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination />
      </div>
    </section>
  );
};
