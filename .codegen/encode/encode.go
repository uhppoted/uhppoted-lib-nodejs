package encode

import (
	_ "embed"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"text/template"
	"unicode"

	lib "codeberg.org/uhppoted/uhppoted-codegen/model/types"

	"codegen/codegen"
	"codegen/model"
)

//go:embed templates/spec.js
var spec string

type test struct {
	Request    string
	Name       string
	File       string
	Controller uint32
	Args       []arg
	Expected   any
}

type arg struct {
	Name  string
	Value any
}

func UnitTests() {
	log.Println("   ... generating encode unit tests")

	tests := transmogrify(model.Requests)

	if err := os.MkdirAll("../test/generated", 0750); err != nil {
		panic(fmt.Sprintf("%v", err))
	}

	for _, t := range tests {
		encodeTest(t)
	}
}

func encodeTest(t test) {
	file := filepath.Join("../test/generated", t.File)

	if f, err := os.Create(file); err != nil {
		log.Fatalf("%v", err)
	} else {
		defer f.Close()

		var data = struct {
			Request    string
			Name       any
			Controller uint32
			Args       []arg
			Expected   any
		}{
			Request:    t.Request,
			Name:       t.Name,
			Controller: t.Controller,
			Args:       t.Args,
			Expected:   t.Expected,
		}

		tmpl := template.Must(template.New("encode-tests").Funcs(codegen.Functions).Parse(spec))
		if err := tmpl.Execute(f, data); err != nil {
			log.Fatalf("%v", err)
		}

		log.Printf("... generated %s", file)
	}
}

func transmogrify(requests []lib.Request) []test {
	transmogrified := []test{}

	for _, rq := range requests {
		for _, t := range rq.Tests {
			var controller uint32
			var args = []arg{}

			for _, a := range t.Args {
				if a.Name == "controller" {
					controller = uint32(a.Value.(int))
				}
			}

			for _, a := range t.Args {
				if a.Name != "controller" {
					args = append(args, arg{
						Name:  camelCase(a.Name),
						Value: value(a),
					})
				}
			}

			transmogrified = append(transmogrified, test{
				Request:    hyphenate(strings.TrimSuffix(rq.Name, "request")),
				Name:       t.Name,
				File:       fmt.Sprintf("%v_spec.js", t.Name),
				Controller: controller,
				Args:       args,
				Expected:   packet(t.Expected),
			})
		}
	}

	return transmogrified
}

func value(arg lib.Arg) string {
	switch {
	case arg.Type == "HHmm":
		return fmt.Sprintf(`"%v"`, arg.Value)

	case arg.Name == "active-mode" && arg.Value == 1:
		return "opcodes.NormallyOpen"

	case arg.Name == "inactive-mode" && arg.Value == 2:
		return "opcodes.NormallyClosed"

	default:
		return fmt.Sprintf("%v", arg.Value)
	}
}

func packet(p []byte) []string {
	format := "0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x,  0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x, 0x%02x"

	return []string{
		fmt.Sprintf(format, p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10], p[11], p[12], p[13], p[14], p[15]) + ",",
		fmt.Sprintf(format, p[16], p[17], p[18], p[19], p[20], p[21], p[22], p[23], p[24], p[25], p[26], p[27], p[28], p[29], p[30], p[31]) + ",",
		fmt.Sprintf(format, p[32], p[33], p[34], p[35], p[36], p[37], p[38], p[39], p[40], p[41], p[42], p[43], p[44], p[45], p[46], p[47]) + ",",
		fmt.Sprintf(format, p[48], p[49], p[50], p[51], p[52], p[53], p[54], p[55], p[56], p[57], p[58], p[59], p[60], p[61], p[62], p[63]),
	}
}

func camelCase(s string) string {
	tokens := regexp.MustCompile(`[ \-:]+`).Split(s, -1)

	for i, token := range tokens[1:] {
		tokens[i+1] = capitalize(token)
	}

	return strings.Join(tokens, "")
}

func capitalize(s string) string {
	runes := []rune(s)

	if len(runes) > 0 {
		runes[0] = unicode.ToUpper(runes[0])
	}

	return string(runes)
}

func hyphenate(s string) string {
	tokens := regexp.MustCompile(`[ \-:]+`).Split(strings.TrimSpace(s), -1)

	for i, token := range tokens {
		tokens[i] = strings.ToLower(strings.TrimSpace(token))
	}

	return strings.Join(tokens, "-")
}
