# Demoblaze E2E Tests with Playwright

This project contains automated tests for [Demoblaze](https://www.demoblaze.com/), a demo e-commerce site.  
The tests are written using [Playwright](https://playwright.dev/) and cover key user flows like product browsing, cart management, and checkout.

---

## 📦 Tech Stack  

<img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=white"/> 

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kdurdevic/demoblazePlaywright.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Run All Tests

```bash
npx playwright test
```

### 5. View Test Report

```bash
npx playwright show-report
```

---

## ✅ Covered Test Scenarios

- Navigate categories (Phones, Laptops, Monitors)  
- View product details  
- Add products to the cart  
- Remove products from the cart  
- Log in and log out  
- Complete a purchase with confirmation  

---

## 🧰 Useful Commands

Run tests in headless mode:

```bash
npx playwright test
```

Run tests in headed (UI) mode:

```bash
npx playwright test --headed
```

Run tests with debugger:

```bash
npx playwright test --debug
```

---

## 📸 Screenshots and Videos

Playwright captures screenshots and videos on test failures. You’ll find them in the `test-results/` folder after test execution.

---