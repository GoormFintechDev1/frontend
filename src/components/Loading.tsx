 import Image from "next/image"
 
 export default function Loading (){

    return (
    <div className="flex container justify-center items-center">
        <Image alt="loader" src={"/Loading.gif"} width={80} height={80} unoptimized></Image>
    </div>)
 }