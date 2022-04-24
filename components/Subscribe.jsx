import React, {createRef} from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
    "https://tinyletter.com/4till2";

const Subscribe = ({buttonText, keepLeft}) => {
    const emailRef = createRef(undefined);

    return (
        <MailchimpSubscribe
            url={url}
            render={({subscribe, status, message}) => {
                switch (status) {
                    case "sending":
                        return <div>Sending...</div>;
                    case "success":
                        return <div>Awesome, you're subscribed!</div>;
                    case "error":
                        return <div dangerouslySetInnerHTML={{__html: message}}/>;
                    default:
                        return (

                            <form
                                className="flex-none sm:flex-1 md:flex-auto lg:flex-initial xl:flex-1"
                                action="https://tinyletter.com/4till2" method="data" target="popupwindow"
                                onSubmit={() => {
                                    window.open('https://tinyletter.com/4till2', 'popupwindow', 'scrollbars=yes,width=800,height=600');
                                    return true
                                }}
                            >
                                <div className="">
                                    <div
                                        className={`${keepLeft} mx-auto max-w-lg sm:flex sm:overflow-hidden`}
                                    >
                                    {/*    <input*/}
                                    {/*        id="email-input"*/}
                                    {/*        placeholder="me@email.com"*/}
                                    {/*        ref={emailRef}*/}
                                    {/*        type="email"*/}
                                    {/*        name="email"*/}
                                    {/*        className="mb-4 w-full bg-transparent dark:bg-[#111] outline-none*/}
                                    {/*appearance-none"*/}
                                    {/*    ></input>*/}
                                        <button
                                            className="items-center w-full px-4 py-[5px] mb-2
                      transition-all duration-150 ease-in-out rounded-lg 
                       bg-black text-white
                      dark:bg-white dark:text-black"
                                            type="submit"
                                            value="subscribe"
                                        >
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        );
                }
            }
            }
        />
    )
        ;
};

export default Subscribe;
