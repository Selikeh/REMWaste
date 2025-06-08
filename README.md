
## Design and Development Approach

### Design:

The design was a simple one keeping in mind the functionalities of the original page. I decided to go for various tints of green since waste collection and management is in line with the green agenda. I also wanted to replicate the dark state of the original page so I went with a dark green color for the background with the other tints of green for the various elements. I decided to use white as well as yellow in a few instances for information so the page does not seem too monochromatic.

I also decided to stick with the grid arrangements for the product cards without making it too obvious that it is a card. It is only highlighted when hovered upon or selected.

### Functionality:

Functionality is broken down into 3 main parts:
1. Upon page load there is an HTTP request made to the provided API using fetch request in a useEffect hook to get the data for each product and then the response array is stored in a React state variable.

2. The data is mapped through and displayed as individual product cards showing some of the information for each product.

3. Upon clicking a product card, the details of that particular product are then stored in another state variable and then passed to a footer component which pops up to display more details about the product. The corresponding product card is also highlighted and its radio button input checked giving it more emphasis.