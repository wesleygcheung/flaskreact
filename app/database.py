import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    uid = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String)
    email = sa.Column(sa.String)