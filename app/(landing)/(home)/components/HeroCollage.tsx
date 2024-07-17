export default function HeroCollage() {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <div id="collage-title" className="flex flex-col justify-center items-center text-center p-[24px] px-[48px] rounded-[24px] bg-secondary1 w-fit">
                <p className="text-white text-5xl max-lg:text-2xl font-bold">Convenient Connections</p>
                <p className="text-white text-xl max-lg:text-md font-semibold">Skip the anxiety of meeting strangers</p>
            </div>
            <div className="columns-2 lg:columns-3 mt-[12px]">
                {[
                    {src: "/meeting-1.jpeg", alt: "Event-1", text: "When is the next meet? -Adi"},
                    {src: "/meeting-3.jpeg", alt: "Event-4", text: "This meetup was worth skipping the webinars -Nikhil"},
                    {src: "/event-3.jpeg", alt: "Event-2", text: "I usually develop solo, but this convinced me to meet other devs -Matt"},
                    {src: "/event-5.jpeg", alt: "Event-2", text: "You need to have more meetups, I didn't know half these people -Kalin"},
                    {src: "/studying.jpeg", alt: "Event-2", text: "I'll pull an all nighter if you guys will too -Alvaro"},
                    {src: "/meeting-4.jpeg", alt: "Event-2", text: "I wouldn't get as much done if I stayed home -Alex"},
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
            
        </div>
    );
}
