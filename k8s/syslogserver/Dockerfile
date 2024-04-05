FROM ubuntu:20.04

RUN apt-get update && apt-get install -y rsyslog

# Replace the default configuration file 
COPY rsyslog.conf /etc/rsyslog.conf

EXPOSE 514/udp
EXPOSE 514/tcp

CMD ["rsyslogd", "-n"]