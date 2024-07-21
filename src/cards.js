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


/**
 * Remove a card from the list with listId and cardId
 * @param data
 * @param lists
 */
export const deleteCard = (data, lists) => {
    if(!data?.listId || !data?.cardId) {
        return
    }

    let list = lists.find(list => list.id === data.listId)
    list.cards = list.cards.filter(card => card.id !== data.cardId)
}


/**
 * Edit the text of a card from the list with listId and card
 * @param data
 * @param lists
 */
export const editCardText  = (data, lists) => {
    if(!data?.listId || !data?.cardId || !data?.newText) {
        return
    }

    let list = lists.find(list => list.id === data.listId)
    let card = list.cards.find(card => card.id === data.cardId)
    card.text = data.newText
}