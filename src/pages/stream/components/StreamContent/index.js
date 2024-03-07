import styles from './index.module.scss';
import Content from './Content';
import StreamPanel from './StreamPanel';

const StreamContent = ({data, ...props}) => {

    return (
        <div className={styles.streamContent}>
            <Content data={data} />
            <StreamPanel data={data} />
        </div>
    )
}

export default StreamContent;