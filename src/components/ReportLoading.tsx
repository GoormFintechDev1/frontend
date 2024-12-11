import Image from "next/image"
 
export default function ReportLoading (){

   return (
   <div className="flex container justify-center items-center">
       <Image alt="loader" src={"/reportLoading.gif"} width={80} height={80} unoptimized priority style={{ width: "80px", height: "80px", objectFit: "contain" }} ></Image>
   </div>)
}