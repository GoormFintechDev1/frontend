import Image from "next/image";

export default function Splash() {

    return (<div className="container2 flex items-center justify-center">
      <Image src={"/logo.png"} width={100} height={40} alt="splash"></Image>
    </div>);
  }