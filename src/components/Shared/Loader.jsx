// ================= [ LOADER COMPONENT ] ================= //
// > Kinetic Lottie animation for loading states.
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
const Loader = () => {
  return (
    <div className="w-36 h-36">
      <DotLottieReact
        src="https://lottie.host/098e039f-f84d-484d-8c2d-487a359dce57/QKEbx9a49w.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Loader;
