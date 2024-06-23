import React, {useEffect, useState} from 'react';
import {AppHeader} from "../components/AppHeader";
import {BurgerConstructor} from "../components/BurgerConstructor";
import {BurgerIngredients} from "../components/BurgerIngredients";

import styles from './App.module.css';
import {getIngredients, Ingredient} from "../api/getIngredients";

export interface AppContextType {
  ingredients: Ingredient[];
}

export const AppContext = React.createContext<AppContextType>({ingredients: []});

export function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    getIngredients().then((res) => {
      setIngredients(res);
    }).catch((err) => {
      console.error(err);
    })

  }, []);

  return (
      <AppContext.Provider value={{ingredients}}>
        <div className="App">
          <AppHeader/>
          <main className={styles.mainGrid}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </main>
        </div>
      </AppContext.Provider>
  );
}

