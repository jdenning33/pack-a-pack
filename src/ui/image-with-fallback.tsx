import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from './error-boundary';

export function ImageWithFallback({
    src,
    fallbackSrc = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    ...rest
}: {
    src: string;
    fallbackSrc?: string;
} & React.ComponentProps<typeof Image>) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <ErrorBoundary fallback={<Image {...rest} src={fallbackSrc} />}>
            <Image
                {...rest}
                src={imgSrc || fallbackSrc}
                onLoadingComplete={(result) => {
                    if (result.naturalWidth === 0) {
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
