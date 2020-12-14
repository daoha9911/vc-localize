import React from 'react';
import CompareDetailItem from './CompareDetailItem';
import styles from '../index.less';

const CompareHeader = () => {
  return (
    <>
      <div className="flex flex-col">
        <CompareDetailItem>
          <div className={styles.CompareDetail_Estate}>
            <span className={styles.customHeaderspan}>Bất động sản</span>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
                  fill="#0e868b"
                />
              </svg>
            </div>
            <div className={styles.customCell}>
              <span className={styles.customSpan}>Diện tích</span>
            </div>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
                  fill="#0e868b"
                />
              </svg>
            </div>
            <div className={styles.customCell}>
              <span className={styles.customSpan}>Giá cả</span>
            </div>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
                  fill="#0e868b"
                />
              </svg>
            </div>
            <div className={styles.customCell}>
              <span className={styles.customSpan}>Số phòng ngủ</span>
            </div>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
                  fill="#0e868b"
                />
              </svg>
            </div>
            <div className={styles.customCell}>
              <span className={styles.customSpan}>Hướng nhà</span>
            </div>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
                  fill="#0e868b"
                />
              </svg>
            </div>
            <div className={styles.customCell}>
              <span className={styles.customSpan}>Số nhà tắm</span>
            </div>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.CompareDetail_Services}>
            <div className="flex items-center">
              <div className="mr-2">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
                    fill="#0e868b"
                  />
                </svg>
              </div>
              <span className={styles.customSpan}>Tiện ích</span>
            </div>
          </div>
        </CompareDetailItem>
      </div>
    </>
  );
};

export default CompareHeader;
