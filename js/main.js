document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');  // ให้ตรงกับ id ใน index.html
    const loader = document.getElementById('loader');       // สำหรับ loading state
    let allProducts = [];

    // แสดง Loader
    function showLoader() {
        loader.style.display = 'block';
    }

    // ซ่อน Loader
    function hideLoader() {
        loader.style.display = 'none';
    }

    // แปลงราคาด้วย comma เช่น 12600 → 12,600
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // สร้างและแสดงสินค้าในหน้าเว็บ
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${formatPrice(product.price)} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // ดึงข้อมูลสินค้า
    async function fetchProducts() {
        showLoader();
        try {
            const response = await fetch('js/products.json');
            const data = await response.json();
            allProducts = data;
            displayProducts(allProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            hideLoader();
        }
    }

    // Event ค้นหา
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase(); // ✅ trim เพื่อลบช่องว่างหน้า-หลัง

        if (searchTerm === "") {
            displayProducts(allProducts);  // ✅ ถ้าเว้นว่าง → แสดงสินค้าทั้งหมด
            return;
        }

        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });

    fetchProducts();  // เริ่มต้นโหลดสินค้า
});
