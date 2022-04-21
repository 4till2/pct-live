import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "pages/api/words";
import md2html from "lib/md2html";
import { WordsList, WordContent } from "components";
import { NextSeo } from "next-seo";
import Wo from "prettier/esm/parser-html.mjs";

export default function Post({ allPosts, post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  return (
    <div className="flex w-full">
      <NextSeo
        title={`${post.title} - 4till2`}
        description={post.excerpt || post.content.slice(0, 200) || ""}
        openGraph={{
          site_name: `${post.title} - 4till2`,
          title: `${post.title} - 4till2`,
          description: post.excerpt || post.content.slice(0, 200) || "",
        }}
        twitter={{
          handle: "@4till2",
          site: "@4till2",
          cardType: "summary_large_image",
        }}
      />
      <WordsList data={allPosts} activeSlug={post?.slug} />
      <WordContent post={post} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "content",
    "link",
  ]);

  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "image",
    "content",
    "excerpt",
    "link",
  ]);

  const content = await md2html(post.content || post.excerpt || "");

  return {
    props: {
      allPosts,
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "image",
    "excerpt",
    "content",
  ]);
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          allPosts,
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
