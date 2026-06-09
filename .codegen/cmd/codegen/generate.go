package main

import (
	"fmt"
	"os"

	"codegen/encode"
)

var args = struct {
	encode           bool
	decode           bool
	integrationTests bool
}{
	encode:           false,
	decode:           false,
	integrationTests: false,
}

func main() {
	fmt.Printf("\n--- uhppoted-lib-nodels::codegen\n\n")

	if len(os.Args) > 1 {
		for _, arg := range os.Args[1:] {
			switch arg {
			case "--encode":
				args.encode = true

			case "--all":
				args.encode = true
			}
		}
	}

	if args.encode {
		encode.UnitTests()
	}
}
