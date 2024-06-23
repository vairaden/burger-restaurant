import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext, useMemo, useState} from "react";
import {AppContext} from "../../App";

import styles from './BurgerConstructor.module.css';
import {Modal} from "../Modal";
import {OrderDetails} from "../OrderDetails";

export const BurgerConstructor = () => {
  const {ingredients} = useContext(AppContext);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const {firstIngredient, otherIngredients, lastIngredient} = useMemo(() => {
    return {
      firstIngredient: ingredients[0],
      lastIngredient: ingredients[0],
      otherIngredients: ingredients.slice(1, ingredients.length),
    }
  }, [ingredients]);

  return (
      <>
        <Modal
            open={openOrderDetails}
            onClose={() => setOpenOrderDetails(false)}
        >
          <OrderDetails/>
        </Modal>

        <section className="mt-25">
          <ul className={styles.ingredientList}>
            {firstIngredient && (
                <li className={styles.listItemContent}>
                  <ConstructorElement
                      extraClass="ml-8"
                      key={firstIngredient._id}
                      type="top"
                      isLocked={true}
                      text={firstIngredient.name + ' (верх)'}
                      price={firstIngredient.price}
                      thumbnail={firstIngredient.image}
                  />
                </li>
            )}

            {otherIngredients.map((item, index) => (
                <li className={'mt-4 ' + styles.listItemContent}>
                  <DragIcon type="primary"/>
                  <ConstructorElement
                      extraClass="ml-2"
                      key={item._id}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                  />
                </li>
            ))
            }

            {lastIngredient && (
                <li className={'mt-4 ' + styles.listItemContent}>
                  <ConstructorElement
                      extraClass="ml-8"
                      key={lastIngredient._id}
                      type="bottom"
                      isLocked={true}
                      text={lastIngredient.name + ' (низ)'}
                      price={lastIngredient.price}
                      thumbnail={lastIngredient.image}
                  />
                </li>
            )}
          </ul>

          <div className={styles.checkoutBlockWrapper + ' mr-4 mt-10'}>
            <div className={styles.checkoutBlockWrapper + ' mr-10'}>
              <p className="text text_type_main-large mr-4">
                610
              </p>
              <CurrencyIcon type="primary"/>
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={() => setOpenOrderDetails(true)}>
              Оформить заказ
            </Button>
          </div>
        </section>
      </>
  )
}
