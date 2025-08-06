FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
ARG TARGETARCH=amd64
#RUN go build -o k8s-custom-controller
RUN CGO_ENABLED=0 GOOS=linux GOARCH=$TARGETARCH go build -o backend main.go

# Final stage
FROM alpine:latest
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/backend /backend

EXPOSE 8000
CMD ["/backend"]