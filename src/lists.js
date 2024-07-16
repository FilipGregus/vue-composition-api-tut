/**
 * Add a new list to the lists array
 * @param {string} title - The title of the new list
 * @param {array} lists - The array of lists
 */

export const addNewList = (title, lists) => {
    if (!title) return

    let listMaxId = lists.length ?
        Math.max(...lists.map(list => list.id)) : 0;

    lists.push({
        id: listMaxId + 1,
        title,
        cards: []
    })

}

/**
 * edit the title of a list
 * @param {object} data
 * @param {array} lists
 */

export const editListTitle = (data, lists) => {
    if (!data?.title || !data?.id) return

    const list = lists.find(list => list.id === data.id)
    list.title = data.title
}