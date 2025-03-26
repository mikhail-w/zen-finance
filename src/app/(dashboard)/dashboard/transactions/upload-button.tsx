import { Upload } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';
import { ParseResult } from 'papaparse';
import { Button } from '@/components/ui/button';

type Props = {
  onUpload: (results: ParseResult<string[]>) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall
  interface CSVReaderProps {
    onUploadAccepted: (results: ParseResult<string[]>) => void;
    children: (props: {
      getRootProps: () => Record<string, unknown>;
    }) => React.ReactNode;
  }

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: { getRootProps: () => Record<string, unknown> }) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
