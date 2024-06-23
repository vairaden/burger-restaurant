import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext, useState} from "react";

import styles from "./BurgerIngredients.module.css";
import {AppContext} from "../../App";
import {Ingredient} from "../../api/getIngredients";
import {IngredientDetails} from "../IngredientDetails";
import {Modal} from "../Modal";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState('bun');
  const {ingredients} = useContext(AppContext);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  return (
      <>
        <Modal
            open={!!selectedIngredient}
            onClose={() => setSelectedIngredient(null)}
        >
          {selectedIngredient && (
              <IngredientDetails
                  ingredient={selectedIngredient}
              />
          )}
        </Modal>

        <section>
          <p className="text text_type_main-large mt-10">Cоберите бургер</p>
          <div className="mt-5" style={{display: "flex"}}>
            <Tab value="bun" active={activeTab === 'bun'} onClick={setActiveTab}>
              <p className="text text_type_main-small">Булки</p>
            </Tab>
            <Tab value="sauce" active={activeTab === 'sauce'} onClick={setActiveTab}>
              <p className="text text_type_main-small">Соусы</p>
            </Tab>
            <Tab value="main" active={activeTab === 'main'} onClick={setActiveTab}>
              <p className="text text_type_main-small">Начинки</p>
            </Tab>
          </div>

          <div className={styles.ingredientsSection}>
            <p className="text text_type_main-medium mt-10">
              Булки
            </p>
            <ul className={styles.ingredientsList}>
              {ingredients.filter((item) => item.type === 'bun').map((item, index) => (
                  <li className={styles.ingredientsListItem} key={item._id}
                      onClick={() => setSelectedIngredient(item)}>
                    <Counter count={233} size="default"/>
                    <div>
                      <img src={item.image_large} alt={item.name} className={styles.ingredientImage}/>
                      <div className={styles.ingredientPrice}>
                        <p className="text text_type_main-small mr-2">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary"/>
                      </div>
                      <p className="text text_type_main-small mb-6">
                        {item.name}
                      </p>
                    </div>
                  </li>
              ))
              }
            </ul>

            <p className="text text_type_main-medium mt-10">
              Соусы
            </p>
            <ul className={styles.ingredientsList}>
              {ingredients.filter((item) => item.type === 'sauce').map((item, index) => (
                  <li className={styles.ingredientsListItem} key={item._id}
                      onClick={() => setSelectedIngredient(item)}>
                    <Counter count={233} size="default"/>
                    <div>
                      <img src={item.image_large} alt={item.name} className={styles.ingredientImage}/>
                      <div className={styles.ingredientPrice}>
                        <p className="text text_type_main-small mr-2">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary"/>
                      </div>
                      <p className="text text_type_main-small mb-6">
                        {item.name}
                      </p>
                    </div>
                  </li>
              ))
              }
            </ul>

            <p className="text text_type_main-medium mt-10">
              Начинки
            </p>
            <ul className={styles.ingredientsList}>
              {ingredients.filter((item) => item.type === 'main').map((item, index) => (
                  <li className={styles.ingredientsListItem} key={item._id}
                      onClick={() => setSelectedIngredient(item)}>
                    <Counter count={233} size="default"/>
                    <div>
                      <img src={item.image_large} alt={item.name} className={styles.ingredientImage}/>
                      <div className={styles.ingredientPrice}>
                        <p className="text text_type_main-small mr-2">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary"/>
                      </div>
                      <p className="text text_type_main-small mb-6">
                        {item.name}
                      </p>
                    </div>
                  </li>
              ))
              }
            </ul>
          </div>
        </section>
      </>
  )
}
