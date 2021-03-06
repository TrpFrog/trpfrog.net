import React, {CSSProperties, useState} from "react";
import styles from "../../styles/blog/BlogImage.module.scss";
import Image from "next/image";
import Modal from "react-modal";
import {getPureCloudinaryPath, parseInlineMarkdown} from "./BlogMarkdown";
import {BlogImageData} from "../../lib/blog/imagePropsFetcher";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

type BlogImageProps = {
    src: string,
    alt: string,
    imageData?: BlogImageData
    style?: CSSProperties
}

export const ImageCaption = ({children}: {children: React.ReactNode}) => (
    <figcaption className={styles.caption}>
        {children}
    </figcaption>
)

const BlogImage = ({src, alt, imageData, style}: BlogImageProps) => {

    if (!imageData) {
        imageData = {
            caption: '',
            size: {
                width: 1200,
                height: 900
            }
        }
    }

    const srcPath = getPureCloudinaryPath(src)
    const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`

    let caption = imageData.caption ?? ''
    let takenBy: string | undefined

    const takenByIdentifier = 'taken-by:'
    if (caption.includes(takenByIdentifier)) {
        [caption, takenBy] = caption.split(takenByIdentifier).map(e => e.trim())
    }

    let imageWidth = imageData.size?.width ?? 1200
    let imageHeight = imageData.size?.height ?? 900

    const maxHeight = 600;
    if (imageHeight > maxHeight) {
        imageWidth = imageWidth / imageHeight * maxHeight
        imageHeight = maxHeight
    }

    const modalStyle = {
        overlay: {
            position: 'fixed',
            background: 'rgba(0,0,0,.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        } as CSSProperties,
        content: {
            position: 'static',
            width: `min(calc(80vh * ${imageWidth / imageHeight}), 95vw)`,
            height: `min(calc(95vw * ${imageHeight / imageWidth}), 80vh)`,
            padding: 0,
            background: 'transparent',
            border: 'none',
            zIndex: 10,
        } as CSSProperties
    }

    const [modalState, setModalState] = useState(false)
    return (
        <>
            <figure className={styles.img_wrapper} style={style}>
                {takenBy &&
                    <div className={styles.taken_by} style={{width: imageWidth}}>
                        <small>
                            <FontAwesomeIcon icon={faCamera}/>{' '}
                            ??????: {parseInlineMarkdown(takenBy)}
                        </small>
                    </div>
                }
                <Image
                    src={srcPath}
                    alt={alt || src}
                    className={`rich_image ${styles.image}`}
                    width={imageWidth}
                    height={imageHeight}
                    quality={50}
                    placeholder="blur"
                    blurDataURL={blurPath}
                    objectFit="contain"
                    onClick={() => setModalState(true)}
                />
                {caption &&
                    <ImageCaption>
                        {parseInlineMarkdown(caption)}
                    </ImageCaption>
                }
            </figure>
            <Modal
                isOpen={modalState}
                style={modalStyle}
                onRequestClose={() => setModalState(false)}
            >
                <Image
                    src={srcPath}
                    alt={alt || src}
                    className={`rich_image`}
                    width={imageWidth}
                    height={imageHeight}
                    placeholder="blur"
                    blurDataURL={blurPath}
                    layout='responsive'
                />
            </Modal>
        </>
    )
}

export default BlogImage
