from typing import List
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from requests import Session
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@clients_db/clients_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"charset": "utf8mb4"})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Client(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    phone = Column(String(500))

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

class ClientCreate(BaseModel):
    name: str
    phone: str

class ClientInclients_db(ClientCreate):
    id: int

    class Config:
        orm_mode = True

def get_clients_db():
    clients_db = SessionLocal()
    try:
        yield clients_db
    finally:
        clients_db.close()

@app.post("/clients/", response_model=ClientInclients_db)
def create_client(client: ClientCreate, clients_db: Session = Depends(get_clients_db)):
    clients_db_client = Client(name=client.name, phone=client.phone)
    clients_db.add(clients_db_client)
    clients_db.commit()
    clients_db.refresh(clients_db_client)
    return clients_db_client

@app.get("/clients/", response_model=List[ClientInclients_db])
def get_clients(clients_db: Session = Depends(get_clients_db)):
    clients = clients_db.query(Client).all()
    return clients