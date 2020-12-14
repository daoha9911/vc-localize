import React, { useState } from 'react';
import { Radio, Button } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { CONTACTTYPE_PICKER } from './constants';
import styles from './index.less';

const ContactTypePicker = ({ onClosePopup }) => {
  const { filters, setFilter } = useQueryLocation();

  const [contactTypePicker, setContactTypePicker] = useState(
    filters?.where?.contactType ? filters?.where?.contactType : null,
  );

  const onSizeChange = (e) => {
    const value = e.target.value || null;
    setContactTypePicker(value);
  };

  const onApplyClick = () => {
    setFilter({
      contactType: contactTypePicker,
    });
    onClosePopup(false);
  };

  const onClearClick = () => {
    setFilter({
      contactType: null,
    });
    onClosePopup(false);
  };
  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.contactTypePickerPopup}>
          <h2 className={styles.customPopupLabelTag}>Loại liên hệ</h2>
          <div className={styles.customRadio}>
            <Radio.Group
              onChange={onSizeChange}
              value={contactTypePicker}
              className="flex flex-col"
            >
              {CONTACTTYPE_PICKER.map((d) => (
                <Radio key={d.value} value={d.value}>
                  {d.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className={styles.popUpButtonAction}>
          <span onClick={onClearClick} className={styles.popUpButtonActionSpan}>
            Xoá
          </span>
          <Button onClick={onApplyClick} className={styles.popUpButtonActionButton}>
            Áp dụng
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContactTypePicker;
