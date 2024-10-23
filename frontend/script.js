document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Product added to cart!');
        });
    });

    const productContainer = document.querySelector('.products');

    // 从后端获取产品数据
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                
                productContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

});
