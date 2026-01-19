"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionConfig,
} from "motion/react";
import { animate } from "motion";
import useMeasure from "react-use-measure";
export default function Counter() {
  const [count, setCount] = useState(0);
  const [inputFocus, setInputFocus] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [state, setState] = useState<"button" | "expanded">("button");
  const [formState, setFormState] = useState<
    "idle" | "confirm" | "pending" | "success"
  >("idle");

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setFormState("pending");
  };

  useEffect(() => {
    if (input.current) {
      // setInputFocus(true);
      input.current.focus();
    }
  }, [state]);

  useEffect(() => {
    if (vibrate) {
      const timeout = setTimeout(() => {
        setVibrate(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [vibrate]);

  return (
    <article className="relative flex h-lvh w-full items-center justify-center px-4 perspective-distant transform-3d">
      <AnimatePresence mode="popLayout" initial={false}>
        {state === "button" && (
          <motion.div
            key={"button--CTA"}
            className="relative z-0"
            exit={{
              filter: "blur(2px)",
              opacity: 0,
              scale: 0.95,
              y: "-50%",
              rotateX: 45,
              transition: { duration: 0.1 },
            }}
            initial={{
              filter: "blur(2px)",
              opacity: 0,
              scale: 0.7,
              y: "0%",
              rotateX: 0,
            }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              y: "0%",
              rotateX: 0,
            }}
          >
            <Button
              onClick={() => {
                setState("expanded");
              }}
            >
              Support Me
            </Button>
          </motion.div>
        )}
        {state === "expanded" && (
          <motion.form
            exit={{
              filter: "blur(2px)",
              opacity: 0,
              scale: 0.8,
              y: "0%",
              rotateX: 0,
              transition: { duration: 0.1 },
            }}
            initial={{
              filter: "blur(2px)",
              opacity: 0,
              scale: 0.95,
              y: "10%",
              rotateX: -45,
            }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              y: "0%",
              rotateX: 0,
            }}
            key={"form"}
            onSubmit={handleSubmit}
            className="donation__form relative z-10 flex w-full max-w-sm flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-xl inset-shadow-[0px_0px_8px_rgba(0,0,0,0.1)]"
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black to-transparent to-50% opacity-5 select-none"></div>
            <label
              htmlFor="amount"
              className="inline-block bg-neutral-900 bg-clip-text text-center font-medium tracking-tight text-transparent sm:text-2xl"
            >
              Select an amount:
            </label>
            <motion.div
              className={`group relative flex h-fit w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 py-6 text-7xl text-neutral-900 inset-shadow-xs inset-shadow-black/30 outline-1 outline-black/10 will-change-transform sm:text-8xl`}
              animate={
                vibrate
                  ? {
                      x: [-4, 0],
                      transition: { type: "spring", duration: 1, bounce: 1 },
                    }
                  : {}
              }
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-white to-transparent to-80% opacity-10 select-none"></div>
              <input
                ref={input}
                id="amount"
                name="amount"
                value={count > 0 ? count : ""}
                type="text"
                inputMode="numeric"
                required
                disabled={formState === "confirm" || formState === "pending"}
                onChange={(e) => {
                  if (e.target.value.toString().length > 4) {
                    setVibrate(true);
                    return;
                  }
                  setCount(parseInt(e.target.value) || 0);
                }}
                onSelect={(e) => {
                  e.currentTarget.selectionStart = e.currentTarget.value.length;
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowRight")
                    e.preventDefault();
                  if (e.key === "Backspace" && !count) {
                    setVibrate(true);
                  }
                }}
                onFocus={() => {
                  setInputFocus(true);
                }}
                onBlur={() => {
                  setInputFocus(false);
                }}
                className="absolute inset-0 z-10 text-center opacity-0 select-none"
              ></input>
              <motion.span
                layout
                className="flex bg-linear-to-b from-green-400 to-green-500 bg-clip-text text-transparent"
              >
                $
              </motion.span>
              <motion.span className="relative flex min-h-lh">
                <AnimatePresence mode="popLayout" initial={false}>
                  {count === 0 ? (
                    <motion.span
                      key={"number-0"}
                      className="flex text-black"
                      layout
                      transition={{
                        type: "spring",
                        duration: 0.5,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        y: "0%",
                        opacity: 0.3,
                        scale: 1,
                      }}
                      initial={{
                        // y: "100%",
                        opacity: 0,
                        scale: 0.8,
                      }}
                    >
                      0
                    </motion.span>
                  ) : (
                    <motion.span
                      className=""
                      key={"number-active"}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.1 },
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.1 },
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.1 },
                      }}
                    >
                      <Number value={count}></Number>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <AnimatePresence mode="popLayout">
                {inputFocus && (
                  <motion.span
                    layout
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                    className="cursor relative h-lh w-2 overflow-hidden rounded-xs text-transparent"
                  >
                    <motion.span
                      animate={{
                        opacity: [1, 0],
                        scale: 1,
                        transition: {
                          duration: 0.8,
                          delay: 0.3,
                          repeat: Infinity,
                          type: "tween",
                          ease: "anticipate",
                        },
                      }}
                      key={`caret-${count}`}
                      className="absolute inset-0 bg-linear-to-b from-neutral-900/80 to-neutral-900 to-40%"
                    ></motion.span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <div className="flex w-full justify-between">
              <Button
                onClick={() => {
                  if (formState === "idle") {
                    setState("button");
                  } else if (formState === "confirm") {
                    setFormState("idle");
                  }
                }}
                className={`bg-gray-100 text-neutral-600!`}
                disabled={formState === "pending"}
                type="button"
              >
                Cancel
              </Button>
              <motion.div>
                <MotionConfig
                  transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
                >
                  <Button
                    className={` ${!count && "cursor-not-allowed"} ${formState === "pending" && "opacity-80"}`}
                    type="submit"
                    onClick={(e) => {
                      if (formState === "idle" && !count) {
                        if (!vibrate) setVibrate(true);
                      }
                      if (formState === "idle" && count) {
                        e.preventDefault();
                        setFormState("confirm");
                        return;
                      }
                      if (formState === "confirm") {
                        e.preventDefault();
                        setFormState("pending");
                      }
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {formState === "idle" && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            filter: "blur(2px)",
                          }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(2px)" }}
                          key={"send1"}
                          className="inline-block"
                          layout
                        >
                          Send
                        </motion.span>
                      )}
                      {formState === "confirm" && (
                        <motion.span
                          layout
                          initial={{
                            opacity: 0,
                            filter: "blur(2px)",
                          }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(2px)" }}
                          key={"send2"}
                          className="inline-block"
                        >
                          Are you sure?
                        </motion.span>
                      )}
                      {formState === "pending" && (
                        <motion.span
                          layout
                          initial={{
                            opacity: 0,
                            filter: "blur(2px)",
                          }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(2px)" }}
                          key={"send3"}
                          className="inline-block"
                        >
                          Sending...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </MotionConfig>
              </motion.div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </article>
  );
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  const [ref, bounds] = useMeasure({ offsetSize: true });
  const hasInitialized = bounds.width > 0;

  return (
    <motion.button
      {...props}
      animate={hasInitialized ? { width: bounds.width } : undefined}
      initial={false}
      whileHover={{
        transition: { duration: 0.2 },
        scale: 1.05,
      }}
      whileTap={{
        transition: { duration: 0.1 },
        scale: 0.95,
      }}
      className={`relative block overflow-clip rounded-xl border border-black/15 bg-blue-500 text-base font-medium text-white shadow-sm inset-shadow-sm shadow-black/20 inset-shadow-white/30 transition-shadow will-change-transform hover:shadow-black/15 ${className}`}
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          opacity: 0.3,
        }}
        className="absolute inset-0 bg-linear-to-b from-white to-white/0 to-50% opacity-15"
      ></motion.div>
      <motion.div className="absolute inset-0 bg-linear-to-t from-black to-transparent to-30% opacity-5"></motion.div>
      <div ref={ref} className="w-max px-6 py-2 text-nowrap">
        {children}
      </div>
    </motion.button>
  );
}

function Number({ value = 0 }: { value: number }) {
  let isNegative = false;
  if (value < 0) {
    value = value * -1;
    isNegative = true;
  }
  const digitString: string[] = value.toString().split("");
  const digitNum = digitString.map((digit) => {
    return parseFloat(digit);
  });
  return (
    <span className="flex">
      {isNegative && (
        <motion.span layout className="">
          -
        </motion.span>
      )}
      <AnimatePresence mode="popLayout">
        {digitNum.map((digitValue, index) => {
          return (
            <motion.span
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
              initial={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.1 },
              }}
              className="flex"
              key={index}
            >
              <Digit value={digitValue}></Digit>
            </motion.span>
          );
        })}
      </AnimatePresence>
    </span>
  );
}

function Digit({
  value = 8,
  className,
}: {
  value: number;
  className?: string;
}) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const activeDigit = value;

  return (
    <motion.span
      layout
      className={`window inline-block h-lh w-[1ch] place-content-center overflow-hidden ${className}`}
    >
      <motion.div
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.5,
        }}
        initial={{ y: `-${(activeDigit + 5) % 10}lh` }}
        animate={{ y: `-${activeDigit}lh` }}
        className="inline-grid w-full grid-rows-10"
      >
        {digits.map((digit) => {
          return (
            <span
              className="inline-block w-full bg-linear-to-b from-neutral-900/80 to-neutral-900 to-40% bg-clip-text text-center text-transparent"
              key={digit}
            >
              {digit}
            </span>
          );
        })}
      </motion.div>
    </motion.span>
  );
}
