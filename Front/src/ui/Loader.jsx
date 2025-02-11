function Loader() {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-dvh z-[1000] bg-slate-900 opacity-70"></div>
      <div className="absolute left-[calc(50%-28px)] top-[calc(50%-28px)] w-11 h-11 border-4 border-slate-400 border-b-transparent rounded-full animate-spin z-[1001]"></div>
    </>
  );
}

export default Loader;
