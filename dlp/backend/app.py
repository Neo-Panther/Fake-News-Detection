from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route('/api/detect-fake-news', methods=['POST'])
def detect_fake_news():
    news_text = request.json['text']
    help = request.json['help']
    fake_score = random.uniform(0, 7)
    is_fake = fake_score > 3.5

    return jsonify({
        'help': help,
        'isFake': is_fake,
        'confidence': fake_score/7
    })


if __name__ == '__main__':
    app.run(debug=True)
