import NavbarBtn from "./NavbarBtn";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 py-2.5 w-full h-[83px] left-1/2 transform -translate-x-1/2 bg-gray-100 border-t border-[#D9D9D9] max-w-[800px] mx-auto">
      <div className="flex px-5 justify-between items-center">
        <NavbarBtn btnName="월간리포트" imgName="Bar_Chart" path="/report" />
        <NavbarBtn btnName="홈" imgName="Home" path="/" />
        <NavbarBtn btnName="마이" imgName="Person" path="/mypage" />
      </div>
    </div>
  );
};

export default Navbar;
