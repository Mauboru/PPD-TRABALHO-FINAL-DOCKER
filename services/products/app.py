from typing import List
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from requests import Session
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@products_db/products_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"charset": "utf8mb4"})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    description = Column(String(500))
    price = Column(Integer)

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

class ProductCreate(BaseModel):
    name: str
    description: str
    price: int

class ProductInproducts_db(ProductCreate):
    id: int

    class Config:
        orm_mode = True

def get_products_db():
    products_db = SessionLocal()
    try:
        yield products_db
    finally:
        products_db.close()

@app.post("/products/", response_model=ProductInproducts_db)
def create_product(product: ProductCreate, products_db: Session = Depends(get_products_db)):
    products_db_product = Product(name=product.name, description=product.description, price=product.price)
    products_db.add(products_db_product)
    products_db.commit()
    products_db.refresh(products_db_product)
    return products_db_product

@app.get("/products/", response_model=List[ProductInproducts_db])
def get_products(products_db: Session = Depends(get_products_db)):
    products = products_db.query(Product).all()
    return products
