import Image from 'next/image'

const Photo = ({src, description, width, height}) => {
    return (
        <div>
            <Image
                src={src}
                width={width || 100}
                height={height || 100}
                // layout='responsive'
                alt={description}
                // objectFit={'contain'}
            />
            {description && <p>{description}</p>}
        </div>
    )
        ;
};

export default Photo;
