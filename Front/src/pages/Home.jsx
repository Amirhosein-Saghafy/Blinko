import { Fragment } from "react";
import bg from "../assets/images/bg.jpg";

function Home() {
  return (
    <Fragment>
      <img
        src={bg}
        alt="background"
        className="w-full h-full absolute object-cover"
      />
      <div className="flex justify-center items-center min-h-[calc(100vh-40px)]">
        <div className="py-2 px-3 rounded-2xl z-10">
          <p className="font-semibold text-sm text-zinc-600">
            Select Chat to Start Messaging
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
