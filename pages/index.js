import Head from "next/head";
import Link from "next/link";
import Newsletter from "components/Newsletter";

export default function Home() {
  return (
    <>
      <article className="w-full px-10 py-10 mb-20 overflow-y-auto max-w-[620px] mx-auto">
        <div className="flex items-start justify-center w-full mb-10 overflow-hidden rounded-lg max-h-[500px]">
        </div>
        {/*md:text-5xl*/}
        <h2 className="mt-12 mb-6 text-8xl font-black ">
          <span className="text-gray-400">*</span>
        </h2>
        <div className="post-content">
          <p className="text-lg text-gray-500">
          </p>
        </div>
        {/*<div className="mt-8 mb-8 text-gray-200 text-center">*/}
        {/*  ________________________________*/}
        {/*</div>*/}
        {/*<Newsletter />*/}
      </article>
    </>
  );
}
