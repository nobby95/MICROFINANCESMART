
from flask import send_from_directory
from backend.app import app

# Serve React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("frontend/build/" + path):
        return send_from_directory('frontend/build', path)
    return send_from_directory('frontend/build', 'index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
