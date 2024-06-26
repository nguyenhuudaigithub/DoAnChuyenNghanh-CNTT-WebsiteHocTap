// 'use client'
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../styles/style';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên !'),
  email: Yup.string()
    .email('Email không hợp lệ !')
    .required('Vui lòng nhập đúng email.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu !'),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Đăng ký thành công';
      toast.success(message);
      setRoute('Verification');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={`${styles.title}`}>Đăng Ký</h1>
      <form onSubmit={handleSubmit}>
        <div className=''>
          <label className={`${styles.label}`} htmlFor='email'>
            Tên người dùng
          </label>
          <input
            type='text'
            name=''
            value={values.name}
            onChange={handleChange}
            id='name'
            placeholder='Nguyễn Văn A'
            className={`${errors.name && touched.name && 'border-red-500'} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className='text-red-500 pt-2 block'>{errors.name}</span>
          )}
        </div>

        <div className='mb-3'>
          <label className={`${styles.label}`} htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            name=''
            value={values.email}
            onChange={handleChange}
            id='email'
            placeholder='abcxyzemail@gmail.com'
            className={`${errors.email && touched.email && 'border-red-500'} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className='text-red-500 pt-2 block'>{errors.email}</span>
          )}
        </div>

        <div className='w-full mt-5 relative mb-1'>
          <label className={`${styles.label}`} htmlFor='email'>
            Mật khẩu
          </label>
          <input
            type={!show ? 'password' : 'text'}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder='*************'
            className={`${
              errors.password && touched.password && 'border-red-500'
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-1 cursor-pointer'
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-1 cursor-pointer'
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className='text-red-500 pt-2 block'>{errors.password}</span>
        )}

        <div className='w-full mt-5'>
          <input type='submit' value='Đăng ký' className={`${styles.button}`} />
        </div>

        <br />

        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
          Phương thức khác
        </h5>

        <div className='flex items-center justify-center my-3 text-black dark:text-white'>
          <FcGoogle
            size={30}
            className='cursor-pointer mr-2'
            onClick={() => signIn('google')}
          />
          <AiFillGithub
            size={30}
            className='cursor-pointer ml-2'
            onClick={() => signIn('github')}
          />
        </div>

        <h5 className='text-center pt-4 font-Poppins text-[14px]'>
          Đã có tài khoản ? {''}
          <span
            className='text-[#2190ff] ol-1 cursor-pointer'
            onClick={() => setRoute('Login')}
          >
            Đăng nhập
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
