import { useForm } from 'react-hook-form';
import { User } from '../types/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const signUp = async (user: User) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/register',
        user
      );
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error('Error signing up');
    }
  };

  const onSubmit = async (data: User) => {
    try {
      await signUp(data);
      reset();

      navigate('/login');
    } catch (error) {
      throw new Error('Error signing up');
    }
  };

  return (
    <div className="bg-white">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="max-h-auto mx-auto max-w-xl">
          <div className="mb-8 space-y-3">
            <p className="text-xl font-semibold">Sign up</p>
            <p className="text-gray-500">
              Sign up for access to the products. <br />
            </p>
          </div>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 space-y-3">
              <div className="space-y-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Username
                  </label>
                  <input
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="username"
                    placeholder="John Doe"
                    {...register('username', { required: 'User is required' })}
                  />
                  {errors?.username && (
                    <p className="text-red-500 text-xs mt-">
                      {errors.username?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <input
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="mail@example.com"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email?.message as String}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <input
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    type="password"
                    placeholder="*******"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password?.message as String}
                    </p>
                  )}
                </div>
              </div>

              <button
                className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
