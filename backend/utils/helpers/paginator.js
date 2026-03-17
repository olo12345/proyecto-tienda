// En implementación

const pagination = ({data, items, page }) => {
    itemsInt = parseInt(items);
    pageInt = parseInt(page);

    initialIndex = (pageInt - 1)*itemsInt;
    finalIndex = initialIndex + itemsInt;



    const results = {};

    results.results = data.slice(initialIndex, finalIndex);
}

export default pagination;