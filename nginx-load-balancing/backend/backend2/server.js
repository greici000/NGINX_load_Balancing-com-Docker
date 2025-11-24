const http = require('http');
const os = require('os');
const port = 8080;

const server = http.createServer((req, res) => {
  const hostname = os.hostname();
  
  // HTML completo e estilizado mesmo usado no backend1
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Load Balancing Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            text-align: center;
            max-width: 500px;
            width: 100%;
            animation: fadeIn 0.8s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .server-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .server-info {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            border-left: 5px solid #667eea;
        }
        
        .server-id {
            font-family: 'Courier New', monospace;
            background: #333;
            color: #00ff9d;
            padding: 10px 15px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.1rem;
            margin: 15px 0;
            display: inline-block;
        }
        
        .port-badge {
            background: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-block;
            margin-top: 10px;
        }
        
        .stats {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .stat-item {
            background: #f1f3f4;
            padding: 15px;
            border-radius: 12px;
            min-width: 120px;
        }
        
        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
        }
        
        .footer {
            margin-top: 30px;
            color: #888;
            font-size: 0.9rem;
        }
        
        .load-balancer-badge {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            margin-left: 10px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 25px;
            }
            
            h1 {
                font-size: 1.5rem;
            }
            
            .stats {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="server-icon">🚀</div>
        <h1>Servidor Backend <span class="load-balancer-badge">LOAD BALANCED</span></h1>
        <p class="subtitle">Sistema de Balanceamento de Carga</p>
        
        <div class="server-info">
            <p><strong>Servidor Atual:</strong></p>
            <div class="server-id">${hostname}</div>
            <div class="port-badge">Porta: ${port}</div>
        </div>
        
        <div class="stats">
            <div class="stat-item">
                <div class="stat-value">${Math.floor(Math.random() * 100) + 1}%</div>
                <div class="stat-label">CPU Usage</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${Math.floor(Math.random() * 512) + 128}MB</div>
                <div class="stat-label">Memory</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${Math.floor(Math.random() * 1000) + 100}</div>
                <div class="stat-label">Requests</div>
            </div>
        </div>
        
        <div class="footer">
            🔄 Recarregue a página para ver o balanceamento em ação
        </div>
    </div>
    
    <script>
        // Efeitos interativos
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.container');
            
            // Efeito de hover
            container.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            container.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Atualizar stats a cada 5 segundos
            setInterval(() => {
                const stats = document.querySelectorAll('.stat-value');
                stats[0].textContent = Math.floor(Math.random() * 100) + 1 + '%';
                stats[1].textContent = Math.floor(Math.random() * 512) + 128 + 'MB';
                stats[2].textContent = Math.floor(Math.random() * 100) + parseInt(stats[2].textContent);
            }, 5000);
        });
    </script>
</body>
</html>
  `;

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  
  res.end(html);
});

server.listen(port, () => {
  console.log(`🎨 Servidor com interface HTML rodando em http://localhost:${port}/`);
});
