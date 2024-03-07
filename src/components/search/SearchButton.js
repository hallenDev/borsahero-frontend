import styles from 'components/search/SearchButton.module.scss';
import { Search } from 'ui/svg/icon';

const SearchButton = ({onClick, ...props}) => {
    return (
        <>
        <div className={styles.searchButtonWrapper}>
            <button className={styles.searchButton} onClick={onClick}>                
                <Search width={12} height={12} color="white" />
            </button>
        </div>
        </>
    )
}

export default SearchButton;