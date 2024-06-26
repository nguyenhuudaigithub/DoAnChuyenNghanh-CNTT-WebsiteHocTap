import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { styles } from '../styles/style';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import {
  LinkAuthenticationElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import socketIO from 'socket.io-client';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
  refetch?: any;
};

const CheckOutForm = ({ setOpen, data, user, refetch }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>('');
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  const { refetch: fetchUser } = useLoadUserQuery({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (error) {
      setMessage(error.message);
      fetchUser();
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setOpen(false);
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
      toast.success('Order thanh cong');
      fetchUser();
      setLoadUser(true); 
      // redirect(`/course-access/${data?._id}`);
      // window.location.href = `/course-access/${data?._id}`;
      window.location.reload();
    }
  };

  useEffect(() => {
    if (orderData) {
      fetchUser();
      socketId.emit('notification', {
        title: 'Đơn hàng mới',
        message: `Bạn có đơn hàng mới từ ${data.name}`,
        userId: user._id,
      });
      fetchUser();
      redirect(`/course-access/${data?._id}`);
    }
    if (error) {
      if ('data' in error) {
        fetchUser();
        setLoadUser(!loadUser);
        const errorMessage = error as any;
        // toast.error(errorMessage?.data?.message);
      }
    }
  }, [orderData, error]);

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <LinkAuthenticationElement id='link-authentication-element' />
      <PaymentElement id='payment-element' />

      <button disabled={isLoading || !stripe || !elements} id='submit'>
        <span id='button-text' className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? 'Thanh Toán ...' : 'Thanh Toán'}
        </span>
      </button>

      {message && (
        <div id='payment-message' className='text-[red] font-Poppins pt-2'>
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
