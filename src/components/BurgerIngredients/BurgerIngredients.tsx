import {Counter, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext, useState} from "react";

import styles from "./BurgerIngredients.module.css";
import {AppContext} from "../../App";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState('buns');
  const {ingredients} = useContext(AppContext);

  return (
      <div>
        <p className="text text_type_main-large">Cоберите бургер</p>

        <div style={{display: 'flex'}}>
          <Tab value="buns" active={activeTab === 'buns'} onClick={setActiveTab}>
            <p className="text text_type_main-small">Булки</p>
          </Tab>
          <Tab value="sauces" active={activeTab === 'sauces'} onClick={setActiveTab}>
            <p className="text text_type_main-small">Соусы</p>
          </Tab>
          <Tab value="ingredients" active={activeTab === 'ingredients'} onClick={setActiveTab}>
            <p className="text text_type_main-small">Начинки</p>
          </Tab>
        </div>
        <div>
          <p className="text text_type_main-medium">
            Булки
          </p>
          <div className={styles.ingredientsList}>
            {ingredients.map((item, index) => (
                <div className={styles.ingredientsListItem} key={item._id}>
                  <Counter count={233} size="small"/>
                  <div>
                    <img src={item.image_large} alt={item.name}/>
                    <p className="text text_type_main-small">
                      {item.price}
                    </p>
                    <p className="text text_type_main-small">
                      {item.name}
                    </p>
                  </div>
                </div>
            ))
            }
          </div>
        </div>
      </div>
  )
}
