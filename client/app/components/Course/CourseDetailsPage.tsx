import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Footer from '../Route/Footer';
import CourseDetails from './CourseDetails';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import Header from '../Header';
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from '@/redux/features/orders/ordersApi';
import {useStripe, useElements} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data?.course?.price);
      createPaymentIntent(amount);
    }
    
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {

      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name}
            description={'NetSkillD Học Lập Trình'}
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
