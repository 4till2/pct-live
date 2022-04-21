import { WordsList } from "components";
import { getAllPosts } from "pages/api/words";
import { NextSeo } from "next-seo";

export default function Words({ allPosts }) {
  return (
    <>
      <NextSeo
        title="Words - 4till2"
        description="*"
        openGraph={{
          site_name: "Words - 4till2",
          title: "Words - 4till2",
          description:
            "*",
        }}
        twitter={{
          handle: "@4till2",
          site: "@4till2",
          cardType: "summary_large_image",
        }}
      />

      <WordsList data={allPosts} />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "external",
  ]);

  return {
    props: { allPosts },
  };
}
