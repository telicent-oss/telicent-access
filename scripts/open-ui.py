
import webbrowser
import sys

def open_browser(url):
    try:
        webbrowser.open_new_tab(url)
        print(f"Successfully opened {url} in a new browser tab.")
    except webbrowser.Error as e:
        print(f"Failed to open the browser. Error: {e}")
        sys.exit(1)

# URL to open
url = "http://localhost:8080/access"

# Open URL in the default web browser
open_browser(url)