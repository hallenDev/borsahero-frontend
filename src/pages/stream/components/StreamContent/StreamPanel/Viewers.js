import styles from './index.module.scss';
import { H3, PrimaryText } from 'ui/text';
import avatar from 'assets/png/avatar1.png';

const ViewerItem = () => {
    return (
        <div className={styles.viewerItemForm}>
            <img src={avatar} />
            <PrimaryText value="Carla Dias" />
        </div>
    )
}

const Viewers = () => {

    return (
        <div className={styles.viewForm}>
            <H3  value="Viewers 12" />
            <div className={styles.viewerList}>
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
                <ViewerItem />
            </div>
        </div>
    );
}

export default Viewers;