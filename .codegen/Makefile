.DEFAULT_GOAL := build

clean:
	go clean
	rm -rf bin

update:
	go get -u github.com/uhppoted/uhppoted-codegen@main
	go mod tidy

update-release:
	go get -u github.com/uhppoted/uhppoted-codegen
	go mod tidy

format: 
	go fmt ./...

build: format
	mkdir -p bin
	go build -trimpath -o bin  ./... 

test: build
	go test ./...

vet:
	go vet ./...

debug: build

generate: build
	./bin/codegen --all
