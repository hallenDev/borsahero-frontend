import { useState, useEffect } from 'react';
import styles from './dropdown.module.scss';
import { Up, Down, Check } from 'ui/svg/icon';
import { SecondaryLabel } from 'ui/text';

export const DefaultMenu = ({label, data = null, onChange = null, defaultValue=null, emptyMsg=null, ...props}) => {
    // if(data == null) data = [
    //     {
    //         label: 'Item 1',
    //         value: 'item-1'
    //     }
    // ];
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState(defaultValue == null ? data?.[0] : data.find((item) => (item?.value ?? item.deviceId) == defaultValue));

    useEffect(() => {
        if(defaultValue == null) return;
        let _selected = data.find((item) => (item?.value ?? item.deviceId) == defaultValue);
        setSelected(_selected);
    }, [defaultValue, data])

    // onChange(data[0].value);

    const handleSelectItem = (item) => {
        if(onChange) onChange(item.value ?? item.deviceId);
        setSelected(item);
        setIsActive(false);
    }

    return (
        <div className={styles.defaultMenu}>
            {
                label ?
                <span>{label}</span> :<></>
            }
            {/* <select>
                <option value="0">item 1</option>
                <option value="1">item 2</option>
                <option value="2">item 3</option>
                <option value="3">item 4</option>
            </select> */}
            <div className={styles.dropdown}>
                <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)}>
                    <span>{selected?.label ?? emptyMsg}</span>
                    {
                        data.length > 0 && 
                        (
                            isActive ?
                            <Up width={25} height={25} />
                            :
                            <Down width={25} height={25} />
                        )
                    }
                    
                </div>
                {
                    data.length > 0 && 

                    <div className={styles.dropdownContent} style={{display: isActive? 'block': 'none'}}>
                        {
                            data.map((item, index) => {
                                return (
                                    <div className={selected == item ? styles.itemSelected: styles.item} onClick={() => handleSelectItem(item)} key={index}>
                                        {
                                            selected == item ?
                                            <>
                                                <span>{item.label}</span>
                                                <Check width={25} height={25} color={'#85FF3A'} />
                                            </>
                                            :
                                            <SecondaryLabel value={item.label} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}