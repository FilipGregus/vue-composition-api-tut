/**
 * Add a new card to the list with listId
 * @param data
 * @param lists
 */

export const addNerCard = (data, lists) => {
    let list = lists.find(list => list.id === data.listId)
    let cardMaxId = list.cards.length ?
        Math.max(...list.cards.map(card => card.id)) : 0

    list.cards.push({
        id: cardMaxId + 1,
        text: data.text
    })
}