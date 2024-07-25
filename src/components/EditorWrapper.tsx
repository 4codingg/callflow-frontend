import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const LazyEditor = lazy(() => {
  return new Promise((resolve) => {
    import('@tinymce/tinymce-react').then((module) => {
      resolve({ default: module.Editor as never });
    });
  });
});

export const EditorWrapper = ({ setMessage, message }) => {
  const editorRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading animation...</div>}>
      <LazyEditor
        apiKey="2m8xwd7g5t9fx51sq7rtgevm4oqplfy3z4rc5wt9f0efmft2"
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={(e) => setMessage(e)}
        value={message}
        init={{
          plugins: [
            'advlist autolink lists link charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help',
          menu: {
            insert: {
              title: 'Insert',
              items: 'link media template hr',
            },
          },
        }}
      />
    </Suspense>
  );
};
