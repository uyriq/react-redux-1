Продолжим работу над корзиной с товарами. В предыдущей теме для хранения данных вы использовали React Context. Теперь перепишем всё на Redux. В этом задании создадим первые редьюсеры и экшены для компонента `Cart`. А после — инициализируем хранилище и подпишем на него все компоненты.

Мы подготовили всю базовую инфраструктуру: создали директорию `services` и две поддиректории `actions`, `reducers` с файлами `cart.js` и `index.js` в каждой.

В директории `actions` будем хранить все типы экшенов, а в `reducers` — редьюсеры.

В файле `cart.js` директории `actions` опишите такие типы:

-   `INCREASE_ITEM` — увеличение количества товаров,
-   `DECREASE_ITEM` — уменьшение количества товаров,
-   `DELETE_ITEM` — удаление товара,
-   `CANCEL_PROMO` — отмена промокода,
-   `TAB_SWITCH` — переключение между вкладками «Отложенные товары» и «Товары в корзине».

Все эти типы экшенов импортируйте в файл `cart.js` директории `reducers`. В ней вы и будете создавать первые редьюсеры.

Но сперва разберитесь с начальным состоянием для массива `items` и `recommendedItems`. Мы подготовили захардкоженные данные в директории `services` файла `initialData.js`. Импортируйте `recommendedItems` и `items`, используйте эти переменные как начальное состояние для товаров в корзине и рекомендуемых товаров в редьюсере `cart.js`.

Когда всё готово — создайте редьюсер `cartReducer`, а в нём — конструкцию `switch-case`, и обработайте все типы экшенов:

-   `TAB_SWITCH` — этот редьюсер отвечает за переключение между вкладками «Отложенные товары» и «Товары в корзине». Используйте тернарный оператор для поля `currentTab`. Если `currentTab` в состоянии со значением `items`, возвращайте отложенные товары — `postponed`. В противном случае возвращайте `items`. И `items`, и `postponed` — обычные строки.
-   `INCREASE_ITEM` — редьюсер увеличения количества товаров `items`. Найдите с помощью переданного в диспатчер `id` нужный элемент массива `items`. Когда нужный элемент найден, увеличьте число в поле `qty`. Звучит сложно, но на деле достаточно применить метод `map` и найти элемент с нужным `id`. Воспользуйтесь тернарным оператором в колбек-функции — для найденного элемента верните обновлённый объект с изменённым полем `qty`. В противном случае просто верните текущий элемент массива.
-   `DECREASE_ITEM` — уменьшение количества товаров. По функциональности аналогичен `INCREASE_ITEM`, но уменьшает значение поля `qty`.
-   `DELETE_ITEM` — удаление товара из корзины. Примените метод `filter` для поиска удаляемого элемента. Используйте `id` из экшена, переданного в редьюсер.
-   `CANCEL_PROMO` — удаление промокода. Очищайте поля `promoCode` и `promoDiscount`, которые надо привести к изначальному состоянию.

Фактически мы пытаемся описать логику работы нескольких небольших функций, но выглядит это очень объёмно. Есть несколько советов:

-   Для работы с массивами и объектами состояния щедро используйте спред-синтаксис .
-   Не забывайте про путь воина: в большинстве случаев нужно именно обновлять исходное состояние. Например, редьюсер удаления товара выглядит так:

    ```jsx

      case DELETE_ITEM: {
        return { ...state, items: [...state.items].filter(item => item.id !== action.id) };
      }

    ```

Как только редьюсер будет готов — импортируйте `cartReducer` в файл `index.js` директории `reducers`. Объедините `cartReducer` в `rootReducer` с использованием `combineReducers`.

В конце перейдите в корневой файл `index.js`. Инициализируйте в нём хранилище:

-   Импортируйте `createStore`, `Provider` и `rootReducer`.
-   Инициализируйте хранилище в переменную `store` с помощью `createStore`.
-   Оберните компонент `App` в `Provider`.
-   Передайте `store` в качестве аргумента провайдера.

**Подсказка**

Это большое задание. Не расстраивайтесь, если внутри кода редьюсеров возникнут проблемы. Код для обработки экшена `DELETE_ITEM` мы показали в самом задании. А обновлять количество товаров в обработчике `INCREASE_ITEM` можно так:

```jsx

case INCREASE_ITEM: {
  return {
    ...state,
    items: state.items.map(item =>
      item.id === action.id ? { ...item, qty: ++item.qty } : item
    )
  };
}

```

И повторим весь порядок действий:

-   Опишите все экшены в файле `cart.js` директории `actions`.
-   Импортируйте все типы экшенов в файл `cart.js` директории `reducers`.
-   Создайте `cartReducer` и обработайте все импортированные типы экшенов в конструкции `switch-case`.
-   Создайте `rootReducer` в файле `index.js` директории `reducers`.
-   Инициализируйте хранилище в корневом файле `index.js` и оберните в `Provider` компонент `App`.

Мы знаем, что это сложная задача в плане проверки кода тренажером на валидность. Если вы уверены, что ваш код правильный, но тренажер не может его принять, вы можете сравнить ваше решение с [решением автора](https://www.notion.so/0a3e69fa91774c63bea4d0c2fe29cd35).

Инициализация хранилища. Первый reducer и action 1/2

-   `src/services/actions/cart.js`

    ```jsx
    export const INCREASE_ITEM = 'INCREASE_ITEM'
    export const DECREASE_ITEM = 'DECREASE_ITEM'
    export const DELETE_ITEM = 'DELETE_ITEM'

    export const CANCEL_PROMO = 'CANCEL_PROMO'

    export const TAB_SWITCH = 'TAB_SWITCH'
    ```

-   `src/services/reducers/cart.js`

    ```jsx
    import { DELETE_ITEM, CANCEL_PROMO, DECREASE_ITEM, INCREASE_ITEM, TAB_SWITCH } from '../actions/cart'
    import { recommendedItems, items } from '../initialData'

    const initialState = {
        items,

        recommendedItems,

        promoCode: '',
        promoDiscount: null,

        currentTab: 'items',
    }

    export const cartReducer = (state = initialState, action) => {
        switch (action.type) {
            case TAB_SWITCH: {
                return {
                    ...state,
                    currentTab: state.currentTab === 'items' ? 'postponed' : 'items',
                }
            }
            case INCREASE_ITEM: {
                return {
                    ...state,
                    items: [...state.items].map((item) =>
                        item.id === action.id ? { ...item, qty: ++item.qty } : item
                    ),
                }
            }
            case DECREASE_ITEM: {
                return {
                    ...state,
                    items: [...state.items].map((item) =>
                        item.id === action.id ? { ...item, qty: --item.qty } : item
                    ),
                }
            }
            case DELETE_ITEM: {
                return { ...state, items: [...state.items].filter((item) => item.id !== action.id) }
            }
            case CANCEL_PROMO: {
                return {
                    ...state,
                    promoCode: '',
                    promoDiscount: null,
                }
            }
            default: {
                return state
            }
        }
    }
    ```

-   `src/services/reducers/index.js`

    ```jsx
    import { combineReducers } from 'redux'
    import { cartReducer } from './cart'

    export const rootReducer = combineReducers({
        cart: cartReducer,
    })
    ```
