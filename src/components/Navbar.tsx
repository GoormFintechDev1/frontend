import NavbarBtn from "./NavbarBtn";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 py-2.5 w-full h-[83px] left-1/2 transform -translate-x-1/2 bg-gray-100 border-t border-[#D9D9D9] max-w-[800px] mx-auto">
      <div className="flex px-5 justify-between items-center">
        <NavbarBtn btnName="카테고리" imgName="Menu" path="/category" />
        <NavbarBtn btnName="팔래요" imgName="Edit" path="/sell" />
        <NavbarBtn btnName="홈" imgName="Home" path="/" />
        <NavbarBtn btnName="관심상품" imgName="Heart" path="/heart" />
        <NavbarBtn btnName="마이" imgName="Person" path="/mypage" />
      </div>
    </div>
  );
};

export default Navbar;
