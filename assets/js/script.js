document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const cartWrapper = document.querySelector(".cart__wrapper");
  const cart = document.querySelector(".cart");
  const checkoutButton = document.querySelector(".button");
  let itemCount = 0;

  products.forEach((product, index) => {
      product.setAttribute("data-item", `item-${index}`);
  });

  products.forEach(product => {
      product.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text", product.dataset.item);
      });
  });

  cart.addEventListener("dragover", (e) => {
      e.preventDefault();
      cart.classList.add("over");
  });

  cart.addEventListener("dragleave", () => {
      cart.classList.remove("over");
  });

  cart.addEventListener("drop", (e) => {
      e.preventDefault();
      cart.classList.remove("over");

      const itemId = e.dataTransfer.getData("text");
      const product = document.querySelector(`[data-item='${itemId}']`);

      if (product && product.parentElement.classList.contains("product-list")) {
          const productClone = product.cloneNode(true);
          productClone.classList.add("product_in");
          productClone.setAttribute("draggable", "false");
          product.classList.add("product_hidden");
          cartWrapper.appendChild(productClone);
          itemCount++;
          updateCheckoutButton();
      }
  });

  function updateCheckoutButton() {
      if (itemCount >= 3) {
          checkoutButton.classList.add("button_active");
      } else {
          checkoutButton.classList.remove("button_active");
      }
  }
});
