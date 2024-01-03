import Connect from "./components/Connect";
import img1 from "../src/assets/img-1.jpg";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import GetBalance from "./components/GetBalance";

function App() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://media.istockphoto.com/id/1386739357/photo/wallet-and-digital-security-online-payment-and-cyber-protection.jpg?s=612x612&w=0&k=20&c=bCqJcYvr9PiIVSM-sszjN92IsVekLvy4D5Q0Gj8r2cI="
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Secured Bank Transation!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Connect />
          <GetBalance />
          <Deposit />
          <Withdraw />
        </div>
      </div>
    </div>
  );
}

export default App;
