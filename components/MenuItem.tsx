import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import styles from '../styles/MenuItem.module.scss';
import Modal from './Modal';

interface MenuProps {
  title: string;
  imageUrl: string | StaticImageData;
}
const MenuItem = ({ title, imageUrl }: MenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        classNames={styles.courseInfoModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        asd
      </Modal>

      <div className={styles.menuItem}>
        <h3 className={styles.foodTitle}>{title}</h3>
        <div className={styles.imageWrapper}>
          <div className={styles.frame}>
            <Image
              className={styles.foodImage}
              src={imageUrl}
              width={272}
              height={272}
              onClick={() => setIsModalOpen(true)}
              alt="soup"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
