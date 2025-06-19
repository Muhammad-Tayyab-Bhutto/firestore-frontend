"use client";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UploadCloud, FileText, Image as ImageIcon, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface UploadedFile {
  file: File;
  preview: string | null; // Data URL for image previews
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
}

const documentTypes = [
  { id: 'cnic_front', label: 'CNIC (Front Side)', required: true },
  { id: 'cnic_back', label: 'CNIC (Back Side)', required: true },
  { id: 'matric_certificate', label: 'Matriculation Certificate', required: true },
  { id: 'inter_certificate', label: 'Intermediate Certificate', required: true },
  { id: 'photo', label: 'Passport-size Photograph', required: true },
  { id: 'domicile', label: 'Domicile (Optional)', required: false },
];

export function DocumentUploader() {
  const [files, setFiles] = useState<Record<string, UploadedFile | null>>(
    documentTypes.reduce((acc, type) => ({ ...acc, [type.id]: null }), {})
  );
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[], documentTypeId: string) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const newFile: UploadedFile = {
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        status: 'pending',
      };
      setFiles(prev => ({ ...prev, [documentTypeId]: newFile }));
      // Simulate upload
      setTimeout(() => {
         setFiles(prev => ({ ...prev, [documentTypeId]: { ...newFile, status: 'success', progress: 100 } }));
         toast({ title: `${file.name} uploaded successfully (simulated).`});
      }, 1500);
    }
  }, [toast]);

  const removeFile = (documentTypeId: string) => {
    const fileToRemove = files[documentTypeId];
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFiles(prev => ({ ...prev, [documentTypeId]: null }));
  };

  return (
    <div className="space-y-6">
      {documentTypes.map(docType => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: (acceptedFiles) => onDrop(acceptedFiles, docType.id),
          accept: { 'image/*': ['.jpeg', '.png'], 'application/pdf': ['.pdf'] },
          maxFiles: 1,
          multiple: false,
        });
        const currentFile = files[docType.id];

        return (
          <Card key={docType.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">
                {docType.label} {docType.required && <span className="text-destructive">*</span>}
              </CardTitle>
              <CardDescription>Upload a clear image or PDF.</CardDescription>
            </CardHeader>
            <CardContent>
              {currentFile ? (
                <div className="border p-4 rounded-md space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {currentFile.preview ? (
                        <Image src={currentFile.preview} alt="Preview" width={48} height={48} className="rounded object-cover" data-ai-hint="document education"/>
                      ) : (
                        <FileText className="h-10 w-10 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{currentFile.file.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(docType.id)} aria-label="Remove file">
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                  {currentFile.status === 'uploading' && currentFile.progress !== undefined && (
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${currentFile.progress}%` }}></div>
                    </div>
                  )}
                  {currentFile.status === 'success' && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" /> Uploaded Successfully
                    </div>
                  )}
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors hover:border-primary/80 ${
                    isDragActive ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  {isDragActive ? (
                    <p className="text-primary">Drop the file here ...</p>
                  ) : (
                    <p className="text-muted-foreground">Drag 'n' drop file here, or click to select file</p>
                  )}
                  <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG or PDF (MAX. 5MB)</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      <div className="mt-8 flex justify-end">
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Save All Documents</Button>
      </div>
    </div>
  );
}
