import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext} from "react";
import {AppContext} from "../../App";

import styles from './BurgerConstructor.module.css';

export const BurgerConstructor = () => {
  const {ingredients} = useContext(AppContext);

  return (
      <div>
        <ul className={styles.ingredientList}>
          {ingredients.map((item, index) => (
              <ConstructorElement
                  key={item._id}
                  type={(index === ingredients.length - 1 && "bottom") || (index === 0 && "top") || undefined}
                  isLocked={true}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
              />
          ))
          }
        </ul>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
  )
}
