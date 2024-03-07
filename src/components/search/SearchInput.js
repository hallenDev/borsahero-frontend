import styles from 'components/search/SearchInput.module.scss';
import { Label } from 'ui/text';
import { Close, Search } from 'ui/svg/icon';

const SearchInput = ({onClick, fullWidth=false, onChange=null, ...props}) => {
    return (
        <div className={fullWidth ? styles.searchInputFormFull : styles.searchInputForm}>
            <div className={styles.searchInputWrapper}>
                <button className={styles.searchInputIcon} onClick={onClick}><Close width={20} height={20} color={"white"} /></button>
                <input type='input' placeholder='Search' className={styles.searchInput} onChange={onChange} />
                <div className={styles.searchIcon}><Search width={12} height={12} color={"white"} /></div>
            </div>
        </div>
    )
}

export default SearchInput;