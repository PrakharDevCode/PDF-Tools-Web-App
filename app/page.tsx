"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scissors, Archive, RefreshCw, Upload, Download, Check, Zap } from "lucide-react"

export default function PDFToolsApp() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)

  const tools = [
    {
      id: "merge",
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one document",
      icon: FileText,
      color: "bg-primary",
      features: ["Unlimited files", "Preserve quality", "Custom order"],
    },
    {
      id: "split",
      title: "Split PDF",
      description: "Extract pages or split PDF into multiple files",
      icon: Scissors,
      color: "bg-accent",
      features: ["Page ranges", "Individual pages", "Batch processing"],
    },
    {
      id: "compress",
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality",
      icon: Archive,
      color: "bg-secondary",
      features: ["Smart compression", "Quality control", "Batch compress"],
    },
    {
      id: "convert",
      title: "Convert PDF",
      description: "Convert PDFs to Word, Excel, PowerPoint, and more",
      icon: RefreshCw,
      color: "bg-chart-3",
      features: ["Multiple formats", "OCR support", "Layout preservation"],
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(files)
    setCompleted(false)
  }

  const handleProcess = async () => {
    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProcessing(false)
    setCompleted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-foreground">PDF Tools</h1>
                <p className="text-sm text-muted-foreground">Professional Document Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Professional PDF Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Merge, split, compress, and convert your PDF files with enterprise-grade security and lightning-fast
            processing.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Card
                key={tool.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 animate-scale-in ${
                  activeTool === tool.id ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveTool(tool.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${tool.color} rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 hover:rotate-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold">{tool.title}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* File Upload Section */}
        {activeTool && (
          <Card className="max-w-2xl mx-auto animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {tools.find((t) => t.id === activeTool)?.title}
              </CardTitle>
              <CardDescription className="text-center">Upload your PDF files to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors duration-300">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Drop your PDF files here</p>
                  <p className="text-muted-foreground">or click to browse</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Uploaded Files ({uploadedFiles.length})</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                      {completed && <Check className="w-5 h-5 text-green-500 animate-pulse-success" />}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {uploadedFiles.length > 0 && (
                <div className="flex space-x-4">
                  <Button
                    onClick={handleProcess}
                    disabled={processing}
                    className="flex-1 h-12 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {processing ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : completed ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Process Files
                      </>
                    )}
                  </Button>

                  {completed && (
                    <Button
                      variant="outline"
                      className="h-12 px-6 transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-8">Why Choose Our PDF Tools?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Secure Processing", desc: "Your files are processed securely and deleted after use" },
              { title: "Lightning Fast", desc: "Advanced algorithms ensure quick processing times" },
              { title: "Professional Quality", desc: "Maintain document integrity and formatting" },
            ].map((feature, index) => (
              <div key={index} className="p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}