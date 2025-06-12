export function generateDiscountEmail(data: DiscountEmailData): string {
  const { user, discountCode, suggestedProducts } = data;

  const emailBody = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Birthday Surprise</title>
      <style>
        body {
          font-family: "Segoe UI", sans-serif;
          background-color: #fef6f2;
          padding: 20px;
          color: #333;
        }
        .container {
          max-width: 700px;
          margin: auto;
          background-color: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #ff6f61;
          margin-bottom: 10px;
        }
        .highlight {
          background-color: #fff3cd;
          color: #856404;
          padding: 15px 20px;
          border-radius: 8px;
          font-size: 18px;
          display: inline-block;
          margin: 20px 0;
          font-weight: bold;
        }
        .discount-banner {
          background-color: #e0f7fa;
          color: #00796b;
          padding: 12px;
          border-radius: 6px;
          font-size: 16px;
          text-align: center;
          margin-bottom: 25px;
        }
        .products {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .product {
          width: 200px;
          text-align: center;
        }
        .product img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .product img:hover {
          transform: scale(1.05);
        }
        .product-name {
          margin-top: 8px;
          font-weight: 500;
          font-size: 14px;
        }
.cta {
  margin-top: 20px;
  text-align: center;
}
.cta a {
  text-decoration: none;
  background-color: #ff6f61;
  color: white;
  padding: 12px 25px;
  border-radius: 6px;
  font-weight: bold;
  display: inline-block;
  margin-top: 15px;
}
        .footer {
          margin-top: 40px;
          font-size: 14px;
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Happy Birthday, ${user.name}! 🎉</h1>
          <p>We’ve prepared something special just for you.</p>
          <div class="highlight">🎁 Use Code <strong>${discountCode}</strong> to get <span style="color: green;">15% OFF</span>!</div>
        </div>

        <div class="discount-banner">
          💡 Hurry! Your exclusive birthday discount is valid for one week only.
        </div>

        <p>We’ve handpicked these for you:</p>

        <div class="products">
          ${suggestedProducts
            .map(
              (p) => `
              <div class="product">
                  <img src="${p.image}" alt="${p.name}" />
                <div class="product-name">${p.name}</div>
              </div>
            `
            )
            .join("")}
        </div>

        <div class="cta">
          <a href="https://play.google.com/store/apps/details?id=your.app.package&ref=more-products" target="_blank">
            🔍 View More Picks for You
          </a>
        </div>
        <div class="footer">
          Enjoy your week and treat yourself!<br />
          With love, from YourApp Team ❤️
        </div>
      </div>
    </body>
  </html>
  `;

  return emailBody;
}
