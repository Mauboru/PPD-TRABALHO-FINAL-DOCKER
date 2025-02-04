from typing import List
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Importando o middleware CORS
from pydantic import BaseModel
from requests import Session
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Definindo o banco de dados
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@products_db/products_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"charset": "utf8mb4"})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Definindo o modelo Produto
class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    description = Column(String(500))
    price = Column(Integer)

Base.metadata.create_all(bind=engine)

# Criando o aplicativo FastAPI
app = FastAPI()

# Configuração de CORS
origins = [
    "http://localhost:3000",  # Substitua pelo domínio do seu frontend se for diferente
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir apenas o frontend local
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos HTTP
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

# Modelo de dados do Produto (para input e output)
class ProductCreate(BaseModel):
    name: str
    description: str
    price: int

class ProductInDB(ProductCreate):
    id: int

    class Config:
        orm_mode = True

# Função para obter a sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para criar um novo produto
@app.post("/products/", response_model=ProductInDB)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(name=product.name, description=product.description, price=product.price)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Endpoint para listar todos os produtos
@app.get("/products/", response_model=List[ProductInDB])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products