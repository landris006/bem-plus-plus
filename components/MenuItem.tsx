import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { Image as ImageType } from '../pages/api/get-images';
import styles from '../styles/MenuItem.module.scss';
import Modal from './Modal';
import spinner from '../public/spinner.svg';

const ModalButton = ({
  title,
  isShowingRecipes,
  isRecipeButton,
  onClick,
  setIsShowingRecipes,
}: {
  title: string;
  isShowingRecipes: boolean;
  isRecipeButton: boolean;
  onClick?: () => void;
  setIsShowingRecipes: (isRecipeButton: boolean) => void;
}) => {
  return (
    <div
      className={styles.courseInfoButton}
      style={{
        backgroundColor: `${
          isShowingRecipes === isRecipeButton ? '#ffd53f' : '#ffeaa0'
        }`,
      }}
      onClick={() => {
        setIsShowingRecipes(isRecipeButton);
        if (onClick) {
          onClick();
        }
      }}
      role="button"
    >
      <h4 className={styles.courseInfoTitles}>{title}</h4>
    </div>
  );
};

interface MenuProps {
  title: string;
  imageUrl: string | StaticImageData;
}
const MenuItem = ({ title, imageUrl }: MenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowingRecipes, setIsShowingRecipes] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);

  const getImages = async (title: string) => {
    try {
      const response = await fetch(
        `/api/get-images?q=${title.replaceAll(/[ ]{1,}/g, '+')}`
      );
      const data: {
        results: ImageType[];
      } = await response.json();

      setImages(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImages(title);
  }, [title]);

  return (
    <>
      <Modal
        classNames={styles.courseInfoModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={styles.courseInfoButtons}>
          <ModalButton
            title="Képek"
            isShowingRecipes={isShowingRecipes}
            isRecipeButton={false}
            setIsShowingRecipes={setIsShowingRecipes}
          />
          <ModalButton
            title="Receptek"
            isShowingRecipes={isShowingRecipes}
            isRecipeButton={true}
            setIsShowingRecipes={setIsShowingRecipes}
          />
        </div>
        <h3 className={styles.modalTitle}>{title}</h3>
        {isShowingRecipes ? (
          'WIP'
        ) : (
          <>
            <div className={styles.imagesGridWrapper}>
              <div className={styles.imagesGrid}>
                {images.length
                  ? images.map(({ source, url, title }, index) => {
                      return (
                        <div
                          key={index}
                          className={styles.wrapper}
                          onClick={() => window.open(source, '_blank')}
                        >
                          <Image
                            loader={() => url}
                            src={url}
                            width={600}
                            height={600}
                            className={styles.image}
                            objectFit="fill"
                            alt={title}
                          />
                        </div>
                      );
                    })
                  : new Array(100).fill(null).map((_asd, index) => {
                      return (
                        <div className={styles.imagePlaceHolder} key={index}>
                          <Image
                            className={styles.spinner}
                            src={spinner}
                            alt="spinner"
                          />
                        </div>
                      );
                    })}
              </div>
              <p
                className={styles.moreImages}
                role="button"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?tbm=isch&q=${title}`,
                    '_blank'
                  )
                }
              >
                Több kép!
              </p>
            </div>
          </>
        )}
      </Modal>

      <div className={styles.menuItem}>
        <h3 className={styles.foodTitle}>{title}</h3>
        <div
          className={styles.imageWrapper}
          onClick={() => setIsModalOpen(true)}
        >
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
    </>
  );
};

export default MenuItem;
