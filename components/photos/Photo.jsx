import Image from 'next/image'
import ReactModal from 'react-modal';
import {useState} from "react";
import {useTheme} from "next-themes";


const FULL_REQUEST_SIZE = '=w2048-h1024' // Takes longer to load but highest quality

const Photo = ({src, description, width, height}) => {
    const [isOpen, setIsOpen] = useState(false)
    const {theme} = useTheme()
    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    let backgroundColor = theme == 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
    return (
        <div className='cursor-pointer'>
            <Image
                onClick={toggleModal}
                src={src}
                width={width || 100}
                height={height || 100}
                alt={description}
            />
            {description && <p className='line-clamp-1 text-xs'>{description}</p>}
            <ReactModal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                shouldCloseOnEsc={true}
                style={{
                    overlay: {
                        backgroundColor: backgroundColor
                    },
                    content: {
                        background: backgroundColor,
                    }
                }}
                contentElement={
                    () => <div className="p-4 rounded bg-white">
                        <Image
                            src={src + FULL_REQUEST_SIZE}
                            layout='fill'
                            alt={description}
                            objectFit={'contain'}
                        />
                        {/*TODO: Description style*/}
                        {description && <p className='p-4 mx-auto'>{description}</p>}

                    </div>}
            >
            </ReactModal>
        </div>
    );
};

export default Photo;
