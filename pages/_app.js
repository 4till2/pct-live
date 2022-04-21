import {ThemeProvider} from "next-themes";
import "styles/app.scss";
import "styles/words.scss";
import "styles/map.scss";

import MainLayout from "layouts/main";
import WithoutSidebar from "layouts/withoutSidebar";
import {DefaultSeo} from "next-seo";
import {useRouter} from "next/router";

// import { usePanelbear } from "@panelbear/panelbear-nextjs";

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const isExperimentPage = router.pathname.startsWith("/experiments");
    const canonicalUrl = (
        `https://4till2.com` + (router.asPath === "/" ? "" : router.asPath)
    ).split("?")[0];
    // usePanelbear("6qu0OcdJJF5");

    return (
        <ThemeProvider defaultTheme="system" attribute="class" enableSystem={true}>
            <DefaultSeo
                title="Hi, I'm 4till2!"
                description="Full stack developer at Citi & at home."
                canonical={canonicalUrl}
                openGraph={{
                    site_name: "Hi, I'm 4till2!",
                    title: "Hi, I'm 4till2!",
                    description: "Full stack developer at Citi & at home.",
                    images: [
                        {
                            url: "https://res.cloudinary.com/raskin-me/image/upload/v1647987393/raskin.me/images/meta_image_s5dfw1.jpg",
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
            {process.env.NODE_ENV == "production" ? (
                // Analytics Script
                // <Script
                //   src="https://api.pirsch.io/pirsch.js"
                //   id="pirschjs"
                //   data-code="YFl95gWLgCz8hOBq25GEf4vpJLdcCJlx"
                //   strategy="afterInteractive"
                // />
                ''
            ) : (
                ""
            )}
            <div id="app">
                {isExperimentPage ? (
                    <WithoutSidebar>
                        <Component {...pageProps} />
                    </WithoutSidebar>
                ) : (
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                )}
            </div>
        </ThemeProvider>
    );
}

export default MyApp;
