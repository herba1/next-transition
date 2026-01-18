'use client'
import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PageTransitionContextType = {
  exitDuration: number;
  enterDuration: number;
  isLeaving: boolean;
  isEntering: boolean;
  isPending: boolean;
  isReady: boolean;
  setIsLeaving: (isLeaving: boolean) => void;
  setIsEntering: (isEntering: boolean) => void;
  setIsPending: (isPending: boolean) => void;
  setIsReady: (isReady: boolean) => void;
  signalReady: () => void;
  navigate: (route: string) => Promise<void>;
};

type PageTransitionProviderProps = {
  children?: React.ReactNode;
  enterDuration?: number;
  exitDuration?: number;
};

const PageTransitionContext = createContext<
  PageTransitionContextType | undefined
>(undefined);

export function PageTransitionProvider({
  children,
  enterDuration = 300, //ms
  exitDuration = 300, //ms
}: PageTransitionProviderProps) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(true);
  const pathname = usePathname();

  const signalResolveRes = useRef<((value: void) => void) | null>(null);

  const signalReady = () => {
    if (signalResolveRes.current) {
      signalResolveRes.current();
      signalResolveRes.current = null;
    }
  };

  const waitForSignal = () => {
    return new Promise((resolve) => {
      signalResolveRes.current = resolve;
    });
  };

  const navigate = async (route: string): Promise<void> => {
    if (isLeaving || isEntering || isPending || pathname === route) return; // prevent multiple navigations
    setIsLeaving(true);
    setIsReady(false);
    console.log("isLeaving start");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("isLeaving end");
      }, exitDuration);
    });
    console.log("isLeaving end");
    setIsLeaving(false);

    // navigate
    console.log("Navigating to:", route);
    router.push(route);

    // wait for new page to mount
    console.log("isPending start");
    setIsPending(true);
    await waitForSignal();
    setIsPending(false);
    console.log("isPending end");

    setIsEntering(true);
    console.log("isEntering start");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("isEntering end");
      }, enterDuration);
    });
    console.log("isEntering end");
    setIsEntering(false);
    console.log("Page ready");
    setIsReady(true);
  };

  const values: PageTransitionContextType = {
    isLeaving,
    isEntering,
    isPending,
    setIsLeaving,
    setIsEntering,
    setIsPending,
    enterDuration,
    exitDuration,
    isReady,
    setIsReady,
    signalReady,
    navigate,
  };
  return (
    <PageTransitionContext value={values}>{children}</PageTransitionContext>
  );
}

// Hook to use the PageTransition context
export function usePageTransition(): PageTransitionContextType {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return context;
}

// Hook to signal that the page is ready (to be called in page components)
// export function useTransitionReady() {
//   const { signalReady } = usePageTransition();

//   // run on mount
//   useEffect(() => {
//     signalReady();
//   }, []);
//   return null;
// }


export function TransitionSignaler() {
  'use client'
  const { signalReady } = usePageTransition();

  // run on mount
  useEffect(() => {
    signalReady();
  }, []);
  return <></>;
}

export function TransitionLink({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
