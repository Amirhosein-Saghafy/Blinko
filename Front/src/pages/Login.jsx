import login from "../assets/images/login.svg";

const Login = ({ action }) => {
  return (
    <main className="bg-[#f8fafb]">
      <div className="w-10/12 py-5 mx-auto">
        <div className="flex justify-center items-start h-[calc(100vh-40px)]">
          <div className="w-2/3 h-full">
            <div className="w-full h-full py-10 pr-32">
              <img
                src={login}
                alt="login-illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-1/3 mt-8">
            <form action="" className="py-10 pl-5">
              <div className="mb-3">
                <h4 className="text-3xl">
                  {action === "login" ? "Sign In" : "Sign Up"}
                </h4>
              </div>
              <div className="mb-5">
                <p className="text-zinc-400">
                  {action === "login"
                    ? "Log in to access your chats and conversations anytime, seamlessly continuing where you left off!"
                    : "Sign up to create an account and securely access your chats and conversations anytime!"}
                </p>
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="username"
                  className="py-5 px-4 bg-gray-100 rounded-t-lg w-full outline-none text-sm placeholder:text-zinc-400 text-zinc-400 border-b border-b-gray-200"
                  placeholder="Username"
                />
                <input
                  type="password"
                  name="password"
                  className="py-5 px-4 bg-gray-100 rounded-b-xl w-full outline-none text-sm placeholder:text-zinc-400 text-zinc-400"
                  placeholder="password"
                />
              </div>
              {action === "login" && (
                <>
                  <div className="mb-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className=""
                      />
                      <label
                        htmlFor="remember"
                        className="text-zinc-500 text-sm ml-2"
                      >
                        Remember me
                      </label>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="text-xs text-zinc-500 decoration-solid decoration-1 underline underline-offset-2"
                      >
                        Forgot Password
                      </a>
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="my-8 w-full py-4 bg-[#6c63ff] hover:bg-[#635cec] text-white outline-none rounded-md"
              >
                {action === "login" ? "Log In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
