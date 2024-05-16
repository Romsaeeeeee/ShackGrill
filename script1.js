let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".left-panel");
const plusbtns = document.querySelectorAll('[class^="plus"]');
const minusbtns = document.querySelectorAll('[class^="minus"]');
const quantityNums = document.querySelectorAll('[id^="quantity"]');
const amountNums = document.querySelectorAll('[class^="amount"]');
const usages = document.querySelectorAll('[class^="usage"]');
const statuses = document.querySelectorAll('[class^="status"]');
const thinskewer = document.querySelector(".itemsamount1");
const thickskewer = document.querySelector(".itemsamount2");
const thinStatus = document.querySelector(".itemstatus1");
const thickStatus = document.querySelector(".itemstatus2");
const thinUsage = document.querySelector(".itemusage1");
const thickUsage = document.querySelector(".itemusage2");
const orderUp = document.querySelector(".proceed");
const restock = document.querySelector(".restock");
const toast = document.getElementById("toast");
const prodName = document.querySelectorAll('[class^="productName"]');
const date = document.querySelectorAll('[class^="date"]');
const lowstock = document.querySelector(".low-stock");
const nostock = document.querySelector(".out-of-stock");
const Overallinven = document.querySelector(".total-inventory");
const totalIncome = document.querySelector(".total");
let logout = document.querySelector(".logout");
let reStock = document.querySelector(".restock");
const productNames = [
  "Paa ng Manok",
  "Leeg ng Manok",
  "Hotdog",
  "Isaw ng Manok",
  "Hita ng Manok",
  "Tenga ng Baboy",
  "Tokwa",
  "Chicken BBQ",
];
let counts = Array.from({ length: 8 }, () => 0);
let numbers = Array.from({ length: 8 }, () => 50);
let totalUsages = Array.from({ length: 8 }, () => 0);
const prices = [10.0, 15.0, 15.0, 5.0, 50.0, 10.0, 10.0, 35.0];
let totalPrice = 0;
let tSkewer = 300;
let thSkewer = 100;
let thinUse = 0;
let thickUse = 0;
let lowStockCount = Array.from({ length: 8 }, () => 0);
let nostockCount = Array.from({ length: 8 }, () => 0);
let inventoryCount = 800;
btn.onclick = () => sidebar.classList.toggle("active");

logout.addEventListener("click", function () {
  window.location.href = "login.html";
});
reStock.addEventListener("click", function () {
  location.reload();
});
function hideAllScenes() {
  var scenes = document.querySelectorAll(".scene");
  scenes.forEach(function (scene) {
    scene.style.display = "none";
  });
}

function showScene(sceneId) {
  hideAllScenes();
  switch (sceneId) {
    case "dashboard-link":
      document.getElementById("dashboard-scene").style.display = "grid";
      break;
    case "user-link":
      document.getElementById("user-scene").style.display = "grid";
      break;
    case "inventory-link":
      document.getElementById("inventory-scene").style.display = "grid";
      break;
    case "products-link":
      document.getElementById("products-scene").style.display = "grid";
      break;
  }
}

showScene("dashboard-link");

function handleInputChange(input, i) {
  input.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    let numericValue = parseInt(inputValue || 0);
    const remainingQuantity = 50 - totalUsages[i];
    numericValue = Math.min(numericValue, remainingQuantity);
    if (numericValue < 0) {
      numericValue = 0;
    }
    event.target.value = numericValue;
    counts[i] = numericValue;
  });
  input.addEventListener("input", function () {
    counts[i] = parseInt(input.value) || 0;
  });
}

function handleButtonClick(plus, i) {
  return () => {
    const count = counts[i];
    const remainingQuantity = 50 - totalUsages[i];

    if (plus && count < remainingQuantity) {
      counts[i]++;
    } else if (!plus && remainingQuantity > 0) {
      counts[i]--;
    }
    quantityNums[i].value = counts[i];
    if (counts[i] < remainingQuantity) {
      plusbtns[i].style.backgroundColor = "green";
    } else if (counts[i] == remainingQuantity) {
      plusbtns[i].style.backgroundColor = "gray";
    }
    if (counts[i] > 0) {
      minusbtns[i].style.backgroundColor = "maroon";
      minusbtns[i].disabled = false;
    } else if (counts[i] <= 0) {
      minusbtns[i].style.backgroundColor = "gray";
      minusbtns[i].disabled = true;
    }
  };
}

quantityNums.forEach(handleInputChange);
plusbtns.forEach((plusbtn, i) =>
  plusbtn.addEventListener("click", handleButtonClick(true, i))
);
minusbtns.forEach((minusbtn, i) =>
  minusbtn.addEventListener("click", handleButtonClick(false, i))
);

function updateProductNames() {
  productNames.forEach((productName, i) => {
    prodName[i].textContent = `${productName} (${counts[i]})`;
  });
}
function displayRecentOrders() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  productNames.forEach((productName, i) => {
    if (counts[i] > 0) {
      date[i].textContent = formattedDate;
    }
  });
}

orderUp.addEventListener("click", function () {
  let totalQuantity = counts.reduce((acc, curr) => acc + curr, 0);
  if (totalQuantity === 0) {
    toast.textContent = "Please enter a quantity";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 1500);
    return;
  }
  counts.forEach((count, i) => {
    totalPrice += count * prices[i];
  });
  totalIncome.textContent = totalPrice;
  document.querySelector(".total").textContent = "₱ " + totalPrice.toFixed(2);
  tSkewer -=
    counts[0] + counts[1] + counts[2] + counts[3] + counts[5] + counts[6];
  thSkewer -= counts[4] + counts[7];
  thinUse +=
    counts[0] + counts[1] + counts[2] + counts[3] + counts[5] + counts[6];
  thickUse += counts[4] + counts[7];
  thinskewer.textContent = tSkewer;
  thickskewer.textContent = thSkewer;
  thinUsage.textContent = thinUse;
  thickUsage.textContent = thickUse;
  inventoryCount -= thinUse + thickUse;
  Overallinven.textContent = inventoryCount;
  updateProductNames();
  displayRecentOrders();
  if (thSkewer === 0 && tSkewer === 0) {
    thinStatus.textContent = "Out of Stock";
    thickStatus.textContent = "Out of Stock";
    thickStatus.style.color = "red";
    thinStatus.style.color = "red";
  } else {
    thinStatus.textContent = "In-Stock";
    thickStatus.textContent = "In-Stock";
  }
  counts.forEach((count, i) => {
    let allOutOfStock = false;
    numbers[i] -= count;
    totalUsages[i] += count;
    usages[i].textContent = totalUsages[i];
    amountNums[i].textContent = numbers[i];
    counts[i] = 0;
    quantityNums[i].value = counts[i];
    minusbtns[i].style.backgroundColor = "gray";

    if (totalUsages[i] == 50) {
      statuses[i].textContent = "Out of Stock";
      statuses[i].style.color = "red";
    } else {
      statuses[i].textContent = "In-Stock";
      statuses[i].style.color = "green";
      allOutOfStock = false;
    }
    for (let i = 0; i < totalUsages.length; i++) {
      if (totalUsages[i] === 50) {
        quantityNums[i].disabled = true;
        plusbtns[i].disabled = true;
        plusbtns[i].style.backgroundColor = "gray";
      } else {
        plusbtns[i].disabled = false;
        minusbtns[i].disabled = false;
        quantityNums[i].disabled = false;
      }
    }
    totalUsages.forEach((usage, i) => {
      if (usage === 40 && usage != 50) {
        if (lowStockCount[i] < 1) {
          lowStockCount[i]++;
          lowstock.textContent = lowStockCount.reduce((a, b) => a + b, 0);
        }
      } else if (usage === 50) {
        lowStockCount[i] = 0;
        lowstock.textContent = lowStockCount.reduce((a, b) => a + b, 0);
        if (nostockCount[i] < 1) {
          nostockCount[i]++;
          nostock.textContent = nostockCount.reduce((a, b) => a + b, 0);
        }
      }
    });
  });
  toast.textContent = "Order has been completed";
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
});
