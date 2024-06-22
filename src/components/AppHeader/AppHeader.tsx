import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
  return (
      <header>
        <Button htmlType="button" type="secondary" size="small">
          <BurgerIcon type="primary"/>
          <p className="text text_type_main-default">
            Конструктор
          </p>
        </Button>
        <Button htmlType="button" type="secondary" size="small">
          <ListIcon type="secondary"/>
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </Button>
        <Logo/>
        <Button htmlType="button" type="secondary" size="small">
          <ProfileIcon type="secondary"/>
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </Button>
      </header>
  )
}
