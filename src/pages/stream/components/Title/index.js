import styles from './index.module.scss';
import { H3 } from 'ui/text';
import { Options, Free, ViewNum, Live } from 'ui/tags';

const Title = ({data, ...props}) => {

    return (
        <div className={styles.form}>
            <H3 value={data.title} />
            <div className={styles.option}>
                <Options />
                <Free />
                <ViewNum />
            </div>
            <Live />
        </div>
    )
}

export default Title;