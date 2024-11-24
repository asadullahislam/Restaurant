import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  return (
    <div>
      <h1 className="text-center text-5xl text-green-500">
        Payment success {tranId}
      </h1>
    </div>
  );
};

export default PaymentSuccess;
