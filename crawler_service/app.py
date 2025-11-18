# crawler_service/app.py
from fastapi import FastAPI, Query
from crawlers import amazon, flipkart

app = FastAPI(title="Deal Tracker Crawler API")

@app.get("/search")
async def search(query: str = Query(..., min_length=1)):
    amazon_results = amazon.search_amazon(query)
    flipkart_results = flipkart.search_flipkart(query)
    
    # Sort by discount descending
    amazon_results.sort(key=lambda x: x.get("discount_percentage", 0), reverse=True)
    flipkart_results.sort(key=lambda x: x.get("discount_percentage", 0), reverse=True)
    
    return {"amazon": amazon_results, "flipkart": flipkart_results}
