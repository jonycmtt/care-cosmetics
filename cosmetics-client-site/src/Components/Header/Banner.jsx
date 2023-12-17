

const Banner = () => {
  return (
    <div
      className="hero min-h-[40vh] sm:min-h-[40vh] md:min-h-[55vh] lg:min-h-[88vh]"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/n825Yvf/pexels-oleksandr-p-3800060.jpg)", 
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="w-full md:max-w-xl">
          <h1 className="mb-5 text-3xl md:text-5xl font-bold text-rose-400">Beauty Cosmetics</h1>
          <h1 className="mb-5 text-2xl md:text-4xl font-bold">
            Beauty Innovators, Empowering Your Brand 
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
