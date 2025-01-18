function Hero() {
    return (
      <section className="text-center py-10 bg-black text-white">
        <h2 className="text-5xl font-bold mb-12 tracking-wider">WHO IS YOUR G.O.A.T.?</h2>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center">
            <img
              src="/bean.png"
              alt="Kobe Bryant"
              className="w-52 h-80 object-contain"
            />
            <p className="mt-6 text-2xl font-semibold">Kobe Bryant</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/lbj.png"
              alt="LeBron James"
              className="w-52 h-80 object-contain"
            />
            <p className="mt-6 text-2xl font-semibold">LeBron James</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/airmike.png"
              alt="Michael Jordan"
              className="w-52 h-80 object-contain"
            />
            <p className="mt-6 text-2xl font-semibold">Michael Jordan</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default Hero;
  