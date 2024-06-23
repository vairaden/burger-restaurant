import {Ingredient} from "../../api/getIngredients";

import styles from './IngredientDetails.module.css';

export interface Props {
  ingredient: Ingredient;
}

export const IngredientDetails = ({ingredient}: Props) => {
  return (
      <>
        <p className="text text_type_main-large pt-10 ml-10 mr-10">
          Детали ингедиента
        </p>
        <div className={styles.container}>
          <img src={ingredient.image_large} alt={ingredient.name}/>
          <p className="text text_type_main-medium mt-4">{ingredient.name}</p>

          <ul className={styles.ingredientInfo}>

            <li className={styles.ingredientInfoBlock}>
              <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
              <p className="text text_type_main-small text_color_inactive">{ingredient.calories}</p>
            </li>

            <li className={styles.ingredientInfoBlock}>
              <p className="text text_type_main-small text_color_inactive">Белки, г</p>
              <p className="text text_type_main-small text_color_inactive">{ingredient.proteins}</p>
            </li>

            <li className={styles.ingredientInfoBlock}>
              <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
              <p className="text text_type_main-small text_color_inactive">{ingredient.fat}</p>
            </li>

            <li className={styles.ingredientInfoBlock}>
              <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
              <p className="text text_type_main-small text_color_inactive">{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </div>

      </>
  );
}
