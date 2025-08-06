package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/chainguard-dev/dfc/pkg/dfc"
	"github.com/gin-gonic/gin"
)

var (
	org = "example.com"
)

func main() {
	router := gin.Default()
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
	// demoConversion()
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusAccepted, gin.H{
			"status":  "ok",
			"message": "everything is fine ! Happy dfc-ing",
		})
	})
	router.POST("/upload", readDockerfileFromUpload)
	router.Run(":8000")
}

func readDockerfileFromUpload(ctx *gin.Context) {
	req := ctx.Request
	var content []byte
	var err error
	contentType := req.Header.Get("Content-Type")
	if strings.HasPrefix(contentType, "text/plain") || strings.HasPrefix(contentType, "application/text") {
		content, err = io.ReadAll(req.Body)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body: " + err.Error()})
			return
		}
	} else if strings.HasPrefix(contentType, "multipart/form-data") {
		file, handler, err := req.FormFile("dockerfile")
		if err != nil {
			ctx.JSON(http.StatusNotAcceptable, gin.H{"error": err.Error()})
			return
		}
		defer file.Close()
		fmt.Printf("Received file: %s\n", handler.Filename)
		// Read file contents
		content, err = io.ReadAll(file)
		if err != nil {
			ctx.JSON(http.StatusNotAcceptable, gin.H{"error": err.Error()})
			return
		}
	} else {
		ctx.JSON(http.StatusUnsupportedMediaType, gin.H{"error": "Unsupported Content-Type: " + contentType})
		return
	}

	fmt.Println("=== Dockerfile Content ===")
	fmt.Println(string(content))
	fmt.Println("=== Dockerfile After Content ===")
	newDockerfile := demoConversion(string(content))
	fmt.Println(newDockerfile)
	ctx.JSON(http.StatusAccepted, gin.H{
		"status":         "ok",
		"old_dockerfile": string(content),
		"new_dockerfile": newDockerfile.String(),
		"lines":          newDockerfile.Lines,
	})

}

func demoConversion(dockerfile_raw string) *dfc.Dockerfile {
	ctx := context.Background()
	// Parse the Dockefile bytes
	raw := []byte(strings.TrimSpace(dockerfile_raw))

	dockerfile, err := dfc.ParseDockerfile(ctx, raw)
	if err != nil {
		log.Fatalf("ParseDockerfile(): %v", err)
	}

	// Convert
	converted, err := dockerfile.Convert(ctx, dfc.Options{
		Organization: org,
		// Registry: "r.example.com/cgr-mirror", // Optional: registry override
		// Update:   true,                      // Optional: update mappings before conversion
		// ExtraMappings: myCustomMappings,     // Optional: overlay mappings on top of builtin
		// NoBuiltIn: true,                     // Optional: skip built-in mappings
	})
	if err != nil {
		log.Fatalf("dockerfile.Convert(): %v", err)
	}
	return converted
}
