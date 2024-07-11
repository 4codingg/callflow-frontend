import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

const GlobalLoading = () => {
  const { globalLoading } = useGlobalLoading();

  const { pathname } = useRouter();

  const globalLoadingIsAble = !["/", "/forgot-password", "/signup"].includes(
    pathname
  );

  return (
    globalLoading &&
    globalLoadingIsAble && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50">
        <span
          role="status"
          aria-label="Loading..."
          className={clsx(
            "w-5 h-5 border-4 rounded-full border-l-neutral-light-grey border-t-neutral-light-grey border-r-transparent border-b-transparent animate-spin"
          )}
        />
      </div>
    )
  );
};

export default GlobalLoading;
