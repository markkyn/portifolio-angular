FROM ubuntu:latest
LABEL authors="marco"

ENTRYPOINT ["top", "-b"]
