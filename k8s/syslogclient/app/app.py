from flask import Flask, request
import syslog
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/logs', methods=['POST'])
def receive_logs():
    log_data = request.json
   
    log_message = f"{log_data.get('event')} for user {log_data.get('user')}"

    # Send the log message to the system log
    syslog.syslog(syslog.LOG_INFO, log_message)
    print(log_message)

    return 'Log received', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0')
