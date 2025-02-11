function Loader() {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-dvh z-[1000] bg-gray-200 opacity-70"></div>
      <div className="absolute left-[calc(50%-28px)] top-[calc(50%-28px)] w-14 h-14 border-4 border-green-400 border-b-transparent rounded-full animate-spin z-[1001]"></div>
    </>
  );
}

export default Loader;
