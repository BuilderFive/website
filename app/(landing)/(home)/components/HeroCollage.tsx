import { CtaButton } from "./CtaButton";

export default function HeroCollage() {
    return (
        <div className="flex flex-col items-center justify-center">
            
            <div className="columns-2 md:columns-3 mt-[64px]">
                {[
                    {src: "/meeting-1.jpeg", alt: "Event-1", text: "When can we meet again? -Adi"},
                    {src: "/meeting-3.jpeg", alt: "Event-4", text: "This meetup was worth skipping the webinars -Nikhil"},
                    {src: "/event-3.jpeg", alt: "Event-2", text: "I usually develop solo, but I think I like the idea of meeting other devs now -Mark"},
                    {src: "/event-5.jpeg", alt: "Event-2", text: "You need to have more meetups, I didn't know half these people -Kalin"},
                    {src: "/studying.jpeg", alt: "Event-2", text: "I'll pull an all nighter if you guys will too -Alvaro"},
                    {src: "/meeting-4.jpeg", alt: "Event-2", text: "When I'm at home I'm a lot less productive. I wouldn't get as much done as I did in the last 2 hours - Alex"},
                    {src: "/meeting-2.jpeg", alt: "Event-3", text: "I've been looking for this kind of group for a while now -Craig"},

                ].map((image, index) => (
                    <div key={index} className="mb-4 break-inside-avoid-column">
                        <div className="relative text-transparent">
                            <img src={image.src} alt={image.alt} className="object-contain rounded-[24px]" />
                            <div className="absolute flex rounded-[24px] bottom-0 right-0 w-full h-full text-center justify-center hover:text-white items-center hover:backdrop-blur-md hover:text-2xl">
                                <p className="text-parent font-semibold">{image.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="collage-title" className="flex flex-col md:gap-[12px] justify-center items-center text-center absolute top-0 p-[24px] px-[48px] rounded-[24px] bg-secondary1 w-fit">
                <p className="text-text1 text-7xl max-md:text-2xl font-bold">You're a click away</p>
                <p className="text-text1 text-3xl max-md:text-lg font-semibold">Be more productive and fulfilled</p>
            </div>
        </div>
    );
}
