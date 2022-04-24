import {useRouter} from "next/router";
import {LogContent, LogList} from "components";
import Api from "../api/content";
import md2html from "lib/md2html";
import Seo from "../../components/Seo";

const api = new Api("logs")

export default function Post({allPosts, post}) {
    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return <div>Error</div>;
    }

    return (
        <div className="flex w-full">
            <Seo title={`${post.title} - 4till2`}
                 description={
                     post.content.slice(0, 200)?.replace(/<[^>]*>?/gm, "") || ""
                 }/>
            <LogList allPosts={allPosts} activeSlug={post?.slug}/>
            <LogContent post={post}/>
        </div>
    );
}

export async function getStaticProps({params}) {
    const allPosts = api.getAllPosts([
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

    const post = api.getPostBySlug(params.slug, [
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
    const posts = api.getAllPosts(["slug"]);

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
