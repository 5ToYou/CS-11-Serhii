// [
//  { id: 1, name, shortDescription, ... },
//  { id: 1, name, shortDescription, ... },
//  { id: 2, name, shortDescription, ... },
//  { id: 2, name, shortDescription, ... },
// ]

// [
//  { id: 1, name, shortDescription, ..., count: 1 },
//  { id: 2, name, shortDescription, ..., count: 2 },
// ]
const cart = []
let globalProductsData = []; // NEW: Global variable to hold the fetched data

// --- TASK 4: Local Storage Helper ---
const saveCartToStorage = () => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// --- TASK 3: Centralized UI Update and Save ---
const updateCartUI = (allProducts) => {
    // 1. Update the cart counter
    const cartCounter = document.querySelector('#cart-counter');
    const sum = cart.reduce((acc, cur) => acc + cur.count, 0);
    cartCounter.textContent = sum > 9 ? "+9" : sum;
    cartCounter.classList.toggle('hide', sum === 0);

    // 2. Re-render the Cart View List (if cart view is open)
    const cartViewList = document.querySelector('.cart-view-list');
    if (cartViewList) {
        cartViewList.innerHTML = '';
        const cartViewItems = cart.map(item => {
            return createViewItem(item, allProducts);
        });
        cartViewList.append(...cartViewItems);
    }
    
    // 3. Update the Total Price
    setTotalPrice();

    // 4. Update the main product list stock display and add button state
    allProducts.forEach(product => {
        const availableCountEl = document.querySelector(`.item[item-id="${product.id}"] .item-available-count`);
        if (availableCountEl) {
            availableCountEl.textContent = `Count: ${product.availableCount}`;
        }
        
        const addButton = document.querySelector(`.item[item-id="${product.id}"] .item-add`);
        if (addButton) {
            if (product.availableCount <= 0) {
                addButton.classList.add('disabled');
            } else {
                addButton.classList.remove('disabled');
            }
        }
    });

    // 5. Save the cart (Task 4)
    saveCartToStorage();
}

// --- TASK 3: Cart Quantity/Stock Logic (used by + / - buttons) ---
const updateCartItemCount = (itemId, change, allProducts) => {
    const cartItemIndex = cart.findIndex(el => el.id === itemId);
    const product = allProducts.find(el => el.id === itemId);
    
    if (cartItemIndex === -1 || !product) return;

    const cartItem = cart[cartItemIndex];

    // Check for increasing (+)
    if (change > 0) {
        if (product.availableCount <= 0) {
            return; // Stop if no stock to add
        }
        product.availableCount -= 1; 
        cartItem.count += 1;
    } 
    
    // Check for decreasing (-)
    else if (change < 0) {
        if (cartItem.count <= 1) {
            // Remove item entirely
            cart.splice(cartItemIndex, 1);
            product.availableCount += 1; // Return the item to stock
        } else {
            // Decrease count
            cartItem.count -= 1;
            product.availableCount += 1; // Return 1 item to stock
        }
    }
    
    // Refresh all UI elements
    updateCartUI(allProducts);
};

const addCart = (item) => {
    const existedItem = cart.find(el => el.id == item.id)
    if (existedItem) {
        existedItem.count += 1
    } else {
        cart.push({ ...item, count: 1 });
    }
    
    // The rest of the counter update is now handled by updateCartUI
}

const createItem = (item) => {
    //  <div class="item"></div>
    const div = document.createElement('div')
    div.classList.add('item');
    div.setAttribute('item-id', item.id)

    // <div class="item-image" style="--bgURL:url(${item.imageUrl})"></div>
    const image = document.createElement('div')
    image.classList.add('item-image')
    image.style = `--bgURL:url(${item.imageUrl})`

    // <div class="item-title">${item.name}</div>
    const title = document.createElement('div')
    title.classList.add('item-title')
    title.textContent = item.name

    // <div class="item-short-description">${item.shortDescription}</div>
    const description = document.createElement('div')
    description.classList.add('item-short-description')
    description.textContent = item.shortDescription

    // <div class="item-rating"></div>
    const bottom = document.createElement('div')
    bottom.classList.add('item-bottom')

    // <div class="item-rating"></div>
    const rating = document.createElement('div')
    rating.classList.add('item-rating')
    rating.textContent = `Rating: ${item.rating}`

    // <div class="item-rating"></div>
    const availableCount = document.createElement('div')
    availableCount.classList.add('item-available-count')
    availableCount.textContent = `Count: ${item.availableCount}`

    // <div class="item-price"></div>
    const price = document.createElement('div')
    price.classList.add('item-price')
    price.textContent = `${item.price} ${item.currency}`

    const add = document.createElement('div')
    add.classList.add('item-add')
    add.textContent = `Add to cart`
    add.addEventListener('click', () => {

        if (item.availableCount == 0) {
            return;
        }

        addCart(item) // Data added to cart

        // The stock is adjusted here for immediate visual feedback on the main list
        item.availableCount -= 1 
        
        // Call the centralized UI update to refresh all elements, including the counter and local storage
        updateCartUI(globalProductsData); 
    })

    bottom.append(rating)
    bottom.append(availableCount)
    bottom.append(price)
    bottom.append(add)

    div.appendChild(image)
    div.appendChild(title)
    div.appendChild(description)
    div.appendChild(bottom)


    return div
}

const setCategoryValues = (data) => {
    // allCategories => [ 'c1', 'c2', 'c1', 'c3' ]
    const allCategories = data.map(el => el.category)

    // uniqueCategories => [ 'c1', 'c2', 'c3' ]
    const allCategoriesSet = new Set(allCategories)
    const uniqueCategories = [...allCategoriesSet]

    const categoryNode = document.querySelector('.category select')

    uniqueCategories.forEach(category => {
        const option = document.createElement('option')
        option.textContent = category
        option.value = category

        categoryNode.appendChild(option)
    })
}

const setExtraFunctions = (data) => {
    const allExtraFunctions = data.flatMap(el => el.extraFunctions)
    const uniqueExtraFunctions = [...new Set(allExtraFunctions)]

    const container = document.querySelector('.extra-functions-container')

    uniqueExtraFunctions.forEach(extra => {
        const label = document.createElement('label')
        const span = document.createElement('span')
        span.textContent = extra;

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.setAttribute('data', extra)

        label.appendChild(input)
        label.appendChild(span)

        container.appendChild(label)
    })
}

const getAllSelectedExtraFunctions = () => {
    const selectedCheckbox = document.querySelectorAll(
        '.extra-functions-container input[type="checkbox"]:checked'
    )
    const extraFunctions = []
    selectedCheckbox.forEach(checkbox => {
        extraFunctions.push(
            checkbox.getAttribute('data')
        )
    })
    return extraFunctions
}

const filterItems = (data, params) => {
    const {
        searchText,
        priceMin,
        priceMax,
        category,
        rating,
        extraFunctions
    } = params;

    data.forEach(el => {
        const item = document.querySelector(`.item[item-id="${el.id}"]`);

        // 1. Search Filter
        if (searchText.length) {
            const isTextInName = el.name.toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
            const isTextInShorDescription = el.shortDescription.toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
            if (!isTextInName && !isTextInShorDescription) {
                item.classList.add('hide');
                return;
            }
        }

        // 2. Price Min Filter
        if (priceMin >= 0 && el.price < priceMin) {
            item.classList.add('hide');
            return;
        }

        // 3. Price Max Filter
        if (priceMax >= 0 && el.price > priceMax) {
            item.classList.add('hide');
            return;
        }
        
        // 4. Task 1: Category Filter
        if (category && category !== 'all') {
            if (el.category !== category) {
                item.classList.add('hide');
                return;
            }
        }

        // 5. Task 2: Rating Filter
        const selectedRating = parseFloat(rating); 
        if (selectedRating > 0) { 
            if (el.rating < selectedRating) { 
                item.classList.add('hide');
                return;
            }
        }

        // 6. Extra Functions Filter
        if (extraFunctions && extraFunctions.length) {
            const result = extraFunctions
                .every(extra => el.extraFunctions.includes(extra))
            if (!result) {
                item.classList.add('hide');
                return;
            }
        }


        item.classList.remove('hide');
    })
}

const setupFilters = (data) => {
    const searchInput = document.querySelector('#search-input')
    const priceMinInput = document.querySelector('#price-min')
    const priceMaxInput = document.querySelector('#price-max')
    const categorySelect = document.querySelector('.category select')


    
    const runFilters = () => {
        const checkedRatingInput = document.querySelector('input[name="rating-selector"]:checked');
        
        const params = {
            searchText: searchInput.value.trim().toLowerCase(),
            priceMin: parseInt(priceMinInput.value) || 0,
            priceMax: parseInt(priceMaxInput.value) || Infinity, 
            category: categorySelect.value,
            rating: checkedRatingInput ? parseFloat(checkedRatingInput.value) : 0,
            extraFunctions: getAllSelectedExtraFunctions()
        }
        filterItems(data, params) 
    }

    searchInput.addEventListener('input', runFilters)
    priceMinInput.addEventListener('input', runFilters)
    priceMaxInput.addEventListener('input', runFilters)
    categorySelect.addEventListener('change', runFilters)

    document.querySelectorAll('input[name="rating-selector"]').forEach(radio => {
        radio.addEventListener('change', runFilters);
    });

    document.querySelectorAll('.extra-functions-container input[type="checkbox"]')
        .forEach(checkboxInput => {
            checkboxInput.addEventListener('change', runFilters)
        })
}

const updateItemAvailabeCount = (id, count) => {
    document.querySelector(
        `.item[item-id="${id}"] .item-available-count`
    ).textContent = `Count: ${count}`
}

const createViewItem = (item, data) => {
    const cartViewItem = document.createElement('div')
    cartViewItem.classList.add('cart-view-item')

    const cartViewItemImage = document.createElement('div')
    cartViewItemImage.classList.add('image')
    cartViewItemImage.style = `--bgImg: url('${item.imageUrl}')`

    const cartViewItemName = document.createElement('div')
    cartViewItemName.classList.add('name')
    cartViewItemName.textContent = item.name

    const cartViewItemPrice = document.createElement('div')
    cartViewItemPrice.classList.add('price')
    cartViewItemPrice.textContent = item.price

    const itemCount = item.count
    const cartViewItemCount = document.createElement('div')
    cartViewItemCount.classList.add('count')
    
    const cartViewItemCountDec = document.createElement('div')
    cartViewItemCountDec.classList.add('decrease-count')
    cartViewItemCountDec.textContent = "-"

    cartViewItemCountDec.addEventListener('click', () => {
        updateCartItemCount(item.id, -1, data);
    })
    
    const cartViewItemCountValue = document.createElement('div')
    cartViewItemCountValue.classList.add('count-value')
    cartViewItemCountValue.textContent = itemCount
    
    const cartViewItemCountInc = document.createElement('div')
    cartViewItemCountInc.classList.add('increase-count')
    cartViewItemCountInc.textContent = "+"

    cartViewItemCountInc.addEventListener('click', () => {
        updateCartItemCount(item.id, 1, data);
    })
    
    cartViewItemCount.append(
        cartViewItemCountDec,
        cartViewItemCountValue,
        cartViewItemCountInc
    )

    const cartViewItemTotalItemPrice = document.createElement('div')
    cartViewItemTotalItemPrice.classList.add("total-item-price")
    cartViewItemTotalItemPrice.textContent = (itemCount * item.price).toFixed(2)

    const cartViewItemRemoveItem = document.createElement('div')
    cartViewItemRemoveItem.classList.add('remove-item')
    const cartViewItemRemoveItemImg = document.createElement('img')
    cartViewItemRemoveItemImg.src = "./imgs/delete.png"

    cartViewItemRemoveItemImg.addEventListener('click', () => {
        const index = cart.findIndex(el => el.id === item.id)
        if (index > -1) {
            const removedItemCount = cart[index].count;
            const product = data.find(el => el.id === item.id);
            
            if (product) {
                product.availableCount += removedItemCount;
            }

            cart.splice(index, 1)
            updateCartUI(data); 
        }
    })

    cartViewItemRemoveItem.appendChild(cartViewItemRemoveItemImg)

    cartViewItem.append(
        cartViewItemImage,
        cartViewItemName,
        cartViewItemPrice,
        cartViewItemCount,
        cartViewItemTotalItemPrice,
        cartViewItemRemoveItem,
    )
    return cartViewItem
}

const setTotalPrice = () => {
    let totalPrice = 0
    for (const el of cart) {
        totalPrice += el.count * el.price
    }

    document.querySelector('#total-price-value')
        .textContent = totalPrice.toFixed(2)
}

document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('./electronic_items_dataset.json')
    const data = await response.json()
    
    globalProductsData = data;

    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        const loadedCart = JSON.parse(storedCart);
        cart.push(...loadedCart);

        loadedCart.forEach(cartItem => {
            const product = globalProductsData.find(p => p.id === cartItem.id);
            if (product) {
                product.availableCount -= cartItem.count;
            }
        });
    }


    const items = document.querySelector('.items')
    globalProductsData.forEach(el => {
        const div = createItem(el)
        items.appendChild(div)
    })

    setCategoryValues(globalProductsData)
    setExtraFunctions(globalProductsData)

    setupFilters(globalProductsData)

    const cartViewWrapper = document.querySelector('.cart-view-wrapper')
    const cartViewList = document.querySelector('.cart-view-list')

    const closeCart = () => {
        cartViewWrapper.classList.add('hide')
    }

    const openCart = () => {
        cartViewWrapper.classList.remove('hide')
    }

    document.querySelector('.blur')
        .addEventListener('click', () => {
            closeCart()
        })

    document.querySelector('#cart-view-close')
        .addEventListener('click', () => {
            closeCart()
        })

    document.querySelector('.cart > div')
        .addEventListener('click', () => {
            cartViewList.innerHTML = ''

            const cartViewItems = cart.map(item => {
                return createViewItem(item, globalProductsData)
            })
            cartViewList.append(...cartViewItems)

            setTotalPrice()

            openCart()
        })

    updateCartUI(globalProductsData);

    document.querySelector('.loader')
        .classList.add('hide')
})