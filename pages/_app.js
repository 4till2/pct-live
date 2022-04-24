import {ThemeProvider} from "next-themes";
import "styles/app.scss";
import "styles/words.scss";
import "styles/map.scss";

import MainLayout from "layouts/main";
import {DefaultSeo} from "next-seo";
import {useRouter} from "next/router";


function MyApp({Component, pageProps}) {
    const router = useRouter();
    const canonicalUrl = (
        `https://4till2.com` + (router.asPath === "/" ? "" : router.asPath)
    ).split("?")[0];

    return (
        <ThemeProvider defaultTheme="system" attribute="class" enableSystem={true}>
            <DefaultSeo
                title="4till2"
                description="*"
                canonical={canonicalUrl}
                openGraph={{
                    site_name: "4till2",
                    title: "4till2",
                    description: "*",
                    images: [
                        {
                            url: "4till2.com/public/touch-icons/android-chrome-192x192.png",
                            width: 800,
                            height: 600,
                            alt: "4till2",
                        },
                    ],
                }}
                twitter={{
                    handle: "@4till2",
                    site: "@4till2",
                    cardType: "summary_large_image",
                }}
                additionalLinkTags={[
                    {
                        rel: "apple-touch-icon",
                        href: "/touch-icons/apple-touch-icon",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "/touch-icons/apple-touch-icon",
                        sizes: "60x60",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "/touch-icons/apple-touch-icon",
                        sizes: "144x144",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "/touch-icons/apple-touch-icon",
                        sizes: "60x60",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "/touch-icons/apple-touch-icon",
                        sizes: "114x114",
                    },
                ]}
            />
            <div id="app" className="pb-12 lg:pb-0">
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </div>
        </ThemeProvider>
    );
}

export default MyApp;
