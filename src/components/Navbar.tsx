import NavbarBtn from "./NavbarBtn";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 bg-gray-100 border-t border-[#D9D9D9] max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        <NavbarBtn btnName="카테고리" imgPath="/nav/Menu.png" path="/category" />
        <NavbarBtn btnName="팔래요" imgPath="/nav/Edit.png" path="/sell" />
        <NavbarBtn btnName="홈" imgPath="/nav/Home.png" path="/" />
        <NavbarBtn btnName="관심상품" imgPath="/nav/Heart.png" path="/heart" />
        <NavbarBtn btnName="마이" imgPath="/nav/User.png" path="/mypage" />
      </div>
    </div>
  );
};

export default Navbar;
