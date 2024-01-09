import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Footer from "../Route/Footer";
import CourseDetails from "./CourseDetails";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Header from "../Header";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const { data: userData, refetch } = useLoadUserQuery({});
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && data?.course?.price != 0) {
      const amount = Math.round(data?.course?.price);
      console.log(amount);
      createPaymentIntent(amount);
    }
    refetch();
  }, [config, data]);
  
  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
      refetch();
    }
    refetch();
  }, [paymentIntentData]);
  console.log(paymentIntentData);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {stripePromise && (
            <CourseDetails
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
