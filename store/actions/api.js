import axios from 'axios'
import { FETCH_FOODS, ORDER_FOOD } from '../actions/types'

export const fetchFoods = () => async (dispatch) => {
  let payload = []
  let { data } = await axios
    .get('https://www.food2fork.com/api/search?key=92230c1eab25a45378efbed3eba348ba')

  if (data.recipes) {
    payload = data.recipes.map(recipe => ({ ...recipe, order: 0 }))
  }
  dispatch({
    type: FETCH_FOODS,
    payload
  })
}

export const orderFood = (list, id, options) => (dispatch) => {
  let payload = []
  list.forEach(l => {
    if (l.recipe_id === id) {
      if (options === 'add') {
        l.order += 1
      } else {
        l.order -= 1
        if (l.order < 0) {
          l.order = 0
        }
      }
    }
    payload.push(l)
  })

  dispatch({
    type: ORDER_FOOD,
    payload
  })
}