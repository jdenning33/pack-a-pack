import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from './error-boundary';

export function ImageWithFallback({
    src,
    fallbackSrc = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    alt,
    ...rest
}: {
    src: string;
    fallbackSrc?: string;
    alt: string;
} & React.ComponentProps<typeof Image>) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <ErrorBoundary
            fallback={<Image alt={alt} {...rest} src={fallbackSrc} />}
        >
            <Image
                alt={alt}
                {...rest}
                src={imgSrc || fallbackSrc}
                onLoad={(event) => {
                    const target = event.target as HTMLImageElement;
                    if (target.src.indexOf(fallbackSrc) !== -1) {
                        return;
                    }
                    if (target.naturalWidth === 0) {
                        // Broken image
                        setImgSrc(fallbackSrc);
                    }
                }}
                onError={() => {
                    setImgSrc(fallbackSrc);
                }}
            />
        </ErrorBoundary>
    );
}
