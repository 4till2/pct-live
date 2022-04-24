import WordList from "../../components/words/wordList";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("words")

export default function Words({allPosts}) {
    return (
        <>
            <Seo title={'Words by Yosef'} description={'Words written by Yosef'}/>
            <WordList data={allPosts}/>
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
        props: {allPosts},
    };
}
