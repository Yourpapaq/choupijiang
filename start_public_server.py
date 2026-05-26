import subprocess
import threading
import time
import sys

def start_http_server():
    """启动HTTP服务器"""
    server = subprocess.Popen([sys.executable, "-m", "http.server", "8000"], 
                            stdout=subprocess.PIPE, 
                            stderr=subprocess.PIPE)
    return server

def start_localtunnel():
    """启动localtunnel"""
    # 先安装localtunnel
    install_cmd = ["npm", "install", "-g", "localtunnel"]
    subprocess.run(install_cmd, capture_output=True)
    
    # 启动localtunnel
    tunnel = subprocess.Popen(["lt", "--port", "8000"],
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT,
                            text=True)
    
    # 读取输出找公开地址
    while True:
        line = tunnel.stdout.readline()
        if line:
            print(line.strip())
            if "your url is" in line.lower():
                # 提取URL
                parts = line.split()
                if len(parts) >= 5:
                    url = parts[-1]
                    print(f"\n🎉 公开访问地址: {url}")
                    print(f"📱 在手机浏览器中打开这个网址即可访问！")
        if tunnel.poll() is not None:
            break

def main():
    print("🚀 正在启动服务器...")
    
    # 启动HTTP服务器
    server = start_http_server()
    print("✅ HTTP服务器已启动")
    
    # 等待服务器启动
    time.sleep(2)
    
    # 启动localtunnel
    print("🔄 正在创建公开隧道...")
    tunnel_thread = threading.Thread(target=start_localtunnel, daemon=True)
    tunnel_thread.start()
    
    # 保持运行
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n⏹️ 正在停止服务器...")
        server.terminate()

if __name__ == "__main__":
    main()