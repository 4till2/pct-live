import { useRouter } from "next/router";
import md2html from "lib/md2html";
import { BlipList, BlipContent } from "components";
import { NextSeo } from "next-seo";
import Api from "../api/content";

const api = new Api("blips")

export default function Post({ allPosts, post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  return (
    <div className="flex w-full">
      <NextSeo
        title={`${post.content.slice(0, 10)} blip`}
        description={post.excerpt || post.content.slice(0, 200) || ""}
        openGraph={{
          site_name: `Blip- 4till2`,
          title: `${post.content.slice(0, 10)} - 4till2`,
          description: post.excerpt || post.content.slice(0, 200) || "",
        }}
        twitter={{
          handle: "@4till2",
          site: "@4till2",
          cardType: "summary_large_image",
        }}
      />
      <BlipList data={allPosts} activeSlug={post?.slug} />
      <BlipContent post={post} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const allPosts = api.getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "content",
    "link",
  ]);

  const post = api.getPostBySlug(params.slug, [
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
  const allPosts = api.getAllPosts([
    "title",
    "date",
    "slug",
    "image",
    "excerpt",
    "content",
  ]);
  const posts = api.getAllPosts(["slug"]);

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
