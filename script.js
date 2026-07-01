let products = JSON.parse(localStorage.getItem("products")) || [];

let currentCategory = "all";

const menu = document.getElementById("menu");
const logoPreview = document.getElementById("logoPreview");
const cafeVideo = document.getElementById("cafeVideo");

const savedLogo = localStorage.getItem("logo");

if (savedLogo) {
    logoPreview.src = savedLogo;
}

if (cafeVideo) {
    cafeVideo.src = "video.mp4";
}

function renderProducts() {

    menu.innerHTML = "";

    const list = currentCategory === "all"
        ? products
        : products.filter(p => p.category === currentCategory);

    if (list.length === 0) {

        menu.innerHTML = `
            <h2 style="text-align:center;color:#d4af37;padding:50px;">
                محصولی وجود ندارد
            </h2>
        `;

        return;
    }

    list.forEach((product, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${Number(product.price).toLocaleString()} تومان</p>

            <button class="deleteBtn"
                onclick="deleteProduct(${index})">
                حذف محصول
            </button>
        `;

        menu.appendChild(card);

    });

}

renderProducts();

function filterCategory(category) {

    currentCategory = category;

    document.querySelectorAll(".cat").forEach(btn => {

        btn.classList.remove("active");

    });

    renderProducts();

}
function openAdmin() {

    const pass = prompt("رمز مدیریت را وارد کنید");

    if (pass === "4030") {

        document
            .getElementById("adminPanel")
            .classList.remove("hidden");

    } else {

        alert("رمز اشتباه است");

    }

}

function closeAdmin() {

    document
        .getElementById("adminPanel")
        .classList.add("hidden");

}

function saveProduct() {

    const name = document.getElementById("name").value.trim();

    const price = document.getElementById("price").value.trim();

    const category = document.getElementById("category").value;

    const image = document.getElementById("image").value.trim();

    const logoInput = document.getElementById("logo");
    const logoFile = logoInput ? logoInput.files[0] : null;

    if (name === "" || price === "") {

        alert("نام و قیمت را وارد کنید");
        return;

    }

    if (image === "") {

        alert("آدرس عکس را وارد کنید");
        return;

    }

    // ذخیره محصول
    products.push({

        name: name,
        price: price,
        category: category,
        image: image

    });

    // ذخیره در LocalStorage
    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();

    // پاک کردن فرم
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";

    // ذخیره لوگو (اختیاری)
    if (logoFile) {

        const logoReader = new FileReader();

        logoReader.onload = function (e) {

            logoPreview.src = e.target.result;

            localStorage.setItem(
                "logo",
                e.target.result
            );

        };

        logoReader.readAsDataURL(logoFile);

    }

    alert("محصول با موفقیت ثبت شد.");

    closeAdmin();

}
