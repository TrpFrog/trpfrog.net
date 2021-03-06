import styles from "../../styles/blog/Tag.module.scss";
import React from "react";
import Link from "next/link";

const getTagEmoji = (tag: string) => {
    switch (tag) {
        case 'γγ©γ': return 'πΎ'
        case 'γ€γΎγΏγγγ': return 'π’'
        case 'γͺγΏγ―': return 'π€'
        case 'ε€§ε­¦': return 'π'
        case 'εΎζ­©': return 'πΆβ'
        case 'ζθ‘': return 'π»'
        case 'ζ₯θ¨': return 'π'
        case 'ζε ±': return 'π'
        case 'ζ°ε­¦': return 'π'
        case 'γεΊγγ': return 'π'
        case 'ι·η·¨θ¨δΊ': return 'π'
        default: return 'π·'
    }
}

export const getEmojiUrlFromTagName = (tag: string) => {
    const codePoint = getTagEmoji(tag).codePointAt(0)?.toString(16)
    return `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`
}


type Props = {
    tag: string
}

const Tag = ({tag}: Props) => {
    return (
        <Link href={'/blog/tags/' + tag} key={tag}>
            <a className={styles.block}>
                <span className={styles.emoji}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={getEmojiUrlFromTagName(tag)}
                        width={20}
                        height={20}
                        alt={'tag emoji'}
                    />
                </span>
                <span className={styles.name}>
                    {tag}
                </span>
            </a>
        </Link>
    )
}

export default Tag
