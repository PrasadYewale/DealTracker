# crawler_service/crawlers/amazon.py
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36"
}

def search_amazon(query):
    url = f"https://www.amazon.in/s?k={query.replace(' ', '+')}"
    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.text, "lxml")
    
    products = []

    for item in soup.select("div.s-result-item"):
        name_tag = item.select_one("h2 a span")
        price_tag = item.select_one(".a-price .a-offscreen")
        old_price_tag = item.select_one(".a-price .a-price-whole")  # Might need adjustment

        if name_tag and price_tag:
            name = name_tag.text.strip()
            price = price_tag.text.replace("₹", "").replace(",", "").strip()
            
            previous_price = old_price_tag.text.replace("₹", "").replace(",", "").strip() if old_price_tag else price
            discount_percentage = 0
            try:
                discount_percentage = round((float(previous_price) - float(price)) / float(previous_price) * 100)
            except:
                discount_percentage = 0

            image_tag = item.select_one("img.s-image")
            image_url = image_tag['src'] if image_tag else ""

            products.append({
                "name": name,
                "price": float(price),
                "previous_price": float(previous_price),
                "discount_percentage": discount_percentage,
                "image": image_url,
                "link": "https://www.amazon.in" + item.select_one("h2 a")["href"]
            })

        if len(products) >= 10:  # Limit results
            break

    return products
