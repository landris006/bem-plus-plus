import Image, { StaticImageData } from 'next/image';
import styles from '../styles/MenuItem.module.scss';

interface MenuProps {
  title: string;
  imageUrl: string | StaticImageData;
}
const MenuItem = ({ title, imageUrl }: MenuProps) => {
  return (
    <div className={styles.menuItem}>
      <h3 className={styles.foodTitle}>{title}</h3>
      <div className={styles.imageWrapper}>
        <div className={styles.frame}>
          <Image
            className={styles.foodImage}
            src={imageUrl}
            width={272}
            height={272}
            alt="soup"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
