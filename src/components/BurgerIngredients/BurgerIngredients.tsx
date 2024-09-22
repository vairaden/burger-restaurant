import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

import styles from './BurgerIngredients.module.css';
import { IngredientCard } from '../IngredientCard';
import { useAppSelector } from '../../services/store';

const enum IngredientTabs {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState(IngredientTabs.BUN);

  const bunTabRef = useRef<HTMLParagraphElement>(null);
  const sauceTabRef = useRef<HTMLParagraphElement>(null);
  const mainTabRef = useRef<HTMLParagraphElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);

  useEffect(() => {
    const bunTabElement = bunTabRef.current as HTMLParagraphElement;
    const sauceTabElement = sauceTabRef.current as HTMLParagraphElement;
    const mainTabElement = mainTabRef.current as HTMLParagraphElement;
    const listContainerElement = listContainerRef.current as HTMLDivElement;

    const onScroll = () => {
      const bunTabTop = bunTabElement.getBoundingClientRect().top;
      const sauceTabTop = sauceTabElement.getBoundingClientRect().top;
      const mainTabTop = mainTabElement.getBoundingClientRect().top;
      const listContainerTop = listContainerElement.getBoundingClientRect().top;

      setActiveTab(
        [
          {
            tab: IngredientTabs.BUN,
            distance: bunTabTop - listContainerTop,
          },
          {
            tab: IngredientTabs.SAUCE,
            distance: sauceTabTop - listContainerTop,
          },
          {
            tab: IngredientTabs.MAIN,
            distance: mainTabTop - listContainerTop,
          },
        ].sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance))[0].tab
      );
    };

    listContainerElement.addEventListener('scroll', onScroll);

    return () => {
      listContainerElement.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section>
      <p className="text text_type_main-large mt-10">Cоберите бургер</p>
      <div className="mt-5" style={{ display: 'flex' }}>
        <Tab
          value="bun"
          active={activeTab === 'bun'}
          onClick={() => setActiveTab(IngredientTabs.BUN)}
        >
          <p className="text text_type_main-small">Булки</p>
        </Tab>
        <Tab
          value="sauce"
          active={activeTab === 'sauce'}
          onClick={() => setActiveTab(IngredientTabs.SAUCE)}
        >
          <p className="text text_type_main-small">Соусы</p>
        </Tab>
        <Tab
          value="main"
          active={activeTab === 'main'}
          onClick={() => setActiveTab(IngredientTabs.MAIN)}
        >
          <p className="text text_type_main-small">Начинки</p>
        </Tab>
      </div>

      <div className={styles.ingredientsSection} ref={listContainerRef}>
        <p className="text text_type_main-medium mt-10" ref={bunTabRef}>
          Булки
        </p>
        <ul className={styles.ingredientsList}>
          {Object.values(ingredients)
            .filter((item) => item.type === 'bun')
            .map((item) => (
              <IngredientCard item={item} key={item._id} />
            ))}
        </ul>

        <p className="text text_type_main-medium mt-10" ref={sauceTabRef}>
          Соусы
        </p>
        <ul className={styles.ingredientsList}>
          {Object.values(ingredients)
            .filter((item) => item.type === 'sauce')
            .map((item) => (
              <IngredientCard item={item} key={item._id} />
            ))}
        </ul>

        <p className="text text_type_main-medium mt-10" ref={mainTabRef}>
          Начинки
        </p>
        <ul className={styles.ingredientsList}>
          {Object.values(ingredients)
            .filter((item) => item.type === 'main')
            .map((item) => (
              <IngredientCard item={item} key={item._id} />
            ))}
        </ul>
      </div>
    </section>
  );
};
