"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  EngineeringLoader,
} from "@/components/loading";


export default function NavigationLoader({

  children,

}: {

  children: React.ReactNode;

}) {


  const pathname =
    usePathname();


  const [
    loading,
    setLoading,
  ] = useState(false);


  /*
   * When Next.js completes client-side navigation,
   * pathname changes. Reset the navigation loader
   * asynchronously after the navigation render.
   */
  useEffect(() => {

    const timer =
      window.setTimeout(() => {

        setLoading(false);

      }, 0);


    return () => {

      window.clearTimeout(timer);

    };

  }, [
    pathname,
  ]);


  /*
   * Detect internal navigation clicks.
   */
  useEffect(() => {


    function handleClick(
      event: MouseEvent
    ) {


      const target =
        event.target as HTMLElement;


      const link =
        target.closest("a");


      if (!link) {
        return;
      }


      const href =
        link.getAttribute("href");


      if (!href) {
        return;
      }


      /*
       * Ignore:
       * - hash links
       * - external links
       * - mail links
       * - telephone links
       * - links to the current page
       */
      if (
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href === pathname
      ) {

        return;
      }


      /*
       * Only show the loader for internal
       * application navigation.
       */
      if (
        href.startsWith("/")
      ) {

        setLoading(true);

      }

    }


    document.addEventListener(
      "click",
      handleClick
    );


    return () => {

      document.removeEventListener(
        "click",
        handleClick
      );

    };


  }, [
    pathname,
  ]);


  return (

    <>

      {
        loading && (
          <EngineeringLoader />
        )
      }


      {children}

    </>

  );

}
