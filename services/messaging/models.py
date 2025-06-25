from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    channel_id = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    parent_message_id = Column(Integer, ForeignKey('messages.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Channel(Base):
    __tablename__ = "channels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)