import styles from "../../styles/uec-review.module.scss";
import {LectureData} from "../../pages/uec-review";
import {CSSProperties, useState} from "react";
import ReactModal from "react-modal";

const Lecture = ({ lect }: { lect: LectureData }) => {
    const [modalOpened, setModalOpened] = useState(false)

    const modalStyle = {
        overlay: {
            position: 'fixed',
            background: 'rgba(0,0,0,.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000
        } as CSSProperties,
        content: {
            position: 'static',
            padding: 30,
            boxSizing: 'border-box',
            width: '85vw',
            height: 'min(85vh, 50em)',
            background: 'white',
            border: 'none',
            borderRadius: '20px',
            zIndex: 10001
        } as CSSProperties
    }

    return (
        <div className={styles.lecture_wrapper} onClick={() => setModalOpened(!modalOpened)}>
            <div className={styles.fixed_cell}>
                <div>{lect.period}</div>
            </div>
            <div className={styles.lecture_cell}>
                <div className={styles.lecture_name}>{lect.lectureName}</div>
            </div>
            <ReactModal
                isOpen={modalOpened}
                style={modalStyle}
                onRequestClose={() => setModalOpened(!modalOpened)}
            >
                <div className={styles.lecture_detail}>
                    <h2>{lect.lectureName}</h2>
                </div>
            </ReactModal>
        </div>
    )
}

export default Lecture
