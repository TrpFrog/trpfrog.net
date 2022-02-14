import type {NextPage} from 'next'
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import {useState} from "react";
import styles from "../styles/uec-review.module.scss"
import client from "../lib/microCMS";
import Timetable from "../components/uec-review/Timetable";

export type LectureData = {
    semester: number
    lectureName: string
    teacher: string
    type: string
    dow: string
    period: number
    length?: number
    review?: string
}

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "uec-review" });

    const tables: LectureData[][] = Array(6)
    for (let i = 0; i < tables.length; i++) {
        tables[i] = []
    }
    for await (const x of data.contents) {
        tables[x.semester - 1].push(x)
    }

    return {
        props: {
            tables
        },
    };
};



type PageProps = {
    tables: LectureData[][]
}

const Review: NextPage<PageProps> = ({tables}) => {
    const [semester, setSemester] = useState(0)

    const timetableTitle = [
        '1学期 (8クラス)',
        '2学期 (8クラス, I類3クラス)',
        '3学期 (I類3クラス)',
        '4学期 (I類3クラス, メディア)',
        '5学期 (I類メディア)',
        '6学期 (I類メディア)',
    ]

    return (
        <Layout>
            <Title
                title={'#uec_review'}
                description={'授業の感想とか (ツイッタに貼るのは若干恥ずかしいのでやめた)'}
            >
            </Title>

            <div id={styles.buttons} style={{gridTemplateColumns: `repeat(${timetableTitle.length}, 1fr)`}}>
                {timetableTitle.map((e, i) => (
                    <div
                        key={'button-' + i}
                        onClick={() => setSemester(i)}
                        className={'linkButton'}
                    >
                        {e[0]}<span className={styles.pc_only}>{e.split(' ')[0].slice(1)}</span>
                    </div>
                ))}
            </div>

            <Block title={timetableTitle[semester]} h2icon={'trpfrog'}>
                <div>
                    <Timetable table={tables[semester]}/>
                </div>
            </Block>
        </Layout>
    )
}

export default Review
