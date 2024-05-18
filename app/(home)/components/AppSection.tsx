export const AppSection: React.FC = () => (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                    <img src="/static/feat-app.png" alt="app hero" className="w-full h-full" />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-3xl/none">
                            &lt;app info blurb&gt;
                        </h1>
                        <div className="my-3">
                            <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe labore eos eum velit dolorem harum, molestias enim praesentium. Qui accusamus nobis ad illum voluptatibus aut nisi dignissimos laborum ab natus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)