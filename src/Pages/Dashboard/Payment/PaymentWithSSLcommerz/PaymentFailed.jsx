import { useParams } from "react-router-dom";

const PaymentFailed = () => {
  const { tranId } = useParams();
  return (
    <div>
      <h1 className="text-red-500 text-5xl font-bold">
        Payment Failed {tranId}
      </h1>
    </div>
  );
};

export default PaymentFailed;
