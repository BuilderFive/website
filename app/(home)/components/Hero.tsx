import { RsvpSection } from "./RsvpSection";

export default function Hero() {

    return <div id="Hero" className="container mx-auto w-full flex flex-wrap h-min-screen justify-between max-md:items-center pt-[64px] max-md:pt-[42px]">
        <section id="Column 1" className="flex flex-col items-start h-full max-w-full flex-grow">
            <section className="flex-col space-y-[24px] w-[500px] max-md:w-full justify-center text-center">
                <h1 className="text-6xl font-bold text-white max-md:max-w-full max-md:text-4xl">
                    Join Startup Masterminds
                </h1>
                <p className="text-2xl text-text5 max-md:text-lg">
                    Collaborate in week-long peer groups of founders with our social networking app that helps you grow your idea into a product
                </p>
            </section>
        </section>
        <section id="Column 2" className="flex flex-col items-end h-full max-w-full flex-grow">
            <section className="flex justify-between flex-col space-y-[24px] w-[500px] max-md:w-full">
                <img loading="lazy"
                src="static/rocket-man.svg"
                alt="Visual representation of startup community"
                className="self-center max-w-full aspect-square w-[420px]"
                />
                <RsvpSection />
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