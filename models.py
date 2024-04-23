
# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()  # Initialize the SQLAlchemy instance

class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Story {self.title}>"

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'date_created': self.date_created.isoformat()  # ISO formatted date
        }

