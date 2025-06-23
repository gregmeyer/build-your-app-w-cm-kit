"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Footer from "@/components/ui/Footer";
import Lightbox from "@/components/ui/Lightbox";
import Navigation from "@/components/Navigation";

export default function ComponentsDocs() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);

  const openLightbox = (title: string, content: React.ReactNode) => {
    setLightboxContent({ title, content });
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxContent(null);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
        <p className="text-xl text-gray-600">
          Reusable UI components for CM Kit applications. Click on examples to view them in detail.
        </p>
      </div>

      {/* Button Demo */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Button</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button onClick={() => openLightbox("Primary Button", <Button>Primary Button</Button>)}>Primary</Button>
          <Button variant="secondary" onClick={() => openLightbox("Secondary Button", <Button variant='secondary'>Secondary Button</Button>)}>Secondary</Button>
          <Button variant="outline" onClick={() => openLightbox("Outline Button", <Button variant='outline'>Outline Button</Button>)}>Outline</Button>
          <Button variant="ghost" onClick={() => openLightbox("Ghost Button", <Button variant='ghost'>Ghost Button</Button>)}>Ghost</Button>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto mt-4">
{`import Button from "@/components/ui/Button";

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        </pre>
      </Card>

      {/* Card Demo */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <h4 className="font-semibold text-gray-900">Basic Card</h4>
            <p className="text-gray-600 mt-1">Simple card with content</p>
          </Card>
          <Card className="shadow-md">
            <h4 className="font-semibold text-gray-900">Elevated Card</h4>
            <p className="text-gray-600 mt-1">Card with more shadow</p>
          </Card>
        </div>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto mt-4">
{`import Card from "@/components/ui/Card";

<Card>
  <h4>Basic Card</h4>
  <p>Simple card with content</p>
</Card>`}
        </pre>
      </Card>

      {/* Badge Demo */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Badge</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto mt-4">
{`import Badge from "@/components/ui/Badge";

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`}
        </pre>
      </Card>

      {/* Navigation Demo */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
        <div className="mb-4">
          <Navigation />
        </div>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto mt-4">
{`import Navigation from "@/components/Navigation";

<Navigation />`}
        </pre>
      </Card>

      {/* Footer Demo */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Footer</h2>
        <div className="mb-4">
          <Footer />
        </div>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto mt-4">
{`import Footer from "@/components/ui/Footer";

<Footer />`}
        </pre>
      </Card>

      {/* Lightbox Demo */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Lightbox (Modal)</h2>
        <Button onClick={() => openLightbox("Lightbox Example", <div className='p-4'>This is a modal dialog using the Lightbox component.</div>)}>
          Open Lightbox
        </Button>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto mt-4">
{`import Lightbox from "@/components/ui/Lightbox";

const [isOpen, setIsOpen] = useState(false);

<Lightbox isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Your content here
</Lightbox>`}
        </pre>
      </Card>

      {lightboxOpen && lightboxContent && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          title={lightboxContent.title}
        >
          {lightboxContent.content}
        </Lightbox>
      )}
    </div>
  );
}
