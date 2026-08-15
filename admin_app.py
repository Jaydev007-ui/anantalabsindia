import webview
import os
import sys

def get_url():
    default_url = "http://localhost:3000/admin"
    config_file = "server_url.txt"
    
    # Detect the executable directory whether running as raw python or packaged .exe
    if getattr(sys, 'frozen', False):
        exe_dir = os.path.dirname(sys.executable)
    else:
        exe_dir = os.path.dirname(os.path.abspath(__file__))
        
    config_path = os.path.join(exe_dir, config_file)
    
    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                url = f.read().strip()
                if url.startswith("http://") or url.startswith("https://"):
                    # Append /admin route if omitted
                    if not url.endswith("/admin") and "/admin" not in url:
                        if url.endswith("/"):
                            url = url[:-1]
                        url += "/admin"
                    return url
        except Exception as e:
            print(f"Error reading {config_file}: {e}")
            
    # Auto-create config file with default localhost url if missing
    try:
        with open(config_path, "w", encoding="utf-8") as f:
            f.write(default_url)
    except Exception as e:
        print(f"Error writing default {config_file}: {e}")
        
    return default_url

def main():
    url = get_url()
    print(f"Loading Ananta Labs Admin Console: {url}")
    
    window = webview.create_window(
        title="Ananta Labs India - Secure Admin Console",
        url=url,
        width=1280,
        height=800,
        min_size=(1024, 700),
        resizable=True
    )
    webview.start()

if __name__ == '__main__':
    main()
