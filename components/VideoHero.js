import { useEffect } from "react";

export default function VideoHero({ data }) {
  useEffect(() => {
    const video = document.getElementById("myVideo");

    document.body.addEventListener("touchstart", () => {
      if (
        !(
          video.currentTime > 0 &&
          !video.paused &&
          !video.ended &&
          video.readyState > 2
        )
      ) {
        video.play();
      }
    });
    return () => {
      document.body.removeEventListener("touchstart", () => {
        if (
          !(
            video.currentTime > 0 &&
            !video.paused &&
            !video.ended &&
            video.readyState > 2
          )
        ) {
          video.play();
        }
      });
    };
  }, []);
  return (
    <section className="aspect-[0.83333333] md:aspect-[2.327] w-screen fixed z-[-1] top-0">
      <img
        src={data.heroVideo.placeholder}
        alt="video"
        className="absolute inset-0 object-cover h-full pointer-events-none"
      />
      <video
        preload="none"
        loop
        muted
        playsInline
        autoPlay
        id="myVideo"
        poster={data.heroVideo.placeholder}
        src={data.heroVideo.video}
        className="relative object-cover w-full h-full pointer-events-none"
      />
    </section>
  );
}
