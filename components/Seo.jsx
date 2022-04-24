import {NextSeo} from "next-seo";

const Seo = ({title, description}) => {
    return (<NextSeo
        title={title || '*'}
        description={description || '*'}
        openGraph={{
            site_name: "4till2",
            title: title || '*',
            description: description || '*',
        }}
        twitter={{
            handle: "@4till2",
            site: "@4till2",
            cardType: "summary_large_image",
        }}
    />)
}

export default Seo
