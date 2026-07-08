// ===========================
// ELEMENT
// ===========================

const productContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const buttons = document.querySelectorAll(".kategori button");

let products = [];

// ===========================
// LOAD PRODUCTS
// ===========================

async function loadProducts() {

    try {

        const response = await fetch("data/products.json");

        products = await response.json();

        displayProducts(products);

    } catch (error) {

        productContainer.innerHTML = `
            <h2 style="text-align:center;padding:50px;">
                Gagal memuat produk.
            </h2>
        `;

        console.error(error);

    }

}

// ===========================
// TAMPILKAN PRODUK
// ===========================

function displayProducts(data) {

    productContainer.innerHTML = "";

    if (data.length === 0) {

        productContainer.innerHTML = `
            <h2 style="text-align:center;padding:50px;">
                Produk tidak ditemukan.
            </h2>

            `;

        return;
    }

    data.forEach(product => {

        productContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="content">

                ${product.viral ? '<span class="badge-viral">🔥 Viral</span>' : ''}

                ${product.status === "Baru" ? '<span class="badge-baru">🆕 Baru</span>' : ''}

                <br><br>

                <span class="kode">
                    Kode : ${product.id}
                </span>

                <h2>${product.name}</h2>

                <div class="info">

                    <span>⭐ ${product.rating}</span>

                    <span>👥 ${product.sold} Terjual</span>

                </div>

                <p class="harga">

                    ${product.price}

                </p>

                <a href="${product.link}" target="_blank">

                    🛍️ Beli sekarang

                </a>

            </div>

            `;

    });

}

// ===========================
// SEARCH
// ===========================

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const result = products.filter(product =>

        product.id.toLowerCase().includes(keyword) ||

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    displayProducts(result);

    });

// ===========================
// FILTER KATEGORI
// ===========================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "Semua") {

            displayProducts(products);

            return;

        }

        const filtered = products.filter(product => product.category === category);

        displayProducts(filtered);

    });

});

// ===========================
// START
// ===========================

loadProducts();

// ===========================
// BANNER SLIDER
// ===========================

const banner = document.getElementById("banner-slider");

const banners = [
    "images/banner.png",
    "images/banner.jpg",
    "images/banner.webp"
];

let currentBanner = 0;

setInterval(() => {

    currentBanner++;

    if (currentBanner >= banners.length) {
        currentBanner = 0;
    }

    banner.src = banners[currentBanner];

}, 4000);