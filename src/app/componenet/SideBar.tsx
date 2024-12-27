export default function SideBar() {
  return (
    <div className="bg-green-400 md:col-span-1 h-full hidden md:block">
      <div>최근 본 게시물</div>
      <div className="grid grid-rows-5 h-5/6">
        <div className="bg-red-100 hover:bg-brown-300 hover:cursor-pointer">
          z
        </div>
        <div className="bg-red-200 hover:bg-brown-300 hover:cursor-pointer">
          z
        </div>
        <div className="bg-red-300 hover:bg-brown-300 hover:cursor-pointer">
          z
        </div>
        <div className="bg-red-400 hover:bg-brown-300 hover:cursor-pointer">
          z
        </div>
        <div className="bg-red-500 hover:bg-brown-300 hover:cursor-pointer">
          z
        </div>
      </div>
    </div>
  );
}
