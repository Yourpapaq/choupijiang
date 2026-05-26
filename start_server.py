import os
import sys
import threading
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler

# 添加ngrok路径
os.environ['PATH'] += os.pathsep + r'C:\Users\rog\AppData\Local\Python\pythoncore-3.14-64\Scripts'

try:
    from pyngrok import ngrok
except ImportError:
    print("pyngrok not installed, installing...")
    os.system('pip install pyngrok')
    from pyngrok import ngrok

def start_http_server(port=8000):
    """启动HTTP服务器"""
    server = HTTPServer(('0.0.0.0', port), SimpleHTTPRequestHandler)
    print(f"HTTP server started on port {port}")
    server.serve_forever()

def main():
    # 在后台启动HTTP服务器
    server_thread = threading.Thread(target=start_http_server, daemon=True)
    server_thread.start()
    
    # 等待服务器启动
    time.sleep(2)
    
    # 使用ngrok创建隧道
    try:
        http_tunnel = ngrok.connect(8000, "http")
        print("\n🎉 服务器已启动！")
        print(f"📱 公开访问地址: {http_tunnel.public_url}")
        print(f"🔗 本地访问地址: http://localhost:8000")
        print("\n按 Ctrl+C 停止服务器")
        
        # 保持程序运行
        while True:
            time.sleep(1)
            
    except Exception as e:
        print(f"Error: {e}")
        ngrok.kill()

if __name__ == "__main__":
    main()