import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext, useState} from "react";
import {AppContext} from "../../App";

import styles from './BurgerConstructor.module.css';
import {Modal} from "../Modal";
import {OrderDetails} from "../OrderDetails";

export const BurgerConstructor = () => {
  const {ingredients} = useContext(AppContext);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

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
            {ingredients.map((item, index) => (
                <div className={(index !== 0 ? 'mt-4' : '') + ' ' + styles.listItemContent}>
                  <span className={(index === ingredients.length - 1) || (index === 0) ? 'mr-8' : 'mr-2'}>
                    {(index !== ingredients.length - 1) && (index !== 0) &&
                        <DragIcon type="primary"/>
                    }
                  </span>
                  <ConstructorElement
                      key={item._id}
                      type={(index === ingredients.length - 1 && "bottom") || (index === 0 && "top") || undefined}
                      isLocked={true}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                  />
                </div>
            ))
            }
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
