let products = JSON.parse(localStorage.getItem("products")) || [];

let currentCategory = "all";

const menu = document.getElementById("menu");
const logoPreview = document.getElementById("logoPreview");
const cafeVideo = document.getElementById("cafeVideo");

const savedLogo = localStorage.getItem("logo");

if(savedLogo){
    logoPreview.src = savedLogo;
}

cafeVideo.src = "video.mp4";

function renderProducts(){

    menu.innerHTML="";

    let list = currentCategory==="all"
        ? products
        : products.filter(p=>p.category===currentCategory);

    if(list.length===0){

        menu.innerHTML=`
        <h2 style="
        text-align:center;
        width:100%;
        color:#d4af37;
        padding:50px;">
        محصولی وجود ندارد
        </h2>`;

        return;

    }

    list.forEach((product,index)=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>${Number(product.price).toLocaleString()} تومان</p>

        <button
        class="deleteBtn"
        onclick="deleteProduct(${index})">

        حذف محصول

        </button>

        `;

        menu.appendChild(card);

    });

}

renderProducts();

function filterCategory(category){

    currentCategory=category;

    document.querySelectorAll(".cat").forEach(btn=>{

        btn.classList.remove("active");

    });

    renderProducts();

}
function openAdmin(){

    const pass = prompt("رمز مدیریت را وارد کنید");

    if(pass === "4030"){

        document
        .getElementById("adminPanel")
        .classList.remove("hidden");

    }else{

        alert("رمز اشتباه است");

    }

}

function closeAdmin(){

    document
    .getElementById("adminPanel")
    .classList.add("hidden");

}

function saveProduct(){

    const name =
    document.getElementById("name").value.trim();

    const price =
    document.getElementById("price").value.trim();

    const category =
    document.getElementById("category").value;

    const imageFile =
    document.getElementById("image").files[0];

    const logoFile =
    document.getElementById("logo").files[0];

    if(name==="" || price===""){

        alert("نام و قیمت را وارد کنید");

        return;

    }

    if(!imageFile){

        alert("لطفاً عکس محصول را انتخاب کنید.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function(e){

        products.push({

            name:name,

            price:price,

            category:category,

            image:e.target.result

        });

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        renderProducts();

        document.getElementById("name").value="";
        document.getElementById("price").value="";
        document.getElementById("image").value="";

        alert("محصول با موفقیت ثبت شد.");

    };

    reader.readAsDataURL(imageFile);

    if(logoFile){

        const logoReader = new FileReader();

        logoReader.onload = function(ev){

            logoPreview.src = ev.target.result;

            localStorage.setItem(
                "logo",
                ev.target.result
            );

        };

        logoReader.readAsDataURL(logoFile);

    }

}
function deleteProduct(index){

    const pass = prompt("رمز مدیریت را وارد کنید");

    if(pass !== "4030"){

        alert("رمز اشتباه است.");

        return;

    }

    const ok = confirm(
        "آیا از حذف این محصول مطمئن هستید؟"
    );

    if(!ok){

        return;

    }

    products.splice(index,1);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();

    alert("محصول حذف شد.");

}

window.addEventListener("load",()=>{

    renderProducts();

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeAdmin();

    }

});
