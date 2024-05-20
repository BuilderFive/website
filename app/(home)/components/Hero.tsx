import { RsvpSection } from "./RsvpSection";
import { Globe } from "./globe/Globe";

export default function Hero() {

    return <div id="Hero" className="container w-full flex flex-wrap h-min-screen pt-[48px] justify-between max-md:items-center max-md:pt-[42px] max-md:space-y-[24px]">
        <section id="Column 1" className="flex relative gap-y-[48px] flex-col items-start justify-center flex-grow ">
            <section className="flex-col space-y-[24px] w-[700px] max-md:w-full text-center animate-slidein opacity-0 [--slidein-delay:300ms]">
                <div className="text-7xl font-bold text-white max-md:max-w-full max-md:text-4xl">
                    <p className="animate-slidein opacity-0 [--slidein-delay:500ms]">Turn an <a className="text-text7 animate-slidein opacity-0 [--slidein-delay:800ms]">idea</a></p> 
                    <p className="animate-slidein opacity-0 [--slidein-delay:1500ms]">into a <a className="text-text8 animate-slidein opacity-0 [--slidein-delay:1800ms]">product.</a></p>
                </div>
                <div className="flex text-4xl max-md:text-lg text-white font-regular justify-center w-full">
                    <p className="animate-slidein opacity-0 [--slidein-delay:3000ms] w-full max-md:w-[80%]">
                        Solve hard startup questions by collaborating with peers and tracking your journey, so that you can build with confidence
                    </p> 
                </div>
            </section>
        </section>
        <section id="Column 2" className="flex flex-col justify-between items-end flex-grow">
            <section className="flex justify-between flex-col space-y-[64px] w-[500px] max-md:w-full h-full max-md:space-y-[24px]">
                <img loading="lazy"
                src="static/rocket-man.svg"
                alt="Visual representation of startup community"
                className="self-center max-w-full aspect-square w-[420px] max-md:w-[180px]"
                />
                <div className="flex items-center justify-center w-full">
                    <RsvpSection />
                </div>
                
            </section>
        </section>
    </div>
}

/**
 * <section className="flex flex-col justify-center px-12 py-20 max-md:px-5">
        <section className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col justify-center self-start mt-16">
           
        </div>
        <aside className="flex flex-col justify-between py-12 max-md:max-w-full">
            <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfe266cfd301f4c704e41d45d59b3d5ca144f54846779e1ee6f7cbd8ea17d7f4?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&"
            alt="Visual representation of startup community"
            className="self-center max-w-full aspect-square w-[350px]"
            />
            <div className="flex gap-5 justify-center items-start self-center px-12 pt-3 mt-36 whitespace-nowrap rounded-lg bg-black bg-opacity-30 max-md:px-5 max-md:mt-10">
            <Timer label="WEEKS" time="02" />
            <Timer label="DAYS" time="04" />
            <Timer label="HOURS" time="04" />
            </div>
            <form className="justify-center items-start p-6 mt-9 text-lg font-light bg-white rounded-lg border-2 border-solid border-zinc-500 text-zinc-800 max-md:px-5 max-md:max-w-full">
            <label htmlFor="emailInput" className="sr-only">Enter your email</label>
            <input
                type="email"
                id="emailInput"
                className="w-full py-2 px-3 border rounded"
                placeholder="Enter your email"
                aria-label="Enter your email"
            />
            </form>
            <p className="mt-6 text-lg text-center text-stone-300 max-md:max-w-full">
            Join as an early builder to collaborate in development and receive exclusive benefits on launch day
            </p>
        </aside>
        </section>
    </section>
 */