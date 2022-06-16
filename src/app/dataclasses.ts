class User {
  id: number = 1;
  username: string = '';
  password: string = '';
}

// items on the shopping list for main supermarket
class MainListItem {
  _id: string = '';
  product: string = '';
  quantity: number = 1;
  productGroup: string =
    'Fruit and Veg' ||
    'Bakery' ||
    'Home baking' ||
    'Household' ||
    'Health and Beauty' ||
    'Frozen' ||
    'Meat and Fish' ||
    'Dairy' ||
    'Food cupboard' ||
    'Other';
}

// productgroups that the user can organize in any order depending how they want to
// print their shopping list
class ProductGroupOrder {
  productGroup: string =
    'Fruit and Veg' ||
    'Bakery' ||
    'Home baking' ||
    'Household' ||
    'Health and Beauty' ||
    'Frozen' ||
    'Meat and Fish' ||
    'Dairy' ||
    'Food cupboard' ||
    'Other';
}

// items on the shopping list for other shops
class OtherListItem {
  _id: string = '';
  product: string = '';
  comment: string = '';
}

// lists class that contains all three above lists
class Lists {
  mainListItems: [] = [];
  otherListItems: [] = [];
  productGroupOrder: [] = [];
}

export { User, MainListItem, ProductGroupOrder, OtherListItem, Lists };
