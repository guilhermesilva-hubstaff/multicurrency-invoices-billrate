import http.server, os

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get('PORT', 3000))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, *a): pass

with http.server.HTTPServer(("", PORT), Handler) as s:
    s.serve_forever()
