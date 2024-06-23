import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './AppHeader.module.css';

export const AppHeader = () => {
  return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.buttonGroupStart}>
            <Button htmlType="button" type="secondary" size="small" extraClass={styles.navButton}>
              <BurgerIcon type="primary"/>
              <p className="text text_type_main-default ml-2">
                Конструктор
              </p>
            </Button>
            <Button htmlType="button" type="secondary" size="small" extraClass={styles.navButton}>
              <ListIcon type="secondary"/>
              <p className="text text_type_main-default text_color_inactive ml-2">
                Лента заказов
              </p>
            </Button>
          </div>
          <div className={styles.logoContainer}>
            <Logo/>
          </div>
          <div className={styles.buttonGroupEnd}>
          <Button htmlType="button" type="secondary" size="small" extraClass={styles.navButton}>
            <ProfileIcon type="secondary"/>
            <p className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </p>
          </Button>
          </div>
        </nav>
      </header>
  )
}
