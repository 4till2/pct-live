import { NextSeo } from "next-seo";
import WordList from "../../components/words/wordList";
import Api from "../api/apiClass";

const api = new Api("data/words")

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

      <WordList data={allPosts} />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = api.getAllPosts([
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
