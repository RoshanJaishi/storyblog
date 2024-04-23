
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os  # For environment variables

app = Flask(__name__)

# Load database configuration from environment variable
POSTGRES_URL = os.environ.get('DATABASE_URL')
if POSTGRES_URL is None:
    raise ValueError("DATABASE_URL environment variable not set!")

app.config['SQLALCHEMY_DATABASE_URI'] = POSTGRES_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Recommended for performance

db = SQLAlchemy(app)

# Import the Story model after app initialization
from models import Story


# API routes
@app.route('/stories', methods=['GET', 'POST'])
def get_or_create_stories():
    # Implement logic to handle GET and POST requests for stories
    pass

@app.route('/posts', methods=['GET', 'POST'])
def get_or_create_posts():
    if request.method == 'GET':
        posts = Story.query.all()
        return jsonify([post.serialize() for post in posts])
    elif request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('title') or not data.get('content'):
            return jsonify({'error': 'Missing required fields'}), 400  # Bad request
        new_post = Story(title=data['title'], content=data['content'], date_created=datetime.utcnow())
        db.session.add(new_post)
        try:
            db.session.commit()
        except Exception as e:
            # Handle database errors (e.g., rollback changes)
            db.session.rollback()
            return jsonify({'error': f'Database error: {str(e)}'}), 500  # Internal server error
        return jsonify(new_post.serialize()), 201  # Created

@app.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def get_update_or_delete_post(post_id):
    post = Story.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if request.method == 'GET':
        return jsonify(post.serialize())
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing data'}), 400
        post.title = data.get('title', post.title)
        post.content = data.get('content', post.content)
        try:
            db.session.commit()
        except Exception as e:
            # Handle database errors (e.g., rollback changes)
            db.session.rollback()
            return jsonify({'error': f'Database error: {str(e)}'}), 500  # Internal server error
        return jsonify(post.serialize())
    elif request.method == 'DELETE':
        db.session.delete(post)
        try:
            db.session.commit()
        except Exception as e:
            # Handle database errors (e.g., rollback changes)
            db.session.rollback()
            return jsonify({'error': f'Database error: {str(e)}'}), 500  # Internal server error
        return jsonify({'message': 'Post deleted'}), 204  # No content

@app.route('/test_db')
def test_db():
    try:
        db.session.query(Story).first()  # Try a simple query
        return jsonify({'message': 'Database connection successful!'})
    except Exception as e:
        return jsonify({'error': f'Database connection error: {str(e)}'}), 500  # Internal server error

@app.cli.command("initdb")
def initdb_command():
    """Initializes the database."""
    with app.app_context():
        db.create_all()
        print("Database tables created!")

if __name__ == "__main__":
    initdb_command()  # Run the command on application startup
    app.run(debug=True)
