import Addtodo from "./components/Addtodo";
const Home = () => {
  return (
    <main className="size-screen bg-white">
      <div className="size-full bg-white text-center my-5 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-700">TASK MANAGER</h1>
        <Addtodo />
      </div>
    </main>
  );
};

export default Home;
