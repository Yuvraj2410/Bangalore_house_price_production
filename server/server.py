from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import util

print('Defining FastAPI app')
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Starting FastAPI Server For Home Price Prediction...")
util.load_saved_artifacts()


class HomePriceRequest(BaseModel):
    total_sqft: float
    location: str
    bhk: int
    bath: int
    balcony: int

@app.get("/get_location_names")
async def get_location_names():
    return {
        'locations': util.get_location_names()
    }

@app.post("/predict_home_price")
async def predict_home_price(
    request: HomePriceRequest
):
    estimated_price = util.get_estimated_price(request.location, request.total_sqft, request.bhk, request.bath, request.balcony)
    return {
        'estimated_price': estimated_price
    }

# if __name__ == "__main__":
#     # import uvicorn
#     print("Starting FastAPI Server For Home Price Prediction...")
#     util.load_saved_artifacts()
#     print(util.get_location_names())