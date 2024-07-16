export default function HeroCollage() {
    
    return (
        <div className="flex flex-row flex-wrap justify-center gap-[12px]"> 
            <div className="h-[256px] text-transparent relative">
                <img src="/meeting-1.jpeg" alt="Event-1" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-bold italic">&quot;When can we meet again?&quot; -Adi</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/event-2.jpeg" alt="Event-2" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;Yeah there are some really cool people here&quot; -Peter</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/meeting-2.jpeg" alt="Event-3" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;I&#39;ve been looking for this kind of group for a while now&quot; -Craig</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/meeting-3.jpeg" alt="Event-4" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;This meetup was worth skipping the webinars&quot; -Nikhil</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/event-3.jpeg" alt="Event-2" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;I usually develop solo, but I think I like the idea of meeting other devs now&quot; -Mark</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/CEO.jpeg" alt="Event-2" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;Let&#39;s keep in touch&quot; -CEO of NCL</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/event-5.jpeg" alt="Event-2" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;You need to have more meetups, I didn&#39;t know half these people&quot; -Kalin</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/studying.jpeg" alt="Event-2" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;I&#39;ll pull an all nighter if you guys will too&quot; -Alvaro</p>
                </div>
            </div>
            <div className="h-[256px] text-transparent relative">
                <img src="/meeting-4.jpeg" alt="Event-2" className="h-full w-full" />
                <div className="absolute flex bottom-0 right-0 w-full h-full text-center justify-center hover:text-black items-center hover:backdrop-blur-md hover:text-2xl">
                    <p className="text-parent font-semibold">&quot;When I&#39;m at home the whole day I wouldn&#39;t get half the things I just did in 2 hours&quot; - Alex</p>
                </div>
            </div>
        </div>
    );
}