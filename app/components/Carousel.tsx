"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Inter } from "next/font/google";
import useMeasure from "react-use-measure";
import { clipPath } from "motion/react-client";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

type CarouselItemType = {
  title: string;
  artist: string;
  img: string;
};

const DATA: CarouselItemType[] = [
  {
    title: "Smiley Smile",
    artist: "The Beach Boys",
    img: "/albumArt/smileysmile.jpg",
  },
  {
    title: "Help!",
    artist: "The Beatles",
    img: "/albumArt/help.jpg",
  },
  {
    artist: "Cuco",
    title: "Para Mi",
    img: "/albumArt/parami.jpg",
  },
  {
    artist: "Joji",
    title: "BALLADS 1",
    img: "/albumArt/ballads.jpg",
  },
  {
    title: "Team Baby",
    artist: "The Black Skirts",
    img: "/albumArt/teambaby.jpg",
  },
  {
    artist: "Her's",
    title: "Songs of Her's",
    img: "/albumArt/songsofhers.jpg",
  },
  {
    title: "Looking Out for You",
    artist: "Joy Again",
    img: "/albumArt/lookingoutforyou.jpg",
  },
  {
    title: "That'll Be the Day",
    artist: "Buddy Holly",
    img: "/albumArt/thatllbetheday.jpg",
  },
];

export default function Carousel() {
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState<Array<CarouselItemType>>(DATA);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const variants = {
    enter: (direction: number) => ({
      rotateY: 35 * 2 * direction * -1,
      opacity: 0,
      scale: 0.6,
      x: `${150 * direction}%`,
    }),
    exit: (direction: number) => ({
      rotateY: 35 * 2 * direction,
      opacity: 0,
      scale: 0.6,
      x: `${150 * direction * -1}%`,
    }),
    idleLeft: {
      rotateY: 35,
      scale: 0.8,
      opacity: 0.65,
      x: "-100%",
    },
    idleCenter: {
      rotateY: 0,
      scale: 1,
      x: 0,
      opacity: 1,
    },
    idleRight: {
      rotateY: -35,
      scale: 0.8,
      opacity: 0.65,
      x: "100%",
    },
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 500);
  //     });
  //     setData(DATA);
  //     setLoading(false);
  //   };

  //   getData();
  // }, []);

  const getIndex = (offset: number) => {
    return (activeSlide + data.length + offset) % data.length;
  };

  return (
    <div className="flex h-lvh w-full items-center justify-center overflow-x-clip bg-neutral-900">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3 sm:mb-2">
          <h1
            className={`bg-linear-to-b from-white to-neutral-200 to-100% bg-clip-text text-5xl font-medium tracking-tighter text-transparent ${inter.className} `}
          >
            Recent Albums
          </h1>
          <p className="text-sm text-neutral-300">
            Some of the music, that Ive been enjoying lately
          </p>
        </div>
        <div className="track mx-auto w-fit">
          <div className="grid origin-center grid-cols-1 grid-rows-1 gap-8 perspective-distant transform-3d">
            <MotionConfig
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            >
              <AnimatePresence
                mode="popLayout"
                custom={direction}
                initial={false}
              >
                <motion.button
                  onClick={() => {
                    setDirection(-1);
                    if (activeSlide <= 0) {
                      setActiveSlide(data.length - 1);
                      return;
                    }
                    setActiveSlide(activeSlide - 1);
                  }}
                  whileHover={{ y: "-2%" }}
                  whileTap={{ scale: 0.77 }}
                  key={data[getIndex(-1)].title}
                  className="col-start-1 row-start-1 inline-block h-fit w-fit cursor-pointer will-change-transform"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="idleLeft"
                  exit="exit"
                >
                  <CarouselItem data={data[getIndex(-1)]}></CarouselItem>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ y: "-2%", scale: 1.03 }}
                  variants={variants}
                  custom={direction}
                  animate="idleCenter"
                  key={data[getIndex(0)].title}
                  className="col-start-1 row-start-1 inline-block h-fit w-fit cursor-pointer will-change-transform"
                >
                  <CarouselItem active data={data[getIndex(0)]}></CarouselItem>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setDirection(1);
                    if (activeSlide >= data.length - 1) {
                      setActiveSlide(0);
                      return;
                    }
                    setActiveSlide(activeSlide + 1);
                  }}
                  whileTap={{ scale: 0.77 }}
                  whileHover={{ y: "-2%" }}
                  key={data[getIndex(+1)].title}
                  custom={direction}
                  className="col-start-1 row-start-1 inline-block h-fit w-fit cursor-pointer will-change-transform"
                  variants={variants}
                  initial="enter"
                  animate="idleRight"
                  exit="exit"
                >
                  <CarouselItem data={data[getIndex(+1)]}></CarouselItem>
                </motion.button>
              </AnimatePresence>
            </MotionConfig>
          </div>
        </div>
        <motion.div
          animate={{ width: bounds.width }}
          className="nav__wrapper inset-shadow-depth-1 relative origin-center overflow-hidden rounded-xl border-2 border-white/10 bg-neutral-800"
        >
          <div className="gradient pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 to-white/0 to-70% text-center"></div>
          <motion.nav
            ref={ref}
            className="slideNav w-max origin-center flex-col items-center justify-center px-6 py-2 text-center"
          >
            <motion.p className="text-sm text-nowrap text-neutral-400">
              <PresenceText delay={0.065} direction={direction}>
                {data[activeSlide].artist}
              </PresenceText>
            </motion.p>
            <motion.h2 className="font-medium text-nowrap">
              <PresenceText direction={direction}>
                {data[activeSlide].title}
              </PresenceText>
            </motion.h2>
            <motion.div className="mx-auto w-fit">
              <motion.p
                className="mx-auto inline-block w-full text-sm text-neutral-400"
                layout
              >
                <Number direction={direction} value={activeSlide + 1}></Number>{" "}
                of {data.length}
              </motion.p>
            </motion.div>
          </motion.nav>
        </motion.div>
      </div>
    </div>
  );
}

function PresenceText({
  direction = 1,
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  direction: number;
  delay?: number;
}) {
  const variants = {
    enter: (direction: number) => ({
      y: `${100 * direction}%`,
      size: 0.8,
      opacity: 0,
      filter: "blur(2px)",
      clipPath: "inset(0% 0% 100% 0%)",
    }),
    exit: (direction: number) => ({
      y: `${-100 * direction}%`,
      size: 0.8,
      opacity: 0,
      filter: "blur(2px)",
      clipPath: "inset(100% 0% 0% 0%)",
    }),
    idle: {
      y: "0%",
      size: 1,
      opacity: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
    },
  };
  return (
    <AnimatePresence custom={direction} mode="popLayout" initial={false}>
      <motion.span
        transition={{ type: "spring", bounce: 0, duration: 0.3, delay: delay }}
        variants={variants}
        initial="enter"
        exit={"exit"}
        animate="idle"
        custom={direction}
        className="inline-block"
        key={children as string}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

function Number({
  value = 0,
  direction = 1,
}: {
  value: number;
  direction: number;
}) {
  const variants = {
    enter: (direction: number) => ({
      y: `${100 * direction}%`,
      opacity: 0,
      filter: "blur(2px)",
      size: 0.8,
    }),
    exit: (direction: number) => ({
      y: `${-100 * direction}%`,
      opacity: 0,
      filter: "blur(2px)",
      size: 0.8,
    }),
    idle: { y: "0%", opacity: 1, filter: "blur(0px)", size: 1 },
  };
  return (
    <AnimatePresence custom={direction} mode="popLayout" initial={false}>
      <motion.span
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        variants={variants}
        initial="enter"
        exit={"exit"}
        animate="idle"
        custom={direction}
        className="inline-block"
        key={value}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function CarouselItem({
  data,
  active = false,
}: {
  data: CarouselItemType;
  active?: boolean;
}) {
  return (
    <article className="relative aspect-square w-[80vw] overflow-clip rounded-md border border-black/30 inset-shadow-sm inset-shadow-black/30 select-none sm:size-72">
      <Image
        loading="eager"
        src={data.img}
        alt={data.title}
        className="h-full w-full object-cover select-none"
        width={500}
        height={500}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-white/20 to-white/0 to-40%"
      ></motion.div>
    </article>
  );
}
