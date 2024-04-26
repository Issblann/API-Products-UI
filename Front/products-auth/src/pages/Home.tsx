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
    <section className=" h-screen text-slate-100 bg-slate-900">
      <div className="flex flex-col mx-auto gap-6 w-full p-4 justify-center items-center max-w-7xl">
        <h1 className="text-3xl mt-[10%] font-semibold text-slate-400">
          Products
        </h1>

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
      </div>
    </section>
  );
};
