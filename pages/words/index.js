import WordList from "../../components/words/wordList";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("words")

export default function Words({allData}) {
    return (
        <>
            <Seo title={'Words by Yosef'} description={'Words written by Yosef'}/>
            <WordList data={allData}/>
        </>
    );
}

export async function getStaticProps() {
    const allData = api.getAllData([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "external",
    ]);

    return {
        props: {allData},
    };
}
