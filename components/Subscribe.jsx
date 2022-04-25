import React, {createRef} from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
    "https://4till2.us14.list-manage.com/subscribe/post?u=b0ad7ee707be27045cd79c23f&amp;id=7fc2a0e5e3";

const Subscribe = ({buttonText, keepLeft}) => {
    const emailRef = createRef(undefined);

    return (
        <div className="px-4">
            <MailchimpSubscribe
                url={url}
                render={({subscribe, status, message}) => {
                    switch (status) {
                        case "sending":
                            return <div>Sending...</div>;
                        case "success":
                            return <div>Awesome, you're subscribed!</div>;
                        case "error":

                        default:
                            return (
                                <>
                                    {status === 'error' && <p className="text-red-500 text-sm">Yikes! Did you enter a valid email?</p>}
                                    <form
                                        className="flex-none  sm:flex-1 md:flex-auto lg:flex-initial xl:flex-1"
                                        onSubmit={() => {
                                            event.preventDefault();

                                            subscribe({
                                                EMAIL: emailRef.current.value,
                                            });
                                        }}
                                    >
                                        <div className="mt-4">
                                            <div
                                                className={`${keepLeft} mx-auto max-w-lg sm:flex sm:overflow-hidden`}
                                            >
                                                <input
                                                    id="email-input"
                                                    placeholder="Enter email"
                                                    ref={emailRef}
                                                    type="email"
                                                    name="email"
                                                    className="w-full p-2 bg-transparent text-center rounded-md  outline-none
                      appearance-none"
                                                ></input>
                                                <button
                                                    className="items-center w-full px-4 py-2
                      transition-all duration-150 ease-in-out rounded-md
                       bg-gray-700 text-white
                      dark:bg-gray-400 dark:text-black"
                                                    type="submit"
                                                    value="subscribe"
                                                >
                                                    {buttonText}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            );
                    }
                }}
            />
        </div>
    );
};

export default Subscribe;
