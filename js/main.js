document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const productList = document.getElementById('product-list');
  const searchInput = document.getElementById('searchInput');
  let allProducts = [];

  loader.style.display = 'block'; // แสดง loader

  fetch('js/products.json')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      displayProducts(allProducts);
      loader.style.display = 'none'; // ซ่อน loader เมื่อโหลดเสร็จ
    });

  function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>ราคา: ${product.price.toLocaleString()} บาท</p>
      `;
      productList.appendChild(card);
    });
  }

  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
  });
});