import LoginForm from "./LoginForm";

function Login() {



  return (
    <div className=" lg:min-h-screen flex fle-col items-center justify-center p-6">
      <div className=" grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        <div>
          <h1 className=" lg:text-5xl text-4xl font-bold text-slate-900 dark:text-white !leading-tight">WeLink Login for Gate Access Control</h1>
          <p className=" text-[15px] mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">Login to your WeLink Account to Setup a Gate.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
