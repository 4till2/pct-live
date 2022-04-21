import { useRouter } from "next/router";
import { LogList, LogContent } from "components";
import { NextSeo } from "next-seo";
import { getAllPosts, getPostBySlug } from "pages/api/logs";
import md2html from "lib/md2html";

export default function Post({ allPosts, post }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  return (
    <div className="flex w-full">
      <NextSeo
        title={`${post.title} - 4till2`}
        description={
          post.content.slice(0, 200)?.replace(/<[^>]*>?/gm, "") || ""
        }
        openGraph={{
          site_name: `${post.title} - 4till2`,
          title: `${post.title} - 4till2`,
          description:
            post.content.slice(0, 200)?.replace(/<[^>]*>?/gm, "") || "",
        }}
        twitter={{
          handle: "@4till2",
          site: "@4till2",
          cardType: "summary_large_image",
        }}
      />
      <LogList allPosts={allPosts} activeSlug={post?.slug} />
      <LogContent post={post} />
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
    "icon",
  ]);

  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "image",
    "content",
    "excerpt",
    "link",
    "tech",
    "web",
    "ios",
    "icon",
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
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
